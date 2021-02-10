(function (){
  /**
   *  支持两种路径
   *  1. ?type=news&id=1
   *  2. ?type=good&id=10&part=0
   *  */
  document.getElementById("header").addEventListener("click", function (e) {
    if (e.target.classList.contains("tab")) {
      e.target.parentElement
        .querySelectorAll(".active")
        .forEach(function (dom) {
          dom.classList.remove("active");
        });
      e.target.classList.add("active");
      getData(e.target.dataset.tabid);
    }
  });
  
  var tabid = 1;
  var detail_id = getQueryVariable('id')
  var type = getQueryVariable('type')
  var part = parseInt(getQueryVariable('part'))
 
  init()

  function init() {
    // document.getElementById("tabs").innerHTML = ''
    document.getElementById("content").innerHTML = ''
    if (type == 'good') {
      getDetailInfo()
    } else if (type === 'news') {
      getNewsInfo()
    }
  }
  function getData(id) {
    http({url:'/api/v1/office/contentList?category_id='+id,method:'get',success: function(res){
      var data = res.data.list[0]
      showInfo(data);
    }})
      
  }

  function getDetailInfo() {
    http({url:'/api/goods/goods_desc?id='+ detail_id,method:'get',success: function(res){
      var data = res.data
      var labels = data.label
      var showdata = {
        title: data.goods_name,
        year: data.year,
        labels: labels,
        time: new Date(data.createtime * 1000).format("yyyy-MM-dd"),
        content: data.details[part || 0].goods_content
      }
      showInfo(showdata);
    }})
  }

  function getNewsInfo() {
    http({url:'/api/index/news_details?id=' + detail_id,method:'get',success: function(res){
      var data = {
        title: res.data.list.news_title,
        time: res.data.list.year,
        content: res.data.list.content
      }
      showInfo(data);
    }})
  }

  function contextNewsTemp(data) {
    return '<article>' +
              '<h1 class="title">'+(data.title || '')+'</h1>' +
              '<p class="time"> 年份: '+(data.time || '') + '</p>' +
              '<section class="context">'+(data.content || '')+'</section>' +
            '</article>';
  }

  function contextGoodTemp(data) {
    var labels = data.labels || []
    var labelHtml = ''
    for (var index = 0; index < labels.length; index++) {
      var element = labels[index];
      labelHtml = labelHtml + '<span class="item">'+element.label_name+'</span>'
    }
    console.log(labelHtml,labels)
    return '<article>' +
              '<h1 class="title">'+(data.title || '')+'</h1>' +
              '<p class="labels">'+labelHtml+'</p>'+
              '<p class="time"> 年份: '+(data.year || '')+'<span style="float: right;">'+(data.time || '')+'</span></p>' +
              '<section class="context">'+(data.content || '')+'</section>' +
            '</article>';
  }

  function showInfo(data) {
    document.getElementById("content").innerHTML = ''
    if(data){
      var html = ''
      if(type == 'news'){
        html = contextNewsTemp(data);
      }else{
        html = contextGoodTemp(data);
      }
      document.getElementById("content").innerHTML = html;
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] === variable) { return pair[1]; }
    }
    return '';
  }

  function http(options) {
    const vaildDate = new Date(
      new Date('2021/02/01').getTime() + 60 * 60 * 24 * 15 * 1000
    );
    if (new Date().getTime() > vaildDate) {
      return false
    } 
    var url = options.url;
    var method =options.method
    var baseUrl = 'https://app.yindunhuwei.com'
    var XHR = new XMLHttpRequest();
    XHR.open(method, baseUrl + url, true)
    XHR.responseType = 'json'
    XHR.onreadystatechange = function () {
      if (XHR.readyState == 4 && XHR.status == 200) {
        if(options.success){
          options.success(XHR.response)
        }
      }
    }
    XHR.send(null)
  }

  Date.prototype.format = function(fmt) { 
    var o = { 
       "M+" : this.getMonth()+1,                 //月份 
       "d+" : this.getDate(),                    //日 
       "h+" : this.getHours(),                   //小时 
       "m+" : this.getMinutes(),                 //分 
       "s+" : this.getSeconds(),                 //秒 
       "q+" : Math.floor((this.getMonth()+3)/3), //季度 
       "S"  : this.getMilliseconds()             //毫秒 
   }; 
   if(/(y+)/.test(fmt)) {
           fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
   }
    for(var k in o) {
       if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
   return fmt; 
  }

})()
