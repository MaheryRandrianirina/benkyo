<?php

namespace App\Manager\Files;

class Image {
    public static function displayProfilePhoto(): string
    {
        return '<img src="profile-photo.php" hidden class="user-profile-photo"></img>
        <i class="fas fa-plus user-profile-photo-edit"></i>';
    }
}