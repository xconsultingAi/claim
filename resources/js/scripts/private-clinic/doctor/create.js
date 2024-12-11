/*=========================================================================================
  File Name: create.js
  Description: Auth register js file.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: PIXINVENT
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
$(document).ready(function() {
    $('#kin').change(function() {
        if ($(this).is(':checked')) {
            $('#textFieldContainer').show(); // Show the div if checkbox is checked
        } else {
            $('#textFieldContainer').hide(); // Hide the div if checkbox is unchecked
        }
    });
});
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




    // Human Friendly
    if (humanFriendlyPickr.length) {
        humanFriendlyPickr.flatpickr({
            altInput: false,
            altFormat: 'F j, Y',
             dateFormat: 'd-m-Y',
            allowInput: true
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
        url: baseurl + '/doctor/get-doctor-by-id',
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
            $('#cnic').val(userInfo.cnic);
            $('#phone').val(userInfo.phone);
            $('#mobile_no').val(userInfo.mobile_no);
            $('#marital_status').val(userInfo.marital_status);

            $('#employee_no').val(userInfo.employee_no);
            $('#scale').val(userInfo.scale);
            $('#employee_type').val(userInfo.employee_type);
            $('#employee_nature').val(userInfo.employee_nature);
            $('#joining_date').val(userInfo.joining_date);
            $('#last_date').val(userInfo.last_date);
            $('#designation').val(userInfo.designation);
            $('#department').val(userInfo.department);

           $('#address').val(userInfo.address);
           $('#bupa_code').val(userInfo.bupa_code);
           $('#vhi_code').val(userInfo.vhi_code);
           $('#vivas_code').val(userInfo.vivas_code);
           $('#zipcode').val(userInfo.zipcode);
           $('#address_line_2').val(userInfo.address_line_2);
           $('#address_line_3').val(userInfo.address_line_3);

            $('#is_employee').val(userInfo.is_employee).trigger('change');
            $('#role_id').val(userInfo.role_id).trigger('change');
            $('#doctor_id').val(userInfo.doctor ? userInfo.doctor.id : '');
            $('#doctor_type_id').val(userInfo.doctor ? userInfo.doctor.doctor_type_id : '').trigger('change');
            $('#department_id').val(userInfo.doctor ? userInfo.doctor.department_id : '').trigger('change');
            $('#clinical_service_id').val(userInfo.doctor ? userInfo.doctor.clinical_service_id : '').trigger('change');
            $('#speciality').val(userInfo.doctor ? userInfo.doctor.speciality : '');
            $('#imc_no').val(userInfo.doctor ? userInfo.doctor.imc_no : '');
            $('#status').val(userInfo.status).trigger('change');

             var dob = userInfo.dob.split('-');
              $('#dob').val(dob[2] + '-' + dob[1] + '-' + dob[0]).trigger('change');
                var age = calculateAge(dob);
                $('#age').val(age);

            $('input[name=gender][value=' + userInfo.gender + ']').prop('checked', true);
            $('#er_firstname').val(userInfo.er_firstname);
            $('#er_lastname').val(userInfo.er_lastname);
            $('#er_email').val(userInfo.er_email);
            $('#er_phone').val(userInfo.er_phone);
            $('#er_mobile').val(userInfo.er_mobile);
            $('#er_cnic').val(userInfo.er_cnic);
              $('#er_address').val(userInfo.er_address);
              if (userInfo.er_firstname != null && userInfo.er_firstname != "")
              {
                  $('#textFieldContainer').show();
                  $('#kin').prop('checked', true);
              }
              else
              {
                   $('#textFieldContainer').hide();
                  $('#kin').prop('checked', false);
            }

            $('#er_address_1').val(userInfo.er_address_1);
            $('#er_address_2').val(userInfo.er_address_2);
            $('#er_address_3').val(userInfo.er_address_3);
            $('#er_relationship').val(userInfo.er_relationship).trigger('change');

              $('#relation').val(userInfo.dependent ? userInfo.dependent.relation : '').trigger('change');

            $('#employee_id').val(userInfo.employee ? userInfo.employee.id : '');
            $('#designation').val(userInfo.employee ? userInfo.employee.designation : '');
            $('#qualification').val(userInfo.employee ? userInfo.employee.qualification : '');
            $('#joining_date').val(userInfo.employee ? userInfo.employee.joining_date : '');
            $('#last_date').val(userInfo.employee ? userInfo.employee.last_date : '');
            $("#profile_image_label").text(userInfo.profile_image);
          }
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
     var dob = ("0" + new Date().getDate()).slice(-2)+"-" + ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" + birthYear ;
    $("#dob").val(dob);
    });
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

      console.log(formattedDate);
    $form.each(function () {
      var $this = $(this);
      $this.validate({
        rules: {
          email: {
            required: false
          },
          lastname: {
            required: false
          },
          password: {
            required: true
          },
          cnic: {
            required: false,
            // minlength: 13,
            // maxlength: 13,
            //digits: true
          },
          phone:{
            required: false
          },
          father_husband: {
            required: false
          },
          // designation: {
          //   required: true
          // },
          // department_id: {
          //   required: true
          // },
          last_date: {
            required: false
          },
          joining_date: {
            required: false
           },
          firstname: {
            required: false
          },

          dob:{
             required: false,
             max: formattedDate
           },
          // er_phone: {
          //   required: true,
          //   minlength: 11,
          //   maxlength: 11,
          //   digits: true
          // },

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
        var isValid = true;//$(this).parent().siblings('form').valid();

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
            var dataSaveRoute = formData.get('id') ? 'doctor/update' : 'doctor/create';
            var successMesg = formData.get('id')
              ? 'Doctor updated successfully.'
              : 'Doctor created successfully.';
            $.ajax({
              url: assetPath + dataSaveRoute,
              type: 'POST',
              data:  formData,
              processData: false,
              contentType: false,
              success: function(response) {
                if (response.status == 'success') {
                  Swal.fire({
                    title: 'Success',
                    text: successMesg,
                    icon: 'success',
                    confirmButtonText: 'OK'
                  });
                  window.location.href = "/private-clinic/doctor";
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
  });
