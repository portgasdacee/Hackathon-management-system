const express = require('express');
const path = require('path');
const hackathonRouter = require('./Routes/hackathonRoute');
const userRouter = require('./Routes/userRoute');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', hackathonRouter);
app.use('/account', userRouter);

app.listen(3000, () => {
    console.log("Webpage running in port 3000...")
})