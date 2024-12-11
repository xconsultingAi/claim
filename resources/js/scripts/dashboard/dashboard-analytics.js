/*=========================================================================================
    File Name: dashboard-analytics.js
    Description: dashboard analytics page content with Apexchart Examples
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

$(window).on('load', function () {
  'use strict';

  var currentDate = new Date(); 
  var formattedDate = currentDate.toISOString().split('T')[0];

  $("#start_date").val(formattedDate);
  $("#end_date").val(formattedDate);

  var humanFriendlyPickr = $('.flatpickr-human-friendly');
  if (humanFriendlyPickr.length) {
    humanFriendlyPickr.flatpickr({
      altInput: false,
      altFormat: 'F j, Y',
      dateFormat: 'Y-m-d',
      maxDate: 'today'
    });
  }
  $(document).ready(function() {
    $("#search_button").trigger('click');
  });
  $("#search_button").click(function() {
    var start_date = $("#start_date").val();
    var end_date = $("#end_date").val();

    fetchStates(start_date, end_date);

  });

  function fetchStates(start_date , end_date) 
  {
    $.ajax({
      url: '/get-patients-attended',
      method: 'GET',
      data: {start_date, end_date},
      
      success: function (response) {
        $('#patients_attended_total').text(response.cb_count + response.non_cb_count)
        $('#patients_attended_cb').text(response.cb_count)
        $('#patients_attended_non_cb').text(response.non_cb_count)
        // Handle the success response
      },
      error: function (xhr, status, error) {
      }
    });
  
    $.ajax({
      url: '/get-patients-attended-gohawa',
      method: 'GET',
      data: {start_date, end_date},
      success: function (response) {
        $('#gohawa_total').text(response.cb_count + response.non_cb_count)
        $('#gohawa_cb').text(response.cb_count)
        $('#gohawa_non_cb').text(response.non_cb_count)
        // Handle the success response
      },
      error: function (xhr, status, error) {
      }
    });
  
    $.ajax({
      url: '/get-patients-attended-nadirabad',
      method: 'GET',
      data: {start_date, end_date},
      success: function (response) {
        $('#nadirabad_total').text(response.cb_count + response.non_cb_count)
        $('#nadirabad_cb').text(response.cb_count)
        $('#nadirabad_non_cb').text(response.non_cb_count)
        // Handle the success response
      },
      error: function (xhr, status, error) {
      }
    });
  
    $.ajax({
      url: '/get-patients-attended-bazar28',
      method: 'GET',
      data: {start_date, end_date},
      success: function (response) {
        // console.log(response);
        $('#bazar28_total').text(response.cb_count + response.non_cb_count)
        $('#bazar28_cb').text(response.cb_count)
        $('#bazar28_non_cb').text(response.non_cb_count)
        // Handle the success response
      },
      error: function (xhr, status, error) {
      }
    });
  
    $.ajax({
      url: '/get-patients-unattended',
      method: 'GET',
      data: {start_date, end_date},
      success: function (response) {
        $('#unattended_total').text(response.cb_count + response.non_cb_count)
        $('#unattended_cb').text(response.cb_count)
        $('#unattended_non_cb').text(response.non_cb_count)
        // Handle the success response
      },
      error: function (xhr, status, error) {
      }
    });
  
    $.ajax({
      url: '/get-lab-tests-performed',
      method: 'GET',
      data: {start_date, end_date},
      success: function (response) {
        $('#performed_test_total').text(response.cb_count + response.non_cb_count)
        $('#performed_test_cb').text(response.cb_count)
        $('#performed_test_non_cb').text(response.non_cb_count)
        // Handle the success response
      },
      error: function (xhr, status, error) {
      }
    });
  
    $.ajax({
      url: '/get-radiology-scans-performed',
      method: 'GET',
      data: {start_date, end_date},
      success: function (response) {
        $('#radiology_total').text(response.cb_count + response.non_cb_count)
        $('#radiology_cb').text(response.cb_count)
        $('#radiology_non_cb').text(response.non_cb_count)
        // Handle the success response
      },
      error: function (xhr, status, error) {
      }
    });
  
    $.ajax({
      url: '/get-ecg-performed',
      method: 'GET',
      data: {start_date, end_date},
      success: function (response) {
        $('#performed_ecg_total').text(response.cb_count + response.non_cb_count)
        $('#performed_ecg_cb').text(response.cb_count)
        $('#performed_ecg_non_cb').text(response.non_cb_count)
        // Handle the success response
      },
      error: function (xhr, status, error) {
      }
    });
  
    $.ajax({
      url: '/get-dental-procedure',
      method: 'GET',
      data: {start_date, end_date},
      success: function (response) {
        $('#dental_procedure_total').text(response.cb_count + response.non_cb_count)
        $('#dental_procedure_cb').text(response.cb_count)
        $('#dental_procedure_non_cb').text(response.non_cb_count)
        // Handle the success response
      },
      error: function (xhr, status, error) {
      }
    });


    
     $.ajax({
      url: '/get-lab-tests-price',
      method: 'GET',
      data: {start_date, end_date},
      success: function (response) {
        $('#labTestsPrice_total').text(response.cb_labTestsPrice + response.non_cb_labTestsPrice)
        $('#cb_labTestsPrice').text(response.cb_labTestsPrice)
        $('#non_cb_labTestsPrice').text(response.non_cb_labTestsPrice)
        // Handle the success response
      },
      error: function (xhr, status, error) {
      }
     });
    
    
    
     $.ajax({
      url: '/get-lab-Scans-price',
      method: 'GET',
      data: {start_date, end_date},
      success: function (response) {
        $('#labScansPrice_total').text(response.cb_labScansPrice + response.non_cb_labScansPrice)
        $('#cb_labScansPrice').text(response.cb_labScansPrice)
        $('#non_cb_labScansPrice').text(response.non_cb_labScansPrice)
        // Handle the success response
      },
      error: function (xhr, status, error) {
      }
     });

    
     $.ajax({
      url: '/get-lab-ECG-price',
      method: 'GET',
      data: {start_date, end_date},
      success: function (response) {
        $('#cb_labECGPrice_total').text(response.cb_labECGPrice + response.non_cb_labECGPrice)
        $('#cb_labECGPrice').text(response.cb_labECGPrice)
        $('#non_cb_labECGPrice').text(response.non_cb_labECGPrice)
        // Handle the success response
      },
      error: function (xhr, status, error) {
      }
     });
    
    
       $.ajax({
      url: '/get-patientsFee-price',
      method: 'GET',
      data: {start_date, end_date},
      success: function (response) {
        $('#pATIENT_FEE_total').text(response.cb_CANNT + response.non_cb_CANNT)
        $('#cb_CANNT').text(response.cb_CANNT)
        $('#non_cb_CANNT').text(response.non_cb_CANNT)
        // Handle the success response
      },
      error: function (xhr, status, error) {
      }
       });
    
      $.ajax({
      url: '/get-patientsFeeGOHAWA-price',
      method: 'GET',
      data: {start_date, end_date},
      success: function (response) {
        $('#gOHAWA_total').text(response.gOHAWA_cb + response.gOHAWA_non_cb)
        $('#gOHAWA_cb').text(response.gOHAWA_cb)
        $('#gOHAWA_non_cb').text(response.gOHAWA_non_cb)
        // Handle the success response
      },
      error: function (xhr, status, error) {
      }
      });
    
    
      $.ajax({
      url: '/get-patientsFeeNADIRABAD-price',
      method: 'GET',
      data: {start_date, end_date},
      success: function (response) {
        $('#NADIRABAD_total').text(response.cb_NADIRABAD + response.non_cb_NADIRABAD)
        $('#NADIRABAD_cb').text(response.cb_NADIRABAD)
        $('#NADIRABAD_non_cb').text(response.non_cb_NADIRABAD)
        // Handle the success response
      },
      error: function (xhr, status, error) {
      }
      });
    
    
      $.ajax({
      url: '/get-patientsFee28Bazar-price',
      method: 'GET',
      data: {start_date, end_date},
      success: function (response) {
        $('#bazar28REVENUE_total').text(response.cb_28Bazar + response.non_cb_28Bazar)
        $('#cb_28Bazar').text(response.cb_28Bazar)
        $('#non_cb_28Bazar').text(response.non_cb_28Bazar)
        // Handle the success response
      },
      error: function (xhr, status, error) {
      }
      });


    
     $.ajax({
      url: '/get-patientsFeeSum-price',
      method: 'GET',
      data: {start_date, end_date},
      success: function (response) {
        $('#tOTAL_REVENUE').text(response.tOTAL_cb + response.tOTAL_non_cb)
        $('#tOTAL_cb').text(response.tOTAL_cb)
        $('#tOTAL_non_cb').text(response.tOTAL_non_cb)
        // Handle the success response
      },
      error: function (xhr, status, error) {
      }
      });
    
  }
});
