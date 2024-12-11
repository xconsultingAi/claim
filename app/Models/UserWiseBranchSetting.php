<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\UserTimeDuration;
use App\Models\{
    Branch,
    User
};
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class UserWiseBranchSetting extends Model
{
    use HasFactory, LogsActivity;
    protected  $table = 'user_wise_branch_setting';

    protected $fillable = [
        'hms_id',
        'branch_id',
        'user_id',
        'start',
        'end',
        'status',
        'updated_at',
    ];

    /*------------------- Logs Work Start----------*/
    protected static $logAttributes = ['*'];
    protected static $logOnlyDirty = true;

    public function getLogNameToUse(): string
    {
        return "User Wise Branch Setting";
    }
    public function getDescriptionForEvent(string $eventName): string
    {
        return "You have {$eventName} User Wise Branch Setting ";
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
    public function branch()
    {
        return $this->belongsTo(Branch::class, 'branch_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function ScopeJoinWithTables($query, $branch_id)
    {
        return $query->Join('users', 'users.id', '=', 'user_wise_branch_setting.user_id')
            ->Join('branch', 'branch.id', '=', 'user_wise_branch_setting.branch_id')
            ->Join('user_time_duration', 'user_time_duration.user_wise_branch_setting_id', '=', 'user_wise_branch_setting.id')
            ->where('user_wise_branch_setting.branch_id', $branch_id);
    }

    public function ScopeSelectBranchUserSettingColumns($query)
    {
        return $query->select(
            'users.firstname',
            'users.lastname',
            'branch.name as branch_name',
            'branch.latitude',
            'branch.longitude',
            'user_wise_branch_setting.id',
            'user_wise_branch_setting.user_id',
            'user_wise_branch_setting.branch_id',
            'user_time_duration.id as user_time_duration_id',
            'user_time_duration.day',
            'user_time_duration.start',
            'user_time_duration.end',
        );
    }

    public function ScopeJoinWithTablesForMap($query, $user_wise_branch_setting_id)
    {
        return $query->Join('user_time_duration', 'user_time_duration.user_wise_branch_setting_id', '=', 'user_wise_branch_setting.id')
            ->where('user_time_duration.user_wise_branch_setting_id', $user_wise_branch_setting_id);
    }
}
