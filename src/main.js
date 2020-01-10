import environment from '../config/environment.json';
import { PLATFORM } from 'aurelia-framework';
import { configure as abilitiesPlugin } from '@casl/aurelia';
import { configure as validationPlugin } from 'aurelia-validation';
import configureApp from './config';
import { AppRoot } from './components/root/root';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(configureApp)
    .plugin(validationPlugin)
    .plugin(abilitiesPlugin) // <--- Aurelia plugin for CASL
   ;

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(AppRoot));
}
