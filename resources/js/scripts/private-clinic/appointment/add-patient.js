$(document).ready(function () {

  $(document).on('input', '.select2-search__field', function () {
    var inputValue = $(this).val();
    if ($.isNumeric(inputValue)) {
      $('#mobile_no').val(inputValue);
    }
  });


  var assetPath = '../../../app-assets/',
    userView = 'app-user-view-account.html';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
    userView = assetPath + 'app/user/view/account';
  }

  $('#addPatientForm').validate({
    rules: {
      firstname: {
        required: true
      },
      lastname: {
        required: true
      },
      mobile_no: {
        required: true,
        minlength: 10,
        maxlength: 50
      }
    },
    messages: {
      firstname: {
        required: "Please enter a first name"
      },
      lastname: {
        required: "Please enter a surname"
      },
      dob: {
        required: "Please select date of birth",
      },
      address: {
        required: "Please enter address",
      }
    },
    submitHandler: function (form) {
      $('#role_id').val($('#hidden_role_id').val());
      $('#patient_type_id').val($('#hidden_patient_type_id').val());
      var formData = $(form).serialize();
      var dataSaveRoute = 'patient/create';
      console.log(dataSaveRoute);
      $.ajax({
        url: assetPath + dataSaveRoute,
        type: 'POST',
        data: formData,
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (response) {
          if (response.status == 'success') {
            var newPatient = response.newPatient;
            console.log(newPatient);
            var newOption = new Option(newPatient.firstname + " " + newPatient.lastname + " (" + newPatient.mobile_no + ")", newPatient.id, true, true);
            $('#patient_user_id').append(newOption).trigger('change');

            toastr.success(response.message);
            $('#addPatientModal').modal('hide');
          }
        },
        error: function (xhr, status, error) {
          var errorMessage = xhr.status + ': ' + xhr.statusText
          Swal.fire({
            title: 'Error',
            text: 'Failed to process the request. ' + errorMessage,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
      return false; // Prevent the default form submit
    }
  });

  var startInput = $('#dob');
  startInput.flatpickr({
    enableTime: false,
    altFormat: 'd-m-Y',
    dateFormat: 'd-m-Y',
    defaultDate: 'today',
    allowInput: true,
    onReady: function (selectedDates, dateStr, instance) {
      if (instance.isMobile) {
        $(instance.mobileInput).attr('step', null);
      }
    }
  });

  $('#patient_user_id').change(function () {
    var selectedPatientId = $(this).val();
    var selectedPatientTypeId = $(this).find('option:selected').data('patient_type_id');
    var selectedPatientName = $(this).find('option:selected').text().trim();
    var patientName = selectedPatientName.substring(0, selectedPatientName.indexOf('(')).trim();
    var patientId = selectedPatientId;

    if (patientId != '' && patientId != null) {
      $('#patient_detail #patient_detail_small').text("Detail of " + patientName);
      $('#patient_detail').attr('href', baseurl + '/private-clinic/patient/profile-view/' + patientId);
    }
  });

});
