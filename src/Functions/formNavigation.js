
/**
 * se charge de la navigation par touche de clavier dans le formulaire
 */
export default function formNavigation(){
    const registerForm = document.querySelector('.register-form-container')
    const loginForm = document.querySelector('.login_form')

    if(registerForm !== null){
        navigateByToucIntoForm(registerForm)
    }else{
        navigateByToucIntoForm(loginForm)
    }
}

/**
* permet de naviguer dans le formulaire avec la touche "Entrer"
* @param {HTMLFormElement} form 
*/
function navigateByToucIntoForm(form){
    const children = Array.from(form.children)
    let results = []
    children.forEach(child => {
        let ch = Array.from(child.children)
        if(ch.length > 0){
            ch.forEach(c => {
                let nodename = c.nodeName
                if(nodename === "INPUT" || nodename === "SELECT"){
                    results.push(c)
                }
            }) 
        }else{
            let nodename = child.nodeName
            if(nodename === "INPUT" || nodename === "SELECT"){
                results.push(child)
            }
                
        }
            
    })
    
    results.forEach(r => {
        r.addEventListener('keyup', (e)=>{
            e.preventDefault()
            let index = results.indexOf(r)

            if(e.key === "Enter"){
                let indexPlusOne = index + 1
                if(results[indexPlusOne] === undefined){
                    results[0].focus()
                        
                }else{
                    results[indexPlusOne].focus()
                }  
            }
        })
    })
}
