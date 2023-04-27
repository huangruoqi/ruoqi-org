let b = false;
$(document).ready(function () {
  $(".bg").ripples("show");
  document.getElementsByClassName('challenge-btn')[0].addEventListener("click", function () {
      const challenge = document.getElementsByClassName('challenge')[0];
      b = !b
      challenge.style.height = b?'170px':'0px'
  });
});

const sections = document.querySelectorAll('.section')
const sectBtns = document.querySelectorAll('.controls')
const sectBtn = document.querySelectorAll('.control')
const allSections = document.querySelector('.main-content')

function PageTransitions() {
    sectBtn.forEach(e=> {
        e.addEventListener('click', function(){
            let cb = document.querySelectorAll('.active-btn');
            cb[0].classList.remove('active-btn')
            this.classList.add('active-btn')
            sections.forEach(s => {
                s.classList.remove('active')
            })
            const element = document.getElementById(this.dataset.id)
            element.classList.add('active')

        })
    })
}

PageTransitions()
