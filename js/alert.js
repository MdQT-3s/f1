function showCommentAlert(event) {
  event.preventDefault();

  const commentField = document.getElementById("new_comment");
  const commentText = commentField.value.trim();

  if (commentText === "") {
    alert("Пожалуйста, введите комментарий перед отправкой!");
    return false;
  }

  if (commentText.length < 3) {
    alert("Комментарий слишком короткий! Минимум 3 символа.");
    return false;
  }

  if (commentText.length > 1000) {
    alert("Комментарий слишком длинный! Максимум 1000 символов.");
    return false;
  }

  document.getElementById("comment-alert").style.display = "flex";

  commentField.value = "";

  return false;
}

function showRatingAlert(event) {
  event.preventDefault();
  const activeStars = document.querySelectorAll(".star.active");
  if (activeStars.length === 0) {
    alert("Пожалуйста, выберите оценку!");
    return false;
  }

  document.getElementById("rating-alert").style.display = "flex";
  return false;
}

function closeCommentAlert() {
  document.getElementById("comment-alert").style.display = "none";
  setTimeout(function () {
    location.reload();
  }, 100);
}

function closeRatingAlert() {
  document.getElementById("rating-alert").style.display = "none";
  setTimeout(function () {
    location.reload();
  }, 100);
}

window.onclick = function (event) {
  const commentAlert = document.getElementById("comment-alert");
  const ratingAlert = document.getElementById("rating-alert");

  if (event.target == commentAlert) {
    closeCommentAlert();
  }
  if (event.target == ratingAlert) {
    closeRatingAlert();
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const stars = document.querySelectorAll(".star");
  const submitButton = document.querySelector(".assess_button");

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.style.opacity = "0.5";
    submitButton.style.cursor = "not-allowed";
  }
  stars.forEach((star, index) => {
    star.addEventListener("click", function () {
      stars.forEach((s) => s.classList.remove("active"));

      for (let i = 0; i <= index; i++) {
        stars[i].classList.add("active");
      }
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.style.opacity = "1";
        submitButton.style.cursor = "pointer";
        submitButton.style.backgroundColor = "#a7051a";
      }
    });
  });
});
