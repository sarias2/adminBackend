const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitals = async(req, res = response) => {
    res.json({
        ok: true,
        msg: 'Getting Hospitals'
    })
}

const createHospital = async(req, res = response) => {

    const uId = req.uId;
    const hospital = new Hospital({
        user: uId,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk to the system admin'
        })
    }

}

const updateHospitals = async(req, res = response) => {
    res.json({
        ok: true,
        msg: 'Getting Hospitals'
    })
}

const deleteHospital = async(req, res = response) => {
    res.json({
        ok: true,
        msg: 'Delete Hospitals'
    })
}

module.exports = {
    getHospitals,
    createHospital,
    updateHospitals,
    deleteHospital
}