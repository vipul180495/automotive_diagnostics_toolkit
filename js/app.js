// ===============================
// APPLICATION CORE
// ===============================
// Page Navigation

function showPage(page, btn) {
    document
        .querySelectorAll(".page")
        .forEach(p => {
            p.classList.remove("active");
        });
    document
        .getElementById(page)
        .classList.add("active");
    document
        .querySelectorAll(".menu button")
        .forEach(b => {
            b.classList.remove("active");
        });
    btn.classList.add("active");
}