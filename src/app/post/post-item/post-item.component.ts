import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { PostService } from '../post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent {

  post: Partial<Post>;
  public postForm: FormGroup;
  edit: boolean = false;
  image = null;

  constructor(private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.postService.getPost(id).subscribe(data => this.post = data);
    
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      text: ['', [Validators.required, Validators.minLength(100)]]
    })
  }

  savePost(){
    this.post.title = this.postForm.value.title; 
    this.post.text = this.postForm.value.text;
    this.post.image = this.image;
    this.postService.updatePost(this.post.id, this.post as Post).subscribe();
    this.edit = false;
  }

  postDelete() {
    this.postService.deletePost(this.post.id).subscribe();
    this.router.navigate(['/']);
  }

  backToHome() {
    this.router.navigate(['/']);
  }

  setEditMode() {
    this.image = this.post.image;
    this.postForm.patchValue(this.post);
    this.edit = true;
  }

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
