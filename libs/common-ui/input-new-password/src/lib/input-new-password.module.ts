import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputNewPasswordComponent } from './input-new-password.component';
import { IconModule, InputPasswordModule } from '@backbase/ui-ang';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  declarations: [InputNewPasswordComponent],
  imports: [CommonModule, InputPasswordModule, ReactiveFormsModule, IconModule, FormlyModule],
  exports: [InputNewPasswordComponent],
})
export class InputNewPasswordModule {}
