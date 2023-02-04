import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      textarea: new FormControl('', [Validators.required])
    })
  }

  onSendMessage() {
    console.log(this.form.value);
    this.form.reset();
  }
}
