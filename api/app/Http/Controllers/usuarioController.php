<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use App\Models\Admin;
use Illuminate\Http\Request;

class usuarioController extends Controller
{
    public function store(Request $request)
    {

        $usuarioExistente = Usuario::where('email_usuario', $request->email_usuario)->first();

        if ($usuarioExistente) {
            return response()->json([
                'message' => 'email ja cadastrado,por favor insira outro email.'
            ], 400);
        }


        $usuario = new Usuario();
        $usuario->nome_usuario = $request->nome_usuario;
        $usuario->email_usuario = $request->email_usuario;
        $usuario->senha_usuario = $request->senha_usuario;
        $usuario->numero_usuario = $request->telefone_usuario;
        $usuario->imagem_usuario = $request->imagem_usuario;
        $usuario->token = $request->token;

        $usuario->save();

        return response()->json([
            'message' => 'Cadastro realizado'
        ], 201);
    }


    public function login(Request $request)
    {

        $usuario = Usuario::where('email_usuario', $request->email)->first();

        if ($usuario && $request->senha === $usuario->senha_usuario) {
            return response()->json([
                'message' => 'Login realizado.',
                $usuario
            ], 200);
        }

        return response()->json([
            'message' => 'Credenciais inválidas.'
        ], 401);
    }

    public function update(Request $request)
    {
        $idUsuario = $request->id;
        $idAdm = $request->idAdm;
        $usuario = Usuario::find($idUsuario);
        $admin = Admin::find($idAdm);

        if (!$usuario && !$admin) {
            return response()->json(['mensagem' => 'Usuário ou administrador não encontrado.'], 404);
        }

        $atualizado = false;

        if ($usuario) {
            if (!is_null($request->novoNome)) {
                $usuario->nome_usuario = $request->novoNome;
                $atualizado = true;
            }

            if (!is_null($request->novoNumero)) {
                $usuario->numero_usuario = $request->novoNumero;
                $atualizado = true;
            }

            if (!is_null($request->urlImagem)) {
                $usuario->imagem_usuario = $request->urlImagem;
                $atualizado = true;
            }

            if ($atualizado) {
                $usuario->save();
            }
        }

        if ($admin) {
            if (!is_null($request->urlImagem)) {
                $admin->imagem_admin = $request->urlImagem;
                $admin->save();
                $atualizado = true;
            }
        }

        if ($atualizado) {
            return response()->json(['mensagem' => 'Atualização realizada com sucesso.'], 200);
        } else {
            return response()->json(['mensagem' => 'Nenhuma atualização realizada.'], 400);
        }
    }
}
