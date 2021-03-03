const express = require('express')
const app = express();

const port = process.env.PORT || 9000;

app.use(express.json())

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
