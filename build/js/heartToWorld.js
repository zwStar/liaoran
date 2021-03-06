webpackJsonp([1],{

/***/ 0:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by admin on 2017/8/16.
 */
__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(0);

__webpack_require__(4);

__webpack_require__(5);
__webpack_require__(6);

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

/**
 * Created by admin on 2017/7/31.
 */
(function (window, undefined) {

    /**
     * 创建元素节点并返回
     */
    function create(tagName, className, parent) {
        var element = document.createElement(tagName);
        element.className = className;
        parent.appendChild(element);
        return element;
    }

    /**
     * 数组消除重复
     */
    function clearRepeat(arr) {
        var obj = {},
            result = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            obj[arr[i]] = 1;
        }
        for (var i in obj) {
            result.push(i);
        }
        return result;
    }

    /**
     * 添加类名
     */
    function addClassName(element, className) {
        var aClass = element.className.split(' ');
        aClass.push(className);
        aClass = clearRepeat(aClass);
        element.className = aClass.join(' ');
    }

    /**
     * 删除类名
     */
    function delClassName(element, className) {
        var aClass = element.className.split(' '),
            index = aClass.indexOf(className);
        if (index > 0) aClass.splice(index, 1);
        element.className = aClass.join(' ');
    }

    /**
     * 检查是否含有类名
     * @param element
     * @param className
     * @returns {boolean}
     */
    function hasClassName(element, className) {
        var aClass = element.className.split(' '),
            index = aClass.indexOf(className);
        if (index > 0) return true;
        return false;
    }

    var Pager = function (obj) {

        this.__total = obj.total || 1; //总页数
        this.__index = obj.index || 1; //当前索引
        this.__parent = obj.parent; //父元素
        this.__onchange = obj.onchange; //回调函数
        this.__base_url = obj.baseUrl;
        console.log(this.__base_url);
        //初始化分页器
        this.__init(obj);
    };

    var pro = Pager.prototype;
    /**
     * 初始化分页器
     */
    pro.__init = function (obj) {
        if (this.__total < this.__index) return;
        //存储数字

        this.__numbers = [];
        //储存省略号
        this.__dots = [];
        this.__wrapper = create('div', 'pager-box', this.__parent);
        this.__body = create('div', 'pager', this.__wrapper);
        //存储上一页
        this.__preBtn = create('a', 'prev', this.__body);

        this.__preBtn.innerText = obj.label && obj.label.prev || '上一页';

        //存储数字
        if (this.__total < 8) {
            for (var i = 0; i < this.__total; i++) {
                var t = create('a', 'number', this.__body);
                t.href = this.__base_url.replace("{{page}}", i + 1);
                t.innerText = i + 1;
                this.__numbers.push(t);
            }
        } else {
            for (var i = 0; i < 2; i++) {
                var t = create('span', 'dots', this.__body);
                t.innerText = '...';
                this.__dots.push(t);
            }
            for (var i = 0; i < 7; i++) {
                var t = create('a', 'number', this.__body);
                this.__numbers.push(t);
            }
        }
        //存储下一页
        this.__nextBtn = create('a', 'next', this.__body);
        this.__nextBtn.innerText = obj.label && obj.label.next || '下一页';
        //
        this._$setIndex(this.__index);
    };

    /**
     * 跳转页数
     */
    pro._$setIndex = function (index) {

        index = parseInt(index);
        //更新信息
        if (index != this.__index) {
            this.__last = this.__index;
            this.__index = index;
        }
        //处理
        delClassName(this.__preBtn, 'js-disabled');
        this.__preBtn.href = this.__base_url.replace("{{page}}", this.__index - 1);
        delClassName(this.__nextBtn, 'js-disabled');
        this.__nextBtn.href = this.__base_url.replace("{{page}}", this.__index + 1);
        if (this.__total < 8) {
            //总页数小于8的情况
            // if (this.__last) delClassName(this.__numbers[this.__last - 1], 'js-selected');
            addClassName(this.__numbers[this.__index - 1], 'js-selected');
            this.__numbers[this.__index - 1].href = "javascript:void(0);";

            if (this.__index == 1) {
                addClassName(this.__preBtn, 'js-disabled');
                this.__preBtn.href = "javascript:void(0);";
            } else {
                this.__preBtn.href = this.__base_url.replace("{{page}}", this.__index - 1);
            }
            if (this.__index == this.__total) {
                this.__nextBtn.href = "javascript:void(0);";
                addClassName(this.__nextBtn, 'js-disabled');
            } else {
                this.__nextBtn.href = this.__base_url.replace("{{page}}", this.__index + 1);
            }
        } else {
            this.__dots[0].style.display = 'none';
            this.__dots[1].style.display = 'none';
            for (var i = 0; i < 7; i++) {
                delClassName(this.__numbers[i], 'js-selected');
            }
            if (this.__index < 5) {
                for (var i = 0; i < 6; i++) {
                    this.__numbers[i].innerText = i + 1;
                    this.__numbers[i].href = this.__base_url.replace("{{page}}", i + 1);
                }
                this.__numbers[6].innerText = this.__total;
                this.__numbers[6].href = this.__base_url.replace("{{page}}", this.__total);

                this.__dots[1].style.display = 'block';
                this.__body.insertBefore(this.__dots[1], this.__numbers[6]);
                addClassName(this.__numbers[this.__index - 1], 'js-selected');
                this.__numbers[this.__index - 1].href = "javascript:void(0);";

                if (this.__index == 1) {
                    addClassName(this.__preBtn, 'js-disabled');
                    this.__preBtn.href = "javascript:void(0);";
                } else {
                    this.__preBtn.href = this.__base_url.replace("{{page}}", this.__index - 1);
                }
            } else if (this.__index > this.__total - 4) {
                for (var i = 1; i < 7; i++) {
                    var index = this.__total + i - 6;
                    this.__numbers[i].innerText = index;
                    this.__numbers[i].href = this.__base_url.replace("{{page}}", index);
                }
                this.__numbers[0].innerText = '1';
                this.__numbers[0].href = this.__base_url.replace("{{page}}", 1);

                this.__dots[0].style.display = 'block';
                this.__body.insertBefore(this.__dots[0], this.__numbers[1]);

                var index = this.__index + 6 - this.__total;
                addClassName(this.__numbers[index], 'js-selected');
                this.__numbers[index].href = this.__base_url.replace("{{page}}", index);

                if (this.__index == this.__total) {
                    addClassName(this.__nextBtn, 'js-disabled');
                    this.__nextBtn.href = "javascript:void(0);";
                } else {
                    this.__preBtn.href = this.__base_url.replace("{{page}}", this.__index - 1);
                }
            } else {
                this.__numbers[0].innerText = '1';
                this.__numbers[0].href = this.__base_url.replace("{{page}}", 1);

                for (var i = 1; i < 6; i++) {
                    this.__numbers[i].innerText = this.__index - 3 + i;
                    this.__numbers[i].href = this.__base_url.replace("{{page}}", this.__index - 3 + i);
                    if (i == 3) {
                        addClassName(this.__numbers[i], 'js-selected');
                        this.__numbers[i].href = "javascript:void(0);";
                    }
                }
                this.__numbers[6].innerText = this.__total;
                this.__numbers[6].href = this.__base_url.replace("{{page}}", this.__total);

                this.__dots[0].style.display = 'block';
                this.__body.insertBefore(this.__dots[0], this.__numbers[1]);
                this.__dots[1].style.display = 'block';
                this.__body.insertBefore(this.__dots[1], this.__numbers[6]);
            }
        }
        if (typeof this.__onchange == 'function') {
            this.__onchange({
                index: this.__index,
                last: this.__last,
                total: this.__total
            });
        }
    };
    /**
     * 得到总页数
     */
    pro._$getIndex = function () {
        return this.__index;
    };
    /**
     * 得到上一个页数
     */
    pro._$getLast = function () {
        return this.__last;
    };
    //变成全局
    window.Pager = Pager;
})(window);

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {(function ($) {
    function Pagination(options) {
        var _this = this;
        _this.PageNum = options.PageNum || 1;
        _this.parent = options.parent;
        _this.articles = options.articles;
        _this.navList = options.navList;
        _this.init();
    }

    //文章模板
    var template = ['<section class="articles">     ', '  <div class="img-wrapper">', '<img src="{{mainImg}}">', '</div>', '        <span class="publisher">{{publisher}}</span><span class="time">{{date}}</span>', '        <h3><a href="./article.html?id={{id}}&type={{type}}">{{title}}</a></h3>', '        <div class="intro">', '            {{intro}}', '        </div>', '        <a class="article-footer" href="#">{{artcilesType}}</a>', '    </section>'].join("");

    Pagination.prototype = {
        init: function () {
            var _this = this;
            var url = location.href;
            var re = /page=([\d]+)&?/; //匹配页数正则
            var reType = /type=([\w]+)&?/; //匹配类型正则
            var categoryRE = /category=([\w]+)&?/; //匹配类别栏目正则
            _this.category = url.match(categoryRE) || "college";

            _this.initLeftColumn(_this.category); //初始化左侧栏目
            _this.type = url.match(reType) && url.match(reType)[1] || "theory";
            template = template.replace("{{type}}", _this.type);
            _this.base_url = "http://www.gdliaoran.com/articles.html?type=" + _this.type + "&page={{page}}"; //获取文章类型和第几页
            _this.changeActive(_this.type); //改变左侧高亮
            _this.index = url.match(re) && parseInt(url.match(re)[1]) || 1; //当前第几页
            _this.getArticle(_this.index); //获取文章
            _this.getCount(); //获取总数量
        },
        getCount: function () {
            //获取总共有多少文章
            var _this = this;
            var url = '/articles/lrArticle/count';
            var type = "GET";
            var data = { type: _this.type }; //文章类型
            var callback = function (results) {
                var count = results.data; //总数量
                var total = Math.ceil(count / _this.PageNum); //计算有多少页数
                _this.paginationInit(_this.index, total); //初始化分页器
            };
            _this.ajaxRequest(url, data, type, callback);
        },
        paginationInit: function (index, total) {
            //初始化分页器
            var _this = this;
            console.log(_this.parent[0]);
            var pager = new Pager({
                index: index, //当前索引
                total: total, //总页数
                parent: _this.parent[0], //分页器父级元素
                baseUrl: _this.base_url, //链接地址
                onchange: _this.doChangePage.bind(_this)
            });
        },
        doChangePage: function (index, last, total) {},
        ajaxRequest: function (url, data, type, callback) {
            $.ajax({
                url: url,
                data: data,
                type: type,
                success: function (results) {
                    console.log(results);
                    callback(results);
                }
            });
        },
        getArticle: function () {
            //获取文章
            var _this = this;
            var url = '/articles/lrArticle/get';
            var type = "GET";
            var data = { type: _this.type, count: _this.PageNum, index: _this.index };
            var callback = function (results) {
                _this.articles.empty(); //清空文章列表
                for (var i = 0; i < results.data.length; i++) {
                    var temp = template; //模板
                    for (var key in results.data[i]) {
                        temp = temp.replace("{{" + key + "}}", results.data[i][key]);
                    }
                    _this.articles.append(temp);
                }
            };
            _this.ajaxRequest(url, data, type, callback);
        },
        changeActive: function (type) {
            var _this = this;
            var li = _this.navList.find("li");

            for (var i = 0; i < li.length; i++) {
                var reType = /type=([\w]+)&?/;
                if (li.eq(i).find("a")[0].href.match(reType)[1] === type) {
                    //根据type 与li下面的a的href判断
                    li.eq(i).addClass("active").siblings().removeClass("active");
                    template = template.replace("{{artcilesType}}", li.eq(i).find("a").html()); //改变文章下角的类型
                    break;
                }
            }
        },
        initLeftColumn: function (category) {}
    };
    new Pagination({
        PageNum: 4,
        parent: $("#pager"),
        articles: $("#articles"),
        navList: $(".navList")
    });
})(__webpack_provided_window_dot_jQuery);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[24]);
//# sourceMappingURL=heartToWorld.js.map