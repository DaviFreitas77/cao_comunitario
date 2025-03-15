<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PetFavorito extends Model
{
    protected $table = 'tb_pet_favoritado';
    protected $primaryKey = 'id_favorito'; 
    protected $fillable = ['fk_usuario','fk_pet'];

    public $timestamps = false;
}
