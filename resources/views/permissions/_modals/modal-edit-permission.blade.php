<!-- Edit Permission Modal -->
<div class="modal fade" id="editPermissionModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header bg-transparent">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body p-3 pt-0">
        <div class="text-center mb-2">
          <h1 class="mb-1">Edit Permission</h1>
          <p>Edit permission as per your requirements.</p>
        </div>

        <div class="alert alert-warning" role="alert">
          <h6 class="alert-heading">Warning!</h6>
          <div class="alert-body">
            By editing the permission name, you might break the system permissions functionality. Please ensure you're
            absolutely certain before proceeding.
          </div>
        </div>

        <form id="editPermissionForm" class="row" onsubmit="return false">
        <input type="hidden" name="permissionId" id="permissionId" />
          <div class="col-sm-9">
            <label class="form-label" for="editPermissionName">Permission Name</label>
            <input
              type="text"
              id="editPermissionName"
              name="name"
              class="form-control"
              placeholder="Enter a permission name"
              tabindex="-1"
              data-msg="Please enter permission name"
            />
          </div>
          <div class="col-sm-3 ps-sm-0">
            <button type="submit" class="btn btn-primary mt-2">Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
<!--/ Edit Permission Modal -->
