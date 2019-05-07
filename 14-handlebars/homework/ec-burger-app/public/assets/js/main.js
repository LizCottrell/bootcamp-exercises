$(function() {

  // Devour button
  $(".devour").on("click", function(event) {
    var id = $(this).data("id");
    $.ajax("/api/" + id, {
      type: "PUT",
      data: { devoured: 1 }
    }).then(
      function() {
        console.log("burger devoured " + id);
        location.reload();
      }
    );
  });

  // Delete button
  $(".delete").on("click", function(event) {
    var id = $(this).data("id");
    $.ajax("/api/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted burger " + id);
        location.reload();
      }
    );
  });

  // Submit button
  $("#burger-form").on("submit", function(event) {
    event.preventDefault();
    var newBurger = { burger_name: $("#burger-input").val().trim() };
    $.ajax("/api", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger");
        location.reload();
      }
    );
  });

});