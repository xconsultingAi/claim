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
          <h4 class="card-title">Update Branch</h4>
        </div>
        <div class="card-body">
            <form id="jquery-val-form">
                <input type="hidden" id="id" name="id" value="{{$branch['id']}}" />
            <div class="row">
              <div class="col-md-3 col-6">
                <div class="mb-1">
                  <label class="form-label" for="name">Branch Name</label>
                  <input
                      type="text"
                      class="form-control"
                      id="name"
                      name="name"
                      value="{{ $branch['name'] ?? ''}}"
                  />
                  </div>
              </div>
              <div class="col-md-3 col-6">
                <div class="mb-1">
                    <label class="form-label" for="city">City</label>
                    <input
                        type="text"
                        class="form-control"
                        id="city"
                        name="city"
                        value="{{ $branch['city'] ?? ''}}"
                    />
                    </div>
              </div>
              <div class="col-md-3 col-6">
                <div class="mb-1">
                    <label class="form-label" for="country">Country</label>
                    <input
                        type="text"
                        class="form-control"
                        id="country"
                        name="country"
                        placeholder=""
                        value="{{ $branch['country'] ?? ''}}"
                    />
                    </div>
              </div>
              <div class="col-md-3 col-6">
                <div class="mb-1">
                    <label class="form-label" for="state">State</label>
                    <input
                        type="text"
                        class="form-control"
                        id="state"
                        name="state"
                        placeholder="punjab"
                        value="{{ $branch['state'] ?? ''}}"
                    />
                    </div>
                     </div>
            </div>
            <div class="row">
              <div class="col-md-3 col-6">
                <div class="mb-1">
                    <label class="form-label" for="status">Status</label>
                    <select class="form-select select2" id="status" name="status">
                        <option value="">Select Status</option>
                        @foreach($statuses as $key => $status)
                            <option value="{{ $key }}" {{ $key == $branch['status'] ? 'selected' : ''}}>{{ $status}}</option>
                        @endforeach
                    </select>
                </div>
              </div>
              <div class="col-md-3 col-6">
                <div class="mb-1">
                    <label class="form-label" for="email">Email</label>
                    <input
                        type="email"
                        class="form-control"
                        id="email"
                        name="email"
                        placeholder="Abc@mailinator.com"
                        value="{{ $branch['email'] ?? ''}}"
                    />
                    </div>
              </div>
              <div class="col-md-3 col-6">
                <div class="mb-1">
                  <label class="form-label" for="phone">Phone No</label>
                  <input
                      type="text"
                      class="form-control"
                      id="phone"
                      name="phone"
                      placeholder=""
                      value="{{ $branch['phone'] ?? ''}}"
                  />
                 </div>
            </div>
            <div class="col-md-3 col-6">
              <div class="mb-1">
                  <label class="form-label" for="address">Address</label>
                  <input
                      type="text"
                      class="form-control"
                      id="address"
                      name="address"
                      placeholder=""
                      value="{{ $branch['address'] ?? ''}}"
                  />
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
  <script src="{{ asset('js/scripts/hms-settings/branch/add-branch.js') }}"></script>
@endsection