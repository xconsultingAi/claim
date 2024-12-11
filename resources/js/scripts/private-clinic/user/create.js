/*=========================================================================================
  File Name: create.js
  Description: Auth register js file.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: PIXINVENT
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
var userOldBranch;
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
      jqForm = $('#jquery-val-form'),
      pageResetForm = $('.auth-register-form'),
      select = $('.select2'),
      mobileNumberMask = $('.mobile-number-mask'),
      humanFriendlyPickr = $('.flatpickr-human-friendly');

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
            $('#cnic').val(userInfo.cnic);
            $('#phone').val(userInfo.phone);
            $('#hms_id').val(userInfo.hms_id).trigger('change');
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
            $('#is_employee').val(userInfo.is_employee).trigger('change');
            $('#role_id').val(userInfo.role_id).trigger('change');
            $('#doctor_id').val(userInfo.doctor ? userInfo.doctor.id : '');
            $('#doctor_type_id').val(userInfo.doctor ? userInfo.doctor.doctor_type_id : '').trigger('change');
            $('#department_id').val(userInfo.doctor ? userInfo.doctor.department_id : '').trigger('change');
            $('#clinical_service_id').val(userInfo.doctor ? userInfo.doctor.clinical_service_id : '').trigger('change');
            $('#speciality').val(userInfo.doctor ? userInfo.doctor.speciality : '');
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

            $('#er_address_1').val(userInfo.er_address_1);
            $('#er_address_2').val(userInfo.er_address_2);
            $('#er_address_3').val(userInfo.er_address_3);
            $('#er_relationship').val(userInfo.er_relationship).trigger('change');
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

              $('#relation').val(userInfo.dependent ? userInfo.dependent.relation : '').trigger('change');


            $('#employee_id').val(userInfo.employee ? userInfo.employee.id : '');
            $('#designation').val(userInfo.employee ? userInfo.employee.designation : '');
            $('#qualification').val(userInfo.employee ? userInfo.employee.qualification : '');
            $('#joining_date').val(userInfo.employee ? userInfo.employee.joining_date : '');
            $('#last_date').val(userInfo.employee ? userInfo.employee.last_date : '');
            $("#profile_image_label").text(userInfo.profile_image);
            userOldBranch = userInfo.branch_id;
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
  // if (typeof registerMultiStepsWizard !== undefined && registerMultiStepsWizard !== null) {
  //   var numberedStepper = new Stepper(registerMultiStepsWizard),
  //   $form = $(registerMultiStepsWizard).find('form');
  //   const currentDate = new Date();

  //   // Extract year, month, and day components
  //   const year = currentDate.getFullYear();
  //   const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
  //   const day = String(currentDate.getDate()).padStart(2, '0');

  //   // Create the formatted date string in yyyy-mm-dd format
  //   const formattedDate = `${year}-${month}-${day}`;

  //   $form.each(function () {
  //     var $this = $(this);
  //     console.log('$this', $this);
  //     $this.validate({
  //       rules: {
  //         email: {
  //           required: false
  //         },
  //         lastname: {
  //           required: false
  //         },
  //         password: {
  //           required: true
  //         },
  //         cnic: {
  //           required: false,
  //         },
  //         phone:{
  //           required: false
  //         },
  //         father_husband: {
  //           required: false
  //         },
  //         last_date: {
  //           required: false
  //         },
  //         firstname: {
  //           required: false
  //         },
  //         dob:{
  //            required: false,
  //            max: formattedDate
  //          }
  //       },
  //       messages: {
  //         dob: {
  //           max: "DOB should not exceed Present Date"
  //       },
  //         password: {
  //           required: 'Enter new password',
  //           minlength: 'Enter at least 8 characters'
  //         },
  //         'confirm-password': {
  //           required: 'Please confirm new password',
  //           minlength: 'Enter at least 8 characters',
  //           equalTo: 'The password and its confirm are not the same'
  //         }
  //       }
  //     });
  //   });

  //   $(registerMultiStepsWizard)
  //   .find('.btn-submit')
  //   .on('click', function () {
  //     var formData = new FormData();
  //     var isValid = $(this).parent().siblings('form').valid();
  //     console.log('isValid', isValid);return;
  //     if (isValid) {
  //       var inputFields = $(registerMultiStepsWizard).find('form').find('input');
  //       inputFields.each(function () {
  //         var input = $(this);
  //         var fieldName = input.attr('name');
  //         var fieldValue = input.val();
  //         formData.append(fieldName, fieldValue);
  //       });

  //       var selectBoxes = $(registerMultiStepsWizard).find('form').find('select');
  //       selectBoxes.each(function () {
  //         var select = $(this);
  //         var fieldName = select.attr('name');
  //         var fieldValue = select.val();
  //         formData.append(fieldName, fieldValue);
  //       });

  //       var checkboxes = $(registerMultiStepsWizard).find('form').find('input[type="checkbox"]');
  //       checkboxes.each(function () {
  //         var checkbox = $(this);
  //         var fieldName = checkbox.attr('name');
  //         var fieldValue = checkbox.is(':checked') ? 1 : 0;
  //         formData.append(fieldName, fieldValue);
  //       });

  //       formData.append('gender', $('input[name="gender"]:checked').val());

  //       // Handle the file input
  //       var fileInput = $('#profile_image')[0]; // Get the DOM element
  //       var selectedFile = fileInput.files[0];
  //       formData.append('profile_image', selectedFile);
  //       if (formData) {
  //         var dataSaveRoute = formData.get('id') ? 'user/update' : 'user/create';
  //         var successMesg = formData.get('id')
  //           ? 'User updated successfully.'
  //           : 'User created successfully.';

  //         $.ajax({
  //           url: assetPath + dataSaveRoute,
  //           type: 'POST',
  //           data: formData,
  //           processData: false,
  //           contentType: false,
  //           headers: {
  //             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
  //           },
  //           success: function (response) {
  //             if (response.status === 'success') {
  //               Swal.fire({
  //                 title: 'Success',
  //                 text: successMesg,
  //                 icon: 'success',
  //                 confirmButtonText: 'OK',
  //               });

  //               window.location.href = "/user/list";
  //             }
  //           },
  //           error: function (xhr, status, error) {
  //             Swal.fire({
  //               title: 'Error',
  //               text: error,
  //               icon: 'error',
  //               confirmButtonText: 'OK',
  //             });
  //           },
  //         });
  //       }
  //     }
  //   });
  // }

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
          $('#branch_id').val(userOldBranch).trigger('change');

        }
      });
    }
  }

    // jQuery Validation
    if (jqForm.length) {
      jqForm.validate({
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
          },
          phone:{
            required: false
          },
          father_husband: {
            required: false
          },
          last_date: {
            required: false
          },
          firstname: {
            required: false
          },
          validationCheck: {
            required: true
          }
        },
        submitHandler: function (form) {
          var formData = $(form).serialize(); // Get the form datas
          var id = $('#id').val();
          var method = id ? 'PUT' : 'POST';
          var userUrl = id ? '/user/update' : '/user/create';
          var baseurl = window.location.origin;
          $.ajax({
            url: baseurl + userUrl,
            method: 'POST',
            data: formData,
            headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function (response) {
              // Handle the success response
              if (response.status == 'success') {
                Swal.fire({
                  title: response.status,
                  text: response.message,
                  icon: response.status,
                  // confirmButtonText: 'OK'
                  showConfirmButton: false,
                  timer: 800
                }).then(function (result) {
                  window.location.href = baseurl + '/private-clinic/user/';
                });

              }else{
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
              Swal.fire({
                title: error.status,
                text: error.message,
                icon: error.status,
                confirmButtonText: 'OK'
              });

            }
          });
          return false;
        }
      });
    }

  // phone number mask
  if (mobileNumberMask.length) {
    new Cleave(mobileNumberMask, {
      phone: true,
      phoneRegionCode: 'US'
    });
  }

    var assetPath = '../../../app-assets/',
    userView = 'app-user-view-account.html';

    if ($('body').attr('data-framework') === 'laravel') {
      assetPath = $('body').attr('data-asset-path');
      userView = assetPath + 'app/user/view/account';
    }
  });
