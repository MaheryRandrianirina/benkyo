
import css from "./scss/app.scss"

window.addEventListener('load', () => {
    import('./Modules/SidebarLeft').then(module => {
        let sidebarLeft = new module.default()
        sidebarLeft.sidebarLeftChildrenclick()
    })
    import('./Modules/UserProfile').then(module => {
        new module.default
    })
    import('./responsives/home-responsive').then(module => {
        let HomeResponsive = new module.default
    })
})

    
    


