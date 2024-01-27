<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Barang extends Model
{
    use HasFactory;
    protected $table = 'barang';

    protected $fillable = [
        'namaBarang',
        'hargaBarang',
        'stokBarang',
        'Kategori',
        'img_path'
    ];

    public function getKategori()
    {
        return $this->hasOne(Kategori::class,'Kategori');
    }
}
