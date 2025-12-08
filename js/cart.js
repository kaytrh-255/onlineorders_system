// ====================== HAMBURGER MENU ======================
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("hamburgerBtn");
    const menu = document.getElementById("sideMenu");

    if (btn && menu) {
        btn.addEventListener("click", () => {
            menu.classList.toggle("active");
        });
    }
});

// ====================== ONLOAD ======================
window.onload = () => {
    loadCustomerInfo();
    loadCart();
};

// ====================== LOAD CUSTOMER INFO ======================
function loadCustomerInfo() {
    const info = JSON.parse(localStorage.getItem("customerInfo"));
    const view = document.getElementById("customerInfo");

    if (!info) {
        view.innerHTML = `
            ❗ <b>Bạn chưa nhập thông tin khách!</b><br><br>
            <a href="start.html" class="back-btn">⬅ Quay về nhập thông tin</a>
        `;
        return;
    }

    if (info.type === "table") {
        view.innerHTML = `📍 Dùng tại bàn: <b>${info.table}</b>`;
    } else {
        view.innerHTML = `🚚 Giao hàng đến: <b>${info.address}</b>`;
    }
}

// ====================== LOAD CART ======================
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartDiv = document.getElementById("cartItems");
    const totalView = document.getElementById("cartTotal");

    cartDiv.innerHTML = "";
    let total = 0;

    // Nếu giỏ hàng trống
    if (cart.length === 0) {
        cartDiv.innerHTML = `
            <p class="empty-cart">🛒 Giỏ hàng đang trống.</p>
            <a href="index.html" class="back-btn">⬅ Quay về menu</a>
        `;
        totalView.innerText = "0đ";
        return;
    }

    cart.forEach((item, index) => {
        total += item.price;

        cartDiv.innerHTML += `
            <div class="cart-item">
                <div class="cart-number">${index + 1}.</div>

                <div class="cart-info">
                    <h3>${item.name}</h3>
                    <p>${item.price.toLocaleString()}đ</p>
                </div>

                <div class="cart-item-total">
                    ${item.price.toLocaleString()}đ
                </div>
            </div>
        `;
    });

    // Thêm nút tiếp tục chọn món
    cartDiv.innerHTML += `
        <div class="add-more-area">
            <a href="index.html" class="add-more-btn">➕ Thêm món ăn</a>
        </div>
    `;

    totalView.innerText = total.toLocaleString() + "đ";
}

function checkout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const info = JSON.parse(localStorage.getItem("customerInfo"));
    const msg = document.getElementById("queueMessage");

    if (!info) {
        alert("⚠ Bạn chưa nhập thông tin khách hàng!");
        return;
    }

    if (cart.length === 0) {
        alert("⚠ Giỏ hàng trống, không thể thanh toán!");
        return;
    }

    msg.innerHTML = "⏳ Đưa vào hàng đợi thanh toán...";

    setTimeout(() => {
        msg.innerHTML = "✅ Thanh toán thành công! Đơn hàng đã được ghi nhận.";

        let orders = JSON.parse(localStorage.getItem("orders")) || [];

        orders.push({
            items: cart,
            customer: info,
            time: new Date().toLocaleString()
        });

        // Giới hạn 10 đơn gần nhất
        if (orders.length > 10) {
            orders = orders.slice(orders.length - 10);
        }

        localStorage.setItem("orders", JSON.stringify(orders));

        // 🔥 XÓA THÔNG TIN KHÁCH → quay lại sẽ bắt nhập mới
        localStorage.removeItem("customerInfo");

        // Xóa giỏ hàng
        localStorage.removeItem("cart");

        setTimeout(() => {
            window.location.href = "orders.html";
        }, 1000);

    }, 1500);
}
