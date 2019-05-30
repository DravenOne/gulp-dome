function getQueryVariable(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
var url = 'http://localhost/tp5/public';
$(function(){
    var goodId = getQueryVariable('id');
    var app = new Vue({
        el: '#app',
        data: {
          datas: '',//商品详情
          number:0,
        },
        created:function(){
            var _ = this;
            $.ajax({
                type:"get",
                url:url+"/index/IdShow",
                data:{
                    id:goodId,
                },
                success:function(res){
                    if(res.code==200){
                        _.datas = res.data;
                        console.log(res.data);
                        $.ajax({
                            type:'post',
                            url:url+'/index/updateHits',
                            data:{
                                id:goodId,
                                hits:res.data.hits+1,
                            },
                            success:function(r){
                                console.log(r);
                            }
                        })
                    }
                }
            });
        }
      })
})