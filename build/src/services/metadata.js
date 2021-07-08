"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetadata = exports.gotCalled = exports.metadataCSOV = void 0;
const util_1 = require("./txWrapper/util");
exports.metadataCSOV = '';
exports.gotCalled = false;
async function getMetadata() {
    if (exports.gotCalled === false) {
        let metadataRpc = await util_1.rpcToLocalNode('state_getMetadata');
        exports.gotCalled = true;
        exports.metadataCSOV = metadataRpc;
        return exports.metadataCSOV;
    }
    else {
        return exports.metadataCSOV;
    }
}
exports.getMetadata = getMetadata;
//# sourceMappingURL=metadata.js.map