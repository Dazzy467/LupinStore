<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Barang;
use Inertia\Inertia;

class BarangController extends Controller
{
    //
    public function store(Request $request)
    {
        $data = $request->validate([
            'namaBarang' => ['required', 'string', 'max:255'],
            'stokBarang' => ['required', 'numeric'],
            'hargaBarang' => ['required','numeric'],
            'Kategori' => ['required'],
            'img' => 'required|image|mimes:jpeg,png,jpg'
        ]);
        $Barang = new Barang();
        if (Barang::all()->isEmpty())
        {
            $Barang->id = 1;
        }
        else {
            $maxID = $Barang->max('id');
            $Barang->id = $maxID + 1;
        }

        $fileName = 'img' . '.' . $request->img->extension();
        $request->img->storeAs('public/images/'.$Barang->id, $fileName);
        $Barang->namaBarang = $data['namaBarang'];
        $Barang->stokBarang = $data['stokBarang'];
        $Barang->hargaBarang = $data['hargaBarang'];
        $Barang->Kategori = $data['Kategori'];
        $Barang->img_path = $fileName;
        $Barang->save();
        // return Inertia::location(route('admin.dashboard'),['msg'=>'Berhasil disimpan']);
        // return to_route('admin.dashboard')->with('msg' => 'Berhasil disimpan');
        return redirect()->route('admin.dashboard')->with(['success' => 'berhasil disimpan']);
    }

}
