document.addEventListener("DOMContentLoaded", function () {
    if (navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome")) {
        document.body.classList.add("safari");
    }
});
