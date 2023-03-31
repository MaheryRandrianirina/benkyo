<?php
namespace Core\Helpers;

use App\Controllers\SessionController;
use App\Cookies\CookiesManager;
use Database\Models\UsersModel;

class User {
    public static function getId()
    {
        SessionController::setSessionStart();
        
        if(isset($_COOKIE['auth']) && !empty($_COOKIE['auth'])){
            return (int)CookiesManager::getUserId();
        }elseif(isset(($_SESSION['auth'])) && !empty($_SESSION['auth'])){
            return (int)$_SESSION['auth'];
        }

        return null;
    }

    public static function getAuthenticated()
    {
        $usersModel = new UsersModel();
        if(self::getId() !== null){
            return $usersModel->get(self::getId());
        }

        return null;
    }
}