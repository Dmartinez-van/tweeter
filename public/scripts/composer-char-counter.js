$(document).ready(function() {
  $("textarea").keyup(function() {
    let countMax = 140;
    let charLeft = countMax - ($(this).val()).length;
    $(this).siblings('div').children("output").html(charLeft);
    $(this).siblings('div').children("output").toggleClass("counterR", charLeft < 0);
  });
  
});
