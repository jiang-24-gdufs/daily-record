function eq(value, other) {
  return value === other || (value !== value && other !== other)
}

function assocIndexOf(array, key) {
  let { length } = array;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length
    }
  }
  return -1
}

class ListCache {
  constructor(entries) {
    let index = -1;
    const length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      const entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  clear() {
    this.__data__ = [];
    this.size = 0;
  }
  delete(key) {
    const data = this.__data__;
    const index = assocIndexOf(data, key);
    if (index < 0) {
      return false
    }
    const lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      data.splice(index, 1);
    }
    --this.size;
    return true
  }
  get(key) {
    const data = this.__data__;
    const index = assocIndexOf(data, key);
    return index < 0 ? undefined : data[index][1]
  }
  has(key) {
    return assocIndexOf(this.__data__, key) > -1
  }
  set(key, value) {
    const data = this.__data__;
    const index = assocIndexOf(data, key);
    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this
  }
}

const HASH_UNDEFINED = '__lodash_hash_undefined__';
class Hash {
  constructor(entries) {
    let index = -1;
    const length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      const entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  clear() {
    this.__data__ = Object.create(null);
    this.size = 0;
  }
  delete(key) {
    const result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result
  }
  get(key) {
    const data = this.__data__;
    const result = data[key];
    return result === HASH_UNDEFINED ? undefined : result
  }
  has(key) {
    const data = this.__data__;
    return data[key] !== undefined
  }
  set(key, value) {
    const data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = value === undefined ? HASH_UNDEFINED : value;
    return this
  }
}

function getMapData({ __data__ }, key) {
  const data = __data__;
  return isKeyable(key)
    ? data[typeof key === 'string' ? 'string' : 'hash']
    : data.map
}
function isKeyable(value) {
  const type = typeof value;
  return (type === 'string' || type === 'number' || type === 'symbol' || type === 'boolean')
    ? (value !== '__proto__')
    : (value === null)
}
class MapCache {
  constructor(entries) {
    let index = -1;
    const length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      const entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  clear() {
    this.size = 0;
    this.__data__ = {
      'hash': new Hash,
      'map': new Map,
      'string': new Hash
    };
  }
  delete(key) {
    const result = getMapData(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result
  }
  get(key) {
    return getMapData(this, key).get(key)
  }
  has(key) {
    return getMapData(this, key).has(key)
  }
  set(key, value) {
    const data = getMapData(this, key);
    const size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this
  }
}

const LARGE_ARRAY_SIZE = 200;
class Stack {
  constructor(entries) {
    const data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }
  clear() {
    this.__data__ = new ListCache;
    this.size = 0;
  }
  delete(key) {
    const data = this.__data__;
    const result = data['delete'](key);
    this.size = data.size;
    return result
  }
  get(key) {
    return this.__data__.get(key)
  }
  has(key) {
    return this.__data__.has(key)
  }
  set(key, value) {
    let data = this.__data__;
    if (data instanceof ListCache) {
      const pairs = data.__data__;
      if (pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this
      }
      data = this.__data__ = new MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this
  }
}

function arrayEach(array, iteratee) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break
    }
  }
  return array
}

function baseAssignValue(object, key, value) {
  if (key == '__proto__') {
    Object.defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

const hasOwnProperty$2 = Object.prototype.hasOwnProperty;
function assignValue(object, key, value) {
  const objValue = object[key];
  if (!(hasOwnProperty$2.call(object, key) && eq(objValue, value))) {
    if (value !== 0 || (1 / value) === (1 / objValue)) {
      baseAssignValue(object, key, value);
    }
  } else if (value === undefined && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}

const freeGlobal = typeof global === 'object' && global !== null && global.Object === Object && global;

const freeGlobalThis = typeof globalThis === 'object' && globalThis !== null && globalThis.Object == Object && globalThis;
const freeSelf = typeof self === 'object' && self !== null && self.Object === Object && self;
const root = freeGlobalThis || freeGlobal || freeSelf || Function('return this')();

const freeExports$2 = typeof exports === 'object' && exports !== null && !exports.nodeType && exports;
const freeModule$2 = freeExports$2 && typeof module === 'object' && module !== null && !module.nodeType && module;
const moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
const Buffer$1 = moduleExports$2 ? root.Buffer : undefined, allocUnsafe = Buffer$1 ? Buffer$1.allocUnsafe : undefined;
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice()
  }
  const length = buffer.length;
  const result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result);
  return result
}

function copyArray(source, array) {
  let index = -1;
  const length = source.length;
  array || (array = new Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array
}

function copyObject(source, props, object, customizer) {
  const isNew = !object;
  object || (object = {});
  for (const key of props) {
    let newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;
    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object
}

function cloneArrayBuffer(arrayBuffer) {
  const result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result
}

function cloneDataView(dataView, isDeep) {
  const buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength)
}

const reFlags = /\w*$/;
function cloneRegExp(regexp) {
  const result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result
}

const symbolValueOf = Symbol.prototype.valueOf;
function cloneSymbol(symbol) {
  return Object(symbolValueOf.call(symbol))
}

function cloneTypedArray(typedArray, isDeep) {
  const buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length)
}

const propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
const nativeGetSymbols = Object.getOwnPropertySymbols;
function getSymbols(object) {
  if (object == null) {
    return []
  }
  object = Object(object);
  return nativeGetSymbols(object).filter((symbol) => propertyIsEnumerable.call(object, symbol))
}

function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object)
}

function getSymbolsIn(object) {
  const result = [];
  while (object) {
    result.push(...getSymbols(object));
    object = Object.getPrototypeOf(Object(object));
  }
  return result
}

function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object)
}

const toString = Object.prototype.toString;
function getTag(value) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }
  return toString.call(value)
}

function isObjectLike(value) {
  return typeof value === 'object' && value !== null
}

function isArguments(value) {
  return isObjectLike(value) && getTag(value) == '[object Arguments]'
}

const freeExports$1 = typeof exports === 'object' && exports !== null && !exports.nodeType && exports;
const freeModule$1 = freeExports$1 && typeof module === 'object' && module !== null && !module.nodeType && module;
const moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
const Buffer = moduleExports$1 ? root.Buffer : undefined;
const nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
const isBuffer = nativeIsBuffer || (() => false);

const MAX_SAFE_INTEGER$1 = 9007199254740991;
const reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  const type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length &&
    (type === 'number' ||
      (type !== 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length)
}

const freeExports = typeof exports === 'object' && exports !== null && !exports.nodeType && exports;
const freeModule = freeExports && typeof module === 'object' && module !== null && !module.nodeType && module;
const moduleExports = freeModule && freeModule.exports === freeExports;
const freeProcess = moduleExports && freeGlobal.process;
const nodeTypes = ((() => {
  try {
    const typesHelper = freeModule && freeModule.require && freeModule.require('util').types;
    return typesHelper
      ? typesHelper
      : freeProcess && freeProcess.binding && freeProcess.binding('util')
  } catch (e) {}
})());

const reTypedTag = /^\[object (?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)Array\]$/;
const nodeIsTypedArray = nodeTypes && nodeTypes.isTypedArray;
const isTypedArray = nodeIsTypedArray
  ? (value) => nodeIsTypedArray(value)
  : (value) => isObjectLike(value) && reTypedTag.test(getTag(value));

const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  const isArr = Array.isArray(value);
  const isArg = !isArr && isArguments(value);
  const isBuff = !isArr && !isArg && isBuffer(value);
  const isType = !isArr && !isArg && !isBuff && isTypedArray(value);
  const skipIndexes = isArr || isArg || isBuff || isType;
  const length = value.length;
  const result = new Array(skipIndexes ? length : 0);
  let index = skipIndexes ? -1 : length;
  while (++index < length) {
    result[index] = `${index}`;
  }
  for (const key in value) {
    if ((inherited || hasOwnProperty$1.call(value, key)) &&
        !(skipIndexes && (
          (key === 'length' ||
           isIndex(key, length))
        ))) {
      result.push(key);
    }
  }
  return result
}

const MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value === 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER
}

function isArrayLike(value) {
  return value != null && typeof value !== 'function' && isLength(value.length)
}

function keys(object) {
  return isArrayLike(object)
    ? arrayLikeKeys(object)
    : Object.keys(Object(object))
}

function getAllKeys(object) {
  const result = keys(object);
  if (!Array.isArray(object)) {
    result.push(...getSymbols(object));
  }
  return result
}

function getAllKeysIn(object) {
  const result = [];
  for (const key in object) {
    result.push(key);
  }
  if (!Array.isArray(object)) {
    result.push(...getSymbolsIn(object));
  }
  return result
}

const objectProto = Object.prototype;
function isPrototype(value) {
  const Ctor = value && value.constructor;
  const proto = (typeof Ctor === 'function' && Ctor.prototype) || objectProto;
  return value === proto
}

function initCloneObject(object) {
  return (typeof object.constructor === 'function' && !isPrototype(object))
    ? Object.create(Object.getPrototypeOf(object))
    : {}
}

function isObject(value) {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function')
}

function keysIn(object) {
  const result = [];
  for (const key in object) {
    result.push(key);
  }
  return result
}

const CLONE_DEEP_FLAG$1 = 1;
const CLONE_FLAT_FLAG = 2;
const CLONE_SYMBOLS_FLAG$1 = 4;
const argsTag = '[object Arguments]';
const arrayTag = '[object Array]';
const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const mapTag = '[object Map]';
const numberTag = '[object Number]';
const objectTag = '[object Object]';
const regexpTag = '[object RegExp]';
const setTag = '[object Set]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const weakMapTag = '[object WeakMap]';
const arrayBufferTag = '[object ArrayBuffer]';
const dataViewTag = '[object DataView]';
const float32Tag = '[object Float32Array]';
const float64Tag = '[object Float64Array]';
const int8Tag = '[object Int8Array]';
const int16Tag = '[object Int16Array]';
const int32Tag = '[object Int32Array]';
const uint8Tag = '[object Uint8Array]';
const uint8ClampedTag = '[object Uint8ClampedArray]';
const uint16Tag = '[object Uint16Array]';
const uint32Tag = '[object Uint32Array]';
const cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[weakMapTag] = false;
const hasOwnProperty = Object.prototype.hasOwnProperty;
function initCloneByTag(object, tag, isDeep) {
  const Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object)
    case boolTag:
    case dateTag:
      return new Ctor(+object)
    case dataViewTag:
      return cloneDataView(object, isDeep)
    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep)
    case mapTag:
      return new Ctor
    case numberTag:
    case stringTag:
      return new Ctor(object)
    case regexpTag:
      return cloneRegExp(object)
    case setTag:
      return new Ctor
    case symbolTag:
      return cloneSymbol(object)
  }
}
function initCloneArray(array) {
  const { length } = array;
  const result = new array.constructor(length);
  if (length && typeof array[0] === 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result
}
function baseClone(value, bitmask, customizer, key, object, stack) {
  let result;
  const isDeep = bitmask & CLONE_DEEP_FLAG$1;
  const isFlat = bitmask & CLONE_FLAT_FLAG;
  const isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result
  }
  if (!isObject(value)) {
    return value
  }
  const isArr = Array.isArray(value);
  const tag = getTag(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result)
    }
  } else {
    const isFunc = typeof value === 'function';
    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep)
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, copyObject(value, keysIn(value), result))
          : copySymbols(value, Object.assign(result, value))
      }
    } else {
      if (isFunc || !cloneableTags[tag]) {
        return object ? value : {}
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  stack || (stack = new Stack);
  const stacked = stack.get(value);
  if (stacked) {
    return stacked
  }
  stack.set(value, result);
  if (tag == mapTag) {
    value.forEach((subValue, key) => {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
    return result
  }
  if (tag == setTag) {
    value.forEach((subValue) => {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
    return result
  }
  if (isTypedArray(value)) {
    return result
  }
  const keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);
  const props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, (subValue, key) => {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result
}

const CLONE_DEEP_FLAG = 1;
const CLONE_SYMBOLS_FLAG = 4;
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG)
}

export { cloneDeep as default };
