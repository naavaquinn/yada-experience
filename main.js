document.addEventListener('DOMContentLoaded', () => {

    /* ---------------- General Site JS ---------------- */

   // ---------------- Mobile Navigation Toggle ----------------
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}



    // Smooth Scroll ONLY for real anchor links (NOT page links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    const href = anchor.getAttribute('href');

    // skip links like "#" or "#0"
    if (href.length > 1) {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
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
    // Highlight active page in the navbar
document.querySelectorAll('.nav-link').forEach(link => {
    // Compare pathname only (ignores domain)
    if (window.location.pathname.endsWith(link.getAttribute('href'))) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});


/* ---------------- Blog Page JS ---------------- */
if (document.body.classList.contains('blog-page')) {

    const blogPosts = [
  {
    title: "Finding Purpose in Every Season",
    author: "Justine Mirembe",
    date: "March 12, 2025",
    image: "blog1.jpg",
    content: `
      You ever wake up, stare at the ceiling, and wonder, “So what’s my purpose again?”
      Don’t worry — we’ve all been there, usually around exam season at Nabisunsa Girls or during PLE prep, when stress hits harder than the boda boda traffic. 😅
      <br><br>
      Life has seasons, and so does purpose. Sometimes it’s loud and obvious, like acing your UNEB mock exams. Sometimes it’s quiet, like helping a friend revise for Physics or getting your first prize at a school debate.
      <br><br>
      Tip: Ask yourself daily, “What lights me up today?” — not “What will impress everyone else?” You’ll be shocked how freeing that feels.
      And remember, it’s okay to change directions. Life isn’t a straight line, it’s a rollercoaster. 🎢✨
    `
  },
  {
    title: "How Mentorship Changes Everything",
    author: "Queen Hedwig",
    date: "June 1, 2025",
    image: "blog2.jpg",
    content: `
      Picture this: it’s a Kampala evening, the matoke is cooking, and you’re in a life crisis, eating groundnuts at 2 AM, thinking you’re the only one struggling.
      Then your mentor calls, drops some wisdom, and suddenly the peanuts taste like confidence. 🥜💪
      <br><br>
      Mentors aren’t there to solve your problems. They guide you, hype you, and sometimes just give you that honest “Hey, you’ve got this” you didn’t know you needed.
      <br><br>
      Remember: a good mentor won’t make life easy, but they’ll make it make sense. And sometimes, that’s all you need. ✨
    `
  },
  {
    title: "Surviving Group Projects Without Losing Your Mind",
    author: "Guest Blogger",
    date: "August 20, 2025",
    image: "blog3.jpg",
    content: `
      Ah, group projects: the adulting simulation nobody warned you about.
      10% do all the work, 70% send “😂” emojis, 20% are MIA — and the deadline is looming faster than a taxi in rush hour Kampala.
      <br><br>
      Secret: teamwork = adulting in disguise. Assign roles early, communicate like you’re coordinating a school festival, and keep humor alive — memes and jokes help stress levels.
      <br><br>
      Life lesson: group projects teach patience, leadership, conflict resolution, and compromise. Also, figure out which teammates are ride-or-die vs emoji-only contributors. 😂
    `
  },
  {
    title: "Turning Failures Into Fuel",
    author: "Justine Mirembe",
    date: "September 10, 2025",
    image: "blog4.jpg",
    content: `
      Failure sucks. No sugarcoating it. Bombed an exam, missed a scholarship deadline, or forgot your lines in the school play — it stings.
      <br><br>
      But failures are free lessons. Think of them as uninvited teachers crashing your life party to teach something valuable.
      <br><br>
      Lesson: fail fast, laugh at yourself, and take notes. Every misstep is data for your next win. Bonus — friends will laugh with you, which makes it less painful. 😂
      <br><br>
      Moral: failure isn’t final, it’s fertilizer. Grow, bloom, and keep glowing. 🌱✨
    `
  },
  {
    title: "Finding Your Tribe in Chaos",
    author: "Queen Hedwig",
    date: "October 5, 2025",
    image: "blog5.jpg",
    content: `
      Life is messy. School, jobs, family, social life… all at once. It’s easy to feel lost.
      <br><br>
      Enter: your tribe. Friends, mentors, classmates, or online buddies who get you, hype you, and sometimes drag you out of bed when you want to hide under your blanket forever. 🛌💥
      <br><br>
      Hint: it’s not about quantity — one ride-or-die friend is worth ten casual acquaintances. And laughter? Mandatory. Always bring laughter. 😂✨
    `
  }
];

// Render the blog posts

    const blogContainer = document.getElementById('blog-posts');

    function renderBlogs() {
      blogContainer.innerHTML = blogPosts.map((post, index) => `
        <article class="blog-card">
          <img src="${post.image}" alt="${post.title}">
          <div class="blog-content">
            <h3>${post.title}</h3>
            <p class="blog-meta">By ${post.author} • ${post.date}</p>
            <p>${post.content.substring(0, 250)}... <span class="read-more" data-index="${index}">Read More</span></p>
          </div>
        </article>
      `).join('');

      document.querySelectorAll('.read-more').forEach(el => {
        el.addEventListener('click', () => openModal(el.dataset.index));
      });
    }

    const modal = document.getElementById('blog-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMeta = document.getElementById('modal-meta');
    const modalImage = document.getElementById('modal-image');
    const modalContent = document.getElementById('modal-content');
    const closeBtn = document.querySelector('.close-btn');

    function openModal(index) {
      const post = blogPosts[index];
      modalTitle.textContent = post.title;
      modalMeta.textContent = `By ${post.author} • ${post.date}`;
      modalImage.src = post.image;
      modalContent.innerHTML = post.content;
      modal.style.display = "flex";
    }

    closeBtn.onclick = function() {
      modal.style.display = "none";
    }

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    renderBlogs();

}

    /* ---------------- Donation Page JS ---------------- */
   
const impactStats = document.querySelectorAll('.impact-stat');
const totalImpact = 400000;

impactStats.forEach(stat => {
    const amount = parseInt(stat.dataset.amount); // get numeric value
    if (!isNaN(amount)) {
        const numberEl = stat.querySelector('.stat-number');
        if (numberEl) {
            // Show the formatted number only
            numberEl.textContent = amount.toLocaleString(); // 75,000
        }
        // DO NOT create percent element
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
                title: "School Outreach",
                date: "2024-11-27",
                time: "2:00 PM - 4:00 PM",
                location: "Taibah International school",
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
                title: "School Outreach",
                date: "2025-05-30",
                time: "11:00 AM - 1:00 PM",
                location: "Greenhill academy",
                description: "A full-day intensive program focused on developing leadership skills for young changemakers.",
                topics: [
                    "Commitment , Excellence ",
                    "Building confidence ",
                    "Communication and public speaking",
                    "Project management basics"
                ],
                category: "bootcamp",
                registrationOpen: true,
                image: "event3.jpg"
            },
            {
                id: 4,
                title: "Harakati Experience Meetup",
                date: "2025-09-23",
                time: "2:00 PM - 9:00 PM",
                location: "Itungo Catering centre",
                description: "Igniting purpose through creative expression poetry,music,drama,dance and storytelling.",
                topics: [
                    "storytelling for impact",
                    "Creative expression",
                    "Networking opportunities",
                    "Showcasing talents"
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

  const form = e.target;
  const formData = new FormData(form);

  fetch(form.action, {
    method: form.method || "POST",
    body: formData,
    headers: { "Accept": "application/json" }
  })
    .then(async (res) => {
      if (res.ok) {
        alert("Thank you for registering! We will contact you soon.");
        form.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        console.log("Formspree error:", data);
        alert("Oops — something went wrong. Please try again.");
      }
    })
    .catch((err) => {
      console.log("Network error:", err);
      alert("Network error — please check your internet and try again.");
    });
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

// ---------------- Product Buy Now Popup ----------------
const buyBtn = document.getElementById("buyNowBtn");
const popup = document.getElementById("buyPopup");

if (buyBtn && popup) {
  const closeBtn = popup.querySelector(".close");

  buyBtn.addEventListener("click", (e) => {
    e.preventDefault();
    popup.style.display = "block";
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      popup.style.display = "none";
    });
  }

  // Close with Escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") popup.style.display = "none";
  });
}

}); // end DOMContentLoaded
