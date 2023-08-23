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

  newMessage.innerHTML = `<a href="mailto:${usersEmail}">${usersName}</a>
    wrote: <span>${usersMessage}</span>
  `;

  // remove button
  const removeButton = document.createElement('button');
  removeButton.innerText = 'remove';
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
  messageSection.style.display = 'block';

  e.target.reset();
});

// Scroll to top Button
const btnScrollToTop = document.querySelector('.btn-scroll');
window.onscroll = function () {
  scrollFunction();
};

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
