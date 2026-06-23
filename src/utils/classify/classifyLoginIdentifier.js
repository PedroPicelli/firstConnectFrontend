
import { isValidEmail } from "../validation/emailValidation"

export const LoginIdentifierType = {
  UNKNOWN: "Unknown",
  EMAIL: "Email",
  USERNAME: "Username"
}


export function classifyLoginType(value) {

    if(value.length == 0) {
        return LoginIdentifierType.UNKNOWN
    }

    if(isValidEmail(value)) {
        return LoginIdentifierType.EMAIL

    } else {
        return LoginIdentifierType.USERNAME

    }

}
