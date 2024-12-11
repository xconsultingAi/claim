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
      'inprocess': { title: 'inprocess', class: 'badge-light-warning' },
      'completed': { title: 'completed', class: 'badge-light-success' },
      'incomplete': { title: 'incomplete', class: 'badge-light-danger' },
      'none': { title: 'none', class: 'badge-light-danger' },
      'null': { title: 'null', class: 'badge-light-danger' },
    },
    patientTypeObj = {
      'CB Employee': { title: 'CB Employee', class: 'badge-light-success' },
      'Cantt Resident': { title: 'Cantt Resident', class: 'badge-light-warning' },
      'Walton': { title: 'Walton', class: 'badge-light-info' },
      'Unverified': { title: 'Unverified', class: 'badge-light-warning' },
      'Non Cantt Resident': { title: 'Non Cantt Resident', class: 'badge-light-danger' },
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
  fetchPatientCountDetail();
  function fetchPatientCountDetail() {
    $.ajax({
      url: baseurl + '/patient-visit/get-patient-visit-count',
      type: 'GET',
      data:  {},
      success: function(response) {
        if (response.status == 'success') {
          var userInfo = response.patientVisitCount;
          $('#totalPatientVisit').text(userInfo.totalPatientVisit);
          $('#pendingPatientVisit').text(userInfo.pendingPatientVisit);
          $('#inprocessPatientVisit').text(userInfo.inprocessPatientVisit);
          $('#completedPatientVisit').text(userInfo.completedPatientVisit);
         // $('#firstname').val(userInfo.firstname);
         // $('#lastname').val(userInfo.lastname);
        }
      },
      error: function(xhr, status, error) {
        // Handle error response
      }
    });
  }
  // Users List datatable
  if (dtUserTable.length) {
    dtUserTable.DataTable({
      ajax: assetPath + 'patient-visit/get-patient-visit-list', // JSON file to add data
      columns: [
        // columns according to JSON
        { data: 'name' },
        // { data: 'employee_no' },
        { data: 'visit_no' },
        // { data: 'cnic' },
        { data: 'patient_type_name'},
        // { data: 'department_type_name' },
        // { data: 'clinical_service_name' },
        { data: 'status'},
        { data: 'investigation_status'},
        // { data: 'radiology_status'},
        { data: '' }
      ],
      columnDefs: [
        
        {
          // User full name and username
          targets: 0,
          responsivePriority: 4,
          render: function (data, type, full, meta) {
            
            var $name = full['firstname'] + ' ' + full['lastname'],
              $name = $name.substr(0, 30);
              $email = full['email'],
              $image = full['profile_image'];
              console.log($image);
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
              '<a href="#" class="user_name text-body"><span class="fw-bolder">' +
              $name +
              '</span></a>' +
              '<small class="emp_post text-muted">' +
              $email +
              '</small>' +
              '</div>' +
              '</div>';
              //"text-truncate" this class is removed from $name 
            return $row_output;
          }
        },
        // {
        //   targets: 1,
        //   render: function (data, type, full, meta) {
        //     var $genericPatientEmployee = full['employee_no'];
        //     if ($genericPatientEmployee == null) {
        //       var $genericPatientEmployee = full['user_id'];
        //     }
        //     return '<span class="text-nowrap">' + $genericPatientEmployee + '</span>';
        //   }
        // },
        {
          // User Role
          targets: 1,
          render: function (data, type, full, meta) {
            var $visit_no = full['visit_no'];
            return "<span class='text-truncate align-middle'>" + $visit_no + '</span>';
          }
        },
        /*{
          targets: 3,
          render: function (data, type, full, meta) {
            var $cnic = full['cnic'];
            return '<span class="text-nowrap">' + $cnic + '</span>';
          }
        },*/
        {
          targets: 2,
          render: function (data, type, full, meta) {
            var $patient_type_name = full['patient_type_name'];
            // return (
            //   '<span class="badge rounded-pill ' +
            //   patientTypeObj[$patient_type_name].class +
            //   '" text-capitalized>' +
            //   patientTypeObj[$patient_type_name].title +
            //   '</span>'
            // );
            return '<span class="text-nowrap">' + $patient_type_name + '</span>';
          }
        },
        // {
        //   targets: 4,
        //   render: function (data, type, full, meta) {
        //     var $department_type_name = full['department_type_name'];
        //     return '<span class="text-nowrap">' + $department_type_name + '</span>';
        //   }
        // },
        // {
        //   // User Status
        //   targets: 5,
        //   render: function (data, type, full, meta) {
        //     var $clinical_service_name = full['clinical_service_name'];
        //     return '<span class="text-nowrap">' + $clinical_service_name + '</span>';
        //   }
        // },
        {
          // User Status
          targets: 3,
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
          // User Status
          targets: 4,
          render: function (data, type, full, meta) {
            var investigation_status = full['investigation_status'];
            if(investigation_status == null) {
              console.log(full['id']);
            }
            
            return (
              '<span class="badge rounded-pill ' +
              statusObj[investigation_status].class +
              '" text-capitalized>' +
              statusObj[investigation_status].title +
              '</span>'
            );
            
          }
        },
        // {
        //   // User Status
        //   targets: 8,
        //   render: function (data, type, full, meta) {
        //     var $radiology_status = full['radiology_status'];
        //     return (
        //       '<span class="badge rounded-pill ' +
        //       statusObj[$radiology_status].class +
        //       '" text-capitalized>' +
        //       statusObj[$radiology_status].title +
        //       '</span>'
        //     );
        //   }
        // },
        {
          // Actions
          targets: -1,
          title: 'Actions',
          orderable: true,
          render: function (data, type, full, meta) {
            // if (full['status'] == 'pending') {
            //   return (
            //     '<div class="btn-group">' +
            //     '<a class="btn btn-sm dropdown-toggle hide-arrow" data-bs-toggle="dropdown">' +
            //     feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
            //     '</a>' +
            //     '<div class="dropdown-menu dropdown-menu-end">' +
            //     '<a href="' +
            //     baseurl + '/report/reception/download-visit-receipt/' + full.id + '?page=progress' +
            //     '" class="dropdown-item">' +
            //     feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) +
            //     'Print Visit No</a>' +
            //     '</div>' +
            //     '</div>'
            //   );
              
            // } else {
              return (
                '<div class="btn-group">' +
                '<a class="btn btn-sm dropdown-toggle hide-arrow" data-bs-toggle="dropdown">' +
                feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
                '</a>' +
                '<div class="dropdown-menu dropdown-menu-end">' +
                '<a href="' +
                baseurl + '/accounts/reception-desk/detail-page/' + full.prescription_id +
                '" class="dropdown-item">' +
                feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) +
                'Payment</a>' + 
                '<a href="' +
                baseurl + '/report/reception/download-visit-receipt/' + full.id + '?page=progress' +
                '" class="dropdown-item">' +
                feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) +
                'Print Visit No</a>' +
                '</div>' +
                '</div>'
              );
            //}
            
          }
        }
      ],
      order: [[2, 'desc']],
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
        // {
        //   text: 'Add New Patient Visit',
        //   className: 'add-patient btn btn-primary'
        // }
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
      // initComplete: function () {
      //   // Adding role filter once table initialized
      //   this.api()
      //     .columns(2)
      //     .every(function () {
      //       var column = this;
      //       var label = $('<label class="form-label" for="PatientVisit">Visit No</label>').appendTo('.patient_visit');
      //       var select = $(
      //         '<select id="UserRole" class="form-select text-capitalize mb-md-0 mb-2"><option value=""> Select Patient Visit </option></select>'
      //       )
      //         .appendTo('.patient_visit')
      //         .on('change', function () {
      //           var val = $.fn.dataTable.util.escapeRegex($(this).val());
      //           column.search(val ? '^' + val + '$' : '', true, false).draw();
      //         });

      //       column
      //         .data()
      //         .unique()
      //         .sort()
      //         .each(function (d, j) {
      //           select.append('<option value="' + d + '" class="text-capitalize">' + d + '</option>');
      //         });
      //     });
      //   // Adding plan filter once table initialized
      //   this.api()
      //     .columns(3)
      //     .every(function () {
      //       var column = this;
      //       var label = $('<label class="form-label" for="Cnic">CNIC</label>').appendTo('.cnic');
      //       var select = $(
      //         '<select id="cnic" class="form-select text-capitalize mb-md-0 mb-2"><option value=""> Select CNIC </option></select>'
      //       )
      //         .appendTo('.cnic')
      //         .on('change', function () {
      //           var val = $.fn.dataTable.util.escapeRegex($(this).val());
      //           column.search(val ? '^' + val + '$' : '', true, false).draw();
      //         });

      //       column
      //         .data()
      //         .unique()
      //         .sort()
      //         .each(function (d, j) {
      //           select.append('<option value="' + d + '" class="text-capitalize">' + d + '</option>');
      //         });
      //     });
      //   // Adding status filter once table initialized
      //   this.api()
      //     .columns(4)
      //     .every(function () {
      //       var column = this;
      //       var label = $('<label class="form-label" for="PatientTypeName">Patient Type Name</label>').appendTo('.patient_type_name');
      //       var select = $(
      //         '<select id="patient_type_name" class="form-select text-capitalize mb-md-0 mb-2"><option value=""> Select Patient Type </option></select>'
      //       )
      //         .appendTo('.patient_type_name')
      //         .on('change', function () {
      //           var val = $.fn.dataTable.util.escapeRegex($(this).val());
      //           column.search(val ? '^' + val + '$' : '', true, false).draw();
      //         });

      //       column
      //         .data()
      //         .unique()
      //         .sort()
      //         .each(function (d, j) {
      //           select.append('<option value="' + d + '" class="text-capitalize">' + d + '</option>');
      //         });
      //     });
      // }
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
  $(".add-patient").click(function(){
    window.location.pathname = 'patient/add-patient';
  }); 
  
});
