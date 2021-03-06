import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Cookbook, Section } from './cookbook';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-cookbook',
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.css']
})
export class CookbookComponent implements OnInit, OnDestroy {
  pageTitle = 'Edit Cookbook';
  cookbookForm: FormGroup;

  cookbook: Cookbook;
  private sub: Subscription;

  get sections() {
    return this.cookbookForm.get('sections') as FormArray;
  }

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.cookbookForm = this.fb.group({
      title: ['', Validators.required],
      sections: this.fb.array([
        this.fb.control('')
      ])
    });

    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      this.getCookbook(id);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getCookbook(id: string) {
    let cb:Cookbook = new Cookbook();
    // hard code sample cookbook for now
    // this.cookbookService.query('')
    // .subscribe(

    // );
    
    if(id){
      cb.id = id;
      cb.title = 'Sample Cookbook';
      cb.sections = [ { id: '1', title: 'Breakfast', order: 0 }];
    }    
    this.displayCookbook(cb);
  }

  displayCookbook(cb: Cookbook){
    if(this.cookbookForm) {
      this.cookbookForm.reset();
    }
    this.cookbook = cb;

    if(!this.cookbook.id){
      this.pageTitle = 'Add Cookbook';
    }else {
      this.pageTitle = `Edit Cookbook: ${this.cookbook.title}`;
      // copy values from cb.sections to local sections string array property..
    }

    // Update the data on the form
    this.cookbookForm.patchValue({
      title: this.cookbook.title
    });
  }

  saveCookbook() {
    if(this.cookbookForm.valid) {
      if(this.cookbookForm.dirty){
        // Copy over all of the original cookbook properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained.
        const c = { ...this.cookbook, ...this.cookbookForm.value };
        
        // if new cookbook..then create new cookbook
        // else then update existing cookbook
        console.log(c);
      }
    }
  }

  drop(event: CdkDragDrop<string[]>){
    let sectionsCopy = this.sections.controls;
    moveItemInArray(sectionsCopy, event.previousIndex, event.currentIndex);
    
  }

  addSection() {
    this.sections.push(new FormControl(''));
  }

  deleteSection(index: number) {
    this.sections.removeAt(index);
    this.sections.markAsDirty();
  }

}
