
// define(function(){
    // console.log($('.test').html());
// })

//获得data数据
// var div1 = document.getElementsByClassName('cover')[0];
// console.log(div1.dataset);


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