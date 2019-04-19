import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAddOnModule } from 'ng-zorro-antd/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzAlertComponent } from './nz-alert.component';

@NgModule({
  declarations: [NzAlertComponent],
  exports: [NzAlertComponent],
  imports: [CommonModule, NzIconModule, NzAddOnModule]
})
export class NzAlertModule {}
