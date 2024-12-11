<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class UserTimeDuration extends Model
{
    use HasFactory, LogsActivity;

    protected  $table = 'user_time_duration';

    protected $fillable = [
        'hms_id',
        'user_wise_branch_setting_id',
        'day',
        'start',
        'end',
        'status',
    ];
    /*------------------- Logs Work Start----------*/
    protected static $logAttributes = ['*'];
    protected static $logOnlyDirty = true;

    public function getLogNameToUse(): string
    {
        return "User Time Duration";
    }
    public function getDescriptionForEvent(string $eventName): string
    {
        return "You have {$eventName} User Time Duration ";
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
}
