<form action="<?=$router->generate('profilePhotoAction')?>" enctype="multipart/form-data" method="post" class="edit_profile_photo_form">
    <label for="addProfilePhoto">Ajouter une nouvelle photo de profil :</label>
    <input type="hidden" name="MAX_FILE_SIZE" value="30000" />
    <i class="fas fa-camera pick-profile-photo"></i>
    <button type="submit" class="edit_profile_photo_btn modal-add">Ajouter</button>
</form>