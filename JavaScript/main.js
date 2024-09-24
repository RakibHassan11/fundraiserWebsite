
document.addEventListener("DOMContentLoaded", () => {
    const headerAmountElement = document.getElementById("headerAmount");
    let headerAmount = extractNumericValue(headerAmountElement.textContent);
    
    const historySection = document.getElementById("historySection");
    const donationSection = document.getElementById("donationSection");
    
    const donationButton = document.getElementById("donationButton");
    const historyButton = document.getElementById("historyButton");
    
    const transactions = [];

    // Reusable function to extract numeric value
    function extractNumericValue(text) {
        return parseInt(text.replace(/\D/g, ''));
    }

    // Reusable function to update amount text
    function updateAmountText(element, newAmount) {
        element.textContent = `${newAmount} BDT`;
    }

    // Reusable function to add a transaction
    function addTransaction(amount, cardDescription) {
        const transactionDate = new Date().toLocaleString();
        transactions.push({ amount, date: transactionDate, card: cardDescription });
        displayTransactions(); // Update the display of transactions
    }

    // Reusable function to display transactions
    function displayTransactions() {
        const transactionList = document.getElementById("transactionList");
        transactionList.innerHTML = "";

        transactions.forEach(transaction => {
            const transactionItem = document.createElement("p");
            transactionItem.innerHTML = `<strong>${transaction.amount} BDT is Donated for ${transaction.card}.</strong><br><strong>Date:</strong> ${transaction.date}`;
            transactionList.appendChild(transactionItem);
        });
    }

    // Reusable function to toggle section visibility
    function toggleSection(sectionToShow, sectionToHide, buttonToActivate, buttonToDeactivate) {
        sectionToShow.classList.remove("hidden"); // Show specified section
        sectionToHide.classList.add("hidden"); // Hide specified section

        // Set active color for the button
        buttonToActivate.classList.add("bg-grey-100");
        buttonToActivate.classList.remove("bg-btnPrimary"); // Remove default color

        // Set default color for the other button
        buttonToDeactivate.classList.remove("bg-grey-100");
        buttonToDeactivate.classList.add("bg-btnPrimary"); // Set default color
    }

    // Reusable function to handle donation logic
    function handleDonation(inputId, donationAmountId, cardDescription) {
        const inputElement = document.getElementById(inputId);
        const donationAmountElement = document.getElementById(donationAmountId);
        const inputValue = inputElement.value.trim();
        // Check if the input is a valid positive integer
        const inputNumber = parseInt(inputValue, 10);
        

        if (isNaN(inputNumber) || inputNumber <= 0 || !/^\d+$/.test(inputValue)) {
            alert("Please enter a valid Amount!");
            return;
        }

        // Update donation amount and header amount
        const donationAmount = extractNumericValue(donationAmountElement.textContent) + inputNumber;
        updateAmountText(donationAmountElement, donationAmount);

        headerAmount -= inputNumber;
        updateAmountText(headerAmountElement, headerAmount);

        // Add transaction to history using the reusable function
        addTransaction(inputNumber, cardDescription);
        
        inputElement.value = "";
        
        // Show the modal after a successful donation
        const modal = document.getElementById("my_modal_1");
        modal.showModal(); // Open the modal
    }

    // Section toggle functionality using the reusable function
    function showDonationSection() {
        toggleSection(donationSection, historySection, donationButton, historyButton);
    }
    
    function showHistorySection() {
        toggleSection(historySection, donationSection, historyButton, donationButton);
    }
    
    // Event listeners for buttons
    document.getElementById("donateButton1").addEventListener("click", () => {
        handleDonation("userInput1", "donationAmount1", "Flood at Noakhali");
    });

    document.getElementById("donateButton2").addEventListener("click", () => {
        handleDonation("userInput2", "donationAmount2", "Flood Relief in Feni");
    });

    document.getElementById("donateButton3").addEventListener("click", () => {
        handleDonation("userInput3", "donationAmount3", "Aid for Injured in the Quota Movement");
    });

    historyButton.addEventListener("click", showDonationSection);
    donationButton.addEventListener("click", showHistorySection);

    // Initialize with donation section visible
    showDonationSection();
});
