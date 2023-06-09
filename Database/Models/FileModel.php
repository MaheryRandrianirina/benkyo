<?php
namespace Database\Models;

use Core\Helpers\User;
use Core\Entities\Image;
use Core\Interfaces\GlobalInterface;

class FileModel extends Model {
    protected $table = "user_images";
    public function insert($fields = [], $data = []): bool
    {
        $this->posts = $data;
        return parent::insert($fields);
    }

    public function update($fields = [], $data = [], $whereAndWhereValues = []): bool
    {
        $this->posts = $data;
        return parent::update($fields, $whereAndWhereValues);
    }
    
    /**
     * récupère le path de la photo de profile de l'utilisateur dans la BD
     * @return GlobalInterface
     */
    public function getProfilePhotoPath(): ?GlobalInterface
    {
        $statement = $this->select(["path"], ["user_id = ?"], ["user_id" => (int)User::getId()]);
        if($statement !== null){
            $fetch = $this->fetch($statement, Image::class);
            return $fetch !== false ? $fetch : null;
        }
        return null;
        
    }
}