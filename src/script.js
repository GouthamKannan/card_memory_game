var selected_value; // value obtained from url
var actual_index = 0; // id for each card
var row_count = 0; // Number of rows
var column_count = 0; // Number of columns
var count_twocards = 0; // Number of cards selected
var imgsrc_twocards = []; // image source of two consecutively selected cards
var class_twocards = []; // class list of two consecutively selected cards
var interval; // object of setInterval class
var correct_flip_count = 0; // Number of correctly matched cards
var flip_count = 0; // Number of flips
var timeleft; // Number of seconds left

/**
 * This function decreases timer value and checks if timer has ended
 */
function mytimer(){

    // When timer ends
    if(timeleft == 0){
        document.getElementById("time-remain").innerHTML = timeleft;
        clearInterval(interval);
        var game_over = document.getElementById("gameover");
        game_over.classList.add("visible");
        game_over.onclick = function(){
            window.location.href = "index.html";
        };
    }

    // Decrease the timer
    else{
    timeleft = timeleft - 1;
    document.getElementById("time-remain").innerHTML = timeleft;
    }
}

/**
 * This function is used to display the instruction
 */
function startinstruction(){
    var instruction = document.getElementById("instruction");
    instruction.classList.add("visible");
}

/**
 * This function initializes the cards and the images
 */
function myFunction(){

    // Display the instruction
    var instruction = document.getElementById("instruction");
    instruction.classList.remove("visible");

    // Get the number of cards from url and set the timer
    const urlString = window.location.search;
    const urlParams = new URLSearchParams(urlString);
    const selector = urlParams.get("selector");
    selected_value = selector;
    console.log(selector);
    switch(selector){
        case "3": timeleft = 30;break;
        case "4": timeleft = 45;break;
        case "5": timeleft = 60;break;
    }
    document.getElementById("time-remain").innerHTML = timeleft;
    interval = setInterval(mytimer,1000);
    var grid = document.createElement("div");
    grid.className="grid-container";

    // Set the number of rows and columns from the number of cards
    if(selector==5){
        row_count = 4;
        column_count = selector;
    }
    else{
        row_count = selector;
        column_count = 4;
    }

    // Get random set of image pairs from the available list
    backimg = get_images(selector);

    for(var row=0;row<row_count;row++){

        // Create div element for each row
        var row_div = document.createElement("div");
        row_div.className="grid-row";

        for(var column=0;column<column_count;column++){

            // Create three div elements for each card
            var column_div = document.createElement("div");
            var card_front = document.createElement("div");
            var card_back = document.createElement("div");

            // Set an id to each card
            column_div.id = actual_index.toString() + "_main";

            // Set the images for front and back for each card
            current_color_index = Math.floor(Math.random() * backimg.length);
            card_back.style.backgroundImage = "url(../images/" + backimg[current_color_index] + ")";
            card_back.style.backgroundSize = "100% 100%";
            backimg.splice(current_color_index,1);
            card_back.classList.add("card","card_back");
            card_back.id = actual_index.toString();
            actual_index += 1;

            card_front.style.backgroundImage = "url('../images/card_back_side.jpg')";
            card_front.style.backgroundSize = "100% 100%";
            card_front.classList.add("card","card_front");

            // Add event listener to each card
            column_div.addEventListener("click",flipcard);
            column_div.classList.add("grid-column");

            // Add each element to the parent element
            column_div.appendChild(card_front);
            column_div.appendChild(card_back);
            row_div.appendChild(column_div);
        }
        grid.appendChild(row_div);
    }
    document.getElementById("dummygrid").appendChild(grid);
}

/**
 * This function is used to flip the cards and check if the cards are matching
 * This is the event listener funtion for each card
 */
function flipcard() {
    var child_id = this.childNodes;
    console.log(class_twocards.includes(this.id));

    // Checks whether the card is already selected
    if(!class_twocards.includes(this.id)){
        this.classList.add("is-flipped");
        document.getElementById("filps").innerHTML=++flip_count;
        class_twocards.push(this.id);
        imgsrc_twocards[count_twocards] = child_id[1].style.backgroundImage;
        count_twocards += 1;;

        // When two cards are selected
        if(count_twocards == 2){
            count_twocards = 0;

            // When the images in two cards are different
            if(imgsrc_twocards[0] != imgsrc_twocards[1]){
                document.getElementById("blocker").classList.add("dummygridblocker");
                setTimeout(function(){
                document.getElementById(class_twocards[0]).classList.remove("is-flipped");
                document.getElementById(class_twocards[1]).classList.remove("is-flipped");
                class_twocards.pop();
                class_twocards.pop();
                document.getElementById("blocker").classList.remove("dummygridblocker");
               },700);
            }

            // When the images in two cards are same
            else{
                document.getElementById(class_twocards[0]).style.pointerEvents = "none";
                document.getElementById(class_twocards[1]).style.pointerEvents = "none";
                class_twocards.pop();
                class_twocards.pop();
                correct_flip_count += 1;

                // When all the matching pairs are found
                if(correct_flip_count == selected_value*2){
                    clearTimeout(interval);
                    var victory = document.getElementById("victory");
                    victory.classList.add("visible");
                    victory.onclick = function(){
                    window.location.href = "index.html";
                    };
                }
            }
        }
    }
}

/**
 * This function selects a random set of images from the available list
 *
 * @param {number} selector - id denoting the number of required cards
 * @return {array} - array of randomly selected image pairs
 */
function get_images(selector) {
    var images = ["2_of_clubs.png","2_of_diamonds.png","2_of_hearts.png",
                  "2_of_spades.png","3_of_clubs.png","3_of_diamonds.png",
                  "3_of_hearts.png","3_of_spades.png","4_of_clubs.png",
                  "4_of_diamonds.png","4_of_hearts.png","4_of_spades.png",
                  "5_of_clubs.png","5_of_diamonds.png","5_of_hearts.png",
                  "5_of_spades.png","6_of_clubs.png","6_of_diamonds.png",
                  "6_of_hearts.png","6_of_spades.png","7_of_clubs.png",
                  "7_of_diamonds.png","7_of_hearts.png","7_of_spades.png",
                  "8_of_clubs.png","8_of_diamonds.png","8_of_hearts.png",
                  "8_of_spades.png","9_of_clubs.png","9_of_diamonds.png",
                  "9_of_hearts.png","9_of_spades.png","10_of_clubs.png",
                  "10_of_diamonds.png","10_of_hearts.png","10_of_spades.png",
                  "ace_of_clubs.png","ace_of_diamonds.png","ace_of_hearts.png",
                  "ace_of_spades2.png","jack_of_clubs2.png",
                  "jack_of_diamonds2.png","jack_of_hearts2.png",
                  "jack_of_spades2.png","king_of_clubs2.png",
                  "king_of_diamonds2.png","king_of_hearts2.png",
                  "king_of_spades2.png","queen_of_clubs2.png",
                  "queen_of_diamonds2.png","queen_of_hearts2.png",
                  "queen_of_spades2.png","red_joker.png"];
    var rand_image = [];
    written = 0;
    n = 2*selector;

    // Loop to select n pair of images
    while(written < n){
        var x = Math.floor(Math.random() * images.length);
        if(!(rand_image.includes(images[x]))){
            rand_image.push(images[x]);
            rand_image.push(images[x]);
            written ++;
        }
      }
      console.log(rand_image);
    return rand_image;
}