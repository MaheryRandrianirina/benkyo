<?php
require dirname(__DIR__) . DIRECTORY_SEPARATOR . "vendor" . DIRECTORY_SEPARATOR . "autoload.php";
use App\Router;

$router = new Router();
$router->get("/", "home", "App\\Controllers\\HomeController@index", "home")
       ->get("/revision", "revision", "App\\Controllers\\HomeController@revision", "revision.content")
       ->get("/calendar", "calendar", "App\\Controllers\\HomeController@calendar", "calendar.content")
       ->get("/tasks", "tasks", "App\\Controllers\\HomeController@tasks", "tasks.content")
       ->get("/help", "help", "App\\Controllers\\HomeController@help", "help.content")
       ->get("/login", "loginPage", "App\\Controllers\\LoginController@loginPage", "login")
       ->get("/register", "registerPage", "App\\Controllers\\RegisterController@registerPage", "register")
       ->get("/logout", "logout", "App\\Controllers\\LogoutController@logout", "logout")
       ->get("/array-calendar-content", "array-content", "App\\Controllers\\HomeController@ArrayCalendarContent", "array.calendar.content")
       ->get("/editProfilePhoto", "profile-photo", "App\\Controllers\\HomeController@EditProfilePhoto", "profile.photo.edit")
       ->get("/drop-calendar", "drop-calendar", "App\\Controllers\\CalendarController@dropCalendar", "calendar.drop")
       ->get("/events", "events", "App\\Controllers\\EventController@showAll", "events.showAll")
       ->post("/register", "registerAction", "App\\Controllers\\RegisterController@register")
       ->post("/profilePhotoAction", "profilePhoto", "App\\Controllers\\ProfilePhotoController@action", "profilePhotoAction")
       ->post("/login", "loginAction", "App\\Controllers\\LoginController@loginAction")
       ->post("/create-calendar", "createCalendar", "App\\Controllers\\UserController@calendar", "postCalendarAction")
       ->post("/stop-revision", "stopRevision", "App\\Controllers\\HomeController@stopRevision", "revision.stop")
       ->post("/save-revision-for-another-time", "saveRevision", "App\\Controllers\\HomeController@saveRevisionForAnotherTime", "revision.save")
       ->post('/event/create', 'createEvent', "App\\Controllers\\EventController@create")
       ->post('/event/delete', 'deleteEvent', "App\\Controllers\\EventController@delete")
       ->post('/posttest', 'test', "App\\Controllers\\TestController@post")
       ->run();
       