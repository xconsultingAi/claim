<tbody>
    <tr>
    <td class="text-nowrap fw-bolder">
        Administrator Access
        <span data-bs-toggle="tooltip" data-bs-placement="top" title="Allows a full access to the system">
        <i data-feather="info"></i>
        </span>
    </td>
    <td>
        <div class="form-check">
        <input class="form-check-input" type="checkbox" id="selectAll" />
        <label class="form-check-label" for="selectAll"> Select All </label>
        </div>
    </td>
    </tr>
    <?php
    // Assuming $permissions is the array containing permission IDs and names
    $groupedPermissions = [];
    $nonGroupedPermissions = [];
    foreach ($permissions as $permissionId => $permissionName) {
        // Explode the permission name to get the module and action (Read, Write, Create)
        $parts = explode('_', $permissionName);
        $module = $parts[0];
        if(!isset($parts[1])){
            $nonGroupedPermissions[$permissionName] = $permissionId;
            continue;
        }
        $action = $parts[1];
        // Group the permissions by module and action
        if (!isset($groupedPermissions[$module])) {
            $groupedPermissions[$module] = [];
        }

        $groupedPermissions[$module][$action] = [
            'id' => $permissionId,
            'name' => $permissionName
        ];
    }
    ?>
    @if($groupedPermissions)
    @foreach($groupedPermissions as $key => $permission)
    <tr >
        <td class="text-nowrap fw-bolder">{{ ucfirst($key)}}</td>
        <td>
            <div class="d-flex">
                <div class="form-check me-3 me-lg-5">
                    <input class="form-check-input singleSelect" type="checkbox" name="permissions[]" value="{{ $permission['read']['id'] }}" {{ isset($rolePermissions) && isset($rolePermissions[$permission['read']['id']]) && ($rolePermissions[$permission['read']['id']] == $permission['read']['id']) ? 'checked' : '' }} />
                    <label class="form-check-label" for="{{ $permission['read']['name'] }}"> Read </label>
                </div>
                <div class="form-check me-3 me-lg-5">
                    <input class="form-check-input singleSelect" type="checkbox" name="permissions[]" value="{{ $permission['write']['id'] }}" {{ isset($rolePermissions) && isset($rolePermissions[$permission['write']['id']]) && ($rolePermissions[$permission['write']['id']] == $permission['write']['id']) ? 'checked' : '' }}/>
                    <label class="form-check-label" for="{{ $permission['write']['name'] }}"> Write </label>
                </div>
                <div class="form-check me-3 me-lg-5">
                    <input class="form-check-input singleSelect" type="checkbox" name="permissions[]" value="{{ $permission['create']['id'] }}" {{ isset($rolePermissions) && isset($rolePermissions[$permission['create']['id']]) && ($rolePermissions[$permission['create']['id']] == $permission['create']['id']) ? 'checked' : '' }}/>
                    <label class="form-check-label" for="{{  $permission['create']['name'] }}"> Create </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input singleSelect" type="checkbox" name="permissions[]" value="{{ $permission['delete']['id'] }}" {{ isset($rolePermissions) && isset($rolePermissions[$permission['delete']['id']]) && ($rolePermissions[$permission['delete']['id']] == $permission['delete']['id']) ? 'checked' : '' }}/>
                    <label class="form-check-label" for="{{  $permission['delete']['name'] }}"> Delete </label>
                </div>
            </div>
        </td>
    </tr>
    @endforeach
    @endif
    @if($nonGroupedPermissions)
    @foreach($nonGroupedPermissions as $permissionName => $permissionId)
    <tr >
        <td class="text-nowrap fw-bolder">{{ ucfirst($permissionName)}}</td>
        <td>
            <div class="d-flex">
                <div class="form-check me-3 me-lg-5">
                    <input class="form-check-input singleSelect" type="checkbox" name="permissions[]" value="{{ $permissionId }}" {{ isset($rolePermissions) && isset($rolePermissions[$permissionId]) && ($rolePermissions[$permissionId] == $permissionId) ? 'checked' : '' }} />
                    <label class="form-check-label" for="{{ $permissionName }}"> Read </label>
                </div>
            </div>
        </td>
    </tr>
    @endforeach
    @endif
</tbody>