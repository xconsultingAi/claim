/*=========================================================================================
  File Name: add_expense.js
  Description: Add expense js file.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: PIXINVENT
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

$(function () {
  ('use strict');
  var assetPath = '../../../app-assets/',
    userView = 'app-user-view-account.html';


  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
    userView = assetPath + 'app/user/view/account';
  }

  var form = $('#dataForm');
  var expenseID = $('#expenseID').val();


  if (form.length) {
    form.validate({

      submitHandler: function (form) {
        var formData = new FormData(form);
        var route = 'private-clinic/expense-details/';
        var url = assetPath + route;
        var method = 'POST';
        var clickedButtonId = $(form).find(':submit:focus').attr('id');
        if (clickedButtonId === 'btn_save') {
          url = url + 'store';
        }
        else if (clickedButtonId === 'btn_update') {
          url = url + 'update/' + expenseID;
          formData.append('_method', 'PUT');
        }

        $.ajax({
          url: url,
          method: method,
          data: formData,
          processData: false,
          contentType: false,
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          success: function (response) {

            $('#btn_save_spinner').hide();
            $('#btn_update_spinner').hide();
            $('#btn_save').html('<i data-feather="check" class="align-middle me-sm-25 me-0"></i> Upload Completed...');
            $('#btn_update').html('<i data-feather="check" class="align-middle me-sm-25 me-0"></i> Update Completed...');
            feather.replace();

            var swalConfig = {
              title: response.status,
              text: response.message,
              icon: response.status,
              // confirmButtonText: 'OK'
              showConfirmButton: false,
              timer: 800
            };

            if (response.status === 'success') {
              Swal.fire(swalConfig).then(function (result) {

                window.location.href = '/private-clinic/expense-details/';

              });
            } else {
              Swal.fire(swalConfig);
            }
          },
          error: function (xhr, status, error) {
            console.error(error);
            Swal.fire({
              title: error.status,
              text: error.statusText,
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        });

        return false;
      }
    });
  }

  payment_mode = $('#payment_mode'),
    expense_date = $('#expense_date'),
    cheque_date = $('#cheque_date'),
    expiry_date = $('#expiry_date'),
    expense_category = $('#expense_category'),
    cheque_bank_name = $('#cheque_bank_name'),
    card_type = $('#card_type'),

    payment_mode.select2({
      placeholder: 'Select Payment Mode',
      closeOnSelect: true,
      escapeMarkup: function (es) {
        return es;
      }
    });

  card_type.select2({
    placeholder: 'Select Card Type',
    closeOnSelect: true,
    escapeMarkup: function (es) {
      return es;
    }
  });

  expense_category.select2({
    placeholder: 'Select Category',
    closeOnSelect: true,
    escapeMarkup: function (es) {
      return es;
    }
  });

  cheque_bank_name.select2({
    placeholder: 'Select Bank',
    closeOnSelect: true,
    escapeMarkup: function (es) {
      return es;
    }
  });

  if (expense_date.length) {
    var expense_date = expense_date.flatpickr({
      enableTime: false,
      altFormat: 'd-m-Y',
      dateFormat: 'd-m-Y',
      allowInput: true,
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr('step', null);
        }
      }
    });
  }

  if (cheque_date.length) {
    var cheque_date = cheque_date.flatpickr({
      enableTime: false,
      altFormat: 'd-m-Y',
      dateFormat: 'd-m-Y',
      allowInput: true,
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr('step', null);
        }
      }
    });
  }

  if (expiry_date.length) {
    var expiry_date = expiry_date.flatpickr({
      enableTime: false,
      altFormat: 'd-m-Y',
      dateFormat: 'd-m-Y',
      allowInput: true,
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr('step', null);
        }
      }
    });
  }



});

let selectedFiles = [];

$(document).ready(function () {
  $('#fileInput').on('change', function (event) {
    handleFileSelect(event);
  });
  $('#dataForm').on('submit', function (event) {
    event.preventDefault();
    $('#btn_save').prop('disabled', true);
    $('#btn_save_spinner').show();
    $('#btn_save').text('Uploading...');
  });


  $('#dataForm').on('submit', function (event) {
    event.preventDefault();
    $('#btn_update').prop('disabled', true);
    $('#btn_update_spinner').show();
    $('#btn_update').text('Updating...');
  });
});

function handleFileSelect(event) {
  const files = event.target.files;
  const fileNamesContainer = $('#fileNames');

  for (let i = 0; i < files.length; i++) {
    const fileName = files[i].name;

    if (!selectedFiles.some(file => file.name === fileName)) {
      selectedFiles.push(files[i]);

      const fileBox = $('<div>').addClass('file-container');

      const anchor = $('<a>')
        .attr('target', '_blank')
        .attr('href', URL.createObjectURL(files[i]));

      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 32">
                            <g fill="currentColor">
                                <path d="M1.5 32h21c.827 0 1.5-.673 1.5-1.5v-21c0-.017-.008-.031-.009-.047c-.002-.023-.008-.043-.013-.065a.488.488 0 0 0-.09-.191c-.007-.009-.006-.02-.013-.029l-8-9c-.003-.003-.007-.003-.01-.006a.494.494 0 0 0-.223-.134c-.019-.006-.036-.008-.056-.011C15.557.012 15.53 0 15.5 0h-14C.673 0 0 .673 0 1.5v29c0 .827.673 1.5 1.5 1.5M16 1.815L22.387 9H16.5c-.22 0-.5-.42-.5-.75zM1 1.5a.5.5 0 0 1 .5-.5H15v7.25c0 .809.655 1.75 1.5 1.75H23v20.5a.5.5 0 0 1-.5.5h-21c-.28 0-.5-.22-.5-.5z"/>
                                <path d="M5.5 14h13a.5.5 0 0 0 0-1h-13a.5.5 0 0 0 0 1m0 4h13a.5.5 0 0 0 0-1h-13a.5.5 0 0 0 0 1m0-8h6a.5.5 0 0 0 0-1h-6a.5.5 0 0 0 0 1m0 12h13a.5.5 0 0 0 0-1h-13a.5.5 0 0 0 0 1m0 4h13a.5.5 0 0 0 0-1h-13a.5.5 0 0 0 0 1"/>
                            </g>
                         </svg>`;

      anchor.append(svg).append(`<span>${fileName}</span>`);

      const deleteButton = $('<div>')
        .addClass('cross-icon')
        .html('<i data-feather="trash-2" class="icon-large float-end" style="width: 2em; height: 2em; color: red;"></i>')
        .on('click', function () {
          deleteFile(fileName, fileBox);
        });

      fileBox.append(anchor).append(deleteButton);
      fileNamesContainer.append(fileBox);
    }
  }

  updateFileInput();
  initializeFeatherIcons();
}

function deleteFile(fileName, fileBox) {
  selectedFiles = selectedFiles.filter(file => file.name !== fileName);
  fileBox.remove();
  updateFileInput();
}

function updateFileInput() {
  const fileInput = $('#fileInput')[0];
  const dt = new DataTransfer();

  selectedFiles.forEach(file => dt.items.add(file));
  fileInput.files = dt.files;
}

function handleUpload(event, buttonId, textId, spinnerId) {
  $(buttonId).prop('disabled', true);
  $(textId).hide();
  $(spinnerId).show();

  setTimeout(function () {
    // Normally, you'd submit the form here
    alert("Files uploaded!");

    // After upload, re-enable the button and hide the spinner
    $(buttonId).prop('disabled', false);
    $(textId).show(); // Show the button text
    $(spinnerId).hide(); // Hide the spinner
  }, 3000);

}

function initializeFeatherIcons() {
  if (window.feather) {
    feather.replace();
  }
}


$(document).ready(function () {

  $('#fileInput').on('change', function (event) {
    handleFileSelect(event);
  });

  paymentmode = $('#payment_mode');

  paymentmode.change(function () {
    if ($(this).val() === 'cheque') {
      $('#cheque_div').css('display', 'flex');
      $('#direct_debit_div').css('display', 'none');
      $('#credit_card_div').css('display', 'none');
      enableChequeInputs();
      disableCrdeitCardInputs();
      disableRefInputs();
    }
    else if ($(this).val() === 'credit_card') {
      $('#credit_card_div').css('display', 'flex');
      $('#direct_debit_div').css('display', 'none');
      $('#cheque_div').css('display', 'none');
      enableCrdeitCardInputs();
      disableRefInputs();
      disableChequeInputs();
    }
    else if ($(this).val() === 'direct_debit') {
      $('#direct_debit_div').css('display', 'flex');
      $('#credit_card_div').css('display', 'none');
      $('#cheque_div').css('display', 'none');
      enableRefInputs();
      disableCrdeitCardInputs();
      disableChequeInputs();
    }
    else {
      $('#direct_debit_div').css('display', 'none');
      $('#credit_card_div').css('display', 'none');
      $('#cheque_div').css('display', 'none');
      disableRefInputs();
      disableCrdeitCardInputs();
      disableChequeInputs();
    }
  });

  function enableCrdeitCardInputs() {
    $('#card_name').prop('disabled', false);
    $('#card_type').prop('disabled', false);
    $('#card_no').prop('disabled', false);
    $('#expiry_date').prop('disabled', false);
  }

  function disableCrdeitCardInputs() {
    $('#card_name').prop('disabled', true);
    $('#card_type').prop('disabled', true);
    $('#card_no').prop('disabled', true);
    $('#expiry_date').prop('disabled', true);
  }
  function enableChequeInputs() {
    $('#cheque_bank_name').prop('disabled', false);
    $('#cheque_no').prop('disabled', false);
    $('#cheque_date').prop('disabled', false);
  }

  function disableChequeInputs() {
    $('#cheque_bank_name').prop('disabled', true);
    $('#cheque_no').prop('disabled', true);
    $('#cheque_date').prop('disabled', true);
  }

  function enableRefInputs() {
    $('#ref_no').prop('disabled', false);
    $('#bank_name').prop('disabled', false);
  }

  function disableRefInputs() {
    $('#ref_no').prop('disabled', true);
    $('#bank_name').prop('disabled', true);
  }

  $('#payment_mode').trigger('change');
});


