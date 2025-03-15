<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CadastroPet extends Model
{
    protected $table = 'tb_pet';

    protected $fillable = ['nome_pet','tipo_pet','genero_pet','idade_pet','raca_pet','imagem_Pet,sobre_pet'];
    
    public $timestamps = false;
}
