// Donation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle amount button selection
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from siblings
            this.parentNode.querySelectorAll('.amount-btn').forEach(sibling => {
                sibling.classList.remove('active');
            });

            // Add active class to clicked button
            this.classList.add('active');

            // Clear custom amount input
            const customInput = this.parentNode.parentNode.querySelector('.custom-amount');
            if (customInput) {
                customInput.value = '';
            }
        });
    });

    // Handle custom amount input
    document.querySelectorAll('.custom-amount').forEach(input => {
        input.addEventListener('input', function() {
            // Remove active class from amount buttons
            this.parentNode.querySelectorAll('.amount-btn').forEach(btn => {
                btn.classList.remove('active');
            });
        });
    });
});

// Utility function to get selected amount
function getSelectedAmount(cardIndex) {
    const card = document.querySelector(`.donation-card:nth-child(${cardIndex})`);
    const activeBtn = card.querySelector('.amount-btn.active');
    const customInput = card.querySelector('.custom-amount').value;

    let amount = activeBtn ? parseInt(activeBtn.dataset.amount) : parseInt(customInput);
    if (!amount || amount <= 0) return null;
    return amount;
}

// PayPal donation processing
function processPayPalDonation() {
    const amount = getSelectedAmount(1);
    const donationType = document.querySelector('input[name="paypal-type"]:checked').value;

    if (!amount) {
        alert('Please select or enter a valid donation amount.');
        return;
    }

    const message = `Thank you for your ${donationType} donation of $${amount}! You will be redirected to PayPal to complete your donation.`;
    alert(message);

    // Redirect to PayPal with your link (uncomment for real integration)
    // window.location.href = `https://paypal.me/justine383424?amount=${amount}`;
}

// MTN Mobile Money donation processing
function processMTNDonation() {
    const amount = getSelectedAmount(2);
    const donationType = document.querySelector('input[name="mtn-type"]:checked').value;

    if (!amount || amount < 1000) {
        alert('Please select or enter a valid donation amount (minimum UGX 1,000).');
        return;
    }

    const message = `To complete your ${donationType} donation of UGX ${formatNumber(amount)}:

1. Dial *165# on your MTN phone
2. Select "Send Money"
3. Enter recipient number: 256783501007
4. Enter amount: ${formatNumber(amount)}
5. Enter your PIN to confirm
6. Send us a WhatsApp message at +256 783 501 007 with your transaction details

Thank you for supporting YADA-EXPERIENCE!`;

    alert(message);
    // Optionally open WhatsApp (uncomment if desired)
    // window.open(`https://wa.me/256783501007?text=MTN Mobile Money donation of UGX ${formatNumber(amount)} completed. Transaction ID: [Enter your transaction ID]`);
}

// Airtel Money donation processing
function processAirtelDonation() {
    const amount = getSelectedAmount(3);
    const donationType = document.querySelector('input[name="airtel-type"]:checked').value;

    if (!amount || amount < 1000) {
        alert('Please select or enter a valid donation amount (minimum UGX 1,000).');
        return;
    }

    const message = `To complete your ${donationType} donation of UGX ${formatNumber(amount)}:

1. Dial *185# on your Airtel phone
2. Select "Send Money"
3. Enter recipient number: 256783501007
4. Enter amount: ${formatNumber(amount)}
5. Enter your PIN to confirm
6. Send us a WhatsApp message at +256 783 501 007 with your transaction details

Thank you for supporting YADA-EXPERIENCE!`;

    alert(message);
    // Optionally open WhatsApp (uncomment if desired)
    // window.open(`https://wa.me/256783501007?text=Airtel Money donation of UGX ${formatNumber(amount)} completed. Transaction ID: [Enter your transaction ID]`);
}

// Format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
