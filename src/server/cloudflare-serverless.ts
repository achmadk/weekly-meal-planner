import { mealAgent } from "./agent";
import { VoltAgent } from "@voltagent/core";
import { serverlessHono } from "@voltagent/serverless-hono";

const voltagent = new VoltAgent({
    agents: { mealAgent },
    serverless: serverlessHono(),
});

export default voltagent.serverless().toCloudflareWorker();