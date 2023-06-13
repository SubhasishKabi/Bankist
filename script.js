'use strict';
///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//SMOOTH SCROLLING

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  /* OLD METHOD

  const s1coords = section1.getBoundingClientRect()
  window.scrollTo({
    left:s1coords.left + window.pageXOffset,
    top:s1coords.top + window.pageYOffset,
    behavior:'smooth'
  })

  */
  section1.scrollIntoView({ behavior: 'smooth' });
});

//PAGE NAVIGATION
/*This is not very efficient because it gives the same function for each event. Imagine if there are 1000events, we would give the same function to 1000 events
this would heavily impact the performance */

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
/*If we add a event to a parent, and the parent has a children, if we perform the event of the children, the event on parent will also occur
i.e if we click on the links, the color will change, and if we click on the parent, the color changes */

//TABBED COMPONENT

// Tabbed component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  //closest traverses upwards and gives the first element that matches the selector

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// //MENU FADE ANIMATION (using javascript)
//const nav = document.querySelector('.nav');
// nav.addEventListener('mouseover', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     //console.log(link);
//     const sibling = link.closest('.nav').querySelectorAll('.nav__link');
//     //closest traverses upwards and gives the first element that matches the selector

//     //console.log(sibling);

//     //const logo = link.closest('.nav').querySelector('img');
//     console.log(logo);

//     sibling.forEach(el => {
//       if (el !== link) {
//         el.style.opacity = 0.5;
//       }
//     });
//     logo.style.opacity = 0.5
//   }
// });

// nav.addEventListener('mouseout', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     //console.log(link);
//     const sibling = link.closest('.nav').querySelectorAll('.nav__link');
//     //closest traverses upwards and gives the first element that matches the selector

//     //console.log(sibling);

//     const logo = link.closest('.nav').querySelector('img');
//     //console.log(logo);

//     sibling.forEach(el => {
//       if (el !== link) {
//         el.style.opacity = 1;
//       }
//     });
//     logo.style.opacity = 1
//   }
// });

const nav = document.querySelector('.nav');

const handleHover = function (e) {
  console.log(this);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
// nav.addEventListener('mouseover', handleHover.bind([0.5,2]));
nav.addEventListener('mouseout', handleHover.bind(1));
//event handler function can have maximum one argument.
//e is not an argument.

/*

nav.addEventListener('mouseover', function(e){
  handleHover(e, 0.5)
});
nav.addEventListener('mouseout', function(e){
  handleHover(e, 1)
});

*/

//METHOD 1
/*
const initialCoords = section1.getBoundingClientRect()
window.addEventListener('scroll', function(e){
  if(window.scrollY > initialCoords){
    nav.classList.add('sticky')
  }else{
    nav.classList.remove('sticky')
  }
})

*/

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  //entries occur due to Intersectionobserver
  //console.log(entries)
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
//here we have only one target
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header); //observes the target

/*
INTERSECTION OBSERVER API

This API allows us to observe changes to the way a certain target element intersects another element or the way it intersects the viewport



*/

//REVEAL SECTIONS

const allSections = document.querySelectorAll('.section');

const revealSections = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry)

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.2,
});

//multiple targets
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//LAZY LOADING IMAGES (using intersection API)

const imgTargets = document.querySelectorAll('img[data-src]');
const imgLoad = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(imgLoad, {
  root: null,
  threshold: 0.2,
});

imgTargets.forEach(img => imgObserver.observe(img));

//-----------------------------------------------------------SLIDER------------------------------------------------------------//

const slides = document.querySelectorAll('.slide');
//console.log(slides)[array]
const slider = document.querySelector('.slider');

const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');



let currentSlide = 0;
const maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

const dotContainer = document.querySelector('.dots');

const createDots = function () {
  slides.forEach(function (s, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDots = function (slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => {
    dot.classList.remove('dots__dot--active');
  });
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};


function init() {
  goToSlide(0);
  createDots();
  activateDots(0);
}

init()

const nextSlide = function (e) {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
  activateDots(currentSlide);
  /*
    slides.forEach((s,i)=>{
      s.style.transform = `translateX(${100 * (i- currentSlide)}%)`
    })
    */
};

const prevSlide = function (e) {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activateDots(currentSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  e.key === 'ArrowLeft' && prevSlide();
  e.key === 'ArrowRight' && nextSlide();
  //shortcircuiting
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDots(slide);
  }
});

//////--------------------------------------------------------------------EXTRAS-----------------------------------------------------------/////////

/*

// Event Propagation in Practice
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  //console.log('LINK', e.target, e.currentTarget);
  //console.log(e.currentTarget === this);

  // Stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  //console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  //alert('onmouseenter: Great! You are reading the heading :D'); //this will also work
  this.style.backgroundColor = randomColor();
  //console.log('NAV', e.target, e.currentTarget);
});

*/
