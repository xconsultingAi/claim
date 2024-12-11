
var patient_id = $('#patient_id').val();
var baseurl = window.location.origin;

$(function () {
  'use strict';

  var baseurl = window.location.origin;
  var medicineList = [];
  var prescription_id = $('#prescription_id').val();

  var jqForm = $('#dataForm');
  var select = $('.select2');
  var tableBody = $('#medicine-table tbody');

  // Select2 initialization
  select.each(function () {
    var $this = $(this);
    $this.wrap('<div class="position-relative"></div>');
    $this.select2({
      // placeholder: 'Select value',
      dropdownParent: $this.parent()
    }).change(function () {
      $(this).valid();
    });
  });
var prescription_date=$('#follow_up_date').val();
  var humanFriendlyPickr = $('.flatpickr-human-friendly');
  if (humanFriendlyPickr.length) {
    humanFriendlyPickr.flatpickr({
      altInput: false,
      altFormat: 'Y-m-d',
      dateFormat: 'd-m-Y',
      allowInput: true,
      defaultDate: prescription_date ? prescription_date : 'today'
    });
  }


  // Function to generate medicine table row
  function generateMedicineRow(medicine) {
    var row = $('<tr>');
    var medicineName = $('<td>').text(medicine.drug_name);
    var frequency = $('<td>').text(medicine.frequency);
    var duration = $('<td>').text(medicine.duration);
    var action = $('<td>').html('<button class="btn btn-outline-danger btn-sm deleteButton">Delete</button>');
    var edit =$('<td>').html('<button class="btn btn-outline-danger type=button btn-sm editButton">Edit</button>');

    action.find('.deleteButton').click(function () {
      deleteMedicine(medicine.medicine_id);
    });
    edit.find('.editButton').click(function (event) {
      deleteMedicine(medicine.medicine_id);
      event.preventDefault();
      editRow(medicine.medicine_id, medicine.frequency, medicine.duration);
  });

    row.append(medicineName, frequency, duration,edit, action);
    return row;
  }

  // Function to generate medicine table
  function generateMedicineTable() {
    tableBody.empty(); // Clear existing data
    if (medicineList.length > 0) {
      $.each(medicineList, function (index, medicine) {
        tableBody.append(generateMedicineRow(medicine));
      });
    }
  }

  // Function to reset medicine fields
  function resetMedicineField() {
    $('#medicine_id').val('').trigger('change');
    $('#duration').val('');
    $('#frequency').val('').trigger('change');
  }
  // Function to delete medicine from the list
  function deleteMedicine(id) {
    const indexToDelete = medicineList.findIndex((obj) => obj.medicine_id == id);
    if (indexToDelete !== -1) {
      medicineList.splice(indexToDelete, 1);
      generateMedicineTable(); // Update the table with the new medicine list
    }
  }
  function editRow(medicine_id,frequency,duration)
  {
    $('#frequency').val(frequency);
    $('#duration').val(duration);
    $('#medicine_id').val(medicine_id).trigger('change');
  }
  $('#checkboxToggle').change(function() {
    if ($(this).is(':checked')) {
        $('#repeat').show(); // Show the div if checkbox is checked
    } else {
        $('#repeat').hide(); // Hide the div if checkbox is unchecked
    }
});

  // Function to handle form submission
  function handleSubmit(formData) {
    var url = prescription_id ? '/private-clinic/patient/prescription/update/' + patient_id + '/' + prescription_id : '/private-clinic/patient/prescription/' + patient_id;
    var method = prescription_id ? 'PUT' : 'POST';

    $.ajax({
      url: url,
      method: method,
      data: formData,
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success: function (response) {
        var message = response.message || 'Operation successful';
        var icon = response.status === 'success' ? 'success' : 'error';
        Swal.fire({
          title: response.status,
          text: message,
          icon: icon,
          // confirmButtonText: 'OK'
          showConfirmButton: false,
          timer: 800
        }).then(function (result) {
          if (response.status === 'success') {
            window.location.href = baseurl + '/private-clinic/patient/prescription/' + patient_id;
          }
        });
      },
      error: function (xhr, status, error) {
        Swal.fire({
          title: status,
          text: error.responseText,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  // Edit medicine function
  function editMedicine() {
    $.ajax({
      url: baseurl + '/private-clinic/patient/prescription/edit-medicine/' + prescription_id,
      type: 'GET',
      data: { prescription_id: prescription_id },
      success: function (response) {
        if (response.status == 'success') {
            medicineList = response.prescriptionMedicine;

            var repeat=response.prescription.repeat;
            if (repeat != null)
            {
                $('#checkboxToggle').prop('checked', true);
                 $('#repeat').show();
                 $("#repeat").val(repeat);
            }

                    var follow_up_date = response.prescription.follow_up_date.split(' ')[0];
                    var follow_up_dates = follow_up_date.split('-');
                var formatted_date = [
                     follow_up_dates[2], // day
                    follow_up_dates[1], // month
                    follow_up_dates[0]  // year
                ].join('-');

           $('#follow_up_date').val(formatted_date).trigger('change');
          generateMedicineTable();
        } else {
          console.error('Error fetching medicine data:', response.message);
        }
      },
      error: function (xhr, status, error) {
        console.error('Error fetching medicine data:', error);
      }
    });
  }

  // If prescription_id exists, load medicine data
  if (prescription_id) {
    editMedicine();
  }

  // Event listener for duration field
  $("#duration").on('keydown', function (event) {
    if (event.keyCode === 13 || event.keyCode === 9) {
      event.preventDefault(); // Stop form submission

      var medicine_id = $('#medicine_id').val();
      var frequency = $('#frequency').val();
      var duration = $('#duration').val();

      var medicineObj = {
        'medicine_id': medicine_id,
        'drug_name': $('#medicine_id option:selected').text(),
        'duration': duration,
        'frequency': frequency
      };

      if (medicine_id) {
        const existingIndex = medicineList.findIndex(item => item.medicine_id == medicine_id);
        if (existingIndex !== -1) {
          medicineList[existingIndex] = medicineObj;
        } else {
          medicineList.push(medicineObj);
        }
      }

      generateMedicineTable();
      resetMedicineField();
    }
  });
  $("#frequency").on('keydown', function (event) {
    if (event.keyCode === 13) {
      event.preventDefault(); // Stop form submission

      var medicine_id = $('#medicine_id').val();
      var frequency = $('#frequency').val();
      var duration = $('#duration').val();

      var medicineObj = {
        'medicine_id': medicine_id,
        'drug_name': $('#medicine_id option:selected').text(),
        'duration': duration,
        'frequency': frequency
      };

      if (medicine_id) {
        const existingIndex = medicineList.findIndex(item => item.medicine_id == medicine_id);
        if (existingIndex !== -1) {
          medicineList[existingIndex] = medicineObj;
        } else {
          medicineList.push(medicineObj);
        }
      }

      generateMedicineTable();
      resetMedicineField();
    }
  });

  // jQuery Validation
  if (jqForm.length) {
    jqForm.validate({
      rules: {
        'branch_id': {
          required: true
        },
        'patient_id': {
          required: true
        }
      },
      submitHandler: function (form) {
        var formData = $(form).serialize(); // Get the form data
        var prevMedicineIds = medicineList.map(medicine => medicine.medicine_id);
        var prevFrequencies = medicineList.map(medicine => medicine.frequency);
          var prevDurations = medicineList.map(medicine => medicine.duration);
          var repeat=$('#repeat').val();

        formData += '&medicineIds=' + prevMedicineIds.join(',');
        formData += '&frequencies=' + prevFrequencies.join(',');
        formData += '&durations=' + prevDurations.join(',');
        formData += '&repeat=' + repeat;

        handleSubmit(formData);

        return false; // Prevent the form from being submitted
      }
    });
  }
});

// Function to save medicine
function saveMedicine() {
  var formData = $('#addMedicineForm').serialize();
  var url = baseurl + '/medicines/medicine';

  $.ajax({
    url: url,
    method: 'POST',
    data: formData,
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    success: function (response) {
      var message = response.message || 'Medicine saved successfully';
      var icon = response.status === 'success' ? 'success' : 'error';
      Swal.fire({
        title: response.status,
        text: message,
        icon: icon,
        confirmButtonText: 'OK'
      }).then(function (result) {
        if (response.status === 'success') {
          // var patient_id = $('#patient_id').val();
          // window.location.href = baseurl + '/private-clinic/patient/prescription/create/' + patient_id;
          var newMedicine = response.medicine;
          var newOption = new Option(newMedicine.drug_name + " "+ newMedicine.strength + " "+ newMedicine.type , newMedicine.id, true, true);
          $('#medicine_id').append(newOption).trigger('change');
          $('#addPatientModal').modal('hide');
        }
      });
    },
    error: function (xhr, status, error) {
      Swal.fire({
        title: status,
        text: error.responseText,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  });

  return false;
}
