(function (){
  var data = {}
 
  function aboutContextTemp(data) {
    return '<article>' +
              '<section class="context">'+data.content+'</section>' +
            '</article>';
  }
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
  var detail_id = getQueryVariable('d_id')
  var type = getQueryVariable('type')
  var c_id = getQueryVariable('c_id')

  init()
  function headerTabTemp(list){
    var str = ''
    for (var index = 0; index < list.length; index++) {
      var element = list[index];
      if(index == 0){
        tabid = element.id
      }
      str = str + '<li class="tab '+(index == 0 ? 'active' : '')+'" data-tabid="'+element.id+'">'+element.category_name+'</li>'
    }
    return str 
  }
  function init() {
    document.getElementById("tabs").innerHTML = ''
    document.getElementById("content").innerHTML = ''
    if (detail_id) {
      document.getElementById("header").innerHTML = ''
      document.title = "资讯详情"
      getDetailInfo()
    } else if (type === 'about') {
      document.getElementById("header").innerHTML = ''
      document.title = "关于我们"
      getAbout()
    } else if(c_id){
      document.getElementById("header").innerHTML = ''
      getProtocalInfo()
    }else{
      document.title = "公司介绍"
      getCategory()
    }
  }
  function getCategory(){
    http({url:'/api/v1/office/category',method:'get',success: function(res){
    var html = headerTabTemp(res.data.list)
    document.getElementById('tabs').innerHTML = html
    getData(tabid)
  }})
  }
  function getData(id) {
    http({url:'/api/v1/office/contentList?category_id='+id,method:'get',success: function(res){
      var data = res.data.list[0]
      showInfo(data);
    }})
      
  }

  function getDetailInfo() {
    http({url:'/api/v1/information/detail?information_id='+ detail_id,method:'get',success: function(res){
      var data = res.data.information
      showInfo(data);
    }})
  }
  function getProtocalInfo() {
    http({url:'/api/v1/protocol/content?c_id=' + c_id,method:'get',success: function(res){
      var data = res.data.protocol
      showInfo(data);
    }})
  }
  function getAbout() {
    var url = ''
    if(!url) return
    http({url:url,method:'get',success: function(res){
      var data = res.data.protocol
      showInfo(data);
    }})
  }
  function contextTemp(data) {
    return '<article>' +
              '<h1 class="title">'+(data.title || '')+'</h1>' +
              '<p class="time">'+(data.updated_at || '')+'</p>' +
              '<section class="context">'+(data.content || '')+'</section>' +
            '</article>';
  }


  function showInfo(data) {
    document.getElementById("content").innerHTML = ''
    if(data){
      var html = contextTemp(data);
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
    var  baseUrl = 'https://app.bjjyrqzb.com'
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
})()
