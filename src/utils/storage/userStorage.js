
export function getUserJson() {

    var stringUser = localStorage.getItem("user")

    if(stringUser == null) {
        return null
    }


    return JSON.parse(stringUser)

}
