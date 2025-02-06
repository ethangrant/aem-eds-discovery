/**
 * Responsible for running the selected transformation strategy at runtime.
 */
export default class ComponentTransformer {
  setTransformer(transformer) {
    this.transformer = transformer;
  }

  transform(element) {
    return this.transformer.transform(element);
  }
}
