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
   var patient_id_clinical_notes = url.substring(url.lastIndexOf('/') + 1);


  var dtUserTable = $('.Expense-list-table');
  var url = window.location.href;
  var id = url.substring(url.lastIndexOf('/') + 1);


  $(document).on('click', '.add-expense-btn', function() {
    window.location.href = '/private-clinic/expense-details/create/';
  });

  var baseurl = window.location.origin;
  var assetPath = '../../../app-assets/',
    userView = 'app-user-view-account.html';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
    userView = assetPath + 'private-clinic/patient/patient-clinical-notes/get/';
  }

  if (dtUserTable.length) {
    dtUserTable.DataTable({
      // ajax: assetPath + 'private-clinic/expense-details/get_espense_list/', // JSON file to add data
      ajax: {
        url: assetPath + 'private-clinic/expense-details/get_espense_list/',
        method: 'GET',
        xhrFields: {
            withCredentials: true // Ensure cookies are sent with the request
        }
      },
      columns: [
        // columns according to JSON
        { data: '' },                 //Sr No
        { data: 'id' },
        { data: 'category' },
        { data: 'expense_date' },
        { data: 'payment_mode' },
        { data: 'amount' },
        { data: '' }
      ],
      columnDefs: [
        
        // Update for Husband Father Name
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
            
              return '<span class="text-wrap text-break" style="width:700px !important;">' + full['id'] ?? "Not FOund" + '</span>';
          }
        },
        {
          targets: 2,
          responsivePriority: 2,
          render: function (data, type, full, meta) {
              return '<span class="text-wrap text-break" style="width:700px !important;">' +  (full.category && full.category.category_name ? full.category.category_name : "Not Found") + '</span>';
          }
        },
        {
          targets: 3,
          responsivePriority: 2,
          render: function (data, type, full, meta) {
            
            var date = new Date(full['expense_date']);
            var year = date.getFullYear();
            var month = ("0" + (date.getMonth() + 1)).slice(-2);
            var day = ("0" + date.getDate()).slice(-2);
            var formattedDate = day + '-' + month + '-' + year;
            return '<span class="text-nowrap  text-center">' + formattedDate ?? "Not Found" + '</span>';
          }
        },
        {
          targets: 4,
          responsivePriority: 2,
          render: function (data, type, full, meta) {
            
              return '<span class="text-wrap text-break" style="width:700px !important;">' + ucfirst(full['payment_mode']) ?? "Not Found" + '</span>';
          }
        },
        {
          targets: 5,
          responsivePriority: 2,
          render: function (data, type, full, meta) {
            
              return '<span class="text-wrap text-break" style="width:700px !important;">' + full['amount'] ?? '0.00' + '</span>';
          }
        },

        {
          // Actions
          targets: 6,
          title: 'Actions',
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="btn-group">' +
              '<a class="btn btn-sm dropdown-toggle hide-arrow" data-bs-toggle="dropdown">' +
              feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
              '</a>' +
              '<div class="dropdown-menu dropdown-menu-end">' +
              '<a href="' +
              baseurl + '/private-clinic/expense-details/edit/' + full.id +
              '" class="dropdown-item" data-expense_id="' + full.id + '">' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) +
              'Edit</a>' +

              '<a href="javascript:;" class="dropdown-item delete-record" data-expense_id="' + full.id + '">' +
              feather.icons['trash-2'].toSvg({ class: 'font-small-4 me-50' }) +
              'Delete</a></div>' +

              '</div>'
            );
          }
        },

        {
          targets: 7,
          responsivePriority: 2,
          visible: false,
          render: function (data, type, full, meta) {
              return '<span class="text-nowrap">' + full['created_at'] + '</span>';
          }
        },
      ],
      order: [[7, 'desc']],
      dom:
        '<"d-flex justify-content-between align-items-center header-actions mx-0 row mt-0"' +
        '<"col-sm-12 col-lg-4 col-md-4 d-flex justify-content-center justify-content-lg-start heading-wrapper" >' + 
        '<"col-sm-12 col-lg-3 col-md-3 d-flex justify-content-center justify-content-lg-start" l>' +
        '<"col-sm-12 col-lg-5 col-md-5 ps-xl-75 ps-0"<"dt-action-buttons d-flex align-items-center justify-content-center justify-content-lg-end flex-lg-nowrap flex-wrap"<"me-1"f>B>>' +
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
        text: 'Add Clinical Note ',
        className: 'float-end border-0 text-white rounded-pill px-3 bg-primary addclincalNotes btn btn-primary waves-effect waves-float waves-light'
        // id: '#prescriptionModal'
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
    $('.heading-wrapper').html('<h3 class="fw-bolder mb-0"> Notes</h3>');
  }

  function ucfirst(str) {
    if (typeof str !== 'string' || str.length === 0) {
        return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
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
  var dtUserTable = $('.Expense-list-table');
  var expense_id = $(this).data('expense_id');
  
  Swal.fire({
    title: 'Are you sure?',
    text: "You want to delete this Expense!",
    icon: 'warning',
    showCancelButton: true, 
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    confirmButtonClass: 'btn btn-primary',
    cancelButtonClass: 'btn btn-danger ms-1',
    buttonsStyling: false
  }).then(function (result) {
    if (result.isConfirmed) {
      var csrfToken = $('meta[name="csrf-token"]').attr('content');
      $.ajax({
        url: baseurl + '/private-clinic/expense-details/delete/' + expense_id,
        method: 'DELETE',
        headers: {
          'X-CSRF-TOKEN': csrfToken
        },
        success: function (response) {
          if (response.status == 'success') {
            Swal.fire({
              title: 'Success',
              text: 'Expense has been deleted successfully',
              icon: 'success',
              // confirmButtonText: 'OK'
              showConfirmButton: false,
              timer: 800
            }).then(function () {
              // location.reload();
              dtUserTable.DataTable().ajax.reload(null, false);
            });
          } else {
            Swal.fire({
              title: 'Failure',
              text: response.message,
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        },
        error: function (xhr, status, error) {
          Swal.fire({
            title: 'Error',
            text: error,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    }
  });
});


