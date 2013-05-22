/**
 * jQuery char counter
 * https://github.com/aysbg/jquery.charcounter.plugin
 * Simple way to show remaining characters on any input field or textarea
 *
 * @author Bogdan Gavrilovic
 * Licence... what licence?
**/

!(function($) {

  $.fn.charCounter = function(options){

  	options = $.extend({
      counter:            '.counter',
      countType:          'characters',
      wordSeparator:      ' ',
      maxCount:           140,
      countDirection:     'down'
    }, options);

    // find the container element of the object
    var container = $(this).parent();
    var counterText = '';
    // if the countDirection is 'down' we need to count down from maxCount value
    if(options.countDirection === 'down') {
      counterText = options.maxCount +' '+ options.countType +' remaining.';
    }

    // append additional span element which will contain counter number
    $(container).append('<span class="counter" style="margin-left: 5px; line-height: 20px; color: #aaa;">'+ counterText +'</span>');

    var countText = function(elem) {
      var value = $(elem).val();

      var $counter = $(elem).parent().find('.counter');
      // if countDirection is down, countDown from the set maxLimit
      if(options.countDirection === 'down') {

        $counter.text(options['maxCount'] +' '+ options['countType'] +' remaining.');

        var remaining = options['maxCount'] - value.length;
        if(remaining !== 0) {
          $counter.text((options['maxCount'] - $(elem).val().length) +' '+ options['countType'] +' remaining.');
        } else {
          $(elem).attr('maxlength', options['maxCount']);
          $counter.text('Only ' + options.maxCount + ' characters are allowed');
          return false;
        }
      }
      else {
        var numWords = $.trim(value).split(options['wordSeparator']).length;
        // if value is empty... lets return all 0
        if(value === '') {
          numWords = 0;
          $counter.text('0 characters, 0 words');
          return false;
        }

        // if the length of the value is 1, we need singular for Word
        if(numWords === 1) {
          $counter.text(value.length + ' characters, 1 word');
          return false;
        }

        $counter.text(value.length + ' characters, ' + numWords + ' words');
      }

    };
 
    // attach jquery event on inputs
		$(this).on('input keyup keydown focus', function() { 
      countText(this);
    });

    $(this).on('paste', function() {
      //let's wait a second and count again
      setTimeout(countText, 5);
    });
  };

})(jQuery);
