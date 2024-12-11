<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\SoftDeletes;


class driver extends Model
{
    use HasFactory, LogsActivity,SoftDeletes;
    protected  $table = 'driver';
    protected $dates = ['deleted_at'];

    protected $fillable = [
        'id',
        'companyId',
        'driver_name',
        'driver_cnic_no',
        'driver_mobile_no',
        'driving_licence_no',
        'driver_address',
        'updated_by',
        'created_by',
    ];


    /*------------------- Logs Work Start----------*/
    protected static $logAttributes = ['*'];
    protected static $logOnlyDirty = true;

    public function getLogNameToUse(): string
    {
        return "Vehicles";
    }
    public function getDescriptionForEvent(string $eventName): string
    {
        return "You have {$eventName} Vehicles ";
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
