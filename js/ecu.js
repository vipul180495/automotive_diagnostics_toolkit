// ===============================
// ECU MODULE EXPLORER
// ===============================
let ecuDatabase = [];

const ecuPurposes = {
    ADCM: "Adjusts damping force to balance ride comfort, handling, and road conditions.",
    AGSM: "Reads shifter position and communicates the selected gear request to the powertrain.",
    ALM: "Controls ambient interior lighting and its color, brightness, and themed effects.",
    AMP12: "Amplifies audio signals and drives up to 12 vehicle speakers.",
    AMP17: "Amplifies audio signals and drives up to 17 vehicle speakers.",
    AMP24: "Amplifies audio signals and drives up to 24 vehicle speakers.",
    ASCM: "Controls air-suspension height, compressor, valves, and related diagnostics.",
    BCM: "Coordinates body functions such as exterior lighting, locks, wipers, and interior power management.",
    BPCM: "Monitors battery-pack health and controls contactors, charging, balancing, and safety limits.",
    BSCM: "Controls braking functions and monitors brake-system sensors, actuators, and faults.",
    BSCM2: "Provides a second brake-control function or redundant brake-system control path.",
    CADM_LO: "Runs lower-compute ADAS decision functions using sensor and vehicle data.",
    CADM_MID: "Runs mid-level ADAS decision and feature-coordination functions.",
    CADM2_MAP: "Uses map and localization data to support central ADAS decision functions.",
    CCDMF: "Operates the front comfort and convenience display interface.",
    CCDMR: "Operates the rear comfort and convenience display interface.",
    CVPAM_XAK: "Processes surround-view and parking-assist inputs to support low-speed maneuvers.",
    DCSD_12IN: "Drives the 12-inch center-stack display and its user interface.",
    DDM: "Controls driver-door functions such as windows, mirror, lock, and switch inputs.",
    DMSM: "Monitors the driver for attention, position, or fatigue-related ADAS functions.",
    DTCM: "Coordinates drivetrain control requests and exchanges torque information between systems.",
    EPS: "Provides electrically assisted steering while monitoring steering torque, angle, and safety states.",
    ETM: "Provides connected-vehicle telematics, remote services, and cellular communication.",
    EVCU2: "Coordinates electric-vehicle operating states, torque requests, energy, and subsystem communication.",
    FLDHM: "Detects and controls the front-left door-handle access function.",
    FPDM: "Drives the front-passenger display and related infotainment interaction.",
    FRDHM: "Detects and controls the front-right door-handle access function.",
    FSM: "Controls powered seat-folding functions and monitors position or obstruction feedback.",
    GNMM: "Supplies navigation, positioning, and vehicle-motion information to connected services.",
    HVAC_ECC: "Controls front-cabin temperature, airflow, compressor requests, and climate actuators.",
    HVACR_ECCR: "Controls rear-cabin climate settings and rear climate actuators.",
    ICS: "Integrates center-stack infotainment, displays, controls, and user-interface functions.",
    ICS_R: "Provides rear-seat center-stack infotainment and control functions.",
    IDCM: "Manages integrated charging functions and power conversion for an electrified vehicle.",
    IPC_10IN: "Displays driver information, warnings, gauges, and telltales on a 10-inch cluster.",
    IPC_12IN: "Displays driver information, warnings, gauges, and telltales on a 12-inch cluster.",
    ISCM: "Manages ignition-state signals, start authorization, and related body-system coordination.",
    ITCM: "Controls integrated trailer functions and communicates trailer status to the vehicle.",
    ITM: "Receives intrusion or alarm signals and supports vehicle-security monitoring.",
    MCPA: "Controls one electric motor/inverter channel for propulsion or regenerative braking.",
    MCPB: "Controls a second electric motor/inverter channel for propulsion or regenerative braking.",
    MSMD_DSM: "Controls driver-seat adjustment, memory, heating, ventilation, or comfort features.",
    MSMP_PSM: "Controls passenger-seat adjustment, memory, heating, ventilation, or comfort features.",
    NVPM: "Processes night-vision sensor data to identify hazards in low-light conditions.",
    OCM: "Classifies passenger occupancy to support airbag and restraint decisions.",
    ORC: "Controls airbags and seat-belt pretensioners during a detected crash event.",
    PAM_XAC: "Coordinates ultrasonic or camera-based parking assistance and warnings.",
    PCM_ECM: "Controls engine operation, emissions, fuel delivery, torque, and powertrain diagnostics.",
    PDM: "Controls passenger-door functions such as windows, mirror, lock, and switch inputs.",
    PLGM: "Controls the powered liftgate, including latch, motor, anti-pinch, and position sensing.",
    PSSM: "Controls powered side steps and monitors their position and obstruction status.",
    RFHM: "Manages remote-key, passive-entry, and RF-based body-security functions.",
    RLDHM: "Detects and controls the rear-left door-handle access function.",
    RRDHM: "Detects and controls the rear-right door-handle access function.",
    SCCM: "Reads steering-wheel switches and manages steering-column control functions.",
    SGCP_MCPC: "Controls the starter-generator system and coordinates electrical torque assistance.",
    SGW: "Protects and routes diagnostic and vehicle-network traffic between network domains.",
    SLMG: "Controls grille-mounted smart-lighting functions and communicates lighting status.",
    SLML: "Controls the left smart-lamp functions, including lighting commands and diagnostics.",
    SLMR: "Controls the right smart-lamp functions, including lighting commands and diagnostics.",
    SMMD: "Controls driver-seat massage motors and selected comfort programs.",
    SMMP: "Controls passenger-seat massage motors and selected comfort programs.",
    SPAAK: "Enables smartphone-based vehicle access and digital-key authentication.",
    TBM: "Provides telematics connectivity, remote services, and vehicle-to-cloud communication.",
    TRSKM: "Handles steering-knob inputs and sends the selected driver-control requests.",
    TTM: "Controls trailer-tow electrical functions and monitors connected trailer status.",
    TTPM: "Monitors trailer tire pressure and temperature information for driver warnings.",
    VRM: "Routes video signals between cameras, displays, and infotainment/ADAS systems.",
    WCPM2: "Controls the wireless charging pad, including charging state, temperature, and foreign-object detection."
};

function getECUPurpose(ecu) {
    return ecuPurposes[ecu.code] ||
        "Supports the vehicle's " + ecu.category.toLowerCase() + " functions.";
}
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
<div class="ecuSection ecuPurpose">
<h4>
Purpose
</h4>
${getECUPurpose(e)}
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
