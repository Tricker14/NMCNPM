$(document).ready(function(){
  item = JSON.parse(item)
  if(item.isFavorite == true){
    console.log('truong hop 1')
    $("#btn-area-add").css("display", "none")
    $("#btn-area-remove").css("display", "flex")
  }
  else{
    console.log('truong hop 2')
    $("#btn-area-add").css("display", "flex")
    $("#btn-area-remove").css("display", "none")
  }

  $("#unfavorite-btn").click(async function(){
    const res = await fetch("https://nmcnpm-bid.vercel.app/api/webid/users/removeFavorite/" + item._id)
    if(res.statusText === "OK"){
      $("#btn-area-add").css("display", "flex")
      $("#btn-area-remove").css("display", "none")
    }
  })

  $("#favorite-btn").click(async function(){
    const res = await fetch("https://nmcnpm-bid.vercel.app/api/webid/users/addFavorite/" + item._id)
    if(res.statusText === "OK"){
    $("#btn-area-add").css("display", "none")
    $("#btn-area-remove").css("display", "flex")
    }
  })
})