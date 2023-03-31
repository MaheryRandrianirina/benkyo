import { createArray, createConstArray } from "../Functions/Tools/Tools"
import { createElement, goUpToGrandParentGrandParent, removeElementFromDOM } from "../Functions/Tools/DOMTools"

export default class Carousel {
    /**
     * 
     * @param {HTMLElement} element 
     */
    constructor (element) {
        this.element = element
        this.options = {
            slidesVisible: 1,
            slidesToScroll: 1
        }

        this.createCarouselOnce = 0
        this.currentItem = 0
        this.inputContainerElements = createConstArray(element.children)
        this.moveCallbacks = []
        this.isMobile = false
        
        this.handleResize()
        window.addEventListener('resize', this.handleResize.bind(this))
    }

    handleResize(){
        let mobile = window.innerWidth < 630
        if(this.isMobile !== mobile) {
            this.isMobile = mobile
        }
        
        if(this.isMobile){
            this.createCarouselOnce++
            this.createCarousel()
        }else if(!this.isMobile && this.createCarouselOnce >= 1) {
            this.createCarouselOnce = 0
            this.createCarouselOnce--
            this.noCarousel()
        }
    }

    createCarousel()
    {
        if(this.createCarouselOnce === 1) {
            this.root = createElement('div', 'carousel')
            this.container = createElement('div', 'carousel_container')
            /**
             * @type {HTMLElement[]}
             */
            this.items = this.inputContainerElements.map(inputContainer => {
                let item = createElement('div', 'carousel_item')
                item.appendChild(inputContainer)
                this.container.appendChild(item)

                return item
            })
            
            this.root.appendChild(this.container)
            this.element.appendChild(this.root)
            this.ratio = this.items.length / this.options.slidesVisible

            this.createNavigation()
            this.moveCallbacks.forEach(cb => cb(0))
            new CarouselTouchEvent(this)
        }
        this.setStyle()
    }

    createNavigation() 
    {
        this.prevButton = createElement('div', 'carousel_prev')
        this.nextButton = createElement('div', 'carousel_next')
        let arrowLeft = createElement('i', 'fas fa-arrow-left')
        let arrowRigth = createElement('i', 'fas fa-arrow-right')

        this.prevButton.appendChild(arrowLeft)
        this.nextButton.appendChild(arrowRigth)

        this.appendElementsToRoot()
        this.addClickEventOnButtons()
        this.onHideButton(index => {
            if(index === 0) {
                this.prevButton.classList.add('carousel_prev_hidden')
            }else {
                if(this.prevButton.classList.contains('carousel_prev_hidden')) {
                    this.prevButton.classList.remove('carousel_prev_hidden')
                }
            }

            if(this.items[this.currentItem + this.options.slidesToScroll] === undefined) {
                this.nextButton.classList.add('carousel_next_hidden')
            } else {
                this.nextButton.classList.remove('carousel_next_hidden')
            }
        })
    }

    appendElementsToRoot()
    {
        this.root.appendChild(this.prevButton)
        this.root.appendChild(this.nextButton)
    }

    addClickEventOnButtons()
    {
        this.prevButton.addEventListener('click', this.moveToPrev.bind(this))
        this.nextButton.addEventListener('click', this.moveToNext.bind(this))
    }

    onHideButton(callback)
    {
        this.moveCallbacks.push(callback)
    }

    moveToPrev()
    {
        this.moveTo(this.currentItem - this.options.slidesToScroll)
    }

    moveToNext()
    {   
        this.moveTo(this.currentItem + this.options.slidesToScroll)
    }

    moveTo(index)
    {
        let translateX = index / this.items.length * -100 + '%'
        this.translate(translateX)
        this.currentItem = index
        this.moveCallbacks.forEach(cb => cb(index))
    }

    translate(translateXPercentValue)
    {
        this.container.style.transform = `translate3d(${translateXPercentValue},0,0)`
    }

    setStyle()
    {
        this.container.style.width = this.ratio * 100 + '%'
        this.items.forEach(item => {
            item.style.width = this.container.offsetWidth / this.items.length + 'px'
        })
    } 
    
    enableTransition()
    {
        this.container.style.transition = ''
    }

    disableTransition()
    {
        this.container.style.transition = 'none'
    }

    noCarousel()
    {
        if(this.createCarouselOnce === -1) {
            goUpToGrandParentGrandParent(this.container.querySelectorAll('.input-container'))
            removeElementFromDOM(this.root) 
        }  
    }
    
    
}

class CarouselTouchEvent {

    /**
     * 
     * @param {Carousel} carousel 
     */
    constructor(carousel) 
    {
        this.carousel = carousel
        this.carouselContainer = carousel.container
        this.stopCurrentItemIncrement = false

        window.addEventListener('dragstart', e => e.preventDefault())
        this.carouselContainer.addEventListener('mousedown', this.startDrag.bind(this))
        this.carouselContainer.addEventListener('touchstart', this.startDrag.bind(this))
        window.addEventListener('mousemove', this.drag.bind(this))
        window.addEventListener('touchmove', this.drag.bind(this))
        window.addEventListener('touchend', this.endDrag.bind(this))
        window.addEventListener('touchcancel', this.endDrag.bind(this))
        window.addEventListener('mouseup', this.endDrag.bind(this))
    }

    /**
     * 
     * @param {MouseEvent / TouchEvent} e 
     */
    startDrag(e)
    {
        if(this.origin === undefined) {
            this.origin = e.type === 'mousedown' ? e : e.touches[0]
            this.carousel.disableTransition()
        }
    }

    drag(e)
    {
        if(this.origin) {
            this.position = e.touches ? e.touches[0] : e
            this.positionX = this.position.screenX
            this.translateContainer()
        } 
    }

    translateContainer()
    {
        this.moveX = this.positionX - this.origin.screenX
        let percent = (this.moveX) * 100 / this.carouselContainer.offsetWidth
        
        const baseTranslate = this.carousel.currentItem * -100 / this.carousel.items.length
        this.translateX = baseTranslate + percent
        console.log(this.carousel.currentItem)    
        if (this.moveRight() && this.carousel.items[Math.ceil(this.carousel.currentItem)] === undefined) {
            //this.horizontalBoundTo('right')
            this.hideButton(this.carousel.nextButton)
            return
        } else if( this.moveLeft() && this.carousel.currentItem <= 0) {
            //this.horizontalBoundTo('left')
            console.log('fdzef')
            this.hideButton(this.carousel.prevButton)
            return
        }
        
        this.carousel.translate(this.translateX+ '%')
        
    }

    moveRight()
    {
        return this.moveX < 0
    }

    moveLeft()
    {
        return this.moveX > 0
    }

    hideButton(button)
    {
        if(button.classList.contains('carousel_next') && !button.classList.contains('carousel_next_hidden')) {
            button.classList.add('carousel_next_hidden')
        }else if(button.classList.contains('carousel_prev') && !button.classList.contains('carousel_prev_hidden')) {
            button.classList.add('carousel_prev_hidden')
        }
    }
    horizontalBoundTo(direction)
    {
        this.carousel.enableTransition()
        if(direction === 'left') {
            this.carouselContainer.style.transform = 'translateX(20px)'
        }else {
            
        }
        setTimeout(()=>{
            this.carouselContainer.style.transform = 'none'
        }, 300)
    }

    endDrag()
    {
        if(this.origin) {
            this.incrementOrDecrementCurrentItemValue()
            this.origin = undefined
            this.carousel.enableTransition()
        }
        
    }

    incrementOrDecrementCurrentItemValue()
    {
        let currentItemIncrement = Math.abs(this.moveX / this.oneItemWidth)
        if(this.moveRight() && this.stopCurrentItemIncrement === false) {
            this.carousel.currentItem += currentItemIncrement
        }else if(this.moveLeft()) {
            this.carousel.currentItem -= currentItemIncrement
        }
    }

    get oneItemWidth()
    {
        return this.carousel.items[0].offsetWidth
    }   
}