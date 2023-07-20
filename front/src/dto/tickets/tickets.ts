export interface Ticket {
    _id?: string,
    index: number,
    type: string,
    description: string,
    descriptionLong: string,
    price: number,
    image: string,
    allowedSpaces: string[],
    escapeGameOrder?: string[],
    validUntil?: Date,
}

export interface BuyTicket {
    message: string,
    ticket: Ticket,
}

export const ticketsArray: Ticket[] = [
    {
        index: 0,
        type: "Day PASS",
        description: "Experience a Memorable Day at the Zoo !",
        descriptionLong: "Immerse yourself in a day of excitement and exploration with our day pass for the zoo. Encounter fascinating animals, enjoy interactive experiences, and create unforgettable memories in a world of wildlife wonders.",
        price: 10,
        image: "https://pbs.twimg.com/media/E5ENm5oXoAoV_gK.jpg:large",
        allowedSpaces: ["Forest", "Farm", "Savanna"]
    },
    {
        index: 1,
        type: "Week-end PASS",
        description: "Unleash the Fun at the Zoo !",
        descriptionLong: "Experience an action-packed weekend at the zoo with our Weekend PASS, granting you two days of unlimited access to captivating animal exhibits, thrilling activities, and engaging experiences. Make the most of your time off and create unforgettable memories as you immerse yourself in the wonders of wildlife and adventure.",
        price: 50,
        image: "https://www.jeuxvideo-live.com/wp-content/uploads/jvl/2022/07/planet-zoo-annonce-son-pack-aquatique-et-une-update-gratuite-100441-large.jpg",
        allowedSpaces: ["Forest", "Farm", "Savanna"]

    },
    {
        index: 2,
        type: "Year PASS",
        description: "Unlimited Wildlife Adventure with a Year Pass !",
        descriptionLong: "Embark on a year-long journey of discovery and wonder with our exclusive year pass. Enjoy unlimited access to captivating animal exhibits, interactive experiences, and exciting events as you immerse yourself in the enchanting world of the zoo throughout the entire year.",
        price: 100,
        image: "https://cms-cdn.zaonce.net/2022-12/pz_dlc12_screenshot_butterflies-wide_1920x1080_wm.jpg",
        allowedSpaces: ["Forest"]
    },
    {
        index: 3,
        type: "1daymonth PASS",
        description: "Discover the Zoo Every Month !",
        descriptionLong: "Enjoy a monthly visit to the zoo with our pass, granting you access to captivating animal exhibits and engaging experiences, allowing you to immerse yourself in the wonders of wildlife on a regular basis.",
        price: 5,
        image: "https://www.gamereactor.fr/media/79/planetzoo_2937913b.jpg",
        allowedSpaces: ["Forest", "Farm", "Savanna"]
    },
    {
        index: 4,
        type: "Night PASS",
        description: "Unleash the Magic !",
        descriptionLong: "Discover the zoo like never before as you embark on an enchanting nighttime adventure. Explore illuminated exhibits, encounter nocturnal creatures, and immerse yourself in the captivating atmosphere for a truly unforgettable experience.",
        price: 5,
        image: "https://i.ytimg.com/vi/0bjiAthxyDM/maxresdefault.jpg",
        allowedSpaces: ["Forest", "Farm", "Savanna"]
    },
    {
        index: 5,
        type: "Escape game PASS",
        description: "Explore Spaces in a Predefined Order !",
        descriptionLong: "With our Escape Game PASS, certain tickets will grant you access to zoo spaces in a predefined order, allowing you to sequentially explore the habitats of tigers, lions, and monkeys. Immerse yourself in an immersive adventure where puzzles and discovery intertwine, and experience a unique journey through these captivating environments.",
        price: 20,
        image: "https://www.supersoluce.com/sites/default/files/logo1/vignette-modes-jeu-planet-zoo.jpg",
        allowedSpaces: [],
        escapeGameOrder: ["Forest", "Farm", "Savanna"]
    }
];