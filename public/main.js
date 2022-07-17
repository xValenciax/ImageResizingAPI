// get navigation menu elements
const menu = document.getElementById('menu');
const navBar = document.querySelectorAll('.off');

// add click event to the menu icon
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

// triger a change event whenver a file is uploaded to the input file element 
uploadedImg.addEventListener('change', (e) => {
    img = e.target.files[0].name;
});


const viewimg = document.querySelector('#viewimg');
let width = 0;
let height = 0;

// send a get request for api route with the image details as qeury string
viewimg.addEventListener('click', () => {
    width = document.querySelector('#width').value;
    height = document.querySelector('#height').value;

    window.open(
        `http://localhost:3000/api?image=${img}&width=${width}&height=${height}`
    );
});