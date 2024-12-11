/*=========================================================================================
  File Name: create.js
  Description: Auth register js file.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: PIXINVENT
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

$(function () {
    ('use strict');
    var assetPath = '../../../app-assets/',
    userView = 'app-user-view-account.html';
  
    if ($('body').attr('data-framework') === 'laravel') {
      assetPath = $('body').attr('data-asset-path');
      userView = assetPath + 'app/user/view/account';
    }
   var form = $('#dataForm');

   if (form.length) {
    form.validate({
        rules: {
            'examination': {
                required: true
            }
        },
        
        submitHandler: function (form) {
            var formData = $(form).serialize(); // Get the form data
            var patient_id = $('#patient_id').val();
            var note_id = $('#id').val();
            var route = 'private-clinic/patient/examination-history/';
            var url = assetPath + route;
            var method = 'POST'; // Default to POST method
            //console.log(" Patient ID: " + patient_id);
            //console.log("Note ID: " + note_id);
            if (patient_id && note_id) {
                method = 'PUT'; // Use PUT method if both patient_id and note_id are available
                url += 'update/' + patient_id + '/' + note_id;
                //console.log("put url: " + url);
            } else if (patient_id) {
                // Use POST method if only patient_id is available
                url += patient_id;
            }
        
            $.ajax({
                url: url,
                method: method,
                data: formData,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function (response) {
                    // Handle the success response
                    var swalConfig = {
                        title: response.status,
                        text: response.message,
                        icon: response.status,
                        // confirmButtonText: 'OK'
                        showConfirmButton: false,
                        timer: 800
                    };
        
                    if (response.status === 'success') {
                        Swal.fire(swalConfig).then(function (result) {
                            window.location.href = assetPath + route + 'get/' + patient_id;
                        });
                    } else {
                        Swal.fire(swalConfig);
                    }
                },
                error: function (xhr, status, error) {
                    // Handle the error response
                    // Display an error message or perform any other error handling
                    console.error(error);
                    Swal.fire({
                        title: error.status,
                        text: error.statusText,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            });
        
            return false; // Prevent the form from being submitted
        }
    });
}
    
   
  });
  