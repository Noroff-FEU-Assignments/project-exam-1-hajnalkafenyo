function validateEmail(email) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email) == false) {
        return false;
    } else {
        return true;
    }
}

const emailField = document.getElementById('email');
if (emailField) {
    emailField.addEventListener('input', validateEmail);
} else {
    console.log('nincs');
}

const nameField = document.getElementById('contact-form')
if (nameField) {
    nameField.addEventListener("submit", submit);
}

function validateName(name) {
    if (name.length > 5) {
        return true
    } else {
        return false
    }
}

function validateSubject(subject) {
    if (subject.length > 15) {
        return true
    } else {
        return false
    }
}

function validateMessage(message) {
    if (message.length > 25) {
        return true
    } else {
        return false
    }
}


function submit(e) {
    console.log('submit');
    e.preventDefault();
    const nameValue = document.getElementById('name').value;
    const isNameValid = validateName(nameValue);
    document.getElementById('nameError').innerText = (isNameValid ? '' : 'The name is too short, it should be more than 5 characters long');
    const emailValue = document.getElementById('email').value;
    const isEmailValid = validateEmail(emailValue);
    document.getElementById('email-error').innerText = (isEmailValid ? '' : 'The email is not valid, it must be a valid email address');
    const subjectValue = document.getElementById('subject').value;
    const isSubjectValid = validateSubject(subjectValue);
    document.getElementById('subjectError').innerText = (isSubjectValid ? '' : 'The subject is too short, it should be more than 15 characters long');
    const messageValue = document.getElementById('message').value;
    const isMessageValid = validateMessage(messageValue);
    document.getElementById('messageError').innerText = (isMessageValid ? '' : 'The message is too short, it should be more than 25 characters long');

    if (isNameValid && isEmailValid && isMessageValid && isSubjectValid) {
        document.getElementById('contact-form').style.display = 'none';
        document.getElementById('thank-you-message').style.display = 'block';
    }

}





