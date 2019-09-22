////////////////////////////////////
//Colin Reesor
//Ajax and API homework - GifTastic!
////////////////////////////////////

$(document).ready(function () {

    gifObj.init;
    $('.btn-search').on('click', function (event);
    $('button').on('click', gifObj.displayGifs);
})

///////////////////
//Object definition
///////////////////

//The Gif Object definition
let gifObj = {

    gifArr: [],

    displayGifs: function () {

        let gif = $(this).attr('data-btn');
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {

            let results = response.data;
            console.log(response);

            for (let i = 0; i < results.length; i++) {

                let gifDiv = $('<div>');
                let p = $('<p>');
                let gifImage = $('<img>').attr('src', result[i]);
            }
        });
    },

    //Called when user clicks search button
    searchGif: function () {

        //Prevent the normal submission
        event.preventDefault();

        //Capture the user input to search for
        let input = $('.search-field').val().trim();
    },

    //Called upon loading
    init: function () {

        //Create a 'div' and 'p' tag
        let gifDiv = $('<div>');
        let p = $('<p>');

        //Loop through all the pre-made gif buttons, loading them on the DOM
        for (let i = 0; i < gifArr.length; i++) {

            //
        }
    }
}

