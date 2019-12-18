function fetchPups() {
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(pups => createPupsDOM(pups))
};
fetchPups();
const dogHash = {};
function createPupsDOM(pups) { 
    let dogBar = document.querySelector('#dog-bar');
    let dogInfo = document.querySelector('#dog-info');
    pups.forEach(function (pup) {
        dogBar.innerHTML += `<span><center data-pup-id=${pup.id}>${pup.name}</center></span>`
        dogHash[pup.id] = { name: pup.name, isGoodDog: pup.isGoodDog, image: pup.image };
    });
    
    dogBar.addEventListener('click', function (e) {
        let pupDetails = dogHash[e.target.dataset.pupId]
        if (e.target.dataset.pupId) {
            dogInfo.innerHTML = 
            `<img src=${pupDetails.image}> 
            <h2>${pupDetails.name}</h2>`
            if (pupDetails.isGoodDog === true) {
                dogInfo.innerHTML += `<button class="pupButtons" data-pup-id=${e.target.dataset.pupId}>Good Dog!</button>`
            } else {
                dogInfo.innerHTML += `<button class= "pupButtons" data-pup-id=${e.target.dataset.pupId}>Bad Dog!</button>`
            }
        }
    })
    
};

let dogInfo = document.querySelector('#dog-info');
let dogButton = document.querySelector('.pupButtons')
document.addEventListener('click', function (e) {
    let dogId = e.target.dataset.pupId
    function patchPups(dogId, dogObj) {
        fetch(`http://localhost:3000/pups/${dogId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(dogObj)
        })
        .then(resp => resp.json())
        .then(pups => console.log(pups))
    };

    if (e.target.className === 'pupButtons') {
        if (e.target.textContent === 'Good Dog!') {
            e.target.textContent = 'Bad Dog!';
            let dogObj = {id: dogId, isGoodDog: false};
            patchPups(dogId, dogObj);
        } else {
            e.target.textContent = 'Good Dog!';
            let dogObj = {id: dogId, isGoodDog: true};
            patchPups(dogId, dogObj);
        }
    }
});