const express = require('express')
const app = express();
const cors = require('cors');

const port = process.env.PORT || 3000;

app.use(express.json())
app.use(cors());
app.use('/static', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

const vaccines = require('./routes/vaccines')

app.use('/api/v1', vaccines)






app.get('/', async (req, res) => {
  try {
     res.render('index', {
        title: "C19VAC API DOCS",
    })
   } catch(e) {
    res.sendStatus(500)
  }
})

app.listen(port, () => console.log(`listen at port ${port}`))
