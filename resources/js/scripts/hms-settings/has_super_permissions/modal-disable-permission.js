$(function () {
    ('use strict');
    var editPermissionForm = $('#disablePermissionForm');
    var baseurl = window.location.origin;
  
    // jQuery Validation
    // --------------------------------------------------------------------
    if (editPermissionForm.length) {
      editPermissionForm.validate({
        // rules: {
        //   name: {
        //     required: true
        //   }
        // },
        submitHandler: function (form) {
          var formData = $(form).serialize(); // Get the form data
  
          var permissionId = $('#permissionId').val(); // Get the permission ID (if exists)
          $.ajax({
            url: '/has-permission/disable/' + permissionId,
            type: 'DELETE',
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
                  $('#disablePermissionModal').find('form')[0].reset();
                  $('#disablePermissionModal').modal('hide');
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
  
    $(document).on('click', '.disable-permission', function(){
      var name = $(this).data('name');
      var id = $(this).attr('data-id');
      $('#disablePermissionName').val(name);
      $('#permissionId').val(id);
    })
  });
  