<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'claim_id',
        'defect_image',
    ];

    public function claims()
    {
        return $this->belongsTo(Claim::class);
    }
}
