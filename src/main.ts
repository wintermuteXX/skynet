import * as Core from './managers/Core';
import { log } from './utils/logger';

export const BUILD_TIME = "__BUILD_TIME__";
export const REVISION = "__REVISION__";

log.alert('✨=== Global Reset ===✨');
log.alert('Build time of script: ${BUILD_TIME} and git revision ${REVISION}');

export function loop() {
  Core.run();
}
