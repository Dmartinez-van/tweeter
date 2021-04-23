/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

// Hide error message immediately, before doc ready is fine.
$("#error-msg").hide(0);

$(document).ready(function() {

  // Escape function to prevent any JXX within an entered tweet.
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweetObj) {
    const $tweetPost = $(
      `
      <article class="tweets-feed">
      <div class="tweets-header">
      <p>
      <span><img src="${tweetObj.user.avatars}"></span>
      ${escape(tweetObj.user.name)}
      </p>
      <p class="handle">${escape(tweetObj.user.handle)}</p>
      </div>
      
      <div class="tweet">
      ${escape(tweetObj.content.text)}
      </div>
      
      <div class="date-and-icons" >
      <time class="need_to_be_rendered" datetime="${tweetObj.created_at}"></time>
      <p class="icons">
      <span><i class="fas fa-flag"></i></span>
      <span><i class="fas fa-retweet"></i></span>
      <span><i class="fas fa-heart"></i></span>
      </p>
      </div>
      </article>
      `
    );
    return $tweetPost;
  };

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
    return;
  };
  
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET"
    }).then(function(tweetsData) {
      renderTweets(tweetsData);
      timeago.render(document.querySelectorAll('.need_to_be_rendered'));
    }).catch((err) => {
      console.log(`error: ${err}`);
    });
  };
  
  loadTweets();

  const loadNewestTweet = function() {
    $.ajax({
      url: "/tweets",
      method: "GET"
    }).then(function(tweetsData) {
      const newest = tweetsData[tweetsData.length - 1];
      renderTweets([newest]);
      // $("new-tweet").val('');
      timeago.render(document.querySelectorAll('.need_to_be_rendered'));
    }).catch((err) => {
      console.log(`error: ${err}`);
    });
  };

  $(".new-tweet").submit(function(e) {
    e.preventDefault();
    
    // $("#error-msg").slideUp("fast");
    // Textarea validation
    const $text = $(this).children("textarea").val();
    
    $("#error-msg").hide(0);
    if (($text.length <= 0)) {
      $("#error-msg").attr('class', 'show').html('<i class="fas fa-exclamation-triangle"></i>' + "Cannot tweet nothing!" + '<i class="fas fa-exclamation-triangle"></i>');
      $("#error-msg").slideDown('slow');
      // $("#error-msg").slideDown("slow").html("");
      return false;
    }
    $("#error-msg").hide(0);
    if ($text.length > 140) {
      $("#error-msg").html('<i class="fas fa-exclamation-triangle"></i>' + "Know your limits... Type within them." + '<i class="fas fa-exclamation-triangle"></i>');
      $("#error-msg").slideDown('slow');
      return false;
    }
    $("#error-msg").hide(0);
    if ($text === null) {
      $("#error-msg").html('<i class="fas fa-exclamation-triangle"></i>' + "You've entered null? No, this won't do. Try again." + '<i class="fas fa-exclamation-triangle"></i>');
      $("#error-msg").slideDown('slow');
      return false;
    }
    $("#error-msg").slideUp();
    $("#error-msg").html("");

    // Post tweet to 'database'
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize()
    }).then(function() {
      $(".counter").val(140);
      $("textarea").val('').focus();
      loadNewestTweet();
    }).catch(err => {
      console.log(err);
    });
  });
});

