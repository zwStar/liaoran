/**
 * Created by admin on 2017/8/16.
 */
/**
 * Created by admin on 2017/8/16.
 */

(function ($, plug) {
    $.fn[plug] = function () {
        $.extend(this, __PROTO__, __bindEvent);
        this.init();
    }

    var __PROTO__ = {
        init: function () {
            this.anchor = $(".anchor");           //喵点
            this.leftList = $(".navList").find("li");   //左侧列表
            this.content = $(".content-wrapper");       //右侧容器
            this.anchorArr = [];                        //获取喵点位置

            this.getAnchorArr();            //获取喵点位置
            this.ListClick();               //绑定左侧列表点击事件
            this.scrollEvent();             //滚动条滚动事件
            this.wheelSlide();              //滑轮滚动事件
            this.showDownList();             //如果左边导航第一项有下拉列表则显示下拉列表
            this.showTitle();               //替换{{title}}

        },
        getAnchorArr: function () {         //获取喵点位置
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
                }
            }
            return j;
        }
    }
    var __bindEvent = {
        ListClick: function () {           //左侧点击事件

            var _this = this;
            _this.leftList.on("click", function () {
                $(this).addClass("active").siblings().removeClass("active");        //为点击增加active 并且remove其它li的active
                $(".downList").css({
                    'height': '0px',
                    'opacity': 0,
                    'margin-top': '0px'
                })
                if ($(this).find(".downList").length == 0) {
                    _this.content.scrollTop(_this.anchorArr[$(this).index()]);          //滚动到相应的位置

                } else {
                    var downList = $(this).find(".downList");
                    // _this.showDownList(downList);
                }

            })
        },
        scrollEvent: function () {
            var _this = this;
            _this.content.on("scroll", function (event) {
                _this.listActive();
            })
        },
        listActive: function () {
            var index;
            var last;
            var temp;
            var _this = this;
            temp = _this.getScrollIndex();
            if (temp !== index) {         //如果位置有变化 再执行左侧list变化
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
                position = (oev.wheelDelta ? -oev.wheelDelta / 120 : (oev.detail / 3)) * wheelrate + this.scrollTop;
                _this.scrollTo(position);
            })
        },
        showDownList: function (downList) {
            downList = downList || $(".navList li:eq(0) .downList");
            if (downList) {
                $(downList).css({
                    'height': downList.children().length * 30 + 'px',
                    'opacity': 1,
                    'margin-top': '5px'
                })
            }

        },
        showTitle: function () {
            let href = window.location.href;
            let reg = /\/([^\. | ^\/]*)\.html/;
            switch (href.match(reg)[1]) {
                case "community":
                    this.replace("家庭社区");
                    break;
                case "companies":
                    this.replace("公司企业");
                    break;
                case "civilAviation":
                    this.replace("民用航空");
                    break;
                case "baseEducation":
                    this.replace("基础教育");
                    break;
            }
        },
        replace: function (content) {
            $(".left .header h2").html(content);
            content = $(".right .header div").html().replace("{{title}}", content);
            $(".right .header div").html(content);
        }

    }


})(window.jQuery, "ScrollAuto")

$(function () {
    $(".content-wrapper").ScrollAuto();
})