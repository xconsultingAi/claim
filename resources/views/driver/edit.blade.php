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
          <h4 class="card-title">Update Driver</h4>
        </div>
        <div class="card-body">
            <form id="jquery-val-form">
                <input type="hidden" id="id" name="id" value="{{$branch['id']}}" />
            <div class="row">
    
            <div class="mb-1 col-md-12">
              <label class="form-label" for="name">Driver Name</label>
              <input type="text" name="name" id="name" class="form-control" value="{{$branch['name']}}"  placeholder="john" required />
            </div>
            <div class="mb-1 col-md-12">
              <label class="form-label" for="cnic">Driver CNIC No #</label>
              <input type="text" name="cnic" id="cnic" class="form-control" value="{{$branch['cnic']}}" placeholder="(472) 765-3654" />
            </div>
            <div class="mb-1 col-md-12">
              <label class="form-label" for="mobile_no">Driver Mobile No # </label>
              <input type="text" name="mobile_no" id="mobile_no" class="form-control" value="{{$branch['mobile_no']}}" placeholder="(472) 765-3654" />
            </div> 
          
            <div class="mb-1 col-md-12">
              <label class="form-label" for="contact_person">Driving Licence No #</label>
              <input type="text" name="contact_person" id="contact_person" class="form-control"  value="{{$branch['contact_person']}}" placeholder="(472) 765-3654" />
            </div>    
            <div class="mb-1 col-md-12">
              <label class="form-label" for="address">Address</label>
              <input type="text" name="address" id="address" class="form-control" value="{{$branch['address']}}" placeholder="(472) 765-3654" />
            </div> 
            <div class="mb-1 col-md-12">
                <label class="form-label" for="email">Email</label>
                <input type="email" name="email" id="email" class="form-control" placeholder="abc@mailinator.com"   value="{{$branch['email']}}"/>
              </div>

              <div class="mb-1 col-md-12">
                <label class="form-label" for="password">Password</label>
                <input type="password" name="password" id="password" class="form-control" placeholder="********" value="{{$branch['password']}}" />
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
  <script src="{{ asset('js/scripts/driver/add-driver.js') }}"></script>
@endsection