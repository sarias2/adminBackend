const { response } = require('express');
const Doctor = require('../models/doctors')

const getDoctors = async(req, res = response) => {
    res.json({
        ok: true,
        msg: 'Getting Doctors'
    })
}

const createDoctor = async(req, res = response) => {

    const uId = req.uId;
    const doctor = new Doctor({
        user: uId,
        ...req.body
    })

    try {

        const doctorDB = await doctor.save();

        res.json({
            ok: true,
            doctor: doctorDB
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Talk to the system admin'
        })
    }

}

const updateDoctors = async(req, res = response) => {
    res.json({
        ok: true,
        msg: 'Uopdating Doctor'
    })
}

const deleteDoctor = async(req, res = response) => {
    res.json({
        ok: true,
        msg: 'Deleting Doctor'
    })
}

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctors,
    deleteDoctor
}