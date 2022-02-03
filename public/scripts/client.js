/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function(){

const createTweetElement = function (data){
  const timeAgo = timeago.format(data.created_at) 
  let $tweet =  (`
    <article class="tweets">
      <header>
        <div>
          <img src="${data.user.avatars}">
          <span>"${data.user.name}"</span>
        </div>
          <span id="userhandle">${data.user.handle}</span>
      </header>
        <div class="tweet-text">
          <p>${data.content.text}</p>
        </div>
      <footer class="footer-info">
        <p class="time-ago">${timeAgo}</p>
        <div class="icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>  
  `);
  return $tweet;
};

const renderTweets = function (data){
  for(let tweet of data){
    let oldTweet = createTweetElement(tweet);
     $('.tweets-container').prepend(oldTweet);
    }
  };
    // loadTweets();
  
  const loadTweets = function(){
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: 'JSON' 
    }).then(function(data){
      
      renderTweets(data);
    })
  };
  loadTweets();
  
  $('#incoming-tweet').submit(function(event){
    event.preventDefault();
    console.log("form had been submitted")
    const data = $('#incoming-tweet').serialize();
    
    // console.log($('#tweet-text').val().length)
    if($('#tweet-text').val().length === 0){ 
      return alert('You cannot post an empty tweet');
    }
    if($('#tweet-text').val().length > 140){ 
      return alert('You cannot post over 140 characters');
    }
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: data
    })
    .then(() =>{
      $('#tweet-text').val('');
    })
    .then(() =>{
      loadTweets();
    })

  

  });

 
// renderTweets(data);


})


// const $tweet = createTweetElement(tweetData);

// $(document).ready(function(){
// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
// })