<?php
namespace App\Validator;

class FormError  {

    private $errors = [];

    private $errorMessage = [
        'empty' => "Le champ %s ne peut pas être vide.",
        'string' => "Le champ %s doit être une chaine de caractère.",
        'name' => "Le champ %s est invalide.",
        'password' => "Le mot de passe est invalide.",
        'email' => "Cet email est invalide.",
        'password_confirmation' => "Ce mot de passe ne correspond pas à l'original."
    ];

    public function __construct(array $errors)
    {
        $this->errors = $errors;   
    }

    public function getMessages(): array
    {
        $errorMessages = [];
        foreach($this->errors as $errorType => $fields){
            foreach($fields as $field){
                $errorMessages[$field] = sprintf($this->errorMessage[$errorType], $field);
            }
        };
        
        return $errorMessages;
    }
}