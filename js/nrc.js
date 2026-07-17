// ===============================
// NRC EXPLORER
// ===============================
let nrcDatabase = [];
const nrcExamples = {
    "13": { request: "22 F1", response: "7F 22 13", meaning: "The request has an incomplete DID: service 0x22 needs two DID bytes." },
    "14": { request: "22 F1 90 F1 87 ...", response: "7F 22 14", meaning: "The requested response would exceed the transport/protocol limit." },
    "21": { request: "31 01 FF 00", response: "7F 31 21", meaning: "The ECU is busy; retry only according to the tester/ECU timing strategy." },
    "22": { request: "11 01", response: "7F 11 22", meaning: "A precondition is not met, such as ignition, vehicle state, voltage, or session." },
    "24": { request: "27 02 KEY", response: "7F 27 24", meaning: "A key was sent before requesting a seed, or a service sequence is invalid." },
    "31": { request: "22 F1 FF", response: "7F 22 31", meaning: "The DID is unsupported, unavailable in this session, or outside the ECU's range." },
    "33": { request: "2E F1 A0 DATA", response: "7F 2E 33", meaning: "The DID is protected and the required security level is still locked." },
    "35": { request: "27 02 00 00", response: "7F 27 35", meaning: "The ECU calculated/checked a different key for the issued seed." },
    "36": { request: "27 01", response: "7F 27 36", meaning: "Too many invalid-key attempts have activated the security delay." },
    "37": { request: "27 01", response: "7F 27 37", meaning: "Wait for the ECU's required security delay before retrying." },
    "70": { request: "34 00 44 ADDRESS SIZE", response: "7F 34 70", meaning: "The programming request was not accepted for the address, size, or ECU state." },
    "71": { request: "36 02 DATA", response: "7F 36 71", meaning: "An active data transfer was suspended." },
    "72": { request: "36 02 DATA", response: "7F 36 72", meaning: "A programming failure occurred during the requested operation." },
    "73": { request: "36 05 DATA", response: "7F 36 73", meaning: "The TransferData block sequence counter is not the expected value." },
    "78": { request: "31 01 FF 00", response: "7F 31 78", meaning: "The ECU accepted the request but needs more time; wait for its final response." },
    "7E": { request: "10 01", response: "7F 10 7E", meaning: "The service exists, but this sub-function is unavailable in the current session." },
    "7F": { request: "34 00 44 ADDRESS SIZE", response: "7F 34 7F", meaning: "The service is unavailable in the active diagnostic session." }
};
// Load NRC Database

fetch("database/nrc.json")
    .then(response => response.json())
    .then(data => {
        console.log(
            "NRC Database Loaded",
            data
        );
        nrcDatabase = data;
        renderNRC(nrcDatabase);
    })
    .catch(error => {
        console.error(
            "NRC Loading Error",
            error
        );
    });
// Render NRC Cards
function renderNRC(list) {
    const container =
        document.getElementById("nrcContainer");
    if (!container) {

        console.error(
            "NRC Container Missing"
        );

        return;

    }
    container.innerHTML = "";
    list.forEach((n, index) => {
        container.innerHTML += `
<div class="nrcCard">
<div class="nrcHeader"

onclick="toggleNRC(${index})">
<div class="nrcCode">

0x${n.code}

</div>
<div class="nrcName">

${n.name}

</div>
</div>
<div class="nrcBody"

id="nrc${index}">
<div class="nrcSection">
<h4>
Description
</h4>
<p>

${n.description}

</p>
</div>
<div class="nrcSection">
<h4>
Common Causes
</h4>
<ul>
${n.commonCause.map(c =>

            `<li>${c}</li>`

        ).join("")

            }
</ul>
</div>
<div class="nrcSection">
<h4>
Troubleshooting
</h4>
<ul>
${n.solution.map(s =>

                `<li>${s}</li>`

            ).join("")

            }
</ul>
</div>
${getNRCExample(n)}
</div>
</div>
`;
    });
}
// Expand / Collapse
function toggleNRC(i) {
    const body =

        document.getElementById(
            "nrc" + i
        );
    if (body.style.display === "block") {

        body.style.display = "none";

    }

    else {

        body.style.display = "block";

    }
}
// Search
function searchNRC() {
    const text =

        document
            .getElementById("nrcSearch")
            .value
            .toUpperCase();
    const filtered =

        nrcDatabase.filter(n =>

            n.code.includes(text)

            ||

            n.name.toUpperCase().includes(text)

        );
    renderNRC(filtered);
}

function getNRCExample(nrc) {
    const example = nrcExamples[nrc.code];
    if (!example) return "";
    return '<div class="nrcExample">' +
        '<span>Message example</span><code>Request: ' + example.request + '<br>Response: ' + example.response + '</code>' +
        '<p>' + example.meaning + '</p></div>';
}
