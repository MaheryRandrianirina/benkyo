<?php

require dirname(__DIR__,2) . DIRECTORY_SEPARATOR . "vendor" . DIRECTORY_SEPARATOR . "autoload.php";

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?? "titre par défaut";?></title>
    <link rel="stylesheet" href="">
    <link rel="stylesheet" href="all.min.css">
</head>
<body class="<?=$home_class ?? null?>">
    <nav class="navbar <?= $navClass ?? ""?>">
        <i class="fas fa-book logo" ></i>
        <div class="signed_up"><a href="<?=$router->generate('login')?>">Se connecter</a></div>
    </nav>
    <?php
    echo $content;
    ?>
    <script src="<?=$js ?? null?>" defer></script>
</body>
</html>