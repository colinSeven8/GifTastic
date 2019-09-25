////////////////////////////////////
//Colin Reesor
//Ajax and API homework - GifTastic!
////////////////////////////////////

$(document).ready(function () {

    //Arrays that hold the player names, and the still and active state images
    let topics = ['Philippe Coutinho', 'Robert Lewandowski', 'Manuel Neuer', 'Thomas Muller', 'Ivan Perisic', 'Lucas Hernandez', 'Jerome Boateng', 'Kingsley Coman', 'Benjamin Pavard', 'Joshua Kimmich', 'Sarpreet Singh'];
    let stillGifs = [];
    let activeGifs = [];

    //Create buttons when the window loads
    function renderButtons(response) {

        $("#buttons-view").empty();

        // Looping through the array of gifs, creating DOM elements
        for (let i = 0; i < topics.length; i++) {

            let a = $("<button>");
            let gifItem = topics[i].split(' ');
            a.addClass("gif-btn");
            a.attr("data-name", gifItem[1]);
            a.text(topics[i]);
            $(".gif-btn-container").append(a);
        }
    }

    //Called when the user clicks a gif button
    function displayGifs() {

        let gif = $(this).attr('data-name');
        let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=jKS8KF927EtiidzhKfsudaJ7tx8fyb0g&q=" + gif + "&limit=10&offset=0&rating=PG-13&lang=en";

        console.log("gif: " + gif + " --- queryURL: " + queryURL);

        $('.gif-container').empty();

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {

            let results = response.data;

            for (let i = 0; i < results.length; i++) {

                let gifDiv = $('<div>');
                let p = $('<p>');
                let gifStillImage = $('<img>').attr('src', results[i].images.fixed_height_still.url);
                stillGifs.push(results[i].images.fixed_height_still.url);
                let gifActiveImage = $('<img>').attr('src', results[i].images.fixed_height_still.url);
                activeGifs.push(results[i].images.fixed_height.url);
                let gifRating = 'Rated: ' + response.data[i].rating.toUpperCase();
                p.append(gifRating);
                gifDiv.append(gifStillImage);
                gifDiv.append(p);
                $('.gif-container').append(gifDiv);
            }            
        });
    }

    //Called when user clicks search button
    function searchGif() {

        //Capture the user input to search for
        let input = $('.search-field').val().trim();
    }

    //Called upon loading
    function init() {

        renderButtons();
    }

    renderButtons();
    $(document).on('click', 'btn-search', searchGif);
    $(document).on('click', '.gif-btn', displayGifs);
});