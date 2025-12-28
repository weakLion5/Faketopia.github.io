// db.player.js - CLOUD STORAGE SYSTEM
let backpack = { username: "", gems: 0, items: {}, lastWorld: "START" };

async function loadPlayer(username) {
    const snapshot = await db.ref('players/' + username).once('value');
    if(snapshot.exists()) {
        backpack = snapshot.val();
    } else {
        // STARTER PACK GLOBAL
        backpack = {
            username: username,
            gems: 10000,
            items: { 1: 200, 3: 50, 9: 20 },
            lastWorld: "START"
        };
        savePlayer();
    }
}

function savePlayer() {
    if(!backpack.username) return;
    db.ref('players/' + backpack.username).set(backpack);
}

function addItem(id, qty) {
    backpack.items[id] = (backpack.items[id] || 0) + qty;
    savePlayer();
}

function removeGems(amt) {
    if(backpack.gems >= amt) {
        backpack.gems -= amt;
        savePlayer();
        return true;
    }
    return false;
}