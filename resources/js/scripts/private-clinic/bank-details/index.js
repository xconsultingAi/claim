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

  var dtUserTable = $('.bank-list-table');
  var url = window.location.href;




  $(document).on('click', '.add-bank-btn', function () {
    window.location.href = '/private-clinic/bank-details/create/';
  });
  $.extend($.fn.dataTable.defaults, {
    responsive: true
  });

  var baseurl = window.location.origin;
  var assetPath = '../../../app-assets/',
    userView = 'app-user-view-account.html';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
    userView = baseurl + '/private-clinic/bank-details/';
    // console.log(assetPath);
    // console.log(userView);
  }


  $.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });



  if (dtUserTable.length) {
    dtUserTable.DataTable({
      // ajax: baseurl + '/private-clinic/bank-details/get-list/', // JSON file to add data
      ajax: {
        url: assetPath + '/private-clinic/bank-details/get-list/',
        method: 'GET',
        xhrFields: {
            withCredentials: true // Ensure cookies are sent with the request
        }
      },
      columns: [
        // columns according to JSON
        { data: '' },                 //Sr No
        { data: 'bank_name' },        //patient
        { data: 'account_no' },       //code
        { data: 'status' },           //Status
        { data: '' }                  //Action
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

            return '<span class="text-nowrap">' + full['bank_name'] ?? "" + '</span>';
          }
        },
        {
          targets: 2,
          responsivePriority: 2,
          render: function (data, type, full, meta) {

            return '<span class="text-nowrap">' + full['account_no'] + '</span>';
          }
        },
        {
          targets: 3,
          responsivePriority: 2,
          render: function (data, type, full, meta) {
            return '<span class="text-nowrap"> ' + full['status']  ?? "" + ' </span>';
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
              '<div class="dropdown-menu dropdown-menu-end">'
              +

              '<a href="' + baseurl + '/private-clinic/bank-details/edit/' + full['id'] + '" class="dropdown-item pay" data-bank-id="' + full['id'] + '">' + feather.icons['edit'].toSvg({ class: 'font-small-4 me-50' }) + 'Edit</a>'
              +
              '<a href="javascript:;" class="dropdown-item delete-record" data-bank-id="' + full['id'] + '">' +
              feather.icons['trash-2'].toSvg({ class: 'font-small-4 me-50' }) +
              'Delete</a>' +
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


});


$(document).ready(function () {
    $.ajaxSetup({
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

  });




$(document).on('click', '.delete-record', function (e) {
  e.preventDefault();
  // Perform delete operation here
  var bank_id = $(this).data('bank-id');
  var dtUserTable = $('.bank-list-table');
  // console.log(bank_id);
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
        url: baseurl + '/private-clinic/bank-details/delete/' + bank_id,
        method: 'delete',
        headers: {
          'X-CSRF-TOKEN': csrfToken
        },
        success: function (response) {
          if (response.status == 'success') {
            Swal.fire({
              title: 'Success',
              text: 'Bank Account has been deleted successfully',
              icon: 'success',
              // confirmButtonText: 'OK'
              showConfirmButton: false,
              timer: 800
            });
            // location.reload();
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




