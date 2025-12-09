document.addEventListener("DOMContentLoaded", () => {
    const wrap = document.getElementById("ordersList");

    let orders = JSON.parse(localStorage.getItem("orders") || "[]");

    if (orders.length === 0) {
        wrap.innerHTML = `<p class="empty">❗ Chưa có đơn hàng nào.</p>`;
        return;
    }

    wrap.innerHTML = "";

    orders.forEach((order, index) => {
        // ⭐ Luôn đảm bảo customer là object hợp lệ
        const customer = order.customer || {};

        // ========== ⭐ TYPE: TABLE / DELIVERY ==========
        let typeText = "";

        if (customer.type === "table") {
            typeText = `🍽 Tại bàn: <b>${customer.table || "Không rõ"}</b>`;
        } else if (customer.type === "delivery") {
            typeText = `🚚 Địa chỉ: <b>${customer.address || "Không rõ"}</b>`;
        } else {
            typeText = `❓ Không xác định`;
        }

        // ========== ⭐ PHONE ==========
        const phoneText = customer.phone
            ? `📞 SĐT: <b>${customer.phone}</b>`
            : `📞 Không có`;

        // ========== ⭐ LIST ITEMS ==========
        const itemsHTML = (order.items || [])
            .map(i =>
                `<li>${i.name} — <b>${Number(i.price).toLocaleString()}đ</b></li>`
            )
            .join("");

        wrap.innerHTML += `
            <div class="order-box">
                <div class="order-header">
                    <div class="stt">🧾 Đơn số: <b>${index + 1}</b></div>
                    <div class="time">⏰ ${order.time || "Không rõ"}</div>
                </div>

                <div class="order-customer">
                    ${typeText}<br>
                    ${phoneText}
                </div>

                <ul class="order-items">
                    ${itemsHTML}
                </ul>
            </div>
        `;
    });
});
