/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // escape function
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };



  //show input form when clicked
  $("#scroll-button").click(() => {
    $(".new-tweet").slideToggle("slow");
    $("#tweet-text").focus();
  });

  const createTweetElement = function(data) {
    console.log(data)
    const timeAgo = timeago.format;
    let $tweet = `
    <article class="tweets">
      <header>
      <div>
        <img src="${escape(data.user.avatars)}">
        <span>"${data.user.name}"</span>
      </div>
        <span id="userhandle">${escape(data.user.handle)}</span>
      </header>
      <div class="tweet-text">
        <p>${escape(data.content.text)}</p>
      </div>
      <footer class="footer-info">
        <p class="time-ago">${timeAgo(data.created_at)}</p>
        <div class="icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>  
    `;
    return $tweet;
  };

  const renderTweets = function(data) {
    $(".tweets-container").empty();
    for (let tweet of data) {
      let oldTweet = createTweetElement(tweet);
      $(".tweets-container").prepend(oldTweet);
    }
  };

  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "JSON",
    }).then(function(data) {
      renderTweets(data);
    });
  };

  loadTweets();

  $("#incoming-tweet").submit(function(event) {
    event.preventDefault();
    console.log("form had been submitted");
    const data = $("#incoming-tweet").serialize();
    let tweetLength = $("#tweet-text").val().length;

    $(".error").slideUp().text("");

    if (tweetLength === 0) {
      return $(".error")
        .html(
          '<i class="fa-solid fa-triangle-exclamation"></i>  You cannot post an empty tweet'
        )
        .slideDown(300);
    }
    if (tweetLength > 140) {
      return $(".error")
        .html(
          '<i class="fa-solid fa-triangle-exclamation"></i>You cannot post over 140 characters'
        )
        .slideDown(300);
    }
    $("form").trigger("reset");

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: data,
    })
      .then(() => {
        $(".counter").html("140");
      })
      .then(() => {
        loadTweets();
      });
  });
});
