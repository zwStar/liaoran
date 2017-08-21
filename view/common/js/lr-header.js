/**
 * Created by Administrator on 2017/7/28.
 */
(function($){

    var header = ['<header class="relativeHeader">',
        '		<img src="" alt="">',
        '		<nav>',
        '			<ul>',
        '				<li class="item"><a href="./index.html"><span>首页</span></a></li><!-- ',
        '			 --><li class="item">',
        '					<span>心理学苑</span>',
        '					<ul class="pull-down-list">',
        '						<li>',
        '							<a href="./articles.html?type=theory">',
        '								理论精华',
        '								<div class="border"></div>',
        '							</a>',
        '						</li><!-- ',
        '					 --><li>',
        '					 		<a href="./articles.html?type=experiment">',
        '					 			经典实验',
        '					 			<div class="border"></div>',
        '					 		</a>',
        '					 	</li><!-- ',
        '					 --><li>',
        '					 		<a href="./articles.html?type=theatre">',
        '					 			心理剧场',
        '					 			<div class="border"></div>',
        '					 		</a>',
        '					 	</li><!-- ',
        '					 --><li>',
        '					 		<a href="./articles.html?type=notes">',
        '					 			心理美文',
        '					 			<div class="border"></div>',
        '					 		</a>',
        '					 	</li>',
        '					</ul>',
        '				</li><!-- ',
        '			 --><li class="item">',
        '					<span>心观天下</span>',
        '					<ul class="pull-down-list">',
        '						<li>',
        '							<a href="">',
        '								它山之石',
        '								<div class="border"></div>',
        '							</a>',
        '						</li><!-- ',
        '					 --><li>',
        '					 		<a href="">',
        '					 			时代脉搏',
        '					 			<div class="border"></div>',
        '					 		</a>',
        '					 	</li><!-- ',
        '					 --><li>',
        '					 		<a href="">',
        '					 			大写的人',
        '					 			<div class="border"></div>',
        '					 		</a>',
        '					 	</li><!-- ',
        '					 --><li>',
        '					 		<a href="">',
        '					 			警世通言',
        '					 			<div class="border"></div>',
        '					 		</a>',
        '					 	</li>',
        '					</ul>',
        '				</li><!-- ',
        '			 --><li class="item">',
        '					<span>心理协会</span>',
        '					<ul class="pull-down-list">',
        '						<li>',
        '							<a href="">',
        '								松(山)湖心理协会',
        '								<div class="border"></div>',
        '							</a>',
        '						</li><!-- ',
        '					 --><li>',
        '					 		<a href="">',
        '					 			松(山)湖心理沙龙',
        '					 			<div class="border"></div>',
        '					 		</a>',
        '					 	</li>',
        '					</ul>',
        '				</li><!--',
        '			 --><li class="item">',
        '					<span>商务合作</span>',
        '					<ul class="pull-down-list">',
        '						<li>',
        '							<a href="./evaluation.html">',
        '								人力资源管理项目',
        '								<div class="border"></div>',
        '							</a>',
        '						</li><!-- ',
        '					 --><li>',
        '					 		<a href="./community.html">',
        '					 			社区合作服务项目',
        '					 			<div class="border"></div>',
        '					 		</a>',
        '					 	</li><!-- ',
        '					 --><li>',
        '					 		<a href="./companyEnterprise.html">',
        '					 			企业心理服务项目',
        '					 			<div class="border"></div>',
        '					 		</a>',
        '					 	</li><!-- ',
        '					 --><li>',
        '					 		<a href="">',
        '					 			教育心理服务项目',
        '					 			<div class="border"></div>',
        '					 		</a>',
        '					 	</li><!-- ',
        '					 --><li>',
        '					 		<a href="./government.html">',
        '					 			政府心理服务项目',
        '					 			<div class="border"></div>',
        '					 		</a>',
        '					 	</li>',
        '					</ul>',
        '				</li> ',
        '               <li class="item"><a href="./aboutUs.html"><span>关于我们</span></a></li>',
        '			</ul>',
        '		</nav>',
        '	</header>'].join("");
    var footer = ['<footer>',
        '    <div class="name">广东省了然文化传播有限公司</div>',
        '    <div class="address">东莞市松山湖大学路瑞鹰国际科技创新园8栋201</div>',
        '</footer>'].join("");

    $("body").prepend(header);
    $("body>script").length>0 ? $('body>script').eq(0).before(footer):$('body').append(footer);

    var href = window.location.href;
    var index = href.lastIndexOf("/");

    var header = $("header");

    switch (href.slice(index+1,href.indexOf('.'))){
        case 'index':
            header.removeClass('relativeHeader');
            break;
        case 'articles':
            $("header .item:eq(1) span").addClass("active");
            break;
        case 'article':
            $("header .item:eq(1) span").addClass("active");
            break;
        case 'aboutUs':
            $("header .item:eq(5) span").addClass("active");
            break;
        default:

            break;
    }

})(window.jQuery)