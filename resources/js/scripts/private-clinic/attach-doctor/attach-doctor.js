/*=========================================================================================
  File Name: medicine/request-indent/add-request-indent.js
  Description: this script is for indent screen
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: PIXINVENT
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
var attachDoctorsTimeList = [];
var baseurl = window.location.origin;
$(function () {
  'use strict';
  var jqForm = $('#jquery-val-form'),
      timePickr = $('.flatpickr-time'),
      select = $('.select2');

  $('#updateIndentStatus').hide();
  $('#downloadIndentBtn').hide();
  $('#dueIndent').hide();
  
  // select2 initialization
  select.each(function () {
    var $this = $(this);
    $this.wrap('<div class="position-relative"></div>');
    $this.select2({
      dropdownParent: $this.parent()
    });
  });
  // Time
  if (timePickr.length) {
    timePickr.flatpickr({
      enableTime: true,
      noCalendar: true
    });
  }
  
  $("#back_button").click(function () {
    window.history.back();
  }); 

  //for medicine list
  $("#addInList").on('click', function(event) {
    let user_id = $('#user_id').val();
    let day = $('#day').val();
    var doctorTimeDurationObj = {
      'branch_id': $('#branch_id').val(),
      'branch_name': $('#branch_id').data('branch_name'),
      'user_id': $('#user_id').val(),
      'firstname': $('#user_id').find("option:selected").data('firstname'),
      'lastname': $('#user_id').find("option:selected").data('lastname'),
      'day': $('#day').val(),
      'start': $('#start').val(),
      'end': $('#end').val()
    };

    if (attachDoctorsTimeList.length > 0) {
      let addObject = true;
      $.each(attachDoctorsTimeList, function(index, data) {
        if (data.user_id == user_id && data.day == day) {
          attachDoctorsTimeList[index] = doctorTimeDurationObj;   
          addObject = false;
        }
      });
      if (addObject) {
        attachDoctorsTimeList.push(doctorTimeDurationObj);
      }
    } else {
      attachDoctorsTimeList.push(doctorTimeDurationObj);
    }
    
    if (attachDoctorsTimeList.length > 0) {
      genrateMedicineTable(attachDoctorsTimeList);
    }
    resetMedicineField();
    return;
  });

  //fetch edit record
  var url = window.location.href;
  var branch_id = url.substring(url.lastIndexOf('/') + 1);
  if ($.isNumeric(branch_id) == true) {
    $.ajax({
      url: baseurl + '/user-wise-branch-setting/get-branch-user-detail/' + branch_id,
      type: 'GET',
      success: function(response) {
        if (response.status == 'success') {
           attachDoctorsTimeList = response.UserWiseBranchSetting;
          if (attachDoctorsTimeList.length > 0) { 
            genrateMedicineTable(attachDoctorsTimeList);
          }
        }
      },
      error: function(xhr, status, error) {
        // Handle error response
        Swal.fire({
          title: response.status,
          text: response.message,
          confirmButtonText: 'OK'
        });
      }
    });
  }
  
    // jQuery Validation
    if (jqForm.length) {
      jqForm.validate({
        rules: {
          'supplier_pharmacy_id': {
            required: true
          },
          'receiver_pharmacy_id': {
            required: true
          },
          validationCheck: {
            required: true
          }
        },
        submitHandler: function (form) {
           //let id = $("#branch_id").val(); // Get the medicine ID (if exists)
          // var method = id ? 'PUT' : 'POST'; // Use PUT for update, POST for create
          var method = 'POST';
          var requestData = {
            attachDoctorsTimeList: attachDoctorsTimeList,
            branch_id: $("#branch_id").val()
          }
  
          var baseurl = window.location.origin;
          $.ajax({
            url: baseurl + '/user-wise-branch-setting/create/',
            method: method,
            data: requestData,
            headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function (response) {
              // Handle the success response
              if (response.status == 'success') {
                Swal.fire({
                  title: response.status,
                  text: response.message,
                  icon: response.status,
                  confirmButtonText: 'OK'
                }).then(function (result) {
                  window.location.href = baseurl + '/branch';
                });
                  
              } else{
                Swal.fire({
                  title: response.status,
                  text: response.message,
                  icon: 'error',
                  confirmButtonText: 'OK'
                });
              }
            },
            error: function (xhr, status, error) {
              // Handle the error response
              // Display an error message or perform any other error handling
              console.error(error);
              Swal.fire({
                title: error.status,
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK'
              });
  
            }
          });
  
          return false; // Prevent the form from being submitted
        }
      });
    }

    $("#updateIndentStatus").click(function() {
      if ($("#id").val()) {
        var update_status = $("#update_status").val();
        $.ajax({
          url: baseurl + '/medicines/request-indent/update-status',
          method: "PUT",
          data: {status: update_status, id: $("#id").val()},
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          success: function (response) {
            // Handle the success response
            if (response.status == 'success') {
              Swal.fire({
                title: response.status,
                text: response.message,
                icon: response.status,
                confirmButtonText: 'OK'
              }).then(function (result) {
                window.location.href = baseurl + '/medicines/request-indent/';
              });  
               
            } else {
              Swal.fire({
                title: response.status,
                text: response.message,
                icon: 'error',
                confirmButtonText: 'OK'
              });
            }
          },
          error: function (xhr, status, error) {
            // Handle the error response
            // Display an error message or perform any other error handling
            console.error(error);
            Swal.fire({
              title: error.status,
              text: error.message,
              icon: error.status,
              confirmButtonText: 'OK'
            });
          }
        });
      }
    });

    $("#dueIndent").click(function() {
      if ($("#id").val()) {
        var requestData = {
          id: $("#id").val(),
          status: 'delivered',
          order_status: 'due',
          supplier_pharmacy_id: $("#supplier_pharmacy_id").val(),
          receiver_pharmacy_id: $("#receiver_pharmacy_id").val(),
          attachDoctorsTimeList: attachDoctorsTimeList, 
        }

        var baseurl = window.location.origin;
        $.ajax({
          url: '/medicines/request-indent',
          method: 'PUT',
          data: requestData,
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          success: function (response) {
            // Handle the success response
            if (response.status == 'success') {
              Swal.fire({
                title: response.status,
                text: 'Delivered indent with due.',
                icon: response.status,
                confirmButtonText: 'OK'
              }).then(function (result) {
                window.location.reload();
              });
                
            } else{
              Swal.fire({
                title: response.status,
                text: response.message,
                icon: 'error',
                confirmButtonText: 'OK'
              });
            }
          },
          error: function (xhr, status, error) {
            // Handle the error response
            // Display an error message or perform any other error handling
            console.error(error);
            Swal.fire({
              title: error.status,
              text: error.message,
              icon: 'error',
              confirmButtonText: 'OK'
            });

          }
        });
      }
    });
    
    $("#supplier_pharmacy_id").on('change', function() {
      if ($(this).val()) {
        $("#receiver_pharmacy_id option").prop("disabled", false);

        // Hide the selected option
        var selectedValue = $(this).val();
        $("#receiver_pharmacy_id").find("option[value='" + selectedValue + "']").prop("disabled", true);
        getPharmacyRelatedInventory($(this).val());
        $("#supplier_pharmacy_id").select2({ disabled: true });
      } 
    });
    

    $("#receiver_pharmacy_id").on('change', function() {
      if ($(this).val()) {
        $("#receiver_pharmacy_id").select2({ disabled: true });
      }
    });
    
    $("#resetFields").on('click', function() {
      $("#supplier_pharmacy_id").select2({ disabled: false });
      $("#receiver_pharmacy_id").select2({ disabled: false });
      $("#supplier_pharmacy_id").val('').trigger('change');
      $("#receiver_pharmacy_id").val('').trigger('change');
      $("#medicine_id").val('').trigger('change');
      attachDoctorsTimeList = [];
      genrateMedicineTable(attachDoctorsTimeList);

    });

    $("#downloadIndentBtn").click(function() {
      window.location.href = baseurl + '/report/request-indent/download-request-indent/' + $("#id").val();
    });
});

function genrateMedicineTable (attachDoctorsTimeList, indent_status = '') {
  var tableBody = $('#medicine-table tbody');
  tableBody.empty(); // Clear any existing data in the table
  if (attachDoctorsTimeList.length > 0) {

    $.each(attachDoctorsTimeList, function(index, doctorTimeDurationObj) {
      if (doctorTimeDurationObj == undefined) {
        return true;
      }
      //deleteMedicine
      var row = $('<tr>');
      var branchName = $('<td>').text(doctorTimeDurationObj.branch_name);
      if (doctorTimeDurationObj.firstname) {
        var userName = $('<td>').text(doctorTimeDurationObj.firstname  + ' ' + doctorTimeDurationObj.lastname);
      } else {
        var userName = $('<td>').text(' ');
      }
      var day = $('<td>').text(doctorTimeDurationObj.day);
      var start = $('<td>').text(doctorTimeDurationObj.start);
      var end = $('<td>').text(doctorTimeDurationObj.end);
      
      var action = $('<td style="text-align: end;">').html('<input id="deleteButton" class="btn btn-outline-danger waves-effect" value="Delete" type="button" onclick="deleteRecord('+index+')" >'); 
      
      row.append(branchName, userName, day, start, end, action);
      tableBody.append(row);
    });
  } 
}

function deleteRecord(index) {
  attachDoctorsTimeList.splice(index, 1);
  genrateMedicineTable(attachDoctorsTimeList);
  // const indexToDelete = attachDoctorsTimeList.findIndex((obj) => obj.medicine_id == id);
  // if (indexToDelete !== -1) {
  //   attachDoctorsTimeList.splice(indexToDelete, 1);
  //   genrateMedicineTable(attachDoctorsTimeList);
  // }
}

//hide and show data field 
function resetMedicineField() {
  $('#medicine_id').val('').trigger('change');
  $('#requested_quantity').val(''); 
}

//update delivered quantity
function updateDeliveredQuantity(medicine_id, delivered_quantity, key) {

  
  if (medicine_id) {
    attachDoctorsTimeList[key].delivered_quantity = delivered_quantity;
    // const existingIndex = attachDoctorsTimeList.findIndex(item => item.medicine_id == medicine_id);
    // if (existingIndex !== -1) {
    //   attachDoctorsTimeList[existingIndex].delivered_quantity = delivered_quantity;
    // }
  } 
  $.each(attachDoctorsTimeList, function(index, medicine) {
    if (medicine.requested_quantity > medicine.delivered_quantity) {
      var buttonhide = $('#updateIndentStatus').text();
      if(buttonhide == 'Delivered'){
        $('#updateIndentStatus').hide();
        
      } 
      return false;     
    }
    else{
      $('#updateIndentStatus').show();
    }
  });
  if (attachDoctorsTimeList.length > 0) {
    genrateMedicineTable(attachDoctorsTimeList);
  }
}

function getPharmacyRelatedInventory(pharmacy_id) {
  $.ajax({
    url: baseurl + '/medicines/get-pharmacy-related-medicine/' + pharmacy_id,
    method: "GET",
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    success: function (response) {
      // Handle the success response
      if (response.status == 'success') {
        //
        $("#medicine_id").empty();
        $("#medicine_id").append("<option value=''>Select Medicine</option>");
        $.each(response.medicine, function(index, medicine) {
          var remaining_quantity = medicine.remaining_quantity ? '(' + medicine.remaining_quantity + ')' : '';  
          $("#medicine_id").append("<option value='"+ medicine.id +"' data-name='" + medicine.brand_name + "' data-strength='" + medicine.strength + "' data-type='" + medicine.type + "'>" + medicine.brand_name + ' ' + medicine.strength + remaining_quantity + ' '+ medicine.type + "</option>");
        });
          
      } else {
        Swal.fire({
          title: response.status,
          text: response.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    },
    error: function (xhr, status, error) {
      // Handle the error response
      // Display an error message or perform any other error handling
      console.error(error);
      Swal.fire({
        title: error.status,
        text: error.message,
        icon: error.status,
        confirmButtonText: 'OK'
      });
    }
  });

}
