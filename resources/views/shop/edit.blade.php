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
<section class="bs-validation">
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">Update Shop</h4>
        </div>
        <div class="card-body">
            <form id="jquery-val-form">
                <input type="hidden" id="id" name="id" value="{{$branch['id']}}" />
            <div class="row">
            <div class="mb-1 col-md-12">
              <label class="form-label" for="name">Name</label>
              <input type="text" name="name" id="name" class="form-control" value="{{ $branch['name'] ?? ''}}" placeholder="john" required />
            </div>

            <div class="mb-1 col-md-12">
              <label class="form-label" for="mobile_no">Mobile Number</label>
              <input type="text" name="mobile_no" id="mobile_no" class="form-control"  value="{{ $branch['mobile_no'] ?? ''}}" placeholder="(472) 765-3654" />
            </div>
            <div class="mb-1 col-md-12">
              <label class="form-label" for="address">Address</label>
              <input type="text" name="address" id="address" class="form-control" value="{{ $branch['address'] ?? ''}}" placeholder="(472) 765-3654" />
            </div>

            <div id="map" style="height: 300px; width: 100%; margin-bottom: 15px;"></div>

              <div class="mb-1 col-md-6" hidden >
                <label class="form-label" for="latitude">Latitude</label>
                <input type="text" name="latitude" id="latitude"  value="{{ $branch['latitude'] ?? ''}}"class="form-control" readonly />
              </div>
              <div class="mb-1 col-md-6" hidden >
                <label class="form-label" for="longitude">Longitude</label>
                <input type="text" name="longitude" id="longitude" value="{{ $branch['longitude'] ?? ''}}"  class="form-control" readonly />
              </div>


            <div class="mb-1 col-md-12">
              <label class="form-label" for="email">Email</label>
              <input type="text" name="email" id="email" class="form-control" value="{{ $branch['email'] ?? ''}}" placeholder="Abc@mailinator.com" />
            </div>
            <div class="mb-1 col-md-12">
              <label class="form-label" for="password">Password</label>
              <input type="password" name="password" id="password" class="form-control" value="{{ $branch['password'] ?? ''}}" placeholder="Abc@mailinator.com" />
            </div>   
              <div class="col-12">
                <button type="submit" class="btn btn-primary" name="update" value="Update">Update</button>
                <a type="button" href="#" id="back_button" class="btn btn-secondary">Cancel</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>

@endsection
@section('vendor-script')
  <!-- vendor files -->
  <script src="{{ asset(mix('vendors/js/forms/select/select2.full.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/forms/validation/jquery.validate.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/extensions/sweetalert2.all.min.js')) }}"></script>
@endsection

@section('page-script')
  <!-- Page js files -->
  <script src="{{ asset('js/scripts/shop/add-shop.js') }}"></script>
    <!-- Google Maps API -->
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHv09NIZWBnEcwg2GGSem0BDyNY5rBE_0&libraries=places"></script>
    <script>
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
</script>

@endsection