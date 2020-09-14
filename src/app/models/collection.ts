export class Collection<T> implements CollectionInterface<T> {

  items: T[];
  page: number;
  itemsCount: number;
  totalItems: number;

  getItems(): T[] {
    return this['hydra:member'];
  }

  getPage() {
    return this.page;
  }

  getItemsCount() {
    return this['hydra:member'].length;
  }

  getTotalItems() {
    return this['hydra:totalItems'];
  }
}
