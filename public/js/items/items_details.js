$(document).ready(function(){
  item = JSON.parse(item)
  if(item.isFavorite == true){
    $("#btn-area-add").css("display", "none")
    $("#btn-area-remove").css("display", "flex")
  }
  else{
    $("#btn-area-add").css("display", "flex")
    $("#btn-area-remove").css("display", "none")
  }

  $("#unfavorite-btn").click(function(){
    $("#btn-area-add").css("display", "flex")
    $("#btn-area-remove").css("display", "none")
  })

  $("#favorite-btn").click(function(){
    $("#btn-area-add").css("display", "none")
    $("#btn-area-remove").css("display", "flex")
  })
})