
document.addEventListener("DOMContentLoaded", () => {
    const wrap = document.getElementById("ordersList");

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length === 0) {
        wrap.innerHTML = `<p class="empty">❗ Chưa có đơn hàng nào.</p>`;
        return;
    }

    wrap.innerHTML = "";

    orders.forEach(( index, order) => {

        const customer = order.customer || {};
        const typeText = customer.type === "table"
            ? `🍽 Tại bàn: <b>${customer.table}</b>`
            : `🚚 Địa chỉ: <b>${customer.address}</b>`;

        const phoneText = customer.phone
            ? `📞 SĐT: <b>${customer.phone}</b>`
            : `📞 Không có`;

        // danh sách món
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
