
export class History {

    player_list;

    constructor() {
        this.player_list = [];
    }
    get_history() {
        this.player_list = JSON.parse(localStorage.getItem("history_list"));
        if (this.player_list.length > 0) {
        let list = document.getElementById("history");
        for (let entry = 0; entry < this.player_list.length; entry++) {
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(this.player_list[entry]));
            list.appendChild(li);
        }
    }
}
    
    set_history(player) {
        this.player_list.push(player.name);
        let list = document.getElementById("history");
        let entry = player.name;
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(entry));
        list.appendChild(li);
        localStorage.setItem("history_list", JSON.stringify(this.player_list));
    }
}