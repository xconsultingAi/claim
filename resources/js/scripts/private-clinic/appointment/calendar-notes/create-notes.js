/*=========================================================================================
  File Name: private-clinic/appointment/calendar-notes/create.js
  Description: this script is for indent screen
  ----------------------------------------------------------------------------------------

==========================================================================================*/

var baseurl = window.location.origin;


$(function () {
    'use strict';
    
    var assetPath = '../../../app-assets/';
    var userView = 'app-user-view-account.html';

    if ($('body').attr('data-framework') === 'laravel') {
        assetPath = $('body').data('asset-path'); // Use data() method instead of attr() for custom data attributes
        userView = assetPath + 'app/user/view/account';
    }

    //getting id from url
    var id = null; 
    var path = window.location.pathname; // "/resource/123"
    var id = path.match(/\d+/); // ["123"]
    id = id ? parseInt(id[0], 10) : null; // 123
    var jqForm = $('#jquery-val-form'),
      select = $('.select2');
      start = $('#start');
      end = $('#end');
      var holiday = 0;

    if(id == null)
    {
    
    $('#enable_end_date').change(function() {
        var isChecked = $(this).is(':checked');
        $('#end').prop('disabled', !isChecked);
      });

      if (start.length) {
        var start = start.flatpickr({
          enableTime: false,
          altFormat: 'Y-m-d',
          onReady: function (selectedDates, dateStr, instance) {
            if (instance.isMobile) {
              $(instance.mobileInput).attr('step', null);
            }
          },
          onChange: function(selectedDates, dateStr, instance) {
            // Update the input field
            $('#start').val(dateStr);
          }
        });
      }
      
    
      var startInput = $('#start');
        startInput.flatpickr({
          enableTime: false,
          altFormat: 'Y-m-d',
          minDate: 'today', 
          defaultDate: 'today',
          onReady: function (selectedDates, dateStr, instance) {
            if (instance.isMobile) {
              $(instance.mobileInput).attr('step', null);
            }
          }
        });
    
      // End date picker
      if (end.length) {
        var end = end.flatpickr({
          enableTime: true,
          altFormat: 'Y-m-dTH:i:S',
          minDate: 'today', 
          defaultDate: 'today',
          onReady: function (selectedDates, dateStr, instance) {
            if (instance.isMobile) {
              $(instance.mobileInput).attr('step', null);
            }
          }
        });
      }

      function calculateEndDateTime(startDateTime, duration) {
        var start = new Date(startDateTime);
        start.setMinutes(start.getMinutes() + duration);
      
        return formatDate(start) + ' ' + formatTime(start);
      }
      
    
      function formatDate(date) {
        return [
          date.getFullYear(),
          ('0' + (date.getMonth() + 1)).slice(-2),
          ('0' + date.getDate()).slice(-2)
        ].join('-');
      }
      
      function formatTime(date) {
        return [
          ('0' + date.getHours()).slice(-2),
          ('0' + date.getMinutes()).slice(-2)
        ].join(':');
      }



}
else
{

  var isHolidayValue = $('#holiday_value').val(); 
  //console.log(isHolidayValue);
  //console.log(typeof isHolidayValue);
 
    // Check or uncheck the checkbox based on the value
    if (JSON.parse(isHolidayValue)) {
        $('#is_holiday').prop('checked', true); // Check the checkbox
        //console.log("han g");
    } else {
        $('#is_holiday').prop('checked', false); // Uncheck the checkbox
        //console.log("nai g");
    }

    $('#submit_button').text('Update');
    
    $('#enable_end_date').prop('checked', true);
    $('#enable_end_date').change(function() {
        var isChecked = $(this).is(':checked');
        $('#end').prop('disabled', !isChecked);
      });

      
      if (start.length) {
        var start = start.flatpickr({
          enableTime: false,
          altFormat: 'Y-m-d',
          onReady: function (selectedDates, dateStr, instance) {
            if (instance.isMobile) {
              $(instance.mobileInput).attr('step', null);
            }
          },
          onChange: function(selectedDates, dateStr, instance) {
            // Update the input field
            $('#start').val(dateStr);
          }
        });
      }
      
      var startInput = $('#start');
        startInput.flatpickr({
          enableTime: false,
          altFormat: 'Y-m-d',
          minDate: 'today', 
          onReady: function (selectedDates, dateStr, instance) {
            if (instance.isMobile) {
              $(instance.mobileInput).attr('step', null);
            }
          }
        });
    
      // End date picker
      if (end.length) {
        var end = end.flatpickr({
          enableTime: true,
          altFormat: 'Y-m-dTH:i:S',
          minDate: 'today', 
          onReady: function (selectedDates, dateStr, instance) {
            if (instance.isMobile) {
              $(instance.mobileInput).attr('step', null);
            }
          }
        });
      }

}


       // jQuery Validation
       if (jqForm.length) {
        jqForm.validate({
            rules: {
                'start': {
                    required: true
                },
                'end': {
                    required: false
                },
                'note': {
                    required: true
                },
                'validationCheck': { // Fixed the rule name
                    required: true
                }
            },
            submitHandler: function (form) {
                var formData = $(form).serialize(); // Get the form data
                var route='private-clinic/appointment/calendar-notes';
                var is_holiday = $('#is_holiday').is(':checked') ? 1 : 0;
                formData += '&is_holiday=' + is_holiday;
                //patient_id=$('#user_id').val();
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
                                window.location.href = "/private-clinic/appointment/calendar-view";
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
