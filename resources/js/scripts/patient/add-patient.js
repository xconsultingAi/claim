/*=========================================================================================
  File Name: auth-register.js
  Description: Auth register js file.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: PIXINVENT
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

$(function () {
  ('use strict');
  var assetsPath = '../../../app-assets/',
    registerMultiStepsWizard = document.querySelector('.register-multi-steps-wizard'),
    pageResetForm = $('.auth-register-form'),
    select = $('.select2'),
    creditCard = $('.credit-card-mask'),
    expiryDateMask = $('.expiry-date-mask'),
    cvvMask = $('.cvv-code-mask'),
    mobileNumberMask = $('.mobile-number-mask'),
    humanFriendlyPickr = $('.flatpickr-human-friendly'),
    employee_detail = 0;
    pinCodeMask = $('.pin-code-mask');
    $(".employee_dep").hide();

        // Human Friendly
        if (humanFriendlyPickr.length) {
          humanFriendlyPickr.flatpickr({
            altInput: false,
            altFormat: 'F j, Y',
            dateFormat: 'Y-m-d',
            allowInput: true
          });
        }    

  if ($('body').attr('data-framework') === 'laravel') {
    assetsPath = $('body').attr('data-asset-path');
  }
  var baseurl = window.location.origin;

  var url = window.location.href;
  var id = url.substring(url.lastIndexOf('/') + 1);
  //console.log(id);return;
  if ($.isNumeric(id) == true) {
      
    $('#submit_button').text('Update');
    $.ajax({
      url: baseurl + '/patient/get-record-by-id/',
      type: 'GET',
      data:  {id: id},
      success: function(response) {
        if (response.status == 'success') {
          var userInfo = response.userInfo;
          var patientEmployment = response.userInfo.patientEmployment ?? [];

          $('#id').val(userInfo.id);
          $('#firstname').val(userInfo.firstname);
          $('#lastname').val(userInfo.lastname);
          $('#father_husband').val(userInfo.father_husband);
          $('#email').val(userInfo.email);
          $('#cnic').val(userInfo.cnic);
          $('#phone').val(userInfo.phone);
          $('#address').val(userInfo.address);

          if(userInfo.is_dependent == 1) {
            //$('#is_dependent').val(userInfo.is_dependent);
            $('#dependent_id').val(userInfo.dependent ? userInfo.dependent.id : '');
            $('#depends_on_user_id').val(userInfo.dependent ? userInfo.dependent.depends_on_user_id : '').trigger('change');
          } else {
            $('#is_dependent').val(0);
          }
          $('#role_id').val(userInfo.role_id).trigger('change');
          $('#patient_id').val(userInfo.patient ? userInfo.patient.id : '');
          $('#patient_type_id').val(userInfo.patient ? userInfo.patient.patient_type_id : '').trigger('change');
          $('#status').val(userInfo.status).trigger('change');
          $('#disease').val(userInfo.patient ? userInfo.patient.disease : '');
          //$('#dependent_id').val(userInfo.dependent ? userInfo.dependent.id : '');
          //$('#depends_on_user_id').val(userInfo.dependent ? userInfo.dependent.depends_on_user_id : '');

          $('#dob').val(userInfo.dob).trigger('change');
          // $('#age').val(userInfo.age).trigger('change');
          $('input[name=gender][value=' + userInfo.gender + ']').prop('checked', true);
          $('input[name=is_dependent][value=' + userInfo.is_dependent + ']').prop('checked', true).trigger('change');
          $('#er_firstname').val(userInfo.er_firstname);
          $('#er_lastname').val(userInfo.er_lastname);
          $('#er_email').val(userInfo.er_email);
          $('#er_phone').val(userInfo.er_phone);
          $('#er_cnic').val(userInfo.er_cnic);
          $('#er_address').val(userInfo.er_address);
          $('#relation').val(userInfo.dependent ? userInfo.dependent.relation :'').trigger('change');
          $('#depends_on_user_id').val(userInfo.dependent ? userInfo.dependent.depends_on_user_id : '').trigger('change');

          if (patientEmployment) {
            $('#patient_employment_id').val(patientEmployment.id);
            $('#employee_no').val(patientEmployment.employee_no);
            $('#joining_date').val(userInfo.joining_date).trigger('change');
            $('#last_date').val(userInfo.last_date).trigger('change');
            $('#designation').val(patientEmployment.designation);
            $('#employee_type').val(patientEmployment.employee_type).trigger('change');
            $('#scale').val(patientEmployment.scale).trigger('change');
            $('#department').val(patientEmployment.department).trigger('change');
            $('#employee_nature').val(patientEmployment.employee_nature).trigger('change');
          }
        }
      },
      error: function(xhr, status, error) {
        // Handle error response
        console.log('status');
      }
    });
  }

  $('form').each(function() {
    this.reset();
  });
  function calculateAge(dob) {
    var dobDate = new Date(dob);
    var currentDate = new Date();
    // Calculate the age
    var age = currentDate.getFullYear() - dobDate.getFullYear();
    if (
        currentDate.getMonth() < dobDate.getMonth() ||
        (currentDate.getMonth() === dobDate.getMonth() && currentDate.getDate() < dobDate.getDate())
    ) {
        age--;
    }
    return age;
}
$('#dob').on('change', function() {
    var dobValue = $(this).val();
    var age = calculateAge(dobValue);
    // Update the 'age' input field with the calculated age
    $('#age').val(age);
});
$("#age").on("input", function() {
  var currentYear = new Date().getFullYear();
  var age = parseInt($(this).val(), 10);
  var birthYear = currentYear - age;
  $("#dob").val(birthYear + "-01-01");
});
$(".employee_detail").hide();
$("#patient_type_id").change(function(){
  var selectedOption = $(this).find("option:selected"); 
  if (selectedOption.data("employee_detail")){
    employee_detail = 1;
    $(".employee_detail").show();
  } else {
    employee_detail = 0;
    $(".employee_detail").hide();   
     $('input[name=is_dependent][value=0]').prop('checked', true).trigger('change');
          
  }
});
$("input[name='is_dependent']").change(function () {
  var selectedValue = $("input[name='is_dependent']:checked").val(); 
  if (selectedValue == 1) {
      $(".employee_dep").show();
  } else  {
      $(".employee_dep").hide();
  }
});
  // jQuery Validation
  // --------------------------------------------------------------------
  if (pageResetForm.length) {
    pageResetForm.validate({
      /*
      * ? To enable validation onkeyup
      onkeyup: function (element) {
        $(element).valid();
      },*/
      /*
      * ? To enable validation on focusout
      onfocusout: function (element) {
        $(element).valid();
      }, */
      rules: {
        'register-username': {
          required: false
        },
        'register-email': {
          required: false,
          email: true
        }
      }
    });
  }

  // multi-steps registration
  // --------------------------------------------------------------------

  // Horizontal Wizard
  if (typeof registerMultiStepsWizard !== undefined && registerMultiStepsWizard !== null) {
    var numberedStepper = new Stepper(registerMultiStepsWizard),
      $form = $(registerMultiStepsWizard).find('form');
      // Get the current date
      const currentDate = new Date();

      // Extract year, month, and day components
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
      const day = String(currentDate.getDate()).padStart(2, '0');

      // Create the formatted date string in yyyy-mm-dd format
      const formattedDate = `${year}-${month}-${day}`;

    $form.each(function () {
      var $this = $(this);
      $this.validate({
        rules: {
          //username: {
            //required: false
          //},
          //email: {
            //required: true
          //},
          lastname: {
            required: false
          },
          password: {
            required: true
          },
          'first-name': {
            required: false
          },
          disease:{
            required: false
          },
          dob:{
            required: false,
           max: formattedDate
          },
          'home-address': {
            required: false
          },
          patient_type_id: {
            required: true
          }
        },
        messages: {
          dob: {
            max: "DOB should not exceed Present Date"
        },
          password: {
            required: 'Enter new password',
            minlength: 'Enter at least 8 characters'
          },
          'confirm-password': {
            required: 'Please confirm new password',
            minlength: 'Enter at least 8 characters',
            equalTo: 'The password and its confirm are not the same'
          }
        }
      });
    });

    $(registerMultiStepsWizard)
      .find('.btn-next')
      .each(function () {
        $(this).on('click', function (e) {
          var isValid = $(this).parent().siblings('form').valid();
          if (isValid) {
            numberedStepper.next();
          } else {
            e.preventDefault();
          }
        });
      });

    $(registerMultiStepsWizard)
      .find('.btn-prev')
      .on('click', function () {
        numberedStepper.previous();
      });

    $(registerMultiStepsWizard)
      .find('.btn-submit')
      .on('click', function () {
        var formData = new FormData();
        var isValid = $(this).parent().siblings('form').valid();

        if (isValid) {          
          inputFields = $(registerMultiStepsWizard).find('form').find('input');
          inputFields.each(function() {
            var input = $(this);
            var fieldName = input.attr('name');
            var fieldValue = input.val();
            formData.append(fieldName, fieldValue);
          });

          var selectBoxes = $(registerMultiStepsWizard).find('form').find('select');
          selectBoxes.each(function () {
            var select = $(this);
            var fieldName = select.attr('name');
            var fieldValue = select.val();
            formData.append(fieldName, fieldValue);
          });

          var checkboxes = $(registerMultiStepsWizard).find('form').find('input[type="checkbox"]');
          checkboxes.each(function () {
            var checkbox = $(this);
            var fieldName = checkbox.attr('name');
            var fieldValue = checkbox.is(':checked') ? 1 : 0;
            formData.append(fieldName, fieldValue);
          });

          formData.append('gender', $('input[name="gender"]:checked').val());
          formData.append('is_dependent', $('input[name="is_dependent"]:checked').val());   
          formData.append('employee_detail', employee_detail);
          
          // Handle the file input
          var fileInput = $('#profile_image')[0]; // Get the DOM element
          var selectedFile = fileInput.files[0];
          formData.append('profile_image', selectedFile);
          if (formData) {
            var dataSaveRoute = formData.get('id') ? 'patient/update' : 'patient/create';
            $.ajax({
              url: assetPath + dataSaveRoute,
              type: 'POST',
              data:  formData,
              processData: false,
              contentType: false,
              success: function(response) {
                if (response.status == 'success') {
                  Swal.fire({
                    title: response.status,
                    text: response.message,
                    icon: 'success',
                    confirmButtonText: 'OK'
                  }).then((result) => {
                    window.location.href = "/patient";
                  });

                }
              },
              error: function(xhr, status, error) {
                Swal.fire({
                  title: 'error',
                  text: error,
                  icon: 'error',
                  confirmButtonText: 'OK'
              });
              }
            });
          }
        }
      });
  }

  // select2
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

  // credit card

  // Credit Card
  if (creditCard.length) {
    creditCard.each(function () {
      new Cleave($(this), {
        creditCard: true,
        onCreditCardTypeChanged: function (type) {
          const elementNodeList = document.querySelectorAll('.card-type');
          if (type != '' && type != 'unknown') {
            //! we accept this approach for multiple credit card masking
            for (let i = 0; i < elementNodeList.length; i++) {
              elementNodeList[i].innerHTML =
                '<img src="' + assetsPath + 'images/icons/payments/' + type + '-cc.png" height="24"/>';
            }
          } else {
            for (let i = 0; i < elementNodeList.length; i++) {
              elementNodeList[i].innerHTML = '';
            }
          }
        }
      });
    });
  }

  // Expiry Date Mask
  if (expiryDateMask.length) {
    new Cleave(expiryDateMask, {
      date: true,
      delimiter: '/',
      datePattern: ['m', 'y']
    });
  }

  // CVV
  if (cvvMask.length) {
    new Cleave(cvvMask, {
      numeral: true,
      numeralPositiveOnly: true
    });
  }

  // phone number mask
  if (mobileNumberMask.length) {
    new Cleave(mobileNumberMask, {
      phone: true,
      phoneRegionCode: 'US'
    });
  }

  // Pincode
  if (pinCodeMask.length) {
    new Cleave(pinCodeMask, {
      delimiter: '',
      numeral: true
    });
  }
  var assetPath = '../../../app-assets/',
  userView = 'app-user-view-account.html';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
    userView = assetPath + 'app/user/view/account';
  }

  
  function fetchRecord(url) {
    var deferred = $.Deferred();
    if (url) {
      $.ajax({
        url: url,
        type: 'GET', // or 'GET' depending on your needs
        data:  {},
        success: function(response) {
          // Handle success response
          if (response.length > 0) {
            deferred.resolve(response);
          }
        },
        error: function(xhr, status, error) {
          // Handle error response
          deferred.reject(error);
        }
      });
      return deferred.promise();
    }
  }
  
  //create html 
  function readyPatientsFields (PatientsInfo) {
    if (PatientsInfo) {
      $("#genaric_field1").show();
      $("#genaric_field1").empty();

      PatientsInfo = JSON.parse(PatientsInfo);
      var PatientTypeDropdown = $('<select class="select2 w-100" name="patient_type_id" id="patient_type_id"></select>');
      $.each(PatientsInfo, function(key, value) {
            // Add options to the select dropdown
        PatientTypeDropdown.append('<option value="'+ value['id'] +'">'+ value['name'] +'</option>')
        
        
          // Show/hide fields based on patient type
          // $('#patient_type_id').on('change', function() {
          //   const selectedType = $(this).val();
          //   if (selectedType === 'unverified') {
          //     $('#employee_number, #designation, #joining_date, #last_date').closest('.row').show();
          //   } else {
          //     $('#employee_number, #designation, #joining_date, #last_date').closest('.row').hide();
          //   }
          // });

      });
      
      $("#genaric_field1").append('<label class="form-label" for="patienttype">Patient Type</label>');
      $("#genaric_field1").append(PatientTypeDropdown);
      $('#patient_type_id').select2();
      return true;
    }
    return false;
  }

  function readyDoctorsFields (DoctorsInfo) {
    if (DoctorsInfo) {
      $("#genaric_field1").show();
      $("#genaric_field1").empty();
      DoctorsInfo = JSON.parse(DoctorsInfo);
      var doctorsTypeDropdown = $('<select class="select2 w-100" name="doctor_type_id" id="doctor_type_id"></select>');
      $.each(DoctorsInfo, function(key, value) {
            // Add options to the select dropdown
            doctorsTypeDropdown.append('<option value="'+ value['id'] +'">'+ value['name'] +'</option>');
      });
      
      $("#genaric_field1").append('<label class="form-label" for="doctortype">Doctors Type</label>');
      $("#genaric_field1").append(doctorsTypeDropdown);
      $('#doctor_type_id').select2();
      return true;
    }
    return false;
  }

  // multi-steps registration
  // --------------------------------------------------------------------
});
