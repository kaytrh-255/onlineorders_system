document.addEventListener("DOMContentLoaded", () => {
    const wrap = document.getElementById("ordersList");

    let orders = JSON.parse(localStorage.getItem("orders") || "[]");

    if (orders.length === 0) {
        wrap.innerHTML = `<p class="empty">❗ Chưa có đơn hàng nào.</p>`;
        return;
    }

    wrap.innerHTML = "";

    orders.forEach((order, index) => {

        const c = order.customer || {};

        // ==========================
        //   ⭐ FORMAT TYPE (table / delivery)
        // ==========================
        let typeText = "";
        if (c.type === "table") {
            typeText = `🍽 Tại bàn: <b>${c.table || "Không rõ"}</b>`;
        } else if (c.type === "delivery") {
            typeText = `🚚 Địa chỉ: <b>${c.address || "Không rõ"}</b>`;
        } else {
            typeText = `❓ Không xác định`;
        }

        // ==========================
        //   ⭐ PHONE
        // ==========================
        const phoneText = c.phone
            ? `📞 SĐT: <b>${c.phone}</b>`
            : `📞 Không có`;

        // ==========================
        //   ⭐ ITEMS
        // ==========================
        const itemsHTML = order.items
            .map(i => `<li>${i.name} — <b>${i.price.toLocaleString()}đ</b></li>`)
            .join("");

        wrap.innerHTML += `
            <div class="order-box">
                
                <div class="order-header">
                    <div class="stt">🧾 Đơn số: <b>${index + 1}</b></div>
                    <div class="time">⏰ ${order.time}</div>
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
