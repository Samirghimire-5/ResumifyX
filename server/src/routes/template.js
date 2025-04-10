const {Router} = require('express')
const {getTemplates, getTemplate, addNewTemplate, deleteTemplate} = require('../controllers/templete')
const app = Router() ;

// app.get('/api/templates', getTemplates)
app.get('/api/templates/:id', getTemplate)
app.post('/api/templates', addNewTemplate)
app.delete('/api/templates/:id', deleteTemplate)


module.exports = app;