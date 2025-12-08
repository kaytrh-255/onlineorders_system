document.addEventListener("DOMContentLoaded", () => {

  // ==============================
  // ⭐ TOAST FUNCTION
  // ==============================
  window.showToast = function (msg, type = "error") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerText = msg;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  };

  // ==============================
  // ⭐ Smooth scroll
  // ==============================
  document.querySelectorAll(".nav-links a").forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  const formOffline = document.getElementById("form-offline");
  const formOnline = document.getElementById("form-online");

  window.showForm = function(mode) {
    if (mode === "offline") {
      formOffline.classList.remove("hidden");
      formOnline.classList.add("hidden");
      formOffline.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      formOnline.classList.remove("hidden");
      formOffline.classList.add("hidden");
      formOnline.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  window.hideForms = function() {
    formOffline.classList.add("hidden");
    formOnline.classList.add("hidden");
  };

  // ==============================
  // ⭐ KIỂM TRA SĐT HỢP LỆ
  // ==============================
  function validatePhone(phone) {
    return /^0\d{9}$/.test(phone);
  }

  function phoneExistsInRecentOrders(phone) {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const recent = orders.slice(-10);
    return recent.some(o => o.customer && o.customer.phone === phone);
  }

  // ==============================
  // ⭐ OFFLINE SUBMIT
  // ==============================
  window.submitOffline = function(e) {
    e.preventDefault();
    const table = document.getElementById("table-number").value.trim();
    const name = document.getElementById("table-name").value.trim();
    const phone = document.getElementById("table-phone").value.trim();

    if (!table) {
      showToast("⚠ Vui lòng nhập số bàn!", "error");
      return false;
    }

    if (phone && !validatePhone(phone)) {
      showToast("⚠ SĐT phải gồm 10 số và bắt đầu bằng 0!", "error");
      return false;
    }

    if (phone && phoneExistsInRecentOrders(phone)) {
      showToast("⚠ SĐT đã dùng trong 10 đơn gần nhất!", "error");
      return false;
    }

    // Lưu vào localStorage
    const customerInfo = { type: "offline", table, name, phone };
    localStorage.setItem("customerInfo", JSON.stringify(customerInfo));
    localStorage.setItem("mode", "offline");

    showToast("✔ Bắt đầu gọi món!", "success");
    setTimeout(() => window.location.href = "start.html#menu", 500);
    return false;
  };

  // ==============================
  // ⭐ ONLINE SUBMIT
  // ==============================
  window.submitOnline = function(e) {
    e.preventDefault();
    const address = document.getElementById("online-address").value.trim();
    const name = document.getElementById("online-name").value.trim();
    const phone = document.getElementById("online-phone").value.trim();

    if (!address) {
      showToast("⚠ Vui lòng nhập địa chỉ!", "error");
      return false;
    }

    if (!validatePhone(phone)) {
      showToast("⚠ SĐT phải gồm 10 số và bắt đầu bằng 0!", "error");
      return false;
    }

    if (phoneExistsInRecentOrders(phone)) {
      showToast("⚠ SĐT đã dùng trong 10 đơn gần nhất!", "error");
      return false;
    }

    const customerInfo = { type: "online", address, name, phone };
    localStorage.setItem("customerInfo", JSON.stringify(customerInfo));
    localStorage.setItem("mode", "online");

    showToast("✔ Bắt đầu đặt món!", "success");
    setTimeout(() => window.location.href = "start.html#menu", 500);
    return false;
  };

  // ==============================
  // ⭐ CART SYSTEM
  // ==============================
  if (!localStorage.getItem("cart")) localStorage.setItem("cart", JSON.stringify([]));
  let cart = JSON.parse(localStorage.getItem("cart"));

  window.addToCart = function(name, price, img) {
    cart.push({ name, price, img });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
  };

  function updateCartUI() {
    document.getElementById("floatCartCount").innerText = cart.length;
    const menuCart = document.getElementById("menuCartCount");
    if (menuCart) menuCart.innerText = cart.length;
  }

  updateCartUI();

  // ==============================
  // ⭐ HAMBURGER MENU
  // ==============================
  window.toggleMenu = function() {
    const menu = document.getElementById("sideMenu");
    menu.classList.toggle("open");
  };
  const sideMenu = document.getElementById("sideMenu");
  if (sideMenu) {
    sideMenu.addEventListener("mouseleave", () => sideMenu.classList.remove("open"));
  }

});
