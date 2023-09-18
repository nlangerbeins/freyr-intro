// AOS Animation
AOS.init({
  once: true,
  duration: 1000,
  delay: 300,
  easing: 'ease-in-quad',
});

// GSAP Animation
gsap.to('.titel-photo img', { delay: 3.5, duration: 4, opacity: 1 });
gsap.to('  .nav-menu  li', {
  duration: 1,
  y: -10,
  opacity: 1,
  stagger: 0.3,
  delay: 3.0,
});

gsap.to('.nav-logo', {
  duration: 1,
  y: -10,
  opacity: 1,
  delay: 2.3,
});

// Page Preloader
window.onload = function () {
  setTimeout(function () {
    window.scrollTo(0, 0);
    document.querySelector('body').classList.add('loaded');
  }, 1000);
};

// footer: get full year
const today = new Date();
const thisYear = today.getFullYear();

const footer = document.querySelector('footer');
const copyright = document.createElement('p');
copyright.innerHTML = `&copy; Natallia Langerbeins ${thisYear}`;
footer.appendChild(copyright);

// skills list
const skills = [
  { skill: 'HTML', img: './img/icons/html.svg' },
  { skill: 'API', img: './img/icons/api.svg' },
  { skill: 'CSS', img: './img/icons/css.svg' },
  { skill: 'Figma', img: './img/icons/figma.svg' },
  { skill: 'Javascript', img: './img/icons/js.svg' },
  { skill: 'Adobe Photoshop', img: './img/icons/photoshop.svg' },
  { skill: 'GSAP', img: './img/icons/gsap.png' },
];

const skillsSection = document.querySelector('#skills');
const skillsList = skillsSection.querySelector('ul');

for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement('li');
  skill.innerHTML = `<img src='${skills[i].img}'> ${skills[i].skill}`;
  skill.classList.add('skill');
  skillsList.appendChild(skill);
}

// contact form
const btnContact = document.querySelector('#btn-contact');
btnContact.addEventListener('click', () => {
  const contactForm = document.querySelector('#contact-form');
  contactForm.style.display = 'block';
  btnContact.style.display = 'none';
});

// form: leave a message
const messageForm = document.querySelector('[name="leave_message"]');
const messageSection = document.querySelector('#messages');
messageSection.style.display = 'none';

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const usersName = e.target.usersName.value;
  const usersEmail = e.target.usersEmail.value;
  const usersMessage = e.target.usersMessage.value;
  //   console.log(usersName);
  //   console.log(usersEmail);
  //   console.log(usersMessage);

  const messageList = messageSection.querySelector('ul');
  const newMessage = document.createElement('li');

  newMessage.innerHTML = `<a href="mailto:${usersEmail}">${usersName}
   wrote:</a>
    <span>${usersMessage}</span>
  `;

  // remove button
  const removeButton = document.createElement('button');
  removeButton.innerText = 'remove';
  removeButton.classList.add('btn-remove');
  removeButton.setAttribute('type', 'button');
  removeButton.addEventListener('click', () => {
    const entry = removeButton.parentNode;
    entry.remove();

    // Hide the #messages section when the list is empty
    if (messageList.childElementCount === 0) {
      messageSection.style.display = 'none';
    }
  });

  // edit button
  const editButton = document.createElement('button');
  editButton.innerText = 'edit';
  editButton.classList.add('btn-edit');
  editButton.setAttribute = ('type', 'button');
  editButton.addEventListener('click', function () {
    const span = newMessage.querySelector('span');
    const editedMessage = prompt('Edit your message:', span.textContent);
    if (editedMessage !== null) {
      span.textContent = editedMessage;
    }
  });

  newMessage.appendChild(editButton);
  newMessage.appendChild(removeButton);
  messageList.appendChild(newMessage);

  // Hide the #messages section when the list is empty
  messageSection.style.display = 'flex';

  e.target.reset();
});

// Scroll to top
const btnScrollToTop = document.querySelector('.btn-scroll');
window.addEventListener('scroll', scrollFunction);

function scrollFunction() {
  if (
    document.body.scrollTop > 400 ||
    document.documentElement.scrollTop > 400
  ) {
    btnScrollToTop.style.display = 'block';
  } else {
    btnScrollToTop.style.display = 'none';
  }
}

btnScrollToTop.addEventListener('click', () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

// Header Background change on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY >= window.innerHeight - 50) {
    document.querySelector('header').classList.add('active');
    document.querySelector('.nav-logo').classList.add('logo-active');
  } else {
    document.querySelector('header').classList.remove('active');
    document.querySelector('.nav-logo').classList.remove('logo-active');
  }
});

// Hamburger Button
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

const links = document.querySelectorAll('.nav-link');
links.forEach((link) =>
  link.addEventListener('click', function () {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  })
);

document.querySelector('.nav-logo').addEventListener('click', () => {
  hamburger.classList.remove('open');
  navMenu.classList.remove('open');
});

// Projects
const projectSection = document.querySelector('#projects');
const projectList = projectSection.querySelector('ul');
const projectSectionContent = projectSection.querySelector('.section-content');

window.addEventListener('DOMContentLoaded', function () {
  fetch('https://api.github.com/users/nlangerbeins/repos')
    .then((response) => response.json())
    .then((repositories) => {
      for (let i = 0; i < arrOfProjects(repositories).length; i++) {
        const project = document.createElement('li');
        project.classList.add('project');
        console.log(repositories);
        let projectName = arrOfProjects(repositories)[i][0];
        let projectUrl = arrOfProjects(repositories)[i][1];

        const owner = 'nlangerbeins';
        const repo = projectName;
        const branch = 'main';

        // Get img from readme
        const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/assets/img/mockup.png`;

        projectName = projectName.split('').slice(3).join('');
        projectName =
          projectName[0].toUpperCase() +
          projectName.slice(1).replaceAll('-', ' ');

        project.innerHTML = `<a href="${projectUrl}" target="_blank">${projectName}
        <img src=${url} alt="mockup ${projectName}"></a>`;
        projectList.appendChild(project);
      }
    })

    .catch((error) => {
      console.log('error');
      const errorProject = this.document.createElement('p');
      errorProject.innerText =
        'Oops... Something went wrong. Please, try again later!';
      projectSectionContent.appendChild(errorProject);
    });
});

function arrOfProjects(repo) {
  const arr = [];

  repo.forEach((project) => arr.push([project.name, project.html_url]));

  const arrFiltered = arr.filter((i) => i[0].startsWith('js'));
  return arrFiltered;
}
