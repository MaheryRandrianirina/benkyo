import css from "./scss/app.scss"
import Observe from "./observer"
import passwordInputValidator from "./AbstractClasses/Tools/passwordInputValidator"
import formNavigation from "./Functions/formNavigation"

window.addEventListener("DOMContentLoaded", ()=>{
    Observe()
    formNavigation()
    new passwordInputValidator()
})



