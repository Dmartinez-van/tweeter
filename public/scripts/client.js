/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
$(document).ready(function() {
  
  
  const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1618807189383
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1618893589383
    }
  ];
  
  const createTweetElement = function(tweetObj) {
    const $tweetPost = $(
      `
      <article class="tweets-feed">
      <header>
      <p>
      <span><img src="${tweetObj.user.avatars}"></span>
      ${tweetObj.user.name}
      </p>
      <p class="handle">${tweetObj.user.handle}</p>
      </header>
      
      <div class="tweet">
      ${tweetObj.content.text}
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
      $('#tweets-container').append(createTweetElement(tweet));
    }
    return;
  };
  
  renderTweets(tweetData);

  timeago.render(document.querySelectorAll('.need_to_be_rendered'));
});