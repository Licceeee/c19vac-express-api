const express = require('express')
const app = express();
const cors = require('cors');

const port = process.env.PORT || 8050;

app.use(express.json())
app.use(cors());

const vaccines = require('./routes/vaccines')

app.use('/api/v1', vaccines)

app.get('/', async (req, res) => {
  try {
     res.send("Express is responding")
   } catch(e) {
    res.sendStatus(500)
  }
})

app.listen(port, () => console.log(`listen at port ${port}`))
