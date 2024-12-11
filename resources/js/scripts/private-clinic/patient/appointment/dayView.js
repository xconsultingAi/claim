$(document).ready(allDay);
$('#add-day-button').click(allDay);

function allDay() {
  addEventBtn = $('.add-event-btn');
  updateEventBtn = $('.update-event-btn');
  $('.all-day-view').hide();
  // $('.day-view-div').show();

  function resetValues() {
    $('#end').val('');
    $('#start').val('');
    $('#title').val('');
    $('#status_id').val('');
  }

  $('#add-appointment-button').click(function () {
    resetValues();
    $('.event-sidebar').modal('show');
    $('#start').val(clickedDate);
  });

  var clickedDate = $('#clickedDateAndTime').val();
  fetchAppointments(clickedDate);

  function fetchAppointments(date) {
    $.ajax({
      url: '/private-clinic/appointment/dayview-appointments',
      type: 'GET',
      dataType: 'json',
      data: { data: date },
      success: function (response) {
        let appointments = response.appointments;
        if (!Array.isArray(appointments)) {
          console.error('Invalid data format: expected an array of appointments');
          return;
        }
        appendAppointmentsToTimeSlots(appointments);
        feather.replace(); // Reinitialize Feather icons
      },
      error: function (xhr, status, error) {
        console.error('Error fetching appointment data:', error);
      }
    });
  }

  function calculateEndDateTime() {
    var startDate = $("#start").val();
    var startTime = $("#start-time").val();
    var duration = parseInt($("#duration").val(), 10);


    if (!startDate || !startTime || isNaN(duration)) {
      throw new Error("Invalid input values");
    }

    var dateParts = startDate.split('-');
    var timeParts = startTime.split(':');
    var year = parseInt(dateParts[2], 10);
    var month = parseInt(dateParts[1], 10) - 1;
    var day = parseInt(dateParts[0], 10);
    var hour = parseInt(timeParts[0], 10);
    var minute = parseInt(timeParts[1], 10);
    var startDateTime = new Date(year, month, day, hour, minute);

    if (isNaN(startDateTime.getTime())) {
      throw new Error("Invalid Date object created");
    }

    startDateTime.setMinutes(startDateTime.getMinutes() + duration);
    var endDateTime = formatDate(startDateTime);
    return endDateTime;
  }

  function formatDate(date) {
    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();
    var hours = ('0' + date.getHours()).slice(-2);
    var minutes = ('0' + date.getMinutes()).slice(-2);
    var seconds = ('0' + date.getSeconds()).slice(-2);

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }
  // Remove any existing click handlers to prevent multiple bindings
  $(document).off('click', '.edit-record');
  $(document).on('click', '.edit-record', function (event) {
    event.stopPropagation(); // Prevent the row click event
    const appointmentId = $(this).data('contact_id');
    $('#add-new-sidebar').modal('show');
    if (appointmentId) {
      addEventBtn.addClass('d-none');
      updateEventBtn.removeClass('d-none');
      $.ajax({
        url: '/private-clinic/appointment/get-appointment-by-id/' + appointmentId,
        type: 'GET',
        dataType: 'json',
        data: { data: appointmentId },
        success: function (response) {
          const appointment = response.appointment;
          if (appointment) {
            $('#id').val(appointment.id);
            $('#location_id_apt').val(appointment.location_id).trigger('change');
            $('#patient_user_id').val(appointment.patient_user_id).trigger('change');
            $('#type').val(appointment.type).trigger('change');
            $('#procedure_ids').val(JSON.parse(appointment.procedure)).trigger('change');
            $('#title').val(appointment.title);
            $('#start').val(moment(appointment.start).format('DD-MM-YYYY'));
            $('#start-time').val(moment(appointment.start).format('HH:mm'));
            $('#end').val(calculateEndDateTime());
            $('#doctor').val(appointment.doctor_user_id).trigger('change');
            $('#description').val(appointment.description);
            $('#status_id').val(appointment.status_id).trigger('change');
            $('#letter_id').val(appointment.letter_id).trigger('change');
            //send data from 1  DayView js to calnedar js
            let customEvent = new CustomEvent('sendData', {
              detail: {
                appointmentdata: appointment,
              }
            });
            document.dispatchEvent(customEvent);
          } else {
            console.error('Appointment not found');
          }
        },
        error: function (xhr, status, error) {
          console.error('Error fetching appointment data:', error);
        }
      });
    }
  });

  function getAppointmentById(id) {
    const row = $(`#timeSlots tbody tr`).filter(function () {
      return $(this).find('.edit-record').data('contact_id') === id;
    });
    return row.data('appointment');
  }

  function appendAppointmentsToTimeSlots(appointments) {
    const timeSlotsTable = $('#timeSlots tbody');
    timeSlotsTable.empty();
    appointments.sort((a, b) => {
      if (a.status_name === 'CAN' && b.status_name !== 'CAN') {
        return 1; // Move 'Cancelled' down
      } else if (a.status_name !== 'CAN' && b.status_name === 'CAN') {
        return -1; // Move other statuses up
      }
      return new Date(a.start) - new Date(b.start);
    });

    let counter = 1;
    $.each(appointments, function (index, appointment) {
      let buttonClass = 'btn-outline-primary';
      if (appointment.status_name === 'NA') {
        buttonClass = 'btn-info';
      } else if (appointment.status_name === 'ARR') {
        buttonClass = 'btn-primary';
      } else if (appointment.status_name === 'DNA') {
        buttonClass = 'btn-warning';
      } else if (appointment.status_name === 'CAN') {
        buttonClass = 'btn-danger';
      } else if (appointment.status_name === 'CON') {
        buttonClass = 'btn-secondary';
      } else if (appointment.status_name === 'COM') {
        buttonClass = 'btn-success';
      }
      const appointmentTime = moment(appointment.start).format('LT');
      const row = $('<tr></tr>').data('appointment', appointment);
      const appointmentData = `
            <td>${counter}</td>
            <td class="update-event-btn">${appointmentTime}</td>
            <td><a href="/private-clinic/patient/profile-view/${appointment.patient_user_id}">${appointment.patient_first_name} ${appointment.patient_last_name}</a></td>
            <td>${appointment.phone}</td>
            <td>${appointment.title}</td>
            <td>${appointment.display_name}</td>
            <td>${appointment.description}</td>
            <td class="status-cell" data-appointment-id="${appointment.id}" data-status="${appointment.status_name}">
                <div class="dropdown">
                    <button class="btn btn-sm ${buttonClass} dropdown-toggle status-btn" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        ${appointment.status_name}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton-${appointment.id}">
                    </div>
                </div>
            </td>
         <td>
    <div class="btn-group">
        <!-- Edit Button -->
        <a href="javascript:void(0);" class="btn btn-sm edit-record" data-contact_id="${appointment.id}">
            ${feather.icons['edit'].toSvg({ class: 'font-small-4 me-50' })}
        </a>
       <!-- Delete Button -->
         <a href="javascript:void(0);" class="btn btn-sm delete-record" data-contact_id="${appointment.id}">
          ${feather.icons['trash'].toSvg({ class: 'font-small-4 me-50' })}
          </a>

    </div>
</td>

        `;
      row.append(appointmentData);
      timeSlotsTable.append(row);
      counter++;
    });

    $.ajax({
      url: '/type/status/get-status-type-list',
      method: 'GET',
      success: function (response) {
        var data = response.data;
        $.each(appointments, function (index, appointment) {
          var dropdownMenu = $('[data-appointment-id="' + appointment.id + '"] .dropdown-menu');
          dropdownMenu.empty();
          $.each(data, function (index, status) {
            dropdownMenu.append('<a class="dropdown-item update-status" href="#" data-status="' + status.id + '">' + status.name + '</a>');
          });
          dropdownMenu.on('click', '.update-status', function (e) {
            e.preventDefault();
            var statusId = $(this).data('status');
            var appointmentId = appointment.id;
            $.ajax({
              url: '/private-clinic/appointment/status-update',
              method: 'PUT',
              headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
              },
              data: {
                id: appointmentId,
                status_id: statusId
              },
              success: function (response) {
                var statusName = response.data.status_name;
                var button = $('[data-appointment-id="' + appointmentId + '"]').find('.status-btn');
                button.removeClass('btn-outline-primary btn-info btn-danger btn-success btn-warning btn-secondary btn-primary');
                if (statusName === 'NA') {
                  button.addClass('btn-info');
                } else if (statusName === 'ARR') {
                  button.addClass('btn-primary');
                } else if (statusName === 'DNA') {
                  button.addClass('btn-warning');
                } else if (statusName === 'CAN') {
                  button.addClass('btn-danger');
                } else if (statusName === 'CON') {
                  button.addClass('btn-secondary');
                } else if (statusName === 'COM') {
                  button.addClass('btn-success');
                }
                button.text(statusName);

                toastr.success('Status changed successfully!');
                var updatedAppointment = appointments.find(function (a) {
                  return a.id === appointmentId;
                });
                if (updatedAppointment) {
                  updatedAppointment.status_name = statusName;
                }

                // Re-sort the appointments
                appointments.sort((a, b) => {
                  if (a.status_name === 'CAN' && b.status_name !== 'CAN') {
                    return 1; // Move 'Cancelled' down
                  } else if (a.status_name !== 'CAN' && b.status_name === 'CAN') {
                    return -1; // Move other statuses up
                  }
                  return new Date(a.start) - new Date(b.start);
                });

                appendAppointmentsToTimeSlots(appointments);
              },
              error: function (xhr, status, error) {
                console.error('Error updating status:', error);
              }
            });
          });
        });
      }
    });
  }





  $(addEventBtn).on('click', function () {
    var location_id_apt = $("#location_id_apt").val();
    if (breakInsertion) {
      Swal.fire({
        title: "failure",
        text: "please reset start time",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    if (eventForm.valid()) {
      var newEvent = {
        title: $("#title").val(),
        location_id: location_id_apt,
        branch_id: location_id_apt,
        status_id: $("#status_id").val(),
        letter_id: $("#letter_id").val(),
        start: clickedDate,
        starttime: $("#start-time").val(),
        end: calculateEndDateTime(),
        patient_user_id: patient_user_id.val(),
        procedure: procedure_ids.val(),
        doctor: doctor_user_id.val(),
        type: type.val(),
        description: description.val(),
        display: 'block'
      };
      if (newEvent) {
        $.ajax({
          url: baseurl + '/private-clinic/appointment/store-request',
          type: 'POST',
          data: newEvent,
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          success: function (result) {
            patientId = result.data.patient_user_id;
            Id = result.data.id;
            if (result.status === 'success') {
              Swal.fire({
                title: 'Appointment created successfully! ',
                text: 'Do you want to print Appointment Letter ?',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
                confirmButtonClass: 'btn btn-primary',
                cancelButtonClass: 'btn btn-danger ms-1',
                buttonsStyling: false,
              })
                .then((result) => {
                  if (result.isConfirmed) {
                    window.location.href = baseurl + '/private-clinic/appointment/print/' + patientId + '/' + Id;
                  }
                  else if (result.dismiss === Swal.DismissReason.cancel) {
                    calendar.refetchEvents();
                  }
                });
            } else {
              Swal.fire({
                title: result.status,
                text: result.message,
                icon: 'error',
                showCancelButton: 'Ok'
              });
              calendar.refetchEvents();
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
      }
    }
    $('.patient-detail').on('click', function () {
      var selectedPatientId = $("#patient_user_id").val();
      var patientDetailUrl = '/private-clinic/patient/detail/' + selectedPatientId;
      window.location.href = patientDetailUrl;
    });
  });
  $(document).on('click', '.delete-record', function (e) {
    e.preventDefault();
    var appointmentId = $(this).data('contact_id');
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this appointment?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: baseurl + '/private-clinic/appointment/delete-request/' + appointmentId,
          type: 'DELETE',
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          success: function (result) {
            if (result.status === 'success') {
              Swal.fire(
                'Deleted!',
                'The appointment has been deleted.',
                'success'
              );
              location.reload();
            } else {
              Swal.fire(
                'Error',
                'Failed to delete the appointment.',
                'error'
              );
            }
          },
          error: function (error) {
            console.log(error);
            Swal.fire(
              'Error',
              'An error occurred while deleting the appointment.',
              'error'
            );
          }
        });
      } else {
        Swal.fire(
          'Cancelled',
          'The appointment is safe :)',
          'error'
        );
      }
    });
  });


}
