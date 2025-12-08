// Kiểm tra xem khách đã chọn chế độ chưa
const mode = localStorage.getItem("orderMode");

if (!mode) {
    // Chưa chọn chế độ → ép quay lại start.html
    window.location.href = "start.html";
}

// Hiển thị thông tin khách vào navbar hoặc góc trái
window.addEventListener("DOMContentLoaded", () => {
    const infoBox = document.querySelector(".customer-info");

    if (infoBox) {
        if (mode === "offline") {
            const table = localStorage.getItem("tableNumber");
            infoBox.textContent = `Bàn số: ${table}`;
        } else if (mode === "online") {
            const addr = localStorage.getItem("address");
            infoBox.textContent = `Địa chỉ: ${addr}`;
        }
    }
});
