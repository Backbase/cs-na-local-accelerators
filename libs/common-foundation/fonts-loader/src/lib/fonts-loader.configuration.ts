import { InjectionToken } from '@angular/core';

export interface LoadableFont {
  family: string;
  size?: string;
}

export interface FontsLoaderConfiguration {
  fonts: LoadableFont[];
}

export const FontsLoaderConfigurationToken = new InjectionToken<FontsLoaderConfiguration>(
  'FontsLoaderConfiguration injection token',
);
