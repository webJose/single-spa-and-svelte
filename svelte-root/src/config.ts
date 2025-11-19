import env from '@core/env';
import wjConfig, { buildEnvironment } from "wj-config";
import mainConfig from './config.json';

const e = buildEnvironment(['Development', 'PreProduction', 'Production'], env.environment);

export default await wjConfig()
    .includeEnvironment(e)
    .addObject(mainConfig)
    .build()
    ;
