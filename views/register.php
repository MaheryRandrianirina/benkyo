<?php

use App\Controllers\FormController;
use App\Controllers\SessionController;
use Core\Helpers\views\Form;

SessionController::setSessionStart();

$title = "Inscription";
$js = "./assets/register.js";

?>
<form class="register-form-container" method="POST" action="<?=$router->generate('register')?>">
    <div class="input-container container-one <?= isset($_SESSION['register_errors']) ? 'height_auto' : ''?>">
        <div class="pseudo_container">
            <label for="pseudo">Pseudo</label>
            <input type="text" id="pseudo" autocomplete="off" name="pseudo">
            <?= FormController::showErrors("register_errors", "pseudo") ?? null?>
        </div>
        <div class="email_container">
            <label for="mail">Adresse mail</label>
            <input type="email" id="mail" autocomplete="off" name="mail">
            <?= FormController::showErrors("register_errors", "mail") ?? null?>
        </div>
        <div class="birth_container">
            <label for="birth">Date de naissance</label>
            <input type="date" id="birth" autocomplete="off" name="birth">
            <?= FormController::showErrors("register_errors", "birth") ?? null?>
        </div>
    </div>
    <div class="input-container container-two <?= isset($_SESSION['register_errors']) ? 'height_auto' : ''?>">
        <div class="countries_container">
            <label for="pays">Pays</label>
            <select name="pays" id="pays">
            <?php Form::option(["madagascar" => "Madagascar", "france" => "France", "etats-unis" => "Etats-Unis"]);?>
            </select>
        </div>
        <div class="cities_container">
            <label for="region">Région</label>
            <select name="regions" id="pregions">
            <?php Form::option(["fianarantsoa" => "Fianarantsoa", "tana" => "Tana", "tamatave" => "Tamataves"]);?>
            </select>
        </div>
        <div class="sex_container">
            <label for="sexe">Sexe</label>
            <select name="sexe" id="sexe">
            <?php Form::option(["homme" => "Homme", "femme" => "Femme"]);?>
            </select>
        </div>
    </div>
    <div class="input-container container-three <?= isset($_SESSION['register_errors']) ? 'height_auto' : ''?>">
        <div class="password_container">
            <label for="pwd">Mot de passe</label>
            <input type="password" id="pwd" name="pwd">
            <?=FormController::showErrors("register_errors", "pwd", $_SESSION) ?? null?>
        </div>
        <div class="password_confirmation_container">
            <label for="pwd-confirm">Confirmer le mot de passe</label>
            <input type="password" id="pwd-confirm" name="pwd-confirm">
            <?=FormController::showErrors("register_errors", "pwd-confirm", $_SESSION) ?? null?>
        </div>
        <div class="registration_button">
            <button type="submit" name="submitBtn" disabled class="submitBtn registerBtn">S'inscire</button>
        </div>
    </div>
    <?php
    unset($_SESSION['register_errors']);
    ?>
</form>