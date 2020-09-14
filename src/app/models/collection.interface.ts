interface CollectionInterface<T> {

  /**
   * get items returned on response
   *
   * @returns array of T
   */
  getItems(): T[];

  /**
   * get current page number
   *
   * @returns number
   */
  getPage(): number;

  /**
   * get number of items of current request
   *
   * @returns number
   */
  getItemsCount(): number;

  /**
   * get total items on api
   *
   * @returns number
   */
  getTotalItems(): number;
}
