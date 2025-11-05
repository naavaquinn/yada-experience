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
        image: "event1.jpg" // optional image
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

// Format date nicely
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Check if event is upcoming
function isUpcoming(dateString) {
    const eventDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
}

// Get next upcoming event
function getNextUpcomingEvent() {
    const upcomingEvents = events.filter(e => isUpcoming(e.date));
    if (upcomingEvents.length === 0) return null;
    return upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date))[0];
}

// Render featured event
function renderFeaturedEvent() {
    const featuredEvent = getNextUpcomingEvent();
    const container = document.getElementById('featured-event');

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

// Render upcoming events
function renderUpcomingEvents() {
    const upcomingEvents = events.filter(e => isUpcoming(e.date));
    const container = document.getElementById('upcoming-events');

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

// Render past events
function renderPastEvents() {
    const pastEvents = events.filter(e => !isUpcoming(e.date));
    const container = document.getElementById('past-events');

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

// Populate event dropdown in registration form
function populateEventOptions() {
    const select = document.getElementById('event');
    const upcomingEvents = events.filter(e => isUpcoming(e.date) && e.registrationOpen);
    select.innerHTML = '<option value="">Choose an event...</option>';
    upcomingEvents.forEach(event => {
        const option = document.createElement('option');
        option.value = event.id;
        option.textContent = `${event.title} - ${formatDate(event.date)}`;
        select.appendChild(option);
    });
}

// Registration form handler
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

// Newsletter form handler
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    console.log('Newsletter:', email);
    alert('Thank you for subscribing to our newsletter!');
    e.target.reset();
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
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
            document.querySelector('.registration-section').scrollIntoView({ behavior: 'smooth' });
        });
    });
});
