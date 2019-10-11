/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {
  // $("<div>").text(textFromUser);
  const escape = (str) => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = (tweet) => {
    // let nameP = $('<p class="username">').text(tweet.user.name)
    return `<article class="tweet-article">
      <header class="article-head">
        <i class="fa fa-smile-o" aria-hidden="true"></i>
          <p class="username">${escape(tweet.user.name)}</p>
            <p class="email">${escape(tweet.user.handle)}</p>

    </header>
      <p class="content">${escape(tweet.content.text)}</p>
        <footer class="article-foot">
          <span>2 Days ago</span>
        <span>Like 💙 </span>
      </footer>
  </article> `;

  };

  $(".btn").click(() => {
    $('html, body').animate({
      scrollTop: '475px'
    }, 1000);
    $('#text-input').focus()
  });

  $('.modal-button').click(() => {
    $('.modal').removeClass('modal-visible');
    $('.to-grey').removeClass('grey-screen');
  });


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
      $('.modal-text').text('Please enter text to create a tweet.');
      $('.modal').addClass('modal-visible');
      $('.to-grey').addClass('grey-screen');
      return;
    }
    if ($('#text-input').val().length > 140) {
      $('.modal-text').text('Maxium character length has been exceeded');
      $('.modal').addClass('modal-visible');
      $('.to-grey').addClass('grey-screen');
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