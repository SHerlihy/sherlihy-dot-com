const defaultQueryUrl =
  "https://rtuard82z7.execute-api.us-east-1.amazonaws.com/prod/query/";

const defaultLogsUrl =
  "https://ttorvdzge1.execute-api.us-east-1.amazonaws.com/prod";
//yes I know, it is okay
const defaultLogsApiKey = "Z6EwCsnW8O34ONXYAR2t71pymlyij6ts24lwypi6";

export const config = {
  queryUrl: import.meta.env.VITE_QUERY_URL || defaultQueryUrl,
  logsUrl: import.meta.env.VITE_LOGS_URL || defaultLogsUrl,
  logsApiKey: import.meta.env.VITE_LOGS_API_KEY || defaultLogsApiKey,
};
