<?php

namespace App\Http\Controllers;

use App\Models\Cuidado;
use Illuminate\Http\Request;

class cuidadoConroller extends Controller
{
    public function index(){
        $cuidados = cuidado::all();

        return response()->json($cuidados);
    }
}
