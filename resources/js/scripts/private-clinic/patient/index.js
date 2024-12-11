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

  $(".patient_profile").hide();

  var dtUserTable = $('.user-list-table');
  var url = window.location.href;
  var id = url.substring(url.lastIndexOf('/') + 1);
  statusObj = {
    'pending': { title: 'pending', class: 'badge-light-info' },
    'active': { title: 'active', class: 'badge-light-success' },
    'suspend': { title: 'suspend', class: 'badge-light-warning' },
    'in_active': { title: 'in_active', class: 'badge-light-secondary' },
    'trash': { title: 'trash', class: 'badge-light-danger' },
  };

  if (id) {
    $("#profile_" + id).show();
  }

  $(document).on('click', '.addPatient', function () {
    window.location.href = '/private-clinic/patient/create';
  });

  var baseurl = window.location.origin;
  var assetPath = '../../../app-assets/',
    userView = 'app-user-view-account.html';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
    userView = assetPath + 'private-clinic/patient/get-patient-detail/';
  }

  if (dtUserTable.length) {
    dtUserTable.DataTable({
      processing: true,
      serverSide: true,
      ajax: {
        url: baseurl + '/private-clinic/patient/get-up-list',
        data: function (d) {
            d.searchNo = $('#searchInput').val();
        }
    },
      columns: [
        // columns according to JSON
        { data: '' },
        { data: 'firstname' },
        { data: 'employee_no' },
        { data: 'Mobile' },
        { data: 'phone' },
        { data: 'dob' },
        { data: 'address' },
        { data: 'address_line_2' },
        { data: '' }
      ],
      columnDefs: [
        {
          // For Responsive
          className: 'control',
          orderable: false,
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) {
            return '';
          }
        },
        {
          // User full name and username
          targets: 1,
          responsivePriority: 2,
          render: function (data, type, full, meta) {
            var $name = '';

            function capitalizeFirstLetter(string) {
              return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
            }

            // Safely handle null or undefined title
            var title = full['title'] ? capitalizeFirstLetter(full['title']) : '';

            var $email = full['email'] ? full['email'] : '';
            var $image = full['profile_image'];

            var stateNum = Math.floor(Math.random() * 6) + 1;
            var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
            var $state = states[stateNum];

            // If title is empty, do not include it
            if (title && title !== 'Selecttitle') {
              $name = title + '. ' + full['firstname'] + ' ' + full['lastname'];
            } else {
              $name = full['firstname'] + ' ' + full['lastname'];
            }

            var $initials = $name.match(/\b\w/g) || [];
            $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();

            var $output;
            if ($image && $image !== 'default.png') {
              $output = '<img src="' + $image + '" alt="' + $initials + '" height="32" width="32">';
            } else {
              $output = '<span style="padding-top: 2px;" class="avatar-content">' + $initials + '</span>';
            }

            var colorClass = $image === '' ? ' bg-light-' + $state + ' ' : '';

            // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-left align-items-center">' +
              '<div class="avatar-wrapper">' +
              '<div class="avatar ' +
              colorClass +
              ' me-1">' +
              $output +
              '</div>' +
              '</div>' +
              '<div class="d-flex flex-column">' +
              '<a href="' +
              baseurl + '/private-clinic/patient/profile-view/' + full.id +
              '" class="user_name text-truncate text-body"><span class="text-wrap">' +
              $name +
              '</span></a>' +
              '<small class="emp_post text-muted">' +
              $email +
              '</small>' +
              '</div>' +
              '</div>';

            return $row_output;
          }
        },
        {
          targets: 2,
          responsivePriority: 2,
          render: function (data, type, full, meta) {
            var $genericPatientEmployee = full['employee_no'];
            if ($genericPatientEmployee == null) {
              var $genericPatientEmployee = full['id'];
            }
            return '<span class="text-wrap">' + $genericPatientEmployee + '</span>';
          }
        },
        // Update for Husband Father Name
        {
          targets: 3,
          responsivePriority: 2,
          render: function (data, type, full, meta) {
            return '<span class="text-wrap">' + (full['mobile_no'] ? full['mobile_no'] : '') + '</span>';
          }
        },
        {
          targets: 4,
          responsivePriority: 2,
          render: function (data, type, full, meta) {
            return '<span class="text-wrap">' + (full['phone'] ? full['phone'] : '') + '</span>';
          }
        },
        {
          targets: 5,
          responsivePriority: 2,
          render: function (data, type, full, meta) {
            var date = new Date(full['dob']);
            var day = ("0" + date.getDate()).slice(-2);
            var month = ("0" + (date.getMonth() + 1)).slice(-2);
            var year = date.getFullYear();
            return '<span class="text-nowrap">' + day + '-' + month + '-' + year + '</span>';
          }
        },
        {
          targets: 6,
          responsivePriority: 2,
          render: function (data, type, full, meta) {
            var $address = (full['address'] ? full['address'] : '');

            return '<span class="text-wrap">' + $address + '</span>';
          }
        },
        {
          // User Status
          targets: 7,
          responsivePriority: 2,
          render: function (data, type, full, meta) {
            var $address_line_2 = (full['address_line_2'] ? full['address_line_2'] : '');

            return '<span class="text-wrap">' + $address_line_2 + '</span>';
          }
        },
        {
          // Actions
          targets: -1,
          title: 'Actions',
          orderable: false,
          render: function (data, type, full, meta) {
            //start from this
            //console.log(full.id);return;
            return (
                '<div class="btn-group">' +
                  '<a class="btn btn-sm dropdown-toggle hide-arrow" data-bs-toggle="dropdown">' +
                    feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
                  '</a>' +
                  '<div class="dropdown-menu dropdown-menu-end">' +
                    '<a href="' + baseurl + '/private-clinic/patient/create/' + full.id + '" class="dropdown-item">' +
                      feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) +
                      'Edit</a>' +
                    '<a href="javascript:;" class="dropdown-item export-record" data-user_id="' + full.id + '">' +
                      feather.icons['download'].toSvg({ class: 'font-small-4 me-50' }) +
                      'Export</a>' +
                    '<a href="javascript:;" class="dropdown-item toggleStatusButton" data-user_id="' + full.id + '">' +
                      feather.icons['toggle-left'].toSvg({ class: 'font-small-4 me-50' }) +
                      (full.status === 'active' ? 'Deactivate' : 'Activate') + '</a>' +
                    '<a href="javascript:;" class="dropdown-item delete-record" data-user_id="' + full.id + '">' +
                      feather.icons['trash-2'].toSvg({ class: 'font-small-4 me-50' }) +
                      'Delete</a>' +
                  '</div>' +
                '</div>'
              );



          }
        }
      ],
      rowCallback: function (row, data, index) {
        if (data.status === 'in_active') {
          $(row).css('background-color', '#f8d7da');
        }
      },
      order: [[1, 'desc']],
      dom:
        '<"d-flex justify-content-between align-items-center header-actions mx-0 row mt-0"' +
        '<"col-sm-12 col-lg-4 col-md-4 d-flex justify-content-center justify-content-lg-start heading-wrapper" >' +
        '<"col-sm-12 col-lg-3 col-md-3 d-flex justify-content-center justify-content-lg-start" l>' +
        '<"col-sm-12 col-lg-5 col-md-5 ps-xl-75 ps-0"<"dt-action-buttons d-flex align-items-center justify-content-center justify-content-lg-end flex-lg-nowrap flex-wrap"<"me-1"f>B>>' +
        '>t' +
        '<"d-flex justify-content-between mx-2 row mb-1"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
      language: {
        sLengthMenu: 'Show _MENU_',
        search: 'Search',
        searchPlaceholder: 'Search..',
        paginate: {
          previous: '&nbsp;',
          next: '&nbsp;'
        }
      },
      // Insert text into the heading

      // Buttons with Dropdown
      buttons: [
        {
          text: 'Add New Patient',
          className: 'addPatient float-end border-0 text-white rounded-pill px-3 bg-primary addPrescription btn btn-primary waves-effect waves-float waves-light'
        }
      ],
      // Insert text into the heading

      // For responsive popup
     
      language: {
        paginate: {
          // remove previous & next text from pagination
          previous: '&nbsp;',
          next: '&nbsp;'
        }
      },
    });
    $('.heading-wrapper').html('<h3 class="fw-bolder mb-0"> Patient List</h3>');
  }

});

// function fetchPatientDetail(id) {
//   $.ajax({
//     url: baseurl + '/user-wise-branch-setting/get-user-branch-detail/' + id,
//     type: 'GET',
//     success: function(response) {
//       locations = [];
//       if (response.status == 'success') {

//         var UserWiseBranchSetting = response.UserWiseBranchSetting;
//         if (UserWiseBranchSetting.length > 0) {
//           $.each(UserWiseBranchSetting, function(index, value) {
//             var branch = value.branch;
//             if (branch) {
//               var UserBranchDetail = '<b>Branch Name:</b> ' + branch.name + '<br>' +
//                   '<b>Mon-Fri:</b> ' + value.start + ' - ' + value.end;
//               var marker = L.marker([branch.latitude, branch.longitude]).bindPopup(UserBranchDetail);
//               locations[index] = marker;
//             }
//           });
//         }
//         displayLocationOnMap(locations);
//      }
//     },
//     error: function(xhr, status, error) {
//       // Handle error response
//       console.log('status');
//     }
//   });
// }
$(document).on('click', '.export-record', function (e) {
    e.preventDefault();
    var userId = $(this).data('user_id');
    $('#staticBackdrop').modal('show');

    $('#staticBackdrop').data('user_id', userId);
});





$(document).on('click', '.delete-record', function (e) {
  e.preventDefault();
  var dtUserTable = $('.user-list-table');
  var user_id = $(this).data('user_id');

  Swal.fire({
    title: 'Are you sure?',
    text: "You want to delete this user!",
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
        url: baseurl + '/doctor/delete/' + user_id,
        method: 'DELETE',
        headers: {
          'X-CSRF-TOKEN': csrfToken
        },
        success: function (response) {
          if (response.status == 'success') {
            
            Swal.fire({
              title: 'Success',
              text: 'User has been deleted successfully',
              icon: 'success',
              // confirmButtonText: 'OK'
              showConfirmButton: false,
              timer: 800
            });
            dtUserTable.DataTable().ajax.reload(null, false);
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

$(document).on('click', '#print', function (e) {
    e.preventDefault();

    var url = window.location.href; // Get the full URL
    var segments = url.split('/'); // Split the URL by '/'
    var patientId = $('#staticBackdrop').data('user_id');

    console.log(patientId);
    $('#staticBackdrop .btn-secondary').hide();

    // Check which checkboxes are checked
    var isPatienthistory = $('#patienthistory').is(':checked');
    var isAppointment = $('#appointment').is(':checked');
    var isAccounts = $('#accounts').is(':checked');
    var isPrescriptions = $('#prescriptions').is(':checked');

    // Construct the route URL
    const routeUrl = '/private-clinic/patient/patientdetailreport/' + patientId + '/' + isPatienthistory + '/' + isAppointment + '/' + isAccounts + '/' + isPrescriptions;

    // Open the route URL in a new tab
    window.open(routeUrl, '_blank');

    // Uncheck the checkboxes
    $('#patienthistory').prop('checked', false);
    $('#appointment').prop('checked', false);
    $('#accounts').prop('checked', false);
    $('#prescriptions').prop('checked', false);

    // Close the modal
    $('#staticBackdrop .btn-close').click();
});




$(document).on('click', '.toggleStatusButton', function (e) {
  e.preventDefault();
  var dtUserTable = $('.user-list-table');
  var id = $(this).data('user_id');
  let button = $(this);
  var csrfToken = $('meta[name="csrf-token"]').attr('content');

  $.ajax({
    url: baseurl + '/private-clinic/patient/toggle-status/' + id,
    method: 'post',
    headers: {
      'X-CSRF-TOKEN': csrfToken
    },
    success: function (response) {
      console.log(response.newStatus);
      if (response.newStatus === 'active') {
        button.text('Deactivate');
        // Update the badge for the user
        $('span[data-user_id="' + id + '"]').attr('class', 'badge rounded-pill ' + statusObj['active'].class).text(statusObj['active'].title);
      } else {
        button.text('Activate');
        // Update the badge to a different status as per your logic
        var newStatusClass = response.newStatus === 'suspend' ? 'suspend' : 'in_active';
        $('span[data-user_id="' + id + '"]').attr('class', 'badge rounded-pill ' + statusObj[newStatusClass].class).text(statusObj[newStatusClass].title);
      }
      Swal.fire({
        title: 'Success',
        text: response.message,
        icon: 'success',
        // confirmButtonText: 'OK'
        showConfirmButton: false,
        timer: 800
      });
      // location.reload();
      dtUserTable.DataTable().ajax.reload(null, false);
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
