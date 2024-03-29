// #date-input, #sumbit-btn, #output-box
const dateInput = document.querySelector('#date-input');
const sumbitBtn = document.querySelector('#sumbit-btn');
const outputBox = document.querySelector('#output-box');

function reverseStr(str){
    return str.split('').reverse().join('');
}

function isPalindrome(str){
    var reverse = reverseStr(str);
    return str === reverse;
}

function convertDateToStr(date) {
    var dateStr = { day: "", month: "", year: "" };
  
    if (date.day < 10) {
      dateStr.day = "0" + date.day;
    } else {
      dateStr.day = date.day.toString();
    }
  
    if (date.month < 10) {
      dateStr.month = "0" + date.month;
    } else {
      dateStr.month = date.month.toString();
    }
  
    dateStr.year = date.year.toString();
    return dateStr;
  }

function getAllDateFormats(date) {
    var dateStr = convertDateToStr(date);
  
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  }

function checkPalindromeForAllDateFormats(date) {
    var listOfPalindromes = getAllDateFormats(date);
  
    var flag = false;
  
    for (var i = 0; i < listOfPalindromes.length; i++) {
      if (isPalindrome(listOfPalindromes[i])) {
        flag = true;
        break;
      }
    }
  
    return flag;
  }
  
function isLeapYear(year) {
    if (year % 400 === 0) {
      return true;
    }
    if (year % 100 === 0) {
      return false;
    }
    if (year % 4 === 0) {
      return true;
    }
    return false;
  }
  
function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0 - 11
  
    if (month === 2) {
      if (isLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month++;
        }
      } else {
        if (day > 28) {
          day = 1;
          month++;
        }
      }
    } else {
      if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
      }
    }
  
    if (month > 12) {
      month = 1;
      year++;
    }
  
    return {
      day: day,
      month: month,
      year: year,
    };
  }

function getNextPalindromeDate(date){ 
    var nextDate = getNextDate(date);
    ctn = 0;

 while(1){
    ctn++
     var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
     if (isPalindrome) {
         break;
     }
     nextDate = getNextDate(nextDate);
 }
//  return nextDate
 return [ctn, nextDate];
}

function btnHandler(a){
    const bdayStr = dateInput.value; 

    if(bdayStr !== '') {
        var list = bdayStr.split('-');
        var date = {
            day: Number(list[2]),
            month: Number(list[1]),
            year: Number(list[0]),

        };
      var isPalindrome = checkPalindromeForAllDateFormats(date);
      if(isPalindrome) {
          outputBox.innerText = 'Yaay, You were born on a Polindrome date 🤩🥳 '
      } else{
          var [ctn, nextDate]  = getNextPalindromeDate(date);
          outputBox.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctn} days! 🙁🙁`
      }
      return [ctn, nextDate];
    }
    
}

sumbitBtn.addEventListener('click', btnHandler); 