$(document).ready(function () {

  //function escapes characters in strings so malicious
  //code can't be executed in the text field
  const escape = (str) => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // dynamically adds html when new tweet is created
  const createTweetElement = (tweet) => {
    return `<article class="tweet-article">
      <header class="article-head">
        <div class="user-avatar">
          <img src="${tweet.user.avatars}"></img> 
          <p class="username">${escape(tweet.user.name)}</p>
        </div>
        <p class="email">${escape(tweet.user.handle)}</p>
      </header>
      <p class="content">${escape(tweet.content.text)}</p>
      <footer class="article-foot">
        <span>${tweet.created_at}</span>
        <span>🚩🔁💙 </span>
      </footer>
  </article> `;
  };

  //toggles and slides page to text field when compose button is clicked
  $(".btn").click(() => {
    $('html, body').animate({
      scrollTop: $('.compose').offset().top - 60
    }, 1000);
    $('.new-tweet').slideDown('slow');
    $('.article').removeClass('pre-click');
    $('#text-input').focus();
  });

  //toggles classes when modal button is clicked
  $('.modal-button').click(() => {
    $('.modal').removeClass('modal-visible');
    $('.to-grey').removeClass('grey-screen');
  });


  //removes tweets so they are not duplicated and then renders the new tweets
  const renderTweets = function (tweets) {
    $('.tweet-article').remove();
    for (let tweet of tweets) {
      let $newTweet = createTweetElement(tweet);
      $('.article').prepend($newTweet);
    }
  };

  // pull down all tweets and render them
  const loadTweets = () => {
    $.ajax('/tweets', {
      method: 'GET'
    })
      .then((tweetData) => {
        renderTweets(tweetData);
      });
  };

  //Fired when submit button is clicked
  $("#tweet-form").submit(function (e) {
    e.preventDefault();

    // checks if there is input in text box , if not error modal is triggered
    if ($('#text-input').val().trim().length === 0 && $('#text-input').val() !== null) {
      $('.modal-text').text('Please enter text to create a tweet');
      $('.modal').addClass('modal-visible');
      $('.to-grey').addClass('grey-screen');
      return;
    }

    // checks if characters in text box are over limit
    // if they are it triggers the error modal
    if ($('#text-input').val().length > 140) {
      $('.modal-text').text('Maximum character length has been exceeded');
      $('.modal').addClass('modal-visible');
      $('.to-grey').addClass('grey-screen');
      return;
    }

    let form = $(this);
    let url = form.attr('action');

    //after validating sends tweet to server for storage
    $.ajax({
      method: "POST",
      url: url,
      data: form.serialize(),
      success: function () {
        loadTweets();
        //resets character counter after tweet is submitted
        $('#counter').text(140);
        //resets text box after tweet is submitted
        $('#tweet-form').trigger("reset");
      }
    });
  });

  //loads tweets from JSON object so page is not empty on initial load
  loadTweets();
});