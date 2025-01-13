@extends('layouts/contentLayoutMaster')

@section('vendor-style')
  {{-- Vendor CSS files --}}
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/forms/select/select2.min.css')) }}">
@endsection

@section('page-style')
  {{-- Page CSS files --}}
  <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/form-validation.css')) }}">
@endsection

@section('content')
<section class="bs-validation">
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">Add Claim</h4>
        </div>
        <div class="card-body">
            <form id="jquery-val-form" enctype="multipart/form-data">
            <div class="row">
              @csrf
              <div class="mb-1 col-md-12">
                <label class="form-label" for="article_number">Article Number</label>
                <input type="text" name="article_number" id="article_number" class="form-control" placeholder="Enter Article Number" required />
              </div>
              <div class="mb-1 col-md-12">
                <label class="form-label" for="color">Color</label>
                <input type="text" name="color" id="color" class="form-control" placeholder="Enter Shoe Color" required />
              </div>
              <div class="mb-1 col-md-12">
                <label class="form-label" for="size">Size</label>
                <input type="number" name="size" id="size" min="39" max="46" class="form-control" placeholder="Enter Shoe Size" required />
              </div>
              <div class="mb-1 col-md-12">
                <label class="form-label" for="name">Name</label>
                <input type="text" name="name" id="name" class="form-control" placeholder="Enter Name" required />
              </div>
              <div class="mb-1 col-md-12">
                <label class="form-label" for="invoice">Invoice</label>
                <input type="number" name="invoice" id="invoice" minlength="0" class="form-control" placeholder="Enter Invoice" required />
              </div>
              <div class="mb-1 col-md-12">
                <label class="form-label" for="purchase_date">Purchase Date</label>
                <input type="date" name="purchase_date" id="purchase_date" class="form-control" placeholder="Enter Purchase Date" required />
              </div>
              <div class="mb-1 col-md-12">
                <label class="form-label" for="article_price">Article Price</label>
                <input type="text" name="article_price" id="article_price" class="form-control" placeholder="Enter Article Price" required />
              </div>
              <div class="mb-1 col-md-12">
                <label class="form-label" for="period">Period</label>
                <input type="text" name="period" id="period" class="form-control" placeholder="Enter Period" required />
              </div>
              <div class="mb-1 col-md-12">
                <label class="form-label" for="customer_name">Customer Name</label>
                <input type="text" name="customer_name" id="customer_name" class="form-control" placeholder="Enter Customer Name" required />
              </div>
              <div class="mb-1 col-md-12">
                <label class="form-label" for="customer_address">Customer Address</label>
                <input type="text" name="customer_address" id="customer_address" class="form-control" placeholder="Enter Customer Address" required />
              </div>
              <div class="mb-1 col-md-12">
                <label class="form-label" for="customer_email">Customer Email</label>
                <input type="text" name="customer_email" id="customer_email" class="form-control" placeholder="Enter Customer Email" required />
              </div>
              <div class="mb-1 col-md-12">
                <label class="form-label" for="ptcl_number">Ptcl</label>
                <input type="text" name="ptcl_number" id="ptcl_number" minlength="11" maxlength="11" class="form-control" placeholder="XXX-XXXXXXX" />
              </div>
              <div class="mb-1 col-md-12">
                <label class="form-label" for="cell">Cell</label>
                <input type="number" name="cell" id="cell" class="form-control" minlength="11" maxlength="11" placeholder="03XX-XXXXXXX" />
              </div>
              <div class="mb-1 col-md-12">
                <label class="form-label" for="shop_id">Shop</label>
                <select name="shop_id" id="shop_id" class="form-control">
                  <option value="">Select Shop Name</option>
                  @foreach($shops as $shop)
                    <option value="{{$shop->id}}">{{$shop->name}}</option>
                    @endforeach
                </select>
              </div>
              <div class="mb-1 col-md-12">
              <label for="image">Upload Invoice Image:</label>
              <input type="file" name="invoice_image" id="invoice_image" class="form-control" accept="image/*" required>
              </div>
              <div class="mb-1 col-md-12">
              <label for="image">Upload Defected Shoes Image:</label>
              <input type="file" name="defect_image[]" id="defect_image" class="form-control" accept="image/*" multiple>
              </div>
              

            <div class="col-sm-10">
            <div class="container col-12 mt-2 mb-2 row">
              <div class="col-6">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="proposed_status" id="gridRadios1" value="0" checked>
                  <label class="form-check-label" for="gridRadios1">
                    Repair
                  </label>
                </div>
                </div>
                <div class="col-6">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="proposed_status" id="gridRadios1" value="1">
                  <label class="form-check-label" for="gridRadios1">
                    Replacement
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-1 col-md-12">
              <div class="col-12">
                <button type="submit" class="btn btn-primary">Submit</button>
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
  <!-- Vendor JS files -->
  <script src="{{ asset(mix('vendors/js/forms/select/select2.full.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/forms/validation/jquery.validate.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/extensions/sweetalert2.all.min.js')) }}"></script>
@endsection

@section('page-script')
  <!-- Page JS files -->
  <script src="{{ asset('js/scripts/claim/add-claim.js') }}"></script>
@endsection
