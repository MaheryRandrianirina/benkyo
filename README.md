# A PROPOS DE L'APPLICATION
    Cet application nommé "Benkyo" qui veut dire 'Etude' en japonais aide les élèves et les étudiants
    dans leurs révisions en leur donnant les outils pour gérer celles-ci.
    L'application se base sur les méthodes des sciences cognitives telles que les répétitions espacées et la méthode pomodoro. 
    Le nombre de matières à revisier par jour est limité à 3 mais peut monter jusqu'à 5 si les 2 autres sont des 
    exercices. Ceci pour éviter d'éventuelles surménages et de garder le cerveau frais tout en optimisant la retention
    des informations au maximum.

# FONCTIONNALITES
    1- Authentification
    2- Création d'emploi du temps
        - Ajoute de ligne qui représente les informations sur la matière à réviser (nom, chapitre, date, heure)
        - Suppression de lignes
        - Génération automatique des répétitions
    3- Suppression de l'emploi du temps quand celui-ci est terminé.
    4- Affichage des révisions terminés
    4- Affichage de l'emploi du temps du jour
        - Lancer la révision d'une matière
        - Stopper la révision d'une matière
        - Faire pause
        - Affichage de notification qui alerte le temps de faire pause et le temps de reprise
        - Chronomètre affichant la durée de révision et celle de la pause
        - Remettre la révision à plutard s'il y a un imprévu en modifiant la date et l'heure.
    5- Création d'évènements (exemple: controlle, examen)
        - Possibilité d'ajouter 2 évènements en une seule fois. Au moins 1
        - Afficher les détails de l'évènement
        - Suppression de l'évènement
    6- Responsive design

# COMMENT LANCER L'APPLICATION
    CAS N°1 : VOUS UTILISER UN LOGICIEL TEL QUE WAMP, LAMP, LARAGON,...
        1- Créer une base de donnée
        2- Exporter dedans le fichier benkyo.sql qui se trouve à la racine puis éxecuter le dedans dedans
        3- Changer le nom de la base de donnée, le nom d'utilisateur et le mot de passe s'il y en a dans 
        Database/Database.php
        4- Ouvrez le projet avec votre logiciel
    CAS N°2 : 
        1- Lancer le service mySql ou mariaDb de votre machine. Sinon, 
        2- Si c'est la première fois que vous lancer l'application, créer une base de donnée puis éxecuter dedans le script SQL dans le fichier benkyo.sql qui se trouve à la racine.
        3- Changer le nom de la base de donnée, le nom d'utilisateur et le mot de passe s'il y en a dans 
        Database/Database.php
        4- Lancer la commande : php -S localhost:8000 -t public (vous n'êtes pas obligé 
        d'utiliser le port 8000 mais êtes libres d'utiliser n'importe quel port que vous voulez)
        5- Ouvrir l'adresse localhost:8000 dans votre navigateur

VOUS ETES MAINTENANT PRET A UTILISER L'APPLICATION !
