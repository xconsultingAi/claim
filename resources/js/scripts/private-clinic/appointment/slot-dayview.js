function appointmentView() {

    console.log('This is all day View');
    $('.day-view-div').hide();
    $('.all-day-view').show();

    $('#add-appointment-modal-button').click(function () {
        $('.event-sidebar').modal('show');
    });

    // $(document).on('click', '#timeSlots tbody tr', function () {
    //     $('#add-new-sidebar').modal('show');
    // });

    $(document).on('click', '.edit-record', function (event) {
        const appointmentId = $(this).data('contact_id');
        $('#add-new-sidebar').modal('show');
        if (appointmentId) {
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
                        $('#start').val(moment(appointment.start).format('YYYY-MM-DD'));
                        $('#start-time').val(moment(appointment.start).format('HH:mm'));
                        $('#duration').val(appointment.duration).trigger('change');
                        $('#doctor_user_id').val(appointment.doctor_user_id).trigger('change');
                        $('#description').val(appointment.description);
                        $('#status_id').val(appointment.status_id).trigger('change');
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
    loadTimeSlots();

    function loadTimeSlots() {
        const startTimeInput = '12:15';
        const endTimeInput = '23:45';
        const interval = 15;
        generateTimeSlots(startTimeInput, endTimeInput, interval);
        saveTimeSlots(startTimeInput, endTimeInput, interval);
    }

    function generateTimeSlots(startTimeInput, endTimeInput, interval) {
        const timeSlotsTable = $('#timeSlots tbody');
        timeSlotsTable.empty();
        const startDate = new Date(`2024-01-01 ${'00:00'}`);
        const endDate = new Date(`2024-01-02 ${'00:00'}`);
        let currentTime = new Date(startDate);
        while (currentTime < endDate) {
            const timeString = currentTime.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit'
            });
            const row = $('<tr><td>' + timeString + '</td></tr>');
            timeSlotsTable.append(row);
            currentTime = new Date(currentTime.getTime() + interval * 60000);
        }
    }

    function saveTimeSlots(startTimeInput, endTimeInput, interval) {
        const timeSlotsTable = $('#timeSlots').html();
        localStorage.setItem('timeSlots', timeSlotsTable);
    }


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
                appendAppointmentsToTimeSlots(appointments);
            },
            error: function (xhr, status, error) {
                console.error('Error fetching appointment data:', error);
            }
        });
    }

    function appendAppointmentsToTimeSlots(appointments) {
        const timeSlotsTable = $('#timeSlots tbody');
        const timeSlotRows = {};
        $.each(appointments, function (index, appointment) {
            const appointmentTime = moment(appointment.start).format('LT');
            let row = timeSlotRows[appointmentTime];
            if (!row) {
                row = timeSlotsTable.find('td').filter(function () {
                    return $(this).text() === appointmentTime;
                }).closest('tr');
                timeSlotRows[appointmentTime] = row;
            }

            const appointmentRow = `
                <tr>
                    <td>${appointmentTime}</td>
                    <td><a href="/private-clinic/patient/profile-view/${appointment.patient_user_id}">${appointment.patient_first_name} ${appointment.patient_last_name}</a></td>
                    <td>${appointment.phone}</td>
                    <td>${appointment.title}</td>
                    <td>${appointment.display_name}</td>
                    <td>${appointment.description}</td>
                    <td>${appointment.status_name}</td>
                </tr>
            `;
            row.after(appointmentRow);
        });

        feather.replace(); // Reinitialize Feather icons
    }


}


