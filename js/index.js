// ======================= index.js =======================
document.addEventListener('DOMContentLoaded', () => {

  // --------------------- SMOOTH SCROLL ---------------------
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href.startsWith('#')) return; // external link giữ nguyên
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // --------------------- FORM HANDLING ---------------------
  const formOffline = document.getElementById('form-offline');
  const formOnline  = document.getElementById('form-online');

  window.showForm = function(mode) {
    if (mode === 'offline') {
      formOffline.classList.remove('hidden');
      formOnline.classList.add('hidden');
      formOffline.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      formOnline.classList.remove('hidden');
      formOffline.classList.add('hidden');
      formOnline.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  window.hideForms = function() {
    formOffline.classList.add('hidden');
    formOnline.classList.add('hidden');
  };

  // --------------------- CART INIT ---------------------
  if (!localStorage.getItem('cart')) localStorage.setItem('cart', JSON.stringify([]));

  // --------------------- TOAST FUNCTION ---------------------
  function showToast(msg, type = 'info', duration = 2000) {
    let toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerText = msg;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, duration);
  }

  // --------------------- PHONE VALIDATION ---------------------
  function validatePhone(phone) {
    return /^0\d{9}$/.test(phone);
  }

  function phoneExistsInRecentOrders(phone) {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const recent = orders.slice(-10); // 10 đơn gần nhất
    return recent.some(order =>
      order.customer && order.customer.phone && order.customer.phone === phone
    );
  }

  // --------------------- OFFLINE SUBMIT ---------------------
  window.submitOffline = function(e) {
    e.preventDefault();

    const table = document.getElementById('table-number').value.trim();
    const name  = document.getElementById('table-name').value.trim();
    const phone = document.getElementById('table-phone').value.trim();

    if (!table) {
      showToast('⚠ Vui lòng nhập số bàn!', 'error');
      return false;
    }

    if (phone) {
      if (!validatePhone(phone)) {
        showToast('⚠ SĐT phải gồm 10 số và bắt đầu bằng 0!', 'error');
        return false;
      }
      if (phoneExistsInRecentOrders(phone)) {
        showToast('⚠ SĐT đã xuất hiện trong 10 đơn gần nhất!', 'error');
        return false;
      }
    }

    localStorage.setItem("customerInfo", JSON.stringify({
      type: "table",
      table,
      name,
      phone
    }));

    showToast('✅ Thông tin khách hàng đã lưu!', 'success', 1200);
    setTimeout(() => { window.location.href = './start.html#menu'; }, 1300);
    return false;
  };

  // --------------------- ONLINE SUBMIT ---------------------
  window.submitOnline = function(e) {
    e.preventDefault();

    const address = document.getElementById('online-address').value.trim();
    const name    = document.getElementById('online-name').value.trim();
    const phone   = document.getElementById('online-phone').value.trim();

    if (!address) {
      showToast('⚠ Vui lòng nhập địa chỉ!', 'error');
      return false;
    }

    if (!validatePhone(phone)) {
      showToast('⚠ SĐT phải gồm 10 số và bắt đầu bằng 0!', 'error');
      return false;
    }

    if (phoneExistsInRecentOrders(phone)) {
      showToast('⚠ SĐT đã xuất hiện trong 10 đơn gần nhất!', 'error');
      return false;
    }

    localStorage.setItem("customerInfo", JSON.stringify({
      type: "delivery",
      address,
      name,
      phone
    }));

    showToast('Thông tin khách hàng đã lưu!', 'success', 1200);
    setTimeout(() => { window.location.href = './start.html#menu'; }, 1300);
    return false;
  };

  // --------------------- MINI MENU PREVIEW ---------------------
  const PREVIEW = [
    { id: 1, name: 'Món Ốc/Snail dish', price: '165.000đ', img: 'assets/images/chuyenveoc.jpg' },
    { id: 2, name: 'Hải sản tổng hợp/Mixed Seafood', price: '189.000đ', img: 'assets/images/chuyenvehaisan.jpg' },
    { id: 3, name: 'BestSeller', price: '1.119.000đ', img: 'assets/images/bestseller.jpg' },
    { id: 4, name: 'Đồ uống', price: '125.000đ', img: 'assets/images/nuocgiaikhat.jpg' }
  ];

  const wrap = document.getElementById('menu-preview');
  if (wrap) {
    PREVIEW.forEach(it => {
      const el = document.createElement('div');
      el.className = 'preview-item';
      el.innerHTML = `
        <img src="${it.img}" alt="${it.name}" onerror="this.src='assets/images/placeholder.jpg'">
        <div class="pmeta">
          <div class="pname">${it.name}</div>
          <div class="pprice" style="color:var(--gold); font-weight:700">${it.price}</div>
        </div>
      `;
      wrap.appendChild(el);
    });
  }

});
