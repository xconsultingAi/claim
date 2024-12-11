$(function () {
    'use strict';
    var baseurl = window.location.origin;
    var assetPath = '../../../app-assets/';
    var isDoctor = true;
    var isSecretary = false;
    var selectedNoteId = null;
    var newNoteCounter = 0;

    // Function to fetch sticky notes from the server
    function fetchNotes(containerId, slug_name) {
        var route = '/private-clinic/stick-notes/list/' + slug_name;
        var url = baseurl + route;

        $.ajax({
            url: url,
            method: 'GET',
            success: function(response) {
                if (response.status === 'success') {
                    
                    var notesContainer = $('#' + containerId);
                    notesContainer.empty(); // Clear the existing notes

                    response.data.forEach(function(note) {
                        var noteDiv = $(` 
                            <div class="note d-flex align-items-center mx-5 py-50 rounded note-row ${note.status === 'in_active' ? 'bg-danger' : ''}">
                                <input type="hidden" name="id" value="${note.id}">
                                <input type="checkbox" class="form-check-input me-2" ${note.status === 'in_active' ? 'checked' : ''}>
                                <input type="text" name="description" value="${note.description}" placeholder="${note.slug_name}" class="form-control me-auto custom-input" style="font-size: 12px;">
                                <button class="btn-close"></button>
                            </div>
                        `);

                        // Toggle background color on checkbox change
                        noteDiv.find('input[type="checkbox"]').on('change', function() {
                            var noteId = $(this).closest('.note').find('input[name="id"]').val();
                            var description = $(this).closest('.note').find('input[name="description"]').val();
                            var isChecked = $(this).prop('checked');

                            // Toggle class for red background
                            $(this).closest('.note').toggleClass('bg-danger', isChecked);
                            updateNoteStatus(noteId, description, isChecked);
                        });

                        // Handle note deletion
                        noteDiv.find('.btn-close').on('click', function() {
                            var noteId = $(this).closest('.note').find('input[name="id"]').val();
                            $(this).closest('.note').remove();
                            DeleteNote(noteId);
                        });

                        noteDiv.find('input[name="description"]').on('focusin', function() {
                            selectedNoteId = $(this).closest('.note').find('input[name="id"]').val();
                            // console.log('Selected Note ID:', selectedNoteId);
                            // var noteId = $(this).closest('.note').find('input[name="id"]').val();
                            // var description = $(this).val();
                            // updateNoteDescription(noteId, description); // Call the function to update the description
                        });

                        noteDiv.find('input[name="description"]').on('keyup', function(e) {
                            if (e.key === 'Enter' || e.keyCode === 13) {
                                var noteId = $(this).closest('.note').find('input[name="id"]').val();
                                var description = $(this).val();
                                updateNoteDescription(noteId, description); // Call the function to update the description
                            }
                        });


                        notesContainer.prepend(noteDiv);
                    });
                }
            },
            error: function(xhr, status, error) {
                console.error(error);
                Swal.fire({
                    title: error.status,
                    text: error.statusText,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    }

    // Event listeners for tab changes
    $('#doctor-tab').on('shown.bs.tab', function () {
        console.log("Doctor tab selected");
        isDoctor = true;
        isSecretary = false;
        fetchNotes('doctorNotesContainer', 'Doctor');
    });

    $('#secretary-tab').on('shown.bs.tab', function () {
        // console.log("Secretary tab selected");
        isDoctor = false;
        isSecretary = true;
        fetchNotes('secretaryNotesContainer', 'Secretary');
    });


    // Function to handle adding new notes
    function addNoteHandler(containerId, noteType) {
        var notesContainer = $('#' + containerId);

        var noteDiv = $(` 
            <div class="note d-flex align-items-center mx-5 py-50 rounded note-row">
                <input type="hidden" name="id" value="">
                <input type="checkbox" class="form-check-input me-2">
                <input type="text" placeholder="${noteType}" class="form-control me-auto custom-input" style="font-size: 12px;">
                <button class="btn-close"></button>
            </div>
        `);

        // Toggle background color on checkbox change
        noteDiv.find('input[type="checkbox"]').on('change', function() {
            $(this).closest('.note').toggleClass('bg-danger', this.checked);
        });

        noteDiv.find('.btn-close').on('click', function() {
            $(this).closest('.note').remove();
        });

        notesContainer.prepend(noteDiv);
    }

    $('#addNoteBtnDoctor').on('click', function() {
        addNoteHandler('doctorNotesContainer', 'Doctor');
    });

    $('#addNoteBtnSecretary').on('click', function() {
        addNoteHandler('secretaryNotesContainer', 'Secretary');
    });

    // Handle note deletion
    function DeleteNote(noteId) {
        $.ajax({
            url: baseurl + '/private-clinic/stick-notes/delete/' + noteId,
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function(response) {
                if (response.status === 'success') {
                    Swal.fire({
                        title: response.status,
                        text: 'Note Deleted successfully',
                        icon: response.status,
                        showConfirmButton: false,
                        timer: 800
                    });
                } else {
                    console.error('Failed to delete note:', response.message);
                    Swal.fire({
                        title: 'Error',
                        text: response.message,
                        icon: response.status,
                        confirmButtonText: 'OK'
                    });
                }
            },
            error: function(xhr, status, error) {
                console.error('Error occurred:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to delete note.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    }
    function updateNoteDescription(noteId, description) {
        var route = '/private-clinic/stick-notes/update-description';
        var url = baseurl + route;

        var data = {
            id: noteId,
            description: description,
            _token: $('meta[name="csrf-token"]').attr('content')
        };

        $.ajax({
            url: url,
            method: 'PUT',
            data: JSON.stringify(data),
            contentType: 'application/json',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function(response) {
                if (response.status === 'success') {
                    Swal.fire({
                        title: 'Success',
                        text: 'Note description updated successfully',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 800
                    });
                } else {
                    console.error('Failed to update note description:', response.message);
                    Swal.fire({
                        title: 'Error',
                        text: response.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            },
            error: function(xhr, status, error) {
                console.error('Error occurred:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to update note description.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    }
    // Update note status function
    function updateNoteStatus(noteId, description, isChecked) {
        var status = isChecked ? 'in_active' : 'active';
        var route = '/private-clinic/stick-notes/';
        var url = baseurl + route;
        var data = {
            id: noteId,
            status: status,
            description: description,
            _token: $('meta[name="csrf-token"]').attr('content')
        };

        $.ajax({
            url: url,
            method: 'PUT',
            data: JSON.stringify(data),
            contentType: 'application/json',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function(response) {
                if (response.status === 'success') {
                    Swal.fire({
                        title: response.status,
                        text: 'Note Status Updated Successfully',
                        icon: response.status,
                        showConfirmButton: false,
                        timer: 800
                    });
                } else {
                    console.error('Failed to update note status:', response.message);
                    Swal.fire({
                        title: 'Error',
                        text: response.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            },
            error: function(xhr, status, error) {
                console.error('Error occurred:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to update note status.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    }



    $('#saveBtn').on('click', function() {
        var saveButton = $(this);
        saveButton.prop('disabled', true);
        
    
        var formData = new FormData();
        var noteRows = $('.tab-pane.active .note-row');
        var hasNewNotes = false;
    
        noteRows.each(function(index, noteRow) {
            var noteId = $(noteRow).find('input[name="id"]').val(); // This will be empty for new notes
            var checkboxValue = $(noteRow).find('input[type="checkbox"]').prop('checked');
            var customInputValue = $(noteRow).find('.custom-input').val();
            var customInputPlaceholder = $(noteRow).find('.custom-input').attr('placeholder');
            var status = checkboxValue ? 'in_active' : 'active';
    
            if (!noteId || noteId.startsWith('new_')) {
                hasNewNotes = true;
                 if (!noteId) {
                    noteId = `new_${newNoteCounter++}`;  // Assign a temporary ID
                    $(noteRow).find('input[name="id"]').val(noteId);
                }
                formData.append(`notes[${index}][id]`, noteId);
                formData.append(`notes[${index}][status]`, status);
                formData.append(`notes[${index}][description]`, customInputValue);
                formData.append(`notes[${index}][slug_name]`, customInputPlaceholder);
            } else {
                if (noteId == selectedNoteId) {
                    saveButton.prop('disabled', true);
                    var description = $(noteRow).find('input[name="description"]').val();
                    updateNoteDescription(noteId, description);
                }
        }
        });
    
        if (hasNewNotes) {
            var route = '/private-clinic/stick-notes/store';
            var url = baseurl + route;
            var method = 'POST';
    
            $.ajax({
                url: url,
                method: method,
                data: formData,
                processData: false,
                contentType: false,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function(response) {
                    if (response.status === 'success') {
                        noteRows.each(function(index, noteRow) {
                            var noteId = $(noteRow).find('input[name="id"]').val();
                            
                            if (!noteId && response.data && response.data[index]) {
                                $(noteRow).find('input[name="id"]').val(response.data[index].id);
                            }
                        });
    
                        Swal.fire({
                            title: response.status,
                            text: 'Notes saved successfully',
                            icon: response.status,
                            showConfirmButton: false,
                            timer: 500
                        });
                        location.reload();
                    } else {
                        console.error('Failed to save notes:', response.message);
                        Swal.fire({
                            title: 'Error',
                            text: response.message,
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                        
                    }

                    saveButton.prop('disabled', false);
                },
                error: function(xhr, status, error) {
                    console.error('Error occurred:', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed to save notes.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    saveButton.prop('disabled', false);
                }
            });
        } else {
            if(selectedNoteId === null)
            {
                Swal.fire({
                    title: 'No New Notes',
                    text: 'There are no new notes to save.',
                    icon: 'info',
                    // confirmButtonText: 'OK'
                    showConfirmButton: false,
                    timer: 800
                });
            }
            saveButton.prop('disabled', false);
        }
        selectedNoteId = null;
    });

    fetchNotes('doctorNotesContainer', 'Doctor');
});
