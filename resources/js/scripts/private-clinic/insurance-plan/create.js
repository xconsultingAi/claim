/*=========================================================================================
  File Name: add-doctor-type.js
  Description: jquery bootstrap validation js
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: PIXINVENT
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

$(document).ready(function () {
    'use strict';

    var jqForm = $('#jquery-plan-form'),
    select = $('.select2');
    var pageIdentifier = $('#insurance-plan').data('page');

    
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
                'insurance_company_id': {
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
                var formData = $(form).serialize();
                var insuranceId = $('#insuranceId').val();

                var url = insuranceId ? '/private-clinic/insurance-plan/' + insuranceId : '/private-clinic/insurance-plan/store';
                var method = insuranceId ? 'PUT' : 'POST';
                var baseurl = window.location.origin;
                $.ajax({
                    url: url,
                    method: method,
                    data: formData,
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function (response) {
                        if (response.status == 'success') {
                            if (pageIdentifier === 'insurance-plan') {
                                Swal.fire({
                                    title: response.status,
                                    text: response.message,
                                    icon: response.status,
                                    showConfirmButton: false,
                                    timer: 800
                                }).then(function (result) {
                                    window.location.href = baseurl + '/private-clinic/insurance-plan';
                                });
                            } else if (pageIdentifier === 'patient-insurance-plan') {
                                var data = response.data;
                                var newOption = new Option(data.name, data.id, true, true);
                                $('.insurance_plan').append(newOption).trigger('change');
                                toastr.success(response.message);
                                $('#addInsurancePlanModal').modal('hide');
                            }
                        } else {
                            Swal.fire({
                                title: response.status,
                                text: response.message,
                                icon: response.status,
                                confirmButtonText: 'OK'
                            });
                        }
                    },
                    error: function (xhr, status, error) {
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