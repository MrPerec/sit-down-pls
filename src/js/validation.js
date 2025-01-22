`use strict`;

document.addEventListener(`DOMContentLoaded`, () => {
  const formArr = document.querySelectorAll(`.js-form`);

  formArr.forEach((form) => {
    form.addEventListener(`submit`, async (event) => {
      event.preventDefault();
      let isValid = true;

      form.querySelectorAll(`.js-input`).forEach((input) => {
        if (!new RegExp(input.pattern).test(input.value)) isValid = false;
      });

      if (isValid) {
        const formData = new FormData(form);
        let response = await fetch(`../phpMailer/sendmail.php`, {
          method: `POST`,
          body: formData,
        });

        if (response?.ok) {
          const result = await response.json();

          alert(result.message);
          event.target.reset();
        } else {
          alert(`Ошибка HTTP: ` + response.status);
        }
      }
    });
  });
});
