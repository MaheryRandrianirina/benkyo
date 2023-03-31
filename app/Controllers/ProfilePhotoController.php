<?php
namespace App\Controllers;

use App\Manager\Files\Uploader\FileUploader;

class ProfilePhotoController extends Controller {

    public function action()
    {   
        if(isset($_FILES['profilePhoto']) && !empty($_FILES['profilePhoto'])){
            $filedir =  dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . "data" . DIRECTORY_SEPARATOR . "images" . DIRECTORY_SEPARATOR . "users/";
            $fileUploader = new FileUploader();
            
            if($fileUploader->store($_FILES['profilePhoto'], $filedir)){
                echo json_encode(["success" => "Fichier téléchargé avec succès."]);
            }else{
                echo json_encode(["fail" => "Le téléchargement du fichier a échoué."]);
            }
        }else{
            echo json_encode(['errors' => "fichier non reçu"]);
            http_response_code(500);
        }
    }
}