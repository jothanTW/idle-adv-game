class Resource {
  /** @type {string} name */
  name;
  /** @type {ResourceModifier[]} name */
  modifiers;
  /** @type {number} */
  amount;

  /**
   * @param {string} name 
   * @param  {...ResourceModifier} modifiers 
   */
  constructor(name, ...modifiers) {
    /** @type {string} name */
    this.name = name;
    /** @type {ResourceModifier[]} name */
    this.modifiers = modifiers;
    /** @type {number} */
    this.amount = 0;
  }
}

class ResourceModifier {
  /** @type {string} */
  name;
  /** @type {number} */
  multiplier;

  /**
   * 
   * @param {string} name - The name of the modified resource
   * @param {number} multiplier - The generation/use rate of the modified resource
   */
  constructor(name, multiplier) {
    /** @type {string} */
    this.name = name;
    /** @type {number} */
    this.multiplier = multiplier;
  }
}

export {
  Resource, ResourceModifier
}