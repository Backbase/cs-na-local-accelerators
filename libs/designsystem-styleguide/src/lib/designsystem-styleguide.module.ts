import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      {
        path: 'button',
        loadChildren: () =>
          import('@backbase/designsystem-styleguide-button').then((m) => m.DesignsystemStyleguideButtonModule),
      },
      { path: '**', pathMatch: 'full', redirectTo: 'button' },
    ]),
  ],
})
export class DesignsystemStyleguideModule {}
