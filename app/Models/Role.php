<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Permission\Models\Permission;

class Role extends Model
{
    use HasFactory, LogsActivity;
    protected  $table = 'roles';
    /*------------------- Logs Work Start----------*/
    protected static $logAttributes = ['*'];
    protected static $logOnlyDirty = true;

    public function getLogNameToUse(): string
    {
        return "Roles";
    }
    public function getDescriptionForEvent(string $eventName): string
    {
        return "You have {$eventName} Roles ";
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['*']);
    }

    public function getBatchUuidAttribute()
    {
        return $this->properties['batch_uuid'] ?? null;
    }

    public function setBatchUuidAttribute($value)
    {
        $this->properties['batch_uuid'] = $value;
    }

    /*------------------- Logs Work End----------*/

    public function ScopeDoctor($query)
    {
        return $query->where('slug', DOCTOR);
    }

    public function ScopeActive($query)
    {
        return $query->where('status', ACTIVE);
    }

    public function ScopeRoleByHms($query)
    {
        return $query->where('hms_id', Auth::user()->hms_id)
            ->where('status', 'active');
    }

    public function ScopeRoleBySlug($query, $slug)
    {
        return $query->where('hms_id', Auth::user()->hms_id)
            ->where('branch_id', Auth::user()->branch_id)
            ->where('slug', $slug)
            ->where('status', 'active');
    }

    public function ScopeRoleById($query, $role_id)
    {
        return $query->where('hms_id', Auth::user()->hms_id)
            ->where('branch_id', Auth::user()->branch_id)
            ->where('id', $role_id)
            ->where('status', 'active');
    }
	    public function permissions()
    {
        return $this->belongsToMany(Permission::class);
    }
}
