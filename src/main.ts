import Aurelia from 'aurelia';
import { MyApp } from './my-app';

console.log("start aurelia2", MyApp);
Aurelia
  .app({component: MyApp, host: document.getElementById('app')})
  .start();
