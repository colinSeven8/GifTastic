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

            //Add the DOM elements to display the still gifs, and load the URLs into separate arrays
            for (let i = 0; i < results.length; i++) {

                let gifDiv = $('<div>');
                let p = $('<p>');

                let stillGifURL = results[i].images.fixed_height_still.url;
                let gifStillImage = $('<img>').addClass('still-gif');
                gifStillImage.attr('data-name', i);
                gifStillImage.attr('src', stillGifURL);

                let activeGifURL = results[i].images.fixed_height.url;
                let gifActiveImage = $('<img>').addClass('active-gif');
                gifActiveImage.attr('data-name', i);
                gifActiveImage.attr('src', activeGifURL);

                let ratingURL = response.data[i].rating.toUpperCase();
                let gifRating = 'Rated: ' + ratingURL;
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
    function searchGif() {

        //Capture the user input to search for
        let input = $('.search-field').val().trim();
    }

    //Called when user clicks a gif image
    function activateGif() {

        //Get the data name of the gif
        let id = $(this).attr('data-name');

        //Check which state the gif is in
        if ($(this).hasClass('active-gif')) {

            //Swap the URL and class
            $(this).attr('class', 'still-gif');
            $(this).attr('src', stillGifs[id]);
            console.log('active');
        }
        else {

            //Swap the URL and class
            $(this).attr('class', 'active-gif');
            $(this).attr('src', activeGifs[id]);
            console.log('still');
        }
    }

    renderButtons();
    $(document).on('click', 'img', activateGif);
    $(document).on('click', '.gif-btn', displayGifs);
});