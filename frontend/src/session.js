//u25420314 page to keep track of who is logged in
const KEY = "flickUser"

export function saveUser(user) {
    localStorage.setItem(KEY, JSON.stringify(user))
}

export function getUser(){
    try{
        const saved = localStorage.getItem(KEY)
        return saved ? JSON.parse(saved): null
    }catch{
        return null
    }

    
}

export function clearUser() {
    localStorage.removeItem(KEY)
}