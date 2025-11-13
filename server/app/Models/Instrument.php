<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Instrument extends Model
{
    /** @use HasFactory<\Database\Factories\InstrumentFactory> */
    use HasFactory;
    public $timestamps = false; // Ha nem szeretnéd használni a created_at és updated_at mezőket
    protected $fillable = [
        'name',
        'description',
        'brand',
        'price',
        'quantity',
    ];
}
