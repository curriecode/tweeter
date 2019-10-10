/* eslint-disable no-undef */
$(document).ready(function () {
  console.log("document ready!");
  const counter = $('#counter');

  $('#text-input').on("input", function () {
    const usedChars = $(this).val().length;
    const maxChars = 140;

    counter.html(maxChars - usedChars);

    if (usedChars > maxChars) {
      counter.addClass('red');
    } else {
      counter.removeClass('red');
    }
  });
});

