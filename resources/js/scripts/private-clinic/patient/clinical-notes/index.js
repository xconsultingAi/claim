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




  var dtUserTable = $('.user-list-table');
  var url = window.location.href;
  var id = url.substring(url.lastIndexOf('/') + 1);
  statusObj = {
    'pending': { title: 'pending', class: 'badge-light-info' },
    'active': { title: 'active', class: 'badge-light-success' },
    'suspend': { title: 'suspend', class: 'badge-light-warning' },
    'in_active': { title: 'in_active', class: 'badge-light-secondary' },
    'trash': { title: 'trash', class: 'badge-light-danger' },
  };


  $(document).on('click', '.addclincalNotes', function () {
    window.location.href = '/private-clinic/patient/patient-clinical-notes/create/' + patient_id_clinical_notes;
  });

  var baseurl = window.location.origin;
  var assetPath = '../../../app-assets/',
    userView = 'app-user-view-account.html';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
    userView = assetPath + 'private-clinic/patient/patient-clinical-notes/get/';
  }

  function getPatientName() {
    var dataTable = dtUserTable.DataTable();
    var data = dataTable.row(0).data(); // Adjust the index as needed
    if (data && data.patient) {
      return 'Clinical Notes for ' + data.patient.firstname + ' ' + data.patient.lastname + ' (' + data.patient.id + ') ';
    }
    return 'Clinical Notes';
  }

  if (dtUserTable.length) {
    dtUserTable.DataTable({
      ajax: assetPath + 'private-clinic/patient/patient-clinical-notes/get-list/' + patient_id_clinical_notes, // JSON file to add data
      columns: [
        // columns according to JSON
        { data: 'clinical_notes_date' },
        { data: 'notes' },
        { data: '' }
      ],
      columnDefs: [
        // Update for Husband Father Name
        {
          targets: 0,
          responsivePriority: 3,
          render: function (data, type, full, meta) {
            var date = new Date(full['clinical_notes_date']);
            var year = date.getFullYear();
            var month = ("0" + (date.getMonth() + 1)).slice(-2);
            var day = ("0" + date.getDate()).slice(-2);
            var formattedDate = day + '-' + month + '-' + year;
            return '<span class="text-nowrap  text-center">' + formattedDate + '</span>';

          }
        },
        {
          targets: 1,
          responsivePriority: 2,
          render: function (data, type, full, meta) {
            return '<span class="text-wrap text-break" style="width:700px !important;">' + full['notes'] + '</span>';
          }
        },

        {
          // Actions
          targets: 2,
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
              baseurl + '/private-clinic/patient/patient-clinical-notes/edit/' + patient_id_clinical_notes + '/' + full.id +
              '" class="dropdown-item" data-clinicalid="' + full.id + '">' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) +
              'Edit</a>' +

              '<a href="javascript:;" class="dropdown-item delete-record" data-user_id="' + full.id + '">' +
              feather.icons['trash-2'].toSvg({ class: 'font-small-4 me-50' }) +
              'Delete</a></div>' +

              '</div>'
            );
          }
        },

        {
          targets: 3,
          responsivePriority: 2,
          visible: false,
          render: function (data, type, full, meta) {
            return '<span class="text-nowrap">' + full['created_at'] + '</span>';
          }
        },
      ],
      order: [[3, 'desc']],
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
      buttons: [
        {
          extend: 'collection',
          className: 'btn btn-outline-secondary dropdown-toggle me-2',
          text: feather.icons['external-link'].toSvg({ class: 'font-small-4 me-50' }) + 'Export',
          buttons: [
            {
              extend: 'print',
              // title: 'Clinical Notes' + full.patient.firstname + ' ' + full.patient.lastname + '('+ full.patient. id + ')',
              title: getPatientName,
              text: feather.icons['printer'].toSvg({ class: 'font-small-4 me-50' }) + 'Print',
              className: 'dropdown-item',
              exportOptions: { columns: [0, 1] }
            },
            {
              extend: 'csv',
              // title: 'Clinical Notes',
              title: getPatientName,
              text: feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) + 'Csv',
              className: 'dropdown-item',
              exportOptions: { columns: [0, 1] },
              messageTop: "test",
            },
            {
              extend: 'excel',
              // title: 'Clinical Notes',
              title: getPatientName,
              text: feather.icons['file'].toSvg({ class: 'font-small-4 me-50' }) + 'Excel',
              className: 'dropdown-item',
              exportOptions: { columns: [0, 1] },
              customize: function (xlsx) {
                var sheet = xlsx.xl.worksheets['sheet1.xml'];
                $('row c[r^="A1"], row c[r^="B1"]', sheet).attr('s', '2');
                $('row c[r^="C1"], row c[r^="D1"]', sheet).attr('s', '2');

              }
            },
            {
              extend: 'pdf',
              title: getPatientName,
              text: feather.icons['clipboard'].toSvg({ class: 'font-small-4 me-50' }) + 'Pdf',
              className: 'dropdown-item',
              exportOptions: { columns: [0, 1] },
              customize: function (doc) {
                doc.content[1].table.widths = '*';
                doc.styles.tableHeader = {
                  fillColor: '#4CAF50',
                  color: '#FFFFFF',
                  alignment: 'center',
                  bold: true
                };
                doc.styles.tableBodyEven = {
                  fillColor: '#f3f3f3'
                };
                doc.styles.tableBodyOdd = {
                  fillColor: '#ffffff'
                };
                doc.content[1].layout = {
                  hLineWidth: function () { return 0.5; },
                  vLineWidth: function () { return 0.5; },
                  hLineColor: function () { return '#aaaaaa'; },
                  vLineColor: function () { return '#aaaaaa'; }
                };
              }
            },
            {
              extend: 'copy',
              title: getPatientName,
              text: feather.icons['copy'].toSvg({ class: 'font-small-4 me-50' }) + 'Copy',
              className: 'dropdown-item',
              exportOptions: { columns: [0, 1] }
            }
          ],
          init: function (api, node, config) {
            $(node).removeClass('btn-secondary');
            $(node).parent().removeClass('btn-group');
            setTimeout(function () {
              $(node).closest('.dt-buttons').removeClass('btn-group').addClass('d-inline-flex mt-50');
            }, 50);
          }
        },
        {
          text: 'Add Clinical Note ',
          className: 'float-end border-0 text-white text-nowrap  bg-primary addclincalNotes btn'
        }
      ],

      language: {
        paginate: {
          previous: '&nbsp;',
          next: '&nbsp;'
        }
      },
    });
    $('.heading-wrapper').html('<h3 class="fw-bolder mb-0"> Notes</h3>');
  }

});



$(document).on('click', '.delete-record', function (e) {
  e.preventDefault();
  var dtUserTable = $('.user-list-table');
  var user_id = $(this).data('user_id');
  
  Swal.fire({
    title: 'Are you sure?',
    text: "You want to delete this user!",
    icon: 'warning', // Updated 'type' to 'icon'
    showCancelButton: true, // Updated from !0 to true
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
        url: baseurl + '/private-clinic/patient/patient-clinical-notes/delete/' + user_id,
        method: 'DELETE',
        headers: {
          'X-CSRF-TOKEN': csrfToken
        },
        success: function (response) {
          if (response.status == 'success') {
            Swal.fire({
              title: 'Success',
              text: 'Notes has been deleted successfully',
              icon: 'success',
              // confirmButtonText: 'OK'
              showConfirmButton: false,
              timer: 800
            }).then(function () {
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


