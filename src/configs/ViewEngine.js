import express from 'express';
const configViewEngin = (app) =>{
    app.use(express.static('./src/public'))

    app.set('view engine', 'ejs');
    app.set('views', './src/views')
}

export default configViewEngin;