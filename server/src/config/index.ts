import { resolve } from "path";

const loadConfig = async () => {
    const env = process.env.NODE_ENV;
    console.log(env);
    // const absolutePath = resolve(__dirname, `./{env}.config.js`);
    const filePath = `./${env}.config.js`;
    const { default: envConfig } = await import(filePath);
    return envConfig;
};

export default loadConfig;
