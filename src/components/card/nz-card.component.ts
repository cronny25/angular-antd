import {
  Component,
  Input,
  HostBinding,
  ContentChild,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector     : 'nz-card',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div class="ant-card-head" *ngIf="title">
      <h3 class="ant-card-head-title">
        <ng-template
          [ngTemplateOutlet]="title">
        </ng-template>
      </h3>
    </div>
    <div class="ant-card-extra" *ngIf="extra">
      <ng-template
        [ngTemplateOutlet]="extra">
      </ng-template>
    </div>
    <div class="ant-card-body">
      <ng-template
        *ngIf="!nzLoading"
        [ngTemplateOutlet]="body">
      </ng-template>
      <div *ngIf="nzLoading">
        <p class="ant-card-loading-block" style="width: 94%;"></p>
        <p>
          <span class="ant-card-loading-block" style="width: 28%;"></span><span class="ant-card-loading-block" style="width: 62%;"></span>
        </p>
        <p>
          <span class="ant-card-loading-block" style="width: 22%;"></span><span class="ant-card-loading-block" style="width: 66%;"></span>
        </p>
        <p>
          <span class="ant-card-loading-block" style="width: 56%;"></span><span class="ant-card-loading-block" style="width: 39%;"></span>
        </p>
        <p>
          <span class="ant-card-loading-block" style="width: 21%;"></span><span class="ant-card-loading-block" style="width: 15%;"></span><span class="ant-card-loading-block" style="width: 40%;"></span>
        </p>
      </div>
    </div>
  `,
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ]
})
export class NzCardComponent {
  @Input() @HostBinding('class.ant-card-bordered') nzBordered = true;
  @Input() nzLoading = false;
  @Input() @HostBinding('class.ant-card-no-hovering') nzNoHovering = false;
  @ContentChild('title') title: TemplateRef<any>;
  @ContentChild('extra') extra: TemplateRef<any>;
  @ContentChild('body') body: TemplateRef<any>;
  @HostBinding('class.ant-card') true;
}
