const menu = document.getElementById('menu');
const navBar = document.querySelectorAll('.off');

menu.addEventListener('click', (e) => {
    e.preventDefault();
    for (const btn of navBar)
        if (btn.classList.contains('off')) {
            btn.classList.remove('off');
        }
        else
            btn.classList.add('off');
});

let img = '';
const uploadedImg = document.querySelector('input[type="file"]');

uploadedImg.addEventListener('change', (e) => {
    img = e.target.files[0].name;
});


const viewimg = document.querySelector('#viewimg');
let width = 0;
let height = 0;

viewimg.addEventListener('click', () => {
    width = document.querySelector('#width').value;
    height = document.querySelector('#height').value;

    window.open(
        `http://localhost:3000/api?image=${img}&width=${width}&height=${height}`
    );
});