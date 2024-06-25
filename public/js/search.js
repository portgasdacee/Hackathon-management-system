(function() {
    let searchbutton = document.querySelector(".searchbutton");
    let entryTitle = document.querySelector(".filterEntryTitle");
    let closeFilter = document.querySelector("#closeFilter");
    let filterSec = document.querySelector(".filtered_section");
    searchbutton.addEventListener("click", () => {
        let searchbarValue = document.querySelector(".searchbar").value;
        filterSec.classList.remove("hidden");
        entryTitle.innerHTML = "";
        fetch("./database.json").then(response => response.json())
            .then(response => {
                response.forEach(resItem => {
                    resItemLower  = resItem.Title.toLowerCase();
                    searchLower = searchbarValue.toLowerCase();
                    if (resItemLower.includes(searchLower)){
                        entryTitle.innerHTML += `
                            <div class="entryTitle">${resItem.Title}</div>
                            <button id="${resItem.id}" class="update btn">Update</button>
                            <button id="${resItem.id}" class="delete btn">Delete</button>
                        `
                        let entry = document.querySelectorAll(".entryTitle");
                        getDetail(entry);
                        updateEntry();
                        deleteEntry();
                    }
                })
            })
    })

    closeFilter.addEventListener("click", () => {
        filterSec.classList.add("hidden");
    })

    let dateSearchButton = document.querySelector(".dateSearchButton");
    dateSearchButton.addEventListener("click", () => {
        let dateSearch = document.querySelector(".dateSearch").value;
        filterSec.classList.remove("hidden");
        entryTitle.innerHTML = "";
        fetch("./database.json").then(response => response.json())
            .then(response => {
                response.forEach(resItem => {
                    if (resItem.StartDate == dateSearch){
                        entryTitle.innerHTML += `
                            <div class="entryTitle">${resItem.Title}</div>
                            <button id="${resItem.id}" class="update btn">Update</button>
                            <button id="${resItem.id}" class="delete btn">Delete</button>
                        `
                        let entry = document.querySelectorAll(".entryTitle");
                        getDetail(entry);
                        updateEntry();
                        deleteEntry();
                    }
                    if (resItem.EndDate == dateSearch){
                        entryTitle.innerHTML += `
                            <div class="entryTitle">${resItem.Title}</div>
                            <button id="${resItem.id}" class="update btn">Update</button>
                            <button id="${resItem.id}" class="delete btn">Delete</button>
                        `
                        let entry = document.querySelectorAll(".entryTitle");
                        getDetail(entry);
                        updateEntry();
                        deleteEntry();
                    }
                })
            })
    })
})();