// ===============================
// CAN ENGINEERING TOOLBOX
// ===============================
function decodeCAN() {
    let id =

        document
            .getElementById("canID")
            .value
            .trim()
            .toUpperCase();
    let data =

        document
            .getElementById("canData")
            .value
            .trim()
            .toUpperCase();
    let bytes = data.split(" ");
    let output = `
<div class="canCard">
<div class="canSection">

<h4>
CAN ID
</h4>
0x${id}
</div>
<div class="canSection">

<h4>
CAN ID Decimal
</h4>
${parseInt(id, 16)}
</div>
<div class="canSection">

<h4>
Data Length
</h4>
${bytes.length} Bytes
</div>
<div class="canSection">

<h4>
Byte Analysis
</h4>
<table class="byteTable">
<tr>

<td>Index</td>

<td>HEX</td>

<td>Decimal</td>

<td>Binary</td>

<td>ASCII</td>

</tr>
`;
    bytes.forEach((b, index) => {
        let decimal =

            parseInt(b, 16);
        let binary =

            decimal

                .toString(2)

                .padStart(8, "0");
        let ascii =

            (decimal >= 32 && decimal <= 126)

                ?

                String.fromCharCode(decimal)

                :

                ".";
        output += `

<tr>

<td>${index}</td>

<td>${b}</td>

<td>${decimal}</td>

<td>${binary}</td>

<td>${ascii}</td>

</tr>

`;
    });
    output += `

</table>

</div>
`;
    // ISO-TP Detection
    let pci = bytes[0];
    output += `

<div class="canSection">

<h4>
ISO-TP Frame Type
</h4>

${detectISOTP(pci)}

</div>
`;
    // UDS Detection
    if (bytes.length > 1) {
        output += `

<div class="canSection">

<h4>
UDS Detection
</h4>
${detectUDS(bytes)}

</div>

`;
    }
    output += "</div>";
    document
        .getElementById("canResult")
        .innerHTML = output;
}
function detectISOTP(pci) {
    let type =

        parseInt(pci, 16)

        >> 4;
    switch (type) {
        case 0:

            return "Single Frame";
        case 1:

            return "First Frame";
        case 2:

            return "Consecutive Frame";
        case 3:

            return "Flow Control";
        default:

            return "Unknown ISO-TP";

    }
}
function detectUDS(bytes) {
    let sid;
    // Single Frame

    if (

        (parseInt(bytes[0], 16) >> 4) == 0

    ) {

        sid = bytes[1];

    }

    else {

        sid = bytes[2];

    }
    switch (sid) {
        case "10":

            return "0x10 Diagnostic Session Control";
        case "11":

            return "0x11 ECU Reset";
        case "14":

            return "0x14 Clear DTC";
        case "19":

            return "0x19 Read DTC Information";
        case "22":

            return "0x22 Read Data By Identifier";
        case "27":

            return "0x27 Security Access";
        case "31":

            return "0x31 Routine Control";
        default:

            return "Unknown UDS Service";

    }
}