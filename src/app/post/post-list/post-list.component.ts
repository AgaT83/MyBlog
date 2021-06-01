import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  errorMessage: string;
  posts: Post[];
  searchValue: string = '';

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts().subscribe(
      response => this.posts = response,
      error => this.errorMessage = error
    )
  }

  addVote(post: Post){
    post.likes += 1;
    this.postService.updatePost(post.id, post).subscribe();
  }

  onEnter(event: any){
    this.postService.getPostsByCriteria('q='+this.searchValue).subscribe(
      response => this.posts = response,
      error => this.errorMessage = error
    )
  }

  clearSearch() {
    this.searchValue = '';
    this.postService.getPosts().subscribe(
      response => this.posts = response,
      error => this.errorMessage = error
    )
  }
}
