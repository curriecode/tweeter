/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {

  const createTweetElement = (tweet) => {
    return `<article class="tweet-article">
      <header class="article-head">
        <i class="fa fa-smile-o" aria-hidden="true"></i>
          <p class="username">${tweet.user.name}</p>
            <p class="email">${tweet.user.handle}</p>

    </header>
      <p class="content">${tweet.content.text}</p>
        <footer class="article-foot">
          <span>2 Days ago</span>
        <span>Like 💙 </span>
      </footer>
  </article> `;

  };


  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      let $newTweet = createTweetElement(tweet);
      // console.log($newTweet)
      $('.article').prepend($newTweet);
    }
  };

  const loadTweets = () => {
    $.ajax('/tweets', {
      method: 'GET'
    })
      .then((tweetData) => {
        renderTweets(tweetData);
      });
  };
  // loadTweets();


  $("#tweet-form").submit(function (e) {
    e.preventDefault();
    if ($('#text-input').val().trim().length === 0 && $('#text-input').val() !== null) {
      alert("no characters have been entered");
      return;
      //TODO fix - should not post of it's all empty spaces
    }
    if ($('#text-input').val().length > 140) {
      alert("message has exceeded max character limit");
      return;
    }
    let form = $(this);
    let url = form.attr('action');

    $.ajax({
      method: "POST",
      url: url,
      data: form.serialize(),
      success: function () {
        loadTweets();
        $('#tweet-form').trigger("reset");
      }
    });
  });
  loadTweets();
});
//TODO - clears out text input after submit
//TODO - dynamically update date /profile pics