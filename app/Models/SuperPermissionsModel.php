<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SuperPermissionsModel extends Model
{
    use HasFactory;
    
    protected  $table = 'permissions';

    protected $fillable = [
        'id',
        'name',
       
    ];
}
