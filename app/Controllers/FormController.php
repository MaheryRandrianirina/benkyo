<?php
namespace App\Controllers;

class FormController extends Controller {
    public $posts = [];

    public function calendarFormErrors(): ?array 
    {
        $errors = [];
        foreach($this->posts as $name => $post){
            if(!isset($this->posts[$name]) || empty($this->posts[$name])){
                $errors[$name] = "Ce champ est vide";
            }
        }
        
        if($errors !== null){
            return $errors;
        }

        return null;
        
    }
    
    /**
     * affiche les erreurs de formulaire
     * @param  string $errorName nom de l'erreur
     * @param  string | null $errorKey clé de l'erreur si l'erreur est un tableau
     * @param  mixed $errors
     * @return string
     */
    public static function showErrors(string $errorName, ?string $errorKey = null): ?string
    {
        if($errorKey !== null){
            if(isset($_SESSION[$errorName]) && isset($_SESSION[$errorName][$errorKey])){
                return $errorName !== 'loginUserNotFound' ? <<<HTML
                <small class="alert-danger">{$_SESSION[$errorName][$errorKey]}</small>
HTML : <<<HTML
<small class="big-alert-danger">{$_SESSION[$errorName][$errorKey]}</small>
HTML;            
            }
        }
        return null;
    }

    public function sanitize(array $posts = []): array
    {
        $sanitized_posts = [];
        foreach($posts as $name => $post){
            if($name !== "remember-me"){
                $sanitized_posts[$name] = htmlentities($post);
            }
            
            if($name === "pwd"){
                $sanitized_posts[$name] = password_hash($post, PASSWORD_BCRYPT);
            }
        }

        return $sanitized_posts;
    }

}