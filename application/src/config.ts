// these API keys are to limit all public access (so not insecure)
const defaultQueryUrl = "https://om9v93ll69.execute-api.eu-west-2.amazonaws.com/prod/query"
const defaultQueryApiKey = "Zl5b1apCdZ9uGXszn1uaA2GUIwj6TDKW6CyowYZL"

const defaultLogsUrl = "https://jdndninx75.execute-api.us-east-1.amazonaws.com/prod/observe";
const defaultLogsApiKey = "bz9lHhkK1o3dhQPxkoL26agtVvwirjfk1xLSGxx7";

export const config = {
  queryUrl: import.meta.env.VITE_QUERY_URL || defaultQueryUrl,
  queryApiKey: import.meta.env.VITE_QUERY_API_KEY || defaultQueryApiKey,
  logsUrl: import.meta.env.VITE_LOGS_URL || defaultLogsUrl,
  logsApiKey: import.meta.env.VITE_LOGS_API_KEY || defaultLogsApiKey,
};
