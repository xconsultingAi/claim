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
                'family_History': {
                    required: true
                },
                'smoking_History': {
                    required: true
                },
                'Immunizations_History': {
                    required: true
                },
                'Allergies_History': {
                    required: true
                }
            },
            submitHandler: function (form) {
                var formData = $(form).serialize(); 
                var id = $('#id').val(); 
                var route = 'private-clinic/patient/patient-medical-history';
                var patient_id = $('#user_id').val();
                var url = id ? assetPath +route : assetPath +route;
                var method = id ? 'PUT' : 'POST';
    
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
                            showConfirmButton: false,
                            timer: 800
                        };
    
                        if (response.status === 'success') {
                            Swal.fire(swalConfig).then(function () {
                                window.location.href = assetPath + route + '/get/' + patient_id;
                            });
                        } else {
                            Swal.fire(swalConfig);
                        }
                    },
                    error: function (xhr) {
                        var errors = xhr.responseJSON ? xhr.responseJSON.errors : null;
                        if (errors) {
                            var errorMessages = "";
                            $.each(errors, function (key, value) {
                                errorMessages += value + '\n';
                            });
    
                            Swal.fire({
                                title: 'Validation Error',
                                text: errorMessages,
                                icon: 'error',
                                confirmButtonText: 'OK'
                            });
                        } else {
                            Swal.fire({
                                title: xhr.status,
                                text: xhr.statusText, 
                                icon: 'error',
                                confirmButtonText: 'OK'
                            });
                        }
                    }
                });
    
                return false; 
            }
        });
    }
    

    //Edit btn makes textareas enabled
    $('#edit').click(function(event) {
        event.preventDefault(); // Prevent the default behavior of the button click
        $('#save').css('display', 'block');
        $('#edit').css('display', 'none');
       
      });
});