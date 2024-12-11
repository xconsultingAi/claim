/*=========================================================================================
    File Name: app-user-list.js
    Description: User List page
    --------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent

==========================================================================================*/
var baseurl = window.location.origin;
$(function () {
  ('use strict');

  var dtUserTable = $('.user-list-table'),
    newUserSidebar = $('.new-user-modal'),
    newUserForm = $('.add-new-user'),
    select = $('.select2'),
    dtContact = $('.dt-contact'),
    statusObj = {
      'pending': { title: 'pending', class: 'badge-light-info' },
      'active': { title: 'active', class: 'badge-light-success' },
      'suspend': { title: 'suspend', class: 'badge-light-warning' },
      'in_active': { title: 'in_active', class: 'badge-light-secondary' },
      'trash': { title: 'trash', class: 'badge-light-danger' },
    },
    patientTypeObj = {
      'CB Employee': { title: 'CB Employee', class: 'badge-light-success' },
      'Pensioner': { title: 'Pensioner', class: 'badge-light-success' },
      'Cantt Resident': { title: 'Cantt Resident', class: 'badge-light-warning' },
      'Walton': { title: 'Walton', class: 'badge-light-info' },
      'Unverified': { title: 'Unverified', class: 'badge-light-warning' },
      'Non Cantt Resident': { title: 'Non Cantt Resident', class: 'badge-light-danger' },
    };
  $("#searchNo").focus();  
  var baseurl = window.location.origin;
  var assetPath = '../../../app-assets/',
    userView = 'app-user-view-account.html';

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
  $("#searchErr").hide();
   const urlParams = new URLSearchParams(window.location.search);
   const searchNo = urlParams.get('searchNo');
  if (searchNo) {
    $("#searchNo").val(searchNo);
    fetchData(searchNo);
  }
  $("#search").click(function() {
    $("#searchErr").hide();
    if ($("#searchNo").val() == '') {
      $("#searchErr").show();
      return;
    }
    fetchData($("#searchNo").val());
  });

  function fetchData (searchNo) {
  if ($.fn.DataTable.isDataTable('#DataTables_Table_0')) {
    $('#DataTables_Table_0').DataTable().destroy();
  }

  if (dtUserTable.length) {
    dtUserTable.DataTable({
      ajax: assetPath + 'patient/get-patient-by-search/' + searchNo, // JSON file to add data
      data:  {searchNo},
      columns: [
        // columns according to JSON
        { data: '' },
        { data: 'full_name' },
        { data: 'cnic' },
        { data: 'employee_no' },
        { data: 'patients_type_name' },
        { data: 'gender' },
        { data: 'phone' },
        { data: 'is_dependent' },
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
          responsivePriority: 4,
          render: function (data, type, full, meta) {
            var $name = full['firstname'] + ' ' + full['lastname'],
              $email = full['email'],
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
              '<a href="#" class="user_name text-truncate text-body"><span class="fw-bolder">' +
              $name +
              '</span></a>' +
              '<small class="emp_post text-muted">' +
              $email +
              '</small>' +
              '</div>' +
              '</div>';
            return $row_output;
          }
        },
        {
          // User Role
          targets: 2,
          render: function (data, type, full, meta) {
            var $cnic = full['cnic'];
            return '<span class="text-nowrap">' + $cnic + '</span>';
          }
        },
        {
          targets: 3,
          render: function (data, type, full, meta) {
            var $genericPatientEmployee = full['employee_no'];
            if ($genericPatientEmployee == null) {
              var $genericPatientEmployee = full['id'];
            }
            return '<span class="text-nowrap">' + $genericPatientEmployee + '</span>';
          }
        },
        {
          // Patinet Type
          targets: 4,
          render: function (data, type, full, meta) {
            var $patient_type_name = full['patients_type_name'];
            if (patientTypeObj[$patient_type_name]) {
              return (
                '<span class="badge rounded-pill ' +
                patientTypeObj[$patient_type_name].class +
                '" text-capitalized>' +
                patientTypeObj[$patient_type_name].title +
                '</span>'
              );
            }
            return (
              '<span class="badge rounded-pill badge-light-danger" text-capitalized>' +
                $patient_type_name +
              '</span>'
            );
            //return '<span class="text-nowrap">' + $patient_type_name + '</span>';
          }
        },
        {
          targets: 5,
          render: function (data, type, full, meta) {
            var $gender = full['gender'];
            return '<span class="text-nowrap">' + $gender + '</span>';
          }
        },
        {
          targets: 6,
          render: function (data, type, full, meta) {
            var $phone = full['phone'];
            return '<span class="text-nowrap">' + $phone + '</span>';
          }
        },
        {
          // User Status
          targets: 7,
          render: function (data, type, full, meta) {
            var $is_dependent = full['is_dependent'];
            console.log('$is_dependent', $is_dependent);
            return '<span class="text-nowrap">' + ($is_dependent == 1 ? "Dependent" : "Self") + '</span>';
          }
        },
        {
          // Actions
          targets: -1,
          title: 'Actions',
          orderable: false,
          render: function (data, type, full, meta) {
            //start from this
            //console.log(full.id);return;
            return (
              '<a href="' +
              baseurl + '/patient/get-patient-detail/' + full.id +
              '" class="btn btn-sm btn-primary">' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 me-20' }) +
              '</a>'
            );
            // '<a href="' +
            // baseurl + '/patient/get-patient-detail/' + full.id +
            // '" class="btn btn-sm">' +
            // feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) +
            // 'Detail</a>'
            // return (
            //   '<div class="btn-group">' +
            //   '<a class="btn btn-sm dropdown-toggle hide-arrow" data-bs-toggle="dropdown">' +
            //   feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
            //   '</a>' +
            //   '<div class="dropdown-menu dropdown-menu-end">' +
            //   '<a href="' +
            //   baseurl + '/patient/get-patient-detail/' + full.id +
            //   '" class="dropdown-item">' +
            //   feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) +
            //   'Detail</a>' +
            //   '</div>'
            // );
          }
        }
      ],
      order: [[1, 'desc']],
      dom:
      //l and t remove from dom form removing 'show entries' field and 'search' field
        '<"d-flex justify-content-between align-items-center header-actions mx-2 row mt-75"' +
        '<"col-sm-12 col-lg-4 d-flex justify-content-center justify-content-lg-start" >' +
        '<"col-sm-12 col-lg-8 ps-xl-75 ps-0"<"dt-action-buttons d-flex align-items-center justify-content-center justify-content-lg-end flex-lg-nowrap flex-wrap"<"me-1">B>>' +
        '>t' +
        '<"d-flex justify-content-between mx-2 row mb-1"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
      language: {
        //sLengthMenu: 'Show _MENU_',
        //search: 'Search',
        //searchPlaceholder: 'Search..'
      },

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
      language: {
        paginate: {
          // remove previous & next text from pagination
          previous: '&nbsp;',
          next: '&nbsp;'
        }
      }
    });
  }
}
});
//this function is used for redirect to next page
function prescribe(id) {
  alert('a');
  if (id) {
    window.location.href = baseurl + '/patient/get-patient-detail/' + id;
  } else {
    Swal.fire({
      title: 'warning',
      text: 'id is mising for next screen.',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
  }
}

  //   newUserForm.on('submit', function (e) {
  //     var isValid = newUserForm.valid();
  //     e.preventDefault();
  //     if (isValid) {
  //       newUserSidebar.modal('hide');
  //     }
  //   });
  // }

  // // Phone Number
  // if (dtContact.length) {
  //   dtContact.each(function () {
  //     new Cleave($(this), {
  //       phone: true,
  //       phoneRegionCode: 'US'
  //     });
  //   });
  //}

