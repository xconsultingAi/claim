<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserHasContact extends Model
{
    use HasFactory, SoftDeletes;
    protected $dates = ['deleted_at'];
    protected $fillable = [
        'hms_id',
        'patient_id',
        'gp_id',
        'solicitor_id',
        'ref_to',
        'ref_by',
    ];
    
    public function patient()
    {
        return $this->belongsTo(Patients::class, 'patient_id');
    }
}
