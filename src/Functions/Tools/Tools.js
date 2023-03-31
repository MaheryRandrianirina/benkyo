

/**
 * 
 * @param {HTMLCollection} elementsCollection 
 * @returns HTMLElement[]
 */
function createConstArray(elementsCollection) {
    return [].slice.call(elementsCollection)
}

function createArray(elementsCollection) {
    return Array.from(elementsCollection)
}


function foreachArrayElements(array, callback) 
{
    array.forEach(element => {
        callback(element)
    })
}

function loopOverObject(object, callback)
{
    for(let index in object) {
        callback(index, object[index])
    }
}
function classicForLoop(array, callback) {
    for(let i = 0; i < array.length; i++){
        callback(array[i], array[i+1])
    }
}

function pushElementToArray(element, array) {
    array.push(element)
}

/**
 * 
 * @param {any} element 
 * @returns boolean
 */
function isUndefined(element)
{
    return element === undefined
}

export { 
    createConstArray, createArray, pushElementToArray, foreachArrayElements,
    classicForLoop, loopOverObject, isUndefined
}