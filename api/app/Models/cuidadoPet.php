<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class cuidadoPet extends Model
{
    protected $table = 'tb_cuidado_pet';

    protected $fillable = ['fk_pet,fk_cuidado'];

    public $timestamps = false;
}
