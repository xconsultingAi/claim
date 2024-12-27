// Add new role Modal JS
//------------------------------------------------------------------
(function () {
    var claimModal = $('#claimModal');
    var baseurl = window.location.origin;
    
    var assetPath = '../../../app-assets/';
    // add role form validation
    if (claimModal.length) {
      claimModal.validate({
        rules: {
          name: {
            required: true
          }
        },
        submitHandler: function (form) {
          var formData = $(form).serialize(); // Get the form data
  
          var claimId = $('#claimId').val(); // Get the Role ID (if exists)
  
          // Determine the URL based on whether it's an update or create operation
          var url = claimId ? '/claim/' + claimId : '/claim';
          var method = claimId ? 'PUT' : 'POST'; // Use PUT for update, POST for create

          $.ajax({
            url: url,
            method: method,
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
                  confirmButtonText: 'OK',
                  customClass: {
                    confirmButton: 'btn-primary', // Custom class for the button
                }
                }).then(function (result) {
                  $('#claimModal').find('form')[0].reset();
                  $('#claimModal').modal('hide');
                  window.location.href = baseurl + '/roles';
                });
                  
              }else{
                Swal.fire({
                  title: response.status,
                  text: response.message,
                  icon: response.status,
                  confirmButtonText: 'OK',
                  customClass: {
                    confirmButton: 'btn-primary', // Custom class for the button
                }
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
                confirmButtonText: 'OK',
                customClass: {
                  confirmButton: 'btn-primary', // Custom class for the button
              }
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
  
    // Select All checkbox click
  
    $(document).on('click', '#selectAll', function() {
      // Check if the checkbox with ID 'myCheckbox' is checked
      if ($('#selectAll').prop('checked')) {
        console.log('Checkbox is checked!');
        $('.singleSelect').prop('checked', true);
      } else {
        console.log('Checkbox is not checked.');
        $('.singleSelect').prop('checked', false);
  
      }
    });
  
    $(document).on('click', '.singleSelect', function() {
      var totalCheckboxes = $('.singleSelect').length;
      var checkedCount = $('.singleSelect:checked').length;
      var uncheckedCount = totalCheckboxes - checkedCount;
      if(uncheckedCount == 0){
        $('#selectAll').prop('checked', true);
      }else{
        $('#selectAll').prop('checked', false);
      }
    });
  
    $(document).on('click', '.add-new-role', function(){
      fetch('/roles/create')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Do something with the response data
        $('#permissions_table').empty();
        $('#permissions_table').append(data.data);
      })
      .catch(error => {
        // Handle error responses
        console.error('Error:', error.message);
      });
    })

    $(document).on('click', '.submit-record', function(){
      var claimId = $(this).attr('data-claimId');
      var claimName = $(this).attr('data-claimName');
      $('#claimId').val(claimId);
      $('#modalClaimName').val(claimName);
      fetch(`/claims/${claimId}/edit`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data.data);
        
        // Do something with the response data
        $('#permissions_table').empty();
        $('#permissions_table').append(data.data);
      })
      .catch(error => {
        // Handle error responses
        console.error('Error:', error.message);
      });
    })

    $(document).on('click', '.role-delete', function() {
      var roleId = $(this).attr('data-roleId');
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to delete this role!",
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
            url: baseurl + '/roles/delete/'+ roleId,
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
              Swal.fire({
                title: 'error',
                text: error,
                icon: 'error',
                confirmButtonText: 'OK'
              });
            }
          });
        }
      });
    return;
    });
    
  })();
  