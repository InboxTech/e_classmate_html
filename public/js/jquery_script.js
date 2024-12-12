$(document).ready(function() {
    // Initializing price and quantity
    let price = parseInt($('.price').text());  // Price of the product
    let quantity = parseInt($('#quantity-number').text()); // Initial quantity

    // Update total price based on quantity
    function updateTotal() {
        let totalPrice = price * quantity;
        $('.total').text(totalPrice); // Update total price in UI
    }

    // Handle the minus button click event
    $('.minus-btn').click(function() {
        if (quantity > 1) { // Ensure quantity doesn't go below 1
            quantity--;
            $('#quantity-number').text(quantity); // Update quantity in UI
            updateTotal(); // Update the total price
        }
    });

    // Handle the plus button click event
    $('.plus-btn').click(function() {
        quantity++;
        $('#quantity-number').text(quantity); // Update quantity in UI
        updateTotal(); // Update the total price
    });

    // Handle the delete item button click event
    $('.delete-item').click(function() {
        // Optional: You can clear or remove this item from the cart.
        $(this).closest('.row').remove(); // Removes the item row from the DOM
    });
});