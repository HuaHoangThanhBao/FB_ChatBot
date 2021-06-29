/*File này dùng để chứa những hàm cũ không dùng tới bên file chatBotService.js*/

let getLiveChatTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Tư vấn trực tiếp",
            subtitle: "Bạn có muốn tư vấn trực tiếp với chuyên viên?",
            buttons: [
              {
                type: "postback",
                title: "Có",
                payload: "YES_TO_LIVE_CHAT",
              },
              {
                type: "postback",
                title: "Không",
                payload: "NO_TO_LIVE_CHAT",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};

// let handleSendLiveChat = (sender_psid, status) => {
//   if (status) {
//     return new Promise(async (resolve, reject) => {
//       try {
//         let response = {
//           text: "Xin vui lòng chờ một lát, nhân viên của chúng tôi sẽ liên lạc ngay",
//         };
//         await callSendAPI(sender_psid, response);

//         resolve("done");
//       } catch (e) {
//         reject(e);
//       }
//     });
//   } else {
//     return new Promise(async (resolve, reject) => {
//       try {
//         let response = { text: "Xin cảm ơn!" };
//         await callSendAPI(sender_psid, response);

//         resolve("done");
//       } catch (e) {
//         reject(e);
//       }
//     });
//   }
// };



let handleSendDinhCuDauTuUc = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getDinhCuDauTuUcTemplate();
      await callSendAPI(sender_psid, response1);

      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};

let handleSendDinhCuTayNgheUc = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getDinhCuTayNgheUcTemplate();
      await callSendAPI(sender_psid, response1);

      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};


let handleSendDinhCuDauTuCanada = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getDinhCuDauTuCanadaTemplate();
      await callSendAPI(sender_psid, response1);

      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};

let handleSendDinhCuTayNgheCanada = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getDinhCuTayNgheCanadaTemplate();
      await callSendAPI(sender_psid, response1);

      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};

/**Canada */
let getDinhCuDauTuCanadaTemplate = (sender_psid) => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Doanh nhân khởi nghiệp",
            image_url: IMAGE_VISA_UC_URL,
            subtitle: "Start up visa",
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: "https://doslink.com.vn/dinh-cu-canada-doanh-nhan-khoi-nghiep-start-up-visa-suv/",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "Đặt lịch tư vấn",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              },
            ],
          },
          {
            title: "Đầu tư Đảo Hoàng Tử",
            image_url: IMAGE_DAT_LICH_TU_VAN_URL,
            subtitle: "",
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: "https://doslink.com.vn/dau-tu-dinh-cu-canada-dau-tu-dao-hoang-tu-prince-edward-island-pnp/",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "Đặt lịch tư vấn",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              },
            ],
          },
          {
            title: "Đầu tư Manitoba",
            image_url: IMAGE_DAT_LICH_TU_VAN_URL,
            subtitle: "",
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: "https://doslink.com.vn/dinh-cu-canada-dau-tu-tinh-bang-manitoba/",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "Đặt lịch tư vấn",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              },
            ],
          },
          {
            title: "Đầu tư Doanh nghiệp nhỏ",
            image_url: IMAGE_DAT_LICH_TU_VAN_URL,
            subtitle: "Owner Operator",
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: "https://doslink.com.vn/dinh-cu-canada-dau-tu-doanh-nghiep-nho-owner-operator/",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "Đặt lịch tư vấn",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              },
            ],
          },
          {
            title: "Đầu tư thí điểm British Columbia",
            image_url: IMAGE_DAT_LICH_TU_VAN_URL,
            subtitle: "Ở Vancouver",
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: "https://doslink.com.vn/dinh-cu-canada-dau-tu-thi-diem-british-columbia-vancouver-bc/",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "Đặt lịch tư vấn",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              },
            ],
          },
          {
            title: "Đầu tư British Columbia",
            image_url: IMAGE_DAT_LICH_TU_VAN_URL,
            subtitle: "Ở Vancouver, BC",
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: "https://doslink.com.vn/dinh-cu-canada-dau-tu-british-columbia-vancouver-bc/",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "Đặt lịch tư vấn",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              },
            ],
          },
          {
            title: "Đầu tư New Brunswick",
            image_url: IMAGE_DAT_LICH_TU_VAN_URL,
            subtitle: "",
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: "https://doslink.com.vn/dinh-cu-canada-dau-tu-new-brunswick/",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "Đặt lịch tư vấn",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              },
            ],
          },
          {
            title: "Đầu tư Saskatchewan",
            image_url: IMAGE_DAT_LICH_TU_VAN_URL,
            subtitle: "",
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: "https://doslink.com.vn/dinh-cu-canada-dau-tu-saskatchewan/",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "Đặt lịch tư vấn",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              },
            ],
          },
          {
            title: "Đầu tư Nova Scotia",
            image_url: IMAGE_DAT_LICH_TU_VAN_URL,
            subtitle: "",
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: "https://doslink.com.vn/dinh-cu-canada-dau-tu-nova-scotia/",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "Đặt lịch tư vấn",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};

let getDinhCuTayNgheCanadaTemplate = (sender_psid) => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Chương trình liên bang - Express Entry",
            image_url: IMAGE_VISA_UC_URL,
            subtitle: "",
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: "https://doslink.com.vn/tong-quan-ve-chuong-trinh-express-entry/",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "Đặt lịch tư vấn",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              },
            ],
          },
          {
            title: "Chương trình để cử tỉnh bang PNP",
            image_url: IMAGE_DAT_LICH_TU_VAN_URL,
            subtitle: "",
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: "https://doslink.com.vn/tong-quan-ve-chuong-trinh-de-cu-tinh-bang/",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "Đặt lịch tư vấn",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              },
            ],
          },
          {
            title: "Chương trình Tech Pilot (B.C)",
            image_url: IMAGE_DAT_LICH_TU_VAN_URL,
            subtitle: "",
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: "https://doslink.com.vn/chuong-trinh-tech-pilot/",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "Đặt lịch tư vấn",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              },
            ],
          },
          {
            title: "Chương trình AIPP",
            image_url: IMAGE_DAT_LICH_TU_VAN_URL,
            subtitle: "",
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: "https://doslink.com.vn/chuong-trinh-dinh-cu-canada-aipp/",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "Đặt lịch tư vấn",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              },
            ],
          },
          {
            title: "Định cư tay nghề - Nhóm ngành y tế (AIPP)",
            image_url: IMAGE_DAT_LICH_TU_VAN_URL,
            subtitle: "",
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: "https://doslink.com.vn/dinh-cu-canada-lao-dong-tay-nghe-nhom-nganh-y-te-tai-new-brunswick/",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "f",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              },
            ],
          },
          {
            title: "Chương trình AIGP",
            image_url: IMAGE_DAT_LICH_TU_VAN_URL,
            subtitle: "Ở Vancouver",
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: "https://doslink.com.vn/du-hoc-dinh-cu-canada-theo-chuong-trinh-aigp/",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "Đặt lịch tư vấn",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              },
            ],
          },
          {
            title: "Chương trình RNIP",
            image_url: IMAGE_DAT_LICH_TU_VAN_URL,
            subtitle: "Ở Vancouver, BC",
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: "https://doslink.com.vn/dinh-cu-canada-chuong-trinh-rnip/",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "Đặt lịch tư vấn",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};
/**End Canada */

/*Úc*/
let getDinhCuDauTuUcTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Visa 188A",
            image_url: IMAGE_VISA_UC_URL,
            subtitle: "Doanh nhân sáng tạo",
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: "https://doslink.com.vn/dinh-cu-uc-visa-188-dau-tu-kinh-doanh-doanh-nhan-sang-tao/",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "Đặt lịch tư vấn",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              },
            ],
          },
          {
            title: "Visa 188B",
            image_url: IMAGE_DAT_LICH_TU_VAN_URL,
            subtitle: "Đầu tư trái phiếu Úc",
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: "https://doslink.com.vn/dinh-cu-uc-visa-188-kinh-doanh-dau-tu-trai-phieu/",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "Đặt lịch tư vấn",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              },
            ],
          },
          {
            title: "Visa 188C",
            image_url: IMAGE_DAT_LICH_TU_VAN_URL,
            subtitle: "Nhà đầu tư lớn",
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: "https://doslink.com.vn/dinh-cu-uc-visa-188-dien-dau-tu-kinh-doanh-nha-dau-tu-lon/",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "Đặt lịch tư vấn",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              },
            ],
          },
          {
            title: "Visa 188E",
            image_url: IMAGE_DAT_LICH_TU_VAN_URL,
            subtitle: "Doanh nhân khởi nghiệp",
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: "https://doslink.com.vn/dinh-cu-uc-visa-188e-doanh-nhan-khoi-nghiep/",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "Đặt lịch tư vấn",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              },
            ],
          },
          {
            title: "Visa 132A",
            image_url: IMAGE_DAT_LICH_TU_VAN_URL,
            subtitle: "Doanh nhân tài năng",
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: "https://doslink.com.vn/dinh-cu-uc-visa-132-dau-tu-kinh-doanh-doanh-nhan-tai-nang/",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "Đặt lịch tư vấn",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              },
            ],
          },
          {
            title: "Visa 132B",
            image_url: IMAGE_DAT_LICH_TU_VAN_URL,
            subtitle: "Quỹ đầu tư khởi nghiệp",
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: "https://doslink.com.vn/dinh-cu-uc-visa-132b-quy-dau-tu-khoi-nghiep/",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "Đặt lịch tư vấn",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};

let getDinhCuTayNgheUcTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Visa 491",
            image_url: IMAGE_VISA_UC_URL,
            subtitle: "Diện tay nghề vùng chỉ định",
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: "https://doslink.com.vn/dinh-cu-uc-visa-491-dien-tay-nghe-vung-chi-dinh-cap-nhat-thang-11-2019-thay-the-cho-visa-489/",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "Đặt lịch tư vấn",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              },
            ],
          },
          {
            title: "Visa 491/190 MINT",
            image_url: IMAGE_VISA_UC_URL,
            subtitle: "Đầu tư 9 tỷ đồng tại NT",
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: "https://doslink.com.vn/visa-491-190-mint-dien-tay-nghe-uc/",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "Đặt lịch tư vấn",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              },
            ],
          },
          {
            title: "Visa 491",
            image_url: IMAGE_VISA_UC_URL,
            subtitle: "SBO - Queensland Úc",
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: "https://doslink.com.vn/dinh-cu-uc-visa-491-sbo-queensland-uc/",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "Đặt lịch tư vấn",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              },
            ],
          },
          {
            title: "Visa 491",
            image_url: IMAGE_VISA_UC_URL,
            subtitle: "SBO - South Australia Úc",
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: "https://doslink.com.vn/visa-491-sbo-south-australia-uc/",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "Đặt lịch tư vấn",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              },
            ],
          },
          {
            title: "Visa 491",
            image_url: IMAGE_VISA_UC_URL,
            subtitle: "SBO - Tasmania Úc",
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: "https://doslink.com.vn/dinh-cu-uc-visa-491-sbo-tasmania-uc/",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "Đặt lịch tư vấn",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              },
            ],
          },
          {
            title: "Visa 190",
            image_url: IMAGE_VISA_UC_URL,
            subtitle: "Diện tay nghề bảo lãnh bang",
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: "https://doslink.com.vn/dinh-cu-uc-visa-190-dien-tay-nghe-skill-visa-bao-lanh-bang/",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "Đặt lịch tư vấn",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              },
            ],
          },
          {
            title: "Visa 189",
            image_url: IMAGE_VISA_UC_URL,
            subtitle: "Diện tay nghề độc lập",
            buttons: [
              {
                type: "web_url",
                title: "Xem chi tiết",
                url: "https://doslink.com.vn/dinh-cu-uc-visa-189-dien-tay-nghe-doc-lap-skill-visa/",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEBVIEW_BOOK_APPOINTMENT}`,
                title: "Đặt lịch tư vấn",
                webview_height_ratio: "tall",
                messenger_extensions: true, //false: open the webview in a new tab
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};
/*End Úc*/
