/**
@module ember
@submodule ember-runtime
*/

import Ember from "ember"; // Ember.assert
var get = Ember.get;
var set = Ember.set;
var meta = Ember.meta;
var addObserver = Ember.addObserver;
var removeObserver = Ember.removeObserver;
var addBeforeObserver = Ember.addBeforeObserver;
var removeBeforeObserver = Ember.removeBeforeObserver;
var propertyWillChange = Ember.propertyWillChange;
var propertyDidChange = Ember.propertyDidChange;
var computed = Ember.computed;
var defineProperty = Ember.defineProperty;
var Mixin = Ember.Mixin;
var observer = Ember.observer;
var fmt = Ember.String.fmt;

function contentPropertyWillChange(content, contentKey) {
  var key = contentKey.slice(8); // remove "content."
  if (key in this) { return; }  // if shadowed in proxy
  propertyWillChange(this, key);
}

function contentPropertyDidChange(content, contentKey) {
  var key = contentKey.slice(8); // remove "content."
  if (key in this) { return; } // if shadowed in proxy
  propertyDidChange(this, key);
}

/**
  `Ember.ProxyMixin` forwards all properties not defined by the proxy itself
  to a proxied `content` object.  See Ember.ObjectProxy for more details.

  @class ProxyMixin
  @namespace Ember
*/
export default Mixin.create({
  /**
    The object whose properties will be forwarded.

    @property content
    @type Ember.Object
    @default null
  */
  content: null,
  _contentDidChange: observer('content', function() {
    Ember.assert("Can't set Proxy's content to itself", get(this, 'content') !== this);
  }),

  isTruthy: computed.bool('content'),

  _debugContainerKey: null,

  willWatchProperty: function (key) {
    var contentKey = 'content.' + key;
    addBeforeObserver(this, contentKey, null, contentPropertyWillChange);
    addObserver(this, contentKey, null, contentPropertyDidChange);
  },

  didUnwatchProperty: function (key) {
    var contentKey = 'content.' + key;
    removeBeforeObserver(this, contentKey, null, contentPropertyWillChange);
    removeObserver(this, contentKey, null, contentPropertyDidChange);
  },

  unknownProperty: function (key) {
    var content = get(this, 'content');
    if (content) {
      return get(content, key);
    }
  },

  setUnknownProperty: function (key, value) {
    var m = meta(this);
    if (m.proto === this) {
      // if marked as prototype then just defineProperty
      // rather than delegate
      defineProperty(this, key, null, value);
      return value;
    }

    var content = get(this, 'content');
    Ember.assert(fmt("Cannot delegate set('%@', %@) to the 'content' property of object proxy %@: its 'content' is undefined.", [key, value, this]), content);
    return set(content, key, value);
  }

});
