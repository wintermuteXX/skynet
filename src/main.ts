import * as Core from './managers/Core';
import { log } from './utils/logger';

export const BUILD_TIME = '__BUILD_TIME__';

log.alert('✨=== Global Reset ===✨');
log.alert('Build time of script: ${BUILD_TIME}');

export function loop() {
  Core.run();
}
