(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "Messenger");

window.extAsyncInit = function () {
  MessengerExtensions.getContext('322095032738194',
    function success(thread_context) {
      // success
      //set psid
      const psidElement = document.getElementById('psid');
      psidElement.value = thread_context.psid;
      //$('#psid').val(thread_context.psid);
      handleCLickButtonDatLichTuVan();
    },
    function error(err) {
      // error
      console.log('Lỗi đặt lịch tư vấn: ' + err);
    }
  );
};

function validateInputFields() {
    const EMAIL_REG = /[a-zA-Z][a-zA-Z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}/g;
    
    const name = document.getElementById('customerName');
    const email = document.getElementById('customerEmail');
    const phone = document.getElementById('customerPhone');
    
    if (name.value == "") {
      name.classList.add("is-invalid");
      return true;
    } else {
      name.classList.remove("is-invalid");
    }

    if (!email.value.match(EMAIL_REG)) {
        email.classList.add("is-invalid");
        return true;
    } else {
        email.classList.remove("is-invalid");
    }

    if (phone.value === "") {
        phone.classList.add("is-invalid");
        return true;
    } else {
        phone.classList.remove("is-invalid");
    }
    return false;
}

function handleCLickButtonDatLichTuVan(){
    document.getElementById("btnDatLichTuVan").addEventListener("click", function(e) {

        let check = validateInputFields();
        let data = {
            psid: document.getElementById('psid').value,
            customerName: document.getElementById('customerName').value,
            customerEmail: document.getElementById('customerEmail').value,
            customerPhone: document.getElementById('customerPhone').value,
            ngayTuVan: document.getElementById('month-year-pass-two').innerHTML,
            gioTuVan: document.getElementById('time-pass').innerHTML,
        };

        if(!check) {
            //close webview
            MessengerExtensions.requestCloseBrowser(function success() {
                // webview closed
            }, function error(err) {
                // an error occurred
                console.log(err);
            });

            //send data to node.js server
            postData(`${window.location.origin}/book-appointment-ajax`, data);

            // $.ajax({
            //     url: `${window.location.origin}/book-appointment-ajax`,
            //     method: "POST",
            //     data: data,
            //     success: function(data) {
            //         console.log(data);
            //     },
            //     error: function(error) {
            //         console.log(error);
            //     }
            // })
        }
    });
}

async function getData(url){
  let page = await fetch(url);
  let json = await page.json();
  //console.log(json);
  jsonFetch = JSON.stringify(json);
}

async function postData(url, data){
  let headers =  {
      'Content-type': 'application/json; charset=UTF-8'
  };

  let request = {
      method:"POST",
      body: JSON.stringify(data),
      headers
  };

  let page = await fetch(url,request);
  // let json = await page.json();
  // console.log(json);
}


