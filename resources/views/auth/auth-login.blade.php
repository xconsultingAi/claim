@extends('layouts/fullLayoutMaster')

@section('title', 'Login Page')

@section('page-style')
  {{-- Page Css files --}}
  <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/form-validation.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('css/base/pages/authentication.css')) }}">
@endsection

<style>
  /* Updated CSS styles */
  html, body {
    height: 100%;
    overflow: hidden;
  }
  .full-height {
    height: 100%;
  }
  .no-scrollbar {
    overflow: hidden;
  }
  /* End of Updated CSS styles */

  .line {
    line-height: 25px;
  }
  .wid {
    width: 100%;
  }
  .poss {
    position: absolute;
    right: 15px;
    top: 12px;
  }
  .bg {
    background-image: url("{{ asset('images/icons/fleet.jpg') }}");
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 0px 15px 15px 0px;
    height: 86vh;
  }
  .smcir {
    background-image: url("{{ asset('images/icons/top.jpg') }}");
    background-repeat: no-repeat;
    background-position: bottom right;
    background-size: 8%;
  }
  .bigcir {
    background-image: url("{{ asset('images/icons/bottom.jpg') }}");
    background-repeat: no-repeat;
    background-position: top left;
    background-size: 23%;
  }
  .card-round {
    border-radius: 15px 0px 0px 15px;
  }
</style>

@section('content')
<div class="full-height no-scrollbar"> <!-- Updated -->
  <div class="bigcir">
    <div class="smcir">
      <div class="row py-4 justify-content-center">
        <div class="col-sm-12 col-md-5 py-3 card-round d-flex align-items-center justify-content-center bg-white">
          <div class="px-md-5 login-page-width">
            <div class="fs-2 text-center fw-bolder">WELCOME TO</div>
            <div class="ms-auto col-4 me-auto">
              <img class="img-fluid my-2" src="https://www.urbansole.com.pk/cdn/shop/files/LOGO_9f054002-ed75-4464-9370-d672304d3457_200x.jpg?v=1734434517" />
            </div>
            @if($response)
              <p class="text-danger">{{ $response['message'] }}</p>
            @else
              <p class="card-text mb-2"></p>
            @endif
            <form class="auth-login-form mt-2" action="{{ route('login-verify') }}" method="POST">
              @csrf
              <div class="mt-1">
                <div class="input-group input-group-merge form-password-toggle">
                  <input type="email" class="form-control rounded-pill form-control-merge" id="email" name="email" tabindex="1" placeholder="Enter Your Email" aria-describedby="email" />
                  <span class="poss cursor-pointer"><i data-feather="mail"></i></span>
                </div>
              </div>
              <div class="my-1">
                <div class="d-flex justify-content-between">
                </div>
                <div class="input-group input-group-merge form-password-toggle">
                  <input type="password" class="rounded-pill form-control form-control-merge" id="password" name="password" tabindex="2" placeholder="PASSWORD" aria-describedby="password" />
                  <span class="poss cursor-pointer"><i data-feather="eye"></i></span>
                </div>
              </div>
              @if(session('error'))
                  <div class="alert alert-danger">{{ session('error') }}</div>
              @endif

              <div class="">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="remember-me" tabindex="3" />
                  <label class="form-check-label text-black fw-bolder fs-5" for="remember-me"> Remember Me </label>
                </div>
              </div>
              <div class="text-center">
                <button class="btn mt-2 full-width rounded-pill text-nowrap" tabindex="4" style="color: #fff!important; background-color:#3378b6!important">Sign in</button>
              </div>
              <div class="mt-2 text-center fs-5 fw-bolder text-black">Powered By <a href="https://xconsol.com//">xconsol<b></b></a></div>
            </form>
          </div>
        </div>
        <div class="d-flex align-items-center col-sm-12 col-md-5 bg">
          <img class="m-auto hide" src="{{ asset('images/icons/greenlogocopy.png') }}" style="display: none;" />
        </div>
      </div>
    </div>
  </div>
</div>
@endsection

@section('vendor-script')
<script src="{{ asset(mix('vendors/js/forms/validation/jquery.validate.min.js')) }}"></script>
@endsection

@section('page-script')
<script src="{{ asset(mix('js/scripts/pages/auth-login.js')) }}"></script>
@endsection