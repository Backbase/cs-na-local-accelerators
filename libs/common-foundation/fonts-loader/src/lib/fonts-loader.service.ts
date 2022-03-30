import { Inject, Injectable, Optional } from '@angular/core';
import type {} from 'css-font-loading-module';
import { FontsLoaderConfiguration, FontsLoaderConfigurationToken, LoadableFont } from './fonts-loader.configuration';

const defaultFontSize: string = '1rem';

@Injectable()
export class FontsLoaderService {
  private _config: FontsLoaderConfiguration;
  private _defaultConfig: FontsLoaderConfiguration = { fonts: [] };

  constructor(@Optional() @Inject(FontsLoaderConfigurationToken) config: FontsLoaderConfiguration) {
    this._config = config ? { ...config } : this._defaultConfig;
  }

  load() {
    return new Promise<void>((resolve, reject) => {
      const fontFaceSet: FontFaceSet = window.document.fonts;
      const promises: Promise<FontFace[]>[] = this._config.fonts.reduce(
        (p: Promise<FontFace[]>[], font: LoadableFont) => {
          p.push(fontFaceSet.load(`${font.size ? font.size : defaultFontSize} ${font.family}`));
          return p;
        },
        [],
      );

      // the code below is a backward compatible polyfill for Promise.allSettled
      const _promises = promises.map((p) => {
        return p
          .then((value) => {
            return {
              status: 'fulfilled',
              value,
            };
          })
          .catch((reason) => {
            return {
              status: 'rejected',
              reason,
            };
          });
      });

      Promise.all(_promises).then((data) => {
        resolve();
      });
    });
  }
}
