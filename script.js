var restaurantId;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        
    } else {
        console.log('working')
        var modalDiv = $("<div>").addClass("open-moal show-modal").attr("id", 'modal1').text("Your browser does not support Geolocation data :(");
        $('body').append(modalDiv);
        modalDiv.toggle(".show-modal");
    }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    latlongUrl = "https://us-restaurant-menus.p.rapidapi.com/restaurants/search/geo?page=1&lon=" + lon + "&lat=" + lat + "&distance=1"
    
    $.ajax({
        url: latlongUrl,
        method: "GET",
        "headers": {
            "x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
            "x-rapidapi-key": 
        }
    }).then(function (response) {
        console.log(response)
        var restaurantList = response.result.data
        
        var restaurantListEl = $("<ul>")
        for (let i = 0; i < restaurantList.length; i++) {
            restaurantId = response.result.data[i].restaurant_id;
            var listEl = $("<button <li> />").text(restaurantList[i].restaurant_name).addClass("rest-button").attr("value", restaurantId);
            $('body').append(restaurantListEl).append(listEl);
            
        };

        $('.rest-button').on('click', showDishes)

    });
};
window.addEventListener("load", getLocation)



function showDishes() {
    var urlId = $(this).val();
    console.log(urlId)
    var dishesUrl = "https://us-restaurant-menus.p.rapidapi.com/restaurant/"+urlId+"/menuitems?page=1"
    console.log(dishesUrl)

    $.ajax({
        url: dishesUrl,
        method: "GET",
        "headers": {
            "x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
            "x-rapidapi-key": 
        }
    }).then(function (response) {
        console.log(response)
        var dishesList = response.result.data;
        
        for (let i = 0; i < dishesList.length; i++) {

            
        };
      
    });
    
}


// function pageButtons() {
    
//     $(".next-btn").on('click', function(e){
//         e.preventDevault();
//         pageNum++;
//         console.log(pageNum)
//         showPosition()

//     });
//     $(".prev-btn").on('click', function(e){
//         // e.preventDevault();
//         pageNum--;
//         console.log(pageNum)
//         showPosition()
//     });


// };       