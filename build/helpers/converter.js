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
exports.converter = void 0;
const Converter_model_1 = require("./models/Converter.model");
const Currency_model_1 = require("./models/Currency.model");
const converter = (amount, source, target) => __awaiter(void 0, void 0, void 0, function* () {
    const currencySource = new Currency_model_1.Currency(source);
    const currencyTarget = new Currency_model_1.Currency(target);
    // Get exchange rate for the target currency
    yield currencyTarget.getExchangeRate(currencySource.name);
    // Instantiation of Converter class
    const converter = new Converter_model_1.Converter(amount, currencySource, currencyTarget);
    converter.setConversion();
    // Display result of conversion
    console.log(converter.toString());
    return converter;
});
exports.converter = converter;
