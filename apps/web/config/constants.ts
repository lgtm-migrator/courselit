/**
 * This file provides app wide constants
 */

export default {
    domainNameForSingleTenancy: "main",
    placeholderEmailForSingleTenancy: "fake@email.com",
    dbConnectionString:
        process.env.DB_CONNECTION_STRING ||
        `mongodb://localhost/${
            process.env.NODE_ENV === "test" ? "test" : "app"
        }`,

    routePrefix:
        process.env.NODE_ENV === "production"
            ? process.env.API_PREFIX || "/api"
            : "",

    // mail settings
    mailHost: process.env.EMAIL_HOST,
    mailUser: process.env.EMAIL_USER,
    mailPass: process.env.EMAIL_PASS,
    mailFrom: process.env.EMAIL_FROM,
    mailPort: process.env.EMAIL_PORT ? +process.env.EMAIL_PORT : 587,

    // password related config
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: process.env.JWT_EXPIRES_IN || "1d",
    jwtTokenCookieName: process.env.JWT_COOKIE_NAME || "access_token",

    // product types
    course: "course",
    download: "download",
    blog: "blog",

    // Content types
    text: "text",
    audio: "audio",
    video: "video",
    pdf: "pdf",
    quiz: "quiz",
    file: "file",

    // Content privacy types
    unlisted: "unlisted",
    open: "public",

    // Pagination config
    itemsPerPage: process.env.ITEMS_PER_PAGE ? +process.env.ITEMS_PER_PAGE : 20,
    defaultOffset: 1,
    blogPostSnippetLength: 135,

    // Payment methods
    paypal: "paypal",
    stripe: "stripe",
    paytm: "paytm",
    none: "",

    // transaction statuses
    transactionInitiated: "initiated",
    transactionSuccess: "success",
    transactionFailed: "failed",

    // permissions for role-based access
    permissions: {
        manageCourse: "course:manage",
        manageAnyCourse: "course:manage_any",
        publishCourse: "course:publish",
        enrollInCourse: "course:enroll",
        manageMedia: "media:manage",
        manageAnyMedia: "media:manage_any",
        uploadMedia: "media:upload",
        viewAnyMedia: "media:view_any",
        manageSite: "site:manage",
        manageSettings: "setting:manage",
        manageUsers: "user:manage",
    },

    // entry point for the user
    leadWebsite: "website",
    leadNewsletter: "newsletter",

    // log levels
    severityError: "error",
    severityInfo: "info",
    severityWarn: "warn",

    // limits
    mediaRecordsPerPage: 10,

    // user types
    userTypeTeam: "team",
    userTypeCustomer: "customer",
    userTypeNewsletterSubscriber: "subscriber",

    // page types
    product: "product",
    site: "site",
    blogPage: "blog",

    // acceptable currency codes for payments
    currencyISOCodes: [
        "afn",
        "eur",
        "all",
        "dzd",
        "usd",
        "aoa",
        "xcd",
        "ars",
        "amd",
        "awg",
        "aud",
        "azn",
        "bsd",
        "bhd",
        "bdt",
        "bbd",
        "byn",
        "bzd",
        "xof",
        "bmd",
        "inr",
        "btn",
        "bob",
        "bov",
        "bam",
        "bwp",
        "nok",
        "brl",
        "bnd",
        "bgn",
        "bif",
        "cve",
        "khr",
        "xaf",
        "cad",
        "kyd",
        "clp",
        "clf",
        "cny",
        "cop",
        "cou",
        "kmf",
        "cdf",
        "nzd",
        "crc",
        "hrk",
        "cup",
        "cuc",
        "ang",
        "czk",
        "dkk",
        "djf",
        "dop",
        "egp",
        "svc",
        "ern",
        "etb",
        "fkp",
        "fjd",
        "xpf",
        "gmd",
        "gel",
        "ghs",
        "gip",
        "gtq",
        "gbp",
        "gnf",
        "gyd",
        "htg",
        "hnl",
        "hkd",
        "huf",
        "isk",
        "idr",
        "xdr",
        "irr",
        "iqd",
        "ils",
        "jmd",
        "jpy",
        "jod",
        "kzt",
        "kes",
        "kpw",
        "krw",
        "kwd",
        "kgs",
        "lak",
        "lbp",
        "lsl",
        "zar",
        "lrd",
        "lyd",
        "chf",
        "mop",
        "mkd",
        "mga",
        "mwk",
        "myr",
        "mvr",
        "mru",
        "mur",
        "xua",
        "mxn",
        "mxv",
        "mdl",
        "mnt",
        "mad",
        "mzn",
        "mmk",
        "nad",
        "npr",
        "nio",
        "ngn",
        "omr",
        "pkr",
        "pab",
        "pgk",
        "pyg",
        "pen",
        "php",
        "pln",
        "qar",
        "ron",
        "rub",
        "rwf",
        "shp",
        "wst",
        "stn",
        "sar",
        "rsd",
        "scr",
        "sll",
        "sgd",
        "xsu",
        "sbd",
        "sos",
        "ssp",
        "lkr",
        "sdg",
        "srd",
        "szl",
        "sek",
        "che",
        "chw",
        "syp",
        "twd",
        "tjs",
        "tzs",
        "thb",
        "top",
        "ttd",
        "tnd",
        "try",
        "tmt",
        "ugx",
        "uah",
        "aed",
        "usn",
        "uyu",
        "uyi",
        "uyw",
        "uzs",
        "vuv",
        "ves",
        "vnd",
        "yer",
        "zmw",
        "zwl",
        "xba",
        "xbb",
        "xbc",
        "xbd",
        "xts",
        "xxx",
        "xau",
        "xpd",
        "xpt",
        "xag",
    ],
};
