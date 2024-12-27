<!-- Add Permission Modal -->
<div class="modal fade" id="addShopStatusModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header bg-transparent">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body px-sm-5 pb-5">
        <div class="text-center mb-2">
          <h1 class="mb-1">Update Shop Status</h1>
        </div>
        <form id="addShopStatusForm" class="row" onsubmit="return false">
        <input type="hidden" id="claimId" name="claimId" value="" />
          <div class="col-12">
            <label class="form-label" for="modalPermissionName">Status</label>
            <!-- <div class="col-sm-10">
            <div class="container col-12 mt-2 row">
              <div class="col-6">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="status" id="gridRadios1" value="1" checked>
                  <label class="form-check-label" for="gridRadios1">
                    Active
                  </label>
                </div>
              </div>
              <div class="col-6">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="status" id="gridRadios2" value="0">
                  <label class="form-check-label" for="gridRadios2">
                    In Active
                  </label>
                </div>
              </div>
            </div>
          </div> -->
          <select class="select2 w-100 form-control" name="status" id="status">
                      <option value="">Select Status</option>
                      <option value="1">Active</option>
                      <option value="0">In Active</option>
                    </select>
          <div class="col-12 text-center">
            <button type="submit" class="btn btn-primary mt-2 me-1">Update</button>
            <button type="reset" class="btn btn-outline-secondary mt-2" data-bs-dismiss="modal" aria-label="Close">
              Discard
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
<!--/ Add Permission Modal -->
