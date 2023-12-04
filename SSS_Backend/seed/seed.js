const db = require('../db/index.js')

const {
    User,
    Organization,
    OrganizationImage,
    Project,
    ProjectImage,
    Ticket,
    TicketImage,
    TicketReview
  } = require('../models/index.js')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
console.log("DB On")

const main = async () => {

    //USER

    const SiteAdmin = await User.create({
        auth0sub: "google-oauth2|116105925941197687929",
        displayName: "SammyAdmin",
        email: "sammy.marks@gmail.com",
        isSiteAdmin: true,
        isOrgAdmin: true,
    })

    const OrgAdmin = await User.create({
        auth0sub: "google-oauth2|108191253406854157973",
        displayName: "Sammy Org",
        email: "sammy3489@gmail.com",
        isSiteAdmin: false,
        isOrgAdmin: true,
    })

    const UserOne = await User.create({
        auth0sub: "auth0|6564cce717b4bdb50115e451",
        displayName: "sammy@email.com",
        email: "sammy@email.com",
        isSiteAdmin: false,
        isOrgAdmin: false,
    })

    //ORGANIZATION

    const FortiethWard = await Organization.create({
        orgAdmins: [SiteAdmin._id, OrgAdmin._id],
        orgName: "Chicago 40th Ward",
        orgDescription: `Located on Chicago’s north side, the 40th Ward includes several diverse neighborhoods including Andersonville, Lincoln Square, Edgewater, Arcadia Terrace, and Bowmanville. Home to folks of every culture, identity, income, and residency status, the 40th Ward is a community of neighbors. We are glad you are here!`,
        orgEmail: "info@40thward.org",
        orgPhone: "(773) 654-1867",
        orgAddress: "5620 N Western Ave, Chicago, IL 60659"
    })

    //ORGANIZATIONIMAGE

    //PROJECT
    const Q12440thSSS = await Project.create({
        organization: FortiethWard._id,
        name: "Q1 2024 40th Ward Safe Streets Survey",
        description: "Here is a link to our custom map!",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-03-31"),
        userParticipants: [SiteAdmin._id, OrgAdmin._id, UserOne._id],
    })

    const Q22440thSSS = await Project.create({
        organization: FortiethWard._id,
        name: "Q2 2024 40th Ward Safe Streets Survey",
        description: "This hasn't started yet",
        startDate: new Date("2024-04-01"),
        endDate: new Date("2024-06-30"),
        userParticipants: [SiteAdmin._id],

    })
    //PROJECTIMAGE

    //TICKET
    const TestTicket = await Ticket.create({
        project: Q12440thSSS._id,
        submittedBy: SiteAdmin._id,
        addressLat: "41.974663",
        addressLong: "-87.679274",
        issue: ["Missing Infrastructure", "Dangerous Conditions"],
        location: ["Intersection"],
        comments: "Missing stopsign. This is the only intersection around Winnemac Park that does not have a stop sign or traffic light.",

    })
            
    //TICKETIMAGE

    //TICKETREVIEW


}

reSeedAll = async () => {
    await db.dropDatabase()
    console.log("droppedDB")
    await main()
    console.log("completed main")
    await db.close()
    console.log("closed db")
}

reSeedAll()