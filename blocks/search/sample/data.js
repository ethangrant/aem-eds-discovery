const sampleData = [
  {"path": "/content/aem-eds-discovery/", "lastModified": 1728629443, "robots": "", "lastPublished": "2024-10-11T06:50:43.488Z", "title": "", "description": ""},
  {"path": "/content/aem-eds-discovery/footer", "lastModified": 1728629442, "robots": "", "lastPublished": "2024-10-11T06:50:42.167Z", "title": "", "description": ""},
  {"path": "/content/aem-eds-discovery/nav", "lastModified": 1728629445, "robots": "", "lastPublished": "2024-10-11T06:50:44.842Z", "title": "", "description": ""},
  {"path": "/", "title": "Index", "description": "CHAGED CONTENT FOR DEV BRANCH An independent audit is more than a basic compliance exercise. Done correctly, it helps mitigate risk, but can also provide ...", "lastModified": 1733842428, "robots": "", "lastPublished": "2024-12-10T14:53:47.861Z"},
  {"path": "/footer", "lastModified": 1728676578, "robots": "", "lastPublished": "2024-10-11T19:56:17.694Z", "title": "", "description": ""},
  {"path": "/nav", "lastModified": 1729159107, "robots": "", "lastPublished": "2024-10-17T09:58:27.228Z", "title": "", "description": ""},
  {"path": "/content/aem-eds-discovery", "lastModified": 1729159025, "robots": "", "lastPublished": "2024-10-17T09:57:04.832Z", "title": "", "description": ""},
  {"path": "/mega-menu", "lastModified": 1731963208, "robots": "", "lastPublished": "2024-11-18T20:53:28.473Z", "title": "", "description": ""},
  {"path": "/menu-block-test", "lastModified": 1733158668, "robots": "", "lastPublished": "2024-12-02T16:57:48.627Z", "title": "", "description": ""},
  {"path": "/style-guide/primary-colours", "lastModified": 1732832276, "robots": "", "lastPublished": "2024-11-28T22:17:56.031Z", "title": "", "description": ""},
  {"path": "/style-guide/titles", "lastModified": 1733081945, "robots": "", "lastPublished": "2024-12-01T19:39:05.071Z", "title": "", "description": ""},
  {"path": "/tax-audits", "title": "Tax Audits", "description": "Some description about tax audits", "lastModified": 1733518544, "robots": "", "lastPublished": "2024-12-06T20:55:43.995Z"},
  {"path": "/what-we-offer", "title": "What we Offer", "description": "Some description about what we offer", "lastModified": 1733518545, "robots": "", "lastPublished": "2024-12-06T20:55:45.542Z"},
  {"path": "/search", "title": "Search", "description": "", "lastModified": 1734121669, "robots": "", "lastPublished": "2024-12-13T20:27:48.890Z"},
  {"path": "/tax-preparation", "title": "Tax Preparation", "description": "Details about preparing your taxes effectively.", "lastModified": 1734200000, "robots": "", "lastPublished": "2024-12-14T10:00:00.000Z"},
  {"path": "/tax-compliance", "title": "Tax Compliance", "description": "Information on staying compliant with tax laws.", "lastModified": 1734200500, "robots": "", "lastPublished": "2024-12-14T11:00:00.000Z"},
  {"path": "/tax-planning", "title": "Tax Planning", "description": "Strategies for efficient tax planning.", "lastModified": 1734201000, "robots": "", "lastPublished": "2024-12-14T12:00:00.000Z"},
  {"path": "/tax-reforms-2024", "title": "Tax Reforms 2024", "description": "Key insights into tax reforms for 2024.", "lastModified": 1734201500, "robots": "", "lastPublished": "2024-12-14T13:00:00.000Z"},
  {"path": "/international-taxation", "title": "International Taxation", "description": "Understanding international tax laws and regulations.", "lastModified": 1734202000, "robots": "", "lastPublished": "2024-12-14T14:00:00.000Z"},
  {"path": "/corporate-tax-services", "title": "Corporate Tax Services", "description": "Comprehensive solutions for corporate taxes.", "lastModified": 1734202500, "robots": "", "lastPublished": "2024-12-14T15:00:00.000Z"},
  {"path": "/individual-tax-services", "title": "Individual Tax Services", "description": "Personalized tax services for individuals.", "lastModified": 1734203000, "robots": "", "lastPublished": "2024-12-14T16:00:00.000Z"},
  {"path": "/tax-relief-programs", "title": "Tax Relief Programs", "description": "Information on programs designed to provide tax relief.", "lastModified": 1734203500, "robots": "", "lastPublished": "2024-12-14T17:00:00.000Z"},
  {"path": "/tax-law-updates", "title": "Tax Law Updates", "description": "Stay updated on the latest tax law changes.", "lastModified": 1734204000, "robots": "", "lastPublished": "2024-12-14T18:00:00.000Z"},
  {"path": "/estate-tax-planning", "title": "Estate Tax Planning", "description": "Guide to managing estate taxes effectively.", "lastModified": 1734204500, "robots": "", "lastPublished": "2024-12-14T19:00:00.000Z"},
  {"path": "/tax-deduction-guide", "title": "Tax Deduction Guide", "description": "Maximize your deductions with this guide.", "lastModified": 1734205000, "robots": "", "lastPublished": "2024-12-14T20:00:00.000Z"},
  {"path": "/tax-credit-overview", "title": "Tax Credit Overview", "description": "Comprehensive overview of available tax credits.", "lastModified": 1734205500, "robots": "", "lastPublished": "2024-12-14T21:00:00.000Z"},
  {"path": "/small-business-tax-tips", "title": "Small Business Tax Tips", "description": "Tax tips tailored for small businesses.", "lastModified": 1734206000, "robots": "", "lastPublished": "2024-12-14T22:00:00.000Z"},
  {"path": "/freelancer-tax-resources", "title": "Freelancer Tax Resources", "description": "Essential resources for freelancers to manage taxes.", "lastModified": 1734206500, "robots": "", "lastPublished": "2024-12-14T23:00:00.000Z"},
  {"path": "/property-tax-insights", "title": "Property Tax Insights", "description": "Gain insights into managing property taxes.", "lastModified": 1734207000, "robots": "", "lastPublished": "2024-12-15T00:00:00.000Z"},
  {"path": "/retirement-tax-planning", "title": "Retirement Tax Planning", "description": "Plan taxes effectively for your retirement.", "lastModified": 1734207500, "robots": "", "lastPublished": "2024-12-15T01:00:00.000Z"},
  {"path": "/nonprofit-tax-exemptions", "title": "Nonprofit Tax Exemptions", "description": "Details on tax exemptions for nonprofits.", "lastModified": 1734208000, "robots": "", "lastPublished": "2024-12-15T02:00:00.000Z"},
  {"path": "/tax-audit-defense", "title": "Tax Audit Defense", "description": "Resources to help you navigate a tax audit.", "lastModified": 1734208500, "robots": "", "lastPublished": "2024-12-15T03:00:00.000Z"},
  {"path": "/expat-tax-advice", "title": "Expat Tax Advice", "description": "Essential tax advice for expatriates.", "lastModified": 1734209000, "robots": "", "lastPublished": "2024-12-15T04:00:00.000Z"},
  {"path": "/crypto-tax-guidelines", "title": "Crypto Tax Guidelines", "description": "Understand tax implications for cryptocurrencies.", "lastModified": 1734209500, "robots": "", "lastPublished": "2024-12-15T05:00:00.000Z"},
  {"path": "/self-employed-tax-filing", "title": "Self-Employed Tax Filing", "description": "Filing taxes for self-employed individuals.", "lastModified": 1734210000, "robots": "", "lastPublished": "2024-12-15T06:00:00.000Z"},
  {"path": "/tax-penalty-avoidance", "title": "Tax Penalty Avoidance", "description": "Tips to avoid common tax penalties.", "lastModified": 1734210500, "robots": "", "lastPublished": "2024-12-15T07:00:00.000Z"}
];

export default sampleData;