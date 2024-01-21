import { Component, OnInit } from '@angular/core';
import { JsonFormComponent, JsonFormData } from '../../components/json-form/json-form.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page-two',
  templateUrl: './page-two.component.html',
  styleUrls: ['./page-two.component.scss']
})
export class PageTwoComponent implements OnInit {
  form1Data: JsonFormData | undefined;
  form2Data: JsonFormData | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('/assets/form-1.json').subscribe((data) => {
      this.form1Data = data as JsonFormData;
    });

    this.http.get('/assets/form-2.json').subscribe((data) => {
      this.form2Data = data as JsonFormData;
    });
  }
}
