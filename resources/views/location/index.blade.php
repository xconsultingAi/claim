@extends('layouts/contentLayoutMaster')
@section('vendor-style')
  {{-- Vendor Css files --}}
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/forms/select/select2.min.css')) }}">
@endsection

@section('page-style')
  {{-- Page Css files --}}
  <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/form-validation.css')) }}">
@endsection
@section('content')
<section class="app-user-list">
  <!-- map container start -->
  <div class="card">
    <div id="map" style="height: 500px;"></div> <!-- Map container -->
  </div>
  <!-- map container end -->
</section>
@endsection

@section('vendor-script')
    {{-- Include Google Maps API --}}
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHv09NIZWBnEcwg2GGSem0BDyNY5rBE_0"></script>
@endsection

@section('page-script')
  {{-- Page js files --}}
  <!-- <script>
  $(document).ready(function () {
    var map;
    var marker;
    var geocoder = new google.maps.Geocoder();
    var defaultLocation = { lat: 30.3753, lng: 69.3451 }; // Default location (Pakistan center)

    // Get the latitude and longitude values from the input fields
    var initialLat = parseFloat($('#latitude').val());
    var initialLng = parseFloat($('#longitude').val());
    // Initialize the map
    function initialize() {
      var mapOptions = {
        zoom: 5,
        center: initialLat && initialLng ? { lat: initialLat, lng: initialLng } : defaultLocation,
        restriction: {
          latLngBounds: {
            north: 37.084107,
            south: 23.6345,
            east: 77.837451,
            west: 60.872972
          },
          strictBounds: true,
        },
      };

      map = new google.maps.Map(document.getElementById('map'), mapOptions);

      // Place the marker if latitude and longitude are available
      if (initialLat && initialLng) {
        marker = new google.maps.Marker({
          position: { lat: initialLat, lng: initialLng },
          map: map
        });
      }

      // Add a click event listener on the map
      map.addListener('click', function(event) {
        var clickedLocation = event.latLng;

        // Place a marker at the clicked location
        if (marker) {
          marker.setMap(null);
        }

        marker = new google.maps.Marker({
          position: clickedLocation,
          map: map
        });

        // Update latitude and longitude fields
        $('#latitude').val(clickedLocation.lat());
        $('#longitude').val(clickedLocation.lng());

        // Perform reverse geocoding to get the address
        geocoder.geocode({ location: clickedLocation }, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
              // Check if the address contains a Plus Code and remove if necessary
              var formattedAddress = results[0].formatted_address;
              
              // Set the address in the address input field
              $('#address').val(formattedAddress);
            } else {
              alert('No address found for this location.');
            }
          } else {
            alert('Geocoder failed due to: ' + status);
          }
        });
      });
    }

    // Initialize the map on window load
    google.maps.event.addDomListener(window, 'load', initialize);
  });
</script> -->

<script>
$(document).ready(function () {
    // Check if geolocation is available
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var currentLat = position.coords.latitude;
            var currentLng = position.coords.longitude;

            // Initialize the map centered on current location
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                center: { lat: currentLat, lng: currentLng }
            });

            // Add a marker for the current location
            var currentLocationMarker = new google.maps.Marker({
                position: { lat: currentLat, lng: currentLng },
                map: map,
                icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',  // Custom icon for current location
                title: 'Your Current Location'
            });

            // AJAX call to the server to fetch nearby shop data
            $.ajax({
                url: 'location/get-location-list/' + currentLat + '/' + currentLng,   // Your backend route to fetch shop data
                type: 'GET',
                success: function (response) {
                    console.log(response);

                    // Iterate over the response and place shop markers
                    $.each(response.data, function (index, shop) {
                      var shopLat = parseFloat(shop.latitude);
                      var shopLng = parseFloat(shop.longitude);
                        console.log(shopLat,shopLng);
                        // Create the shop marker
                        var shopMarker = new google.maps.Marker({
                            position: { lat: shopLat, lng: shopLng },  // Set the marker position
                            map: map,                                  // Attach to the map
                            icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png', // Custom shop icon
                            title: shop.name + ' ( ' + shop.mobile_no +' )'                        // Set marker title to shop name
                        });

                        // Create an info window with shop details
                        var infoWindow = new google.maps.InfoWindow({
                            content: '<div><strong>' + shop.name +' ( ' + shop.mobile_no+'  )'+ '</strong><br>' + shop.address + '</div>'
                        });

                        // Add click listener to the marker to show the info window
                        shopMarker.addListener('click', function () {
                            infoWindow.open(map, shopMarker);  // Show info window when marker is clicked
                        });
                    });
                },
                error: function (error) {
                    console.error('Error fetching shop data:', error);
                }
            });
        }, function (error) {
            console.error('Error getting location:', error);
            alert("Unable to retrieve your location. Please ensure location services are enabled.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

</script>


@endsection
