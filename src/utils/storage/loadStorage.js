
export function fullLoadStorage(token, user) {

    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))

}
