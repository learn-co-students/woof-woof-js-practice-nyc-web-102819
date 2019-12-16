//

document.addEventListener("DOMContentLoaded", function () {

    let dogBar = document.getElementById("dog-bar")
    let dogInfo = document.getElementById("dog-info")
    let allDogs = [] 

    fetch("http://localhost:3000/pups/")
    .then( response => response.json())
    .then( data => {
        
        data.forEach(function (dog) {
           let dogSpan = document.createElement('span')
           dogSpan.id = dog.id
           dogSpan.innerText = dog.name
           dogBar.appendChild(dogSpan)
           allDogs.push(dog)
        })
    })
console.log(allDogs)

    let goodDog = null

    dogBar.addEventListener("click", function (e) {
        console.log(e.target.id)

        fetch(`http://localhost:3000/pups/${e.target.id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            
            dogInfo.firstChild.remove()
            
            let dogView = document.createElement('div')
            dogView.id = e.target.id
            dogView.innerHTML = `
            <img src= ${data.image}>
            <h2>${data.name}</h2>
            <button type="button" id="button"> ${data.isGoodDog}</button>
            `
            dogInfo.appendChild(dogView)
            goodDog = data.isGoodDog

        })
    })

    
    dogInfo.addEventListener("click",function (e) {
        console.log(e.target )
        let dogButton = document.getElementById("button")
        let parentNodeId = dogButton.parentNode.id

        if (e.target.id === "button"){
            goodDog = !goodDog
            dogButton.innerText = goodDog

            fetch(`http://localhost:3000/pups/${parentNodeId}`,{
            method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    isGoodDog: goodDog
                })
            })

        }

    })


    let toggle = document.getElementById("good-dog-filter")

    toggle.addEventListener("click", e => {
        console.log(e.target)
        if (toggle.innerText.includes("OFF")){
            toggle.innerText = "Filter good dogs: ON"
            let goodDogs = allDogs.filter(dog => dog.isGoodDog === true)
            console.log(goodDogs)

            while(dogBar.firstChild){dogBar.firstChild.remove()}
            
            goodDogs.forEach(function (dog) {
                let dogSpan = document.createElement('span')
                dogSpan.id = dog.id
                dogSpan.innerText = dog.name
                dogBar.appendChild(dogSpan)
                allDogs.push(dog)
             })

        }else{
            toggle.innerText = "Filter good dogs: OFF"
            
            let badDogs = allDogs.filter(dog => dog.isGoodDog === false)
            console.log(badDogs)

            while(dogBar.firstChild){dogBar.firstChild.remove()}
            
            badDogs.forEach(function (dog) {
                let dogSpan = document.createElement('span')
                dogSpan.id = dog.id
                dogSpan.innerText = dog.name
                dogBar.appendChild(dogSpan)
                allDogs.push(dog)
             })
        }
    })




    // end of DOM content listener
})