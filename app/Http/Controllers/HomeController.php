<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\Kategori;
use Inertia\Inertia;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    //
    public function index()
    {

        return Inertia::render('Home',[
            'barang' => Barang::all(),
            'kategori' => Kategori::all(),
        ]);
    }
}
