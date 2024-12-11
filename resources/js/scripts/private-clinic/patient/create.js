/*=========================================================================================
  File Name: create.js
  Description: Auth register js file.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: PIXINVENT
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
var AddContacts = $('').val();
let popupData = {};


$(document).ready(function () {

  $("#gp_link").on("click", function () {
    var clicked_btn = $("#add_gp").text().trim();
    if (clicked_btn == "Add G.P") {
      AddContacts = 'Add G.P';
      $('#c_title').val('dr').trigger('change');
      $('#contact_type').val('2').trigger('change');
    }
  });

  $("#soli_link").on("click", function () {
    var clicked_btn = $("#add_soli").text().trim();
    if (clicked_btn == "Add Solicitor") {
      AddContacts = 'Add Solicitor';
      $('#c_title').val('solicitor').trigger('change');
      $('#contact_type').val('3').trigger('change');
    }

  });
  $("#rfd_link").on("click", function () {
    var clicked_btn = $("#rfd_link").text().trim();
    if (clicked_btn == "Add Referral Doctor") {
      AddContacts = 'Add Referral Doctor';
      $('#c_title').val('mr').trigger('change');
      $('#contact_type').val('1').trigger('change');
    }

  });

  $("#rft_link").on("click", function () {
    var clicked_btn = $("#rft_link").text().trim();
    if (clicked_btn == "Add Referral To") {
      AddContacts = 'Add Referral To';
      $('#c_title').val('mr').trigger('change');
      $('#contact_type').val('1').trigger('change');
    }

  });


  $('#kin').change(function () {
    if ($(this).is(':checked')) {
      $('#textFieldContainer').show(); // Show the div if checkbox is checked
    } else {
      $('#textFieldContainer').hide(); // Hide the div if checkbox is unchecked
    }
  });


});



$("#saveMrn").on("click", function (e) {
  e.preventDefault();
  popupData = {
    externalhospital: $('#externalhospital').val(),
    externalhospital_1: $('#externalhospital_1').val(),
    externalhospital_2: $('#externalhospital_2').val(),
    externalhospital_3: $('#externalhospital_3').val(),
    mrn_no: $('#mrn_no').val(),
    mrn_no1: $('#mrn_no1').val(),
    mrn_no2: $('#mrn_no2').val(),
    mrn_no3: $('#mrn_no3').val(),
  }
  $('#addPatientModal').modal('hide');
  // var patient_id = $('#id').val();
  // var baseurl = window.location.origin;
  // var formData = $('#addMedicineForm').serialize();
  // var url = baseurl + '/private-clinic/patient/patientmrnupdate/' + patient_id;
  // $.ajax({
  //   url: url,
  //   method: 'PUT',
  //   data: formData,
  //   headers: {
  //     'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  //   },
  //   success: function (response) {
  //     var message = response.message || 'Medicine saved successfully';
  //     var icon = response.status === 'success' ? 'success' : 'error';

  //     Swal.fire({
  //       title: response.status,
  //       text: message,
  //       icon: icon,
  //       confirmButtonText: 'OK'
  //     }).then(function (result) {
  //       if (response.status === 'success') {

  //         window.location.href = baseurl + '/private-clinic/patient/create/' + patient_id;
  //       }
  //     });
  //   },
  //   error: function (xhr, status, error) {
  //     Swal.fire({
  //       title: status,
  //       text: xhr.responseText,
  //       icon: 'error',
  //       confirmButtonText: 'OK'
  //     });
  //   }
  // });
  // return false;

});

function saveContacts() {
  var baseurl = window.location.origin; // (1)
  var formData = $('#addPatientForm').serialize();
  var url = baseurl + '/private-clinic/patient/store';
  $.ajax({
    url: url,
    method: 'POST',
    data: formData,
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') // (3)
    },
    success: function (response) {
      var message = response.message || 'Contact saved successfully';
      var icon = response.status === 'success' ? 'success' : 'error';

      Swal.fire({
        title: response.status,
        text: message,
        icon: icon,
        // confirmButtonText: 'OK'
        showConfirmButton: false,
        timer: 800
      }).then(function (result) {
        if (response.status === 'success') {

          window.location.href = baseurl + '/private-clinic/patient/create/' + patient_id;
        }
      });
    },
    error: function (xhr, status, error) {

    }
  });

  return false;
}
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
    // <<<<<<< HEAD

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
    var userInfo = '';
    var url = window.location.href;
    var id = url.substring(url.lastIndexOf('/') + 1);
    if ($.isNumeric(id) == true) {

      $('#submit_button').text('Update');
      $.ajax({
        url: baseurl + '/patient/get-record-by-id/',
        type: 'GET',
        data: { id: id },
        success: function (response) {
          if (response.status == 'success') {
            userInfo = response.userInfo;
            $('#id').val(userInfo.id);
            $('#title').val(userInfo.title).trigger('change');
            $('#firstname').val(userInfo.firstname);
            $('#lastname').val(userInfo.lastname);
            $('#email').val(userInfo.email);
            $('#cnic').val(userInfo.cnic);
            $('#phone').val(userInfo.phone);
            $('#address').val(userInfo.address);
            $('#bupa_code').val(userInfo.bupa_code);
            $('#occupation').val(userInfo.occupation);
            $('#zipcode').val(userInfo.zipcode);
            $('#address_line_2').val(userInfo.address_line_2);
            $('#address_line_3').val(userInfo.address_line_3);
            $('#general_practitioner').val(userInfo.contact.gp_id).trigger('change');
            $('#referral_to').val(userInfo.contact.ref_to).trigger('change');
            $('#solicitor').val(userInfo.contact.solicitor_id).trigger('change');
            $('#pharmacy').val(userInfo.pharmacy);
            $('#case_ref_no').val(userInfo.case_ref_no);
            if (userInfo.profile_image) {
              $('#profileImage').attr('src', userInfo.profile_image).show();
              $('#profile_image_hidden').val(userInfo.profile_image);
            } else {
              $('#profileImage').hide();
              $('#profile_image_hidden').val('');
            }
            $('#insurance_company').val(userInfo.insurance_company).trigger('change');
            $('#insurance_no').val(userInfo.insurance_no).trigger('change');
            // $('#insurance_company_id').val(userInfo.insurance_company_id).trigger('change');
            $('#insurance_company_plan').val(userInfo.insurance_company_plan).trigger('change');
            $('#religion').val(userInfo.religion);
            $('#notes').val(userInfo.notes);
            $('#mobile_no').val(userInfo.mobile_no);
            $('#marital_status').val(userInfo.marital_status).trigger('change');
            $('#role_id').val(userInfo.role_id).trigger('change');
            $('#patient_id').val(userInfo.patient ? userInfo.patient.id : '');
            $('#patient_type_id').val(userInfo.patient ? userInfo.patient.patient_type_id : '').trigger('change');
            $('#status').val(userInfo.status).trigger('change');
            $('#disease').val(userInfo.patient ? userInfo.patient.disease : '');
            $('#ref_doc').val(userInfo.contact.ref_by ? userInfo.contact.ref_by : '').trigger('change');
            $('#is_rip').prop('checked', userInfo.is_rip == "1" ? true : false);
            $('#is_non_paying').prop('checked', userInfo.is_non_paying == "1" ? true : false);
            var dob = userInfo.dob.split('-');
            $('#dob').val(dob[2] + '-' + dob[1] + '-' + dob[0]).trigger('change');

            var age = calculateAge(dob);
            $('#age').val(age);
            $('input[name=gender][value=' + userInfo.gender + ']').prop('checked', true);
            $('#er_title').val(userInfo.er_title).trigger('change');;
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
            if (userInfo.er_firstname != null && userInfo.er_firstname != "") {
              $('#textFieldContainer').show();
              $('#kin').prop('checked', true);
            }
            else {
              $('#textFieldContainer').hide();
              $('#kin').prop('checked', false);
            }
            var dob = userInfo.dob.split('-');
            $('#dob').val(dob[2] + '-' + dob[1] + '-' + dob[0]).trigger('change');
            var age = calculateAge(dob);
            $('#age').val(age);
            $('input[name=gender][value=' + userInfo.gender + ']').prop('checked', true);
            $('#er_title').val(userInfo.er_title);
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
            if (userInfo.er_firstname != null && userInfo.er_firstname != "") {
              $('#textFieldContainer').show();
              $('#kin').prop('checked', true);
            }
            else {
              $('#textFieldContainer').hide();
              $('#kin').prop('checked', false);
            }
            if (userInfo.id != null) {
              $('#mrn').show();
              $('#externalhospital').val(userInfo.externalhospital).trigger('change');
              $('#externalhospital_1').val(userInfo.externalhospital_1).trigger('change');
              $('#externalhospital_2').val(userInfo.externalhospital_2).trigger('change');
              $('#externalhospital_3').val(userInfo.externalhospital_3).trigger('change');
              $('#mrn_no').val(userInfo.mrn_no);
              $('#mrn_no1').val(userInfo.mrn_no1);
              $('#mrn_no2').val(userInfo.mrn_no2);
              $('#mrn_no3').val(userInfo.mrn_no3);

            }
            else {
              $('#mrn').hide();
            }
          }
        },
        error: function (xhr, status, error) {
          // Handle error response
          console.log('status');
        }
      });
    }


    $('form').each(function () {
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
    $('#dob').on('change', function () {
      var dobValue = $(this).val();
      var age = calculateAge(dobValue);
      // Update the 'age' input field with the calculated age
      $('#age').val(age);
    });

    $("#age").on("input", function () {
      var currentYear = new Date().getFullYear();
      var age = parseInt($(this).val(), 10);
      var birthYear = currentYear - age;
      var dob = ("0" + new Date().getDate()).slice(-2) + "-" + ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" + birthYear;
      $("#dob").val(dob);
    });

    $('#title').on('change', function () {
      var selectedValue = $(this).val();
      if (selectedValue == 'mr' || selectedValue == 'dr' || selectedValue == 'prof' || selectedValue == 'master' || selectedValue == 'fr' || selectedValue == 'messrs' || selectedValue == 'rev' || selectedValue == 'solicitor') {
        $('input[name=gender][value=male]').prop('checked', true);
      }
      else if (selectedValue == 'ms' || selectedValue == 'miss' || selectedValue == 'mrs' || selectedValue == 'sr') {
        $('input[name=gender][value=female]').prop('checked', true);
      }

    });

    $(".employee_detail").hide();
    $("#patient_type_id").change(function () {
      var selectedOption = $(this).find("option:selected");
      if (selectedOption.data("employee_detail")) {
        employee_detail = 1;
        $(".employee_detail").show();
      } else {
        employee_detail = 0;
        $(".employee_detail").hide();
        $('input[name=is_dependent][value=0]').prop('checked', true).trigger('change');

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

            password: {
              required: false
            },

            disease: {
              required: false
            },
            dob: {
              required: false,
              // max: formattedDate
            },
            'home-address': {
              required: false
            },
            patient_type_id: {
              required: true
            }
          },
          messages: {
            // dob: {
            //   max: "DOB should not exceed Present Date"
            // },
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
        .find('.btn-submit')
        .on('click', function () {
          var formData = new FormData();
          var isValid = true;//$(this).parent().siblings('form').valid();

          var firstname = $(registerMultiStepsWizard).find('input[name="firstname"]').val();
          if (!firstname) {
            isValid = false;
            alert('Please enter your firstname'); // or use a more elegant notification
          }
          var lastname = $(registerMultiStepsWizard).find('input[name="lastname"]').val();
          if (!lastname) {
            isValid = false;
            alert('Please enter your Surname'); // or use a more elegant notification
          }
          if (isValid) {
            inputFields = $(registerMultiStepsWizard).find('form').find('input');
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

            var fileInput = $('#profile_image')[0];
            var selectedFile = fileInput.files[0];
            if (selectedFile) {
              formData.append('profile_image', selectedFile);
            } else {
              formData.append('profile_image', userInfo.profile_image);
            }
            formData.append('insurance_plan', $('#insurance_company_plan').val());
            formData.append('externalhospital', $('#externalhospital').val());
            formData.append('externalhospital_1', $('#externalhospital_1').val());
            formData.append('externalhospital_2', $('#externalhospital_2').val());
            formData.append('externalhospital_3', $('#externalhospital_3').val());
            formData.append('mrn_no', $('#mrn_no').val());
            formData.append('mrn_no1', $('#mrn_no1').val());
            formData.append('mrn_no2', $('#mrn_no2').val());
            formData.append('mrn_no3', $('#mrn_no3').val());

            if (formData) {
              var dataSaveRoute = formData.get('id') ? 'patient/update' : 'patient/create';
              $.ajax({
                url: assetPath + dataSaveRoute,
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                  if (response.status == 'success') {
                    Swal.fire({
                      title: response.status,
                      text: response.message,
                      icon: 'success',
                      // confirmButtonText: 'OK'
                      showConfirmButton: false,
                      timer: 800
                    }).then((result) => {
                      window.location.href = window.location.origin + '/private-clinic/patient/profile-view/' + response.newPatient.id;
                    });

                  }
                },
                error: function (xhr, status, error) {
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

    var assetPath = '../../../app-assets/',
      userView = 'app-user-view-account.html';

    if ($('body').attr('data-framework') === 'laravel') {
      assetPath = $('body').attr('data-asset-path');
      userView = assetPath + 'app/user/view/account';
    }

    $('#insurance_company').change(function () {
      var companyId = $(this).val();
      var baseurl = window.location.origin;
      var url = baseurl + '/private-clinic/patient/insurance-plans/' + companyId;
      if (companyId) {
        $.ajax({
          url: url,
          type: 'GET',
          success: function (data) {
            $('#insurance_company_plan').empty();
            $('#insurance_company_plan').append('<option value="">Select Insurance Plan</option>');
            $.each(data, function (id, name) {
              var selected = (id == userInfo.insurance_company_plan) ? 'selected' : '';
              $('#insurance_company_plan').append('<option value="' + id + '" ' + selected + '>' + name + '</option>');
            });
          }
        });
      } else {
        $('#insurance_company_plan').empty();
        $('#insurance_company_plan').append('<option value="">Select Insurance Plan</option>');
      }
    });

    function saveMrn() {
      var patient_id = $('#id').val();
      var baseurl = window.location.origin;
      var formData = $('#addMedicineForm').serialize();

      var url = baseurl + '/private-clinic/patient/patientmrnupdate/' + patient_id;

      $.ajax({
        url: url,
        method: 'PUT',
        data: formData,
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (response) {
          var message = response.message || 'Medicine saved successfully';
          var icon = response.status === 'success' ? 'success' : 'error';

          Swal.fire({
            title: response.status,
            text: message,
            icon: icon,
            // confirmButtonText: 'OK'
            showConfirmButton: false,
            timer: 800
          }).then(function (result) {
            if (response.status === 'success') {
              window.location.href = baseurl + '/private-clinic/patient/create/' + patient_id;
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

    };


  }
});

$('#addContactModal').on('show.bs.modal', function () {
  $(this).find('form')[0].reset();
});


$('.add-insuran-plan-modal').on('click', function () {
  var baseurl = window.location.origin;
  var url = baseurl + '/private-clinic/patient/insurance-companies';
  $.ajax({
    url: url,
    type: 'GET',
    success: function (response) {
      var options = '';
      $.each(response, function (index, value) {
        options += '<option value="' + value.id + '">' + value.name + '</option>';
      });
      $('#insurance_company_id').html(options);
    }
  });
});