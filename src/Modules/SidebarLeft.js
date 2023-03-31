import { get } from '../Functions/Request/ajax'
import Content from './Content'

export default class SidebraLeft {
    constructor()
    {
        this.contentElement = document.querySelector('.content')
        this.sidebarLeftChildren = document.querySelectorAll('.sidebar-left i')
        if(this.sidebarLeftChildren !== null){
            this.sidebarLeftChildren.forEach(child => {
                if(child.classList.contains('active-item')){
                    this.loadContent()
                }
            })
        }
    }

    sidebarLeftChildrenclick()
    {
        this.sidebarLeftChildren.forEach(child => {
            child.addEventListener('click', (e)=>{
                this.contentElement.innerHTML = ""
                this.sidebarLeftChildren.forEach(s => {
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