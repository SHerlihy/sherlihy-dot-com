import {
  LogDisplayData,
  methods,
  edgeResultTypes,
  sslProtocols,
  userProtocols,
  userProtocolVersion,
  CloudFrontLogPayload,
} from "./definitions.ts";

export function createDummyLogDisplayData(): LogDisplayData {
  const ret = createDummyLogData() as LogDisplayData;
  ret.id = self.crypto.randomUUID();

  return ret;
}

export function createDummyLogData(): CloudFrontLogPayload {
  return {
    timestamp: Math.random(),
    time_taken: Math.random(),
    sc_status: 200,
    ctx_host: "host",
    cs_method: methods[Math.floor(Math.random() * methods.length)],
    cs_uri_stem: "something/otherthing/endpoint",
    cs_uri_query: "uri query",
    x_edge_result_type:
      edgeResultTypes[Math.floor(Math.random() * edgeResultTypes.length)],
    x_edge_request_id: "edgeId",
    ssl_protocol: sslProtocols[Math.floor(Math.random() * sslProtocols.length)],
    ssl_cipher: "sslCipher",
    x_edge_response_result_type:
      edgeResultTypes[Math.floor(Math.random() * edgeResultTypes.length)],
    cs_user_agent: "user agent",
    cs_referer: "user referer",
    cs_cookie: "cookie data",
    sc_bytes: 58175,
    cs_bytes: 28175,
    x_edge_location: "edge location",
    sc_content_len: 137,
    time_to_first_byte: 157,
    cs_host_header: "user header",
    cs_protocol:
      userProtocols[Math.floor(Math.random() * userProtocols.length)],
    cs_protocol_version:
      userProtocolVersion[
        Math.floor(Math.random() * userProtocolVersion.length)
      ],
    fle_status: "fle status",
    fle_encrypted_fields: 2587,
  };
}
