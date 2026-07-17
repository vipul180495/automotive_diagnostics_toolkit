// ===============================
// USEFUL LINKS DATABASE
// ===============================
/*let allLinks = [];
// Load Links
fetch("database/links.json")
    .then(response => response.json())
    .then(data => {
        allLinks = data;
        renderLinks(allLinks);
    })

    .catch(error => {
        console.error(
            "Links loading error",
            error
        );
    });
// Render Links
function renderLinks(list) {
    let container =

        document.getElementById(
            "linksContainer"
        );
    container.innerHTML = "";
    list.forEach(link => {
        container.innerHTML += `
<div class="linkCard">
<h3>

${link.title}

</h3>
<div class="linkCategory">

Category:
${link.category}

</div>
<a 

class="linkButton"

href="${link.url}"

target="_blank">

Open Link

</a>
</div>
`;
    });
}
// Search Links
function searchLinks() {
    let text =
        document

            .getElementById(
                "linkSearch"
            )

            .value

            .toUpperCase();
    let filtered =
        allLinks.filter(link =>
            link.title

                .toUpperCase()

                .includes(text)
            ||
            link.category

                .toUpperCase()

                .includes(text)
        );
    renderLinks(filtered);
}*/
let allLinks = [];

fetch("database/links.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Links database not found");
        }
        return response.json();
    })
    .then(data => {
        allLinks = data;
        renderLinks(allLinks);
    })
    .catch(error => {
        console.error("Links loading error:", error);
        document.getElementById("linksContainer").textContent =
            "Could not load useful links.";
    });

function renderLinks(list) {
    const container = document.getElementById("linksContainer");
    container.innerHTML = "";

    if (list.length === 0) {
        container.textContent = "No links found.";
        return;
    }

    list.forEach(link => {
        const card = document.createElement("div");
        card.className = "linkCard";

        const title = document.createElement("h3");
        title.textContent = link.title;

        const category = document.createElement("div");
        category.className = "linkCategory";
        category.textContent = `Category: ${link.category || "General"}`;

        const anchor = document.createElement("a");
        anchor.className = "linkButton";
        anchor.href = link.url;
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
        anchor.textContent = "Open Link";

        card.append(title, category, anchor);
        container.appendChild(card);
    });
}

function searchLinks() {
    const text = document
        .getElementById("linkSearch")
        .value
        .trim()
        .toUpperCase();

    const filtered = allLinks.filter(link =>
        link.title.toUpperCase().includes(text) ||
        (link.category || "").toUpperCase().includes(text)
    );

    renderLinks(filtered);
}