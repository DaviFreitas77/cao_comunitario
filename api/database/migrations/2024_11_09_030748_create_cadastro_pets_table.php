<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tb_pet', function (Blueprint $table) {
            $table->increments('id_pet');
            $table->string('nome_pet');
            $table->unsignedInteger('tipo_pet');
            $table->unsignedInteger('genero_pet');
            $table->unsignedInteger('idade_pet');
            $table->string('raca_pet');
            $table->string('imagem_Pet');
            $table->string('sobre_pet');
            $table->foreign('tipo_pet')->references('id_tipo')->on('tb_tipo');
            $table->foreign('genero_pet')->references('id_genero')->on('tb_genero');
            $table->foreign('idade_pet')->references('id_idade')->on('tb_idade');
         
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_pet');
    }
};
