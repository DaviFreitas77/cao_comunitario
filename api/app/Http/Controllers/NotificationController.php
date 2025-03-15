<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class NotificationController extends Controller
{
    public function sendNotification(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $tokens = Usuario::all()->pluck('token');

        if ($tokens->isEmpty()) {
            return response()->json(['message' => 'Nenhum token encontrado'], 404);
        }

        $client = new Client();

  
        foreach ($tokens as $token) {
            $payload = [
                'to' => $token,
                'sound' => 'default',
                'title' => 'Cão Comunitário',
                'body' => $request->message,
                'image' => 'https://via.placeholder.com/512',
            ];

            try {
                // Enviar a notificação para o Expo Push Notification Service
                $response = $client->post('https://exp.host/--/api/v2/push/send', [
                    'json' => $payload,
                ]);

              
                $responseBody = $response->getBody()->getContents();
                
            } catch (\Exception $e) {
              
                return response()->json(['message' => 'Erro ao enviar notificação', 'error' => $e->getMessage()], 500);
            }
        }

        return response()->json(['message' => 'Notificações enviadas com sucesso']);
    }
}
