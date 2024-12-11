/*=========================================================================================
    File Name: app-user-list.js
    Description: User List page
    --------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent

==========================================================================================*/
$(function () {
  ('use strict');

  var dtUserTable = $('.user-list-table'),
    select = $('.select2'),
    statusObj = {
      'pending': { title: 'pending', class: 'badge-light-info' },
      'active': { title: 'active', class: 'badge-light-success' },
      'suspend': { title: 'suspend', class: 'badge-light-warning' },
      'in_active': { title: 'in_active', class: 'badge-light-secondary' },
      'trash': { title: 'trash', class: 'badge-light-danger' },
      'CB Employee': { title: 'CB Employee', class: 'badge-light-success' },
      'Cantt Resident': { title: 'Cantt Resident', class: 'badge-light-warning' },
      'Walton': { title: 'Walton', class: 'badge-light-info' },
      'Unverified': { title: 'Unverified', class: 'badge-light-warning' },
      'Non Cantt Resident': { title: 'Non Cantt Resident', class: 'badge-light-danger' },
      'Pensioner': { title: 'Pensioner', class: 'badge-light-success' },
      'Pcm Patient': { title: 'Pcm Patient', class: 'badge-light-success' },
      'Pcm local Patient': { title: 'Pcm local Patient', class: 'badge-light-danger' },
    };

  var baseurl = window.location.origin;

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
    userView = assetPath + 'app/user/view/account';
  }

  select.each(function () {
    var $this = $(this);
    $this.wrap('<div class="position-relative"></div>');
    $this.select2({
      // the following code is used to disable x-scrollbar when click in select input and
      // take 100% width in responsive also
      dropdownAutoWidth: true,
      width: '100%',
      dropdownParent: $this.parent()
    });
  });
  //fetchPatientCountDetail();
  function fetchPatientCountDetail() {
    $.ajax({
      url: baseurl + '/patient/get-patient-count',
      type: 'GET',
      data:  {},
      success: function(response) {
        if (response.status == 'success') {
          var userInfo = response.patientsCountDetail;
          $('#totalPatient').text(userInfo.totalPatient);
          $('#pendingPatient').text(userInfo.pendingPatient);
          $('#activePatient').text(userInfo.activePatient);
          $('#inActivePatient').text(userInfo.inActivePatient);
         // $('#firstname').val(userInfo.firstname);
         // $('#lastname').val(userInfo.lastname);
        }
      },
      error: function(xhr, status, error) {
        // Handle error response
        console.log('status');
      }
    });
  }
  // Users List datatable
  if (dtUserTable.length) {
    dtUserTable.DataTable({
      ajax: assetPath + 'patient/get-patient-list', // JSON file to add data
      columns: [
        // columns according to JSON
        { data: '' },
        { data: 'full_name' },
        { data: 'employee_no' }, 
        { data: 'patients_type_name' },
        { data: 'cnic' },
        { data: 'phone' },
        { data: 'gender' },
        { data: 'is_dependent'},
        { data: 'status' },
        { data: '' }
      ],
      columnDefs: [
        {
          // For Responsive
          className: 'control',
          orderable: false,
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) {
            return '';
          }
        },
        {
          // User full name and username
          targets: 1,
          render: function (data, type, full, meta) {
            var $name = full['firstname'] + ' ' + full['lastname'],
              $email = full['email'] ? '<small class="emp_post text-muted">' + full['email'] + '</small>' : "",
              $image = full['profile_image'];

              var stateNum = Math.floor(Math.random() * 6) + 1;
              var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
              var $state = states[stateNum],
                $name = full['firstname'] + ' ' + full['lastname'],
                $initials = $name.match(/\b\w/g) || [];
              $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
              if ($image && $image != 'default.png') {
                var $output =
                '<img src="'  + $image + '" alt="' + $initials + '" height="32" width="32">';
                // For Avatar badge
            } else {
              // For Avatar image
              $output = '<span style="padding-top: 2px;" class="avatar-content">' + $initials + '</span>';
            }
            
            var colorClass = $image === '' ? ' bg-light-' + $state + ' ' : '';
            // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-left align-items-center">' +
              '<div class="avatar-wrapper">' +
              '<div class="avatar ' +
              colorClass +
              ' me-1">' +
              $output +
              '</div>' +
              '</div>' +
              '<div class="d-flex flex-column">' +
              '<span class="fw-bolder">' +
              $name +
              '</span>' +
              $email +
              '</div>' +
              '</div>';
            return $row_output;
          }
        },
        {
          targets: 2,
          render: function (data, type, full, meta) {
            var $genericPatientEmployee = full['employee_no'];
            if ($genericPatientEmployee == null) {
              var $genericPatientEmployee = full['id'];
            }
            return '<span class="text-nowrap">' + $genericPatientEmployee + '</span>';
          }
        },
        {
          // User Role
          targets: 3,
          render: function (data, type, full, meta) {
            var $patients_type_name = full['patients_type_name'];
            return (
              '<span class="badge rounded-pill ' +
              statusObj[$patients_type_name].class +
              '" text-capitalized>' +
              statusObj[$patients_type_name].title +
              '</span>'
            );
          }
        },
        {
          targets: 4,
          render: function (data, type, full, meta) {
            var $cnic = full['cnic'];

            return '<span class="text-nowrap">' + $cnic + '</span>';
          }
        },
        {
          targets: 5,
          render: function (data, type, full, meta) {
            var $cnic = full['phone'];

            return '<span class="text-nowrap">' + $cnic + '</span>';
          }
        },
        {
          targets: 6,
          render: function (data, type, full, meta) {
            var $gender = full['gender'];

            return '<span class="text-nowrap">' + $gender + '</span>';
          }
        },
        {
        targets: 7,
        render: function (data, type, full, meta) {
            var $is_dependent = full['is_dependent'];
            return '<span class="text-nowrap">' + ($is_dependent == 1 ? "Dependent" : "Self") + '</span>';
          }
        },
        {
          // User Status
          targets: 8,
          render: function (data, type, full, meta) {
            var $status = full['status'];
            return (
              '<span class="badge rounded-pill ' +
              statusObj[$status].class +
              '" text-capitalized>' +
              statusObj[$status].title +
              '</span>'
            );
          }
        },
        {
          // Actions
          targets: -1,
          title: 'Actions',
          orderable: false,
          render: function (data, type, full, meta) {
            //start from this
            return (
              '<div class="btn-group">' +
              '<a class="btn btn-sm dropdown-toggle hide-arrow" data-bs-toggle="dropdown">' +
              feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
              '</a>' +
              '<div class="dropdown-menu dropdown-menu-end">' +
              '<a href="' +
              baseurl + '/patient/add-patient/' + full.id +
              '" class="dropdown-item">' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) +
              'Edit</a>' +
              '</div>' +
              '</div>'
            );
          }
        }
      ],
      order: [[1, 'desc']],
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
        //{ 
          // init: function (api, node, config) {
          //   $(node).removeClass('btn-secondary');
          //   $(node).parent().removeClass('btn-group');
          //   setTimeout(function () {
          //     $(node).closest('.dt-buttons').removeClass('btn-group').addClass('d-inline-flex mt-50');
          //   }, 50);
          // }
        //},
        {
          text: 'Add New Patient',
          className: 'add-patient btn btn-primary'
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
              return col.columnIndex !== 6 // ? Do not show row in modal popup if title is blank (for check box)
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
      // language: {
      //   paginate: {
      //     // remove previous & next text from pagination
      //     previous: '&nbsp;',
      //     next: '&nbsp;'
      //   }
      // },
    });
  }

  $(".add-patient").click(function(){
    window.location.pathname = 'patient/add-patient';
  }); 
  
});
