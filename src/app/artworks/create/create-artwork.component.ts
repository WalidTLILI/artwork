import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {Newspaper} from '../../models/newspaper.model';
import {Book} from '../../models/book.model';
import {Magazine} from '../../models/magazine.model';
import {Artwork} from '../../models/artwork.model';
import {DataService} from '../../services/http/data.service';
import {Form} from '../../common/helpers/Form';

@Component({
  selector: 'app-create-artwork',
  templateUrl: './create-artwork.component.html'
})
export class CreateArtworkComponent implements OnInit {
  form: FormGroup;
  newspaperForm: FormGroup;
  bookForm: FormGroup;
  magazineForm: FormGroup;
  categories = ['newspaper', 'book', 'magazine'];

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: [null, Validators.required],
      publicationDate: [null, Validators.required],
      price: [null, Validators.required],
      category: [null, Validators.required]
    });

    this.newspaperForm = this.formBuilder.group({
      periodicity: [null, Validators.required],
    });

    this.bookForm = this.formBuilder.group({
      author: [null, Validators.required],
      isbn: [null, Validators.required]
    });

    this.magazineForm = this.formBuilder.group({
      collection: [null, Validators.required]
    });

  }

  /**
   * Validates the forms and submit
   */
  submit() {

    if (this.form.valid) {

      if (this.form.controls.category.value === 'newspaper' && this.newspaperForm.valid) {

        this.postArtwork(new Newspaper(), this.newspaperForm.value);
      }
      if (this.form.controls.category.value === 'book' && this.bookForm.valid) {
        this.postArtwork(new Book(), this.bookForm.value);
      }
      if (this.form.controls.category.value === 'magazine' && this.magazineForm.valid) {
        this.postArtwork(new Magazine(), this.magazineForm.value);
      }

    } else {
      Form.validate(this.form);
      Form.validate(this.magazineForm);
      Form.validate(this.newspaperForm);
      Form.validate(this.bookForm);
    }

  }

  /**
   * Post the form
   * @param artwork Artwork
   * @param formValue object
   */
  postArtwork(artwork: Artwork, formValue: object) {
    this.dataService.postItem(artwork, Object.assign(this.form.value, formValue))
      .pipe(first()).subscribe(() => this.router.navigate(['/artworks']));
  }

}
