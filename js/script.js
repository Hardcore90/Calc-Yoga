window.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // табы

  let tab = document.querySelectorAll(".info-header-tab"),
    info = document.querySelector(".info-header"),
    tabContent = document.querySelectorAll(".info-tabcontent");

  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove("show");
      tabContent[i].classList.add("hide");
    }
  }

  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains("hide")) {
      tabContent[b].classList.remove("hide");
      tabContent[b].classList.add("show");
    }
  }

  info.addEventListener("click", function (event) {
    let target = event.target;
    if (target && target.classList.contains("info-header-tab")) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });

  // таймер

  let deadline = "2023-05-27";

  function getTimeRemaning(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor(t / (1000 * 60 * 60));

    if (seconds / 10 < 1) {
      seconds = "0" + seconds;
    }
    if (minutes / 10 < 1) {
      minutes = "0" + minutes;
    }
    if (hours / 10 < 1) {
      hours = "0" + hours;
    }
    return {
      total: t,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function setClock(id, endtime) {
    let timer = document.getElementById(id),
      hours = timer.querySelector(".hours"),
      minutes = timer.querySelector(".minutes"),
      seconds = timer.querySelector(".seconds"),
      timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      let t = getTimeRemaning(endtime);
      if (t.total <= 0) {
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";
        clearInterval(timeInterval);
      } else {
        hours.textContent = t.hours;
        minutes.textContent = t.minutes;
        seconds.textContent = t.seconds;
      }
    }
  }

  setClock("timer", deadline);

  // Модальное окно

  let more = document.querySelectorAll(".more"),
    overlay = document.querySelector(".overlay"),
    close = document.querySelector(".popup-close");

  more.forEach((item) => {
    item.addEventListener("click", function (event) {
      event = event.target;
      overlay.style.display = "block";
      event.classList.add("more-splash");
      document.body.style.overflow = "hidden";
    });

    close.addEventListener("click", function () {
      overlay.style.display = "none";
      item.classList.remove("more-splash");
      document.body.style.overflow = "";
    });
  });

  // Slider

  let slideIndex = 1, // параметр текущего слайда
    slides = document.querySelectorAll(".slider-item"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    dotsWrap = document.querySelector(".slider-dots"),
    dots = document.querySelectorAll(".dot");

  showSlides(slideIndex);
  // функция, которая скроет все слайды и покажет только активный.(выбраная точка)
  function showSlides(n) {
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slideIndex.length;
    }

    slides.forEach((item) => (item.style.display = "none"));
    // for (let i = 0; i < slides.length; i++) {
    //   slides[i].style.display = 'none';
    // }
    dots.forEach((item) => item.classList.remove("dot-active"));
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("dot-active");
  }

  // функция для переключения слайда
  function plusSlides(n) {
    showSlides((slideIndex += n));
  }
  //функция текущего слайда
  function currentSlide(n) {
    showSlides((slideIndex = n));
  }
  // при клике на стрелку 'назад' вызывается функция переключения слайда на предыдущий
  prev.addEventListener("click", function () {
    plusSlides(-1);
  });
  // при клике на стрелку 'вперед' вызывается функция переключения слайда на следующий
  next.addEventListener("click", function () {
    plusSlides(1);
  });
  // при клике на n точку, проверяем на соответствие кликабельную точку и вызываем функцию, что бы удтвердить текущий слайд.
  dotsWrap.addEventListener("click", function (event) {
    event = event.target;
    for (let i = 0; i < dots.length + 1; i++) {
      if (event.classList.contains("dot") && event == dots[i - 1]) {
        currentSlide(i);
      }
    }
  });

  // Calc

  let persons = document.querySelectorAll(".counter-block-input")[0],
    restDays = document.querySelectorAll(".counter-block-input")[1],
    place = document.getElementById("select"),
    totalValue = document.getElementById("total"),
    personsSum = 0,
    daysSum = 0,
    total = 0;

  totalValue.innerHTML = 0; // Изначально при пустых полях общая цена равна 0

  // ПРи вводе данных проводится проверка на наличии пустых форм, если какая либо из форм пустая - данные общей цены равны 0. Если все заполнено, проводится подсчет по формуле и выводится общая сумма в элемент общей суммы.
  persons.addEventListener("input", function () {
    personsSum = +this.value;
    total = (daysSum + personsSum) * 4000;

    if (persons.value == "") {
      totalValue.innerHTML = 0;
    } else if (restDays.value == "") {
      totalValue.innerHTML = 0;
    } else {
      totalValue.innerHTML = total;
    }
  });

  // тоже, что и в обработчике событий для формы Люди. Так же идет проверка, если пользователь очистил одну из форм, так же в общую сумму выводится 0.
  restDays.addEventListener("input", function () {
    daysSum = +this.value;
    total = (daysSum + personsSum) * 4000;

    if (persons.value == "") {
      totalValue.innerHTML = 0;
    } else if (restDays.value == "") {
      totalValue.innerHTML = 0;
    } else {
      totalValue.innerHTML = total;
    }
  });

  // При выборе из списка значения, проводится проверка на наличие пустых форм, если есть пустые формы, общая сумма равна 0. Если все заполнено, то проводится расчет общей суммы с учетом модификатора, который указан в атрибуте value у каждого значения списка. В общую сумму выводится результат.
  place.addEventListener("change", function () {
    if (restDays.value == "" || persons.value == "") {
      totalValue.innerHTML = 0;
    } else {
      let a = total;
      totalValue.innerHTML = a * this.options[this.selectedIndex].value;
    }
  });
});
