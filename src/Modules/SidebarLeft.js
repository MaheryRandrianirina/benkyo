import { get } from '../Functions/Request/ajax'
import Content from './Content'

export default class SidebraLeft {

    constructor()
    {
        this.contentElement = document.querySelector('.content')
        this.sidebarLeftChildren = document.querySelectorAll('.sidebar-left i')
        this.navMenuChildren = document.querySelectorAll('nav .menu i')
        this.menu = this.sidebarLeftChildren.length > 0 ? this.sidebarLeftChildren : this.navMenuChildren
        if(this.menu.length > 0){
            this.menu.forEach(child => {
                if(child.classList.contains('active-item')){
                    this.loadContent()
                }
            })
        }
    }

    sidebarLeftChildrenclick()
    {
        this.menu.forEach(child => {
            child.addEventListener('click', (e)=>{
                this.contentElement.innerHTML = ""
                this.menu.forEach(s => {
                    s.classList.remove('active-item')
                })

                if(!child.classList.contains('active-item')){
                    child.classList.add('active-item')
                }
                this.loadContent()
            }, )
        })
    }

    loadContent(){
        const className = document.querySelector('.active-item').classList.value.split(" ")[2]
        const route = "/" + className.replace("-logo", "")
        get(route).then(res => {
            new Content(res)
        }).catch(err => {
            console.error(err)
        })
    }
}