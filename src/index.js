require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors')
const utils = require('./utils')
const firebase = require('firebase')
const adminFirebase = require('firebase-admin')
const serviceAccountConfig = require('../carefree-a2fc0-firebase-adminsdk-6sfs3-10ef2d11a7.json')

adminFirebase.initializeApp({
  credential: adminFirebase.credential.cert(serviceAccountConfig),
  databaseURL: 'https://carefree-a2fc0.firebaseio.com'
})

var defaultProject = firebase.initializeApp(utils.loadFirebaseConfig())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

const port = process.env.APP_PORT || 8080;
const host = process.env.APP_HOST || '127.0.0.1';



const authRouter = require('./routes/auth')(firebase);
app.use('/', authRouter);

const doctorRouter = require('./routes/doctor')(firebase);
app.use('/doctor', doctorRouter);
// Auth middle
const appointmentRouter = require('./routes/appointments')(firebase);
const authMiddleware = require('./middleware/auth')(adminFirebase)

app.use(authMiddleware)
app.use('/appointments', appointmentRouter);

app.listen(port, host);

console.log(`Server listening at ${host}:${port}`);
