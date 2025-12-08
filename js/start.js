document.addEventListener("DOMContentLoaded", () => {
  const customerInfoEl = document.getElementById("customerInfo");

  const mode = localStorage.getItem("mode");
  const customerInfo = JSON.parse(localStorage.getItem("customerInfo") || "{}");

  if (!mode || !customerInfoEl) {
    window.location.href = "index.html";
    return;
  }

  if (customerInfo.type === "offline") {
    customerInfoEl.innerText = `Bàn số: ${customerInfo.table}`;
  } else if (customerInfo.type === "online") {
    customerInfoEl.innerText = `Địa chỉ: ${customerInfo.address}`;
  }
});

// ==============================
// ⭐ MENU DATA & RENDER
// ==============================
const foods = {
  oc: [
    { name: "Ốc Hương Rang Muối Hồng Tiêu Xanh", price: 189000, img: "assets/images/Snail/oc1.jpg" },
    { name: "Ốc Móng Tay Sốt Tứ Xuyên Đặc Biệt", price: 169000, img: "assets/images/Snail/oc2.jpg" },
    { name: "Ốc Hương Sốt Trứng Muối Cao Cấp", price: 219000, img: "assets/images/Snail/oc3.jpg" }
  ],
  haisan: [
    { name: "Ngũ Hàu Tiên Nướng Đa Vị", price: 390000, img: "assets/images/mixseafood/sea1.jpg" },
    { name: "Sò Điệp Chiên Giòn Xốt Xoài Dây", price: 298000, img: "assets/images/mixseafood/sea2.jpg" }
  ],
  best: [
    { name: "Hải Sản Hoàng Gia kSeaOne", price: 2599000, img: "assets/images/bestseller/be1.jpg" }
  ],
  drink: [
    { name: "Rượu vang Ý Megale Hellas", price: 2115000, img: "assets/images/drink/drink1.jpg" }
  ]
};

function renderMenu(list, elementId) {
  const grid = document.getElementById(elementId);
  if (!grid) return;
  grid.innerHTML = "";
  list.forEach(item => {
    const div = document.createElement("div");
    div.className = "menu-item";
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="menu-info">
        <h3>${item.name}</h3>
        <p>${item.price.toLocaleString()}đ</p>
        <button onclick='addToCart("${item.name}",${item.price},"${item.img}")'>Thêm</button>
      </div>
    `;
    grid.appendChild(div);
  });
}

renderMenu(foods.oc, "grid-oc");
renderMenu(foods.haisan, "grid-haisan");
renderMenu(foods.best, "grid-best");
renderMenu(foods.drink, "grid-drink");

// ==============================
// ⭐ CART UI
// ==============================
let cart = JSON.parse(localStorage.getItem("cart") || "[]");

function updateCartUI() {
  document.getElementById("floatCartCount").innerText = cart.length;
  const menuCart = document.getElementById("menuCartCount");
  if (menuCart) menuCart.innerText = cart.length;
}

updateCartUI();

