<script>
    $(document).ready(function(){
      // Initialize cart from localStorage
      let cart = JSON.parse(localStorage.getItem("cart")) || {};
      let total = parseFloat(localStorage.getItem("total")) || 0;
      updateCart();
  
      // Handle item click
      $(".best-seller-item").click(function(){
          let item = $(this).data("item");
          let price = parseFloat($(this).data("price"));
  
          // Update cart object
          if (cart[item]) {
              cart[item].count++;
          } else {
              cart[item] = { count: 1, price: price };
          }
  
          total += price;
          updateCart();
      });
  
      // Toggle cart details view
      $("#cart").click(function(){
          $("#cart-details").fadeToggle();
      });
  
      // Update cart display and localStorage
      function updateCart() {
          let count = Object.values(cart).reduce((sum, item) => sum + item.count, 0);
          $("#cart-count").text(count);
  
          let cartList = $("#cart-items");
          cartList.empty();
          $.each(cart, function(name, item) {
              cartList.append(`<li>${item.count} x ${name} - $${(item.count * item.price).toFixed(2)}</li>`);
          });
  
          $("#cart-total").text(total.toFixed(2));
          // Save cart state in localStorage
          localStorage.setItem("cart", JSON.stringify(cart));
          localStorage.setItem("total", total.toFixed(2));
      }
    });
  </script>