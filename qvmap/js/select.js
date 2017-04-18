//cities selector
(function() {

    $(document).ready(init);

    function init() {
        //global, called from mobile state selector
        window.showStateCities = showCities;
        $(".cities-selector-nav #states-list li a").click(action);
    }

    function action(e) {
        e.preventDefault();
        var st = $(this).attr('data-value');
        showCities("state-" + st);
    }

    function showCities(str) {
        var arr = str.split('-');
        if(arr[0] == 'state') {
            str = arr[1];
        } else {
            return;
        }

        $(".cities-selector-nav #states-list li a").removeClass('active');
        $(".cities-selector-nav #states-list li a[data-value=" + str + "]").addClass('active');
        var lis = $("#cities-selector-data ul[data-state=" + str + "] li a");
        var ci = $('.cities-selector-content ul li a');
        $('.cities-selector-content ul').css('opacity', '0');
        for(var i = 0; i < lis.length && i < 8; i++) {
            var nod = $(lis[i]).clone();
            ci.eq(i).attr('href', nod.attr('href'));
            ci.eq(i).html(nod.text());
        }
        $('.cities-selector-content ul').animate({
            'opacity': '1'
        }, 500);
    }

})();

/////////////////////////////////////////////////////////////////////////////

(function() {
    function tamingselect() {

        if(!document.getElementById && !document.createTextNode) {
            return;
        }

        var ts_selectclass = 'turnintodropdown';
        var ts_listclass = 'turnintoselect';
        var ts_boxclass = 'dropcontainer';
        var ts_triggeron = 'activetrigger';
        var ts_triggeroff = 'trigger';
        var ts_dropdownclosed = 'dropdownhidden';
        var ts_dropdownopen = 'dropdownvisible';

        var count = 0;
        var toreplace = new Array();
        var sels = document.getElementsByTagName('select');
        for(var i = 0; i < sels.length; i++) {
            if(ts_check(sels[i], ts_selectclass)) {
              
                var hiddenfield = document.createElement('input');
                hiddenfield.name = sels[i].name;
                hiddenfield.type = 'hidden';
                hiddenfield.id = sels[i].id;
                hiddenfield.value = sels[i].options[0].value;
                sels[i].parentNode.insertBefore(hiddenfield, sels[i])
                var trigger = document.createElement('a');
                ts_addclass(trigger, ts_triggeroff);
                trigger.href = '#';

                trigger.onclick = function() {
                    endWait();
                    ts_swapclass(this, ts_triggeroff, ts_triggeron)
                    ts_swapclass(this.parentNode.getElementsByTagName('ul')[0], ts_dropdownclosed, ts_dropdownopen);
                    if(this.className == ts_triggeron) {
                        $('.' + ts_boxclass + ' .' + ts_dropdownopen).removeClass(ts_dropdownopen).addClass(ts_dropdownclosed);
                        $('.' + ts_triggeron).removeClass(ts_triggeron).addClass(ts_triggeroff);
                        ts_swapclass(this, ts_triggeroff, ts_triggeron)
                        ts_swapclass(this.parentNode.getElementsByTagName('ul')[0], ts_dropdownclosed, ts_dropdownopen);

                        waitForClick(this);
                    } else {

                    }
                    return false;
                }

                trigger.appendChild(document.createTextNode(sels[i].options[0].text));
                sels[i].parentNode.insertBefore(trigger, sels[i]);
                var replaceUL = document.createElement('ul');
                for(var j = 0; j < sels[i].getElementsByTagName('option').length; j++) {
                    var newli = document.createElement('li');
                    var newa = document.createElement('a');
                    newli.v = sels[i].getElementsByTagName('option')[j].value;
                    newli.elm = hiddenfield;
                    newli.istrigger = trigger;
                    newa.href = '#';
                    newa.appendChild(document.createTextNode(
                        sels[i].getElementsByTagName('option')[j].text));
                    newli.onclick = function() {
                        this.elm.value = this.v;
                        ts_swapclass(this.istrigger, ts_triggeron, ts_triggeroff);
                        ts_swapclass(this.parentNode, ts_dropdownopen, ts_dropdownclosed)
                        this.istrigger.firstChild.nodeValue = this.firstChild.firstChild.nodeValue;

                        var str = this.elm.value;
                        selectFunction(str);
                        endWait();

                        return false;
                    }
                    newli.appendChild(newa);
                    replaceUL.appendChild(newli);
                }
                ts_addclass(replaceUL, ts_dropdownclosed);
                var div = document.createElement('div');
                div.appendChild(replaceUL);
                ts_addclass(div, ts_boxclass);
                sels[i].parentNode.insertBefore(div, sels[i])
                toreplace[count] = sels[i];
                count++;
            }
        }

        var uls = document.getElementsByTagName('ul');
        for(var i = 0; i < uls.length; i++) {
            if(ts_check(uls[i], ts_listclass)) {
                var newform = document.createElement('form');
                var newselect = document.createElement('select');
                for(j = 0; j < uls[i].getElementsByTagName('a').length; j++) {
                    var newopt = document.createElement('option');
                    newopt.value = uls[i].getElementsByTagName('a')[j].href;
                    newopt.appendChild(document.createTextNode(uls[i].getElementsByTagName('a')[j].innerHTML));
                    newselect.appendChild(newopt);
                }
                newselect.onchange = function() {
                    window.location = this.options[this.selectedIndex].value;

                };
                newform.appendChild(newselect);
                uls[i].parentNode.insertBefore(newform, uls[i]);
                toreplace[count] = uls[i];
                count++;
            }
        }
        for(i = 0; i < count; i++) {
            toreplace[i].parentNode.removeChild(toreplace[i]);
        }

        function ts_check(o, c) {
            return new RegExp('\\b' + c + '\\b').test(o.className);
        }

        function ts_swapclass(o, c1, c2) {
            var cn = o.className
            o.className = !ts_check(o, c1) ? cn.replace(c2, c1) : cn.replace(c1, c2);
        }

        function ts_addclass(o, c) {
            if(!ts_check(o, c)) {
                o.className += o.className == '' ? c : ' ' + c;
            }
        }

        var aEl;

        function waitForClick(el) {
            aEl = el;
            $('body').unbind('click', uc);
            setTimeout(function() {
                $('body').click(uc);
            }, 100);

        }

        function uc(e) {
            if(aEl) {
                ts_swapclass(aEl, ts_triggeroff, ts_triggeron)
                ts_swapclass(aEl.parentNode.getElementsByTagName('ul')[0], ts_dropdownclosed, ts_dropdownopen);
                aEl = null;
            }
            endWait();

        }

        function endWait() {
            $('body').unbind('click', uc);

        }

    }

    //

    // redirects the <select> action by an option value prefix string
    function selectFunction(str) {

        if(str.split('-')[0] == 'state') {
            showStateCities(str);
        }

    }

    $(document).ready(function() {
        tamingselect();
    });

})();
