<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Kategori;
use App\Models\Barang;

class AdminController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('Admin/Dashboard',[
            'kategori' => Kategori::all(),
            'barang' => Barang::all(),
            'success' => session('success')
        ]);
    }


}
