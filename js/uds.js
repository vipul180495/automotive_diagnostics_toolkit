// ===============================
// UDS SERVICE EXPLORER
// ===============================

let udsServices = [];

let udsSubfunctions = [];

const udsServiceGuides = {
    "10": { use: "Selects the diagnostic session that defines which services and functions are available.", example: "10 03 → 50 03 00 32 01 F4", note: "0x01 is default; 0x02 programming; 0x03 extended; 0x04 safety-system session. Session availability is ECU-specific.", nrc: "12, 13, 22, 31" },
    "11": { use: "Requests a controlled ECU reset after the ECU has acknowledged the request.", example: "11 01 → 51 01", note: "Reset types include hard reset (01), key-off/on reset (02), and soft reset (03), if supported.", nrc: "12, 13, 22, 33" },
    "14": { use: "Clears DTC information for the requested DTC group.", example: "14 FF FF FF → 54", note: "FF FF FF commonly requests all groups. Record faults and freeze-frame information before clearing.", nrc: "13, 22, 31, 33, 72" },
    "19": { use: "Reads DTCs, DTC status bits, snapshots, and extended data using a sub-function.", example: "19 02 FF → 59 02 FF ...", note: "0x02 commonly requests DTCs by status mask; the exact supported sub-functions and record formats are ECU-specific.", nrc: "12, 13, 22, 31" },
    "22": { use: "Reads one or more two-byte Data Identifiers (DIDs) and their data records.", example: "22 F1 90 → 62 F1 90 57 30 4C ...", note: "A request can contain multiple DIDs. The response repeats each DID before its data, but the data format is defined by the OEM/supplier.", nrc: "13, 14, 22, 31, 33" },
    "23": { use: "Reads a memory range identified by an address and size.", example: "23 44 00 10 00 00 00 20 → 63 DATA", note: "The AddressAndLengthFormatIdentifier specifies address length in its low nibble and size length in its high nibble. Usually protected.", nrc: "13, 22, 31, 33" },
    "24": { use: "Reads scaling or conversion information for a DID.", example: "24 F1 90 → 64 F1 90 DATA", note: "Many ECUs do not support this service; the scale/units record is implementation-specific.", nrc: "13, 22, 31, 33" },
    "27": { use: "Unlocks a security level through a seed/key exchange before protected operations.", example: "27 01 → 67 01 SEED; 27 02 KEY → 67 02", note: "Odd sub-functions request a seed; the following even value sends the key. Never guess keys on a production ECU.", nrc: "12, 13, 22, 24, 31, 35, 36, 37" },
    "28": { use: "Enables or disables selected normal communication types.", example: "28 03 03 → 68 03", note: "Can prevent an ECU from transmitting/receiving normal messages; use only on a controlled bench.", nrc: "12, 13, 22, 31" },
    "2E": { use: "Writes a data record to a DID.", example: "2E F1 A0 DATA → 6E F1 A0", note: "The server echoes only the DID in a positive response. Writes usually require a session, security access, and vehicle conditions.", nrc: "13, 22, 31, 33, 72" },
    "2F": { use: "Temporarily controls an input/output identified by a DID.", example: "2F DID 03 MASK VALUES → 6F DID 03", note: "Typical controls are return-control-to-ECU, reset-to-default, freeze current state, and short-term adjustment.", nrc: "12, 13, 22, 31, 33" },
    "31": { use: "Starts, stops, or requests results from an ECU routine.", example: "31 01 FF 00 → 71 01 FF 00 STATUS", note: "Routine identifiers and option records are ECU-specific. A routine can respond pending (0x78) while it runs.", nrc: "12, 13, 22, 24, 31, 33, 72, 78" },
    "34": { use: "Begins a download transfer, normally for programming data into the ECU.", example: "34 00 44 ADDRESS SIZE → 74 LENGTHFORMAT MAXBLOCK", note: "Use only with an approved programming sequence, stable supply, and correct bootloader.", nrc: "13, 22, 31, 33, 70" },
    "35": { use: "Begins an upload transfer from an ECU memory range.", example: "35 00 44 ADDRESS SIZE → 75 LENGTHFORMAT MAXBLOCK", note: "Protected memory commonly requires security access.", nrc: "13, 22, 31, 33, 70" },
    "36": { use: "Transfers one numbered block after RequestDownload or RequestUpload.", example: "36 01 DATA → 76 01", note: "The block sequence counter must follow the transfer order; an incorrect counter can cause NRC 0x73.", nrc: "13, 24, 31, 71, 72, 73" },
    "37": { use: "Finishes an active upload or download transfer.", example: "37 → 77", note: "Some ECUs use the optional transfer-response parameter record to report a final result.", nrc: "13, 24, 31, 72" },
    "3E": { use: "Keeps a non-default diagnostic session alive.", example: "3E 00 → 7E 00", note: "0x80 requests suppressing the positive response. Send before the ECU's S3 session timeout.", nrc: "12, 13" },
    "83": { use: "Reads or changes diagnostic timing parameters when the ECU supports it.", example: "83 01 → C3 01 DATA", note: "Timing records are data-link and ECU specific; testers normally use timing reported by service 0x10.", nrc: "12, 13, 22, 31" },
    "85": { use: "Stops or resumes updating DTC status bits.", example: "85 02 → C5 02; 85 01 → C5 01", note: "0x02 freezes DTC status-bit updates; it does not disable fault monitoring or failsafe behavior.", nrc: "12, 13, 22, 31" }
};

// ===============================
// LOAD DATABASES
// ===============================

Promise.all([

    fetch("database/uds.json")
        .then(response => {

            if (!response.ok) {

                throw new Error("uds.json not found");

            }

            return response.json();

        }),
    fetch("database/subfunction.json")
        .then(response => {

            if (!response.ok) {

                throw new Error("subfunction.json not found");

            }

            return response.json();

        })
])
    .then(data => {
        console.log("UDS Database Loaded:", data[0]);

        console.log("Subfunction Database Loaded:", data[1]);
        udsServices = data[0];

        udsSubfunctions = data[1];
        renderUDS(udsServices);
    })
    .catch(error => {
        console.error(
            "Database Loading Error:",
            error
        );
    });
// ===============================
// RENDER UDS CARDS
// ===============================
function renderUDS(list) {
    const container =
        document.getElementById("udsContainer");
    if (!container) {

        console.error(
            "udsContainer not found in HTML"
        );

        return;

    }
    container.innerHTML = "";
    list.forEach((u, index) => {
        container.innerHTML += `
<div class="udsCard">
<div class="udsHeader"

onclick="toggleUDS(${index})">
<div>
<div class="udsSID">

0x${u.sid}

</div>
<div class="udsName">

${u.name}

</div>
</div>

</div>
<div class="udsBody"

id="uds${index}">
<div class="udsSection">
<h4>Description</h4>
<p>

${u.description}

</p>
</div>
<div class="udsSection">
<h4>
Request Format
</h4>
<div class="codeBox">

${u.request}

</div>
</div>
<div class="udsSection">
<h4>
Positive Response
</h4>
<div class="codeBox">

${u.positiveResponse}

</div>
</div>
${getServiceGuide(u)}
<div class="udsSection">
<h4>
Supported Subfunctions
</h4>
${getSubfunctions(u.sid)}
</div>
</div>
</div>
`;
    });
}
// ===============================
// EXPAND / COLLAPSE
// ===============================
function toggleUDS(i) {
    const body =

        document.getElementById(
            "uds" + i
        );
    if (!body) {

        return;

    }
    if (body.style.display === "block") {
        body.style.display = "none";
    }

    else {
        body.style.display = "block";

    }

}
// ===============================
// GET SUBFUNCTIONS
// ===============================
function getSubfunctions(sid) {
    let result =

        udsSubfunctions.find(
            item => item.sid === sid
        );
    if (!result) {
        return `

        <p>
        No subfunctions available
        </p>

        `;
    }
    return `
<ul>
${result.subfunctions.map(sf =>
        `

<li>

<b>0x${sf.id}</b>

-

${sf.name}
</li>
`
    ).join("")
        }
</ul>
`;
}

function getServiceGuide(service) {
    const guide = udsServiceGuides[service.sid];
    if (!guide) return "";

    return '<div class="udsGuide">' +
        '<div><span>Practical use</span><p>' + guide.use + '</p></div>' +
        '<div><span>Example flow</span><code>' + guide.example + '</code></div>' +
        '<div><span>Important note</span><p>' + guide.note + '</p></div>' +
        '<div><span>Common NRCs</span><p>' + guide.nrc + '</p></div>' +
        '</div>';
}
