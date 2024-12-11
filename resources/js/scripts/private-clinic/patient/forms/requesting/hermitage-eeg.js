/*=========================================================================================
  File Name: create.js
  Description: Auth register js file.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: PIXINVENT
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
var baseurl = window.location.origin;
$(function () {
    ('use strict');
    var assetPath = '../../../app-assets/',
        userView = 'app-user-view-account.html';
    select = $('.select2');
    humanFriendlyPickr = $('.flatpickr-human-friendly');

    if ($('body').attr('data-framework') === 'laravel') {
        assetPath = $('body').attr('data-asset-path');
        userView = assetPath + 'app/user/view/account';
    }
    // var existingDate = $('#date').val();

    var humanFriendlyPickr = $('.flatpickr-human-friendly');
    if (humanFriendlyPickr.length) {
        humanFriendlyPickr.flatpickr({
            altInput: false, // Change this to true to use altFormat
            altFormat: 'F J, Y',
            dateFormat: 'd-m-Y',
            allowInput: true,
            // defaultDate: existingDate ? existingDate : 'today'
        });
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

    var form = $('#dataForm');

    if (form.length) {
        form.validate({
            rules: {
                errorClass: 'error'
            },

            submitHandler: function (form) {
                $('#submit_button').prop('disabled', true);
                var formData = $(form).serialize();
                var form_type_id = $('#form_type_id').val();
                var patient_id = $('#patient_id').val();
                var form_template_id = $('#form_template_id').val();
                var date = $('#date').val();
                var description = $('#description').val();
                var temp_data = '';

                var formId = $('#form_id').val();
                var temp_data = {
                    patient_id: patient_id,
                    form_type_id: form_type_id,
                    form_template_id: form_template_id,
                    date: date,
                    description: description
                };

                if (formId !== '') {
                    createUpdateHermitage(formId, formData);
                }
                else {
                    var baseurl = window.location.origin;
                    var url = baseurl + '/private-clinic/patient/forms/' + patient_id;

                    var method = formId ? 'PUT' : 'POST'; // Use PUT for update, POST for create
                    $.ajax({
                        url: url,
                        method: method,
                        data: temp_data,
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        success: function (response) {
                            // Handle the success response
                            if (response.status == 'success') {
                                var id = '';
                                var new_formid = response.result.id;
                                formData += '&formid=' + encodeURIComponent(new_formid);
                                createUpdateHermitage(id, formData);

                            } else {
                                Swal.fire({
                                    title: response.status,
                                    text: response.message,
                                    icon: response.status,
                                    confirmButtonText: 'OK'
                                });
                            }
                        },
                        error: function (xhr, status, error) {
                            // Handle the error response
                            // Display an error message or perform any other error handling
                            console.error(error);
                            Swal.fire({
                                title: error.status,
                                text: error.message,
                                icon: error.status,
                                confirmButtonText: 'OK'
                            });

                        }
                    });
                }
                return false; // Prevent the form from being submitted
            }
        });
    }


});
function createUpdateHermitage(formData_id, formData) {
    var beaconeUpdate = 'requesting-form/hermitage-eeg-update';
    var beaconCreate = 'requesting-form/hermitage-eeg-store';
    var url = formData_id ? baseurl + '/private-clinic/patient/' + beaconeUpdate + '/' + formData_id : baseurl + '/private-clinic/patient/' + beaconCreate;
    var method = formData_id ? 'PUT' : 'POST';
    $.ajax({
        url: url,
        method: method,
        data: formData,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (response) {
            var id = response.id;
            var formdata = response.form_id;
            var swalConfig = {
                title: response.status,
                text: response.message,
                icon: response.status,
                confirmButtonText: 'OK'
            };

            if (response.status === 'success') {
                Swal.fire(swalConfig).then(function (result) {
                    window.location.href = baseurl + '/private-clinic/patient/requesting-form/hermitage-eeg/' + formdata + '/' + id;
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
}
function onCancel() {
    var patient_id = $('#patient_id').val();
    window.location.href = baseurl + '/private-clinic/patient/forms/get/' + patient_id;
}
