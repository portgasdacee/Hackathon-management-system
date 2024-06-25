const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { writeFile, readFile } = require('fs');

const JWT_SECRET = "this-is-my-super-ultra-long-secret-key-for-json-web-token-haha-try-to-nail-it-mf";
const JWT_EXPIRES_IN= "90d";
const JWT_COOKIE_EXPIRES_IN = 90;
const db = "./public/user.json"

const signToken = id => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    });
};

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user.id);
    res.cookie('jwt', token, {
        expires: new Date(
            Date.now() + JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });

    user.password = undefined;
    res.status(statusCode).redirect("/")
}

exports.signup = (req, res, next) => {
    let dbValue = [];
    readFile(db, (error, data) => {
        if (error) {
          console.log(error);
          return;
        }
        let dataLen = Object.keys(data).length
        if (dataLen > 0){
            let UserList = JSON.parse(data);
            let newUserName = req.body.email;
            let inun = newUserName.toLowerCase()
            let allUserNames = []
            UserList.forEach((item) => {
                let userNames = item.email
                allUserNames.push(userNames.toLowerCase())
            })

            if (allUserNames.includes(inun)) {
                throw new Error('User with this email already exits', 409);
            }
        }
    })
    
    let now = new Date();
    timestamp = now.getFullYear().toString();
    timestamp += (now.getMonth < 9 ? '0' : '') + now.getMonth().toString(); // JS months are 0-based, so +1 and pad with 0's
    timestamp += ((now.getDate < 10) ? '0' : '') + now.getDate().toString();
    timestamp += ((now.getDate < 10) ? '0' : '') + now.getHours().toString();
    timestamp += ((now.getDate < 10) ? '0' : '') + now.getSeconds().toString();
    timestamp += ((now.getDate < 10) ? '0' : '') + now.getMilliseconds().toString();
    let uid = timestamp + Math.random().toString()
    let content = ({
        id: uid,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        createdAt: Date.now()
    });

    readFile(db, (error, data) => {
        if (error) {
            console.log(error);
            return;
        }
        let dataLen = Object.keys(data).length
        if (dataLen > 0){
            let parsedData = JSON.parse(data);
            parsedData.forEach(item => {
                dbValue.push(item);
            });
        }
        dbValue.push(content);
        writeFile(db, JSON.stringify(dbValue), err => {
            err ? console.log(err) : res.status(201)
        })
    })
    createSendToken(content, 201, req, res);
}

exports.login = (req, res, next) => {
    let { loginemail, loginpassword } = req.body;

    if (!loginemail || !loginpassword) {
        console.log ('Please provide email and password!', 400);
    }
    readFile(db, (error, data) => {
        if (error) {
            console.log(error);
            return;
        }
        let dataLen = Object.keys(data).length
        if (dataLen > 0){
            let parsedData = JSON.parse(data);
            parsedData.forEach(item => {
                if (item.email == loginemail && item.passwordConfirm == loginpassword){
                    let user = item
                    createSendToken(user, 200, req, res);
                }else{
                    // console.log("Email address or password does not match!")
                }
            });
        }
    })
}

exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'success' });
};

exports.isLoggedIn = async (req, res, next) => {
    head = req.rawHeaders
    let fetchedToken;
    head.forEach(async (item) => {
        if (item.includes("jwt=")){
            fetchedToken = item;
        }
    })
    if(fetchedToken != ""){
        try {
            let token = fetchedToken.replace(/jwt=/, '')
            const decoded = await promisify(jwt.verify)(
                token,
                JWT_SECRET
                );
            readFile(db, (error, data) => {
                if (error) {
                    console.log(error);
                    return;
                }
                let dataLen = Object.keys(data).length
                if (dataLen > 0){
                    let parsedData = JSON.parse(data);
                    parsedData.forEach(usr => {
                        if (usr.id == decoded.id){
                            let currentUser = usr;
                            res.locals.user = currentUser;
                            if (currentUser == ""){
                                return next();
                            }
                            return next();
                        }else{
                            // console.log("Email address or password does not match!")
                        }
                    });
                }
            })
        } 
        catch (err) {
            return next();
        }
    }    
};
