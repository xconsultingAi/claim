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

    var humanFriendlyPickr = $('.flatpickr-human-friendly');
    if (humanFriendlyPickr.length) {
        humanFriendlyPickr.flatpickr({
            altInput: false,
            altFormat: 'F J, Y',
            dateFormat: 'd-m-Y',
            allowInput: true,
        });
    }
    select.each(function () {
        var $this = $(this);
        $this.wrap('<div class="position-relative"></div>');
        $this.select2({
            dropdownAutoWidth: true,
            width: '100%',
            dropdownParent: $this.parent()
        });
    });

    function toggleSpecifyField(triggerSelector, targetSelector) {
        $(document).on('change', triggerSelector, function () {
            $(targetSelector).prop('disabled', $(this).val() !== '0');
        });
    }
    toggleSpecifyField('#consistent_accident', '#consistent_accident_specify');
    toggleSpecifyField('#further_investigations', '#further_investigations_specify');
    toggleSpecifyField('#recovery_expected', '#recovery_expected_specify');
    toggleSpecifyField('#complications_expected', '#complications_expected_specify');
    toggleSpecifyField('#reports_recommended', '#reports_recommended_specify');

    var form = $('#dataForm');

    if (form.length) {
        form.validate({
            rules: {
                errorClass: 'error'
            },
            submitHandler: function (form) {
                $('#submit_button').prop('disabled', true);
                var formData = $(form).serialize(); // Get the form data
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
                    createUpdateMedical(formId, formData);
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
                                createUpdateMedical(id, formData);

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
function createUpdateMedical(formData_id, formData) {
    var medicalUpdate = 'requesting-form/medical-report-update';
    var medicalCreate = 'requesting-form/medical-report-store';
    var url = formData_id ? baseurl + '/private-clinic/patient/' + medicalUpdate + '/' + formData_id : baseurl + '/private-clinic/patient/' + medicalCreate;
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
                    window.location.href = baseurl + '/private-clinic/patient/requesting-form/medical-report/' + formdata + '/' + id;
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
