<?php

namespace Database\Models;

use Core\Helpers\User;
use Core\Entities\Event;
use Core\Helpers\MyDateTime;
use DateTime;

class EventsModel extends Model {
    protected $table = "events_user";
    protected $tableToJoin = 'user';
    protected $tableField = "id";
    protected $fieldForJoin = "user_id";


    public function all(): array
    {
        $statement = $this->getAllQuery()->finalize();
        if(!is_null($statement)){
            return $this->fetch($statement, Event::class, true);
        }
        return [];
    }

    private function getAllQuery()
    {
        return $this->joinSelect(['t.*'], ['t.user_id = ?'], ['t.user_id' => User::getId()]);
    }
    /**
     * retourn un échantillon d'évènements. Deux dans notre cas ici.
     */
    public function getSample(): array
    {
        $statement = $this->getAllQuery()->limit("2")->finalize();
        if(!is_null($statement)){
            return $this->fetch($statement, Event::class, true);
        }
        return [];
    }

    public function create(array $fields, $posts = []): bool
    {
        $postsChunks = array_chunk($posts, 3, true);
        $authUserId = User::getId();
        $myDateTime = new MyDateTime();

        if($posts["event_name_two"] !== ""){
            $countLoop = 0;
            foreach($postsChunks as $posts){
                $countLoop++;
                $posts['user_id'] = $authUserId;
                $posts['created_at'] = date("Y-m-d H:i:s", time());
                if(array_key_exists('event_date_one', $posts)){
                    $posts['event_date_one'] = $myDateTime->getDateTime($posts['event_date_one']);
                }else if(array_key_exists('event_date_two', $posts)){
                    $posts['event_date_two'] = $myDateTime->getDateTime($posts['event_date_two']);
                }
                
                $this->posts = $posts;
                if($countLoop === 1){
                    $this->insert($fields);
                }else {
                    return $this->insert($fields);
                }
            } 
        }

        $postsChunks[0]['event_date_one'] = $myDateTime->getDateTime($posts['event_date_one']);
        $this->posts = $postsChunks[0];
        $this->posts['user_id'] = $authUserId;
        $this->posts['created_at'] = date("Y-m-d H:i:s", time());
        
        return $this->insert($fields);
    }
}