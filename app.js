function positionSort(team){
    var positions = ["G","D","M","F"];
    var output = [];
    positions.forEach( function(pos){
        team.forEach( function (player){
            if(player.position == pos){
                output.push(player);
            }
        });
    });
    return output;
}

function pointSort(team, desc=false){
//Oh hell, we can use this to sort our league too! 
var i = 0;
while ( i <= team.length ){
var output = [];
    team.forEach( function(player){    
        if(output.length == 0){
            output.push(player);
        }
        else if(player.points > output[0].points && player.points < output[output.length-1].points){
        var last = output.pop();
            output.push(player);
            output.push(last);
        }
        else if(player.points >= output[output.length-1].points){
            output.push(player);
        }
        else
        {
            output.unshift(player);
        }
});
i++;
team = output;    
}
if(desc === true){
    team.reverse()
}
return team;
}

function bench(team, subs){
    //returns lower gk plus other low players
    //determined by number subs
    var bench = [];
    team = pointSort(team);
    team = positionSort(team);
    bench.unshift(team.shift());
    //then contingency to stop low-scoring
    //GK1 from being benched
    var stashOtherKeeper = team.shift();
    team = pointSort(team);
    while( bench.length < subs ){
        bench.unshift(team.shift());
    }
    positionSort(bench);
    return bench;
}

function sumPoints(team){
    var total = 0;
    team.forEach( function(player){
        total += player.points;
    });
    return total;
}
