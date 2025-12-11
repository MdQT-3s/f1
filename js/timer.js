(function () {
  function getNextSunday19() {
    const now = new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours();

    const targetDate = new Date(now);

    if (currentDay === 0 && currentHour < 19) {
      targetDate.setHours(19, 0, 0, 0);
    } else {
      let daysToAdd = 7 - currentDay;
      if (currentDay === 0) daysToAdd = 7;

      targetDate.setDate(now.getDate() + daysToAdd);
      targetDate.setHours(19, 0, 0, 0);
    }

    return targetDate;
  }

  const targetDate = getNextSunday19();

  function updateTimer() {
    const now = new Date();
    const timeDiff = targetDate - now;
    const elements = document.querySelectorAll(".block__number");

    if (elements.length < 3) return;

    if (timeDiff <= 0) {
      elements[0].textContent = "0";
      elements[1].textContent = "00";
      elements[2].textContent = "00";

      setTimeout(() => {
        location.reload();
      }, 60000);

      return;
    }

    const totalSeconds = Math.floor(timeDiff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    elements[0].textContent = days;
    elements[1].textContent = hours < 10 ? "0" + hours : hours;
    elements[2].textContent = minutes < 10 ? "0" + minutes : minutes;
  }

  function startTimer() {
    updateTimer();
    setInterval(updateTimer, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startTimer);
  } else {
    startTimer();
  }
})();
