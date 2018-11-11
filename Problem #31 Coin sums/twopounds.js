var coins = [200, 100, 50, 20, 10, 5, 2];   // the coins in pennies that can be used in combination
var targetsum = 200;
var smallestcoin = 1;                       // note: targetsum must be divisible by smallestcoin
var printSolutions = true;

// "setup" is an array of coin values that represents the current set of coins that makes up the target sum (£2)
// create initial setup (for original euler question, 200x 1p)
let setup = Array(targetsum / smallestcoin).fill(smallestcoin);
var solutions = 0;
loop(setup, 0);
console.log("total solutions: " + solutions);



// the main recursive function, which increments the solutions variable
function loop(setup, coinIndex) {
    let numOfCoins = 0; // number of replacement checks
    let totalValueToReplace = numOfCoins * coins[coinIndex];

    // for each coin loop, don't stop until the maximum target sum is reached.
    // stopping when not replaceable will not work for when the smallest coin is not 1
    while (totalValueToReplace <= targetsum) {
        if (isReplaceable(setup, coinIndex, numOfCoins)) {

            // if it is the last coin index and the setup is replaceable, it means that a solution has been found
            // else increase the coin index and recurse
            if (coinIndex == coins.length - 1) {
                if (printSolutions) {
                    console.log("> " + replace(setup, coinIndex, numOfCoins));
                }
                solutions++;
            } else {
                let newSetup = replace(setup, coinIndex, numOfCoins);
                loop(newSetup, coinIndex + 1);
            }
        }
        numOfCoins++;
        totalValueToReplace = numOfCoins * coins[coinIndex];
    }
}

// returns a setup where the replaceable coins are replaced by the coin type and number of coins
function replace(setup, coinIndex, numOfCoins) {
    // to replace the coins in a setup, it needs to be split into 3 parts:
    // head: the part of the setup before the replacement which is left unaltered (if any)
    // mid: the part of the setup that is actually replaced
    // tail: the trailing part of the setup
    
    // create a deep clone of setup, so that the original is left unaltered
    let setupClone = JSON.parse(JSON.stringify(setup));

    let startOfReplaceables = getStartOfReplaceables(setupClone);
    let mid = setupClone.splice(startOfReplaceables, setupClone.length);
    let head = setupClone;  // rename

    let totalValueToReplace = coins[coinIndex] * numOfCoins;
    let totalCoinsToReplace = totalValueToReplace / smallestcoin;
    let tail = mid.splice(totalCoinsToReplace, mid.length);
    // at this point, a setup of [2,2,1,1,1,1,1,1] and a replace value of 2x2p would be split up like this:
    // [2,2] is the head, [1,1,1,1] is the mid, [1,1] is the tail

    // now the mid is isolated, so it can be replaced by the new mid
    // in the example [1,1,1,1] is replaced by [2,2]
    let newMid = Array(numOfCoins).fill(coins[coinIndex]);

    // reconcatinate the three parts
    let out = head.concat(newMid, tail);
    return out;
}

// checks if a setup can be replaced by a given coin value (number of coins and coin type)
function isReplaceable(setup, coinIndex, numOfCoins) {
    let numOfReplaceables = setup.length - getStartOfReplaceables(setup);

    // for exmaple: if you want to replace 2 x 5p, the value to replace is 2 * 5 = 10
    let coinValueToReplace = coins[coinIndex] * numOfCoins;

    // for example: if setup is 2,2,2,2,2 then 1x5p is not a replaceable amount, but 2x5p is, even though the replace value is lower than the replaceable coins' value
    if (!Number.isInteger(coinValueToReplace / smallestcoin)) {
        return false;
    }
    
    // if the total value for the replaceable coins is larger than the replace value, then it is not possible to replace the coins
    if (coinValueToReplace <= numOfReplaceables * smallestcoin) {
        return true;
    } else {
        return false;
    }
}

// returns the index at which the replaceable coins start in a setup
// note: if there are no replaceable coins, the index will be too large for the setup (it will be equal to the setup length)
function getStartOfReplaceables(setup) {
    let index = setup.length;
    while (setup[index - 1] == smallestcoin) {
        if (index == 0) { return 0; }
        index--;
    }
    return index;
}
