import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[soloNumeros]'
})
export class NumbersOnlyDirective {

  //hace un rastreo de los eventos del input
  constructor(private ref: ElementRef) { }

  @HostListener('input', ['$event']) ngOnChanges(changes: Event): void {
    //console.log(this. ref.nativeElement.value);
    const initValue =   this.ref.nativeElement.value;
    this.ref.nativeElement.value = initValue.replace(/[^0-9]*/g, '');
     if (initValue !== this.ref.nativeElement.value) {
      changes.preventDefault();
    }
     
  } 

}




// SimpleChange -> objeto que contiene el valor anterior y el nuevo valor
// Event -> objeto que contiene el evento que se dispara
// HostListener -> decorador que permite escuchar los eventos del input
// HostListener('input', ['$event']) -> escucha el evento input y le pasa el evento como parametro
// ngOnChanges -> metodo que se ejecuta cuando se cambia el valor del input


 //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    //this.ref.nativeElement.value = this.ref.nativeElement.value.replace(/[^0-9]*/g, '');
  
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
