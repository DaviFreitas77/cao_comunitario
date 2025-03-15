<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('tb_pet_favoritado', function (Blueprint $table) {
            $table->increments('id_favorito');
            $table->unsignedInteger('fk_usuario');
            $table-> unsignedInteger('fk_pet');

            $table->foreign('fk_usuario')
            ->references('id_usuario')->on('tb_usuario')
            ->onDelete('cascade');

            $table->foreign('fk_pet')
            ->references('id_pet')->on('tb_pet')
            ->onDelete('cascade');  
        });
    }

    
    public function down(): void
    {
        Schema::dropIfExists('pet_favoritos');
    }
};
