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
    dtApprovedIndentTable = $('.approved-list-table'),
    dtDeliveredIndentTable = $('.delivered-list-table'),
    dtReceivedIndentTable = $('.received-list-table'),
    dtDueIndentTable = $('.due-list-table'),

    newUserSidebar = $('.new-user-modal'),
    newUserForm = $('.add-new-user'),
    select = $('.select2'),
    dtContact = $('.dt-contact'),
    statusObj = {
      'pending': { title: 'pending', class: 'badge-light-info' },
      'approved': { title: 'approved', class: 'badge-light-warning' },
      'delivered': { title: 'delivered', class: 'badge-light-warning' },
      'received': { title: 'received', class: 'badge-light-success' },
      'due': { title: 'due', class: 'badge-light-danger' },
      'cleared': { title: 'cleared', class: 'badge-light-success' },
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
  // fetchPatientCountDetail();
  // function fetchPatientCountDetail() {
  //   $.ajax({
  //     url: baseurl + '/doctor-desk/opd/get-patient-visit-count',
  //     type: 'GET',
  //     data:  {},
  //     success: function(response) {
  //       if (response.status == 'success') {
  //         var userInfo = response.patientVisitCount;
  //         $('#totalRequestIndent').text(userInfo.totalRequestIndent);
  //         $('#pendingRequestIndent').text(userInfo.pendingRequestIndent);
  //         $('#approvedRequestIndent').text(userInfo.approvedRequestIndent);
  //         $('#cancelledRequestIndent').text(userInfo.cancelledRequestIndent);
  //        // $('#firstname').val(userInfo.firstname);
  //        // $('#lastname').val(userInfo.lastname);
  //       }
  //     },
  //     error: function(xhr, status, error) {
  //       // Handle error response
  //     }
  //   });
  // }
  // Patient Visit List datatable
  if (dtPendingIndentTable.length) {
    DataTableListing(dtPendingIndentTable, 'pending', null, assetPath);
  }
  if (dtApprovedIndentTable.length) {
    DataTableListing(dtApprovedIndentTable, 'approved', null, assetPath);
  }
  if (dtDeliveredIndentTable.length) {
    DataTableListing(dtDeliveredIndentTable, 'delivered', null, assetPath);
  }
  if (dtReceivedIndentTable.length) {
    DataTableListing(dtReceivedIndentTable, 'received', null, assetPath);
  }
  if (dtDueIndentTable.length) {
    DataTableListing(dtDueIndentTable, 'received', 'due', assetPath);
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
    var user_id = $(this).data('id');
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
        url: assetPath + 'medicines/request-indent/delete/' + user_id,
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
  $(".add-request-indent").click(function(){
    window.location.pathname = 'medicines/request-indent/add-request-indent';
  }); 

  function DataTableListing(dtObject, status, order_status, assetPath) {
    var addButton = [{
      text: 'Add Request Indent',
      className: 'add-request-indent btn btn-primary'
    }];
    dtObject.DataTable({
      ajax: assetPath + 'medicines/request-indent/list/' + status + '/' + order_status, // JSON file to add data
      columns: [
        // columns according to JSON
        { data: '' },
        { data: 'id' },
        { data: 'supplier_pharmacy_name' },
        { data: 'receiver_pharmacy_name' },
        // { data: 'created_user_name' },
        { data: 'approved_user_name' },
        { data: 'delivered_user_name' },
        { data: 'status' },
        { data: 'due_status' },
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
          // User Role
          targets: 1,
          render: function (data, type, full, meta) {
            var $lp = 'LP';
            var $Id = full['id'];
            var created_at = new Date(full['created_at']);
            var year = created_at.getFullYear();
            var month = created_at.getMonth() + 1; // Months are zero-indexed, so we add 1
            var day = created_at.getDate();
            // var created_at = new Date(full['created_at']); // Assuming data is in a standard date format
            //         // Format the 'created_at' timestamp to display only the month, day, and year
            //         var formattedDate = created_at.toLocaleDateString('en-US', {
            //           year: 'numeric',
            //           month: 'numeric',
            //           day: 'numeric'
                      
            //         });
            //         formattedDate = formattedDate.replace(/\//g, '-');
            //         console.log(formattedDate);
            return "<span class='text-truncate align-middle'>" + $lp + '-'+ year + month + day +'-'+ $Id + '</span>';
          }
        },
        {
          // User Role
          targets: 2,
          render: function (data, type, full, meta) {
            var $supplier_pharmacy_name = full['supplier_pharmacy_name'];
            
            return "<span class='text-truncate align-middle'>" + $supplier_pharmacy_name + '</span>';
          }
        },
        {
          targets: 3,
          render: function (data, type, full, meta) {
            var $receiver_pharmacy_name = full['receiver_pharmacy_name'];
  
            return '<span class="text-nowrap">' + $receiver_pharmacy_name + '</span>';
          }
        },
        // {
        //   targets: 4,
        //   render: function (data, type, full, meta) {
        //     var $created_user_name = full['created_user_name'];
  
        //     return '<span class="text-nowrap">' + $created_user_name + '</span>';
        //   }
        // },
        {
          targets: 4,
          render: function (data, type, full, meta) {
            var $approved_user_name = full['approved_user_name'] ?? 'N/A';
  
            return '<span class="text-nowrap">' + $approved_user_name + '</span>';
          }
        },
        {
          targets: 5,
          render: function (data, type, full, meta) {
            var $delivered_user_name = full['delivered_user_name'] ?? 'N/A';
  
            return '<span class="text-nowrap">' + $delivered_user_name + '</span>';
          }
        },
        {
          // User Status
          targets: 6,
          render: function (data, type, full, meta) {
            var $status = full['status'];
           // return '<span class="text-nowrap">' + $status + '</span>';
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
          targets: 7,
          render: function (data, type, full, meta) {
            var $order_status = full['order_status'];
           // return '<span class="text-nowrap">' + $status + '</span>';
            return (
              '<span class="badge rounded-pill ' +
              statusObj[$order_status].class +
              '" text-capitalized>' +
              statusObj[$order_status].title +
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
            // return (
            //   '<div class="btn-group">' +
            //   '<a class="btn btn-sm dropdown-toggle hide-arrow" data-bs-toggle="dropdown">' +
            //   feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
            //   '</a>' +
            //   '<div class="dropdown-menu dropdown-menu-end">' +
            //   '<a href="' +
            //   baseurl + '/medicines/request-indent/add-request-indent/' + full.id +
            //   '" class="dropdown-item">' +
            //   feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) +
            //   'Eidt</a></div>' +
            //   '</div>'
            // );

            if (status == 'approved' || status == 'delivered') {
              return (
                '<a href="' +
                baseurl + '/medicines/request-indent/add-request-indent/' + full.id +
                '" class="btn btn-success">' +
                feather.icons['file-text'].toSvg({ class: 'font-small-4 me-20' }) +
                ' View Indent</a>'
              );
            } else {
              return (
                '<a href="' +
                baseurl + '/medicines/request-indent/add-request-indent/' + full.id +
                '" class="btn btn-success">' +
                feather.icons['file-text'].toSvg({ class: 'font-small-4 me-20' }) +
                ' View Indent</a>' +
                '<a href="#" class="btn btn-danger delete-record" data-id="'+ full.id +
                '">'  +
                feather.icons['trash-2'].toSvg({ class: 'font-small-4 me-20' }) +
                ' Delete</a>'
              );
            }
            
            // if (status == 'pending') {
            //   return (
            //     '<div class="btn-group">' +
            //     '<a class="btn btn-sm dropdown-toggle hide-arrow" data-bs-toggle="dropdown">' +
            //     feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
            //     '</a>' +
            //     '<div class="dropdown-menu dropdown-menu-end">' +
            //     '<a href="' +
            //     baseurl + '/medicines/request-indent/add-request-indent/' + full.id +
            //     '" class="dropdown-item">' +
            //     feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) +
            //     'Eidt</a></div>' +
            //     '</div>'
            //   );
            // } else {
            //   return (
            //     '<div class="btn-group">' +
            //     '<a class="btn btn-sm dropdown-toggle hide-arrow" data-bs-toggle="dropdown">' +
            //     feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
            //     '</a>' +
            //     '<div class="dropdown-menu dropdown-menu-end">' +
            //     '</div>' +
            //     '</div>'
            //   );
            // }
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

      buttons: status == "pending" ? addButton: [],
      
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
});

// $("#downloadPrescriptionBtn").click(function() {
//   if ($("#prescription_id").val()) {
//     window.location.href = baseurl + '/report/prescription/download-prescription/' + $("#id").val();
//   }
// });


