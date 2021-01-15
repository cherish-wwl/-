document.body.ontouchstart = function (e) {
      e.preventDefault();
      startX = e.changedTouches[0].pageX,
        startY = e.changedTouches[0].pageY;
    }
    document.body.ontouchmove = debounce(function (e) {
      // e.preventDefault();
      moveEndX = e.changedTouches[0].pageX,
        moveEndY = e.changedTouches[0].pageY,
        X = moveEndX - startX,
        Y = moveEndY - startY;
      var active = document.getElementById("header").querySelectorAll(".active")[0]
      if (Math.abs(X) > Math.abs(Y) && X > 50) {
        if (active && active.previousElementSibling) {
          active.classList.remove("active");
          active.previousElementSibling.classList.add("active");
          showInfo(active.previousElementSibling.dataset.tabid);
        }

      }
      else if (Math.abs(X) > Math.abs(Y) && X < 50) {
        if (active && active.nextElementSibling) {
          active.classList.remove("active");
          active.nextElementSibling.classList.add("active");
          showInfo(active.nextElementSibling.dataset.tabid);
        }
      }
    }, 500)
    function debounce(handler, delay) {
      var timer = null;
      return function () {
        var _self = this,
          _arg = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          handler.apply(_self, _arg);
        }, delay)
      }
    }