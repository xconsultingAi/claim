<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use App\Models\Appointment;

class statusDefinition extends Model
{
    use HasFactory, LogsActivity;
    protected  $table = 'status_definitions';

    protected $fillable = [
        'id',
        'hms_id',
        'branch_id',
        'name',
        'slug',
        'module',
        'status',
        'created_by',
        'updated_by',
    ];
    /*------------------- Logs Work Start----------*/
    protected static $logAttributes = ['*'];
    protected static $logOnlyDirty = true;

    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'status_id', 'status_id');
    }

    public function getLogNameToUse(): string
    {
        return "Status Definitions";
    }
    public function getDescriptionForEvent(string $eventName): string
    {
        return "You have {$eventName} Status Definitions ";
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
    public function ScopeTypesByHmsId($query)
    {
        return $query->where('hms_id', Auth::user()->hms_id);
    }
    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }
}
