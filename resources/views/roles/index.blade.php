@extends('layouts/contentLayoutMaster')

@section('vendor-style')
  <!-- Vendor css files -->
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/dataTables.bootstrap5.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/responsive.bootstrap5.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/buttons.bootstrap5.min.css')) }}">
@endsection
@section('page-style')
  <!-- Page css files -->
  <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/form-validation.css')) }}">
@endsection

@section('content')
<h3>Roles List</h3>
<p class="mb-2">
  A role provided access to predefined menus and features so that depending <br />
  on assigned role an administrator can have access to what he need
</p>

<!-- Role cards -->
<div class="row">
    @if($roles)
    @foreach($roles as $role)
  <div class="col-xl-3 col-lg-6 col-md-6">
    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <span>Total {{$role['users_count']}} users</span>
          <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">
            <li
              data-bs-toggle="tooltip"
              data-popup="tooltip-custom"
              data-bs-placement="top"
              title="Vinnie Mostowy"
              class="avatar avatar-sm pull-up"
            >
              <img class="rounded-circle" src="{{asset('images/avatars/2.png')}}" alt="Avatar" />
            </li>
            <li
              data-bs-toggle="tooltip"
              data-popup="tooltip-custom"
              data-bs-placement="top"
              title="Allen Rieske"
              class="avatar avatar-sm pull-up"
            >
              <img class="rounded-circle" src="{{asset('images/avatars/12.png')}}" alt="Avatar" />
            </li>
            <li
              data-bs-toggle="tooltip"
              data-popup="tooltip-custom"
              data-bs-placement="top"
              title="Julee Rossignol"
              class="avatar avatar-sm pull-up"
            >
              <img class="rounded-circle" src="{{asset('images/avatars/6.png')}}" alt="Avatar" />
            </li>
            <li
              data-bs-toggle="tooltip"
              data-popup="tooltip-custom"
              data-bs-placement="top"
              title="Kaith D'souza"
              class="avatar avatar-sm pull-up"
            >
              <img class="rounded-circle" src="{{asset('images/avatars/11.png')}}" alt="Avatar" />
            </li>
          </ul>
        </div>
        <div class="d-flex justify-content-between align-items-end mt-1 pt-25">
          <div class="role-heading">
            <h4 class="fw-bolder">{{$role['name']}}</h4>
            <a href="javascript:;" class="role-edit-modal" data-bs-toggle="modal" data-bs-target="#addRoleModal" data-roleName="{{ $role['name'] }}" data-roleId="{{$role['id']}}">
              <small class="fw-bolder">Edit Role</small>
            </a>
          </div>
          <a href="javascript:void(0);" class="text-body role-delete" data-roleId="{{$role['id']}}">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash font-medium-2 text-body"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </a>
        </div>
      </div>
    </div>
  </div>
  @endforeach
  @endif
  <div class="col-xl-3 col-lg-6 col-md-6">
    <div class="card">
      <div class="row">
        <div class="col-sm-5">
          <div class="d-flex align-items-end justify-content-center h-100">
            <img
              src="{{asset('images/illustration/faq-illustrations.svg')}}"
              class="img-fluid mt-2"
              alt="Image"
              width="85"
            />
          </div>
        </div>
        <div class="col-sm-7">
          <div class="card-body text-sm-end text-center ps-sm-0">
            <a
              href="javascript:void(0)"
              data-bs-target="#addRoleModal"
              data-bs-toggle="modal"
              class="stretched-link text-nowrap add-new-role"
            >
              <span class="btn btn-primary mb-1">Add New Role</span>
            </a>
            <p class="mb-0">Add role, if it does not exist</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!--/ Role cards -->

<h3 class="mt-50">Total users with their roles</h3>
<p class="mb-2">Find all of your company’s administrator accounts and their associate roles.</p>
<!-- table -->
<div class="card">
  <div class="table-responsive">
    <table class="user-list-table table">
      <thead class="table-light">
        <tr>
          <th></th>
          <th></th>
          <th>Name</th>
          <th>Role</th>
          <th>Cnic</th>
          <th>Gender</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
    </table>
  </div>
</div>
<!-- table -->

@include('roles/_modals/modal-add-role')
@endsection

@section('vendor-script')
  <!-- Vendor js files -->
  <script src="{{ asset(mix('vendors/js/tables/datatable/jquery.dataTables.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/dataTables.bootstrap5.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/dataTables.responsive.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/responsive.bootstrap5.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/datatables.buttons.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/buttons.bootstrap5.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/datatables.checkboxes.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/forms/validation/jquery.validate.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/extensions/sweetalert2.all.min.js')) }}"></script>
@endsection
@section('page-script')
  <!-- Page js files -->
  <script src="{{ asset(mix('js/scripts/roles/modal-add-role.js')) }}"></script>
  <script src="{{ asset(mix('js/scripts/roles/user-roles.js')) }}"></script>
@endsection
