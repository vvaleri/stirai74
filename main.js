const burger = document.querySelector('.header__burger'),
      menu = document.querySelector('.header__menu'),
      modal = document.querySelector('.modal'),
      modal_close = document.querySelector('.modal__close'),
      form = document.querySelector('.modal__send'),
      header = document.querySelector('.header__scroll'),
      mark = document.querySelector('.header__mark'),
      main_header = document.querySelector('#main-header'),
      menu_items = document.querySelectorAll('.scroll__link');
    
      
//preloader
      
window.onload = function() {
document.querySelector('.preloader').classList.add("hide");};


//scroll
        
menu_items.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        let block_id = item.getAttribute('href').substring(1);

        document.getElementById(block_id).scrollIntoView({
            behavior: 'smooth',
             block: 'start',
     });

        burger.classList.remove('active');
        menu.classList.remove('active');
        document.body.style.overflow = '';
    });
});



//burger

function scrollBurger() {
  if(menu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
} else {
    document.body.style.overflow = '';
}}

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    scrollBurger()
});


// header

window.addEventListener('scroll', () => {
  
  let scrolled = document.documentElement.scrollTop;
  
  if (scrolled > 60) {
    header.classList.add('active'); 
    mark.style.display = 'block';
    main_header.style.backgroundColor = '#745150';
  
  } else {
    header.classList.remove('active');
    main_header.style.backgroundColor = '';
    mark.style.display= '';
  } 
});

mark.addEventListener('click', () => { 
 let scrolled = document.documentElement.scrollTop;
   if (scrolled > 60) {
     header.classList.toggle('active');
   }
}); 


//modals

function modals(buttonSelector) {

  const modal_btn = document.querySelector(buttonSelector); 

    modal_btn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('active');
    setTimeout(blockScroll, 600);
    hideModal(); 
  });
  
  function hideModal() {
      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target === modal_close) {
          modal.classList.remove('active');
          scrollBurger()
        }
      });
  }

  function blockScroll() {
    document.body.style.overflow = 'hidden';
  }}

modals('.modal-btn');



//form validation

let input_message = {
    onlyNumber: 'Поле должно содержать только цифры',
    inputMax: 'Максимальное число символов: 11',
    inputMin: 'Минимальное число символов: 7'
  };

  let input_err = document.createElement('div');
  document.querySelector('.modal__content').append(input_err);
  input_err.classList.add('validate');


function validateForm() {
  let form_input = document.querySelector('#phone');

  form_input.addEventListener('input', function() {
    let value = this.value;
    let input_val = value.replace(/[^0-9]/g, '');

    if(!input_val) {
      input_err.innerText = input_message.onlyNumber;
    }  else if(value.length < 6){
      input_err.innerText = input_message.inputMin;
    } else if(value.length > 15) {
      input_err.innerText = input_message.inputMax;
    } else {
      input_err.innerText = '';
    }
  });
}
validateForm();


function checkPhone() {

let reg = new RegExp(/^\d+$/)
let value_input = form_input.value

  if (!reg.test(value_input)){
    input_err.innerText = input_message.onlyNumber;
  } else {
    input_err.innerText === '';
  } 
}



//send form

function sendForm() {
      
let message = {
  success: 'Спасибо! Мы свяжемся с Вами в ближайшее время',
  failure: 'Упс, что-то пошло не так...'
};

let statusMessage = document.createElement('div');
  document.querySelector('.modal__content').appendChild(statusMessage);
  statusMessage.classList.add('status');
    
  let formData = new FormData(form);

      
 fetch('mail.php', {
    method: 'POST',
    body: formData
  })

.then((res) => {

  if (res.ok) {
  form.reset();
  statusMessage.textContent = message.success;
  } else {
    throw new Error('Некорректный ответ от сервера');
  }
        
  setTimeout(() => {
    statusMessage.remove();
  }, 3000);
        
  return res.text();      
  })

.catch((error) => {
   statusMessage.textContent = message.failure;
    // console.log(error.message);
 });
}



form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkPhone()
      
  if (input_err.innerText === '') {
    sendForm()
  } 
});




var mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 2,
    spaceBetween: 20,
    speed: 700,
    loop: true,
  
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },

    a11y: {
        prevSlideMessage: 'Предыдущий слайд',
        nextSlideMessage: 'Следующий слайд',
      },

      breakpoints: {
        300: {
            slidesPerView: 1,
          },

        640: {
            slidesPerView: 2,
          },

        1700: {
          slidesPerView: 3,
          spaceBetween: 70
        },
      },

    observer: true,  
 
  });
 


