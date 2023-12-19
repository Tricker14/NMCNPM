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

  $("#unfavorite-btn").click(async function(){
    const res = await fetch("/api/webid/users/removeFavorite/" + item._id)
    $("#btn-area-add").css("display", "flex")
    $("#btn-area-remove").css("display", "none")
  })

  $("#favorite-btn").click(async function(){
    const res = await fetch("/api/webid/users/addFavorite/" + item._id)
    $("#btn-area-add").css("display", "none")
    $("#btn-area-remove").css("display", "flex")
  })
})