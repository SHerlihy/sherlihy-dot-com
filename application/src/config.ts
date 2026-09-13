const defaultQueryUrl =
  "https://rtuard82z7.execute-api.us-east-1.amazonaws.com/prod/query/";

const defaultLogsUrl = "https://jdndninx75.execute-api.us-east-1.amazonaws.com/prod/observe";
//yes I know, it is okay
const defaultLogsApiKey = "bz9lHhkK1o3dhQPxkoL26agtVvwirjfk1xLSGxx7";

export const config = {
  queryUrl: import.meta.env.VITE_QUERY_URL || defaultQueryUrl,
  logsUrl: import.meta.env.VITE_LOGS_URL || defaultLogsUrl,
  logsApiKey: import.meta.env.VITE_LOGS_API_KEY || defaultLogsApiKey,
};
