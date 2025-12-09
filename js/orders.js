
// document.addEventListener("DOMContentLoaded", () => {
//     const wrap = document.getElementById("ordersList");

//     let orders = JSON.parse(localStorage.getItem("orders")) || [];

//     if (orders.length === 0) {
//         wrap.innerHTML = `<p class="empty">❗ Chưa có đơn hàng nào.</p>`;
//         return;
//     }

//     wrap.innerHTML = "";

//     orders.forEach((order, index) => {

//         const customer = order.customer || {};
//         const typeText = customer.type === "table"
//             ? `🍽 Tại bàn: <b>${customer.table}</b>`
//             : `🚚 Địa chỉ: <b>${customer.address}</b>`;

//         const phoneText = customer.phone
//             ? `📞 SĐT: <b>${customer.phone}</b>`
//             : `📞 Không có`;

//         // danh sách món
//         const itemsHTML = order.items
//             .map(i => `<li>${i.name} — <b>${i.price.toLocaleString()}đ</b></li>`)
//             .join("");

//         wrap.innerHTML += `
//             <div class="order-box">
//                 <div class="order-header">
//                     <div class="stt">🧾 Đơn số: <b>${index + 1}</b></div>
//                     <div class="time">⏰ ${order.time}</div>
//                 </div>

//                 <div class="order-customer">
//                     ${typeText}<br>
//                     ${phoneText}
//                 </div>

//                 <ul class="order-items">
//                     ${itemsHTML}
//                 </ul>
//             </div>
//         `;
//     });
// });
document.addEventListener("DOMContentLoaded", () => {
  // =============================
  // ⭐ LOAD CUSTOMER INFO
  // =============================
  const infoEl = document.getElementById("customerInfo");
  const mode = localStorage.getItem("mode");
  const customerInfo = JSON.parse(localStorage.getItem("customerInfo") || "{}");

  // Nếu không có mode → quay lại index
  if (!mode || !customerInfo.type) {
    window.location.href = "index.html";
    return;
  }

  // Hiển thị tên khách
  if (customerInfo.type === "offline") {
    infoEl.innerText = `Bàn số: ${customerInfo.table}`;
  } else if (customerInfo.type === "online") {
    infoEl.innerText = `Địa chỉ: ${customerInfo.address}`;
  }

  // =============================
  // ⭐ LOAD CART
  // =============================
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const cartList = document.getElementById("cartList");
  const totalPriceEl = document.getElementById("totalPrice");

  function renderCart() {
    cartList.innerHTML = "";

    if (cart.length === 0) {
      cartList.innerHTML = `<p style="text-align:center; opacity:0.7;">Giỏ hàng trống</p>`;
      totalPriceEl.innerText = "0đ";
      return;
    }

    let total = 0;

    cart.forEach((item, index) => {
      total += item.price;

      cartList.innerHTML += `
        <div class="cart-item">
          <img src="${item.img || "assets/images/placeholder.jpg"}">
          <div class="info">
            <h4>${item.name}</h4>
            <p>${item.price.toLocaleString()}đ</p>
          </div>
          <button class="remove" onclick="removeItem(${index})">&times;</button>
        </div>
      `;
    });

    totalPriceEl.innerText = total.toLocaleString() + "đ";
  }

  window.removeItem = function(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  renderCart();

  // =============================
  // ⭐ SUBMIT ORDER
  // =============================
  window.submitOrder = function () {

    if (cart.length === 0) {
      alert("Giỏ hàng đang trống!");
      return;
    }

    const order = {
      time: new Date().toLocaleString(),
      items: cart,
      customer: customerInfo,
      mode: customerInfo.type
    };

    // Lưu đơn
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Xóa giỏ
    localStorage.removeItem("cart");

    alert("Đã đặt món thành công!");
    window.location.href = "done.html";
  };
});

