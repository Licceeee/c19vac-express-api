const express = require('express');
const db = require('../db')

const router = express.Router();

// ================ VACCINE TYPE ===============>> GET:ALL
router.get('/vaccine_types', async (req, res) => {

    const selectVaccines = 
            `
            SELECT vt.name, v.name as vaccineName, description, benefits, challenges, nr_doses_required
            FROM vaccine_type as vt
            JOIN vaccine as v
            ON vt.id=v.vaccine_type_id
            `
    try {
        const { rows } = await db.query(selectVaccines)
        res.json(rows)
    } catch (e) {
        res.status(404).send(`${e} Vaccines not found`)
    }
})

// ================ VACCINE TYPE ===============>> GET:ID
router.get('/vaccine_types/:id', async (req, res) => {
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


// SELECT DISTINCT ON (vt.name)
//  vt.name, v.name AS vaccineNames, description, benefits, challenges, nr_doses_required
// FROM vaccine_type as vt
// JOIN vaccine as v
// ON vt.id=v.vaccine_type_id
// GROUP BY vt.name, v.name

// //