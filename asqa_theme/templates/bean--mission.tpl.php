<?php
/**
 * @file
 * Template file for mission slogan block.
 */
?>

<div class="mission <?php print $classes; ?>" <?php print $attributes; ?>>
  <h2 class="mission__title"><?php print $title; ?></h2>
  <div class="mission__statement"><?php print render($elements['field_statement']); ?></div>
</div>
