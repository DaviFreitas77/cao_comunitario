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
        Schema::create('tb_pet_temperamento', function (Blueprint $table) {
            $table->increments('id_pet_temperamento');
            $table->unsignedInteger('fk_pet');
            $table->unsignedInteger('fk_temperamento');

            $table->foreign('fk_pet')->references('id_pet')->on('tb_pet');
            $table->foreign('fk_temperamento')->references('id_temperamento')->on('tb_temperamento');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_pet_temperamento');
    }
};
