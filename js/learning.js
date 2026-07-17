const learningContainer = document.getElementById("learningContainer");

learningContainer.innerHTML = `
<section class="learningIntro">
    <div class="learningHeroHeader">
        <div>
            <p class="learningEyebrow">LEARNING CENTER</p>
            <h3>Automotive Network Fundamentals</h3>
            <p>
                Learn how CAN frames transport data, how UDS diagnostics use CAN,
                how AUTOSAR software processes messages inside an ECU, and how
                Hardware-in-the-Loop (HIL) testing validates an ECU before vehicle testing.
            </p>
        </div>
        <div class="learningProgress" aria-label="Learning progress">
            <span class="learningProgressLabel">Your progress</span>
            <strong id="learningProgressText">0 of 0 topics</strong>
            <div class="learningProgressTrack"><span id="learningProgressBar"></span></div>
        </div>
    </div>
    <div class="learningRoadmap" aria-label="Suggested learning path">
        <span><b>1</b> CAN foundations</span>
        <span><b>2</b> ISO-TP &amp; UDS</span>
        <span><b>3</b> AUTOSAR &amp; HIL validation</span>
    </div>
</section>

<section class="learningControls" aria-label="Learning controls">
    <label class="learningSearchLabel" for="learningSearch">Find a topic</label>
    <input id="learningSearch" class="learningSearch" type="search" placeholder="Search CAN, UDS, DTC, AUTOSAR...">
    <div class="learningControlButtons">
        <button id="learningExpandAll" type="button">Expand all</button>
        <button id="learningCollapseAll" type="button">Collapse all</button>
        <button id="learningResetProgress" type="button" class="learningSecondaryButton">Reset progress</button>
    </div>
</section>

<details class="learningCard" open>
    <summary>CAN Types, Payloads and Speeds</summary>

    <div class="learningContent">
        <table class="learningTable">
            <tr>
                <th>CAN type</th>
                <th>Maximum payload</th>
                <th>Bitrate</th>
                <th>Notes</th>
            </tr>
            <tr>
                <td>CAN Classic (CAN CC)</td>
                <td>8 bytes</td>
                <td>Up to 1 Mbit/s</td>
                <td>One bitrate for the entire frame.</td>
            </tr>
            <tr>
                <td>Low-Speed / Fault-Tolerant CAN (LS-CAN)</td>
                <td>8 bytes</td>
                <td>Up to 125 kbit/s<br>Common vehicle speeds: 33.3, 83.3, or 125 kbit/s</td>
                <td>Used for lower-speed body functions. It can continue operating with certain single-wire faults.</td>
            </tr>
            <tr>
                <td>High-Speed CAN (HS-CAN)</td>
                <td>8 bytes</td>
                <td>Up to 1 Mbit/s<br>Common vehicle speed: 500 kbit/s</td>
                <td>Typically used for powertrain, chassis, ABS, engine, transmission, and other time-critical ECUs.</td>
            </tr>
            <tr>
                <td>CAN FD</td>
                <td>64 bytes</td>
                <td>Nominal: up to 1 Mbit/s<br>Data phase: commonly 2–5 Mbit/s; up to 8 Mbit/s with suitable hardware/network design.</td>
                <td>Can use Bit Rate Switch (BRS) for a faster data phase.</td>
            </tr>
            <tr>
                <td>CAN XL</td>
                <td>1–2048 bytes</td>
                <td>Up to 20 Mbit/s</td>
                <td>Designed for high-bandwidth backbone and sub-backbone networks.</td>
            </tr>
        </table>

        <p class="learningNote">
            Actual vehicle bitrate depends on wiring length, topology, termination,
            transceivers, and ECU support. Many production CAN networks use
            500 kbit/s nominal bitrate, while CAN FD may use 500 kbit/s nominal
            and 2–5 Mbit/s during the data phase.
        </p>
    </div>
</details>

<details class="learningCard">
    <summary>CAN Properties: What Makes CAN Reliable</summary>

    <div class="learningContent">
        <p>
            CAN is designed for dependable real-time communication between many ECUs on a shared vehicle network.
            These properties explain why it is widely used in automotive control systems.
        </p>

        <div class="canPropertiesTableScroll">
        <table class="learningTable smallTable canPropertiesTable">
            <tr><th>Property</th><th>What it means</th><th>Practical effect</th></tr>
            <tr><td><b>Multi-master bus</b></td><td>Any connected ECU can start transmitting when the bus is idle; there is no central master required.</td><td>ECUs can communicate directly, but all nodes must follow the same bus timing and message definitions.</td></tr>
            <tr><td><b>Broadcast communication</b></td><td>A CAN frame is placed on the shared bus and every node can see it. Nodes use the CAN ID to decide whether to process it.</td><td>One wheel-speed message can be used by brakes, gateway, powertrain, and cluster ECUs at the same time.</td></tr>
            <tr><td><b>Priority-based arbitration</b></td><td>Lower numerical CAN IDs have higher priority. Arbitration occurs bit by bit without damaging the winning frame.</td><td>Time-critical messages can receive lower IDs; too many high-priority frames can delay lower-priority traffic.</td></tr>
            <tr><td><b>Deterministic priority</b></td><td>The highest-priority pending frame wins predictable access to the bus, subject to bus load and frame duration.</td><td>Useful for real-time control, but system designers must calculate bus load and worst-case latency.</td></tr>
            <tr><td><b>Differential signaling</b></td><td>High-speed CAN uses CAN-H and CAN-L as a differential pair instead of a single signal referenced only to ground.</td><td>Improves resistance to electrical noise in the vehicle harness. Twisted-pair wiring helps preserve this benefit.</td></tr>
            <tr><td><b>Error detection</b></td><td>Frames use CRC, bit monitoring, bit stuffing, format checks, and acknowledge checks to detect transmission errors.</td><td>A detected bad frame is rejected and retransmitted automatically when the bus is available.</td></tr>
            <tr><td><b>Fault confinement</b></td><td>Each node maintains transmit and receive error counters. A misbehaving node can become error-passive or bus-off.</td><td>One faulty ECU is less likely to permanently disrupt the whole network. Bus-off recovery is ECU/OEM-specific.</td></tr>
            <tr><td><b>Termination</b></td><td>A high-speed CAN bus normally has a 120-ohm terminator at each physical end, giving about 60 ohms measured across CAN-H and CAN-L with power off.</td><td>Correct termination prevents reflections. Extra, missing, or incorrectly placed terminators cause communication errors.</td></tr>
            <tr><td><b>Topology and length</b></td><td>Bitrate, main-bus length, stub length, wiring quality, and node count are related.</td><td>Higher bitrates require tighter physical-network design and shorter stubs; use the OEM/network design rules.</td></tr>
            <tr><td><b>Data capacity</b></td><td>Classical CAN carries up to 8 data bytes per frame; CAN FD carries up to 64 bytes.</td><td>CAN FD can reduce frame overhead, but every controller, transceiver, and network node must support the selected mode.</td></tr>
        </table>
        </div>

        <h3>Useful physical checks</h3>
        <ul class="learningList">
            <li><b>Power off:</b> Measure resistance between CAN-H and CAN-L at the diagnostic connector or bus point. About 60 ohms commonly indicates two 120-ohm terminators in parallel.</li>
            <li><b>Power on:</b> Use an oscilloscope or CAN analyzer to check for valid traffic, noise, reflections, and error frames. Do not use resistance measurements on a powered network.</li>
            <li><b>Before adding a tool:</b> Confirm its bitrate, CAN/CAN FD capability, channel, termination setting, and whether it will transmit or only listen.</li>
        </ul>

        <p class="learningNote">
            CAN itself does not define the meaning of a message payload. DBC, ARXML, OEM specifications, or another higher-level definition describe signals, scaling, counters, checksums, and timeout behavior.
        </p>
    </div>
</details>

<details class="learningCard">
    <summary>CAN Frames: Fundamentals, Arbitration and Classical CAN</summary>

    <div class="learningContent">
        <h3>What is CAN Bus Technology?</h3>
        <p>
            Controller Area Network (CAN) is a robust multi-master communication
            protocol. Multiple ECUs share a two-wire bus and exchange messages
            without requiring a host computer. This reduces wiring complexity,
            supports real-time control, and provides strong noise immunity.
        </p>

        <h3>CAN Bit States</h3>
        <div class="frameDiagram">
            Dominant bit = logic 0 &nbsp; | &nbsp; Recessive bit = logic 1
        </div>

        <h3>CAN Frame Types</h3>
        <ul class="learningList">
            <li><b>Data Frame:</b> Carries payload data between nodes.</li>
            <li><b>Remote Frame:</b> Requests a Data Frame; legacy Classical CAN feature and not used in CAN FD.</li>
            <li><b>Error Frame:</b> Sent when a node detects a transmission error.</li>
            <li><b>Overload Frame:</b> Adds a delay between frames; rarely encountered in modern applications.</li>
        </ul>

        <h3>Arbitration Mechanism</h3>
        <ul class="learningList">
            <li>CAN uses non-destructive, bitwise arbitration.</li>
            <li>A lower numerical CAN ID has higher priority.</li>
            <li>Nodes monitor the bus while transmitting.</li>
            <li>If a node transmits a recessive bit but reads a dominant bit, it loses arbitration and stops transmitting.</li>
            <li>The highest-priority message continues without corrupting the bus.</li>
        </ul>

        <h3>Message Filtering</h3>
        <p>
            All nodes can observe bus traffic, but ECUs use hardware acceptance
            filters to process only relevant CAN IDs. This reduces CPU load and
            prevents unnecessary software processing.
        </p>

        <h3>Standard Classical CAN Data Frame — 11-bit ID</h3>
        <div class="frameDiagram">
            SOF → Identifier → RTR → IDE → r0 → DLC → Data → CRC → CRC Delimiter → ACK → ACK Delimiter → EOF → IFS
        </div>

        <div class="frameFieldGrid" aria-label="Standard CAN frame fields">
            <div class="frameField frameStart"><b>SOF</b><span>1 dominant bit<br>Starts frame</span></div>
            <div class="frameField framePriority"><b>ID</b><span>11 bits<br>Priority + label</span></div>
            <div class="frameField"><b>RTR / IDE / r0</b><span>3 bits<br>Frame format control</span></div>
            <div class="frameField frameLength"><b>DLC</b><span>4 bits<br>0–8 data bytes</span></div>
            <div class="frameField frameData"><b>DATA</b><span>0–8 bytes<br>Application value</span></div>
            <div class="frameField frameCheck"><b>CRC</b><span>15 bits<br>Error detection</span></div>
            <div class="frameField frameAck"><b>ACK</b><span>1 slot<br>Receiver confirms</span></div>
            <div class="frameField frameEnd"><b>EOF + IFS</b><span>7 + 3 recessive bits<br>Frame ends / bus idle</span></div>
        </div>

        <ol class="learningList">
            <li><b>SOF:</b> One dominant bit marking the beginning of the frame.</li>
            <li><b>Identifier:</b> 11-bit message ID. It identifies the message and defines arbitration priority.</li>
            <li><b>RTR:</b> Dominant for a Data Frame; recessive for a Remote Frame.</li>
            <li><b>IDE:</b> Dominant for a standard 11-bit frame; recessive for an extended 29-bit frame.</li>
            <li><b>r0:</b> Reserved bit, transmitted dominant in Classical CAN.</li>
            <li><b>DLC:</b> Four-bit Data Length Code, representing 0–8 payload bytes.</li>
            <li><b>Data:</b> Payload field containing 0–8 bytes.</li>
            <li><b>CRC:</b> 15-bit CRC used for error detection.</li>
            <li><b>CRC Delimiter:</b> One recessive bit following the CRC sequence.</li>
            <li><b>ACK Slot:</b> The transmitter sends recessive; a receiver that correctly receives the frame overwrites it with dominant.</li>
            <li><b>ACK Delimiter:</b> One recessive bit.</li>
            <li><b>EOF:</b> Seven consecutive recessive bits marking the end of the frame.</li>
            <li><b>IFS:</b> Three recessive-bit intermission period before the next frame.</li>
        </ol>

        <h3>Extended Classical CAN Data Frame — 29-bit ID</h3>
        <div class="frameDiagram">
            SOF → 11-bit Base ID → SRR → IDE → 18-bit ID Extension → RTR → r1/r0 → DLC → Data → CRC → ACK → EOF
        </div>

        <div class="frameFieldGrid compactFrameGrid" aria-label="Extended CAN frame fields">
            <div class="frameField frameStart"><b>SOF</b><span>Start</span></div>
            <div class="frameField framePriority"><b>Base ID</b><span>11 bits</span></div>
            <div class="frameField"><b>SRR + IDE</b><span>Extended format</span></div>
            <div class="frameField framePriority"><b>ID Extension</b><span>18 bits</span></div>
            <div class="frameField frameLength"><b>DLC</b><span>0–8 bytes</span></div>
            <div class="frameField frameData"><b>DATA</b><span>Payload</span></div>
            <div class="frameField frameCheck"><b>CRC</b><span>Integrity</span></div>
            <div class="frameField frameAck"><b>ACK</b><span>Confirmation</span></div>
        </div>

        <p>
            An extended CAN frame uses a 29-bit identifier: an 11-bit base ID plus
            an 18-bit identifier extension. It still supports only 0–8 data bytes.
        </p>

        <p class="learningNote">
            Do not describe CAN-ID masking as part of every CAN frame. ID masks are
            normally configured in an ECU’s acceptance filter to select which IDs it accepts.
        </p>
    </div>
</details>

<details class="learningCard">
    <summary>CAN Classic Frame</summary>

    <div class="learningContent">
        <div class="frameDiagram">
            SOF → Arbitration ID → Control → DLC → Data → CRC → ACK → EOF → Intermission
        </div>

        <div class="frameFieldGrid">
            <div class="frameField frameStart"><b>SOF</b><span>The start marker</span></div>
            <div class="frameField framePriority"><b>Arbitration</b><span>ID decides bus priority</span></div>
            <div class="frameField"><b>Control</b><span>RTR, IDE, reserved bits</span></div>
            <div class="frameField frameLength"><b>DLC</b><span>Payload length code</span></div>
            <div class="frameField frameData"><b>Data</b><span>0–8 bytes</span></div>
            <div class="frameField frameCheck"><b>CRC</b><span>Checks transmission</span></div>
            <div class="frameField frameAck"><b>ACK</b><span>Any valid receiver acknowledges</span></div>
            <div class="frameField frameEnd"><b>End</b><span>EOF then intermission</span></div>
        </div>

        <ul class="learningList">
            <li><b>SOF:</b> Start of Frame; indicates the beginning of a CAN message.</li>
            <li><b>Arbitration ID:</b> Identifier and message priority. Lower ID wins arbitration.</li>
            <li><b>Control:</b> Contains control information, including DLC.</li>
            <li><b>DLC:</b> Data Length Code; identifies the number of payload bytes.</li>
            <li><b>Data:</b> Application payload; CAN Classic supports 0–8 bytes.</li>
            <li><b>CRC:</b> Cyclic Redundancy Check used to detect transmission errors.</li>
            <li><b>ACK:</b> Receiving nodes acknowledge a valid frame.</li>
            <li><b>EOF:</b> End of Frame.</li>
            <li><b>Intermission:</b> Required idle period before another frame begins.</li>
        </ul>
    </div>
</details>

<details class="learningCard">
    <summary>CAN FD Frame and DLC Table</summary>

    <div class="learningContent">
        <div class="frameDiagram">
            SOF → Arbitration ID → FDF → BRS → ESI → DLC → Data → CRC/SBC → ACK → EOF
        </div>

        <div class="frameFieldGrid" aria-label="CAN FD frame fields">
            <div class="frameField frameStart"><b>SOF + ID</b><span>Arbitration stays at nominal bitrate</span></div>
            <div class="frameField"><b>FDF</b><span>Marks CAN FD format</span></div>
            <div class="frameField frameSpeed"><b>BRS</b><span>May switch to faster data bitrate</span></div>
            <div class="frameField"><b>ESI</b><span>Transmitter error-state indicator</span></div>
            <div class="frameField frameLength"><b>DLC</b><span>Maps to 0–64 bytes</span></div>
            <div class="frameField frameData"><b>DATA</b><span>Up to 64 bytes</span></div>
            <div class="frameField frameCheck"><b>CRC + SBC</b><span>Enhanced protection</span></div>
            <div class="frameField frameAck"><b>ACK + EOF</b><span>Confirmation and frame end</span></div>
        </div>

        <ul class="learningList">
            <li><b>FDF:</b> Flexible Data-rate Format; identifies a CAN FD frame.</li>
            <li><b>BRS:</b> Bit Rate Switch; enables faster bitrate during the data phase.</li>
            <li><b>ESI:</b> Error State Indicator; indicates the transmitter error state.</li>
            <li><b>CRC/SBC:</b> CAN FD uses enhanced CRC protection; ISO CAN FD includes protected stuff-bit count information.</li>
        </ul>

        <table class="learningTable smallTable">
            <tr>
                <th>DLC</th>
                <th>Data bytes</th>
            </tr>
            <tr><td>0–8</td><td>0–8</td></tr>
            <tr><td>9</td><td>12</td></tr>
            <tr><td>10</td><td>16</td></tr>
            <tr><td>11</td><td>20</td></tr>
            <tr><td>12</td><td>24</td></tr>
            <tr><td>13</td><td>32</td></tr>
            <tr><td>14</td><td>48</td></tr>
            <tr><td>15</td><td>64</td></tr>
        </table>
    </div>
</details>

<details class="learningCard">
    <summary>UDS on CAN Example</summary>

    <div class="learningContent">
        <p class="learningNote">
            The CAN IDs below are common OBD-II examples, not universal values. Actual
            physical and functional diagnostic IDs are defined by the vehicle manufacturer.
        </p>
        <div class="codeBox">Tester → ECU: 7E0  03 22 F1 90 00 00 00 00</div>
        <div class="codeBox">ECU → Tester: 7E8  10 14 62 F1 90 31 48 47</div>
        <div class="codeBox">Tester → ECU: 7E0  30 00 00 00 00 00 00 00</div>
        <div class="codeBox">ECU → Tester: 7E8  21 42 48 34 31 4A 58 4D</div>
        <div class="codeBox">ECU → Tester: 7E8  22 4E 31 30 39 31 38 36</div>

        <ul class="learningList">
            <li><b>7E0:</b> Example physical request CAN ID for an ECU.</li>
            <li><b>03:</b> ISO-TP single-frame payload length: 3 bytes.</li>
            <li><b>22:</b> UDS Read Data By Identifier service.</li>
            <li><b>F1 90:</b> DID commonly used for VIN.</li>
            <li><b>7E8:</b> Example ECU response CAN ID.</li>
            <li><b>10 14:</b> ISO-TP First Frame; response contains 0x14 (20) bytes.</li>
            <li><b>62:</b> Positive response to service 0x22.</li>
            <li><b>30 00 00:</b> ISO-TP Flow Control: continue sending, unlimited block size, no minimum separation time.</li>
            <li><b>21 / 22:</b> ISO-TP Consecutive Frames. The low nibble is the sequence number.</li>
        </ul>

        <div class="learningFlow" aria-label="CAN arbitration flow">
            <div class="flowStep"><span>1</span><b>Two nodes start</b><small>Both send the CAN ID bit-by-bit.</small></div>
            <div class="flowArrow">→</div>
            <div class="flowStep"><span>2</span><b>Bus is monitored</b><small>Dominant 0 overrides recessive 1.</small></div>
            <div class="flowArrow">→</div>
            <div class="flowStep flowAccent"><span>3</span><b>Lower ID wins</b><small>The losing node waits and retries.</small></div>
        </div>
    </div>
</details>

<details class="learningCard">
    <summary>ISO-TP: Multi-Frame Communication</summary>

    <div class="learningContent">
        <p>
            ISO-TP (ISO 15765-2) carries diagnostic payloads that do not fit in one CAN frame.
            The first byte is the Protocol Control Information (PCI), which identifies the frame type.
        </p>
        <table class="learningTable smallTable">
            <tr><th>Frame type</th><th>PCI example</th><th>Purpose</th></tr>
            <tr><td>Single Frame (SF)</td><td>03</td><td>Payload fits in one frame; 3 bytes follow in this example.</td></tr>
            <tr><td>First Frame (FF)</td><td>10 14</td><td>Starts a multi-frame message with a total length of 0x14 bytes.</td></tr>
            <tr><td>Flow Control (FC)</td><td>30 00 00</td><td>Receiver permits transmission; block size is 0 and STmin is 0 ms.</td></tr>
            <tr><td>Consecutive Frame (CF)</td><td>21</td><td>Continues the message; sequence number increments from 1 to 15, then wraps.</td></tr>
        </table>
        <div class="learningFlow" aria-label="ISO-TP multi-frame message flow">
            <div class="flowStep"><span>ECU</span><b>First Frame</b><small><code>10 14</code> announces 20 bytes.</small></div>
            <div class="flowArrow">→</div>
            <div class="flowStep"><span>Tester</span><b>Flow Control</b><small><code>30 00 00</code> allows the transfer.</small></div>
            <div class="flowArrow">→</div>
            <div class="flowStep flowAccent"><span>ECU</span><b>Consecutive Frames</b><small><code>21</code>, <code>22</code> complete the payload.</small></div>
        </div>
        <p class="learningNote">
            Common ISO-TP problems include missing Flow Control frames, incorrect sequence numbers,
            response timeouts, and a sender exceeding the receiver's requested separation time (STmin).
        </p>
    </div>
</details>

<details class="learningCard">
    <summary>CAN Physical Layer and Fault Finding</summary>

    <div class="learningContent">
        <ul class="learningList">
            <li><b>Termination:</b> A high-speed CAN bus normally has two 120 Ω termination resistors, one at each end of the backbone.</li>
            <li><b>Resistance check:</b> With the network powered down, measuring CAN-H to CAN-L at the diagnostic connector often reads about 60 Ω when both terminators are present.</li>
            <li><b>120 Ω reading:</b> Often suggests one terminator or part of the network is disconnected.</li>
            <li><b>Very low resistance:</b> Can indicate a short circuit or an extra termination resistor.</li>
            <li><b>Voltage check:</b> At idle, CAN-H and CAN-L are commonly near 2.5 V. During a dominant bit, CAN-H rises and CAN-L falls. Exact values depend on the transceiver and network.</li>
            <li><b>Safety:</b> Do resistance measurements only with power removed; follow vehicle service information before probing or disconnecting ECUs.</li>
        </ul>
        <h3>Quick Diagnostic Sequence</h3>
        <div class="learningFlow">
            <div class="flowStep"><span>1</span><b>Read DTCs</b><small>Look for U-codes and communication faults.</small></div>
            <div class="flowArrow">→</div>
            <div class="flowStep"><span>2</span><b>Power off</b><small>Measure CAN-H to CAN-L resistance.</small></div>
            <div class="flowArrow">→</div>
            <div class="flowStep"><span>3</span><b>Check waveform</b><small>Verify voltage and bus activity with power on.</small></div>
            <div class="flowArrow">→</div>
            <div class="flowStep flowAccent"><span>4</span><b>Isolate fault</b><small>Use wiring diagrams and unplug only as instructed.</small></div>
        </div>
        <table class="learningTable diagnosticTable">
            <tr><th>Power-off resistance</th><th>What it may indicate</th><th>Next check</th></tr>
            <tr><td>About 60 Ω</td><td>Both terminators are likely present.</td><td>Check bus activity and ECU communication.</td></tr>
            <tr><td>About 120 Ω</td><td>One terminator or one network section may be open.</td><td>Check network topology, connectors, and terminations.</td></tr>
            <tr><td>Very low / 0 Ω</td><td>Possible short circuit or excess termination.</td><td>Inspect wiring before reconnecting modules.</td></tr>
        </table>
    </div>
</details>

<details class="learningCard">
    <summary>CAN Errors, Bit Stuffing and Bus-Off</summary>

    <div class="learningContent">
        <ul class="learningList">
            <li><b>Bit stuffing:</b> After five consecutive bits of the same value, the transmitter inserts one opposite-value stuff bit. Receivers remove it. This maintains clock synchronization.</li>
            <li><b>Bit error:</b> A transmitting node reads a bus value different from the value it sent, outside arbitration and acknowledgement rules.</li>
            <li><b>Stuff, form and CRC errors:</b> Respectively indicate invalid stuffing, invalid fixed-format fields, or failed data integrity checking.</li>
            <li><b>ACK error:</b> No receiver made the ACK slot dominant. This can occur when no node receives the frame correctly.</li>
            <li><b>Error-active:</b> Normal node state; it can transmit active error flags.</li>
            <li><b>Error-passive:</b> Node has accumulated errors and transmits passive error flags.</li>
            <li><b>Bus-off:</b> Node disconnects itself from CAN after excessive transmit errors and must be recovered according to ECU/network strategy.</li>
        </ul>
    </div>
</details>

<details class="learningCard">
    <summary>Common UDS Services and Negative Responses</summary>

    <div class="learningContent">
        <table class="learningTable smallTable">
            <tr><th>Service</th><th>Name</th><th>Typical use</th></tr>
            <tr><td>10</td><td>Diagnostic Session Control</td><td>Select default, extended, or programming session.</td></tr>
            <tr><td>11</td><td>ECU Reset</td><td>Request a controlled ECU reset.</td></tr>
            <tr><td>19</td><td>Read DTC Information</td><td>Read diagnostic trouble codes and their status.</td></tr>
            <tr><td>22</td><td>Read Data By Identifier</td><td>Read a DID such as a VIN, serial number, or live value.</td></tr>
            <tr><td>27</td><td>Security Access</td><td>Obtain permission for protected functions using a seed/key process.</td></tr>
            <tr><td>2E</td><td>Write Data By Identifier</td><td>Write permitted ECU data.</td></tr>
            <tr><td>31</td><td>Routine Control</td><td>Start, stop, or request results from an ECU routine.</td></tr>
        </table>
        <div class="codeBox">Negative response: 7F 22 31</div>
        <p><b>7F</b> means negative response, <b>22</b> is the original service, and <b>31</b> is the NRC (Request Out Of Range). A frequent temporary response is <b>7F 22 78</b>: Response Pending.</p>
        <div class="learningFlow" aria-label="UDS diagnostic request flow">
            <div class="flowStep"><span>1</span><b>Tester sends request</b><small>Example: <code>22 F1 90</code>.</small></div>
            <div class="flowArrow">→</div>
            <div class="flowStep"><span>2</span><b>ECU validates it</b><small>Checks session, security, length, and DID.</small></div>
            <div class="flowArrow">→</div>
            <div class="flowStep flowAccent"><span>3</span><b>ECU responds</b><small>Positive <code>62</code> or negative <code>7F</code>.</small></div>
        </div>
    </div>
</details>

<details class="learningCard">
    <summary>DTCs and OBD-II Basics</summary>

    <div class="learningContent">
        <ul class="learningList">
            <li><b>DTC format:</b> P0300 is a powertrain code; the first letter can also be B (body), C (chassis), or U (network).</li>
            <li><b>P0300:</b> A common example meaning random/multiple-cylinder misfire detected. Always confirm the manufacturer definition.</li>
            <li><b>Freeze-frame data:</b> A snapshot of operating conditions captured when a fault was detected, such as engine speed, coolant temperature, and load.</li>
            <li><b>OBD-II vs UDS:</b> OBD-II standardizes emissions-related diagnostics, while UDS provides a broader manufacturer-configured diagnostic protocol for ECU functions.</li>
            <li><b>Good workflow:</b> Read DTCs and freeze-frame data, inspect the network and wiring, verify live data, repair the cause, then clear faults only after recording evidence.</li>
        </ul>
        <div class="learningFlow" aria-label="DTC handling flow">
            <div class="flowStep"><span>Fault</span><b>Monitor detects issue</b><small>Example: sensor value is implausible.</small></div>
            <div class="flowArrow">→</div>
            <div class="flowStep"><span>DEM</span><b>Debounces event</b><small>Prevents one bad sample becoming a false DTC.</small></div>
            <div class="flowArrow">→</div>
            <div class="flowStep"><span>DTC</span><b>Status is stored</b><small>Freeze-frame data may be captured.</small></div>
            <div class="flowArrow">→</div>
            <div class="flowStep flowAccent"><span>Tester</span><b>Reads &amp; repairs</b><small>Confirm root cause before clearing.</small></div>
        </div>
    </div>
</details>

<details class="learningCard">
    <summary>AUTOSAR Diagnostic Stack</summary>

    <div class="learningContent">
        <h3>What Is AUTOSAR?</h3>
        <p>
            AUTOSAR means <b>AUTomotive Open System ARchitecture</b>. It is a set of
            automotive software standards, interfaces, and configuration rules—not a single
            program that runs an ECU by itself. It gives vehicle manufacturers and suppliers
            a common way to structure ECU software so that application code, hardware drivers,
            diagnostics, and communication modules can work together.
        </p>
        <p>
            In practical terms, AUTOSAR separates <b>what the vehicle function does</b>
            (for example, calculate wheel speed or control a fan) from <b>how the ECU hardware
            communicates and operates</b> (CAN controller, memory, diagnostic protocol, and OS).
            This makes it easier to reuse a function on a different ECU or microcontroller.
        </p>

        <h3>A Real ECU Example</h3>
        <p>
            Imagine a body-control ECU that receives a CAN message saying a door is open.
            The CAN driver receives the frame, AUTOSAR communication modules unpack the
            door-status signal, and the RTE delivers it to the body-control SWC. The SWC decides
            to turn on an interior light, then sends its output through the RTE and communication
            stack to the output driver. If a tester asks for door status using UDS, DCM calls the
            configured software function and returns the value through CAN.
        </p>
        <div class="autosarDiagram">
            Door CAN frame → CanDrv / CanIf → PduR / Com → RTE → Body-control SWC → RTE → Output driver → Interior light
        </div>

        <div class="autosarDiagram">
            Tester → CAN → CanIf → CanTp → PduR → DCM → DEM / Application Software
        </div>

        <ul class="learningList">
            <li><b>SWC:</b> Software Component; application-level ECU function.</li>
            <li><b>RTE:</b> Runtime Environment; connects software components with basic software.</li>
            <li><b>BSW:</b> Basic Software; standard AUTOSAR services and communication layers.</li>
            <li><b>CanIf:</b> CAN Interface; connects the CAN driver to upper software layers.</li>
            <li><b>CanTp:</b> CAN Transport Protocol; supports ISO-TP multi-frame messages.</li>
            <li><b>PduR:</b> PDU Router; routes messages between AUTOSAR modules.</li>
            <li><b>DCM:</b> Diagnostic Communication Manager; processes UDS services.</li>
            <li><b>DEM:</b> Diagnostic Event Manager; stores and manages diagnostic events/DTCs.</li>
            <li><b>NvM:</b> Non-Volatile Memory Manager; stores persistent ECU data.</li>
            <li><b>ARXML:</b> AUTOSAR XML configuration and interface-description file format.</li>
        </ul>

        <h3>Classic Platform Architecture</h3>
        <div class="autosarDiagram">
            Application SWCs ↔ RTE ↔ Basic Software (Services / ECU Abstraction / MCAL) ↔ ECU Hardware
        </div>
        <ul class="learningList">
            <li><b>Application layer:</b> Contains Software Components (SWCs), such as engine control, door control, or battery management logic.</li>
            <li><b>RTE:</b> Generates standardized interfaces between SWCs and BSW, so application software is less dependent on a specific ECU hardware design.</li>
            <li><b>Services layer:</b> Provides system services such as diagnostics, memory, operating-system functions, communication management, and watchdog handling.</li>
            <li><b>ECU Abstraction:</b> Hides ECU-specific sensor, actuator, and peripheral details from upper layers.</li>
            <li><b>MCAL:</b> Microcontroller Abstraction Layer. It contains standardized drivers for the microcontroller peripherals, including CAN, ADC, PWM, SPI, and flash.</li>
            <li><b>Complex Device Driver (CDD):</b> Used when a function needs direct or non-standard hardware access that does not fit the normal BSW architecture.</li>
        </ul>

        <h3>CAN Message Path Inside an ECU</h3>
        <div class="autosarDiagram">
            CAN bus → CAN transceiver → CanDrv → CanIf → PduR → Com → RTE → Receiving SWC
        </div>
        <ul class="learningList">
            <li><b>CAN transceiver:</b> Converts the physical CAN-H/CAN-L bus signals into logic signals for the controller.</li>
            <li><b>CanDrv:</b> MCAL CAN driver that controls the CAN controller hardware, mailboxes, and interrupts.</li>
            <li><b>CanIf:</b> Gives upper layers a hardware-independent CAN interface and applies configured controller/PDU handling.</li>
            <li><b>PduR:</b> Routes PDUs between communication and diagnostic modules without changing their payload.</li>
            <li><b>Com:</b> Packs and unpacks application signals into I-PDUs; it can handle signal timeouts, update bits, and transmission modes.</li>
            <li><b>ComM / CanSM:</b> Communication Manager requests network communication modes; CAN State Manager controls CAN controller and transceiver state transitions.</li>
        </ul>

        <h3>Diagnostic Processing Path</h3>
        <div class="autosarDiagram">
            UDS request → CanTp → PduR → DCM → DID / Routine / Security callback → SWC or BSW service
        </div>
        <ul class="learningList">
            <li><b>DCM DSL:</b> Diagnostic Session Layer manages protocol timing, tester connections, and diagnostic sessions.</li>
            <li><b>DCM DSD:</b> Diagnostic Service Dispatcher validates and dispatches UDS services.</li>
            <li><b>DCM DSP:</b> Diagnostic Service Processing performs configured services such as reading DIDs, clearing DTCs, and routine control.</li>
            <li><b>DID callback:</b> A configured software function returns the value for a diagnostic identifier, such as a VIN or sensor reading.</li>
            <li><b>DEM event:</b> Application or BSW reports an event as passed or failed. DEM applies debounce and status logic before storing a DTC.</li>
            <li><b>FiM:</b> Function Inhibition Manager can prevent a function from running when configured diagnostic events are active.</li>
        </ul>

        <h3>Configuration and Troubleshooting</h3>
        <ul class="learningList">
            <li><b>ARXML configuration:</b> Describes ECUs, ports, signals, PDUs, CAN frames, diagnostic data, and module settings. Configuration tools generate much of the BSW configuration code.</li>
            <li><b>Signal vs PDU vs frame:</b> A signal is one value (for example, vehicle speed). Com packs signals into an I-PDU, and the lower communication stack sends that PDU in a CAN frame.</li>
            <li><b>Missing application value:</b> Check the CAN frame first, then PDU routing, Com signal configuration, RTE mapping, and the receiving SWC runnable.</li>
            <li><b>UDS service rejected:</b> Check the active diagnostic session, security level, DCM service/DID configuration, request length, and any configured application callback.</li>
            <li><b>DTC not stored:</b> Check the event report, debounce configuration, operation cycle, enable conditions, DEM memory destination, and NvM write status.</li>
        </ul>

        <h3>How an AUTOSAR ECU Is Built in Practice</h3>
        <ol class="learningList">
            <li><b>Define the system:</b> Decide the ECUs, CAN messages, signals, diagnostics, timing, and vehicle functions. Network signals may begin in a DBC file and are represented in AUTOSAR as ARXML.</li>
            <li><b>Design the application:</b> Create SWCs, their ports, interfaces, runnables, and timing. Write the function code in C/C++ or generate it from a model when the project uses model-based design.</li>
            <li><b>Configure the ECU:</b> Select the microcontroller, MCAL, operating system, CAN stack, Com, DCM, DEM, NvM, and other BSW modules. Configure CAN IDs, PDUs, signal mappings, DIDs, DTCs, tasks, and memory.</li>
            <li><b>Generate code:</b> AUTOSAR tools read the ARXML configuration and generate RTE code, BSW configuration, and supporting source/header files. Developers normally edit their application code and approved callback areas—not generated files.</li>
            <li><b>Integrate and compile:</b> Combine generated code, BSW/MCAL libraries, application code, and startup code. Build with the ECU's embedded compiler and linker to create a flashable binary.</li>
            <li><b>Flash and validate:</b> Program the ECU through a bootloader/debug interface, then test CAN traffic, UDS diagnostics, signals, DTCs, timing, and hardware outputs on a bench or vehicle.</li>
        </ol>

        <h3>Typical Software and Equipment</h3>
        <table class="learningTable smallTable">
            <tr><th>Need</th><th>Typical examples</th><th>What it does</th></tr>
            <tr><td>AUTOSAR authoring/configuration</td><td>Vector DaVinci, ETAS ISOLAR, Elektrobit tresos Studio</td><td>Creates and validates ARXML, configures BSW, and generates configuration/RTE-related code.</td></tr>
            <tr><td>Basic software and MCAL</td><td>Vector MICROSAR, ETAS RTA-CAR, Elektrobit tresos AutoCore, MCU-vendor MCAL</td><td>Provides the AUTOSAR modules and low-level microcontroller drivers used by the ECU.</td></tr>
            <tr><td>Application development</td><td>VS Code, Eclipse-based IDEs, vendor IDEs, MATLAB/Simulink</td><td>Writes C/C++ application code or produces code from control models.</td></tr>
            <tr><td>Compiler/debugger</td><td>Tasking, Green Hills, IAR, HighTec, or an MCU-vendor toolchain; J-Link, Lauterbach</td><td>Builds, flashes, and debugs the ECU firmware. The choice depends on the microcontroller and project.</td></tr>
            <tr><td>CAN and diagnostic testing</td><td>Vector CANoe/CANalyzer, ETAS INCA, Kvaser tools, PCAN-View</td><td>Monitors CAN, simulates nodes, sends UDS requests, and validates the ECU on a bench.</td></tr>
        </table>
        <p class="learningNote">
            Commercial AUTOSAR stacks and configuration tools are normally chosen by the OEM or Tier-1 supplier. A learner can understand the workflow with CAN tools and C programming, but production ECU work requires the approved stack, MCAL, compiler, and configuration files for that specific project.
        </p>

        <h3>Small Practical Learning Project</h3>
        <ol class="learningList">
            <li>Choose a development board with CAN capability and a compatible CAN transceiver.</li>
            <li>Send one CAN frame containing a simple signal, such as a counter or simulated temperature.</li>
            <li>Model the value as a signal inside an I-PDU, then map it to a CAN frame in the communication configuration.</li>
            <li>Create one SWC runnable that receives the signal and turns an LED on when the value exceeds a threshold.</li>
            <li>Add a read-only DID that reports the same value through UDS service 0x22.</li>
            <li>Use a CAN analysis tool to confirm the raw frame, the decoded signal, and the UDS response all agree.</li>
        </ol>

        <p class="learningNote">
            This page describes AUTOSAR Classic Platform, which is common in deeply embedded ECUs. AUTOSAR Adaptive Platform uses a service-oriented architecture on higher-performance hardware and has a different software model.
        </p>
    </div>
</details>

<details class="learningCard">
    <summary>Hardware-in-the-Loop (HIL) Testing</summary>

    <div class="learningContent">
        <h3>What is HIL testing?</h3>
        <p>
            Hardware-in-the-Loop (HIL) testing connects a real ECU to a real-time simulator that behaves like the rest
            of the vehicle. Instead of waiting for a complete vehicle or road test, the simulator supplies sensor signals,
            network traffic, loads, and fault conditions while it measures the ECU outputs. This lets a team test control,
            diagnostics, timing, and failure handling safely and repeatably.
        </p>

        <div class="hilDiagram" role="img" aria-label="HIL test system diagram showing test automation and real-time plant model connected through I/O interface to the ECU under test, CAN network, and power supply.">
            <div class="hilDiagramSide">
                <span class="hilNode hilAutomation">Test automation<br><small>Test cases &amp; reports</small></span>
                <span class="hilArrow">&#8595;</span>
                <span class="hilNode hilSimulator">Real-time HIL simulator<br><small>Vehicle / plant model</small></span>
            </div>
            <span class="hilConnector">Sensor, actuator &amp; bus simulation &#8596;</span>
            <div class="hilEcuGroup">
                <span class="hilNode hilEcu">ECU under test<br><small>Production hardware + software</small></span>
                <span class="hilSupport">CAN / LIN / Ethernet<br>12 V supply &amp; electronic loads</span>
            </div>
        </div>
        <p class="learningNote">
            A HIL system tests the ECU hardware and embedded software together. It is different from Model-in-the-Loop
            (MIL), which runs models only, and Software-in-the-Loop (SIL), which runs compiled software without the target ECU.
        </p>

        <h3>Core components of a HIL setup</h3>
        <table class="learningTable smallTable">
            <tr><th>Component</th><th>Purpose</th><th>Typical examples</th></tr>
            <tr><td>ECU under test (EUT)</td><td>The controller, its production harness, and the software build being validated.</td><td>Engine, body, brake, battery, gateway, or ADAS ECU</td></tr>
            <tr><td>Real-time simulator</td><td>Runs the vehicle/plant model at deterministic time steps and exchanges signals with the ECU.</td><td>dSPACE, NI PXI, ETAS, Speedgoat, or a custom real-time target</td></tr>
            <tr><td>I/O and signal conditioning</td><td>Generates and measures analog, digital, PWM, frequency, resistance, and current signals at safe electrical levels.</td><td>ADC/DAC, digital I/O, relay, load and sensor-simulation modules</td></tr>
            <tr><td>Network interfaces</td><td>Simulate or monitor in-vehicle communication and diagnostic traffic.</td><td>CAN/CAN FD, LIN, FlexRay, Automotive Ethernet, UDS tester</td></tr>
            <tr><td>Power and protection</td><td>Provides controlled battery voltage and protects equipment from shorts, overcurrent, and wiring mistakes.</td><td>Programmable 12 V supply, fuse panel, relay matrix, electronic load</td></tr>
            <tr><td>Plant model and test automation</td><td>Models the vehicle environment and runs repeatable test cases with pass/fail criteria.</td><td>MATLAB/Simulink models, Python/C# test scripts, CANoe test modules</td></tr>
        </table>

        <h3>How the ECU relates to the HIL bench</h3>
        <p>
            The ECU is the <b>real hardware under test</b>. Its application software makes decisions from simulated sensor
            and network inputs, then drives outputs that the HIL measures or loads electrically. The HIL must reproduce the
            ECU's electrical and communication environment accurately enough for the feature being tested; it does not replace
            the ECU firmware, calibration, or diagnostic configuration.
        </p>
        <div class="learningFlow hilTestFlow">
            <span>HIL simulates inputs<br><small>sensor voltage, frequency, CAN messages</small></span><b>&#8594;</b><span>ECU executes its production logic<br><small>application, BSW, diagnostics</small></span><b>&#8594;</b><span>HIL observes outputs<br><small>PWM, relay, CAN, DTC, UDS</small></span><b>&#8594;</b><span>Automation compares with requirement</span>
        </div>

        <h3>ECU configuration required before HIL testing</h3>
        <table class="learningTable smallTable">
            <tr><th>Configuration area</th><th>Required details</th><th>Why it matters on HIL</th></tr>
            <tr><td>ECU identity and software</td><td>ECU part number, hardware revision, bootloader, software build ID, calibration/parameter-set version, coding/variant.</td><td>Every result must be traceable to the exact ECU configuration.</td></tr>
            <tr><td>Power mode</td><td>KL30 battery, KL15 ignition, ground pins, wake-up source, sleep timing, current limit, power-up/power-down sequence.</td><td>Many ECU functions, diagnostics, and DTCs depend on operating mode and voltage.</td></tr>
            <tr><td>Pin-out and electrical I/O</td><td>Connector name, pin number, signal direction, type, range, pull-up/pull-down, load, and safe fault-injection method.</td><td>Prevents wrong wiring and ensures the simulator can reproduce the real sensor/actuator circuit.</td></tr>
            <tr><td>Network and diagnostics</td><td>CAN/CAN FD channel, bitrate, termination, CAN IDs, DBC/ARXML, diagnostic address, UDS session/security requirements, P2/S3 timings.</td><td>Allows the HIL to simulate other ECUs and verify UDS/DTC behavior correctly.</td></tr>
            <tr><td>Application and calibration</td><td>Signal scaling, units, default values, thresholds, debounce, substitute values, control gains, operation-cycle conditions.</td><td>These settings determine the expected ECU response and fault behavior.</td></tr>
            <tr><td>Diagnostics and safety</td><td>DTC/event ID, enable conditions, fault detection and healing thresholds, limp-home state, output inhibit rules, watchdog/reset behavior.</td><td>Defines what a fault-injection test must verify.</td></tr>
        </table>

        <h3>HIL I/O mapping: a configuration example</h3>
        <table class="learningTable smallTable">
            <tr><th>ECU signal</th><th>ECU pin / network</th><th>HIL channel</th><th>Configuration details</th><th>Test evidence</th></tr>
            <tr><td>Coolant temperature input</td><td>C1-24, analog sensor input</td><td>AI_SIM_03</td><td>NTC resistance model; valid range -40 to 150 &deg;C; open/short fault paths enabled</td><td>Measured ECU DID, CAN signal, DTC status</td></tr>
            <tr><td>Cooling-fan command</td><td>C2-11, low-side PWM output</td><td>DO_MEAS_07 + load</td><td>12 V load, current measurement, PWM frequency/duty-cycle capture</td><td>Duty cycle, current, reaction time</td></tr>
            <tr><td>Vehicle speed</td><td>CAN1, message 0x1A0</td><td>CAN1_SIM</td><td>500 kbit/s, rolling counter, checksum, 10 ms cycle time, signal scaling from DBC</td><td>CAN trace and ECU response</td></tr>
            <tr><td>UDS tester connection</td><td>CAN1 physical/functional address</td><td>CAN1_DIAG</td><td>Diagnostic address, session 0x03, configured security level and timing</td><td>Request/response trace and NRC check</td></tr>
        </table>

        <h3>Common HIL and ECU nomenclature</h3>
        <table class="learningTable smallTable">
            <tr><th>Term</th><th>Meaning</th></tr>
            <tr><td><b>EUT / DUT</b></td><td>Equipment/Device Under Test; in this context, the ECU being validated.</td></tr>
            <tr><td><b>SUT</b></td><td>System Under Test; may include the ECU plus its harness, loads, and network context.</td></tr>
            <tr><td><b>Plant model</b></td><td>Real-time mathematical representation of the physical system around the ECU, such as engine, motor, wheel, battery, or body function.</td></tr>
            <tr><td><b>Restbus simulation</b></td><td>Simulation of the network nodes that are absent from the HIL bench, including their messages, counters, and checksums.</td></tr>
            <tr><td><b>Stimulus / response</b></td><td>A controlled input sent to the ECU and the measured ECU behavior that follows.</td></tr>
            <tr><td><b>HIL channel</b></td><td>A named physical or virtual simulator connection, for example <code>AI_SIM_03</code> or <code>CAN1_SIM</code>.</td></tr>
            <tr><td><b>Signal scaling</b></td><td>Conversion between electrical/raw values and engineering units, for example ADC counts to &deg;C or a CAN raw value to km/h.</td></tr>
            <tr><td><b>Fault injection</b></td><td>Deliberately introducing a controlled electrical, network, sensor, or timing fault to verify diagnostics and fail-safe behavior.</td></tr>
            <tr><td><b>Variant / coding</b></td><td>Parameter selection that enables vehicle-, market-, or feature-specific ECU behavior. Record it with every test run.</td></tr>
        </table>

        <h3>Minimum configuration checklist</h3>
        <ul class="learningList">
            <li>Approved ECU, harness drawing, pin-out, software/calibration version, and coding/variant are identified.</li>
            <li>Each HIL channel has an owner, ECU pin/network reference, direction, unit, range, scaling, and safe state.</li>
            <li>Power supply limits, fuse ratings, grounds, emergency stop, and allowable actuator-load currents are reviewed.</li>
            <li>Network databases and diagnostic definitions match the ECU build: DBC/ARXML, CAN IDs, diagnostics addresses, DIDs, routines, and DTCs.</li>
            <li>For each test, requirements, stimulus, expected response, timing limit, and evidence to capture are defined before execution.</li>
        </ul>

        <h3>How to perform HIL testing</h3>
        <ol class="learningList">
            <li><b>Define the requirement:</b> Turn a feature or safety requirement into measurable inputs, expected ECU outputs, timing limits, and pass/fail criteria.</li>
            <li><b>Build the plant model:</b> Model only the vehicle behavior needed by the ECU, such as wheel speed, motor position, temperature, voltage, or another ECU's CAN messages.</li>
            <li><b>Configure the bench:</b> Map ECU pins and network messages to the HIL I/O. Verify voltage ranges, grounds, termination, fuses, and emergency-stop behavior before powering the ECU.</li>
            <li><b>Calibrate and sanity-check:</b> Start with known-safe values. Confirm that each simulated input is read correctly and each ECU output is measured correctly.</li>
            <li><b>Automate nominal scenarios:</b> Sweep operating conditions and check control performance, network messages, UDS responses, DTC behavior, and timing.</li>
            <li><b>Inject faults:</b> Simulate opens, shorts, implausible sensor values, bus loss, low voltage, message timeouts, and stuck actuators. Confirm the expected DTC, fail-safe action, and recovery.</li>
            <li><b>Review evidence:</b> Save traces, measurements, ECU logs, calibration/software versions, and a clear pass/fail report so the test is reproducible.</li>
        </ol>

        <h3>Starter test example: coolant-temperature sensor fault</h3>
        <div class="learningFlow hilTestFlow">
            <span>Simulate 90 &deg;C</span><b>&#8594;</b><span>Verify normal ECU value</span><b>&#8594;</b><span>Inject open circuit</span><b>&#8594;</b><span>Verify substitute value, DTC &amp; fail-safe</span><b>&#8594;</b><span>Restore signal and verify recovery</span>
        </div>
        <p>
            For each step, record the signal value, ECU output, CAN/UDS evidence, DTC status, and response time. The exact
            diagnostic thresholds and recovery rules must come from the ECU's approved requirements, not assumptions.
        </p>
    </div>
</details>

<section class="learningQuiz" aria-labelledby="quickCheckTitle">
    <div>
        <p class="learningEyebrow">QUICK CHECK</p>
        <h3 id="quickCheckTitle">Test your understanding</h3>
        <p>Which AUTOSAR module routes PDUs between communication and diagnostic modules?</p>
    </div>
    <div class="quizAnswers" role="group" aria-label="Quiz answers">
        <button type="button" data-quiz-answer="wrong">CanIf</button>
        <button type="button" data-quiz-answer="correct">PduR</button>
        <button type="button" data-quiz-answer="wrong">DEM</button>
    </div>
    <p id="quizFeedback" class="quizFeedback" aria-live="polite"></p>
</section>
`;

const learningCards = [...learningContainer.querySelectorAll(".learningCard")];
const learningStorageKey = "automotiveToolkitLearningProgress";
const savedProgress = new Set(JSON.parse(localStorage.getItem(learningStorageKey) || "[]"));

learningCards.forEach((card, index) => {
    const topicName = card.querySelector("summary").textContent.trim();
    const topicId = "learning-topic-" + index;
    const content = card.querySelector(".learningContent");
    const actions = document.createElement("div");

    card.dataset.topicId = topicId;
    actions.className = "learningCardActions";
    actions.innerHTML =
        '<span class="learningTopicTag">Topic ' + String(index + 1).padStart(2, "0") + '</span>' +
        '<button type="button" class="learningCompleteButton" aria-label="Mark ' + topicName + ' as learned"></button>';
    content.prepend(actions);

    const completeButton = actions.querySelector(".learningCompleteButton");
    const updateCardState = () => {
        const complete = savedProgress.has(topicId);
        card.classList.toggle("isComplete", complete);
        completeButton.textContent = complete ? "✓ Learned" : "Mark as learned";
        completeButton.setAttribute("aria-pressed", String(complete));
    };

    completeButton.addEventListener("click", () => {
        if (savedProgress.has(topicId)) {
            savedProgress.delete(topicId);
        } else {
            savedProgress.add(topicId);
        }
        localStorage.setItem(learningStorageKey, JSON.stringify([...savedProgress]));
        updateCardState();
        updateLearningProgress();
    });

    updateCardState();
});

function updateLearningProgress() {
    const completed = savedProgress.size;
    const total = learningCards.length;
    const percentage = total ? (completed / total) * 100 : 0;
    document.getElementById("learningProgressText").textContent = completed + " of " + total + " topics";
    document.getElementById("learningProgressBar").style.width = percentage + "%";
}

document.getElementById("learningSearch").addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase().trim();
    learningCards.forEach((card) => {
        const matches = card.textContent.toLowerCase().includes(query);
        card.hidden = !matches;
        if (query && matches) card.open = true;
    });
});

document.getElementById("learningExpandAll").addEventListener("click", () => {
    learningCards.forEach((card) => {
        card.hidden = false;
        card.open = true;
    });
    document.getElementById("learningSearch").value = "";
});

document.getElementById("learningCollapseAll").addEventListener("click", () => {
    learningCards.forEach((card) => {
        card.open = false;
    });
});

document.getElementById("learningResetProgress").addEventListener("click", () => {
    savedProgress.clear();
    localStorage.removeItem(learningStorageKey);
    learningCards.forEach((card) => {
        card.classList.remove("isComplete");
        const button = card.querySelector(".learningCompleteButton");
        button.textContent = "Mark as learned";
        button.setAttribute("aria-pressed", "false");
    });
    updateLearningProgress();
});

document.querySelectorAll("[data-quiz-answer]").forEach((button) => {
    button.addEventListener("click", () => {
        const correct = button.dataset.quizAnswer === "correct";
        document.querySelectorAll("[data-quiz-answer]").forEach((answer) => {
            answer.classList.remove("isCorrect", "isWrong");
        });
        button.classList.add(correct ? "isCorrect" : "isWrong");
        document.getElementById("quizFeedback").textContent = correct
            ? "Correct — PduR (PDU Router) routes PDUs between AUTOSAR modules."
            : "Not quite. Review the CAN message path, then try again.";
    });
});

updateLearningProgress();
