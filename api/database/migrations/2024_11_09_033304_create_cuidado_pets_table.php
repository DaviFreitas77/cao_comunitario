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
        Schema::create('tb_cuidado_pet', function (Blueprint $table) {
            $table->increments('id_pet_cuidado');
            $table->unsignedInteger('fk_pet');
            $table->unsignedInteger('fk_cuidado');

            $table->foreign('fk_pet')->references('id_pet')->on('tb_pet');
            $table->foreign('fk_cuidado')->references('id_cuidado')->on('tb_cuidado');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_cuidado_pet');
    }
};
