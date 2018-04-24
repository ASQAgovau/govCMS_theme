<?php

/**
 * @file
 * Overridden template file to inject the css class into the
 *
 * - $title : The title of this group of rows.  May be empty.
 * - $options['type'] will either be ul or ol.
 * @ingroup views_templates
 */
?>
<?php print $wrapper_prefix; ?>
<?php if (!empty($title)) : ?>
  <h3><?php print $title; ?></h3>
<?php endif; ?>
<ul class="search-results">
<?php foreach ($rows as $id => $row): ?>
  <li class="<?php print $classes_array[$id]; ?>"><?php print $row; ?></li>
<?php endforeach; ?>
</ul>
<?php print $wrapper_suffix; ?>