const { User,Organization,OrganizationImage,Project,ProjectImage,Ticket,TicketImage,TicketReview } = require('../models/index')

module.exports = {
    getAll,
    getByID,
}

async function getAll (req,res) {
    try {
        const ticketImages = await TicketImage.find()
        res.status(201).send(ticketImages)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    } 
}
async function getByID (req,res) {
    try {
        console.log("get TicketImage by ticketImage.sub")
        const ticketImage = await TicketImage.findById(req.params.id)
        res.status(201).send(ticketImage)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}