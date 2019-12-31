
jQuery(window).load(function() {


! function(a) {
    "use strict";
    a(document).ready(function() {
        function b() {
            window.location = i
        }
        var e = a(".site-title"),
            f = a("body");
        setTimeout(function() {
            f.addClass("loaded")
        }, 150);
        var g = a(".project-assets").children("div");
        a.each(g, function(b, c) {
            var d = a(this);
            d.imagesLoaded(function() {
                setTimeout(function() {
                    d.addClass("loaded")
                }, 50 + 150 * b)
            })
        });
        var h = a(".projects-feed .project");
        a.each(h, function(b, c) {
            var d = a(this);
            d.imagesLoaded(function() {
                setTimeout(function() {
                    d.addClass("loaded")
                }, 50 + 50 * b)
            })
        });
        var i;
        a("a").on("click", function(a) {
            return "" == this.href || null == this.href ? void a.preventDefault() : void(-1 == this.href.indexOf("#") && -1 == this.href.indexOf("mailto:") && -1 == this.href.indexOf("javascript:") && "_blank" != this.target && (a.preventDefault(), i = this.href, f.removeClass("loaded"), setTimeout(b, 250)))
        })
    })
}(window.jQuery);

 
