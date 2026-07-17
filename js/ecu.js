// ===============================
// ECU MODULE EXPLORER
// ===============================
let ecuDatabase = [];
// ===============================
// LOAD ECU DATABASE
// ===============================
fetch("database/ecu.json")
    .then(response => {
        if (!response.ok) {

            throw new Error(
                "ECU database not found"
            );

        }
        return response.json();
    })
    .then(data => {
        console.log(
            "ECU Database Loaded:",
            data
        );
        ecuDatabase = data;
        renderECU(ecuDatabase);
    })
    .catch(error => {
        console.error(
            "ECU Loading Error:",
            error
        );
    });
// ===============================
// RENDER ECU CARDS
// ===============================
function renderECU(list) {
    const container =

        document.getElementById(
            "ecuContainer"
        );
    if (!container) {

        console.error(
            "ECU container missing"
        );

        return;

    }
    container.innerHTML = "";
    list.forEach((e, index) => {
        container.innerHTML += `
<div class="ecuCard">
<div class="ecuHeader"

onclick="toggleECU(${index})">
<div>
<div class="ecuCode">

${e.code}

</div>
<div class="ecuName">

${e.name}

</div>
</div>
<div class="ecuCategory">

${e.category}

</div>
</div>
<div class="ecuBody"

id="ecu${index}">
<div class="ecuSection">
<h4>
Module Code
</h4>
${e.code}
</div>
<div class="ecuSection">
<h4>
Module Name
</h4>
${e.name}
</div>
<div class="ecuSection">
<h4>
Category
</h4>
${e.category}
</div>
<div class="ecuSection">
<h4>
Common UDS Services
</h4>
<ul>

<li>0x10 Diagnostic Session Control</li>

<li>0x19 Read DTC Information</li>

<li>0x22 Read Data By Identifier</li>

<li>0x14 Clear Diagnostic Information</li>

</ul>
</div>
</div>
</div>
`;
    });
}
// ===============================
// EXPAND / COLLAPSE
// ===============================
function toggleECU(i) {
    const body =

        document.getElementById(
            "ecu" + i
        );
    if (body.style.display === "block") {

        body.style.display = "none";

    }

    else {

        body.style.display = "block";

    }
}
// ===============================
// SEARCH ECU
// ===============================
function searchECU() {
    const text =

        document
            .getElementById("ecuSearch")
            .value
            .toUpperCase();
    const filtered =
        ecuDatabase.filter(e =>
            e.code.toUpperCase()
                .includes(text)
            ||

            e.name.toUpperCase()
                .includes(text)
            ||

            e.category.toUpperCase()
                .includes(text)
        );
    renderECU(filtered);
}