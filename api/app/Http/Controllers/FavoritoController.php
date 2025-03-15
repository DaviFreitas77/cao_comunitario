<?php

namespace App\Http\Controllers;

use App\Models\PetFavorito;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FavoritoController extends Controller
{
    public function index(Request $request)
    {
        $userId =$request->input('fk_usuario');

        $favoritos = PetFavorito::select(
            'tb_pet.nome_pet',
            'tb_pet.id_pet',
            'tb_pet.imagem_pet',
            'tb_tipo.desc_tipo_pet',
            'tb_genero.desc_genero',
            'tb_idade.desc_idade',
            'tb_pet.sobre_pet',
            DB::raw("GROUP_CONCAT(DISTINCT tb_temperamento.desc_temperamento SEPARATOR ', ') AS temperamentos"),
            DB::raw("GROUP_CONCAT(DISTINCT tb_cuidado.desc_cuidado SEPARATOR ', ') AS cuidados")
           
        )
        ->join('tb_pet_temperamento', 'tb_pet_favoritado.fk_pet', '=', 'tb_pet_temperamento.fk_pet')
        ->join('tb_temperamento', 'tb_pet_temperamento.fk_temperamento', '=', 'tb_temperamento.id_temperamento')
        ->join('tb_cuidado_pet', 'tb_pet_favoritado.fk_pet', '=', 'tb_cuidado_pet.fk_pet')
            ->join('tb_cuidado', 'tb_cuidado_pet.fk_cuidado', '=',  'tb_cuidado.id_cuidado')
        ->join('tb_pet', 'tb_pet_favoritado.fk_pet', '=', 'tb_pet.id_pet')
        ->join('tb_tipo', 'tb_pet.tipo_pet', '=', 'tb_tipo.id_tipo')
        ->join('tb_genero','tb_pet.genero_pet', '=' , 'tb_genero.id_genero')
        ->join('tb_idade','tb_pet.idade_pet', '=', 'tb_idade.id_idade')

        ->groupBy('tb_pet.id_pet', 'tb_pet.nome_pet', 'tb_genero.desc_genero', 'tb_idade.desc_idade', 'tb_tipo.desc_tipo_pet', 'tb_pet.imagem_pet', 'tb_pet.sobre_pet' )

        ->where('tb_pet_favoritado.fk_usuario', $userId)
        ->get();

return response()->json($favoritos);
    }




    public function store(Request $request)
    {
        $pet_favorito = new PetFavorito();
        $pet_favorito->fk_usuario = $request->fk_usuario;
        $pet_favorito->fk_pet = $request->fk_pet;

        $pet_favorito->save();

        return response()->json([
            'message' => 'pet favoritado'
        ]);
    }



    public function delete(Request $request){
        $petID = $request->input('fk_pet');

        $favoritos = PetFavorito::where('fk_pet',$petID)->delete();

        return response()->json([
            'message' => 'Pet removido dos favoritos com sucesso.'
        ]);
    }
}
