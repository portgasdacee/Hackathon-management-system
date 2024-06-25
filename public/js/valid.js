(function() {
    let signupemail = document.querySelector(".signupemail");
    let signuppassword = document.querySelector(".signuppassword");
    let signuppasswordconfirm = document.querySelector(".signuppasswordconfirm");
    let signupbutton = document.querySelector(".signupbutton");
    let shortpwd =document.querySelector(".shortpwd");
    let wrgpwd = document.querySelector(".wrgpwd");
    let sameemail = document.querySelector(".sameemail");
    signupbutton.addEventListener("click", function signupclick (e) {
        e.preventDefault();
        pwdVal = signuppassword.value;
        pwdValCon = signuppasswordconfirm.value;
        let bool;
        fetch("./user.json").then(response => response.json())
            .then(response => {
                response.forEach(resItem => {
                    if (resItem.email == signupemail.value){
                        signupemail.style.borderColor = "crimson";
                        sameemail.classList.remove("hidden");
                        return bool = true
                    }
                })
            })
        setTimeout(()=> {
            if (bool != true){
                signupbutton.removeEventListener("click", signupclick);
                signupbutton.click();
            }
        }, 3000)
        if (pwdVal.length < 6) {
            e.preventDefault();
            signuppassword.style.borderColor = "crimson";
            shortpwd.classList.remove("hidden");
            return;
        }
        if (pwdValCon !== pwdVal){
            e.preventDefault();
            wrgpwd.classList.remove("hidden");
            signuppasswordconfirm.style.borderColor = "crimson";
            return;
        }
    })

    let loginemail = document.querySelector(".loginemail");
    let loginpassword = document.querySelector(".loginpassword");
    let loginbtn = document.querySelector(".loginbtn");
    let noemail = document.querySelector(".noemail");
    let smallpwd = document.querySelector(".smallpwd");
    let nopwd = document.querySelector(".nopwd");
    loginbtn.addEventListener("click",  function clicker (e) {
        e.preventDefault();
        let bool;
        fetch("./user.json").then(response => response.json())
            .then(response => {
                response.forEach(resItem => {
                    if (resItem.email == loginemail.value){
                        bool = true;
                        if (resItem.passwordConfirm != loginpassword.value){
                            nopwd.classList.remove("hidden");
                            loginpassword.style.borderColor = "crimson";
                            return;
                        }
                        loginbtn.removeEventListener("click", clicker);
                        loginbtn.click();
                    }
                })  
                if (bool != true){
                    noemail.classList.remove("hidden");
                    loginemail.style.borderColor = "crimson";
                }              
            })
            
            pwdLogin = loginpassword.value;
            if (pwdLogin.length < 6){
                loginpassword.style.borderColor = "crimson";
                smallpwd.classList.remove("hidden");
            }
    })

})();