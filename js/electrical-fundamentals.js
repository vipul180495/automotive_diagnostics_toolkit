const electricalFundamentalsContainer = document.getElementById("electricalFundamentalsContainer");

electricalFundamentalsContainer.innerHTML = `
<section class="electricalIntro">
    <p class="ecuEyebrow">ECU ELECTRICAL BASICS</p>
    <h3>ECU voltage and current: the short answer</h3>
    <p>There is no single minimum voltage or current for every ECU. A conventional passenger-vehicle ECU is normally designed for a <b>12 V nominal electrical system</b>, while trucks commonly use <b>24 V nominal systems</b> and electrified vehicles also contain a separate high-voltage traction system. The ECU's exact permitted supply range, current limit, pin assignments, and power sequence must come from its hardware specification or wiring diagram.</p>
    <div class="electricalFlow" role="img" aria-label="Vehicle battery supply passes through protection and ECU power management to internal five volt, three point three volt, and one point two volt rails.">
        <span>Vehicle supply<br><small>12 V nominal</small></span><b>→</b><span>Protection &amp; power management<br><small>fuse, reverse polarity, transient protection</small></span><b>→</b><span>Internal regulated rails<br><small>5 V, 3.3 V, 1.2 V examples</small></span>
    </div>
</section>

<section class="electricalCard">
    <h3>Typical low-voltage electrical ranges</h3>
    <table class="electricalTable">
        <tr><th>Condition</th><th>Typical 12 V system behavior</th><th>What it means for an ECU</th></tr>
        <tr><td>Nominal running voltage</td><td>Approximately 13.5–14.8 V while the alternator is charging.</td><td>Normal operating condition for most 12 V ECUs.</td></tr>
        <tr><td>Battery at rest</td><td>Roughly 12.0–12.8 V depending on battery state and temperature.</td><td>Common bench supply setting for functional tests.</td></tr>
        <tr><td>Cranking / cold start</td><td>Voltage can dip substantially; exact profile depends on vehicle and standard.</td><td>An ECU may need to keep operating, reset safely, or tolerate a defined low-voltage profile.</td></tr>
        <tr><td>Jump start / charging fault</td><td>Higher-than-normal voltage can occur.</td><td>Automotive power input protection is designed for specified overvoltage conditions.</td></tr>
        <tr><td>Load dump / transients</td><td>Short high-energy voltage spikes can occur when electrical loads are disconnected.</td><td>Must be handled by hardware protection and validated to the applicable OEM/ISO requirements.</td></tr>
        <tr><td>24 V vehicle</td><td>About 24 V nominal, with its own low/high/transient requirements.</td><td>Use a 24 V-rated ECU and bench supply; do not connect a 12 V ECU directly.</td></tr>
    </table>
    <p class="electricalNote"><b>Important:</b> “Minimum voltage” is usually defined as a test profile, not one universal number. ECU specifications may state different thresholds for booting, staying awake, communication, actuator operation, programming, and data retention.</p>
</section>

<section class="electricalCard">
    <h3>Current: what does an ECU need?</h3>
    <p>Supply current depends mostly on the ECU type and what it is driving. A small body ECU at rest may use milliamps in sleep; a running controller may use hundreds of milliamps to a few amps; an ECU that directly powers motors, valves, heaters, or relays can require substantially more. The current for an <b>actuator load</b> is not the same as the controller's internal electronics current.</p>
    <table class="electricalTable">
        <tr><th>Bench situation</th><th>Practical approach</th></tr>
        <tr><td>Basic ECU power-up / diagnostics</td><td>Use a regulated programmable supply at the specified nominal voltage, with a conservative current limit that is increased only after confirming the ECU/harness requirement.</td></tr>
        <tr><td>ECU with external loads</td><td>Power lamps, motors, injectors, solenoids, or contactors through correctly rated load hardware; do not assume the ECU supply alone covers load current.</td></tr>
        <tr><td>Sleep-current test</td><td>Use a meter or supply with suitable low-current resolution after all network and wake-up timers have settled.</td></tr>
        <tr><td>HIL bench</td><td>Use a programmable supply, fusing, current measurement, emergency stop, and loads sized to the hardware-under-test specification.</td></tr>
    </table>
</section>

<section class="electricalCard">
    <h3>Common ECU power pins and terms</h3>
    <table class="electricalTable">
        <tr><th>Term</th><th>Typical meaning</th></tr>
        <tr><td><b>KL30 / Terminal 30</b></td><td>Permanent battery positive supply.</td></tr>
        <tr><td><b>KL15 / Terminal 15</b></td><td>Ignition-switched positive supply or ignition-state input.</td></tr>
        <tr><td><b>KL31 / Terminal 31</b></td><td>Vehicle ground / battery negative.</td></tr>
        <tr><td><b>Wake-up</b></td><td>Dedicated input or network event that wakes the ECU from a low-power state.</td></tr>
        <tr><td><b>5 V reference</b></td><td>A regulated sensor supply produced by the ECU; it is an output, not a replacement for the vehicle battery input.</td></tr>
        <tr><td><b>Quiescent current</b></td><td>Current consumed while the ECU is in sleep or standby mode.</td></tr>
    </table>
</section>

<section class="electricalCard">
    <h3>Safe ECU bench-power procedure</h3>
    <ol class="ecuList">
        <li>Verify the ECU part number, connector view, pin-out, grounds, KL30/KL15/wake signals, and required network termination.</li>
        <li>Use a regulated supply with current limiting, an inline fuse, and correctly sized wiring. Keep high-current actuator loads separately protected.</li>
        <li>Set the voltage and current limit from the approved ECU/bench specification. Never guess when connecting an unfamiliar ECU.</li>
        <li>Power ground first where required by the procedure, then permanent supply, ignition/wake input, and networks. Observe current draw and temperature.</li>
        <li>Before fault injection, review the wiring, protection, and safe method; do not short pins or inject voltage into ECU outputs without an approved test setup.</li>
    </ol>
</section>`;
