//Add in component at the time of optimisation.
function hamburgerMenu() {
    var s = {
        doc: document.querySelector("html"),
        subMenuTrigger: document.querySelectorAll(".subMenuTrigger"),
        subMenuSwipers: {},
        navigation: document.querySelector(".navigation .link"),
        init: function () {
            this.doc;
            this.addTouchClass(), this.registerMenuEvents(), this.registerCountrySelectEvent(), this.registerSubmenuEvents()
        },
        findIndexOf: function (e) {

            return Array.prototype.indexOf.call(e.parentElement.children, e)
        },

        registerSubmenuEvents: function () {
            
            var e = null;
            document.querySelector(".navigation").addEventListener("click", function (t) {
                t.target.classList.contains("subMenuTrigger") && (e && (e.classList.remove("open"), e.nextElementSibling.style.maxHeight = null), t.target !== e ? (t.target.classList.add("open"), (e = t.target).nextElementSibling.style.maxHeight = e.nextElementSibling.scrollHeight + "px") : e = null)
            })
        },
        registerMenuEvents: function () {
            var e = document.getElementById("navTrigger"),
                t = document.getElementById("closeNav"),
                n = this.doc;
            if (e) {
                e.addEventListener("click", function (e) {
                    n.classList.add("easeMenu"), window.setTimeout(function () {
                        n.classList.add("menuOpen")
                    }, 100)
                }), t.addEventListener("click", function (e) {
                    n.classList.remove("menuOpen"), window.setTimeout(function () {
                        n.classList.remove("easeMenu")
                    }, 800)
                })
            }

        },
        registerCountrySelectEvent: function () {
            document.querySelector(".activeCountry").addEventListener("click", function (e) {
                e.currentTarget.classList.toggle("open")
            })
        },

        addTouchClass: function () {
            "ontouchstart" in window || navigator.msMaxTouchPoints > 0 ? this.doc.classList.add("touch") : this.doc.classList.add("no-touch")
        }
    }


    s.init()

}