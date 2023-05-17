<?php

use App\Controllers\FormController;
use App\Controllers\SessionController;

SessionController::setSessionStart();

$title = "login";
$js = "./assets/login.js";
$navClass = "nav-login"
?>
<section id="login-main">
        <div class="presentation_left">
            <div class="presentation-container">
                <h1 class="presentation-title">OBENKYO</h1>
                <p class="presentation-paragraphe">Lorem ipsum dolor sit amet consectetur adipisicing elit. <br> Porro perferendis quis, accusantium provident <br>nostrum perspiciatis. Perspiciatis similique <br>accusamus, autem fugiat rerum maiores sed vel <br>praesentium odio sequi consequatur architecto quo.</p>
            </div>
        </div>
        <div class="login_container_right">
            <?= FormController::showErrors('loginUserNotFound', "userNotFound") ?? '' ?>
            <form action="<?=$router->generate('login')?>" method="post" class="login_form">
                <div class="pseudo-container">
                    <label for="pseudo">Entrez votre pseudo</label>
                    <input type="text" placeholder="pseudo" name="pseudo" id="pseudo" autocomplete="off"><i class="fas fa-user pseudo-logo"></i>
                    <?= FormController::showErrors("login_errors", "pseudo") ?? '' ?>
                </div>
                <div class="pwd-container">
                    <label for="pwd">Entrez votre mot de passe</label>
                    <input type="password" placeholder="mot de passe" id="pwd" name="pwd"><i class="fas fa-lock lock"></i>
                    <?= FormController::showErrors("uncorrect-password", "pwd") ?? '' ?><br>
                </div>
                <div class="remember_me_container">
                    <input type="checkbox" class="remember-me" name="remember-me">
                    <span class="remember-span">Se souvenir de moi</span><br>
                </div>
                <div class="login_button">
                    <button type="submit" class="submitBtn" disabled>Se connecter</button>
                </div>
                <div class="have-no-account">Pas de compte ? <a href="<?= $router->generate('register')?>">S'inscrire</a></div>

            </form>
        </div>
        <?php
        unset($_SESSION['login_errors']);
        unset($_SESSION['loginUserNotFound']);
        unset($_SESSION['uncorrect-password']);
        ?>
</section>