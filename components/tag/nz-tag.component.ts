import { AnimationEvent } from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';

export type TagType = 'default' | 'closeable' | 'checkable';
import { tagAnimation } from '../core/animation/tag-animations';
import { toBoolean } from '../core/util/convert';

@Component({
  selector           : 'nz-tag',
  preserveWhitespaces: false,
  animations         : [
    tagAnimation
  ],
  template           : `
    <div
      *ngIf="!closed"
      [ngClass]="classMap"
      #wrapperElement
      [@tagAnimation]
      (@tagAnimation.done)="afterAnimation($event)"
      (click)="updateCheckedStatus()">
      <ng-content></ng-content>
      <i class="anticon anticon-cross" *ngIf="nzMode==='closeable'" (click)="closeTag($event)"></i>
    </div>
  `
})
export class NzTagComponent implements OnInit, AfterViewInit {
  private _color: string;
  private _checked = false;
  private isPreset: boolean;
  private _mode: TagType = 'default';
  classMap;
  closed = false;
  @ViewChild('wrapperElement') wrapperElement: ElementRef;
  @Output() nzAfterClose = new EventEmitter<void>();
  @Output() nzOnClose = new EventEmitter<MouseEvent>();
  @Output() nzCheckedChange = new EventEmitter<boolean>();

  @Input()
  set nzMode(value: TagType) {
    this._mode = value;
    this.updateClassMap();
  }

  get nzMode(): TagType {
    return this._mode;
  }

  @Input()
  set nzColor(value: string) {
    this._color = value;
    this.isPreset = this.isPresetColor(value);
    this.updateClassMap();
    this.updateColorStatus();
  }

  get nzColor(): string {
    return this._color;
  }

  @Input()
  set nzChecked(value: boolean) {
    this._checked = toBoolean(value);
    this.updateClassMap();
  }

  get nzChecked(): boolean {
    return this._checked;
  }

  isPresetColor(color?: string): boolean {
    if (!color) {
      return false;
    }
    return (
      /^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/
      .test(color)
    );
  }

  updateCheckedStatus(): void {
    if (this.nzMode === 'checkable') {
      this.nzChecked = !this.nzChecked;
      this.nzCheckedChange.emit(this.nzChecked);
    }
  }

  closeTag(e: MouseEvent): void {
    this.nzOnClose.emit(e);
    if (!e.defaultPrevented) {
      this.closed = true;
    }
  }

  afterAnimation(e: AnimationEvent): void {
    if (this.closed && !e.fromState) {
      this.nzAfterClose.emit();
    }
  }

  updateClassMap(): void {
    this.classMap = {
      [ `ant-tag` ]                  : true,
      [ `ant-tag-has-color` ]        : this.isPreset === false,
      [ `ant-tag-${this.nzColor}` ]  : this.isPreset === true,
      [ `ant-tag-checkable` ]        : this.nzMode === 'checkable',
      [ `ant-tag-checkable-checked` ]: this.nzChecked
    };
  }

  updateColorStatus(): void {
    if (this.wrapperElement && this.nzColor) {
      if (this.isPreset) {
        this.renderer.removeStyle(this.wrapperElement.nativeElement, 'background-color');
      } else {
        this.renderer.setStyle(this.wrapperElement.nativeElement, 'background-color', this.nzColor);
      }
    }
  }

  constructor(private renderer: Renderer2) {

  }

  ngOnInit(): void {
    this.updateClassMap();
  }

  ngAfterViewInit(): void {
    this.updateColorStatus();
  }
}
