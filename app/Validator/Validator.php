<?php
namespace App\Validator;

class Validator {

    private $posts = [];

    private $errors = [];

    public function __construct(array $posts = [])
    {
        $this->posts = $posts;
    }

    public function required(string ...$fields): self
    {
        foreach($fields as $field){
            if($this->posts[$field] === '' || $this->posts[$field] === null){
                $this->addTypeErrorForField('empty', $field);
            }
        }
        return $this;
    }

    private function addTypeErrorForField(string $type, ?string $field = null): void
    {
        $this->errors[$type][] = $field;
    }

    public function string(string ...$fields): self
    {
        foreach($fields as $field){
            $parseIntValue = (int)$this->posts[$field];
            if($parseIntValue > 0){
                $this->addTypeErrorForField('string', $field);
            }
        }
        
        return $this;
    }

    public function isName(string $field): self
    {
        if(!preg_match("/[a-zA-Z_]/", $this->posts[$field])){
            $this->addTypeErrorForField('name', $field);
        }
        return $this;
    }

    public function isPassword(string $field): self
    {
        if(!preg_match("/[a-zA-Z0-9_]/", $this->posts[$field]) && strlen($this->posts[$field]) < 8) {
            $this->addTypeErrorForField('password', $field);
        }
        return $this;
    }

    public function isEmail(string $field): self
    {
        if(!filter_var($this->posts[$field], FILTER_VALIDATE_EMAIL)) {
            $this->addTypeErrorForField('email', $field);
        }
        return $this;
    }

    public function confirmedPassword(string $originalePassword, string $confirmationPassword): self
    {
        if($this->posts[$originalePassword] !== $this->posts[$confirmationPassword]){
            $this->addTypeErrorForField('password_confirmation');
        }
        return $this;
    }
    
    public function getErrors(): ?FormError
    {
        if(!empty($this->errors)){
            return new FormError($this->errors);
        }

        return null;
    }
}