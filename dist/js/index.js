"use strict";jQuery(".slideTxtBox").slide();var url="http://localhost/tp5/public";$(function(){$.ajax({type:"get",async:!0,url:url+"/index/show",success:function(e){if(console.log(e),200==e.code){var c=document.querySelector("select[name=gid]");$.each(e.data,function(e,t){var o=document.createElement("option");o.setAttribute("value",t.id),o.innerHTML=t.title,c.appendChild(o)})}},error:function(e){console.log(e)}}),$("#select").on("click",function(){var e=form1.gid.value;0<e?$.ajax({type:"get",url:url+"/index/IdShow",data:{id:e},success:function(e){console.log(e),200==e.code&&($("#foods a").html(e.data.content),$("#foods a").attr("href","./goodshow.html?id="+e.data.id))}}):alert("请选择商品")})});