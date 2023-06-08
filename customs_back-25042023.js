if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, 'findIndex', {
        value: function (predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this === null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];

            // 5. Let k be 0.
            var k = 0;

            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                // d. If testResult is true, return k.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return k;
                }
                // e. Increase k by 1.
                k++;
            }

            // 7. Return -1.
            return -1;
        }
    });
}

var ViewModel = function () {
    var self = this;
    self.theBuses = ko.observableArray([]);
    self.error = ko.observable(false);
    self.init = function () {
        self.refresh();
        setInterval(function () {
            self.refresh();
        }, 10000);
    };
    self.refresh = function () {
        //var arrBuses = [];
        $.ajax({
            url: "data/bus.php?pseudoParam=" + new Date().getTime(),
            dataType: "json",
            timeout: 4000,
            cache: false,
            accepts: {
                json: "application/json"
            },
            success: function (data) {
                var arrBuses = [];
                if (!data.error) {
                    var dict = {};
                    data.DepartureBoard.Departure.forEach(function (bus) {
                        bus.name = bus.name.replace("Bus ", "");
                        bus.name = bus.name.replace("Natbus ", "");
                        var key = bus.name + bus.direction;
                        var existing = dict[key];
                        if (existing) {
                            key_delayed = arrBuses.findIndex((function (obj) {
                                return obj.name === bus.name && obj.direction === bus.direction;
                            }));
                            var firstBusTime = parseInt(arrBuses[key_delayed].time.replace(":", ""));
                            var LateBusTime = parseInt(bus.time.replace(":", ""));
                            var diff = Math.abs(LateBusTime - firstBusTime);
                            if (arrBuses[key_delayed].time.substring(0, 2) !== bus.time.substring(0, 2)) {
                                diff -= 40;
                            }
                            if (diff > 20) {
                                bus.name = bus.name.replace(bus.name, bus.name + " ");
                                key = bus.name + bus.direction;
                                existing = dict[key];
                                if (existing) {
                                    key_delayed = arrBuses.findIndex((function (obj) {
                                        return obj.name === bus.name && obj.direction === bus.direction
                                    }));
                                    firstBusTime = parseInt(arrBuses[key_delayed].time.replace(":", ""));
                                    LateBusTime = parseInt(bus.time.replace(":", ""));
                                    diff = Math.abs(LateBusTime - firstBusTime);
                                    arrBuses[key_delayed].delay = " " + diff;
                                } else {
                                    bus.delay = 0;
                                    dict[key] = bus;
                                    if (bus.type === 'NB') {
                                        bus.type = 'natbus';
                                        arrBuses.push(bus);
                                    } else if (bus.name.length < 4) {
                                        bus.type = 'bybus';
                                        arrBuses.push(bus);
                                    } else if (bus.name.length >= 4) {
                                        if (bus.name.length === 5 && isNaN(bus.name)) {
                                            bus.type = 'skolebus'; // skolebus
                                            arrBuses.push(bus);
                                        } else {
                                            bus.type = 'rutebil';
                                            arrBuses.push(bus);
                                        }
                                    }
                                }
                            } else {
                                arrBuses[key_delayed].delay = " " + diff;
                            }
                        } else {
                            bus.delay = 0;
                            dict[key] = bus;
                            if (bus.type === 'NB') {
                                bus.type = 'natbus';
                                arrBuses.push(bus);
                            } else if (bus.name.length < 3) {
                                bus.type = 'bybus';
                                arrBuses.push(bus);
                            } else if (bus.name.length >= 3) {
                                if (bus.name.length === 4 && isNaN(bus.name)) {
                                    bus.type = 'skolebus'; // skolebus
                                    arrBuses.push(bus);
                                } else {
                                    bus.type = 'rutebil';
                                    arrBuses.push(bus);
                                }
                            }
                        }
                    });
                    self.theBuses(arrBuses);
                } else {
                    self.error('Systemet er ude af drift.');
                }
                if (ko.dataFor(document.getElementById('tbl-bus-info'))) {
                }
            },
            error: function () {
                self.error('Systemet er ude af drift.');
            }
        });
    };
    return self;
};
var vm = new ViewModel();
ko.applyBindings(vm);
vm.init();