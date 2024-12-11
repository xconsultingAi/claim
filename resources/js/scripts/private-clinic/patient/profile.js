//const { received } = require("laravel-mix/src/Log");

/*=========================================================================================
    File Name: profile.js
    Description: patient profile page
    --------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
(function () {

  
})();

$(function () {
  ('use strict');
  
  

  var url = window.location.href;
  var id = url.substring(url.lastIndexOf('/') + 1);
  
  if (id) {
    $("#profile_" + id).show();  
  }
});

function showProfileSection(id) {
  $(".patient_profile").hide();
  $("#profile_" + id).show();
}
$("#department_id").val('');
function fetchClinicalServicesPrice(patientId, patientTypeId, deparmentId) {
  $(".dept__btn_colour").removeClass("btn-primary").addClass("btn-white");
  $("#department_" + deparmentId).removeClass("btn-white").addClass("btn-primary");
  var baseurl = window.location.origin;
  $.ajax({
    url: baseurl + '/patient-visit-price/patient-visit-price-by-foreign-ids',
    type: 'GET',
    data:  {patientTypeId, deparmentId},
    success: function(response) {
      if (response.status == 'success') {
        var patientVisitPrice = response.patientVisitPrice;
        if (patientVisitPrice) {
          $.each(patientVisitPrice, function(index, value) {
            $('#fee_' + patientId + '_' + value.clinical_service_id).text(value.price);
          });

        }
        $("#department_id").val(deparmentId);
      }
    },
    error: function(xhr, status, error) {
      // Handle error response
      console.log('status');
    }
  });
}

function referToDoctor(patient, clinicalServiceId) {
  if($("#department_id").val() == "") {
    Swal.fire({
      text: 'Please select deptartment first.',
      icon: "warning",
    });
    return;
  }
  patient.department_type_id = $("#department_id").val();
  patient.clinical_service_type_id = clinicalServiceId;
  patient.user_id = patient.id;
  delete patient.id;
  console.log('#fee_' + patient.id + '_' + clinicalServiceId);
  Swal.fire({
    title: 'Rs: ' + $('#fee_' + patient.user_id + '_' + clinicalServiceId).text(),
    text: 'Have you received this payment?',
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel'
  }).then(function (result) {
    if (result.isConfirmed) {
      savePatientVisit(patient);
    }
  });
}

function savePatientVisit(patient) {
  var baseurl = window.location.origin;
  $.ajax({
    url: baseurl + '/patient-visit',
    type: 'POST',
    data:  patient,
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    success: function(response) {
      if (response.status == 'success') {
        window.location.href = baseurl + '/report/reception/download-visit-receipt/' + response.patient_visit_id;
 
      } else {
        Swal.fire({
          title: response.status,
         text: response.message,
          icon: 'error'
        });
      }
    },
    error: function(xhr, status, error) {
      // Handle error response
      console.log('status');
    }
  });

}

