$(document).ready(function () {
  function getQuote() {
    $.getJSON(
      "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?",
      function (json) {
        setTimeout($("#get-quote").prop("disabled", false), 1500);
        var quote = JSON.stringify(json.quoteText).replace(/"/g, "");
        var author = JSON.stringify(json.quoteAuthor).replace(/"/g, "");
        $("#quote").html("&ldquo;" + quote);
        $("#quote, #author").fadeTo(1500, 1);
        if (author != "") {
          $("#author").html("- " + author);
        } else {
          $("#author").html("- unknown");
        }
        $("#tweet-anchor").attr(
          "href",
          "http://www.twitter.com/home/?status=" + quote + "%0a- " + author
        );
      }
    );
  }

  // try deactivating the button until the new quote is loaded to prevent strange behavior!
  $("#get-quote").on("click", function () {
    $("#get-quote").prop("disabled", true);
    $("#quote, #author").fadeTo(500, 0); // fade out (opacity 0)
    setTimeout(getQuote, 500);
  });

  getQuote();
});
