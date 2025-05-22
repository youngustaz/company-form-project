document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();

    if (!name || !email) {
      e.preventDefault(); // Prevent form from submitting
      alert("Please fill out all required fields.");
    } else {
      alert("Form submitted successfully!");
    }
  });
});
