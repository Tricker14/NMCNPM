document.addEventListener("DOMContentLoaded", function () {

    // Ẩn tất cả các phần tử trong display-area trừ profile-form
    document.querySelectorAll('.display-area > div').forEach(function (element) {
        if (!element.classList.contains('profile-form')) {
            element.style.display = 'none';
        }
    });

    // Lấy các nút trong menu
    const menuButtons = document.querySelectorAll('.menu-items li button');

    // Lặp qua từng nút để thêm sự kiện click
    menuButtons.forEach(function (button, index) {
        button.addEventListener('click', function () {
            // Ẩn tất cả các phần tử chứa dữ liệu
            document.querySelectorAll('.display-area > div').forEach(function (element) {
                element.style.display = 'none';
            });

            // Hiển thị nội dung tương ứng
            const displayArea = document.querySelector('.display-area');
            switch (index) {
                case 0: // User Profile
                    document.querySelector('.profile-form').style.display = 'block';
                    displayArea.querySelector('.bid-title').style.display = 'none';
                    displayArea.querySelector('.bid-history-area').style.display = 'none';
                    break;
            
                case 1: // Bid History
                    document.querySelector('.profile-form').style.display = 'none';
                    displayArea.querySelector('.bid-title').style.display = 'block';
                    displayArea.querySelector('.bid-history-area').style.display = 'flex';
                    break;
                // Các trường hợp khác cho các nút khác
            }
        });
    });

    // ...
});




function populateDays() {
    var daySelect = document.getElementById("day");

    daySelect.innerHTML = "";

    for (var i = 1; i <= 31; i++) {
        if(i === parseInt(day)){
            console.log('this is day', day);
            var option = document.createElement("option");
            option.value = i;
            option.text = i;
            daySelect.add(option);
        }
    }

    for (var i = 1; i <= 31; i++) {
        if(i !== parseInt(day)){
            console.log('not this day', i);
            var option = document.createElement("option");
            option.value = i;
            option.text = i;
            daySelect.add(option);
        }
    }
}

function populateMonths() {
    var monthSelect = document.getElementById("month");

    monthSelect.innerHTML = "";

    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    console.log(month);
    monthNames.forEach(function(monthName){
        if(monthName === month){
            var option = document.createElement("option");
            if(monthName === 'January'){
                option.value = 1;
            }
            if(monthName === 'February'){
                option.value = 2;
            }
            if(monthName === 'March'){
                option.value = 3;
            }
            if(monthName === 'April'){
                option.value = 1;
            }
            if(monthName === 'May'){
                option.value = 5;
            }
            if(monthName === 'June'){
                option.value = 6;
            }
            if(monthName === 'July'){
                option.value = 7;
            }
            if(monthName === 'August'){
                option.value = 8;
            }
            if(monthName === 'September'){
                option.value = 9;
            }
            if(monthName === 'October'){
                option.value = 10;
            }
            if(monthName === 'November'){
                option.value = 11;
            }
            if(monthName === 'December'){
                option.value = 12;
            }
            option.text = monthName;
            monthSelect.add(option);
        }
    })

    monthNames.forEach(function(monthName){
        if(monthName !== month){
            var option = document.createElement("option");
            if(monthName === 'January'){
                option.value = 1;
            }
            if(monthName === 'February'){
                option.value = 2;
            }
            if(monthName === 'March'){
                option.value = 3;
            }
            if(monthName === 'April'){
                option.value = 1;
            }
            if(monthName === 'May'){
                option.value = 5;
            }
            if(monthName === 'June'){
                option.value = 6;
            }
            if(monthName === 'July'){
                option.value = 7;
            }
            if(monthName === 'August'){
                option.value = 8;
            }
            if(monthName === 'September'){
                option.value = 9;
            }
            if(monthName === 'October'){
                option.value = 10;
            }
            if(monthName === 'November'){
                option.value = 11;
            }
            if(monthName === 'December'){
                option.value = 12;
            }
            option.text = monthName;
            monthSelect.add(option);
        }
    })
}

function populateYears() {
    var yearSelect = document.getElementById("year");

    yearSelect.innerHTML = "";

    for (var i = 1930; i <= 2023; i++) {
        if(i === parseInt(year)){
            var option = document.createElement("option");
            option.value = i;
            option.text = i;
            yearSelect.add(option);
        }
    }

    for (var i = 1930; i <= 2023; i++) {
        if(i !== parseInt(year)){
            var option = document.createElement("option");
            option.value = i;
            option.text = i;
            yearSelect.add(option);
        }
    }
}

populateDays();
populateMonths();
populateYears();


document.addEventListener("DOMContentLoaded", function () {

    var firstAvatarImage = document.getElementById('firstAvatar');


    var secondAvatarImage = document.getElementById('secondAvatar');


    if (firstAvatarImage && secondAvatarImage) {

        var srcToCopy = firstAvatarImage.src;


        if (secondAvatarImage) {

            secondAvatarImage.src = srcToCopy;
        }
    }
});


document.addEventListener("DOMContentLoaded", function () {
   
    document.getElementById("profileForm").addEventListener("input", function () {
        document.getElementById("saveChangesBtn").disabled = false;
    });

    document.getElementById("saveChangesBtn").addEventListener("click", function () {
        // Xử lý lưu thay đổi ở đây

        this.disabled = true;
    });


    document.getElementById("edit-email").addEventListener("click", function (event) {
        event.preventDefault(); 

        
        var editableElement = this.closest(".row").querySelector(".flex-grow-1");
       
        editableElement.innerHTML = '<input type="email" class="form-control" value="' + editableElement.innerText + '">';
        document.getElementById("saveChangesBtn").disabled = false;
    });


    document.getElementById("edit-phone").addEventListener("click", function (event) {
        event.preventDefault(); 

        var editableElement = this.closest(".row").querySelector(".flex-grow-1");

        editableElement.innerHTML = '<input type="tel" class="form-control" value="' + editableElement.innerText + '">';
        document.getElementById("saveChangesBtn").disabled = false;
    });

    var genderInputs = document.querySelectorAll('input[name="gender"]');
    genderInputs.forEach(function (input) {
        input.addEventListener("change", function () {
            document.getElementById("saveChangesBtn").disabled = false;
        });
    });

    var dateInputs = document.querySelectorAll('select[name="day"], select[name="month"], select[name="year"]');
    dateInputs.forEach(function (input) {
        input.addEventListener("change", function () {
            document.getElementById("saveChangesBtn").disabled = false;
        });
    });
});

function formattedDate(originalDate){
    const parsedDate = new Date(originalDate);

    const formattedDate = 
        parsedDate.getFullYear() +
        "-" +
        String(parsedDate.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(parsedDate.getDate()).padStart(2, "0") +
        " " +
        String(parsedDate.getHours()).padStart(2, "0") +
        ":" +
        String(parsedDate.getMinutes()).padStart(2, "0") +
        ":00";

    return formattedDate;
}

function calculateEndTime(originalDate, day, hour, minute, second) {
    console.log(day, hour, minute, second);

    const startDate = new Date(originalDate);
    const timeLeft = (day * 24 * 3600) + (hour * 3600) + (minute * 60) + second;
    const endTime = new Date(startDate.getTime() + timeLeft * 1000);

    const formattedEndTime =
        endTime.getFullYear() +
        "-" +
        String(endTime.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(endTime.getDate()).padStart(2, "0") +
        " " +
        String(endTime.getHours()).padStart(2, "0") +
        ":" +
        String(endTime.getMinutes()).padStart(2, "0") +
        ":" +
        String(endTime.getSeconds()).padStart(2, "0");

    return formattedEndTime;
}
  
document.addEventListener("DOMContentLoaded", function () {
    
    // const bids = [
    //     {
    //         id: 1,
    //         name: "Purchase Item A",
    //         last_bid: 50.00,
    //         last_bid_time: "2023-01-17 12:30:00",
    //         timestamp: "2023-01-15 10:30:00",
    //         time_to_end_bid: "2023-02-09 19:00:00",
    //         status: "Win"
    //     },
    //     {
    //         id: 2,
    //         name: "Withdrawal",
    //         last_bid: 20.00,
    //         last_bid_time: "2023-01-17 12:30:00",
    //         timestamp: "2023-01-14 15:45:00",
    //         time_to_end_bid: "2024-05-03 16:30",
    //         status: "Win"
    //     },
    //     {
    //         id: 3,
    //         name: "Item B",
    //         last_bid: 30.00,
    //         last_bid_time: "2023-01-17 12:30:00",
    //         timestamp: "2023-01-14 20:09:30",
    //         time_to_end_bid: "2024-01-01 19:00:00",
    //         status: "Win"
    //     },
    //     // Add more transactions as needed
    // ];

    // Sort transactions by timestamp in descending order
    bids.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const historyList = document.getElementById("historyList");
    const timeAxis = document.querySelector(".time-axis");

    let currentDate = "";
    let timelineMarkers = "";
    let dayIndex = 0;

    function updateCountdown(element, targetDate) {
        function padZero(number) {
            return (number < 10 ? '0' : '') + number;
        }

        function calculateCountdown() {
            const now = new Date();
            const distance = targetDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            element.querySelector('#days').innerText = `${padZero(days)}d`;
            element.querySelector('#hours').innerText = `${padZero(hours)}h`;
            element.querySelector('#minutes').innerText = `${padZero(minutes)}m`;
            element.querySelector('#seconds').innerText = `${padZero(seconds)}s`;
        }

        calculateCountdown();
        setInterval(calculateCountdown, 1000);
    }

    // const priceContainer = document.getElementById("priceContainer");
    // bids.forEach(function (bid) {
    //     console.log('Bid Price In JS:', bid.product.name);
    //     priceContainer.innerHTML += `<div>Bid Price: ${bid.product.name}</div>`;
    // });

    bids.forEach(function (bid) {
        console.log("bid", bid);
        
        const listItem = document.createElement("li");
        listItem.classList.add("history-item", "d-flex", "align-items-center", "row");

        console.log("date", formattedDate(bid.createdDate));
        console.log("price", bid.price);

        const timestampDate = formattedDate(bid.createdDate).split(" ")[0];
        if (timestampDate !== currentDate) {
            currentDate = timestampDate;
            // Create a new div for each day with an h4 heading
            const dayDiv = document.createElement("div");
            dayDiv.classList.add("day");
            dayDiv.innerHTML = `<h4>${currentDate}</h4>`;
            historyList.appendChild(dayDiv);
    
            // Add a marker to the time axis for each day
            const marker = document.createElement("div");
            marker.classList.add("timeline-marker");
            timelineMarkers += `<div class="timeline-marker" style="left: 0; top: ${calculateMarkerPosition(dayIndex)};"></div>`;
            dayIndex++;
        }

        listItem.innerHTML = `
            <div class="information col-5">
                <h3>${bid.product.name}</h3>
                <p>Last bid: ${bid.price.toFixed(2)}</p>
                <div class="tooltip">Your last bid was on ${formattedDate(bid.createdDate)}</div>
            </div>
            <div class="countdown-container col-4">
                <div class="countdown">
                    <i class="bi bi-clock-fill"></i>
                    <div class="countdown-item">
                        <span class="countdown-number" id="days">${bid.product.timeLeft.day}</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number" id="hours">${bid.product.timeLeft.hour}</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number" id="minutes">${bid.product.timeLeft.minute}</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number" id="seconds">${bid.product.timeLeft.second}</span>
                    </div>
                </div>
            </div>
            <div class="col-3">
                <button class="shortcut-button">
                    Go to bid
                </button>
            </div>
        `;

        let isProductActive = false;
    
        const timeEnd = calculateEndTime(formattedDate(bid.createdDate), 
        bid.product.countdown.day, 
        bid.product.countdown.hour, 
        bid.product.countdown.minute, 
        bid.product.countdown.second)
        console.log("1st end ", timeEnd);

        const targetDate = new Date(timeEnd);
        console.log("2nd end ", targetDate);

        if(targetDate > new Date()){
            console.log(">");
            isProductActive = true;
            updateCountdown(listItem, targetDate);
        }else {
            console.log("<");
            console.log("bid ", bid.product.winner._id.toString());
            console.log("user ", user._id.toString());
            const statusContainer = listItem.querySelector('.countdown-container');

            // if(bid.product.winner._id.toString() === user._id.toString()){
            //     statusContainer.innerHTML = `<p class="win-status">Win</p>`;
            // }
            // else{
            //     statusContainer.innerHTML = `<p class="lose-status">Lose</p>`;
            // }
        }

        // const goToBidButton = listItem.querySelector(".shortcut-button");
        // if (!isProductActive) {
        //     goToBidButton.disabled = true;
        // }
        
        // listItem.querySelector(".shortcut-button").addEventListener("click", function () {
        //     // Replace the URL with the desired destination
        //     window.location.href = "your_destination_url";
        // });

        historyList.appendChild(listItem);
    });

    // Populate the transaction list and time axis
    bids.forEach(function (bid) {
        const listItem = document.createElement("li");
        listItem.classList.add("history-item", "d-flex", "align-items-center", "row");
    
        const timestampDate = bid.timestamp.split(" ")[0];
        if (timestampDate !== currentDate) {
            currentDate = timestampDate;
            // Create a new div for each day with an h4 heading
            const dayDiv = document.createElement("div");
            dayDiv.classList.add("day");
            dayDiv.innerHTML = `<h4>${currentDate}</h4>`;
            historyList.appendChild(dayDiv);
    
            // Add a marker to the time axis for each day
            const marker = document.createElement("div");
            marker.classList.add("timeline-marker");
            timelineMarkers += `<div class="timeline-marker" style="left: 0; top: ${calculateMarkerPosition(dayIndex)};"></div>`;
            dayIndex++;
        }
    
        listItem.innerHTML = `
            
            <div class="information col-5">
                <h3>${bid.product.name}</h3>
                <p>Last bid: $${bid.last_bid.toFixed(2)}</p>
                <div class="tooltip">Your last bid was on ${bid.last_bid_time}</div>
            </div>
            <div class="countdown-container col-4">
                <div class="countdown">
                    <i class="bi bi-clock-fill"></i>
                    <div class="countdown-item">
                        <span class="countdown-number" id="days">00</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number" id="hours">00</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number" id="minutes">00</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number" id="seconds">00</span>
                    </div>
                </div>
            </div>
            <div class="col-3">
                <button class="shortcut-button">
                    Go to bid
                </button>
            </div>
        `;

        let isProductActive = false;
    
        const targetDate = new Date(bid.time_to_end_bid);

        if(targetDate > new Date()){
            isProductActive = true;
            updateCountdown(listItem, targetDate);
        }else {
            const statusContainer = listItem.querySelector('.countdown-container');

            if (bid.status === 'Win') {
                statusContainer.innerHTML = `<p class="win-status">${bid.status}</p>`;
            } else {
                statusContainer.innerHTML = `<p class="lose-status">${bid.status}</p>`;
            }
        }

        const goToBidButton = listItem.querySelector(".shortcut-button");
        if (!isProductActive) {
            goToBidButton.disabled = true;
        }
        
        listItem.querySelector(".shortcut-button").addEventListener("click", function () {
            // Replace the URL with the desired destination
            window.location.href = "your_destination_url";
        });
    
        historyList.appendChild(listItem);
    });
    

    // Add markers to the time axis
    timeAxis.innerHTML = timelineMarkers;
});


function calculateMarkerPosition(dayIndex) {
    const dayElements = document.querySelectorAll(".day");
    let totalItems = 0;

    if (dayElements.length === 0) {
        return "3%";
    }

    // Tính tổng số lượng item của các ngày trước đó
    for (let i = 0; i < dayIndex; i++) {
        const dayElement = dayElements[i];
        const dayItems = dayElement.querySelectorAll(".history-item");
        for (let j = 0; j < dayItems.length; j++) {
            totalItems += dayItems[j].offsetHeight;
        }
    }

    const historyList = document.querySelector(".history-list");
    if (!historyList || historyList.offsetHeight === 0) {
        return "3%";
    }

    // Tính toán vị trí dựa trên tổng số lượng item
    const percentage = (totalItems / historyList.offsetHeight) * 100;
    return `${percentage}%`;
}



