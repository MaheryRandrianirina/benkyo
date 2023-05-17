<?php
namespace App\Controllers;

use AltoRouter;
use App\App;

class RegisterController extends FormController {

    public function __construct(AltoRouter $router)
    {
        parent::__construct();
        if($this->router === null){
            $this->router = $router;
        }
    }

    /**
     * register
     * misy olana @authorization fa lasa samy eo na ny home na register
     * @param  mixed $params
     * @return void
     */
    public function registerPage($params = []):void
    {
        if($this->authorized()){
            $homeController = new HomeController($this->router);
            $homeController->indexForLogged();
        }else{
            $this->render("register", $params, [], "registration");
        }
        
    }

    public function register()
    {
        $errors = $this->getValidator($_POST)
            ->isName('pseudo')
            ->isPassword('pwd')
            ->isEmail('mail')
            ->required('pseudo', 'birth', 'pwd', 'pwd-confirm', 'mail')
            ->confirmedPassword('pwd', 'pwd-confirm')
            ->getErrors();

        if($errors === null || empty($errors->getMessages())){
            $app = App::getInstance();
            $usersmodel = $app->getModel("Users");
            $sanitizedPost = $this->sanitize($_POST);
            $user = $usersmodel->register($sanitizedPost);
            $loginController = new LoginController($this->router);
            $loginController->login($user, $_POST);
        }else{
            $this->redirect("register", "register_errors", $errors->getMessages());
            http_response_code(301);
        }
    }
}