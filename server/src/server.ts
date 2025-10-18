import 'module-alias/register';
import dotenv from 'dotenv';
import app from "./app";

dotenv.config();

const PORT = Number(process.env.PORT) || 4000;

function startServer(port: number) {
    const server = app.listen(port, () => {
        console.log(`🚀 Server running on port ${port}`);
    });

    server.on('error', (err: any) => {
        if (err.code === 'EADDRINUSE') {
            console.warn(`⚠️  Port ${port} is in use. Trying port ${port + 1}...`);
            startServer(port + 1);
        } else {
            console.error('❌ Server error:', err);
        }
    });
}

const DEFAULT_PORT = PORT;
startServer(DEFAULT_PORT);
export default app;
