let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
// const FORM_URL = import.meta.env.VITE_FORMSPREE_URL;

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

document.querySelectorAll('.navbar a').forEach(link => {
  link.onclick = () => {
    navbar.classList.remove('active');
    menuIcon.classList.remove('bx-x');
  };
});

document.getElementById('contact-btn').addEventListener('click', () => {
  document.querySelector('#contact').scrollIntoView({
    behavior: 'smooth'
  });
});


const form = document.querySelector('form');

const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const emailError = document.getElementById("email-error");
const phoneError = document.getElementById("phone-error");

// 🧠 Khi bấm "Send Message"
form.addEventListener("submit", async function (e) {
  e.preventDefault(); // chặn reload trang

  const formData = new FormData(form);
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  let isValid = true;

  // Reset lỗi
  emailError.textContent = "";
  phoneError.textContent = "";

  // 1️⃣ Phải có ít nhất 1 trong 2
  if (!email && !phone) {
    emailError.textContent = "Please provide at least an Email or a Phone number.";
    phoneError.textContent = "Please provide at least an Email or a Phone number.";
    isValid = false;
  }

  // 2️⃣ Email hợp lệ
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailError.textContent = "Invalid email address format.";
    isValid = false;
  }

  // 3️⃣ Phone hợp lệ
  if (phone && !/^[0-9]{8,15}$/.test(phone)) {
    phoneError.textContent = "Phone number must be between 8 and 15 digits.";
    isValid = false;
  }

  // ❌ Ngừng nếu không hợp lệ
  if (!isValid) return;

  // ✅ Gửi form qua Formspree (AJAX)
  try {
    const response = await fetch("https://formspree.io/f/xvgwqblq", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    });

    if (response.ok) {
      showToast("✅ Message sent successfully!", "success");
      form.reset();
    } else {
      showToast("❌ Something went wrong. Please try again later.", "error");
    }
  } catch (error) {
    showToast("⚠️ Network error. Please check your connection.", "error");
  }
});

// 🧹 Xóa lỗi khi người dùng nhập lại
[emailInput, phoneInput].forEach(input => {
  input.addEventListener("input", () => {
    document.getElementById(input.id + "-error").textContent = "";
  });
});

// 🔔 Toast thông báo đẹp
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className = `toast ${type}`;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}