<!-- Modal -->
<div class="modal fade" id="claimModal" tabindex="-1" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header bg-transparent">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body px-sm-5 pb-5">
        <div class="text-center mb-2">
          <h1 class="mb-1">Submit Claim<small>(Shop Side)</small></h1>
        </div>
        <form id="submitClaimModal" class="row" onsubmit="return false">
          <input type="hidden" id="claimId" name="claimId" value="" />
          <div class="form-group">
            <label for="name" class="col-form-label">Name:</label>
            <input type="text" name="claimName" class="form-control" id="claimName" value="">
          </div>
          <div class="form-group">
            <label for="message" class="col-form-label">Nature Of Complaint</label>
            <textarea class="form-control" name="message" id="message"></textarea>
          </div>
          <div class="col-sm-10">
            <div class="container col-12 mt-2 row">
              <div class="col-6">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="status" id="gridRadios1" value="1" checked>
                  <label class="form-check-label" for="gridRadios1">
                    Accepted
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 text-center mt-2">
            <button type="submit" class="btn btn-primary me-1">Submit</button>
            <button type="reset" class="btn btn-outline-secondary" data-bs-dismiss="modal" aria-label="Close">
              Discard
            </button>
          </div>
        </form>


      </div>
    </div>
  </div>
</div>