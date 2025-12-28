// db.auth.js - CLOUD MULTIPLAYER AUTH
async function registerUser(username, password) {
    if (username.length < 3 || password.length < 3) {
        return { success: false, msg: "Username/Pass too short!" };
    }
    const check = await db.ref('users/' + username.toLowerCase()).once('value');
    if (check.exists()) {
        return { success: false, msg: "Username already exists!" };
    }
    // Simpan ke Cloud
    await db.ref('users/' + username.toLowerCase()).set({
        username: username,
        password: password,
        role: 'player'
    });
    return { success: true, msg: "Account created! Please login." };
}

async function loginUser(username, password) {
    const snapshot = await db.ref('users/' + username.toLowerCase()).once('value');
    const userData = snapshot.val();
    if (!userData) {
        return { success: false, msg: "Username not found!" };
    }
    if (userData.password !== password) {
        return { success: false, msg: "Wrong password!" };
    }
    return { success: true, msg: "Login success!" };
}
