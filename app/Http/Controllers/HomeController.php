<?php

namespace App\Http\Controllers;
use App\Models\Kategori;
use Inertia\Inertia;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('Home',[
            'kategori' => Kategori::all()
        ]);
    }
}
