<?php
namespace App\Controllers;

require dirname(__DIR__,2) . DIRECTORY_SEPARATOR . "vendor" . DIRECTORY_SEPARATOR . "autoload.php";

use AltoRouter;
use App\Text;
use Core\Helpers\MyDateTime;
use Core\Helpers\User;
use Core\Entities\Calendar;
use Core\Entities\Calendarcontent;
use Database\Models\UsersModel;

class HomeController extends Controller {
    public function __construct(AltoRouter $router)
    {
        parent::__construct();
        $this->router = $router;
    }

    /**
     * @param Array $params paramètres de l'url
     */
    public function index($params = []):void
    {
        SessionController::setSessionStart();
        $usersModel = new UsersModel();
        if($this->authorized()){
            $profilePhoto = UsersModel::profilePhoto();
            $events = $usersModel->events()->getSample();
            $this->render("home", $params, compact('profilePhoto', 'events'));
        }else{
            $loginController = new LoginController($this->router);
            $loginController->loginForNotLogged();
        }
    }

    /**
     * redirection vers le home de celui qui est déjà connecté
     * s'il tente d'avoir accès à une page dont il n'en a pas l'autorisation
     */
    public function indexForLogged()
    {
        SessionController::setSessionStart();
        $profilePhoto = UsersModel::profilePhoto();
        $this->render("home", $profilePhoto);
    }

    public function EditProfilePhoto()
    {
        $this->renderWithoutLayout('editProfilePhoto');
    }

    /**
     * @return array l'emploi du temps du jour
     */
    public function getTodayCalendar(): array
    {
        $calendarContentModel = $this->getCalendarContentModel();
        $datetime = new MyDateTime();
        $current_timestamp = $datetime->getDayCurrentTimestamp();
        
        $emploidutemps = $calendarContentModel->joinSelect(['t.*'], 
        ['t.date = ?', 'j.user_id = ?'],
        ['date' => (string)$current_timestamp, 'user_id' => User::getId()])
            ->orderBy('time')
            ->finalize();

        return $calendarContentModel->fetch($emploidutemps, Calendarcontent::class, true);
    }

    public function revision($params = [])
    { 
        $todayCalendar = $this->getTodayCalendar();
        $this->renderWithoutLayout('homeContent.revision', $params, compact('todayCalendar'));
    }

    public function getCalendarContentModel()
    {
        return $this->app->getModel("Emploidutempscontent");
    }

    public function calendar($params = [])
    {
        $calendarmodel = $this->app->getModel("Calendar");
        $idStatement = $calendarmodel->joinSelect(
            ['t.id'], 
            ['t.user_id = ?'], 
            ['user_id' => User::getId()]
            )->finalize();
        $emploiDuTempsId = $calendarmodel->fetch($idStatement, Calendar::class, true);
        
        if(!empty($emploiDuTempsId)){
            $calendarNumber = count($emploiDuTempsId);
            $calendarContentModel = $this->getCalendarContentModel();
            $finalResult = [];

            for($x = 0; $x < $calendarNumber; $x++){
                $contentStatement = $calendarContentModel->joinSelect(
                    ['t.*'], 
                    ['t.emploi_du_temps_id = ?'], 
                    ['emploi_du_temps_id' => $emploiDuTempsId[$x]->getId()]
                    )
                    ->orderBy('time')
                    ->finalize();
                
                $result = $calendarContentModel->fetch($contentStatement, Calendarcontent::class, true);
                
                if(!empty($result)){
                    $finalResult[] = $result;
                }
            }
            
            if(!empty($finalResult)){
                $this->renderWithoutLayout('homeContent.calendar', $params, compact('finalResult'));
            }else{
                echo "il semble que vous ayez un id d'emploi du temps mais il n'y a pas de contenu";
                http_response_code(500);
                
            }
        }else{
            echo Text::notEvenCalendar();
        }
    }

    public function tasks($params = [])
    {
        $this->renderWithoutLayout("homeContent.tasks");
    }

    public function help()
    {
        $this->renderWithoutLayout("homeContent.help");
    }

    /**
     * return the calendar content on array form
     */
    public function ArrayCalendarContent()
    {
        $calendarContentModel = $this->getCalendarContentModel();
        $datetime = new MyDateTime();
        $current_timestamp = $datetime->getDayCurrentTimestamp();

        $emploidutemps = $calendarContentModel->joinSelect(['t.*'], 
        ['t.date = ?', 'j.user_id = ?'],
        ['date' => (string)$current_timestamp, 'user_id' => User::getId()])
            ->orderBy('time')
            ->finalize();

        $result = $calendarContentModel->fetch($emploidutemps, null, true);
        if(!empty($result)){
            echo json_encode(['result' => $result]);
        }else{
            echo json_encode(["result" => null]);
        }
        
    }

    /**
     * execute une requête pour stopper la revision d'une matière 
     */
    public function stopRevision()
    {
        if(!empty($_POST['status']) && !empty($_POST['subject-id']) && !empty($_POST['calendar-id'])){
            $calendarContentModel = $this->getCalendarContentModel();
            if($calendarContentModel->joinUpdate(
                ['done = ?' => (int)$_POST['status']], 
                ['t.id = ?' => (int)$_POST['subject-id'], 't.emploi_du_temps_id = ?' => $_POST['calendar-id']],
            ) !== null){
                echo json_encode(['success' => "La revision de cette matière est terminée"]);
            }else{
                echo json_encode(['fail' => "La revision de cette matière est terminée"]);
                http_response_code(500);
            }
        }    
    }


    public function saveRevisionForAnotherTime()
    {
        $calendarContentModel = $this->getCalendarContentModel();

        $myDatetime = new MyDateTime();
        $newDate = $_POST['new_date'];
        $newTime = $_POST['new_time'];
        $calendarId = (int)$_POST['calendar-id'];
        $currentTime = (int)$_POST['current-time'];
        $date = $myDatetime->getTimeStamp($newDate);
        $time = $myDatetime->getTimeStamp($newDate, $newTime);
        
        //le nombre de temps décalé en timestamp
        $ecartDeTemps = $time - $currentTime;
        
        $dateTimeAndIds = $calendarContentModel->getCalendarContent(
            ["t.time", "t.id", "t.date"], 
            ["t.time >=" => $currentTime, "t.emploi_du_temps_id" => $calendarId]
        
        );
        
        $SuccessOrFail = [];
        for($i = 0; $i < count($dateTimeAndIds); $i++){
            if($dateTimeAndIds[$i]->getDate() <= $date){
                if($calendarContentModel->joinUpdate(
                    [
                        'date= ?' => $date,
                        'time = ?' => (int)$dateTimeAndIds[$i]->getTime() + $ecartDeTemps
                    ], 
                    ['t.id = ?' => (int)$dateTimeAndIds[$i]->getId(), 't.emploi_du_temps_id = ?' => $calendarId],
                ) !== null){
                    if(!array_key_exists("success", $SuccessOrFail)){
                        $SuccessOrFail['success'] =  "revision sauvegardée avec succès !";
                    }
                    
                }else{
                    if(!array_key_exists("fail", $SuccessOrFail)){
                        $SuccessOrFail['fail']  = "sauvegarde de la revision échouée !";
                    }
                }
            }else{
                if($calendarContentModel->joinUpdate(
                    [
                        'time = ?' => (int)$dateTimeAndIds[$i]->getTime() + $ecartDeTemps
                    ], 
                    ['t.id = ?' => (int)$dateTimeAndIds[$i]->getId(), 't.emploi_du_temps_id = ?' => $calendarId],
                ) !== null){
                    if(!array_key_exists("success", $SuccessOrFail)){
                        $SuccessOrFail['success'] =  "revision sauvegardée avec succès !";
                    }
                    
                }else{
                    if(!array_key_exists("fail", $SuccessOrFail)){
                        $SuccessOrFail['fail']  = "sauvegarde de la revision échouée !";
                    }
                }
            }
            
        }
        echo json_encode($SuccessOrFail);
    }
}