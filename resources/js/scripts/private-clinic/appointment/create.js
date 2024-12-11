/*=========================================================================================
  File Name: private-clinic/appointment/create.js
  Description: this script is for indent screen
  ----------------------------------------------------------------------------------------

==========================================================================================*/

var baseurl = window.location.origin;
var info;
var selectedProcedure = [];
var breakInsertion = false;

$(function () {
  'use strict';
  var jqForm = $('#jquery-val-form'),
      select = $('.select2');
      start = $('#start');
      end = $('#end');
  // var baseurl = window.location.origin;
  // select2 initialization
  select.each(function () {
    var $this = $(this);
    $this.wrap('<div class="position-relative"></div>');
    $this.select2({
      placeholder: 'Select Value',
      dropdownParent: $this.parent()
    }).change(function () {
      $(this).valid();
    });
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

  //fetch edit record
  var url = window.location.href;
  var id = url.substring(url.lastIndexOf('/') + 1);
  if ($.isNumeric(id) == true) {

    $('#submit_button').text('Update');
    $.ajax({
      url: baseurl + '/private-clinic/appointment/get-appointment-by-id/' + id,
      type: 'GET',
      success: function(response) {
        if (response.status == 'success') {
          info = response.appointment;
          $('#id').val(info.id);
          $('#title').val(info.title);
          $('#type').val(info.type).trigger('change');
          $('#location_id').val(info.location_id).trigger('change');
          var startDateTime = new Date(info.start);
          $('#start').val(formatDate(startDateTime));
          $('#start-time').val(formatTime(startDateTime));
          var endDateTime = new Date(info.end);
          var duration = (endDateTime - startDateTime) / 60000;
          $('#duration').val(duration);
          $('#patient_user_id').val(info.patient_user_id).trigger('change');
          $('#doctor_user_id').val(info.doctor_user_id).trigger('change');
          $('#description').val(info.description);
          if(info.status != 'completed'){
            $('#status').val(info.status).trigger('change');

          }
        }
      },
      error: function(xhr, status, error) {
        // Handle error response
        Swal.fire({
          title: response.status,
          text: response.message,
          confirmButtonText: 'OK'
        });
      }
    });
  }

  $('#start, #start-time, #duration').on('change', function() {
    var endDateTime = calculateEndDateTime();
    $('#end').val(endDateTime);
  });

  $("#patient_user_id").on('change', function() {
    let selectedOption = $(this).find("option:selected");
    var patient_type_id = selectedOption.data('patient_type_id');
    var selectBox = $("#procedure");
    selectBox.empty();
    selectBox.trigger("change");

    if (patient_type_id) {
      $.ajax({
        url: baseurl + '/procedures/get-procedure-by-patient-type/' + patient_type_id,
        type: 'get',
        success: function(response) {
          var selectBox = $("#procedure");
          $.each(response.procedures, function(index, value) {
            selectBox.append("<option value='"+ value.id +"' data-price_id='"+ value.procedure_price_id +"' data-procedure_name='"+ value.name +"'>"+ value.name +"</option>");
          });
        },
        error: function(xhr, status, error) {
          // Handle error response
          Swal.fire({
            title: response.status,
            text: response.message,
            confirmButtonText: 'OK'
          });
        }
      });

      if (info) {
        setTimeout(function() {
          var procedure = $.parseJSON(info.procedure);
          $('#procedure').val(procedure).trigger('change');
        }, 1000);

      }
    }
  });

  $("#start").on('change', function() {
    if ($("#start").val()) {
      breakInsertion = false
      var id = $("#id").val();
      var startTime = $("#start").val();
      var startDate = new Date(startTime);
      var endTime = new Date(startDate.getTime() + 30 * 60000);

      var year = endTime.getFullYear();
      var month = (endTime.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
      var day = endTime.getDate().toString().padStart(2, '0');
      var hours = endTime.getHours().toString().padStart(2, '0');
      var minutes = endTime.getMinutes().toString().padStart(2, '0');

      var formattedEndDate = `${year}-${month}-${day} ${hours}:${minutes}`;
      //add sweet alert for validation.
      $("#end").val(formattedEndDate).trigger('change');
      $.ajax({
        url: baseurl + '/private-clinic/appointment/get-appointment-by-start?',
        type: 'get',
        data: {
          'start': startTime,
          'end': formattedEndDate,
          'id': id,
        },
        success: function(response) {
          if (response.appointment > 0) {
            Swal.fire({
              title: 'Warning!',
              text: 'In this time ('+ response.appointment +') appointments are already booked. are you sure to book more appointment on same time.',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes',
              confirmButtonClass: 'btn btn-primary',
              cancelButtonClass: 'btn btn-danger ms-1',
              buttonsStyling: false
            }).then(function (result) {
              if (result.value) {
                breakInsertion = false;
              } else {
                breakInsertion = true;
              }
            });
          }

        },
        error: function(xhr, status, error) {
          // Handle error response
          Swal.fire({
            icon: 'error',
            title: response.status,
            text: response.message,
            confirmButtonText: 'OK'
          });
        }
      });

      if (info) {
        setTimeout(function() {
          var procedure = $.parseJSON(info.procedure);
          $('#procedure').val(procedure).trigger('change');
        }, 1000);

      }
    }
  });

  $('#procedure').on('change', function() {
    selectedProcedure = [];
    let mergedTitleName = '';
    let selectedOptions = $(this).find("option:selected");

    selectedOptions.each(function(index) {
      if (index > 0) {
        mergedTitleName += ', ';
      }
      mergedTitleName += $(this).data('procedure_name');

      selectedProcedure.push({
        'id': $(this).val(),
        'price_id': $(this).data('price_id')
      });
    });

    $("#title").val(mergedTitleName);
  });
  const currentDate = new Date();

  // Extract year, month, and day components
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');

  // Create the formatted date string in yyyy-mm-dd format
  const formattedDate = `${year}-${month}-${day}`;
  // jQuery Validation
  if (jqForm.length) {
    jqForm.validate({
      rules: {
        'title': {
          required: false
        },
        'type': {
          required: true
        },
        'location_id': {
          required: true
        },
        'start': {
          required: true,
          min: formattedDate
        },
        'end': {
          required: true
        },
        'patient_user_id': {
          required: true
        },
        'doctor_user_id': {
          required: true
        },
        validationCheck: {
          required: true
        }
      },
      submitHandler: function (form) {
        //this function used when you create appointment wihtout accept the permission of multi appointments on same time.
        if (breakInsertion) {
          Swal.fire({
            title: "failure",
            text: "please reset start time",
            icon: 'error',
            confirmButtonText: 'OK'
          });
          return;
        }
        // Combine start date and start time
        var startDateTime = $('#start').val() + ' ' + $('#start-time').val();

        // Calculate end time based on start time and duration
        var duration = parseInt($("#duration").val(), 10); // Duration in minutes
        var endDateTime = calculateEndDateTime(startDateTime, duration);

        // Serialize form data and modify it
        var formData = $(form).serializeArray();
        formData = formData.filter(function(item) {
          return item.name !== 'start-time' && item.name !== 'duration'; // Exclude 'start-time' and 'duration'
        });

        // Modify or add 'start' and 'end' in formData
        var startIndex = formData.findIndex(item => item.name === 'start');
        if (startIndex !== -1) {
          formData[startIndex].value = startDateTime; // Update 'start' value
        } else {
          formData.push({ name: 'start', value: startDateTime }); // Add 'start' if not present
        }
        formData.push({ name: 'end', value: endDateTime }); // Add 'end'

        var id = $('#id').val();
        var method = id ? 'PUT' : 'POST';
        var appointUrl = baseurl + '/private-clinic/appointment/';
        if (id) {
          appointUrl += 'put-request';
        } else {
          appointUrl += 'store-request';
        }
        $.ajax({
          url: appointUrl,
          method: method,
          data: $.param(formData), // Serialize modified formData
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          success: function (result) {
            if (result.status === 'success') {
              Swal.fire({
                title: result.status,
                text: result.message,
                icon: 'success',
                confirmButtonText: 'OK'
              }).then(function () {
                window.location.href = baseurl + '/private-clinic/appointment';
              });
            } else {
              Swal.fire({
                title: 'Error',
                text: result.message,
                icon: 'error',
                confirmButtonText: 'OK'
              });
            }
          },
          error: function (xhr) {
            sidebar.modal('show');
            let errorResponse = JSON.parse(xhr.responseText);
            let errorMessage = '';

            if (errorResponse.errors) {
              for (let field in errorResponse.errors) {
                errorResponse.errors[field].forEach(function (error) {
                  errorMessage += error + '<br>';
                });
              }
            } else {
              errorMessage = errorResponse.message || 'An unknown error occurred';
            }

            Swal.fire({
              title: 'Validation Error',
              html: errorMessage,
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        });
        return false;
      }
    });
  }

    // $('form').each(function() {
    //   this.reset();
    // });
  });
