// initialization

const RESPONSIVE_WIDTH = 1024

let headerWhiteBg = false
let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH
const collapseBtn = document.getElementById("collapse-btn")
const collapseHeaderItems = document.getElementById("collapsed-header-items")



function onHeaderClickOutside(e) {

    if (!collapseHeaderItems.contains(e.target)) {
        toggleHeader()
    }

}


function toggleHeader() {
    if (isHeaderCollapsed) {
        // collapseHeaderItems.classList.remove("max-md:tw-opacity-0")
        collapseHeaderItems.classList.add("opacity-100",)
        collapseHeaderItems.style.width = "60vw"
        collapseBtn.classList.remove("bi-list")
        collapseBtn.classList.add("bi-x", "max-lg:tw-fixed")
        isHeaderCollapsed = false

        setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 1)

    } else {
        collapseHeaderItems.classList.remove("opacity-100")
        collapseHeaderItems.style.width = "0vw"
        collapseBtn.classList.remove("bi-x", "max-lg:tw-fixed")
        collapseBtn.classList.add("bi-list")
        isHeaderCollapsed = true
        window.removeEventListener("click", onHeaderClickOutside)

    }
}

function responsive() {
    if (window.innerWidth > RESPONSIVE_WIDTH) {
        collapseHeaderItems.style.width = ""

    } else {
        isHeaderCollapsed = true
    }
}

window.addEventListener("resize", responsive)


/**
 * Animations
 */

gsap.registerPlugin(ScrollTrigger)

gsap.to(".reveal-hero-text", {
    opacity: 0,
    y: "100%",
})

gsap.to(".reveal-hero-img", {
    opacity: 0,
    y: "100%",
})


gsap.to(".reveal-up", {
    opacity: 0,
    y: "100%",
})


window.addEventListener("load", () => {
    // animate from initial position
    gsap.to(".reveal-hero-text", {
        opacity: 1,
        y: "0%",
        duration: 0.8,
        // ease: "power3.out",
        stagger: 0.5, // Delay between each word's reveal,
        // delay: 3
    })

    gsap.to(".reveal-hero-img", {
        opacity: 1,
        y: "0%",
    })

    
})


// ------------- reveal section animations ---------------

const sections = gsap.utils.toArray("section")

sections.forEach((sec) => {

    const revealUptimeline = gsap.timeline({paused: true, 
                                            scrollTrigger: {
                                                            trigger: sec,
                                                            start: "10% 80%", // top of trigger hits the top of viewport
                                                            end: "20% 90%",
                                                            // markers: true,
                                                            // scrub: 1,
                                                        }})

    revealUptimeline.to(sec.querySelectorAll(".reveal-up"), {
        opacity: 1,
        duration: 0.8,
        y: "0%",
        stagger: 0.2,
    })


})




// --------- Theme (dark mode) management ---------
function applyTheme(theme) {
    const htmlEl = document.documentElement
    if (theme === 'dark') {
        htmlEl.classList.add('dark')
    } else {
        htmlEl.classList.remove('dark')
    }
    // update icon
    const icon = document.getElementById('theme-toggle-icon')
    if (icon) {
        if (theme === 'dark') {
            icon.classList.remove('bi-moon-fill')
            icon.classList.add('bi-sun-fill')
        } else {
            icon.classList.remove('bi-sun-fill')
            icon.classList.add('bi-moon-fill')
        }
    }
}

function toggleTheme() {
    const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    const next = current === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    try {
        localStorage.setItem('site-theme', next)
    } catch (e) {
        // ignore
    }
}

function initTheme() {
    let theme = null
    try {
        theme = localStorage.getItem('site-theme')
    } catch (e) {
        theme = null
    }

    if (!theme) {
        // respect system preference
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        theme = prefersDark ? 'dark' : 'light'
    }
    applyTheme(theme)

    const toggle = document.getElementById('theme-toggle')
    if (toggle) {
        toggle.addEventListener('click', toggleTheme)
    }
}

// initialize theme as early as possible
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme)
} else {
    initTheme()
}



