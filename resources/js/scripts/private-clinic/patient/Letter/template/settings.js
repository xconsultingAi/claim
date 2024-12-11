//const { received } = require("laravel-mix/src/Log");

/*=========================================================================================
    File Name: app-user-view.js
    Description: User View page
    --------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// setCustomPrintMargins('2cm', '2.5cm', '2.5cm', '2.5cm');
setCustomPrintMargins();
var patient_name = $('#patient_name').val();
var patient_id = $('#patient_id').val();
var baseurl = window.location.origin;
var browser = getBrowser();
$(document).ready(function () {
  document.title = patient_name + ' letter_' + getDatenow();
  function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
    }
  
    
    let pathname = window.location.pathname; 
    let pathParts = pathname.split('/');
    let id = pathParts[pathParts.length - 1];


    let urlParams = new URLSearchParams(window.location.search);
    let tempid = urlParams.get('templateid');


  let redirectionUrl = getQueryParam('redirectionUrl') ?? "";
  const url1 = redirectionUrl + '?id=' + id + '&Printed=true'+ '&PrintedTempID=' + tempid; // Redirect to this URL if print is completed
  const url2 = redirectionUrl; // Redirect to this URL if print is canceled or closed

  function initiatePrint() {
      window.onbeforeprint = function() {
          console.log("Print dialog opened.");
      };

      window.onafterprint = function() {
          setTimeout(function() {
            // console.log(url1);return;
              window.location.href = url1;
          }, 850);
      };

      window.print();

      setTimeout(function() {
          if (typeof window.onafterprint === 'undefined') {
            // console.log(url2);return;
              window.location.href = url2;
          }
       }, 1000); 
   }












  if(redirectionUrl !== "")
  {
    document.addEventListener('keydown', function(event) {
      if (event.ctrlKey && event.key === 'p') {
        event.preventDefault();
        initiatePrint();
      }
    });
  }
  else
  {

  }






  // document.addEventListener('keydown', function(event) {
  //   // Check if Ctrl+P was pressed
  //   if (event.ctrlKey && event.key === 'p') {
  //       event.preventDefault(); // Prevent default print dialog

  //       // Open print dialog
  //       window.onafterprint = function() {
  //           // Redirect after printing
  //           window.location.href = 'url1.html';
  //       };

  //       window.print(); // Open print dialog

  //       // Detect if the print dialog is closed without printing
  //       setTimeout(function() {
  //           window.onafterprint = function() {
  //               window.location.href = 'url2.html'; // Redirect if canceled
  //           };
  //       }, 1000);
  //   }
  // });

  // setTimeout(window.close, 100);
  if (browser === 'Chrome') {
    // console.log("chrome");
    // window.print()
    // setTimeout(function () {
    //   var baseurl = window.location.origin;
    //   document.location.href = baseurl + '/private-clinic/patient/patient-letters/list/' + patient_id;
    // }, 2000);
    
    // setTimeout(function () {
    //   var baseurl = window.location.origin;
    //   window.location.href = baseurl + '/private-clinic/patient/patient-letters/list/' + patient_id;
    // }, 2000);

  }
  else if (browser === 'Firefox') {
    // console.log("firefox");
    // window.print();
    // document.location.href = baseurl + '/private-clinic/patient/patient-letters/list/' + patient_id;
  }
  else {
    // console.log("nothing");
    // window.print();
    // document.location.href = baseurl + '/private-clinic/patient/patient-letters/list/' + patient_id;
  }
});

function getDatenow() {
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();

  //console.log("Current date and time:", year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

  var current = day + "_" + month + "_" + year + "_" + hours + "_" + minutes + "_" + seconds;

  return current;
}

function getBrowser() {
  var userAgent = navigator.userAgent;
  var browserName = "Unknown";

  if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = "Chrome";
  } else if (userAgent.match(/firefox|fxios/i)) {
    browserName = "Firefox";
  } else if (userAgent.match(/safari/i)) {
    browserName = "Safari";
  } else if (userAgent.match(/opr\//i)) {
    browserName = "Opera";
  } else if (userAgent.match(/edg/i)) {
    browserName = "Edge";
  } else if (userAgent.match(/trident/i)) {
    browserName = "Internet Explorer";
  }

  return browserName;
}

function setCustomPrintMargins() {
  var style = document.createElement('style');
  style.type = 'text/css';
  style.media = 'print';
  style.innerHTML = `
    @media print {
      @page {
        
        size: A4;
        margin-bottom: 0.1in; 
        margin-left: 0.5in;
        margin-top: 0.2in;
        margin-right: 0.5in;
      }
      body {
        margin: 0cm 0cm 0cm 0cm; 
      }
    }
  `;
  document.head.appendChild(style);
}

// function setCustomPrintMargins(top = '0.5cm', right = '0.3cm', bottom = '0.3cm', left = '0.5cm') {
//   var style = document.createElement('style');
//   style.type = 'text/css';
//   style.innerHTML = `
//     @media print {
//       @page {
//         margin: ${top} ${right} ${bottom} ${left};
//       }
//       body {
//         margin: ${top} ${right} ${bottom} ${left};
//       }
//     }
//   `;
//   document.head.appendChild(style);
// }


// function setCustomPrintMargins(top, right, bottom, left) {
//   var style = document.createElement('style');
//   style.type = 'text/css';
//   style.innerHTML = '@media print { @page { margin: ' + top + ' ' + right + ' ' + bottom + ' ' + left + '; } }';
//   document.head.appendChild(style);
// }

