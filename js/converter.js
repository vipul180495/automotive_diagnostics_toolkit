// ===============================
// HEX TOOLBOX CONVERTER
// ===============================
// ===============================
// HEX TO ASCII
// ===============================

function parseHexBytes(input) {
    const normalized = input
        .trim()
        .replace(/0x/gi, "")
        .replace(/[\s,;:_-]+/g, "");

    if (!normalized || !/^[0-9A-Fa-f]+$/.test(normalized) || normalized.length % 2 !== 0) {
        return null;
    }

    return normalized.match(/.{2}/g);
}

function showHexInputError(resultId) {
    document.getElementById(resultId).textContent =
        "Enter complete hexadecimal bytes, for example: 59 49 4E or 59494E.";
}

function escapeHtml(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function hexToASCII() {

    const input = document
        .getElementById("hexASCIIInput")
        .value;
    const bytes = parseHexBytes(input);
    if (!bytes) {
        showHexInputError("asciiResult");
        return;
    }

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

    ${escapeHtml(output)}

    </div>
    </div>

    `;
}
// ===============================
// HEX TO BINARY
// ===============================
function hexToBinary() {
    const input = document
        .getElementById("hexBinaryInput")
        .value;
    const bytes = parseHexBytes(input);
    if (!bytes) {
        showHexInputError("binaryResult");
        return;
    }

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
