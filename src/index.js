let dogBar = document.getElementById('dog-bar')
let dogInfoDiv = document.getElementById('dog-info')

function getDogs () {
    fetch ('http://localhost:3000/pups')
        .then (function (resp) {
            return resp.json();
        })
        .then (function (dogs) {
            dogs.forEach (function (dog) {
                let dogSpan = document.createElement('span')
                dogSpan.dataset.id = dog.id
                dogSpan.innerText = dog.name
                dogBar.appendChild(dogSpan)
                dogSpan.addEventListener("click", function (e) {
                    // dogId = e.target.dataset.id
                    displayDog(dog);
                })
                
                function displayDog(dog) {
                    dogInfoDiv.innerHTML = ''
                    let dogDiv = document.createElement('div') 
                    dogDiv.dataset.id = dog.id
                    if (dog.isGoodDog === true) {
                        dogDiv.innerHTML = `
                        <img src=${dog.image}> <h2>${dog.name}</h2> <button>Good Dog!</button>
                        `
                    } else {
                        dogDiv.innerHTML = `
                        <img src=${dog.image}> <h2>${dog.name}</h2> <button>Bad Dog!</button>
                        `
                    }
                    dogInfoDiv.appendChild(dogDiv)
                }
            })
        })
}

getDogs();

document.addEventListener("click", function (e) {
    button = e.target
    parentPupId = e.target.parentNode.dataset.id
    parentPup = e.target.parentNode
    if (e.target.tagName === 'BUTTON') {

        //if they click a button, change the text appearance below: 
        if (button.innerText === 'Good Dog!') {
            button.innerText = 'Bad Dog!'

            fetch (`http://localhost:3000/pups/${parentPupId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            },
            body: JSON.stringify ({
                'isGoodDog': false
            })
        })

        } else {
            button.innerText = 'Good Dog!'

            fetch (`http://localhost:3000/pups/${parentPupId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            },
            body: JSON.stringify ({
                'isGoodDog': true
            })
        }      
    )}
    }
})

































































//solution code 

// let dogBar = document.getElementById("dog-bar")
// let dogInfoDiv = document.getElementById("dog-info")
// let goodDogFilter = document.getElementById("good-dog-filter")

// goodDogFilter.addEventListener("click", function() {
//     let spanArray = Array.from(dogBar.children)
//     if (goodDogFilter.innerText === 'Filter good dogs: OFF') {
//         goodDogFilter.innerText = 'Filter good dogs: ON'
//         spanArray.filter(function (span) {
//             console.log(span)
//             let badDog = span.dataset.goodDogStatus === false
//             badDog.style.display = "none"
//     }) 
// }
// })

// function getPups () {
//     fetch ('http://localhost:3000/pups/')
//     .then (function (resp) {
//         return resp.json();
//     })
//     .then (function (pups) {
//         pups.forEach (function (pup) {
//             let pupSpan = document.createElement("span")
//             pupSpan.innerText = `${pup.name}`
//             pupSpan.dataset.goodDogStatus = `${pup.isGoodDog}`
//             dogBar.append(pupSpan)
//             pupSpan.addEventListener("click", function () {
//                 displayPup(pup) 
//             })
//         })
//     })
// }

// getPups();

// function displayPup (pup) {
//     dogInfoDiv.innerHTML = ''
//     let displayPupDiv = document.createElement("div")
//     if (pup.isGoodDog === true) {
//         displayPupDiv.innerHTML = `
//         <img src=${pup.image}> <h2>${pup.name}</h2> 
//         <button data-id=${pup.id}>Good Dog!</button>
//         `
//         dogInfoDiv.appendChild(displayPupDiv)
//         let goodDogButton = displayPupDiv.getElementsByTagName("button")[0]
//         goodDogButton.addEventListener("click", function () {
//             updateGoodDogStatus(pup);
//         })
//     } else {
//         displayPupDiv.innerHTML = `
//         <img src=${pup.image}> <h2>${pup.name}</h2> 
//         <button data-id=${pup.id}>Bad Dog!</button>
//         `
//         dogInfoDiv.appendChild(displayPupDiv)
//         let goodDogButton = displayPupDiv.getElementsByTagName("button")[0]
//         goodDogButton.addEventListener("click", function () {
//             updateGoodDogStatus(pup);
//         })
//     }
// }

// function updateGoodDogStatus (pup) {
//     let foundButton = dogInfoDiv.querySelector('button')
//     console.log(foundButton)
//     if (foundButton.innerText === 'Good Dog!') {
//         foundButton.innerText = 'Bad Dog!'
//         fetch (`http://localhost:3000/pups/${pup.id}`, {
//         method: 'PATCH',
//         headers: {
//             "Content-Type": "application/json",
//             accepts: "application/json"
//         },
//         body: JSON.stringify ( {
//             "isGoodDog": false
//         })
//     }) 
//     }   else {
//         foundButton.innerText = 'Good Dog!'
//         fetch (`http://localhost:3000/pups/${pup.id}`, {
//         method: 'PATCH',
//         headers: {
//             "Content-Type": "application/json",
//             accepts: "application/json"
//         },
//         body: JSON.stringify ( {
//             "isGoodDog": true
//         })
//     }) 
//     }
// }