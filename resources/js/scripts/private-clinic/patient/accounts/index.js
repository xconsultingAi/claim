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

  var dtUserTable = $('.invoice-list-table');
  var receiptTable = $('.receipts-list-table');
  var url = window.location.href;




  $(document).on('click', '.add-invoice-btn', function () {
    window.location.href = '/private-clinic/patient/patient-accounts/add-invoice/' + patient_id;
  });
  $.extend($.fn.dataTable.defaults, {
    responsive: true
  });

  var baseurl = window.location.origin;
  var assetPath = '../../../app-assets/',
    userView = 'app-user-view-account.html';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
    userView = assetPath + 'private-clinic/patient/patient-accounts/get/';
  }

  if (dtUserTable.length) {
    dtUserTable.DataTable({
      ajax: assetPath + 'private-clinic/patient/patient-accounts/get-list/' + patient_id, // JSON file to add data
      columns: [
        // columns according to JSON
        { data: '' },                 //Sr No
        { data: 'id' },                 //Invoice No
        { data: 'invoice_date' },         //Date
        { data: 'patient_id' },         //patient
        // { data: 'code' },            //code
        { data: 'name' },
        { data: 'procedure_price' },    //Price
        { data: 'procedure_price' },    //paid
        { data: '' },                   //R-Tax
        { data: 'waived' },             //waived
        { data: 'balance' },            //Balance
        { data: 'status' },             //Status
        { data: '' }                    //Action
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

            return '<span class="text-nowrap"> Inv_' + full.account_data.id + '</span>';
            // return '<span class="text-nowrap">' + full['created_at'] + '</span>';
          }
        },
        {
          targets: 2,
          responsivePriority: 2,
          render: function (data, type, full, meta) {

            // Parse the full date string into a Date object
            var date = new Date(full.account_data.invoice_date);
            // Get the parts of the date (year, month, day)
            var year = date.getFullYear();
            var month = ("0" + (date.getMonth() + 1)).slice(-2); // Month is zero-based
            var day = ("0" + date.getDate()).slice(-2);
            // Construct the formatted date string (YYYY-MM-DD)
            var formattedDate = day + '-' + month + '-' + year;
            // Return the formatted date wrapped in a span with text-nowrap class
            return '<span class="text-nowrap">' + formattedDate + '</span>';
          }
        },
        {
          targets: 3,
          responsivePriority: 2,
          render: function (data, type, full, meta) {

            var rec_from = full.account_data.invoice_bill_to || '';
            var firstname = (full.account_data.patient && full.account_data.patient.firstname) || 'Unknown';
            var lastname = (full.account_data.patient && full.account_data.patient.lastname) || 'Unknown';
            var insuranceName = (full.insuranceName && full.insuranceName.name) || 'Unknown';
            var solicitorName = (full.solicitor && full.solicitor.display_name) || 'Solicitor not found';

            if(rec_from === "patient")
              {
                return '<span class="text-nowrap"> ' + firstname +' ' + lastname  + ' </span>';
              }
            else if (rec_from === "insurance_company")
              {
                return '<span class="text-nowrap"> ' + insuranceName + '</span>';
              }
            else
            {
              return '<span class="text-nowrap"> ' + solicitorName+ '</span>';
            }


            // return '<span class="text-nowrap"> Patient </span>';
            // return '<span class="text-nowrap">' + full['created_at'] + '</span>';
          }
        },
        // {
        //     targets: 4,
        //     responsivePriority: 2,
        //     render: function (data, type, full, meta) {

        //       // console.log(full.account_data.procedure.code);
        //       return '<span class="text-nowrap">' +  + ' </span>';
        //       // return '<span class="text-nowrap">' + full['created_at'] + '</span>';
        //     }
        // },
        {
          targets: 4,
          responsivePriority: 2,
          render: function (data, type, full, meta) {

            return '<span class="text-wrap">' + full['procedure'] + '</span>';
            // return '<span class="text-nowrap">' + full['created_at'] + '</span>';
          }
        },
        {
          targets: 5,
          responsivePriority: 2,
          render: function (data, type, full, meta) {

            var amount = full['procedure_price'].toFixed(2);
            return '<span class="text-nowrap">' + amount + '</span>';
            // return '<span class="text-nowrap">' + full['created_at'] + '</span>';
          }
        },
        {
          targets: 6,
          responsivePriority: 2,
          render: function (data, type, full, meta) {

            var TotalPrice = parseFloat(full['procedure_price']);
            var waivedAmount = parseFloat(full['waivedAmount']);
            var total_tax = parseFloat(full.account_data.r_tax ?? 0.00);

            var payable = TotalPrice - waivedAmount - total_tax;
            return '<span class="text-nowrap">' + payable.toFixed(2) + '</span>';
            // return '<span class="text-nowrap">' + full['created_at'] + '</span>';
          }
        },
        {
          targets: 7,
          responsivePriority: 2,
          render: function (data, type, full, meta) {

            var r_tax = parseFloat(full.account_data.r_tax) || 0;
            var formattedTax = r_tax.toFixed(2);
            formattedTax = r_tax ? formattedTax : "0.00";
            return '<span class="text-nowrap"> '+ formattedTax +' </span>';
            // return '<span class="text-nowrap">' + full['created_at'] + '</span>';
          }
        },
        {
          targets: 8,
          responsivePriority: 2,
          render: function (data, type, full, meta) {

            var waivedamount = full['waivedAmount']
            // console.log(full['waivedAmount']);
            return '<span class="text-nowrap">'+ waivedamount.toFixed(2) +'</span>';
          }
        },
        {
          targets: 9,
          responsivePriority: 2,
          render: function (data, type, full, meta) {

            var remaining_balance = parseFloat(full.account_data.balance);

            if (isNaN(remaining_balance)) {
              remaining_balance = 0;
          }
          return '<span class="text-nowrap">' + remaining_balance.toFixed(2) + '</span>';

          }
        },
        {
          targets: 10,
          responsivePriority: 2,
          render: function (data, type, full, meta) {
            var remaining_balance = parseFloat(full.account_data.balance);
            var TotalPrice        = parseFloat(full['procedure_price']);
            var waivedAmount      = parseFloat(full['waivedAmount']);
            var total_tax = parseFloat(full.account_data.r_tax ?? 0.00);
            var payable           = TotalPrice - waivedAmount - total_tax;


            if (isNaN(remaining_balance)) {
              remaining_balance = 0;
            }

          if(payable === remaining_balance)
            {
              return '<span class="text-nowrap"> <span class="badge bg-danger">Unpaid</span></span>';
            }
          else if(remaining_balance > 0 && remaining_balance < payable)
            {
              return '<span class="text-nowrap"><span class="badge bg-warning">Pending</span> </span>';
            }
            else if(remaining_balance === 0)
            {
              return '<span class="text-nowrap"><span class="badge bg-success">Cleared</span></span>';
            }
            else
            {
              return '<span class="text-nowrap"><span class="badge bg-warning">Error</span></span>';
            }
          }
        },

        {
          // Actions
          targets: -1,
          title: 'Actions',
          orderable: false,
          render: function (data, type, full, meta) {
            var balance = full.account_data.balance;
            var remaining_balance = isNaN(parseFloat(balance)) ? 0 : parseFloat(balance);
            var TotalPrice        = parseFloat(full['procedure_price']);
            var waivedAmount      = parseFloat(full['waivedAmount']);
            var total_tax         = parseFloat(full.account_data.r_tax ?? 0.00);
            var payable           = TotalPrice - waivedAmount - total_tax;
            // console.log(remaining_balance);
            return (
              '<div class="btn-group">' +
              '<a class="btn btn-sm dropdown-toggle hide-arrow" data-bs-toggle="dropdown">' +
              feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
              '</a>' +
              '<div class="dropdown-menu dropdown-menu-end">'
              +

               (remaining_balance === 0
                    ? ''
                    : '<a href="'+baseurl + '/private-clinic/patient/patient-accounts/create-receipt/' + patient_id + '/' + full.account_data.id + '" class="dropdown-item pay" data-invoice-id="' + full.account_data.id + '" data-patient-id="' + patient_id + '">' +
                    feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) +
                    'Pay</a>'
                )
              +

              // (remaining_balance > 0 && remaining_balance < payable
              //   ? ( remaining_balance === 0
              //       ? ''
              //       : '<a href="' + baseurl + '/private-clinic/patient/patient-accounts/edit-invoice/' + patient_id + '/' + full.account_data.id + '" class="dropdown-item pay" data-invoice-id="' + full.account_data.id + '" data-patient-id="' + patient_id + '">' + feather.icons['edit'].toSvg({ class: 'font-small-4 me-50' }) + 'Edit</a>' )
              //   : '')


              (remaining_balance === 0
                ? ''
                : (remaining_balance > 0 && remaining_balance < payable
                    ? ''
                    : '<a href="' + baseurl + '/private-clinic/patient/patient-accounts/edit-invoice/' + patient_id + '/' + full.account_data.id + '" class="dropdown-item pay" data-invoice-id="' + full.account_data.id + '" data-patient-id="' + patient_id + '">' + feather.icons['edit'].toSvg({ class: 'font-small-4 me-50' }) + 'Edit</a>' 
                    +
                    '<a href="javascript:;" class="dropdown-item delete-record" data-invoice-id="' + full.account_data.id + '" data-patient-id="' + patient_id + '">' +
                    feather.icons['trash-2'].toSvg({ class: 'font-small-4 me-50' }) +
                    'Delete</a>'
                  )

              )


              //  (remaining_balance === 0 && remaining_balance > 0 && remaining_balance < payable
              //       ? ''
              //       : '<a href="'+baseurl + '/private-clinic/patient/patient-accounts/edit-invoice/' + patient_id + '/' + full.account_data.id + '" class="dropdown-item pay" data-invoice-id="' + full.account_data.id + '" data-patient-id="' + patient_id + '">' +
              //       feather.icons['edit'].toSvg({ class: 'font-small-4 me-50' }) +
              //       'Edit</a>'
              //   )
              +
              '<a href="javascript:;" class="dropdown-item invoice-print" id="invoice-print" data-invoice-id="' + full.account_data.id + '" data-patient-id="' + patient_id + '">' +
              feather.icons['printer'].toSvg({ class: 'font-small-4 me-50' }) +
              'Print</a>' +
              '</div>' +
              '</div>'
            );
          }

        }
      ],
      order: [[0, 'desc']],
      dom:
        '<"d-flex justify-content-between align-items-center header-actions mx-2 row mt-75"' +
        '<"col-sm-12 col-lg-4 d-flex justify-content-center justify-content-lg-start" l>' +
        '<"col-sm-12 col-lg-8 ps-xl-75 ps-0"<"dt-action-buttons d-flex align-items-center justify-content-center justify-content-lg-end flex-lg-nowrap flex-wrap"<"me-1"f>B>>' +
        '>t' +
        '<"d-flex justify-content-between mx-2 row mb-1"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
      language: {
        sLengthMenu: 'Show _MENU_',
        search: 'Search',
        searchPlaceholder: 'Search..'
      },
      // Buttons with Dropdown
      buttons: [
        {
          text: '',
          className: ''
        }
      ],

      language: {
        paginate: {
          // remove previous & next text from pagination
          previous: '&nbsp;',
          next: '&nbsp;'
        }
      },
    });
  }

  if (receiptTable.length) {
    receiptTable.DataTable({
      ajax: assetPath + 'private-clinic/patient/patient-accounts/get-cleared-list/' + patient_id, // JSON file to add data
      columns: [
        // columns according to JSON
        { data: '' },                   //Sr No
        { data: 'id' },                 //Receipt No
        { data: 'created_at' },         //Date
        { data: 'id' },                 //Invoice No
        { data: 'bill_to' },            //Bill To
        { data: 'payment_mode' },       //Payment
        { data: '' },                   //R-Tax
        { data: 'waived' },             //waived
        { data: 'paid' },               //Paid
        { data: '' }                    //Action
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
// console.log(full.account_data );
            return '<span class="text-nowrap"> Rec_' + full.account_data.id + '</span>';
          }
        },
        {
          targets: 2,
          responsivePriority: 2,
          render: function (data, type, full, meta) {

            // Parse the full date string into a Date object
            var date = new Date(full.account_data.receipt_date);
            // Get the parts of the date (year, month, day)
            var year = date.getFullYear();
            var month = ("0" + (date.getMonth() + 1)).slice(-2); // Month is zero-based
            var day = ("0" + date.getDate()).slice(-2);
            // Construct the formatted date string (YYYY-MM-DD)
            var formattedDate = day + '-' + month + '-' + year;
            // Return the formatted date wrapped in a span with text-nowrap class
            return '<span class="text-nowrap">' + formattedDate + '</span>';
          }
        },
        {
          targets: 3,
          responsivePriority: 2,
          render: function (data, type, full, meta) {

            return '<span class="text-nowrap"> Inv_' + full.account_data.invoice_id + '</span>';
          }
        },
        {
          targets: 4,
          responsivePriority: 2,
          render: function (data, type, full, meta) {

            // return '<span class="text-nowrap"> ' + full.account_data.received_from + ' </span>';

            var rec_from = full.account_data.received_from || '';
            var firstname = (full.account_data.patient && full.account_data.patient.firstname) || 'Unknown';
            var lastname = (full.account_data.patient && full.account_data.patient.lastname) || 'Unknown';
            var insuranceName = (full.insuranceName && full.insuranceName.name) || 'Unknown';
            var solicitorName = (full.solicitor && full.solicitor.display_name) || 'Solicitor not found';

            if(rec_from === "patient")
              {
                return '<span class="text-nowrap"> ' + firstname +' ' + lastname  + ' </span>';
              }
            else if (rec_from === "insurance_company")
              {
                return '<span class="text-nowrap"> ' + insuranceName + '</span>';
              }
            else
            {
              return '<span class="text-nowrap"> ' + solicitorName+ '</span>';
            }

          }
        },
        {
          targets: 5,
          responsivePriority: 2,
          render: function (data, type, full, meta) {

            var pay_method = full.account_data.payment_mode;
            return '<span class="text-nowrap">' + pay_method + '</span>';
            // return '<span class="text-nowrap">' + full['created_at'] + '</span>';
          }
        },
        {
          targets: 6,
          responsivePriority: 2,
          render: function (data, type, full, meta) {

            return '<span class="text-nowrap"> 0.00 </span>';
          }
        },
        {
          targets: 7,
          responsivePriority: 2,
          render: function (data, type, full, meta) {

            return '<span class="text-nowrap"> 0.00 </span>';
          }
        },
        {
          targets: 8,
          responsivePriority: 2,
          render: function (data, type, full, meta) {
        
            return '<span class="text-nowrap">' + full.account_data.amount + '</span>'; //how much amount patient paid in this receipt
          }
        },
        {
          // Actions
          targets: -1,
          title: 'Actions',
          orderable: false,
          render: function (data, type, full, meta) {
            
            return (
              '<div class="btn-group">' +
              '<a class="btn btn-sm dropdown-toggle hide-arrow" data-bs-toggle="dropdown">' +
              feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
              '</a>' +
              '<div class="dropdown-menu dropdown-menu-end">' +
              '<a href="'+baseurl + '/private-clinic/patient/patient-accounts/edit-receipt/' + patient_id + '/' + full.account_data.invoice_id +'/' + full.account_data.id + '" class="dropdown-item" data-invoice-id="' + full.account_data.invoice_id + '" data-patient-id="' + patient_id + '" data-receipt-id="' + full.account_data.id + '">' +
              feather.icons['edit'].toSvg({ class: 'font-small-4 me-50' }) +
              'Edit</a>' +
              '<a href="javascript:;" class="dropdown-item receipt-print" data-invoice-id="' + full.account_data.invoice_id + '" data-patient-id="' + patient_id + '" data-receipt-id="' + full.account_data.id + '">' +
              feather.icons['printer'].toSvg({ class: 'font-small-4 me-50' }) +
              'Print</a>' +
              '<a href="javascript:;" class="dropdown-item delete-receipt" data-invoice-id="' + full.account_data.invoice_id + '" data-patient-id="' + patient_id + '" data-receipt-id="' + full.account_data.id + '" data-receipt-amount="' + full.account_data.amount + '">' +
              feather.icons['trash-2'].toSvg({ class: 'font-small-4 me-50' }) +
              'Delete</a>' +
              '</div>' +
              '</div>'
            );
          }

        },


      ],
      order: [[0, 'desc']],
      dom:
        '<"d-flex justify-content-between align-items-center header-actions mx-2 row mt-75"' +
        '<"col-sm-12 col-lg-4 d-flex justify-content-center justify-content-lg-start" l>' +
        '<"col-sm-12 col-lg-8 ps-xl-75 ps-0"<"dt-action-buttons d-flex align-items-center justify-content-center justify-content-lg-end flex-lg-nowrap flex-wrap"<"me-1"f>B>>' +
        '>t' +
        '<"d-flex justify-content-between mx-2 row mb-1"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
      language: {
        sLengthMenu: 'Show _MENU_',
        search: 'Search',
        searchPlaceholder: 'Search..'
      },
      // Buttons with Dropdown
      buttons: [
        {
          text: '',
          className: ''
        }
      ],

      language: {
        paginate: {
          // remove previous & next text from pagination
          previous: '&nbsp;',
          next: '&nbsp;'
        }
      },
    });
  }



});



// $(document).on('click', '.pay', function (e) {
//   e.preventDefault();
//   // Perform delete operation here
//   var patient_id = $(this).data('patient-id');
//   var invoice_id = $(this).data('invoice-id');
//   // Example: Show a confirmation dialog before deleting
//   Swal.fire({
//     title: 'Are you sure?',
//     text: "You want to Clear this invoice!",
//     type: 'warning',
//     showCancelButton: !0,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Yes, clear it!',
//     confirmButtonClass: 'btn btn-primary',
//     cancelButtonClass: 'btn btn-danger ms-1',
//     buttonsStyling: !1
//   }).then(function (t) {
//     var csrfToken = $('meta[name="csrf-token"]').attr('content');
//     $.ajax({
//       // url: baseurl + '/private-clinic/patient/patient-accounts/pay/' + patient_id + '/' + invoice_id,  //'/private-clinic/patient/patient-clinical-notes/pay/' + patient_id + '/' + full.account_data.id
//       url: baseurl + '/private-clinic/patient/patient-accounts/create-receipt/' + patient_id + '/' + invoice_id,
//       method: 'get',
//       headers: {
//         'X-CSRF-TOKEN': csrfToken
//       },
//       success: function (response) {
//         if (response.status == 'success') {
//           Swal.fire({
//             title: 'Success',
//             text: 'Invoice has been paid successfully',
//             icon: 'success',
//             confirmButtonText: 'OK'
//           });
//           location.reload();
//         } else {
//           Swal.fire({
//             title: 'failure',
//             text: 'There was an issue processing your request.',
//             icon: 'error',
//             confirmButtonText: 'OK'
//           });
//         }

//       },
//       error: function (xhr, status, error) {
//         Swal.fire({
//           title: 'error',
//           text: error,
//           icon: 'error',
//           confirmButtonText: 'OK'
//         });
//       }
//     });
//   });
// });


$(document).on('click', '.invoice-print', function (e) {
  e.preventDefault();
  var invoice_id = $(this).data('invoice-id');
  var patient_id = $(this).data('patient-id');
  var printUrl = baseurl + '/private-clinic/patient/patient-accounts/invoice-print/' + patient_id + '/' + invoice_id;
  var printWindow = window.open(printUrl, '_blank');
  // printWindow.onload = function () {
  //   printWindow.print();
  //   setTimeout(function () {
  //     printWindow.close();
  //   }, 1000);
  // };

});

$(document).on('click', '.receipt-print', function (e) {
  e.preventDefault();
  var invoice_id = $(this).data('invoice-id');
  var patient_id = $(this).data('patient-id');
  var receipt_id = $(this).data('receipt-id');
  var printUrl = baseurl + '/private-clinic/patient/patient-accounts/receipt-print/' + patient_id + '/' + invoice_id + '/' + receipt_id;
  var printWindow = window.open(printUrl, '_blank');
  printWindow.onload = function () {
    printWindow.print();
    setTimeout(function () {
      printWindow.close();
    }, 100);
  };

});




$(document).on('click', '.delete-record', function (e) {
  e.preventDefault();
  var dtUserTable = $('.invoice-list-table');
  // Perform delete operation here
  var patient_id = $(this).data('patient-id');
  var invoice_id = $(this).data('invoice-id');
  // Example: Show a confirmation dialog before deleting
  Swal.fire({
    title: 'Are you sure?',
    text: "You want to delete this invoice!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel', // Add cancel button text
    confirmButtonClass: 'btn btn-primary',
    cancelButtonClass: 'btn btn-danger ms-1',
    buttonsStyling: false
  }).then(function (result) { // Use 'result' instead of 't'
    if (result.isConfirmed) { // Check if the user clicked 'Yes'
      var csrfToken = $('meta[name="csrf-token"]').attr('content');
      $.ajax({
        url: baseurl + '/private-clinic/patient/patient-accounts/delete/' + patient_id + '/' + invoice_id,
        method: 'delete',
        headers: {
          'X-CSRF-TOKEN': csrfToken
        },
        success: function (response) {
          if (response.status == 'success') {
            Swal.fire({
              title: 'Success',
              text: 'Invoice has been deleted successfully',
              icon: 'success',
              // confirmButtonText: 'OK'
              showConfirmButton: false,
              timer: 800
            });
            dtUserTable.DataTable().ajax.reload(null, false);
          } else {
            Swal.fire({
              title: 'failure',
              text: response.message,
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        },
        error: function (xhr, status, error) {
          Swal.fire({
            title: 'error',
            text: error,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    }
  });
});


$(document).on('click', '.delete-receipt', function (e) {
  e.preventDefault();
  var receiptTable    = $('.receipts-list-table');
  var patient_id      = $(this).data('patient-id');
  var invoice_id      = $(this).data('invoice-id');
  var receipt_id      = $(this).data('receipt-id');
  var receipt_amount  = $(this).data('receipt-amount');

  // Example: Show a confirmation dialog before deleting
  Swal.fire({
    title: 'Are you sure?',
    text: "You want to delete this invoice!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel', // Add cancel button text
    confirmButtonClass: 'btn btn-primary',
    cancelButtonClass: 'btn btn-danger ms-1',
    buttonsStyling: false
  }).then(function (result) { // Use 'result' instead of 't'
    if (result.isConfirmed) { // Check if the user clicked 'Yes'
      var csrfToken = $('meta[name="csrf-token"]').attr('content');
      $.ajax({
        url: baseurl + '/private-clinic/patient/patient-accounts/delete-receipt/' + patient_id + '/' + invoice_id + '/' + receipt_id + '/' + receipt_amount,
        method: 'delete',
        headers: {
          'X-CSRF-TOKEN': csrfToken
        },
        success: function (response) {
          if (response.status == 'success') {
            Swal.fire({
              title: 'Success',
              text: 'Invoice has been deleted successfully',
              icon: 'success',
              // confirmButtonText: 'OK'
              showConfirmButton: false,
              timer: 800
            });
            receiptTable.DataTable().ajax.reload(null, false);
          } else {
            Swal.fire({
              title: 'failure',
              text: response.message,
              icon: 'error',
              confirmButtonText: 'OK'
              
            });
          }
        },
        error: function (xhr, status, error) {
          Swal.fire({
            title: 'error',
            text: error,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    }
  });
});


