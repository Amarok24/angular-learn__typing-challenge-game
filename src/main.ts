import './polyfills';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((ref) =>
  {
    // Ensure Angular destroys itself on hot reloads.

    // My note: this is not an Angular code, it's only used in StackBlitz!!!
    // Modification needed to work in TS strict mode (error "Element implicitly has an 'any' type because index expression is not of type 'number'.")
    // The easiest solution is to add ts-ignore comments.
    // See also https://www.typescriptlang.org/tsconfig#suppressImplicitAnyIndexErrors

    // @ts-ignore
    if (window['ngRef'])
    {
      // @ts-ignore
      window['ngRef'].destroy();
    }
    // @ts-ignore
    window['ngRef'] = ref;

    // Otherwise, log the boot error
  })
  .catch((err) => console.error(err));
