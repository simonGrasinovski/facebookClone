const input = document.querySelector('header .left input');
const inputPlaceholderValue = input.getAttribute('placeholder');
const li = document.querySelectorAll('header ul li');
const icon = document.querySelectorAll('header ul li i');

input.addEventListener('focus', function() {
    this.placeholder = 'Search Facebook';
});
input.addEventListener('blur', function() {
    this.placeholder = inputPlaceholderValue;
});

for(let i = 0; i < li.length; i ++) {
    li[i].addEventListener('click', function() {
        for(let g = 0; g < li.length; g ++) {
            li[g].classList.remove('active');
            li[g].classList.add('active-not');
            icon[g].classList.remove('selected');
        }
        li[i].classList.add('active');
        li[i].classList.remove('active-not');
        icon[i].classList.add('selected');
    });
}
