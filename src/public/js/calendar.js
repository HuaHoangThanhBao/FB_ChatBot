const data = {
  monthDefault: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ],
  monthConvert: {
    "1" : "Jan",
    "2" : "Feb",
    "3" : "Mar",
    "4" : "Apr",
    "5" : "May",
    "6" : "Jun",
    "7" : "Jul",
    "8" : "Aug",
    "9" : "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec",
  },
  dayDefault: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
};

let jsonData = "";

var calendar = function (currentMonth, currentYear) {
  const calendar = document.getElementById("calendar");
  const lang = calendar.getAttribute("data-lang");
  const monthTHead = document.getElementById("thead-month");
  const monthAndYear = document.getElementById("monthAndYear");
  const monthAnhYearPassOne = document.getElementById('month-year-pass-one');
  const monthAnhYearPassTwo = document.getElementById('month-year-pass-two');
  const timePass = document.getElementById('time-pass');

  const previousBtn = document.getElementById("previous");
  const nextBtn = document.getElementById("next");

  let dayMonthYearStr = "";

  return {
    theadAttachment: function () {
      var $dataHead = "<tr>";
      for (dhead in data.dayDefault) {
        $dataHead +=
          "<th data-days='" +
          data.dayDefault[dhead] +
          "'>" +
          data.dayDefault[dhead] +
          "</th>";
      }
      $dataHead += "</tr>";

      monthTHead.innerHTML = $dataHead;
    },
    setupEventListener: function () {
      previousBtn.addEventListener("click", () => this.previous());
      nextBtn.addEventListener("click", () => this.next());
    },
    next: function () {
      currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      currentMonth = (currentMonth + 1) % 12;
      this.showCalendar(currentMonth, currentYear);
    },
    previous: function () {
      currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      this.showCalendar(currentMonth, currentYear);
    },
    assignDayMonthYearStr: function(){
      const dayFormat = new Date(dayMonthYearStr);
      const result = dayFormat.getDate()  + "/" + 
                    (dayFormat.getMonth() + 1 < 10 ? "0" + (dayFormat.getMonth() + 1).toString()
                    : dayFormat.getMonth() + 1) +
                     "/" + dayFormat.getFullYear();

      if(tabPages.currentIndex <= 0){
        monthAnhYearPassOne.innerHTML = "";
        monthAnhYearPassOne.innerHTML = result;
      }
      else{
        monthAnhYearPassTwo.innerHTML = "";
        monthAnhYearPassTwo.innerHTML = result;
      }
    },
    assignTimeStr: function(time){
      timePass.innerHTML = "";
      timePass.innerHTML = time;
    },
    getDayMonthYearStr: function(){
      return dayMonthYearStr;
    },
    showCalendar: function (month, year) {
      var firstDay = new Date(year, month).getDay();

      tbl = document.getElementById("calendar-body");
      tbl.innerHTML = "";
      monthAndYear.innerHTML = data.monthDefault[month] + ", " + year;

      // creating all cells
      var date = 1;
      for (var i = 0; i < 6; i++) {
        var row = document.createElement("tr");

        for (var j = 0; j < 7; j++) {
          if (i === 0 && j < firstDay) {
            cell = document.createElement("td");
            cellText = document.createTextNode("");
            cell.appendChild(cellText);
            row.appendChild(cell);
          } else if (date > this.daysInMonth(month, year)) {
            break;
          } else {
            cell = document.createElement("td");
            cell.setAttribute("data-date", date);
            cell.setAttribute("data-month", month + 1);
            cell.setAttribute("data-year", year);
            cell.setAttribute("data-month_name", data.monthDefault[month]);
            cell.className = "date-picker";
            cell.innerHTML = "<span>" + date + "</span>";

            if (
              date === today.getDate() &&
              year === today.getFullYear() &&
              month === today.getMonth()
            ) {
              cell.className = "date-picker selected";
            }
            else if(date < today.getDate()){
                if(month == today.getMonth())
                    cell.className = "date-picker disabled";
            }
            row.appendChild(cell);
            date++;
          }
        }
        tbl.appendChild(row);
      }

      const tds = [...document.querySelectorAll("td")];
      const prop = this;
      tds.forEach((element) => {
          const date = element.getAttribute('data-date');
          const month = element.getAttribute('data-month');
          const year = element.getAttribute('data-year');

          const canPick = element.classList.contains('disabled');
          
          appointmentFullCheck(date, month, year, element);

          if(!canPick){
            element.addEventListener("click", function () {
              ///Disable những ngày đã có người đăng ký
              //VD: 14/06/2021
              tabPages.timeBtns.forEach((element) => {
                element.classList.remove('time-disable')
              });

              if(jsonData != ""){
                const _dateStr = ((date < 10 ? "0" + date: date) + "/" + (month < 10 ? "0" + month: month) + "/" + year).toString();
                //console.log("temp: ", _dateStr);

                jsonData.appointments.forEach((element) => {
                  //console.log("date: ", element);

                  if(element.hasOwnProperty(_dateStr)){
                    //console.log('time: ', element[_dateStr].toString())

                    tabPages.timeBtns.forEach((_el) => {
                      //console.log("attr: ", _el.getAttribute('data-time'));

                      if(_el.getAttribute('data-time') == element[_dateStr].toString()){
                        //console.log('yes');
                        _el.classList.add('time-disable');
                      }
                    });
                  }
                })
              }


              dayMonthYearStr = data.monthConvert[month] + " " + date + " " + year;
              prop.assignDayMonthYearStr();
              
              tabPages.next(tabPages.currentIndex, tabPages.tabList)
            });
          }
      })
    },
    daysInMonth: function (iMonth, iYear) {
      return 32 - new Date(iYear, iMonth, 32).getDate();
    },
  };
};

function appointmentFullCheck(date, month, year, cell){
  //console.log('start check: ', jsonData.appointments);

  if(jsonData != ""){
    const _dateStr = ((date < 10 ? "0" + date: date) + "/" + (month < 10 ? "0" + month: month) + "/" + year).toString();
    //console.log("date: ", _dateStr);
    let count = 0;

    jsonData.appointments.forEach((element) => {
      //console.log("json date: ", element);
      if(element.hasOwnProperty(_dateStr)){
        if(element[_dateStr].toString() == "09:00") count++;
        if(element[_dateStr].toString() == "10:00") count++;
        if(element[_dateStr].toString() == "11:00") count++;
        if(element[_dateStr].toString() == "11:30") count++;
        if(element[_dateStr].toString() == "13:00") count++;
        if(element[_dateStr].toString() == "14:00") count++;
        if(element[_dateStr].toString() == "15:00") count++;
        if(element[_dateStr].toString() == "16:00") count++;
        if(element[_dateStr].toString() == "17:00") count++;
        if(element[_dateStr].toString() == "18:00") count++;
        if(element[_dateStr].toString() == "20:00") count++;
        if(element[_dateStr].toString() == "21:00") count++;
      }
    });

    //console.log("count: " + count);

    if(count == 12){
      //console.log("This time: " + _dateStr + " is full");
      cell.classList.add('full-booked')
    } 
  }
}

function tab(startIndex){
    this.currentIndex = startIndex;
    //this.activeEl();
    this.prevPageBtns.forEach((element) => {
        element.addEventListener('click', () => this.prev());
    })
    this.chooseBtns.forEach((element) => {
        element.addEventListener('click', () => {
          cal.assignTimeStr(element.value);
          this.next();
        });
    })
    this.timeBtns.forEach((element) => {
        element.setAttribute("data-time", element.innerHTML.toString());

        element.addEventListener('click', function(){

          cal.assignDayMonthYearStr();

          const arr = [...document.getElementsByClassName('btn-time')];
          arr.forEach((s) => {
              s.classList.remove('active')
          });

          this.classList.add("active");
        });
    });
}

tab.prototype.tabList = [...document.getElementsByClassName('wrapper')];
tab.prototype.prevPageBtns = [...document.getElementsByClassName('prevPage')];
tab.prototype.chooseBtns = [...document.getElementsByClassName('btn-choose')];
tab.prototype.timeBtns = [...document.getElementsByClassName('btn-time')];

tab.prototype.activeEl = function(){
    this.tabList.forEach((element, index) => {
        if(index != this.currentIndex)
            element.style.display = 'none';
        else element.style.display = 'block';
    })
}

tab.prototype.next = function(){
    this.currentIndex++;
    this.activeEl(this.currentIndex, this.tabList);
}

tab.prototype.prev = function(){
    this.currentIndex--;
    this.activeEl(this.currentIndex, this.tabList);
}


var tabPages;
var cal;

const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

window.onload = function(){
  fetch('https://doslink-chatbot.herokuapp.com/data.json')
    .then(response => response.json())
    .then(data => {
      jsonData = data;
      //console.log(jsonData);

      cal= new calendar(currentMonth, currentYear);
      cal.showCalendar(currentMonth, currentYear);
      cal.setupEventListener();
      cal.theadAttachment();

      tabPages = new tab(0);
  })
  .catch(error => {
    console.log(error);
  });
}
