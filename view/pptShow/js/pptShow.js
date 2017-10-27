(function ($) {
    function Pagination(options) {
        var _this = this;
        _this.PageNum = options.PageNum || 1;
        _this.parent = options.parent;
        _this.articles = options.articles;
        _this.navList = options.navList;
        _this.init();
    }

    //文章模板
    var template = ['<section class="articles" id="{{id}}">     ',
        '  <div class="img-wrapper">',
        '<img src="{{mainImg}}">',
        '</div>',
        '        <span class="publisher">{{publisher}}</span><span class="time">{{date}}</span>',
        '        <h3><a href="./article.html?id={{id}}&type={{type}}">{{title}}</a></h3>',
        '        <a class="article-footer" href="#">{{artcilesType}}</a>',
        '    </section>'].join("");

    Pagination.prototype = {
        init: function () {
            var _this = this;
            var url = location.href;
            var re = /page=([\d]+)&?/;          //匹配页数正则

            _this.base_url = "http://www.gdliaoran.com/articles.html?type=" + _this.type + "&page={{page}}" + "&category=" + _this.category;//获取文章类型和第几页
            _this.index = (url.match(re) && parseInt(url.match(re)[1])) || 1;   //当前第几页
            _this.getArticle(_this.index);  //获取文章
            _this.getCount();       //获取总数量

        },
        getCount: function () { //获取总共有多少文章
            var _this = this;
            var url = '/articles/lrArticle/count'
            var type = "GET";
            var data = {type: _this.type};  //文章类型
            var callback = function (results) {
                var count = results.data;   //总数量
                var total = Math.ceil(count / _this.PageNum);   //计算有多少页数
                _this.paginationInit(_this.index, total);       //初始化分页器
            }
            _this.ajaxRequest(url, data, type, callback);
        },
        paginationInit: function (index, total) {       //初始化分页器
            var _this = this;
            var pager = new Pager({
                index: index,               //当前索引
                total: total,               //总页数
                parent: _this.parent[0],    //分页器父级元素
                baseUrl: _this.base_url,           //链接地址
                onchange: _this.doChangePage.bind(_this)
            });
        },
        doChangePage: function (index, last, total) {
        },
        ajaxRequest: function (url, data, type, callback) {
            $.ajax({
                url: url,
                data: data,
                type: type,
                success: function (results) {
                    console.log(results)
                    callback(results);
                }
            })
        },
        getArticle: function () {               //获取文章
            var _this = this;
            var url = '/articles/lrArticle/get';
            var type = "GET";
            var data = {type: _this.type, count: _this.PageNum, index: _this.index};
            var callback = function (results) {
                _this.articles.empty();             //清空文章列表
                for (var i = 0; i < results.data.length; i++) {
                    var temp = template;    //模板
                    for (var key in results.data[i]) {
                        temp = temp.replace("{{" + key + "}}", results.data[i][key]);
                    }
                    _this.articles.append(temp);
                }

            }
            _this.ajaxRequest(url, data, type, callback);
        },
        changeActive: function (type) {
            var _this = this;
            var li = _this.navList.find("li");

            for (var i = 0; i < li.length; i++) {
                var reType = /type=([\w]+)&?/;
                if (li.eq(i).find("a")[0].href.match(reType)[1] === type) {     //根据type 与li下面的a的href判断
                    li.eq(i).addClass("active").siblings().removeClass("active");
                    template = template.replace("{{artcilesType}}", li.eq(i).find("a").html());  //改变文章下角的类型
                    break;
                }
            }
        },
        initLeftColumn: function (category) {
            var template = `<li class="active"><i class="iconfont">&#xe618;</i><a href="./articles.html?type={{type}}&category=${category}">{{name}}</a>
                </li>`
            var lists;
            switch (category) {
                case  'college':
                    lists = [
                        {name: '理论精华', type: 'theory'},
                        {name: '鲜活实验', type: 'experiment'},
                        {name: '心理剧场', type: 'theatre'},
                        {name: '百科美文', type: 'notes'}]
                    break;
                case 'heartWorld':
                    lists = [
                        {name: '它山之石', type: 'storm'},
                        {name: '时代脉搏', type: 'date'},
                        {name: '大写的人', type: 'person'},
                        {name: '警世通言', type: 'word'},
                        {name: '健康中国', type: 'healthy'}]
                    break;
            }
            var navList = $(".navList");
            var ul = navList.find("ul");
            ul.empty();
            var li;
            lists.forEach(item => {
                var temp = template;
                if (item.name === '健康中国') {
                    temp = `<li class="active"><i class="iconfont">&#xe618;</i><a href="./pptShow.html?type=healthy&category=${category}">{{name}}</a>
                </li>`
                }
                temp = temp.replace("{{type}}", item.type).replace("{{name}}", item.name)
                ul.append(temp);
            })
            navList.append(ul)
        },
        pphShow: function () {
            var _this = this;
            var slider = `<div class="swiper-slide"><img src="{{src}}"></div>`
            $(".articles").on("click", function () {
                var url = '/articles/lrPPT/get';
                var type = "GET";
                var id = this.attr("id");
                _this.ajaxRequest(url, {id: id}, {}, function (results) {

                    // $(".container")
                })
            })
        },


    }
    new Pagination({
        PageNum: 4,
        parent: $("#pager"),
        articles: $("#articles"),
        navList: $(".navList")
    })

    function  initSwiper() {
        new Swiper('.swiper-container', {
            loop: true,
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },
            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        })
    }
    $(".articles").on("click",function(){
        $(".container").fadeIn(1000);
        initSwiper();
    });
    $(".close").on("click",function(){
        $(".container").fadeOut(1000);
    })
})(window.jQuery)