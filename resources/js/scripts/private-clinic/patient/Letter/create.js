//const { received } = require("laravel-mix/src/Log");

/*=========================================================================================
    File Name: app-user-view.js
    Description: User View page
    --------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
var locations;
var baseurl = window.location.origin;
var patient_id = ('');
$(function () {
  ('use strict');

  // Extract the ID from the URL
  var url = window.location.href;
  var patient_id_clinical_notes = url.substring(url.lastIndexOf('/') + 1);
  var select_date = $('#select_date');
  var select_time = $('#select_time');
  var admission_date = $('#admission_date');
  var exam_date = $('#exam_date');
  var date_completed_by_pacs = $('#date_completed_by_pacs');
  var copy_requested_date = $('#copy_requested_date');
  var accident_date = $('#accident_date');
  var discharge_date = $('#discharge_date');
  var discharge_letter_admission_date = $('#discharge_letter_admission_date');
  var doc_ref_from_date = $('#doc_ref_from_date');
  var doc_ref_to_date = $('#doc_ref_to_date');
  var doc_ref_from_date_sec = $('#doc_ref_from_date_sec');
  var doc_ref_to_date_sec = $('#doc_ref_to_date_sec');
  var jqForm = $('#dataForm');

  // Now you can use the 'id' variable in your code

  var patient_id = $('#patient_id').val();
  var letter_id = $('#letter_id').val();
  var dtUserTable = $('.user-list-table');
  var url = window.location.href;
  var letterId = $('#letter_id').val();


  $(document).on('click', '.addletter', function () {
    window.location.href = '/private-clinic/patient/patient-letters/create/' + patient_id_clinical_notes;
  });

  var baseurl = window.location.origin;
  var id = $('#letter_id').val();
  var patient_id = $('#patient_id').val();

  if ($.isNumeric(id) == true) {

    $('#submit_button').text('Update');
    $.ajax({
      url: baseurl + '/private-clinic/patient/patient-letters/getLettersById/' + patient_id + '/' + id,
      type: 'GET',
      success: function (response) {
        if (response.status == 'success') {
          var userInfo = response.userInfo;
          var phistory = response.phistory;
          var template_name = response.template_name;

          $('#id').val(userInfo.id);
          var admission_date = userInfo.letter_date.split('-');
          $('#admission_date').val(admission_date[2] + '-' + admission_date[1] + '-' + admission_date[0]).trigger('change');

          if (phistory.template.name == "Request for Discs HMC") {
            var date_of_exam = phistory.date_of_exam.split('-');
            $('#exam_date').val(date_of_exam[2] + '-' + date_of_exam[1] + '-' + date_of_exam[0]).trigger('change');

            var date_copy_requested = phistory.date_copy_requested.split('-');
            $('#copy_requested_date').val(date_copy_requested[2] + '-' + date_copy_requested[1] + '-' + date_copy_requested[0]).trigger('change');

            var date_completed_by_pacs = phistory.date_completed_by_pacs.split('-');
            $('#date_completed_by_pacs').val(date_completed_by_pacs[2] + '-' + date_completed_by_pacs[1] + '-' + date_completed_by_pacs[0]).trigger('change');


          }
          var admission_date = userInfo.letter_date.split('-');
          $('#admission_date').val(admission_date[2] + '-' + admission_date[1] + '-' + admission_date[0]).trigger('change');

        }

      }
    });
  }


  $('#letter_type').trigger('change');
  $('#template').trigger('change');
  $('#select_date').trigger('change');

  if (select_date.length) {
    var select_date = select_date.flatpickr({
      enableTime: false,
      altFormat: 'F j, Y',
      dateFormat: 'd-m-Y',
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr('step', null);
        }
      }
    });
  }

  if (doc_ref_from_date.length) {
    var doc_ref_from_date = doc_ref_from_date.flatpickr({
      enableTime: false,
      altFormat: 'Y-m-d',
      dateFormat: 'd-m-Y',
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr('step', null);
        }
      }
    });
  }

  if (doc_ref_to_date.length) {
    var doc_ref_to_date = doc_ref_to_date.flatpickr({
      enableTime: false,
      altFormat: 'Y-m-d',
      dateFormat: 'd-m-Y',
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr('step', null);
        }
      }
    });
  }

  if (doc_ref_from_date_sec.length) {
    var doc_ref_from_date_sec = doc_ref_from_date_sec.flatpickr({
      enableTime: false,
      altFormat: 'Y-m-d',
      dateFormat: 'd-m-Y',
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr('step', null);
        }
      }
    });
  }

  if (doc_ref_to_date_sec.length) {
    var doc_ref_to_date_sec = doc_ref_to_date_sec.flatpickr({
      enableTime: false,
      altFormat: 'Y-m-d',
      dateFormat: 'd-m-Y',
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr('step', null);
        }
      }
    });
  }

  if (copy_requested_date.length) {
    var copy_requested_date = copy_requested_date.flatpickr({
      enableTime: false,
      altFormat: 'F j, Y',
      dateFormat: 'd-m-Y',
      allowInput: true,
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr('step', null);
        }
      }
    });
  }
  if (date_completed_by_pacs.length) {
    var date_completed_by_pacs = date_completed_by_pacs.flatpickr({
      enableTime: false,
      altFormat: 'F j, Y',
      dateFormat: 'd-m-Y',
      allowInput: true,
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr('step', null);
        }
      }
    });
  }
  if (exam_date.length) {
    var exam_date = exam_date.flatpickr({
      enableTime: false,
      altFormat: 'F j, Y',
      dateFormat: 'd-m-Y',
      allowInput: true,
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr('step', null);
        }
      }
    });
  }
  if (accident_date.length) {
    var accident_date = accident_date.flatpickr({
      enableTime: false,
      altFormat: 'F j, Y',
      dateFormat: 'd-m-Y',
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr('step', null);
        }
      }
    });
  }

  if (discharge_letter_admission_date.length) {
    var discharge_letter_admission_date = discharge_letter_admission_date.flatpickr({
      enableTime: false,
      altFormat: 'F j, Y',
      dateFormat: 'd-m-Y',
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr('step', null);
        }
      }
    });
  }

  // admission_date picker
  if (admission_date.length) {
    var admission_date = admission_date.flatpickr({
      enableTime: false,
      altFormat: 'd-m-Y',
      dateFormat: 'd-m-Y',
      allowInput: true,
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr('step', null);
        }
      }
    });
  }
  if (discharge_date.length) {
    var discharge_date = discharge_date.flatpickr({
      enableTime: false,
      altFormat: 'd-m-Y',
      dateFormat: 'd-m-Y',
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr('step', null);
        }
      }
    });
  }


  // Time picker
  if (select_time.length) {
    var select_time = select_time.flatpickr({
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      altInput: true,
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr('step', null);
        }
      }
    });
  }

  // dataForm Validation
  if (jqForm.length) {
    jqForm.validate({
      rules: {
        'select_date': {
          required: true
        },
        'letter_type': {
          required: false
        },
        'hospital': {
          required: true
        },
        'template': {
          required: true
        },
        'admission_date': {
          required: true
        },
        'select_time': {
          required: true
        },
        'description': {
          required: true
        }
      },


      submitHandler: function (form) {
        var formData = $(form).serialize(); // Get the form data
        var patient_id = $('#patient_id').val();
        var letter_id = $('#letter_id').val();
        var template_name = $('#template option:selected').text();
        var template_id = $('#template option:selected').val();
        var route = '/private-clinic/patient/patient-letters/';
        var url = baseurl + route;
        var method = 'POST';
        if (patient_id && letter_id) {
          method = 'PUT'; // Use PUT method if both patient_id and note_id are available
          url += 'update/' + patient_id + '/' + letter_id;
        } else if (patient_id) {
          url += patient_id;
        }

        $.ajax({
          url: url,
          method: method,
          data: formData,
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          success: function (response) {
            var swalConfig = {
              title: response.status,
              text: response.message,
              icon: response.status,
              // confirmButtonText: 'OK'
              showConfirmButton: false,
              timer: 800
            };

            if (response.status === 'success') {

              // console.log(response.letter_id);
              if (response.letter_id !== null) {
                letter_id = response.letter_id;
              }

              Swal.fire({
                title: "Do you want to print this letter?",
                text: "This will redirect to the print page!",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, print it!"
              }).then((result) => {
                if (result.isConfirmed) {

                  function getQueryParam(param) {
                    let urlParams = new URLSearchParams(window.location.search);
                    return urlParams.get(param);
                    }

                  //  console.log(letter_id);
                  // window.location.href = baseurl + '/private-clinic/patient/patient-letters/print/' + patient_id + '/' + letter_id + '?templateid=' + template_id;

                  let redirectionUrl = getQueryParam('redirectionUrl') ?? "";
                  // console.log('Redirection URL:', redirectionUrl);

                  if(redirectionUrl !== "")
                  {
                    // window.open(baseurl + '/private-clinic/patient/patient-letters/print/' + patient_id + '/' + letter_id + '?templateid=' + template_id + '&redirectionUrl=' + encodeURIComponent(redirectionUrl));
                    window.location.href = baseurl + '/private-clinic/patient/patient-letters/print/' + patient_id + '/' + letter_id + '?templateid=' + template_id + '&redirectionUrl=' + encodeURIComponent(redirectionUrl);
                  }
                  else
                  {
                    window.open(baseurl + '/private-clinic/patient/patient-letters/print/' + patient_id + '/' + letter_id + '?templateid=' + template_id, '_blank');

                      setTimeout(function() {
                        window.location.href = baseurl + '/private-clinic/patient/patient-letters/list/' + patient_id;
                    }, 2000); // 5000 milliseconds = 5 seconds
                  }

                  
                

                }
                else {
                  window.location.href = baseurl + '/private-clinic/patient/patient-letters/list/' + patient_id;
                }
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

        return false;
      }

    });
  }

  function stripTags(html) {
    return html.replace(/<\/?[^>]+(>|$)/g, '');
  }

  // Get the select element
  var letterTypeSelect = document.getElementById('letter_type');
  var lettertempletSelect = $('#template');
  var template_body = null;
  var type = null;
  var templatebodyFound = false;

  lettertempletSelect.change(function () {



    var id = $(this).val();
    template_body.forEach(function (template) {
      if (template.id == id) {
        if (letterId === null || letterId === '') {
          // console.log(template.body);
          $('#letter_body').val(stripTags(template.body));
          templateFound = true;
          return false;
        }
        else {
          // console.log(letterId);
        }
      }

    });



  });

  letterTypeSelect.addEventListener('change', function () {

    var selectedValuetext = $('#letter_type option:selected').text();

    $('#letter_type').on('change', function() {
      // Get the selected option's text
      var selectedLetterType = $(this).find('option:selected').text();

      // Check if the selected letter type is "Admission Letter" or "Appointment Letter"
      if (selectedLetterType === "Admission Letter" || selectedLetterType === "Appointment Letter") {
          // Add the required attribute to the hospital select field
          $('#hospital').attr('required', true);
          console.log("yes");
      } else {
          // Remove the required attribute if other options are selected
          $('#hospital').removeAttr('required');
          console.log("no");
      }
  });

    // console.log(selectedValuetext);

    var url = '/private-clinic/patient/patient-letters/letter-type/' + selectedValuetext;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {

        var response = JSON.parse(xhr.responseText);

        response.templates.sort(function(a, b) {  // sort the array of objects alphabetically by the name property
          var nameA = a.name.toLowerCase();
          var nameB = b.name.toLowerCase();
          if (nameA < nameB) {
              return -1;
          }
          if (nameA > nameB) {
              return 1;
          }
          return 0; 
      });

        type = response.type;
        var templates = response.templates;
        template_body = templates;

        var templateSelect = $('#template');
        templateSelect.empty();
        templateSelect.append($('<option>', {
          value: '',
          text: 'Select Template'
        }));

        templates.forEach(function (template) {
          var option = $('<option>', {
            value: template.id,
            text: template.name
          });

          if (template.id == $('#selected_template_id').val()) {
            option.prop('selected', true);
          }

          templateSelect.append(option);
        });


        if (type === "Admission Letter") {
          $('#template').prop('disabled', false);
          $('#hospital-lable').css('display', 'block');
          $('#hospital').css('display', 'block');
          $('#clinic-lable').css('display', 'none');
          $('#admission-date-lable').css('display', 'block');
          $('#appointment-date-lable').css('display', 'none');
          $('#admission_date').css('display', 'block');
          $('#admission-id-div').css('display', 'block');
          $('#time-div').css('display', 'block');

          $('#custom_PFT_Request_div').css('display', 'none');
          $('#Doc_ref').css('display', 'none');
          $('#group-B-div').css('display', 'none');
          $('#infusion_suite_referral_div').css('display', 'none');
          $('#discs_hmc_div').css('display', 'none');
          $('#medicolegel_div').css('display', 'none');
          $('#discharge_div').css('display', 'none');
          $('#letter_body_div').css('display', 'block');
          $('#custom_Certificate_for_Work_div').css('display', 'none');
          $('#custom_Nursing_Home_Referral_div').css('display', 'none');
          $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
          $('#custom_GP_div').css('display', 'none');
          $('#custom_DEXA_Referral_div').css('display', 'none');
          $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
          $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
          $('#custom_Letter_for_Patches_div').css('display', 'none');
          $('#custom_Info_Letter_CXR_div').css('display', 'none');
          $('#custom_Info_Letter_Bloods_div').css('display', 'none');
          $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
          $('#custom_Release_of_Medical_Record_div').css('display', 'none');
          $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
          $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
          $('#custom_ML_Report_Appointment_div').css('display', 'none');
          $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');

        }
        else if (type === "Appointment Letter") {
          $('#template').prop('disabled', false);
          $('#hospital-lable').css('display', 'none');
          $('#admission-date-lable').css('display', 'none');
          $('#clinic-lable').css('display', 'block');
          $('#hospital').css('display', 'block');
          $('#appointment-date-lable').css('display', 'block');
          $('#admission_date').css('display', 'block');
          $('#admission-id-div').css('display', 'block');
          $('#time-div').css('display', 'block');
          $('#Doc_ref').css('display', 'none');
          $('#group-B-div').css('display', 'none');
          $('#infusion_suite_referral_div').css('display', 'none');
          $('#discs_hmc_div').css('display', 'none');
          $('#medicolegel_div').css('display', 'none');
          $('#discharge_div').css('display', 'none');
          $('#letter_body_div').css('display', 'block');
          $('#custom_PFT_Request_div').css('display', 'none');
          $('#custom_Note_for_Work_div').css('display', 'none');
          $('#custom_Certificate_for_Work_div').css('display', 'none');
          $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
          $('#custom_Nursing_Home_Referral_div').css('display', 'none');
          $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
          $('#custom_GP_div').css('display', 'none');
          $('#custom_DEXA_Referral_div').css('display', 'none');
          $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
          $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
          $('#custom_Letter_for_Patches_div').css('display', 'none');
          $('#custom_Info_Letter_CXR_div').css('display', 'none');
          $('#custom_Info_Letter_Bloods_div').css('display', 'none');
          $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
          $('#custom_Release_of_Medical_Record_div').css('display', 'none');
          $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
          $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
          $('#custom_ML_Report_Appointment_div').css('display', 'none');
          $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
        }
        else if (type === "Select Letter Type") {
          $('#template').prop('disabled', true);
          $('#hospital-lable').css('display', 'none');
          $('#hospital').css('display', 'none');
          $('#clinic-lable').css('display', 'none');
          $('#admission-date-lable').css('display', 'none');
          $('#appointment-date-lable').css('display', 'none');
          $('#admission_date').css('display', 'none');
          $('#admission-id-div').css('display', 'none');
          $('#time-div').css('display', 'none');
          $('#Doc_ref').css('display', 'none');
          $('#group-B-div').css('display', 'none');
          $('#infusion_suite_referral_div').css('display', 'none');
          $('#discs_hmc_div').css('display', 'none');
          $('#medicolegel_div').css('display', 'none');
          $('#discharge_div').css('display', 'none');
          $('#letter_body_div').css('display', 'block');
          $('#custom_PFT_Request_div').css('display', 'none');
          $('#custom_Note_for_Work_div').css('display', 'none');
          $('#custom_Certificate_for_Work_div').css('display', 'none');
          $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
          $('#custom_Nursing_Home_Referral_div').css('display', 'none');
          $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
          $('#custom_GP_div').css('display', 'none');
          $('#custom_DEXA_Referral_div').css('display', 'none');
          $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
          $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
          $('#custom_Letter_for_Patches_div').css('display', 'none');
          $('#custom_Info_Letter_CXR_div').css('display', 'none');
          $('#custom_Info_Letter_Bloods_div').css('display', 'none');
          $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
          $('#custom_Release_of_Medical_Record_div').css('display', 'none');
          $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
          $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
          $('#custom_ML_Report_Appointment_div').css('display', 'none');
          $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
        }
        else { //custom letter

          selected_template = $("#template option:selected").text();

          $('#template').prop('disabled', false);
          $('#hospital-lable').css('display', 'none');
          $('#clinic-lable').css('display', 'none');
          $('#hospital').css('display', 'none');
          $('#time-div').css('display', 'none');
          $('#admission-id-div').css('display', 'none');
          $('#Doc_ref').css('display', 'none');
          $('#group-B-div').css('display', 'none');
          $('#infusion_suite_referral_div').css('display', 'none');
          $('#discs_hmc_div').css('display', 'none');
          $('#medicolegel_div').css('display', 'none');
          $('#discharge_div').css('display', 'none');
          $('#letter_body_div').css('display', 'none');
          $('#custom_PFT_Request_div').css('display', 'none');
          $('#custom_Note_for_Work_div').css('display', 'none');
          $('#custom_Certificate_for_Work_div').css('display', 'none');
          $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
          $('#custom_Nursing_Home_Referral_div').css('display', 'none');
          $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
          $('#custom_GP_div').css('display', 'none');
          $('#custom_DEXA_Referral_div').css('display', 'none');
          $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
          $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
          $('#custom_Letter_for_Patches_div').css('display', 'none');
          $('#custom_Info_Letter_CXR_div').css('display', 'none');
          $('#custom_Info_Letter_Bloods_div').css('display', 'none');
          $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
          $('#custom_Release_of_Medical_Record_div').css('display', 'none');
          $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
          $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
          $('#custom_ML_Report_Appointment_div').css('display', 'none');
          $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');


          if (selected_template === "PFT Request Template") {
            //console.log(templates[2].name);
            $('#Doc_ref').css('display', 'none');
            $('#group-B-div').css('display', 'none');
            $('#infusion_suite_referral_div').css('display', 'none');
            $('#discs_hmc_div').css('display', 'none');
            $('#medicolegel_div').css('display', 'none');
            $('#discharge_div').css('display', 'none');
            $('#letter_body_div').css('display', 'none');
            $('#custom_PFT_Request_div').css('display', 'block');
            $('#letter_body_div').css('display', 'none');
            $('#custom_Note_for_Work_div').css('display', 'none');
            $('#custom_Certificate_for_Work_div').css('display', 'none');
            $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
            $('#custom_Nursing_Home_Referral_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
            $('#custom_GP_div').css('display', 'none');
            $('#custom_DEXA_Referral_div').css('display', 'none');
            $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
            $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
            $('#custom_Letter_for_Patches_div').css('display', 'none');
            $('#custom_Info_Letter_CXR_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
            $('#custom_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
          }
          else if (selected_template === "Blood for ST James (For Patient)") {
            $('#hospital-lable').css('display', 'none');
            $('#clinic-lable').css('display', 'none');
            $('#hospital').css('display', 'none');
            $('#time-div').css('display', 'none');
            $('#admission-id-div').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#group-B-div').css('display', 'none');
            $('#infusion_suite_referral_div').css('display', 'none');
            $('#discs_hmc_div').css('display', 'none');
            $('#medicolegel_div').css('display', 'none');
            $('#discharge_div').css('display', 'none');
            $('#letter_body_div').css('display', 'none');
            $('#custom_PFT_Request_div').css('display', 'none');
            $('#custom_Note_for_Work_div').css('display', 'none');
            $('#custom_Certificate_for_Work_div').css('display', 'none');
            $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
            $('#custom_Nursing_Home_Referral_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Patient_div').css('display', 'block');
            $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
            $('#custom_GP_div').css('display', 'none');
            $('#custom_DEXA_Referral_div').css('display', 'none');
            $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
            $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
            $('#custom_Letter_for_Patches_div').css('display', 'none');
            $('#custom_Info_Letter_CXR_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
            $('#custom_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');

          }
          else if (selected_template === "Blood for ST James Institute") {
            $('#hospital-lable').css('display', 'none');
            $('#clinic-lable').css('display', 'none');
            $('#hospital').css('display', 'none');
            $('#time-div').css('display', 'none');
            $('#admission-id-div').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#group-B-div').css('display', 'none');
            $('#infusion_suite_referral_div').css('display', 'none');
            $('#discs_hmc_div').css('display', 'none');
            $('#medicolegel_div').css('display', 'none');
            $('#discharge_div').css('display', 'none');
            $('#letter_body_div').css('display', 'none');
            $('#custom_PFT_Request_div').css('display', 'none');
            $('#custom_Note_for_Work_div').css('display', 'none');
            $('#custom_Certificate_for_Work_div').css('display', 'none');
            $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
            $('#custom_Nursing_Home_Referral_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Institute_div').css('display', 'block');
            $('#custom_GP_div').css('display', 'none');
            $('#custom_DEXA_Referral_div').css('display', 'none');
            $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
            $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
            $('#custom_Letter_for_Patches_div').css('display', 'none');
            $('#custom_Info_Letter_CXR_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
            $('#custom_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
          }
          else if (selected_template === "Certificate for Work") {
            $('#hospital-lable').css('display', 'none');
            $('#clinic-lable').css('display', 'none');
            $('#hospital').css('display', 'none');
            $('#time-div').css('display', 'none');
            $('#admission-id-div').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#group-B-div').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#infusion_suite_referral_div').css('display', 'none');
            $('#discs_hmc_div').css('display', 'none');
            $('#medicolegel_div').css('display', 'none');
            $('#discharge_div').css('display', 'none');
            $('#letter_body_div').css('display', 'none');
            $('#notes_lable').text('Due To');
            $('#custom_PFT_Request_div').css('display', 'none');
            $('#custom_Note_for_Work_div').css('display', 'none');
            $('#custom_Certificate_for_Work_div').css('display', 'block');
            $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
            $('#custom_Nursing_Home_Referral_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
            $('#custom_GP_div').css('display', 'none');
            $('#custom_DEXA_Referral_div').css('display', 'none');
            $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
            $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
            $('#custom_Letter_for_Patches_div').css('display', 'none');
            $('#custom_Info_Letter_CXR_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
            $('#custom_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');

          }
          else if (selected_template === "Note for Work") {
            //console.log("note for work");
            $('#hospital-lable').css('display', 'none');
            $('#clinic-lable').css('display', 'none');
            $('#hospital').css('display', 'none');
            $('#time-div').css('display', 'none');
            $('#admission-id-div').css('display', 'none');
            $('#appointment-date-lable').css('display', 'none');
            $('#admission_date').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#group-B-div').css('display', 'none');
            $('#infusion_suite_referral_div').css('display', 'none');
            $('#discs_hmc_div').css('display', 'none');
            $('#medicolegel_div').css('display', 'none');
            $('#discharge_div').css('display', 'none');
            $('#letter_body_div').css('display', 'none');
            $('#custom_PFT_Request_div').css('display', 'none');
            $('#custom_Note_for_Work_div').css('display', 'block');
            $('#custom_Certificate_for_Work_div').css('display', 'none');
            $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
            $('#custom_Nursing_Home_Referral_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
            $('#custom_GP_div').css('display', 'none');
            $('#custom_DEXA_Referral_div').css('display', 'none');
            $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
            $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
            $('#custom_Letter_for_Patches_div').css('display', 'none');
            $('#custom_Info_Letter_CXR_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
            $('#custom_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
          }
          else if (selected_template === "Consent for Scramble Therapy") {
            $('#hospital-lable').css('display', 'none');
            $('#clinic-lable').css('display', 'none');
            $('#hospital').css('display', 'none');
            $('#time-div').css('display', 'none');
            $('#admission-id-div').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#group-B-div').css('display', 'block');
            $('#group-B-exp').css('display', 'none');
            $('#infusion_suite_referral_div').css('display', 'none');
            $('#discs_hmc_div').css('display', 'none');
            $('#medicolegel_div').css('display', 'none');
            $('#discharge_div').css('display', 'none');
            $('#letter_body_div').css('display', 'none');
            $('#custom_PFT_Request_div').css('display', 'none');
            $('#custom_Note_for_Work_div').css('display', 'none');
            $('#custom_Certificate_for_Work_div').css('display', 'none');
            $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
            $('#custom_Nursing_Home_Referral_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
            $('#custom_GP_div').css('display', 'none');
            $('#custom_DEXA_Referral_div').css('display', 'none');
            $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
            $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
            $('#custom_Letter_for_Patches_div').css('display', 'none');
            $('#custom_Info_Letter_CXR_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
            $('#custom_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
          }
          else if (selected_template === "Convalescence Letter for Insurance") {

            $('#group-B-exp').css('display', 'none');
            $('#hospital-lable').css('display', 'none');
            $('#clinic-lable').css('display', 'none');
            $('#hospital').css('display', 'none');
            $('#time-div').css('display', 'none');
            $('#admission-id-div').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#group-B-div').css('display', 'none');
            $('#infusion_suite_referral_div').css('display', 'none');
            $('#discs_hmc_div').css('display', 'none');
            $('#medicolegel_div').css('display', 'none');
            $('#discharge_div').css('display', 'none');
            $('#letter_body_div').css('display', 'none');
            $('#custom_PFT_Request_div').css('display', 'none');
            $('#custom_Note_for_Work_div').css('display', 'none');
            $('#custom_Certificate_for_Work_div').css('display', 'none');
            $('#custom_Convalescence_Letter_for_Insurance').css('display', 'block');
            $('#custom_Nursing_Home_Referral_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
            $('#custom_GP_div').css('display', 'none');
            $('#custom_DEXA_Referral_div').css('display', 'none');
            $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
            $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
            $('#custom_Letter_for_Patches_div').css('display', 'none');
            $('#custom_Info_Letter_CXR_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
            $('#custom_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
          }
          else if (selected_template === "DEXA Referral") {
            $('#hospital-lable').css('display', 'none');
            $('#clinic-lable').css('display', 'none');
            $('#hospital').css('display', 'none');
            $('#time-div').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#group-B-div').css('display', 'none');
            $('#infusion_suite_referral_div').css('display', 'none');
            $('#discs_hmc_div').css('display', 'none');
            $('#medicolegel_div').css('display', 'none');
            $('#discharge_div').css('display', 'none');
            $('#letter_body_div').css('display', 'none');
            $('#custom_PFT_Request_div').css('display', 'none');
            $('#custom_Note_for_Work_div').css('display', 'none');
            $('#custom_Certificate_for_Work_div').css('display', 'none');
            $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
            $('#custom_Nursing_Home_Referral_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
            $('#custom_GP_div').css('display', 'none');
            $('#custom_DEXA_Referral_div').css('display', 'block');
            $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
            $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
            $('#custom_Letter_for_Patches_div').css('display', 'none');
            $('#custom_Info_Letter_CXR_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
            $('#custom_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
          }
          else if (selected_template === "Doctor Reference") {
            $('#hospital-lable').css('display', 'none');
            $('#clinic-lable').css('display', 'none');
            $('#hospital').css('display', 'none');
            $('#time-div').css('display', 'none');
            $('#admission-id-div').css('display', 'none');
            $('#custom_PFT_Request_div').css('display', 'block');
            $('#custom_Note_for_Work_div').css('display', 'none');

            $('#Doc_ref').css('display', 'block');
            $('#group-B-div').css('display', 'none');
            $('#infusion_suite_referral_div').css('display', 'none');
            $('#discs_hmc_div').css('display', 'none');
            $('#medicolegel_div').css('display', 'none');
            $('#discharge_div').css('display', 'none');
            $('#letter_body_div').css('display', 'none');
            $('#custom_Certificate_for_Work_div').css('display', 'none');
            $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
            $('#custom_Nursing_Home_Referral_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
            $('#custom_GP_div').css('display', 'none');
            $('#custom_DEXA_Referral_div').css('display', 'none');
            $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
            $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
            $('#custom_Letter_for_Patches_div').css('display', 'none');
            $('#custom_Info_Letter_CXR_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
            $('#custom_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');

          }
          else if (selected_template === "GDPR Consent Form") {
            $('#hospital-lable').css('display', 'none');
            $('#clinic-lable').css('display', 'none');
            $('#hospital').css('display', 'none');
            $('#time-div').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#group-B-div').css('display', 'none');
            $('#letter_body_div').css('display', 'none');
            $('#infusion_suite_referral_div').css('display', 'none');
            $('#discs_hmc_div').css('display', 'none');
            $('#medicolegel_div').css('display', 'none');
            $('#discharge_div').css('display', 'none');
            $('#custom_PFT_Request_div').css('display', 'none');
            $('#custom_Note_for_Work_div').css('display', 'none');
            $('#custom_Certificate_for_Work_div').css('display', 'none');
            $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
            $('#custom_Nursing_Home_Referral_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
            $('#custom_GP_div').css('display', 'none');
            $('#custom_DEXA_Referral_div').css('display', 'none');
            $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
            $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
            $('#custom_Letter_for_Patches_div').css('display', 'none');
            $('#custom_Info_Letter_CXR_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
            $('#custom_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
          }
          else if (selected_template === "GP Letter") {
            $('#hospital-lable').css('display', 'none');
            $('#clinic-lable').css('display', 'none');
            $('#hospital').css('display', 'none');
            $('#time-div').css('display', 'none');
            $('#admission-id-div').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#group-B-div').css('display', 'none');
            $('#infusion_suite_referral_div').css('display', 'none');
            $('#discs_hmc_div').css('display', 'none');
            $('#medicolegel_div').css('display', 'none');
            $('#discharge_div').css('display', 'none');
            $('#custom_GP_div').css('display', 'block');
            $('#letter_body_div').css('display', 'none');
            $('#custom_div').css('display', 'none');
            $('#custom_PFT_Request_div').css('display', 'none');
            $('#custom_Note_for_Work_div').css('display', 'none');
            $('#custom_Certificate_for_Work_div').css('display', 'none');
            $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
            $('#custom_Nursing_Home_Referral_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
            $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
            $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
            $('#custom_Letter_for_Patches_div').css('display', 'none');
            $('#custom_Info_Letter_CXR_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
            $('#custom_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
          }
          else if (selected_template === "Letter for DNA/Cancellation") {
            $('#hospital-lable').css('display', 'none');
            $('#clinic-lable').css('display', 'none');
            $('#hospital').css('display', 'none');
            $('#time-div').css('display', 'none');
            $('#admission-id-div').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#group-B-div').css('display', 'none');
            $('#infusion_suite_referral_div').css('display', 'none');
            $('#discs_hmc_div').css('display', 'none');
            $('#medicolegel_div').css('display', 'none');
            $('#discharge_div').css('display', 'none');
            $('#letter_body_div').css('display', 'none');
            $('#custom_PFT_Request_div').css('display', 'none');
            $('#custom_Note_for_Work_div').css('display', 'none');
            $('#custom_Certificate_for_Work_div').css('display', 'none');
            $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
            $('#custom_Nursing_Home_Referral_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
            $('#custom_GP_div').css('display', 'none');
            $('#custom_DEXA_Referral_div').css('display', 'none');
            $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
            $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'block');
            $('#custom_Letter_for_Patches_div').css('display', 'none');
            $('#custom_Info_Letter_CXR_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
            $('#custom_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
          }
          else if (selected_template === "Letter for Patches") {
            $('#hospital-lable').css('display', 'none');
            $('#clinic-lable').css('display', 'none');
            $('#hospital').css('display', 'none');
            $('#time-div').css('display', 'none');
            $('#admission-id-div').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#group-B-div').css('display', 'none');
            $('#infusion_suite_referral_div').css('display', 'none');
            $('#discs_hmc_div').css('display', 'none');
            $('#medicolegel_div').css('display', 'none');
            $('#discharge_div').css('display', 'none');
            $('#letter_body_div').css('display', 'none');
            $('#custom_PFT_Request_div').css('display', 'none');
            $('#custom_Note_for_Work_div').css('display', 'none');
            $('#custom_Certificate_for_Work_div').css('display', 'none');
            $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
            $('#custom_Nursing_Home_Referral_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
            $('#custom_GP_div').css('display', 'none');
            $('#custom_DEXA_Referral_div').css('display', 'none');
            $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
            $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
            $('#custom_Letter_for_Patches_div').css('display', 'block');
            $('#custom_Info_Letter_CXR_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
            $('#custom_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
          }
          else if (selected_template === "Injection Referral") {
            $('#hospital-lable').css('display', 'none');
            $('#clinic-lable').css('display', 'none');
            $('#hospital').css('display', 'none');
            $('#time-div').css('display', 'none');
            $('#admission-id-div').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#group-B-div').css('display', 'block');
            $('#group-B-exp').css('display', 'none');
            $('#letter_body_div').css('display', 'none');
            $('#infusion_suite_referral_div').css('display', 'none');
            $('#discs_hmc_div').css('display', 'none');
            $('#medicolegel_div').css('display', 'none');
            $('#discharge_div').css('display', 'none');
            $('#custom_PFT_Request_div').css('display', 'none');
            $('#custom_Note_for_Work_div').css('display', 'none');
            $('#custom_Certificate_for_Work_div').css('display', 'none');
            $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
            $('#custom_Nursing_Home_Referral_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
            $('#custom_GP_div').css('display', 'none');
            $('#custom_DEXA_Referral_div').css('display', 'none');
            $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
            $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
            $('#custom_Letter_for_Patches_div').css('display', 'none');
            $('#custom_Info_Letter_CXR_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
            $('#custom_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
          }
          else if (selected_template === "Nursing Home Referral") {
            $('#hospital-lable').css('display', 'none');
            $('#clinic-lable').css('display', 'none');
            $('#hospital').css('display', 'none');
            $('#time-div').css('display', 'none');
            $('#admission-id-div').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#group-B-div').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#infusion_suite_referral_div').css('display', 'none');
            $('#discs_hmc_div').css('display', 'none');
            $('#medicolegel_div').css('display', 'none');
            $('#discharge_div').css('display', 'none');
            $('#letter_body_div').css('display', 'none');
            $('#custom_PFT_Request_div').css('display', 'none');
            $('#custom_Note_for_Work_div').css('display', 'none');
            $('#custom_Certificate_for_Work_div').css('display', 'none');
            $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
            $('#custom_Nursing_Home_Referral_div').css('display', 'block');
            $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
            $('#custom_GP_div').css('display', 'none');
            $('#custom_DEXA_Referral_div').css('display', 'none');
            $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
            $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
            $('#custom_Letter_for_Patches_div').css('display', 'none');
            $('#custom_Info_Letter_CXR_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
            $('#custom_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');

          }
          else if (selected_template === "Outstanding Fee Letter") {
            $('#hospital-lable').css('display', 'none');
            $('#clinic-lable').css('display', 'none');
            $('#hospital').css('display', 'none');
            $('#time-div').css('display', 'none');
            $('#admission-id-div').css('display', 'none');
            $('#appointment-date-lable').css('display', 'none');
            $('#admission_date').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#group-B-div').css('display', 'none');
            $('#infusion_suite_referral_div').css('display', 'none');
            $('#discs_hmc_div').css('display', 'none');
            $('#medicolegel_div').css('display', 'none');
            $('#discharge_div').css('display', 'none');
            $('#letter_body_div').css('display', 'none');
            $('#custom_PFT_Request_div').css('display', 'none');
            $('#custom_Note_for_Work_div').css('display', 'none');
            $('#custom_Certificate_for_Work_div').css('display', 'none');
            $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
            $('#custom_Nursing_Home_Referral_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
            $('#custom_GP_div').css('display', 'none');
            $('#custom_DEXA_Referral_div').css('display', 'none');
            $('#custom_Outstanding_Fee_Letter_div').css('display', 'block');
            $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
            $('#custom_Letter_for_Patches_div').css('display', 'none');
            $('#custom_Info_Letter_CXR_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_div').css('display', 'none');

            $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
            $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
            $('#custom_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');

            if (admission_date.length) {
              var admission_date = admission_date.flatpickr({
                enableTime: false,
                altFormat: 'Y-m-d',
                onReady: function (selectedDates, dateStr, instance) {
                  if (instance.isMobile) {
                    $(instance.mobileInput).attr('step', null);
                  }
                }
              });
            }
          }
          else if (selected_template === "Release of Medical Record") {
            $('#hospital-lable').css('display', 'none');
            $('#clinic-lable').css('display', 'none');
            $('#hospital').css('display', 'none');
            $('#time-div').css('display', 'none');
            $('#admission-id-div').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#group-B-div').css('display', 'none');
            $('#infusion_suite_referral_div').css('display', 'none');
            $('#discs_hmc_div').css('display', 'none');
            $('#medicolegel_div').css('display', 'none');
            $('#discharge_div').css('display', 'none');
            $('#letter_body_div').css('display', 'none');
            $('#custom_PFT_Request_div').css('display', 'none');
            $('#custom_Note_for_Work_div').css('display', 'none');
            $('#custom_Certificate_for_Work_div').css('display', 'none');
            $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
            $('#custom_Nursing_Home_Referral_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
            $('#custom_GP_div').css('display', 'none');
            $('#custom_DEXA_Referral_div').css('display', 'none');
            $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
            $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
            $('#custom_Letter_for_Patches_div').css('display', 'none');
            $('#custom_Info_Letter_CXR_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
            $('#custom_Release_of_Medical_Record_div').css('display', 'block');
            $('#custom_ML_Report_Appointment_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
          }
          else if (selected_template === "Info Letter Bloods") {
            $('#hospital-lable').css('display', 'none');
            $('#clinic-lable').css('display', 'none');
            $('#hospital').css('display', 'none');
            $('#time-div').css('display', 'none');
            $('#admission-id-div').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#group-B-div').css('display', 'none');
            $('#infusion_suite_referral_div').css('display', 'none');
            $('#discs_hmc_div').css('display', 'none');
            $('#medicolegel_div').css('display', 'none');
            $('#discharge_div').css('display', 'none');
            $('#letter_body_div').css('display', 'none');
            $('#custom_PFT_Request_div').css('display', 'none');
            $('#custom_Note_for_Work_div').css('display', 'none');
            $('#custom_Certificate_for_Work_div').css('display', 'none');
            $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
            $('#custom_Nursing_Home_Referral_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
            $('#custom_GP_div').css('display', 'none');
            $('#custom_DEXA_Referral_div').css('display', 'none');
            $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
            $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
            $('#custom_Letter_for_Patches_div').css('display', 'none');
            $('#custom_Info_Letter_CXR_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_div').css('display', 'block');
            $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
            $('#custom_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
          }
          else if (selected_template === "Info Letter CXR") {
            $('#hospital-lable').css('display', 'none');
            $('#clinic-lable').css('display', 'none');
            $('#hospital').css('display', 'none');
            $('#time-div').css('display', 'none');
            $('#admission-id-div').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#group-B-div').css('display', 'none');
            $('#infusion_suite_referral_div').css('display', 'none');
            $('#discs_hmc_div').css('display', 'none');
            $('#medicolegel_div').css('display', 'none');
            $('#letter_body_div').css('display', 'none');
            $('#custom_PFT_Request_div').css('display', 'none');
            $('#custom_Note_for_Work_div').css('display', 'none');
            $('#custom_Certificate_for_Work_div').css('display', 'none');
            $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
            $('#custom_Nursing_Home_Referral_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
            $('#custom_GP_div').css('display', 'none');
            $('#custom_DEXA_Referral_div').css('display', 'none');
            $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
            $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
            $('#custom_Letter_for_Patches_div').css('display', 'none');
            $('#custom_Info_Letter_CXR_div').css('display', 'block');
            $('#custom_Info_Letter_Bloods_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
            $('#custom_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
          }
          else if (selected_template === "Info Letter Bloods and CXR") {
            $('#hospital-lable').css('display', 'none');
            $('#clinic-lable').css('display', 'none');
            $('#hospital').css('display', 'none');
            $('#time-div').css('display', 'none');
            $('#admission-id-div').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#group-B-div').css('display', 'none');
            $('#infusion_suite_referral_div').css('display', 'none');
            $('#discs_hmc_div').css('display', 'none');
            $('#medicolegel_div').css('display', 'none');
            $('#discharge_div').css('display', 'none');
            $('#letter_body_div').css('display', 'none');
            $('#custom_PFT_Request_div').css('display', 'none');
            $('#custom_Note_for_Work_div').css('display', 'none');
            $('#custom_Certificate_for_Work_div').css('display', 'none');
            $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
            $('#custom_Nursing_Home_Referral_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
            $('#custom_GP_div').css('display', 'none');
            $('#custom_DEXA_Referral_div').css('display', 'none');
            $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
            $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
            $('#custom_Letter_for_Patches_div').css('display', 'none');
            $('#custom_Info_Letter_CXR_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'block');
            $('#custom_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
          }
          else if (selected_template === "ML Report Appointment Fee") {
            $('#hospital-lable').css('display', 'none');
            $('#clinic-lable').css('display', 'none');
            $('#hospital').css('display', 'none');
            $('#time-div').css('display', 'none');
            $('#admission-id-div').css('display', 'none');
            $('#appointment-date-lable').css('display', 'none');
            $('#admission_date').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#group-B-div').css('display', 'none');
            $('#group-B-exp').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#notes_lable').text('MRU/NF');
            $('#appointment-date-lable').text('Solicitor Letter Date');
            $('#infusion_suite_referral_div').css('display', 'none');
            $('#discs_hmc_div').css('display', 'none');
            $('#medicolegel_div').css('display', 'none');
            $('#discharge_div').css('display', 'none');
            $('#letter_body_div').css('display', 'none');
            $('#custom_PFT_Request_div').css('display', 'none');
            $('#custom_Note_for_Work_div').css('display', 'none');
            $('#custom_Certificate_for_Work_div').css('display', 'none');
            $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
            $('#custom_Nursing_Home_Referral_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
            $('#custom_GP_div').css('display', 'none');
            $('#custom_DEXA_Referral_div').css('display', 'none');
            $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
            $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
            $('#custom_Letter_for_Patches_div').css('display', 'none');
            $('#custom_Info_Letter_CXR_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
            $('#custom_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_Fee_div').css('display', 'block');

            admission_date = $('#admission_date');
            var admission_date = admission_date.flatpickr({
              enableTime: false,
              altFormat: 'Y-m-d',
              onReady: function (selectedDates, dateStr, instance) {
                if (instance.isMobile) {
                  $(instance.mobileInput).attr('step', null);
                }
              }
            });
          }
          else if (selected_template === "ML Report Appointment") {
            $('#hospital-lable').css('display', 'none');
            $('#clinic-lable').css('display', 'none');
            $('#hospital').css('display', 'none');
            $('#time-div').css('display', 'none');
            $('#admission-id-div').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#group-B-div').css('display', 'none');
            $('#group-B-exp').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#notes_lable').text('MRU/NF');
            $('#infusion_suite_referral_div').css('display', 'none');
            $('#discs_hmc_div').css('display', 'none');
            $('#medicolegel_div').css('display', 'none');
            $('#discharge_div').css('display', 'none');
            $('#letter_body_div').css('display', 'none');
            $('#custom_PFT_Request_div').css('display', 'none');
            $('#custom_Note_for_Work_div').css('display', 'none');
            $('#custom_Certificate_for_Work_div').css('display', 'none');
            $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
            $('#custom_Nursing_Home_Referral_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
            $('#custom_GP_div').css('display', 'none');
            $('#custom_DEXA_Referral_div').css('display', 'none');
            $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
            $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
            $('#custom_Letter_for_Patches_div').css('display', 'none');
            $('#custom_Info_Letter_CXR_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
            $('#custom_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_div').css('display', 'block');
            $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
          }
          else if (selected_template === "ML Solicitor Letter Standby") {
            $('#hospital-lable').css('display', 'none');
            $('#clinic-lable').css('display', 'none');
            $('#hospital').css('display', 'none');
            $('#time-div').css('display', 'none');
            $('#admission-id-div').css('display', 'none');
            $('#appointment-date-lable').css('display', 'none');
            $('#admission_date').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#group-B-div').css('display', 'none');
            $('#group-B-exp').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#notes_lable').text('MRU/NF');
            $('#appointment-date-lable').text('Solicitor Letter Date');
            $('#infusion_suite_referral_div').css('display', 'none');
            $('#discs_hmc_div').css('display', 'none');
            $('#medicolegel_div').css('display', 'none');
            $('#discharge_div').css('display', 'none');
            $('#letter_body_div').css('display', 'none');
            $('#custom_PFT_Request_div').css('display', 'none');
            $('#custom_Note_for_Work_div').css('display', 'none');
            $('#custom_Certificate_for_Work_div').css('display', 'none');
            $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
            $('#custom_Nursing_Home_Referral_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
            $('#custom_GP_div').css('display', 'none');
            $('#custom_DEXA_Referral_div').css('display', 'none');
            $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
            $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
            $('#custom_Letter_for_Patches_div').css('display', 'none');
            $('#custom_Info_Letter_CXR_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
            $('#custom_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'block');
            $('#custom_ML_Report_Appointment_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');

            admission_date = $('#admission_date');
            var admission_date = admission_date.flatpickr({
              enableTime: false,
              altFormat: 'Y-m-d',
              onReady: function (selectedDates, dateStr, instance) {
                if (instance.isMobile) {
                  $(instance.mobileInput).attr('step', null);
                }
              }
            });
          }
          else if (selected_template === "ML Release of Medical Record") {
            $('#hospital-lable').css('display', 'none');
            $('#clinic-lable').css('display', 'none');
            $('#hospital').css('display', 'none');
            $('#time-div').css('display', 'none');
            $('#admission-id-div').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#group-B-div').css('display', 'none');
            $('#group-B-exp').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#notes_lable').text('MRU');
            $('#infusion_suite_referral_div').css('display', 'none');
            $('#discs_hmc_div').css('display', 'none');
            $('#medicolegel_div').css('display', 'none');
            $('#discharge_div').css('display', 'none');
            $('#letter_body_div').css('display', 'none');
            $('#custom_PFT_Request_div').css('display', 'none');
            $('#custom_Note_for_Work_div').css('display', 'none');
            $('#custom_Certificate_for_Work_div').css('display', 'none');
            $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
            $('#custom_Nursing_Home_Referral_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
            $('#custom_GP_div').css('display', 'none');
            $('#custom_DEXA_Referral_div').css('display', 'none');
            $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
            $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
            $('#custom_Letter_for_Patches_div').css('display', 'none');
            $('#custom_Info_Letter_CXR_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
            $('#custom_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Release_of_Medical_Record_div').css('display', 'block');
            $('#custom_ML_Report_Appointment_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
          }
          else if (selected_template === "Infusion Referral") {
            $('#hospital-lable').css('display', 'none');
            $('#clinic-lable').css('display', 'none');
            $('#hospital').css('display', 'none');
            $('#time-div').css('display', 'none');
            $('#admission-id-div').css('display', 'none');
            $('#letter_body_div').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#group-B-div').css('display', 'none');
            $('#infusion_suite_referral_div').css('display', 'block');
            $('#discs_hmc_div').css('display', 'none');
            $('#medicolegel_div').css('display', 'none');
            $('#discharge_div').css('display', 'none');
            $('#custom_PFT_Request_div').css('display', 'none');
            $('#custom_Note_for_Work_div').css('display', 'none');
            $('#custom_Certificate_for_Work_div').css('display', 'none');
            $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
            $('#custom_Nursing_Home_Referral_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
            $('#custom_GP_div').css('display', 'none');
            $('#custom_DEXA_Referral_div').css('display', 'none');
            $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
            $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
            $('#custom_Letter_for_Patches_div').css('display', 'none');
            $('#custom_Info_Letter_CXR_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
            $('#custom_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
          }
          else if (selected_template === "MedicoLegal Report Letter") {
            $('#Doc_ref').css('display', 'none');
            $('#group-B-div').css('display', 'none');
            $('#infusion_suite_referral_div').css('display', 'none');
            $('#discs_hmc_div').css('display', 'none');
            $('#medicolegel_div').css('display', 'block');
            $('#letter_body_div').css('display', 'none');
            $('#discharge_div').css('display', 'none');
            $('#custom_PFT_Request_div').css('display', 'none');
            $('#custom_Note_for_Work_div').css('display', 'none');
            $('#custom_Certificate_for_Work_div').css('display', 'none');
            $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
            $('#custom_Nursing_Home_Referral_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
            $('#custom_GP_div').css('display', 'none');
            $('#custom_DEXA_Referral_div').css('display', 'none');
            $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
            $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
            $('#custom_Letter_for_Patches_div').css('display', 'none');
            $('#custom_Info_Letter_CXR_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
            $('#custom_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
          }
          else if (selected_template === "Discharge Letter") {
            $('#Doc_ref').css('display', 'none');
            $('#group-B-div').css('display', 'none');
            $('#infusion_suite_referral_div').css('display', 'none');
            $('#discs_hmc_div').css('display', 'none');
            $('#medicolegel_div').css('display', 'none');
            $('#discharge_div').css('display', 'block');
            $('#letter_body_div').css('display', 'none');
            $('#custom_PFT_Request_div').css('display', 'none');
            $('#custom_Note_for_Work_div').css('display', 'none');
            $('#custom_Certificate_for_Work_div').css('display', 'none');
            $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
            $('#custom_Nursing_Home_Referral_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
            $('#custom_GP_div').css('display', 'none');
            $('#custom_DEXA_Referral_div').css('display', 'none');
            $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
            $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
            $('#custom_Letter_for_Patches_div').css('display', 'none');
            $('#custom_Info_Letter_CXR_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
            $('#custom_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
          }
          else if (selected_template === "Request for Discs HMC") {
            $('#hospital-lable').css('display', 'none');
            $('#clinic-lable').css('display', 'none');
            $('#hospital').css('display', 'none');
            $('#time-div').css('display', 'none');
            $('#admission-id-div').css('display', 'none');
            $('#letter_body_div').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#group-B-div').css('display', 'none');
            $('#infusion_suite_referral_div').css('display', 'none');
            $('#discs_hmc_div').css('display', 'block');
            $('#medicolegel_div').css('display', 'none');
            $('#discharge_div').css('display', 'none');
            $('#custom_PFT_Request_div').css('display', 'none');
            $('#custom_Note_for_Work_div').css('display', 'none');
            $('#custom_Certificate_for_Work_div').css('display', 'none');
            $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
            $('#custom_Nursing_Home_Referral_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
            $('#custom_GP_div').css('display', 'none');
            $('#custom_DEXA_Referral_div').css('display', 'none');
            $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
            $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
            $('#custom_Letter_for_Patches_div').css('display', 'none');
            $('#custom_Info_Letter_CXR_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
            $('#custom_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
          }
          else if (selected_template === "Custom Template") {
            // console.log("Custom Template");
            $('#hospital-lable').css('display', 'none');
            $('#clinic-lable').css('display', 'none');
            $('#hospital').css('display', 'none');
            $('#time-div').css('display', 'none');
            $('#admission-id-div').css('display', 'none');
            $('#letter_body_div').css('display', 'none');
            $('#Doc_ref').css('display', 'none');
            $('#group-B-div').css('display', 'none');
            $('#infusion_suite_referral_div').css('display', 'none');
            $('#discs_hmc_div').css('display', 'none');
            $('#medicolegel_div').css('display', 'none');
            $('#discharge_div').css('display', 'none');
            $('#custom_div').css('display', 'block');
            $('#custom_PFT_Request_div').css('display', 'none');
            $('#custom_Note_for_Work_div').css('display', 'none');
            $('#custom_Certificate_for_Work_div').css('display', 'none');
            $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
            $('#custom_Nursing_Home_Referral_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
            $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
            $('#custom_GP_div').css('display', 'none');
            $('#custom_DEXA_Referral_div').css('display', 'none');
            $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
            $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
            $('#custom_Letter_for_Patches_div').css('display', 'none');
            $('#custom_Info_Letter_CXR_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_div').css('display', 'none');
            $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
            $('#custom_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
            $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_div').css('display', 'none');
            $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
          }
          else {
            //console.log("Sorry");
          }


        }

      }
    };
    xhr.send();
  });

});

template.addEventListener('change', function () {

  var selectedValuetext = $('#letter_type option:selected').text();

  selected_template = $("#template option:selected").text();


  if (selected_template === "PFT Request Template") {
    //console.log(templates[2].name);
    $('#Doc_ref').css('display', 'none');
    $('#group-B-div').css('display', 'none');
    $('#infusion_suite_referral_div').css('display', 'none');
    $('#discs_hmc_div').css('display', 'none');
    $('#medicolegel_div').css('display', 'none');
    $('#discharge_div').css('display', 'none');
    $('#custom_div').css('display', 'none');
    $('#custom_PFT_Request_div').css('display', 'block');
    $('#custom_Note_for_Work_div').css('display', 'none');
    $('#custom_Certificate_for_Work_div').css('display', 'none');
    $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
    $('#custom_Nursing_Home_Referral_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
    $('#custom_GP_div').css('display', 'none');
    $('#custom_DEXA_Referral_div').css('display', 'none');
    $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
    $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
    $('#custom_Letter_for_Patches_div').css('display', 'none');
    $('#custom_Info_Letter_CXR_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
    $('#custom_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
  }
  else if (selected_template === "Blood for ST James (For Patient)") {
    $('#hospital-lable').css('display', 'none');
    $('#clinic-lable').css('display', 'none');
    $('#hospital').css('display', 'none');
    $('#time-div').css('display', 'none');
    $('#admission-id-div').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#group-B-div').css('display', 'none');
    $('#infusion_suite_referral_div').css('display', 'none');
    $('#discs_hmc_div').css('display', 'none');
    $('#medicolegel_div').css('display', 'none');
    $('#discharge_div').css('display', 'none');
    $('#letter_body_div').css('display', 'none');
    $('#custom_div').css('display', 'none');
    $('#custom_PFT_Request_div').css('display', 'none');
    $('#custom_Note_for_Work_div').css('display', 'none');
    $('#custom_Certificate_for_Work_div').css('display', 'none');
    $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
    $('#custom_Nursing_Home_Referral_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Patient_div').css('display', 'block');
    $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
    $('#custom_GP_div').css('display', 'none');
    $('#custom_DEXA_Referral_div').css('display', 'none');
    $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
    $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
    $('#custom_Letter_for_Patches_div').css('display', 'none');
    $('#custom_Info_Letter_CXR_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
    $('#custom_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
  }
  else if (selected_template === "Blood for ST James Institute") {
    $('#hospital-lable').css('display', 'none');
    $('#clinic-lable').css('display', 'none');
    $('#hospital').css('display', 'none');
    $('#time-div').css('display', 'none');
    $('#admission-id-div').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#group-B-div').css('display', 'none');
    $('#infusion_suite_referral_div').css('display', 'none');
    $('#discs_hmc_div').css('display', 'none');
    $('#medicolegel_div').css('display', 'none');
    $('#discharge_div').css('display', 'none');
    $('#letter_body_div').css('display', 'none');
    $('#custom_div').css('display', 'none');
    $('#custom_PFT_Request_div').css('display', 'none');
    $('#custom_Note_for_Work_div').css('display', 'none');
    $('#custom_Certificate_for_Work_div').css('display', 'none');
    $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
    $('#custom_Nursing_Home_Referral_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Institute_div').css('display', 'block');
    $('#custom_GP_div').css('display', 'none');
    $('#custom_DEXA_Referral_div').css('display', 'none');
    $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
    $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
    $('#custom_Letter_for_Patches_div').css('display', 'none');
    $('#custom_Info_Letter_CXR_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
    $('#custom_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
  }
  else if (selected_template === "Certificate for Work") {
    $('#hospital-lable').css('display', 'none');
    $('#clinic-lable').css('display', 'none');
    $('#hospital').css('display', 'none');
    $('#time-div').css('display', 'none');
    $('#admission-id-div').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#group-B-div').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#infusion_suite_referral_div').css('display', 'none');
    $('#discs_hmc_div').css('display', 'none');
    $('#medicolegel_div').css('display', 'none');
    $('#discharge_div').css('display', 'none');
    $('#letter_body_div').css('display', 'none');
    $('#notes_lable').text('Due To');
    $('#custom_div').css('display', 'none');
    $('#custom_PFT_Request_div').css('display', 'none');
    $('#custom_Note_for_Work_div').css('display', 'none');
    $('#custom_Certificate_for_Work_div').css('display', 'block');
    $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
    $('#custom_Nursing_Home_Referral_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
    $('#custom_GP_div').css('display', 'none');
    $('#custom_DEXA_Referral_div').css('display', 'none');
    $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
    $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
    $('#custom_Letter_for_Patches_div').css('display', 'none');
    $('#custom_Info_Letter_CXR_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
    $('#custom_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
  }
  else if (selected_template === "Note for Work") {
    console.log("note for work");
    $('#hospital-lable').css('display', 'none');
    $('#clinic-lable').css('display', 'none');
    $('#hospital').css('display', 'none');
    $('#time-div').css('display', 'none');
    $('#admission-id-div').css('display', 'none');
    $('#appointment-date-lable').css('display', 'none');
    $('#admission_date').css('display', 'none');
    $('#admission-date-lable').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#group-B-div').css('display', 'none');
    $('#infusion_suite_referral_div').css('display', 'none');
    $('#discs_hmc_div').css('display', 'none');
    $('#medicolegel_div').css('display', 'none');
    $('#discharge_div').css('display', 'none');
    $('#letter_body_div').css('display', 'none');
    $('#custom_div').css('display', 'none');
    $('#custom_PFT_Request_div').css('display', 'none');
    $('#custom_Note_for_Work_div').css('display', 'block');
    $('#custom_Certificate_for_Work_div').css('display', 'none');
    $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
    $('#custom_Nursing_Home_Referral_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
    $('#custom_GP_div').css('display', 'none');
    $('#custom_DEXA_Referral_div').css('display', 'none');
    $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
    $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
    $('#custom_Letter_for_Patches_div').css('display', 'none');
    $('#custom_Info_Letter_CXR_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
    $('#custom_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
  }
  else if (selected_template === "Consent for Scramble Therapy") {
    $('#hospital-lable').css('display', 'none');
    $('#clinic-lable').css('display', 'none');
    $('#hospital').css('display', 'none');
    $('#time-div').css('display', 'none');
    $('#admission-id-div').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#group-B-div').css('display', 'block');
    $('#group-B-exp').css('display', 'none');
    $('#letter_body_div').css('display', 'none');
    $('#infusion_suite_referral_div').css('display', 'none');
    $('#discs_hmc_div').css('display', 'none');
    $('#medicolegel_div').css('display', 'none');
    $('#discharge_div').css('display', 'none');
    $('#custom_div').css('display', 'none');
    $('#custom_PFT_Request_div').css('display', 'none');
    $('#custom_Note_for_Work_div').css('display', 'none');
    $('#custom_Certificate_for_Work_div').css('display', 'none');
    $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
    $('#custom_Nursing_Home_Referral_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
    $('#custom_GP_div').css('display', 'none');
    $('#custom_DEXA_Referral_div').css('display', 'none');
    $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
    $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
    $('#custom_Letter_for_Patches_div').css('display', 'none');
    $('#custom_Info_Letter_CXR_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
    $('#custom_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
  }
  else if (selected_template === "Convalescence Letter for Insurance") {

    $('#group-B-exp').css('display', 'none');
    $('#hospital-lable').css('display', 'none');
    $('#clinic-lable').css('display', 'none');
    $('#hospital').css('display', 'none');
    $('#time-div').css('display', 'none');
    $('#admission-id-div').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#group-B-div').css('display', 'none');
    $('#group-B-exp').css('display', 'none');
    $('#notes_lable').text('Nursing Home Name');
    $('#infusion_suite_referral_div').css('display', 'none');
    $('#discs_hmc_div').css('display', 'none');
    $('#medicolegel_div').css('display', 'none');
    $('#discharge_div').css('display', 'none');
    $('#letter_body_div').css('display', 'none');
    $('#custom_div').css('display', 'none');
    $('#custom_PFT_Request_div').css('display', 'none');
    $('#custom_Note_for_Work_div').css('display', 'none');
    $('#custom_Certificate_for_Work_div').css('display', 'none');
    $('#custom_Convalescence_Letter_for_Insurance').css('display', 'block');
    $('#custom_Nursing_Home_Referral_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
    $('#custom_GP_div').css('display', 'none');
    $('#custom_DEXA_Referral_div').css('display', 'none');
    $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
    $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
    $('#custom_Letter_for_Patches_div').css('display', 'none');
    $('#custom_Info_Letter_CXR_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
    $('#custom_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
  }
  else if (selected_template === "DEXA Referral") {
    $('#hospital-lable').css('display', 'none');
    $('#clinic-lable').css('display', 'none');
    $('#hospital').css('display', 'none');
    $('#time-div').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#group-B-div').css('display', 'none');
    $('#infusion_suite_referral_div').css('display', 'none');
    $('#discs_hmc_div').css('display', 'none');
    $('#medicolegel_div').css('display', 'none');
    $('#discharge_div').css('display', 'none');
    $('#letter_body_div').css('display', 'none');
    $('#custom_div').css('display', 'none');
    $('#custom_PFT_Request_div').css('display', 'none');
    $('#custom_Note_for_Work_div').css('display', 'none');
    $('#custom_Certificate_for_Work_div').css('display', 'none');
    $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
    $('#custom_Nursing_Home_Referral_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
    $('#custom_GP_div').css('display', 'none');
    $('#custom_DEXA_Referral_div').css('display', 'block');
    $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
    $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
    $('#custom_Letter_for_Patches_div').css('display', 'none');
    $('#custom_Info_Letter_CXR_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
    $('#custom_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
  }
  else if (selected_template === "Doctor Reference") {
    $('#hospital-lable').css('display', 'none');
    $('#clinic-lable').css('display', 'none');
    $('#hospital').css('display', 'none');
    $('#time-div').css('display', 'none');
    $('#Doc_ref').css('display', 'block');
    $('#group-B-div').css('display', 'none');
    $('#infusion_suite_referral_div').css('display', 'none');
    $('#discs_hmc_div').css('display', 'none');
    $('#medicolegel_div').css('display', 'none');
    $('#discharge_div').css('display', 'none');
    $('#letter_body_div').css('display', 'block');
    $('#custom_div').css('display', 'none');
    $('#custom_PFT_Request_div').css('display', 'none');
    $('#custom_Note_for_Work_div').css('display', 'none');
    $('#custom_Certificate_for_Work_div').css('display', 'none');
    $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
    $('#custom_Nursing_Home_Referral_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
    $('#custom_GP_div').css('display', 'none');
    $('#custom_DEXA_Referral_div').css('display', 'none');
    $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
    $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
    $('#custom_Letter_for_Patches_div').css('display', 'none');
    $('#custom_Info_Letter_CXR_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
    $('#custom_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
  }
  else if (selected_template === "GDPR Consent Form") {
    $('#hospital-lable').css('display', 'none');
    $('#clinic-lable').css('display', 'none');
    $('#hospital').css('display', 'none');
    $('#time-div').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#group-B-div').css('display', 'none');
    $('#letter_body_div').css('display', 'none');
    $('#infusion_suite_referral_div').css('display', 'none');
    $('#discs_hmc_div').css('display', 'none');
    $('#medicolegel_div').css('display', 'none');
    $('#discharge_div').css('display', 'none');
    $('#custom_div').css('display', 'none');
    $('#custom_PFT_Request_div').css('display', 'none');
    $('#custom_Note_for_Work_div').css('display', 'none');
    $('#custom_Certificate_for_Work_div').css('display', 'none');
    $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
    $('#custom_Nursing_Home_Referral_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
    $('#custom_GP_div').css('display', 'none');
    $('#custom_DEXA_Referral_div').css('display', 'none');
    $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
    $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
    $('#custom_Letter_for_Patches_div').css('display', 'none');
    $('#custom_Info_Letter_CXR_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
    $('#custom_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
  }
  else if (selected_template === "GP Letter") {
    $('#hospital-lable').css('display', 'none');
    $('#clinic-lable').css('display', 'none');
    $('#hospital').css('display', 'none');
    $('#time-div').css('display', 'none');
    $('#admission-id-div').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#group-B-div').css('display', 'none');
    $('#infusion_suite_referral_div').css('display', 'none');
    $('#discs_hmc_div').css('display', 'none');
    $('#medicolegel_div').css('display', 'none');
    $('#discharge_div').css('display', 'none');
    $('#letter_body_div').css('display', 'none');
    $('#custom_div').css('display', 'none');
    $('#custom_GP_div').css('display', 'block');
    $('#custom_PFT_Request_div').css('display', 'none');
    $('#custom_Note_for_Work_div').css('display', 'none');
    $('#custom_Certificate_for_Work_div').css('display', 'none');
    $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
    $('#custom_Nursing_Home_Referral_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
    $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
    $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
    $('#custom_Letter_for_Patches_div').css('display', 'none');
    $('#custom_Info_Letter_CXR_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
    $('#custom_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
  }
  else if (selected_template === "Letter for DNA/Cancellation") {
    $('#hospital-lable').css('display', 'none');
    $('#clinic-lable').css('display', 'none');
    $('#hospital').css('display', 'none');
    $('#time-div').css('display', 'none');
    $('#admission-id-div').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#group-B-div').css('display', 'none');
    $('#infusion_suite_referral_div').css('display', 'none');
    $('#discs_hmc_div').css('display', 'none');
    $('#medicolegel_div').css('display', 'none');
    $('#discharge_div').css('display', 'none');
    $('#letter_body_div').css('display', 'none');
    $('#custom_div').css('display', 'none');
    $('#custom_PFT_Request_div').css('display', 'none');
    $('#custom_Note_for_Work_div').css('display', 'none');
    $('#custom_Certificate_for_Work_div').css('display', 'none');
    $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
    $('#custom_Nursing_Home_Referral_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
    $('#custom_GP_div').css('display', 'none');
    $('#custom_DEXA_Referral_div').css('display', 'none');
    $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
    $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'block');
    $('#custom_Letter_for_Patches_div').css('display', 'none');
    $('#custom_Info_Letter_CXR_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
    $('#custom_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
  }
  else if (selected_template === "Letter for Patches") {
    $('#hospital-lable').css('display', 'none');
    $('#clinic-lable').css('display', 'none');
    $('#hospital').css('display', 'none');
    $('#time-div').css('display', 'none');
    $('#admission-id-div').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#group-B-div').css('display', 'none');
    $('#infusion_suite_referral_div').css('display', 'none');
    $('#discs_hmc_div').css('display', 'none');
    $('#medicolegel_div').css('display', 'none');
    $('#discharge_div').css('display', 'none');
    $('#letter_body_div').css('display', 'none');
    $('#custom_div').css('display', 'none');
    $('#custom_PFT_Request_div').css('display', 'none');
    $('#custom_Note_for_Work_div').css('display', 'none');
    $('#custom_Certificate_for_Work_div').css('display', 'none');
    $('#custom_Nursing_Home_Referral_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
    $('#custom_GP_div').css('display', 'none');
    $('#custom_DEXA_Referral_div').css('display', 'none');
    $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
    $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
    $('#custom_Letter_for_Patches_div').css('display', 'block');
    $('#custom_Info_Letter_CXR_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
    $('#custom_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
  }
  else if (selected_template === "Injection Referral") {
    $('#Doc_ref').css('display', 'none');
    $('#group-B-div').css('display', 'block');
    $('#group-B-exp').css('display', 'none');
    $('#letter_body_div').css('display', 'none');
    $('#infusion_suite_referral_div').css('display', 'none');
    $('#discs_hmc_div').css('display', 'none');
    $('#medicolegel_div').css('display', 'none');
    $('#discharge_div').css('display', 'none');
    $('#custom_div').css('display', 'none');
    $('#custom_PFT_Request_div').css('display', 'none');
    $('#custom_Note_for_Work_div').css('display', 'none');
    $('#custom_Certificate_for_Work_div').css('display', 'none');
    $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
    $('#custom_Nursing_Home_Referral_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
    $('#custom_GP_div').css('display', 'none');
    $('#custom_DEXA_Referral_div').css('display', 'none');
    $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
    $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
    $('#custom_Letter_for_Patches_div').css('display', 'none');
    $('#custom_Info_Letter_CXR_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
    $('#custom_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
  }
  else if (selected_template === "Nursing Home Referral") {
    $('#hospital-lable').css('display', 'none');
    $('#clinic-lable').css('display', 'none');
    $('#hospital').css('display', 'none');
    $('#time-div').css('display', 'none');
    $('#admission-id-div').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#group-B-div').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#infusion_suite_referral_div').css('display', 'none');
    $('#discs_hmc_div').css('display', 'none');
    $('#medicolegel_div').css('display', 'none');
    $('#discharge_div').css('display', 'none');
    $('#letter_body_div').css('display', 'none');
    $('#custom_div').css('display', 'none');
    $('#custom_PFT_Request_div').css('display', 'none');
    $('#custom_Note_for_Work_div').css('display', 'none');
    $('#custom_Certificate_for_Work_div').css('display', 'none');
    $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
    $('#custom_Nursing_Home_Referral_div').css('display', 'block');
    $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
    $('#custom_GP_div').css('display', 'none');
    $('#custom_DEXA_Referral_div').css('display', 'none');
    $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
    $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
    $('#custom_Letter_for_Patches_div').css('display', 'none');
    $('#custom_Info_Letter_CXR_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
    $('#custom_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');

  }
  else if (selected_template === "Outstanding Fee Letter") {
    $('#hospital-lable').css('display', 'none');
    $('#clinic-lable').css('display', 'none');
    $('#hospital').css('display', 'none');
    $('#time-div').css('display', 'none');
    $('#admission-id-div').css('display', 'none');
    $('#appointment-date-lable').css('display', 'none');
    $('#appointment-date-lable').text('Visit Date');
    $('#admission_date').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#group-B-div').css('display', 'none');
    $('#infusion_suite_referral_div').css('display', 'none');
    $('#discs_hmc_div').css('display', 'none');
    $('#medicolegel_div').css('display', 'none');
    $('#discharge_div').css('display', 'none');
    $('#letter_body_div').css('display', 'none');
    $('#custom_div').css('display', 'none');
    $('#custom_PFT_Request_div').css('display', 'none');
    $('#custom_Note_for_Work_div').css('display', 'none');
    $('#custom_Certificate_for_Work_div').css('display', 'none');
    $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
    $('#custom_Nursing_Home_Referral_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
    $('#custom_GP_div').css('display', 'none');
    $('#custom_DEXA_Referral_div').css('display', 'none');
    $('#custom_Outstanding_Fee_Letter_div').css('display', 'block');
    $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
    $('#custom_Letter_for_Patches_div').css('display', 'none');
    $('#custom_Info_Letter_CXR_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
    $('#custom_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');

    admission_date = $('#admission_date');
    var admission_date = admission_date.flatpickr({
      enableTime: false,
      altFormat: 'Y-m-d',
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr('step', null);
        }
      }
    });

  }
  else if (selected_template === "Release of Medical Record") {
    $('#hospital-lable').css('display', 'none');
    $('#clinic-lable').css('display', 'none');
    $('#hospital').css('display', 'none');
    $('#time-div').css('display', 'none');
    $('#admission-id-div').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#group-B-div').css('display', 'none');
    $('#infusion_suite_referral_div').css('display', 'none');
    $('#discs_hmc_div').css('display', 'none');
    $('#medicolegel_div').css('display', 'none');
    $('#discharge_div').css('display', 'none');
    $('#letter_body_div').css('display', 'none');
    $('#custom_div').css('display', 'none');
    $('#custom_PFT_Request_div').css('display', 'none');
    $('#custom_Note_for_Work_div').css('display', 'none');
    $('#custom_Certificate_for_Work_div').css('display', 'none');
    $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
    $('#custom_Nursing_Home_Referral_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
    $('#custom_GP_div').css('display', 'none');
    $('#custom_DEXA_Referral_div').css('display', 'none');
    $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
    $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
    $('#custom_Letter_for_Patches_div').css('display', 'none');
    $('#custom_Info_Letter_CXR_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
    $('#custom_Release_of_Medical_Record_div').css('display', 'block');
    $('#custom_ML_Report_Appointment_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
  }
  else if (selected_template === "Info Letter Bloods") {
    $('#hospital-lable').css('display', 'none');
    $('#clinic-lable').css('display', 'none');
    $('#hospital').css('display', 'none');
    $('#time-div').css('display', 'none');
    $('#admission-id-div').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#group-B-div').css('display', 'none');
    $('#infusion_suite_referral_div').css('display', 'none');
    $('#discs_hmc_div').css('display', 'none');
    $('#medicolegel_div').css('display', 'none');
    $('#discharge_div').css('display', 'none');
    $('#letter_body_div').css('display', 'none');
    $('#custom_div').css('display', 'none');
    $('#custom_PFT_Request_div').css('display', 'none');
    $('#custom_Note_for_Work_div').css('display', 'none');
    $('#custom_Certificate_for_Work_div').css('display', 'none');
    $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
    $('#custom_Nursing_Home_Referral_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
    $('#custom_GP_div').css('display', 'none');
    $('#custom_DEXA_Referral_div').css('display', 'none');
    $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
    $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
    $('#custom_Letter_for_Patches_div').css('display', 'none');
    $('#custom_Info_Letter_CXR_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_div').css('display', 'block');
    $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
    $('#custom_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
  }
  else if (selected_template === "Info Letter CXR") {
    $('#hospital-lable').css('display', 'none');
    $('#clinic-lable').css('display', 'none');
    $('#hospital').css('display', 'none');
    $('#time-div').css('display', 'none');
    $('#admission-id-div').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#group-B-div').css('display', 'none');
    $('#infusion_suite_referral_div').css('display', 'none');
    $('#discs_hmc_div').css('display', 'none');
    $('#medicolegel_div').css('display', 'none');
    $('#discharge_div').css('display', 'none');
    $('#letter_body_div').css('display', 'none');
    $('#custom_div').css('display', 'none');
    $('#custom_PFT_Request_div').css('display', 'none');
    $('#custom_Note_for_Work_div').css('display', 'none');
    $('#custom_Certificate_for_Work_div').css('display', 'none');
    $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
    $('#custom_Nursing_Home_Referral_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
    $('#custom_GP_div').css('display', 'none');
    $('#custom_DEXA_Referral_div').css('display', 'none');
    $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
    $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
    $('#custom_Letter_for_Patches_div').css('display', 'none');
    $('#custom_Info_Letter_CXR_div').css('display', 'block');
    $('#custom_Info_Letter_Bloods_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
    $('#custom_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
  }
  else if (selected_template === "Info Letter Bloods and CXR") {
    $('#hospital-lable').css('display', 'none');
    $('#clinic-lable').css('display', 'none');
    $('#hospital').css('display', 'none');
    $('#time-div').css('display', 'none');
    $('#admission-id-div').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#group-B-div').css('display', 'none');
    $('#infusion_suite_referral_div').css('display', 'none');
    $('#discs_hmc_div').css('display', 'none');
    $('#medicolegel_div').css('display', 'none');
    $('#discharge_div').css('display', 'none');
    $('#letter_body_div').css('display', 'none');
    $('#custom_div').css('display', 'none');
    $('#custom_PFT_Request_div').css('display', 'none');
    $('#custom_Note_for_Work_div').css('display', 'none');
    $('#custom_Certificate_for_Work_div').css('display', 'none');
    $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
    $('#custom_Nursing_Home_Referral_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
    $('#custom_GP_div').css('display', 'none');
    $('#custom_DEXA_Referral_div').css('display', 'none');
    $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
    $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
    $('#custom_Letter_for_Patches_div').css('display', 'none');
    $('#custom_Info_Letter_CXR_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'block');
    $('#custom_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
  }
  else if (selected_template === "ML Report Appointment Fee") {
    $('#hospital-lable').css('display', 'none');
    $('#clinic-lable').css('display', 'none');
    $('#hospital').css('display', 'none');
    $('#time-div').css('display', 'none');
    $('#admission-id-div').css('display', 'none');
    $('#appointment-date-lable').css('display', 'none');
    $('#admission_date').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#group-B-div').css('display', 'none');
    $('#group-B-exp').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#notes_lable').text('MRU/NF');
    $('#appointment-date-lable').text('Solicitor Letter Date');
    $('#infusion_suite_referral_div').css('display', 'none');
    $('#discs_hmc_div').css('display', 'none');
    $('#medicolegel_div').css('display', 'none');
    $('#discharge_div').css('display', 'none');
    $('#letter_body_div').css('display', 'none');
    $('#custom_div').css('display', 'none');
    $('#custom_PFT_Request_div').css('display', 'none');
    $('#custom_Note_for_Work_div').css('display', 'none');
    $('#custom_Certificate_for_Work_div').css('display', 'none');
    $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
    $('#custom_Nursing_Home_Referral_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
    $('#custom_GP_div').css('display', 'none');
    $('#custom_DEXA_Referral_div').css('display', 'none');
    $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
    $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
    $('#custom_Letter_for_Patches_div').css('display', 'none');
    $('#custom_Info_Letter_CXR_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
    $('#custom_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_Fee_div').css('display', 'block');

    admission_date = $('#admission_date');
    var admission_date = admission_date.flatpickr({
      enableTime: false,
      altFormat: 'Y-m-d',
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr('step', null);
        }
      }
    });

  }
  else if (selected_template === "ML Report Appointment") {
    $('#hospital-lable').css('display', 'none');
    $('#clinic-lable').css('display', 'none');
    $('#hospital').css('display', 'none');
    $('#time-div').css('display', 'none');
    $('#admission-id-div').css('display', 'none');
    $('#appointment-date-lable').css('display', 'none');
    $('#admission_date').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#group-B-div').css('display', 'none');
    $('#group-B-exp').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#notes_lable').text('MRU/NF');
    $('#infusion_suite_referral_div').css('display', 'none');
    $('#discs_hmc_div').css('display', 'none');
    $('#medicolegel_div').css('display', 'none');
    $('#discharge_div').css('display', 'none');
    $('#letter_body_div').css('display', 'none');
    $('#custom_div').css('display', 'none');
    $('#custom_PFT_Request_div').css('display', 'none');
    $('#custom_Note_for_Work_div').css('display', 'none');
    $('#custom_Certificate_for_Work_div').css('display', 'none');
    $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
    $('#custom_Nursing_Home_Referral_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
    $('#custom_GP_div').css('display', 'none');
    $('#custom_DEXA_Referral_div').css('display', 'none');
    $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
    $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
    $('#custom_Letter_for_Patches_div').css('display', 'none');
    $('#custom_Info_Letter_CXR_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
    $('#custom_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_div').css('display', 'block');
    $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
  }
  else if (selected_template === "ML Solicitor Letter Standby") {
    $('#hospital-lable').css('display', 'none');
    $('#clinic-lable').css('display', 'none');
    $('#hospital').css('display', 'none');
    $('#time-div').css('display', 'none');
    $('#admission-id-div').css('display', 'none');
    $('#appointment-date-lable').css('display', 'none');
    $('#admission_date').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#group-B-div').css('display', 'none');
    $('#group-B-exp').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#notes_lable').text('MRU/NF');
    $('#appointment-date-lable').text('Solicitor Letter Date');
    $('#infusion_suite_referral_div').css('display', 'none');
    $('#discs_hmc_div').css('display', 'none');
    $('#medicolegel_div').css('display', 'none');
    $('#discharge_div').css('display', 'none');
    $('#letter_body_div').css('display', 'none');
    $('#custom_div').css('display', 'none');
    $('#custom_PFT_Request_div').css('display', 'none');
    $('#custom_Note_for_Work_div').css('display', 'none');
    $('#custom_Certificate_for_Work_div').css('display', 'none');
    $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
    $('#custom_Nursing_Home_Referral_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
    $('#custom_GP_div').css('display', 'none');
    $('#custom_DEXA_Referral_div').css('display', 'none');
    $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
    $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
    $('#custom_Letter_for_Patches_div').css('display', 'none');
    $('#custom_Info_Letter_CXR_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
    $('#custom_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'block');
    $('#custom_ML_Report_Appointment_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');

    admission_date = $('#admission_date');
    var admission_date = admission_date.flatpickr({
      enableTime: false,
      altFormat: 'Y-m-d',
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr('step', null);
        }
      }
    });
  }
  else if (selected_template === "ML Release of Medical Record") {
    $('#hospital-lable').css('display', 'none');
    $('#clinic-lable').css('display', 'none');
    $('#hospital').css('display', 'none');
    $('#time-div').css('display', 'none');
    $('#admission-id-div').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#group-B-div').css('display', 'none');
    $('#group-B-exp').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#notes_lable').text('MRU');
    $('#infusion_suite_referral_div').css('display', 'none');
    $('#discs_hmc_div').css('display', 'none');
    $('#medicolegel_div').css('display', 'none');
    $('#discharge_div').css('display', 'none');
    $('#letter_body_div').css('display', 'none');
    $('#custom_div').css('display', 'none');
    $('#custom_PFT_Request_div').css('display', 'none');
    $('#custom_Note_for_Work_div').css('display', 'none');
    $('#custom_Certificate_for_Work_div').css('display', 'none');
    $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
    $('#custom_Nursing_Home_Referral_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
    $('#custom_GP_div').css('display', 'none');
    $('#custom_DEXA_Referral_div').css('display', 'none');
    $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
    $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
    $('#custom_Letter_for_Patches_div').css('display', 'none');
    $('#custom_Info_Letter_CXR_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
    $('#custom_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Release_of_Medical_Record_div').css('display', 'block');
    $('#custom_ML_Report_Appointment_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
    $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
  }
  else if (selected_template === "Infusion Referral") {
    $('#hospital-lable').css('display', 'none');
    $('#clinic-lable').css('display', 'none');
    $('#hospital').css('display', 'none');
    $('#time-div').css('display', 'none');
    $('#admission-id-div').css('display', 'none');
    $('#letter_body_div').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#group-B-div').css('display', 'none');
    $('#infusion_suite_referral_div').css('display', 'block');
    $('#discs_hmc_div').css('display', 'none');
    $('#medicolegel_div').css('display', 'none');
    $('#discharge_div').css('display', 'none');
    $('#custom_div').css('display', 'none');
    $('#custom_PFT_Request_div').css('display', 'none');
    $('#custom_Note_for_Work_div').css('display', 'none');
    $('#custom_Certificate_for_Work_div').css('display', 'none');
    $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
    $('#custom_Nursing_Home_Referral_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
    $('#custom_GP_div').css('display', 'none');
    $('#custom_DEXA_Referral_div').css('display', 'none');
    $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
    $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
    $('#custom_Letter_for_Patches_div').css('display', 'none');
    $('#custom_Info_Letter_CXR_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
    $('#custom_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
  }
  else if (selected_template === "MedicoLegal Report Letter") {
    $('#Doc_ref').css('display', 'none');
    $('#group-B-div').css('display', 'none');
    $('#infusion_suite_referral_div').css('display', 'none');
    $('#discs_hmc_div').css('display', 'none');
    $('#medicolegel_div').css('display', 'block');
    $('#letter_body_div').css('display', 'none');
    $('#discharge_div').css('display', 'none');
    $('#custom_div').css('display', 'none');
    $('#custom_PFT_Request_div').css('display', 'none');
    $('#custom_Note_for_Work_div').css('display', 'none');
    $('#custom_Certificate_for_Work_div').css('display', 'none');
    $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
    $('#custom_Nursing_Home_Referral_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
    $('#custom_GP_div').css('display', 'none');
    $('#custom_DEXA_Referral_div').css('display', 'none');
    $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
    $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
    $('#custom_Letter_for_Patches_div').css('display', 'none');
    $('#custom_Info_Letter_CXR_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
    $('#custom_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
  }
  else if (selected_template === "Discharge Letter") {
    $('#Doc_ref').css('display', 'none');
    $('#group-B-div').css('display', 'none');
    $('#infusion_suite_referral_div').css('display', 'none');
    $('#discs_hmc_div').css('display', 'none');
    $('#medicolegel_div').css('display', 'none');
    $('#discharge_div').css('display', 'block');
    $('#letter_body_div').css('display', 'none');
    $('#custom_div').css('display', 'none');
    $('#custom_PFT_Request_div').css('display', 'none');
    $('#custom_Note_for_Work_div').css('display', 'none');
    $('#custom_Certificate_for_Work_div').css('display', 'none');
    $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
    $('#custom_Nursing_Home_Referral_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
    $('#custom_GP_div').css('display', 'none');
    $('#custom_DEXA_Referral_div').css('display', 'none');
    $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
    $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
    $('#custom_Letter_for_Patches_div').css('display', 'none');
    $('#custom_Info_Letter_CXR_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
    $('#custom_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
  }
  else if (selected_template === "Request for Discs HMC") {
    $('#hospital-lable').css('display', 'none');
    $('#clinic-lable').css('display', 'none');
    $('#hospital').css('display', 'none');
    $('#time-div').css('display', 'none');
    $('#admission-id-div').css('display', 'none');
    $('#letter_body_div').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#group-B-div').css('display', 'none');
    $('#infusion_suite_referral_div').css('display', 'none');
    $('#discs_hmc_div').css('display', 'block');
    $('#medicolegel_div').css('display', 'none');
    $('#discharge_div').css('display', 'none');
    $('#custom_div').css('display', 'none');
    $('#custom_PFT_Request_div').css('display', 'none');
    $('#custom_Note_for_Work_div').css('display', 'none');
    $('#custom_Certificate_for_Work_div').css('display', 'none');
    $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
    $('#custom_Nursing_Home_Referral_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
    $('#custom_GP_div').css('display', 'none');
    $('#custom_DEXA_Referral_div').css('display', 'none');
    $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
    $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
    $('#custom_Letter_for_Patches_div').css('display', 'none');
    $('#custom_Info_Letter_CXR_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
    $('#custom_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
  }
  else if (selected_template === "Custom Template") {
    // console.log("Custom Template");
    $('#hospital-lable').css('display', 'none');
    $('#clinic-lable').css('display', 'none');
    $('#hospital').css('display', 'none');
    $('#time-div').css('display', 'none');
    $('#admission-id-div').css('display', 'none');
    $('#letter_body_div').css('display', 'none');
    $('#Doc_ref').css('display', 'none');
    $('#group-B-div').css('display', 'none');
    $('#infusion_suite_referral_div').css('display', 'none');
    $('#discs_hmc_div').css('display', 'none');
    $('#medicolegel_div').css('display', 'none');
    $('#discharge_div').css('display', 'none');
    $('#custom_div').css('display', 'block');
    $('#custom_PFT_Request_div').css('display', 'none');
    $('#custom_Note_for_Work_div').css('display', 'none');
    $('#custom_Certificate_for_Work_div').css('display', 'none');
    $('#custom_Convalescence_Letter_for_Insurance').css('display', 'none');
    $('#custom_Nursing_Home_Referral_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Patient_div').css('display', 'none');
    $('#custom_Blood_for_ST_James_Institute_div').css('display', 'none');
    $('#custom_GP_div').css('display', 'none');
    $('#custom_DEXA_Referral_div').css('display', 'none');
    $('#custom_Outstanding_Fee_Letter_div').css('display', 'none');
    $('#custom_Letter_for_DNA_Cancellation_div').css('display', 'none');
    $('#custom_Letter_for_Patches_div').css('display', 'none');
    $('#custom_Info_Letter_CXR_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_div').css('display', 'none');
    $('#custom_Info_Letter_Bloods_and_CXR_div').css('display', 'none');
    $('#custom_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Release_of_Medical_Record_div').css('display', 'none');
    $('#custom_ML_Solicitor_Letter_Standby_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_div').css('display', 'none');
    $('#custom_ML_Report_Appointment_Fee_div').css('display', 'none');
  }
  else {
    // console.log("Sorry");
  }

});



window.onload = function () {
  setTimeout(function () {
    var letterTypeSelect = document.getElementById('letter_type');
    var event = new Event('change');
    letterTypeSelect.dispatchEvent(event);
  }, 500);
};


$(document).ready(function () {

//   function getQueryParam(param) {
//     let urlParams = new URLSearchParams(window.location.search);
//     return urlParams.get(param);
// }

// let redirectionUrl = getQueryParam('redirectionUrl');
// console.log('Redirection URL:', redirectionUrl);

  $('#summernote').summernote({
    placeholder: 'Here is Custom Letter, Design as you need..!',
    tabsize: 2,
    height: 400,
    lineHeights: ['0.5', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.8', '0.9', '1.0', '1.2', '1.4', '1.5', '2.0', '3.0'],
    fontNames: ['Times New Roman', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
    fontNamesIgnoreCheck: ['Times New Roman'],
    fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '32', '36', '48', '64', '82', '150'],
    // lineHeights: ['0.5', '1.0', '1.5', '2.0', '2.5', '3.0'],
    // fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'clear', 'strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize', 'fontsizeunit', 'fontname', 'color', 'height']],
      // ['height', ['height']],
      // ['fontname', ['fontname']],
      // ['color', ['color', 'hr']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['hr', 'undo', 'redo']],
      // ['table', ['table']],
      // ['insert', ['link', 'picture', 'video']],
      ['view', ['fullscreen', 'codeview', 'help']],
      // ['misc', ['undo', 'redo']]
    ],
    callbacks: {
      onInit: function () {
        // Apply custom CSS class to editor
        $('#summernote').find('.note-editable').addClass('calibri');
      }
    }
  });
  $('#summernote').summernote('editor.pasteHTML', '<p style="font-family: \'Times New Roman\';"></p>');


  $('#summernote_GP').summernote({
    placeholder: 'Here is Custom Letter, Design as you need..!',
    tabsize: 2,
    height: 400,
    lineHeights: ['0.5', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.8', '0.9', '1.0', '1.2', '1.4', '1.5', '2.0', '3.0'],
    fontNames: ['Times New Roman', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
    fontNamesIgnoreCheck: ['Times New Roman'],
    fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '32', '36', '48', '64', '82', '150'],
    // lineHeights: ['0.5', '1.0', '1.5', '2.0', '2.5', '3.0'],
    // fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'clear', 'strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize', 'fontsizeunit', 'fontname', 'color', 'height']],
      // ['height', ['height']],
      // ['fontname', ['fontname']],
      // ['color', ['color', 'hr']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['hr', 'undo', 'redo']],
      // ['table', ['table']],
      // ['insert', ['link', 'picture', 'video']],
      ['view', ['fullscreen', 'codeview', 'help']],
      // ['misc', ['undo', 'redo']]
    ],
    callbacks: {
      onInit: function () {
        // Apply custom CSS class to editor
        $('#summernote_GP').find('.note-editable').addClass('calibri');
      }
    }
  });
  $('#summernote_GP').summernote('editor.pasteHTML', '<p style="font-family: \'Times New Roman\';"></p>');


  $('#summernote_PFT_Request').summernote({
    placeholder: 'Here is Custom Letter, Design as you need..!',
    tabsize: 2,
    height: 400,
    lineHeights: ['0.5', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.8', '0.9', '1.0', '1.2', '1.4', '1.5', '2.0', '3.0'],
    fontNames: ['Times New Roman', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
    fontNamesIgnoreCheck: ['Times New Roman'],
    fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '32', '36', '48', '64', '82', '150'],
    // lineHeights: ['0.5', '1.0', '1.5', '2.0', '2.5', '3.0'],
    // fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'clear', 'strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize', 'fontsizeunit', 'fontname', 'color', 'height']],
      // ['height', ['height']],
      // ['fontname', ['fontname']],
      // ['color', ['color', 'hr']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['hr', 'undo', 'redo']],
      // ['table', ['table']],
      // ['insert', ['link', 'picture', 'video']],
      ['view', ['fullscreen', 'codeview', 'help']],
      // ['misc', ['undo', 'redo']]
    ],
    callbacks: {
      onInit: function () {
        // Apply custom CSS class to editor
        $('#summernote_PFT_Request').find('.note-editable').addClass('calibri');
      }
    }
  });
  $('#summernote_PFT_Request').summernote('editor.pasteHTML', '<p style="font-family: \'Times New Roman\';"></p>');


  $('#summernote_Note_for_Work').summernote({
    placeholder: 'Here is Custom Letter, Design as you need..!',
    tabsize: 2,
    height: 400,
    lineHeights: ['0.5', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.8', '0.9', '1.0', '1.2', '1.4', '1.5', '2.0', '3.0'],
    fontNames: ['Times New Roman', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
    fontNamesIgnoreCheck: ['Times New Roman'],
    fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '32', '36', '48', '64', '82', '150'],
    // lineHeights: ['0.5', '1.0', '1.5', '2.0', '2.5', '3.0'],
    // fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'clear', 'strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize', 'fontsizeunit', 'fontname', 'color', 'height']],
      // ['height', ['height']],
      // ['fontname', ['fontname']],
      // ['color', ['color', 'hr']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['hr', 'undo', 'redo']],
      // ['table', ['table']],
      // ['insert', ['link', 'picture', 'video']],
      ['view', ['fullscreen', 'codeview', 'help']],
      // ['misc', ['undo', 'redo']]
    ],
    callbacks: {
      onInit: function () {
        // Apply custom CSS class to editor
        $('#summernote_Note_for_Work').find('.note-editable').addClass('calibri');
      }
    }
  });
  $('#summernote_Note_for_Work').summernote('editor.pasteHTML', '<p style="font-family: \'Times New Roman\';"></p>');


  $('#summernote_Certificate_for_Work_div').summernote({
    placeholder: 'Here is Custom Letter, Design as you need..!',
    tabsize: 2,
    height: 400,
    lineHeights: ['0.5', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.8', '0.9', '1.0', '1.2', '1.4', '1.5', '2.0', '3.0'],
    fontNames: ['Times New Roman', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
    fontNamesIgnoreCheck: ['Times New Roman'],
    fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '32', '36', '48', '64', '82', '150'],

    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'clear', 'strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize', 'fontsizeunit', 'fontname', 'color', 'height']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['hr', 'undo', 'redo']],
      // ['table', ['table']],
      ['view', ['fullscreen', 'codeview', 'help']],
    ],
    callbacks: {
      onInit: function () {
        $('#summernote_Certificate_for_Work_div').find('.note-editable').addClass('calibri');
      }
    }
  });
  $('#summernote_Certificate_for_Work_div').summernote('editor.pasteHTML', '<p style="font-family: \'Times New Roman\';"></p>');


  $('#summernote_Convalescence_Letter_for_Insurance').summernote({
    placeholder: 'Here is Custom Letter, Design as you need..!',
    tabsize: 2,
    height: 400,
    lineHeights: ['0.5', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.8', '0.9', '1.0', '1.2', '1.4', '1.5', '2.0', '3.0'],
    fontNames: ['Times New Roman', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
    fontNamesIgnoreCheck: ['Times New Roman'],
    fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '32', '36', '48', '64', '82', '150'],

    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'clear', 'strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize', 'fontsizeunit', 'fontname', 'color', 'height']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['hr', 'undo', 'redo']],
      // ['table', ['table']],
      ['view', ['fullscreen', 'codeview', 'help']],
    ],
    callbacks: {
      onInit: function () {
        $('#summernote_Convalescence_Letter_for_Insurance').find('.note-editable').addClass('calibri');
      }
    }
  });
  $('#summernote_Convalescence_Letter_for_Insurance').summernote('editor.pasteHTML', '<p style="font-family: \'Times New Roman\';"></p>');

  $('#summernote_Nursing_Home_Referral').summernote({
    placeholder: 'Here is Custom Letter, Design as you need..!',
    tabsize: 2,
    height: 400,
    lineHeights: ['0.5', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.8', '0.9', '1.0', '1.2', '1.4', '1.5', '2.0', '3.0'],
    fontNames: ['Times New Roman', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
    fontNamesIgnoreCheck: ['Times New Roman'],
    fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '32', '36', '48', '64', '82', '150'],

    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'clear', 'strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize', 'fontsizeunit', 'fontname', 'color', 'height']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['hr', 'undo', 'redo']],
      // ['table', ['table']],
      ['view', ['fullscreen', 'codeview', 'help']],
    ],
    callbacks: {
      onInit: function () {
        $('#summernote_Nursing_Home_Referral').find('.note-editable').addClass('calibri');
      }
    }
  });
  $('#summernote_Nursing_Home_Referral').summernote('editor.pasteHTML', '<p style="font-family: \'Times New Roman\';"></p>');


  $('#summernote_Blood_for_ST_James_Patient').summernote({
    placeholder: 'Here is Custom Letter, Design as you need..!',
    tabsize: 2,
    height: 400,
    lineHeights: ['0.5', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.8', '0.9', '1.0', '1.2', '1.4', '1.5', '2.0', '3.0'],
    fontNames: ['Times New Roman', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
    fontNamesIgnoreCheck: ['Times New Roman'],
    fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '32', '36', '48', '64', '82', '150'],

    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'clear', 'strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize', 'fontsizeunit', 'fontname', 'color', 'height']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['hr', 'undo', 'redo']],
      // ['table', ['table']],
      ['view', ['fullscreen', 'codeview', 'help']],
    ],
    callbacks: {
      onInit: function () {
        $('#summernote_Blood_for_ST_James_Patient').find('.note-editable').addClass('calibri');
      }
    }
  });
  $('#summernote_Blood_for_ST_James_Patient').summernote('editor.pasteHTML', '<p style="font-family: \'Times New Roman\';"></p>');

  $('#summernote_Blood_for_ST_James_Institute').summernote({
    placeholder: 'Here is Custom Letter, Design as you need..!',
    tabsize: 2,
    height: 400,
    lineHeights: ['0.5', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.8', '0.9', '1.0', '1.2', '1.4', '1.5', '2.0', '3.0'],
    fontNames: ['Times New Roman', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
    fontNamesIgnoreCheck: ['Times New Roman'],
    fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '32', '36', '48', '64', '82', '150'],

    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'clear', 'strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize', 'fontsizeunit', 'fontname', 'color', 'height']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['hr', 'undo', 'redo']],
      // ['table', ['table']],
      ['view', ['fullscreen', 'codeview', 'help']],
    ],
    callbacks: {
      onInit: function () {
        $('#summernote_Blood_for_ST_James_Institute').find('.note-editable').addClass('calibri');
      }
    }
  });
  $('#summernote_Blood_for_ST_James_Institute').summernote('editor.pasteHTML', '<p style="font-family: \'Times New Roman\';"></p>');

  $('#summernote_DEXA_Referral').summernote({
    placeholder: 'Here is Custom Letter, Design as you need..!',
    tabsize: 2,
    height: 400,
    lineHeights: ['0.5', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.8', '0.9', '1.0', '1.2', '1.4', '1.5', '2.0', '3.0'],
    fontNames: ['Times New Roman', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
    fontNamesIgnoreCheck: ['Times New Roman'],
    fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '32', '36', '48', '64', '82', '150'],

    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'clear', 'strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize', 'fontsizeunit', 'fontname', 'color', 'height']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['hr', 'undo', 'redo']],
      // ['table', ['table']],
      ['view', ['fullscreen', 'codeview', 'help']],
    ],
    callbacks: {
      onInit: function () {
        $('#summernote_DEXA_Referral').find('.note-editable').addClass('calibri');
      }
    }
  });
  $('#summernote_DEXA_Referral').summernote('editor.pasteHTML', '<p style="font-family: \'Times New Roman\';"></p>');

  $('#summernote_Outstanding_Fee_Letter').summernote({
    placeholder: 'Here is Custom Letter, Design as you need..!',
    tabsize: 2,
    height: 400,
    lineHeights: ['0.5', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.8', '0.9', '1.0', '1.2', '1.4', '1.5', '2.0', '3.0'],
    fontNames: ['Times New Roman', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
    fontNamesIgnoreCheck: ['Times New Roman'],
    fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '32', '36', '48', '64', '82', '150'],

    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'clear', 'strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize', 'fontsizeunit', 'fontname', 'color', 'height']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['hr', 'undo', 'redo']],
      // ['table', ['table']],
      ['view', ['fullscreen', 'codeview', 'help']],
    ],
    callbacks: {
      onInit: function () {
        $('#summernote_Outstanding_Fee_Letter').find('.note-editable').addClass('calibri');
      }
    }
  });
  $('#summernote_Outstanding_Fee_Letter').summernote('editor.pasteHTML', '<p style="font-family: \'Times New Roman\';"></p>');

  $('#summernote_Letter_for_DNA_Cancellation').summernote({
    placeholder: 'Here is Custom Letter, Design as you need..!',
    tabsize: 2,
    height: 400,
    lineHeights: ['0.5', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.8', '0.9', '1.0', '1.2', '1.4', '1.5', '2.0', '3.0'],
    fontNames: ['Times New Roman', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
    fontNamesIgnoreCheck: ['Times New Roman'],
    fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '32', '36', '48', '64', '82', '150'],

    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'clear', 'strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize', 'fontsizeunit', 'fontname', 'color', 'height']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['hr', 'undo', 'redo']],
      // ['table', ['table']],
      ['view', ['fullscreen', 'codeview', 'help']],
    ],
    callbacks: {
      onInit: function () {
        $('#summernote_Letter_for_DNA_Cancellation').find('.note-editable').addClass('calibri');
      }
    }
  });
  $('#summernote_Letter_for_DNA_Cancellation').summernote('editor.pasteHTML', '<p style="font-family: \'Times New Roman\';"></p>');

  $('#summernote_Letter_for_Patches').summernote({
    placeholder: 'Here is Custom Letter, Design as you need..!',
    tabsize: 2,
    height: 400,
    lineHeights: ['0.5', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.8', '0.9', '1.0', '1.2', '1.4', '1.5', '2.0', '3.0'],
    fontNames: ['Times New Roman', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
    fontNamesIgnoreCheck: ['Times New Roman'],
    fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '32', '36', '48', '64', '82', '150'],

    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'clear', 'strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize', 'fontsizeunit', 'fontname', 'color', 'height']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['hr', 'undo', 'redo']],
      // ['table', ['table']],
      ['view', ['fullscreen', 'codeview', 'help']],
    ],
    callbacks: {
      onInit: function () {
        $('#summernote_Letter_for_Patches').find('.note-editable').addClass('calibri');
      }
    }
  });
  $('#summernote_Letter_for_Patches').summernote('editor.pasteHTML', '<p style="font-family: \'Times New Roman\';"></p>');

  $('#summernote_Info_Letter_CXR').summernote({
    placeholder: 'Here is Custom Letter, Design as you need..!',
    tabsize: 2,
    height: 400,
    lineHeights: ['0.5', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.8', '0.9', '1.0', '1.2', '1.4', '1.5', '2.0', '3.0'],
    fontNames: ['Times New Roman', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
    fontNamesIgnoreCheck: ['Times New Roman'],
    fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '32', '36', '48', '64', '82', '150'],

    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'clear', 'strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize', 'fontsizeunit', 'fontname', 'color', 'height']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['hr', 'undo', 'redo']],
      // ['table', ['table']],
      ['view', ['fullscreen', 'codeview', 'help']],
    ],
    callbacks: {
      onInit: function () {
        $('#summernote_Info_Letter_CXR').find('.note-editable').addClass('calibri');
      }
    }
  });
  $('#summernote_Info_Letter_CXR').summernote('editor.pasteHTML', '<p style="font-family: \'Times New Roman\';"></p>');

  $('#summernote_Info_Letter_Bloods').summernote({
    placeholder: 'Here is Custom Letter, Design as you need..!',
    tabsize: 2,
    height: 400,
    lineHeights: ['0.5', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.8', '0.9', '1.0', '1.2', '1.4', '1.5', '2.0', '3.0'],
    fontNames: ['Times New Roman', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
    fontNamesIgnoreCheck: ['Times New Roman'],
    fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '32', '36', '48', '64', '82', '150'],

    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'clear', 'strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize', 'fontsizeunit', 'fontname', 'color', 'height']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['hr', 'undo', 'redo']],
      // ['table', ['table']],
      ['view', ['fullscreen', 'codeview', 'help']],
    ],
    callbacks: {
      onInit: function () {
        $('#summernote_Info_Letter_Bloods').find('.note-editable').addClass('calibri');
      }
    }
  });
  $('#summernote_Info_Letter_Bloods').summernote('editor.pasteHTML', '<p style="font-family: \'Times New Roman\';"></p>');

  $('#summernote_Info_Letter_Bloods_and_CXR').summernote({
    placeholder: 'Here is Custom Letter, Design as you need..!',
    tabsize: 2,
    height: 400,
    lineHeights: ['0.5', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.8', '0.9', '1.0', '1.2', '1.4', '1.5', '2.0', '3.0'],
    fontNames: ['Times New Roman', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
    fontNamesIgnoreCheck: ['Times New Roman'],
    fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '32', '36', '48', '64', '82', '150'],

    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'clear', 'strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize', 'fontsizeunit', 'fontname', 'color', 'height']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['hr', 'undo', 'redo']],
      // ['table', ['table']],
      ['view', ['fullscreen', 'codeview', 'help']],
    ],
    callbacks: {
      onInit: function () {
        $('#summernote_Info_Letter_Bloods_and_CXR').find('.note-editable').addClass('calibri');
      }
    }
  });
  $('#summernote_Info_Letter_Bloods_and_CXR').summernote('editor.pasteHTML', '<p style="font-family: \'Times New Roman\';"></p>');


  $('#summernote_Release_of_Medical_Record').summernote({
    placeholder: 'Here is Custom Letter, Design as you need..!',
    tabsize: 2,
    height: 400,
    lineHeights: ['0.5', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.8', '0.9', '1.0', '1.2', '1.4', '1.5', '2.0', '3.0'],
    fontNames: ['Times New Roman', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
    fontNamesIgnoreCheck: ['Times New Roman'],
    fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '32', '36', '48', '64', '82', '150'],

    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'clear', 'strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize', 'fontsizeunit', 'fontname', 'color', 'height']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['hr', 'undo', 'redo']],
      // ['table', ['table']],
      ['view', ['fullscreen', 'codeview', 'help']],
    ],
    callbacks: {
      onInit: function () {
        $('#summernote_Release_of_Medical_Record').find('.note-editable').addClass('calibri');
      }
    }
  });
  $('#summernote_Release_of_Medical_Record').summernote('editor.pasteHTML', '<p style="font-family: \'Times New Roman\';"></p>');


  $('#summernote_ML_Release_of_Medical_Record').summernote({
    placeholder: 'Here is Custom Letter, Design as you need..!',
    tabsize: 2,
    height: 400,
    lineHeights: ['0.5', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.8', '0.9', '1.0', '1.2', '1.4', '1.5', '2.0', '3.0'],
    fontNames: ['Times New Roman', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
    fontNamesIgnoreCheck: ['Times New Roman'],
    fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '32', '36', '48', '64', '82', '150'],

    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'clear', 'strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize', 'fontsizeunit', 'fontname', 'color', 'height']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['hr', 'undo', 'redo']],
      // ['table', ['table']],
      ['view', ['fullscreen', 'codeview', 'help']],
    ],
    callbacks: {
      onInit: function () {
        $('#summernote_ML_Release_of_Medical_Record').find('.note-editable').addClass('calibri');
      }
    }
  });
  $('#summernote_ML_Release_of_Medical_Record').summernote('editor.pasteHTML', '<p style="font-family: \'Times New Roman\';"></p>');

  $('#summernote_ML_Solicitor_Letter_Standby').summernote({
    placeholder: 'Here is Custom Letter, Design as you need..!',
    tabsize: 2,
    height: 400,
    lineHeights: ['0.5', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.8', '0.9', '1.0', '1.2', '1.4', '1.5', '2.0', '3.0'],
    fontNames: ['Times New Roman', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
    fontNamesIgnoreCheck: ['Times New Roman'],
    fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '32', '36', '48', '64', '82', '150'],

    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'clear', 'strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize', 'fontsizeunit', 'fontname', 'color', 'height']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['hr', 'undo', 'redo']],
      // ['table', ['table']],
      ['view', ['fullscreen', 'codeview', 'help']],
    ],
    callbacks: {
      onInit: function () {
        $('#summernote_ML_Solicitor_Letter_Standby').find('.note-editable').addClass('calibri');
      }
    }
  });
  $('#summernote_ML_Solicitor_Letter_Standby').summernote('editor.pasteHTML', '<p style="font-family: \'Times New Roman\';"></p>');

  $('#summernote_ML_Report_Appointment').summernote({
    placeholder: 'Here is Custom Letter, Design as you need..!',
    tabsize: 2,
    height: 400,
    lineHeights: ['0.5', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.8', '0.9', '1.0', '1.2', '1.4', '1.5', '2.0', '3.0'],
    fontNames: ['Times New Roman', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
    fontNamesIgnoreCheck: ['Times New Roman'],
    fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '32', '36', '48', '64', '82', '150'],

    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'clear', 'strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize', 'fontsizeunit', 'fontname', 'color', 'height']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['hr', 'undo', 'redo']],
      // ['table', ['table']],
      ['view', ['fullscreen', 'codeview', 'help']],
    ],
    callbacks: {
      onInit: function () {
        $('#summernote_ML_Report_Appointment').find('.note-editable').addClass('calibri');
      }
    }
  });
  $('#summernote_ML_Report_Appointment').summernote('editor.pasteHTML', '<p style="font-family: \'Times New Roman\';"></p>');


  $('#summernote_ML_Report_Appointment_Fee').summernote({
    placeholder: 'Here is Custom Letter, Design as you need..!',
    tabsize: 2,
    height: 400,
    lineHeights: ['0.5', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.8', '0.9', '1.0', '1.2', '1.4', '1.5', '2.0', '3.0'],
    fontNames: ['Times New Roman', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
    fontNamesIgnoreCheck: ['Times New Roman'],
    fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '32', '36', '48', '64', '82', '150'],

    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'clear', 'strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize', 'fontsizeunit', 'fontname', 'color', 'height']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['hr', 'undo', 'redo']],
      // ['table', ['table']],
      ['view', ['fullscreen', 'codeview', 'help']],
    ],
    callbacks: {
      onInit: function () {
        $('#summernote_ML_Report_Appointment_Fee').find('.note-editable').addClass('calibri');
      }
    }
  });
  $('#summernote_ML_Report_Appointment_Fee').summernote('editor.pasteHTML', '<p style="font-family: \'Times New Roman\';"></p>');




  $('#weight, #allergies, #diagnosis, #medical, #medication, #treatment, #dosage, #frequency, #pre_medication').keypress(function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  });


  $('#person_requesting_checks_div input[type="checkbox"]').on('change', function () {
    $('#person_requesting_checks_div input[type="checkbox"]').not(this).prop('checked', false);
  });

  $('#type_div input[type="checkbox"]').on('change', function () {
    $('#type_div input[type="checkbox"]').not(this).prop('checked', false);
  });

  $('#pre_treatment_checks_div input[type="checkbox"]').on('change', function () {
    $('#pre_treatment_checks_div input[type="checkbox"]').not(this).prop('checked', false);
  });

  $('#commencement_date_checks_div input[type="checkbox"]').on('change', function () {
    $('#commencement_date_checks_div input[type="checkbox"]').not(this).prop('checked', false);
  });

    

});



