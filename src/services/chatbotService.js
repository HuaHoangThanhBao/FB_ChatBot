require("dotenv").config();
// import { response } from "express";
import request from "request";

const PAGE_INBOX_ID = process.env.PAGE_INBOX_ID;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const IMAGE_GET_STARTED_URL =
  "https://doslink.com.vn/wp-content/uploads/2020/10/An-toàn-cho-gia-dình-bạn.jpg";
const IMAGE_VISA_UC_URL =
  "https://doslink.com.vn/wp-content/uploads/2020/10/Doslink-make-it-happen-simply-because-we-can.jpg";
const IMAGE_VISA_CANADA_URL =
  "https://doslink.com.vn/wp-content/uploads/2021/06/Canada-doslink.com_.vn_.jpg";
const IMAGE_DICH_VU_QUAN_TAM_URL =
  "https://doslink.com.vn/wp-content/uploads/2019/07/Dinh-cu-Uc-Luat-su-di-tru-2-Doslink-1.jpg";
const IMAGE_DAT_LICH_TU_VAN_URL = 
  "https://doslink.com.vn/wp-content/uploads/2021/06/calendar-chatbot-fb.jpg";

var tuVanNgayBayGio = false;
var humanChat = false;
var visaType = "";

let getHumanChatStatus = () => {
  return humanChat;
}

let getVisaType = () => {
  return visaType;
}

let callSendAPI = (sender_psid, response) => {
  return new Promise((resolve, reject) => {
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
          console.log("Gọi hàm callSendAPI thành công!");
          resolve("Gọi hàm callSendAPI thành công!");
        } else {
          console.log("Unable to send message:" + err);
          reject("Gọi hàm callSendAPI thất bại: " + err);
        }
      }
    );
  })
};


let callSendToSlackAPI = (response) => {
  return new Promise((resolve, reject) => {
    request(
      {
        uri: "https://hook.integromat.com/1zp3us9nefdseim3fljapnmciynxtxgu",
        method: "POST",
        json: response,
      },
      (err, res, body) => {
        if (!err) {
          humanChat = true;
          console.log("Đã gửi thông báo đến Slack!");
          resolve("Đã gửi thông báo đến Slack!");
        } else {
          console.log("Lỗi khi gửi thông báo đến Slack: " + err);
          reject("Lỗi khi gửi thông báo đến Slack: " + err);
        }
      }
    );
  })
}


/**Using passing thread control from facebook API */
let callSendLiveChatAPI = (sender_psid) => {
  return new Promise((resolve, reject) => {
    try{
      // Construct the message body
      let request_body = {
        recipient: {
          id: sender_psid,
        },
        timestamp: 1458692752478,
        pass_thread_control: {
          new_owner_app_id: PAGE_INBOX_ID,
          metadata: "Additional content that the caller wants to set",
        },
      };
  
      // Send the HTTP request to the Messenger Platform
      request(
        {
          uri: "https://graph.facebook.com/v2.6/me/pass_thread_control",
          qs: { access_token: PAGE_ACCESS_TOKEN },
          method: "POST",
          json: request_body,
        },
        (err, res, body) => {
          if (!err) {
            humanChat = true;
            resolve("pass thread control successfully");
          } else {
            reject("Unable to pass thread control:" + err);
          }
        }
      );
    }
    catch(e){
      reject(e);
    }
  });
};

let sendTypingOn = (sender_psid) => {
  return new Promise((resolve, reject) => {
    // Construct the message body
    let request_body = {
      recipient: {
        id: sender_psid,
      },
      sender_action: "typing_on",
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
          console.log("Hiệu ứng typing on sent đã được gửi!");
          resolve("Hiệu ứng typing on sent đã được gửi!");
        } else {
          console.error("Lỗi khi gửi hiệu ứng typing on sent:" + err);
          reject("Lỗi khi gửi hiệu ứng typing on sent:" + err);
        }
      }
    );
  })
};

let sendMarkReadMessage = (sender_psid) => {
  return new Promise((resolve, reject) => {
    // Construct the message body
    let request_body = {
      recipient: {
        id: sender_psid,
      },
      sender_action: "mark_seen",
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
          console.log("Hiệu ứng mark seen đã gửi thành công!");
          resolve("Hiệu ứng mark seen đã gửi thành công!");
        } else {
          console.error("Lỗi khi gửi hiệu ứng mark seen: " + err);
          reject("Lỗi khi gửi hiệu ứng mark seen: " + err);
        }
      }
    );
  })
};

let getUsername = async (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    request(
      {
        uri: `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
        method: "GET",
      },
      (err, res, body) => {
        console.log(body);
        if (!err) {
          body = JSON.parse(body);
          let username = `${body.first_name} ${body.last_name}`;
          resolve(username);
        } else {
          console.error("Unable to send message:" + err);
          reject(err);
        }
      }
    );
  });
};

let handleGetStarted = async (sender_psid) => {
  //let username = await getUsername(sender_psid);
  
  // let helloResponse = {
  //   text: `
  //   Chào anh/chị, anh/chị vui lòng chờ trong ít phút để kết nối với Quản lý trang.
  //   \n---------------------
  //   \nDoslink hotline: 0909 144 029
  //   `,
  // };

  let alertResponse = {
    text: `Đang có KH chờ trên trang FB DMSI`
  }//

  //let startedTemplateResponse = getStartedTemplate();
  //let response2 = getStartedQuickReplyTemplate();

  //Refresh lại 2 biến toàn cục
  tuVanNgayBayGio = false;
  humanChat = false;

  await sendMarkReadMessage(sender_psid);

  await sendTypingOn(sender_psid);
  //Send text message
  //await callSendAPI(sender_psid, helloResponse);

  await callSendAPI(sender_psid, callTemplate());

  //Send generic template message
  //await callSendAPI(sender_psid, startedTemplateResponse);

  //Send alert message to slack webhook
  await callSendToSlackAPI(alertResponse);//

  return 'Đã gửi tin nhắn template đến khách';
};

let handleSendLiveChat = async (sender_psid) => {
  
  await sendMarkReadMessage(sender_psid);

  await sendTypingOn(sender_psid);

  await callSendLiveChatAPI(sender_psid);

  return 'Đã yêu cầu live chat thành công!';//
}

let callTemplate = () => {
  let response = {
    attachment: {
      "type": "template",
      "payload": {
        "template_type": "button",
        "text": `
        Chào anh/chị, anh/chị vui lòng chờ trong ít phút để kết nối với Quản lý trang.
        \n----------------------
        \nHoặc gọi ngay hotline:`,
        "buttons": [
          {
            "type": "phone_number",
            "title": "Đầu tư Úc",
            "payload": "+840918375365"
          },
          {
            "type": "phone_number",
            "title": "Đầu tư Canada",
            "payload": "+840943285001"
          },
          {
            "type": "phone_number",
            "title": "Tay nghề Úc & Canada",
            "payload": "+840909144029"
          }
        ]
      }
    },
  };
  return response;
}

let getStartedTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Xin chào bạn!",
            image_url: IMAGE_GET_STARTED_URL,
            subtitle: " Bạn đang cần hỗ trợ?",
            buttons: [
              {
                type: "postback",
                title: "Tư vấn ngay bây giờ",
                payload: "TU_VAN_NGAY_BAY_GIO",
              },
              {
                type: "postback",
                title: "Đặt lịch tư vấn",
                payload: "DAT_LICH_TU_VAN",
              },
              {
                type: "phone_number",
                title: "Gọi cho Doslink",
                payload: "+840918375365",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};

///
let getDichVuQuanTamTemplate = () => {
  let response;
  if (!tuVanNgayBayGio) {
    response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Dịch vụ bạn cần tư vấn là:",
              image_url: IMAGE_DICH_VU_QUAN_TAM_URL,
              buttons: [
                {
                  type: "postback",
                  title: "Visa Úc",
                  payload: "VISA_UC",
                },
                {
                  type: "postback",
                  title: "Visa Canada",
                  payload: "VISA_CANADA",
                },
                {
                  type: "postback",
                  title: "Visa khác",
                  payload: "VISA_KHAC",

                  // type: "web_url",
                  // url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                  // title: "Visa khác",
                  // webview_height_ratio: "tall",
                  // messenger_extensions: true, //false: open the webview in a new tab
                },
              ],
            },
          ],
        },
      },
    };
  } else {
    response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Dịch vụ bạn cần tư vấn là:",
              image_url: IMAGE_DICH_VU_QUAN_TAM_URL,
              buttons: [
                {
                  type: "postback",
                  title: "Visa Úc",
                  payload: "VISA_UC",
                },
                {
                  type: "postback",
                  title: "Visa Canada",
                  payload: "VISA_CANADA",
                },
                {
                  type: "postback",
                  title: "Visa khác",
                  payload: "VISA_KHAC_LIVE_CHAT",
                },
              ],
            },
          ],
        },
      },
    };
  }
  return response;
};

let handleSendTuVanNgayBayGio = (sender_psid, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      tuVanNgayBayGio = status;

      let response = getDichVuQuanTamTemplate();
      await callSendAPI(sender_psid, response);

      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};
///

///
let handleSendVisaKhac = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = {
        text: `Bạn vui lòng đợi trong vài phút! Tư vấn di trú Doslink sẽ kết nối ngay với bạn.`,
      };
      await callSendAPI(sender_psid, response);

      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};

let handleSendVisaUc = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getVisaUcTemplate();
      await callSendAPI(sender_psid, response1);

      if(tuVanNgayBayGio)
        await handleSendLiveChat(sender_psid);

      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};

let handleSendVisaCanada = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getVisaCanadaTemplate();
      await callSendAPI(sender_psid, response1);

      if(tuVanNgayBayGio)
        await handleSendLiveChat(sender_psid);

      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};
////

/**Canada */
let getVisaCanadaTemplate = () => {
  let response;
  if (!tuVanNgayBayGio) {
    response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Visa Canada có 3 loại",
              image_url: IMAGE_VISA_CANADA_URL,
              subtitle: "Bạn đang quan tâm đến loại visa nào?",
              buttons: [
                {
                  "type": "postback",
                  "title": "Đầu tư",
                  "payload": "DAU_TU_CANADA",

                  // type: "web_url",
                  // url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                  // title: "Đầu tư",
                  // webview_height_ratio: "tall",
                  // messenger_extensions: true, //false: open the webview in a new tab
                },
                {
                  "type": "postback",
                  "title": "Tay nghề",
                  "payload": "TAY_NGHE_CANADA",

                  // type: "web_url",
                  // url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                  // title: "Tay nghề",
                  // webview_height_ratio: "tall",
                  // messenger_extensions: true, //false: open the webview in a new tab
                },
                {
                  "type": "postback",
                  "title": "Du học",
                  "payload": "DU_HOC_CANADA",

                  // type: "web_url",
                  // url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                  // title: "Du học",
                  // webview_height_ratio: "tall",
                  // messenger_extensions: true, //false: open the webview in a new tab
                },
              ],
            },
          ],
        },
      },
    };
  } else {
    response = {
      text: `Bạn vui lòng đợi trong vài phút! Tư vấn di trú Doslink sẽ kết nối ngay với bạn.`,
    };
  }
  return response;
};
/**End Canada */

/*Úc*/
let getVisaUcTemplate = () => {
  let response;
  if (!tuVanNgayBayGio) {
    response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Visa Úc có 3 loại",
              image_url: IMAGE_VISA_UC_URL,
              subtitle: "Bạn đang quan tâm đến loại visa nào?",
              buttons: [
                {
                  "type": "postback",
                  "title": "Đầu tư",
                  "payload": "DAU_TU_UC",

                  // type: "web_url",
                  // url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                  // title: "Đầu tư",
                  // webview_height_ratio: "tall",
                  // messenger_extensions: true, //false: open the webview in a new tab
                },
                {
                  "type": "postback",
                  "title": "Tay nghề",
                  "payload": "TAY_NGHE_UC",

                  // type: "web_url",
                  // url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                  // title: "Tay nghề",
                  // webview_height_ratio: "tall",
                  // messenger_extensions: true, //false: open the webview in a new tab
                },
                {
                  "type": "postback",
                  "title": "Du học",
                  "payload": "DU_HOC_UC",

                  // type: "web_url",
                  // url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                  // title: "Du học",
                  // webview_height_ratio: "tall",
                  // messenger_extensions: true, //false: open the webview in a new tab
                },
              ],
            },
          ],
        },
      },
    };
  } else {
    response = {
      text: `Bạn vui lòng đợi trong vài phút! Tư vấn di trú Doslink sẽ kết nối ngay với bạn.`,
    };
  }
  return response;
};
/*End Úc*/


let getDatLichTuVanTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Đặt lịch tư vấn",
           image_url: IMAGE_DAT_LICH_TU_VAN_URL,
            subtitle: "Bạn vui lòng chọn thời gian tư vấn phù hợp",
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "Tiếp tục",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              }
            ],
          },
        ],
      },
    },
  };
  return response;
}


let handleSendDatLichTuVan = async(sender_psid, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      visaType = res;

      let response = getDatLichTuVanTemplate();
      await callSendAPI(sender_psid, response);

      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
}

let handleSendContactFormWebHook = async(response) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Send the HTTP request to the Messenger Platform
      request(
        {
          uri: "https://hook.integromat.com/2hs65gud5w8wir7hg5d9382j6ikryjd0",
          method: "POST",
          json: response,
        },
        (err, res, body) => {
          if (!err) {
            humanChat = true;
            resolve("Send contact form successfully");
          } else {
            resolve("Unable to send contact form:" + err);
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  handleGetStarted: handleGetStarted,
  handleSendVisaUc: handleSendVisaUc,
  handleSendVisaCanada: handleSendVisaCanada,
  // handleSendDinhCuDauTuUc: handleSendDinhCuDauTuUc,
  // handleSendDinhCuTayNgheUc: handleSendDinhCuTayNgheUc,
  // handleSendDinhCuDauTuCanada: handleSendDinhCuDauTuCanada,
  // handleSendDinhCuTayNgheCanada: handleSendDinhCuTayNgheCanada,
  handleSendTuVanNgayBayGio: handleSendTuVanNgayBayGio,
  callSendAPI: callSendAPI,
  getUsername: getUsername,
  getVisaType: getVisaType,
  handleSendVisaKhac: handleSendVisaKhac,
  handleSendLiveChat: handleSendLiveChat,
  getHumanChatStatus: getHumanChatStatus,
  handleSendContactFormWebHook: handleSendContactFormWebHook,
  handleSendDatLichTuVan: handleSendDatLichTuVan,
  //getLiveChatTemplate: getLiveChatTemplate,
  //handleSendLiveChat: handleSendLiveChat,
};
