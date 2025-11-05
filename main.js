document.addEventListener('DOMContentLoaded', () => {

    /* ---------------- General Site JS ---------------- */

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.style.background = 'linear-gradient(135deg, rgba(0, 128, 128, 0.95), rgba(128, 0, 128, 0.95))';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #008080, #800080)';
            navbar.style.backdropFilter = 'none';
        }
    });

    // Scroll animation
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-card, .impact-card, .why-card, .value-card, .vm-card, .event-card, .featured-event-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Counter animation
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + '%';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '%';
            }
        }
        updateCounter();
    }

    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target;
                const target = parseInt(number.textContent);
                animateCounter(number, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number, .impact-number').forEach(counter => {
        counterObserver.observe(counter);
    });


    /* ---------------- Donation Page JS ---------------- */
   const impactStats = document.querySelectorAll('.impact-stat');

// Total goal for percentages
const totalImpact = 400000; // adjust this to your real goal

impactStats.forEach(stat => {
  const amount = parseInt(stat.dataset.amount); // read numeric value
  if (!isNaN(amount) && totalImpact > 0) {
    const percent = ((amount / totalImpact) * 100).toFixed(0);
    let percentEl = stat.querySelector('.stat-percent');
    if (!percentEl) {
      percentEl = document.createElement('div');
      percentEl.className = 'stat-percent';
      stat.appendChild(percentEl);
    }
    percentEl.textContent = `${percent}%`;
  }
});



    if (document.body.classList.contains('donate-page')) {
        // Amount selection
        document.querySelectorAll('.amount-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                this.parentNode.querySelectorAll('.amount-btn').forEach(sibling => sibling.classList.remove('active'));
                this.classList.add('active');

                const customInput = this.parentNode.parentNode.querySelector('.custom-amount');
                if (customInput) customInput.value = '';
            });
        });

        document.querySelectorAll('.custom-amount').forEach(input => {
            input.addEventListener('input', function() {
                this.parentNode.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('active'));
            });
        });

        function getSelectedAmount(cardIndex) {
            const card = document.querySelector(`.donation-card:nth-child(${cardIndex})`);
            if (!card) return null;

            const activeBtn = card.querySelector('.amount-btn.active');
            const customInput = card.querySelector('.custom-amount')?.value || '';

            let amount = activeBtn ? parseInt(activeBtn.dataset.amount) : parseInt(customInput);
            if (!amount || amount <= 0) return null;
            return amount;
        }

        function formatNumber(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        // Donation processing functions
        window.processPayPalDonation = function() {
            const amount = getSelectedAmount(1);
            const donationType = document.querySelector('input[name="paypal-type"]:checked')?.value || 'one-time';

            if (!amount) {
                alert('Please select or enter a valid donation amount.');
                return;
            }

            alert(`Thank you for your ${donationType} donation of $${amount}! You will be redirected to PayPal.`);
            // window.location.href = `https://paypal.me/justine383424?amount=${amount}`;
        };

        window.processMTNDonation = function() {
            const amount = getSelectedAmount(2);
            const donationType = document.querySelector('input[name="mtn-type"]:checked')?.value || 'one-time';

            if (!amount || amount < 1000) {
                alert('Please select or enter a valid donation amount (minimum UGX 1,000).');
                return;
            }

            alert(`To complete your ${donationType} donation of UGX ${formatNumber(amount)}:
1. Dial *165# on your MTN phone
2. Select "Send Money"
3. Enter recipient number: 256783501007
4. Enter amount: ${formatNumber(amount)}
5. Enter your PIN to confirm
6. Send a WhatsApp message at +256 783 501 007 with transaction details
Thank you for supporting YADA-EXPERIENCE!`);
        };

        window.processAirtelDonation = function() {
            const amount = getSelectedAmount(3);
            const donationType = document.querySelector('input[name="airtel-type"]:checked')?.value || 'one-time';

            if (!amount || amount < 1000) {
                alert('Please select or enter a valid donation amount (minimum UGX 1,000).');
                return;
            }

            alert(`To complete your ${donationType} donation of UGX ${formatNumber(amount)}:
1. Dial *185# on your Airtel phone
2. Select "Send Money"
3. Enter recipient number: 256783501007
4. Enter amount: ${formatNumber(amount)}
5. Enter your PIN to confirm
6. Send a WhatsApp message at +256 783 501 007 with transaction details
Thank you for supporting YADA-EXPERIENCE!`);
        };
    }


    /* ---------------- Events Page JS ---------------- */
    if (document.body.classList.contains('events-page')) {

        const events = [
            {
                id: 1,
                title: "Careers Day at Oxford High School",
                date: "2025-06-17",
                time: "9:30 AM - 4:00 PM",
                location: "Oxford High School",
                description: "A comprehensive careers day focusing on purpose discovery and life skills development for students.",
                topics: [
                    "Effects of drug substance abuse and peer pressure",
                    "Sexual purity",
                    "Mentorship in career development",
                    "Why discover your purpose"
                ],
                category: "school-program",
                registrationOpen: true,
                image: "event1.jpg"
            },
            {
                id: 2,
                title: "Purpose Discovery Workshop",
                date: "2025-07-15",
                time: "10:00 AM - 3:00 PM",
                location: "YADA Experience Center, Kampala",
                description: "An intensive workshop designed to help young people uncover their unique purpose and calling.",
                topics: [
                    "Self-reflection exercises",
                    "Strengths and talents assessment",
                    "Vision board creation",
                    "Goal setting strategies"
                ],
                category: "workshop",
                registrationOpen: true,
                image: "event2.jpg"
            },
            {
                id: 3,
                title: "Leadership Skills Bootcamp",
                date: "2025-08-20",
                time: "9:00 AM - 5:00 PM",
                location: "Makerere University",
                description: "A full-day intensive program focused on developing leadership skills for young changemakers.",
                topics: [
                    "Leadership styles and approaches",
                    "Team building and collaboration",
                    "Communication and public speaking",
                    "Project management basics"
                ],
                category: "bootcamp",
                registrationOpen: true,
                image: "event3.jpg"
            },
            {
                id: 4,
                title: "Mentorship Matching Event",
                date: "2025-05-10",
                time: "2:00 PM - 6:00 PM",
                location: "Kampala International University",
                description: "Connect with experienced mentors who can guide your personal and professional development journey.",
                topics: [
                    "Speed mentoring sessions",
                    "Career pathway discussions",
                    "Networking opportunities",
                    "Mentor-mentee relationship building"
                ],
                category: "networking",
                registrationOpen: false,
                image: "event4.jpg"
            }
        ];

        // Utility functions for events
        function formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('en-US', options);
        }

        function isUpcoming(dateString) {
            const eventDate = new Date(dateString);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return eventDate >= today;
        }

        function getNextUpcomingEvent() {
            const upcomingEvents = events.filter(e => isUpcoming(e.date));
            if (upcomingEvents.length === 0) return null;
            return upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date))[0];
        }

        function renderFeaturedEvent() {
            const featuredEvent = getNextUpcomingEvent();
            const container = document.getElementById('featured-event');

            if (!container) return;

            if (!featuredEvent) {
                container.innerHTML = `<div class="featured-event">
                    <h3>No Upcoming Events</h3>
                    <p>Check back soon for new events!</p>
                </div>`;
                return;
            }

            container.innerHTML = `
                <div class="featured-event-card">
                    ${featuredEvent.image ? `<img src="${featuredEvent.image}" alt="${featuredEvent.title}" class="event-image">` : ''}
                    <h3>Featured Event: ${featuredEvent.title}</h3>
                    <div class="event-details">
                        <div class="event-detail"><strong>Date:</strong><br>${formatDate(featuredEvent.date)}</div>
                        <div class="event-detail"><strong>Time:</strong><br>${featuredEvent.time}</div>
                        <div class="event-detail"><strong>Location:</strong><br>${featuredEvent.location}</div>
                    </div>
                    <p>${featuredEvent.description}</p>
                    <div class="event-topics">
                        <h4>Topics:</h4>
                        <ul>${featuredEvent.topics.map(t => `<li>${t}</li>`).join('')}</ul>
                    </div>
                    ${featuredEvent.registrationOpen ?
                        `<a href="#registration-section" class="register-btn">Register Now</a>` :
                        `<span class="registration-closed">Registration Closed</span>`}
                </div>
            `;
        }

        function renderUpcomingEvents() {
            const upcomingEvents = events.filter(e => isUpcoming(e.date));
            const container = document.getElementById('upcoming-events');
            if (!container) return;

            if (upcomingEvents.length === 0) {
                container.innerHTML = `<div class="no-events"><p>No upcoming events at the moment.</p></div>`;
                return;
            }

            container.innerHTML = upcomingEvents.map(event => `
                <div class="event-card">
                    ${event.image ? `<img src="${event.image}" alt="${event.title}" class="event-image">` : ''}
                    <div class="event-card-content">
                        <h4>${event.title}</h4>
                        <div class="event-meta">
                            <p><strong>Date:</strong> ${formatDate(event.date)}</p>
                            <p><strong>Time:</strong> ${event.time}</p>
                            <p><strong>Location:</strong> ${event.location}</p>
                        </div>
                        <p>${event.description}</p>
                        ${event.registrationOpen ?
                            `<a href="#registration-section" class="register-btn">Register</a>` :
                            `<span class="registration-closed">Registration Closed</span>`}
                    </div>
                </div>
            `).join('');
        }

        function renderPastEvents() {
            const pastEvents = events.filter(e => !isUpcoming(e.date));
            const container = document.getElementById('past-events');
            if (!container) return;

            if (pastEvents.length === 0) {
                container.innerHTML = `<div class="no-events"><p>No past events yet.</p></div>`;
                return;
            }

            container.innerHTML = pastEvents.map(event => `
                <div class="event-card past-event">
                    ${event.image ? `<img src="${event.image}" alt="${event.title}" class="event-image">` : ''}
                    <div class="event-card-content">
                        <h4>${event.title}</h4>
                        <div class="event-meta">
                            <p><strong>Date:</strong> ${formatDate(event.date)}</p>
                            <p><strong>Time:</strong> ${event.time}</p>
                            <p><strong>Location:</strong> ${event.location}</p>
                        </div>
                        <p>${event.description}</p>
                        <span class="event-completed">Event Completed</span>
                    </div>
                </div>
            `).join('');
        }

        function populateEventOptions() {
            const select = document.getElementById('event');
            if (!select) return;
            const upcomingEvents = events.filter(e => isUpcoming(e.date) && e.registrationOpen);
            select.innerHTML = '<option value="">Choose an event...</option>';
            upcomingEvents.forEach(event => {
                const option = document.createElement('option');
                option.value = event.id;
                option.textContent = `${event.title} - ${formatDate(event.date)}`;
                select.appendChild(option);
            });
        }

        function handleRegistrationSubmit(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                age: formData.get('age'),
                school: formData.get('school'),
                event: formData.get('event'),
                motivation: formData.get('motivation')
            };
            console.log('Registration:', data);
            alert('Thank you for registering! We will contact you soon.');
            e.target.reset();
        }

        function handleNewsletterSubmit(e) {
            e.preventDefault();
            const email = document.getElementById('newsletter-email').value;
            console.log('Newsletter:', email);
            alert('Thank you for subscribing to our newsletter!');
            e.target.reset();
        }

        // Initialize events page
        renderFeaturedEvent();
        renderUpcomingEvents();
        renderPastEvents();
        populateEventOptions();

        const regForm = document.getElementById('registration-form');
        if (regForm) regForm.addEventListener('submit', handleRegistrationSubmit);

        const newsletterForm = document.getElementById('newsletter-form');
        if (newsletterForm) newsletterForm.addEventListener('submit', handleNewsletterSubmit);

        // Smooth scroll for registration links
        document.querySelectorAll('a[href="#registration-section"]').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const target = document.querySelector('.registration-section');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            });
        });

    } // end events-page

}); // end DOMContentLoaded
