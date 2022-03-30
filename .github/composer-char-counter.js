$(document).ready(function() {

  // counts tweetlength
  $('#tweet-text').on('input', function() {
    let tweetLength = $(this).val().length;
    let remainingChars = 140 - tweetLength;
    // tree traversal up the Dom
    let counter = $(this).parent().next('div').children('.counter');
    counter.text(remainingChars);
    // add .red-text if remainingChars are 0 and removes if not
    remainingChars < 0 ? counter.addClass('red-text') : counter.removeClass('red-text');
  });
});

