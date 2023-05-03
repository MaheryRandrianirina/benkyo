<?php
namespace App\Controllers;

use App\App;
use Core\Helpers\MyDateTime;
use Core\Helpers\User;
use Core\Entities\Emploidutemps;

class UserController extends Controller {

    public function calendar()
    {
        $formcontroller = new FormController(); 
        $errorMessages = $this->validateCalendarEntries($_POST);

        if(empty($errorMessages)){
            $sanitizedPosts = $formcontroller->sanitize($_POST);
            $app = App::getInstance();
            //on insert l'emploi du temps
            $emploi_du_temps = $app->getModel('Calendar');
            $user_id = User::getId();
            $model = $app->getModel();
            
            $model->beginTransaction();
            if($emploi_du_temps->insert(['user_id'], ['user_id' => $user_id])){
                $statement = $emploi_du_temps->select(['id']);
                $ids = $emploi_du_temps->fetch($statement, Emploidutemps::class, true);
                $last_id = (int)end($ids)->getId();
                
                $chunkedSanitizedPosts = array_chunk($sanitizedPosts, 4, true); 
                //peut importe la taille du tableau, le dernier element est toujours l'id de l'emploi du temps 
                $chunkedSanitizedPosts[] = $last_id;
                //on enlève 1 la taille du tableau car le nombre de tableaux dedans sera utilisé pour le nombre de requête
                $number_for_loop = count($chunkedSanitizedPosts) - 1;

                $emploi_du_temps_content_model = $app->getModel('Emploidutempscontent');
                $success = null;
                $myDateTime = new MyDateTime();
                
                for($i = 0; $i < $number_for_loop; $i++){
                    $date = $chunkedSanitizedPosts[$i]['date-'. $i + 1];
                    $time = $chunkedSanitizedPosts[$i]['hour-'. $i + 1];
                    
                    //timestamp de la date + l'heure
                    $dateWithTimeTimestamp = $myDateTime->getTimeStamp($date, $time);
                    //timestamp de la date seulement
                    $dateOnlyTimestamp = $myDateTime->getTimeStamp($date);
                    $myDateTime->getDate($dateOnlyTimestamp);

                    foreach($chunkedSanitizedPosts[$i] as $name => $value){
                        if($name === "date-".$i+1 || $name === "hour-".$i+1){
                            array_pop($chunkedSanitizedPosts[$i]);
                        }
                    }

                    //insérer dans le tableau le timestamp de la matière
                    $chunkedSanitizedPosts[$i]['date-'.$i+1] = $dateOnlyTimestamp;
                    $chunkedSanitizedPosts[$i]['hour-'.$i+1] = $dateWithTimeTimestamp;
                    
                    if($emploi_du_temps_content_model->insert(['subject', 'chapter', 'date', 'time', 'emploi_du_temps_id'], [$chunkedSanitizedPosts[$i], [end($chunkedSanitizedPosts)]])){
                        //FAIRE UNE INSERTION DANS emploi_du_temps_day
                        $calendarDay = $app->getModel("CalendarDay");
                        
                        
                        if($calendarDay->insert(['calendar_timestamp', 'emploi_du_temps_id', 'user_id'], [
                            'timestamp' => $dateOnlyTimestamp,
                            'id' => $last_id, 
                            'user_id' => $user_id
                            ])){
                            $success = 1;
                        }else{
                            $success = 0;
                        }
                    }else{
                        $success = 0;
                    }

                }

                if($success === 1){
                    echo json_encode(['success' => 'Nouvel emploi du temps créé']);
                }elseif($success === 0){
                    http_response_code(500);
                    echo json_encode(['fail' => 'Un problème est survenu lors de la création de l\'emploi du temps.']);
                }
                
            }else{
                http_response_code(500);
                echo json_encode(['fail' => "création de l'emploi du temps échouée. Veuillez reéssayer"]);
            }
            $model->commit();
        }else{
            http_response_code(500);
            echo json_encode(['fail' => "Le formulaire est invalide"]);
            die();
        }
    }

    private function validateCalendarEntries(array $posts = []): array
    {
        $errorMessages = [];
        $chunkedPost = array_chunk($posts, 4, true);
        $loopNumberForValidation = count($chunkedPost) - 1;
        
        for($i = 0; count($chunkedPost) < $loopNumberForValidation; $i++){
            $errors = $this->getValidator($_POST)
                ->required('subject' . $i+1, 'chapter' . $i+1, 'date' . $i+1, 'hour' . $i+1)
                ->getErrors();
                
            if($errors !== null && !empty($errors->getMessages())){
                $errorMessages[] = $errors->getMessages();
            }
        }

        return $errorMessages;
    }
}