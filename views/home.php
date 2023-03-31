<?php

use App\Manager\Files\Image;

$home_class = "home";
$title = "home";
$js = "./assets/home.js";

?>
<section id="home-main">
    <div class="sidebar-left">
        <i class="fas fa-home revision-logo active-item" data-name="Révisions de <br> la journée"></i>
        <i class="fas fa-calendar calendar-logo" data-name="Emploi du temps"></i>
        <i class="fas fa-tasks tasks-logo" data-name="Instructions"></i>
        <i class="fas fa-question-circle help-logo" data-name="Aide"></i>
    </div>
    <section class="content">
    </section>
    <div class="user-profile-right">
        <div class="user-auth">
            <div class="user-logo">
                <?php if($routeParams['profilePhoto'] === null || $routeParams['profilePhoto'] === ''):?>
                    <i class="fas fa-user-circle user-profile-photo"></i>
                    <i class="fas fa-plus user-profile-photo-edit"></i>
                <?php else:?>
                    <?= Image::displayProfilePhoto();?>
                <?php endif ?>
            </div>
            <p class="user-pseudo"><?= ucfirst($authUser->getUsername());?></p>
        </div>
        <div class="events">
            <p class="title">EVENEMENTS <i class="fas fa-calendar-alt"></i></p>
            <?php if(!empty($routeParams['events'])): ?>
                <div>
                    <?php foreach($routeParams['events'] as $event) :?>
                        <div class="event">
                            <div class="event_name"><?= $event->name ?><i class="fas fa-trash"></i></div>
                            <div class="event_date hidden_event_data" hidden><?= $event->date ?></div>
                            <div class="event_description hidden_event_data" hidden><?= $event->description ?></div>
                            <input type="hidden" value="<?= $event->id;?>">
                        </div>
                    <?php endforeach ?>
                    <a href="/events" class="show_all_events">Afficher tout <i class="fas fa-arrow-right"></i></a>
                </div>
            <?php else : ?>
                <p>Vous n'avez pas d'évènements prévues.</p>
            <?php endif ?>
            <button class="add_event">Ajouter</button>
        </div>
    </div>
</section>
