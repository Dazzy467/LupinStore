<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kategori extends Model
{
    use HasFactory;
    protected $table = 'kategori';
    protected $fillable = [
        'id',
        'Kategori'
    ];

    protected $attributes = [
        'Kategori' => 'Any'
    ];

    public function Barang()
    {
        return $this->belongsToMany(Barang::class);
    }
}
