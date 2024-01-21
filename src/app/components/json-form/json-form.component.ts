import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: string;
  nullValidator?: boolean;
}

interface JsonFormControlOptions {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
}

interface JsonFormControls {
  name: string;
  label: string;
  value: string;
  type: string;
  options?: JsonFormControlOptions;
  required: boolean;
  validators: JsonFormValidators;
  items?: { value: string, viewValue: string }[]
}

export interface JsonFormData {
  controls: JsonFormControls[];
}

@Component({
  selector: 'app-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonFormComponent implements OnChanges {
  @Input() jsonFormData: JsonFormData | undefined;

  myForm: FormGroup = this.fb.group({});
  inputTypes = [
    'text',
    'password',
    'email',
    'number',
    'search',
    'tel',
    'url',
    'color',
    'date',
    'datetime-local',
    'month',
    'time',
    'week',
  ];

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    // This method is called when any input property changes
    if (!changes['jsonFormData'].firstChange) {
      if (this.jsonFormData) {
        this.createForm(this.jsonFormData.controls);
      }
      console.log('myForm', this.myForm);
    }
  }

  createForm(controls: JsonFormControls[]) {
    for (const control of controls) {
      const validatorsToAdd = [];

      for (const [key, value] of Object.entries(control.validators)) {
        switch (key) {
          case 'min':
            validatorsToAdd.push(Validators.min(value));
            break;
          case 'max':
            validatorsToAdd.push(Validators.max(value));
            break;
          case 'required':
            if (value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case 'requiredTrue':
            if (value) {
              validatorsToAdd.push(Validators.requiredTrue);
            }
            break;
          case 'email':
            if (value) {
              validatorsToAdd.push(Validators.email);
            }
            break;
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'pattern':
            validatorsToAdd.push(Validators.pattern(value));
            break;
          case 'nullValidator':
            if (value) {
              validatorsToAdd.push(Validators.nullValidator);
            }
            break;
          default:
            break;
        }
      }

      this.myForm.addControl(
        control.name,
        this.fb.control(control.value, validatorsToAdd)
      );
    }
  }

  onSubmit() {
    console.log('Is form valid? ', this.myForm.valid);
    console.log('Form values: ', this.myForm.value);
  }
}
