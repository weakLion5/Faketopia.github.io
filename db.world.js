// db.world.js - REAL-TIME WORLD ENGINE
let currentWorldName = "START";
let currentWorldData = null;

async function loadWorld(name) {
    currentWorldName = name;
    const snapshot = await db.ref('worlds/' + name).once('value');
    if(snapshot.exists()) {
        currentWorldData = snapshot.val();
    } else {
        // GENERATE NEW GLOBAL WORLD
        let newMap = Array(60).fill().map(() => Array(100).fill(0));
        for(let x=0; x<100; x++) {
            newMap[58][x] = 2; // Bedrock
            newMap[57][x] = 1; // Dirt
        }
        currentWorldData = { name: name, map: newMap, owner: "" };
        await db.ref('worlds/' + name).set(currentWorldData);
    }
    return currentWorldData;
}

function updateWorldBlock(x, y, id) {
    db.ref(`worlds/${currentWorldName}/map/${y}/${x}`).set(id);
}

function saveWorld() {
    // Firebase updates blocks individually via updateWorldBlock
}