import wjConfig, { Environment } from "wj-config";
import mainConfig from './config.json';
import env from '@core/env';

const e = new Environment(env.environment);

export default await wjConfig()
    .includeEnvironment(e)
    .addObject(mainConfig)
    .build()
    ;
