$(function () {
  ('use strict');
  var addPermissionForm = $('#addPermissionForm');

  // jQuery Validation
  // --------------------------------------------------------------------
  if (addPermissionForm.length) {
    addPermissionForm.validate({
      rules: {
        name: {
          required: true
        }
      },
      submitHandler: function (form) {
        var formData = $(form).serialize(); // Get the form data
        $.ajax({
          url: '/permissions',
          method: 'POST',
          data: formData,
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          success: function (response) {
            console.log(response);
            // Handle the success response
            if (response.status == 'success') {
              Swal.fire({
                title: response.status,
                text: response.message,
                icon: response.status,
                confirmButtonText: 'OK'
              }).then(function (result) {
                $('#addPermissionModal').find('form')[0].reset();
                $('#addPermissionModal').modal('hide');
                window.location.reload();
              });
                
            }else{
              Swal.fire({
                title: response.status,
                text: response.message,
                icon: response.status,
                confirmButtonText: 'OK'
              });
            }
          },
          error: function (xhr, status, error) {
            // Handle the error response
            // Display an error message or perform any other error handling
            Swal.fire({
              title: 'failed',
              text: xhr.responseJSON.message,
              icon: 'error',
              confirmButtonText: 'OK'
            });

          }
        });

        return false; // Prevent the form from being submitted
      }
    });
  }

  // reset form on modal hidden
  $('.modal').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset();
  });
});
