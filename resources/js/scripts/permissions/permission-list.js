/**
 * App user list
 */

$(function () {
  'use strict';

  var dataTablePermissions = $('.datatables-permissions'),
    assetPath = '../../../app-assets/',
    dt_permission,
    userList = 'app-user-list.html';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
    userList = assetPath + 'app/user/list';
  }

  // Users List datatable
  if (dataTablePermissions.length) {
    dt_permission = dataTablePermissions.DataTable({
      ajax: assetPath + 'permissions/get-permissions-list', 
      columns: [
        // columns according to JSON
        { data: '' },
        { data: 'id' },
        { data: 'name' },
        { data: 'roles' },
        { data: 'created_at' },
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
          targets: 1,
          visible: false
        },
        {
          // remove ordering from Name
          targets: 2,
          orderable: false
        },
        {
          // User Role
          targets: 3,
          orderable: false,
          render: function (data, type, full, meta) {
            var $assignedTo = (full['roles'].length > 0) ? full['roles'] : '',
              $output = '';
            for (var i = 0; i < $assignedTo.length; i++) {
              var val = $assignedTo[i];
              
              // console.log("name",val.name);
              $output += `<span class="badge rounded-pill badge-light-primary">${val.name}</span>`;
            }
            return $output;
          }
        },
        {
          // Actions
          targets: -1,
          title: 'Actions',
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<button class="btn btn-sm btn-icon edit-permission" data-bs-toggle="modal" data-bs-target="#editPermissionModal" data-id='+full['id']+' data-name='+full['name']+'>' +
              feather.icons['edit'].toSvg({ class: 'font-medium-2 text-body' }) +
              '</i></button>' +
              '<button class="btn btn-sm btn-icon delete-record" data-id='+full['id']+'>' +
              feather.icons['trash'].toSvg({ class: 'font-medium-2 text-body' }) +
              '</button>'
            );
          }
        }
      ],
      order: [[1, 'asc']],
      dom:
        '<"d-flex justify-content-between align-items-center header-actions text-nowrap mx-1 row mt-75"' +
        '<"col-sm-12 col-lg-4 d-flex justify-content-center justify-content-lg-start" l>' +
        '<"col-sm-12 col-lg-8"<"dt-action-buttons d-flex align-items-center justify-content-lg-end justify-content-center flex-md-nowrap flex-wrap"<"me-1"f>B>>' +
        '><"text-nowrap" t>' +
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
          text: 'Add Permission',
          className: 'add-new btn btn-primary mt-50',
          attr: {
            'data-bs-toggle': 'modal',
            'data-bs-target': '#addPermissionModal'
          },
          init: function (api, node, config) {
            $(node).removeClass('btn-secondary');
          }
        }
      ],
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of Permission';
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                    col.rowIndex +
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

            return data ? $('<table class="table"/><tbody />').append(data) : false;
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

  // Delete Record
  $('.datatables-permissions tbody').on('click', '.delete-record', function () {
    dt_permission.row($(this).parents('tr')).remove().draw();
  });

  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $('.dataTables_filter .form-control').removeClass('form-control-sm');
    $('.dataTables_length .form-select').removeClass('form-select-sm');
  }, 300);
});
