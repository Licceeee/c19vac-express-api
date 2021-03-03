const express = require('express');
const db = require('../db')

const router = express.Router();

// ================ VACCINE TYPE ===============>> GET:ALL
router.get('/vaccines', async (req, res) => {
    const { rows } = await db.query('SELECT * FROM vaccine')
    res.send(rows)
})

// ================ VACCINE TYPE ===============>> GET:ID
router.get('/vaccines/:id', async (req, res) => {
    const {id} = req.params
    const selectVaccine = {
        text: `
            SELECT vt.name, v.name as vaccineName, description, benefits, challenges, nr_doses_required
            FROM vaccine_type as vt
            LEFT JOIN vaccine as v
            ON vt.id=v.vaccine_type_id
            WHERE vt.id = $1;
         `,
        values: [id]}

    try {
        const { rows } = await db.query(selectVaccine)
        console.log("in try ")
        res.send(rows)
    } catch (e) {
        res.status(404).send("Vaccine not found")
    }
})

module.exports = router