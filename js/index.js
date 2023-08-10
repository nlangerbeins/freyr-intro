const today = new Date();
const thisYear = today.getFullYear();

const footer = document.querySelector('footer');
const copyright = document.createElement('p');
copyright.innerHTML = `Natallia Langerbeins ${thisYear}`;
footer.appendChild(copyright);

const skills = ['HTML', 'CSS', 'JavaScript'];
const skillsSection = document.querySelector('#skills');
const skillsList = skillsSection.querySelector('ul');

for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement('li');
  skill.innerText = skills[i];
  skillsList.appendChild(skill);
}

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
    const entry = editButton.parentNode;
    const span = entry.querySelector('span');

    const editedMessage = prompt('Edit the message:', span.textContent);
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
