//const { received } = require("laravel-mix/src/Log");

/*=========================================================================================
    File Name: app-user-view.js
    Description: User View page
    --------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
var locations;
var baseurl = window.location.origin;
$(function () {
  ('use strict');

  // Extract the ID from the URL
  var url = window.location.href;
  var patient_id_clinical_notes = url.substring(url.lastIndexOf('/') + 1);


  var dtUserTable = $('.Expense-list-table');
  var url = window.location.href;
  var id = url.substring(url.lastIndexOf('/') + 1);


  $(document).on('click', '.add-expense-btn', function () {
    window.location.href = '/private-clinic/expense-details/create/';
  });

  var baseurl = window.location.origin;
  var assetPath = '../../../app-assets/',
    userView = 'app-user-view-account.html';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
    userView = assetPath + 'private-clinic/patient/patient-clinical-notes/get/';
  }
  
  
  $.fn.dataTable.ext.order['dom-checkbox'] = function (settings, colIdx) {
    return this.api()
      .column(colIdx, { order: 'index' })
      .nodes()
      .map(function (td) {
        return $('input.verified-checkbox', td).prop('checked') ? 1 : 0; // 1 if checked, 0 if unchecked
      });
  };

  if (dtUserTable.length) {
    dtUserTable.DataTable({
      // ajax: assetPath + 'private-clinic/print-tray/get_letter_list/', // JSON file to add data
      autoWidth: false,
      ajax: {
        url: assetPath + 'private-clinic/print-tray/get_letter_list/',
        method: 'GET',
        xhrFields: {
            withCredentials: true // Ensure cookies are sent with the request
        }
      },
      columns: [
        // columns according to JSON
        { data: '' },                 //Sr No
        { data: 'user_id' },
        { data: 'date' },
        { data: 'date' },
        { data: '' }
      ],
      columnDefs: [

        {
          targets: 0,
          responsivePriority: 3,
          render: function (data, type, full, meta) {

            var rowNumber = meta.row + 1;
            return rowNumber;
          }
        },
        {
          targets: 1,
          responsivePriority: 2,
          render: function (data, type, full, meta) {
            // console.log(full);
            return '<span class="text-wrap text-break" style="width:700px !important;">' + full['date'] ?? "Not FOund" + '</span>';
          }
        },
        {
          targets: 2,
          responsivePriority: 2,
          render: function (data, type, full, meta) {
            let userName = full.user 
                ? full.user.firstname + ' ' + full.user.lastname 
                : 'Unknown User';
        
            let redirectionUrl = $(location).attr('href'); 
        
            return '<a href="' +
                baseurl + '/private-clinic/patient/patient-letters/edit/' + full.user_id + '/' + full.id +
                '?templateid=' + full.letter_template_id + '&redirectionUrl=' + encodeURIComponent(redirectionUrl) +
                '" class="dropdown-item" data-clinicalid="' + full.id + '">' +
                feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) +
                '<span class="text-wrap text-break" style="width:700px !important;"> Letter to be verified for ' 
                + userName + ' - ' + full.description + '</span>' +
                '</a>';
        }
        
        },

        {
          targets: 3,
          responsivePriority: 2,
          orderDataType: 'dom-checkbox',
          render: function (data, type, full, meta) {
            let rowId = full['id'];
            let templateId = full['letter_template_id'];
            let ischeck = full['is_verified'];
        
            return `
              <div style="width:100px !important;">
                <input type="checkbox" class="row-checkbox verified-checkbox" data-row-id="${rowId}" data-row-template_id="${templateId}" ${ischeck == 1 ? 'checked' : ''} />
                <span class="text-wrap text-break">Verified</span>
              </div>
              <div style="width:100px !important;">
                <input type="checkbox" class="row-checkbox printed-checkbox" data-row-id="${rowId}" data-row-template_id="${templateId}" />
                <span class="text-wrap text-break">Printed</span>
              </div>
            `;
          },
          orderData: [3], // Sorting by this column
          createdCell: function (td, cellData, rowData) {
            const isVerified = rowData.is_verified ? 1 : 0; // 1 if checked, 0 if not
            $(td).attr('data-sort', isVerified);
          }
        },


        {
          targets: 4,
          title: 'Actions',
          orderable: false,
          render: function (data, type, full, meta) {
            let rowId = full['id'];
            let templateId = full['letter_template_id'];
            let patient_id = full['user_id'];
            return `
            <div style="display: flex; justify-content: center; align-items: center;">
                <input type="checkbox" class="row-checkbox letter-checkbox" data-row-id="${rowId}" data-row-template_id="${templateId}" data-patient-id="${patient_id}"/>
            </div>
        `;

          }
        },
      ],
      order: [[3, 'asc']],
      "paging": false,
      dom:
      '<"d-flex justify-content-between align-items-center header-actions mx-0 row mt-0"' +
        '<"col-auto" l>' + // Length Menu
        '<"col-auto d-flex justify-content-center heading-wrapper"> ' + // Heading Wrapper
        '<"col-auto" f>' + // Search Box
        '<"col-auto"<"dt-action-buttons d-flex"B>>' + // Buttons Block
      '>t' + // Table content
      '<"d-flex justify-content-between mx-2 row mb-1"' +
        '<"col-sm-12 col-md-6"i>' + // Info (records info)
        '<"col-sm-12 col-md-6"p>' + // Pagination
      '>',

        buttons: [
          {
            text: 'Check All',
            className: 'btn btn-primary',
            action: function () {
              $('.letter-checkbox').prop('checked', true); 
            }
          },
          {
            text: 'Clear All',
            className: 'btn btn-secondary',
            action: function () {
              $('.letter-checkbox').prop('checked', false); 
            }
          },
    
          {
            text: 'Print',
            className: 'btn btn-secondary',
            action: function () {
                const selectedLetters = [];
                $('.letter-checkbox:checked').each(function () {
                    const rowId = $(this).data('row-id');
                    const templateId = $(this).data('row-template_id');
                    const patient_id = $(this).data('patient-id');
        
                    selectedLetters.push({
                        rowId: rowId,
                        templateId: templateId,
                        patient_id: patient_id
                    });
                });
        
                if (selectedLetters.length > 0) {
                    let index = 0;
        
                    function openNextLetter() {
                        if (index < selectedLetters.length) {
                            const { rowId, templateId, patient_id } = selectedLetters[index];
                            if (templateId !== undefined) {
                                const printUrl = baseurl + '/private-clinic/patient/patient-letters/print/' + patient_id + '/' + rowId + '?templateid=' + templateId;
                                const printWindow = window.open(printUrl, '_blank');
        
                                // Wait for the letter to load and make an AJAX call to update the print status
                                printWindow.onload = function () {
                                    $.ajax({
                                        url: baseurl + `/private-clinic/print-tray/update-printed/${rowId}/${templateId}`,
                                        method: 'PUT',
                                        data: {
                                            _token: $('meta[name="csrf-token"]').attr('content'),
                                            row_id: rowId,
                                            Is_Printed: true
                                        },
                                        success: function (response) {
                                            toastr.success(`Letter ${rowId} has been printed successfully.`, "Printed!");
                                            index++;
                                            openNextLetter(); // Call the function recursively to open the next letter
                                        },
                                        error: function (xhr, status, error) {
                                            toastr.error(`Error updating status for letter ${rowId}.`, "Error!");
                                            index++; // Move to next letter even on error
                                            openNextLetter(); // Continue to next letter
                                        }
                                    });
                                };
                            } else {
                                console.error(`Template ID for row ${rowId} is undefined.`);
                                index++;
                                openNextLetter(); // Skip to the next letter if template ID is missing
                            }
                        } else {
                            // All letters have been printed, reload the DataTable here
                            dtUserTable.DataTable().ajax.reload(null, false);
                            toastr.success("All selected letters have been printed.", "Printing Completed!");
                        }
                    }
        
                    // Start the process by opening the first letter
                    openNextLetter();
        
                } else {
                    toastr.options = {
                        "closeButton": true,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": true,
                        "positionClass": "toast-top-right",
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": "1000",
                        "hideDuration": "500",
                        "timeOut": "3500",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    };
                    toastr.error("Please select at least one letter to print.", "Action Not Allowed");
                }
            }
          }

          
        ],

    });

    

  }

 

});




$(document).ready(function () {
  $.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "1000",
    "hideDuration": "1500",
    "timeOut": "3500",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}
  $(document).on('change', '.verified-checkbox', function () {
    let rowId = $(this).data('row-id');
    let template_id = $(this).data('row-template_id');
    let isChecked = $(this).is(':checked');
    var dtUserTable = $('.Expense-list-table');

    if (isChecked) {
      // console.log('Verified checkbox checked for row: ' + rowId);

      $.ajax({
        url: baseurl + `/private-clinic/print-tray/update-verified/${rowId}/${template_id}`,
        method: 'PUT',                  
        data: {
            _token: $('meta[name="csrf-token"]').attr('content'), 
            row_id: rowId,              
            is_verified: isChecked      
        },
        success: function(response) {   
            toastr.success("Letter has been verified.", "Verified!");
            dtUserTable.DataTable().ajax.reload(null, false);
        },
        error: function(xhr, status, error) {
            toastr.error("Error updating verification status.", "Error!");
        }
    });

    } else {
      // console.log('Verified checkbox unchecked for row: ' + rowId);

        $.ajax({
          url: baseurl + `/private-clinic/print-tray/update-verified/${rowId}/${template_id}`,
          method: 'PUT',                  
          data: {
              _token: $('meta[name="csrf-token"]').attr('content'), 
              row_id: rowId,              
              is_verified: isChecked      
          },
          success: function(response) {   
              toastr.success("Letter has been unverified.", "Unverified!");
              dtUserTable.DataTable().ajax.reload(null, false);
          },
          error: function(xhr, status, error) {
              toastr.error("Error updating verification status.", "Error!");
          }
      });

    }
  });


  let isPrinted     = getQueryParam('Printed') ?? "";
  let PrintedID     = getQueryParam('id') ?? "";
  let PrintedTempID = getQueryParam('PrintedTempID') ?? "";
  var dtUserTable = $('.Expense-list-table');

  if(isPrinted === "true")
  {
    let isChecked  =true;

      $.ajax({
        url: baseurl + `/private-clinic/print-tray/update-printed/${PrintedID}/${PrintedTempID}`,
        method: 'PUT',                  
        data: {
            _token: $('meta[name="csrf-token"]').attr('content'), 
            row_id: PrintedID,              
            Is_Printed: isChecked      
        },
        success: function(response) {   
            toastr.success("Letter has been printed.", "Printed!");
            dtUserTable.DataTable().ajax.reload(null, false);
            let newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
        },
        error: function(xhr, status, error) {
            toastr.error("Error updating printing status.", "Error!");
        }


      });
  }

  function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
    }

  $(document).on('change', '.printed-checkbox', function () {
    let rowId = $(this).data('row-id');
    let template_id = $(this).data('row-template_id');
    let isChecked = $(this).is(':checked');
    var dtUserTable = $('.Expense-list-table');

    if (isChecked) {
      // console.log('Printed checkbox checked for row: ' + rowId);

      $.ajax({
        url: baseurl + `/private-clinic/print-tray/update-printed/${rowId}/${template_id}`,
        method: 'PUT',                  
        data: {
            _token: $('meta[name="csrf-token"]').attr('content'), 
            row_id: rowId,              
            Is_Printed: isChecked      
        },
        success: function(response) {   
            toastr.success("Letter has been printed.", "Printed!");
            dtUserTable.DataTable().ajax.reload(null, false);
        },
        error: function(xhr, status, error) {
            toastr.error("Error updating printing status.", "Error!");
        }


    });

    } else {
      // console.log('Printed checkbox unchecked for row: ' + rowId);

        $.ajax({
          url: baseurl + `/private-clinic/print-tray/update-printed/${rowId}/${template_id}`,
          method: 'PUT',                  
          data: {
              _token: $('meta[name="csrf-token"]').attr('content'), 
              row_id: rowId,              
              Is_Printed: isChecked      
          },
          success: function(response) {   
              toastr.success("Letter has not printed.", "Not Printed!");
          },
          error: function(xhr, status, error) {
              toastr.error("Error updating printing status.", "Error!");
          }
          });

    }
  });
});
