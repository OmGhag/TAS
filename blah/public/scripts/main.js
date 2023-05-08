(function($) {

	"use strict";

	document.addEventListener('DOMContentLoaded', function(){
    var today = new Date(),
        year = today.getFullYear(),
        month = today.getMonth(),
        monthTag =["January","February","March","April","May","June","July","August","September","October","November","December"],
        day = today.getDate(),
        days = document.getElementsByTagName('td'),
        selectedDay,
        setDate,
        daysLen = days.length;
// options should like '2014-01-01'
    function Calendar(selector, options) {
        this.options = options;
        this.draw();
    }
    

    
    Calendar.prototype.draw  = function() {
        this.getCookie('selected_day');
        this.getOptions();
        this.drawDays();
        var that = this,
            reset = document.getElementById('reset'),
            pre = document.getElementsByClassName('pre-button'),
            next = document.getElementsByClassName('next-button');
            
            pre[0].addEventListener('click', function(){that.preMonth(); });
            next[0].addEventListener('click', function(){that.nextMonth(); });
            // reset.addEventListener('click', function(){that.reset(); });
        while(daysLen--) {
            days[daysLen].addEventListener('click', function(){that.clickDay(this); });
        }
    };
    
    Calendar.prototype.drawHeader = function(e) {
        var headDay = document.getElementsByClassName('head-day'),
            headMonth = document.getElementsByClassName('head-month');

            e?headDay[0].innerHTML = e : headDay[0].innerHTML = day;
            headMonth[0].innerHTML = monthTag[month] +" - " + year;        
     };
    
    Calendar.prototype.drawDays = function() {
        var startDay = new Date(year, month, 1).getDay(),

            nDays = new Date(year, month + 1, 0).getDate(),
    
            n = startDay;

        for(var k = 0; k <42; k++) {
            days[k].innerHTML = '';
            days[k].id = '';
            days[k].className = '';
        }

        for(var i  = 1; i <= nDays ; i++) {
            days[n].innerHTML = i; 
            n++;
        }
        
        for(var j = 0; j < 42; j++) {
            if(days[j].innerHTML === ""){
                
                days[j].id = "disabled";
                
            }else if(j === day + startDay - 1){
                if((this.options && (month === setDate.getMonth()) && (year === setDate.getFullYear())) || (!this.options && (month === today.getMonth())&&(year===today.getFullYear()))){
                    this.drawHeader(day);
                    days[j].id = "today";
                }
            }
            if(selectedDay){
                if((j === selectedDay.getDate() + startDay - 1)&&(month === selectedDay.getMonth())&&(year === selectedDay.getFullYear())){
                days[j].className = "selected";
                this.drawHeader(selectedDay.getDate());
                }
            }
        }
    };
    
    Calendar.prototype.clickDay = function(o) {
        var selected = document.getElementsByClassName("selected"),
            len = selected.length;
        if(len !== 0){
            selected[0].className = "";
        }
        o.className = "selected";
        selectedDay = new Date(year, month, o.innerHTML);
        this.drawHeader(o.innerHTML);
        this.setCookie('selected_day', 1);
        
    };





    
    Calendar.prototype.preMonth = function() {
        if(month < 1){ 
            month = 11;
            year = year - 1; 
        }else{
            month = month - 1;
        }
        this.drawHeader(1);
        this.drawDays();
    };
    
    Calendar.prototype.nextMonth = function() {
        if(month >= 11){
            month = 0;
            year =  year + 1; 
        }else{
            month = month + 1;
        }
        this.drawHeader(1);
        this.drawDays();
    };
    
    Calendar.prototype.getOptions = function() {
        if(this.options){
            var sets = this.options.split('-');
                setDate = new Date(sets[0], sets[1]-1, sets[2]);
                day = setDate.getDate();
                year = setDate.getFullYear();
                month = setDate.getMonth();
        }
    };
    
     Calendar.prototype.reset = function() {
         month = today.getMonth();
         year = today.getFullYear();
         day = today.getDate();
         this.options = undefined;
         this.drawDays();
     };
    
    Calendar.prototype.setCookie = function(name, expiredays){
        if(expiredays) {
            var date = new Date();
            date.setTime(date.getTime() + (expiredays*24*60*60*1000));
            var expires = "; expires=" +date.toGMTString();
        }else{
            var expires = "";
        }
        document.cookie = name + "=" + selectedDay + expires + "; path=/";
    };
    
    Calendar.prototype.getCookie = function(name) {
        if(document.cookie.length){
            var arrCookie  = document.cookie.split(';'),
                nameEQ = name + "=";
            for(var i = 0, cLen = arrCookie.length; i < cLen; i++) {
                var c = arrCookie[i];
                while (c.charAt(0)==' ') {
                    c = c.substring(1,c.length);
                    
                }
                if (c.indexOf(nameEQ) === 0) {
                    selectedDay =  new Date(c.substring(nameEQ.length, c.length));
                }
            }
        }
    };
    var calendar = new Calendar();
    
        
}, false);

})(jQuery);

async function rtget(){



// pop-up
// const form = document.querySelector('teacher-form');
//form.addEventListener("submit",async(event))
//const select = document.querySelector('#teacher-select');
//const submitButton = document.querySelector('#Check1');
const btn = document.getElementById("Check1");
if(btn){
    console.log("Hello");

    // Prevent the form from submitting
    // event.preventDefault();
    // Get the form data
    //const FROM_DATE =document.getElementById("#options").value;
    const FROM_DATE = "2023-05-03";
    // var TO_DATE =document.getElementById("options");
    var T_CODE = document.getElementById('teacher-select');
    var FROM_TIME = document.getElementById('from-time');
    var TO_TIME = document.getElementById('to-time');
    var DEPT = document.getElementById('department');
    var tc = T_CODE.value;
    var tT = TO_TIME.value;
    var FT = FROM_TIME.value;
    console.log( FROM_DATE);
    // console.log( TO_DATE.value);
    console.log( FROM_TIME.value);
    console.log( TO_TIME.value);
    console.log( T_CODE.value);
    console(JSON.stringify({FROM_DATE,FT,tT,tc}))
    //const DATE = document.getElementById('#date').value;
    if (T_CODE.value == '' && T_CODE.value == 'a'){
        warn_popup();
    }
    else{
        const response =  await fetch(`http://localhost:3331/usersid`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({FROM_DATE,FT,tT,tc}),
        });
        //const response = await fetch(`/TAS/usersid?teacher-select=${T_CODE}&from-time=${FROM_TIME}&to-time=${TO_TIME}&department=${DEPT}`);
        const data = await response.json();
        console.log("Hello");
        if(data.json[0]['available']===true){
           popup();
        }
        else{
            error_popup();
        }
       
    }
}
btn.addEventListener('click', async(event) => {
    console.log("Hello");
    // Prevent the form from submitting
    // event.preventDefault();
    // Get the form data
    //const FROM_DATE =document.getElementById("#options").value;
    const FROM_DATE = "2023-05-03";
    const TO_DATE =document.getElementById("#options").value;
    const T_CODE = document.getElementById('#teacher-select').value;
    const FROM_TIME = document.getElementById('#from-time').value;
    const TO_TIME = document.getElementById('#to-time').value;
    const DEPT = document.getElementById('#department').value;
    console.log( FROM_DATE.value);
    console.log( TO_DATE.value);
    console.log( FROM_TIME.value);
    console.log( TO_TIME.value);
    console.log( T_CODE.value);
    //const DATE = document.getElementById('#date').value;
    if (T_CODE.value == '' && T_CODE.value == 'a'){
        warn_popup();
    }
    else{
        const response = await fetch(`/TAS/usersid?teacher-select=${T_CODE}&from-time=${FROM_TIME}&to-time=${TO_TIME}&department=${DEPT}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({FROM_DATE,TO_DATE,FROM_TIME,TO_TIME,T_CODE}),
        });
        //const response = await fetch(`/TAS/usersid?teacher-select=${T_CODE}&from-time=${FROM_TIME}&to-time=${TO_TIME}&department=${DEPT}`);
        const data = await response.json();
        console.log("Hello");
        if(data.json[0]['available']===true){
           popup();
        }
        else{
            error_popup();
        }
       
    }
});
    
}

function popup(){
    //if condition for available is true then run this pop up
    {
    swal({
        title: "Yes!",
        text: "The Faculty is available!",
        icon: "success",
        button: "Ok!",
      });}
    }
function error_popup(){
      { //if condition false run this pop up
        swal({
            title: "Sorry!",
            text: "The Faculty is not available!",
            icon: "error",
            button: "Try Again!",
          });} 
    
}
function warn_popup(){
    { // if none of the value is selected for teachers
        swal({
            title: "Warning!",
            text: "Please first select the above details!",
            icon: "warning",
            button: "Try Again!",
          });} 
}
