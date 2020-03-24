var myApp = new Framework7,
    $$ = Dom7,
    $ = $$,
    view1 = myApp.addView("#tab-1", {
        dynamicNavbar: true
    }),
    view2 = myApp.addView("#tab-2", {
        dynamicNavbar: true
    }),
    view3 = myApp.addView("#tab-3", {
        dynamicNavbar: true
    }),
    view4 = myApp.addView("#tab-4", {
        dynamicNavbar: true
    }),
    view5 = myApp.addView("#tab-5", {
        dynamicNavbar: true
    });
null === localStorage.getItem("firstRun") ? setup() : loadTheme()

function setup() {
    localStorage.setItem("theme", "dark")
    localStorage.setItem("firstRun", true)
    document.cookie = "fasttheme-switching=true; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/;"
    loadTheme()
}

function loadTheme() {
    "dark" === localStorage.getItem("theme") ? makeDarkTheme() : makeWhiteTheme()
}

function setThemeWhite() {
    localStorage.setItem("theme", "light")
    makeWhiteTheme()
}

function setThemeDark() {
    localStorage.setItem("theme", "dark")
    makeDarkTheme()
}

function makeWhiteTheme() {
    document.getElementById("body").className = "layout-white framework7-root"
}

function makeDarkTheme() {
    document.getElementById("body").className = "layout-dark framework7-root"
}

function toggleTheme() {
    "light" === localStorage.getItem("theme") ? (setThemeDark(), document.cookie = "fasttheme-switching=true; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/;") : (setThemeWhite(), document.cookie = "fasttheme-switching=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;")
}
$$("#tab-2").on("show", function() {
    $$(".swiper-container").each(function(e, t) {
        this.swiper.update()
    })
}), $$("#tab-3").on("show", function() {
    $$(".swiper-container").each(function(e, t) {
        this.swiper.update()
    })
});
$$(".app-icon").on("error", function(e) {
    e.target.onerror = "";
    e.target.src = "https://img.app-valley.vip/icon/appvalley.png";
    return true;
})
$$(".screenshot").on("error", function(e) {
    e.target.onerror = "";
    return true;
})
$$(document).on('page:init', '.page[data-name="install"]', function(e) {
    if ($(e.target).data('app-name'))
        gtag('event', 'view', {
            event_category: 'App',
            event_label: $(e.target).data('app-name')
        });
})
$$(document).on('page:init', '.page[data-name="install"]', function(e) {
    window.google_ad_client = "ca-pub-2574722752334321"
    window.google_ad_slot = "3029321319";
    window.google_ad_width = 336;
    window.google_ad_height = 280;
    var container = document.getElementById('ad_container');
    var w = document.write;
    document.write = function(content) {
        container.innerHTML = content;
        document.write = w;
    };
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//pagead2.googlesyndication.com/pagead/show_ads.js';
    document.getElementsByTagName("head")[0].appendChild(script);
})
$$(document).on('click', '.install', function(e) {
    window.clearTimeout(window.installTimer);
    if ($(e.target).data('app-name'))
        gtag('event', 'install', {
            event_category: 'App',
            event_label: $(e.target).data('app-name')
        });
    $(".installingAppName").text($(e.target).data('app-name'))
    $(".installingAppIcon").attr("src", "https://content.app-valley.vip/icon/" + $(e.target).data('id') + ".png")
    myApp.popup("#installPopup")
});
$$(document).on('page:init', '.page[data-name="install"]', function(e) {
    window.installTimer = setTimeout(function() {
        window.location = $(e.target).find(".install").first().attr("href");
    }, 4 * 1000);
})
$$(document).on('page:beforeremove', '.page[data-name="install"]', function(e) {
    clearTimeout(window.installTimer);
})
var mySwiper1 = myApp.swiper('.swiper-1', {
    loop: false,
    autoplay:true,
    speed: 2000,
    autoplayDisableOnInteraction : false,
    pagination: {
        el: '.swiper-1 .swiper-pagination',
    },
    spaceBetween: 50
});
