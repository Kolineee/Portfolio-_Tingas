// Loading Screen
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loading").classList.add("hidden")
  }, 1500)
})

// Enhanced Particle Animation
function createParticles() {
  const particlesContainer = document.getElementById("particles")
  const particleCount = 80

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.top = Math.random() * 100 + "%"
    particle.style.animationDelay = Math.random() * 8 + "s"
    particle.style.animationDuration = Math.random() * 4 + 4 + "s"

    // Random size variation
    const size = Math.random() * 3 + 2
    particle.style.width = size + "px"
    particle.style.height = size + "px"

    particlesContainer.appendChild(particle)
  }
}

// Enhanced Typing Animation
function typeWriter() {
  const texts = ["UI/UX Designer", "Computer Scientist", "Problem Solver", "Creative Thinker", "Full-Stack Developer"]
  let textIndex = 0
  let charIndex = 0
  let isDeleting = false
  const typingElement = document.getElementById("typing-text")

  function type() {
    const currentText = texts[textIndex]

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1)
      charIndex--
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1)
      charIndex++
    }

    let typeSpeed = isDeleting ? 50 : 100

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2500
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % texts.length
      typeSpeed = 500
    }

    setTimeout(type, typeSpeed)
  }

  type()
}

// Project Image Carousel
function initProjectCarousels() {
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    const images = card.querySelectorAll(".project-image")
    const indicators = card.querySelectorAll(".indicator")
    let currentSlide = 0
    let slideInterval

    function showSlide(index) {
      images.forEach((img, i) => {
        img.classList.toggle("active", i === index)
      })
      indicators.forEach((ind, i) => {
        ind.classList.toggle("active", i === index)
      })
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % images.length
      showSlide(currentSlide)
    }

    function startSlideshow() {
      slideInterval = setInterval(nextSlide, 3000)
    }

    function stopSlideshow() {
      clearInterval(slideInterval)
    }

    // Auto-play slideshow
    startSlideshow()

    // Pause on hover
    card.addEventListener("mouseenter", stopSlideshow)
    card.addEventListener("mouseleave", startSlideshow)

    // Manual navigation
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        currentSlide = index
        showSlide(currentSlide)
        stopSlideshow()
        setTimeout(startSlideshow, 5000) // Restart after 5 seconds
      })
    })
  })
}

// Smooth Scrolling with offset for fixed navbar
function smoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80 // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// Enhanced Navbar Scroll Effect
function navbarScrollEffect() {
  const navbar = document.getElementById("navbar")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })
}

// Enhanced Fade In Animation on Scroll
function fadeInOnScroll() {
  const fadeElements = document.querySelectorAll(".fade-in")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    },
  )

  fadeElements.forEach((element) => {
    observer.observe(element)
  })
}

// Enhanced Skill Bar Animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute("data-width")
          setTimeout(() => {
            entry.target.style.width = width + "%"
          }, 200)
        }
      })
    },
    {
      threshold: 0.5,
    },
  )

  skillBars.forEach((bar) => {
    observer.observe(bar)
  })
}

// Enhanced Contact Form Handler
function handleContactForm() {
  const form = document.querySelector(".contact-form")

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    const name = formData.get("name")
    const email = formData.get("email")
    const subject = formData.get("subject")
    const message = formData.get("message")

    if (name && email && subject && message) {
      const submitBtn = form.querySelector(".submit-btn")
      const originalText = submitBtn.textContent

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
      submitBtn.disabled = true

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!'
        setTimeout(() => {
          form.reset()
          submitBtn.textContent = originalText
          submitBtn.disabled = false
        }, 2000)
      }, 2000)
    } else {
      alert("Please fill in all fields.")
    }
  })
}

// Enhanced Mouse Interaction with Particles
function enhancedParticleInteraction() {
  document.addEventListener("mousemove", (e) => {
    const particles = document.querySelectorAll(".particle")
    const mouseX = e.clientX
    const mouseY = e.clientY

    particles.forEach((particle, index) => {
      const rect = particle.getBoundingClientRect()
      const particleX = rect.left + rect.width / 2
      const particleY = rect.top + rect.height / 2

      const distance = Math.sqrt(Math.pow(mouseX - particleX, 2) + Math.pow(mouseY - particleY, 2))

      if (distance < 150) {
        const force = (150 - distance) / 150
        particle.style.transform = `scale(${1 + force}) translate(${(mouseX - particleX) * force * 0.1}px, ${(mouseY - particleY) * force * 0.1}px)`
        particle.style.opacity = 0.8 + force * 0.2
      } else {
        particle.style.transform = "scale(1) translate(0px, 0px)"
        particle.style.opacity = 0.6
      }
    })
  })
}

// Parallax Effect for Hero Section
function parallaxEffect() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const hero = document.querySelector(".hero")
    const rate = scrolled * -0.5

    if (hero) {
      hero.style.transform = `translateY(${rate}px)`
    }
  })
}

// Add scroll-triggered animations for project cards
function animateProjectCards() {
  const projectCards = document.querySelectorAll(".project-card")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }, index * 200)
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  projectCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(50px)"
    card.style.transition = "all 0.6s ease"
    observer.observe(card)
  })
}

// Enhanced Typing Animation with Multiple Effects
function enhancedTypeWriter() {
  const texts = [
    "UI/UX Designer",
    "Computer Scientist",
    "Problem Solver",
    "Creative Thinker",
    "Full-Stack Developer",
    "Digital Artist",
  ]
  let textIndex = 0
  let charIndex = 0
  let isDeleting = false
  const typingElement = document.getElementById("typing-text")
  const colors = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#06b6d4"]

  function type() {
    const currentText = texts[textIndex]
    const currentColor = colors[textIndex]

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1)
      charIndex--
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1)
      charIndex++
    }

    // Change color for each role
    typingElement.style.color = currentColor
    typingElement.style.textShadow = `0 0 20px ${currentColor}50`

    let typeSpeed = isDeleting ? 50 : 100

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 3000
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % texts.length
      typeSpeed = 500
    }

    setTimeout(type, typeSpeed)
  }

  type()
}

// Animated Counter for Stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = Number.parseInt(entry.target.getAttribute("data-target"))
          const duration = 2000
          const increment = target / (duration / 16)
          let current = 0

          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              current = target
              clearInterval(timer)
            }
            entry.target.textContent = Math.floor(current) + (target > 50 ? "+" : "")
          }, 16)
        }
      })
    },
    { threshold: 0.5 },
  )

  counters.forEach((counter) => observer.observe(counter))
}

// Particle System for Buttons
function createButtonParticles() {
  const primaryBtn = document.querySelector(".cta-primary")

  primaryBtn.addEventListener("mouseenter", () => {
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement("div")
      particle.style.position = "absolute"
      particle.style.width = "4px"
      particle.style.height = "4px"
      particle.style.background = "#ffffff"
      particle.style.borderRadius = "50%"
      particle.style.pointerEvents = "none"
      particle.style.zIndex = "1000"

      const rect = primaryBtn.getBoundingClientRect()
      particle.style.left = rect.left + Math.random() * rect.width + "px"
      particle.style.top = rect.top + Math.random() * rect.height + "px"

      document.body.appendChild(particle)

      // Animate particle
      particle.animate(
        [
          { transform: "translateY(0px)", opacity: 1 },
          { transform: `translateY(-${Math.random() * 100 + 50}px)`, opacity: 0 },
        ],
        {
          duration: 1000,
          easing: "ease-out",
        },
      ).onfinish = () => particle.remove()
    }
  })
}

// Enhanced Parallax for Hero Elements
function heroParallax() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.5
    const fastRate = scrolled * -0.8

    const hero = document.querySelector(".hero")
    const shapes = document.querySelectorAll(".floating-shape")
    const avatar = document.querySelector(".hero-avatar")

    if (hero) {
      hero.style.transform = `translateY(${rate}px)`
    }

    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 0.1
      shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`
    })

    if (avatar) {
      avatar.style.transform = `translateY(${scrolled * -0.2}px) scale(${1 - scrolled * 0.0005})`
    }
  })
}

// Magnetic Effect for Social Icons
function magneticEffect() {
  const socialItems = document.querySelectorAll(".social-item")

  socialItems.forEach((item) => {
    item.addEventListener("mousemove", (e) => {
      const rect = item.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      item.style.transform = `translateX(${x * 0.3}px) translateY(${y * 0.3}px) scale(1.1)`
    })

    item.addEventListener("mouseleave", () => {
      item.style.transform = "translateX(0) translateY(0) scale(1)"
    })
  })
}

// Initialize all functions
document.addEventListener("DOMContentLoaded", () => {
  createParticles()
  // Replace the old typeWriter with enhanced version
  enhancedTypeWriter()
  initProjectCarousels()
  smoothScroll()
  navbarScrollEffect()
  fadeInOnScroll()
  animateSkillBars()
  handleContactForm()
  enhancedParticleInteraction()
  parallaxEffect()
  animateCounters()
  createButtonParticles()
  heroParallax()
  magneticEffect()

  // Initialize project card animations after a short delay
  setTimeout(animateProjectCards, 500)
})
