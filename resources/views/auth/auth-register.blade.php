@extends('layouts/fullLayoutMaster')

@section('title', 'Register Multi Steps')

@section('vendor-style')
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/forms/wizard/bs-stepper.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/forms/select/select2.min.css')) }}">
@endsection

@section('page-style')
  <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/form-wizard.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/form-validation.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('css/base/pages/authentication.css')) }}">
@endsection

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
        height="28"
      >
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
                style="fill: currentColor"
              ></path>
              <path
                id="Path1"
                d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                fill="url(#linearGradient-1)"
                opacity="0.2"
              ></path>
              <polygon
                id="Path-2"
                fill="#000000"
                opacity="0.049999997"
                points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
              ></polygon>
              <polygon
                id="Path-21"
                fill="#000000"
                opacity="0.099999994"
                points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
              ></polygon>
              <polygon
                id="Path-3"
                fill="url(#linearGradient-2)"
                opacity="0.099999994"
                points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
              ></polygon>
            </g>
          </g>
        </g>
      </svg>
      <h2 class="brand-text text-primary ms-1">Vuexy</h2>
    </a>
    <!-- /Brand logo-->

    <!-- Left Text-->
    <div class="col-lg-3 d-none d-lg-flex align-items-center p-0">
      <div class="w-100 d-lg-flex align-items-center justify-content-center">
        <img
          class="img-fluid w-100"
          src="{{asset('images/illustration/create-account.svg')}}"
          alt="multi-steps"
        />
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
                <span class="bs-stepper-box">
                  <i data-feather="home" class="font-medium-3"></i>
                </span>
                <span class="bs-stepper-label">
                  <span class="bs-stepper-title">Account</span>
                  <span class="bs-stepper-subtitle">Enter username</span>
                </span>
              </button>
            </div>
            <div class="line">
              <i data-feather="chevron-right" class="font-medium-2"></i>
            </div>
            <div class="step" data-target="#personal-info" role="tab" id="personal-info-trigger">
              <button type="button" class="step-trigger">
                <span class="bs-stepper-box">
                  <i data-feather="user" class="font-medium-3"></i>
                </span>
                <span class="bs-stepper-label">
                  <span class="bs-stepper-title">Personal</span>
                  <span class="bs-stepper-subtitle">Enter Information</span>
                </span>
              </button>
            </div>
            <div class="line">
              <i data-feather="chevron-right" class="font-medium-2"></i>
            </div>
            <div class="step" data-target="#billing" role="tab" id="billing-trigger">
              <button type="button" class="step-trigger">
                <span class="bs-stepper-box">
                  <i data-feather="credit-card" class="font-medium-3"></i>
                </span>
                <span class="bs-stepper-label">
                  <span class="bs-stepper-title">Billing</span>
                  <span class="bs-stepper-subtitle">Payment details</span>
                </span>
              </button>
            </div>
          </div>
          <div class="bs-stepper-content px-0 mt-4">
            <div id="account-details" class="content" role="tabpanel" aria-labelledby="account-details-trigger">
              <div class="content-header mb-2">
                <h2 class="fw-bolder mb-75">Account Information</h2>
                <span>Enter your email & password details</span>
              </div>
              <form>
                <div class="row">
                  <div class="col-md-3 mb-1">
                    <label class="form-label" for="firstname">First Name</label>
                    <input type="text" name="firstname" id="firstname" class="form-control" placeholder="john" />
                  </div>
                  <div class="col-md-3 mb-1">
                    <label class="form-label" for="lastname">Last Name</label>
                    <input type="text" name="lastname" id="lastname" class="form-control" placeholder="doe" />
                  </div>
                  <div class="col-md-6 mb-1">
                    <label class="form-label" for="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      class="form-control"
                      placeholder="john.doe@email.com"
                      aria-label="john.doe"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-1">
                    <label class="form-label" for="password">Password</label>
                    <div class="input-group input-group-merge form-password-toggle">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        class="form-control"
                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                      />
                      <span class="input-group-text cursor-pointer"><i data-feather="eye"></i></span>
                    </div>
                  </div>
                  <div class="col-md-6 mb-1">
                    <label class="form-label" for="confirm-password">Confirm Password</label>
                    <div class="input-group input-group-merge form-password-toggle">
                      <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        class="form-control"
                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                      />
                      <span class="input-group-text cursor-pointer"><i data-feather="eye"></i></span>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-3 mb-1">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" name="is_super" value="" id="is_super" />
                      <label class="form-check-label" for="multiStepsRememberMe">Is Super User</label>
                    </div>
                  </div>
                  <div class="col-3 mb-1">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" name="is_employee" value="" id="is_employee" />
                      <label class="form-check-label" for="multiStepsRememberMe">Is Employee</label>
                    </div>
                  </div>
                  <div class="col-6 mb-1">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="multiStepsRememberMe" />
                      <label class="form-check-label" for="multiStepsRememberMe">Remember me</label>
                    </div>
                  </div>
                </div>
              </form>

              <div class="d-flex justify-content-between mt-2">
                <button class="btn btn-outline-secondary btn-prev" disabled>
                  <i data-feather="chevron-left" class="align-middle me-sm-25 me-0"></i>
                  <span class="align-middle d-sm-inline-block d-none">Previous</span>
                </button>
                <button class="btn btn-primary btn-next">
                  <span class="align-middle d-sm-inline-block d-none">Next</span>
                  <i data-feather="chevron-right" class="align-middle ms-sm-25 ms-0"></i>
                </button>
              </div>
            </div>
            <div id="personal-info" class="content" role="tabpanel" aria-labelledby="personal-info-trigger">
              <div class="content-header mb-2">
                <h2 class="fw-bolder mb-75">Personal Information</h2>
                <span>Enter your Information</span>
              </div>
              <form>
                <div class="row">
                  <div class="col-md-6 mb-1">
                    <label class="form-label" for="cnic">CNIC</label>
                    <input
                      type="text"
                      name="cnic"
                      id="cnic"
                      class="form-control cnic-number-mask"
                      data-inputmask="'mask': '99999-9999999-9'"
                      placeholder="99999-9999999-9"
                    />
                  </div>
                  <div class="mb-1 col-md-6">
                    <label class="form-label" for="last-name">Last Name</label>
                    <input type="text" name="last-name" id="last-name" class="form-control" placeholder="Doe" />
                  </div>
                  <div class="col-md-6 mb-1">
                    <label class="form-label" for="mobile-number">Mobile number</label>
                    <input
                      type="text"
                      name="mobile-number"
                      id="mobile-number"
                      class="form-control mobile-number-mask"
                      placeholder="(472) 765-3654"
                    />
                  </div>
                  <div class="col-md-6 mb-1">
                    <label class="form-label" for="pin-code">PIN code</label>
                    <input
                      type="text"
                      name="pin-code"
                      id="pin-code"
                      class="form-control pin-code-mask"
                      placeholder="Code"
                      maxlength="6"
                    />
                  </div>

                  <div class="col-12 mb-1">
                    <label class="form-label" for="home-address">Home Address</label>
                    <input
                      type="text"
                      name="home-address"
                      id="home-address"
                      class="form-control"
                      placeholder="Address"
                    />
                  </div>

                  <div class="col-12 mb-1">
                    <label class="form-label" for="area-address">Area, Street, Sector, Village</label>
                    <input
                      type="text"
                      name="area-address"
                      id="area-address"
                      class="form-control"
                      placeholder="Area, Street, Sector, Village"
                    />
                  </div>

                  <div class="mb-1 col-md-6">
                    <label class="form-label" for="town-city">Town/City</label>
                    <input type="text" name="town-city" id="town-city" class="form-control" placeholder="Town/City" />
                  </div>
                  <div class="mb-1 col-md-6">
                    <label class="form-label" for="country">Country</label>
                    <select class="select2 w-100" name="country" id="country">
                      <option value="" label="blank"></option>
                      <option value="AK">Alaska</option>
                      <option value="HI">Hawaii</option>
                      <option value="CA">California</option>
                      <option value="NV">Nevada</option>
                      <option value="OR">Oregon</option>
                      <option value="WA">Washington</option>
                      <option value="AZ">Arizona</option>
                      <option value="CO">Colorado</option>
                      <option value="ID">Idaho</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NM">New Mexico</option>
                      <option value="ND">North Dakota</option>
                      <option value="UT">Utah</option>
                      <option value="WY">Wyoming</option>
                      <option value="AL">Alabama</option>
                      <option value="AR">Arkansas</option>
                      <option value="IL">Illinois</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="OK">Oklahoma</option>
                      <option value="SD">South Dakota</option>
                      <option value="TX">Texas</option>
                      <option value="TN">Tennessee</option>
                      <option value="WI">Wisconsin</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="IN">Indiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="OH">Ohio</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WV">West Virginia</option>
                    </select>
                  </div>
                </div>
              </form>

              <div class="d-flex justify-content-between mt-2">
                <button class="btn btn-primary btn-prev">
                  <i data-feather="chevron-left" class="align-middle me-sm-25 me-0"></i>
                  <span class="align-middle d-sm-inline-block d-none">Previous</span>
                </button>
                <button class="btn btn-primary btn-next">
                  <span class="align-middle d-sm-inline-block d-none">Next</span>
                  <i data-feather="chevron-right" class="align-middle ms-sm-25 ms-0"></i>
                </button>
              </div>
            </div>
            <div id="billing" class="content" role="tabpanel" aria-labelledby="billing-trigger">
              <div class="content-header mb-2">
                <h2 class="fw-bolder mb-75">Select Plan</h2>
                <span>Select plan as per your retirement</span>
              </div>

              <form>
                <!-- select plan options -->
                <div class="row custom-options-checkable gx-3 gy-2">
                  <div class="col-md-4">
                    <input class="custom-option-item-check" type="radio" name="plans" id="basicPlan" value="" />
                    <label class="custom-option-item text-center p-1" for="basicPlan">
                      <span class="custom-option-item-title h3 fw-bolder">Basic</span>
                      <span class="d-block m-75">A simple start for everyone</span>
                      <span class="plan-price">
                        <sup class="font-medium-1 fw-bold text-primary">$</sup>
                        <span class="pricing-value fw-bolder text-primary">0</span>
                        <sub class="pricing-duration text-body font-medium-1 fw-bold">/month</sub>
                      </span>
                    </label>
                  </div>

                  <div class="col-md-4">
                    <input
                      class="custom-option-item-check"
                      type="radio"
                      name="plans"
                      id="standardPlan"
                      value=""
                      checked
                    />
                    <label class="custom-option-item text-center p-1" for="standardPlan">
                      <span class="custom-option-item-title h3 fw-bolder">Standard</span>
                      <span class="d-block m-75">For small to medium businesses</span>
                      <span class="plan-price">
                        <sup class="font-medium-1 fw-bold text-primary">$</sup>
                        <span class="pricing-value fw-bolder text-primary">99</span>
                        <sub class="pricing-duration text-body font-medium-1 fw-bold">/month</sub>
                      </span>
                    </label>
                  </div>

                  <div class="col-md-4">
                    <input class="custom-option-item-check" type="radio" name="plans" id="enterprisePlan" value="" />
                    <label class="custom-option-item text-center p-1" for="enterprisePlan">
                      <span class="custom-option-item-title h3 fw-bolder">Enterprise</span>
                      <span class="d-block m-75">Solution for big organizations</span>
                      <span class="plan-price">
                        <sup class="font-medium-1 fw-bold text-primary">$</sup>
                        <span class="pricing-value fw-bolder text-primary">499</span>
                        <sub class="pricing-duration text-body font-medium-1 fw-bold">/month</sub>
                      </span>
                    </label>
                  </div>
                </div>
                <!-- / select plan options -->

                <div class="content-header my-2 py-1">
                  <h2 class="fw-bolder mb-75">Payment Information</h2>
                  <span>Enter your card Information</span>
                </div>

                <div class="row gx-2">
                  <div class="col-12 mb-1">
                    <label class="form-label" for="addCardNumber">Card Number</label>
                    <div class="input-group input-group-merge">
                      <input
                        id="addCardNumber"
                        name="addCard"
                        class="form-control credit-card-mask"
                        type="text"
                        placeholder="1356 3215 6548 7898"
                        aria-describedby="addCard"
                        data-msg="Please enter your credit card number"
                      />
                      <span class="input-group-text cursor-pointer p-25" id="addCard">
                        <span class="card-type"></span>
                      </span>
                    </div>
                  </div>

                  <div class="col-md-6 mb-1">
                    <label class="form-label" for="addCardName">Name On Card</label>
                    <input type="text" id="addCardName" class="form-control" placeholder="John Doe" />
                  </div>

                  <div class="col-6 col-md-3 mb-1">
                    <label class="form-label" for="addCardExpiryDate">Exp. Date</label>
                    <input
                      type="text"
                      id="addCardExpiryDate"
                      class="form-control expiry-date-mask"
                      placeholder="MM/YY"
                    />
                  </div>

                  <div class="col-6 col-md-3 mb-1">
                    <label class="form-label" for="addCardCvv">CVV</label>
                    <input
                      type="text"
                      id="addCardCvv"
                      class="form-control cvv-code-mask"
                      maxlength="3"
                      placeholder="654"
                    />
                  </div>
                </div>
              </form>

              <div class="d-flex justify-content-between mt-1">
                <button class="btn btn-primary btn-prev">
                  <i data-feather="chevron-left" class="align-middle me-sm-25 me-0"></i>
                  <span class="align-middle d-sm-inline-block d-none">Previous</span>
                </button>
                <button class="btn btn-success btn-submit">
                  <i data-feather="check" class="align-middle me-sm-25 me-0"></i>
                  <span class="align-middle d-sm-inline-block d-none">Submit</span>
                </button>
              </div>
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
@endsection

@section('page-script')
<script src="{{asset(mix('js/scripts/pages/auth-register.js'))}}"></script>
@endsection
