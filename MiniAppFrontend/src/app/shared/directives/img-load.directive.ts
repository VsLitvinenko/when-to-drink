import { Directive, ElementRef, inject, Input } from '@angular/core';

@Directive({
  selector: '[appImgLoad]',
  standalone: true,
})
export class ImgLoadDirective {
  @Input() set src(imgSrc: string | null | undefined) {
    if (imgSrc) {
      this.img.src = imgSrc;
      this.showPlaceholder();
    } else {
      this.img.src = this.imgPlaceholder;
    }
  }

  @Input() imgPlaceholder: string = 'assets/no-avatar.png'

  private readonly elRef = inject(ElementRef);
  private get img(): HTMLImageElement {
    return this.elRef.nativeElement;
  }

  private readonly placeholderEl = this.createPlaceholderEl();

  constructor() {
    this.img.onload = () => this.hidePlaceholder();
  }

  private showPlaceholder(): void {
    const el = this.placeholderEl;
    el.style.width = `${this.img.width + 2}px`;
    el.style.height = `${this.img.offsetHeight + 2}px`;
    el.style.top = `${this.img.offsetTop - 1}px`;
    el.style.left = `${this.img.offsetLeft - 1}px`;
    el.style.borderRadius = window.getComputedStyle(this.img).getPropertyValue('border-radius');
    this.img.after(this.placeholderEl);
  }

  private hidePlaceholder(): void {
    this.placeholderEl.remove();
  }

  private createPlaceholderEl(): HTMLDivElement {
    const res = document.createElement('div');
    res.style.zIndex = '1';
    res.style.position = 'absolute';
    res.className = 'skeleton-placeholder';
    return res;
  }
}