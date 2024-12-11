/*=========================================================================================
  File Name: create.js
  Description: jquery bootstrap validation js
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: PIXINVENT
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

$(function () {
    'use strict';


  
    var jqForm = $('#dataForm');
    // $('.select2').select2();  
    // select2 initialization
    var existingDate=$('#date').val();
    var humanFriendlyPickr = $('.flatpickr-human-friendly');

    if (humanFriendlyPickr.length) {
        humanFriendlyPickr.flatpickr({
            altInput: false,
            altFormat: 'F j, Y',
            dateFormat: 'd-m-Y',
            allowInput: true,
            defaultDate: existingDate ? existingDate : 'today'
        });
    }
  
    // jQuery Validation
    if (jqForm.length) {
      jqForm.validate({
        rules: {
          'description': {
            required: true
          },
          'form_type': {
            required: true
          },
          'form_template': {
            required: true
          },
          'date': {
            required: true
          },
          validationCheck: {
            required: true
          }
        },
        submitHandler: function (form) {
          var formData = $(form).serialize(); // Get the form data
          var PatientId = $('#patient_id').val(); // Get the doctor type ID (if exists)
          var formId = $('#form_id').val(); 
          var formtypeId = $('#form_template option:selected').val();
          var formTypeName = $('#form_template option:selected').text();

          
  
          // Determine the URL based on whether it's an update or create operation
          var url = (PatientId && formId) 
          ? '/private-clinic/patient/forms/update/' + PatientId + '/' + formId
          : '/private-clinic/patient/forms/temp/' + PatientId;
      
          var method = formId ? 'PUT' : 'POST'; // Use PUT for update, POST for create
  
          var baseurl = window.location.origin;
          $.ajax({
            url: url,
            method: method,
            data: formData,
            headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function (response) {
              // Handle the success response
              if (response.status == 'success') {
                var form_id =response.result.id;
                window.location.href = baseurl +'/private-clinic/patient/forms/create-form-template/' + form_id;
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
              console.error(error);
              Swal.fire({
                title: error.status,
                text: error.message,
                icon: error.status,
                confirmButtonText: 'OK'
              });
  
            }
          });
  
          return false; // Prevent the form from being submitted
        }
      });
    }
  });

  var formTypeSelect            = document.getElementById('form_type');
  var formTemplateSelect        = document.getElementById('form_template');


  formTypeSelect.addEventListener('change', function() {
    // Get the selected value
   // var selectedValue = letterTypeSelect.value;
    var selectedValuetext = $('#form_type option:selected').text();
    //console.log(selectedValuetext);
    // Make an AJAX request to the controller URL
    var url = '/private-clinic/patient/forms/form-type/' + selectedValuetext;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        // Handle the success response
        //var response = xhr.responseText;
        
        var response = JSON.parse(xhr.responseText);

        type = response.type;
        var templates = response.templates;
        template_body = templates;
       
        var templateSelect = $('#form_template');
        templateSelect.empty();
        templateSelect.append($('<option>', {
          value: '',
          text: 'Select Template'
      }));

      templates.forEach(function(template) {
        var option = $('<option>', {
          value: template.id, 
          text: template.name 
      });
        templateSelect.append($('<option>', {
            value: template.id, 
            text: template.name 
        }));

        select_template = $('#selected_template_id').val();
        if (template.id == select_template) {
          option.prop('selected', true);
          templateSelect.append(option);
      }

      

      });

        if(type === "Admission Letter")
        {
           
        }
        else if (type === "Appointment Letter")
        { 
          
        }
        else if(type === "Select Letter Type")
        {
           
        }
        else{ //custom letter

          selected_template = $("#form_template option:selected").text();

   
            if(selected_template === "PFT Request Template")
              {
                
              } 
              else{
                //console.log("Sorry");
              }


        }

    }
    };
    xhr.send();
});


formTemplateSelect.addEventListener('change', function() {

  var selectedValuetext = $('#form_template option:selected').text();

  if(selectedValuetext === "Hermitage Clinic Booking Form")
  {
    
  }

});

