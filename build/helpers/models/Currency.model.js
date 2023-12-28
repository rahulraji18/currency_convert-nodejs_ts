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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currency = void 0;
const axios_1 = __importDefault(require("axios"));
class Currency {
    constructor(name = "EUR") {
        this.name = name.toUpperCase();
    }
    /**
     * Get exchange rate of a currency
     * @param base Source currency name
     */
    getExchangeRate(base = "EUR") {
        return __awaiter(this, void 0, void 0, function* () {
            this.rate = yield axios_1.default
                .get(`https://api.coinbase.com/v2/exchange-rates?currency=${base}`)
                .then((res) => {
                const { rates } = res.data.data;
                if (!rates[this.name]) {
                    throw new Error();
                }
                else {
                    return rates[this.name];
                }
            })
                .catch((err) => {
                throw new Error("Currency name is invalid");
            });
        });
    }
}
exports.Currency = Currency;
