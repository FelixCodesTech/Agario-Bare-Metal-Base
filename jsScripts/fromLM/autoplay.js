//v7.4
window.autoteammatenicks = [];
window.targetFood = null;
window.autoPlay = false;
window.doSplitFlag = true;
window.VirusFlag = true;
window.BiggerCellFlag = true;
window.SmallerCellFlag = true;
window.bestDist = 10000;
window.giveMass = false;


function calcTarget() {
    //legendmod.zoomValue=0.3;
    window.legendmod5.virMassShots = true;
    window.legendmod5.noNames = false;
    window.legendmod5.autoHideNames = false;
    window.legendmod5.autoHideMass = false;
    window.legendmod5.hideMyName = false;
    window.legendmod5.hideTeammatesNames = false;
    window.legendmod5.showMass = true;
    window.legendmod5.hideEnemiesMass = false;
    window.legendmod5.autoHideFood = false;
    window.legendmod5.autoHideFoodOnZoom = false;
    let target = {};
    target2 = {};
    let bestDist = 10000;
    let bestDist2 = 10000;
    let PlayerCell;
    let bestDistVirus;
    let doSplit = false;
    let doSplittoAvoidCorner = false;
    let doFeed = false;
    window.DistanceX = [];
    window.DistanceY = [];
    window.DistanceName = []; //names of all cells
    window.DistanceId = [];
    window.DangerDistanceX = [];
    window.DangerDistanceY = [];
    window.DangerDistanceName = []; //names of all cells that can harm
    window.VirusDistanceX = [];
    window.VirusDistanceY = [];
    let VirusCellDontDoTheRest = false;

    window.FlagDangerCells = [];
    window.FlagVirusCells = [];

    window.BadCellsDistanceX = [];
    window.BadCellsDistanceY = [];
    window.BadCellsDistanceName = []; //top 5 leaderboard names
    let biggercell = {}; //your biggest cell
    let smallercell = {}; //your smallest cell
    biggercell.mass = 0;
    smallercell.mass = 25000;
    window.SandwichCellCase = null;

    for (var i = 0; i < window.legendmod.playerCells.length; i++) {
        if (window.legendmod.playerCells[i].mass > biggercell.mass) {
            biggercell = window.legendmod.playerCells[i];
        }
        if (window.legendmod.playerCells[i].mass < smallercell.mass) {
            smallercell = window.legendmod.playerCells[i];
        }
    }

    var distcounterflag = 0;
    let shortestDistanceEnemy = 1000000;
    let shortestDistanceFood = 1000000;

    Object.keys(window.legendmod.cells).forEach(node => { //function to define and act to cells
        distcounterflag++
        PlayerCell = window.legendmod.cells[node];
        let distancePlayerCell = calcDist(PlayerCell.x, PlayerCell.y);
        if (PlayerCell.nick != window.legendmod.playerNick && PlayerCell.isVirus == false) { // if not me
            if (calcDist(PlayerCell.x, PlayerCell.y) - PlayerCell.size/10 < shortestDistanceEnemy && PlayerCell.size > window.legendmod.playerSize * 1.15) {
                shortestDistanceEnemy = calcDist(PlayerCell.x, PlayerCell.y) - PlayerCell.size/10;
                shortestDistanceEnemyCell = PlayerCell;
                
            } else if (PlayerCell.size * 1.15 < window.legendmod.playerSize && calcDist(PlayerCell.x, PlayerCell.y) < shortestDistanceFood) {
                shortestDistanceFood = calcDist(PlayerCell.x, PlayerCell.y);
                shortestDistanceFoodCell = PlayerCell;
            }
        }
    });

    if (shortestDistanceFood < shortestDistanceEnemy) {
        target.x = shortestDistanceFoodCell.x;
        target.y = shortestDistanceFoodCell.y;
    } else if (shortestDistanceEnemy < shortestDistanceFood) {
        target.x = 2 * window.legendmod.playerX - shortestDistanceEnemyCell.x;
        target.y = 2 * window.legendmod.playerY - shortestDistanceEnemyCell.y;

        // Give away mass to randoms if you are big enough (optional advertising of something)
        if (giveMass && Math.random() < 0.1 && window.legendmod.playerSize > 100) {
            doFeed = true;
            target.x = shortestDistanceEnemyCell.x;
            target.y = shortestDistanceEnemyCell.y;
        }
    } else if (shortestDistanceEnemy == shortestDistanceFood) { // Meaning there has no cell been detected bc values unchanged
        // find the nearest food
        let shortestDistanceFood = 1000000;

        for (var i = 0; i < window.legendmod.food.length; i++) {
            var food = window.legendmod.food[i];
            var dist = calcDist(food.x, food.y);
            if (dist < bestDist) {
                shortestDistanceFood = dist;
                target.x = food.x;
                target.y = food.y;
            }

            // Wait 0.05 second
            setTimeout(function() {}, 50);
        }
    }

    if (target != undefined) { //not needed
        window.legendmod.sendPosition(target);
    }
    if (doSplit == true && window.doSplitFlag == true) {
        doSplit = false;
        window.doSplitFlag = false;
        setTimeout(function() {
            window.doSplitFlag = true;
        }, 2000);
        window.legendmod.sendAction(17);
    } else if (doSplittoAvoidCorner == true && window.doSplitFlag == true) {
        doSplittoAvoidCorner = false;
        window.doSplitFlag = false;
        setTimeout(function() {
            window.doSplitFlag = true;
        }, 8000);
        window.legendmod.sendAction(17);
    } else if (doFeed) {
        doFeed = false;
        window.legendmod.sendAction(21);
    }
}










// Some extra utility functions

function calcDist(x, y) {
    return Math.round(Math.sqrt(Math.pow(window.legendmod.playerX - x, 2) + Math.pow(window.legendmod.playerY - y, 2)));
}