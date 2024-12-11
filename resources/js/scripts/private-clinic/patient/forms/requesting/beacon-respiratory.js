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
    $('#status').select2({
        placeholder: 'Select Status',
        allowClear: false
      });
    select.each(function () {
        var $this = $(this);
        // $this.wrap('<div class="position-relative"></div>');
        $this.select2({
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
                    createUpdateBeacon(formId, formData);
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
                                createUpdateBeacon(id, formData);

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
function createUpdateBeacon(formData_id, formData) {
    var beaconeUpdate = 'requesting-form/beacon-respiratory-update';
    var beaconCreate = 'requesting-form/beacon-respiratory-store';
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
                    window.location.href = baseurl + '/private-clinic/patient/requesting-form/beacon-respiratory/' + formdata + '/' + id;
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
function saveProcedure() {
    var formData = $('#addProcedureForm').serialize();
    var url = baseurl + '/procedures';
  
    $.ajax({
      url: url,
      method: 'POST',
      data: formData,
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success: function (response) {
        var message = response.message || 'Procedure saved successfully';
        var icon = response.status === 'success' ? 'success' : 'error';
        Swal.fire({
          title: response.status,
          text: message,
          icon: icon,
          confirmButtonText: 'OK'
        }).then(function (result) {
          if (response.status === 'success') {
            var newProcedure = response.procedure;
            var newOption = new Option(newProcedure.name + "  (" + newProcedure.code + ")" , newProcedure.id, true, true);
            $('#procedure1').append(newOption).trigger('change');
            $('#addProcedure').modal('hide');
            $('.modal-backdrop').remove();
          }
        });
      },
      error: function (xhr, status, error) {
        Swal.fire({
          title: status,
          text: error.responseText,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  
    return false;
  }
