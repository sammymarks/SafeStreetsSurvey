const { User,Organization,OrganizationImage,Project,ProjectImage,Ticket,TicketImage,TicketReview } = require('../models/index')

module.exports = {
    getAll,
    getByID
}

async function getAll (req,res) {
    try {
        const orgs = await Organization.find()
        res.status(201).send(orgs)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    } 
}

async function getByID (req,res) {
    try {
        const org = await Organization.findById(req.params.id)
        res.status(201).send(org)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}