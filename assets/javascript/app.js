////////////////////////////////////
//Colin Reesor
//Ajax and API homework - GifTastic!
////////////////////////////////////

$(document).ready(function () {

    gifObj.renderButtons();
    $('.btn-search').on('click', gifObj.searchGif(event));
    $('gif-btn').on('click', gifObj.displayGifs);
})

///////////////////
//Object definition
///////////////////

//The Gif Object definition
let gifObj = {

    bayernPlayers: ['Philippe Coutinho', 'Robert Lewandowski', 'Manuel Neuer', 'Thomas Muller', 'Ivan Perisic', 'Lucas Hernandez', 'Jerome Boateng', 'Kingsley Coman', 'Benjamin Pavard', 'Joshua Kimmich', 'Sarpreet Singh'],

    //Called on init
    renderButtons: function (response) {

        $("#buttons-view").empty();

        // Looping through the array of gifs, creating DOM elements
        for (var i = 0; i < this.bayernPlayers.length; i++) {

            var a = $("<button>");
            a.addClass("gif-btn");
            a.attr("data-name", this.bayernPlayers[i]);
            a.text(this.bayernPlayers[i]);
            $(".gif-btn-container").append(a);
        }
    },

    //Called when the user clicks a gif button
    displayGifs: function () {

        let gif = $(this).attr('data-btn');
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {

            let results = response.data;

            for (let i = 0; i < results.length; i++) {

                let gifDiv = $('<div>');
                let p = $('<p>');
                let gifImage = $('<img>').attr('src', result[i]);
            }
        });
    },

    //Called when user clicks search button
    searchGif: function () {

        //Capture the user input to search for
        let input = $('.search-field').val().trim();
    },

    //Called upon loading
    init: function () {

        this.renderButtons();
    }
}

