 //添加cookie
 function addCookie(key, value, day) {
     var date = new Date();
     date.setDate(date.getDate() + day);
     document.cookie = key + '=' + encodeURI(value) + ';expires=' + date;
 }

 //获取cookie
 function getCookie(key) {
     var str = decodeURI(document.cookie);
     var arr = str.split('; ');
     for (var i = 0; i < arr.length; i++) {
         var arr1 = arr[i].split('=');
         if (key == arr1[0]) {
             return arr1[1];
         }
     }
 }
 //删除cookie
 function delCookie(key, value) {
     addCookie(key, value, -1)
 }
