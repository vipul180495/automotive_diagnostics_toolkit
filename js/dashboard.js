// ===============================
// DASHBOARD STATISTICS
// ===============================
function loadCount(file, id) {
    fetch(file)

        .then(response => {
            if (!response.ok) {

                throw new Error(file + " not found");

            }
            return response.json();
        })
        .then(data => {
            document
                .getElementById(id)
                .innerHTML = data.length;
        })
        .catch(error => {
            console.warn(
                "Dashboard:",
                error.message
            );
            // keep zero if database missing

            document
                .getElementById(id)
                .innerHTML = "0";
        });
}
loadCount(
    "database/ecu.json",
    "ecuCount"
);
loadCount(
    "database/dtc.json",
    "dtcCount"
);
loadCount(
    "database/did.json",
    "didCount"
);
loadCount(
    "database/uds.json",
    "udsCount"
);
loadCount(
    "database/nrc.json",
    "nrcCount"
);