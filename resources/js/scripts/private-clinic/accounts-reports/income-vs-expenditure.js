//const { received } = require("laravel-mix/src/Log");

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
  var patient_id = url.substring(url.lastIndexOf('/') + 1);
  $.extend($.fn.dataTable.defaults, {
    responsive: true
  });

  var baseurl = window.location.origin;
  var assetPath = '../../../app-assets/',
    userView = 'app-user-view-account.html';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
    userView = assetPath + 'private-clinic/expense_category/';
  }

  var dtUserTable = $('.income-list-table');
  var expenditureTable = $('.expenditure-list-table');
  var dataTable;
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

  function initializeDataTable(path) {
    if (dataTable) {
      dataTable.destroy();
      // dtUserTable.empty(); 
    }

    dataTable = dtUserTable.DataTable({
      paging: false,
      // scrollY: '400px',
      scrollCollapse: false,
      searching: false,
      info: true,
      ajax: assetPath + path, // JSON file to add data
      columns: [
        { data: '' }, // Sr No
        { data: 'name' },
        { data: 'total' }
      ],
      columnDefs: [
        {
          targets: 0,
          render: function (data, type, full, meta) {
            return meta.row + 1;
          }
        },
        {
          targets: 1,
          render: function (data, type, full, meta) {
            return '<span class="text-nowrap">' + full.name + '</span>';
          }
        },
        {
          targets: 2,
          render: function (data, type, full, meta) {
            return '<span class="text-nowrap">' + full.total + '</span>';
          }
        }
      ],
      order: [[0, 'asc']],
      dom: 'Bfrtip',
      buttons: [
        { extend: 'copyHtml5', text: 'Copy Record', className: 'btn btn-primary' },
        { extend: 'print', text: 'Get Print', className: 'btn btn-primary', footer: true, title: 'Income Report', messageTop: 'The information in this table is copyright to R. Health Care.' },
        { extend: 'pdfHtml5', text: 'Make PDF', className: 'btn btn-primary', footer: true, title: 'Income List Report', messageTop: 'The information in this table is copyright to R. Health Care.', download: 'open' },
        { extend: 'csv', text: 'Make CSV File', className: 'btn btn-primary', footer: true, title: 'Income List Report', messageTop: 'The information in this table is copyright to R. Health Care.' },
        { extend: 'excel', text: 'Make Excel Sheet', className: 'btn btn-primary', footer: true, title: 'Income List Report', messageTop: 'The information in this table is copyright to R. Health Care.' }
      ],
      footerCallback: function (row, data, start, end, display) {
        var api = this.api();
        var total = api.column(2, { page: 'current' }).data().reduce(function (a, b) {
          return parseFloat(a) + parseFloat(b);
        }, 0);
        $(api.column(2).footer()).html(total.toFixed(2));
      }
    });
  }

  function resetButtonClasses() {
    $('#bill_to_btn').removeClass('btn-outline-primary').addClass('btn-primary');
    $('#payment_btn').removeClass('btn-outline-primary').addClass('btn-primary');
    $('#income_btn').removeClass('btn-outline-primary').addClass('btn-primary');
  }

  $('#filter_btn').on('click', function () {

    var start_date = $('#start_date').val();
    var end_date = $('#end_date ').val();
    var expense_path = 'private-clinic/accounts-report/get-expense-list/' + start_date + '/' + end_date;
    var isDateOK = checkDates(start_date, end_date);

    if (isDateOK) {
      initializeDataTable('private-clinic/accounts-report/get-income-list-bill-to-based/' + start_date + '/' + end_date, 'btn btn-primary');

      execute_expense_table(expense_path)
    }
  });

  $('#print_btn').on('click', function () {
    var start_date = $('#start_date').val();
    var end_date = $('#end_date').val();

    if (start_date && end_date) {
      // Extract the base URL (excluding any paths)
      var baseUrl = window.location.origin;

      // Concatenate the relative path to the base URL
      var fullUrl = `${baseUrl}/private-clinic/accounts-report/income_vs_expenditure_print/${start_date}/${end_date}`;

      // Open the URL in a new tab
      window.open(fullUrl, '_blank');
    } else {
      alert("Please select both start and end dates.");
    }
  });

  $('#export_btn').on('click', function () {
    var start_date = $('#start_date').val();
    var end_date = $('#end_date').val();

    if (start_date && end_date) {
      var baseUrl = window.location.origin;

      var fullUrl = `${baseUrl}/private-clinic/accounts-report/income_vs_expenditure_export/${start_date}/${end_date}`;

      window.open(fullUrl, '_blank');
    } else {
      alert("Please select both start and end dates.");
    }
  });

 
  function parseDate(dateString) {
    const [day, month, year] = dateString.split('-');
    return new Date(year, month - 1, day);
}
  function checkDates(startDate, endDate) {
    const start = parseDate(startDate);
    const end = parseDate(endDate);

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



  $('#bill_to_btn').on('click', function () {
    var start_date = $('#start_date').val();
    var end_date = $('#end_date ').val();
    var isDateOK = checkDates(start_date, end_date);
    if (isDateOK) {
      resetButtonClasses();
      $(this).removeClass('btn-primary').addClass('btn-outline-primary');
      initializeDataTable('private-clinic/accounts-report/get-income-list-bill-to-based/' + start_date + '/' + end_date);
    }
  });

  $('#payment_btn').on('click', function () {
    var start_date = $('#start_date').val();
    var end_date = $('#end_date ').val();
    var isDateOK = checkDates(start_date, end_date);
    if (isDateOK) {
      resetButtonClasses();
      $(this).removeClass('btn-primary').addClass('btn-outline-primary');
      $('#bill_to_btn').removeClass('btn-primary').addClass('btn-primary');
      initializeDataTable('private-clinic/accounts-report/get-income-list-payment-based/' + start_date + '/' + end_date);
    }
  });

  $('#income_btn').on('click', function () {
    var start_date = $('#start_date').val();
    var end_date = $('#end_date ').val();
    var isDateOK = checkDates(start_date, end_date);
    if (isDateOK) {
      resetButtonClasses();
      $(this).removeClass('btn-primary').addClass('btn-outline-primary');
      $('#bill_to_btn').removeClass('btn-primary').addClass('btn-primary');
      initializeDataTable('private-clinic/accounts-report/get-income-list-category-based/' + start_date + '/' + end_date);
    }
  });


  function execute_expense_table(path) {
    if ($.fn.DataTable.isDataTable('#expenditure-list-table')) {
      $('#expenditure-list-table').DataTable().destroy();
    }
    if (expenditureTable.length) {
      expenditureTable.DataTable({
        paging: false,
        // scrollY: '400px',
        scrollCollapse: false,
        searching: false,
        info: true,
        ajax: assetPath + path, // JSON file to add data
        columns: [
          // columns according to JSON
          { data: '' },                 //Sr No
          { data: 'name' },
          { data: 'total' }
          // { data: 'account_data.amount' }       
        ],
        columnDefs: [

          {
            targets: 0,
            responsivePriority: 3,
            render: function (data, type, full, meta) {
              var rowNumber = meta.row + 1;
              return rowNumber;
            }
          },
          {
            targets: 1,
            responsivePriority: 2,
            render: function (data, type, full, meta) {

              return '<span class="text-nowrap">' + full.name ?? "N/A" + '</span>';

            }
          },
          {
            targets: 2,
            title: 'Amount',
            render: function (data, type, full, meta) {

              return '<span class="text-nowrap">' + full.total ?? "N/A" + '</span>';
            }

          }
        ],
        // order: [[0, 'desc']],
        order: [[0, 'asc']],
        dom: 'Bfrtip',
        buttons: [
          { extend: 'copyHtml5', text: 'Copy Record', className: 'btn btn-primary' },
          { extend: 'print', text: 'Get Print', className: 'btn btn-primary', footer: true, title: 'Expenditure Report', messageTop: 'The information in this table is copyright to R. Health Care.' },
          { extend: 'pdfHtml5', text: 'Make PDF', className: 'btn btn-primary', footer: true, title: 'Expenditure Report', messageTop: 'The information in this table is copyright to R. Health Care.', download: 'open' },
          { extend: 'csv', text: 'Make CSV File', className: 'btn btn-primary', footer: true, title: 'Expenditure Report', messageTop: 'The information in this table is copyright to R. Health Care.' },
          { extend: 'excel', text: 'Make Excel Sheet', className: 'btn btn-primary', footer: true, title: 'Expenditure Report', messageTop: 'The information in this table is copyright to R. Health Care.' }
        ],

        footerCallback: function (row, data, start, end, display) {
          var api = this.api();

          // Calculate the total amount for all rows
          var total = api.column(2, { page: 'current' }).data().reduce(function (a, b) {
            return parseFloat(a) + parseFloat(b);
          }, 0);

          // Update the footer with the total amount
          $(api.column(2).footer()).html(total.toFixed(2));
        }



      });


    }
  }



});










