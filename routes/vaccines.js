const express = require('express');
const db = require('../db')

const router = express.Router();

// ============================= VACCINE TYPE =======================>> GET:ALL
router.get('/vaccine_types', async (req, res) => {

    const selectVaccines = 
            `
            SELECT vt.id as id, vt.name as name, COUNT(v.id) as vaccines,
                    description, benefits,
                    challenges, nr_doses_required as numberofdosesrequired
            FROM vaccine_type as vt
            JOIN vaccine as v
            ON vt.id=v.vaccine_type_id
            GROUP BY vt.id
            `
    try {
        const { rows } = await db.query(selectVaccines)
        res.json(rows)
    } catch (e) {
        res.status(404).send(`${e} Vaccines not found`)
    }
})

// ============================= VACCINE TYPE ========================>> GET:ID
router.get('/vaccine_types/:id', async (req, res) => {
    const {id} = req.params

    const getVaccineType = {
        text: `
            SELECT *, nr_doses_required as numberofdosesrequired
            FROM vaccine_type WHERE id=$1`
            ,
        values: [id]
    }

    const getVaccines = {
        text: "SELECT * FROM vaccine WHERE vaccine_type_id=$1",
        values: [id]
    }

    const getOtherUses = {
        text: "SELECT * FROM other_uses WHERE vaccine_type_id=$1",
        values: [id]
    }

    try {
        const { rows: vaccineTypeRows } = await db.query(getVaccineType)
 
         if (!vaccineTypeRows.length) {
             return res.sendStatus(404)
         }
 
        const { rows: vaccineRows } = await db.query(getVaccines)
        const { rows: otherUsesRows } = await db.query(getOtherUses)
 
        res.json({
            vaccineType: vaccineTypeRows[0],
            relatedVaccines: vaccineRows,
            otherUses: otherUsesRows
        })
     } catch (e) {
         res.status(500).send(e.message)
     }

})


module.exports = router
