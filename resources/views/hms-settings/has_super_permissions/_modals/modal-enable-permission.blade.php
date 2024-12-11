<!-- Edit Permission Modal -->
<div class="modal fade" id="editPermissionModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-transparent">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-3 pt-0">
          <div class="text-center mb-2">
            <h1 class="mb-1">Enable Permission</h1>
            <p>Give Permission to Super Admin.</p>
          </div>
  
          <div class="alert alert-warning" role="alert">
            <h6 class="alert-heading">Warning!</h6>
            <div class="alert-body">
              Are you sure to give permisson?
            </div>
          </div>
  
          <form id="editPermissionForm" class="row" onsubmit="return false" method="PUT">
            @csrf
            @method('PUT')
          <input type="hidden" name="permissionId" id="permissionId" />
            <div class="col-sm-9">
               </div>
            <div class="col-sm-3 ps-sm-0">
              <button type="submit" class="btn btn-primary mt-2">Enable</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!--/ Edit Permission Modal -->
  