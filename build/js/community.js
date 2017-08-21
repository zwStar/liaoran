webpackJsonp([0],{

/***/ 1:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(1);
__webpack_require__(4);

__webpack_require__(23);
__webpack_require__(24);

/***/ }),

/***/ 23:
/***/ (function(module, exports) {



/***/ }),

/***/ 24:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery, $) {/**
 * Created by admin on 2017/8/16.
 */
/**
 * Created by admin on 2017/8/16.
 */

(function ($, plug) {
    $.fn[plug] = function () {
        $.extend(this, __PROTO__, __bindEvent);
        this.init();
    };

    var __PROTO__ = {
        init: function () {
            this.anchor = $(".anchor"); //喵点
            this.leftList = $(".navList").find("li"); //左侧列表
            this.content = $(".content-wrapper"); //右侧容器
            this.anchorArr = []; //获取喵点位置

            this.getAnchorArr(); //获取喵点位置
            this.ListClick(); //绑定左侧列表点击事件
            this.scrollEvent(); //滚动条滚动事件
            this.wheelSlide(); //滑轮滚动事件
            this.showDownList(); //如果左边导航第一项有下拉列表则显示下拉列表
        },
        getAnchorArr: function () {
            //获取喵点位置
            var _this = this;
            for (var i = 0; i < this.anchor.length; i++) {
                _this.anchorArr.push(this.anchor.eq(i).position().top);
            }
        },
        getScrollIndex: function () {
            var j = 0;
            for (var i = this.anchor.length - 1; i > 0; i--) {
                if (this.scrollTop() > (this.anchorArr[i] + this.anchorArr[i - 1]) / 2) {
                    j = i;
                    return j;
                }
                if (this.content[0].scrollHeight <= this.scrollTop() + this.content.height() + 100) {
                    console.log("1111111");
                }
            }
            return j;
        }
    };
    var __bindEvent = {
        ListClick: function () {
            //左侧点击事件

            var _this = this;
            _this.leftList.on("click", function () {
                $(this).addClass("active").siblings().removeClass("active"); //为点击增加active 并且remove其它li的active
                $(".downList").css({
                    'height': '0px',
                    'opacity': 0,
                    'margin-top': '0px'
                });
                if ($(this).find(".downList").length == 0) {

                    _this.content.scrollTop(_this.anchorArr[$(this).index()]); //滚动到相应的位置
                } else {

                    var downList = $(this).find(".downList");
                    _this.showDownList(downList);
                }
            });
        },
        scrollEvent: function () {
            var _this = this;

            _this.content.on("scroll", function (event) {
                _this.listActive();
            });
        },
        listActive: function () {
            var index;
            var last;
            var temp;
            var _this = this;
            temp = _this.getScrollIndex();
            if (temp !== index) {
                //如果位置有变化 再执行左侧list变化
                last = index;
                index = temp;
                _this.leftList.eq(index).addClass("active").siblings().removeClass("active");
            }
        },
        scrollTo: function (position) {
            var _this = this;
            _this.content.scrollTop(position);
            _this.listActive();
        },
        wheelSlide: function () {
            var _this = this;
            var wheelrate = 30;
            var position = 0;
            _this.content.on("mousewheel DOMMouseScroll", function (e) {
                var oev = e.originalEvent;
                position = (oev.wheelDelta ? -oev.wheelDelta / 120 : oev.detail / 3) * wheelrate + this.scrollTop;
                _this.scrollTo(position);
            });
        },
        showDownList: function (downList) {
            downList = downList || $(".navList li:eq(0) .downList");
            if (downList) {
                $(downList).css({
                    'height': downList.children().length * 23 + 'px',
                    'opacity': 1,
                    'margin-top': '5px'
                });
            }
        }
    };
})(__webpack_provided_window_dot_jQuery, "ScrollAuto");

$(function () {
    $(".content-wrapper").ScrollAuto();
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(0)))

/***/ })

},[22]);
//# sourceMappingURL=community.js.map