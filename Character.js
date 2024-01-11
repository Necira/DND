
export default class Character {
    hp;
    initiative;
    damage;
    fireball_damage;
    dirt;
    name;

    constructor() {
      this.name = "";
    }

    set_name(name) {
            this.name = name;
        }
        
    get_hp() {
        return this.hp;
    } 
}
