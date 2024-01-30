export function dice(throws,dice){
    let num = 0;
    for(let eyes=0;eyes<throws;eyes++) {
        let result = Math.floor(Math.random()*dice)+1
        num += result;
    }
    return num;
}





