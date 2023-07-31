import express from 'express';
import configViewEngin from './configs/ViewEngine';
import initWebRoute from './route/web'
import iniAPIRout from './route/api'
// import connection from './configs/connectDB';
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngin(app)
initWebRoute(app);
iniAPIRout(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})