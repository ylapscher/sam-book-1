// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

if (typeof global.Request === 'undefined') {
  class HeadersPolyfill {
    constructor(init) {
      this.map = new Map();
      if (!init) return;
      if (typeof init.forEach === 'function') {
        init.forEach((value, key) => this.set(key, value));
      } else if (Array.isArray(init)) {
        init.forEach(([key, value]) => this.set(key, value));
      } else if (typeof init.entries === 'function') {
        Array.from(init.entries()).forEach(([key, value]) => this.set(key, value));
      } else {
        Object.entries(init).forEach(([key, value]) => this.set(key, value));
      }
    }

    get(name) {
      const value = this.map.get(String(name).toLowerCase());
      return value == null ? null : value;
    }

    set(name, value) {
      this.map.set(String(name).toLowerCase(), String(value));
    }

    has(name) {
      return this.map.has(String(name).toLowerCase());
    }

    forEach(callback) {
      this.map.forEach((value, key) => callback(value, key));
    }

    entries() {
      return this.map.entries();
    }

    [Symbol.iterator]() {
      return this.map.entries();
    }
  }

  class RequestPolyfill {
    constructor(input, init = {}) {
      this.url = typeof input === 'string' ? input : input.url;
      this.method = (init.method || 'GET').toUpperCase();
      this.headers = new HeadersPolyfill(init.headers);
    }
  }

  class ResponsePolyfill {
    constructor(body = '', init = {}) {
      this.body = body;
      this.status = init.status ?? 200;
      this.statusText = init.statusText ?? '';
      this.headers = new HeadersPolyfill(init.headers);
    }

    async text() {
      if (this.body == null) return '';
      return String(this.body);
    }
  }

  global.Headers = HeadersPolyfill;
  global.Request = RequestPolyfill;
  global.Response = ResponsePolyfill;
}
