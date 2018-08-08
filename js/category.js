
onload=function () { 
    /* 标题渲染 */
    $.ajax({
        "type":"get",
        "url":"http://193.112.55.79:9090/api/getcategorytitle",
        "dataType":"json",
        "success":function (res) { 
            var categoryHtml=template('temCategory',{"data":res.result});
            $('#categoryId').html(categoryHtml);
            get_data()
         }
    })
   
     function get_data(){
         $('#categoryId').on("tap",'.category_title',function () { 
             var _self=$(this);    
             _self.children().eq(1)[0].classList.add('change_deg');  
             var flag=$(this).next()[0].dataset.flag
             if(flag=="true"){
                _self.next()[0].classList.remove('hide');
                var lis_br=_self.parent().siblings();
                for(var i=0;i<lis_br.length;i++){
                    $(lis_br[i]).children(".category_title").children().eq(1).removeClass('change_deg')
                    $(lis_br[i]).children(".category_content").addClass('hide');
                }
                var titleid=$(this)[0].dataset.id
                titleid=parseInt(titleid)
                //发送ajax
                $.ajax({
                   "type":"get",
                   "url":"http://193.112.55.79:9090/api/getcategory",
                   "data":{"titleid":titleid},
                   "dataType":"json",
                   "success":function(res){   
                       console.log(res);    
                       var secondHtml=template("second_category",{"data":res.result});
                       _self.next().html(secondHtml);
                       _self.next().attr("data-flag","false");
                       for(var i=0;i<lis_br.length;i++){
                           $(lis_br[i]).children(".category_content").attr("data-flag","true");
                       }
                   }
               });
             }else{
                _self.children().eq(1)[0].classList.remove('change_deg');
                _self.next()[0].classList.add('hide'); 
                _self.next().attr("data-flag","true");    
             }         
          })
     }   
 }



       
