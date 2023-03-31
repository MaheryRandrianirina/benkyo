<?php

namespace App;

class Text {

    public static function notEvenCalendar(): string
    {
        return "
        <div class='not-even-calendar'>
            <h1>Vous n'avez pas encore d'emploi du temps !</h1>
            <ul class='calendar-creation-instructions'>
                <li>Si vous revisez pour retenir vos cours, vous pouvez reviser 3 matières par jour.</li>
                <li>Vous pouvez monter jusqu'à 5 si les 2 matières supplémentaires sont des exercices.</li>
                <li>Libre à vous de gerer votre emploi du temps de la journée en ne dépassant simplement pas le quota de 3 matières pour les retentions.</li>
            </ul>
            <div class='add-calendar'>Ajouter un emploi du temps<i class='fas fa-plus'></i></div>
        </div>
        ";
    }
}