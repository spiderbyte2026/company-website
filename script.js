// SpiderByte Logic

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle hamburger icon
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if(hamburger) {
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // --- 3. Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Add staggered delay if data-delay exists
                const delay = entry.target.getAttribute('data-delay');
                if (delay) {
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, delay);
                } else {
                    entry.target.classList.add('active');
                }
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // --- 4. Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // lower is slower

    const startCounters = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                let count = 0;
                
                const updateCount = () => {
                    const inc = target / speed;
                    if (count < target) {
                        count += inc;
                        counter.innerText = Math.ceil(count) + (target === 99 ? '%' : '+');
                        setTimeout(updateCount, 10);
                    } else {
                        counter.innerText = target + (target === 99 ? '%' : '+');
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        startCounters.observe(counter);
    });

    // --- 5. Contact Form Submission Prevent Default ---
 const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            fetch("https://formsubmit.co/ajax/spiderbyte2026@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message,
                    _subject: "New SpiderByte Contact Form Submission"
                })
            })
            .then(response => response.json())
            .then(data => {
                btn.innerText = 'Message Sent!';
                btn.style.background = '#00f3ff';
                btn.style.color = '#000';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style = '';
                }, 3000);
            })
            .catch(error => {
                console.error("Error:", error);
                btn.innerText = 'Failed to Send';
                btn.style.background = '#ff0055';
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style = '';
                }, 3000);
            });
        });
    }
    // --- 6. Canvas Particle Network (Spider Web Effect) ---
    initCanvasParticles();
});

function initCanvasParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let particles = [];
    
    // Config
    const particleCount = window.innerWidth > 768 ? 80 : 40;
    const connectDistance = 150;
    
    // Colors
    const colors = ['#00f3ff', '#b026ff', '#ffffff'];
    
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resize);
    resize();
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 1;
            this.vy = (Math.random() - 0.5) * 1;
            this.radius = Math.random() * 2 + 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > width) this.vx = -this.vx;
            if (this.y < 0 || this.y > height) this.vy = -this.vy;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    // Init particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Mouse interaction
    let mouse = { x: null, y: null };
    
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });
    
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // Connect particles
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < connectDistance) {
                    ctx.beginPath();
                    // Opacity based on distance
                    const opacity = 1 - (dist / connectDistance);
                    // Use a subtle color for the lines
                    ctx.strokeStyle = `rgba(100, 150, 255, ${opacity * 0.15})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
            
            // Connect to mouse
            if (mouse.x != null && mouse.y != null) {
                const dx = particles[i].x - mouse.x;
                const dy = particles[i].y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < connectDistance * 1.5) {
                    ctx.beginPath();
                    const opacity = 1 - (dist / (connectDistance * 1.5));
                    ctx.strokeStyle = `rgba(0, 243, 255, ${opacity * 0.3})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                    
                    // Slight attraction to mouse
                    particles[i].x -= dx * 0.01;
                    particles[i].y -= dy * 0.01;
                }
            }
        }
    }
    
    animate();
}
