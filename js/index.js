"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// generic utility object to perform connect retry at a certain interval until the connection is established
var events = require("events");
var ConnectRetry = (function (_super) {
    __extends(ConnectRetry, _super);
    function ConnectRetry(connectable, retryConnectMS) {
        var _this = _super.call(this) || this;
        _this.connectable = connectable;
        _this.retryConnectMS = retryConnectMS;
        return _this;
    }
    Object.defineProperty(ConnectRetry.prototype, "ConnectHandler", {
        get: function () {
            var _this = this;
            var handler = function () {
                _this.emit("connecting");
                _this.connectable.connect()
                    .then(function (connectable) {
                    _this.emit("connected", connectable);
                }).catch(function (err) {
                    _this.emit("error", err);
                    setTimeout(_this.ConnectHandler, _this.retryConnectMS);
                });
            };
            return handler.bind(this);
        },
        enumerable: true,
        configurable: true
    });
    ConnectRetry.prototype.start = function () {
        var connect = this.ConnectHandler;
        connect();
    };
    return ConnectRetry;
}(events.EventEmitter));
function get(connectable, retryConnectMS) { return new ConnectRetry(connectable, retryConnectMS); }
exports.get = get;
