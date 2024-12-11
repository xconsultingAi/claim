/*=========================================================================================
  File Name: create.js
  Description: Auth register js file.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: PIXINVENT
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
var patient_id = $('#patient_id').val();

$(document).ready(function () {

  var assetPath = '../../../app-assets/',
    userView = 'app-user-view-account.html';


  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
    userView = assetPath + 'app/user/view/account';
  }

  var form = $('#account_form');

  if (form.length) {
    form.validate({
      rules: {
        'account_name': {
          required: true
        },
        validationCheck: {
          required: true
        }
      },
      submitHandler: function (form) {
        var formData = $(form).serialize();
        var patient_id = $('#patient_id').val();
        var account_id = null;
        var route = 'private-clinic/patient/patient-accounts/add-chart-of-account/';
        var url = assetPath + route;
        var method = 'POST';

        if (patient_id && account_id) {
          method = 'PUT';
          url += 'update/' + patient_id + '/' + account_id;
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
            console.log("AJAX Success:", response);
            var swalConfig = {
              title: response.status,
              text: response.message,
              icon: response.status,
              confirmButtonText: 'OK'
            };
            if (response.status == 'success') {
              Swal.fire(swalConfig).then(function (result) {
                window.location.href = assetPath + route + 'get/' + patient_id;
              });
            } else {
              Swal.fire(swalConfig);
            }
          },
          error: function (xhr, status, error) {
            console.error("AJAX Error:", error);
            Swal.fire({
              title: error.status,
              text: error.statusText,
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        });

        return false; // Prevent the form from submitting normally
      }
    });
  }
});


$(document).ready(function () {


  $('#main_account').select2({
    placeholder: 'Select Account',
    closeOnSelect: true,
    escapeMarkup: function (es) {
      return es;
    }
  });

  $('#control_account').select2({
    placeholder: 'Select Account',
    closeOnSelect: true,
    escapeMarkup: function (es) {
      return es;
    }
  });

  $('#btn_sub_account').on('click', function () {
    $('#control_account_div').show();

    $('#sub_account_div').hide();
    $('#account_code_div').hide();
    $('#account_type').val("sub_account");
    $('#sub_account, #account_code').removeAttr('required');
    $('#account_name').attr('required', true);

  });

  $('#btn_account').on('click', function () {
    $('#sub_account_div').show();
    $('#account_code_div').show();
    $('#account_type').val("account");
    $('#account_name, #account_code').attr('required', true);
  });

  $('#btn_main_account').on('click', function () {
    $('#account_type').val("main_account");
    $('#sub_account_div').hide();
    $('#account_code_div').hide();
    $('#control_account_div').hide();
    $('#sub_account, #account_code').removeAttr('required');
    $('#account_name').attr('required', true);
  });

  $('#btn_control_account').on('click', function () {
    $('#sub_account_div').hide();
    $('#account_code_div').hide();
    $('#control_account_div').hide();
    $('#account_type').val("control_account");
    $('#sub_account, #account_code').removeAttr('required');
    $('#account_name').attr('required', true);
  });


  $('#tools-btn').click(function () {
    $('#tools-dropdown').toggle();
  });






  $('#search').on('keyup', function () {
    var searchTerm = $(this).val();
    $('#tree').jstree('search', searchTerm);
  });

  // Error handling
  $('#tree').on('error.jstree', function (e, error) {
    console.error(error);
    alert('An error occurred: ' + error.message);
  });


  $('#search').on('keyup', function () {
    var searchTerm = $(this).val();
    $('#tree').jstree('search', searchTerm);
  });


});

