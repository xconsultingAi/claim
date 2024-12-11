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
   //var letter_id = url.substring(url.lastIndexOf('/') + 2);

   // Now you can use the 'id' variable in your code

  var dtUserTable = $('.user-list-table');
  var url = window.location.href;


  $(document).on('click', '.addletter', function() {
    window.location.href = '/private-clinic/patient/patient-letters/create/' + patient_id;
  });

  var baseurl = window.location.origin;
  var assetPath = '../../../app-assets/',
    userView = 'app-user-view-account.html';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
    userView = assetPath + 'private-clinic/patient/patient-letters/list/';
  }

  if (dtUserTable.length) {
    dtUserTable.DataTable({
      ajax: assetPath + 'private-clinic/patient/patient-letters/get-list/' + patient_id, // JSON file to add data
      columns: [
        // columns according to JSON
        { data: 'date' },
        { data: 'letter_type' },
        { data: 'template' },
        { data: 'description' },
        { data: 'created_at' },
        { data: '' }
      ],
      columnDefs: [


        // Update for Husband Father Name
        {
            targets: 0,
            responsivePriority: 3,
            render: function (data, type, full, meta) {

                // Parse the full date string into a Date object
                    var date = new Date(full['date']);
                    // Get the parts of the date (year, month, day)
                    var year = date.getFullYear();
                    var month = ("0" + (date.getMonth() + 1)).slice(-2); // Month is zero-based
                    var day = ("0" + date.getDate()).slice(-2);
                    // Construct the formatted date string (YYYY-MM-DD)
                    var formattedDate = day + '-' + month + '-' + year;
                    // Return the formatted date wrapped in a span with text-nowrap class
                    return '<span class="text-nowrap">' + formattedDate + '</span>';


               // return '<span class="text-nowrap">' + full['created_at'] + '</span>';
            }
        },
        {
          targets: 1,
          responsivePriority: 2,
          render: function (data, type, full, meta) {
              return '<span class="text-wrap">' + full.template.letter.name + '</span>';
          }
        },
        {
            targets: 2,
            responsivePriority: 2,
            render: function (data, type, full, meta) {
                // return '<span class="text-nowrap">' + full.template.name + '</span>';

                return '<a href="' +
                baseurl + '/private-clinic/patient/patient-letters/edit/' + patient_id + '/' + full.id + '?templateid=' + full.letter_template_id +
                '" class="dropdown-item" data-clinicalid="' + full.id + '">' +
                '<span class="text-wrap">' + full.template.name + '</span>' +
              '</a>';
            }
          },
  
          {
            targets: 3,
            responsivePriority: 1,
            render: function (data, type, full, meta) {
                return '<span class="text-wrap">' + full.description + '</span>';
            }
          },
          
          {
            targets: 4,
            responsivePriority: 1,
            visible: false,
            render: function (data, type, full, meta) {
                return '<span class="text-wrap">' + full.created_at + '</span>';
            }
          },
        

        {
          // Actions
          targets: -1,
          title: 'Actions',

          render: function (data, type, full, meta) {
            return (
              '<div class="btn-group">' +
              '<a class="btn btn-sm dropdown-toggle hide-arrow" data-bs-toggle="dropdown">' +
              feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
              '</a>' +
              '<div class="dropdown-menu dropdown-menu-end">' +
              '<a href="' +
              baseurl + '/private-clinic/patient/patient-letters/edit/' + patient_id + '/' + full.id + '?templateid=' + full.letter_template_id +
              '" class="dropdown-item" data-clinicalid="' + full.id + '">' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) +
              'Edit</a>' +

              '<a href="' +
              baseurl + '/private-clinic/patient/patient-letters/print/' + patient_id + '/' + full.id + '?templateid=' + full.letter_template_id +
              '" class="dropdown-item" target="_blank" data-templateid="' + full.letter_template_id + '">' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) +
              'Print</a>' +

              // '<div class="dropdown-menu dropdown-menu-end">' +
              '<a href="javascript:;" class="dropdown-item delete-record" data-templateid="' + full.letter_template_id + '" data-patient_id="' + patient_id + '" data-letter_id="' + full.id + '">' +
              feather.icons['trash-2'].toSvg({ class: 'font-small-4 me-50' }) +
              'Delete</a></div>' +
              '</div>' +
              '</div>'
            );
          }
        }
      ],
      order: [[4, 'desc']],
      dom:
        '<"d-flex justify-content-between align-items-center header-actions mx-2 row mt-75"' +
        '<"col-sm-12 col-lg-4 d-flex justify-content-center justify-content-lg-start" l>' +
        '<"col-sm-12 col-lg-8 ps-xl-75 ps-0"<"dt-action-buttons d-flex align-items-center justify-content-center justify-content-lg-end flex-lg-nowrap flex-wrap"<"me-2"f>B>>' +
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
  var letter_id = $(this).data('letter_id');
  var patient_id = $(this).data('patient_id');
  var templateid = $(this).data('templateid');
  // console.log(templateid);

  // Show a confirmation dialog before deleting
  Swal.fire({
    title: 'Are you sure?',
    text: "You want to delete this Letter!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    confirmButtonClass: 'btn btn-primary',
    cancelButtonClass: 'btn btn-danger ms-1',
    buttonsStyling: false
  }).then(function (result) {
    if (result.isConfirmed) {
      var csrfToken = $('meta[name="csrf-token"]').attr('content');
      $.ajax({
        url: baseurl + '/private-clinic/patient/patient-letters/delete/' + patient_id + '/' + letter_id + '/' + templateid,
        method: 'DELETE',
        headers: {
          'X-CSRF-TOKEN': csrfToken
        },
        success: function (response) {
          if (response.status == 'success') {
            Swal.fire({
              title: 'Success',
              text: 'Letter has been deleted successfully',
              icon: 'success',
              // confirmButtonText: 'OK'
              showConfirmButton: false,
              timer: 800
            });
            // Reload the DataTable with updated data
            $('#user-list-table').DataTable().ajax.reload();
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
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: 'Cancelled',
        text: 'Your letter is safe :)',
        icon: 'error',
        // confirmButtonText: 'OK'
        showConfirmButton: false,
        timer: 800
      });
    }
  });
});
