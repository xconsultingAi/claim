<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Claim extends Model
{
    use HasFactory;

    protected $fillable = [
        'hms_id',
        'article_number',
        'name',
        'invoice',
        'purchase_date',
        'article_price',
        'period',
        'customer_name',
        'customer_address',
        'customer_email',
        'ptcl_number',
        'cell',
        'shop_id',
        'status',
        'message',
        'qa_message',
        'distribution_message',
        'is_closed',
        'proposed_status',
        'color',
        'size',
        'inward_gate_pass',
        'is_received',
        'receiving_remarks',
        'received_date_and_time',
        'invoice_image',
    ];

    public function shops()
    {
        return $this->belongsTo(Shop::class, 'shop_id');
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }
}
