let btn = document.getElementById("btn");

function nomValide(nom) {
  return /^[A-Za-zÀ-ÿ\s]{2,}$/.test(nom);
}
function numeroValide(numero) {
  return /^[0-9]{8}$/.test(numero);
}
function emailValide(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function tester(event) {
  event.preventDefault(); // empêche le formulaire de se soumettre

  // Récupération des champs individuellement
  let inputs = document.querySelectorAll(".informations input");
  let prenom = inputs[0].value.trim();
  let email = inputs[1].value.trim();
  let numero = inputs[2].value.trim();
  let subject = inputs[3].value.trim();

  // Réinitialiser les messages d’erreur
  document.getElementById("errPrenom").style.display = "none";
  document.getElementById("errsub").style.display = "none";
  document.getElementById("errEmail").style.display = "none";
  document.getElementById("errnum").style.display = "none";

  let hasError = false;

  if (!nomValide(prenom)) {
    document.getElementById("errPrenom").textContent = "Prénom invalide !";
    document.getElementById("errPrenom").style.display = "block";
    hasError = true;
  } else {
    inputs[0].classList.remove("invalid"); // <= si correction
  }

  if (!nomValide(subject)) {
    document.getElementById("errsub").textContent = "Sujet invalide !";
    document.getElementById("errsub").style.display = "block";
    hasError = true;
  } else {
    inputs[3].classList.remove("invalid");
  }

  if (!emailValide(email)) {
    document.getElementById("errEmail").textContent = "Email invalide !";
    document.getElementById("errEmail").style.display = "block";
    hasError = true;
  } else {
    inputs[1].classList.remove("invalid");
  }

  if (!numeroValide(numero)) {
    document.getElementById("errnum").textContent = "Numéro invalide !";
    document.getElementById("errnum").style.display = "block";
    hasError = true;
  } else {
    inputs[2].classList.remove("invalid");
  }

  // Optionnel : Affichage si tout est OK
  if (!hasError) {
    alert("Formulaire valide !");
    // Tu peux ici envoyer les données ou réinitialiser le formulaire
  }
}

btn.addEventListener("click", tester);
// نجيب كل روابط النافيغاشن
const navLinks = document.querySelectorAll(".header nav a");

// نجيب كل الأقسام اللي عندها id مطابق لـ href بتاع الرابط
const sections = [];

navLinks.forEach((link) => {
  const href = link.getAttribute("href");
  if (href && href.startsWith("#")) {
    const section = document.querySelector(href);
    if (section) sections.push(section);
  }
});

// دالة تحذف الكلاس active من كل الروابط
function clearActive() {
  navLinks.forEach((link) => link.classList.remove("active"));
}

// عند الضغط على أي رابط في النافيغاشن
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    clearActive(); // نحذف active من الكل
    link.classList.add("active"); // نضيف active للرابط المضغوط

    // نروح للقسم الخاص بالرابط بطريقة smooth
    const targetSection = document.querySelector(link.getAttribute("href"));
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// تابع لتحديد الرابط اللي لازم يكون active حسب scroll
function onScroll() {
  const scrollPos = window.scrollY || window.pageYOffset;

  sections.forEach((section, index) => {
    const offsetTop = section.offsetTop - 150; // تعديل حسب حاجتك
    const offsetBottom = offsetTop + section.offsetHeight;

    if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
      clearActive();
      navLinks[index].classList.add("active");
    }
  });
}

// نربط onScroll مع حدث scroll
window.addEventListener("scroll", onScroll);

// لتحديد active تلقائياً عند تحميل الصفحة حسب موقعها الحالي
window.addEventListener("load", onScroll);
