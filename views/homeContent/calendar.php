<div>
    <table class="calendar">
        <thead>
            <tr>
                <th>Matière <i class="fas fa-book"></i></th>
                <th>Date <i class="fas fa-calendar-day"></i></th>
                <th>Heure <i class="fas fa-calendar-times"></i></th>
                <th>Chapitre</th>
                <th>Statut</th>
            </tr>
        </thead>
        <tbody class="calendar-tbody">
            <?php
            use Core\Helpers\MyDateTime;
            $datetime = new MyDateTime();
            foreach($results['finalResult'] as $result):?>
                <?php foreach($result as $r):?>
                    <tr>
                        <td class="subject_name"><?=$r->getSubject()?></td>
                        <td class="subject_date"><?=$datetime->getDate($r->getDate())?></td>
                        <td class="subject_time"><?= (int)$r->getTime() > time() ? $datetime->getTime($r->getTime()) : "L'heure est déjà dépassé"?></td>
                        <td class="subject_chapter"><?=$r->getChapter()?></td>
                        <td class="status <?= $r->getDone() === 0 ? 'undone' : 'done'?>"><?= $r->getDone() === 0 ? 'pas encore fait <i class="fas fa-wrong"></i>' : 'terminé <i class="fas fa-check"></i>'?></td>
                    </tr>
                <?php endforeach?>
            <?php endforeach?>
        </tbody>
    </table>
    <button class="delete_button">Supprimer l'emploi du temps <i class="fas fa-trash"></i></button>
</div>