/**
 * Object to house the values of all the configurable components for Sidecar.
 */
export interface ISidecarConfig {
	EXPRESS: ISidecarConfigExpress;
	SUBSTRATE: ISidecarConfigSubstrate;
	LOG: ISidecarConfigLog;
}

interface ISidecarConfigSubstrate {
	CSOV_WS_URL: string;
	WS_URL: string;
	TYPES_BUNDLE: string;
	TYPES_CHAIN: string;
	TYPES_SPEC: string;
	TYPES: string;
}

interface ISidecarConfigExpress {
	HOST: string;
	PORT: number;
}

interface ISidecarConfigLog {
	LEVEL: string;
	JSON: boolean;
	FILTER_RPC: boolean;
	STRIP_ANSI: boolean;
}
