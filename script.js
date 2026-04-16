// 1. DOM Elements
const usdInput = document.getElementById('usd-amount');
const convertBtn = document.getElementById('convert-btn');
const resultSection = document.getElementById('result-section');
const loadingSpinner = document.getElementById('loading-spinner');
const resultBox = document.getElementById('result-box');
const inrValueDisplay = document.getElementById('inr-value');
const rateInfoDisplay = document.getElementById('rate-info');
const errorMessage = document.getElementById('error-message');

// 2. Function returning a Promise
function getExchangeRate() {
    return new Promise((resolve, reject) => {
        fetch('https://api.exchangerate-api.com/v4/latest/USD')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                resolve(data.rates.INR);
            })
            .catch(error => {
                reject(error);
            });
    });
}

// 3. async/await Function for the conversion logic
async function performConversion() {
    const amount = Number(usdInput.value);

    // Basic check
    if (amount <= 0 || isNaN(amount)) {
        alert("Please enter a valid positive amount.");
        return;
    }

    // Show loading UI
    errorMessage.classList.add('hidden');
    resultSection.classList.remove('hidden');
    loadingSpinner.classList.remove('hidden');
    resultBox.classList.add('hidden');

    try {
        // Await the custom promise
        const exchangeRate = await getExchangeRate();
        
        const convertedAmount = amount * exchangeRate;

        // Update DOM
        inrValueDisplay.textContent = `₹${convertedAmount.toFixed(2)}`;
        rateInfoDisplay.textContent = `1 USD = ₹${exchangeRate.toFixed(2)}`;

        // Show result UI
        loadingSpinner.classList.add('hidden');
        resultBox.classList.remove('hidden');

    } catch (error) {
        // Handle error
        loadingSpinner.classList.add('hidden');
        resultSection.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
}

// 4. Events
convertBtn.addEventListener('click', performConversion);
