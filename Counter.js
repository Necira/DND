
export class Counter {
    turn;
    round;
    player_one;
    player_two;
    local_storage;
    
    constructor(player_one,player_two,local_storage) {
        this.player_one = player_one;
        this.player_one = player_two;
        this.local_storage = local_storage;
        this.turn = 0;
        this.round = 1;
    }

    turnbased() {
        let message_p1 = "player one wins";
        let message_p2 = "player two wins";
        let death_message = "you're dead";
        if (this.player_one.hp <= 0 || this.player_two.hp <= 0) {
            document.getElementById("round").innerHTML = this.round;
            if (this.player_one.hp > this.player_two.hp) {
                document.getElementById("show_player_two_hp").innerHTML = death_message;
                document.getElementById("announcement").innerHTML = message_p1;
                this.local_storage.set_history(this.player_one);
            } else {
                document.getElementById("show_player_one_hp").innerHTML = death_message;
                document.getElementById("announcement").innerHTML = message_p2;
                this.local_storage.set_history(this.player_two);
            }
        } else {
            document.getElementById("commentary").innerHTML = "Choose next move";
            this.turn += 1;
            if ((this.turn % 2) === 0) {
                this.round++;
            }
            document.getElementById("round").innerHTML = this.round;
        }
    }
}