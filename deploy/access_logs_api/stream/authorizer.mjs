export const handler = async (event) => {
  const apiKey = event.queryStringParameters?.api_key;
  const effect = apiKey ? "Allow" : "Deny";

  const response = {
    principalId: "event-source-client",
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: event.methodArn,
        },
      ],
    },
  };

  if (apiKey) {
    response.usageIdentifierKey = apiKey;
  }

  return response;
};
