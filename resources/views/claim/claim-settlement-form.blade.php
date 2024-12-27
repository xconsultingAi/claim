@extends('layouts/contentLayoutMaster')
@section('vendor-style')
  {{-- Page Css files --}}
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/dataTables.bootstrap5.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/responsive.bootstrap5.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/buttons.bootstrap5.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/rowGroup.bootstrap5.min.css')) }}">
  <style>
            .rejected-stamp {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-15deg); /* Center and rotate for effect */
            width: 300px; /* Adjust size of the stamp */
            opacity: 0.4; /* Semi-transparent effect */
            pointer-events: none; /* Prevent interaction with form elements */
            z-index: 999; /* Ensure it is on top of the form */
        }
        .form-container {
            position: relative; /* To position the stamp relative to the container */
            padding: 20px;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }
  </style>
@endsection
@section('content')
<section class="app-user-list">
    <div class="form-container">
        <h1 class="text-center mb-4"><img src="https://www.urbansole.com.pk/cdn/shop/files/LOGO_9f054002-ed75-4464-9370-d672304d3457_200x.jpg?v=1734434517" alt="Logo" class="logo">Claim Settlement Form</h1>
        @if ($claim[0]->status == 2)
        <img src="{{ asset('images/rejected-stamp.png') }}" alt="Rejected" class="rejected-stamp"
        @elseif ($claim[0]->is_closed == 1)
        <img src="{{ asset('images/closed-stamp.png') }}" alt="closed" class="rejected-stamp">
        @endif
        <form>
            <table>
                <tr>
                    <th colspan="2">Serial No:</th>
                    <td colspan="2">0{{$claim[0]->id}}</td>
                    <th>Date:</th>
                    <td>{{ \Carbon\Carbon::now()->format('d-m-Y') }}</td>
                </tr>
                <tr>
                    <th colspan="3">Shop Name & Address:</th>
                    <td colspan="5">{{$claim[0]->shops->name}} & {{$claim[0]->shops->address}}</td>
                </tr>
                <tr>
                    <th>Claim Receipt #:</th>
                    <td>CLAIM 00{{$claim[0]->id}}</td>
                    <th>Article #:</th>
                    <td>{{$claim[0]->article_number}}</td>
                    <th>Size:</th>
                    <td>{{$claim[0]->size}}</td>
                </tr>
                <tr>
                    <th>Color:</th>
                    <td>{{$claim[0]->color}}</td>
                    <th>Sys Inv #:</th>
                    <td>{{$claim[0]->invoice}}</td>
                    <th>Date of Purchase:</th>
                    <td>{{$claim[0]->purchase_date}}</td>
                </tr>
                <tr>
                    <th>Article Price:</th>
                    <td>{{$claim[0]->article_price}}</td>
                    <th colspan="2">Period of Wear & Purchase:</th>
                    <td colspan="2">{{$claim[0]->period}}</td>
                </tr>
                <tr>
                    <th colspan="3">Customer Name & Address:</th>
                    <td colspan="5">{{$claim[0]->customer_name}} & {{$claim[0]->customer_address}}</td>
                </tr>
                <tr>
                    <th>PTCL #:</th>
                    <td colspan="1">{{$claim[0]->ptcl_number}}</td>
                    <th>Cell #:</th>
                    <td colspan="1">{{$claim[0]->cell}}</td>
                    <th>Email #:</th>
                    <td>{{$claim[0]->customer_email}}</td>
                </tr>
                <tr>
                    <th colspan="6">Nature of Complaint:</th>
                </tr>
                <tr>
                    <td colspan="6">{{$claim[0]->message}}</td>
                </tr>
                <tr>
                    <th colspan="3">Proposed Settlement:</th>
                    <td colspan="3">{{$claim[0]->proposed_status == 0 ? 'Repair' : 'Replacement'}}</td>
                </tr>
                <tr>
                    <th colspan="2">Sign of Shop Manager:</th>
                    <td colspan="5">___________________________</td>
                </tr>
                <tr>
                    <th colspan="3">Date of Receiving in Factory:</th>
                    <td colspan="2">{{$claim[0]->updated_at->format('d-m-Y')}}</td>
                    <th>Inward Gate Pass:</th>
                    <td colspan="2"></td>
                </tr>
                <tr>
                    <th>Remarks Before Action:</th>
                    <td colspan="5">{{$claim[0]->qa_message}}</td>
                </tr>
                <tr>
                    <th>Remarks After Action:</th>
                    <td colspan="5">{{$claim[0]->distribution_message}}</td>
                </tr>
                <tr>
                    <th colspan="3">Approved Settlement:</th>
                    <td colspan="3">{{$claim[0]->status == 3 ? 'Repair' :($claim[0]->status == 4 ? 'Replacement' : ($claim[0]->status == 5 ? 'Received' : 'Rejected'))}}</td>
                </tr>
                <tr>
                    <th colspan="3">Approved Settlement:</th>
                    <td colspan="3">{{$claim[0]->status == 3 ? 'Repair' :($claim[0]->status == 4 ? 'Replacement' : ($claim[0]->status == 5 ? 'Received' : 'Rejected'))}}</td>
                </tr>
            </table>

        </form>
    </div>
    <div class="col-12">
                <!-- <button type="submit" class="btn">Submit</button>
                <button type="reset" class="btn">Reset</button> -->
                <!-- Print Button -->
                <button type="button" class="btn btn-warning col-4 mt-4 mb-4 print-button" onclick="printForm()">Print</button>
            </div>
    </section>
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
  <script src="{{ asset('js/scripts/claim/claim-settlement-form.js') }}"></script>
  <!-- <script src="{{ asset('js/scripts/claim/claim-record-modal.js') }}"></script> -->
@endsection
<!-- </body>
</html> -->
