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
    };

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
  fetchUserCountDetail();
  function fetchUserCountDetail() {
    $.ajax({
      url: baseurl + '/user/get-user-count',
      type: 'GET',
      data: {},
      success: function (response) {
        if (response.status == 'success') {
          var userInfo = response.usersCountDetail;
          $('#totalUser').text(userInfo.totalUser);
          $('#pendingUser').text(userInfo.pendingUser);
          $('#activeUser').text(userInfo.activeUser);
          $('#inActiveUser').text(userInfo.inActiveUser);
          // $('#firstname').val(userInfo.firstname);
          // $('#lastname').val(userInfo.lastname);
        }
      },
      error: function (xhr, status, error) {
        // Handle error response
        console.log('status');
      }
    });
  }
  // Users List datatable
  if (dtUserTable.length) {
    dtUserTable.DataTable({
      ajax: assetPath + 'user/get-user-list', // JSON file to add data
      columns: [
        // columns according to JSON
        { data: '' },
        { data: 'full_name' },
        { data: 'employee_no' },
        { data: 'role_id' },
        { data: 'cnic' },
        { data: 'gender' },
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
                '<img src="' + $image + '" alt="' + $initials + '" height="32" width="32">';
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
              '<a href="' +
              userView +
              '" class="user_name text-truncate text-body"><span class="fw-bolder">' +
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
            var $role = full['role_name'];
            return "<span class='text-truncate align-middle'>" + $role + '</span>';
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
            var $gender = full['gender'];

            return '<span class="text-nowrap">' + $gender + '</span>';
          }
        },
        {
          // User Status
          targets: 6,
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
            //console.log(full.id);return;
            return (
              '<div class="btn-group">' +
              '<a class="btn btn-sm dropdown-toggle hide-arrow" data-bs-toggle="dropdown">' +
              feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
              '</a>' +
              '<div class="dropdown-menu dropdown-menu-end">' +
              '<a href="' +
              baseurl + '/private-clinic/user/create/' + full.id +
              '" class="dropdown-item">' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) +
              'Edit</a>' +
              '<div class="dropdown-menu dropdown-menu-end">' +
              '<a href="javascript:;" class="dropdown-item delete-record" data-user_id="' + full.id + '">' +
              feather.icons['trash-2'].toSvg({ class: 'font-small-4 me-50' }) +
              'Delete</a></div>' +
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
        {
          extend: 'collection',
          className: 'btn btn-outline-secondary dropdown-toggle me-2',
          text: feather.icons['external-link'].toSvg({ class: 'font-small-4 me-50' }) + 'Export',
          buttons: [
            {
              extend: 'print',
              text: feather.icons['printer'].toSvg({ class: 'font-small-4 me-50' }) + 'Print',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4, 5] }
            },
            {
              extend: 'csv',
              text: feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) + 'Csv',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4, 5] }
            },
            {
              extend: 'excel',
              text: feather.icons['file'].toSvg({ class: 'font-small-4 me-50' }) + 'Excel',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4, 5] }
            },
            {
              extend: 'pdf',
              text: feather.icons['clipboard'].toSvg({ class: 'font-small-4 me-50' }) + 'Pdf',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4, 5] }
            },
            {
              extend: 'copy',
              text: feather.icons['copy'].toSvg({ class: 'font-small-4 me-50' }) + 'Copy',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4, 5] }
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
          text: 'Add New User',
          className: 'add-user btn btn-primary'
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
      language: {
        paginate: {
          // remove previous & next text from pagination
          previous: '&nbsp;',
          next: '&nbsp;'
        }
      },
    });
  }

  // Form Validation
  if (newUserForm.length) {
    newUserForm.validate({
      errorClass: 'error',
      rules: {
        'user-fullname': {
          required: true
        },
        'user-name': {
          required: true
        },
        'user-email': {
          required: true
        }
      }
    });

    newUserForm.on('submit', function (e) {
      var isValid = newUserForm.valid();
      e.preventDefault();
      if (isValid) {
        newUserSidebar.modal('hide');
      }
    });
  }

  $(document).on('click', '.delete-record', function (e) {
    e.preventDefault();
    var dtUserTable = $('.user-list-table');
    var user_id = $(this).data('user_id');

    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this user!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel', // Added cancelButtonText
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn btn-danger ms-1',
      buttonsStyling: false
    }).then(function (result) {
      if (result.isConfirmed) { // Check if "Yes, delete it!" is clicked
        var csrfToken = $('meta[name="csrf-token"]').attr('content');
        $.ajax({
          url: assetPath + 'user/delete/' + user_id,
          method: 'DELETE',
          headers: {
            'X-CSRF-TOKEN': csrfToken
          },
          success: function (response) {
            if (response.status == 'success') {
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


  $(".add-user").click(function () {
    window.location.pathname = 'private-clinic/user/create';
  });

});
