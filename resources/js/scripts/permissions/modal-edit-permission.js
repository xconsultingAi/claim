$(function () {
  ('use strict');
  var editPermissionForm = $('#editPermissionForm');
  var baseurl = window.location.origin;

  // jQuery Validation
  // --------------------------------------------------------------------
  if (editPermissionForm.length) {
    editPermissionForm.validate({
      rules: {
        name: {
          required: true
        }
      },
      submitHandler: function (form) {
        var formData = $(form).serialize(); // Get the form data

        var permissionId = $('#permissionId').val(); // Get the permission ID (if exists)
        $.ajax({
          url: '/permissions/' + permissionId,
          method: 'PUT',
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
                $('#editPermissionModal').find('form')[0].reset();
                $('#editPermissionModal').modal('hide');
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

  $(document).on('click', '.edit-permission', function(){
    var name = $(this).data('name');
    var id = $(this).attr('data-id');
    $('#editPermissionName').val(name);
    $('#permissionId').val(id);
  })

  $(document).on('click', '.delete-record', function() {
    var id = $(this).attr('data-id');
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this permission! By editing the permission name, you might break the system permissions functionality. Please ensure you're absolutely certain before proceeding.",
      type: 'warning',
      icon: 'warning',
      showCancelButton: !0,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn btn-danger ms-1',
      buttonsStyling: !1
    }).then(function (result) {
      if (result.isConfirmed) {
        $.ajax({
          url: baseurl + '/permissions/delete/'+ id,
          method: 'DELETE',
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          success: function (response) {
            if (response.status == 'success') {
              Swal.fire({
                title: response.status,
                text: response.message,
                icon: response.status,
                confirmButtonText: 'OK'
              }).then(function (result) {
                location.reload();
              });
            } else {
              Swal.fire({
                title: response.status,
                text: response.message,
                icon: 'success',
                confirmButtonText: 'OK'
              });
            }
            
          },
          error: function (xhr, status, error) {
            console.log(xhr, status, error);
            Swal.fire({
              title: 'failed',
              text: xhr.responseJSON.message,
              icon: 'error',
              confirmButtonText: 'OK'
            }).then(function (result) {
              location.reload();
            });
          }
        });
      }
    });
  return;
  });
});
