
@extends('layouts/contentLayoutMaster')

@section('title', 'Dashboard Analytics')

@section('vendor-style')
  <!-- vendor css files -->
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/charts/apexcharts.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/extensions/toastr.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/dataTables.bootstrap5.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/responsive.bootstrap5.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/pickers/flatpickr/flatpickr.min.css')) }}">
@endsection
@section('page-style')
  <!-- Page css files -->
  <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/charts/chart-apex.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/extensions/ext-component-toastr.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('css/base/pages/app-invoice-list.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/pickers/form-flat-pickr.css')) }}">
  @endsection

@section('content')
<!-- Dashboard Analytics Start -->
<section id="dashboard-analytics">
  
  <!-- <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-md-3 mb-1">
          <label class="text-primary fw-bold" for="start_date">Start Date</label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            value=""
            class="form-control flatpickr-human-friendly"
            placeholder="YYYY-MM-DD"
          />
        </div>
        <div class="col-md-3 mb-1">
          <label class="text-primary fw-bold" for="end_date">End Date</label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            value=""
            class="form-control flatpickr-human-friendly"
            placeholder="YYYY-MM-DD"
          />
        </div>
        <div class="col-md-3 mb-1 d-flex align-items-end">
          <button class="btn btn-primary" id="search_button">Search</button>
        </div>
      </div>
    </div>
  </div>
  
  
  <div class="row match-height">
    <div class="col-lg-4 col-sm-6 col-12">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h4 class="card-title">PATIENTS ATTENDED</h4>
        </div>
        <div class="card-body">
          <div class="my-1">
            <div class="d-flex align-items-center">
              <div class="avatar me-50">
                <span class="avatar-content">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user font-medium-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </span>
              </div>
              <div class="more-info">
                <h6 class="mb-0">Total Patients</h6>
                <p class="mb-0" id="patients_attended_total">0</p>
              </div>
            </div>
          </div>
          <div class="row border-top text-center mx-0">
            <div class="col-6 border-end py-1">
              <p class="card-text text-muted mb-0">CB</p>
              <h3 class="fw-bolder mb-0" id="patients_attended_cb">0</h3>
            </div>
            <div class="col-6 py-1">
              <p class="card-text text-muted mb-0">NON-CB</p>
              <h3 class="fw-bolder mb-0" id="patients_attended_non_cb">0</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-4 col-sm-6 col-12">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h4 class="card-title">PATIENTS UN-ATTENDED</h4>
        </div>
        <div class="card-body">
          <div class="my-1">
            <div class="d-flex align-items-center">
              <div class="avatar me-50">
                <span class="avatar-content">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user font-medium-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </span>
              </div>
              <div class="more-info">
                <h6 class="mb-0">Total Un-attended Patients</h6>
                <p class="mb-0" id="unattended_total">0</p>
              </div>
            </div>
          </div>
          <div class="row border-top text-center mx-0">
            <div class="col-6 border-end py-1">
              <p class="card-text text-muted mb-0">CB</p>
              <h3 class="fw-bolder mb-0" id="unattended_cb">0</h3>
            </div>
            <div class="col-6 py-1">
              <p class="card-text text-muted mb-0">NON-CB</p>
              <h3 class="fw-bolder mb-0" id="unattended_non_cb">0</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-4 col-sm-6 col-12">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h4 class="card-title">DENTAL PROCEDURES PERFORMED</h4>
        </div>
        <div class="card-body">
          <div class="my-1">
            <div class="d-flex align-items-center">
              <div class="avatar me-50">
                <span class="avatar-content">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user font-medium-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </span>
              </div>
              <div class="more-info">
                <h6 class="mb-0">Total DENTAL PROCEDURES</h6>
                <p class="mb-0" id="dental_procedure_total">0</p>
              </div>
            </div>
          </div>
          <div class="row border-top text-center mx-0">
            <div class="col-6 border-end py-1">
              <p class="card-text text-muted mb-0">CB</p>
              <h3 class="fw-bolder mb-0" id="dental_procedure_cb">0</h3>
            </div>
            <div class="col-6 py-1">
              <p class="card-text text-muted mb-0">NON-CB</p>
              <h3 class="fw-bolder mb-0" id="dental_procedure_non_cb">0</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row match-height">
    <div class="col-lg-4 col-sm-6 col-12">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h4 class="card-title">LAB TESTS PERFORMED</h4>
        </div>
        <div class="card-body">
          <div class="my-1">
            <div class="d-flex align-items-center">
              <div class="avatar me-50">
                <span class="avatar-content">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user font-medium-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </span>
              </div>
              <div class="more-info">
                <h6 class="mb-0">Total Performed Test</h6>
                <p class="mb-0" id="performed_test_total">0</p>
              </div>
            </div>
          </div>
          <div class="row border-top text-center mx-0">
            <div class="col-6 border-end py-1">
              <p class="card-text text-muted mb-0">CB</p>
              <h3 class="fw-bolder mb-0" id="performed_test_cb">0</h3>
            </div>
            <div class="col-6 py-1">
              <p class="card-text text-muted mb-0">NON-CB</p>
              <h3 class="fw-bolder mb-0" id="performed_test_non_cb">0</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-4 col-sm-6 col-12">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h4 class="card-title">RADIOLOGY SCANS PERFORMED</h4>
        </div>
        <div class="card-body">
          <div class="my-1">
            <div class="d-flex align-items-center">
              <div class="avatar me-50">
                <span class="avatar-content">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user font-medium-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </span>
              </div>
              <div class="more-info">
                <h6 class="mb-0">Total RADIOLOGY SCANS</h6>
                <p class="mb-0" id="radiology_total">0</p>
              </div>
            </div>
          </div>
          <div class="row border-top text-center mx-0">
            <div class="col-6 border-end py-1">
              <p class="card-text text-muted mb-0">CB</p>
              <h3 class="fw-bolder mb-0" id="radiology_cb">0</h3>
            </div>
            <div class="col-6 py-1">
              <p class="card-text text-muted mb-0">NON-CB</p>
              <h3 class="fw-bolder mb-0" id="radiology_non_cb">0</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-lg-4 col-sm-6 col-12">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h4 class="card-title">ECG PERFORMED</h4>
        </div>
        <div class="card-body">
          <div class="my-1">
            <div class="d-flex align-items-center">
              <div class="avatar me-50">
                <span class="avatar-content">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user font-medium-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </span>
              </div>
              <div class="more-info">
                <h6 class="mb-0">Total PERFORMED ECG</h6>
                <p class="mb-0" id="performed_ecg_total">0</p>
              </div>
            </div>
          </div>
          <div class="row border-top text-center mx-0">
            <div class="col-6 border-end py-1">
              <p class="card-text text-muted mb-0">CB</p>
              <h3 class="fw-bolder mb-0" id="performed_ecg_cb">0</h3>
            </div>
            <div class="col-6 py-1">
              <p class="card-text text-muted mb-0">NON-CB</p>
              <h3 class="fw-bolder mb-0" id="performed_ecg_non_cb">0</h3>
            </div>
          </div>
        </div>
      </div>
    </div>  
  </div>

  <div class="row match-height">
    <div class="col-lg-4 col-sm-6 col-12">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h4 class="card-title">LAB TESTS REVENUE</h4>
        </div>
        <div class="card-body">
          <div class="my-1">
            <div class="d-flex align-items-center">
              <div class="avatar me-50">
                <span class="avatar-content">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user font-medium-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </span>
              </div>
              <div class="more-info">
                <h6 class="mb-0">Total REVENUE</h6>
                <p class="mb-0" id="labTestsPrice_total">0</p>
              </div>
            </div>
          </div>
          <div class="row border-top text-center mx-0">
            <div class="col-6 border-end py-1">
              <p class="card-text text-muted mb-0">CB</p>
              <h3 class="fw-bolder mb-0" id="cb_labTestsPrice">0</h3>
            </div>
            <div class="col-6 py-1">
              <p class="card-text text-muted mb-0">NON-CB</p>
              <h3 class="fw-bolder mb-0" id="non_cb_labTestsPrice">0</h3>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="col-lg-4 col-sm-6 col-12">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h4 class="card-title">RADIOLOGY SCANS REVENUE</h4>
        </div>
        <div class="card-body">
          <div class="my-1">
            <div class="d-flex align-items-center">
              <div class="avatar me-50">
                <span class="avatar-content">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user font-medium-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </span>
              </div>
              <div class="more-info">
                <h6 class="mb-0">Total REVENUE</h6>
                <p class="mb-0" id="labScansPrice_total">0</p>
              </div>
            </div>
          </div>
          <div class="row border-top text-center mx-0">
            <div class="col-6 border-end py-1">
              <p class="card-text text-muted mb-0">CB</p>
              <h3 class="fw-bolder mb-0" id="cb_labScansPrice">0</h3>
            </div>
            <div class="col-6 py-1">
              <p class="card-text text-muted mb-0">NON-CB</p>
              <h3 class="fw-bolder mb-0" id="non_cb_labScansPrice">0</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-4 col-sm-6 col-12">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h4 class="card-title">ECG REVENUE</h4>
        </div>
        <div class="card-body">
          <div class="my-1">
            <div class="d-flex align-items-center">
              <div class="avatar me-50">
                <span class="avatar-content">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user font-medium-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </span>
              </div>
              <div class="more-info">
                <h6 class="mb-0">Total REVENUE</h6>
                <p class="mb-0" id="cb_labECGPrice_total">0</p>
              </div>
            </div>
          </div>
          <div class="row border-top text-center mx-0">
            <div class="col-6 border-end py-1">
              <p class="card-text text-muted mb-0">CB</p>
              <h3 class="fw-bolder mb-0" id="cb_labECGPrice">0</h3>
            </div>
            <div class="col-6 py-1">
              <p class="card-text text-muted mb-0">NON-CB</p>
              <h3 class="fw-bolder mb-0" id="non_cb_labECGPrice">0</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div class="row match-height">
    <div class="col-lg-4 col-sm-6 col-12">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h4 class="card-title">PATIENTS ATTENDED GOHAWA</h4>
        </div>
        <div class="card-body">
          <div class="my-1">
            <div class="d-flex align-items-center">
              <div class="avatar me-50">
                <span class="avatar-content">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user font-medium-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </span>
              </div>
              <div class="more-info">
                <h6 class="mb-0">Total Gohawa Patients</h6>
                <p class="mb-0" id="gohawa_total">0</p>
              </div>
            </div>
          </div>
          <div class="row border-top text-center mx-0">
            <div class="col-6 border-end py-1">
              <p class="card-text text-muted mb-0">CB</p>
              <h3 class="fw-bolder mb-0" id="gohawa_cb">0</h3>
            </div>
            <div class="col-6 py-1">
              <p class="card-text text-muted mb-0">NON-CB</p>
              <h3 class="fw-bolder mb-0" id="gohawa_non_cb">0</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-4 col-sm-6 col-12">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h4 class="card-title">PATIENTS ATTENDED NADIRABAD</h4>
        </div>
        <div class="card-body">
          <div class="my-1">
            <div class="d-flex align-items-center">
              <div class="avatar me-50">
                <span class="avatar-content">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user font-medium-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </span>
              </div>
              <div class="more-info">
                <h6 class="mb-0">Total Nadirabad Patients</h6>
                <p class="mb-0" id="nadirabad_total">0</p>
              </div>
            </div>
          </div>
          <div class="row border-top text-center mx-0">
            <div class="col-6 border-end py-1">
              <p class="card-text text-muted mb-0">CB</p>
              <h3 class="fw-bolder mb-0" id="nadirabad_cb">0</h3>
            </div>
            <div class="col-6 py-1">
              <p class="card-text text-muted mb-0">NON-CB</p>
              <h3 class="fw-bolder mb-0" id="nadirabad_non_cb">0</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-4 col-sm-6 col-12">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h4 class="card-title">PATIENTS ATTENDED 28-BAZAR</h4>
        </div>
        <div class="card-body">
          <div class="my-1">
            <div class="d-flex align-items-center">
              <div class="avatar me-50">
                <span class="avatar-content">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user font-medium-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </span>
              </div>
              <div class="more-info">
                <h6 class="mb-0">Total 28-Bazar Patients</h6>
                <p class="mb-0" id="bazar28_total">0</p>
              </div>
            </div>
          </div>
          <div class="row border-top text-center mx-0">
            <div class="col-6 border-end py-1">
              <p class="card-text text-muted mb-0">CB</p>
              <h3 class="fw-bolder mb-0" id="bazar28_cb">0</h3>
            </div>
            <div class="col-6 py-1">
              <p class="card-text text-muted mb-0">NON-CB</p>
              <h3 class="fw-bolder mb-0" id="bazar28_non_cb">0</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
 
 <div class="col-lg-4 col-sm-6 col-12">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h4 class="card-title">DENTAL PROCEDURE REVENUE</h4>
        </div>
        <div class="card-body">
          <div class="my-1">
            <div class="d-flex align-items-center">
              <div class="avatar me-50">
                <span class="avatar-content">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user font-medium-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </span>
              </div>
              <div class="more-info">
                <h6 class="mb-0">Total Patients</h6>
                <p class="mb-0" id="bazar28_total">0</p>
              </div>
            </div>
          </div>
          <div class="row border-top text-center mx-0">
            <div class="col-6 border-end py-1">
              <p class="card-text text-muted mb-0">CB</p>
              <h3 class="fw-bolder mb-0" id="bazar28_cb">0</h3>
            </div>
            <div class="col-6 py-1">
              <p class="card-text text-muted mb-0">NON-CB</p>
              <h3 class="fw-bolder mb-0" id="bazar28_non_cb">0</h3>
            </div>
          </div>
        </div>
      </div>
    </div> -->


</section>
<!-- Dashboard Analytics end -->
@endsection

@section('vendor-script')
  <!-- vendor files -->
  <script src="{{ asset(mix('vendors/js/charts/apexcharts.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/extensions/toastr.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/extensions/moment.min.js')) }}"></script>
  {{-- <script src="{{ asset(mix('vendors/js/tables/datatable/jquery.dataTables.min.js')) }}"></script> --}}
  {{-- <script src="{{ asset(mix('vendors/js/tables/datatable/datatables.buttons.min.js')) }}"></script> --}}
  {{-- <script src="{{ asset(mix('vendors/js/tables/datatable/dataTables.bootstrap5.min.js')) }}"></script> --}}
  <script src="{{ asset(mix('vendors/js/pickers/flatpickr/flatpickr.min.js')) }}"></script>
  {{-- <script src="{{ asset(mix('vendors/js/tables/datatable/dataTables.responsive.min.js')) }}"></script> --}}
  {{-- <script src="{{ asset(mix('vendors/js/tables/datatable/responsive.bootstrap5.js')) }}"></script> --}}
@endsection
@section('page-script')
  <!-- Page js files -->
  <script src="{{ asset(mix('js/scripts/dashboard/dashboard-analytics.js')) }}"></script>
  {{-- <script src="{{ asset(mix('js/scripts/pages/app-invoice-list.js')) }}"></script> --}}
@endsection
