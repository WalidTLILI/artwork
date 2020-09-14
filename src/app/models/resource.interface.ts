interface ResourceInterface {

  /**
   * Defines how the resource will be called by the HttpRequest
   *
   * @return string
   */
  getURI(): string;
}
