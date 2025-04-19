import fs from "fs";

export const loadDotEnv = (filePath: string) => {
    if (!fs.existsSync(filePath))
        return;

    const lines = fs.readFileSync(filePath, "utf-8").split(/\r?\n/);
    lines.forEach(line => {
        const parts = line.split("=");

        if (parts.length === 2)
            process.env[parts[0]] = parts[1];
    });
};
