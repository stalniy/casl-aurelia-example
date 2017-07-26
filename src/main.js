import environment from './environment';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .globalResources('./pipes/can')
    .plugin('aurelia-validation')
    .feature('config');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot('components/root/root'));
}
