var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Machine = /** @class */ (function () {
    function Machine(name) {
        this.name = name;
        this.ports = [];
    }
    ;
    Machine.prototype.addPort = function (port) {
        this.ports.push(port);
        return this;
    };
    Machine.prototype.printAllPorts = function () {
        this.ports.forEach(function (p) { return console.log(p); });
    };
    Machine.prototype.turnOn = function () {
        console.log("I can run");
    };
    Machine.prototype.turnOff = function () {
        console.log("I'm off");
    };
    Machine.prototype.print = function (afterPrintCallBackFunction) {
        var page = "this is a page that I printed";
        console.log(page);
        afterPrintCallBackFunction(page);
    };
    return Machine;
}());
var MacBook = /** @class */ (function (_super) {
    __extends(MacBook, _super);
    function MacBook(name) {
        return _super.call(this, name) || this;
    }
    MacBook.prototype.turnOff = function () {
        console.log("mac off");
    };
    MacBook.prototype.runMacOS = function () {
        console.log("I can run MacOS");
    };
    return MacBook;
}(Machine));
var mac = new MacBook("MyBook");
console.log(mac.name);
mac.addPort("usb").addPort("3.5").addPort("power");
mac.printAllPorts();
mac.turnOn();
mac.print(function (data) {
    console.log(data.toUpperCase());
});
mac.runMacOS();
mac.turnOff();
