import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDigitonly]',
})
export class DigitonlyDirective {
  constructor() {}

  @HostListener('keypress', ['$event'])
  onKeyDown(e: KeyboardEvent): any {
    const regexpNumber = /[0-9]/;
    let inputCharacter = String.fromCharCode(e.charCode);
    if (e.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      e.preventDefault();
    }

  }
}
