<!-- Modal -->
<div class="modal fade" id="receivedClaimModal" tabindex="-1" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header bg-transparent">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body px-sm-5 pb-5">
        <div class="text-center mb-2">
          <h1 class="mb-1">Received Claimed Product</h1>
        </div>
        <form id="receivedClaimForm" class="row" onsubmit="return false">
          <input type="hidden" id="receivedId" name="receivedId" value="" />
          <div class="form-group">
            <label for="name" class="col-form-label">Name:</label>
            <input type="text" name="receivedName" class="form-control" id="receivedName" value="">
          </div>
          <div class="form-group">
            <label for="received_remarks" class="col-form-label">Received Remarks:</label>
            <textarea class="form-control" name="received_remarks" id="received_remarks"></textarea>
          </div>
          <div class="form-group">
            <label for="received_date_and_time" class="col-form-label">Received Date And Time</label>
            <input type="dateTime" name="receiveddateandtime" class="form-control" id="receiveddateandtime" value="{{ \Carbon\Carbon::now()}}" disabled>
            <input type="hidden" id="received_date_and_time" name="received_date_and_time" value="{{ \Carbon\Carbon::now()}}" />
          </div>
          <div class="col-sm-10">
            <div class="container col-12 mt-2 row">
              <div class="col-4">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="is_received" id="gridRadios1" value="1" checked>
                  <label class="form-check-label" for="gridRadios1">
                    Received
                  </label>
                </div>
              </div>
              <!-- <div class="col-4">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="status" id="gridRadios2" value="4">
                  <label class="form-check-label" for="gridRadios2">
                  Claimed
                  </label>
                </div>
              </div> -->
              <!-- <div class="col-4">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="status" id="gridRadios2" value="2">
                  <label class="form-check-label" for="gridRadios2">
                    Rejected
                  </label>
                </div>
              </div> -->
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