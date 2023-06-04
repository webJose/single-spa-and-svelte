import wjConfig, { Environment } from "wj-config";
import mainConfig from './config.json';
// @vite-ignore
import env from '@env';

const e = new Environment(env.environment);

export default await wjConfig()
    .includeEnvironment(e)
    .addObject(mainConfig)
    .build()
    ;
