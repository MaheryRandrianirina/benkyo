<?php

namespace App\Controllers;

use Core\Helpers\User;
use Database\Models\EventsModel;

class EventController extends Controller {

    private $eventModel;

    public function __construct()
    {
        $this->eventModel = new EventsModel();
    }

    public function create()
    {
        $errors = $this->getValidator($_POST)
            ->required('event_name_one', 'event_description_one', 'event_date_one')
            ->string('event_name_one', 'event_description_one')
            ->getErrors();

        if($errors !== null){
            echo json_encode(['isErrors' => $errors->getMessages()]);
            http_response_code(500);
        }else {
            echo json_encode($this->getMessagesAfterEventsStoring($_POST)); 
        }
        
    }

    private function getMessagesAfterEventsStoring(array $posts): array
    {
        if($this->eventModel->create(['name', 'date', 'description', 'user_id', 'created_at'], $posts)){
            return ['success' => 'Evènement ajouté !'];
        }else {
            http_response_code(500);
            return ['fail' => 'Echec de l\'ajout d\'évènement !'];
        }
    }

    public function delete()
    {
        $eventId = (int) $_POST['id'];
        if($this->eventModel->delete([], ['id' => $eventId, 'user_id' => User::getId()])){
            echo json_encode(['success' => "Evènement supprimé avec succès !"]);
        }else {
            echo json_encode(['fail' => "Echec de la suppression"]);
            http_response_code(500);
        }
    }

    public function showAll($params = [])
    {
        $events = (new EventsModel)->all();
        return $this->renderWithoutLayout("events", $params, compact('events'));
    }
}