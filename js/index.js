document.addEventListener('DOMContentLoaded', () => {

  // ====================== SMOOTH SCROLL ======================
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
      // Nếu link ngoài, để mặc định → navigate bình thường
    });
  });

  const formOffline = document.getElementById('form-offline');
  const formOnline = document.getElementById('form-online');

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

  // ====================== CREATE CART ======================
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
  }

  // ====================== TOAST ======================
  function showToast(message, type='info', duration=2500) {
    let toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 100); // trigger CSS animation

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, duration);
  }

  // ====================== VALIDATE PHONE ======================
  function validatePhone(phone) {
    return /^0\d{9}$/.test(phone);
  }

  function phoneExistsInRecentOrders(phone) {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const recent = orders.slice(-10); // 10 đơn mới nhất
    return recent.some(order => order.customer && order.customer.phone === phone);
  }

  // ====================== OFFLINE SUBMIT ======================
  window.submitOffline = function(e) {
    e.preventDefault();

    const table = document.getElementById('table-number').value.trim();
    const name  = document.getElementById('table-name').value.trim();
    const phone = document.getElementById('table-phone').value.trim();

    if (!table) {
      showToast('Vui lòng nhập số bàn!', 'error');
      return false;
    }

    if (phone.length > 0) {
      if (!validatePhone(phone)) {
        showToast("Số điện thoại phải gồm 10 số và bắt đầu bằng 0!", 'error');
        return false;
      }
      if (phoneExistsInRecentOrders(phone)) {
        showToast("Số điện thoại đã xuất hiện trong 10 đơn gần nhất!", 'error');
        return false;
      }
    }

    localStorage.setItem("customerInfo", JSON.stringify({
      type: "table",
      table,
      name,
      phone
    }));

    showToast("✅ Thông tin khách hàng đã lưu!", 'success', 1500);

    setTimeout(() => {
      window.location.href = '/#menu'; // sửa path chuẩn cho Vercel
    }, 1600);

    return false;
  };

  // ====================== ONLINE SUBMIT ======================
  window.submitOnline = function(e) {
    e.preventDefault();

    const address = document.getElementById('online-address').value.trim();
    const name    = document.getElementById('online-name').value.trim();
    const phone   = document.getElementById('online-phone').value.trim();

    if (!address) {
      showToast('Vui lòng nhập địa chỉ!', 'error');
      return false;
    }

    if (!validatePhone(phone)) {
      showToast("Số điện thoại phải gồm 10 số và bắt đầu bằng 0!", 'error');
      return false;
    }

    if (phoneExistsInRecentOrders(phone)) {
      showToast("Số điện thoại đã xuất hiện trong 10 đơn gần nhất!", 'error');
      return false;
    }

    localStorage.setItem("customerInfo", JSON.stringify({
      type: "delivery",
      address,
      name,
      phone
    }));

    showToast("✅ Thông tin khách hàng đã lưu!", 'success', 1500);

    setTimeout(() => {
      window.location.href = '/#menu';
    }, 1600);

    return false;
  };

  // ====================== PREVIEW MINI MENU ======================
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
