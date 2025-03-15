<?php

namespace App\Http\Controllers;

use App\Models\CadastroPet;
use Hamcrest\Arrays\IsArray;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;



class CadastroPetController extends Controller
{
    public function index()
    {
        $pets = CadastroPet::select(
            'tb_pet.id_pet',
            'tb_pet.nome_pet',
            'tb_pet.tipo_pet',
            'tb_pet.genero_pet',
            'tb_pet.idade_pet',
            'tb_pet.raca_pet',
            'tb_pet.imagem_pet',
            'tb_pet.sobre_pet',
            'tb_genero.desc_genero',
            'tb_idade.desc_idade',
            'tb_tipo.desc_tipo_pet',
            DB::raw("GROUP_CONCAT(DISTINCT tb_temperamento.desc_temperamento SEPARATOR ', ') AS temperamentos"),
            DB::raw("GROUP_CONCAT(DISTINCT tb_cuidado.desc_cuidado SEPARATOR ', ') AS cuidados")
        )
            ->join('tb_pet_temperamento', 'tb_pet.id_pet', '=', 'tb_pet_temperamento.fk_pet')
            ->join('tb_temperamento', 'tb_pet_temperamento.fk_temperamento', '=', 'tb_temperamento.id_temperamento')
            ->join('tb_cuidado_pet', 'tb_pet.id_pet', '=', 'tb_cuidado_pet.fk_pet')
            ->join('tb_cuidado', 'tb_cuidado_pet.fk_cuidado', '=',  'tb_cuidado.id_cuidado')
            ->join('tb_genero', 'tb_pet.genero_pet', '=', 'tb_genero.id_genero')
            ->join('tb_idade', 'tb_pet.idade_pet', '=', 'tb_idade.id_idade')
            ->join('tb_tipo', 'tb_pet.tipo_pet', '=', 'tb_tipo.id_tipo')
            ->groupBy('tb_pet.id_pet', 'tb_pet.nome_pet', 'tb_pet.genero_pet', 'tb_genero.desc_genero', 'tb_pet.idade_pet', 'tb_idade.desc_idade', 'tb_pet.raca_pet', 'tb_pet.tipo_pet', 'tb_tipo.desc_tipo_pet', 'tb_pet.imagem_pet', 'tb_pet.sobre_pet' )
            ->orderBy('tb_pet.id_pet', 'desc') // Ordena pela coluna 'id_pet' de forma decrescente
            ->get();



        return response()->json($pets);
    }


    public function store(Request $request)
    {
        $pet = new CadastroPet();
        $pet->nome_pet = $request->nomePet;
        $pet->tipo_pet = $request->tipoPet;
        $pet->idade_pet = $request->idadePet;
        $pet->genero_pet = $request->generoPet;
        $pet->raca_pet = $request->racaPet;
        $pet->imagem_pet = $request->imagemPet;
        $pet->sobre_pet = $request->sobrePet;;
        $temperamento = is_array($request->temperamentoPet) ? $request->temperamentoPet : json_decode($request->temperamentoPet);

        $cuidado = is_array($request->cuidadoPet) ? $request->cuidadoPet : json_decode($request->cuidadoPet);

        $pet->save();

        $petId = $pet->id;

        foreach ($temperamento as $temperamentoId) {
            DB::table('tb_pet_temperamento')->insert([
                'fk_pet' => $petId,
                'fk_temperamento' => $temperamentoId,
            ]);
        }

        foreach ($cuidado as $cuidadosID) {
            DB::table('tb_cuidado_pet')->insert([
                'fk_pet' => $petId,
                'fk_cuidado' => $cuidadosID,
            ]);
        }

        return response()->json(['message' => 'pet cadastrado']);
    }
}
