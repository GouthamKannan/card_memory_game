var selectedvalue = 0;
var actual_color = [];
var actual_index = 0;
var row_selector = 0;
var column_selector = 0;
var count_twocards = 0;
var imgsrc_twocards = [];
var class_twocards = [];
var overlays = [];
var interval = 0;
var correct_flipcount = 0;
var filpcount = 0;
var timeleft;

function mytimer(){
    if(timeleft == 0){
        document.getElementById("time-remain").innerHTML = timeleft;
        clearInterval(interval);
        var game_over = document.getElementById("gameover");
        game_over.classList.add("visible");
        game_over.onclick = function(){
            window.location.href = "index.html";
        };
    }
    else{
    timeleft = timeleft - 1;
    document.getElementById("time-remain").innerHTML = timeleft;
    }
}

function startinstruction(){
    var instruction = document.getElementById("instruction");
    instruction.classList.add("visible");
}

function myFunction(){
    var instruction = document.getElementById("instruction");
    instruction.classList.remove("visible");
    const urlString = window.location.search;
    const urlParams = new URLSearchParams(urlString);
    const selector = urlParams.get("selector");
    selectedvalue = selector;
    console.log(selector);
    switch(selector){
        case '3': timeleft = 30;break;
        case '4': timeleft = 45;break;
        case '5': timeleft = 60;break;
    }
    document.getElementById("time-remain").innerHTML = timeleft;
    interval = setInterval(mytimer,1000);
    var grid = document.createElement("div");
    grid.className="grid-container";

    if(selector==5){
        row_selector = 4;
        column_selector = selector;
    }   
    else{
        row_selector = selector;
        column_selector = 4; 
    }

    backimg = get_images(selector);
          
    for(var row=0;row<row_selector;row++){
        var row_div = document.createElement("div");
        row_div.className="grid-row";
        
        for(var column=0;column<column_selector;column++){
            var column_div = document.createElement("div");
            var card_front = document.createElement("div");
            var card_back = document.createElement("div");
            
            column_div.id = actual_index.toString() + "_main";

            current_color_index = Math.floor(Math.random() * backimg.length);
            card_back.style.backgroundImage = 'url(../images/' + backimg[current_color_index] + ')';
            card_back.style.backgroundSize = "100% 100%";
            backimg.splice(current_color_index,1);
            card_back.classList.add("card","card_back");
            card_back.id = actual_index.toString();
            actual_index += 1;

            card_front.style.backgroundImage = "url('../images/card_back_side.jpg')";
            card_front.style.backgroundSize = "100% 100%";
            card_front.classList.add("card","card_front");
            
            column_div.addEventListener("click",flipcard);
            column_div.classList.add("grid-column");

            column_div.appendChild(card_front);
            column_div.appendChild(card_back);
            row_div.appendChild(column_div);
        }
        grid.appendChild(row_div);
    }
    document.getElementById("dummygrid").appendChild(grid);
}


function flipcard() {
    var child_id = this.childNodes; 
    console.log(class_twocards.includes(this.id));
    if(!class_twocards.includes(this.id)){
        this.classList.add('is-flipped');
        document.getElementById("filps").innerHTML=++filpcount;
        class_twocards.push(this.id);
        imgsrc_twocards[count_twocards] = child_id[1].style.backgroundImage;
        count_twocards += 1;;

        if(count_twocards == 2){
            count_twocards = 0;
            if(imgsrc_twocards[0] != imgsrc_twocards[1]){
                document.getElementById("blocker").classList.add("dummygridblocker");
                setTimeout(function(){    
                document.getElementById(class_twocards[0]).classList.remove('is-flipped');
                document.getElementById(class_twocards[1]).classList.remove('is-flipped');
                class_twocards.pop();
                class_twocards.pop();
                document.getElementById("blocker").classList.remove("dummygridblocker");
               },700);
            }
            else{
                document.getElementById(class_twocards[0]).style.pointerEvents = "none";
                document.getElementById(class_twocards[1]).style.pointerEvents = "none";
                class_twocards.pop();
                class_twocards.pop();
                correct_flipcount += 1;
                if(correct_flipcount == selectedvalue*2){
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

function get_images(selector) {
    var images = ['2_of_clubs.png','2_of_diamonds.png','2_of_hearts.png','2_of_spades.png','3_of_clubs.png','3_of_diamonds.png','3_of_hearts.png','3_of_spades.png','4_of_clubs.png','4_of_diamonds.png','4_of_hearts.png','4_of_spades.png','5_of_clubs.png','5_of_diamonds.png','5_of_hearts.png','5_of_spades.png','6_of_clubs.png','6_of_diamonds.png','6_of_hearts.png','6_of_spades.png','7_of_clubs.png','7_of_diamonds.png','7_of_hearts.png','7_of_spades.png','8_of_clubs.png','8_of_diamonds.png','8_of_hearts.png','8_of_spades.png','9_of_clubs.png','9_of_diamonds.png','9_of_hearts.png','9_of_spades.png','10_of_clubs.png','10_of_diamonds.png','10_of_hearts.png','10_of_spades.png','ace_of_clubs.png','ace_of_diamonds.png','ace_of_hearts.png','ace_of_spades2.png','jack_of_clubs2.png','jack_of_diamonds2.png','jack_of_hearts2.png','jack_of_spades2.png','king_of_clubs2.png','king_of_diamonds2.png','king_of_hearts2.png','king_of_spades2.png','queen_of_clubs2.png','queen_of_diamonds2.png','queen_of_hearts2.png','queen_of_spades2.png','red_joker.png'];
    var rand_image = [];
    written = 0;
    n = 2*selector;
    while(written < n){
        var x = Math.floor(Math.random() * images.length);
        if(!(rand_image.includes(images[x]))){
            rand_image.push(images[x]);
            rand_image.push(images[x]);
            written ++;
        }
	  }
    return rand_image;
}