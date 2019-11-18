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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from "../index";
import request from "../../common/HttpClient";
import { Message } from "iview";
var WorkerStore = /** @class */ (function (_super) {
    __extends(WorkerStore, _super);
    function WorkerStore(e) {
        var _this = _super.call(this, e) || this;
        _this.pageInfo = {
            pageIndex: 1,
            pageSize: 50
        };
        _this.peoples = [];
        return _this;
    }
    WorkerStore.prototype.search = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.post('/api/workerlib/archives', {
                            "pageInfo": {
                                "pageIndex": this.pageInfo.pageIndex,
                                "pageSize": this.pageInfo.pageSize //每页条数
                            },
                            "conditionList": [],
                            "sortList": [],
                            "groupList": [],
                            "keywords": [],
                            "selectList": [
                                { "field": "id" },
                                { "field": "id_number" },
                                { "field": "work_type" },
                                { "field": "name" },
                                { "field": "phone" },
                                { "field": "state" }
                            ]
                            // "keywords" : [{
                            //     "project": this.projectName,
                            //     "constructionUnit": this.constructionUnit,
                            //     "name": this.name,
                            //     "workType": this.workType,
                            //     "state":this.state,
                            //     ""
                            // }]
                        }).then(function (data) {
                            _this.success(data);
                        }).catch(function (e) {
                            var alert = Message;
                            if (!e) {
                                alert.warning('未知错误！');
                                return;
                            }
                            if (e.response && e.response.data && e.response.data.message) {
                                alert.warning(e.response.data.message);
                                return;
                            }
                            alert.warning(e.message || e);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WorkerStore.prototype.success = function (data) {
        this.peoples = data.data;
        this.pageInfo = data.pageInfo;
    };
    WorkerStore.prototype.onCheck = function (id) {
        var data = this.peoples;
        this.peoples = [];
        if (data.filter(function (a) { return a.id == id; }).length > 0) {
            var currentVal = data.filter(function (a) { return a.id == id; })[0].checked;
            data.filter(function (a) { return a.id == id; })[0].checked = !currentVal;
            this.peoples = data;
        }
    };
    __decorate([
        Action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], WorkerStore.prototype, "search", null);
    __decorate([
        Mutation,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], WorkerStore.prototype, "success", null);
    __decorate([
        Mutation,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], WorkerStore.prototype, "onCheck", null);
    WorkerStore = __decorate([
        Module({
            namespaced: true,
            stateFactory: true,
            dynamic: true,
            name: "WorkerStore",
            store: store,
        }),
        __metadata("design:paramtypes", [Object])
    ], WorkerStore);
    return WorkerStore;
}(VuexModule));
export default WorkerStore;
//# sourceMappingURL=WorkerStore.js.map