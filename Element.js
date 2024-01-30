
function hide_element(element) {
    document.getElementById(element).style.visibility = "hidden";  
}

function hp_stat(player_1, player_2) {
    document.getElementById("show_player_one_hp").innerHTML = player_1.hp;
    document.getElementById("show_player_two_hp").innerHTML = player_2.hp;
}

function clear_element(element) {
    document.getElementById(element).innerHTML = "";  
}

export { hide_element, hp_stat, clear_element};