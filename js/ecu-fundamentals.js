const ecuFundamentalsContainer = document.getElementById("ecuFundamentalsContainer");

ecuFundamentalsContainer.innerHTML = `
<section class="ecuIntro">
    <p class="ecuEyebrow">ECU FUNDAMENTALS</p>
    <h3>What is an automotive ECU?</h3>
    <p>An <b>Electronic Control Unit (ECU)</b> is an embedded computer that reads vehicle inputs, runs software, communicates with other ECUs, and commands outputs. A vehicle may have engine, brake, body, battery-management, gateway, infotainment, and ADAS ECUs.</p>
    <div class="ecuArchitecture" role="img" aria-label="Automotive ECU diagram showing sensor inputs flowing to ECU hardware and software, then to actuator outputs.">
        <div class="ecuBlock">Sensors &amp; network inputs<br><small>voltage, frequency, CAN, Ethernet</small></div><b>→</b>
        <div class="ecuBlock ecuCore">ECU hardware + software<br><small>processor, memory, boot, application</small></div><b>→</b>
        <div class="ecuBlock ecuOutputs">Actuators &amp; outputs<br><small>PWM, relays, motors, messages</small></div>
    </div>
</section>

<section class="ecuSectionCard">
    <h3>How an ECU works</h3>
    <ol class="ecuList">
        <li><b>Start:</b> Power and reset circuitry starts the processor; boot software checks and starts the approved application.</li>
        <li><b>Read:</b> The ECU samples sensors and receives network messages.</li>
        <li><b>Decide:</b> Periodic tasks filter values, apply calibration, run control logic, and monitor plausibility.</li>
        <li><b>Act:</b> Driver circuits control actuators or send network commands.</li>
        <li><b>Protect:</b> Diagnostics monitor faults, store DTCs, and may move the ECU to a safe state.</li>
    </ol>
</section>

<section class="ecuSectionCard">
    <h3>ECU roles in a vehicle</h3>
    <table class="ecuTable">
        <tr><th>ECU type</th><th>Typical role</th><th>Inputs / outputs</th></tr>
        <tr><td>Powertrain / motor controller</td><td>Controls combustion, torque, transmission, or electric drive.</td><td>Speed, pressure, temperature → injectors, throttle, inverter requests</td></tr>
        <tr><td>Brake / chassis ECU</td><td>Provides ABS, stability, steering, suspension, or braking functions.</td><td>Wheel speed, yaw, pedal → valves, motor torque requests</td></tr>
        <tr><td>Body controller (BCM)</td><td>Manages access, lighting, wipers, and comfort functions.</td><td>Switches, doors, RF commands → lamps, locks, relays</td></tr>
        <tr><td>BMS / gateway / ADAS</td><td>Manages battery safety, network routing, or high-compute perception.</td><td>Cell data, CAN/Ethernet, cameras/radar → contactors, routed data, warnings</td></tr>
    </table>
</section>

<section class="ecuSectionCard">
    <h3>Core ECU hardware</h3>
    <div class="ecuHardwareGrid">
        <div><b>Processor</b><span>MCU, microprocessor, or SoC that executes software.</span></div>
        <div><b>Memory</b><span>Flash for code, RAM for working data, and retained storage for configuration.</span></div>
        <div><b>Power &amp; reset</b><span>Regulators, watchdog, wake-up, reset, and transient protection.</span></div>
        <div><b>Sensor interfaces</b><span>ADC, digital I/O, timers, SENT, PSI5, LIN, and signal conditioning.</span></div>
        <div><b>Actuator drivers</b><span>Low-/high-side switches, H-bridges, PWM, relays, and current measurement.</span></div>
        <div><b>Communication</b><span>CAN/CAN FD, LIN, FlexRay, Automotive Ethernet, and transceivers.</span></div>
        <div><b>Security</b><span>HSM, secure boot, keys, and controlled debug access when required.</span></div>
        <div><b>Board &amp; harness</b><span>PCB, connectors, EMC protection, thermal design, and grounding.</span></div>
    </div>
</section>

<section class="ecuSectionCard">
    <h3>Correct terminology: CPU, ARM, MCU, MPU, SoC, and FPGA</h3>
    <table class="ecuTable">
        <tr><th>Term</th><th>Accurate meaning</th><th>Automotive context</th></tr>
        <tr><td><b>CPU / core</b></td><td>The execution engine that runs instructions. A chip may have one or many cores.</td><td>Examples: ARM Cortex-R/M/A, TriCore, Power Architecture, and RISC-V.</td></tr>
        <tr><td><b>ARM</b></td><td>A processor architecture family and ecosystem; it is not a complete ECU chip.</td><td>Many MCUs and SoCs use ARM cores, while others do not.</td></tr>
        <tr><td><b>MCU</b></td><td>Microcontroller unit: a chip with CPU core(s), memory, timers, interfaces, and peripherals.</td><td>Ideal for deterministic, real-time control such as body, brake, and powertrain functions.</td></tr>
        <tr><td><b>MPU</b></td><td>Microprocessor unit: more compute-focused and commonly paired with external DRAM/storage.</td><td>Often used in infotainment, gateways, domain controllers, and ADAS compute.</td></tr>
        <tr><td><b>SoC</b></td><td>System-on-Chip: integrates CPU core(s), memory interfaces, I/O, and often accelerators, graphics/video, and security blocks.</td><td>Common for high-compute ECUs. An SoC can contain ARM cores, but ARM does not define an SoC.</td></tr>
        <tr><td><b>FPGA</b></td><td>Field-Programmable Gate Array: programmable hardware logic configured after manufacture.</td><td>Useful for prototypes or specialized processing; not required in every ECU.</td></tr>
    </table>
    <p class="ecuNote"><b>Correction:</b> <code>SoC = PuC (ARM CPU) + memory + peripherals</code> is too narrow. A better description is: <b>an SoC integrates CPU core(s), memory interfaces, I/O, and often accelerators/security/graphics on one chip.</b> Memory can be on-chip, external, or both. A typical MCU is a small SoC optimized for real-time embedded control.</p>
    <p class="ecuNote"><b>About “PuC” and “CuC”:</b> these are not universal automotive-standard processor names. They may be supplier- or project-specific labels. Always use that ECU's hardware manual and software architecture document before assigning a meaning to them.</p>
</section>

<section class="ecuSectionCard">
    <h3>Boot and software layers</h3>
    <div class="ecuBootFlow"><span>Power-on reset</span><b>→</b><span>Boot ROM / secure boot</span><b>→</b><span>Bootloader (if used)</span><b>→</b><span>Application + basic software</span><b>→</b><span>Operation &amp; diagnostics</span></div>
    <ul class="ecuList">
        <li><b>Boot ROM:</b> immutable chip code that performs minimum start-up and may establish a trusted boot path.</li>
        <li><b>Bootloader:</b> validates, programs, updates, or jumps to the main application. Boot ROM normally runs first.</li>
        <li><b>Basic software / drivers:</b> OS, communication, memory, diagnostics, and I/O hardware abstraction.</li>
        <li><b>Application:</b> feature-specific logic, such as torque control, lighting, cell balancing, or sensor fusion.</li>
        <li><b>Calibration and variant data:</b> configurable parameters and feature selections; record their version separately from executable software.</li>
    </ul>
</section>

<section class="ecuSectionCard">
    <h3>Information to record for diagnostics, HIL, or integration</h3>
    <ul class="ecuList">
        <li>ECU name, supplier, hardware part number/revision, connector, and pin-out.</li>
        <li>Software, bootloader, calibration, coding/variant, and database versions.</li>
        <li>Power pins, wake/sleep behavior, grounds, current limits, and safety precautions.</li>
        <li>Network channels, bitrates, DBC/ARXML, diagnostic addresses, UDS services, DIDs, routines, and DTCs.</li>
        <li>I/O scaling, loads, fault thresholds, safe-state behavior, and timing requirements.</li>
    </ul>
</section>`;
