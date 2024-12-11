/*=========================================================================================
  File Name: add-doctor-type.js
  Description: jquery bootstrap validation js
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: PIXINVENT
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

$(function () {
  'use strict';

  var jqForm = $('#jquery-val-form'),
      select = $('.select2');

  // select2 initialization
  select.each(function () {
    var $this = $(this);
    $this.wrap('<div class="position-relative"></div>');
    $this.select2({
      placeholder: 'Select value',
      dropdownParent: $this.parent()
    }).change(function () {
      $(this).valid();
    });
  });

  // jQuery Validation
  if (jqForm.length) {
    jqForm.validate({
      rules: {
        'name': {
          required: true
        },
        'branch_id': {
          required: true
        },
        'status': {
          required: true
        },
        validationCheck: {
          required: true
        }
      },
      submitHandler: function (form) {
        var formData = $(form).serialize(); // Get the form data

        var doctorTypeId = $('#doctorTypeId').val(); // Get the doctor type ID (if exists)

        // Determine the URL based on whether it's an update or create operation
        var url = doctorTypeId ? '/type/doctor/' + doctorTypeId : '/type/doctor';
        var method = doctorTypeId ? 'PUT' : 'POST'; // Use PUT for update, POST for create

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
              Swal.fire({
                title: response.status,
                text: response.message,
                icon: response.status,
                confirmButtonText: 'OK'
              }).then(function (result) {
                window.location.href = baseurl + '/type/doctor';
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