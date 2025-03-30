const Router = require('express')
const {pdfGenerator} = require('../controllers/pdf')
const app = Router()

app.post('/api/pdfGenerate', pdfGenerator)

module.exports = app;
