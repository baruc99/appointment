import { FormControl, ValidationErrors } from '@angular/forms';

export const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";


export const cantBeStrider = ( control: FormControl ): ValidationErrors | null => {

  const value: string = control.value.trim().toLowerCase();

  if ( value === 'strider' ) {
    return {
      noStrider: true,
    }
  }

  return null;
}

export const esMayorACero = (control: FormControl): {[s: string]: boolean} | null => {
    if (control.value <= 0) {
      // Si la validación falla, regresas un objeto con una propiedad que indica el error
      return { 'menorOIgualACero': true };
    }
    // Si la validación es exitosa, regresas null
    return null;
  }
