<?php

namespace App\Http\Controllers;

use App\Models\Genero; // Corrigido para 'Genero' com letra maiúscula
use Illuminate\Http\Request;

class GeneroController extends Controller
{
    public function index(){
        $generos = Genero::all();

        return response()->json($generos);
    }
}
