"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractService = void 0;
class AbstractService {
    constructor(csovApi, api) {
        this.csovApi = csovApi;
        this.api = api;
    }
    /**
     * Process metadata documention.
     *
     * @param docs metadata doucumentation array
     */
    sanitizeDocs(docs) {
        return docs
            .map((l, idx, arr) => idx === arr.length - 1 ? l.toString() : `${l.toString()}\n`)
            .join('');
    }
}
exports.AbstractService = AbstractService;
//# sourceMappingURL=AbstractService.js.map