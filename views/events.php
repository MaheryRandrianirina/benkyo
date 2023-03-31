
<div class="all_events">
    <?php foreach($results['events'] as $event): ?>
        <div class="event">
            <div class="event_name"><?= $event->name ?><i class="fas fa-trash"></i></div>
            <div class="event_date hidden_event_data"><?= $event->date ?></div>
            <div class="event_description hidden_event_data"><?= $event->description ?></div>
            <input type="hidden" value="<?= $event->id;?>">
        </div>
    <?php endforeach ?>
</div>