require("dotenv").config();
import request from "request";
import chatbotService from "../services/chatbotService";
const fs = require('fs');

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

let getHomePage = (req, res) => {
  return res.render("homepage.ejs");
};

let getWebHook = (req, res) => {
  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  console.log(VERIFY_TOKEN);

  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
};

let postWebHook = (req, res) => {
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === "page") {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {
      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log("Sender PSID: " + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
};

//Handles message events
function handleMessage(sender_psid, received_message) {
  console.log("human chat status: ", chatbotService.getHumanChatStatus());

  if (!chatbotService.getHumanChatStatus()) {
    let response;

    // Checks if the message contains text
    if (received_message.text) {
      // Create the payload for a basic text message, which
      // will be added to the body of our request to the Send API
      response = {
        //text: `You sent the message: "${received_message.text}". Now send me an attachment!`,
        text: `Cảm ơn bạn đã để lại lời nhắn, chúng tôi sẽ liên lạc ngay!`,
      };
    } else if (received_message.attachments) {
      response = {
        //text: `You sent the message: "${received_message.text}". Now send me an attachment!`,
        text: `Chúng tôi đang xem xét file bạn gửi và sẽ phản hồi sớm nhất!`,
      };

      // Get the URL of the message attachment
      //let attachment_url = received_message.attachments[0].payload.url;
      // response = {
      //   attachment: {
      //     type: "template",
      //     payload: {
      //       template_type: "generic",
      //       elements: [
      //         {
      //           title: "Bạn có xác nhận tấm ảnh này không?",
      //           subtitle: "Nhấn nút ở dưới để trả lời.",
      //           image_url: attachment_url,
      //           buttons: [
      //             {
      //               type: "postback",
      //               title: "Có!",
      //               payload: "yes",
      //             },
      //             {
      //               type: "postback",
      //               title: "Không!",
      //               payload: "no",
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //   },
      // };
    }

    // Send the response message
    //callSendAPI(sender_psid, response);
  }
}

//Handle messaging_postbacks events
async function handlePostback(sender_psid, received_postback) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  switch (payload) {
    case "yes":
      response = { text: "Thanks!" };
      break;
    case "no":
      response = { text: "Oops, try sending another image." };
      break;

    case "RESTART_BOT":
    case "GET_STARTED":
      await chatbotService.handleGetStarted(sender_psid);
      break;

    case "TALK_TO_AGENT":
      await chatbotService.handleSendLiveChat(sender_psid);
      break;
      
    case "VISA_UC":
      await chatbotService.handleSendVisaUc(sender_psid);
      break;
    case "VISA_CANADA":
      await chatbotService.handleSendVisaCanada(sender_psid);
      break;
    case "VISA_KHAC_LIVE_CHAT":
      await chatbotService.handleSendVisaKhac(sender_psid);
      break;
    case "VISA_KHAC":
      await chatbotService.handleSendDatLichTuVan(sender_psid, 'Visa khác');
      break;

    case "TU_VAN_NGAY_BAY_GIO":
      await chatbotService.handleSendTuVanNgayBayGio(sender_psid, true);
      break;
    case "DAT_LICH_TU_VAN":
      await chatbotService.handleSendTuVanNgayBayGio(sender_psid, false);
      break;

    case 'DAU_TU_UC':
      await chatbotService.handleSendDatLichTuVan(sender_psid, 'Đầu tư Úc');
    break;
    case 'TAY_NGHE_UC':
      await chatbotService.handleSendDatLichTuVan(sender_psid, 'Tay nghề Úc');
    break;
    case 'Du_HOC_UC':
      await chatbotService.handleSendDatLichTuVan(sender_psid, 'Du học Úc');
    break;

    case 'DAU_TU_CANADA':
      await chatbotService.handleSendDatLichTuVan(sender_psid, 'Đầu tư Canada');
    break;
    case 'TAY_NGHE_CANADA':
      await chatbotService.handleSendDatLichTuVan(sender_psid, 'Tay nghề Canada');
    break;
    case 'DU_HOC_CANADA':
      await chatbotService.handleSendDatLichTuVan(sender_psid, 'Du học Canada');
    break;

    default:
      response = {
        text: `oop! I don't know response with postback ${payload}`,
      };
  }

  // Send the message to acknowledge the postback
  //callSendAPI(sender_psid, response);
}

function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
}

let setupProfile = async (req, res) => {
  //call profile facebook api

  let request_body = {
    get_started: { payload: "GET_STARTED" },
    whitelisted_domains: ["https://doslink-chatbot.herokuapp.com/"],
  };

  // Send the HTTP request to the Messenger Platform
  await request(
    {
      uri: `https://graph.facebook.com/v10.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`,
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      console.log(body);
      if (!err) {
        console.log("Setup user profile succedd!");
      } else {
        console.error("Unable to setup user profile:" + err);
      }
    }
  );

  return res.send("Setup user profile succedd!");
};

let setupPersistentMenu = async (req, res) => {
  //call persistent menu facebook api
  let request_body = {
    persistent_menu: [
      {
        locale: "default",
        composer_input_disabled: false,
        call_to_actions: [
          {
            type: "postback",
            title: "Tư vấn ngay với tư vấn viên",
            payload: "TALK_TO_AGENT",
          },
          {
            type: "web_url",
            title: "Doslink Facebook Page",
            url: "https://www.facebook.com/DoslinkVietnam",
            webview_height_ratio: "full",
          },
          {
            type: "postback",
            title: "Khởi động lại bot",
            payload: "RESTART_BOT",
          },
        ],
      },
    ],
  };

  // Send the HTTP request to the Messenger Platform
  await request(
    {
      uri: `https://graph.facebook.com/v10.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`,
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      console.log(body);
      if (!err) {
        console.log("Setup persistent menu succedd!");
      } else {
        console.error("Unable to setup persistent menu:" + err);
      }
    }
  );

  return res.send("Setup persistent menu succedd!");
};

let handleBookAppointment = (req, res) => {
  return res.render("book-appointment.ejs");
};

//Handle Post Book Appointment from webview
let handlePostBookAppointment = async (req, res) => {
  try {
    let customerName = "";
    if (req.body.customerName === "") {
      customerName = await chatbotService.getUsername(req.body.psid);
    } else customerName = req.body.customerName;

    let responseDatLichResult = {
      text: `---Thông tin lịch hẹn---
        \nDịch vụ: ${chatbotService.getVisaType()}
        \nHọ và tên: ${customerName}
        \nEmail: ${req.body.customerEmail}
        \nSố điện thoại: ${req.body.customerPhone}
        \nNgày tư vấn: ${req.body.ngayTuVan}
        \nGiờ tư vấn: ${req.body.gioTuVan}
        `,
    };

    let responeThankYou = {
      text: `Cảm ơn bạn đã đăng kí tư vấn.
      \nTư Vấn Di Trú Doslink sẽ liên hệ với bạn theo thời gian đã đăng kí.
      \nChúc bạn một ngày nhiều bình an
      \nDoslink Migration & Investment
      `,
    };

    let responseFormWebHook = {
      // loaiDichVu: req.body.loaiDichVu,
      loaiDichVu: chatbotService.getVisaType() != '' ? chatbotService.getVisaType() : 'Visa khác',
      hoTen: customerName,
      email: req.body.customerEmail,
      sdt: req.body.customerPhone,
      ngayTuVan: req.body.ngayTuVan,
      gioTuVan: req.body.gioTuVan,
    };
    //console.log(responseFormWebHook);


    await chatbotService.handleSendContactFormWebHook(responseFormWebHook);
    await chatbotService.callSendAPI(req.body.psid, responseDatLichResult);
    //await chatbotService.callSendAPI(req.body.psid, chatbotService.getLiveChatTemplate());
    await chatbotService.callSendAPI(req.body.psid, responeThankYou);


    const data = loadJSON('./src/data.json');
    //console.log(data);

    const dateObj = {};
    dateObj[req.body.ngayTuVan] = req.body.gioTuVan;

    data.appointments.push(dateObj);
    saveJSON('./src/data.json', data);

    //console.log(data);


    return res.status(200).json({
      message: "ok",
    });
  } catch (e) {
    console.log("Lỗi post book appointment: ", e);
    return res.status(500).json({
      message: "server error",
    });
  }
};


function loadJSON(filename = ''){
  return JSON.parse(fs.existsSync(filename) ? fs.readFileSync(filename).toString(): 'null');
}

function saveJSON(filename = '', json = ''){
  return fs.writeFileSync(filename, JSON.stringify(json));
}

// function checkAppointmentExisted(appointments, ngayTuVan, gioTuVan){
//   let found = false;
//   appointments.forEach((element) => {
//     if(element.hasOwnProperty(ngayTuVan)){
//       if(element[ngayTuVan] === gioTuVan){
//         found = true;
//       }
//     }
//   })
//   return found;
// }

module.exports = {
  getHomePage: getHomePage, //key: value
  getWebHook: getWebHook,
  postWebHook: postWebHook,
  setupProfile: setupProfile,
  setupPersistentMenu: setupPersistentMenu,
  handleBookAppointment: handleBookAppointment,
  handlePostBookAppointment: handlePostBookAppointment,
};
