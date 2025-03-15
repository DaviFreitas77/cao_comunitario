<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cuidado extends Model
{
    protected $table = 'tb_cuidado';
  
    protected $fillable = ['desc_cuidado'];

    public $timestamps = false;
}
