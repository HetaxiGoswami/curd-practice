import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { DialogRef } from '@angular/cdk/dialog';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-edit',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss',
})
export class AddEditComponent implements OnInit{
  empForm: any = FormGroup;
  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    private _dialogRef: MatDialogRef<AddEditComponent>,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = fb.group({
      firstname: ['', [Validators.required, Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      education: ['', Validators.required],
      dob: ['', Validators.required],
    });
  }

ngOnInit(): void {
  if(this.data){
    this.empForm.patchValue(this.data);

  }
}

onSubmit() {
  if (this.empForm.valid) {
      const formData = this.empForm.value; 
      
      if (this.data) {
          // Update existing employee
          this._apiService.updateEmployee(this.data.id, formData).subscribe({
              next: (val: any) => {
                  alert('Updated successfully');
                  this._dialogRef.close(true);
              },
              error: (err: any) => {
                  console.log(err);
              },
          });
      } else {
          this._apiService.addEmployee(formData).subscribe({
              next: (val: any) => {
                  alert('Employee added successfully');
                  this._dialogRef.close(true);
              },
              error: (err: any) => {
                  console.log(err);
              },
          });
      }
  } else {
      alert('Form is invalid');
  }
}     
  }


  