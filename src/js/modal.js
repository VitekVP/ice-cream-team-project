// (() => {
//   const refs = {
//     openModalBtn: document.querySelector('[data-modal-open]'),
//     closeModalBtn: document.querySelector('[data-modal-close]'),
//     modal: document.querySelector('[data-modal]'),
//   };

//   refs.openModalBtn.addEventListener('click', toggleModal);
//   refs.closeModalBtn.addEventListener('click', toggleModal);

//   function toggleModal() {
//     refs.modal.classList.toggle('is-hidden');
//   }
// })();

// Пробна версія
!(function (a) {
  'function' != typeof a.matches &&
    (a.matches =
      a.msMatchesSelector ||
      a.mozMatchesSelector ||
      a.webkitMatchesSelector ||
      function (a) {
        for (
          var t = this,
            o = (t.document || t.ownerDocument).querySelectorAll(a),
            n = 0;
          o[n] && o[n] !== t;

        )
          ++n;
        return Boolean(o[n]);
      }),
    'function' != typeof a.closest &&
      (a.closest = function (a) {
        for (var t = this; t && 1 === t.nodeType; ) {
          if (t.matches(a)) return t;
          t = t.parentNode;
        }
        return null;
      });
})(window.Element.prototype);

document.addEventListener('DOMContentLoaded', function () {
  /* Записуємо в змінні масиву єлемент-кнопку і підложку. Цій підложці задаємо id, щоб не впливати на інші overlay*/
  var modalButtons = document.querySelectorAll('.js-open-modal'),
    overlay = document.querySelector('.js-overlay-modal'),
    closeButtons = document.querySelectorAll('.js-modal-close');

  /* Перебираэмо масив елемент-кнопок */
  modalButtons.forEach(function (item) {
    /* Називаэмо для кожної елемент-кнопки обробника кліка */
    item.addEventListener('click', function (a) {
      /* Запобігаємо стандартним діям з елементом (Усі роблять по-різному) */
      a.preventDefault();

      /* При кожному кліку на елемент-кнопку ми будемо забирати вміст атрибута  data-modal
            та шукати модальне вікно с таким самим атрибутом. */
      var modalId = this.getAttribute('data-modal'),
        modalElem = document.querySelector(
          '.modal[data-modal="' + modalId + '"]'
        );

      /* Після того, як знайшли потрібне, додаємо клас підложки и вікну, щоб показати їх. */
      document.body.classList.add('noScroll');
      modalElem.classList.add('active');
      overlay.classList.add('active');
    });
  });
  const Youtube = document.getElementById('Youtube');

  closeButtons.forEach(function (item) {
    item.addEventListener('click', function (a) {
      var parentModal = this.closest('.modal');
      document.body.classList.remove('noScroll');
      parentModal.classList.remove('active');
      overlay.classList.remove('active');
      const iframeSrc = Youtube.src;
      Youtube.src = iframeSrc;
    });
  });

  document.body.addEventListener(
    'keyup',
    function (a) {
      var key = a.keyCode;

      if (key == 27) {
        document.querySelector('.modal.active').classList.remove('active');
        document.querySelector('.overlay').classList.remove('active');
        document.body.classList.remove('noScroll');
      }
    },
    false
  );

  overlay.addEventListener('click', function () {
    document.querySelector('.modal.active').classList.remove('active');
    this.classList.remove('active');
    document.body.classList.remove('noScroll');
    const iframeSrc = Youtube.src;
    Youtube.src = iframeSrc;
  });
});

// Опис, що треба додавати, щоб скрипт працював

// <!-- MODALS TEMPLATE -->

// <!-- Put the class js-open-modal on your button;
//   Put data attribute data-modal="NUMBER OF YOUR MODAL"-->

// <!-- EXAMPLE!!!:
// <button class="js-open-modal button" data-modal="1">Our Locations</button> -->

// <!--
//   Put the additional class to modal-container to
//   modify your own section modal styles
//   (to change width, height, structure, paddings etc.);
//   Put the data attribute to div with class modal
//   data-modal="NUMBER OF YOUR MODAL" accordingly  -->
