// ===============================
// DID EXPLORER
// ===============================
let didDatabase = [];
const didGuides = {
    "F190": { format: "17 ASCII characters", decode: "62 F1 90 57 30 4C ... means DID F190 followed by ASCII VIN bytes.", note: "A VIN response is often multi-frame over CAN because it contains 17 data bytes." },
    "F187": { format: "OEM-defined ASCII or binary", decode: "62 F1 87 DATA", note: "The part number format and length are defined by the ECU supplier/OEM." },
    "F188": { format: "OEM-defined ASCII or binary", decode: "62 F1 88 DATA", note: "Do not assume a fixed software-number length across ECUs." },
    "F189": { format: "OEM-defined ASCII or binary", decode: "62 F1 89 DATA", note: "This is identification data; it is not necessarily the calibration version." },
    "F18C": { format: "OEM-defined ASCII or binary", decode: "62 F1 8C DATA", note: "The serial number is commonly used for traceability." },
    "F181": { format: "Application identification record", decode: "62 F1 81 DATA", note: "Interpret the record using the OEM's diagnostic specification." },
    "F132": { format: "OEM-defined", decode: "62 F1 32 DATA", note: "This identifier is not portable between manufacturers." },
    "F1A0": { format: "OEM-defined configuration record", decode: "62 F1 A0 DATA", note: "Writing configuration DIDs can change ECU behavior; do so only with approved procedures." }
};
// ===============================
// LOAD DID DATABASE
// ===============================
fetch("database/did.json")
    .then(response => {
        if (!response.ok) {

            throw new Error(
                "DID database not found"
            );

        }
        return response.json();
    })
    .then(data => {
        console.log(
            "DID Database Loaded:",
            data
        );
        didDatabase = data;
        renderDID(didDatabase);
    })
    .catch(error => {
        console.error(
            "DID Loading Error:",
            error
        );
    });
// ===============================
// RENDER DID CARDS
// ===============================
function renderDID(list) {
    const container =

        document.getElementById(
            "didContainer"
        );
    if (!container) {

        console.error(
            "DID container missing"
        );

        return;

    }
    container.innerHTML = "";
    list.forEach((d, index) => {
        container.innerHTML += `
<div class="didCard">
<div class="didHeader"

onclick="toggleDID(${index})">
<div>
<div class="didCode">

0x${d.did}

</div>
<div class="didName">

${d.name}

</div>
</div>
</div>
<div class="didBody"

id="did${index}">
<div class="didSection">
<h4>Description</h4>
<p>

${d.description}

</p>
</div>
<div class="didSection">
<h4>
ECU
</h4>
${d.ecu}
</div>
<div class="didSection">
<h4>
Data Length
</h4>
${d.length}
</div>
<div class="didSection">
<h4>
Access Type
</h4>
${d.access}
</div>
<div class="didSection">
<h4>
UDS Request
</h4>
<div class="codeBox">

22 ${d.did}

</div>
</div>
<div class="didSection">
<h4>
Positive Response
</h4>
<div class="codeBox">

62 ${d.did} DATA

</div>
</div>
<div class="didSection">
<h4>
Example Data
</h4>
<div class="codeBox">

${d.example}

</div>
</div>
${getDIDGuide(d)}
</div>
</div>
`;
    });
}
// ===============================
// EXPAND / COLLAPSE
// ===============================
function toggleDID(i) {
    const body =

        document.getElementById(
            "did" + i
        );
    if (body.style.display === "block") {

        body.style.display = "none";

    }

    else {

        body.style.display = "block";

    }
}
// ===============================
// SEARCH DID
// ===============================
function searchDID() {
    const text =

        document
            .getElementById("didSearch")
            .value
            .toUpperCase();
    const filtered =
        didDatabase.filter(d =>
            d.did.includes(text)

            ||

            d.name.toUpperCase()
                .includes(text)

            ||

            d.ecu.toUpperCase()
                .includes(text)
        );
    renderDID(filtered);
}

function getDIDGuide(did) {
    const guide = didGuides[did.did];
    if (!guide) return "";

    return '<div class="didGuide">' +
        '<div><span>Data format</span><p>' + guide.format + '</p></div>' +
        '<div><span>How to read response</span><code>' + guide.decode + '</code></div>' +
        '<div><span>Diagnostic note</span><p>' + guide.note + '</p></div>' +
        '</div>';
}
