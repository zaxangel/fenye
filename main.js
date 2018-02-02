class pagination {
    constructor(ele, obj) {
        this.ele = document.querySelector(ele);
        this.data = obj.data ? obj.data : 20;
        this.pageLength = obj.pageLength ? obj.pageLength : [5, 10, 15, 20];
        this.cb1 = obj.cb1;
        this.cb2 = obj.cb2;
        this.num = 0;
        this.init();
        this.setHtml({ num: this.pageLength[0] });
        this.liClick();
        this.upClick();
        this.downClick();

    }
    init() {
        var _this = this;
        var str = `
            <p>共<span>${this.data}</span>条</p>
            <select>
        `;
        for (let i = 0; i < this.pageLength.length; i++) {
            str += `<option>${this.pageLength[i]}条/页</option>`;
        }
        str += `</select>
        <ul class="list"></ul>
        <p>前往<input type="text" class="text">页</p>
        `;
        this.ele.innerHTML = str;
        var sel = this.ele.querySelector("select");
        sel.addEventListener("click", function() {
            _this.setHtml({ num: parseInt(this.value) });
            _this.liClick();
            _this.upClick();
            _this.downClick();
        }, false)
    }
    setHtml({ num = this.pageLength[0], n = 1 }) {
        var count = Math.ceil(this.data / num);
        var str = `<li class="up"><</li>`;
        for (let i = 1; i <= num; i++) {
            str += `<li>${num * (n - 1) +  + i}</li>`;
        }
        str += `<li class="down">></li>`;
        var list = this.ele.querySelector(".list");
        list.innerHTML = str;
        this.textChange(num, count);
    }
    liClick() {
        var _this = this;
        var li = this.ele.querySelectorAll("li");
        for (let i = 1; i < li.length - 1; i++) {
            li[i].onclick = function() {
                _this.changeLi(i);
            }
        }
    }
    changeLi(n) {
        var li = this.ele.querySelectorAll("li");
        for (let j = 0; j < li.length; j++) {
            li[j].style.color = "#000";
        }
        li[n].style.color = "skyblue";
        this.num = n;
    }
    upClick() {
        var _this = this;
        var li = this.ele.querySelectorAll("li");
        var up = this.ele.querySelector(".up");
        up.onclick = function() {
            _this.num--;
            if (_this.num < 1) {
                _this.num = li.length - 2;
            }
            _this.changeLi(_this.num);
        }
    }
    downClick() {
        var _this = this;
        var li = this.ele.querySelectorAll("li");
        var down = this.ele.querySelector(".down");
        down.onclick = function() {
            _this.num++;
            if (_this.num > li.length - 2) {
                _this.num = 1;
            }
            _this.changeLi(_this.num);
        }
    }
    textChange(num, count) {
        var _this = this;
        var text = this.ele.querySelector(".text");
        text.onchange = function() {
            var val = parseInt(this.value);
            if (!isNaN(val)) {
                if (val <= count) {
                    _this.setHtml({ num: num, n: val });
                } else {
                    _this.setHtml({ num: num, n: count });
                }
            } else {
                alert("请输入数字");
            }
        }
    }
}