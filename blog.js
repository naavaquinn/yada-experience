const blogPosts = [
  {
    title: "Finding Purpose in Every Season",
    author: "Justine Mirembe",
    date: "March 12, 2025",
    image: "blog1.jpg",
    content: `
      You ever wake up, stare at the ceiling, and wonder, “So what’s my purpose again?”
      Don’t worry we’ve all been there, usually around exam season at school or during PLE prep, when stress hits harder than the boda boda traffic. 😅
      <br><br>
      Life has seasons, and so does purpose. Sometimes it’s loud and obvious, like acing your UNEB mock exams. Sometimes it’s quiet, like helping a friend revise for Physics or getting your first prize at a school debate.
      <br><br>
      Tip: Ask yourself daily, “What lights me up today?” not “What will impress everyone else?” You’ll be shocked how freeing that feels.
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
    author: "Vanessa Kusiima",
    date: "August 20, 2025",
    image: "blog3.jpg",
    content: `
      Ah, group projects: the adulting simulation nobody warned you about.
      10% do all the work, 70% send “😂” emojis, 20% are MIA and the deadline is looming faster than a taxi in rush hour Kampala.
      <br><br>
      Secret: teamwork = adulting in disguise. Assign roles early, communicate like you’re coordinating a school festival, and keep humor alive memes and jokes help stress levels.
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
      Failure sucks. No sugarcoating it. Bombed an exam, missed a scholarship deadline, or forgot your lines in the school play it stings.
      <br><br>
      But failures are free lessons. Think of them as uninvited teachers crashing your life party to teach something valuable.
      <br><br>
      Lesson: fail fast, laugh at yourself, and take notes. Every misstep is data for your next win. Bonus friends will laugh with you, which makes it less painful. 😂
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
      Hint: it’s not about quantity one ride-or-die friend is worth ten casual acquaintances. And laughter? Mandatory. Always bring laughter. 😂✨
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

  // Add click listeners for Read More
  document.querySelectorAll('.read-more').forEach(el => {
    el.addEventListener('click', () => openModal(el.dataset.index));
  });
}

// Modal logic
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
  modal.style.display = "flex"; // centers the modal
}


closeBtn.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Initialize blogs
document.addEventListener('DOMContentLoaded', renderBlogs);
