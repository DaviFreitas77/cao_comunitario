<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $table = 'tb_admin';
    protected $primaryKey = 'id_admin';
    protected $fillable = ['email_admin','senha_admin','imagem_admin','numero_admin'];
    
    public $timestamps = false;
}
