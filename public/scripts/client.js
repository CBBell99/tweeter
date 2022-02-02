/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function(){
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  },
      {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
];

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
     $('.tweets-container').append(oldTweet);
    }
  };
    
  renderTweets(data);

  $('#incoming-tweet').submit(function(event){
    event.preventDefault();
    console.log("form had been submitted")
    console.log(this)
    const data = $('#incoming-tweet').serialize();

    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: data
    })
  });
})


// const $tweet = createTweetElement(tweetData);

// $(document).ready(function(){
// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
// })