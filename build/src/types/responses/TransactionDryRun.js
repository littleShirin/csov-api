"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidityErrorType = exports.TransactionResultType = void 0;
var TransactionResultType;
(function (TransactionResultType) {
    TransactionResultType["TransactionValidityError"] = "TransactionValidityError";
    TransactionResultType["DispatchOutcome"] = "DispatchOutcome";
})(TransactionResultType = exports.TransactionResultType || (exports.TransactionResultType = {}));
var ValidityErrorType;
(function (ValidityErrorType) {
    ValidityErrorType["Invalid"] = "InvalidTransaction";
    ValidityErrorType["Unknown"] = "UnknownTransaction";
})(ValidityErrorType = exports.ValidityErrorType || (exports.ValidityErrorType = {}));
//# sourceMappingURL=TransactionDryRun.js.map