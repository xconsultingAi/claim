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
                <label class="form-label" for="article_number">Article Number</label>
                <input type="text" name="article_number" id="article_number" class="form-control" value="{{ $branch['article_number'] ?? ''}}" placeholder="Enter Article Number" required />
            </div>
            <div class="mb-1 col-md-12">
                <label class="form-label" for="color">Color</label>
                <input type="text" name="color" id="color" class="form-control" placeholder="Enter Shoe Color" value="{{ $branch['color'] ?? ''}}" required />
              </div>
              <div class="mb-1 col-md-12">
                <label class="form-label" for="size">Size</label>
                <input type="number" name="size" id="size" min="39" max="46" class="form-control" placeholder="Enter Shoe Size" value="{{ $branch['size'] ?? ''}}" required />
              </div>
            <div class="mb-1 col-md-12">
              <label class="form-label" for="name">Name</label>
              <input type="text" name="name" id="name" class="form-control" value="{{ $branch['name'] ?? ''}}" placeholder="john" required />
            </div>
            <div class="mb-1 col-md-12">
                <label class="form-label" for="invoice">Invoice</label>
                <input type="number" name="invoice" minlength="0" id="invoice" class="form-control" value="{{ $branch['invoice'] ?? ''}}" placeholder="Enter Invoice" required />
            </div>
            <div class="mb-1 col-md-12">
                <label class="form-label" for="purchase_date">Purchase Date</label>
                <input type="date" name="purchase_date" id="purchase_date" class="form-control" value="{{ $branch['purchase_date'] ?? ''}}" placeholder="Enter Purchase Date" required />
              </div>
              <div class="mb-1 col-md-12">
                <label class="form-label" for="article_price">Article Price</label>
                <input type="text" name="article_price" id="article_price" class="form-control" value="{{ $branch['article_price'] ?? ''}}" placeholder="Enter Article Price"  required />
              </div>
              <div class="mb-1 col-md-12">
                <label class="form-label" for="period">Period</label>
                <input type="text" name="period" id="period" class="form-control" value="{{ $branch['period'] ?? ''}}" placeholder="Enter Period" required />
              </div>
              <div class="mb-1 col-md-12">
                <label class="form-label" for="customer_name">Customer Name</label>
                <input type="text" name="customer_name" id="customer_name" class="form-control" value="{{ $branch['customer_name'] ?? ''}}" placeholder="Enter Customer Name" required />
              </div>
              <div class="mb-1 col-md-12">
                <label class="form-label" for="customer_address">Customer Address</label>
                <input type="text" name="customer_address" id="customer_address" class="form-control" value="{{ $branch['customer_address'] ?? ''}}" placeholder="Enter Customer Address" required />
              </div>
              <div class="mb-1 col-md-12">
                <label class="form-label" for="customer_email">Customer Email</label>
                <input type="text" name="customer_email" id="customer_email" class="form-control" value="{{ $branch['customer_email'] ?? ''}}" placeholder="Enter Customer Email" required />
              </div>
              <div class="mb-1 col-md-12">
                <label class="form-label" for="ptcl_number">Ptcl</label>
                <input type="text" name="ptcl_number" id="ptcl_number" minlength="11" maxlength="11" class="form-control" value="{{ $branch['ptcl_number'] ?? ''}}" placeholder="042 31234567" />
              </div>
              <div class="mb-1 col-md-12">
                <label class="form-label" for="cell">Cell</label>
                <input type="number" name="cell" id="cell" minlength="11" maxlength="11" class="form-control" value="{{ $branch['cell'] ?? ''}}" placeholder="(472) 765-3654" />
              </div>
              <div class="mb-1 col-md-12">
                <label class="form-label" for="shop_id">Shops</label>
                <select name="shop_id" id="shop_id" class="form-control">
                  <option value="">Select Shop Name</option>
                  @foreach($shops as $shop)
                    <option value="{{$shop->id}}" {{ $shop->id == $branch['shop_id'] ? 'selected' : '' }}>{{$shop->name}}</option>
                    @endforeach
                </select>
              </div>
              <div class="col-sm-10">
            <div class="container col-12 mt-2 mb-2 row">
              <div class="col-6">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="proposed_status" id="gridRadios1" value="0" checked>
                  <label class="form-check-label" for="gridRadios1">
                    Repair
                  </label>
                </div>
                </div>
                <div class="col-6">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="proposed_status" id="gridRadios1" value="1">
                  <label class="form-check-label" for="gridRadios1">
                    Replacement
                  </label>
                </div>
              </div>
            </div>
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
  <script src="{{ asset('js/scripts/claim/add-claim.js') }}"></script>
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