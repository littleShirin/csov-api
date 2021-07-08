

export interface resParse {
    operations: [{
		operation_identifier: {
			index: number
		},
		type: string,
		status: string,
		account: {
			address: string
		},
		amount: {
			value: string | undefined,
			currency: {
				symbol: string,
				decimals: number
			}
		}
	}, {
		operation_identifier: {
			index: number
		},
		related_operations: [{
			index: number
		}],
		type: string,
		status: string,
		account: {
			address: any
		},
		amount: {
			value: string | undefined,
			currency: {
				symbol: string,
				decimals: number
			}
		}
}], 
signers: string[],
}