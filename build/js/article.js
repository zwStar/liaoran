webpackJsonp([5],{

/***/ 1:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by admin on 2017/8/16.
 */
__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(1);

__webpack_require__(15);
__webpack_require__(16);

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {/**
 * Created by admin on 2017/8/16.
 */
(function ($) {
    var _this = this;
    var wheelrate = 30;
    var position = 0;
    var lastposition = 0;
    $(".content-wrapper").on("mousewheel DOMMouseScroll", function (e) {
        var oev = e.originalEvent;
        lastposition = position;
        position = (oev.wheelDelta ? -oev.wheelDelta / 120 : oev.detail / 3) * wheelrate + this.scrollTop;
        $(this).scrollTop(position);
        if (lastposition != position) return false;
    });

    var searchURL = window.location.search;
    var idREG = /id=([\w]+)&?/;
    var typeREG = /type=([a-zA-Z]+)&?/;
    var type = searchURL.match(typeREG)[1];
    changeActive(type);
    var id = searchURL.match(idREG)[1];

    // switch (type){
    //     case 'theory':
    //         $("header .item:eq(1) li:eq(0)").addClass("active");
    //         break;
    //     case 'experiment':
    //         $("header .item:eq(1) li:eq(1)").addClass("active");
    //         break;
    //     case 'theatre':
    //         $("header .item:eq(1) li:eq(2)").addClass("active");
    //         break;
    //     case 'notes':
    //         $("header .item:eq(1) li:eq(3)").addClass("active");
    //         break;
    //
    //
    // }

    function changeActive(type) {

        var li = $(".navList").find("li");

        for (var i = 0; i < li.length; i++) {
            var reType = /type=([\w]+)&?/;
            if (li.eq(i).find("a")[0].href.match(reType)[1] === type) {
                li.eq(i).addClass("active").siblings().removeClass("active");
                break;
            }
        }
    }

    $.ajax({
        url: "/articles/lrArticle/find",
        type: 'get',
        data: {
            _id: id
        },
        success: function (data) {
            $(" .info .title").html(data.data.title);
            $(" .info .author").html(data.data.publisher);
            $(" .info .time").html(data.data.date);
            $(" .article").append(data.data.content);
        }
    });
})(__webpack_provided_window_dot_jQuery);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })

},[14]);
//# sourceMappingURL=article.js.map