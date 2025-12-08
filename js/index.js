
document.addEventListener("DOMContentLoaded", () => {

  // ==============================
  // ⭐ TOAST FUNCTION
  // ==============================
  window.showToast = function (msg, type = "error") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerText = msg;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("show");
    }, 10);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  };


  // ==============================
  // ⭐ Smooth scroll
  // ==============================
  // document.querySelectorAll(".nav-links a").forEach((a) => {
  //   a.addEventListener("click", (e) => {
  //     e.preventDefault();
  //     const target = document.querySelector(a.getAttribute("href"));
  //     if (target) target.scrollIntoView({ behavior: "smooth" });
  //   });
  // });
  document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href.indexsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    } 
    // Nếu link ngoài hoặc file khác, không preventDefault → vẫn navigate bình thường
  });
});

  const formOffline = document.getElementById("form-offline");
  const formOnline = document.getElementById("form-online");

  window.showForm = function (mode) {
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

  window.hideForms = function () {
    formOffline.classList.add("hidden");
    formOnline.classList.add("hidden");
  };

  // Tạo cart nếu chưa có
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
  }


  // ==============================
  // ⭐ KIỂM TRA SĐT HỢP LỆ
  // ==============================
  function validatePhone(phone) {
    return /^0\d{9}$/.test(phone);
  }

  // ==============================
  // ⭐ KIỂM TRA TRÙNG SĐT TRONG 10 ĐƠN GẦN NHẤT
  // ==============================
  function phoneExistsInRecentOrders(phone) {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const recent = orders.slice(-10);

    return recent.some(
      (o) => o.customer && o.customer.phone && o.customer.phone === phone
    );
  }


  // ==============================
  // ⭐ OFFLINE SUBMIT
  // ==============================
  window.submitOffline = function (e) {
    e.preventDefault();

    const table = document.getElementById("table-number").value.trim();
    const name = document.getElementById("table-name").value.trim();
    const phone = document.getElementById("table-phone").value.trim();

    if (!table) {
      showToast("⚠ Vui lòng nhập số bàn!", "error");
      return false;
    }

    if (phone.length > 0) {
      if (!validatePhone(phone)) {
        showToast("⚠ Số điện thoại phải gồm 10 số và bắt đầu bằng 0!", "error");
        return false;
      }

      if (phoneExistsInRecentOrders(phone)) {
        showToast("⚠ SĐT này đã dùng trong 10 đơn gần nhất!", "error");
        return false;
      }
    }

    localStorage.setItem(
      "customerInfo",
      JSON.stringify({
        type: "table",
        table,
        name,
        phone,
      })
    );

    showToast("✔ Bắt đầu gọi món!", "success");

    setTimeout(() => {
  window.location.href = '/start.html#menu'; // nếu index.html ở root
  // hoặc chỉ window.location.href = '/#menu' nếu Vercel tự map index.html

    }, 500);

    return false;
  };


  // ==============================
  // ⭐ ONLINE SUBMIT
  // ==============================
  window.submitOnline = function (e) {
    e.preventDefault();

    const address = document.getElementById("online-address").value.trim();
    const name = document.getElementById("online-name").value.trim();
    const phone = document.getElementById("online-phone").value.trim();

    if (!address) {
      showToast("⚠ Vui lòng nhập địa chỉ!", "error");
      return false;
    }

    if (!validatePhone(phone)) {
      showToast("⚠ SĐT phải 10 số và bắt đầu bằng 0!", "error");
      return false;
    }

    if (phoneExistsInRecentOrders(phone)) {
      showToast("⚠ SĐT này đã dùng trong 10 đơn gần nhất!", "error");
      return false;
    }

    localStorage.setItem(
      "customerInfo",
      JSON.stringify({
        type: "delivery",
        address,
        name,
        phone,
      })
    );

    showToast("✔ Bắt đầu đặt món!", "success");

    setTimeout(() => {
      window.location.href = '/start.html#menu'; 
    }, 500);

    return false;
  };


  // ==============================
  // ⭐ PREVIEW MENU
  // ==============================
  const PREVIEW = [
    { id: 1, name: "Món Ốc/Snail dish", price: "165.000đ", img: "assets/images/chuyenveoc.jpg" },
    { id: 2, name: "Hải sản tổng hợp/Mixed Seafood", price: "189.000đ", img: "assets/images/chuyenvehaisan.jpg" },
    { id: 3, name: "BestSeller", price: "1.119.000đ", img: "assets/images/bestseller.jpg" },
    { id: 4, name: "Đồ uống", price: "125.000đ", img: "assets/images/nuocgiaikhat.jpg" },
  ];

  const wrap = document.getElementById("menu-preview");
  if (wrap) {
    PREVIEW.forEach((it) => {
      const div = document.createElement("div");
      div.className = "preview-item";

      div.innerHTML = `
        <img src="${it.img}" alt="${it.name}" onerror="this.src='assets/images/placeholder.jpg'">
        <div class="pmeta">
          <div class="pname">${it.name}</div>
          <div class="pprice" style="color:var(--gold); font-weight:700">${it.price}</div>
        </div>
      `;

      wrap.appendChild(div);
    });
  }
});
