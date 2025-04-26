const {Router} = require('express')
const {getTemplates, getTemplate, addNewTemplate, deleteTemplate} = require('../controllers/templete');
const upload = require('../middleware/imageMiddleware');
const app = Router() ;

app.get('/api/templates', getTemplates)
app.get('/api/templates/:id', getTemplate)
app.post('/api/templates', upload.single('previewImage'), addNewTemplate)
app.delete('/api/templates/:id', deleteTemplate)


module.exports = app;