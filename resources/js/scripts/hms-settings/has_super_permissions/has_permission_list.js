/*=========================================================================================
    File Name: doctor.js
    Description: Doctor Types List page
    --------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent

==========================================================================================*/
var Exist_Record = null;
function openEditPermissionModal(id, name) {
    // Check if the permissions_id is valid
    if (id) {
        // Set the values to the hidden input fields in the modal
        document.getElementById('permissionId').value = id;
       
        // document.getElementById('permissionName').value = name;
    } else {
        console.error('Invalid permissions_id');
    }
}

function openDisablePermissionModal(id) {
    // Check if the permissions_id is valid
    if (id) {
        // Set the values to the hidden input fields in the modal
        document.getElementById('permissionId').value = id;
        
        // document.getElementById('permissionName').value = name;
    } else {
        console.error('Invalid permissions_id');
    }
}


$(document).on('click', '.toggle-permission', function (e) {
    e.preventDefault();
    var id = $(this).data('id');
    //var currentState = $(this).data('state');
    checkExistingValue(id)
        .then(function(result) {
            
            if ( result === true) {
                console.log(id + " enabled");

                openDisablePermissionModal(id);
                $('#disablePermissionModal').modal('show');
                
            } else {
                console.log(id + " Not enabled");
                openEditPermissionModal(id);
                $('#editPermissionModal').modal('show');
                
            }
            //console.log(result); // true or false
        })
        .catch(function(error) {
            console.error(error);
    });

    //console.log(id);
   // console.log(checkExistingValue(id));
    
    
});


function checkExistingValue(valueToCheck) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: '/has-permission/check-existing-value/' + valueToCheck,
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        data: {
          value: valueToCheck
        },
        success: function(response) {
          if (response.exists) {
            resolve(true);  // Resolve with true if the value exists
          } else {
            resolve(false); // Resolve with false if the value does not exist
          }
        },
        error: function(error) {
          console.error('Error:', error);
          reject(error); // Reject with the error object
        }
      });
    });
  }
  

$(function () {
    ('use strict');
    var dtUserTable = $('.branch-type-list-table'),
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
       $('.branch-type-list-table thead tr').clone(true).appendTo('.branch-type-list-table thead');
       $('.branch-type-list-table thead tr:eq(1) th').each(function (i) {
         if (i < $('.branch-type-list-table thead tr:eq(1) th').length - 1) {
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
        ajax: assetPath + 'has-permission/get-permission-list',
        columns: [
          // columns according to JSON
          { data: 'id' },
          { data: 'name' },
         // { data: 'permissions_id' },
          { data: '' }
        ],
        columnDefs: [
          {
            targets: 0,
            render: function (data, type, full, meta) {
              var $name = full['id'];
  
              return '<span class="text-nowrap">' + $name + '</span>';
            }
          },
          {
            targets: 1,
            render: function (data, type, full, meta) {
              var $email = full['name'];
  
              return '<span class="text-nowrap">' + $email + '</span>';
            }
          },
          {
            // Actions
            targets: -1,
            title: 'Actions',
            orderable: false,
          

            render: function (data, type, full, meta) {
           
          
            return (

                  '<button data-id="' + full['id'] + '" class="btn btn-sm btn-icon toggle-permission" >' +
                  feather.icons['power'].toSvg({ class: 'font-medium-4 text-body' }) +
                  '</button>'
                
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
           text: 'Add New Permission',
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

  
    $(".add-type").click(function(){
      window.location.pathname = '/permissions';
    }); 

  
    
  });
  