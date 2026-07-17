// ===============================
// DYNAMIC UDS MESSAGE DECODER V2
// ===============================

let decoderUDS = [];
let decoderDID = [];
let decoderNRC = [];
// ===============================
// LOAD DATABASES
// ===============================

Promise.all([

    fetch("database/uds.json").then(r => r.json()),

    fetch("database/did.json").then(r => r.json()),

    fetch("database/nrc.json").then(r => r.json())

])

    .then(data => {

        decoderUDS = data[0];
        decoderDID = data[1];
        decoderNRC = data[2];

        console.log("Decoder databases loaded");

    })

    .catch(error => {

        console.error("Decoder loading error", error);

    });
// ===============================
// MAIN DECODER
// ===============================

function decodeUDS() {

    let input = document
        .getElementById("udsInput")
        .value
        .trim()
        .toUpperCase();

    if (input == "") {

        showDecoder(`
            <div class="decoderCard">

                Please enter a UDS message.

            </div>
        `);

        return;

    }

    let bytes = input.split(/\s+/);

    // ===============================
    // DID LOOKUP
    // ===============================

    if (bytes.length == 1) {

        decodeDIDLookup(bytes[0]);

        return;

    }

    let sid = bytes[0];
    // ===============================
    // NEGATIVE RESPONSE
    // ===============================

    if (sid == "7F") {

        decodeNegativeResponse(bytes);

        return;

    }
    // ===============================
    // POSITIVE RESPONSE
    // ===============================

    const positiveResponses = [

        "50",
        "51",
        "54",
        "59",
        "62",
        "67",
        "6E",
        "71",
        "7E",
        "C5"

    ];

    if (positiveResponses.includes(sid)) {

        decodePositiveResponse(bytes);

        return;

    }
    // ===============================
    // REQUEST DISPATCHER
    // ===============================

    switch (sid) {

        case "10":

            decodeSessionControl(bytes);

            break;

        case "11":

            decodeECUReset(bytes);

            break;

        case "14":

            decodeClearDTC(bytes);

            break;

        case "19":

            decodeReadDTC(bytes);

            break;

        case "22":

            decodeReadDID(bytes);

            break;

        case "27":

            decodeSecurityAccess(bytes);

            break;

        case "2E":

            decodeWriteDID(bytes);

            break;

        case "31":

            decodeRoutineControl(bytes);

            break;

        case "3E":

            decodeTesterPresent(bytes);

            break;

        case "85":

            decodeControlDTC(bytes);

            break;

        default:

            decodeGeneric(bytes);

    }

}
// ===============================
// REQUEST DECODERS
// ===============================
// --------------------------------
// 0x10 Diagnostic Session Control
// --------------------------------

function decodeSessionControl(bytes) {

    let sessions = {

        "01": "Default Session",

        "02": "Programming Session",

        "03": "Extended Diagnostic Session",

        "04": "Safety System Diagnostic Session"

    };

    let sub = bytes[1] || "--";

    showService(

        "Diagnostic Session Control",

        "0x10",

        sessions[sub] || "Unknown Session",

        bytes.join(" "),

        `50 ${sub}`

    );

}
// --------------------------------
// 0x11 ECU Reset
// --------------------------------

function decodeECUReset(bytes) {

    let resets = {

        "01": "Hard Reset",

        "02": "Key Off On Reset",

        "03": "Soft Reset",

        "04": "Enable Rapid Power Shutdown",

        "05": "Disable Rapid Power Shutdown"

    };

    let sub = bytes[1] || "--";

    showService(

        "ECU Reset",

        "0x11",

        resets[sub] || "Unknown Reset Type",

        bytes.join(" "),

        `51 ${sub}`

    );

}
// --------------------------------
// 0x14 Clear Diagnostic Information
// --------------------------------

function decodeClearDTC(bytes) {

    let group = "";

    if (bytes.length >= 4) {

        group = bytes.slice(1).join(" ");

    }

    else {

        group = "FFFFFF";

    }

    showService(

        "Clear Diagnostic Information",

        "0x14",

        `DTC Group : ${group}`,

        bytes.join(" "),

        "54"

    );

}
// --------------------------------
// 0x19 Read DTC Information
// --------------------------------

function decodeReadDTC(bytes) {

    let subFunctions = {

        "01": "Report Number Of DTC By Status Mask",

        "02": "Report DTC By Status Mask",

        "04": "Report DTC Snapshot",

        "06": "Report Extended Data",

        "0A": "Report Supported DTC"

    };

    let sub = bytes[1] || "--";

    showService(

        "Read DTC Information",

        "0x19",

        subFunctions[sub] || "Unknown SubFunction",

        bytes.join(" "),

        `59 ${sub} DATA`

    );

}
// --------------------------------
// 0x22 Read Data By Identifier
// --------------------------------

function decodeReadDID(bytes) {

    let didCode = "";

    let didName = "Unknown DID";

    if (bytes.length >= 3) {

        didCode = bytes[1] + bytes[2];

        let did = decoderDID.find(

            d => d.did.toUpperCase() == didCode

        );

        if (did) {

            didName = did.name;

        }

    }

    showService(

        "Read Data By Identifier",

        "0x22",

        `${didCode} - ${didName}`,

        bytes.join(" "),

        `62 ${bytes[1]} ${bytes[2]} DATA`

    );

}
// --------------------------------
// 0x27 Security Access
// --------------------------------

function decodeSecurityAccess(bytes) {

    let level = {

        "01": "Request Seed Level 1",

        "02": "Send Key Level 1",

        "03": "Request Seed Level 2",

        "04": "Send Key Level 2",

        "05": "Request Seed Level 3",

        "06": "Send Key Level 3"

    };

    let sub = bytes[1] || "--";

    let response = "";

    if (parseInt(sub, 16) % 2) {

        response = `67 ${sub} SEED`;

    }

    else {

        response = `67 ${sub}`;

    }

    showService(

        "Security Access",

        "0x27",

        level[sub] || "Unknown Level",

        bytes.join(" "),

        response

    );

}
// --------------------------------
// 0x2E Write Data By Identifier
// --------------------------------

function decodeWriteDID(bytes) {

    let didCode = "";

    let didName = "Unknown DID";

    if (bytes.length >= 3) {

        didCode = bytes[1] + bytes[2];

        let did = decoderDID.find(

            d => d.did.toUpperCase() == didCode

        );

        if (did) {

            didName = did.name;

        }

    }

    showService(

        "Write Data By Identifier",

        "0x2E",

        `${didCode} - ${didName}`,

        bytes.join(" "),

        `6E ${bytes[1]} ${bytes[2]}`

    );

}
// --------------------------------
// 0x31 Routine Control
// --------------------------------

function decodeRoutineControl(bytes) {

    let type = {

        "01": "Start Routine",

        "02": "Stop Routine",

        "03": "Request Routine Results"

    };

    let sub = bytes[1] || "--";

    let routine = "";

    if (bytes.length >= 4) {

        routine = bytes[2] + bytes[3];

    }

    showService(

        "Routine Control",

        "0x31",

        `${type[sub] || "Unknown"} (${routine})`,

        bytes.join(" "),

        `71 ${sub} ${bytes[2]} ${bytes[3]}`

    );

}
// --------------------------------
// 0x3E Tester Present
// --------------------------------

function decodeTesterPresent(bytes) {

    let sub = bytes[1] || "00";

    showService(

        "Tester Present",

        "0x3E",

        "Keep ECU Diagnostic Session Alive",

        bytes.join(" "),

        `7E ${sub}`

    );

}
// --------------------------------
// 0x85 Control DTC Setting
// --------------------------------

function decodeControlDTC(bytes) {

    let subFunctions = {

        "01": "ON",

        "02": "OFF"

    };

    let sub = bytes[1] || "--";

    showService(

        "Control DTC Setting",

        "0x85",

        subFunctions[sub] || "Unknown",

        bytes.join(" "),

        `C5 ${sub}`

    );

}
// --------------------------------
// Unknown Service
// --------------------------------

function decodeGeneric(bytes) {

    showDecoder(`

<div class="decoderCard">

<div class="decoderSection">

<h4>Unknown Service</h4>

0x${bytes[0]}

</div>

<div class="decoderSection">

<h4>Raw Message</h4>

<div class="hexBox">

${bytes.join(" ")}

</div>

</div>

</div>

`);

}
// ===============================
// RESPONSE DECODERS
// ===============================
// --------------------------------
// NEGATIVE RESPONSE 0x7F
// --------------------------------

function decodeNegativeResponse(bytes) {

    let rejectedSID = bytes[1];

    let nrcCode = bytes[2];
    let nrc = decoderNRC.find(

        n => n.code.toUpperCase() == nrcCode

    );
    showDecoder(`

<div class="decoderCard">
<div class="decoderSection">

<h4>
Message Type
</h4>

Negative Response

</div>
<div class="decoderSection">

<h4>
Rejected Service
</h4>

0x${rejectedSID}

</div>
<div class="decoderSection">

<h4>
NRC
</h4>
0x${nrcCode}

<br>

${nrc ?

            nrc.name

            :

            "Unknown NRC"

        }

</div>
<div class="decoderSection">

<h4>
Raw Response
</h4>

<div class="hexBox">

${bytes.join(" ")}

</div>
</div>
</div>

`);

}
// --------------------------------
// POSITIVE RESPONSE DECODER
// --------------------------------

function decodePositiveResponse(bytes) {
    let sid = bytes[0];

    let originalSID = "";

    let serviceName = "";

    let details = "";
    // Diagnostic Session

    if (sid == "50") {

        originalSID = "10";

        serviceName = "Diagnostic Session Control";

        let session = bytes[1];
        let sessions = {

            "01": "Default Session",

            "02": "Programming Session",

            "03": "Extended Diagnostic Session",

            "04": "Safety System Diagnostic Session"

        };
        details = sessions[session] || "Unknown Session";

    }
    // ECU Reset

    else if (sid == "51") {
        originalSID = "11";

        serviceName = "ECU Reset";

        details = "Reset Type : " + bytes[1];

    }
    // Clear DTC

    else if (sid == "54") {
        originalSID = "14";

        serviceName = "Clear Diagnostic Information";

        details = "DTC Clear Successful";

    }
    // Read DTC

    else if (sid == "59") {
        originalSID = "19";

        serviceName = "Read DTC Information";

        details = "DTC Data Returned";

    }
    // Read DID

    else if (sid == "62") {
        originalSID = "22";

        serviceName = "Read Data By Identifier";
        let didCode = "";
        if (bytes.length >= 3) {

            didCode = bytes[1] + bytes[2];

        }
        let did = decoderDID.find(

            d => d.did.toUpperCase() == didCode

        );
        details =

            `DID : ${didCode}

    <br>

    ${did ?

                did.name :

                "Unknown DID"

            }

    <br><br>

    Data:

    ${bytes.slice(3).join(" ")

            }

    `;
    }
    // Security Access

    else if (sid == "67") {
        originalSID = "27";

        serviceName = "Security Access";
        let sub = bytes[1];
        if (parseInt(sub, 16) % 2) {

            details =

                "Seed Received : " +

                bytes.slice(2).join(" ");

        }

        else {

            details =

                "Key Accepted";

        }

    }
    // Write DID

    else if (sid == "6E") {
        originalSID = "2E";

        serviceName = "Write Data By Identifier";
        details =

            "DID Write Successful";

    }
    // Routine Control

    else if (sid == "71") {
        originalSID = "31";

        serviceName = "Routine Control";
        details =

            "Routine Response : " +

            bytes.slice(1).join(" ");

    }
    // Tester Present

    else if (sid == "7E") {
        originalSID = "3E";

        serviceName = "Tester Present";
        details = "ECU Alive Response";

    }
    // Control DTC

    else if (sid == "C5") {
        originalSID = "85";

        serviceName = "Control DTC Setting";
        details = "DTC Setting Updated";

    }
    // Unknown Response

    else {
        serviceName = "Unknown Positive Response";

        details =

            bytes.join(" ");

    }
    showDecoder(`
<div class="decoderCard">
<div class="decoderSection">

<h4>
Message Type
</h4>

Positive Response

</div>
<div class="decoderSection">

<h4>
Original Service
</h4>

0x${originalSID}

<br>

${serviceName}

</div>
<div class="decoderSection">

<h4>
Information
</h4>

${details}

</div>
<div class="decoderSection">

<h4>
Raw Response
</h4>

<div class="hexBox">

${bytes.join(" ")}

</div>
</div>
</div>
`);
}
// ===============================
// SERVICE DISPLAY TEMPLATE
// ===============================

function showService(
    name,
    sid,
    description,
    request,
    response
) {
    showDecoder(`
<div class="decoderCard">
<div class="decoderSection">

<h4>
Service
</h4>

${sid}

<br>

${name}

</div>
<div class="decoderSection">

<h4>
Description
</h4>

${description}

</div>
<div class="decoderSection">

<h4>
Request
</h4>
<div class="hexBox">

${request}

</div>
</div>
<div class="decoderSection">

<h4>
Expected Positive Response
</h4>
<div class="hexBox">

${response}

</div>
</div>
</div>
`);
}
// ===============================
// DID SMART LOOKUP
// ===============================
function decodeDIDLookup(searchValue) {
    let search = searchValue
        .replace("0X", "")
        .toUpperCase();
    let did = decoderDID.find(d => {
        let code = d.did
            .replace("0X", "")
            .toUpperCase();
        return (

            code === search ||

            code.endsWith(search)

        );
    });
    // VIN / NAME SEARCH

    if (!did) {
        did = decoderDID.find(d => {
            return d.name
                .toUpperCase()
                .includes(search);
        });
    }
    if (!did) {
        showDecoder(`
<div class="decoderCard">
<div class="decoderSection">

<h4>

DID Search

</h4>
Unknown DID:

${searchValue}
</div>
</div>
`);
        return;
    }
    showDecoder(`
<div class="decoderCard">
<div class="decoderSection">

<h4>
Type
</h4>

DID Lookup

</div>
<div class="decoderSection">

<h4>
DID
</h4>
0x${did.did}
</div>
<div class="decoderSection">

<h4>
Name
</h4>
${did.name}
</div>
<div class="decoderSection">

<h4>
Description
</h4>
${did.description ?

            did.description :

            "No description available"

        }
</div>
<div class="decoderSection">

<h4>
Request
</h4>
<div class="hexBox">
22 ${did.did.substring(0, 2)} ${did.did.substring(2, 4)}
</div>
</div>
<div class="decoderSection">

<h4>
Expected Positive Response
</h4>
<div class="hexBox">
62 ${did.did.substring(0, 2)} ${did.did.substring(2, 4)} DATA
</div>
</div>
</div>
`);
}
// ===============================
// DISPLAY FUNCTION
// ===============================
function showDecoder(html) {
    let output = document
        .getElementById("decoderResult");
    if (output) {
        output.innerHTML = html;
    }

    else {
        console.error(
            "decoderResult element missing"
        );
    }
}