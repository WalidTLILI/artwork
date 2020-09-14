import {AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../services/http/data.service';
import {Artwork} from '../../models/artwork.model';
import {Collection} from '../../models/collection';
import {DatatableComponent, TableColumn} from '@swimlane/ngx-datatable';
import {Parameters} from '../../common/parameters';
import {first} from 'rxjs/operators';
import {Date} from '../../common/helpers/Date';

@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.component.html'
})
export class ArtworksComponent implements OnInit, AfterViewChecked {

  constructor(
    private dataService: DataService,
    private cdr: ChangeDetectorRef) {
  }

  // datatable's columns
  artworksColumns: TableColumn[] = [
    {name: 'title', prop: 'title', sortable: false, resizeable: true},
    {name: 'publicationDate', prop: 'publicationDate', pipe: {transform: Date.transform}, sortable: false, resizeable: true},
    {name: 'price', prop: 'price', sortable: false, resizeable: true},
    {name: 'author', prop: 'author', sortable: false, resizeable: true},
    {name: 'isbn', prop: 'isbn', sortable: false, resizeable: true},
    {name: 'collection', prop: 'collection', sortable: false, resizeable: true},
    {name: 'periodicity', prop: 'periodicity', sortable: false, resizeable: true},
    {name: 'category', prop: '@type', sortable: true, resizeable: true}
  ];
  page = Parameters.PAGE;
  artworks = [];
  @ViewChild('artworksTable', {static: true}) artworksTable: DatatableComponent;

  ngOnInit() {
    // initializations
    this.artworksTable.columns = this.artworksColumns;
    this.artworksTable.limit = Parameters.ITEMSPERPAGE;
    // this.artworksTable.externalPaging = true;

    // fill datatable with artworks
    this.getArtworks();

  }

  getArtworks() {
    this.artworksTable.loadingIndicator = true;
    this.dataService.getItems(new Artwork()
      // Enable this when you want to activate pagination
      // , '?page=' + this.page + '&itemsPerPage=' + Parameters.ITEMSPERPAGE
    )
      .pipe(first())
      .subscribe((response: Collection<Artwork>) => {
        this.artworksTable.rows = response.getItems();
        this.artworks = [...response.getItems()];

        // Enable this when you want to activate pagination
        // this.artworksTable.count = response.getTotalItems();
        // this.artworksTable.offset = Parameters.ITEMSPERPAGE;

        this.artworksTable.loadingIndicator = false;
      });
  }

  /**
   * Detects dom's values changes
   */
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  /**
   * Filter data by title
   * @param event any
   */
  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    // filter our data
    this.artworksTable.rows = this.artworks.filter(row => {
      return row.title.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // Whenever the filter changes, always go back to the first page
    this.artworksTable.offset = 0;
  }

}
