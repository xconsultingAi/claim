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
   var clinical_notes_date  = $("#clinical_notes_date");

   if (clinical_notes_date.length) {
    var clinical_notes_date = clinical_notes_date.flatpickr({
        enableTime: false,
        altFormat: 'F j, Y',
        dateFormat: 'd-m-Y',
        allowInput: true,
        onReady: function (selectedDates, dateStr, instance) {
            if (instance.isMobile) {
                $(instance.mobileInput).attr('step', null);
            }
        }
    });
    }

  var baseurl = window.location.origin;
    var id = $('#id').val();
    var patient_id = $('#patient_id').val();

    if ($.isNumeric(id) == true) {

        $('#submit_button').text('Update');
        $.ajax({
            url: baseurl + '/private-clinic/patient/patient-clinical-notes/getclinical_notesById/'+patient_id+'/'+id,
            type: 'GET',
            success: function (response) {
                if (response.status == 'success') {
                    // console.log(response);return;
                    var userInfo = response.userInfo;

                    $('#id').val(userInfo.id);
                    var clinical_notes_date = userInfo.clinical_notes_date.split('-');
                    $('#clinical_notes_date').val(clinical_notes_date[2] + '-' + clinical_notes_date[1] + '-' + clinical_notes_date[0]).trigger('change');

                }

            }
        });
    }

   if (form.length) {
    form.validate({
        rules: {
            'clinical_notes': {
                required: true
            }
        },

        submitHandler: function (form) {
            var formData = $(form).serialize(); // Get the form data
            var patient_id = $('#patient_id').val();
            var note_id = $('#id').val();
            var route = 'private-clinic/patient/patient-clinical-notes/';
            var url = assetPath + route;
            var method = 'POST';
            if (patient_id && note_id) {
                method = 'PUT'; 
                url += 'update/' + patient_id + '/' + note_id;
            } else if (patient_id) {
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
                    console.error(error);
                    Swal.fire({
                        title: error.status,
                        text: error.statusText,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            });

            return false; 
        }

    });
}


  });
