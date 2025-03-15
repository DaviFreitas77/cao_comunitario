<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Genero extends Model
{
    protected $table = 'tb_genero';

    protected $fillable = ['desc_genero'];
    
    public $timestamps = false;
}
