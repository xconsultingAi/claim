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
  var dtPendingIndentTable = $('.pending-list-table'),
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

  // Patient Visit List datatable
  if (dtPendingIndentTable.length) {
    DataTableListing(dtPendingIndentTable, 'pending', assetPath);
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

  // Phone Number
  if (dtContact.length) {
    dtContact.each(function () {
      new Cleave($(this), {
        phone: true,
        phoneRegionCode: 'US'
      });
    });
  }

  $(document).on('click', '.delete-record', function (e) {
    e.preventDefault();

    // Perform delete operation here
    var user_id = $(this).data('user_id');
    // Example: Show a confirmation dialog before deleting
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this user!",
      type: 'warning',
      showCancelButton: !0,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn btn-danger ms-1',
      buttonsStyling: !1
    }).then(function (t) {
      var csrfToken = $('meta[name="csrf-token"]').attr('content');
      $.ajax({
        url: assetPath + 'dependent/delete/' + user_id,
        method: 'DELETE',
        headers: {
          'X-CSRF-TOKEN': csrfToken
        },
        success: function (response) {
          if (response.status == 'success') {
            Swal.fire({
              title: 'Success',
              text: 'user has been deleted successfully',
              icon: 'success',
              confirmButtonText: 'OK'
            });
            location.reload();
          } else {
            Swal.fire({
              title: 'failure',
              text: response.message,
              icon: 'success',
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
    });
  });

  // function changeLocation(route) {
  //   window.location.href(route);
  // }
  $(".create-appointment").click(function(){
    window.location.pathname = '/private-clinic/appointment/calendar-view';
  }); 

  function DataTableListing(dtObject, status, assetPath) {
    dtObject.DataTable({
      ajax: assetPath + 'private-clinic/appointment/list', // JSON file to add data
      columns: [
        // columns according to JSON
        { data: 'patient' },
        { data: 'title' },
        { data: 'date' },
        { data: 'time' },
        { data: 'duration' },
        { data: 'type' },
        { data: 'status' },
        { data: ' ' }
      ],
      columnDefs: [
        {
          targets: 0, //patient
          render: function (data, type, full, meta) {
            var patientDetails = full.patientDetails;
            if (patientDetails) {
              var firstName = patientDetails.firstname || '';
              var lastName = patientDetails.lastname || '';
              var phone = patientDetails.phone || '';
              return "<span class='text-truncate align-middle'>" + firstName + " " + lastName + " (" + phone + ")</span>";
            } else {
              return "<span class='text-truncate align-middle'>No Patient Details</span>";
            }
          }
        },        
        {
          targets: 1,
          render: function (data, type, full, meta) {
            var $title = full['title'];
              return "<span class='text-truncate align-middle'>" + $title.substring(0, 20); + '</span>';
          }
        },
        {
          // User Role
          targets: 2, //date
          render: function (data, type, full, meta) {
            var startDate = new Date(full['start']);
            var dateOnly = startDate.toISOString().split('T')[0]; // Extract date part
            return "<span class='text-truncate align-middle'>" + dateOnly + '</span>';
          }
        },
        {
          targets: 3, // time
          render: function (data, type, full, meta) {
            var startDate = new Date(full['start']);
            var timeOnly = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Extract time part
            return "<span class='text-truncate align-middle'>" + timeOnly + '</span>';

          }
        },
        {
          targets: 4, // time
          render: function (data, type, full, meta) {
            var $end = full['end'];
            var endDate = new Date($end);
            var hours = endDate.getHours().toString().padStart(2, '0');
            var minutes = endDate.getMinutes().toString().padStart(2, '0');
        
            return '<span class="text-nowrap">' + minutes + ' minutes </span>';
          }
        },
        {
          targets: 5,
          render: function (data, type, full, meta) {
            var $type = full['type'];
            return '<span class="text-nowrap">' + $type + '</span>';
          }
        },
        {
          targets: 6,
          render: function (data, type, full, meta) {
            var $status = full['status'];
            return '<span class="text-nowrap">' + $status + '</span>';
          }
        },
        {
          // Actions
          targets: -1,
          title: 'Actions',
          orderable: false,
          render: function (data, type, full, meta) {
            if (full['status'] == 'booked') {
              var actionLink = '<div class="btn-group">' +
              '<a class="btn btn-sm dropdown-toggle hide-arrow" data-bs-toggle="dropdown">' +
              feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
              '</a>' +
              '<div class="dropdown-menu dropdown-menu-end">' +
              '<a href="' +
              baseurl + '/private-clinic/appointment/create/' + full.id +
              '" class="dropdown-item">' +
              feather.icons['edit'].toSvg({ class: 'font-small-4 me-50' }) +
              'Edit</a>' + 
              '<a href="javascript:void(0);" class="dropdown-item generate-visit" data-appointment_id="' + full.id + '">' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) +
              'Generate Patient Visit</a></div>' +
              '</div>';
              return (actionLink);
            }
            return '<span class="text-nowrap"></span>'; 
          }
        }
      ],
       order: [[1, 'desc']],
      dom:
      '<"d-flex justify-content-between align-items-center header-actions mx-2 row mt-75"' +
      '<"col-sm-12 col-lg-4 d-flex justify-content-center justify-content-lg-start" >' +
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
          text: 'Create Appointment',
          className: 'create-appointment btn btn-primary mt-2'
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

  $(document).on('click', '.generate-visit', function (e) {
    e.preventDefault();

    // Perform delete operation here
    var id = $(this).data('appointment_id');
    // Example: Show a confirmation dialog before deleting
    Swal.fire({
      title: 'Has patient arrived?',
      text: "",
      icon: 'warning',
      showCancelButton: !0,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn btn-danger ms-1',
      buttonsStyling: !1
    }).then(function (result) {
      if (result.isConfirmed) {
        $.ajax({
          url: assetPath + 'private-clinic/appointment/generate-visit/'+ id,
          method: 'post',
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          success: function (response) {
            if (response.status == 'success') {
              var patientVisitId = response.patient_visit_id;
              var page = 'progress'; 
          
              window.location.href = assetPath + 'private-clinic/appointment/progress-receipt/' + patientVisitId + '/' + page;
            } else {
              // Handle the error case
              Swal.fire({
                title: response.status,
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
});


