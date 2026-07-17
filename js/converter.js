// ===============================
// HEX TOOLBOX CONVERTER
// ===============================
// ===============================
// HEX TO ASCII
// ===============================

function hexToASCII() {

    let input = document
        .getElementById("hexASCIIInput")
        .value
        .trim()
        .toUpperCase();
    if (input == "") {

        document.getElementById("asciiResult").innerHTML =
            "Please enter HEX data";

        return;

    }
    let bytes = input.split(/\s+/);
    let output = "";
    bytes.forEach(byte => {
        let decimal = parseInt(byte, 16);
        if (decimal >= 32 && decimal <= 126) {

            output += String.fromCharCode(decimal);

        }
        else {

            output += ".";

        }
    });
    document.getElementById("asciiResult").innerHTML = `

    <div class="decoderSection">

    <h4>
    ASCII Result
    </h4>
    <div class="hexBox">

    ${output}

    </div>
    </div>

    `;
}
// ===============================
// HEX TO BINARY
// ===============================
function hexToBinary() {
    let input = document
        .getElementById("hexBinaryInput")
        .value
        .trim()
        .toUpperCase();
    if (input == "") {
        document.getElementById("binaryResult").innerHTML =
            "Please enter HEX data";
        return;

    }
    let bytes = input.split(/\s+/);
    let output = "";
    bytes.forEach(byte => {
        let binary = parseInt(byte, 16)
            .toString(2)
            .padStart(8, "0");
        output += binary + " ";
    });
    document.getElementById("binaryResult").innerHTML = `

    <div class="decoderSection">

    <h4>
    Binary Result
    </h4>
    <div class="hexBox">

    ${output.trim()}

    </div>
    </div>

    `;
}
// ===============================
// BINARY TO DECIMAL
// ===============================
function binaryToDecimal() {
    let input = document
        .getElementById("binaryDecimalInput")
        .value
        .trim();
    if (input == "") {
        document.getElementById("decimalResult").innerHTML =
            "Please enter Binary data";
        return;

    }
    let decimal = parseInt(input, 2);
    if (isNaN(decimal)) {
        document.getElementById("decimalResult").innerHTML =
            "Invalid Binary Value";
        return;
    }
    document.getElementById("decimalResult").innerHTML = `

    <div class="decoderSection">
    <h4>
    Decimal Result
    </h4>
    <div class="hexBox">

    ${decimal}

    </div>
    </div>

    `;
}
// ===============================
// DECIMAL TO HEX
// ===============================
function decimalToHex() {
    let input = document
        .getElementById("decimalHexInput")
        .value
        .trim();
    if (input == "") {
        document.getElementById("hexResult").innerHTML =
            "Please enter Decimal value";
        return;

    }
    let number = parseInt(input);
    if (isNaN(number)) {
        document.getElementById("hexResult").innerHTML =
            "Invalid Decimal Value";
        return;
    }
    let hex = number
        .toString(16)
        .toUpperCase();
    document.getElementById("hexResult").innerHTML = `

    <div class="decoderSection">
    <h4>
    Hex Result
    </h4>
    <div class="hexBox">

    ${hex}

    </div>
    </div>

    `;
}