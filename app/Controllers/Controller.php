<?php
namespace App\Controllers;

use AltoRouter;
use App\App;
use App\Cookies\CookiesManager;
use App\Validator\Validator;
use Core\Helpers\User;
use FilesystemIterator;

class Controller {
    
    protected $router;
    
    protected $app;

    public function __construct()
    {
        $this->app = App::getInstance();
    }
        
    /**
     * rend la vue passé en paramètre
     * @return void
     */
    public function render(string $view, $params = [], array $routeParams = [], ?string $layout = null)
    {
        $router = $this->router;
        $routeParams = $routeParams;
        $params = $params;
        $authUser = User::getAuthenticated();
        $view = str_replace(".", "/", $view);
        $pageLayout = $layout !== null ? $layout : "default";
        ob_start();
        require dirname(__DIR__,2) . DIRECTORY_SEPARATOR . "views" . DIRECTORY_SEPARATOR . $view . ".php";
        $content = ob_get_clean();
        require dirname(__DIR__,2) . DIRECTORY_SEPARATOR . "views/layouts/" . DIRECTORY_SEPARATOR. $pageLayout . ".php";
    }
    
    /**
     * retourne la vue sans le layout
     * @return void
     */
    public function renderWithoutLayout(string $view, $params = [], $routeParams = [])
    {
        $router = $this->router;
        $params = $params;
        $results = $routeParams;
        $view = str_replace(".", "/", $view);
        require dirname(__DIR__,2) . DIRECTORY_SEPARATOR . "views" . DIRECTORY_SEPARATOR . $view . ".php";
    }
    
    public function redirect(string $routeName, string $error_name = null, array $errors = [])
    {
        if(!empty($errors) && $error_name !== null){
            SessionController::setSession($error_name, null, $errors);
        }
        $route = $this->router->generate($routeName);
        
        header("Location:$route");
    }
      
    /**
     * vérifie si la personne est autorisé à accéder au contenu
     * @return bool
     */
    public function authorized(): bool
    {
        if(isset($_COOKIE['auth']) && !empty($_COOKIE['auth'])){
            if(CookiesManager::auth($_COOKIE['auth'])){
                return true;
            }else{
                return false;
            }
        }elseif(isset($_SESSION['auth']) && !empty($_SESSION['auth'])){
            return true;
            
        }else{
            return false;
        }
    }  
    
    protected function getValidator(array $posts = []): Validator
    {
        return new Validator($posts);
    }
}