import { Component, ElementRef, Input, OnInit, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-addressInput',
  templateUrl: './addressInput.component.html',
  styleUrls: ['./addressInput.component.scss']
})

//Work in progress - Trying to find a way to make reusable inputs to simplify the forms
export class AddressInputComponent implements OnInit, ControlValueAccessor{
  @ViewChild('input', {static: true}) input!: ElementRef;
  @Input() type = 'text';
  @Input() label?: string;

  //NgControl is what form controlls are deriverd from
  //@Self decorator only use the dependancy here and won't look for any others
  constructor(@Self() public controlDir: NgControl) { 
    this.controlDir.valueAccessor = this;
  }

  ngOnInit() {
    const control = this.controlDir.control;
    const validators = control?.validator ? [control?.validator] : [];
    const asyncValidators = control?.asyncValidator ? [control.asyncValidator] : [];

    control!.setValidators(validators);
    control?.setAsyncValidators(asyncValidators);
    control?.updateValueAndValidity();
  }

  onChange(event: Event){}

  onTouched(){}

  writeValue(obj: any): void {
    this.input.nativeElement.value = obj || '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
