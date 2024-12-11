/*=========================================================================================
  File Name: add-user.js
  Description: User register js file.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: PIXINVENT
  Author URL: 
==========================================================================================*/

//const { slice } = require("lodash");

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
    pinCodeMask = $('.pin-code-mask');

        // Human Friendly
    if (humanFriendlyPickr.length) {
      humanFriendlyPickr.flatpickr({
        altInput: false,
        altFormat: 'F j, Y',
        dateFormat: 'Y-m-d'
      });
    }


    if ($('body').attr('data-framework') === 'laravel') {
      assetsPath = $('body').attr('data-asset-path');
    }
    var baseurl = window.location.origin;

    var url = window.location.href;
    var id = url.substring(url.lastIndexOf('/') + 1);
    if ($.isNumeric(id) == true) {
      $('#submit_button').text('Update');
      $.ajax({
        url: baseurl + '/user/get-user-by-id/',
        type: 'GET',
        data:  {id: id},
        success: function(response) {
          if (response.status == 'success') {
            var userInfo = response.userInfo;
            $('#id').val(userInfo.id);
            $('#firstname').val(userInfo.firstname);
            $('#lastname').val(userInfo.lastname);
            $('#father_husband').val(userInfo.father_husband);
            $('#email').val(userInfo.email);
            $('#password').val(userInfo.password);
            $('#bloodgroup').val(userInfo.bloodgroup);
            $('#status').val(userInfo.status).trigger('change');
            $('#cnic').val(userInfo.cnic);
            $('#phone').val(userInfo.phone);
            if(userInfo.is_dependent == 1) {
              $('#is_dependent').val(userInfo.is_dependent).trigger('click');
            }
            $('#address').val(userInfo.address);
            $('#is_employee').val(userInfo.is_employee).trigger('change');
            $('#is_super').val(userInfo.is_super).trigger('change');
            $('#hms_id').val(userInfo.hms_id).trigger('change');
            $('#role_id').val(userInfo.role_id).trigger('change');

            $('#patient_id').val(userInfo.patient ? userInfo.patient.id : '');
            $('#patient_type_id').val(userInfo.patient ? userInfo.patient.patient_type_id : '').trigger('change');

            $('#doctor_id').val(userInfo.doctor ? userInfo.doctor.id : '');
            $('#doctor_type_id').val(userInfo.doctor ? userInfo.doctor.doctor_type_id : '').trigger('change');
            $('#speciality').val(userInfo.doctor ? userInfo.doctor.speciality : '');
            $('#marital_status').val(userInfo.marital_status).trigger('change');

            $('#pharmacist_id').val(userInfo.pharmacist ? userInfo.pharmacist.id : '');
            $('#receptionist_id').val(userInfo.receptionist ? userInfo.receptionist.id : '');

            $('#dependent_id').val(userInfo.dependent ? userInfo.dependent.id : '');
            $('#depends_on_user_id').val(userInfo.dependent ? userInfo.dependent.depends_on_user_id : '');

            $('#dob').val(userInfo.dob).trigger('change');
            $('input[name=gender][value=' + userInfo.gender + ']').prop('checked', true);
            $('#er_firstname').val(userInfo.er_firstname);
            $('#er_lastname').val(userInfo.er_lastname);
            $('#er_email').val(userInfo.er_email);
            $('#er_phone').val(userInfo.er_phone);
            $('#er_cnic').val(userInfo.er_cnic);
            $('#er_address').val(userInfo.er_address);
            $('#shift').val(userInfo.patient ? userInfo.patient.patient_type_id : '');
            
            $('#employee_id').val(userInfo.employee ? userInfo.employee.id : '');
            $('#designation').val(userInfo.employee ? userInfo.employee.designation : '');
            $('#qualification').val(userInfo.employee ? userInfo.employee.qualification : '');
            $('#joining_date').val(userInfo.employee ? userInfo.employee.joining_date : '');
            $('#last_date').val(userInfo.employee ? userInfo.employee.last_date : '');
            setTimeout(function() {
              // Your code here
              $('#branch_id').val(userInfo.branch_id).trigger('change');
          }, 1000);
          }
        },
        error: function(xhr, status, error) {
          // Handle error response

        }
      });
    }

  $("#genaric_field1").hide();
  $("#genaric_field2").hide();
  $("#dependent_user_f1").hide();
  $("#joining_date_employee_f1").hide();
  $("#joining_date_employee_f2").hide();  
  $("#patient_type_patient_f1").hide();  
  
  hideDoctorsFields();
  
  
  
  $('form').each(function() {
    this.reset();
  });

  $("#is_super").on('click', function() {
    if ($(this).is(':checked')) {
        $(this).val('1');
    } else {
        $(this).val('0');
    }
  });

  $("#is_employee").on('click', function() {
    if ($(this).is(':checked')) {
        $(this).val('1');
    } else {
        $(this).val('0');
    }
  });

  // jQuery Validation
  if (pageResetForm.length) {
    pageResetForm.validate({
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


  // Horizontal Wizard
  if (typeof registerMultiStepsWizard !== undefined && registerMultiStepsWizard !== null) {
    var numberedStepper = new Stepper(registerMultiStepsWizard),
    $form = $(registerMultiStepsWizard).find('form');
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
          lastname: {
            required: false
          },
          role_id: {
            required: true
          },
          password: {
            required: true
          },
          email: {
            required: false
          },
          
          father_husband: {
            required: false
          },
          cnic: {
            required: false,
            minlength: 13,
            maxlength: 13,
            digits: true
          },
          phone: {
            required: false,
            minlength: 11,
            maxlength: 11,
            digits: true
          },
          address: {
            required: false
          },
          gender: {
            required: false
          },
          
          er_lastname:{
            required: false
          },
          dob:{
            required: false,
           max: formattedDate
          },
          er_phone:{
            required: false,
            minlength: 11,
            maxlength: 11,
            digits: true
          }
        },
        
        messages: {
          dob: {
            max: "Please select a date not in the future"
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
          var inputFields = $(registerMultiStepsWizard).find('form').find('input');
          inputFields.each(function () {
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
    
          // Handle the file input
          var fileInput = $('#profile_image')[0]; // Get the DOM element
          var selectedFile = fileInput.files[0];
          formData.append('profile_image', selectedFile);
          if (formData) {
            var dataSaveRoute = formData.get('id') ? 'user/update' : 'user/create';
            var successMesg = formData.get('id')
              ? 'User updated successfully.'
              : 'User created successfully.';
    
            $.ajax({
              url: assetPath + dataSaveRoute,
              type: 'POST',
              data: formData,
              processData: false,
              contentType: false,
              headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
              },
              success: function (response) {
                if (response.status === 'success') {
                  Swal.fire({
                    title: 'Success',
                    text: successMesg,
                    icon: 'success',
                    confirmButtonText: 'OK',
                  });
    
                  // if (formData.get('id')) {
                  //   window.location.href = '/user/list';
                  // } else {
                  //   $('form').each(function () {
                  //     this.reset();
                  //   });
                  // }
                  // Remove this line, as it's repeated
                  window.location.href = "/user/list";
                }
              },
              error: function (xhr, status, error) {
                Swal.fire({
                  title: 'Error',
                  text: error,
                  icon: 'error',
                  confirmButtonText: 'OK',
                });
              },
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

  $('#role_id').change(function() {
    var selectedOption = $(this).find("option:selected");
    
    $("#is_super").prop('checked', 0); 
    $("#is_super").val(0)
    if (selectedOption.data("slug") == 'super') {
      $("#is_super").prop('checked', 1);
      $("#is_super").val(1)
    }
  });

  $('#hms_id').change(function() {
    var hms_id = $("#hms_id").val();
        $("#branch_id").val('');
    if (hms_id) {
      fetchRecord(assetPath + 'branch/get-barnch-by-hmsid/' + hms_id);
    }
  });

  function fetchRecord(url, hms_id) {
    var deferred = $.Deferred();
    if (url) {
      $.ajax({
        url: url,
        type: 'GET',
        data:  {},
        success: function(response) {
          // Handle success response

          if (response.status == 'success') {
            $.each(response.branches, function(key, value) {
              var branch = $("#branch_id");
              branch.append('<option value="'+ key +'">'+ value +'</option>');
            });
          }
        }
      });
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
        PatientTypeDropdown.append('<option value="'+ value['id'] +'">'+ value['name'] +'</option>');
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

  function hideDoctorsFields() {
    $("#qualification_doctor_f1").hide();
    $("#speciality_doctor_f2").hide();
    $("#department_doctor_f3").hide();
    $("#clinical_service_doctor_f4").hide();
    $("#doctor_type_doctor_f5").hide();
    
  }

  function showDoctorsFields() {
    $("#qualification_doctor_f1").show();
    $("#speciality_doctor_f2").show();
    $("#department_doctor_f3").show();
    $("#clinical_service_doctor_f4").show();
    $("#doctor_type_doctor_f5").show();
  }
  // multi-steps registration
  // --------------------------------------------------------------------
});
