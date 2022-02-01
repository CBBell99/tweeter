$(document).ready(function(){
  
// counts tweetlength
  $('#tweet-text').on('keyup', function(){
    let tweetLength = $(this).val().length; 
    let remainingChars = 140 - tweetLength;
    // tree traversal up the Dom
    let counter = $(this).parent().next('div').children('.counter');
    counter.text(remainingChars);

    if(remainingChars < 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "#545149");
    }
  });
});
 
