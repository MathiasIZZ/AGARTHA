console.log('elements v2 chargé')



/* ----------------------------------------------------------------- */

// ESPACE COOKIES



/* ----------------------------------------------------------------- */

var appXhr = function () {
    var httpRequest = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        httpRequest = new XMLHttpRequest();
        if (httpRequest.overrideMimeType) {
            httpRequest.overrideMimeType('text/xml');
        }
    }
    else if (window.ActiveXObject) { // IE
        try {
            httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try {
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) {}
        }
    }

    if (!httpRequest) {
        throw 'Error XMLHTTP';
        return false;
    }

    return httpRequest
}

var Table = {
    target: null,
    columns: {},
    title: null,
    selectable: false,
    lines: 0,
    heightLine:0,
    onselect: {},
    return: document.createElement('table'),
    th: function() {



        if(this.target.querySelector('table') == null) {
            this.target.appendChild(this.table);
        }

        if(this.return.querySelector('table thead') !== null) {
            this.return.querySelector('table thead').remove();
        }

        let tableHeader = document.createElement('thead');
        let headerRow = document.createElement('tr');

        if (this.title !== null) {
            let tr_title = document.createElement('tr');
            let th_title = document.createElement('th');
            let title = document.createElement('h3');
            title.appendChild(document.createTextNode(this.title));
            th_title.setAttribute('colspan', this.columns.length);
            th_title.appendChild(title);
            tr_title.appendChild(th_title);
            tableHeader.appendChild(tr_title)
        }

        this.columns.forEach(column => {
            let header = document.createElement('th');
            let textNode = document.createTextNode(column.th);
            header.appendChild(textNode);
            headerRow.appendChild(header);
        });

        tableHeader.appendChild(headerRow);
        this.return.appendChild(tableHeader);

    },
    td: function(data) {

        let tr = document.createElement('tr');

        this.columns.forEach(line => {

            let td = document.createElement('td');

            if (line.class !== undefined) {
                td.classList.add(line.class);
            }

            if (data !== undefined) {
                let ctt_td = document.createTextNode(line.td(data));
                td.appendChild(ctt_td);

            }

            tr.appendChild(td);

            if (this.target.querySelector('td') !== null) {
                this.heightLine = this.target.querySelector('td').offsetHeight;
            }

        });

        this.return.querySelector('tbody').appendChild(tr);
    },
    build: function(data) {

        this.th();

        if(this.return.querySelector('table tbody') !== null) {
            this.return.querySelector('table tbody').remove();
        }

        this.return.appendChild(document.createElement('tbody'));

        if(Object.values(data).length < 50) {
            var maxRows = Object.values(data).length - 1;
        } else {
            var maxRows = 50;
        }

        for (this.lines = 0; this.lines <= maxRows; this.lines++) {
            this.td(data[this.lines]);
        }

        var self = this;
        document.addEventListener("scroll", function(e) {

            let diff = Math.round(((window.scrollY + window.innerHeight+ 50) - (self.target.offsetHeight + self.target.offsetTop )) / self.heightLine);

            if (Math.abs(diff) < 10) {
                for (var i = 12; i >= 0; i--) {
                    if (data !== "" && data[self.lines] !== undefined) {
                        self.lines++;
                        self.td(data[self.lines]);
                        console.log(data[self.lines], self.lines);
                    }
                }
            }
        });

        this.target.replaceChild(this.return, this.target.querySelector('table'));
    }

}

var Button = {

}

var Select = {
    options: function(options) {
        // refait les options Ã  la voler
    }
}

var Notification = {

    init: function () {
        // prÃ©pare le html
    },
    neutral: function (message) {
        // sort la notif
    },
    confirm: function (message) {
        // sort la notif
    },
    warning: function (message) {
        // sort la notif
    },
    alert: function (message) {
        // sort la notif
    },
    leave: function() {
        // set time pour le bye bye
    }
}
