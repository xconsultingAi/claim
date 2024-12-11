//const { received } = require("laravel-mix/src/Log");

/*=========================================================================================
    File Name: app-user-view.js
    Description: User View page
    --------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
var map;
var locations;
var baseurl = window.location.origin;
$(function () {
  ('use strict');

  $("#addDoctor").click(function () {

    window.location.href = '/branch/create';
  });
});



$(document).on('click', '#deleteButton', function (e) {
  e.preventDefault();

  var id = $(this).data('branch_id');

  Swal.fire({
    title: 'Are you sure?',
    text: "You want to delete this branch!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    confirmButtonClass: 'btn btn-primary',
    cancelButtonClass: 'btn btn-danger ms-1',
    buttonsStyling: false
  }).then(function (result) {
    if (result.isConfirmed) { // Check if "Yes, delete it!" is clicked
      var csrfToken = $('meta[name="csrf-token"]').attr('content');
      $.ajax({
        url: baseurl + '/branch/delete/' + id,
        method: 'DELETE',
        headers: {
          'X-CSRF-TOKEN': csrfToken
        },
        success: function (response) {
          if (response.status == 'success') {
            Swal.fire({
              title: 'Success',
              text: 'Branch has been deleted successfully',
              icon: 'success',
              confirmButtonText: 'OK'
            });
            location.reload();
          } else {
            Swal.fire({
              title: 'Failure',
              text: response.message,
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        },
        error: function (xhr, status, error) {
          Swal.fire({
            title: 'Error',
            text: error,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    }
  });
});





$(document).on('click', '.toggleStatusButton', function (e) {
  e.preventDefault();
  var id = $(this).data('branch_id');
  let button = $(this);
  var csrfToken = $('meta[name="csrf-token"]').attr('content');

  $.ajax({
    url: baseurl + '/branch/toggle-status/' + id,
    method: 'post',
    headers: {
      'X-CSRF-TOKEN': csrfToken
    },
    success: function (response) {
      if (response.newStatus === 'active') {
        button.text('Deactivate');
      } else {
        button.text('Activate');
      }
      Swal.fire({
        title: 'Success',
        text: response.message,
        icon: 'success',
        confirmButtonText: 'OK'
      });
      //location.reload();
    },
    error: function (xhr, status, error) {
      Swal.fire({
        title: 'Error',
        text: error,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  });
});


function fetchDoctorDetail(id, latitude, longitude) {
  $.ajax({
    url: baseurl + '/user-wise-branch-setting/get-branch-user-detail-for-map/' + id,
    type: 'GET',
    success: function (response) {
      locations = [];
      var UserBranchDetail = '';
      if (response.status == 'success') {

        var UserWiseBranchSetting = response.UserWiseBranchSetting;
        if (UserWiseBranchSetting.length > 0) {
          $.each(UserWiseBranchSetting, function (index, value) {
            var user = value.user;
            UserBranchDetail += '<br><b>Dr Name:</b> ' + user.firstname + ' ' + user.lastname + '<br>';
            $.each(value.user_time_duration, function (key, user_time_duration) {
              var user = value.user;
              UserBranchDetail += '<b>' + user_time_duration.day + ':</b> ' + user_time_duration.start + ' - ' + user_time_duration.end + '<br>';

            });
          });
          var marker = L.marker([latitude, longitude]).bindPopup(UserBranchDetail);
          locations[0] = marker;
        }
        displayLocationOnMap(locations);
      }
    },
    error: function (xhr, status, error) {
      // Handle error response
      console.log('status');
    }
  });
}
function displayLocationOnMap(location) {
  if ($('#layer-control').length) {
    if (!map) {
      var cities = L.layerGroup(location);
      var street = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 18
      });
      var watercolor = L.tileLayer('http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 18
      });

      map = L.map('layer-control', {
        center: [31.5204, 74.3587],
        zoom: 10,
        layers: [street, cities]
      });

      var baseMaps = {
        Street: street,
        Watercolor: watercolor
      };
      var overlayMaps = {
        Cities: cities
      };
      L.control.layers(baseMaps, overlayMaps).addTo(map);
      L.tileLayer('https://c.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 18
      }).addTo(map);
    } else {
      // If the map is already initialized, update the layers
      var cities = L.layerGroup(location);
      map.eachLayer(function (layer) {
        if (layer instanceof L.LayerGroup) {
          map.removeLayer(layer);
        }
      });
      cities.addTo(map);
    }
  }
}