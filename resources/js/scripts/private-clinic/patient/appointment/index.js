/*=========================================================================================
    File Name: patient-appointment-list.js
    Description: User List page
    --------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent

==========================================================================================*/

$(function () {



  ('use strict');
  var dtPendingIndentTable = $('.patient-list-table'),
    newUserSidebar = $('.new-user-modal'),
    newUserForm = $('.add-new-user'),
    select = $('.select2'),
    dtContact = $('.dt-contact'),
    statusObj = {
      'pending': { title: 'pending', class: 'badge-light-info' },
      'approved': { title: 'approved', class: 'badge-light-success' },
      'cancelled': { title: 'cancelled', class: 'badge-light-danger' },
    };

  var baseurl = window.location.origin;
  var assetPath = '../../../app-assets/',
    userView = 'app-user-view-account.html';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
    userView = assetPath + 'app/user/view/account';
  }

  //getting id from url
  var patientID = $('#pateint_ID').val();
  // console.log(patientID);
  // var path = window.location.pathname; // "/resource/123"
  // patientID = path.match(/\d+/); // ["123"]
  // patientID = patientID ? parseInt(patientID[0], 10) : null; // 123

  // Patient Visit List datatable
  if (dtPendingIndentTable.length) {
    DataTableListing(dtPendingIndentTable, 'pending', assetPath);
  }

  // Get the button element by its ID using jQuery
  var addAppointmentButton = $('.addAppointmentButton');

  // Add an event listener to the button using jQuery
  addAppointmentButton.on('click', function () {
    window.location.href = baseurl + '/private-clinic/patient/patient-appointment/create-appointment/' + patientID;
  });
  // Add event listener for the Send Mail button
  //  $(document).on('click', '.send-mail', function () {
  //   var appointmentID = $(this).data('id');
  //   window.location.href = baseurl + '/private-clinic/patient/appointment/send-mail/' + appointmentID;
  // });



  function DataTableListing(dtObject, status, assetPath) {

    dtObject.DataTable({
      ajax: assetPath + 'private-clinic/patient/patient-appointment/list/' + patientID, // JSON file to add data
      columns: [
        // columns according to JSON
        { data: 'id' },
        { data: 'title' },
        { data: 'hospital' },
        { data: 'location' },
        { data: 'start' },
        { data: 'start' },
        { data: 'status' },
        { data: ' ' }
      ],
      columnDefs: [
        {
          targets: 0,
          render: function (data, type, full, meta) {
            return "<span class='text-truncate align-middle text-wrap'>" + (meta.row + 1) + "</span>";
          },
        },
        {
          targets: 1,
          render: function (data, type, full, meta) {
            var title = full['title'] ?? ' ';
            return "<span class='text-truncate align-middle text-wrap'>" + title.substring() + "</span>";
            // return "<span class='text-truncate align-middle'>" + title + "</span>";
          },
        },
        // {
        //   targets: 1,
        //   render: function (data, type, full, meta) {
        //     // var $title = full['title'];
        //     //   return "<span class='text-truncate align-middle'>" + $title.substring(0, 20); + '</span>';

        //     var time = full.start.split(' ')[1];
        //     return "<span class='text-truncate align-middle text-wrap'>" + time + "</span>";

        //   }
        // },
        // {
        //   // User Role
        //   targets: 2,
        //   render: function (data, type, full, meta) {
        //     var $type = full.type;

        //     return "<span class='text-truncate align-middle text-wrap'>" + $type + '</span>';
        //   }
        // },
        {
          targets: 2,
          render: function (data, type, full, meta) {

            var branch_name = full.branch.name;
            return '<span class="text-wrap ">' + branch_name + ' </span>';

          }
        },
        {
          targets: 3,
          render: function (data, type, full, meta) {
            var branch_address = full.branch.address;
            return '<span class="text-wrap"> ' + branch_address + ' </span>';
          }
        },
        {
          targets: 4,
          render: function (data, type, full, meta) {
            var date = full.start.split(' ')[0];

            var dateObj = new Date(date);
            var day = dateObj.getDate();
            var month = dateObj.getMonth() + 1;
            var year = dateObj.getFullYear();
            day = day < 10 ? '0' + day : day;
            month = month < 10 ? '0' + month : month;

            return "<span class='text-truncate align-middle'>" + day + "-" + month + "-" + year + "</span>";

          }
        },
        {
          targets: 5,
          render: function (data, type, full, meta) {
            var time = full.start.split(' ')[1];
            var [hours, minutes] = time.split(':');
            var formattedTime = `${hours}:${minutes}`;
            return "<span class='text-truncate align-middle text-wrap'>" + formattedTime + "</span>";

          }
        },
        {
          targets: 6,
          render: function (data, type, full, meta) {
            var $status = full.status.name;
            return '<span class="text-nowrap">' + $status + '</span>';
          }
        },
        {
          targets: -1,
          title: 'Actions',
          orderable: false,
          render: function (data, type, full, meta) {
            var actionLink = '<div class="btn-group">' +
              '<a class="btn btn-sm dropdown-toggle hide-arrow" data-bs-toggle="dropdown">' +
              feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
              '</a>' +
              '<div class="dropdown-menu dropdown-menu-end">' +
              '<a href="' + baseurl + '/private-clinic/patient/patient-appointment/edit/' + full.id + '/' + patientID + '?fullId=' + full.id + '&openModal=true" class="dropdown-item open-modal">' +
              feather.icons['edit'].toSvg({ class: 'font-small-4 me-50' }) +
              'Edit</a>' +
              '<a href="#" class="dropdown-item send-mail" data-id="' + full.id + '">' +
              feather.icons['mail'].toSvg({ class: 'font-small-4 me-50' }) +
              'Send Mail</a>' +
              '</div>' +
              '</div>';
            return actionLink;
          }
        }
      ],
      order: [[0, 'desc']],
      dom:
        '<"d-flex justify-content-between align-items-center header-actions mx-0 row mt-0"' +
        '<"col-sm-12 col-lg-4 col-md-4 d-flex justify-content-center justify-content-lg-start heading-wrapper" >' +
        '<"col-sm-12 col-lg-3 col-md-3 d-flex justify-content-center justify-content-lg-start" >' +  //l
        '<"col-sm-12 col-lg-5 col-md-5 ps-xl-75 ps-0"<"dt-action-buttons d-flex align-items-center justify-content-center justify-content-lg-end flex-lg-nowrap flex-wrap"<"me-1"f>B>>' +
        '>t' +
        '<"d-flex justify-content-between mx-2 row mb-1"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
      // '<"d-flex justify-content-between align-items-center header-actions mx-2 row "' +
      // '<"col-sm-12 col-lg-4 d-flex justify-content-center justify-content-lg-start" >' +
      // '<"col-sm-12 col-lg-8 ps-xl-75 ps-0"<"dt-action-buttons d-flex align-items-center justify-content-center justify-content-lg-end flex-lg-nowrap flex-wrap"<"mb-2  mx-2"f>B>>' +
      // '>t' +
      // '<"d-flex justify-content-between mx-2 row mb-1"' +
      // '<"col-sm-12 col-md-6"i>' +
      // '<"col-sm-12 col-md-6"p>' +
      // '>',
      language: {
        sLengthMenu: 'Show _MENU_',
        search: 'Search',
        searchPlaceholder: 'Search..'
      },
      // Buttons with Dropdown
      buttons: [
        {
          text: 'Add Appointments',
          // id: '#addAppointmentButton',
          className: 'addAppointmentButton float-end border-0 text-white rounded-pill px-3 bg-primary btn btn-primary waves-effect waves-float waves-light'

        }
      ],
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['full_name'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.columnIndex !== 6
                ? '<tr data-dt-row="' +
                col.rowIdx +
                '" data-dt-column="' +
                col.columnIndex +
                '">' +
                '<td>' +
                col.title +
                ':' +
                '</td> ' +
                '<td>' +
                col.data +
                '</td>' +
                '</tr>'
                : '';
            }).join('');
            return data ? $('<table class="table"/>').append('<tbody>' + data + '</tbody>') : false;
          }
        }
      },
      language: {
        paginate: {
          // remove previous & next text from pagination
          previous: '&nbsp;',
          next: '&nbsp;'
        }
      },
    });
    $('.heading-wrapper').html('<h3 class="fw-bolder mb-0"> Appointments</h3>');
  }
});
