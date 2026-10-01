import "dotenv/config";
import app from "./app";

const PORT = Number(process.env.PORT) || 5000;

const server = app.listen(PORT, () => {
  console.log(`Portfolio CMS API running on port ${PORT}`);
});

server.on("error", (error) => {
  console.error("Server error:", error);
});

setInterval(() => {
  // Keep server process alive
}, 1000);