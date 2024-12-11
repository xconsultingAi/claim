/*=========================================================================================
  File Name: add-doctor-type.js
  Description: jquery bootstrap validation js
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: PIXINVENT
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

$(function () {
  'use strict';

  var jqForm = $('#jquery-val-form'),
    select = $('.select2');

  var pageIdentifier = $('#app').data('page');
  // console.log(pageIdentifier); return;

  // select2 initialization
  select.each(function () {
    var $this = $(this);
    $this.wrap('<div class="position-relative"></div>');
    $this.select2({
      placeholder: 'Select value',
      dropdownParent: $this.parent()
    }).change(function () {
      $(this).valid();
    });
  });

  // jQuery Validation
  if (jqForm.length) {
    jqForm.validate({
      rules: {
        'contact_type': {
          required: true
        },
        'firstname': {
          required: true
        },
        'lastname': {
          required: true
        },
        validationCheck: {
          required: true
        }
      },
      submitHandler: function (form) {
        var formData = $(form).serialize();
        var contactId = $('#contactId').val();

        var url = contactId ? '/private-clinic/contacts/' + contactId : '/private-clinic/contacts/store';
        var method = contactId ? 'PUT' : 'POST';
        var baseurl = window.location.origin;
        $.ajax({
          url: url,
          method: method,
          data: formData,
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          success: function (response) {
            if (response.status == 'success') {
              if (pageIdentifier === 'contact') {
                Swal.fire({
                  title: response.status,
                  text: response.message,
                  icon: response.status,
                  confirmButtonText: 'OK'
                }).then(function (result) {
                  window.location.href = baseurl + '/private-clinic/contacts';
                });
              } else if (pageIdentifier === 'patient-contact') {
                var newContact = response.newContact;
                if (newContact.contact_type == '2') {
                  var newOption = new Option(newContact.firstname + " " + newContact.lastname, newContact.id, true, true);
                  console.log(newOption);
                  $('#general_practitioner').append(newOption).trigger('change');
                } else if (newContact.contact_type == '3') {
                  var newOption = new Option(newContact.firstname + " " + newContact.lastname, newContact.id, true, true);
                  $('#solicitor').append(newOption).trigger('change');
                } else {
                  var newOption = new Option(newContact.firstname + " " + newContact.lastname, newContact.id, true, true);
                  $('.contact').append(newOption).trigger('change');
                }
                toastr.success(response.message);
                $('#addContactModal').modal('hide');
              }
            } else {
              Swal.fire({
                title: response.status,
                text: response.message,
                icon: response.status,
                confirmButtonText: 'OK'
              });
            }
          },
          error: function (xhr, status, error) {
            console.error(error);
            Swal.fire({
              title: error.status,
              text: error.message,
              icon: error.status,
              confirmButtonText: 'OK'
            });

          }
        });

        return false; // Prevent the form from being submitted
      }
    });
  }


  $('#firstname, #lastname').on('input', function () {
    var firstName = $('#firstname').val();
    var lastName = $('#lastname').val();
    $('#display_name').val(firstName + ' ' + lastName);
  });
  $('#contact-firstname, #contact-lastname').on('input', function() {
    var firstName = $('#contact-firstname').val();
    var lastName = $('#contact-lastname').val();
    $('#contact-display_name').val(firstName + ' ' + lastName);
  });

});