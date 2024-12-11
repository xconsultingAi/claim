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

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
    userView = assetPath + 'app/user/view/account';
  }
  var humanFriendlyPickr = $('.flatpickr-human-friendly');
  if (humanFriendlyPickr.length) {
    humanFriendlyPickr.flatpickr({
      altInput: false,
      altFormat: 'F j, Y',
      dateFormat: 'd-m-Y',
      allowInput: true,

    });
  }

  var startTimePickr = $('#admission_time').flatpickr({
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    clickOpens: true,
    time_24hr: true,
  });
  var startTimePickr = $('#clinical_time').flatpickr({
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    clickOpens: true,
    time_24hr: true,
  });

  $('select').each(function () {
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
        var formData = $(form).serialize(); // Get the form data
        var blackrock_id = $('#blackrock_id').val();
        var procedure_id = $('#procedure_id').val();
        var patient_id = $('#patient_id').val();
        var in_patient = $('#in_patient').prop('checked') ? 1 : 0;
        var daycase = $('#day_case').prop('checked') ? 1 : 0;
        var theatre_id = $('#theatre_id').prop('checked') ? 1 : 0;
        var side_room = $('#side_room').prop('checked') ? 1 : 0;
        var consent_form = $('#consent_form').prop('checked') ? 1 : 0;
        var history = $('#history').prop('checked') ? 1 : 0;
        var investigation = $('#investigation').prop('checked') ? 1 : 0;
        var investigations_request = $('#investigations_request').prop('checked') ? 1 : 0;
        var verification_id = $('#verification_id').prop('checked') ? 1 : 0;
        var request_private_id = $('#request_private_id').prop('checked') ? 1 : 0;

        // Append the values to formData
        formData += '&in_patient=' + in_patient + '&day_case=' + daycase;
        formData += '&theatre_id=' + theatre_id + '&side_room=' + side_room;
        formData += '&consent_form=' + consent_form + '&history=' + history;
        formData += '&investigation=' + investigation + '&investigations_request=' + investigations_request;
        formData += '&verification_id=' + verification_id + '&request_private_id=' + request_private_id;
        formData += '&procedure_id=' + procedure_id;

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
          createUpdateBlackrock(formId, formData);
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
                createUpdateBlackrock(id, formData);

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
function createUpdateBlackrock(formData_id, formData) {
  var url = formData_id ? baseurl + '/private-clinic/patient/forms/blackrock-update/' + formData_id : baseurl + '/private-clinic/patient/forms/blackrock-store';
  var method = formData_id ? 'PUT' : 'POST';
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
        confirmButtonText: 'OK'
      };

      if (response.status === 'success') {
        var id = response.id;
        var formdata = response.form_id;
        Swal.fire(swalConfig).then(function (result) {
          window.location.href = baseurl + '/private-clinic/patient/forms/blackrock-report/' + formdata + '/' + id;
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
          var newOption = new Option(newProcedure.name + " "+ newProcedure.code , newProcedure.id, true, true);
          $('#procedure_id').append(newOption).trigger('change');
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