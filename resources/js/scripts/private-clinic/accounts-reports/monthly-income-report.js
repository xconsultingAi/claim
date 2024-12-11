//const { received } = require("laravel-mix/src/Log");

/*=========================================================================================
    File Name: monhtly income report.js
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

  var url = window.location.href;
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
  var dataTable;
  var url = window.location.href;
  var start_date = $('#start_date');
  var end_date = $('#end_date');


  if (start_date.length) {
    var start_date = start_date.flatpickr({
      enableTime: false,
      altFormat: 'F Y',
      dateFormat: 'm-Y',
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr('step', null);
        }
      },
      plugins: [new monthSelectPlugin({
        shorthand: true,
        dateFormat: "m-Y",
        altFormat: "F Y"
      })]
    });
  }


  if (end_date.length) {
    var end_date = end_date.flatpickr({
      enableTime: false,
      altFormat: 'F Y',
      dateFormat: 'm-Y',
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr('step', null);
        }
      },
      plugins: [new monthSelectPlugin({
        shorthand: true,
        dateFormat: "m-Y",
        altFormat: "F Y"
      })]
    });

  }

  function initializeDataTable(path) {
    if (dataTable) {
        dataTable.destroy();
    }

    function getSortableMonthYear(monthYear) {
        const months = {
            "January": "01",
            "February": "02",
            "March": "03",
            "April": "04",
            "May": "05",
            "June": "06",
            "July": "07",
            "August": "08",
            "September": "09",
            "October": "10",
            "November": "11",
            "December": "12"
        };
        const [month, year] = monthYear.split(' ');
        return year + months[month];
    }

    dataTable = dtUserTable.DataTable({
        paging: false,
        scrollCollapse: false,
        searching: false,
        info: true,
        ajax: {
            url: assetPath + path,
            dataSrc: function (json) {
                // Sort the data before returning it
                json.data.sort((a, b) => {
                    const aSortable = getSortableMonthYear(a.month);
                    const bSortable = getSortableMonthYear(b.month);
                    return aSortable.localeCompare(bSortable);
                });

                // Assign correct serial numbers after sorting
                json.data.forEach((item, index) => {
                    item.serialNumber = index + 1;
                });

                return json.data;
            }
        },
        columns: [
            { data: 'serialNumber', orderable: false },
            { data: 'month' },
            { data: 'total_invoice_amount' },
            { data: 'total_r_tax' },
            { data: 'total_waived_amount' },
            { data: 'total_amount' }
        ],
        columnDefs: [
            {
                targets: 0,
                render: function (data, type, full, meta) {
                    return data;
                }
            },
            {
                targets: 1,
                render: function (data, type, full, meta) {
                    return '<span class="text-nowrap">' + full['month'] + '</span>';
                }
            },
            {
                targets: 2,
                render: function (data, type, full, meta) {
                    return '<span class="text-nowrap">' + full.total_invoice_amount + '</span>';
                }
            },
            {
                targets: 3,
                render: function (data, type, full, meta) {
                    return '<span class="text-nowrap">' + full.total_r_tax + '</span>';
                }
            },
            {
                targets: 4,
                render: function (data, type, full, meta) {
                    return '<span class="text-nowrap">' + full.total_waived_amount + '</span>';
                }
            },
            {
                targets: 5,
                render: function (data, type, full, meta) {
                    return '<span class="text-nowrap">' + full.total_amount + '</span>';
                }
            }
        ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api();

            var floatVal = function (i) {
                return typeof i === 'string' ?
                    parseFloat(i.replace(/[\$,]/g, '')) :
                    typeof i === 'number' ?
                        i : 0;
            };

            var totalInvoiceAmount = api.column(2).data().reduce(function (a, b) {
                return floatVal(a) + floatVal(b);
            }, 0);

            var totalRTax = api.column(3).data().reduce(function (a, b) {
                return floatVal(a) + floatVal(b);
            }, 0);

            var totalWaivedAmount = api.column(4).data().reduce(function (a, b) {
                return floatVal(a) + floatVal(b);
            }, 0);

            var totalAmount = api.column(5).data().reduce(function (a, b) {
                return floatVal(a) + floatVal(b);
            }, 0);

            $(api.column(2).footer()).html(totalInvoiceAmount.toFixed(2));
            $(api.column(3).footer()).html(totalRTax.toFixed(2));
            $(api.column(4).footer()).html(totalWaivedAmount.toFixed(2));
            $(api.column(5).footer()).html(totalAmount.toFixed(2));
        },
        dom: 'Bfrtip',
        buttons: [
            { extend: 'copyHtml5', text: 'Copy Record', className: 'btn btn-primary' },
            { extend: 'print', text: 'Get Print', className: 'btn btn-primary', footer: true, title: 'Monthly Income Report', messageTop: 'The information in this table is copyright to R. Health Care.' },
            { extend: 'pdfHtml5', text: 'Make PDF', className: 'btn btn-primary', footer: true, title: 'Monthly Income Report', messageTop: 'The information in this table is copyright to R. Health Care.', download: 'open' },
            { extend: 'csv', text: 'Make CSV File', className: 'btn btn-primary', footer: true, title: 'Monthly Income Report', messageTop: 'The information in this table is copyright to R. Health Care.' },
            { extend: 'excel', text: 'Make Excel Sheet', className: 'btn btn-primary', footer: true, title: 'Monthly Income Report', messageTop: 'The information in this table is copyright to R. Health Care.' }
        ]
    });
}


  $('#filter_btn').on('click', function () {

    var start_date = $('#start_date').val();
    var end_date = $('#end_date ').val();
    var isDateOK = checkDates(start_date, end_date);

    if (isDateOK) {
      initializeDataTable('private-clinic/accounts-report/get-monthly-income-list/' + start_date + '/' + end_date, 'btn btn-primary');
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










