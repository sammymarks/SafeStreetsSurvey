const { User,Organization,OrganizationImage,Project,ProjectImage,Ticket,TicketImage,TicketReview } = require('../models/index')

module.exports = {
    getAll,
    getByID,
    postTicketsAndImages
}

async function getAll (req,res) {
    try {
        const tickets = await Ticket.find()
        res.status(201).send(tickets)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    } 
}
async function getByID (req,res) {
    try {
        console.log("get Ticket by ticket.sub")
        const ticket = await Ticket.findById(req.params.id)
        res.status(201).send(ticket)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

async function postTicketsAndImages (req,res) {
    try {
        // console.log(req.body)
        const ticket = req.body.ticket
        const images = req.body.images
        // console.log(ticket)
        const newTicket = await Ticket.create({
            "project": ticket.project,
            "submittedBy": ticket.submittedBy,
            "addressLat": ticket.addressLat,
            "addressLong": ticket.addressLong,
            "issue": ticket.issue,
            "location": ticket.location,
            "comments": ticket.comments
        })
        // console.log("newTicket", newTicket)
        console.log("imagesfile", images.uploadFiles)
        // for (const image of images) {
            const newImage = await TicketImage.create({
                "ticket": newTicket._id,
                "imageDataBase64": images.uploadFiles
            })

        // }

        res.status(201).send("ticket")
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

