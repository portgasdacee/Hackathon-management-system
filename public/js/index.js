(function() {
    let entry = document.querySelectorAll(".entryTitle");
    getDetail(entry);
    updateEntry();
    deleteEntry();
    let logout = document.querySelector(".logout");
    logout.addEventListener("click", () => {
        const endpoint = "/account/logout"
        fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        }).then((response) => {
            if (response.status === 200) {
                window.setTimeout(() => {
                    location.assign('/');
                }, 100);
            }
        })
    })
})();

function getDetail(entry){
    let detailSection = document.querySelector(".detail_section")
    entry.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            detailSection.classList.remove("hidden");
            fetch("./database.json").then(response => response.json())
            .then(response => {
                response.forEach(resItem => {
                    if (resItem.Title == item.innerText){
                        detailSection.innerHTML = `
                            <div class="modal">
                                <div class="modal_head">
                                    <h2>Hackathon Detail</h2>
                                    <button id="closeModal" class="closebtn">Close</button>
                                </div>
                                <div><b>Title:</b> ${resItem.Title}</div>
                                <div><b>Description:</b> ${resItem.Description}</div>
                                <div><b>Location:</b> ${resItem.Address}</div>
                                <div><b>Total No. Of Participants:</b> ${resItem.Participants}</div>
                                <div><b>StartDate:</b> ${resItem.StartDate}</div>
                                <div><b>EndDate:</b> ${resItem.EndDate}</div>
                            </div>
                        `
                        let closebtn = document.querySelector("#closeModal");
                        closebtn.addEventListener("click", () => {
                            detailSection.classList.add("hidden");
                        })
                    }
                })
            })
            
        })
    })
}

function updateEntry(){
    let updateButton = document.querySelectorAll(".update");
    let upTitle = document.querySelector("#uptitle");
    let upDescription = document.querySelector("#updescription");
    let upParticipants = document.querySelector("#upparticipants");
    let upLocation = document.querySelector("#uplocation");
    let upStart = document.querySelector("#upstart");
    let upEnd = document.querySelector("#upend");
    let upId = document.querySelector("#upIdInput");
    let upSection = document.querySelector(".update_section");
    let closeUpdate = document.querySelector("#closeUpdate");
    updateButton.forEach((item) => {
        item.addEventListener("click", () => {
            upSection.classList.remove("hidden");
            upId.value = item.id
            fetch("./database.json").then(response => response.json())
            .then(response => {
                response.forEach(resItem => {
                    if (resItem.id == item.id){
                        upTitle.value = resItem.Title
                        upDescription.value = resItem.Description
                        upParticipants.value = resItem.Participants
                        upLocation.value = resItem.Address
                        upStart.value = resItem.StartDate
                        upEnd.value = resItem.EndDate
                    }
                })
            })
        })
    })

    closeUpdate.addEventListener("click", () => {
        upSection.classList.add("hidden");
    })
}

function deleteEntry(){
    let delTitleInput = document.querySelector("#delTitleInput");
    let deleteButton = document.querySelectorAll(".delete");
    let delSection = document.querySelector(".delete_section");
    let closeDelete = document.querySelector("#closeDelete");
    let deleteEntryHead = document.querySelector(".deleteentryhead");
    deleteButton.forEach((item) => {
        item.addEventListener("click", () => {
            delSection.classList.remove("hidden");
            delTitleInput.value = item.id
            fetch("./database.json").then(response => response.json())
            .then(response => {
                response.forEach(resItem => {
                    if (resItem.id == item.id){
                        deleteEntryHead.innerText = "Delete" + " " + resItem.Title
                    }
                })
            })
        })
    })

    closeDelete.addEventListener("click", () => {
        delSection.classList.add("hidden");
})
}