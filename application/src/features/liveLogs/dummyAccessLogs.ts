import {CloudFrontLogPayload} from "./definitions.ts"

function allPropertiesAreDefined<T extends object>(
  obj: T
): obj is { [K in keyof T]-?: Exclude<T[K], undefined> } {
  return Object.keys(obj).every((key) => obj[key as keyof T] !== undefined);
}

interface IAccessLogBuilder {
	build: () => null|CloudFrontLogPayload
}

class AccessLogBuilder implements IAccessLogBuilder {
	accessLog: Partial<CloudFrontLogPayload> = {
		"timestamp": undefined,
  		"time_taken": undefined,
  		"sc_status": undefined,
  		"ctx_host": undefined,
  		"cs_method": undefined,
  		"cs_uri_stem": undefined,
  		"cs_uri_query": undefined,
  		"x_edge_result_type": undefined,
  		"x_edge_request_id": undefined,
  		"ssl_protocol": undefined,
  		"ssl_cipher": undefined,
  		"x_edge_response_result_type": undefined,
  		"cs_user_agent": undefined,
  		"cs_referer": undefined,
  		"cs_cookie": undefined,
  		"sc_bytes": undefined,
  		"cs_bytes": undefined,
  		"x_edge_location": undefined,
  		"sc_content_len": undefined,
  		"time_to_first_byte": undefined,
  		"cs_host_header": undefined,
  		"cs_protocol": undefined,
  		"cs_protocol_version": undefined,
  		"fle_status": undefined,
  		"fle_encrypted_fields": undefined,
	}

	build = () => {
		const allDefined = allPropertiesAreDefined(this.accessLog)

		if(!allDefined){
			return null
		}

		return this.accessLog as CloudFrontLogPayload
	}
}

export const columnTitles = [
  // Time and location
  "Datetime",
  "Edge Location",
  // Cliet details
  "User Agent",
  // Request attributes
  "Host Domain",
  "Host Domain Header",
  "URL Path",
  "URL Query String",
  "HTTP Method",
  "Cookie Header",
  "Referrer URL",
  // Response
  "HTTP Status Code",
  "Response Content Length",
  "Bytes Sent",
  "Bytes Received",
  // CDN
  "Edge Cache Result Type",
  "Edge Response Result Type",
  "Edge Detailed Result Type",
  "Edge Request ID",
  "Time Taken (Seconds)",
  "Time to First Byte (Seconds)",
  // Security
  "Protocol Used",
  "HTTP Protocol Version",
  "SSL Protocol Version",
  "SSL Cipher Suite",
  "Field-Level Encryption Status",
  "Field-Level Encryption Count",
]
