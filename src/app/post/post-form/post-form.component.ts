import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Post } from '../post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  public postForm: FormGroup;
  
  errorMessage: string;
  post: Post;
  image = null;

  constructor( private formBuilder: FormBuilder, private postService: PostService, private router: Router ) {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      text: ['', [Validators.required, Validators.minLength(100)]]
    })
  }

  ngOnInit(): void {

  }

  send(): void {
    this.post = {
      title: this.postForm.value.title,
      text: this.postForm.value.text,
      date: new Date(),
      likes: 0,
      image: this.image
    };
    
    this.postService.addPost(this.post).subscribe(response => response, error => this.errorMessage = error);
    this.postForm.reset();
    this.image = null;
  }

  backToHome(): void {
    this.router.navigate(['/home']);
  }

  get title() { return this.postForm.get('title'); }

  get text() { return this.postForm.get('text'); }

  uploadImage(event: any) {
    const file = event.target.files[0];

    if (file.type.split('/')[0] !== 'image') {
      return alert('only image files');
    } else {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          this.image = e.target.result;
        };
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}

