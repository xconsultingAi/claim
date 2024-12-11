/*=========================================================================================
  File Name: create_template.js
  Description: jquery bootstrap validation js
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: PIXINVENT
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
var baseurl = window.location.origin; 
$(function () {
  'use strict';
  var humanFriendlyPickr = $('.flatpickr-human-friendly');
  if (humanFriendlyPickr.length) {
    humanFriendlyPickr.flatpickr({
      altInput: false,
      altFormat: 'F j, Y',
      dateFormat: 'd-m-Y',
      allowInput: true,
    });
  }
  $('#procedure_id').select2({
    placeholder: 'Select Procedure',
    allowClear: true
  });
  $('#status').select2({
    placeholder: 'Select Status',
    allowClear: true
  });
  var startTimePickr = $('#booking_time').flatpickr({
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    clickOpens: true,
    time_24hr: true // Added this line to enable 24-hour format
  });

  var startTimePickr = $('#Hermitage_clinic_booking_Procedure_time').flatpickr({
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    clickOpens: true,
    time_24hr: true // Added this line to enable 24-hour format
  });

  var startTimePickr = $('#Hermitage_clinic_booking_time').flatpickr({
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    clickOpens: true,
    time_24hr: true // Added this line to enable 24-hour format
  });

  var startTimePickr = $('#Hermitage_clinic_booking_time').flatpickr({
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    clickOpens: true,
    time_24hr: true // Added this line to enable 24-hour format
  });



  $('#payment_method').change(function () {
    if ($(this).val() === 'other') {
      $('#otherInsuranceRow').show();
      $('#insurance_policy_other').prop('disabled', false);
    } else {
      $('#insurance_policy_other').prop('disabled', true);
    }
  });

  $('input[name="is_admitted_to_hospital_radio"]').change(function () {
    if ($(this).val() === "1") {
      $('#if_yes_reason_div').show();
      $('#if_yes_reason').prop('disabled', false);
      $('#if_yes_reason').prop('required', true);
    } else {
      $('#if_yes_reason_div').hide();
      $('#if_yes_reason').prop('disabled', true);
      $('#if_yes_reason').prop('required', false);
    }
  });
  // if (typeof form_id === 'undefined' || form_id === null) {
  //   $('#consultant_id').on('change', function () {
  //     var selectedOption = $(this).find('option:selected');
  //     var phone = selectedOption.data('phone');
  //     var imc = selectedOption.data('imc');
  //     $('#consultant_phone').val(phone);
  //     $('#consultant_imc').val(imc);
  //   });
  // }
  var form = $('#dataForm');
  $('#procedure_id').trigger('change');
  $('#payment_method').trigger('change');

  if (form.length) {
    form.validate({
      rules: {
        form_type_radio: {
          required: true
        },
        errorClass: 'error'
      },
      messages: {
        form_type_radio: {
          required: "Please Select"
        },
      },

      submitHandler: function (form) {
        $('#submit_button').prop('disabled', true);
        var formData = $(form).serialize(); // Get the form data
        var patient_id = $('#patient_id').val();
        var form_type_id = $('#form_type_id').val();
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

        if (formId != null) {
          createUpdateHermitage(formId, formData);
        }
        else {
          var url = (patient_id && formId)
            ? '/private-clinic/patient/forms/update/' + patient_id + '/' + formId
            : '/private-clinic/patient/forms/' + patient_id;

          var method = formId ? 'PUT' : 'POST'; // Use PUT for update, POST for create
          var baseurl = window.location.origin;
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
                var formData_id = $('#formdata_id').val();
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
  var hermitageUpdate = 'hermitage-update';
  var hermitageCreate = 'hermitage-store';
  var url = formData_id ? baseurl + '/private-clinic/patient/forms/' + hermitageUpdate + '/' + formData_id : baseurl + '/private-clinic/patient/forms/' + hermitageCreate;
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
          window.location.href = baseurl + '/private-clinic/patient/forms/hermitage-report/' + formdata + '/' + id;
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
          var newOption = new Option(newProcedure.name + " " + newProcedure.code, newProcedure.id, true, true);
          $('#procedure_id').append(newOption).trigger('change');
          $('#addProcedure').modal('hide');
          $('#addProcedure').on('hidden.bs.modal', function () {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            $('body').css('overflow', 'auto');
          });
        }
      });
    },
    error: function (xhr, status, error) {
      Swal.fire({
        title: status,
        text: xhr.responseText,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  });

  return false;
}
