// 1) Sticky navigation background after scrolling

const topbar = document.getElementById('topbar');
const navlinks = document.getElementById('navlinks');
const menuToggle = document.getElementById('menuToggle');

window.addEventListener('scroll', () => {
  topbar.classList.toggle('scrolled', window.scrollY > 35);
});


// 2) Mobile navigation menu

menuToggle.addEventListener('click', () => {
  const isOpen = navlinks.classList.toggle('open');

  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});


// 3) Smoothly move to the correct section and close mobile menu

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    navlinks.classList.remove('open');

    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});


// 4) Highlight the navigation link for the section currently in view

const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.navlinks a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.classList.toggle(
          'active',
          a.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, {
  rootMargin: '-35% 0px -55% 0px'
});

sections.forEach(section => sectionObserver.observe(section));


// 5) Reveal elements as the visitor scrolls down

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});


// 6) Give clicked product buttons a visible pressed state

document.querySelectorAll('.product-btn').forEach(button => {
  button.addEventListener('click', () => {

    button.classList.add('selected');

    button.style.background = '#d99a24';
    button.style.color = '#171713';
    button.style.borderColor = '#d99a24';

    const name = button
      .closest('.product-card')
      .querySelector('h3')
      .textContent;

    button.setAttribute('aria-label', name + ' selected');

    setTimeout(() => {
      button.style.background = '';
      button.style.color = '';
      button.style.borderColor = '';
      button.classList.remove('selected');
    }, 900);

  });
});