<!-- Modal -->
<div class="modal fade" id="claimModal" tabindex="-1" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header bg-transparent">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body px-sm-5 pb-5">
        <div class="text-center mb-2">
          <h1 class="mb-1">Submit Claim<small>(QA Side)</small></h1>
        </div>
        <form id="submitClaimModal" class="row" onsubmit="return false">
          <input type="hidden" id="claimId" name="claimId" value="" />
          <div class="form-group">
            <label for="name" class="col-form-label">Name:</label>
            <input type="text" name="claimName" class="form-control" id="claimName" value="">
          </div>
          <div class="form-group">
            <label for="message" class="col-form-label">Message:</label>
            <textarea class="form-control" name="qa_message" id="qa_message"></textarea>
          </div>
          <div class="col-sm-10">
            <div class="container col-12 mt-2 row">
              <div class="col-4">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="status" id="gridRadios1" value="3" checked>
                  <label class="form-check-label" for="gridRadios1">
                    Repair
                  </label>
                </div>
              </div>
              <div class="col-4">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="status" id="gridRadios2" value="4">
                  <label class="form-check-label" for="gridRadios2">
                  Claimed
                  </label>
                </div>
              </div>
              <div class="col-4">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="status" id="gridRadios2" value="2">
                  <label class="form-check-label" for="gridRadios2">
                    Rejected
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