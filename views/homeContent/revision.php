<?php

use Core\Helpers\MyDateTime;

 if(empty($results['todayCalendar'])) : ?>
    <div class="empty-revision">
        <h1>Vous n'avez pas de revision pour aujourd'hui !</h1>
        <i class="fas fa-smile"></i>
    </div>

<?php else: ?>
    <?php $i = 0; ?>
    <?php $datetime = new MyDateTime(); ?>
    <div class="revision_container">
        <div class="revision_head">
            <p class="subject">Matière</p>
            <p class="chapter">Chapitre</p>
            <p class="time">Heure</p>
        </div>
    <?php foreach($results['todayCalendar'] as $subject):?>
    <?php $i++; ?>
        <?php if($subject->getDone() === 0):?>
        <div class="revision_body">
            <div class="subject subject-<?=$i?>">
                <p class="subject-name"><?=$subject->getSubject()?></p>
                <p class="subject-chapter"><?=$subject->getChapter()?></p>
                <p class="revision-time <?= $subject->getTime() < time() ? "time-left" : ""?>"><?= $subject->getTime() > time() ? $datetime->getTime($subject->getTime()) : "L'heure est déjà dépassée \n depuis " . $datetime->getTimeLeft($subject->getTime())?></p>
                <div class="buttons">
                    <div><i class="fas fa-play revision-button revision-play"></i></div> 
                    <div class="another-time-revision-button"><i class="fas fa-edit"></i></div>  
                </div> 
            </div>
            
            <input name="subject-id" class="<?=$subject->getId()?>" type="hidden" value="<?=$subject->getId()?>">
            <input name="calendar-id" class="<?=$subject->getId()?>" type="hidden" value="<?=$subject->getCalendarId()?>">
            <input name="current-time" class="<?=$subject->getId()?>" type="hidden" value="<?=$subject->getTime()?>">
        </div>
        <?php endif?>
    <?php endforeach?>
    </div>
<?php endif?>
