import { createProgressbar, showProgressBar } from "../Tools/DOMTools"

function get(url) {
    return new Promise((resolve, reject)=>{
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    resolve(xhr.responseText)
                }else {
                    reject(xhr.responseText)
                }
            }
            
        }

        xhr.open("GET", url)
        xhr.send()
    })
}

function post(url, data, doShowProgressBar = false) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        let formdata = new FormData()
        for(const name in data) {
            formdata.append(name, data[name])
        }

        xhr.onreadystatechange = ()=>{
            if(doShowProgressBar){
                let progressBar = createProgressbar()
                showProgressBar(progressBar, xhr.readyState)
            }

            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    resolve(xhr.responseText)
                }else {
                    reject(xhr.responseText)
                }
            }
        }

        xhr.open("POST", url)
        xhr.send(formdata)
    })   
}

export { get, post }