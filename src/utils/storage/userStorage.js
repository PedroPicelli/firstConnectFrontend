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
