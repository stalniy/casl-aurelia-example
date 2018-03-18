import environment from './environment';
import { PLATFORM } from 'aurelia-framework';
import { abilitiesPlugin } from '@casl/aurelia';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-validation'))
    .plugin(PLATFORM.moduleName('@casl/aurelia')) // <--- Aurelia plugin for CASL
    .feature(PLATFORM.moduleName('config/index'));

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('components/root/root')));
}
