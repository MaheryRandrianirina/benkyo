<?php 
namespace App\Controllers;

use AltoRouter;
use App\App;
use App\Cookies\CookiesManager;

class LoginController extends FormController {

    public function __construct(AltoRouter $router)
    {
        parent::__construct();
        if($this->router === null){
            $this->router = $router;
        }
    }

    /**
     * rend la vue login
     * @param  array $params
     * @return void
     */
    public function loginPage(array $params = []):void
    {
        SessionController::setSessionStart();
        if($this->authorized()){
            $homecontroller = new HomeController($this->router);
            $homecontroller->indexForLogged();
        }else{
            $this->render("login", $params);
        }
    }

    public function loginForNotLogged()
    {
        SessionController::setSessionStart();
        $this->render("login");   
    }

    public function loginAction()
    {
        $errors = $this->getValidator($_POST)
            ->required('pseudo', 'pwd')
            ->isName('pseudo')
            ->isPassword('pwd')
            ->getErrors();
        
        if($errors === null || empty($errors->getMessages())){
            $app = App::getInstance();
            $usersmodel = $app->getModel("Users");
            $users = $usersmodel->login($_POST);

            if(!empty($users)){
                $this->login($users, $_POST);
            }else{
                $this->redirect("login", "loginUserNotFound", ['userNotFound' => "Utilisateur introuvable.\nVeuillez entrer des informations correctes."]);
            }
        }else{ 
            $this->redirect("login", "login_errors", $errors->getMessages());
            http_response_code(301);
        }
    }
    /**
     * crée la session de connexion
     * 
     * @param  array $users
     * @param  array $posts
     * @return void
     */
    public function login(array $users, array $posts = []): void
    {
        foreach($users as $user){
            if(password_verify($posts['pwd'], $user->getPassword())){
                if(isset($posts['remember-me']) && $posts['remember-me'] === 'on'){
                    $cookieManager = new CookiesManager();
                    $cookieManager->setForLoginRemember($user);
                }else{
                    SessionController::setSession("auth", $user->getId());
                }
                
                $this->redirect("home");
                http_response_code(301);
            }else{
                $this->redirect("login", "uncorrect-password", ["pwd" => "Le mot de passe est incorrect"]);
                http_response_code(301);
            }
        }
    }
}