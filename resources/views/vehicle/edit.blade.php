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
          <h4 class="card-title">Update Vehicle</h4>
        </div>
        <div class="card-body">
            <form id="jquery-val-form">
                <input type="hidden" id="id" name="id" value="{{$branch['id']}}" />
            <div class="row">
            <div class="mb-1 col-md-12">
              <div class="mb-1 col-md-12">
                <label class="form-label" for="companyId">Company</label>
                <select required class="select2 w-100 form-select" id="companyId" name="companyId">
                  @foreach($getTitleList as $key => $firstname)
                  <option value="{{ $key }}" {{ $branch->company_id == $key ? 'selected' : '' }}>{{ $firstname }}</option>
                  @endforeach
                </select>
              </div>
            </div>
      
            <div class="mb-1 col-md-12">
              <label class="form-label" for="vehicle_name">Vehicle Name</label>
              <input type="text" name="vehicle_name" id="vehicle_name" class="form-control"  value="{{$branch['vehicle_name']}}"  placeholder="john" required />
            </div>
            <div class="mb-1 col-md-12">
              <label class="form-label" for="vehicle_model">Vehicle Model</label>
              <input type="text" name="vehicle_model" id="vehicle_model" class="form-control" value="{{$branch['vehicle_model']}}" placeholder="(472) 765-3654" />
            </div>

          
            <div class="mb-1 col-md-12">
              <label class="form-label" for="number_plate">Number Plate</label>
              <input type="text" name="number_plate" id="number_plate" class="form-control" value="{{$branch['number_plate']}}"  placeholder="(472) 765-3654" />
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
  <script src="{{ asset('js/scripts/vehicle/add-vehicle.js') }}"></script>
@endsection