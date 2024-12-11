/*=========================================================================================
    File Name: doctor.js
    Description: Doctor Types List page
    --------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent

==========================================================================================*/
$(function () {
    ('use strict');
    var dtUserTable = $('.vehicle-type-list-table'),
      statusObj = {
        'active': { title: 'active', class: 'badge-light-success' },
        'in_active': { title: 'in_active', class: 'badge-light-secondary' },
      };
  
    var baseurl = window.location.origin;
    var assetPath = '../../../app-assets/',
      userView = 'app-user-view-account.html';
  
    if ($('body').attr('data-framework') === 'laravel') {
      assetPath = $('body').attr('data-asset-path');
      userView = assetPath + 'app/user/view/account';
    }
  
    
    if (dtUserTable.length) {
       // Setup - add a text input to each footer cell
       $('.vehicle-type-list-table thead tr').clone(true).appendTo('.vehicle-type-list-table thead');
       $('.vehicle-type-list-table thead tr:eq(1) th').each(function (i) {
         if (i < $('.vehicle-type-list-table thead tr:eq(1) th').length - 1) {
           var title = $(this).text();
           $(this).html('<input type="text" class="form-control form-control-sm" placeholder="Search ' + title + '" />');
       
           $('input', this).on('keyup change', function () {
             if (dt_filter.column(i).search() !== this.value) {
               dt_filter.column(i).search(this.value).draw();
             }
           });
         }else{
           var title = $(this).text();
           $(this).html('');
         }
       });

      var dt_filter = dtUserTable.DataTable({
        ajax: assetPath + 'vehicle/get-vehicle-list',
        columns: [
          // columns according to JSON
          { data: 'company_name' },
          { data: 'vehicle_name' },
          { data: 'vehicle_model' },
          { data: 'number_plate' },
          { data: '' }
        ],
        columnDefs: [
          {
            targets: 0,
            render: function (data, type, full, meta) {
              var $name = full['company_name'];
  
              return '<span class="text-wrap">' + $name + '</span>';
            }
          },
          {
            targets: 1,
            render: function (data, type, full, meta) {
              var $email = full['vehicle_name'];
  
              return '<span class="text-wrap">' + $email + '</span>';
            }
          },
          {
            targets: 2,
            render: function (data, type, full, meta) {
              var $phone = full['vehicle_model'];
  
              return '<span class="text-wrap">' + $phone + '</span>';
            }
          },
          {
            targets: 3,
            render: function (data, type, full, meta) {
              var $city = full['number_plate'];
  
              return '<span class="text-wrap">' + $city + '</span>';
            }
          },
          // {
          //   // User Status
          //   targets: 4,
          //   render: function (data, type, full, meta) {
          //     var $status = full['status'];
          //     return '<span class="text-nowrap">' + $status + '</span>';
          //     // return (
          //     //   '<span class="badge rounded-pill ' +
          //     //   statusObj[$status].class +
          //     //   '" text-capitalized>' +
          //     //   statusObj[$status].title +
          //     //   '</span>'
          //     // );
          //   }
          // },
          {
            // Actions
            targets: -1,
            title: 'Actions',
            orderable: false,
            render: function (data, type, full, meta) {
              //start from this
              // console.log(full.id);return;
              return (
                '<div class="btn-group">' +
                '<a class="btn btn-sm dropdown-toggle hide-arrow" data-bs-toggle="dropdown">' +
                feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
                '</a>' +
                '<div class="dropdown-menu dropdown-menu-end">' +
                '<a href="javascript:void(0);" class="dropdown-item edit-record" data-type_id="' + full.id + '">' +
                feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) +
                'Edit</a>' +
                // '<a href="javascript:void(0);" class="dropdown-item attach-doctor" data-company_id="' + full.id + '">' +
                // feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) +
                // 'Attach Doctor</a>' +
                '<a href="javascript:void(0);" class="dropdown-item delete-record" data-type_id="' + full.id + '">' +
                feather.icons['trash-2'].toSvg({ class: 'font-small-4 me-50' }) +
                'Delete</a></div>' +
                '</div>'
              );
            }
          }
        ],
        order: [[1, 'desc']],
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
            extend: 'collection',
            className: 'btn btn-outline-secondary dropdown-toggle me-2',
            text: feather.icons['external-link'].toSvg({ class: 'font-small-4 me-50' }) + 'Export',
            buttons: [
              {
                extend: 'print',
                text: feather.icons['printer'].toSvg({ class: 'font-small-4 me-50' }) + 'Print',
                className: 'dropdown-item',
                exportOptions: { columns: [0, 1, 2] }
              },
              {
                extend: 'csv',
                text: feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) + 'Csv',
                className: 'dropdown-item',
                exportOptions: { columns: [0, 1, 2] }
              },
              {
                extend: 'excel',
                text: feather.icons['file'].toSvg({ class: 'font-small-4 me-50' }) + 'Excel',
                className: 'dropdown-item',
                exportOptions: { columns: [0, 1, 2] }
              },
              {
                extend: 'pdf',
                text: feather.icons['clipboard'].toSvg({ class: 'font-small-4 me-50' }) + 'Pdf',
                className: 'dropdown-item',
                exportOptions: { columns: [0, 1, 2] }
              },
              {
                extend: 'copy',
                text: feather.icons['copy'].toSvg({ class: 'font-small-4 me-50' }) + 'Copy',
                className: 'dropdown-item',
                exportOptions: { columns: [0, 1, 2] }
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
            text: 'Add New Vehicle',
            className: 'add-type btn btn-primary'
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

    $(document).on('click', '.delete-record', function (e) {
      e.preventDefault();
  
      // Perform delete operation here
      var type_id = $(this).data('type_id');
      // Example: Show a confirmation dialog before deleting
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to delete this Vehicle",
        type: 'warning',
        showCancelButton: !0,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        confirmButtonClass: 'btn btn-primary',
        cancelButtonClass: 'btn btn-danger ms-1',
        buttonsStyling: !1
      }).then(function (result) {
        if (result.isConfirmed) {
          $.ajax({
            url: assetPath + 'vehicle/delete/'+ type_id,
            method: 'DELETE',
            headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function (response) {
              if (response.status == 'success') {
                Swal.fire({
                  title: response.status,
                  text: response.message,
                  icon: response.status,
                  confirmButtonText: 'OK'
                }).then(function (result) {
                  location.reload();
                });
              } else {
                Swal.fire({
                  title: response.status,
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
        }
      });
    });
  
    $(".add-type").click(function(){
      window.location.pathname = 'vehicle/create';
    }); 

    // $(document).on('click', '.attach-doctor', function (e) {
    //   e.preventDefault();
    //   var branch_id = $(this).data('branch_id');
    //   window.location.href = baseurl+`/user-wise-branch-setting/create/${branch_id}`;
    // });

    $(document).on('click', '.edit-record', function (e) {
      e.preventDefault();
      var type_id = $(this).data('type_id');
      console.log(type_id);
      window.location.href = baseurl+`/vehicle/${type_id}/edit`;
    });
    
  });
  