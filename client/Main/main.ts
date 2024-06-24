import {MainModule} from "./MainComponent/main.module";

import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

platformBrowserDynamic().bootstrapModule(MainModule)
  .catch(error => console.error(error));