import { closeAllQueues, closeAllWorkers } from "./config";
import { startEmailWorker } from "./workers/email.worker";
import { startUserWorker } from "./workers/user.worker";

export const startWorkers = () => {
  console.log("Starting user worker...");
  startUserWorker();
  console.log("✓ User worker started");

  console.log("Starting email worker...");
  startEmailWorker();
  console.log("✓ Email worker started");
};

const shutdown = async (signal: string) => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);

  try {
    await closeAllWorkers();
    await closeAllQueues();
    console.log("✓ All workers closed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
