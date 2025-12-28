// ==========================================
// DATABASE AUTH V11.0 (Login System)
// ==========================================

const AUTH_KEY = 'gt_users_db'; // Kunci penyimpanan daftar user

function getAllUsers() {
    const saved = localStorage.getItem(AUTH_KEY);
    return saved ? JSON.parse(saved) : {}; // Format: { "username": "password", ... }
}

function registerUser(username, password) {
    let users = getAllUsers();
    
    if (users[username]) {
        return { success: false, msg: "Username already exists!" };
    }
    
    if (username.length < 3 || password.length < 3) {
        return { success: false, msg: "Username/Pass too short!" };
    }

    // Simpan User Baru
    users[username] = password;
    localStorage.setItem(AUTH_KEY, JSON.stringify(users));
    
    // Buat Data Player Awal untuk user ini (Modal Awal)
    createStarterData(username);
    
    return { success: true, msg: "Account created! Please login." };
}

function loginUser(username, password) {
    let users = getAllUsers();
    
    if (!users[username]) {
        return { success: false, msg: "Username not found!" };
    }
    
    if (users[username] !== password) {
        return { success: false, msg: "Wrong password!" };
    }

    return { success: true, msg: "Login success!" };
}

// Fungsi helper untuk inisialisasi data pemain baru
function createStarterData(username) {
    const key = 'gt_player_' + username;
    const starterPack = {
        username: username,
        gems: 100,
        items: { 1: 50, 3: 10 } // Modal Awal
    };
    localStorage.setItem(key, JSON.stringify(starterPack));
}