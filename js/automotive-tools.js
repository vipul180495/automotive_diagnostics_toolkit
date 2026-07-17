const automotiveToolsContainer = document.getElementById("automotiveToolsContainer");

automotiveToolsContainer.innerHTML = `
<section class="toolsIntro">
    <p class="ecuEyebrow">AUTOMOTIVE ENGINEERING TOOLS</p>
    <div class="toolsHeroHeader">
        <div><h3>Tools used across development, diagnostics, simulation, and HIL</h3><p>Tool choice depends on the OEM, supplier, ECU, network, and workflow. The names below are common examples, not mandatory requirements.</p></div>
        <div class="toolsProgress"><span>Learning progress</span><strong id="toolsProgressText">0 of 0 topics</strong><div><i id="toolsProgressBar"></i></div></div>
    </div>
</section>

<section class="toolsControls" aria-label="Automotive tools controls">
    <label for="toolsSearch">Find a tool or topic</label>
    <input id="toolsSearch" type="search" placeholder="Search CANoe, dSPACE, MATLAB, AUTOSAR...">
    <div><button id="toolsExpandAll" type="button">Expand all</button><button id="toolsCollapseAll" type="button">Collapse all</button><button id="toolsResetProgress" type="button">Reset progress</button></div>
</section>

<details class="toolsCard toolTopic" open>
    <summary>Network analysis, diagnostics, and simulation</summary><div class="toolsContent">
    <table class="toolsTable">
        <tr><th>Tool / family</th><th>Primary use</th><th>Typical work</th></tr>
        <tr><td><b>Vector CANoe</b></td><td>Network simulation, analysis, testing, and diagnostics.</td><td>Restbus simulation, CAPL test modules, CAN/LIN/FlexRay/Ethernet traces, UDS testing, automated reports.</td></tr>
        <tr><td><b>Vector CANalyzer</b></td><td>Network analysis and monitoring.</td><td>Observe, decode, filter, and transmit bus traffic; usually lighter-weight than CANoe for simulation/testing.</td></tr>
        <tr><td><b>CANape</b></td><td>ECU measurement, calibration, and diagnostics.</td><td>Measure internal ECU variables through CCP/XCP, adjust calibration values, and analyze signals.</td></tr>
        <tr><td><b>ETAS INCA</b></td><td>Measurement, calibration, and diagnostics.</td><td>Observe and calibrate ECU variables, often in powertrain and embedded-control development.</td></tr>
        <tr><td><b>PCAN-View / Kvaser tools</b></td><td>Basic CAN/CAN FD communication and monitoring.</td><td>Bring up interfaces, send frames, inspect traffic, and perform simple diagnostics.</td></tr>
    </table>
</div></details>

<details class="toolsCard toolTopic">
    <summary>Modeling, simulation, and HIL</summary><div class="toolsContent">
    <table class="toolsTable">
        <tr><th>Tool / family</th><th>Primary use</th><th>Typical work</th></tr>
        <tr><td><b>MATLAB / Simulink</b></td><td>Model-based design and simulation.</td><td>Create control and plant models, run MIL/SIL tests, generate embedded code where the workflow supports it.</td></tr>
        <tr><td><b>dSPACE</b></td><td>Real-time simulation and HIL.</td><td>Run plant models in real time, connect ECU I/O, automate HIL tests, and collect results.</td></tr>
        <tr><td><b>NI PXI / VeriStand / LabVIEW</b></td><td>Modular test, data acquisition, and real-time validation.</td><td>Build HIL/bench systems with configurable I/O, real-time execution, and test automation.</td></tr>
        <tr><td><b>ETAS HIL / simulation products</b></td><td>ECU validation and integration testing.</td><td>Build supplier/OEM-specific HIL workflows with I/O, network, and automation support.</td></tr>
        <tr><td><b>Speedgoat</b></td><td>Simulink-based real-time targets.</td><td>Deploy real-time plant/control models for test and prototyping.</td></tr>
    </table>
</div></details>

<details class="toolsCard toolTopic">
    <summary>Software development, AUTOSAR, and debug</summary><div class="toolsContent">
    <table class="toolsTable">
        <tr><th>Tool / family</th><th>Primary use</th><th>Typical work</th></tr>
        <tr><td><b>Vector DaVinci / ETAS ISOLAR / EB tresos</b></td><td>AUTOSAR configuration.</td><td>Configure ARXML, BSW modules, communication, diagnostics, RTE, and generate configuration code.</td></tr>
        <tr><td><b>Compiler and IDE</b></td><td>Build embedded software.</td><td>Compile, link, flash, and debug ECU application and integration code.</td></tr>
        <tr><td><b>Lauterbach / J-Link / vendor debugger</b></td><td>On-target debug and trace.</td><td>Flash targets, inspect memory/registers, set breakpoints, and investigate real-time behavior.</td></tr>
        <tr><td><b>Git + CI tools</b></td><td>Version control and automated quality checks.</td><td>Track changes, run builds/tests, preserve baselines, and produce artifacts.</td></tr>
    </table>
</div></details>

<details class="toolsCard toolTopic dspaceCard">
    <summary>dSPACE: how it is used in ECU development and HIL</summary><div class="toolsContent">
    <p>dSPACE provides a connected set of real-time hardware and software tools used to simulate the vehicle environment, connect real electrical/network I/O to an ECU, observe behavior, and automate validation. In a HIL bench, the ECU remains real hardware while the dSPACE system runs the plant model and test environment in real time.</p>
    <div class="toolsFlow dspaceFlow"><span>Plant model<br><small>engine, motor, battery, vehicle</small></span><b>→</b><span>dSPACE real-time system<br><small>I/O and bus simulation</small></span><b>↔</b><span>ECU under test<br><small>real hardware + software</small></span><b>→</b><span>Test result<br><small>measurements, DTCs, pass/fail</small></span></div>
    <table class="toolsTable">
        <tr><th>dSPACE component</th><th>Role in a workflow</th><th>What a learner should understand</th></tr>
        <tr><td><b>SCALEXIO</b></td><td>Real-time simulation and HIL hardware platform with configurable processing and I/O.</td><td>It runs a compiled plant model deterministically and interfaces with ECU pins, loads, and vehicle networks.</td></tr>
        <tr><td><b>ConfigurationDesk</b></td><td>Configures SCALEXIO hardware, I/O, model ports, and signal mapping.</td><td>It is where an ECU pin or network signal is mapped to a physical HIL channel and model variable.</td></tr>
        <tr><td><b>ControlDesk</b></td><td>Experiment, instrumentation, visualization, and measurement software.</td><td>Use it to monitor variables, manipulate permitted stimuli, record data, and interact with real-time hardware.</td></tr>
        <tr><td><b>AutomationDesk</b></td><td>Test automation and test management.</td><td>Defines repeatable procedures, applies stimuli, evaluates expected results, and produces test reports.</td></tr>
        <tr><td><b>ASM / ModelDesk</b></td><td>Automotive simulation models and model configuration.</td><td>Provides reusable vehicle/plant-model building blocks; the actual model scope must match the ECU feature under test.</td></tr>
        <tr><td><b>TargetLink</b></td><td>Production-code generation from model-based designs.</td><td>It is mainly for generating embedded software, rather than the HIL bench itself.</td></tr>
        <tr><td><b>VEOS</b></td><td>PC-based virtual validation platform.</td><td>Useful earlier in the V-cycle when testing virtual ECUs or models before connecting physical ECU hardware.</td></tr>
    </table>
    <h4>Typical dSPACE HIL setup steps</h4>
    <ol class="ecuList">
        <li>Choose the required plant model fidelity and compile it for real-time execution.</li>
        <li>Configure hardware and map every HIL channel to the ECU pin, network signal, unit, scaling, range, and safe state.</li>
        <li>Connect the ECU through an approved harness, supply, protection, loads, and CAN/LIN/Ethernet interfaces.</li>
        <li>Create ControlDesk experiments for signals, traces, parameter observation, and diagnostics.</li>
        <li>Automate nominal, boundary, and fault-injection tests with pass/fail criteria; retain software/calibration and configuration versions with the report.</li>
    </ol>
    <p class="electricalNote">A dSPACE bench does not make electrical safety optional. Verify channel ratings, grounds, fuse protection, load hardware, and emergency-stop behavior before powering the ECU or injecting faults.</p>
</div></details>

<details class="toolsCard toolTopic">
    <summary>Typical workflow</summary><div class="toolsContent">
    <div class="toolsFlow"><span>Model feature<br><small>MATLAB/Simulink</small></span><b>→</b><span>Configure/build ECU<br><small>AUTOSAR tools + compiler</small></span><b>→</b><span>Measure/debug<br><small>INCA, CANape, debugger</small></span><b>→</b><span>Network test<br><small>CANoe/CANalyzer</small></span><b>→</b><span>HIL validation<br><small>dSPACE, NI, ETAS</small></span></div>
    <p class="electricalNote">For diagnostics, use only authorized tools and approved programming procedures. Incorrect flashing, coding, security access, or bench wiring can damage an ECU or make a vehicle unsafe.</p>
</div></details>`;

const toolTopics = [...automotiveToolsContainer.querySelectorAll(".toolTopic")];
const toolsStorageKey = "automotiveToolkitToolsProgress";
const completedToolTopics = new Set(JSON.parse(localStorage.getItem(toolsStorageKey) || "[]"));

toolTopics.forEach((topic, index) => {
    const title = topic.querySelector("summary").textContent.trim();
    const topicId = "tool-topic-" + index;
    const content = topic.querySelector(".toolsContent");
    const actions = document.createElement("div");
    topic.dataset.topicId = topicId;
    actions.className = "toolsTopicActions";
    actions.innerHTML = '<span>Topic ' + String(index + 1).padStart(2, "0") + '</span><button type="button" aria-label="Mark ' + title + ' as learned"></button>';
    content.prepend(actions);
    const button = actions.querySelector("button");
    const updateState = () => {
        const complete = completedToolTopics.has(topicId);
        topic.classList.toggle("isComplete", complete);
        button.textContent = complete ? "✓ Learned" : "Mark as learned";
        button.setAttribute("aria-pressed", String(complete));
    };
    button.addEventListener("click", () => {
        completedToolTopics.has(topicId) ? completedToolTopics.delete(topicId) : completedToolTopics.add(topicId);
        localStorage.setItem(toolsStorageKey, JSON.stringify([...completedToolTopics]));
        updateState();
        updateToolsProgress();
    });
    updateState();
});

function updateToolsProgress() {
    const total = toolTopics.length;
    const complete = completedToolTopics.size;
    document.getElementById("toolsProgressText").textContent = complete + " of " + total + " topics";
    document.getElementById("toolsProgressBar").style.width = (total ? complete / total * 100 : 0) + "%";
}

document.getElementById("toolsSearch").addEventListener("input", event => {
    const query = event.target.value.toLowerCase().trim();
    toolTopics.forEach(topic => { const match = topic.textContent.toLowerCase().includes(query); topic.hidden = !match; if (query && match) topic.open = true; });
});
document.getElementById("toolsExpandAll").addEventListener("click", () => { toolTopics.forEach(topic => { topic.hidden = false; topic.open = true; }); document.getElementById("toolsSearch").value = ""; });
document.getElementById("toolsCollapseAll").addEventListener("click", () => toolTopics.forEach(topic => topic.open = false));
document.getElementById("toolsResetProgress").addEventListener("click", () => { completedToolTopics.clear(); localStorage.removeItem(toolsStorageKey); toolTopics.forEach(topic => { topic.classList.remove("isComplete"); const button = topic.querySelector(".toolsTopicActions button"); button.textContent = "Mark as learned"; button.setAttribute("aria-pressed", "false"); }); updateToolsProgress(); });
updateToolsProgress();
