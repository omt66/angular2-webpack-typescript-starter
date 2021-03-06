import { NgModule, ApplicationRef } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { App } from "./app";

import { routing } from "./app.routing";

import { removeNgStyles, createNewHosts } from "@angularclass/hmr";

// App Pages
import { Home } from "./pages/home";
import { Help } from "./pages/help";

// UI Elements
import { SimplePanel } from "./ui-elements/simple-panel";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
  ],
  declarations: [
    App,

    // Pages
    Home,
    Help,

    // UI Elements
    SimplePanel
  ],
  providers: [
  ],
  bootstrap: [App]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}

  hmrOnInit(store) {
    console.log("HMR store", store);
  }

  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
