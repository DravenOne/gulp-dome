//事件委托
// var item = document.getElementsByClassName('cover-test')[0];
// item.onmouseover=function(ev){
//     var ev = ev || window.event;
//     var target = ev.target || ev.srcElement;
//     if(target.nodeName.toLowerCase()=='li'){
//             target.style.color="gray";
//     }
// }
// item.onmouseout=function(ev){
//     var ev = ev || window.event;
//     var target = ev.target || ev.srcElement;
//     if(target.nodeName.toLowerCase()=='li'){
//             target.style.color="white";
//     }
// }
// var learn = document.getElementById('learn');
// learn.onclick=function(){
//     var li = document.createElement('li');
//     li.innerHTML="new li";
//     item.appendChild(li);
// }

jQuery(".slideTxtBox").slide();


var url = 'http://localhost/tp5/public';
$(function(){
    $.ajax({
        type:"get",
        async:true,   
        url:url+"/index/show",
        success:function(res){
            console.log(res);
            if(res.code==200){
                var select = document.querySelector('select[name=gid]');
                $.each(res.data,(i,item)=>{
                    var items = document.createElement('option');
                    items.setAttribute('value',item.id);
                    items.innerHTML = item.title;
                    select.appendChild(items);
                })
            }
        },
        error:function(err){
            console.log(err);
        }
    })
    $('#select').on('click',function(){
        var selectId = form1.gid.value;
        if(selectId>0){
            $.ajax({
                type:'get',
                url:url+"/index/IdShow",
                data:{
                    id:selectId,
                },
                success:function(res){
                    console.log(res);
                    if(res.code==200){
                        $('#foods a').html(res.data.content);
                        $('#foods a').attr('href','./goodshow.html?id='+res.data.id);
                    }
                }
            })
        }else{
            alert('请选择商品');
        }
    })
})