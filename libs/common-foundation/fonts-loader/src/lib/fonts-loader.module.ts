import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FontsLoaderConfigurationToken } from './fonts-loader.configuration';
import { FontsLoaderService } from './fonts-loader.service';

@NgModule({
  providers: [
    FontsLoaderService,
    {
      provide: APP_INITIALIZER,
      useFactory: (service: FontsLoaderService) => {
        return () => service.load();
      },
      multi: true,
      deps: [FontsLoaderService],
    },
    {
      provide: FontsLoaderConfigurationToken,
      useValue: { fonts: [{ family: 'Material Icons Outlined' }, { family: 'Material Icons' }] },
    },
  ],
})
export class FontsLoaderModule {}
