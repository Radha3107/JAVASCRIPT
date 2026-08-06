// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // Select the form element
    const billForm = document.getElementById('billForm');
    
    // UI Elements for Invoice Display
    const invoiceCard = document.getElementById('invoiceCard');
    const emptyState = document.getElementById('emptyState');

    billForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent page reload

        // --- a) Learn primitive data types: string, number, boolean, undefined, null. ---
        // --- b) Declare variables using var, let, and const ---
        
        // 1. Strings (Using const as these won't change)
        const customerName = document.getElementById('customerName').value;
        const mobileNumber = document.getElementById('mobileNumber').value;
        const invoiceNumber = document.getElementById('invoiceNumber').value;
        const productName = document.getElementById('productName').value;
        const paymentMode = document.getElementById('paymentMode').value;
        
        // 2. Numbers (Using let as we will read them as strings and convert)
        let quantityStr = document.getElementById('quantity').value;
        let rateStr = document.getElementById('rate').value;
        let discountStr = document.getElementById('discount').value;
        let gstStr = document.getElementById('gst').value;
        let packingChargesStr = document.getElementById('packingCharges').value;
        
        // 3. Boolean
        const isMember = document.getElementById('membership').checked; // returns boolean

        // 4. Undefined / Null (just to demonstrate for the case study)
        let optionalNotes; // This is undefined by default
        let discountCode = null; // Explicitly null for now

        // --- c) Understand type coercion and type conversion ---
        
        // Explicit Type Conversion (String to Number)
        const quantity = Number(quantityStr);
        const rate = parseFloat(rateStr);
        const discountPercent = Number(discountStr);
        const gstPercent = Number(gstStr);
        const packingCharges = Number(packingChargesStr);

        // --- Calculations ---
        
        // Base Amount
        // Implicit Type Coercion could happen if we used *, but we explicitly converted them to numbers above for safety.
        // E.g., "5" * "10" = 50 (JS coerces strings to numbers for multiplication)
        // Let's use var just to fulfill the case study requirement (var, let, const)
        var baseAmount = quantity * rate;
        
        // Discount Calculation
        let discountAmount = baseAmount * (discountPercent / 100);
        let amountAfterDiscount = baseAmount - discountAmount;
        
        // Member Discount (Additional 5% if true)
        let memberDiscountAmount = 0;
        if (isMember) {
            // true will be coerced to 1 if used in math, but we use it as a boolean condition
            memberDiscountAmount = amountAfterDiscount * 0.05; 
            amountAfterDiscount -= memberDiscountAmount;
        }

        // GST Calculation
        let gstAmount = amountAfterDiscount * (gstPercent / 100);
        
        // Final Total
        let finalTotal = amountAfterDiscount + gstAmount + packingCharges;

        // --- Update UI ---

        // Show invoice, hide empty state
        emptyState.style.display = 'none';
        invoiceCard.style.display = 'block';

        // Populate fields
        document.getElementById('displayInvoiceNum').textContent = `#${invoiceNumber}`;
        document.getElementById('displayCustomer').textContent = customerName;
        document.getElementById('displayMobile').textContent = mobileNumber;
        document.getElementById('displayProduct').textContent = productName;
        document.getElementById('displayQty').textContent = `${quantity} Kg`;
        document.getElementById('displayRate').textContent = `₹${rate.toFixed(2)}`;
        
        document.getElementById('displayBaseAmount').textContent = `₹${baseAmount.toFixed(2)}`;
        
        document.getElementById('displayDiscountPercent').textContent = `(${discountPercent}%)`;
        document.getElementById('displayDiscountAmount').textContent = `- ₹${discountAmount.toFixed(2)}`;
        
        const membershipDiscountRow = document.getElementById('membershipDiscountRow');
        if (isMember) {
            membershipDiscountRow.style.display = 'flex';
            document.getElementById('displayMemberDiscount').textContent = `- ₹${memberDiscountAmount.toFixed(2)}`;
        } else {
            membershipDiscountRow.style.display = 'none';
        }

        document.getElementById('displayTaxableValue').textContent = `₹${amountAfterDiscount.toFixed(2)}`;
        
        document.getElementById('displayGstPercent').textContent = `(${gstPercent}%)`;
        document.getElementById('displayGstAmount').textContent = `+ ₹${gstAmount.toFixed(2)}`;
        document.getElementById('displayPacking').textContent = `+ ₹${packingCharges.toFixed(2)}`;
        
        document.getElementById('displayTotal').textContent = `₹${finalTotal.toFixed(2)}`;
        document.getElementById('displayPaymentMode').textContent = paymentMode;

        // Note: Demonstrating implicit coercion just for console log 
        console.log("Total is: " + finalTotal); // Number is coerced into a String for concatenation
    });
});
