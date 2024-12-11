<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class UserLoginSession extends Model
{
    use HasFactory, LogsActivity;

    protected  $table = 'user_login_sessions';
    /*------------------- Logs Work Start----------*/
    protected static $logAttributes = ['*'];
    protected static $logOnlyDirty = true;

    public function getLogNameToUse(): string
    {
        return "User Login Sessions";
    }
    public function getDescriptionForEvent(string $eventName): string
    {
        return "You have {$eventName} User Login Sessions ";
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
