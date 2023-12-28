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
exports.Converter = void 0;
class Converter {
    constructor(amount, source, target) {
        this.amount = amount;
        this.source = source;
        this.target = target;
    }
    /**
     * Conversion of the target currency
     */
    setConversion() {
        return __awaiter(this, void 0, void 0, function* () {
            if (isNaN(this.amount)) {
                throw new Error("Amount must be numerical");
            }
            else {
                this.conversion = Number((this.amount * this.target.rate).toFixed(2));
            }
        });
    }
    /**
     * Currency conversion result into string
     * @returns Currency conversion string
     */
    toString() {
        if (isNaN(this.amount)) {
            throw new Error("Amount must be numerical");
        }
        else {
            return `${this.amount} ${this.source.name} = ${this.conversion} ${this.target.name}`;
        }
    }
}
exports.Converter = Converter;
