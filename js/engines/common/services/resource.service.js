import { Resource, ResourceModifier } from "../models/resource.js"

/** @type {Resource[]} */
let currentResources = [];

let ResourceService = {
  /**
   * Add a new resource, r add a value to a resource
   * @param {Resource} resource 
   */
  addResource: function(resource) {
    for (let r of currentResources) {
      if (r.name == resource.name) {
        r.amount += resource.amount;
        return;
      }
    }
    currentResources.push(resource);
  },

  /**
   * Advance resource generation by a number of ticks
   * @param {number} ticks 
   */
  updateResources: function (ticks) {
    /** @type {Map<string, number} */
    let newAmounts = new Map();
    for (let r of currentResources) {
      newAmounts.set(r.name, r.amount);
    }
    for (let r of currentResources) {
      for (let m of r.modifiers) {
        newAmounts.set(m.name,
          newAmounts.get(m.name) + r.amount * m.multiplier * ticks
        );
      }
    }
    for (let r of currentResources) {
      r.amount = newAmounts.get(r.name);
    }
  }
}

export {
  ResourceService
}