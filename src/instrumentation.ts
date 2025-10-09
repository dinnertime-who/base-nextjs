export async function register() {
  // Node.js 런타임에서만 실행 (Edge 런타임 제외)
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Worker 시작 (환경 변수로 비활성화 가능)
    if (process.env.DISABLE_WORKERS !== "true") {
      const { startWorkers } = await import("@workers/start");
      startWorkers();
      console.log("✓ Application instrumentation completed");
    } else {
      console.log("⚠️  Workers disabled by DISABLE_WORKERS env var");
    }
  }
}
