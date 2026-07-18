import { fullCleanStorage } from "./cleanStorage"

export function getUserJson() {

    try {
        var stringUser = localStorage.getItem("user")

        if(stringUser == null) {
            return null
        }


        return JSON.parse(stringUser)
    } catch(error) {
        fullCleanStorage()
        return null
    }
}

export function changeUserInfo(key, newInfo) {

    try {
        var stringUser = localStorage.getItem("user")

        if(stringUser == null) {
            return null
        }


        var userJson = JSON.parse(stringUser)

        userJson[`${key}`] = newInfo

        localStorage.setItem("user", JSON.stringify(userJson))

    } catch(error) {
        fullCleanStorage()
    }

}

export function changeUser(newUser) {
    localStorage.setItem("user", JSON.stringify(newUser))
}