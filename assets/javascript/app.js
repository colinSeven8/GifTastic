////////////////////////////////////
//Colin Reesor
//Ajax and API homework - GifTastic!
////////////////////////////////////


//Arrays that hold the player names, and the still and active state images
var topics = ['Philippe Coutinho', 'Robert Lewandowski', 'Manuel Neuer', 'Thomas Muller', 'Ivan Perisic', 'Lucas Hernandez', 'Jerome Boateng', 'Kingsley Coman', 'Benjamin Pavard', 'Joshua Kimmich', 'Sarpreet Singh'];
var stillGifs = [];
var activeGifs = [];

//Create buttons when the window loads
function renderButtons() {

    $(".gif-btn-container").empty();

    // Looping through the array of gifs, creating DOM elements
    for (var i = 0; i < topics.length; i++) {

        var a = $("<button>");
        a.addClass("gif-btn");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $(".gif-btn-container").append(a);
    }
}

//Called when the user clicks a gif button
function displayGifs() {

    var gif = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=jKS8KF927EtiidzhKfsudaJ7tx8fyb0g&q=" + gif + "&limit=10&offset=0&rating=PG-13&lang=en";

    console.log("gif: " + gif + " --- queryURL: " + queryURL);

    //Clear all previous content for DOM element that holds the gifs, as well as the arrays
    $('.gif-container').empty();
    stillGifs = [];
    activeGifs = [];

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {

        var results = response.data;

        //Add the DOM elements to display the still gifs, and load the URLs into separate arrays
        for (var i = 0; i < results.length; i++) {

            var gifDiv = $('<div>');
            var p = $('<p>');

            var stillGifURL = results[i].images.fixed_height_still.url;
            var gifStillImage = $('<img>').addClass('still-gif');
            gifStillImage.attr('data-name', i);
            gifStillImage.attr('src', stillGifURL);

            var activeGifURL = results[i].images.fixed_height.url;
            var gifActiveImage = $('<img>').addClass('active-gif');
            gifActiveImage.attr('data-name', i);
            gifActiveImage.attr('src', activeGifURL);

            var ratingURL = response.data[i].rating.toUpperCase();
            var gifRating = 'Rated: ' + ratingURL;
            p.append(gifRating);
            gifDiv.append(gifStillImage);
            gifDiv.append(p);
            $('.gif-container').append(gifDiv);

            stillGifs.push(stillGifURL);
            activeGifs.push(activeGifURL);
        }
    });
}

//Called when user clicks search button
$('.btn-search').on('click', function (event) {

    event.preventDefault();

    //Capture the user input to search for
    var input = $('.search-field').val().trim();

    //Add the new topic to the current array
    topics.push(input);

    //Re-create the buttons
    renderButtons();

    //Clear the user text
    $('.search-field').val('');
});

//Called when user clicks a gif image
function activateGif() {

    //Get the data name of the gif
    var id = $(this).attr('data-name');
    console.log(this);

    //Check which state the gif is in
    if ($(this).hasClass('active-gif')) {

        //Swap the URL and class
        $(this).attr('class', 'still-gif');
        $(this).attr('src', stillGifs[id]);
    }
    else {

        //Swap the URL and class
        $(this).attr('class', 'active-gif');
        $(this).attr('src', activeGifs[id]);
    }
}

renderButtons();
$(document).on('click', 'img', activateGif);
$(document).on('click', '.gif-btn', displayGifs);