<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\SoftDeletes;

class template_assets_model extends Model
{
    use HasFactory, LogsActivity;  
    use SoftDeletes;

    protected $dates = ['deleted_at'];

     /*------------------- Logs Work Start----------*/
     protected static $logAttributes = ['*'];
     protected static $logOnlyDirty = true;
 
     public function getLogNameToUse(): string
     {
         return "Patient Letter Rules Applicable";
     }
     public function getDescriptionForEvent(string $eventName): string
     {
         return "You have {$eventName} Patient Letter Rules Applicable ";
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

     protected  $table = 'template_assets';

     protected $fillable = [
         'id',
         'name',
         'url',
     ];
}
