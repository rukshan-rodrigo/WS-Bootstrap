// Using the closure to map jQuery to $.
(function ($) {
  // Store our function as a property of Drupal.behaviors.
  Drupal.behaviors.WHATITDOES = {
    attach: function (context, settings) {
      //Add code here
    }
  };
  
  $(document).ready(function () {
    
  });
}(jQuery));