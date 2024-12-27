@extends('layouts/contentLayoutMaster')
@section('vendor-style')
  {{-- Page Css files --}}
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/dataTables.bootstrap5.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/responsive.bootstrap5.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/buttons.bootstrap5.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/rowGroup.bootstrap5.min.css')) }}">
@endsection
@section('content')
<!-- Full-Page Container -->
    <div class="container-fluid d-flex justify-content-center align-items-center transparent-bg">
        <div class="text-center">
            <h5 class="display-3 mb-4" style="color:rgb(2, 121, 55)">Welcome {{Auth::user()->name}}</h5>
            <p class="lead mb-4">Here you can manage your account, claims, and much more!</p>

            <!-- Example of a big call-to-action or status message -->
            <div class="alert alert-dark">
                <h4 class="alert-heading">Important Notice:</h4>
                <p>Your system is up to date, and everything is running smoothly.</p>
                <hr>
                <p class="mb-0">If you encounter any issues, feel free to contact support.</p>
            </div>

            <!-- A Button (if needed) -->
            <!-- <a href="#" class="btn btn-primary btn-lg">Get Started</a> -->
        </div>
    </div>
    @endsection

@section('vendor-script')
    <script src="{{ asset(mix('vendors/js/tables/datatable/jquery.dataTables.min.js')) }}"></script>
    <script src="{{ asset(mix('vendors/js/tables/datatable/dataTables.bootstrap5.min.js')) }}"></script>
    <script src="{{ asset(mix('vendors/js/tables/datatable/dataTables.responsive.min.js')) }}"></script>
    <script src="{{ asset(mix('vendors/js/tables/datatable/responsive.bootstrap5.js')) }}"></script>
    <script src="{{ asset(mix('vendors/js/tables/datatable/datatables.buttons.min.js')) }}"></script>
    <script src="{{ asset(mix('vendors/js/tables/datatable/jszip.min.js')) }}"></script>
    <script src="{{ asset(mix('vendors/js/tables/datatable/pdfmake.min.js')) }}"></script>
    <script src="{{ asset(mix('vendors/js/tables/datatable/vfs_fonts.js')) }}"></script>
    <script src="{{ asset(mix('vendors/js/tables/datatable/buttons.html5.min.js')) }}"></script>
    <script src="{{ asset(mix('vendors/js/tables/datatable/buttons.print.min.js')) }}"></script>
    <script src="{{ asset(mix('vendors/js/tables/datatable/dataTables.rowGroup.min.js')) }}"></script>
    <script src="{{ asset(mix('vendors/js/forms/validation/jquery.validate.min.js')) }}"></script>
    <script src="{{ asset(mix('vendors/js/extensions/sweetalert2.all.min.js')) }}"></script>
@endsection
@section('page-script')
  {{-- Page js files --}}
  <script src="{{ asset('js/scripts/claim/claim-listing.js') }}"></script>
  <script src="{{ asset('js/scripts/claim/claim-record-modal.js') }}"></script>
@endsection