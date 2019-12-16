const baseURL = "http://localhost:3000/pups"
let allDogs = []

document.addEventListener('DOMContentLoaded', function(){
    
    const dogBar = document.getElementById("dog-bar")
    const dogInfo = document.getElementById("dog-info")
    
    function getDogs(){
        fetch(baseURL)
        .then(function(response){return response.json()})
        .then(function(dogs){
            allDogs = dogs
            dogs.forEach(function(dog){appendDog(dog)}
        )})
    }

    function appendDog(dog){
        const dogSpan = document.createElement('span')
        dogSpan.innerText = `${dog.name}`
        dogSpan.dataset.id = `${dog.id}` 
        dogBar.appendChild(dogSpan)
    }
    
    
    dogBar.addEventListener("click",function(e){
        const dogId = e.target.dataset.id
        getSingleDog(dogId)
    })
    
    function getSingleDog(dogId){
        fetch(`${baseURL}/${dogId}`)
        .then(function(response){return response.json()})
        .then(function(dog){showSingleDog(dog)}
    )}

    function showSingleDog(dog){
        dogInfo.innerHTML=`
        <h2>${dog.name}</h2>
        <img src = ${dog.image}>
        <br>
        `
        const dogButton = document.createElement("button")

        if (dog.isGoodDog){
            dogButton.innerHTML = "Good Dog!"
        } else if (dog.isGoodDog === false) {
            dogButton.innerHTML = "Bad Dog!"   
        }
        dogInfo.appendChild(dogButton)

        dogInfo.addEventListener("click", function(e){
            
            if (dog.isGoodDog === true){
                dogButton.innerHTML = "Bad Dog!"
                dog.isGoodDog = false
            } else if (dog.isGoodDog === false) {
                dogButton.innerHTML = "Good Dog!"
                dog.isGoodDog = true          
            }

            fetch(`${baseURL}/${dog.id}`,{
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
                },
                body: JSON.stringify({ "isGoodDog": dog.isGoodDog })
                })
            
        })
    }

    const toggle = document.getElementById("good-dog-filter")

    document.addEventListener("click",function(e){
        if (e.target === toggle){
            if(toggle.innerText.includes("OFF")){
                toggle.innerText = "Filter good dogs: ON"
        
                let goodDogs = allDogs.filter(dog => dog.isGoodDog === true)
                while(dogBar.firstChild){dogBar.firstChild.remove()}
                goodDogs.forEach(function(dog){appendDog(dog)})   
    
            } else if (toggle.innerText.includes("ON")){
                toggle.innerText = "Filter good dogs: OFF"
                while(dogBar.firstChild){dogBar.firstChild.remove()}
                allDogs.forEach(function(dog){appendDog(dog)})
            }
            
        }

    })
     
    getDogs()

})