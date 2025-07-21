// Enhanced mobile menu functionality with animations
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")
  const body = document.body
  let isMenuOpen = false

  if (mobileMenuBtn && mobileMenu) {
    // Create hamburger lines for animation
    const hamburgerHTML = `
      <div class="hamburger-container">
        <span class="hamburger-line hamburger-line-1"></span>
        <span class="hamburger-line hamburger-line-2"></span>
        <span class="hamburger-line hamburger-line-3"></span>
      </div>
    `
    mobileMenuBtn.innerHTML = hamburgerHTML

    mobileMenuBtn.addEventListener("click", () => {
      isMenuOpen = !isMenuOpen

      if (isMenuOpen) {
        // Open menu
        mobileMenu.classList.remove("menu-closed")
        mobileMenu.classList.add("menu-open")
        mobileMenuBtn.classList.add("menu-active")
        body.style.overflow = "hidden" // Prevent scrolling when menu is open

        // Animate menu items
        const menuItems = mobileMenu.querySelectorAll("a")
        menuItems.forEach((item, index) => {
          item.style.animationDelay = `${index * 0.1}s`
          item.classList.add("menu-item-animate")
        })
      } else {
        // Close menu
        mobileMenu.classList.remove("menu-open")
        mobileMenu.classList.add("menu-closed")
        mobileMenuBtn.classList.remove("menu-active")
        body.style.overflow = "" // Restore scrolling

        // Remove animation classes
        const menuItems = mobileMenu.querySelectorAll("a")
        menuItems.forEach((item) => {
          item.classList.remove("menu-item-animate")
          item.style.animationDelay = ""
        })
      }
    })

    // Close menu when clicking on menu items
    const menuLinks = mobileMenu.querySelectorAll("a")
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (isMenuOpen) {
          mobileMenuBtn.click() // Trigger close animation
        }
      })
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (isMenuOpen && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.click() // Trigger close animation
      }
    })
  }

  // Contact form submission with animation
  const contactForm = document.querySelector("form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const data = Object.fromEntries(formData)

      // Simple validation
      if (!data.firstName || !data.lastName || !data.email || !data.message) {
        showNotification("Please fill in all required fields.", "error")
        return
      }

      // Animate submit button
      const submitBtn = contactForm.querySelector('button[type="submit"]')
      submitBtn.classList.add("loading")
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...'

      // Simulate form submission
      setTimeout(() => {
        submitBtn.classList.remove("loading")
        submitBtn.innerHTML = "Send Message"
        showNotification("Thank you for your message! We will get back to you soon.", "success")
        contactForm.reset()
      }, 2000)
    })
  }

  // Notification system
  function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas ${type === "success" ? "fa-check-circle" : type === "error" ? "fa-exclamation-circle" : "fa-info-circle"} mr-2"></i>
        ${message}
      </div>
    `

    document.body.appendChild(notification)

    // Trigger animation
    setTimeout(() => notification.classList.add("show"), 100)

    // Remove after 5 seconds
    setTimeout(() => {
      notification.classList.remove("show")
      setTimeout(() => notification.remove(), 300)
    }, 5000)
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })

  // Enhanced scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el)
  })

  // Counter animation
  function animateCounter(element, target, duration = 2000) {
    let start = 0
    const increment = target / (duration / 16)

    function updateCounter() {
      start += increment
      if (start < target) {
        element.textContent = Math.floor(start)
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = target
      }
    }

    updateCounter()
  }

  // Animate counters when they come into view
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        entry.target.classList.add("counted")
        const target = Number.parseInt(entry.target.dataset.count)
        animateCounter(entry.target, target)
      }
    })
  })

  document.querySelectorAll(".counter").forEach((counter) => {
    counterObserver.observe(counter)
  })

  // Parallax effect for hero sections
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".parallax")

    parallaxElements.forEach((element) => {
      const speed = element.dataset.speed || 0.5
      const yPos = -(scrolled * speed)
      element.style.transform = `translateY(${yPos}px)`
    })
  })

  // Typing animation
  function typeWriter(element, text, speed = 100) {
    let i = 0
    element.innerHTML = ""

    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i)
        i++
        setTimeout(type, speed)
      }
    }

    type()
  }

  // Initialize typing animation for hero text
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const originalText = heroTitle.textContent
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 150)
    }, 500)
  }

  // Floating animation for cards
  document.querySelectorAll(".float-card").forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`
  })

  // Progress bar animation
  function animateProgressBar(bar) {
    const width = bar.dataset.width || "0"
    bar.style.width = "0%"
    setTimeout(() => {
      bar.style.width = width + "%"
    }, 500)
  }

  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateProgressBar(entry.target)
      }
    })
  })

  document.querySelectorAll(".progress-bar").forEach((bar) => {
    progressObserver.observe(bar)
  })

  // Stagger animation for grid items
  function staggerAnimation(selector, delay = 100) {
    const items = document.querySelectorAll(selector)
    items.forEach((item, index) => {
      item.style.animationDelay = `${index * delay}ms`
    })
  }

  staggerAnimation(".grid-item", 150)
  staggerAnimation(".team-member", 200)
  staggerAnimation(".service-card", 100)

  // Mouse follow effect for buttons
  document.querySelectorAll(".btn-hover-effect").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      btn.style.setProperty("--mouse-x", x + "px")
      btn.style.setProperty("--mouse-y", y + "px")
    })
  })

  // Reveal animation on scroll
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed")
        }
      })
    },
    { threshold: 0.1 },
  )

  document.querySelectorAll(".reveal").forEach((el) => {
    revealObserver.observe(el)
  })
})
