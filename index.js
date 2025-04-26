import projects from "./projects.json" with {type: "json"};
import mySkills from "./skills.json" with {type: "json"};
import links from "./links.json" with {type: "json"};

const getColor = (num) => {
    if (num >= 80) {
        return "#0077b6";
    } else if (num >= 60) {
        return "#57cc99";
    } else if (num >= 45) {
        return "#f77f00";
    } else {
        return "#d90429";
    }
}

// Generate Projects Section.
const projectsGrid = document.querySelector(".my-projects .projects");
for (const [project, details] of Object.entries(projects)) {
    const projectDiv = document.createElement("div");
    const projectTitle = document.createElement("h2");
    const projectAnchor = document.createElement("a");
    const projectDesc = document.createElement("p");

    projectAnchor.href = details["url"];
    projectAnchor.innerHTML = project;
    projectAnchor.addEventListener("click", (event) => {
        event.preventDefault();
        window.open(event.target.href);
    });
    projectTitle.appendChild(projectAnchor);

    projectDesc.innerHTML = details["description"];

    projectDiv.appendChild(projectTitle);
    projectDiv.appendChild(projectDesc);

    projectDiv.className = "project";
    projectsGrid.appendChild(projectDiv);
}

// Generate Skills Sections.
const skillsGrid = document.querySelector(".my-skills .categories");
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

// Generate Links Sections.
for (const [media, link] of Object.entries(links)) {
    const mediaIcon = document.getElementById(media);
    mediaIcon.addEventListener("click", (event) => {
        window.open(link);
    });
}

const navToggleBtn = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");
navToggleBtn.addEventListener("click", (event) => {
    navLinks.classList.toggle("active");
    navToggleBtn.classList.toggle("active");
});