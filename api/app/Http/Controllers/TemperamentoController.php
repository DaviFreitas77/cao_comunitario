<?php

namespace App\Http\Controllers;

use App\Models\Temperamento;
use Illuminate\Http\Request;

class TemperamentoController extends Controller
{
    public function index(){
        $temperamentos = Temperamento::all();

        return response()->json($temperamentos);
    } 
}
