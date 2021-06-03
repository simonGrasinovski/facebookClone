const body = document.body;
const container = document.querySelector('.container');
const formSignup = document.querySelector('form.signup');
const closeBtn = document.querySelector('.close-btn'); 
const newAccBtn = document.querySelector('.new');
const loginBtn = document.querySelector('.login-btn');

const firstName = document.querySelector('form.signup input[name="firstName"]');
const lastName = document.querySelector('form.signup input[name="lastName"]');
const email = document.querySelector('form.signup input[name="email"]');
const password = document.querySelector('form.signup input[name="password"]');
const female = document.querySelector('form.signup input[value="female"]');
const male = document.querySelector('form.signup input[value="male"]');
const custom = document.querySelector('form.signup input[value="custom"]');
const genderGroup = document.querySelectorAll('form.signup div.gender-group');

loginBtn.addEventListener('click', function() {
    this.style.opacity = '0.2';
});
newAccBtn.addEventListener('click', function() {
    this.classList.add('opacity');
    setTimeout(function() {
        body.classList.add('bgColor');
        container.classList.add('opacity');
        formSignup.classList.add('show');
    }, 500);
});
closeBtn.addEventListener('click', function() {
    newAccBtn.classList.remove('opacity');
    body.classList.remove('bgColor');
    container.classList.remove('opacity');
    formSignup.classList.remove('show');
});
formSignup.addEventListener('submit', function(e) {
    if((!firstName.value || !lastName.value || !email.value || !password.value) || 
    (!female.checked && !male.checked && !custom.checked)) {
        e.preventDefault();
    }

    function addBorder(element) {
        if(!element.value) {
            element.classList.add('add-border');
        }
    }
    function removeBorder(element) {
        if(element.value) {
            element.classList.remove('add-border');
        }
    }

    addBorder(firstName);
    addBorder(lastName);
    addBorder(email);
    addBorder(password);
    for(let i = 0; i < genderGroup.length; i ++) {
        addBorder(genderGroup[i]);
    }

    removeBorder(firstName);
    removeBorder(lastName);
    removeBorder(email);
    removeBorder(password);
    if(male.checked || female.checked || custom.checked) {
        for(let i = 0; i < genderGroup.length; i ++) {
            genderGroup[i].classList.remove('add-border');
        }
    }
});
