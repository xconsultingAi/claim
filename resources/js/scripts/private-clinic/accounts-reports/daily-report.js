/*=========================================================================================
    File Name: app-user-view.js
    Description: User View page
    --------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
var locations;
var baseurl = window.location.origin;
$(function () {
  ('use strict');

  // Extract the ID from the URL
  var url = window.location.href;

  var baseurl = window.location.origin;
  var assetPath = '../../../app-assets/',
    userView = 'app-user-view-account.html';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
    userView = assetPath + 'private-clinic/expense_category/';
  }

  var url = window.location.href;
  var start_date = $('#start_date');
  var end_date = $('#end_date');

  if (start_date.length) {
    var start_date = start_date.flatpickr({
      enableTime: false,
      altFormat: 'F j, Y',
      dateFormat: 'd-m-Y',
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr('step', null);
        }
      }
    });
  }

  if (end_date.length) {
    var end_date = end_date.flatpickr({
      enableTime: false,
      altFormat: 'F j, Y',
      dateFormat: 'd-m-Y',
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr('step', null);
        }
      }
    });
  }


  $('#filter_btn').on('click', function () {

    var start_date = $('#start_date').val();
    var end_date = $('#end_date ').val();
    var isDateOK = checkDates(start_date, end_date);

    if (isDateOK) {

      var baseUrl = window.location.origin;
      var fullUrl = `${baseUrl}/private-clinic/accounts-report/get-daily-report/${start_date}/${end_date}`;
      window.open(fullUrl, '_blank');
    }
  });

  $('#print_btn').on('click', function () {
    var start_date = $('#start_date').val();
    var end_date = $('#end_date').val();

    if (start_date && end_date) {

      var baseUrl = window.location.origin;

      var fullUrl = `${baseUrl}/private-clinic/accounts-report/get-daily-report/${start_date}/${end_date}`;

      window.open(fullUrl, '_blank');
    } else {
      alert("Please select both start and end dates.");
    }
  });


  function parseMonthYear(monthYear) {
    const [month, year] = monthYear.split('-');
    return new Date(year, month - 1, 1);
  }
  function checkDates(startDate, endDate) {
    const start = parseMonthYear(startDate);
    const end = parseMonthYear(endDate);

    if (end < start) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Date Range',
        text: 'End date cannot be earlier than start date.',
        confirmButtonText: 'OK'
      });
      return false;
    }
    return true;
  }


});
