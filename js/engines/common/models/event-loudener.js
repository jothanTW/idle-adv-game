/**
 * This callback is called by the Event Loudener when triggered
 * @callback listener
 * @param {any} event
 */

/**
 * 
 */
export class EventLoudener {
  /** @type {listener[]} */
  listeners;

  constructor() {
    /** @type {listener[]} */
    this.listeners = [];
  }
}

/**
 * Adds a listnener function
 * @param {listener} listener 
 */
EventLoudener.prototype.listen = function(listener) {
  this.listeners.push(listener);
}


EventLoudener.prototype.removeListener = function(listener) {
  for (let i = 0; i < this.listeners.length; i++) {
    if (this.listeners === listener) {
      this.listeners.splice(i, 1);
      return;
    }
  }

  console.warn('Could not find listener to remove!');
}

/**
 * Trigger all listener functions with an event object
 * @param {any} event 
 */
EventLoudener.prototype.emit = function(event) {
  for (let l of this.listeners) {
    setTimeout(() => {
      l(event);
    });
  }
}