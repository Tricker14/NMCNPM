document.addEventListener('DOMContentLoaded', function () {
  const targetDate = new Date('2023-12-31T23:59:59').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = padZero(days);
    document.getElementById('hours').innerText = padZero(hours);
    document.getElementById('minutes').innerText = padZero(minutes);
    document.getElementById('seconds').innerText = padZero(seconds);
  }

  function padZero(number) {
    return (number < 10 ? '0' : '') + number;
  }

  updateCountdown();

  setInterval(updateCountdown, 1000);

  let slideIndex = 1;
  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("demo");
    let captionText = document.getElementById("caption");

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");
    captionText.innerHTML = dots[slideIndex - 1].alt;
  }

  function updateBid() {
    var bidIncrement = parseFloat(document.getElementById("bid-increment").innerText);
    var quantity = parseInt(document.getElementById("quantity").value, 10);
    var currentPrice = parseFloat(document.getElementById("current-price-container").innerText);

    var totalBid = bidIncrement * quantity + currentPrice;
    document.getElementById("your-bid").innerHTML = '<i class="fas fa-dollar-sign"></i> ' + totalBid.toFixed(3);
  }

  function increment() {
    var quantityInput = document.getElementById("quantity");
    var currentQuantity = parseInt(quantityInput.value, 10);

    if (currentQuantity < 9) {
      quantityInput.value = currentQuantity + 1;
      updateBid();
    }
  }

  function decrement() {
    var quantityInput = document.getElementById("quantity");
    var currentQuantity = parseInt(quantityInput.value, 10);

    if (currentQuantity > 1) {
      quantityInput.value = currentQuantity - 1;
      updateBid();
    }
  }

  document.getElementById('prevButton').addEventListener('click', function () {
    plusSlides(-1);
  });

  document.getElementById('nextButton').addEventListener('click', function () {
    plusSlides(1);
  });

  document.getElementById('decrement').addEventListener('click', function () {
    decrement();
  });

  document.getElementById('increment').addEventListener('click', function () {
    increment();
  });

  for (let i = 1; i <= 6; i++) {
    document.getElementById('img' + i).addEventListener('click', function () {
      currentSlide(i);
    });
  }
});
