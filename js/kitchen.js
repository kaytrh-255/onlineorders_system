// Lấy danh sách orders
let orders = JSON.parse(localStorage.getItem("orders")) || [];

// Tạo progress cho mỗi đơn
function loadKitchen() {
    const listDiv = document.getElementById("kitchenList");
    listDiv.innerHTML = "";

    orders.forEach((order, i) => {
        listDiv.innerHTML += `
            <div class="k-order-box">
                <div class="k-head">
                    <span>Đơn #${i + 1}</span>
                    <span>${order.customer.phone}</span>
                </div>

                <div class="progress-bar">
                    <div id="progress-${i}" class="progress-fill"></div>
                </div>
            </div>
        `;
    });

    startCooking();
}

function startCooking() {
    orders.forEach((order, index) => {
        let progress = 0;
        let speed = 300 + index * 200;  // đơn sau sẽ chậm hơn → giống thực tế

        let timer = setInterval(() => {
            progress += 2;
            const bar = document.getElementById(`progress-${index}`);

            if (bar) bar.style.width = progress + "%";

            if (progress >= 100) {
                clearInterval(timer);

                // Cập nhật trạng thái đơn
                order.status = "done";
                localStorage.setItem("orders", JSON.stringify(orders));
            }
        }, speed);
    });
}

loadKitchen();
