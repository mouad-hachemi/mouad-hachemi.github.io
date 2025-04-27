import { getColor } from "./js/utils.js";
import projects from "./projects.json" with {type: "json"};
import mySkills from "./skills.json" with {type: "json"};
import links from "./links.json" with {type: "json"};
import internations from "./internationalization.json" with {type: "json"};

let LANG = "en";

const navbar = document.querySelector("nav");
const aboutSection = document.querySelector(".about-me");
const linksSection = document.querySelector(".links");
const projectsGrid = document.querySelector(".my-projects .projects");
const skillsGrid = document.querySelector(".my-skills .categories");
const navToggleBtn = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");
const toggleLang = document.getElementById("toggle-lang");

// Generate Projects Section.
for (const [project, details] of Object.entries(projects)) {
    const projectDiv = document.createElement("div");
    const projectHeaderDiv = document.createElement("div");
    const projectHeader = document.createElement("h2");
    const projectAnchor = document.createElement("a");
    const projectOpenIcon = document.createElement("i");
    const projectDesc = document.createElement("p");

    projectHeader.innerHTML = project;
    projectAnchor.href = details["url"];
    
    // If the project has a repo url attach an icon to open it:
    if (details["url"]) {
        projectOpenIcon.addEventListener("click", (event) => {
            event.preventDefault();
            window.open(projectAnchor.href);
        });
    }

    projectOpenIcon.className = "iconoir-open-new-window";
    projectOpenIcon.appendChild(projectAnchor);

    projectHeaderDiv.appendChild(projectHeader);
    projectHeaderDiv.appendChild(projectOpenIcon);

    projectDiv.appendChild(projectHeaderDiv);
    projectDiv.appendChild(projectDesc);

    projectDiv.className = "project";
    projectsGrid.appendChild(projectDiv);
}

// Generate Skills Sections.
for (const [category, skills] of Object.entries(mySkills)) {
    const categoryDiv = document.createElement("div");
    const categoryTitle = document.createElement("p");

    categoryDiv.className = "skill-category";
    categoryTitle.innerHTML = category;

    categoryDiv.appendChild(categoryTitle);

    for (const skill of skills) {
        const skillDiv = document.createElement("div");
        const skillName = document.createElement("p");

        skillDiv.className = "skill";
        skillName.innerHTML = skill["name"];

        skillDiv.appendChild(skillName);

        const skillPerfection = document.createElement("div");
        skillPerfection.className = "perfection";

        skillPerfection.style.width = skill["perfection"] + "%";
        skillPerfection.style.background = getColor(skill["perfection"]);

        skillDiv.appendChild(skillPerfection);
        categoryDiv.append(skillDiv);
    }
    skillsGrid.append(categoryDiv);
}

injectTexts(LANG);

// Generate Links Sections.
for (const [media, link] of Object.entries(links)) {
    const mediaIcon = document.getElementById(media);
    mediaIcon.addEventListener("click", (event) => {
        window.open(link);
    });
}

// Set Resume Link. 
document.getElementById("my-resume").addEventListener("click", (event) => {
    window.open("./res/cv-en.pdf");
});

navToggleBtn.addEventListener("click", (event) => {
    navLinks.classList.toggle("active");
    navToggleBtn.classList.toggle("active");
});

const navLinksAnchors = navLinks.querySelectorAll("a");
navLinksAnchors.forEach((element) => {
    element.addEventListener("click", (event) => {
        navLinks.classList.toggle("active");
        navToggleBtn.classList.toggle("active");
    });
});

toggleLang.addEventListener("click", (event) => {
    switch (LANG) {
        case "en": {
            LANG = "ar";
            break;
        }
        case "ar": {
            LANG = "en";
            break;
        };
    }
    injectTexts(LANG);
});

function injectTexts(lang = "en") {
    const langTexts = internations[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang == "en" ? "ltr" : "rtl";

    // Set Navbar Text:
    const navbarTexts = langTexts["nav-section"];
    const name = navbar.querySelector(".name");
    const navLinks = navbar.querySelectorAll(".nav-links a");
    name.innerHTML = navbarTexts["name"];
    navLinks.forEach((element, index) => {
        element.innerHTML = navbarTexts["nav-links"][index];
    });
    // Rejustify Navbar Content:
    const navActionsContainer = navbar.querySelector(".actions-container");
    if (lang == "en") {
        navActionsContainer.style.marginLeft = "auto";
        navActionsContainer.style.marginRight = 0;
        navToggleBtn.style.marginLeft = "0.5rem";
        navToggleBtn.style.marginRight = 0;
    } else {
        navActionsContainer.style.marginLeft = 0;
        navActionsContainer.style.marginRight = "auto";
        navToggleBtn.style.marginRight = "0.5rem";
        navToggleBtn.style.marginLeft = 0;
    }

    // Set About Section Text: 
    const aboutTexts = langTexts["about-section"];
    const welcomeHeader = aboutSection.querySelector("h1");
    const resumeParagraph = aboutSection.querySelector("p");

    welcomeHeader.innerHTML = aboutTexts["welcome"];
    resumeParagraph.innerHTML = aboutTexts["resume"];

    // Set Projects Section Text:
    const projectsTexts = langTexts["projects-section"];
    const projectsSectHeader = document.querySelector(".my-projects h1");
    projectsSectHeader.innerHTML = projectsTexts["title"];

    const projectsDivs = projectsGrid.querySelectorAll(".project");
    for (let element of projectsDivs) {
        const projectHeader = element.querySelector("h2");
        const projectParagraph = element.querySelector("p");
        projectParagraph.innerHTML = projects[projectHeader.innerHTML]["description-" + lang];
    }

    // Set Skills Section Text:
    const skillsTexts = langTexts["skills-section"];
    const skillsSectHeader = document.querySelector(".my-skills h1");
    skillsSectHeader.innerHTML = skillsTexts["title"];

    const skillCategories = skillsGrid.querySelectorAll(".skill-category");
    skillCategories.forEach((category, index) => {
        const categoryTitle = category.querySelector("p");
        categoryTitle.innerHTML = skillsTexts["categories"][index];
    });

    // Set Links Section Text:
    const linksTexts = langTexts["links-section"];
    const linksSectParagraph = linksSection.querySelector("p");
    linksSectParagraph.innerHTML = linksTexts["paragraph"];
}