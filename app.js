const appContainer = document.getElementById("app")
const navItems = document.querySelectorAll("nav a.nav-link")
const footer = document.getElementById("footer-text")

const pages = {
    home: "pages/home.html",
    about: "pages/about.html",
    history: "pages/history.html"
}

async function router(params) {
    const path = window.location.hash.substring(1) || "home"
    const filePath = pages[path]

    try {
        const response = await fetch(filePath)
        if (!response.ok) throw new Error(`File for page ${path} not found`);

        const html = await response.text()
        appContainer.innerHTML = html

        const scripPath = filePath.replace('html', 'js')
        const module = await import(`./${scripPath}`).catch(() => null)
        if (module && typeof module.init === "function") module.init()
    } catch (error) {
        console.error("Error fetch page", error)
    }

    updateActiveLink(path)
}

function updateActiveLink(currentPath) {
    navItems.forEach((link) => {
        link.classList.remove("active")

        const linkPath = link.getAttribute("href")
        if (linkPath === `#${currentPath}`) {
            link.classList.add("active")
        }
    })
}

function initFooter() {
    const year = new Date().getFullYear()
    footer.textContent = `© ${year} Praktikum Web Dasar`
}


window.addEventListener("hashchange", router)

window.addEventListener("DOMContentLoaded", () => {
    if (!window.location.hash) {
        window.location.hash = "#home"
    }
    router()
    initFooter()
})