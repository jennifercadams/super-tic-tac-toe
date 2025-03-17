import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
export default defineConfig({
    base: '/super-tic-tac-toe/',
    plugins:[
        tsconfigPaths(),
    ],
});