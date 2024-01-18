//This code accesses our html elements for javascript manipulation


let form = document.getElementById('github-form');
let searchByName = document.getElementById('search'); 
let userDisplay = document.getElementById('user-list'); 
let repoDisplay= document.getElementById('repos-list'); 


document.addEventListener('DOMContentLoaded', () => {
    console.log("The DOM has loaded")
    form.addEventListener('submit',displayResults)

    //This function displays users results after searching

    
    function displayResults(e){
        e.preventDefault();

        repoDisplay.innerHTML=""
        userDisplay.innerHTML=""
        fetch(`https://api.github.com/search/users?q=${searchByName.value}`)
        .then(resp => resp.json())
        .then(data  => {
        if(data.total_count === 0){
            alert(`We have found no such user: ${searchByName.value}, Please try again`)
        }
        (data.items).forEach(user => {
            let userLi = document.createElement('li')
            userLi.classList.add('userName')
            let repobtn = document.createElement('button');
            repobtn.innerText = `Repos`
            userLi.innerHTML = `
                <h3>${user.login}</h3>
                <img src="${user.avatar_url}" class="sizeImg"></img>
                <p><b>link to page:</b> <a href="${user.html_url}" target="_blank">${user.html_url}</a></p>
            `
            userLi.appendChild(repobtn)

            //displays users repos after button repobtn is clicked
            function displayRepos(){ 
            repoDisplay.innerHTML=''
            fetch(`https://api.github.com/users/${user.login}/repos`)
            .then(response => response.json())
            .then(repoData => {
            repoData.forEach(repo => {
            let repoEl = document.createElement('li')

            repoEl.innerHTML = `
                <h3>Repository Name: ${repo.name}</h3>
                <p>Repository details: ${repo.description}</p>
                <p>Click to open Repository<a href=${repo.html_url}>${repo.html_url}</a></p>`

                repoDisplay.append(repoEl)
            })
        })
    }
        repobtn.addEventListener('click', displayRepos)
        userDisplay.appendChild(userLi) 
       })
    })
        //Alerts us for errors
        .catch(error =>{
        alert(error.message)
        })
    }
})