const { writeFile, readFile } = require('fs');

const db = "./public/database.json";

exports.landingPage = (req, res) => {
    readFile(db, (error, data) => {
        if (error) {
          console.log(error);
          return;
        }
        let dataLen = Object.keys(data).length
        if (dataLen > 0){
            let entries = JSON.parse(data);
            res.status(200).render('index', {
                title: 'Home',
                entries
            })
        }
        else{
            res.status(200).render('index', {
                title: 'Home',
            })
        }
    })
    
}

exports.createEntry = (req, res) => {
    try{
        let dbValue = [];
        let now = new Date();
        timestamp = now.getFullYear().toString();
        timestamp += (now.getMonth < 9 ? '0' : '') + now.getMonth().toString(); // JS months are 0-based, so +1 and pad with 0's
        timestamp += ((now.getDate < 10) ? '0' : '') + now.getDate().toString();
        timestamp += ((now.getDate < 10) ? '0' : '') + now.getHours().toString();
        timestamp += ((now.getDate < 10) ? '0' : '') + now.getSeconds().toString();
        timestamp += ((now.getDate < 10) ? '0' : '') + now.getMilliseconds().toString();
        let uid = timestamp + Math.random().toString()
        content = {
            id: uid,
            Title : req.body.Title,
            Description: req.body.Description,
            Participants: req.body.Participants,
            Address: req.body.Address,
            StartDate: req.body.Start,
            EndDate: req.body.End
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
                    dbValue.push(item);
                });
            }
            dbValue.push(content);
            writeFile(db, JSON.stringify(dbValue), err => {
                err ? console.log(err) : res.status(201).redirect("/")
            })
        })
    }
    catch(ex) {
        console.log (ex)
    }
}

exports.updateEntry = (req, res) => {
    try{
        let dbValue = [];
        content = {
            id: req.body.upId,
            Title : req.body.Title,
            Description: req.body.Description,
            Participants: req.body.Participants,
            Address: req.body.Address,
            StartDate: req.body.Start,
            EndDate: req.body.End
        }
        readFile(db, (error, data) => {
            if (error) {
                console.log(error);
                return;
            }
            let parsedData = JSON.parse(data);
            parsedData.forEach(item => {
                if (item.id == req.body.upId){
                    const index = parsedData.indexOf(item)
                    parsedData.splice(index, 1);
                }
            })
            parsedData.forEach(item => {
                dbValue.push(item);
            })
            dbValue.push(content);
            writeFile(db, JSON.stringify(dbValue), err => {
                err ? console.log(err) : res.status(201).redirect("/")
            })
        })
    }
    catch(ex) {
        console.log (ex)
    }
}

exports.deleteEntry = (req, res) => {
    try{
        let dbValue = [];
        readFile(db, (error, data) => {
            if (error) {
                console.log(error);
                return;
            }
            let parsedData = JSON.parse(data);
            parsedData.forEach(item => {
                if (item.id == req.body.delId){
                    const index = parsedData.indexOf(item)
                    parsedData.splice(index, 1);
                }
            })
            parsedData.forEach(item => {
                dbValue.push(item);
            })
            writeFile(db, JSON.stringify(dbValue), err => {
                err ? console.log(err) : res.status(201).redirect("/");
            })
        })
    }
    catch(ex) {
        console.log (ex)
    }
}