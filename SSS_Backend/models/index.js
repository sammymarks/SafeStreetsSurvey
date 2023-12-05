const mongoose = require('mongoose')

//Import Model
const UserSchema = require('./user')
const OrganizationSchema = require('./organization')
const OrganizationImageSchema = require ('./organizationimage')
const ProjectSchema = require('./project')
const ProjectImageSchema = require('./projectimage')
const TicketSchema = require('./ticket')
const TicketImageSchema = require('./ticketimage')
const TicketReviewSchema = require('./ticketreview')

//Define Schemas
const User = mongoose.model('user', UserSchema)
const Organization = mongoose.model('organization', OrganizationSchema)
const OrganizationImage = mongoose.model('organization-image', OrganizationImageSchema)
const Project = mongoose.model('project', ProjectSchema)
const ProjectImage = mongoose.model('project-image', ProjectImageSchema)
const Ticket = mongoose.model('ticket', TicketSchema)
const TicketImage = mongoose.model('ticket-image', TicketImageSchema)
const TicketReview = mongoose.model('ticket-review', TicketReviewSchema)

//Export Schemas
module.exports = {
    User,
    Organization,
    OrganizationImage,
    Project,
    ProjectImage,
    Ticket,
    TicketImage,
    TicketReview
  }