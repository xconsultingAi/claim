@extends('layouts/fullLayoutMaster')

@section('title', 'Register Multi Steps')

@section('vendor-style')
<link rel="stylesheet" href="{{ asset(mix('vendors/css/forms/wizard/bs-stepper.min.css')) }}">
<link rel="stylesheet" href="{{ asset(mix('vendors/css/forms/select/select2.min.css')) }}">
<link rel="stylesheet" href="{{ asset(mix('vendors/css/pickers/flatpickr/flatpickr.min.css')) }}">

@endsection

@section('page-style')
<link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/form-wizard.css')) }}">
<link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/form-validation.css')) }}">
<link rel="stylesheet" href="{{ asset(mix('css/base/pages/authentication.css')) }}">
<link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/pickers/form-flat-pickr.css')) }}">
<link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/pickers/form-flat-pickr.css')) }}">
<script src="{{asset(mix('vendors/js/pickers/flatpickr/flatpickr.min.js')) }}"></script>
@endsection
<style>
  .checkbox-padding {
    padding-top: 30px;
  }
</style>

@section('content')
<div class="auth-wrapper auth-cover">
  <div class="auth-inner row m-0">
    <!-- Brand logo-->
    <a class="brand-logo" href="#">
      <svg
        viewBox="0 0 139 95"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        height="28">
        <defs>
          <lineargradient id="linearGradient-1" x1="100%" y1="10.5120544%" x2="50%" y2="89.4879456%">
            <stop stop-color="#000000" offset="0%"></stop>
            <stop stop-color="#FFFFFF" offset="100%"></stop>
          </lineargradient>
          <lineargradient id="linearGradient-2" x1="64.0437835%" y1="46.3276743%" x2="37.373316%" y2="100%">
            <stop stop-color="#EEEEEE" stop-opacity="0" offset="0%"></stop>
            <stop stop-color="#FFFFFF" offset="100%"></stop>
          </lineargradient>
        </defs>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Artboard" transform="translate(-400.000000, -178.000000)">
            <g id="Group" transform="translate(400.000000, 178.000000)">
              <path
                class="text-primary"
                id="Path"
                d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                style="fill: currentColor"></path>
              <path
                id="Path1"
                d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                fill="url(#linearGradient-1)"
                opacity="0.2"></path>
              <polygon
                id="Path-2"
                fill="#000000"
                opacity="0.049999997"
                points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"></polygon>
              <polygon
                id="Path-21"
                fill="#000000"
                opacity="0.099999994"
                points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"></polygon>
              <polygon
                id="Path-3"
                fill="url(#linearGradient-2)"
                opacity="0.099999994"
                points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"></polygon>
            </g>
          </g>
        </g>
      </svg>
      <h2 class="brand-text text-primary ms-1">PCM</h2>
    </a>
    <!-- /Brand logo-->

    <!-- Left Text-->
    <div class="col-lg-3 d-none d-lg-flex align-items-center p-0">
      <div class="w-100 d-lg-flex align-items-center justify-content-center">
        <img
          class="img-fluid w-100"
          src="{{asset('images/illustration/create-account.svg')}}"
          alt="multi-steps" />
      </div>
    </div>
    <!-- /Left Text-->

    <!-- Register-->
    <div class="col-lg-9 d-flex align-items-center auth-bg px-2 px-sm-3 px-lg-5 pt-3">
      <div class="width-700 mx-auto">
        <div class="bs-stepper register-multi-steps-wizard shadow-none">
          <div class="bs-stepper-header px-0" role="tablist">
            <div class="step" data-target="#account-details" role="tab" id="account-details-trigger">
              <button type="button" class="step-trigger">
              </button>
            </div>
          </div>
          <div class="bs-stepper-content px-0 mt-4">
            <div id="account-details" class="content" role="tabpanel" aria-labelledby="account-details-trigger">
              <div class="content-header mb-2">
                <h2 class="fw-bolder mb-75">Account Information</h2>
                <span>Enter your email & password details</span>
              </div>
              <form id="jquery-val-form">
                @csrf
                <input type="hidden" id="id" name="id" value="" />
                <input type="hidden" id="is_super" name="is_super" value="" />
                <input type="hidden" id="employee_id" name="employee_id" value="" />
                <input type="hidden" id="dependent_id" name="dependent_id" value="" />
                <div class="row">
                  <div class="col-md-6 mb-1">
                    <label class="form-label" for="name">Name</label>
                    <input type="text" name="name" id="name" class="form-control" value="" placeholder="john" />
                  </div>
                  <div class="col-md-6 mb-1">
                    <label class="form-label" for="firstname">User Name</label>
                    <input type="text" name="username" id="username" class="form-control" value="" placeholder="john" />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-1">
                    <label class="form-label" for="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      class="form-control"
                      placeholder="john.doe@email.com"
                      aria-label="john.doe" />
                  </div>
                  <div class="col-md-6 mb-1">
                    <label class="form-label" for="password">Password</label>
                    <div class="input-group form-password-toggle">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        class="form-control"
                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;" required />
                      <span class="input-group-text cursor-pointer"><i data-feather="eye"></i></span>
                    </div>
                  </div>
                </div>
                
                <div class="row">
                  <div class="mb-1 col-md-6">
                    <label class="form-label" for="role">Role</label>
                    <select class="select2 w-100" name="role_id" id="role_id">
                      <option value="" label="blank">Select Role</option>
                      @foreach ($roles as $role)
                      <option value="{{$role['id']}}" data-slug="{{$role['slug']}}">{{$role['name']}}</option>
                      @endforeach
                    </select>
                  </div>
                  <div class="mb-1 col-md-6">
                    <label class="form-label" for="shop">Shop</label>
                    <select class="select2 w-100" name="shop_id" id="shop_id">
                      <option value="" label="blank">Select Shop</option>
                      @foreach ($shops as $shop)
                      <option value="{{$shop['id']}}">{{$shop['name']}}</option>
                      @endforeach
                    </select>
                  </div>
                </div>
              <button type="submit" class="btn btn-success btn-submit" id="submit_button">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection

@section('vendor-script')
<script src="{{asset(mix('vendors/js/forms/wizard/bs-stepper.min.js'))}}"></script>
<script src="{{asset(mix('vendors/js/forms/select/select2.full.min.js'))}}"></script>
<script src="{{asset(mix('vendors/js/forms/validation/jquery.validate.min.js'))}}"></script>
<script src="{{asset(mix('vendors/js/forms/cleave/cleave.min.js'))}}"></script>
<script src="{{asset(mix('vendors/js/forms/cleave/addons/cleave-phone.us.js'))}}"></script>
<script src="{{ asset(mix('vendors/js/pickers/flatpickr/flatpickr.min.js')) }}"></script>
<script src="{{ asset(mix('vendors/js/extensions/sweetalert2.all.min.js')) }}"></script>
@endsection

@section('page-script')
<script src="{{asset('js/scripts/user/add-user-first.js')}}"></script>
<script src="{{asset('js/scripts/user/add-user.js')}}"></script>
@endsection