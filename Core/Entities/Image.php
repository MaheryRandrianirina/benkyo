<?php

namespace Core\Entities;

use Core\Interfaces\GlobalInterface;

class Image implements GlobalInterface {
    private $id;
    private $path;
    private $extension;
    private $size;
    private $user_id;

    public function getId()
    {
        return $this->id;
    }

    public function getPath()
    {
        return dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . "data" . DIRECTORY_SEPARATOR . "images" . DIRECTORY_SEPARATOR . $this->path;
    }

    public function getExtension()
    {
        return $this->extension;
    }

    public function getSize()
    {
        return $this->size;
    }

    public function getuserId()
    {
        return $this->user_id;
    }
}