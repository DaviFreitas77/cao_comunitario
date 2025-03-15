<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Temperamento extends Model
{
    protected $table = 'tb_temperamento';

    protected $fillable = ['desc_temperamento'];

    public $timestamps = false;
}
