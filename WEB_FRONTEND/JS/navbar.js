$(function () {
  $(document).scroll(function () {
    var $nav = $("#mainNavbar");
    $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
  })
})

$("#btnLogOut").on("click", () => {
  $.ajax({
    url: getLogOutPoint,
    type: "GET",
    xhrFields: {
      withCredentials: true
    },
    success: function (response) {
      alert(response)
    },
    error: function (error) {
      alert(error.responseText)
    }
  });
})