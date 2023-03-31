<?php
namespace App\Controllers;

use Core\Helpers\User;

class CalendarController extends Controller {

    public function dropCalendar(): void
    {
        $calendarModel = $this->app->getModel("Calendar");

        if($calendarModel->delete([], ['user_id' => User::getId()])){
            echo json_encode(['message' => "Emploi du temps supprimé !"]);
            exit();
        }else{
            echo json_encode(['message' => "Echec de la suppression de l'emploi du temps."]);
            exit();
        }
    }
}