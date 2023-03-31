<?php
namespace App\Cookies;

use App\App;

class CookiesManager {   

    /**
     * crée une cookie après le login si remember-me a été coché.
     * @param  array $users
     * @param  mixed $posts
     * @return void
     */
    public function setForLoginRemember(array $users = []): void
    {
        foreach($users as $user){
            setcookie("auth", $user->getId() . "----" . sha1($user->getUsername() . $user->getPassword()), time() + 3600 * 24 * 7, "/", $_SERVER['HTTP_HOST'], false, true);
        }
    } 

    /**
     * 
     * vérifie que l'utilisateur dans le cookie existe
     * @param  mixed $authCookie
     * @return bool
     */
    public static function auth($authCookie): bool
    {
        $explode = explode("----", $authCookie);
        $userid = (int)$explode[0];
        
        $usersmodel = App::getInstance()->getModel("Users");
        $user = $usersmodel->get($userid);
        
        if(sha1($user->getUsername() . $user->getPassword()) === $explode[1]){
            return true;
        }else{
            return false;
        }     
    }

    public static function getUserId()
    {
        $user_id = explode('----', $_COOKIE['auth'])[0];
        return $user_id;
    }
}