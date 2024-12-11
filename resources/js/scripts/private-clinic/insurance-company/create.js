$(function () {
    'use strict';

    var jqForm = $('#jquery-company-form'),
        select = $('.select2');

    var pageIdentifier = $('#insurance-company').data('page');

    $('#mode_of_payment').select2();
    $('#status').select2();
    
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
                validationCheck: {
                    required: true
                }
            },
            submitHandler: function (form) {
                var formData = $(form).serialize();
                var insuranceId = $('#insuranceId').val();
                var url = insuranceId ? '/private-clinic/insurance-company/' + insuranceId : '/private-clinic/insurance-company/store';
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
                            if (pageIdentifier === 'insurance-company') {
                                Swal.fire({
                                    title: response.status,
                                    text: response.message,
                                    icon: response.status,
                                    confirmButtonText: 'OK'
                                }).then(function (result) {
                                    window.location.href = baseurl + '/private-clinic/insurance-company';
                                });
                            }
                            else if (pageIdentifier === 'patient-insurance-company') {
                                var data = response.data;
                                var newOption = new Option(data.name, data.id, true, true);
                                $('.insurance_company').append(newOption).trigger('change');
                                toastr.success(response.message);
                                $('#addIsuranceCompanyModal').modal('hide');
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
                            title: 'Error',
                            text: 'There was an error processing your request.',
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

$(document).ready(function() {
    function toggleTaxInput() {
        if ($('#deduct_tax').is(':checked')) {
            $('#tax').prop('disabled', false).prop('required', true);
        } else {
            $('#tax').prop('disabled', true).prop('required', false).val('');
        }
    }

    toggleTaxInput();

    $('#deduct_tax').change(function() {
        toggleTaxInput();
    });
});
