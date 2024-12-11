$(function () {
    ('use strict');
    var patientId = '16220'; // Replace with the actual patient ID
    var get_url = window.location.origin + '/private-clinic/patient/patient-Medical-History/getMedicalHistory/' + patientId;
    // Fetch data from Laravel controller
    $.ajax({
        url: get_url,
        method: 'GET',
        success: function (response) {
            
            var data = response.data;
            var userid = response.patientID;
            $('#family_History').val(data.family_history);
            $('#smoking_History').val(data.smoking_history);
            $('#Immunizations_History').val(data.Immun_history);
            $('#Allergies_History').val(data.Allergy_history);
            $('#patient_id').val(userid.user_id);
            //console.log(JSON.stringify(userid.user_id));
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });

    //Edit btn makes textareas enabled
    $('#edit').click(function(event) {
        event.preventDefault(); // Prevent the default behavior of the button click
        $('#save').css('display', 'block');
        $('#edit').css('display', 'none');
        $('#family_History, #smoking_History, #Immunizations_History, #Allergies_History').prop('disabled', false);
      });
});

