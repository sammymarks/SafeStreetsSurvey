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
        username: "SammyAdmin",
        password: "SiteAdmin",
        address: "123 Foster Ave, Chicago, IL 60625, USA",
        phone: "555-555-1234",
        email: "sammy@email.com",
        isSiteAdmin: true,
        isOrgAdmin: true,
    })

    const OrgAdmin = await User.create({
        username: "Alison40thWard",
        password: "OrgAdmin",
        address: "123 Western Ave, Chicago, IL 60625, USA",
        phone: "555-555-1234",
        email: "alison@email.com",
        isSiteAdmin: false,
        isOrgAdmin: true,
    })

    const UserOne = await User.create({
        username: "Andre40thWard",
        password: "alderman",
        address: "123 Foster Ave, Chicago, IL 60625, USA",
        phone: "555-555-1234",
        email: "andre@email.com",
        isSiteAdmin: false,
        isOrgAdmin: true,
    })

    const UserTwo = await User.create({
        username: "MattUser",
        password: "47thward",
        address: "123 Foster Ave, Chicago, IL 60625, USA",
        phone: "555-555-1234",
        email: "matt@email.com",
        isSiteAdmin: false,
        isOrgAdmin: true,
    })

    const UserThree = await User.create({
        username: "MariaUser",
        password: "49thward",
        address: "123 Foster Ave, Chicago, IL 60625, USA",
        phone: "555-555-1234",
        email: "maria@email.com",
        isSiteAdmin: false,
        isOrgAdmin: false,
    })

    const UserFour = await User.create({
        username: "DaniUser",
        password: "49thward",
        address: "123 Foster Ave, Chicago, IL 60625, USA",
        phone: "555-555-1234",
        email: "maria@email.com",
        isSiteAdmin: false,
        isOrgAdmin: false,
    })

    //ORGANIZATION

    const FortiethWard = await Organization.create({
        orgAdmins: [OrgAdmin._id, UserOne._id],
        orgName: "Chicago 40th Ward",
        orgDescription: `Located on Chicago’s north side, the 40th Ward includes several diverse neighborhoods including Andersonville, Lincoln Square, Edgewater, Arcadia Terrace, and Bowmanville. Home to folks of every culture, identity, income, and residency status, the 40th Ward is a community of neighbors. We are glad you are here!`,
        orgEmail: "info@40thward.org",
        orgPhone: "(773) 654-1867",
        orgAddress: "5620 N Western Ave, Chicago, IL 60659"
    })

    //ORGANIZATIONIMAGE

    //PROJECT

    //PROJECTIMAGE

    //TICKET

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