
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




  var dtUserTable = $('.user-list-table');
  var url = window.location.href;
  var id = url.substring(url.lastIndexOf('/') + 1);


  $(".addNew").click(function () {
    window.location.pathname = '/private-clinic/patient/forms/create/' + patient_id;
  });

  var baseurl = window.location.origin;
  var assetPath = '../../../app-assets/',
    userView = 'app-user-view-account.html';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
    userView = assetPath + 'private-clinic/patient/forms/get/';
  }

  if (dtUserTable.length) {
    dtUserTable.DataTable({
      ajax: assetPath + 'private-clinic/patient/forms/get-list/' + patient_id, // JSON file to add data
      columns: [
        // columns according to JSON
        { data: 'date' },
        { data: 'template' },
        { data: 'description' },
        { data: 'form_type' },
        { data: '' }
      ],
      columnDefs: [


        // Update for Husband Father Name
        {
          targets: 0,
          responsivePriority: 2,
          render: function (data, type, full, meta) {
            return '<span class="text-nowrap">' + full['date'] + '</span>';
          }
        },
        {
          targets: 1,
          responsivePriority: 2,
          render: function (data, type, full, meta) {
            return '<span class="text-nowrap">' + full.template.name + '</span>';
          }
        },
        {
          targets: 2,
          responsivePriority: 2,
          render: function (data, type, full, meta) {
            return '<span class="text-nowrap">' + full['description'] + '</span>';
          }
        },
        {
          targets: 3,
          responsivePriority: 2,
          render: function (data, type, full, meta) {
            return '<span class="text-nowrap">' + full.template.form.name + '</span>';
          }
        },
        // {
        //   targets: 1, 
        //   responsivePriority: 2,
        //   render: function (data, type, full, meta) {
        //       return '<span class="text-nowrap">' + full['description'] + '</span>';
        //   }
        // },

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
              '<a href="' +
              baseurl + '/private-clinic/patient/forms/edit-form-template/' + full.id +
              '" class="dropdown-item" data-examination_id="' + full.id + '">' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) +
              'Edit</a>' +
              '<a href="' +
              baseurl + '/private-clinic/patient/forms/print/' + full.id +
              '" class="dropdown-item" data-examination_id="' + full.id + '">' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) +
              'Print</a>' +
              '<div class="dropdown-menu dropdown-menu-end">' +
              '<a href="javascript:;" class="dropdown-item delete-record" data-id="' + full.id + '">' +
              feather.icons['trash-2'].toSvg({ class: 'font-small-4 me-50' }) +
              'Delete</a></div>' +
              '</div>' +
              '</div>'
            );
          }
        }
      ],
      order: [[0, 'desc']],
      orderCellsTop: true,
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


$(document).on('click', '.delete-record', function (e) {
  e.preventDefault();
  var dtUserTable = $('.user-list-table');
  // Perform delete operation here
  var user_id = $(this).data('id');
  // Example: Show a confirmation dialog before deleting
  Swal.fire({
    title: 'Are you sure?',
    text: "You want to delete this user!",
    icon: 'warning', // Use 'icon' instead of 'type'
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    confirmButtonClass: 'btn btn-primary',
    cancelButtonClass: 'btn btn-danger ms-1',
    buttonsStyling: false
  }).then(function (result) {
    if (result.isConfirmed) { // Only proceed if confirmed
      var csrfToken = $('meta[name="csrf-token"]').attr('content');
      $.ajax({
        url: baseurl + '/private-clinic/patient/forms/delete/' + user_id,
        method: 'delete',
        headers: {
          'X-CSRF-TOKEN': csrfToken
        },
        success: function (response) {
          if (response.status === 'success') {
            Swal.fire({
              title: 'Success',
              text: 'User has been deleted successfully',
              icon: 'success',
              // confirmButtonText: 'OK'
              showConfirmButton: false,
              timer: 800
            });
            dtUserTable.DataTable().ajax.reload(null, false);
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

