<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Idade extends Model
{
    protected $table = 'tb_idade';

    protected $fillable = ['desc_idade'];

    public $timestamps = false;
}
