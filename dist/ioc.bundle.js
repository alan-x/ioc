(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Ioc = factory());
}(this, function () { 'use strict';

    var PoolInstance = /** @class */ (function () {
        function PoolInstance(cons, options) {
            this.initial = false;
            this.Cons = cons;
            this.options = options;
            if (options && !options.lazy) {
                this.initInstance();
            }
        }
        PoolInstance.prototype.getInstance = function () {
            if (!this.initial) {
                this.initInstance();
            }
            return this.instance;
        };
        PoolInstance.prototype.initInstance = function () {
            var instance = new this.Cons();
            instance.hasOwnProperty('init') && instance.init(this.options);
            this.instance = instance;
            this.initial = true;
        };
        return PoolInstance;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var ServiceNotFoundError = /** @class */ (function (_super) {
        __extends(ServiceNotFoundError, _super);
        function ServiceNotFoundError() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ServiceNotFoundError;
    }(Error));

    var InjectionPool = /** @class */ (function () {
        function InjectionPool() {
            this.pool = {};
        }
        InjectionPool.prototype.push = function (name, clazz, options) {
            if (this.pool.hasOwnProperty(name)) {
                console.warn("has already exit with this name\uFF1A" + name);
                return;
            }
            this.pool[name] = new PoolInstance(clazz, options);
        };
        InjectionPool.prototype.pull = function (name) {
            if (!this.pool.hasOwnProperty(name)) {
                throw new ServiceNotFoundError("not found this service by name: " + name);
            }
            var instance = this.pool[name];
            return instance.getInstance();
        };
        return InjectionPool;
    }());

    var Ioc = /** @class */ (function () {
        function Ioc() {
            this.injectionPool = new InjectionPool();
        }
        Ioc.prototype.push = function (name, clazz, options) {
            this.injectionPool.push(name, clazz, options);
        };
        Ioc.prototype.pull = function (name) {
            return this.injectionPool.pull(name);
        };
        return Ioc;
    }());

    return Ioc;

}));
