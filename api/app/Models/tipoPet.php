<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoPet extends Model
{
    protected $table = 'tb_tipo';

    protected $fillable = ['desc_tipo_pet'];

    public $timestamps = false;
}
