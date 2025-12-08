document.addEventListener("DOMContentLoaded", () => {
  const customerInfo = document.getElementById("customerInfo");
  let mode = localStorage.getItem("mode");  // "online" hoặc "offline"

  // if (!mode) {
  //   window.location.href = "index.html";
  //   return;
  // }

  if (customerInfo) { // check element tồn tại
    if (mode === "offline") {
      customerInfo.innerText = "Bàn số: " + localStorage.getItem("tableNumber");
    } else {
      customerInfo.innerText = "Địa chỉ: " + localStorage.getItem("address");
    }
  }
});

// menu data
const foods = {
  oc: [
    { name: "Ốc Hương Rang Muối Hồng Tiêu Xanh", price: 189000, img: "assets/images/Snail/oc1.jpg" },
    { name: "Ốc Móng Tay Sốt Tứ Xuyên Đặc Biệt", price: 169000, img: "assets/images/Snail/oc2.jpg" },
    { name: "Ốc Hương Sốt Trứng Muối Cao Cấp", price: 219000, img: "assets/images/Snail/oc3.jpg" },
    { name: "Ốc Bươu Đút Lò Bơ Tỏi Parsley Kiểu Pháp", price: 189000, img: "assets/images/Snail/oc4.jpg" },
    { name: "Ốc Tỏi Rang Muối Ớt Tuyết Hồng Kông", price: 269000, img: "assets/images/Snail/oc5.jpg" },
    { name: "Ốc sên nướng (Escargot) kiểu pháp", price: 189000, img: "assets/images/Snail/oc4.jpg" },
    { name: "Terrine Ốc Nhồi Bách Hoa Thượng Hạng", price: 269000, img: "assets/images/Snail/oc5.jpg" }
  ],

  haisan: [
    { name: "Ngũ Hàu Tiên Nướng Đa Vị", price: 390000, img: "assets/images/mixseafood/sea1.jpg" },
    { name: "Sò Điệp Chiên Giòn Xốt Xoài Dây", price: 298000, img: "assets/images/mixseafood/sea2.jpg" }, 
    { name: "Cá Tuyết Đen Áp Chảo Sốt Miso Teriyaki", price: 399000, img: "assets/images/mixseafood/sea3.jpg" },
    { name: "Bạch Tuộc Tây Ban Nha Sốt Paprika hun khói", price: 398000, img: "assets/images/mixseafood/sea4.jpg" }, 
    { name: "Cá Tầm Thượng Hạng Hấp Xì Dầu", price: 499000, img: "assets/images/mixseafood/sea5.jpg" },
    { name: "Tôm Sú Lửa Hồng Sốt Mật Ong Hương Gừng", price: 298000, img: "assets/images/mixseafood/sea6.jpg" }
  ],

  best: [
    { name: "Hải Sản Hoàng Gia kSeaOne", price: 2599000, img: "assets/images/bestseller/be1.jpg" },
    { name: "Yến Tiệc Quây Quần bên gia đình", price: 1799000, img: "assets/images/bestseller/be2.jpg" },
    { name: "Tôm Càng Sông Cửu Long Sốt Caramen Rượu Rum", price: 799000, img: "assets/images/bestseller/be3.jpg" },
    { name: "Set Menu Đối Tác Vàng (The Gold Partner Set)", price: 1299000, img: "assets/images/bestseller/be4.jpg" },
    { name: "Độc Quyền Kim Cương ẩm thực KSeaone", price: 5999000, img: "assets/images/bestseller/be5.jpg" },
    { name: "Tôm Hùm Canada Sốt Caramen Tiêu Xanh", price: 1799000, img: "assets/images/bestseller/be6.jpg" }
  ],

  drink: [
    { name: "Rượu vang Ý Megale Hellas Malvasia Nera Salento", price: 2115000, img: "assets/images/drink/drink1.jpg" },
    { name: "Rượu vang Ý Ange Primitivo Puglia", price: 3119000, img: "assets/images/drink/drink2.jpg" },
    { name: "Vang Ý Vinré Bianco Sauvignon", price: 18000, img: "assets/images/drink/drink3.jpg" },
    { name: "Nước Ép Trái Cây Tươi/Detox", price: 79000, img: "assets/images/drink/drink4.jpg" },
    { name: "Trà Thảo Mộc/Trà Đạo", price: 59000, img: "assets/images/drink/drink5.jpg" },
    { name: "Mocktails (Cocktail không cồn)", price: 319000, img: "assets/images/drink/drink6.jpg" },
    { name: "Nước suối có ga (Sparkling)", price: 99000, img: "assets/images/drink/drink7.jpg" }
  ]
};


// ------------------------------
// RENDER MENU
// ------------------------------
function renderMenu(list, elementId) {
  const grid = document.getElementById(elementId);
  list.forEach(item => {
    grid.innerHTML += `
      <div class="menu-item">
        <img src="${item.img}">
        <div class="menu-info">
          <h3>${item.name}</h3>
          <p>${item.price.toLocaleString()}đ</p>
          <button onclick='addToCart("${item.name}",${item.price})'>Thêm</button>
        </div>
      </div>
    `;
  });
}

renderMenu(foods.oc, "grid-oc");
renderMenu(foods.haisan, "grid-haisan");
renderMenu(foods.best, "grid-best");
renderMenu(foods.drink, "grid-drink");


// ------------------------------
// CART SYSTEM
// ------------------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// function addToCart(name, price) {
//   cart.push({ name, price });
//   localStorage.setItem("cart", JSON.stringify(cart));
//   updateCartUI();
// }
function addToCart(name, price, img) {
  cart.push({ name, price, img });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}


function updateCartUI() {
  document.getElementById("floatCartCount").innerText = cart.length;
  const menuCart = document.getElementById("menuCartCount");
  if (menuCart) menuCart.innerText = cart.length;
}

updateCartUI();


// ------------------------------
// HAMBURGER MENU SHOW/HIDE
// ------------------------------
function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  menu.classList.toggle("open");
}

// Close when mouse leaves menu
document.getElementById("sideMenu").addEventListener("mouseleave", () => {
  document.getElementById("sideMenu").classList.remove("open");
});


/* ===========================
   TÌM KIẾM MÓN ĂN
=========================== */

// Gom tất cả món trong 4 menu
let allMenuItems = [];

window.addEventListener("load", () => {
  collectMenuItems();
});

// Thu thập dữ liệu từ DOM khi đã render xong
function collectMenuItems() {
  const grids = ["grid-oc", "grid-haisan", "grid-best", "grid-drink"];

  grids.forEach(id => {
    const section = document.getElementById(id);
    if (!section) return;

    const items = section.querySelectorAll(".menu-item"); // class thẻ món ăn
    items.forEach(item => {
      const name = item.querySelector("h3")?.innerText || "";
      allMenuItems.push({
        name,
        element: item
      });
    });
  });
}

// Lấy input
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

// Lắng nghe sự kiện gõ
searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.trim().toLowerCase();

  if (keyword === "") {
    searchResults.style.display = "none";
    searchResults.innerHTML = "";
    return;
  }

  const results = allMenuItems.filter(item =>
    item.name.toLowerCase().includes(keyword)
  );

  renderSearchResults(results);
});

// Hiển thị kết quả
function renderSearchResults(items) {
  searchResults.innerHTML = "";
  searchResults.style.display = "block";

  if (items.length === 0) {
    searchResults.innerHTML = `<p>❌ Không tìm thấy món phù hợp</p>`;
    return;
  }

  items.forEach(i => {
    const p = document.createElement("p");
    p.textContent = i.name;
    p.onclick = () => {
      i.element.scrollIntoView({ behavior: "smooth", block: "center" });
      searchResults.style.display = "none";
    };
    searchResults.appendChild(p);
  });
}


/* ===========================
   CART FLOATING
=========================== */
function goToCart() {
  window.location.href = "cart.html";}
