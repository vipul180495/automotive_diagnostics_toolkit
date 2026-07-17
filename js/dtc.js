let dtcDatabase = [];

fetch("database/dtc.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("DTC database not found");
        }
        return response.json();
    })
    .then(data => {
        dtcDatabase = data;
        renderDTC(dtcDatabase);
    })
    .catch(error => {
        console.error("DTC loading error:", error);
        document.getElementById("dtcContainer").textContent =
            "Could not load the DTC database.";
    });

function renderDTC(list) {
    const container = document.getElementById("dtcContainer");
    container.innerHTML = "";

    list.forEach((dtc, index) => {
        const card = document.createElement("article");
        card.className = "dtcCard";

        const header = document.createElement("button");
        header.className = "dtcHeader";
        header.type = "button";
        header.setAttribute("aria-expanded", "false");

        const heading = document.createElement("div");

        const code = document.createElement("span");
        code.className = "dtcCode";
        code.textContent = dtc.code;

        const title = document.createElement("h3");
        title.textContent = dtc.title;

        const module = document.createElement("span");
        module.className = "dtcModule";
        module.textContent = `Module: ${dtc.module || "Not specified"}`;

        heading.append(code, title, module);

        const arrow = document.createElement("span");
        arrow.className = "dtcArrow";
        arrow.textContent = "⌄";

        header.append(heading, arrow);

        const body = document.createElement("div");
        body.className = "dtcBody";
        body.id = `dtc-${index}`;

        const description = document.createElement("p");
        description.className = "dtcDescription";
        description.textContent = dtc.description || "";
        body.appendChild(description);

        if (dtc.toolUrl) {
            const toolLink = document.createElement("a");
            toolLink.className = "dtcToolButton";
            toolLink.href = dtc.toolUrl;
            toolLink.target = "_blank";
            toolLink.rel = "noopener noreferrer";
            toolLink.textContent = `🔗 ${dtc.toolTitle || "Open diagnostic tool"}`;
            body.appendChild(toolLink);
        }

        if (dtc.procedure?.length) {
            const procedureTitle = document.createElement("h4");
            procedureTitle.textContent = "Recommended procedure";

            const steps = document.createElement("ol");
            steps.className = "dtcSteps";

            dtc.procedure.forEach(step => {
                const item = document.createElement("li");
                item.textContent = step;
                steps.appendChild(item);
            });

            body.append(procedureTitle, steps);
        }

        header.addEventListener("click", () => {
            const isOpen = card.classList.toggle("open");
            header.setAttribute("aria-expanded", String(isOpen));
        });

        card.append(header, body);
        container.appendChild(card);
    });
}