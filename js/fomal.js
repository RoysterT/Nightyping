//----------------------------------------------------------------
// 全局变量

// 版本号
var latestVersion = "1.0.1";

//----------------------------------------------------------------

/* 阅读进度 start */
document.addEventListener("pjax:complete", function () {
  window.onscroll = percent;
});
document.addEventListener("DOMContentLoaded", function () {
  window.onscroll = percent;
});
// 页面百分比
function percent() {
  // 先让菜单栏消失
  try {
    rmf.showRightMenu(false);
    $(".rmMask").attr("style", "display: none");
  } catch (err) { }

  let a = document.documentElement.scrollTop, // 卷去高度
    b =
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      ) - document.documentElement.clientHeight, // 整个网页高度 减去 可视高度
    result = Math.round((a / b) * 100), // 计算百分比
    btn = document.querySelector("#go-up"); // 获取按钮

  if (result < 95) {
    // 如果阅读进度小于95% 就显示百分比
    btn.childNodes[0].style.display = "none";
    btn.childNodes[1].style.display = "block";
    btn.childNodes[1].innerHTML = result + "<span>%</span>";
  } else {
    // 如果大于95%就显示回到顶部图标
    btn.childNodes[1].style.display = "none";
    btn.childNodes[0].style.display = "block";
  }
}
/* 阅读进度 end */

//----------------------------------------------------------------

/* 导航栏显示标题 start */

document.addEventListener("pjax:complete", tonav);
document.addEventListener("DOMContentLoaded", tonav);
//响应pjax
function tonav() {
  document
    .getElementById("name-container")
    .setAttribute("style", "display:none");
  var position = $(window).scrollTop();
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll > position) {
      document.getElementById("name-container").setAttribute("style", "");
      document
        .getElementsByClassName("menus_items")[1]
        .setAttribute("style", "display:none!important");
    } else {
      document
        .getElementsByClassName("menus_items")[1]
        .setAttribute("style", "");
      document
        .getElementById("name-container")
        .setAttribute("style", "display:none");
    }
    position = scroll;
  });
  //修复没有弄右键菜单的童鞋无法回顶部的问题
  document.getElementById("page-name").innerText =
    document.title.split(" | 🌙Nightyping")[0];
}

function scrollToTop() {
  document.getElementsByClassName("menus_items")[1].setAttribute("style", "");
  document
    .getElementById("name-container")
    .setAttribute("style", "display:none");
  btf.scrollToDest(0, 500);
}

/* 导航栏显示标题 end */

//----------------------------------------------------------------

/* 欢迎信息 start */
//get请求
$.ajax({
  type: "get",
  url: "https://apis.map.qq.com/ws/location/v1/ip",
  data: {
    key: "75DBZ-NFWHG-SORQM-QAILY-SU4FS-7RFE7", // 这里要写你的KEY!!!
    output: "jsonp",
  },
  dataType: "jsonp",
  success: function (res) {
    ipLoacation = res;
  },
});
function getDistance(e1, n1, e2, n2) {
  const R = 6371;
  const { sin, cos, asin, PI, hypot } = Math;
  let getPoint = (e, n) => {
    e *= PI / 180;
    n *= PI / 180;
    return { x: cos(n) * cos(e), y: cos(n) * sin(e), z: sin(n) };
  };

  let a = getPoint(e1, n1);
  let b = getPoint(e2, n2);
  let c = hypot(a.x - b.x, a.y - b.y, a.z - b.z);
  let r = asin(c / 2) * 2 * R;
  return Math.round(r);
}

function showWelcome() {
  // 23.202084,113.381125 广金广州
  // 22.523697,113.926902 家
  let dist = getDistance(
    113.381125,
    23.202084,
    ipLoacation.result.location.lng,
    ipLoacation.result.location.lat
  ); //这里换成自己的经纬度
  let pos = ipLoacation.result.ad_info.nation;
  let ip;
  let posdesc;
  //根据国家、省份、城市信息自定义欢迎语
  switch (ipLoacation.result.ad_info.nation) {
    case "日本":
      posdesc = "よろしく，一起去看樱花吗";
      break;
    case "美国":
      posdesc = "Let us live in peace!";
      break;
    case "英国":
      posdesc = "想同你一起夜乘伦敦眼";
      break;
    case "俄罗斯":
      posdesc = "干了这瓶伏特加！";
      break;
    case "法国":
      posdesc = "C'est La Vie";
      break;
    case "德国":
      posdesc = "Die Zeit verging im Fluge.";
      break;
    case "澳大利亚":
      posdesc = "一起去大堡礁吧！";
      break;
    case "加拿大":
      posdesc = "拾起一片枫叶赠予你";
      break;
    case "中国":
      pos =
        ipLoacation.result.ad_info.province +
        " " +
        ipLoacation.result.ad_info.city +
        " " +
        ipLoacation.result.ad_info.district;
      ip = ipLoacation.result.ip;
      switch (ipLoacation.result.ad_info.province) {
        case "北京市":
          posdesc = "北——京——欢迎你~~~";
          break;
        case "天津市":
          posdesc = "讲段相声吧。";
          break;
        case "河北省":
          posdesc = "山势巍巍成壁垒，天下雄关。铁马金戈由此向，无限江山。";
          break;
        case "山西省":
          posdesc = "展开坐具长三尺，已占山河五百余。";
          break;
        case "内蒙古自治区":
          posdesc = "天苍苍，野茫茫，风吹草低见牛羊。";
          break;
        case "辽宁省":
          posdesc = "我想吃烤鸡架！";
          break;
        case "吉林省":
          posdesc = "状元阁就是东北烧烤之王。";
          break;
        case "黑龙江省":
          posdesc = "很喜欢哈尔滨大剧院。";
          break;
        case "上海市":
          posdesc = "众所周知，中国只有两个城市。";
          break;
        case "江苏省":
          switch (ipLoacation.result.ad_info.city) {
            case "南京市":
              posdesc = "这是我挺想去的城市啦。";
              break;
            case "苏州市":
              posdesc = "上有天堂，下有苏杭。";
              break;
            default:
              posdesc = "散装是必须要散装的。";
              break;
          }
          break;
        case "浙江省":
          posdesc = "东风渐绿西湖柳，雁已还人未南归。";
          break;
        case "河南省":
          switch (ipLoacation.result.ad_info.city) {
            case "郑州市":
              posdesc = "豫州之域，天地之中。";
              break;
            case "南阳市":
              posdesc = "臣本布衣，躬耕于南阳。此南阳非彼南阳！";
              break;
            case "驻马店市":
              posdesc = "峰峰有奇石，石石挟仙气。嵖岈山的花很美哦！";
              break;
            case "开封市":
              posdesc = "刚正不阿包青天。";
              break;
            case "洛阳市":
              posdesc = "洛阳牡丹甲天下。";
              break;
            default:
              posdesc = "可否带我品尝河南烩面啦？";
              break;
          }
          break;
        case "安徽省":
          posdesc = "蚌埠住了，芜湖起飞。";
          break;
        case "福建省":
          posdesc = "井邑白云间，岩城远带山。";
          break;
        case "江西省":
          posdesc = "落霞与孤鹜齐飞，秋水共长天一色。";
          break;
        case "山东省":
          posdesc = "遥望齐州九点烟，一泓海水杯中泻。";
          break;
        case "湖北省":
          posdesc = "来碗热干面！";
          break;
        case "湖南省":
          posdesc = "74751，长沙斯塔克。";
          break;
        case "广东省":
          posdesc = "老板来两斤福建人。";
          break;
        case "广西壮族自治区":
          posdesc = "桂林山水甲天下。";
          break;
        case "海南省":
          posdesc = "朝观日出逐白浪，夕看云起收霞光。";
          break;
        case "四川省":
          posdesc = "康康川妹子。";
          break;
        case "贵州省":
          posdesc = "茅台，学生，再塞200。";
          break;
        case "云南省":
          posdesc = "玉龙飞舞云缠绕，万仞冰川直耸天。";
          break;
        case "西藏自治区":
          posdesc = "躺在茫茫草原上，仰望蓝天。";
          break;
        case "陕西省":
          posdesc = "来份臊子面加馍。";
          break;
        case "甘肃省":
          posdesc = "羌笛何须怨杨柳，春风不度玉门关。";
          break;
        case "青海省":
          posdesc = "牛肉干和老酸奶都好好吃。";
          break;
        case "宁夏回族自治区":
          posdesc = "大漠孤烟直，长河落日圆。";
          break;
        case "新疆维吾尔自治区":
          posdesc = "驼铃古道丝绸路，胡马犹闻唐汉风。";
          break;
        case "台湾省":
          posdesc = "我在这头，大陆在那头。";
          break;
        case "香港特别行政区":
          posdesc = "永定贼有残留地鬼嚎，迎击光非岁玉。";
          break;
        case "澳门特别行政区":
          posdesc = "性感荷官，在线发牌。";
          break;
        default:
          posdesc = "带我去你的城市逛逛吧！";
          break;
      }
      break;
    default:
      posdesc = "带我去你的国家逛逛吧。";
      break;
  }

  //根据本地时间切换欢迎语
  let timeChange;
  let date = new Date();
  if (date.getHours() >= 5 && date.getHours() < 11)
    timeChange = "<span>上午好</span>，一日之计在于晨！";
  else if (date.getHours() >= 11 && date.getHours() < 13)
    timeChange = "<span>中午好</span>，该摸鱼吃午饭了。";
  else if (date.getHours() >= 13 && date.getHours() < 15)
    timeChange = "<span>下午好</span>，懒懒地睡个午觉吧！";
  else if (date.getHours() >= 15 && date.getHours() < 16)
    timeChange = "<span>三点几啦</span>，一起饮茶呀！";
  else if (date.getHours() >= 16 && date.getHours() < 19)
    timeChange = "<span>夕阳无限好！</span>";
  else if (date.getHours() >= 19 && date.getHours() < 24)
    timeChange = "<span>晚上好</span>，夜生活嗨起来！";
  else timeChange = "夜深了，早点休息，少熬夜。";

  try {
    //自定义文本和需要放的位置
    document.getElementById(
      "welcome-info"
    ).innerHTML = `<b><center>🎉 欢迎信息 🎉</center>&emsp;&emsp;欢迎来自 <span style="color:var(--theme-color)">${pos}</span> 的小伙伴，${timeChange}您现在距离站长约 <span style="color:var(--theme-color)">${dist}</span> 公里，当前的IP地址为： <span id="welcome-ip" style="color:var(--theme-color)">${ip}</span>， ${posdesc}</b>`;
  } catch (err) {
    // console.log("Pjax无法获取#welcome-info元素🙄🙄🙄")
  }
}
window.onload = showWelcome;
// 如果使用了pjax在加上下面这行代码
document.addEventListener("pjax:complete", showWelcome);

/* 欢迎信息 end */

//----------------------------------------------------------------

/* 微博热搜 start */
document.addEventListener("pjax:complete", getWeibo);
document.addEventListener("DOMContentLoaded", getWeibo);

function getWeibo() {
  fetch("")
    .then((data) => data.json())
    .then((data) => {
      // 这里要写上你的API!!!
      let html =
        "<style>.weibo-new{background:#ff3852}.weibo-hot{background:#ff9406}.weibo-jyzy{background:#ffc000}.weibo-recommend{background:#00b7ee}.weibo-adrecommend{background:#febd22}.weibo-friend{background:#8fc21e}.weibo-boom{background:#bd0000}.weibo-topic{background:#ff6f49}.weibo-topic-ad{background:#4dadff}.weibo-boil{background:#f86400}#weibo-container{overflow-y:auto;-ms-overflow-style:none;scrollbar-width:none}#weibo-container::-webkit-scrollbar{display:none}.weibo-list-item{display:flex;flex-direction:row;justify-content:space-between;flex-wrap:nowrap}.weibo-title{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-right:auto}.weibo-num{float:right}.weibo-hotness{display:inline-block;padding:0 6px;transform:scale(.8) translateX(-3px);color:#fff;border-radius:8px}</style>";
      html += '<div class="weibo-list">';
      let hotness = {
        爆: "weibo-boom",
        热: "weibo-hot",
        沸: "weibo-boil",
        新: "weibo-new",
        荐: "weibo-recommend",
        音: "weibo-jyzy",
        影: "weibo-jyzy",
        剧: "weibo-jyzy",
        综: "weibo-jyzy",
      };
      for (let item of data) {
        html +=
          '<div class="weibo-list-item"><div class="weibo-hotness ' +
          hotness[item.hot || "荐"] +
          '">' +
          (item.hot || "荐") +
          "</div>" +
          '<span class="weibo-title"><a title="' +
          item.title +
          '"href="' +
          item.url +
          '" target="_blank" rel="external nofollow noreferrer" style="color:#a08ed5">' +
          item.title +
          "</a></span>" +
          '<div class="weibo-num"><span>' +
          item.num +
          "</span></div></div>";
      }
      html += "</div>";
      document.getElementById("weibo-container").innerHTML = html;
    })
    .catch(function (error) {
      console.log(error);
    });
}

/* 微博热搜 end */

//----------------------------------------------------------------

/* 禁用f12与按键防抖 start */
// 防抖全局计时器
let TT = null; //time用来控制事件的触发
// 防抖函数:fn->逻辑 time->防抖时间
function debounce(fn, time) {
  if (TT !== null) clearTimeout(TT);
  TT = setTimeout(fn, time);
}

// 复制提醒
document.addEventListener("copy", function () {
  debounce(function () {
    new Vue({
      data: function () {
        this.$notify({
          title: "哎嘿！复制成功🍬",
          message: "若要转载最好保留原文链接哦，给你一个大大的赞！",
          position: "top-left",
          offset: 50,
          showClose: true,
          type: "success",
          duration: 5000,
        });
      },
    });
  }, 300);
});

// f12提醒但不禁用
document.onkeydown = function (e) {
  if (
    123 == e.keyCode ||
    (e.ctrlKey &&
      e.shiftKey &&
      (74 === e.keyCode || 73 === e.keyCode || 67 === e.keyCode)) ||
    (e.ctrlKey && 85 === e.keyCode)
  ) {
    debounce(function () {
      new Vue({
        data: function () {
          this.$notify({
            title: "你已被发现😜",
            message: "小伙子，扒源记住要遵循GPL协议哦！",
            position: "top-left",
            offset: 50,
            showClose: true,
            type: "warning",
            duration: 5000,
          });
        },
      });
    }, 300);
  }
};
/* 禁用f12与按键防抖 end */

//----------------------------------------------------------------

/* 雪花特效 start */
if (
  navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )
) {
  // 移动端不显示
} else {
  // document.write('<canvas id="snow" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:-2;pointer-events:none"></canvas>');

  window &&
    (() => {
      let e = {
        flakeCount: 50, // 雪花数目
        minDist: 150, // 最小距离
        color: "255, 255, 255", // 雪花颜色
        size: 1.5, // 雪花大小
        speed: 0.5, // 雪花速度
        opacity: 0.7, // 雪花透明度
        stepsize: 0.5, // 步距
      };
      const t =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (e) {
          window.setTimeout(e, 1e3 / 60);
        };
      window.requestAnimationFrame = t;
      const i = document.getElementById("snow"),
        n = i.getContext("2d"),
        o = e.flakeCount;
      let a = -100,
        d = -100,
        s = [];
      (i.width = window.innerWidth), (i.height = window.innerHeight);
      const h = () => {
        n.clearRect(0, 0, i.width, i.height);
        const r = e.minDist;
        for (let t = 0; t < o; t++) {
          let o = s[t];
          const h = a,
            w = d,
            m = o.x,
            c = o.y,
            p = Math.sqrt((h - m) * (h - m) + (w - c) * (w - c));
          if (p < r) {
            const e = (h - m) / p,
              t = (w - c) / p,
              i = r / (p * p) / 2;
            (o.velX -= i * e), (o.velY -= i * t);
          } else
            (o.velX *= 0.98),
              o.velY < o.speed &&
              o.speed - o.velY > 0.01 &&
              (o.velY += 0.01 * (o.speed - o.velY)),
              (o.velX += Math.cos((o.step += 0.05)) * o.stepSize);
          (n.fillStyle = "rgba(" + e.color + ", " + o.opacity + ")"),
            (o.y += o.velY),
            (o.x += o.velX),
            (o.y >= i.height || o.y <= 0) && l(o),
            (o.x >= i.width || o.x <= 0) && l(o),
            n.beginPath(),
            n.arc(o.x, o.y, o.size, 0, 2 * Math.PI),
            n.fill();
        }
        t(h);
      },
        l = (e) => {
          (e.x = Math.floor(Math.random() * i.width)),
            (e.y = 0),
            (e.size = 3 * Math.random() + 2),
            (e.speed = 1 * Math.random() + 0.5),
            (e.velY = e.speed),
            (e.velX = 0),
            (e.opacity = 0.5 * Math.random() + 0.3);
        };
      document.addEventListener("mousemove", (e) => {
        (a = e.clientX), (d = e.clientY);
      }),
        window.addEventListener("resize", () => {
          (i.width = window.innerWidth), (i.height = window.innerHeight);
        }),
        (() => {
          for (let t = 0; t < o; t++) {
            const t = Math.floor(Math.random() * i.width),
              n = Math.floor(Math.random() * i.height),
              o = 3 * Math.random() + e.size,
              a = 1 * Math.random() + e.speed,
              d = 0.5 * Math.random() + e.opacity;
            s.push({
              speed: a,
              velX: 0,
              velY: a,
              x: t,
              y: n,
              size: o,
              stepSize: (Math.random() / 30) * e.stepsize,
              step: 0,
              angle: 180,
              opacity: d,
            });
          }
          h();
        })();
    })();
}

/* 雪花特效 end */

//----------------------------------------------------------------

/* 星空特效 start */
function dark() {
  window.requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
  var n,
    e,
    i,
    h,
    t = 0.05,
    s = document.getElementById("universe"),
    o = !0,
    a = "180,184,240",
    r = "226,225,142",
    d = "226,225,224",
    c = [];

  function f() {
    (n = window.innerWidth),
      (e = window.innerHeight),
      (i = 0.216 * n),
      s.setAttribute("width", n),
      s.setAttribute("height", e);
  }
  function u() {
    h.clearRect(0, 0, n, e);
    for (var t = c.length, i = 0; i < t; i++) {
      var s = c[i];
      s.move(), s.fadeIn(), s.fadeOut(), s.draw();
    }
  }
  function y() {
    (this.reset = function () {
      (this.giant = m(3)),
        (this.comet = !this.giant && !o && m(10)),
        (this.x = l(0, n - 10)),
        (this.y = l(0, e)),
        (this.r = l(1.1, 2.6)),
        (this.dx = l(t, 6 * t) + (this.comet + 1 - 1) * t * l(50, 120) + 2 * t),
        (this.dy = -l(t, 6 * t) - (this.comet + 1 - 1) * t * l(50, 120)),
        (this.fadingOut = null),
        (this.fadingIn = !0),
        (this.opacity = 0),
        (this.opacityTresh = l(0.2, 1 - 0.4 * (this.comet + 1 - 1))),
        (this.do = l(5e-4, 0.002) + 0.001 * (this.comet + 1 - 1));
    }),
      (this.fadeIn = function () {
        this.fadingIn &&
          ((this.fadingIn = !(this.opacity > this.opacityTresh)),
            (this.opacity += this.do));
      }),
      (this.fadeOut = function () {
        this.fadingOut &&
          ((this.fadingOut = !(this.opacity < 0)),
            (this.opacity -= this.do / 2),
            (this.x > n || this.y < 0) && ((this.fadingOut = !1), this.reset()));
      }),
      (this.draw = function () {
        if ((h.beginPath(), this.giant))
          (h.fillStyle = "rgba(" + a + "," + this.opacity + ")"),
            h.arc(this.x, this.y, 2, 0, 2 * Math.PI, !1);
        else if (this.comet) {
          (h.fillStyle = "rgba(" + d + "," + this.opacity + ")"),
            h.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, !1);
          for (var t = 0; t < 30; t++)
            (h.fillStyle =
              "rgba(" +
              d +
              "," +
              (this.opacity - (this.opacity / 20) * t) +
              ")"),
              h.rect(
                this.x - (this.dx / 4) * t,
                this.y - (this.dy / 4) * t - 2,
                2,
                2
              ),
              h.fill();
        } else
          (h.fillStyle = "rgba(" + r + "," + this.opacity + ")"),
            h.rect(this.x, this.y, this.r, this.r);
        h.closePath(), h.fill();
      }),
      (this.move = function () {
        (this.x += this.dx),
          (this.y += this.dy),
          !1 === this.fadingOut && this.reset(),
          (this.x > n - n / 4 || this.y < 0) && (this.fadingOut = !0);
      }),
      setTimeout(function () {
        o = !1;
      }, 50);
  }
  function m(t) {
    return Math.floor(1e3 * Math.random()) + 1 < 10 * t;
  }
  function l(t, i) {
    return Math.random() * (i - t) + t;
  }
  f(),
    window.addEventListener("resize", f, !1),
    (function () {
      h = s.getContext("2d");
      for (var t = 0; t < i; t++) (c[t] = new y()), c[t].reset();
      u();
    })(),
    (function t() {
      document.getElementsByTagName("html")[0].getAttribute("data-theme") ==
        "dark" && u(),
        window.requestAnimationFrame(t);
    })();
}
dark();
/* 星空特效 end */

//----------------------------------------------------------------

/* 樱花飘落特效 */
var stop, staticx;
var img = new Image();
if (localStorage.getItem("sakuraItem") == "maple") {
  img.src = "https://oss.iuoyt.com/resource/elements/202202251325420.webp"; // 枫叶
} else {
  img.src =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUgAAAEwCAYAAADVZeifAAAACXBIWXMAAACYAAAAmAGiyIKYAAAHG2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBSaWdodHM9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9yaWdodHMvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcFJpZ2h0czpNYXJrZWQ9IkZhbHNlIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NDFDMjQxQjYyNjIwNjgxMTgwODNEMjE2MDAzOTU1NDQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDozNDVjOWViOC04NDc4LTFkNDctOGRjMi0yZDkyOGNhYTYxZWQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YjAzN2ZiMGItNTU5Mi0xYjRkLWJjZGQtOWU4NGExMDJiMGM2IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTA1LTA5VDE0OjQ5OjM3KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOC0wNS0wOVQxNDo1MToyNSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOC0wNS0wOVQxNDo1MToyNSswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjEyMjVlZWE3LTEyY2QtMTY0NC04ZDAzLWFjOTE2ZTAxZDQ1YyIgc3RSZWY6ZG9jdW1lbnRJRD0idXVpZDoxRDIwNUFGNjZCRDlFNTExOUM5REMwMzg2RjlEQjFGNyIvPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphYmMzNjIzMy1hOWNkLWNiNDQtODViYi0zZTgyMjEwYmIxMjYiIHN0RXZ0OndoZW49IjIwMTgtMDUtMDlUMTQ6NTE6MjUrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YjAzN2ZiMGItNTU5Mi0xYjRkLWJjZGQtOWU4NGExMDJiMGM2IiBzdEV2dDp3aGVuPSIyMDE4LTA1LTA5VDE0OjUxOjI1KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2Vx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";
  localStorage.setItem("sakuraItem", "sakura");
}

function Sakura(x, y, s, r, fn) {
  this.x = x;
  this.y = y;
  this.s = s;
  this.r = r;
  this.fn = fn;
}
Sakura.prototype.draw = function (cxt) {
  cxt.save();
  var xc = (20 * this.s) / 2;
  cxt.translate(this.x, this.y);
  cxt.rotate(this.r);
  cxt.drawImage(img, 0, 0, 20 * this.s, 20 * this.s);
  cxt.restore();
};
Sakura.prototype.update = function () {
  this.x = this.fn.x(this.x, this.y);
  this.y = this.fn.y(this.y, this.y);
  this.r = this.fn.r(this.r);
  if (
    this.x > window.innerWidth ||
    this.x < 0 ||
    this.y > window.innerHeight ||
    this.y < 0
  ) {
    this.r = getRandom("fnr");
    if (Math.random() > 0.4) {
      this.x = getRandom("x");
      this.y = 0;
      this.s = getRandom("s");
      this.r = getRandom("r");
    } else {
      this.x = window.innerWidth;
      this.y = getRandom("y");
      this.s = getRandom("s");
      this.r = getRandom("r");
    }
  }
};
SakuraList = function () {
  this.list = [];
};
SakuraList.prototype.push = function (sakura) {
  this.list.push(sakura);
};
SakuraList.prototype.update = function () {
  for (var i = 0, len = this.list.length; i < len; i++) {
    this.list[i].update();
  }
};
SakuraList.prototype.draw = function (cxt) {
  for (var i = 0, len = this.list.length; i < len; i++) {
    this.list[i].draw(cxt);
  }
};
SakuraList.prototype.get = function (i) {
  return this.list[i];
};
SakuraList.prototype.size = function () {
  return this.list.length;
};

function getRandom(option) {
  var ret, random;
  switch (option) {
    case "x":
      ret = Math.random() * window.innerWidth;
      break;
    case "y":
      ret = Math.random() * window.innerHeight;
      break;
    case "s":
      ret = Math.random();
      break;
    case "r":
      ret = Math.random() * 4;
      break;
    case "fnx":
      random = -0.5 + Math.random() * 1;
      ret = function (x, y) {
        return x + 0.5 * random - 1.7;
      };
      break;
    case "fny":
      random = 1.5 + Math.random() * 0.7;
      ret = function (x, y) {
        return y + random;
      };
      break;
    case "fnr":
      random = Math.random() * 0.03;
      ret = function (r) {
        return r + random;
      };
      break;
  }
  return ret;
}

function startSakura() {
  requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame;
  // var canvas = document.createElement("canvas"),
  var canvas = document.getElementById("canvas_sakura"),
    cxt;
  staticx = true;
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  var dspl = localStorage.getItem("sakura");
  canvas.setAttribute(
    "style",
    "position: fixed;left: 0;top: 0;pointer-events: none; display: " + dspl
  );
  // canvas.setAttribute("id", "canvas_sakura");
  document.getElementsByTagName("body")[0].appendChild(canvas);
  cxt = canvas.getContext("2d");
  var sakuraList = new SakuraList();
  for (var i = 0; i < 50; i++) {
    var sakura, randomX, randomY, randomS, randomR, randomFnx, randomFny;
    randomX = getRandom("x");
    randomY = getRandom("y");
    randomR = getRandom("r");
    randomS = getRandom("s");
    randomFnx = getRandom("fnx");
    randomFny = getRandom("fny");
    randomFnR = getRandom("fnr");
    sakura = new Sakura(randomX, randomY, randomS, randomR, {
      x: randomFnx,
      y: randomFny,
      r: randomFnR,
    });
    sakura.draw(cxt);
    sakuraList.push(sakura);
  }
  stop = requestAnimationFrame(function () {
    cxt.clearRect(0, 0, canvas.width, canvas.height);
    sakuraList.update();
    sakuraList.draw(cxt);
    stop = requestAnimationFrame(arguments.callee);
  });
}
window.onresize = function () {
  var canvasSnow = document.getElementById("canvas_snow");
};
img.onload = function () {
  startSakura();
};

function stopp() {
  if (staticx) {
    var child = document.getElementById("canvas_sakura");
    child.parentNode.removeChild(child);
    window.cancelAnimationFrame(stop);
    staticx = false;
  } else {
    startSakura();
  }
}

/* 樱花飘落特效end */

//----------------------------------------------------------------
/* 表情放大 start */
document.addEventListener("pjax:complete", function () {
  if (document.getElementById("post-comment")) owoBig();
});
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("post-comment")) owoBig();
});

// 表情放大
function owoBig() {
  let flag = 1, // 设置节流阀
    owo_time = "", // 设置计时器
    m = 3; // 设置放大倍数
  // 创建盒子
  let div = document.createElement("div"),
    body = document.querySelector("body");
  // 设置ID
  div.id = "owo-big";
  // 插入盒子
  body.appendChild(div);

  // 构造observer
  let observer = new MutationObserver((mutations) => {
    for (let i = 0; i < mutations.length; i++) {
      let dom = mutations[i].addedNodes,
        owo_body = "";
      if (dom.length == 2 && dom[1].className == "OwO-body") owo_body = dom[1];
      // 如果需要在评论内容中启用此功能请解除下面的注释
      // else if (dom.length == 1 && dom[0].className == 'tk-comment') owo_body = dom[0];
      else continue;

      // 禁用右键（手机端长按会出现右键菜单，为了体验给禁用掉）
      if (document.body.clientWidth <= 768)
        owo_body.addEventListener("contextmenu", (e) => e.preventDefault());
      // 鼠标移入
      owo_body.onmouseover = (e) => {
        if (flag && e.target.tagName == "IMG") {
          flag = 0;
          // 移入300毫秒后显示盒子
          owo_time = setTimeout(() => {
            let height = e.path[0].clientHeight * m, // 盒子高
              width = e.path[0].clientWidth * m, // 盒子宽
              left = e.x - e.offsetX - (width - e.path[0].clientWidth) / 2, // 盒子与屏幕左边距离
              top = e.y - e.offsetY; // 盒子与屏幕顶部距离

            if (left + width > body.clientWidth)
              left -= left + width - body.clientWidth + 10; // 右边缘检测，防止超出屏幕
            if (left < 0) left = 10; // 左边缘检测，防止超出屏幕
            // 设置盒子样式
            div.style.cssText = `display:flex; height:${height}px; width:${width}px; left:${left}px; top:${top}px;`;
            // 在盒子中插入图片
            div.innerHTML = `<img src="${e.target.src}">`;
          }, 300);
        }
      };
      // 鼠标移出隐藏盒子
      owo_body.onmouseout = () => {
        (div.style.display = "none"), (flag = 1), clearTimeout(owo_time);
      };
    }
  });
  observer.observe(document.getElementById("post-comment"), {
    subtree: true,
    childList: true,
  });
}
/* 表情放大 end */

//----------------------------------------------------------------

/* 随便逛逛 start */
// 随便逛逛
// 发现有时会和当前页面重复，加一个判断
function randomPost() {
  fetch("/baidusitemap.xml")
    .then((res) => res.text())
    .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
    .then((data) => {
      let ls = data.querySelectorAll("url loc");
      while (true) {
        let url = ls[Math.floor(Math.random() * ls.length)].innerHTML;
        if (location.href == url) continue;
        location.href = url;
        return;
      }
    });
}
/* 随便逛逛 end */

//----------------------------------------------------------------

/* 小猫咪 start */
var picSrc = "https://oss.iuoyt.com/resource/elements/autumn-kitty.png";
var seasonGreet = "回到顶部";
var date = new Date();
var month = date.getMonth() + 1;
var day = date.getDate();
if (month == 3 && day >= 21 || month == 4 || month == 5 || month == 6 && day <= 21) {
  seasonGreet = "春天啦";
  picSrc = "https://oss.iuoyt.com/resource/elements/spring-bird.png";
} else if (month == 6 && day >= 22 || month == 7 || month == 8 || month == 9 && day <= 22) {
  seasonGreet = "夏天啦";
  picSrc = "https://oss.iuoyt.com/resource/elements/summer-sun.png";
} else if (month == 9 && day >= 23 || month == 10 || month == 11 || month == 12 && day <= 21) {
  seasonGreet = "秋天啦";
  picSrc = "https://oss.iuoyt.com/resource/elements/autumn-kitty.png";
} else if (month == 12 && day >= 22 || month == 1 || month == 2 || month == 3 && day <= 20) {
  seasonGreet = "冬天啦";
  picSrc = "https://oss.iuoyt.com/resource/elements/winter-snowman.png";
}
if (document.body.clientWidth > 1080) {
  function getBasicInfo() {
    /* 窗口高度 */
    var ViewH = $(window).height();
    /* document高度 */
    var DocH = $("body")[0].scrollHeight;
    /* 滚动的高度 */
    var ScrollTop = $(window).scrollTop();
    /* 可滚动的高度 */
    var S_V = DocH - ViewH;
    var Band_H = (ScrollTop / (DocH - ViewH)) * 100;
    return {
      ViewH: ViewH,
      DocH: DocH,
      ScrollTop: ScrollTop,
      Band_H: Band_H,
      S_V: S_V,
    };
  }
  function show(basicInfo) {
    if (basicInfo.ScrollTop > 0.001) {
      $(".neko").css("display", "block");
    } else {
      $(".neko").css("display", "none");
    }
  }
  (function ($) {
    $.fn.nekoScroll = function (option) {
      var defaultSetting = {
        top: "0",
        scroWidth: 6 + "px",
        z_index: 9999,
        zoom: 0.9,
        borderRadius: 5 + "px",
        right: 55.6 + "px",
        nekoImg: picSrc,
        hoverMsg: seasonGreet,
        color: "var(--theme-color)",
        during: 500,
        blog_body: "body",
      };
      var setting = $.extend(defaultSetting, option);
      var getThis =
        this.prop("className") !== ""
          ? "." + this.prop("className")
          : this.prop("id") !== ""
            ? "#" + this.prop("id")
            : this.prop("nodeName");
      if ($(".neko").length == 0) {
        this.after(
          '<div class="neko" id=' +
          setting.nekoname +
          ' data-msg="' +
          setting.hoverMsg +
          '"></div>'
        );
      }
      let basicInfo = getBasicInfo();
      $(getThis).css({
        position: "fixed",
        width: setting.scroWidth,
        top: setting.top,
        height: basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 + "px",
        "z-index": setting.z_index,
        "background-color": setting.bgcolor,
        "border-radius": setting.borderRadius,
        right: setting.right,
        "background-image": "url(" + setting.scImg + ")",
        "background-image":
          "-webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent)",
        "border-radius": "2em",
        "background-size": "contain",
      });
      $("#" + setting.nekoname).css({
        position: "fixed",
        top:
          basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 - 50 + "px",
        "z-index": setting.z_index * 10,
        right: setting.right,
        "background-image": "url(" + setting.nekoImg + ")",
      });
      show(getBasicInfo());
      $(window).scroll(function () {
        let basicInfo = getBasicInfo();
        show(basicInfo);
        $(getThis).css({
          position: "fixed",
          width: setting.scroWidth,
          top: setting.top,
          height:
            basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 + "px",
          "z-index": setting.z_index,
          "background-color": setting.bgcolor,
          "border-radius": setting.borderRadius,
          right: setting.right,
          "background-image": "url(" + setting.scImg + ")",
          "background-image":
            "-webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent)",
          "border-radius": "2em",
          "background-size": "contain",
        });
        $("#" + setting.nekoname).css({
          position: "fixed",
          top:
            basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 -
            50 +
            "px",
          "z-index": setting.z_index * 10,
          right: setting.right,
          "background-image": "url(" + setting.nekoImg + ")",
        });
        if (basicInfo.ScrollTop == basicInfo.S_V) {
          $("#" + setting.nekoname).addClass("showMsg");
        } else {
          $("#" + setting.nekoname).removeClass("showMsg");
          $("#" + setting.nekoname).attr("data-msg", setting.hoverMsg);
        }
      });
      this.click(function (e) {
        btf.scrollToDest(0, 500);
      });
      $("#" + setting.nekoname).click(function () {
        btf.scrollToDest(0, 500);
      });
      return this;
    };
  })(jQuery);

  $(document).ready(function () {
    //部分自定义
    $("#myscoll").nekoScroll({
      bgcolor: "rgb(0 0 0 / .5)", //背景颜色，没有绳子背景图片时有效
      borderRadius: "2em",
      zoom: 0.9,
    });
    //自定义（去掉以下注释，并注释掉其他的查看效果）
    /*
    $("#myscoll").nekoScroll({
        nekoname:'neko1', //nekoname，相当于id
        nekoImg:'img/猫咪.png', //neko的背景图片
        scImg:"img/绳1.png", //绳子的背景图片
        bgcolor:'#1e90ff', //背景颜色，没有绳子背景图片时有效
        zoom:0.9, //绳子长度的缩放值
        hoverMsg:'你好~喵', //鼠标浮动到neko上方的对话框信息
        right:'100px', //距离页面右边的距离
        fontFamily:'楷体', //对话框字体
        fontSize:'14px', //对话框字体的大小
        color:'#1e90ff', //对话框字体颜色
        scroWidth:'8px', //绳子的宽度
        z_index:100, //不用解释了吧
        during:1200, //从顶部到底部滑动的时长
    });
    */
  });
}

/* 小猫咪 end */

//----------------------------------------------------------------

/* 右键菜单 start */
function setMask() {
  //设置遮罩
  if (document.getElementsByClassName("rmMask")[0] != undefined)
    return document.getElementsByClassName("rmMask")[0];
  mask = document.createElement("div");
  mask.className = "rmMask";
  mask.style.width = window.innerWidth + "px";
  mask.style.height = window.innerHeight + "px";
  mask.style.background = "#fff";
  mask.style.opacity = ".0";
  mask.style.position = "fixed";
  mask.style.top = "0";
  mask.style.left = "0";
  mask.style.zIndex = 998;
  document.body.appendChild(mask);
  document.getElementById("rightMenu").style.zIndex = 19198;
  return mask;
}

function insertAtCursor(myField, myValue) {
  //IE 浏览器
  if (document.selection) {
    myField.focus();
    sel = document.selection.createRange();
    sel.text = myValue;
    sel.select();
  }

  //FireFox、Chrome等
  else if (myField.selectionStart || myField.selectionStart == "0") {
    var startPos = myField.selectionStart;
    var endPos = myField.selectionEnd;

    // 保存滚动条
    var restoreTop = myField.scrollTop;
    myField.value =
      myField.value.substring(0, startPos) +
      myValue +
      myField.value.substring(endPos, myField.value.length);

    if (restoreTop > 0) {
      myField.scrollTop = restoreTop;
    }

    myField.focus();
    myField.selectionStart = startPos + myValue.length;
    myField.selectionEnd = startPos + myValue.length;
  } else {
    myField.value += myValue;
    myField.focus();
  }
}

let rmf = {};
rmf.showRightMenu = function (isTrue, x = 0, y = 0) {
  let $rightMenu = $("#rightMenu");
  $rightMenu.css("top", x + "px").css("left", y + "px");

  if (isTrue) {
    $rightMenu.show();
  } else {
    $rightMenu.hide();
  }
};

rmf.copyWordsLink = function () {
  let url = window.location.href;
  let txa = document.createElement("textarea");
  txa.value = url;
  document.body.appendChild(txa);
  txa.select();
  document.execCommand("Copy");
  document.body.removeChild(txa);
};
rmf.switchReadMode = function () {
  const $body = document.body;
  $body.classList.add("read-mode");
  const newEle = document.createElement("button");
  newEle.type = "button";
  newEle.className = "fas fa-sign-out-alt exit-readmode";
  $body.appendChild(newEle);

  function clickFn() {
    $body.classList.remove("read-mode");
    newEle.remove();
    newEle.removeEventListener("click", clickFn);
  }

  newEle.addEventListener("click", clickFn);
};

//复制选中文字
rmf.copySelect = function () {
  document.execCommand("Copy", false, null);
};

//回到顶部
rmf.scrollToTop = function () {
  document.getElementsByClassName("menus_items")[1].setAttribute("style", "");
  document
    .getElementById("name-container")
    .setAttribute("style", "display:none");
  btf.scrollToDest(0, 500);
};

document.body.addEventListener("touchmove", function () { }, { passive: false });

function popupMenu() {
  window.oncontextmenu = function (event) {
    // if (event.ctrlKey) return true;

    // 当关掉自定义右键时候直接返回
    if (mouseMode == "off") return true;

    $(".rightMenu-group.hide").hide();
    if (document.getSelection().toString()) {
      $("#menu-text").show();
    }
    if (document.getElementById("post")) {
      $("#menu-post").show();
    } else {
      if (document.getElementById("page")) {
        $("#menu-post").show();
      }
    }
    var el = window.document.body;
    el = event.target;
    var a =
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
    if (a.test(window.getSelection().toString()) && el.tagName != "A") {
      $("#menu-too").show();
    }
    if (el.tagName == "A") {
      $("#menu-to").show();
      rmf.open = function () {
        if (
          (el.href.indexOf("http://") == -1 &&
            el.href.indexOf("https://") == -1) ||
          el.href.indexOf("iuoyt.com") != -1
        ) {
          pjax.loadUrl(el.href);
        } else {
          location.href = el.href;
        }
      };
      rmf.openWithNewTab = function () {
        window.open(el.href);
        // window.location.reload();
      };
      rmf.copyLink = function () {
        let url = el.href;
        let txa = document.createElement("textarea");
        txa.value = url;
        document.body.appendChild(txa);
        txa.select();
        document.execCommand("Copy");
        document.body.removeChild(txa);
      };
    } else if (el.tagName == "IMG") {
      $("#menu-img").show();
      rmf.openWithNewTab = function () {
        window.open(el.src);
        // window.location.reload();
      };
      rmf.click = function () {
        el.click();
      };
      rmf.copyLink = function () {
        let url = el.src;
        let txa = document.createElement("textarea");
        txa.value = url;
        document.body.appendChild(txa);
        txa.select();
        document.execCommand("Copy");
        document.body.removeChild(txa);
      };
      rmf.saveAs = function () {
        var a = document.createElement("a");
        var url = el.src;
        var filename = url.split("/")[-1];
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      };
    } else if (el.tagName == "TEXTAREA" || el.tagName == "INPUT") {
      $("#menu-paste").show();
      rmf.paste = function () {
        navigator.permissions
          .query({
            name: "clipboard-read",
          })
          .then((result) => {
            if (result.state == "granted" || result.state == "prompt") {
              //读取剪贴板
              navigator.clipboard.readText().then((text) => {
                console.log(text);
                insertAtCursor(el, text);
              });
            } else {
              Snackbar.show({
                text: "请允许读取剪贴板！",
                pos: "top-center",
                showAction: false,
              });
            }
          });
      };
    }
    let pageX = event.clientX + 10;
    let pageY = event.clientY;
    let rmWidth = $("#rightMenu").width();
    let rmHeight = $("#rightMenu").height();
    if (pageX + rmWidth > window.innerWidth) {
      pageX -= rmWidth + 10;
    }
    if (pageY + rmHeight > window.innerHeight) {
      pageY -= pageY + rmHeight - window.innerHeight;
    }
    mask = setMask();
    // 滚动消失的代码和阅读进度有冲突，因此放到readPercent.js里面了
    $(".rightMenu-item").click(() => {
      $(".rmMask").attr("style", "display: none");
    });
    $(window).resize(() => {
      rmf.showRightMenu(false);
      $(".rmMask").attr("style", "display: none");
    });
    mask.onclick = () => {
      $(".rmMask").attr("style", "display: none");
    };
    rmf.showRightMenu(true, pageY, pageX);
    $(".rmMask").attr("style", "display: flex");
    return false;
  };

  window.addEventListener("click", function () {
    rmf.showRightMenu(false);
  });
}
if (
  !navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )
) {
  popupMenu();
}
const box = document.documentElement;

function addLongtabListener(target, callback) {
  let timer = 0; // 初始化timer

  target.ontouchstart = () => {
    timer = 0; // 重置timer
    timer = setTimeout(() => {
      callback();
      timer = 0;
    }, 380); // 超时器能成功执行，说明是长按
  };

  target.ontouchmove = () => {
    clearTimeout(timer); // 如果来到这里，说明是滑动
    timer = 0;
  };

  target.ontouchend = () => {
    // 到这里如果timer有值，说明此触摸时间不足380ms，是点击
    if (timer) {
      clearTimeout(timer);
    }
  };
}

addLongtabListener(box, popupMenu);

// 全屏
rmf.fullScreen = function () {
  if (document.fullscreenElement) document.exitFullscreen();
  else document.documentElement.requestFullscreen();
};

// 右键开关
if (localStorage.getItem("mouse") == undefined) {
  localStorage.setItem("mouse", "on");
}
var mouseMode = localStorage.getItem("mouse");
function changeMouseMode() {
  if (localStorage.getItem("mouse") == "on") {
    mouseMode = "off";
    localStorage.setItem("mouse", "off");
    debounce(function () {
      new Vue({
        data: function () {
          this.$notify({
            title: "切换右键模式成功🍔",
            message: "当前鼠标右键已恢复为系统默认！",
            position: "top-left",
            offset: 50,
            showClose: true,
            type: "success",
            duration: 5000,
          });
        },
      });
    }, 300);
  } else {
    mouseMode = "on";
    localStorage.setItem("mouse", "on");
    debounce(function () {
      new Vue({
        data: function () {
          this.$notify({
            title: "切换右键模式成功🍔",
            message: "当前鼠标右键已更换为网站指定样式！",
            position: "top-left",
            offset: 50,
            showClose: true,
            type: "success",
            duration: 5000,
          });
        },
      });
    }, 300);
  }
}
/* 右键菜单 end */

//----------------------------------------------------------------

/* 控制台输出字符画 start */
var now1 = new Date();

function createtime1() {
  var grt = new Date("2023/07/12 18:52:27"); //此处修改你的建站时间或者网站上线时间
  now1.setTime(now1.getTime() + 250);
  var days = (now1 - grt) / 1000 / 60 / 60 / 24;
  var dnum = Math.floor(days);
  var copyright = "©2023-" + now1.getFullYear() + " By Royster";
  var grt_display =
    grt.getFullYear() +
    "-" +
    (grt.getMonth() + 1) +
    "-" +
    grt.getDate() +
    " " +
    grt.getHours() +
    ":" +
    grt.getMinutes() +
    ":" +
    grt.getSeconds() +
    "(GMT+08:00)";

  var ascll = [
    `欢迎来到🌙Nightyping!`,
    `
  
  ███╗   ██╗██╗ ██████╗ ██╗  ██╗████████╗██╗   ██╗██████╗ ██╗███╗   ██╗ ██████╗ 
  ████╗  ██║██║██╔════╝ ██║  ██║╚══██╔══╝╚██╗ ██╔╝██╔══██╗██║████╗  ██║██╔════╝ 
  ██╔██╗ ██║██║██║  ███╗███████║   ██║    ╚████╔╝ ██████╔╝██║██╔██╗ ██║██║  ███╗
  ██║╚██╗██║██║██║   ██║██╔══██║   ██║     ╚██╔╝  ██╔═══╝ ██║██║╚██╗██║██║   ██║
  ██║ ╚████║██║╚██████╔╝██║  ██║   ██║      ██║   ██║     ██║██║ ╚████║╚██████╔╝
  ╚═╝  ╚═══╝╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝      ╚═╝   ╚═╝     ╚═╝╚═╝  ╚═══╝ ╚═════╝ 
                                                                                
`,
    "小站已经存活",
    dnum,
    "天啦!",
    copyright,
    "站点上线时间：",
    grt_display
  ];

  setTimeout(
    console.log.bind(
      console,
      `\n%c${ascll[0]} %c ${ascll[1]} %c ${ascll[2]} %c${ascll[3]}%c ${ascll[4]}%c \n ${ascll[5]} \n ${ascll[6]} %c${ascll[7]}`,
      "color:#39c5bb",
      "",
      "",
      "color:#39c5bb",
      "",
      "",
      "color:#39c5bb"
    )
  );
}

createtime1();

function createtime2() {
  var ascll2 = [
    `NCC2-036`,
    `调用前置摄像头拍照成功，识别为「大聪明」`,
    `Photo captured: `,
    ` 🤪 `,
  ];

  setTimeout(
    console.log.bind(
      console,
      `%c ${ascll2[0]} %c ${ascll2[1]} %c \n${ascll2[2]} %c\n${ascll2[3]}`,
      "color:white; background-color:#10bcc0",
      "",
      "",
      'background:url("https://unpkg.zhimg.com/anzhiyu-assets@latest/image/common/tinggge.gif") no-repeat;font-size:450%'
    )
  );

  setTimeout(
    console.log.bind(
      console,
      "%c WELCOME %c 欢迎光临，大聪明",
      "color:white; background-color:#23c682",
      ""
    )
  );

  setTimeout(
    console.warn.bind(
      console,
      "%c ⚡ Powered by Nightyping %c 你正在访问🌙Nightyping",
      "color:white; background-color:#f0ad4e",
      ""
    )
  );

  setTimeout(
    console.log.bind(
      console,
      "%c W23-12 %c 系统监测到你已打开控制台",
      "color:white; background-color:#4f90d9",
      ""
    )
  );
  setTimeout(
    console.warn.bind(
      console,
      "%c S013-782 %c 你现在正处于监控中",
      "color:white; background-color:#d9534f",
      ""
    )
  );
}
createtime2();

// 重写console方法
console.log = function () { };
console.error = function () { };
console.warn = function () { };

/* 控制台输出字符画 end */

//----------------------------------------------------------------

/* 夜间模式切换动画 start */
function switchNightMode() {
  document
    .querySelector("body")
    .insertAdjacentHTML(
      "beforeend",
      '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"><div id="sun"></div><div id="moon"></div></div></div>'
    ),
    setTimeout(function () {
      document.querySelector("body").classList.contains("DarkMode")
        ? (document.querySelector("body").classList.remove("DarkMode"),
          localStorage.setItem("isDark", "0"),
          document
            .getElementById("modeicon")
            .setAttribute("xlink:href", "#icon-moon"))
        : (document.querySelector("body").classList.add("DarkMode"),
          localStorage.setItem("isDark", "1"),
          document
            .getElementById("modeicon")
            .setAttribute("xlink:href", "#icon-sun")),
        setTimeout(function () {
          document.getElementsByClassName(
            "Cuteen_DarkSky"
          )[0].style.transition = "opacity 3s";
          document.getElementsByClassName("Cuteen_DarkSky")[0].style.opacity =
            "0";
          setTimeout(function () {
            document.getElementsByClassName("Cuteen_DarkSky")[0].remove();
          }, 1e3);
        }, 2e3);
    });
  const nowMode =
    document.documentElement.getAttribute("data-theme") === "dark"
      ? "dark"
      : "light";
  if (nowMode === "light") {
    // 先设置太阳月亮透明度
    document.getElementById("sun").style.opacity = "1";
    document.getElementById("moon").style.opacity = "0";
    setTimeout(function () {
      document.getElementById("sun").style.opacity = "0";
      document.getElementById("moon").style.opacity = "1";
    }, 1000);

    activateDarkMode();
    saveToLocal.set("theme", "dark", 2);
    // GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
    document.getElementById("modeicon").setAttribute("xlink:href", "#icon-sun");
    // 延时弹窗提醒
    setTimeout(() => {
      new Vue({
        data: function () {
          this.$notify({
            title: "关灯啦🌙",
            message: "当前已成功切换至夜间模式！",
            position: "top-left",
            offset: 50,
            showClose: true,
            type: "success",
            duration: 5000,
          });
        },
      });
    }, 2000);
  } else {
    // 先设置太阳月亮透明度
    document.getElementById("sun").style.opacity = "0";
    document.getElementById("moon").style.opacity = "1";
    setTimeout(function () {
      document.getElementById("sun").style.opacity = "1";
      document.getElementById("moon").style.opacity = "0";
    }, 1000);

    activateLightMode();
    saveToLocal.set("theme", "light", 2);
    document.querySelector("body").classList.add("DarkMode"),
      document
        .getElementById("modeicon")
        .setAttribute("xlink:href", "#icon-moon");
    setTimeout(() => {
      new Vue({
        data: function () {
          this.$notify({
            title: "开灯啦🌞",
            message: "当前已成功切换至白天模式！",
            position: "top-left",
            offset: 50,
            showClose: true,
            type: "success",
            duration: 5000,
          });
        },
      });
    }, 2000);
  }
  // handle some cases
  typeof utterancesTheme === "function" && utterancesTheme();
  typeof FB === "object" && window.loadFBComment();
  window.DISQUS &&
    document.getElementById("disqus_thread").children.length &&
    setTimeout(() => window.disqusReset(), 200);
}

/* 夜间模式切换动画 end */

//----------------------------------------------------------------

/* 分享按钮 start */
// 分享本页
function share_() {
  let url = window.location.origin + window.location.pathname;
  try {
    // 截取标题
    var title = document.title;
    var subTitle = title.endsWith("| 🌙Nightyping")
      ? title.substring(0, title.length - 14)
      : title;
    navigator.clipboard.writeText(
      "来自🌙Nightyping博客的分享\n标题：" +
      subTitle +
      "\n链接：" +
      url +
      "\n期待你的来访！🍭🍭🍭"
    );
    new Vue({
      data: function () {
        this.$notify({
          title: "成功复制分享信息🎉",
          message: "您现在可以通过粘贴直接跟小伙伴分享了！",
          position: "top-left",
          offset: 50,
          showClose: true,
          type: "success",
          duration: 5000,
        });
        // return { visible: false }
      },
    });
  } catch (err) {
    console.error("复制失败！", err);
  }
  // new ClipboardJS(".share", { text: function () { return '标题：' + document.title + '\n链接：' + url } });
  // btf.snackbarShow("本页链接已复制到剪切板，快去分享吧~")
}

// 防抖
function share() {
  debounce(share_, 300);
}

/* 分享按钮 end */

//----------------------------------------------------------------

/* 恶搞标题 start */
//动态标题
var OriginTitile = document.title;
var titleTime;
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    //离开当前页面时标签显示内容
    document.title = "👀让我瞧瞧你去哪儿了~";
    clearTimeout(titleTime);
  } else {
    //返回当前页面时标签显示内容
    document.title = "😜嘻嘻被我抓住了吧～";
    //两秒后变回正常标题
    titleTime = setTimeout(function () {
      document.title = OriginTitile;
    }, 2000);
  }
});
/* 恶搞标题 end */

//----------------------------------------------------------------

/* 农历转换 start */
/**

* @1900-2100区间内的公历、农历互转

* @charset UTF-8

* @Author  jiangjiazhi

* @公历转农历：calendar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]

* @农历转公历：calendar.lunar2solar(1987,09,10); //[you can ignore params of prefix 0]

*/

/**

* 农历1900-2100的润大小信息表

* @Array Of Property

* @return Hex

*/

var lunarInfo = [
  0x04bd8,
  0x04ae0,
  0x0a570,
  0x054d5,
  0x0d260,
  0x0d950,
  0x16554,
  0x056a0,
  0x09ad0,
  0x055d2, // 1900-1909

  0x04ae0,
  0x0a5b6,
  0x0a4d0,
  0x0d250,
  0x1d255,
  0x0b540,
  0x0d6a0,
  0x0ada2,
  0x095b0,
  0x14977, // 1910-1919

  0x04970,
  0x0a4b0,
  0x0b4b5,
  0x06a50,
  0x06d40,
  0x1ab54,
  0x02b60,
  0x09570,
  0x052f2,
  0x04970, // 1920-1929

  0x06566,
  0x0d4a0,
  0x0ea50,
  0x06e95,
  0x05ad0,
  0x02b60,
  0x186e3,
  0x092e0,
  0x1c8d7,
  0x0c950, // 1930-1939

  0x0d4a0,
  0x1d8a6,
  0x0b550,
  0x056a0,
  0x1a5b4,
  0x025d0,
  0x092d0,
  0x0d2b2,
  0x0a950,
  0x0b557, // 1940-1949

  0x06ca0,
  0x0b550,
  0x15355,
  0x04da0,
  0x0a5b0,
  0x14573,
  0x052b0,
  0x0a9a8,
  0x0e950,
  0x06aa0, // 1950-1959

  0x0aea6,
  0x0ab50,
  0x04b60,
  0x0aae4,
  0x0a570,
  0x05260,
  0x0f263,
  0x0d950,
  0x05b57,
  0x056a0, // 1960-1969

  0x096d0,
  0x04dd5,
  0x04ad0,
  0x0a4d0,
  0x0d4d4,
  0x0d250,
  0x0d558,
  0x0b540,
  0x0b6a0,
  0x195a6, // 1970-1979

  0x095b0,
  0x049b0,
  0x0a974,
  0x0a4b0,
  0x0b27a,
  0x06a50,
  0x06d40,
  0x0af46,
  0x0ab60,
  0x09570, // 1980-1989

  0x04af5,
  0x04970,
  0x064b0,
  0x074a3,
  0x0ea50,
  0x06b58,
  0x05ac0,
  0x0ab60,
  0x096d5,
  0x092e0, // 1990-1999

  0x0c960,
  0x0d954,
  0x0d4a0,
  0x0da50,
  0x07552,
  0x056a0,
  0x0abb7,
  0x025d0,
  0x092d0,
  0x0cab5, // 2000-2009

  0x0a950,
  0x0b4a0,
  0x0baa4,
  0x0ad50,
  0x055d9,
  0x04ba0,
  0x0a5b0,
  0x15176,
  0x052b0,
  0x0a930, // 2010-2019

  0x07954,
  0x06aa0,
  0x0ad50,
  0x05b52,
  0x04b60,
  0x0a6e6,
  0x0a4e0,
  0x0d260,
  0x0ea65,
  0x0d530, // 2020-2029

  0x05aa0,
  0x076a3,
  0x096d0,
  0x04afb,
  0x04ad0,
  0x0a4d0,
  0x1d0b6,
  0x0d250,
  0x0d520,
  0x0dd45, // 2030-2039

  0x0b5a0,
  0x056d0,
  0x055b2,
  0x049b0,
  0x0a577,
  0x0a4b0,
  0x0aa50,
  0x1b255,
  0x06d20,
  0x0ada0, // 2040-2049

  0x14b63,
  0x09370,
  0x049f8,
  0x04970,
  0x064b0,
  0x168a6,
  0x0ea50,
  0x06b20,
  0x1a6c4,
  0x0aae0, // 2050-2059

  0x0a2e0,
  0x0d2e3,
  0x0c960,
  0x0d557,
  0x0d4a0,
  0x0da50,
  0x05d55,
  0x056a0,
  0x0a6d0,
  0x055d4, // 2060-2069

  0x052d0,
  0x0a9b8,
  0x0a950,
  0x0b4a0,
  0x0b6a6,
  0x0ad50,
  0x055a0,
  0x0aba4,
  0x0a5b0,
  0x052b0, // 2070-2079

  0x0b273,
  0x06930,
  0x07337,
  0x06aa0,
  0x0ad50,
  0x14b55,
  0x04b60,
  0x0a570,
  0x054e4,
  0x0d160, // 2080-2089

  0x0e968,
  0x0d520,
  0x0daa0,
  0x16aa6,
  0x056d0,
  0x04ae0,
  0x0a9d4,
  0x0a2d0,
  0x0d150,
  0x0f252, // 2090-2099

  0x0d520,
]; // 2100

var solarMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**

* 天干地支之天干速查表

* @Array Of Property trans['甲','乙','丙','丁','戊','己','庚','辛','壬','癸']

* @return Cn string

*/

var Gan = [
  "\u7532",
  "\u4e59",
  "\u4e19",
  "\u4e01",
  "\u620a",
  "\u5df1",
  "\u5e9a",
  "\u8f9b",
  "\u58ec",
  "\u7678",
];

/**

* 天干地支之地支速查表

* @Array Of Property

* @trans['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥']

* @return Cn string

*/

var Zhi = [
  "\u5b50",
  "\u4e11",
  "\u5bc5",
  "\u536f",
  "\u8fb0",
  "\u5df3",
  "\u5348",
  "\u672a",
  "\u7533",
  "\u9149",
  "\u620c",
  "\u4ea5",
];

/**

* 天干地支之地支速查表<=>生肖

* @Array Of Property

* @trans['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪']

* @return Cn string

*/

var Animals = [
  "\u9f20",
  "\u725b",
  "\u864e",
  "\u5154",
  "\u9f99",
  "\u86c7",
  "\u9a6c",
  "\u7f8a",
  "\u7334",
  "\u9e21",
  "\u72d7",
  "\u732a",
];

/**

* 24节气速查表

* @Array Of Property

* @trans['小寒','大寒','立春','雨水','惊蛰','春分','清明','谷雨','立夏','小满','芒种','夏至','小暑','大暑','立秋','处暑','白露','秋分','寒露','霜降','立冬','小雪','大雪','冬至']

* @return Cn string

*/

var solarTerm = [
  "\u5c0f\u5bd2",
  "\u5927\u5bd2",
  "\u7acb\u6625",
  "\u96e8\u6c34",
  "\u60ca\u86f0",
  "\u6625\u5206",
  "\u6e05\u660e",
  "\u8c37\u96e8",
  "\u7acb\u590f",
  "\u5c0f\u6ee1",
  "\u8292\u79cd",
  "\u590f\u81f3",
  "\u5c0f\u6691",
  "\u5927\u6691",
  "\u7acb\u79cb",
  "\u5904\u6691",
  "\u767d\u9732",
  "\u79cb\u5206",
  "\u5bd2\u9732",
  "\u971c\u964d",
  "\u7acb\u51ac",
  "\u5c0f\u96ea",
  "\u5927\u96ea",
  "\u51ac\u81f3",
];

/**

* 1900-2100各年的24节气日期速查表

* @Array Of Property

* @return 0x string For splice

*/

var sTermInfo = [
  "9778397bd097c36b0b6fc9274c91aa",
  "97b6b97bd19801ec9210c965cc920e",
  "97bcf97c3598082c95f8c965cc920f",

  "97bd0b06bdb0722c965ce1cfcc920f",
  "b027097bd097c36b0b6fc9274c91aa",
  "97b6b97bd19801ec9210c965cc920e",

  "97bcf97c359801ec95f8c965cc920f",
  "97bd0b06bdb0722c965ce1cfcc920f",
  "b027097bd097c36b0b6fc9274c91aa",

  "97b6b97bd19801ec9210c965cc920e",
  "97bcf97c359801ec95f8c965cc920f",
  "97bd0b06bdb0722c965ce1cfcc920f",

  "b027097bd097c36b0b6fc9274c91aa",
  "9778397bd19801ec9210c965cc920e",
  "97b6b97bd19801ec95f8c965cc920f",

  "97bd09801d98082c95f8e1cfcc920f",
  "97bd097bd097c36b0b6fc9210c8dc2",
  "9778397bd197c36c9210c9274c91aa",

  "97b6b97bd19801ec95f8c965cc920e",
  "97bd09801d98082c95f8e1cfcc920f",
  "97bd097bd097c36b0b6fc9210c8dc2",

  "9778397bd097c36c9210c9274c91aa",
  "97b6b97bd19801ec95f8c965cc920e",
  "97bcf97c3598082c95f8e1cfcc920f",

  "97bd097bd097c36b0b6fc9210c8dc2",
  "9778397bd097c36c9210c9274c91aa",
  "97b6b97bd19801ec9210c965cc920e",

  "97bcf97c3598082c95f8c965cc920f",
  "97bd097bd097c35b0b6fc920fb0722",
  "9778397bd097c36b0b6fc9274c91aa",

  "97b6b97bd19801ec9210c965cc920e",
  "97bcf97c3598082c95f8c965cc920f",
  "97bd097bd097c35b0b6fc920fb0722",

  "9778397bd097c36b0b6fc9274c91aa",
  "97b6b97bd19801ec9210c965cc920e",
  "97bcf97c359801ec95f8c965cc920f",

  "97bd097bd097c35b0b6fc920fb0722",
  "9778397bd097c36b0b6fc9274c91aa",
  "97b6b97bd19801ec9210c965cc920e",

  "97bcf97c359801ec95f8c965cc920f",
  "97bd097bd097c35b0b6fc920fb0722",
  "9778397bd097c36b0b6fc9274c91aa",

  "97b6b97bd19801ec9210c965cc920e",
  "97bcf97c359801ec95f8c965cc920f",
  "97bd097bd07f595b0b6fc920fb0722",

  "9778397bd097c36b0b6fc9210c8dc2",
  "9778397bd19801ec9210c9274c920e",
  "97b6b97bd19801ec95f8c965cc920f",

  "97bd07f5307f595b0b0bc920fb0722",
  "7f0e397bd097c36b0b6fc9210c8dc2",
  "9778397bd097c36c9210c9274c920e",

  "97b6b97bd19801ec95f8c965cc920f",
  "97bd07f5307f595b0b0bc920fb0722",
  "7f0e397bd097c36b0b6fc9210c8dc2",

  "9778397bd097c36c9210c9274c91aa",
  "97b6b97bd19801ec9210c965cc920e",
  "97bd07f1487f595b0b0bc920fb0722",

  "7f0e397bd097c36b0b6fc9210c8dc2",
  "9778397bd097c36b0b6fc9274c91aa",
  "97b6b97bd19801ec9210c965cc920e",

  "97bcf7f1487f595b0b0bb0b6fb0722",
  "7f0e397bd097c35b0b6fc920fb0722",
  "9778397bd097c36b0b6fc9274c91aa",

  "97b6b97bd19801ec9210c965cc920e",
  "97bcf7f1487f595b0b0bb0b6fb0722",
  "7f0e397bd097c35b0b6fc920fb0722",

  "9778397bd097c36b0b6fc9274c91aa",
  "97b6b97bd19801ec9210c965cc920e",
  "97bcf7f1487f531b0b0bb0b6fb0722",

  "7f0e397bd097c35b0b6fc920fb0722",
  "9778397bd097c36b0b6fc9274c91aa",
  "97b6b97bd19801ec9210c965cc920e",

  "97bcf7f1487f531b0b0bb0b6fb0722",
  "7f0e397bd07f595b0b6fc920fb0722",
  "9778397bd097c36b0b6fc9274c91aa",

  "97b6b97bd19801ec9210c9274c920e",
  "97bcf7f0e47f531b0b0bb0b6fb0722",
  "7f0e397bd07f595b0b0bc920fb0722",

  "9778397bd097c36b0b6fc9210c91aa",
  "97b6b97bd197c36c9210c9274c920e",
  "97bcf7f0e47f531b0b0bb0b6fb0722",

  "7f0e397bd07f595b0b0bc920fb0722",
  "9778397bd097c36b0b6fc9210c8dc2",
  "9778397bd097c36c9210c9274c920e",

  "97b6b7f0e47f531b0723b0b6fb0722",
  "7f0e37f5307f595b0b0bc920fb0722",
  "7f0e397bd097c36b0b6fc9210c8dc2",

  "9778397bd097c36b0b70c9274c91aa",
  "97b6b7f0e47f531b0723b0b6fb0721",
  "7f0e37f1487f595b0b0bb0b6fb0722",

  "7f0e397bd097c35b0b6fc9210c8dc2",
  "9778397bd097c36b0b6fc9274c91aa",
  "97b6b7f0e47f531b0723b0b6fb0721",

  "7f0e27f1487f595b0b0bb0b6fb0722",
  "7f0e397bd097c35b0b6fc920fb0722",
  "9778397bd097c36b0b6fc9274c91aa",

  "97b6b7f0e47f531b0723b0b6fb0721",
  "7f0e27f1487f531b0b0bb0b6fb0722",
  "7f0e397bd097c35b0b6fc920fb0722",

  "9778397bd097c36b0b6fc9274c91aa",
  "97b6b7f0e47f531b0723b0b6fb0721",
  "7f0e27f1487f531b0b0bb0b6fb0722",

  "7f0e397bd097c35b0b6fc920fb0722",
  "9778397bd097c36b0b6fc9274c91aa",
  "97b6b7f0e47f531b0723b0b6fb0721",

  "7f0e27f1487f531b0b0bb0b6fb0722",
  "7f0e397bd07f595b0b0bc920fb0722",
  "9778397bd097c36b0b6fc9274c91aa",

  "97b6b7f0e47f531b0723b0787b0721",
  "7f0e27f0e47f531b0b0bb0b6fb0722",
  "7f0e397bd07f595b0b0bc920fb0722",

  "9778397bd097c36b0b6fc9210c91aa",
  "97b6b7f0e47f149b0723b0787b0721",
  "7f0e27f0e47f531b0723b0b6fb0722",

  "7f0e397bd07f595b0b0bc920fb0722",
  "9778397bd097c36b0b6fc9210c8dc2",
  "977837f0e37f149b0723b0787b0721",

  "7f07e7f0e47f531b0723b0b6fb0722",
  "7f0e37f5307f595b0b0bc920fb0722",
  "7f0e397bd097c35b0b6fc9210c8dc2",

  "977837f0e37f14998082b0787b0721",
  "7f07e7f0e47f531b0723b0b6fb0721",
  "7f0e37f1487f595b0b0bb0b6fb0722",

  "7f0e397bd097c35b0b6fc9210c8dc2",
  "977837f0e37f14998082b0787b06bd",
  "7f07e7f0e47f531b0723b0b6fb0721",

  "7f0e27f1487f531b0b0bb0b6fb0722",
  "7f0e397bd097c35b0b6fc920fb0722",
  "977837f0e37f14998082b0787b06bd",

  "7f07e7f0e47f531b0723b0b6fb0721",
  "7f0e27f1487f531b0b0bb0b6fb0722",
  "7f0e397bd097c35b0b6fc920fb0722",

  "977837f0e37f14998082b0787b06bd",
  "7f07e7f0e47f531b0723b0b6fb0721",
  "7f0e27f1487f531b0b0bb0b6fb0722",

  "7f0e397bd07f595b0b0bc920fb0722",
  "977837f0e37f14998082b0787b06bd",
  "7f07e7f0e47f531b0723b0b6fb0721",

  "7f0e27f1487f531b0b0bb0b6fb0722",
  "7f0e397bd07f595b0b0bc920fb0722",
  "977837f0e37f14998082b0787b06bd",

  "7f07e7f0e47f149b0723b0787b0721",
  "7f0e27f0e47f531b0b0bb0b6fb0722",
  "7f0e397bd07f595b0b0bc920fb0722",

  "977837f0e37f14998082b0723b06bd",
  "7f07e7f0e37f149b0723b0787b0721",
  "7f0e27f0e47f531b0723b0b6fb0722",

  "7f0e397bd07f595b0b0bc920fb0722",
  "977837f0e37f14898082b0723b02d5",
  "7ec967f0e37f14998082b0787b0721",

  "7f07e7f0e47f531b0723b0b6fb0722",
  "7f0e37f1487f595b0b0bb0b6fb0722",
  "7f0e37f0e37f14898082b0723b02d5",

  "7ec967f0e37f14998082b0787b0721",
  "7f07e7f0e47f531b0723b0b6fb0722",
  "7f0e37f1487f531b0b0bb0b6fb0722",

  "7f0e37f0e37f14898082b0723b02d5",
  "7ec967f0e37f14998082b0787b06bd",
  "7f07e7f0e47f531b0723b0b6fb0721",

  "7f0e37f1487f531b0b0bb0b6fb0722",
  "7f0e37f0e37f14898082b072297c35",
  "7ec967f0e37f14998082b0787b06bd",

  "7f07e7f0e47f531b0723b0b6fb0721",
  "7f0e27f1487f531b0b0bb0b6fb0722",
  "7f0e37f0e37f14898082b072297c35",

  "7ec967f0e37f14998082b0787b06bd",
  "7f07e7f0e47f531b0723b0b6fb0721",
  "7f0e27f1487f531b0b0bb0b6fb0722",

  "7f0e37f0e366aa89801eb072297c35",
  "7ec967f0e37f14998082b0787b06bd",
  "7f07e7f0e47f149b0723b0787b0721",

  "7f0e27f1487f531b0b0bb0b6fb0722",
  "7f0e37f0e366aa89801eb072297c35",
  "7ec967f0e37f14998082b0723b06bd",

  "7f07e7f0e47f149b0723b0787b0721",
  "7f0e27f0e47f531b0723b0b6fb0722",
  "7f0e37f0e366aa89801eb072297c35",

  "7ec967f0e37f14998082b0723b06bd",
  "7f07e7f0e37f14998083b0787b0721",
  "7f0e27f0e47f531b0723b0b6fb0722",

  "7f0e37f0e366aa89801eb072297c35",
  "7ec967f0e37f14898082b0723b02d5",
  "7f07e7f0e37f14998082b0787b0721",

  "7f07e7f0e47f531b0723b0b6fb0722",
  "7f0e36665b66aa89801e9808297c35",
  "665f67f0e37f14898082b0723b02d5",

  "7ec967f0e37f14998082b0787b0721",
  "7f07e7f0e47f531b0723b0b6fb0722",
  "7f0e36665b66a449801e9808297c35",

  "665f67f0e37f14898082b0723b02d5",
  "7ec967f0e37f14998082b0787b06bd",
  "7f07e7f0e47f531b0723b0b6fb0721",

  "7f0e36665b66a449801e9808297c35",
  "665f67f0e37f14898082b072297c35",
  "7ec967f0e37f14998082b0787b06bd",

  "7f07e7f0e47f531b0723b0b6fb0721",
  "7f0e26665b66a449801e9808297c35",
  "665f67f0e37f1489801eb072297c35",

  "7ec967f0e37f14998082b0787b06bd",
  "7f07e7f0e47f531b0723b0b6fb0721",
  "7f0e27f1487f531b0b0bb0b6fb0722",
];

/**

 * 数字转中文速查表

* @Array Of Property

* @trans ['日','一','二','三','四','五','六','七','八','九','十']

* @return Cn string

 */

var nStr1 = [
  "\u65e5",
  "\u4e00",
  "\u4e8c",
  "\u4e09",
  "\u56db",
  "\u4e94",
  "\u516d",
  "\u4e03",
  "\u516b",
  "\u4e5d",
  "\u5341",
];

/**

* 日期转农历称呼速查表

* @Array Of Property

* @trans ['初','十','廿','卅']

* @return Cn string

*/

var nStr2 = ["\u521d", "\u5341", "\u5eff", "\u5345"];

/**

* 月份转农历称呼速查表

* @Array Of Property

* @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']

* @return Cn string

*/

var nStr3 = [
  "\u6b63",
  "\u4e8c",
  "\u4e09",
  "\u56db",
  "\u4e94",
  "\u516d",
  "\u4e03",
  "\u516b",
  "\u4e5d",
  "\u5341",
  "\u51ac",
  "\u814a",
];

/**

* 返回农历y年一整年的总天数

* @param lunar Year

 * @return Number

* @eg:var count = calendar.lYearDays(1987) ;//count=387

*/

function lYearDays(y) {
  var i;

  var sum = 348;

  for (i = 0x8000; i > 0x8; i >>= 1) {
    sum += lunarInfo[y - 1900] & i ? 1 : 0;
  }

  return sum + leapDays(y);
}

/**

* 返回农历y年闰月是哪个月；若y年没有闰月 则返回0

* @param lunar Year

* @return Number (0-12)

 * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6

*/

function leapMonth(y) {
  // 闰字编码 \u95f0

  return lunarInfo[y - 1900] & 0xf;
}

/**

* 返回农历y年闰月的天数 若该年没有闰月则返回0

* @param lunar Year

* @return Number (0、29、30)

* @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29

*/

function leapDays(y) {
  if (leapMonth(y)) {
    return lunarInfo[y - 1900] & 0x10000 ? 30 : 29;
  }

  return 0;
}

/**

* 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法

* @param lunar Year

* @return Number (-1、29、30)

 * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29

*/

function monthDays(y, m) {
  if (m > 12 || m < 1) {
    return -1;
  } // 月份参数从1至12，参数错误返回-1

  return lunarInfo[y - 1900] & (0x10000 >> m) ? 30 : 29;
}

/**

* 返回公历(!)y年m月的天数

* @param solar Year

* @return Number (-1、28、29、30、31)

* @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30

*/

function solarDays(y, m) {
  if (m > 12 || m < 1) {
    return -1;
  } // 若参数错误 返回-1

  var ms = m - 1;

  if (ms === 1) {
    // 2月份的闰平规律测算后确认返回28或29

    return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? 29 : 28;
  } else {
    return solarMonth[ms];
  }
}

/**

* 农历年份转换为干支纪年

* @param  lYear 农历年的年份数

* @return Cn string

*/

function toGanZhiYear(lYear) {
  var ganKey = (lYear - 3) % 10;

  var zhiKey = (lYear - 3) % 12;

  if (ganKey === 0) ganKey = 10; // 如果余数为0则为最后一个天干

  if (zhiKey === 0) zhiKey = 12; // 如果余数为0则为最后一个地支

  return Gan[ganKey - 1] + Zhi[zhiKey - 1];
}

/**

* 公历月、日判断所属星座

* @param  cMonth [description]

* @param  cDay [description]

* @return Cn string

*/

function toAstro(cMonth, cDay) {
  var s =
    "\u9b54\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u9b54\u7faf";

  var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];

  return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + "\u5ea7"; // 座
}

/**

* 传入offset偏移量返回干支

* @param offset 相对甲子的偏移量

* @return Cn string

*/

function toGanZhi(offset) {
  return Gan[offset % 10] + Zhi[offset % 12];
}

/**

* 传入公历(!)y年获得该年第n个节气的公历日期

* @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起

* @return day Number

* @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春

*/

function getTerm(y, n) {
  if (y < 1900 || y > 2100) {
    return -1;
  }

  if (n < 1 || n > 24) {
    return -1;
  }

  var _table = sTermInfo[y - 1900];

  var _info = [
    parseInt("0x" + _table.substr(0, 5)).toString(),

    parseInt("0x" + _table.substr(5, 5)).toString(),

    parseInt("0x" + _table.substr(10, 5)).toString(),

    parseInt("0x" + _table.substr(15, 5)).toString(),

    parseInt("0x" + _table.substr(20, 5)).toString(),

    parseInt("0x" + _table.substr(25, 5)).toString(),
  ];

  var _calday = [
    _info[0].substr(0, 1),

    _info[0].substr(1, 2),

    _info[0].substr(3, 1),

    _info[0].substr(4, 2),

    _info[1].substr(0, 1),

    _info[1].substr(1, 2),

    _info[1].substr(3, 1),

    _info[1].substr(4, 2),

    _info[2].substr(0, 1),

    _info[2].substr(1, 2),

    _info[2].substr(3, 1),

    _info[2].substr(4, 2),

    _info[3].substr(0, 1),

    _info[3].substr(1, 2),

    _info[3].substr(3, 1),

    _info[3].substr(4, 2),

    _info[4].substr(0, 1),

    _info[4].substr(1, 2),

    _info[4].substr(3, 1),

    _info[4].substr(4, 2),

    _info[5].substr(0, 1),

    _info[5].substr(1, 2),

    _info[5].substr(3, 1),

    _info[5].substr(4, 2),
  ];

  return parseInt(_calday[n - 1]);
}

/**

* 传入农历数字月份返回汉语通俗表示法

* @param lunar month

* @return Cn string

* @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'

*/

function toChinaMonth(m) {
  // 月 => \u6708

  if (m > 12 || m < 1) {
    return -1;
  } // 若参数错误 返回-1

  var s = nStr3[m - 1];

  s += "\u6708"; // 加上月字

  return s;
}

/**

* 传入农历日期数字返回汉字表示法

* @param lunar day

* @return Cn string

* @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'

*/

function toChinaDay(d) {
  // 日 => \u65e5

  var s;

  switch (d) {
    case 10:
      s = "\u521d\u5341";

      break;

    case 20:
      s = "\u4e8c\u5341";

      break;

    case 30:
      s = "\u4e09\u5341";

      break;

    default:
      s = nStr2[Math.floor(d / 10)];

      s += nStr1[d % 10];
  }

  return s;
}

/**

* 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”

* @param y year

* @return Cn string

* @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'

*/

function getAnimal(y) {
  return Animals[(y - 4) % 12];
}

/**

* 传入阳历年月日获得详细的公历、农历object信息 <=>JSON

* @param y  solar year

* @param m  solar month

* @param d  solar day

* @return JSON object

* @eg:console.log(calendar.solar2lunar(1987,11,01));

*/

function solar2lunar(y, m, d) {
  // 参数区间1900.1.31~2100.12.31

  // 年份限定、上限

  if (y < 1900 || y > 2100) {
    return -1; // undefined转换为数字变为NaN
  }

  // 公历传参最下限

  if (y === 1900 && m === 1 && d < 31) {
    return -1;
  }

  // 未传参  获得当天

  var objDate = null;

  if (!y) {
    objDate = new Date();
  } else {
    objDate = new Date(y, parseInt(m) - 1, d);
  }

  var i;

  var leap = 0;

  var temp = 0;

  // 修正ymd参数

  y = objDate.getFullYear();

  m = objDate.getMonth() + 1;

  d = objDate.getDate();

  var offset =
    (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) -
      Date.UTC(1900, 0, 31)) /
    86400000;

  for (i = 1900; i < 2101 && offset > 0; i++) {
    temp = lYearDays(i);

    offset -= temp;
  }

  if (offset < 0) {
    offset += temp;
    i--;
  }

  // 是否今天

  var isTodayObj = new Date();

  var isToday = false;

  if (
    isTodayObj.getFullYear() === y &&
    isTodayObj.getMonth() + 1 === m &&
    isTodayObj.getDate() === d
  ) {
    isToday = true;
  }

  // 星期几

  var nWeek = objDate.getDay();

  var cWeek = nStr1[nWeek];

  // 数字表示周几顺应天朝周一开始的惯例

  if (nWeek === 0) {
    nWeek = 7;
  }

  // 农历年

  var year = i;

  leap = leapMonth(i); // 闰哪个月

  var isLeap = false;

  // 效验闰月

  for (i = 1; i < 13 && offset > 0; i++) {
    // 闰月

    if (leap > 0 && i === leap + 1 && isLeap === false) {
      --i;

      isLeap = true;
      temp = leapDays(year); // 计算农历闰月天数
    } else {
      temp = monthDays(year, i); // 计算农历普通月天数
    }

    // 解除闰月

    if (isLeap === true && i === leap + 1) {
      isLeap = false;
    }

    offset -= temp;
  }

  // 闰月导致数组下标重叠取反

  if (offset === 0 && leap > 0 && i === leap + 1) {
    if (isLeap) {
      isLeap = false;
    } else {
      isLeap = true;
      --i;
    }
  }

  if (offset < 0) {
    offset += temp;
    --i;
  }

  // 农历月

  var month = i;

  // 农历日

  var day = offset + 1;

  // 天干地支处理

  var sm = m - 1;

  var gzY = toGanZhiYear(year);

  // 当月的两个节气

  // bugfix-2017-7-24 11:03:38 use lunar Year Param `y` Not `year`

  var firstNode = getTerm(y, m * 2 - 1); // 返回当月「节」为几日开始

  var secondNode = getTerm(y, m * 2); // 返回当月「节」为几日开始

  // 依据12节气修正干支月

  var gzM = toGanZhi((y - 1900) * 12 + m + 11);

  if (d >= firstNode) {
    gzM = toGanZhi((y - 1900) * 12 + m + 12);
  }

  // 传入的日期的节气与否

  var isTerm = false;

  var Term = null;

  if (firstNode === d) {
    isTerm = true;

    Term = solarTerm[m * 2 - 2];
  }

  if (secondNode === d) {
    isTerm = true;

    Term = solarTerm[m * 2 - 1];
  }

  // 日柱 当月一日与 1900/1/1 相差天数

  var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;

  var gzD = toGanZhi(dayCyclical + d - 1);

  // 该日期所属的星座

  var astro = toAstro(m, d);

  return {
    lYear: year,
    lMonth: month,
    lDay: day,
    Animal: getAnimal(year),
    IMonthCn: (isLeap ? "\u95f0" : "") + toChinaMonth(month),
    IDayCn: toChinaDay(day),
    cYear: y,
    cMonth: m,
    cDay: d,
    gzYear: gzY,
    gzMonth: gzM,
    gzDay: gzD,
    isToday: isToday,
    isLeap: isLeap,
    nWeek: nWeek,
    ncWeek: "\u661f\u671f" + cWeek,
    isTerm: isTerm,
    Term: Term,
    astro: astro,
  };
}

var calendarFormatter = {
  // 传入阳历年月日获得详细的公历、农历object信息 <=>JSON

  solar2lunar: function (y, m, d) {
    // 参数区间1900.1.31~2100.12.31

    return solar2lunar(y, m, d);
  },

  /**

  * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON

  * @param y  lunar year

  * @param m  lunar month

  * @param d  lunar day

  * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]

  * @return JSON object

  * @eg:console.log(calendar.lunar2solar(1987,9,10));

  */

  lunar2solar: function (y, m, d, isLeapMonth) {
    // 参数区间1900.1.31~2100.12.1

    isLeapMonth = !!isLeapMonth;

    if (isLeapMonth && leapMonth !== m) {
      return -1;
    } // 传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同

    if (
      (y === 2100 && m === 12 && d > 1) ||
      (y === 1900 && m === 1 && d < 31)
    ) {
      return -1;
    } // 超出了最大极限值

    var day = monthDays(y, m);

    var _day = day;

    // bugFix 2016-9-25

    // if month is leap, _day use leapDays method

    if (isLeapMonth) {
      _day = leapDays(y, m);
    }

    if (y < 1900 || y > 2100 || d > _day) {
      return -1;
    } // 参数合法性效验

    // 计算农历的时间差

    var offset = 0;

    for (var i = 1900; i < y; i++) {
      offset += lYearDays(i);
    }

    var leap = 0;

    var isAdd = false;

    for (i = 1; i < m; i++) {
      leap = leapMonth(y);

      if (!isAdd) {
        // 处理闰月

        if (leap <= i && leap > 0) {
          offset += leapDays(y);
          isAdd = true;
        }
      }

      offset += monthDays(y, i);
    }

    // 转换闰月农历 需补充该年闰月的前一个月的时差

    if (isLeapMonth) {
      offset += day;
    }

    // 1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)

    var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);

    var calObj = new Date((offset + d - 31) * 86400000 + stmap);

    var cY = calObj.getUTCFullYear();

    var cM = calObj.getUTCMonth() + 1;

    var cD = calObj.getUTCDate();

    return solar2lunar(cY, cM, cD);
  },
};

/* 农历转换 end */

//----------------------------------------------------------------

/* 节日弹窗 start */
var d = new Date();
m = d.getMonth() + 1;
dd = d.getDate();
y = d.getFullYear();

// 公祭日
if (m == 7 && dd == 7) {
  document
    .getElementsByTagName("html")[0]
    .setAttribute("style", "filter: grayscale(60%);");
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire(
      "今天是卢沟桥事变" +
      (y - 1937).toString() +
      "周年纪念日\n🪔勿忘国耻，振兴中华！🪔"
    );
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 8 && dd == 14) {
  document
    .getElementsByTagName("html")[0]
    .setAttribute("style", "filter: grayscale(60%);");
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("今天是世界慰安妇纪念日\n🪔真相不可磨灭，她们仍在等待道歉！🪔");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 9 && dd == 18) {
  document
    .getElementsByTagName("html")[0]
    .setAttribute("style", "filter: grayscale(60%);");
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire(
      "今天是九一八事变" +
      (y - 1931).toString() +
      "周年纪念日\n🪔勿忘国耻，振兴中华！🪔"
    );
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 12 && dd == 13) {
  document
    .getElementsByTagName("html")[0]
    .setAttribute("style", "filter: grayscale(60%);");
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire(
      "今天是南京大屠杀" +
      (y - 1937).toString() +
      "周年纪念日\n🪔勿忘国耻，振兴中华！🪔"
    );
    sessionStorage.setItem("isPopupWindow", "1");
  }
}

// 节假日
if (m == 1 && dd == 1) {
  //元旦节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire(y.toString() + "年元旦快乐！🎉");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 2 && dd == 20) {
  //站长生日
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    // Swal.fire("🥳祝站长" + (y - 2003).toString() + "岁生日快乐！🎉");
    Swal.fire("🥳祝站长生日快乐！🎉");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 3 && dd == 8) {
  //妇女节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("各位女神们，妇女节快乐！👩");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 4 && dd == 1) {
  //愚人节，随机谎话
  l = [
    "非常抱歉，因为不可控原因，博客将于明天停止运营！",
    "你知道吗？站长很喜欢你哦！",

  ];
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire(l[Math.floor(Math.random() * l.length)]);
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 5 && dd == 1) {
  //劳动节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("劳动节快乐\n向各行各业辛勤工作的人们致敬！");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 5 && dd == 4) {
  //青年节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("青年节快乐\n青春不是回忆逝去,而是把握现在！");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 5 && dd == 20) {
  //520
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("今年是520情人节\n快和你喜欢的人一起过吧！💑");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 6 && dd == 1) {
  //儿童节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("儿童节快乐\n谁还不是个孩子呢！👼🏼");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 7 && dd == 1) {
  //建党节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("祝中国共产党" + (y - 1921).toString() + "岁生日快乐！");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 8 && dd == 15) {
  //搞来玩的，小日子投降
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("日本已经投降" + (y - 1945).toString() + "年了😃");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 9 && dd == 10) {
  //教师节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("各位老师们教师节快乐！👩‍🏫");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 10 && dd <= 7) {
  //国庆节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("祝祖国" + (y - 1949).toString() + "岁生日快乐！");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 11 && dd == 11) {
  //光棍节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("光棍节快乐\n今天你过节吗？👩");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 12 && dd == 24) {
  //平安夜
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("今天是平安夜\n来吃个苹果吧！🍎");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 12 && dd == 25) {
  //圣诞节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("圣诞节快乐！🎄");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}

//传统节日部分
// 输出2024-2050年清明节日期
// var output = "";
// for (var i = 2024; i <= 2050; i++) {
//   for (var j = 4; j <= 5; j++) {
//     if(
//       (i < 2041 && i % 2 == 0 && j == 4 + i / 2 % 2) ||
//       (i < 2041 && i % 2 == 1 && j == 4 + (i-1) / 2 % 2) ||
//       (i >= 2041 && i % 4 == 3 && j == 5) ||
//       (i >= 2041 && i % 4 != 3 && j == 4)
//     ){
//       output += i + "年4月" + j + "日\n";
//     }
//   }
// }
// alert(output);

//清明节
// 2041年前，每两年切换一次4月4日和4月5日
// 2041年后，每四年切换一次4月4日和4月5日
if (
  (y < 2041 && y % 2 == 0 && m == 4 && dd == 4 + y / 2 % 2) ||
  (y < 2041 && y % 2 == 1 && m == 4 && dd == 4 + (y - 1) / 2 % 2) ||
  (y >= 2041 && y % 4 == 3 && m == 4 && dd == 5) ||
  (y >= 2041 && y % 4 != 3 && m == 4 && dd == 4)
) {
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("清明时节雨纷纷,一束鲜花祭故人💐");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
//冬至，规律和清明节一样
// 23年是12月22日，24年是12月21日，25年是12月21日
if (
  (y < 2041 && y % 2 == 0 && m == 12 && dd == 21 + y / 2 % 2) ||
  (y < 2041 && y % 2 == 1 && m == 12 && dd == 21 + (y - 1) / 2 % 2) ||
  (y >= 2041 && y % 4 == 3 && m == 12 && dd == 22) ||
  (y >= 2041 && y % 4 != 3 && m == 12 && dd == 21)
) {
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("冬至快乐\n快吃上一碗热热的汤圆和饺子吧🧆");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}

var lunar = calendarFormatter.solar2lunar();

//农历采用汉字计算，防止出现闰月导致问题

//除夕
//先得到正月初一的公历日期，再减一天
var lunar2 = calendarFormatter.lunar2solar(
  lunar["lYear"],
  1,
  1,
  lunar["isLeap"]
);
lunar2["cDay"] = lunar2["cDay"] - 1;
if (lunar2["cDay"] == 0) {
  lunar2["cMonth"] = lunar2["cMonth"] - 1;
  lunar2["cDay"] = solarDays(lunar2["cYear"], lunar2["cMonth"]);
}
if (lunar2["cMonth"] == 0) {
  lunar2["cYear"] = lunar2["cYear"] - 1;
  lunar2["cMonth"] = 12;
}
if (lunar["cYear"] == lunar2["cYear"] && lunar["cMonth"] == lunar2["cMonth"] && lunar["cDay"] == lunar2["cDay"]) {
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("今天是除夕\n🎆祝你除夕快乐，烦恼消除🎆");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
//春节，从初一到初七
if (
  lunar["cYear"] == lunar2["cYear"] &&
  lunar["cMonth"] == lunar2["cMonth"] &&
  lunar["cDay"] <= lunar2["cDay"] + 6
) {
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("今天是农历新年\n🧨祝你新年快乐，万事如意🧨");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
//元宵节
if (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "十五") {
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("今天是元宵节\n祝你元宵节快乐，送你一个大大的灯笼🧅");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
//端午节
if (lunar["IMonthCn"] == "五月" && lunar["IDayCn"] == "初五") {
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("端午节快乐\n请你吃一条粽子🍙");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
//七夕节
if (lunar["IMonthCn"] == "七月" && lunar["IDayCn"] == "初七") {
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("七夕节快乐\n黄昏后,柳梢头,牛郎织女来碰头");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
//中秋节
if (lunar["IMonthCn"] == "八月" && lunar["IDayCn"] == "十五") {
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("中秋节快乐\n请你吃一块月饼🥮");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
//重阳节
if (lunar["IMonthCn"] == "九月" && lunar["IDayCn"] == "初九") {
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("重阳节快乐\n独在异乡为异客，每逢佳节倍思亲");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
//腊八节
if (lunar["IMonthCn"] == "十二月" && lunar["IDayCn"] == "初八") {
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("腊八节快乐\n请你吃一碗腊八粥🥣");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}

// 切换主题提醒
// if (y == 2025 && m == 1 && (dd >= 1 && dd <= 12)) {
//   if (sessionStorage.getItem("isPopupWindow") != "1") {
//       Swal.fire("网站换成冬日限定主题啦⛄");
//       sessionStorage.setItem("isPopupWindow", "1");
//   }
// }

/* 节日弹窗 end */

//----------------------------------------------------------------

/* 听话鼠标 start */
var CURSOR;

Math.lerp = (a, b, n) => (1 - n) * a + n * b;

const getStyle2 = (el, attr) => {
  try {
    return window.getComputedStyle
      ? window.getComputedStyle(el)[attr]
      : el.currentStyle[attr];
  } catch (e) { }
  return "";
};

// 为了屏蔽异步加载导致无法读取颜色值，这里统一用哈希表预处理
const map = new Map();
map.set("red", "rgb(241, 71, 71)");
map.set("orange", "rgb(241, 162, 71)");
map.set("yellow", "rgb(241, 238, 71)");
map.set("purple", "rgb(179, 71, 241)");
map.set("blue", "rgb(102, 204, 255)");
map.set("gray", "rgb(226, 226, 226)");
map.set("green", "rgb(57, 197, 187)");
map.set("whitegray", "rgb(241, 241, 241)");
map.set("pink", "rgb(237, 112, 155)");
map.set("black", "rgb(0, 0, 0)");
map.set("darkblue", "rgb(97, 100, 159)");
map.set("heoblue", "rgb(66, 90, 239)");

class Cursor {
  constructor() {
    this.pos = { curr: null, prev: null };
    this.pt = [];
    this.create();
    this.init();
    this.render();
  }

  move(left, top) {
    this.cursor.style["left"] = `${left}px`;
    this.cursor.style["top"] = `${top}px`;
  }

  create() {
    if (!this.cursor) {
      this.cursor = document.createElement("div");
      this.cursor.id = "cursor";
      this.cursor.classList.add("hidden");
      document.body.append(this.cursor);
    }
    var el = document.getElementsByTagName("*");
    for (let i = 0; i < el.length; i++)
      if (getStyle2(el[i], "cursor") == "pointer")
        this.pt.push(el[i].outerHTML);
    var colorVal = map.get(localStorage.getItem("themeColor"));
    document.body.appendChild((this.scr = document.createElement("style")));
    this.scr.innerHTML =
      `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='8px' height='8px'><circle cx='4' cy='4' r='4' opacity='1.0' fill='` +
      colorVal +
      `'/></svg>") 4 4, auto}`;
  }

  refresh() {
    this.scr.remove();
    this.cursor.classList.remove("hover");
    this.cursor.classList.remove("active");
    this.pos = { curr: null, prev: null };
    this.pt = [];

    this.create();
    this.init();
    this.render();
  }

  init() {
    document.onmouseover = (e) =>
      this.pt.includes(e.target.outerHTML) &&
      this.cursor.classList.add("hover");
    document.onmouseout = (e) =>
      this.pt.includes(e.target.outerHTML) &&
      this.cursor.classList.remove("hover");
    document.onmousemove = (e) => {
      this.pos.curr == null && this.move(e.clientX - 8, e.clientY - 8);
      this.pos.curr = { x: e.clientX - 8, y: e.clientY - 8 };
      this.cursor.classList.remove("hidden");
    };
    document.onmouseenter = (e) => this.cursor.classList.remove("hidden");
    document.onmouseleave = (e) => this.cursor.classList.add("hidden");
    document.onmousedown = (e) => this.cursor.classList.add("active");
    document.onmouseup = (e) => this.cursor.classList.remove("active");
  }

  render() {
    if (this.pos.prev) {
      // 跟踪速度调节
      this.pos.prev.x = Math.lerp(this.pos.prev.x, this.pos.curr.x, 0.15);
      this.pos.prev.y = Math.lerp(this.pos.prev.y, this.pos.curr.y, 0.15);
      this.move(this.pos.prev.x, this.pos.prev.y);
    } else {
      this.pos.prev = this.pos.curr;
    }
    requestAnimationFrame(() => this.render());
  }
}

(() => {
  CURSOR = new Cursor();
  // 需要重新获取列表时，使用 CURSOR.refresh()
})();

/* 听话鼠标 end */

//----------------------------------------------------------------

/* 新年倒计时 start */
let newYearTimer = null;
var newYear = () => {
  clearTimeout(newYearTimer);
  if (!document.querySelector("#newYear")) return;
  var toGetLunarMonth = 1;
  var toGetLunarDay = 1;
  // 得到下一个农历正月初一的日期yyyy-mm-dd
  let lunar = calendarFormatter.solar2lunar();
  let year = lunar["lYear"];
  let month = lunar["lMonth"];
  let day = lunar["lDay"];
  if (month > toGetLunarMonth || (month == toGetLunarMonth && day > toGetLunarDay)) {
    year = year + 1;
  }
  // 得到下一个新年的字符串
  let lMonth = calendarFormatter.lunar2solar(year, toGetLunarMonth, toGetLunarDay)["cMonth"];
  let lDay = calendarFormatter.lunar2solar(year, toGetLunarMonth, toGetLunarDay)["cDay"];
  let nextNewYear =
    calendarFormatter.lunar2solar(year, toGetLunarMonth, toGetLunarDay)["cYear"] +
    "/" + lMonth + "/" + lDay + " 00:00:00";
  // 得到农历正月十六的日期yyyy-mm-dd
  let lunarEnd = calendarFormatter.lunar2solar(lunar["lYear"], 1, 16);
  let lunarEndStr =
    lunarEnd["cYear"] + "/" + lunarEnd["cMonth"] + "/" + lunarEnd["cDay"] + " 00:00:00";
  // 新年时间戳 and 星期对象
  let newYear = new Date(nextNewYear).getTime() / 1000,
    week = {
      0: "星期日",
      1: "星期一",
      2: "星期二",
      3: "星期三",
      4: "星期四",
      5: "星期五",
      6: "星期六",
    };

  time();

  // 补零函数
  function nol(h) {
    return h > 9 ? h : "0" + h;
  }

  function time() {
    // 现在 时间对象
    let now = new Date();

    // 右下角 今天
    document.querySelector("#newYear .today").innerHTML =
      now.getFullYear() +
      "年" +
      (now.getMonth() + 1) +
      "月" +
      now.getDate() +
      "日 " +
      week[now.getDay()];

    // 现在与新年相差秒数
    let second = newYear - Math.round(now.getTime() / 1000);
    let yearSecond = new Date(lunarEndStr).getTime() / 1000 - Math.round(now.getTime() / 1000);
    // 如果小于0则已经过年，同时需要判断未到正月十五
    if (second < 0 || yearSecond > 0) {
      document.querySelector("#newYear .title").innerHTML = "Happy New Year!";
      document.querySelector("#newYear .newYear-time").innerHTML =
        '<span class="happyNewYear">新年快乐！</p>';
    }
    else {
      // 大于0则还未过年
      document.querySelector("#newYear .title").innerHTML = "距" + year + "年春节(" + year + "." + lMonth + "." + lDay + ")还有：";

      // 大于一天则直接渲染天数
      if (second > 86400) {
        document.querySelector(
          "#newYear .newYear-time"
        ).innerHTML = `<span class="day">${Math.round(
          second / 86400
        )}<span class="unit">天</span></span>`;
        // 如果还剩1天多1分钟，则启动计时器
        if (second < 86400 + 60) {
          newYearTimer = setTimeout(time, 100);
        }
      } else {
        // 小于一天则使用时分秒计时。
        let h = nol(parseInt(second / 3600));
        second %= 3600;
        let m = nol(parseInt(second / 60));
        second %= 60;
        let s = nol(second);
        document.querySelector(
          "#newYear .newYear-time"
        ).innerHTML = `<span class="time">${h}:${m}:${s}</span></span>`;
        // 计时
        newYearTimer = setTimeout(time, 1000);
      }
    }
  }

  // 元宝飘落
  jQuery(document).ready(function ($) {
    $("#newYear").wpSuperSnow({
      flakes: [
        "https://oss.iuoyt.com/resource/elements/new-year/yb1.webp",
        "https://oss.iuoyt.com/resource/elements/new-year/yb2.webp",
        "https://oss.iuoyt.com/resource/elements/new-year/yb3.webp",
      ],
      totalFlakes: "100",
      zIndex: "2",
      maxSize: "30",
      maxDuration: "20",
      useFlakeTrans: false,
    });
  });
};
// Pjax适配：若没有开启Pjax这里直接是newYear()即可
// 开了Pjax的用以下两句
document.addEventListener("pjax:complete", newYear);
document.addEventListener("DOMContentLoaded", newYear);

/* 新年倒计时 end */

//----------------------------------------------------------------

// /* 页脚计时器 start */
// var now = new Date();
// function createtime() {
//   // 当前时间
//   now.setTime(now.getTime() + 1000);
//   var start = new Date("08/01/2022 00:00:00"); // 旅行者1号开始计算的时间
//   var dis = Math.trunc(23400000000 + ((now - start) / 1000) * 17); // 距离=秒数*速度 记住转换毫秒
//   var unit = (dis / 149600000).toFixed(6);  // 天文单位
//   // 网站诞生时间
//   var grt = new Date("08/09/2022 00:00:00");
//   var days = (now - grt) / 1e3 / 60 / 60 / 24,
//     dnum = Math.floor(days),
//     hours = (now - grt) / 1e3 / 60 / 60 - 24 * dnum,
//     hnum = Math.floor(hours);
//   1 == String(hnum).length && (hnum = "0" + hnum);
//   var minutes = (now - grt) / 1e3 / 60 - 1440 * dnum - 60 * hnum,
//     mnum = Math.floor(minutes);
//   1 == String(mnum).length && (mnum = "0" + mnum);
//   var seconds = (now - grt) / 1e3 - 86400 * dnum - 3600 * hnum - 60 * mnum,
//     snum = Math.round(seconds);
//   1 == String(snum).length && (snum = "0" + snum);
//   let currentTimeHtml = "";
//   (currentTimeHtml =
//     hnum < 18 && hnum >= 9
//       ? `<img class='boardsign' src='https://lskypro.acozycotage.net/Fomalhaut/badge/F小屋-科研摸鱼中.svg' title='什么时候能够实现财富自由呀~'><br> <div style="font-size:13px;font-weight:bold">本站居然运行了 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> <br> 旅行者 1 号当前距离地球 ${dis} 千米，约为 ${unit} 个天文单位 🚀</div>`
//       : `<img class='boardsign' src='https://lskypro.acozycotage.net/Fomalhaut/badge/F小屋-下班休息啦.svg' title='下班了就该开开心心地玩耍~'><br> <div style="font-size:13px;font-weight:bold">本站居然运行了 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> <br> 旅行者 1 号当前距离地球 ${dis} 千米，约为 ${unit} 个天文单位 🚀</div>`),
//     document.getElementById("workboard") &&
//     (document.getElementById("workboard").innerHTML = currentTimeHtml);
// }
// // 设置重复执行函数，周期1000ms
// setInterval(() => {
//   createtime();
// }, 1000);

/*页脚计时器 end */

//----------------------------------------------------------------

/* fps检测 start */
if (
  window.localStorage.getItem("fpson") == undefined ||
  window.localStorage.getItem("fpson") == "1"
) {
  var rAF = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();
  var frame = 0;
  var allFrameCount = 0;
  var lastTime = Date.now();
  var lastFameTime = Date.now();
  var loop = function () {
    var now = Date.now();
    var fs = now - lastFameTime;
    var fps = Math.round(1000 / fs);

    lastFameTime = now;
    // 不置 0，在动画的开头及结尾记录此值的差值算出 FPS
    allFrameCount++;
    frame++;

    if (now > 1000 + lastTime) {
      var fps = Math.round((frame * 1000) / (now - lastTime));
      if (fps == 1) {
        var kd = `<span style="color:#bd0000">一帧能看🤢</span>`;
      } else if (fps == 2) {
        var kd = `<span style="color:#bd0000">两帧能玩🤢</span>`;
      } else if (fps == 3) {
        var kd = `<span style="color:#bd0000">三帧电竞🤢</span>`;
      } else if (fps <= 8) {
        var kd = `<span style="color:#bd0000">卡成ppt🤢</span>`;
      } else if (fps <= 15) {
        var kd = `<span style="color:red">电竞级帧率😖</span>`;
      } else if (fps <= 25) {
        var kd = `<span style="color:orange">有点难受😨</span>`;
      } else if (fps <= 35) {
        var kd = `<span style="color:#9338e6">不太流畅🙄</span>`;
      } else if (fps <= 45) {
        var kd = `<span style="color:#08b7e4">还不错哦😁</span>`;
      } else if (fps <= 75) {
        var kd = `<span style="color:#08b7e4">十分流畅😄</span>`;
      } else {
        var kd = `<span style="color:#39c5bb">纵享丝滑🤣</span>`;
      }
      document.getElementById("fps").innerHTML = `FPS:${fps} ${kd}`;
      frame = 0;
      lastTime = now;
    }

    rAF(loop);
  };

  loop();
} else {
  document.getElementById("fps").style = "display:none!important";
}
/* fps检测 end */

//----------------------------------------------------------------

/* 美化模块 start */

// 设置季节主题
const seasonTheme = {
  spring: {
    themeColor: 'green',
    sakura: 'block',
    sakuraItem: 'sakura',
    snow: 'none'
  },
  summer: {
    themeColor: 'red',
    sakura: 'none',
    sakuraItem: 'sakura',
    snow: 'none'
  },
  autumn: {
    themeColor: 'orange',
    sakura: 'block',
    sakuraItem: 'maple',
    snow: 'none'
  },
  winter: {
    themeColor: 'darkblue',
    sakura: 'none',
    sakuraItem: 'sakura',
    snow: 'block'
  }
}

// 更新版本需要每个用户都恢复一次默认设置
if (localStorage.getItem("reset_5") == undefined) {
  localStorage.setItem("reset_5", "1");
  // 清空之前的标记值
  for (var i = 1; i <= 4; i++) {
    localStorage.removeItem("reset_" + i);
  }
  clearItem();
  setTimeout(function () {
    new Vue({
      data: function () {
        this.$notify({
          title: "提示🍒",
          message:
            " (｡･∀･)ﾉﾞ由于网站部分设置项更新，当前已为您重置所有设置，祝您愉快！",
          position: "top-left",
          offset: 50,
          showClose: true,
          type: "success",
          duration: 8000,
        });
      },
    });
  }, 1500);
}

// 清除localStorage配置项
function clearItem() {
  localStorage.removeItem("blogbg");
  localStorage.removeItem("universe");
  localStorage.removeItem("blur");
  localStorage.removeItem("fpson");
  localStorage.removeItem("transNum");
  localStorage.removeItem("blurRad");
  localStorage.removeItem("font");
  localStorage.removeItem("themeColor");
  localStorage.removeItem("rs");
  localStorage.removeItem("mouse");
  localStorage.removeItem("light");
  localStorage.removeItem("snow");
  // localStorage.removeItem("weather");
  localStorage.removeItem("sakura");
  localStorage.removeItem("sakuraItem");
}

// 设置字体
if (localStorage.getItem("font") == undefined) {
  localStorage.setItem("font", "ZhuZiAWan");
}
setFont(localStorage.getItem("font"));
function setFont(n) {
  localStorage.setItem("font", n);
  if (n == "default") {
    document.documentElement.style.setProperty(
      "--global-font",
      "-apple-system"
    );
    document.body.style.fontFamily =
      "-apple-system, Consolas_1, BlinkMacSystemFont, 'Segoe UI' , 'Helvetica Neue' , Lato, Roboto, 'PingFang SC' , 'Microsoft JhengHei' , 'Microsoft YaHei' , sans-serif";
  } else {
    document.documentElement.style.setProperty("--global-font", n);
    document.body.style.fontFamily =
      "var(--global-font),-apple-system, IBM Plex Mono ,monosapce,'微软雅黑', sans-serif";
  }
  try {
    setFontBorder();
  } catch (err) { }
}

// 设置字体选择框边界
function setFontBorder() {
  var curFont = localStorage.getItem("font");
  var swfId = "swf_" + curFont;
  document.getElementById(swfId).style.border = "2px solid var(--theme-color)";
  Array.prototype.forEach.call(
    document.getElementsByClassName("swf"),
    function (ee) {
      if (ee.id != swfId) ee.style.border = "2px solid var(--border-color)";
    }
  );
}

// 设置主题色
if (localStorage.getItem("themeColor") == undefined) {
  // localStorage.setItem("themeColor", "darkblue");
}
setColor(localStorage.getItem("themeColor"));
function setColor(c) {
  document.getElementById("themeColor").innerText =
    `:root{--theme-color:` + map.get(c) + ` !important}`;
  localStorage.setItem("themeColor", c);
  // 刷新鼠标颜色
  CURSOR.refresh();
  // 设置一个带有透明度的主题色，用于菜单栏的悬浮颜色
  var theme_color = map.get(c);
  var trans_theme_color =
    "rgba" + theme_color.substring(3, theme_color.length - 1) + ", 0.7)";
  var high_trans_color =
    "rgba" + theme_color.substring(3, theme_color.length - 1) + ", 0.5)";
  document.documentElement.style.setProperty(
    "--text-bg-hover",
    trans_theme_color
  );
  document.documentElement.style.setProperty(
    "--high-trans-color",
    high_trans_color
  );
}

// 星空背景开关
if (localStorage.getItem("universe") == undefined) {
  localStorage.setItem("universe", "block");
}
setUniverse2(localStorage.getItem("universe"));
function setUniverse2(c) {
  document.getElementById("universe").style.display = c;
  localStorage.setItem("universe", c);
}
function setUniverse() {
  if (document.getElementById("universeSet").checked) {
    setUniverse2("block");
  } else {
    setUniverse2("none");
  }
}

// 主题自动切换
if (localStorage.getItem('themeAuto') == undefined) {
  setThemeAuto();
}
handleCurTheme();
function setThemeAuto() {
  localStorage.setItem('themeAuto', localStorage.getItem('themeAuto') == 'true' ? false : true);
  if (localStorage.getItem('themeAuto') == 'true') {
    location.reload();
  } else {
    setThemeConfigStyle();
  }
}
function handleCurTheme() {
  if (localStorage.getItem('themeAuto') == 'true') {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let curSeasonConfig;
    if (month < 3 || month == 3 && day < 21) {
      curSeasonConfig = seasonTheme.winter
    } else if (month < 6 || month == 6 && day < 22) {
      curSeasonConfig = seasonTheme.spring
    } else if (month < 9 || month == 9 && day < 23) {
      curSeasonConfig = seasonTheme.summer
    } else if (month < 12 || month == 12 && day < 21) {
      curSeasonConfig = seasonTheme.autumn
    } else {
      curSeasonConfig = seasonTheme.winter
    }
    setColor(curSeasonConfig.themeColor);
    localStorage.setItem("sakura", curSeasonConfig.sakura);
    localStorage.setItem("sakuraItem", curSeasonConfig.sakuraItem);
    localStorage.setItem("snow", curSeasonConfig.snow);
  }
}
function setThemeConfigStyle() {
  const themeSetToggleList = document.getElementsByClassName("themeSetToggle");
  if (localStorage.getItem('themeAuto') == 'true') {
    for(let item of themeSetToggleList) {
      item.classList.toggle("themeSetDisabled");
    }
  }
}

// 雪花开关
if (localStorage.getItem("snow") == undefined) {
  localStorage.setItem("snow", "block");
}
document.getElementById("snow").style.display = localStorage.getItem("snow");
function setSnow() {
  if (document.getElementById("snowSet").checked) {
    document.getElementById("snow").style.display = "block";
    localStorage.setItem("snow", "block");
  } else {
    document.getElementById("snow").style.display = "none";
    localStorage.setItem("snow", "none");
  }
}

// 飘落效果开关
if (localStorage.getItem("sakura") == undefined) {
  localStorage.setItem("sakura", "none");
}
document.getElementById("canvas_sakura").style.display =
  localStorage.getItem("sakura");
function setSakura() {
  if (document.getElementById("sakuraSet").checked) {
    document.getElementById("canvas_sakura").style.display = "block";
    localStorage.setItem("sakura", "block");
  } else {
    document.getElementById("canvas_sakura").style.display = "none";
    localStorage.setItem("sakura", "none");
  }
}

// 樱花飘落效果：樱花or枫叶
if (localStorage.getItem("sakuraItem") == undefined) {
  localStorage.setItem("sakuraItem", "sakura");
}
function setSakuraItem() {
  if (document.getElementById("sakuraItemSet").checked) {
    img.src = "https://oss.iuoyt.com/resource/elements/202202251325420.webp"; // 枫叶
    localStorage.setItem("sakuraItem", "maple");
  } else {
    img.src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUgAAAEwCAYAAADVZeifAAAACXBIWXMAAACYAAAAmAGiyIKYAAAHG2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBSaWdodHM9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9yaWdodHMvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcFJpZ2h0czpNYXJrZWQ9IkZhbHNlIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NDFDMjQxQjYyNjIwNjgxMTgwODNEMjE2MDAzOTU1NDQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDozNDVjOWViOC04NDc4LTFkNDctOGRjMi0yZDkyOGNhYTYxZWQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YjAzN2ZiMGItNTU5Mi0xYjRkLWJjZGQtOWU4NGExMDJiMGM2IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTA1LTA5VDE0OjQ5OjM3KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOC0wNS0wOVQxNDo1MToyNSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOC0wNS0wOVQxNDo1MToyNSswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjEyMjVlZWE3LTEyY2QtMTY0NC04ZDAzLWFjOTE2ZTAxZDQ1YyIgc3RSZWY6ZG9jdW1lbnRJRD0idXVpZDoxRDIwNUFGNjZCRDlFNTExOUM5REMwMzg2RjlEQjFGNyIvPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphYmMzNjIzMy1hOWNkLWNiNDQtODViYi0zZTgyMjEwYmIxMjYiIHN0RXZ0OndoZW49IjIwMTgtMDUtMDlUMTQ6NTE6MjUrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YjAzN2ZiMGItNTU5Mi0xYjRkLWJjZGQtOWU4NGExMDJiMGM2IiBzdEV2dDp3aGVuPSIyMDE4LTA1LTA5VDE0OjUxOjI1KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2Vx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";
    localStorage.setItem("sakuraItem", "sakura");
  }
  startSakura();
}

// 帧率监测开关
if (localStorage.getItem("fpson") == undefined) {
  localStorage.setItem("fpson", "1");
}
function fpssw() {
  if (document.getElementById("fpson").checked) {
    localStorage.setItem("fpson", "1");
  } else {
    localStorage.setItem("fpson", "0");
  }
  setTimeout(reload, 600);
}

// 刷新窗口
function reload() {
  window.location.reload();
}

// 侧边栏开关
if (localStorage.getItem("rs") == undefined) {
  localStorage.setItem("rs", "block");
}
if (localStorage.getItem("rs") == "block") {
  document.getElementById(
    "rightSide"
  ).innerText = `:root{--rightside-display: block}`;
} else {
  document.getElementById(
    "rightSide"
  ).innerText = `:root{--rightside-display: none}`;
}
function toggleRightside() {
  // 先设置localStorage变量
  if (document.getElementById("rightSideSet").checked) {
    localStorage.setItem("rs", "block");
    document.getElementById(
      "rightSide"
    ).innerText = `:root{--rightside-display: block}`;
  } else {
    localStorage.setItem("rs", "none");
    document.getElementById(
      "rightSide"
    ).innerText = `:root{--rightside-display: none}`;
  }
}

// // 天气开关
// if (!localStorage.getItem("weather")) {
//   localStorage.setItem("weather", "-50px");
// }
// document.getElementById("he-plugin-simple").style.top = localStorage.getItem("weather");
// document
//   .getElementById("he-plugin-simple")
//   .setAttribute("style", "top:" + localStorage.getItem("weather"));
// function setWeather() {
//   if (document.getElementById("weatherSet").checked) {
//     document.getElementById("he-plugin-simple").style.top = "10px";
//     localStorage.setItem("weather", "10px");
//   } else {
//     document.getElementById("he-plugin-simple").style.top = "-50px";
//     localStorage.setItem("weather", "-50px");
//   }
// }

// 透明度调节滑块
if (localStorage.getItem("transNum") == undefined) {
  localStorage.setItem("transNum", 85);
}
var curTransNum = localStorage.getItem("transNum");
var curTransMini = curTransNum * 0.95;
document.getElementById(
  "transPercent"
).innerText = `:root{--trans-light: rgba(253, 253, 253, ${curTransNum}%) !important; --trans-dark: rgba(25, 25, 25, ${curTransNum}%) !important} `;
function setTrans() {
  var elem = document.getElementById("transSet");
  var newTransNum = elem.value;
  var target = document.querySelector(".transValue");
  target.innerHTML = "透明度 (0%-100%): " + newTransNum + "%";
  localStorage.setItem("transNum", newTransNum);
  curTransMini = newTransNum * 0.95;
  curTransNum = newTransNum; // 更新当前透明度
  document.querySelector("#rang_trans").style.width = curTransMini + "%";
  document.getElementById(
    "transPercent"
  ).innerText = `:root{--trans-light: rgba(253, 253, 253, ${newTransNum}%) !important; --trans-dark: rgba(25, 25, 25, ${newTransNum}%) !important} `;
}

// 模糊度调节滑块
if (localStorage.getItem("blurRad") == undefined) {
  localStorage.setItem("blurRad", 20);
}
var curBlur = localStorage.getItem("blurRad"); // 当前模糊半径
var miniBlur = curBlur * 0.95;
document.getElementById(
  "blurNum"
).innerText = `:root{--blur-num: blur(${curBlur}px) saturate(120%) !important`;
function setBlurNum() {
  var elem = document.getElementById("blurSet");
  var newBlur = elem.value;
  var target = document.querySelector(".blurValue");
  target.innerHTML = "模糊半径 (开启模糊生效 0px-100px): " + newBlur + "px";
  localStorage.setItem("blurRad", newBlur);
  curBlur = newBlur;
  miniBlur = curBlur * 0.95;
  // var max = elem.getAttribute("max");
  document.querySelector("#rang_blur").style.width = miniBlur + "%";
  document.getElementById(
    "blurNum"
  ).innerText = `:root{--blur-num: blur(${curBlur}px) saturate(120%) !important`;
}

// 模糊效果开关
if (localStorage.getItem("blur") == undefined) {
  localStorage.setItem("blur", 0);
}
if (localStorage.getItem("blur") == 0) {
  document.getElementById(
    "settingStyle"
  ).innerText = `:root{--backdrop-filter: none}`;
} else {
  document.getElementById(
    "settingStyle"
  ).innerText = `:root{--backdrop-filter: var(--blur-num)}`;
}
function setBlur() {
  if (document.getElementById("blur").checked) {
    localStorage.setItem("blur", 1);
    document.getElementById(
      "settingStyle"
    ).innerText = `:root{--backdrop-filter: var(--blur-num)}`;
  } else {
    localStorage.setItem("blur", 0);
    document.getElementById(
      "settingStyle"
    ).innerText = `:root{--backdrop-filter: none}`;
  }
}

// 更换背景(原来Leonus的代码)
// 存数据
// name：命名 data：数据
// function saveData(name, data) {
//   localStorage.setItem(name, JSON.stringify({ time: Date.now(), data: data }));
// }
// 取数据
// name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据
// function loadData(name, time) {
//   let d = JSON.parse(localStorage.getItem(name));
//   // 过期或有错误返回 0 否则返回数据
//   if (d) {
//     let t = Date.now() - d.time;
//     if (t < time * 60 * 1000 && t > -1) return d.data;
//   }
//   return 0;
// }
// 上面两个函数如果你有其他需要存取数据的功能，也可以直接使用
// 读取背景
// try {
//   let data = loadData("blogbg", 1440);
//   if (data) changeBg(data, 1);
//   else localStorage.removeItem("blogbg");
// } catch (error) {
//   localStorage.removeItem("blogbg");
// }
// 切换背景函数
// 此处的flag是为了每次读取时都重新存储一次,导致过期时间不稳定
// 如果flag为0则存储,即设置背景. 为1则不存储,即每次加载自动读取背景.
// function changeBg(s, flag) {
//   let bg = document.getElementById("web_bg");
//   if (s.charAt(0) == "#") {
//     bg.style.backgroundColor = s;
//     bg.style.backgroundImage = "none";
//   } else {
//     bg.style.backgroundImage = s
//   };
//   if (!flag) {
//     saveData("blogbg", s);
//   }
// }

// 切换自定义颜色
var defineColor =
  localStorage.getItem("blogbg") &&
    localStorage.getItem("blogbg").charAt(0) == "#"
    ? localStorage.getItem("blogbg")
    : "#F4D88A";
function changeBgColor() {
  changeBg(document.querySelector("#define_colors").value);
}

// 必应每日壁纸API
let bingDayBg =
  screen.width <= 768
    ? "url(https://bing.img.run/m.php)"
    : "url(https://bing.img.run/1920x1080.php)";
// 必应随机历史壁纸API
let bingHistoryBg =
  screen.width <= 768
    ? "url(https://bing.img.run/rand_m.php)"
    : "url(https://bing.img.run/rand.php)";
// EEE.DOG
let EEEDog = "url(https://api.yimian.xyz/img?type=moe&size=1920x1080)";
// 随机美图cdn.seovx.com
let seovx = "url(https://cdn.seovx.com/?mom=302)";
// picsum随机
let picsum = "url(https://picsum.photos/1920/1080.webp)";
// 小歪二次元
// let waiDongman = "url(https://api.ixiaowai.cn/api/api.php)";
//  小歪高清壁纸
let waiBizhi = "url(https://api.ixiaowai.cn/gqapi/gqapi.php)";
// 博天随机
let btstu = "url(http://api.btstu.cn/sjbz/?lx=suiji)";
// tuapi 动漫
// let tuapi = "url(https://tuapi.eees.cc/api.php?category=dongman)";
// unsplash随机 https://source.unsplash.com/random/1920x1080/daily (weekly)
let unsplash = "url(https://source.unsplash.com/random/1920x1080/)";

// 更换背景(自己的代码)
if (localStorage.getItem("blogbg") != undefined) {
  setBg(localStorage.getItem("blogbg"));
} else {
  document.getElementById("defineBg").innerText = `:root{
    --default-bg: url(https://oss.iuoyt.com/img/bg/pc_day.webp);
    --darkmode-bg:url(https://oss.iuoyt.com/img/bg/pc_night.webp);
    --mobileday-bg: url(https://oss.iuoyt.com/img/bg/mobile_day.webp);
    --mobilenight-bg: url(https://oss.iuoyt.com/img/bg/mobile_night.webp);
  }`;
}
// 切换背景主函数
function changeBg(s) {
  // 自定义颜色框
  defineColor = s.charAt(0) == "#" ? s : "#F4D88A";
  setBg(s);
  localStorage.setItem("blogbg", s);
}
// 设置背景属性
function setBg(s) {
  document.getElementById("defineBg").innerText = `:root{
    --default-bg: ${s};
    --darkmode-bg: ${s};
    --mobileday-bg: ${s};
    --mobilenight-bg: ${s};
  }`;
}

// 切换链接对应的背景(加入了链接检验与防抖)
function getPicture() {
  debounce(getPicture_, 300);
}

function getPicture_() {
  checkImgExists(document.getElementById("pic-link").value)
    .then(() => {
      // 有效的图片链接
      var link = "url(" + document.getElementById("pic-link").value + ")";
      changeBg(link);
      // 提示切换成功
      new Vue({
        data: function () {
          this.$notify({
            title: "可以啦🍨",
            message: "切换自定义背景成功！",
            position: "top-left",
            offset: 50,
            showClose: true,
            type: "success",
            duration: 5000,
          });
        },
      });
    })
    .catch(() => {
      // 无效的图片链接，提示无效
      new Vue({
        data: function () {
          this.$notify({
            title: "链接不对🤔",
            message: "请输入有效的图片链接！",
            position: "top-left",
            offset: 50,
            showClose: true,
            type: "warning",
            duration: 5000,
          });
        },
      });
    });
}
// 判断图片链接是否可用
function checkImgExists(imgurl) {
  return new Promise(function (resolve, reject) {
    var ImgObj = new Image();
    ImgObj.src = imgurl;
    ImgObj.onload = function (res) {
      resolve(res);
    };
    ImgObj.onerror = function (err) {
      reject(err);
    };
  });
}

// 黑夜霓虹灯开关
if (localStorage.getItem("light") == undefined) {
  localStorage.setItem("light", "true");
}
// 这里要适配Pjax
document.addEventListener("pjax:complete", function () {
  changeLight(localStorage.getItem("light") == "true" ? true : false);
});
document.addEventListener("DOMContentLoaded", function () {
  changeLight(localStorage.getItem("light") == "true" ? true : false);
});
function setLight() {
  if (document.getElementById("lightSet").checked) {
    changeLight(true);
    localStorage.setItem("light", "true");
  } else {
    changeLight(false);
    localStorage.setItem("light", "false");
  }
}
// 更换霓虹灯状态
function changeLight(flag) {
  if (document.getElementById("site-name"))
    document.getElementById("site-name").style.animation = flag
      ? "light_15px 10s linear infinite"
      : "none";
  if (document.getElementById("site-title"))
    document.getElementById("site-title").style.animation = flag
      ? "light_15px 10s linear infinite"
      : "none";
  if (document.getElementById("site-subtitle"))
    document.getElementById("site-subtitle").style.animation = flag
      ? "light_10px 10s linear infinite"
      : "none";
  if (document.getElementById("post-info"))
    document.getElementById("post-info").style.animation = flag
      ? "light_5px 10s linear infinite"
      : "none";
  document.getElementById("menu_shadow").innerText = flag
    ? `:root{--menu-shadow: 0 0 1px var(--theme-color);}`
    : `:root{--menu-shadow: none;}`;
}

// 解决开启Pjax的问题
// function whenDOMReady() {
//   try {
//     let data = loadData('blogbg', 1440)
//     if (data) changeBg_noWindow(data, 0)
//     else localStorage.removeItem('blogbg');
//   } catch (error) { localStorage.removeItem('blogbg'); }
// }
// whenDOMReady()
// document.addEventListener("pjax:success", whenDOMReady)

// 无弹窗提醒更换背景
// function changeBg_noWindow(s, flag) {
//   let bg = document.getElementById("web_bg");
//   if (s.charAt(0) == "#") {
//     bg.style.backgroundColor = s;
//     bg.style.backgroundImage = "none";
//   } else bg.style.backgroundImage = s;
//   if (!flag) {
//     saveData("blogbg", s);
//   }
// }

// 创建窗口
var winbox = "";

function createWinbox() {
  let div = document.createElement("div");
  document.body.appendChild(div);
  winbox = WinBox({
    id: "meihuaBox",
    index: 99,
    title: "美化设置",
    x: "left",
    y: "center",
    minwidth: "300px",
    height: "60%",
    // "#76c8f1"
    background: "var(--theme-color)",
    onmaximize: () => {
      div.innerHTML = `<style>body::-webkit-scrollbar {display: none;} div#meihuaBox {width: 100% !important;}</style>`;
    },
    onrestore: () => {
      div.innerHTML = "";
    },
  });
  winResize();
  window.addEventListener("resize", winResize);

  // 每一类我放了一个演示，直接往下复制粘贴 a标签 就可以，需要注意的是 函数里面的链接 冒号前面需要添加反斜杠\进行转义
  winbox.body.innerHTML = `
<div class="settings" style="display: block;">
<div id="article-container" style="padding:12px;">
<br>
<center><p><button onclick="reset()" style="background:linear-gradient(to right, #fc354c, #0abfbc);display:block;width:40%;padding:15px 0;border-radius:30px;color:white;font-size:1.1em;"><i class="fa-solid fa-arrows-rotate"></i>&nbsp;恢复默认设置</button></p></center>

<h2>一、显示偏好</h2>

<div class="transValue" style="font-weight:bold;padding-left:10px">透明度 (0%-100%): ${curTransNum}%</div>
<div class="range">
  <input id="transSet" type="range" min="0" max="100" step="1" value=${curTransNum} oninput="setTrans()">
  <p class="rang_width" id="rang_trans" style="width:${curTransMini}%"></p>
</div>

<div class="blurValue" style="font-weight:bold;padding-left:10px">模糊半径 (开启模糊生效 0px-100px): ${curBlur} px</div>
<div class="range">
  <input id="blurSet" type="range" min="0" max="100" step="1" value="${curBlur}" oninput="setBlurNum()">
  <p class="rang_width" id="rang_blur" style="width:${miniBlur}%"></p>
</div>

<div class="content" style="display:flex">
  <input type="checkbox" id="blur" onclick="setBlur()" style="min-width:37px">
  <div class="content-text" style="font-weight:bold; padding-left:10px"> 模糊效果（消耗性能）</div>
</div>

<div class="content" style="display:flex">
  <input type="checkbox" id="lightSet" onclick="setLight()" style="min-width:37px">
  <div class="content-text" style="font-weight:bold; padding-left:10px"> 霓虹彩灯（夜间模式）</div>
</div>

<div class="content" style="display:flex">
  <input type="checkbox" id="universeSet" onclick="setUniverse()" style="min-width:37px">
  <div class="content-text" style="font-weight:bold; padding-left:10px"> 星空特效（夜间模式）</div>
</div>

<div class="content" style="display:flex">
  <input type="checkbox" id="fpson" onclick="fpssw()" style="min-width:37px">
  <div class="content-text" style="font-weight:bold; padding-left:10px"> 帧率监测（刷新生效）</div>
</div>

<div class="content" style="display:flex">
  <input type="checkbox" id="rightSideSet" onclick="toggleRightside()" style="min-width:37px">
  <div class="content-text" style="font-weight:bold; padding-left:10px"> 侧栏显示 </div>
</div>

<!-- <div class="content" style="display:flex">
  <input type="checkbox" id="weatherSet" onclick="setWeather()" style="min-width:37px">
  <div class="content-text" style="font-weight:bold; padding-left:10px"> 天气显示（手机端不生效） </div>
</div> -->

<h2>二、主题设置</h2>

<!-- 季节主题自动切换 -->
<div class="content" style="display:flex">
  <input type="checkbox" id="setThemeAuto" onclick="setThemeAuto()" style="min-width:37px">
  <div class="content-text" style="font-weight:bold; padding-left:10px"> 主题自动切换（雪花、飘落特效、主题色） </div>
</div>

<div class="content themeSetToggle" style="display:flex">
  <input type="checkbox" id="snowSet" onclick="setSnow()" style="min-width:37px">
  <div class="content-text" style="font-weight:bold; padding-left:10px"> 雪花特效（白天模式）</div>
</div>

<div class="content themeSetToggle" style="display:flex">
  <input type="checkbox" id="sakuraSet" onclick="setSakura()" style="min-width:37px">
  <div class="content-text" style="font-weight:bold; padding-left:10px"> 飘落特效 </div>
  <div class="content-text" style="font-weight:bold; padding-left:20px"> 樱花 </div>
  <input type="checkbox" id="sakuraItemSet" onclick="setSakuraItem();setSakura()" style="min-width:37px">
  <div class="content-text" style="font-weight:bold"> 枫叶 </div>
</div>

<div class="content themeSetToggle" style="display:flex; align-items:center">
  <span class="content-text" style="font-weight:bold"> 主题色：</span>
  <input type="radio" id="red" name="colors" value=" " onclick="setColor('red')">
  <input type="radio" id="orange" name="colors" value=" " onclick="setColor('orange')">
  <input type="radio" id="yellow" name="colors" value=" " onclick="setColor('yellow')">
  <input type="radio" id="green" name="colors" value=" " onclick="setColor('green')">
  <input type="radio" id="blue" name="colors" value=" " onclick="setColor('blue')">
  <input type="radio" id="heoblue" name="colors" value=" " onclick="setColor('heoblue')">
  <input type="radio" id="darkblue" name="colors" value=" " onclick="setColor('darkblue')">
  <input type="radio" id="purple" name="colors" value=" " onclick="setColor('purple')">
  <input type="radio" id="pink" name="colors" value=" " onclick="setColor('pink')" checked="checked">
  <input type="radio" id="black" name="colors" value=" " onclick="setColor('black')">
  <input type="radio" id="blackgray" name="colors" value=" " onclick="setColor('blackgray')">
</div>

<style>
.themeSetDisabled {
  opacity: 0.5;
  pointer-events: none;
}
.themeSetDisabled input {
  cursor: not-allowed;
}
</style>

<h2>三、字体设置（字体切换请稍等片刻！）</h2>
<div class="note warning modern"><p>非商免字体未经授权只能个人使用。本站为完全非商业、非盈利性质的网站，平时用于个人学习交流，如有侵权请联系站长删除，谢谢！ —— 致版权方</p>
</div>
<p id="swfs">
  <a class="swf" id="swf_default" href="javascript:;" rel="noopener external nofollow" style="font-family:-apple-system, IBM Plex Mono ,monosapce,'微软雅黑', sans-serif;!important;color:black" onclick="setFont('default')">系统默认</a>
  <a class="swf" id="swf_LXGW" href="javascript:;" rel="noopener external nofollow" style="font-family:'LXGW'!important;color:black" onclick="setFont('LXGW')">霞鹜文楷</a>
  <a class="swf" id="swf_ZhuZiAWan" href="javascript:;" rel="noopener external nofollow" style="font-family:'ZhuZiAWan'!important;color:black" onclick="setFont('ZhuZiAWan')">筑紫A丸</a>
  <a class="swf" id="swf_MiSans" href="javascript:;" rel="noopener external nofollow" style="font-family:'MiSans'!important;color:black" onclick="setFont('MiSans')">MiSans</a>
  <a class="swf" id="swf_HYTMR" href="javascript:;" rel="noopener external nofollow" style="font-family:'HYTMR'!important;color:black" onclick="setFont('HYTMR')">汉仪唐美人</a>
  <a class="swf" id="swf_TTQHB" href="javascript:;" rel="noopener external nofollow" style="font-family:'TTQHB'!important;color:black" onclick="setFont('TTQHB')">甜甜圈海报</a>
  <a class="swf" id="swf_YSHST" href="javascript:;" rel="noopener external nofollow" style="font-family:'YSHST'!important;color:black" onclick="setFont('YSHST')">优设好身体</a>
</p>

<h2>四、背景设置</h2>
<center>
  <button onclick="resetBg()" style="background:var(--theme-color);display:block;width:35%;padding:15px 0;border-radius:30px;color:white;">
    <i class="fa-solid fa-arrows-rotate"></i>&nbsp;恢复默认背景
  </button>
</center>


<h3>1. 二次元</h3>
<details class="folding-tag" cyan><summary> 查看二次元背景 </summary>
              <div class='content'>
              <div class="bgbox">  <a href="javascript:;" rel="noopener external nofollow"     style="background-image:url(https://lskypro.acozycotage.net/Fomalhaut/img/home_bg.webp)"     class="imgbox" onclick="changeBg('url(https://lskypro.acozycotage.net/Fomalhaut/img/home_bg.webp)')"></a></div>
              </div>
            </details>


<h3>2. 风景</h3>
<details class="folding-tag" cyan><summary> 查看风景背景 </summary>
              <div class='content'>
              <div class="bgbox">  <a href="javascript:;" rel="noopener external nofollow"     style="background-image:url(https://lskypro.acozycotage.net/Fomalhaut/img/fj1.webp)"     class="imgbox" onclick="changeBg('url(https://lskypro.acozycotage.net/Fomalhaut/img/fj1.webp)')"></a></div>
              </div>
            </details>


<h3>3. 萌宠</h3>
<details class="folding-tag" cyan><summary> 查看萌宠背景 </summary>
              <div class='content'>
              <div class="bgbox">  <a href="javascript:;" rel="noopener external nofollow"   style="background-image:url(https://lskypro.acozycotage.net/Fomalhaut/img/mc1.webp)"     class="imgbox" onclick="changeBg('url(https://lskypro.acozycotage.net/Fomalhaut/img/mc1.webp)')"></a></div>
              </div>
            </details>


<h3>4. 渐变色</h3>
<details class="folding-tag" cyan><summary> 查看渐变色背景 </summary>
              <div class='content'>
              <div class="bgbox">  <a href="javascript:;" rel="noopener external nofollow" class="box"     style="background: linear-gradient(to right, #544a7d, #ffd452)"     onclick="changeBg('linear-gradient(to right, #544a7d, #ffd452)')"></a>  <a href="javascript:;" rel="noopener external nofollow" class="box"     style="background: linear-gradient(to bottom, #7f7fd5, #86a8e7, #91eae4)"     onclick="changeBg('linear-gradient(to bottom, #7f7fd5, #86a8e7, #91eae4)')"></a>  <a href="javascript:;" rel="noopener external nofollow" class="box"     style="background: linear-gradient(to left, #654ea3, #eaafc8)"     onclick="changeBg('linear-gradient(to left, #654ea3, #eaafc8)')"></a>  <a href="javascript:;" rel="noopener external nofollow" class="box"     style="background: linear-gradient(to top, #feac5e, #c779d0, #4bc0c8)"     onclick="changeBg('linear-gradient(to top, #feac5e, #c779d0, #4bc0c8)')"></a>  <a href="javascript:;" rel="noopener external nofollow" class="box"     style="background: linear-gradient(to top, #d3959b, #bfe6ba)"     onclick="changeBg('linear-gradient(to top, #d3959b, #bfe6ba)')"></a>  <a href="javascript:;" rel="noopener external nofollow" class="box"     style="background: linear-gradient(to top, #8360c3, #2ebf91)"     onclick="changeBg('linear-gradient(to top, #8360c3, #2ebf91)')"></a>  <a href="javascript:;" rel="noopener external nofollow"     class="box" style="background: linear-gradient(to top, #108dc7, #ef8e38)"     onclick="changeBg('linear-gradient(to top, #108dc7, #ef8e38)')"></a>  <a href="javascript:;" rel="noopener external nofollow"     class="box" style="background: linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)"     onclick="changeBg('linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)')"></a></div>
              </div>
            </details>


<h3>5. 纯色</h3>
<details class="folding-tag" cyan><summary> 查看纯色背景 </summary>
              <div class='content'>
              <div class="bgbox">  <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #ecb1b1" onclick="changeBg('#ecb1b1')"></a>   <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #d3ebac" onclick="changeBg('#d3ebac')"></a>   <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #ace9ce" onclick="changeBg('#ace9ce')"></a>  <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #c1ebea" onclick="changeBg('#c1ebea')"></a>   <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #dee7f1" onclick="changeBg('#dee7f1')"></a>   <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #e9e3f2" onclick="changeBg('#e9e3f2')"></a>   <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #f7eff5" onclick="changeBg('#f7eff5')"></a>    <input type="color" id="define_colors" href="javascript:;" rel="noopener external nofollow" class="box" autocomplete="on" value="${defineColor}" oninput="changeBgColor()"></input></div>
              </div>
            </details>


<h3>6. 适配手机</h3>
<details class="folding-tag" cyan><summary> 查看适配手机的背景 </summary>
              <div class='content'>
              <div class="bgbox">  <a href="javascript:;" rel="noopener external nofollow"     style="background-image:url(https://lskypro.acozycotage.net/Fomalhaut/img/mb4.webp)" class="pimgbox"     onclick="changeBg('url(https://lskypro.acozycotage.net/Fomalhaut/img/mb4.webp)')"></a></div>
              </div>
            </details>


<h3>7. 壁纸API</h3>
<details class="folding-tag" cyan><summary> 查看壁纸API系列背景 </summary>
              <div class='content'>
              <div class="bgbox">  <!-- <a bingid="bingDayBox" rel="noopener external nofollow" style="background-image: ${bingDayBg}" class="box apiBox" onclick="changeBg('${bingDayBg}')"></a> -->  <!-- <a id="bingHistoryBox" rel="noopener external nofollow" style="background-image: ${bingHistoryBg}" class="box apiBox" onclick="changeBg('${bingHistoryBg}')"></a> -->  <a id="EEEDogBox" rel="noopener external nofollow" style="background-image: ${EEEDog}" class="box apiBox" onclick="changeBg('${EEEDog}')"></a>  <!-- <a id="seovxBox" rel="noopener external nofollow" style="background-image: ${seovx}" class="box apiBox" onclick="changeBg('${seovx}')"></a> -->  <a id="picsumBox" rel="noopener external nofollow" style="background-image: ${picsum}" class="box apiBox" onclick="changeBg('${picsum}')"></a>  <!-- <a id="waiBizhiBox" rel="noopener external nofollow" style="background-image: ${waiBizhi}" class="box apiBox" onclick="changeBg('${waiBizhi}')"></a> -->  <a id="btstuBox" rel="noopener external nofollow" style="background-image: ${btstu}" class="box apiBox" onclick="changeBg('${btstu}')"></a>  <a id="unsplashBox" rel="noopener external nofollow" style="background-image: ${unsplash}" class="box apiBox" onclick="changeBg('${unsplash}')"></a></div>
              </div>
            </details>


<h3>8. 自定义背景</h3>
<details class="folding-tag" cyan><summary> 设置自定义背景 </summary>
              <div class='content'>
              <p><center><input type="text" id="pic-link" size="70%" maxlength="1000" placeholder="请输入有效的图片链接，如 https://oss.iuoyt.com/img/bg/pc_day.webp"></center></p><p><center><button type="button" onclick="getPicture()" style="background:var(--theme-color);width:35%;padding: 5px 0px 7px 0px;border-radius:30px;color:white;line-height:2;">🌈切换背景🌈</button></center></p>
              </div>
            </details>

<br>
<center><div style="font-size:1.2em;color:var(--theme-color);font-weight:bold;">------ ( •̀ ω •́ )y 到底啦 ------</div></center>
<br>

</div>

</div>

`;

  // 打开小窗时候初始化
  $("#" + localStorage.getItem("themeColor")).attr("checked", true);
  if (localStorage.getItem("blur") == 1) {
    document.getElementById("blur").checked = true;
  } else {
    document.getElementById("blur").checked = false;
  }
  if (localStorage.getItem("universe") == "block") {
    document.getElementById("universeSet").checked = true;
  } else if (localStorage.getItem("universe") == "none") {
    document.getElementById("universeSet").checked = false;
  }
  if (localStorage.getItem("sakura") == "block") {
    document.getElementById("sakuraSet").checked = true;
  } else if (localStorage.getItem("sakura") == "none") {
    document.getElementById("sakuraSet").checked = false;
  }
  if (localStorage.getItem("sakuraItem") == "sakura") {
    document.getElementById("sakuraItemSet").checked = false;
  } else if (localStorage.getItem("sakuraItem") == "maple") {
    document.getElementById("sakuraItemSet").checked = true;
  }
  // if (localStorage.getItem("weather") == "10px") {
  //   document.getElementById("weatherSet").checked = true;
  // } else if (localStorage.getItem("weather") == "-50px") {
  //   document.getElementById("weatherSet").checked = false;
  // }
  // document.getElementById("weatherSet").checked = false;
  if (localStorage.getItem("fpson") == "1") {
    document.getElementById("fpson").checked = true;
  } else {
    document.getElementById("fpson").checked = false;
  }
  if (localStorage.getItem("rs") == "block") {
    document.getElementById("rightSideSet").checked = true;
  } else if (localStorage.getItem("rs") == "none") {
    document.getElementById("rightSideSet").checked = false;
  }
  if (localStorage.getItem("light") == "true") {
    document.getElementById("lightSet").checked = true;
  } else {
    document.getElementById("lightSet").checked = false;
  }
  setFontBorder();
  if (localStorage.getItem("snow") == "block") {
    document.getElementById("snowSet").checked = true;
  } else if (localStorage.getItem("snow") == "none") {
    document.getElementById("snowSet").checked = false;
  }
  document.getElementById("setThemeAuto").checked = localStorage.getItem("themeAuto") == "true" ? true : false;
  setThemeConfigStyle();
}

// 恢复默认背景
function resetBg() {
  localStorage.removeItem("blogbg");
  reload();
}

// 恢复默认设置并刷新页面
function reset() {
  clearItem();
  reload();
}

// 适应窗口大小
function winResize() {
  try {
    var offsetWid = document.documentElement.clientWidth;
    if (offsetWid <= 768) {
      winbox.resize(offsetWid * 0.95 + "px", "90%").move("center", "center");
    } else {
      winbox.resize(offsetWid * 0.6 + "px", "70%").move("center", "center");
    }
  } catch (err) {
    // console.log("Pjax毒瘤抽风运行winResize方法🙄🙄🙄");
  }
}

// 切换状态，窗口已创建则控制窗口显示和隐藏，没窗口则创建窗口
function toggleWinbox() {
  if (document.querySelector("#meihuaBox")) {
    winbox.toggleClass("hide");
  } else {
    createWinbox();
  }
}

/* 美化模块 end */

//----------------------------------------------------------------

/* 视频控制 */

// 等待页面加载完成后执行操作
document.addEventListener("DOMContentLoaded", function () {
  // 获取所有video元素
  var videoElements = document.querySelectorAll("video");

  // 遍历每个video元素并设置controlslist属性为"nodownload"
  videoElements.forEach(function (video) {
    video.setAttribute("controlslist", "nodownload");
    video.setAttribute("preload", "none");

    // 禁用默认右键菜单
    video.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    });
  });
});

/* 视频控制 end */

//----------------------------------------------------------------

/* 判断是否需要添加referrer头 */

// // 获取当前页面的路径
// var currentPath = window.location.pathname;
// // 判断路径是否以 "/TreasureBox/sitv/" 开头
// if (!(currentPath.startsWith("/TreasureBox/sitv/") || currentPath.startsWith("/posts/"))) {
// alert(currentPath);
//   // 当前页面不在 "/TreasureBox/sitv/" 或 "/posts/" 下，添加meta标签
//   var metaTag = document.createElement("meta");
//   metaTag.setAttribute("name", "referrer");
//   metaTag.setAttribute("content", "no-referrer");
//   // 将meta标签插入到head标签中
//   var headElement = document.querySelector("head");
//   headElement.appendChild(metaTag);
// }

/* 判断是否需要添加referrer头 end */

//----------------------------------------------------------------

/* 文章统计适配明暗模式 */

function switchPostChart() {
  // 这里为了统一颜色选取的是“明暗模式”下的两种字体颜色，也可以自己定义
  let color =
    document.documentElement.getAttribute("data-theme") === "light"
      ? "#4C4948"
      : "rgba(255,255,255,0.7)";
  if (document.getElementById("posts-chart") && postsOption) {
    try {
      let postsOptionNew = postsOption;
      postsOptionNew.title.textStyle.color = color;
      postsOptionNew.xAxis.nameTextStyle.color = color;
      postsOptionNew.yAxis.nameTextStyle.color = color;
      postsOptionNew.xAxis.axisLabel.color = color;
      postsOptionNew.yAxis.axisLabel.color = color;
      postsOptionNew.xAxis.axisLine.lineStyle.color = color;
      postsOptionNew.yAxis.axisLine.lineStyle.color = color;
      postsOptionNew.series[0].markLine.data[0].label.color = color;
      postsChart.setOption(postsOptionNew);
    } catch (error) {
      console.log(error);
    }
  }
  if (document.getElementById("tags-chart") && tagsOption) {
    try {
      let tagsOptionNew = tagsOption;
      tagsOptionNew.title.textStyle.color = color;
      tagsOptionNew.xAxis.nameTextStyle.color = color;
      tagsOptionNew.yAxis.nameTextStyle.color = color;
      tagsOptionNew.xAxis.axisLabel.color = color;
      tagsOptionNew.yAxis.axisLabel.color = color;
      tagsOptionNew.xAxis.axisLine.lineStyle.color = color;
      tagsOptionNew.yAxis.axisLine.lineStyle.color = color;
      tagsOptionNew.series[0].markLine.data[0].label.color = color;
      tagsChart.setOption(tagsOptionNew);
    } catch (error) {
      console.log(error);
    }
  }
  if (document.getElementById("categories-chart") && categoriesOption) {
    try {
      let categoriesOptionNew = categoriesOption;
      categoriesOptionNew.title.textStyle.color = color;
      categoriesOptionNew.legend.textStyle.color = color;
      if (!categoryParentFlag) {
        categoriesOptionNew.series[0].label.color = color;
      }
      categoriesChart.setOption(categoriesOptionNew);
    } catch (error) {
      console.log(error);
    }
  }
}
// document.getElementById("mode-button").addEventListener("click", function(){setTimeout(switchPostChart, 100)})

/* 文章统计适配明暗模式end */

//----------------------------------------------------------------

/* SITV页面视频点播 */

// 视频禁用右键
// document.getElementById("videoPlayerBox").addEventListener('contextmenu', e => e.preventDefault());
function playVideo(button) {
  var vcode = button.getAttribute("vcode"); // 获取按钮的videoUrl属性值
  var currentPlay = button.getAttribute("content"); // 获取按钮的content属性值
  var videoPlayer = document.getElementById("videoPlayer");
  var curPlayContent = document.getElementById("curPlayContent");
  var videoPlayerBox = document.getElementById("videoPlayerBox");
  videoPlayerBox.style.height = "0px"; // 收回播放框
  setTimeout(function () {
    var player = new DogePlayer({
      container: videoPlayer,
      userId: 7140,
      vcode: vcode,
      autoPlay: true,
    });
    curPlayContent.innerHTML = currentPlay; // 展示当前播放内容
    var videoWidth = videoPlayer.clientWidth; // 获取 video 元素的宽度
    var videoHeight = (videoWidth / 16) * 9; // 根据16:9比例计算高度
    videoPlayerBox.style.height = videoHeight + "px"; // 打开播放框
  }, 650);
}

/* SITV页面视频点播end */

//----------------------------------------------------------------

/* 加密页面隐藏评论区 */
// 监听storage事件

var curPath = window.location.pathname;
var checkPasswordItem = "hexo-blog-encrypt:#" + curPath;

function checkIsHasPassword() {
  if (localStorage.getItem(checkPasswordItem) !== null) {
    document.getElementById("post-comment").style.display = "block";
    clearInterval(intervalId); // 停止定时器，不再继续检查
  }
}

if (
  curPath.startsWith("/pages/box/sitv/") &&
  !curPath.startsWith("/pages/box/sitv/v2/photos/2021/") &&
  !curPath.startsWith("/pages/box/sitv/v2/photos/2020/") &&
  !curPath.startsWith("/pages/box/sitv/v2/photos/smc/") &&
  !localStorage.getItem(checkPasswordItem)
) {
  document.getElementById("post-comment").style.display = "none";
  // 设置定时器，每隔一段时间检查localStorage是否有保存当前页面密码
  const intervalTime = 1000; // 设置检查间隔，单位：毫秒
  const intervalId = setInterval(checkIsHasPassword, intervalTime);
}

/* 加密页面隐藏评论区end */

//----------------------------------------------------------------

/* 友链申请自查 */

function checkForm() {
  const checkboxes = document.querySelectorAll('.link-check input[type="checkbox"]');
  let allChecked = true;
  let addBtn = document.getElementById("addBtn");
  let flinkApply = document.getElementById("flinkApply");

  // 遍历所有复选框，检查是否都被选中
  checkboxes.forEach((checkbox) => {
    if (!checkbox.checked) {
      allChecked = false;
    }
  });

  if (allChecked) {
    addBtn.style.display = "flex";
    flinkApply.style.display = "block";
  } else {
    addBtn.style.display = "none";
    flinkApply.style.display = "none";
  }
}

/* 友链申请自查end */

//----------------------------------------------------------------

/* 友链申请 */
function TestUrl(url) {
  var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  var objExp = new RegExp(Expression);
  if (objExp.test(url) != true) {
    return false;
  }
  return true;
}
function askFriend(event) {
  let check = $("#friend-check").is(":checked");
  let name = $("#friend-name").val();
  let url = $("#friend-link").val();
  let image = $("#friend-icon").val();
  let des = $("#friend-des").val();
  if (!check) {
    alert("Please check \"I am not submitting nonsense information\"");
    return;
  }
  if (!(name && url && image && des)) {
    alert("The information is incomplete! ");
    return;
  }
  if (!(TestUrl(url))) {
    alert("URL format error! Need to include HTTP protocol header! ");
    return;
  }
  if (!(TestUrl(image))) {
    alert("The format of the slice URL is wrong! It needs to contain the HTTP protocol header! ");
    return;
  }
  event.target.classList.add('is-loading');
  $.ajax({
    type: 'POST',
    dataType: "json",
    data: {
      "name": name,
      "url": url,
      "image": image,
      "description": des,
    },
    url: 'https://qexo.iuoyt.com/pub/ask_friend/',
    success: function (data) {
      alert(data.msg);
    }
  })
}
/* 友链申请end */

//----------------------------------------------------------------

/* 判断友链是否需要重新获取，已弃用 */
function isLinkLoaded() {
  var currentPath = window.location.pathname;

  // 判断当前路径是否满足条件
  if (currentPath === "/pages/social/links/") {
    var found = false; // 用于标记是否找到元素
    var intervalId = setInterval(function () {
      var qexo_links = document.querySelectorAll("#qexo-friends .flink-list-item");
      if (qexo_links.length > 0) {
        found = true;
        var noLinkTips = document.getElementById("no-link-tips");
        noLinkTips.style.display = "none";
        clearInterval(intervalId);
        return;
      }
    }, 100);

    // 设置一个 3 秒的超时，若超过时间则刷新页面
    setTimeout(function () {
      loadQexoFriends("qexo-friends", "https://qexo.iuoyt.com");
      // clearInterval(intervalId);
      // if (!found) {
      //   location.reload();
      // }
    }, 3000);
  }
}
/* 判断友链是否需要重新获取end */

//----------------------------------------------------------------

/* memos说说页面js */

function loadBibi() {
  var limit = 30; // 说说数量限制，0为不限制
  var avatar = 'https://oss.iuoyt.com/resource/elements/avatar.webp'; // 头像链接
  let url = 'https://memos.iuoyt.com'//这里地址最后面不要有'/'
  fetch(url + '/api/v1/memo?creatorId=1').then(res => res.json()).then(data => {
    let items = [],
      html = '',
      count = 0,
      icon = '<svg viewBox="0 0 512 512"xmlns="http://www.w3.org/2000/svg"class="is-badge icon"><path d="m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z"fill="#1da1f2"></path></svg>';
    data.forEach(item => {
      // 如果item.relationList为空，或者item.relationList[0].relatedMemoId等于item.id，是非回复的说说
      if (item.relationList.length == 0 || item.relationList[0].relatedMemoId == item.id) {
        if (limit > 0 && count >= limit) return;
        count++;
        items.push(Format(item));
      }
    });
    // 没有说说
    if (items.length == 0) {
      document.getElementsByClassName('limit')[0].innerHTML = '- 暂无说说 -';
      document.querySelector('.limit').style.display = 'block';
    }
    // 有上限数量的说说
    else if (items.length == limit) {
      document.getElementsByClassName('limit')[0].innerHTML = '- 只展示最近' + limit + '条说说 -';
      document.querySelector('.limit').style.display = 'block';
    }
    // 有未到上限的说说
    else {
      document.getElementsByClassName('limit')[0].innerHTML = '- 没有更多内容了 -';
      document.querySelector('.limit').style.display = 'block';
    }
    // 将每条说说的内容格式化
    items.forEach(item => {
      html += `
      <div class="talk_item">
        <div class="talk_meta">
          <img class="no-lightbox no-lazyload avatar" src="${avatar}">
          <div class="talk_info">
            <span class="talk_nick">${item.creatorUsername + icon}</span>
            <span class="talk_date">${item.date}</span>
          </div>
        </div>
        <div class="talk_content">
          ${item.content}
        </div>
        <div class="talk_bottom">
          <div class="talk_tag">${item.tag}</div>
          <span class="icon" onclick="goComment('${item.text}')" title="评论这条哔哔">
            <i class="fa-solid fa-message fa-fw"></i>
          </span>
        </div>
      </div>
      `
    })
    document.getElementById('talk').innerHTML = html
  })
  // 页面内容格式化
  function Format(item) {
    let date = getTime(new Date(item.createdTs * 1000).toString()),
      creatorUsername = item.creatorUsername,
      content = item.content,
      tag = item.content.match(/#([^ ]+)/g),
      imgs = content.match(/!\[.*\]\(.*?\)/g),
      text = '';
    // 图片处理
    if (imgs) imgs = imgs.map(item => { return item.replace(/!\[.*\]\((.*?)\)/, '$1') })
    if (item.resourceList.length) {
      if (!imgs) imgs = []
      item.resourceList.forEach(t => {
        if (t.externalLink) imgs.push(t.externalLink)
        else imgs.push(`${url}/o/r/${t.name}`)
      })
    }
    // text = content.replace(/#(.*?)\s/g, '').replace(/\!\[(.*?)\]\((.*?)\)/g, '').replace(/\{(.*?)\}/g, '')
    // content = text.replace(/\[(.*?)\]\((.*?)\)/g, `<a href="$2">@$1</a>`);
    // 文本处理
    text = content.replace(/#[^\s]+/g, '');
    text = text.replace(/\n/g, '<br/>');
    content = text.replace(/\[(.*?)\]\((.*?)\)/g, `<a href="$2">@$1</a>`);
    // 图片处理
    if (imgs) {
      content += `<div class="zone_imgbox">`
      imgs.forEach(e => content += `<a href="${e}" data-fancybox="gallery" class="fancybox" data-thumb="${e}"><img class="no-lazyload" src="${e}"></a>`
      )
      content += '</div>'
    }
    // tag处理
    var tag_content = '';
    if (tag) {
      // 将每个tag打包为span标签
      tag.forEach(item => {
        tag_content += `<span class="tag_item"><use xlink:href="#icon-biaoqian"/>${item.replace("#", "")}</span>`
      })
    }
    return {
      id: item.id,
      name: item.name,
      content: content,
      creatorUsername: creatorUsername,
      tag: tag_content,
      date: date,
      text: text
    }
  }
  // 页面时间格式化
  function getTime(time) {
    let d = new Date(time),
      ls = [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()];
    for (let i = 0; i < ls.length; i++) {
      ls[i] = ls[i] <= 9 ? '0' + ls[i] : ls[i] + ''
    }
    // 如果在1分钟内，则显示刚刚
    if (new Date().getTime() - d.getTime() < 60000) {
      return '刚刚'
    }
    // 如果在1小时内，则显示分钟前
    else if (new Date().getTime() - d.getTime() < 3600000) {
      return Math.floor((new Date().getTime() - d.getTime()) / 60000) + '分钟前'
    }
    // 如果是今天，则显示时间
    else if (new Date().toDateString() == d.toDateString()) {
      return '今天 ' + ls[3] + ':' + ls[4]
    }
    // 如果是昨天，则显示昨天
    else if (new Date().toDateString() == new Date(d.getTime() + 86400000).toDateString()) {
      return '昨天 ' + ls[3] + ':' + ls[4]
    }
    // 如果是今年的说说，就不显示年份
    else if (new Date().getFullYear() == ls[0]) {
      return ls[1] + '月' + ls[2] + '日 ' + ls[3] + ':' + ls[4]
    }
    // 如果不是今年的说说，就显示年份
    else {
      return ls[0] + '年' + ls[1] + '月' + ls[2] + '日 ' + ls[3] + ':' + ls[4]
    }
  }
}

// 在pages/rests/memos/下
if (window.location.pathname.startsWith("/pages/rests/memos/")) {
  loadBibi();
  // 适配Pjax
  document.addEventListener("pjax:complete", function () {
    loadBibi();
  });
}

// 页面评论
function goComment(e) {
  // 前往评论区#post-comment
  var n = document.querySelector(".el-textarea__inner")
  n.value = `> ${e}\n\n`;
  n.focus();
  new Vue({
    data: function () {
      this.$notify({
        title: "添加评论",
        message: "无需删除空行，直接输入评论即可",
        position: "top-left",
        offset: 50,
        showClose: true,
        type: "success",
        duration: 2000,
      });
    },
  });
}

/* memos页面end */

//----------------------------------------------------------------

/* 清理缓存 */

function clearCache() {
  localStorage.clear();
  sessionStorage.clear();
  window.location.reload();
}

/* end */

//----------------------------------------------------------------

/* 关于我页面底部赞赏 */



/* 关于页面赞赏end */

//----------------------------------------------------------------

/* 关于我页面js */

// initAboutPage()函数放置到about页面中了，因为局部加载是异步的，所以需要在页面加载完成后执行

/* 关于我页面js end */

//----------------------------------------------------------------

/* 网站版本显示及更新提示 */

// 版本号切割函数
function splitVersion(v) {
  // 循环10次
  for (let i = 0; i < 10; i++) {
    v = v.replace(/[^0-9.]/, '');
  }
  return v.split(".");
}
// 显示版本号
document.getElementById("blogVer").innerHTML = "Patch Ver v" + latestVersion;
// 从localstorage读取版本号
var curVersion = localStorage.getItem("version");
// 和最新版本号对比
let cpResult;
if (curVersion != null) {
  const newVerArr = splitVersion(latestVersion);
  const curVerArr = splitVersion(curVersion);
  i = 0;
  while (true) {
    const s1 = newVerArr[i];
    const s2 = curVerArr[i++];
    if (s1 === undefined || s2 === undefined) {
      cpResult = newVerArr.length - curVerArr.length;
      break;
    }
    if (s1 === s2) continue;
    cpResult = s1 - s2;
    break;
  }
}
// 保存版本号
localStorage.setItem("version", latestVersion);
if (curVersion === null || cpResult > 0) {
  debounce(function () {
    new Vue({
      data: function () {
        this.$notify({
          title: "更新提示",
          message: "已获取到最新版本（v" + latestVersion + "），欢迎体验！",
          position: "top-left",
          offset: 50,
          showClose: true,
          type: "success",
          duration: 5000,
        });
      },
    });
  }, 300);
}


/* 网站版本显示及更新提示end */

//----------------------------------------------------------------

/*  */

/* end */

//----------------------------------------------------------------