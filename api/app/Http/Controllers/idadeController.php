<?php

namespace App\Http\Controllers;

use App\Models\Idade;
use Illuminate\Http\Request;

class idadeController extends Controller
{
    public function index(){
        $idade = Idade::all();

        return response()->json($idade);
    }
}
