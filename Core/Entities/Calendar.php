<?php
namespace Core\Entities;

use Core\Interfaces\GlobalInterface;

class Calendar implements GlobalInterface {
    private $id;
    private $user_id;

    public function getId(): int
    {
        return $this->id;
    }

    public function getUserId(): int
    {
        return $this->user_id;
    }
}