/*=========================================================================================
  File Name: create.js
  Description: Auth register js file.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: PIXINVENT
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

$(function () {
    ('use strict');
    var assetPath = '../../../app-assets/',
        userView = 'app-user-view-account.html';
    var baseurl = window.location.origin;
    var form = $('#dataForm');
    var bank_id = $('#bank_id').val();

    if (form.length) {
        form.validate({
            rules: {
                'bank_name': {
                    required: true
                }
            },

            submitHandler: function (form) {
                var formData = $(form).serialize(); 
                var route = '/private-clinic/bank-details/';
                var url = baseurl + route;
                var method = 'POST';

                var clickedButtonId = $(form).find(':submit:focus').attr('id');
                if (clickedButtonId === 'btn_save') {
                    url = url + 'store';
                } 
                else if (clickedButtonId === 'btn_update') {
                    method = 'PUT';
                    url = url + 'update' + '/' + bank_id; 
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
                            Swal.fire(swalConfig).then(function (result) {
                                 
                            window.location.href = '/private-clinic/bank-details/';
                                    
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

                return false; // Prevent the form from being submitted
            }
        });
    }

});

$(document).ready(function () {

    
  
//test

  
});


