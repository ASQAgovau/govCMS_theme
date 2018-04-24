/**
 * @file
 * Load additional information for the decisions.
 */

(function($, Drupal, window, document, undefined) {

  $.fn.extend({
    dataWithDefault: function(prop, defaultValue) {
      return $(this).data(prop) ? $(this).data(prop) : defaultValue;
    }
  });

  Drupal.behaviors.decisionTable = {
    attach: function(context, settings) {
      $views = $('.views--ajax--load-more', context);

      if ($views.length == 0) {
        return;
      }

      $views.find('a.load-more:not(.js-processed)').bind('click', function(ev) {
        ev.preventDefault();
        var $el = $(this);
        var data = {
          nid: $el.data('nid'),
          view_name: $el.dataWithDefault('view-name', 'delegation_additional_information'),
          view_display_id: 'page',
          view_args: null,
          view_path: $el.dataWithDefault('view-path', 'delegation-additional-information'),
          view_base_path: 'delegation-additional-information',
          view_dom_id: 'e552763d64a250f60185a24f5532b68a'
        };

        $.ajax({
          url: '/views/ajax',
          data: data,
          success: function(response) {
            if (typeof response[1] != 'undefined') {
              $(response[1].data).dialog({
                modal: true,
                width: $el.dataWithDefault('modal-width', 700),
                height: $el.dataWithDefault('modal-height', 600),
                title: $el.dataWithDefault('modal-title', 'Regulatory decision information'),
              });
            }
          }
        })

      });

    }
  }

})(jQuery, Drupal, this, this.document);
