/**
 * App Calendar
 */

// const { TRUE } = require("sass");

/**
 * ! If both start and end dates are same Full calendar will nullify the end date value.
 * ! Full calendar will end the event on a day before at 12:00:00AM thus, event won't extend to the end date.
 * ! We are getting events from a separate file named app-calendar-events.js. You can add or remove events from there.
 **/

var baseurl = window.location.origin;
var events = [];
var fetchedAppointmentData;
var selectedProcedure = [];
var breakInsertion = false;
var info;
var isEditMode = false;
'use-strict';
$(document).ready(function () {


  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "1000",
    "hideDuration": "500",
    "timeOut": "3500",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  $('.fc-daygrid-day-top').click(function (e) {
    e.preventDefault();

    $('.fc-dayView-button').click();
  });
});
// RTL Support
var direction = 'ltr',
  assetPath = '../../../app-assets/';
if ($('html').data('textdirection') == 'rtl') {
  direction = 'rtl';
}

if ($('body').attr('data-framework') === 'laravel') {
  assetPath = $('body').attr('data-asset-path');
}

$(document).on('click', '.fc-sidebarToggle-button', function (e) {
  $('.app-calendar-sidebar, .body-content-overlay').addClass('show');
});

$(document).on('click', '.body-content-overlay', function (e) {
  $('.app-calendar-sidebar, .body-content-overlay').removeClass('show');
});

$('#letter_id').val(3).trigger('change');
document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar'),
    eventToUpdate,
    sidebar = $('.event-sidebar'),
    calendarsColor = {
      return_visit: 'success',
      procedure: 'danger',
      consultancy: 'info',
      first_visit: 'warning',
    },
    eventForm = $('.event-form'),
    addEventBtn = $('.add-event-btn'),
    cancelBtn = $('.btn-cancel'),
    updateEventBtn = $('.update-event-btn'),
    toggleSidebarBtn = $('.btn-toggle-sidebar'),
    id = $('#id'),
    title = $('#title'),
    location_id = $('#location_id'),
    select_location = $('#location_id_apt'),
    status_id = $('#status_id'),
    letter_id = $("#letter_id"),
    type = $('#type'),
    start = $('#start'),
    end = $('#end'),
    patient_user_id = $('#patient_user_id'),
    procedure_ids = $('#procedure_ids'),
    doctor_user_id = $('#doctor_user_id'),
    location_ids = $('#location_ids'),
    doctor = $('#doctor'),
    description = $('#description'),
    calEventFilter = $('.calendar-events-filter'),
    filterInput = $('.input-filter'),
    selectAll = $('.select-all'),
    btnDeleteEvent = $('.btn-delete-event');

  // --------------------------------------------
  // On add new item, clear sidebar-right field fields
  // --------------------------------------------
  $('.add-event button').on('click', function (e) {
    isEditMode = false;
    $('.event-sidebar').addClass('show');
    $('.sidebar-left').removeClass('show');
    $('.app-calendar .body-content-overlay').addClass('show');
  });

  $('#add-new-sidebar').modal({
    backdrop: 'static',
    keyboard: false
  });

  $('#add-new-sidebar').on('hidden.bs.modal', function () {
    updateEventBtn.addClass('d-none');
    addEventBtn.removeClass('d-none'); //this function use to close/hide add-new-sidebar
    isEditMode = false;
    $('#procedure_ids').val(null).trigger('change');
    $('#start-time').val('');
    $('#type').val(null).trigger('change');
    $('#patient_detail #patient_detail_small').text("");
    $('#patient_detail').attr('href', '#');

  });

  // Label  select
  if (type.length) {
    function renderBullets(option) {
      if (!option.id) {
        return option.text;
      }
      var $bullet =
        "<span class='bullet bullet-" +
        $(option.element).data('type') +
        " bullet-sm me-50'> " +
        '</span>' +
        option.text;

      return $bullet;
    }
  }

  patient_user_id.select2({
    placeholder: 'Select Patient',
    // dropdownParent: location_id.parent(),
    dropdownParent: select_location.parent(),
    closeOnSelect: true,
    escapeMarkup: function (es) {
      return es;
    }
  });

  select_location.select2({
    placeholder: 'Select location',
    dropdownParent: select_location.parent(),
    closeOnSelect: true,
    escapeMarkup: function (es) {
      return es;
    }
  });

  $('#duration').select2();
  type.select2({
    placeholder: 'Select type',
    dropdownParent: type.parent(),
    closeOnSelect: true,
    escapeMarkup: function (es) {
      return es;
    }
  });

  status_id.select2({
    dropdownParent: status_id.parent(),
    closeOnSelect: true,
    escapeMarkup: function (es) {
      return es;
    }
  });

  if (procedure_ids.length) {
    procedure_ids.select2({
      placeholder: 'Select at least one procedure',
      dropdownParent: procedure_ids.parent(),
      closeOnSelect: false,
      escapeMarkup: function (es) {
        return es;
      }
    }).on('change', function () {
      procedure_ids.select2('close');
      updateTitle();
    });
  }


  if (doctor_user_id.length) {
    doctor_user_id.select2({
      placeholder: 'Select value',
      dropdownParent: doctor_user_id.parent(),
      closeOnSelect: true,
      escapeMarkup: function (es) {
        return es;
      }
    });
  }

  if (location_ids.length) {
    location_ids.select2({
      placeholder: 'Select value',
      dropdownParent: location_ids.parent(),
      closeOnSelect: true,
      escapeMarkup: function (es) {
        return es;
      }
    });
  }

  function renderGuestAvatar(option) {
    if (!option.id) {
      return option.text;
    }
    var $avatar =
      "<div class='d-flex flex-wrap align-items-center'>" +
      "<div class='avatar avatar-sm my-0 me-50'>" +
      "<span class='avatar-content'>" +
      "<img src='" +
      assetPath +
      'images/avatars/' +
      $(option.element).data('avatar') +
      "' alt='avatar' />" +
      '</span>' +
      '</div>' +
      option.text +
      '</div>';

    return $avatar;
  }

  var startInput = $('#start');
  startInput.flatpickr({
    enableTime: false,
    altFormat: 'd-m-Y',
    dateFormat: 'd-m-Y',
    defaultDate: 'today',
    onReady: function (selectedDates, dateStr, instance) {
      if (instance.isMobile) {
        $(instance.mobileInput).attr('step', null);
      }
    }
  });

  var startTimePickr = $('#start-time').flatpickr({
    // enableTime: true,
    // noCalendar: true,
    // dateFormat: "H:i",
    // clickOpens: true,
    // editable: true,
    // allowInput: true
    enableTime: true,
    noCalendar: true,
    time_24hr: true,
    minuteIncrement: 15
  });

  // End date picker
  if (end.length) {
    var end = end.flatpickr({
      enableTime: true,
      altFormat: 'd-m-YTH:i:S',
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr('step', null);
        }
      }
    });
  }

  // Event click function
  function eventClick(info) {
    //click
    isEditMode = true;
    eventToUpdate = info.event;

    // Check if the event is a note event
    if (eventToUpdate.extendedProps.calendar !== 'note') {
      sidebar.modal('show');
    }
    addEventBtn.addClass('d-none');
    cancelBtn.addClass('d-none');
    updateEventBtn.removeClass('d-none');
    btnDeleteEvent.removeClass('d-none');
    fetchedAppointmentData = info.event;


    $("#id").val(eventToUpdate._def.publicId);
    title.val(eventToUpdate.title);

    var startMoment = moment(eventToUpdate.start);
    var endMoment = eventToUpdate.end ? moment(eventToUpdate.end) : null;

    if (startMoment) {
      $("#start").val(startMoment.format('DD-MM-YYYY'));
      $("#start-time").val(startMoment.format('HH:mm'));
    }

    if (startMoment && endMoment) {
      var duration = endMoment.diff(startMoment, 'minutes');
      $("#duration").val(duration).trigger('change');
    }

    eventToUpdate.extendedProps.type !== undefined
      ? type.val(eventToUpdate.extendedProps.type).trigger('change')
      : null;
    eventToUpdate.extendedProps.patient_user_id !== undefined
      ? patient_user_id.val(eventToUpdate.extendedProps.patient_user_id).trigger('change')
      : null;
    eventToUpdate.extendedProps.doctor_user_id !== undefined
      ? doctor.val(eventToUpdate.extendedProps.doctor_user_id).trigger('change')
      : null;
    eventToUpdate.extendedProps.description !== undefined
      ? description.val(eventToUpdate.extendedProps.description)
      : null;
    eventToUpdate.extendedProps.select_location !== undefined
      ? select_location.val(eventToUpdate.extendedProps.select_location).trigger('change')
      : null;
    eventToUpdate.extendedProps.status_id !== undefined
      ? status_id.val(eventToUpdate.extendedProps.status_id).trigger('change')
      : null;
    eventToUpdate.extendedProps.letter_id !== undefined
      ? letter_id.val(eventToUpdate.extendedProps.letter_id).trigger('change')
      : null;


    setTimeout(function () {
      if ($("#status_id option:selected").data('slug') != 'did_not_arrive') {
        $(".btn-delete-event").hide();
      }
    }, 1000);
    //  Delete Event

    btnDeleteEvent.on('click', function () {
      eventToUpdate.remove();
      removeEvent(eventToUpdate.id);
      sidebar.modal('hide');
      $('.event-sidebar').removeClass('show');
      $('.app-calendar .body-content-overlay').removeClass('show');
    });
  }

  // Modify sidebar toggler
  function modifyToggler() {
    $('.fc-sidebarToggle-button')
      .empty()
      .append(feather.icons['menu'].toSvg({ class: 'ficon' }));
  }

  // Selected Checkboxes
  function selectedCalendars() {
    var selected = [];
    $('.calendar-events-filter input:checked').each(function () {
      selected.push($(this).attr('data-value'));
    });
    return selected;
  }

  // --------------------------------------------------------------------------------------------------
  // AXIOS: fetchEvents
  // * This will be called by fullCalendar to fetch events. Also this can be used to refetch events.
  // --------------------------------------------------------------------------------------------------


  function initializeView() {
    $('.day-view-div').hide();
    $('.all-day-view').hide();
    $('.fc-prev-button').show();
    $('.fc-next-button').show();
    $('.fc-prevDay-button').hide();
    $('.fc-nextDay-button').hide();
    $('.fc-prevYear1-button').show();
    $('.fc-nextYear1-button').show();
    $('.fc-toolbar-title').show();
    $('.fc-dayView-button').removeClass('fc-button-active');
    $('.fc-dayGridMonth-button').addClass('fc-button-active');
  }

  function fetchEvents(info, successCallback) {
    // Fetch Events from API endpoint reference
    branch_id = $('#location_ids').val();
    doctor_id = $('#doctor_user_id').val();

    if (branch_id == 0 && doctor_id == 0) {
      $.ajax({
        url: baseurl + '/private-clinic/appointment/list',
        type: 'GET',
        success: function (result) {
          var calendars = selectedCalendars();
          var events = result.data;
          var firstname;

          // Process appointment events
          var appointmentEvents = events.map(function (event) {
            if (event.patientDetails && typeof event.patientDetails === 'object') {
              firstname = event.title;
            }
            return {
              id: event.id,
              title: firstname,
              start: event.start,
              end: event.end,
              firstname: firstname,
              extendedProps: {
                calendar: event.type,
                patient_user_id: event.patient_user_id,
                procedure: event.procedure,
                doctor_user_id: event.doctor_user_id,
                type: event.type,
                description: event.description,
                select_location: event.location_id,
                status_id: event.status_id,
                letter_id: event.letter_id
              },

            };
          });

          $.ajax({
            url: baseurl + '/private-clinic/appointment/calendar-notes/list',
            type: 'GET',
            success: function (notesResult) {
              var notes = notesResult.data;

              var noteEvents = notes.map(function (note) {
                return {
                  title: note.notes,
                  start: note.start_date,
                  end: note.end_date,
                  allDay: true,
                  url: "calendar-notes/update/" + note.id,
                  extendedProps: {
                    calendar: 'note',
                    // Add any additional properties you need
                  }
                };
              });

              // Combine appointment and note events
              var allEvents = appointmentEvents.concat(noteEvents);
              // Filter events based on selected calendars
              var selectedEvents = allEvents.filter(function (event) {
                var calendar = event.extendedProps.calendar.toLowerCase();
                return calendars.includes(calendar) || calendar === 'note';
              });

              // Call successCallback with the combined events
              successCallback(selectedEvents);
            },
            error: function (error) {
              console.log(error);
            }
          });
        },
        error: function (error) {
          console.log(error);
        }
      });
    }

    else if (branch_id != 0 && doctor_id == 0) {
      initializeView();
      $.ajax({
        url: baseurl + '/private-clinic/appointment/get-appointment-by-Branch/' + branch_id,
        type: 'GET',
        success: function (result) {
          var calendars = selectedCalendars();
          var events = result.data;

          var firstname; // Declare firstname variable inside the loop

          // Process appointment events
          var appointmentEvents = events.map(function (event) {
            if (event.patientDetails && typeof event.patientDetails === 'object') {
              firstname = event.patientDetails.firstname + " " + event.patientDetails.lastname;
            }
            return {
              id: event.id,
              title: firstname,
              start: event.start,
              end: event.end,
              firstname: firstname,
              extendedProps: {
                calendar: event.type,
                patient_user_id: event.patient_user_id,
                procedure: event.procedure,
                doctor_user_id: event.doctor_user_id,
                type: event.type,
                description: event.description,
                select_location: event.location_id,
                status_id: event.status_id,
                letter_id: event.letter_id,
              },

            };
          });

          // Fetch calendar notes from another endpoint
          $.ajax({
            url: baseurl + '/private-clinic/appointment/calendar-notes/get-CalendarNotes-by-Branch/' + branch_id,
            type: 'GET',
            success: function (notesResult) {
              var notes = notesResult.data;

              // Process calendar notes
              var noteEvents = notes.map(function (note) {
                return {
                  title: note.notes,
                  start: note.start_date,
                  end: note.end_date,
                  allDay: true,
                  url: "calendar-notes/update/" + note.id,
                  extendedProps: {
                    calendar: 'note',
                    // Add any additional properties you need
                  }
                };
              });

              var allEvents = appointmentEvents.concat(noteEvents);
              var selectedEvents = allEvents.filter(function (event) {
                var calendar = event.extendedProps.calendar.toLowerCase();
                return calendars.includes(calendar) || calendar === 'note';
              });

              // Call successCallback with the combined events
              successCallback(selectedEvents);
            },
            error: function (error) {
              console.log(error);
            }
          });
        },
        error: function (error) {
          console.log(error);
        }
      });
    }
    else if (branch_id == 0 && doctor_id != 0) {
      initializeView();
      $.ajax({
        url: baseurl + '/private-clinic/appointment/get-appointment-by-Doctor/' + doctor_id,
        type: 'GET',
        success: function (result) {
          var calendars = selectedCalendars();
          var events = result.data;
          var firstname;
          var appointmentEvents = events.map(function (event) {
            if (event.patientDetails && typeof event.patientDetails === 'object') {
              firstname = event.patientDetails.firstname + " " + event.patientDetails.lastname;
            }
            return {
              id: event.id,
              title: firstname,
              start: event.start,
              end: event.end,
              firstname: firstname,
              extendedProps: {
                calendar: event.type,
                patient_user_id: event.patient_user_id,
                procedure: event.procedure,
                doctor_user_id: event.doctor_user_id,
                type: event.type,
                description: event.description,
                select_location: event.location_id,
                status_id: event.status_id,
                letter_id: event.letter_id
              },

            };
          });

          // Fetch calendar notes from another endpoint
          $.ajax({
            url: baseurl + '/private-clinic/appointment/calendar-notes/list',
            type: 'GET',
            success: function (notesResult) {
              var notes = notesResult.data;

              // Process calendar notes
              var noteEvents = notes.map(function (note) {
                return {
                  title: note.notes,
                  start: note.start_date,
                  end: note.end_date,
                  allDay: true,
                  url: "calendar-notes/update/" + note.id,
                  extendedProps: {
                    calendar: 'note',
                    // Add any additional properties you need
                  }
                };
              });

              // Combine appointment and note events
              var allEvents = appointmentEvents.concat(noteEvents);

              var selectedEvents = allEvents.filter(function (event) {
                var calendar = event.extendedProps.calendar.toLowerCase();
                return calendars.includes(calendar) || calendar === 'note';
              });

              // Call successCallback with the combined events
              successCallback(selectedEvents);
            },
            error: function (error) {
              console.log(error);
            }
          });
        },
        error: function (error) {
          console.log(error);
        }
      });
    }

    else if (branch_id != 0 && doctor_id != 0) {
      initializeView();
      $.ajax({
        url: baseurl + '/private-clinic/appointment/get-appointment-by-Branch-and-Doctor/' + branch_id + '/' + doctor_id,
        type: 'GET',
        success: function (result) {
          var calendars = selectedCalendars();
          var events = result.data;
          var firstname;
          var appointmentEvents = events.map(function (event) {
            if (event.patientDetails && typeof event.patientDetails === 'object') {
              firstname = event.patientDetails.firstname + " " + event.patientDetails.lastname;
            }
            return {
              id: event.id,
              title: firstname,
              start: event.start,
              end: event.end,
              firstname: firstname,
              extendedProps: {
                calendar: event.type,
                patient_user_id: event.patient_user_id,
                procedure: event.procedure,
                doctor_user_id: event.doctor_user_id,
                type: event.type,
                description: event.description,
                select_location: event.location_id,
                status_id: event.status_id,
                letter_id: event.letter_id,
              },

            };
          });

          // Fetch calendar notes from another endpoint
          $.ajax({
            url: baseurl + '/private-clinic/appointment/calendar-notes/get-CalendarNotes-by-Branch/' + branch_id,
            type: 'GET',
            success: function (notesResult) {
              var notes = notesResult.data;

              // Process calendar notes
              var noteEvents = notes.map(function (note) {
                return {
                  title: note.notes,
                  start: note.start_date,
                  end: note.end_date,
                  allDay: true,
                  url: "calendar-notes/update/" + note.id,
                  extendedProps: {
                    calendar: 'note',
                    // Add any additional properties you need
                  }
                };
              });

              // Combine appointment and note events
              var allEvents = appointmentEvents.concat(noteEvents);
              // Filter events based on selected calendars
              var selectedEvents = allEvents.filter(function (event) {
                var calendar = event.extendedProps.calendar.toLowerCase();
                return calendars.includes(calendar) || calendar === 'note';
              });

              // Call successCallback with the combined events
              successCallback(selectedEvents);
            },
            error: function (error) {
              console.log(error);
            }
          });
        },
        error: function (error) {
          console.log(error);
        }
      });
    }
  }



  $('#location_ids').change(function () {
    var info = {};
    fetchEvents(info, function (events) {
      calendar.refetchEvents();
    });
  });

  $('#doctor_user_id').change(function () {
    var info = {};
    fetchEvents(info, function (events) {
      calendar.refetchEvents();
    });
  });


  var currentYear = new Date().getFullYear();

  // Calendar plugins
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    events: fetchEvents,
    editable: true,
    dragScroll: true,
    dayMaxEvents: 0,

    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: false,
      hour12: false
    },
    moreLinkContent: function (args) {
      count = args.num;
      if (count == 1) {
        return + count + ' Appointment';
      } else {
        return + count + ' Appointments';
      }
    },
    eventDidMount: function (info) {
      var event = info.event;
      // Check if the event is a note event
      if (event.extendedProps.calendar === 'note') {
        // Set the text color of note events
        info.el.style.color = 'blue';
        info.el.style.borderColor = 'white';
        info.el.style.backgroundColor = 'lightgray';
      }
    },
    eventResizableFromStart: true,
    headerToolbar: {
      start: 'prevDay,nextDay',
      center: '',
      end: 'today,dayGridMonth,dayView' //timeGridWeek,
    },

    customButtons: {
      prevYear1: {
        text: '',
        click: function () {
          calendar.prevYear();
        }
      },
      nextYear1: {
        text: '',
        click: function () {
          calendar.nextYear();
        }
      },
      nextDay: {
        text: 'Next Day',
        click: function () {
          handleDayNavigation(1);
        }
      },
      prevDay: {
        text: 'Prev Day',
        click: function () {
          handleDayNavigation(-1);
        }
      },
      today: {
        text: 'Today',
        click: function () {
          $('.select_month').trigger('reset');
          $('.select_year').trigger('reset');
          selectMonth.val(new Date().getMonth() + 1).trigger('change');
          selectYear.val(new Date().getFullYear()).trigger('change');
          updateCalendar();
        }
      },
      dayView: {
        type: 'dayGrid',
        text: 'Day View',
        click: function () {
          $(".fc-view-harness").find("div").remove();
          $(".fc-dayGridMonth-view").find("div").remove();
          $(".fc-view-harness").css({
            'overflow-y': 'scroll',
            'display': 'hidden'
          });
          handleDayViewButtonClick();
        }
      },
    },
    direction: direction,
    initialDate: new Date(),
    eventClassNames: function ({ event: calendarEvent }) {
      const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar];
      return [
        'bg-light-' + colorName
      ];
    },
    dateClick: function (info) {
      var isoDate = moment(info.date).toISOString();
      var clickedDate = moment(info.date).format('DD-MM-YYYY');
      if (info.jsEvent && $(info.jsEvent.target).hasClass('fc-daygrid-day-number')) {
        info.jsEvent.preventDefault();
        handleDayViewButtonClick(clickedDate);
        return;
      }
      var calendarView = calendar.view.type;
      if (calendarView === 'dayView') {
        var clickedTime = moment(info.date).format('HH:mm');
        var clickedDate = moment(info.date).format('DD-MM-YYYY');
        $('#start').val(date);
        $('#start-time').val(clickedTime);
        // $('#add-new-sidebar').modal('show');
        handleDayViewButtonClick(clickedDate);
      }
      else if (calendarView === 'dayGridMonth') {
        var viewValue = getUrlParameter('view');
        var dateValue = getUrlParameter('Date');
        if (viewValue == "Yes") {
          clickedDate = dateValue;
          $.ajax({
            url: baseurl + '/private-clinic/appointment/dayview',
            type: 'GET',
            dataType: 'html',
            data: {
              clickedTime: clickedDate
            },

            success: function (response) {
              $('.fc-view-harness').html(response);
              $('.fc-prev-button').hide();
              $('.fc-next-button').hide();
              $('.fc-prevYear1-button').hide();
              $('.fc-nextYear1-button').hide();
              $('.fc-toolbar-title').hide();
              sidebar.modal('hide');
            },
            error: function (xhr, status, error) {
              console.error(xhr.responseText);
            }
          });
        }
        else {
          var date = moment(info.date).format('DD-MM-YYYY');
          sidebar.modal('show');
          addEventBtn.removeClass('d-none');
          updateEventBtn.addClass('d-none');
          btnDeleteEvent.addClass('d-none');
          $("#start").val(date);
          $("#end").val(date);
        }
      }
    },
    eventClick: function (info) {
      eventClick(info);
    },
    datesSet: function () {
      modifyToggler();
      initializeView();
    },
    viewDidMount: function () {
      modifyToggler();
    }
  });

  function handleDayNavigation(offset) {
    var currentDate = moment($('#clickedDateAndTime').val(), 'DD-MM-YYYY');
    const newDate = moment(currentDate).add(offset, 'days');
    const dateStr = newDate.format('DD-MM-YYYY');
    $('.fc-view-harness, .fc-dayGridMonth-view').find('div').remove();
    handleDayViewButtonClick(dateStr);
  }

  var selectMonth = $('<select class="select_month select2 mb-2"><option value="">Select Month</option><option value="1">January</option><option value="2">February</option><option value="3">March</option><option value="4">April</option><option value="5">May</option><option value="6">June</option><option value="7">July</option><option value="8">August</option><option value="9">September</option><option value="10">October</option><option value="11">November</option><option value="12">December</option></select>');
  $('.fc-month').append(selectMonth);

  var selectYear = $('<select class="select_year select2"><option value="">Select Year</option></select>');
  var currentYear = new Date().getFullYear();
  for (var i = currentYear - 5; i <= currentYear + 5; i++) {
    selectYear.append('<option value="' + i + '">' + i + '</option>');
  }
  $('.fc-year').append(selectYear);

  var selectDay = $('<select class="select_day select2 mb-2"><option value="">Select Day</option></select>');
  for (var i = 1; i <= 30; i++) {
    selectDay.append('<option value="' + i + '">' + i + '</option>');
  }
  $('.fc-day').append(selectDay);

  $('.select_month, .select_year, .select_day').select2();

  // Set default month, year, and day
  var currentDate = new Date();
  var defaultMonth = currentDate.getMonth() + 1;
  var defaultYear = currentYear;
  var defaultDay = currentDate.getDate();

  selectMonth.val(defaultMonth).trigger('change');
  selectYear.val(defaultYear).trigger('change');
  selectDay.val(defaultDay).trigger('change');

  // Function to update the calendar view based on selected date
  function updateCalendar() {
    var selectedMonth = selectMonth.val();
    var selectedYear = selectYear.val();
    var selectedDay = selectDay.val();

    if (selectedMonth && selectedYear) {
      var selectedDate = new Date(selectedYear, selectedMonth - 1, 1);
      calendar.changeView('dayGridMonth');
      calendar.gotoDate(selectedDate);
    } else if (selectedDay) {
      var selectedDate = new Date(selectedYear, selectedMonth - 1, selectedDay);
      var clickedDay = moment(selectedDate).format('DD-MM-YYYY');
      handleDayViewButtonClick(clickedDay);
    }

  }


  // Trigger calendar update on date changes
  selectMonth.on('change', updateCalendar);
  selectYear.on('change', updateCalendar);
  selectDay.on('change', updateCalendar);

  // Handle next and previous button clicks (as before)
  $('.fc-next-button').on('click', function () {
    var currentTitle = $('.fc-toolbar-title').text();
    var currentYear = parseInt(currentTitle.split(' ')[1]);
    var currentMonth = parseInt(currentTitle.split(' ')[0].slice(-2));
    var nextMonth = currentMonth + 1;
    if (nextMonth > 12) {
      nextMonth = 1;
      currentYear += 1;
    }
    selectMonth.val(nextMonth).trigger('change');
    selectYear.val(currentYear).trigger('change');
  });

  $('.fc-prev-button').on('click', function () {
    var currentTitle = $('.fc-toolbar-title').text();
    var currentYear = parseInt(currentTitle.split(' ')[1]);
    var currentMonth = parseInt(currentTitle.split(' ')[0].slice(-2));
    var previousMonth = currentMonth - 1;
    if (previousMonth < 1) {
      previousMonth = 12;
      currentYear -= 1;
    }
    selectMonth.val(previousMonth).trigger('change');
    selectYear.val(currentYear).trigger('change');
  });


  $(document).on('click', '.fc-dayGridMonth-button', function () {
    // $('.select_day').trigger('reset');
    location.reload();
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1;
    var currentYear = currentDate.getFullYear();
    selectMonth.val(currentMonth).trigger('change');
    selectYear.val(currentYear).trigger('change');
    // selectDay.val(currentDay).trigger('change');
    calendar.changeView('dayGridMonth', { month: currentMonth - 1 });
    calendar.gotoDate(currentDate);

    // var url = window.location.protocol + "//" + window.location.host + window.location.pathname;
    // window.history.replaceState({ path: url }, '', url);
  });


  function handleDayViewButtonClick(dateStr) {
    $('.fc-dayView-button').addClass('fc-button-active');
    $('.fc-dayGridMonth-button').removeClass('fc-button-active');
    var date = dateStr ? dateStr : moment(dateStr).format('DD-MM-YYYY');
    $.ajax({
      url: baseurl + '/private-clinic/appointment/dayview',
      type: 'GET',
      dataType: 'html',
      data: {
        clickedTime: date
      },
      success: function (response) {
        $('.fc-view-harness').html(response);
        $('.fc-prev-button, .fc-next-button, .fc-prevYear1-button, .fc-nextYear1-button, .fc-toolbar-title').hide();
        $('.fc-prevDay-button, .fc-nextDay-button').show();
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      }
    });
  };
  // Render calendar
  calendar.render();

  // Modify sidebar toggler
  modifyToggler();
  // updateEventClass();
  setTimeout(() => {
    var viewValue = getUrlParameter('view');
    var dateValue = getUrlParameter('Date');
    if (viewValue == "Yes") {
      calendar.view.type == "dayGrid";
      var calendarView = calendar.view.type;
    }
  }, 1500);

  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }
  // Validate add new and update form
  if (eventForm.length) {
    // Get the current date
    const currentDate = new Date();

    // Extract year, month, and day components
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');

    // Create the formatted date string in yyyy-mm-dd format
    const formattedDate = `${day}-${month}-${year}`;
    eventForm.validate({
      submitHandler: function (form, event) {
        event.preventDefault();
        if (eventForm.valid()) {
          sidebar.modal('hide');
        }
      },
      title: {
        required: false
      },
      rules: {
        'start': { required: true },
        'start-time': { required: true },
        'end': { required: true },
        'procedure_ids': { required: true },
        'doctor_user_id': { required: true },
        'status_id': { required: false },
        'type': { required: true },
        'letter_id': { required: false }

      },
      messages: {
        'start': { required: 'Start Date is required' },
        'start-time': { required: 'Start Time is required' },
        'type': { required: 'Type is required' },
        'end': { required: 'End Date is required' },
        'procedure_ids': { required: 'Procedure is required' },
        'doctor_user_id': { required: 'Doctor is required' },
        'status_id': { required: 'Status is required' },
        'letter_id': { required: 'letter is required' }
      }
    });
  }

  // Sidebar Toggle Btn
  if (toggleSidebarBtn.length) {
    toggleSidebarBtn.on('click', function () {
      cancelBtn.removeClass('d-none');
    });
  }

  // ------------------------------------------------
  // addEvent
  // ------------------------------------------------
  // function addEvent(eventData) {
  //   calendar.addEvent(eventData);
  //   calendar.refetchEvents();
  // }

  // ------------------------------------------------
  // updateEvent
  // ------------------------------------------------
  function updateEvent(eventData) {
    var propsToUpdate = ['id', 'title', 'description', 'calendar', 'patient_user_id', 'doctor', 'start', 'end', 'status_id', 'letter_id', 'select_location'];
    var extendedPropsToUpdate = ['calendar', 'patient_user_id', 'doctor', 'description', 'status_id', 'letter_id', 'select_location'];

    updateEventInCalendar(eventData, propsToUpdate, extendedPropsToUpdate);
  }

  // ------------------------------------------------
  // removeEvent
  // ------------------------------------------------
  function removeEvent(eventId) {
    removeEventInCalendar(eventId);
  }

  // ------------------------------------------------
  // (UI) updateEventInCalendar
  // ------------------------------------------------
  const updateEventInCalendar = (updatedEventData, propsToUpdate, extendedPropsToUpdate) => {
    //calendar.refetchEvents();
    $.ajax({
      url: baseurl + '/private-clinic/appointment/put-request',
      type: 'PUT',
      data: updatedEventData,
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success: function (result) {
        var date = result.data.start;
        var formattedDate = moment(date).format('DD-MM-YYYY');
        var dayview = $("#dayview").val() || 0;
        if (result.status === 'success') {
          Swal.fire({
            title: 'Appointment Updated successfully! ',
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
                window.location.href = baseurl + '/private-clinic/appointment/print/' + updatedEventData.patient_user_id + '/' + updatedEventData.id + '/' + dayview;
              }
              else if (result.dismiss === Swal.DismissReason.cancel) {
                if (dayview == 1) {
                  window.location.href = baseurl + '?view=Yes&Date=' + formattedDate;
                }
                else {
                  calendar.refetchEvents();
                }
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
  };

  function generateVisit(data) {
    $.ajax({
      url: assetPath + 'private-clinic/appointment/generate-visit/' + data.id,
      method: 'post',
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success: function (response) {
        if (response.status == 'success') {
          var patientVisitId = response.patient_visit_id;
          var page = 'progress';
          window.location.href = assetPath + 'private-clinic/appointment/calendar-view'; // Changes Suggested By Sir Talha
          // window.location.href = assetPath + 'private-clinic/appointment/progress-receipt/' + patientVisitId + '/' + page;
        } else {
          // Handle the error case
          Swal.fire({
            title: response.status,
            text: response.message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      },
      error: function (xhr, status, error) {
        Swal.fire({
          title: 'error',
          text: error,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  // ------------------------------------------------
  // (UI) removeEventInCalendar
  // ------------------------------------------------
  function removeEventInCalendar(eventId) {
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
        // User clicked 'Yes', proceed with deletion
        $.ajax({
          url: baseurl + '/private-clinic/appointment/delete-request/' + eventId,
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
              calendar.refetchEvents();
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
        // User clicked 'No', do nothing
        Swal.fire(
          'Cancelled',
          'The appointment is safe :)',
          'error'
        );
        calendar.refetchEvents();
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


  // Add new event
  $(addEventBtn).on('click', function () {

    //this function used when you create appointment wihtout accept the permission of multi appointments on same time.
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
      // console.log(doctor.val());return;

      var newEvent = {
        title: $("#title").val(),
        location_id: location_id_apt,
        branch_id: location_id_apt,
        status_id: $("#status_id").val(),
        letter_id: $("#letter_id").val(),
        start: $("#start").val() + ' ' + $("#start-time").val(),
        starttime: $("#start-time").val(),
        end: calculateEndDateTime(),
        patient_user_id: patient_user_id.val(),
        procedure: procedure_ids.val(),
        doctor_user_id: doctor.val(),
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
            var dayview = $("#dayview").val() || 0;
            var startDates = moment(result.data.start).format('DD-MM-YYYY');
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
                    window.location.href = baseurl + '/private-clinic/appointment/print/' + patientId + '/' + Id + '/' + dayview;
                  }
                  else if (result.dismiss === Swal.DismissReason.cancel) {
                    if (dayview) {
                      window.location.assign(baseurl + '/private-clinic/appointment/calendar-view?view=Yes&Date=' + startDates);
                    }
                    else {
                      window.location.href = baseurl + '/private-clinic/appointment/calendar-view';
                    }
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

  appointment = null,
    document.addEventListener('sendData', function (event) {
      appointment = event.detail.appointmentdata;
    });

  updateEventBtn.on('click', function () {
    if (eventForm.valid()) {
      var eventData = {
        id: appointment ? appointment.id : eventToUpdate.id,
        title: sidebar.find(title).val(),
        start: $("#start").val() + ' ' + $("#start-time").val(),
        end: calculateEndDateTime(),
        patient_user_id: patient_user_id.val(),
        procedure: procedure_ids.val(),
        doctor_user_id: doctor.val(),
        type: type.val(),
        location_id: $("#location_id_apt").val(),
        status_id: $("#status_id").val(),
        letter_id: $("#letter_id").val(),
        description: description.val(),
        display: 'block'
      };
      updateEvent(eventData);
      sidebar.modal('hide');
      resetValues();
    }
  });

  // Reset sidebar input values
  function resetValues() {
    $('#end').val('');
    $('#start').val('');
    $('#title').val('');
    location_id.val('').trigger('change');

    $('#status_id').val('');
    patient_user_id.val('').trigger('change');
    description.val('');
  }

  // When modal hides reset input values
  sidebar.on('hidden.bs.modal', function () {
    resetValues();
  });

  // Hide left sidebar if the right sidebar is open
  $('.btn-toggle-sidebar').on('click', function () {
    btnDeleteEvent.addClass('d-none');
    updateEventBtn.addClass('d-none');
    addEventBtn.removeClass('d-none');
    $('.app-calendar-sidebar, .body-content-overlay').removeClass('show');
  });

  // Select all & filter functionality
  if (selectAll.length) {
    selectAll.on('change', function () {
      var $this = $(this);

      if ($this.prop('checked')) {
        calEventFilter.find('input').prop('checked', true);
      } else {
        calEventFilter.find('input').prop('checked', false);
      }
      calendar.refetchEvents();
    });
  }

  if (filterInput.length) {
    filterInput.on('change', function () {
      $('.input-filter:checked').length < calEventFilter.find('input').length
        ? selectAll.prop('checked', false)
        : selectAll.prop('checked', true);
      calendar.refetchEvents();
    });
  }

  //chatgpt start
  $("#patient_user_id").on('change', function () {
    if (!isEditMode) {
      return;
    }
    let selectedOption = $(this).find("option:selected");
    var patient_type_id = selectedOption.data('patient_type_id');
    $('#procedure_ids').empty();
    $('#procedure_ids').trigger("change");
    if (patient_type_id) {
      $.ajax({
        url: baseurl + '/procedures/get-procedure-by-patient-type/' + patient_type_id,
        type: 'get',
        success: function (response) {
          //var selectBox = $("#procedure");
          $.each(response.procedures, function (index, value) {
            procedure_ids.append("<option value='" + value.id + "' data-price_id='" + value.procedure_price_id + "' data-procedure_name='" + value.name + "'>" + value.name + "</option>");
          });
        },
        error: function (xhr, status, error) {
          // Handle error response
          Swal.fire({
            title: response.status,
            text: response.message,
            confirmButtonText: 'OK'
          });
        }
      });

      if (fetchedAppointmentData != undefined && fetchedAppointmentData.extendedProps.procedure !== undefined) {
        setTimeout(function () {
          var selectedProcedure = $.parseJSON(fetchedAppointmentData.extendedProps.procedure);
          $('#procedure_ids').val(selectedProcedure).trigger('change');
        }, 1000);
      }
      return true;
    }
  });
  //chatgpt end


  function updateTitle() {
    var selectedProcedures = $('#procedure_ids').select2('data');
    var titleText = '';

    for (var i = 0; i < selectedProcedures.length; i++) {
      titleText += selectedProcedures[i].text;
      if (i < selectedProcedures.length - 1) {
        titleText += ', '; // Add a comma and space between procedure names
      }
    }

    $('#title').val(titleText);
  }

});



