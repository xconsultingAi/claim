var baseurl = window.location.origin;
var patient_id = ('');
$(function () {
    'use strict';

    var assetPath = '../../../app-assets/';
    var userView = 'app-user-view-account.html';

    if ($('body').attr('data-framework') === 'laravel') {
        assetPath = $('body').data('asset-path'); // Use data() method instead of attr() for custom data attributes
        userView = assetPath + 'app/user/view/account';
    }
    var jqForm = $('#jquery-val-form');
    var select = $('.select2');

    // select2 initialization
    select.each(function () {
        var $this = $(this);
        $this.wrap('<div class="position-relative"></div>');
        $this.select2({
            placeholder: 'Select value',
            dropdownParent: $this.parent()
        }).on('change', function () { // Use on() instead of change() for event handling
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
                'status': {
                    required: true
                },
                'validationCheck': { // Fixed the rule name
                    required: true
                }
            },
            submitHandler: function (form) {
                var formData = $(form).serialize(); // Get the form data
                var id = $('#id').val(); // Get the service ID (if exists)
                var route='private-clinic/patient/personal-history';
                patient_id=$('#user_id').val(); 
                // Determine the URL based on whether it's an update or create operation
                var url = id ? assetPath +route : assetPath +route;
                var method = id ? 'PUT' : 'POST'; // Use PUT for update, POST for create

                $.ajax({
                    url: url,
                    method: method,
                    data: formData,
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function (response) {
                        // Handle the success response
                        var swalConfig = {
                            title: response.status,
                            text: response.message,
                            icon: response.status,
                            confirmButtonText: 'OK'
                        };

                        if (response.status === 'success') {
                            Swal.fire(swalConfig).then(function (result) {
                                window.location.href = assetPath + route + '/get/' + patient_id;
                            });
                        } else {
                            Swal.fire(swalConfig);
                        }
                    },
                    error: function (xhr, status, error) {
                        // Handle the error response
                        // Display an error message or perform any other error handling
                        console.error(error);
                        Swal.fire({
                            title: error.status,
                            text: error.statusText, // Changed to error.statusText
                            icon: 'error', // Changed to 'error'
                            confirmButtonText: 'OK'
                        });
                    }
                });

                return false; // Prevent the form from being submitted
            }
        });
    }
});

