"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseService = void 0;
const AbstractService_1 = require("../AbstractService");
const util_1 = require("../txWrapper/util");
const index_1 = require("../txWrapper/index");
const txwrapper_core_1 = require("@substrate/txwrapper-core");
const util_2 = require("@polkadot/util");
class ParseService extends AbstractService_1.AbstractService {
    async fetchParse(tx, signed) {
        const metadataRpc = await util_1.rpcToLocalNode('state_getMetadata');
        const { specVersion, specName } = await util_1.rpcToLocalNode('state_getRuntimeVersion');
        const registry = index_1.getRegistry({
            chainName: 'SovereignChain',
            specName,
            specVersion,
            metadataRpc,
        });
        //declare variables for if else cases and return those 
        let senderAddress = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
        let txValue = 0;
        let signers = [''];
        let destAddress;
        let dest = ['null'];
        if (signed === true) {
            //Decode a signed payload.
            //signers array should hold address of signer 
            const txAddress = registry.createType('Extrinsic', util_2.hexToU8a(tx), {
                isSigned: true,
            });
            senderAddress = txAddress.signer.toString();
            const txInfo = txwrapper_core_1.decode(tx, {
                metadataRpc,
                registry,
            });
            destAddress = txInfo.method.args.dest;
            txValue = txInfo.method.args.value;
            signers = [senderAddress];
            dest = Object.values(destAddress);
            //console.log('dest: -----> ',dest[0]); 
        }
        else {
            //Decode the information from a signing payload.
            //tx is here the signingPayload 
            const payloadInfo = txwrapper_core_1.decode(tx, {
                metadataRpc,
                registry,
            });
            destAddress = payloadInfo.method.args.dest;
            txValue = payloadInfo.method.args.value;
            signers = [];
            dest = Object.values(destAddress);
            //console.log('decodedUnsigned TX args:', payloadInfo.method.args, 
            //'decodedUnsigned TX blockHash:', payloadInfo.method, 'options:', payloadInfo)
        }
        return {
            operations: [{
                    operation_identifier: {
                        index: 0
                    },
                    type: "TRANSFER",
                    status: "",
                    account: {
                        address: senderAddress,
                    },
                    amount: {
                        value: txValue === null || txValue === void 0 ? void 0 : txValue.toString(),
                        currency: {
                            symbol: "CSOV",
                            decimals: 10
                        }
                    }
                }, {
                    operation_identifier: {
                        index: 0
                    },
                    related_operations: [{
                            index: 1
                        }],
                    type: "TRANSFER",
                    status: "",
                    account: {
                        address: dest[0],
                    },
                    amount: {
                        value: txValue === null || txValue === void 0 ? void 0 : txValue.toString(),
                        currency: {
                            symbol: "CSOV",
                            decimals: 10
                        }
                    }
                }],
            signers: signers,
        };
    }
}
exports.ParseService = ParseService;
//# sourceMappingURL=ParseService.js.map