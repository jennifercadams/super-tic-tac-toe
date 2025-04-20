export class KeepAliveService {
    private interval: number = 840000; // 14 minutes in milliseconds
    private intervalId: number = 0;

    public start() {
        this.intervalId = window.setInterval(this.sendKeepAliveAsync, this.interval);
    }

    public stop() {
        window.clearInterval(this.intervalId);
    }

    private async sendKeepAliveAsync() {
        const url = import.meta.env.VITE_SERVER_URL + "/keep-alive";
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Server status: error");
            }

            const text = await response.text();
            console.log(`Server status: ${text}`);
        } catch (error) {
            let message;

            if (error instanceof Error)
                message = error.message;
            else
                message = String(error);

            console.error(`Error: ${message}`);
        }
    }
}
