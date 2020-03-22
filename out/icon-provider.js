"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
class IconProvider {
    constructor() {
        this.icons = [];
    }
    static initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = new IconProvider();
            provider.icons = yield vscode_1.workspace.findFiles("**src/assets/icon/**/md*.svg", `**/node_modules/**`);
            return provider;
        });
    }
}
exports.IconProvider = IconProvider;
//# sourceMappingURL=icon-provider.js.map