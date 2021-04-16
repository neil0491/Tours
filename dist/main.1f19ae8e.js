// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/gsap/gsap-core.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._getCache = exports._getSetter = exports._missingPlugin = exports._round = exports._roundModifier = exports._config = exports._ticker = exports._plugins = exports._checkPlugin = exports._replaceRandom = exports._colorStringFilter = exports._sortPropTweensByPriority = exports._forEachName = exports._removeLinkedListItem = exports._setDefaults = exports._relExp = exports._renderComplexString = exports._isUndefined = exports._isString = exports._numWithUnitExp = exports._numExp = exports._getProperty = exports.shuffle = exports.interpolate = exports.unitize = exports.pipe = exports.mapRange = exports.toArray = exports.splitColor = exports.clamp = exports.getUnit = exports.normalize = exports.snap = exports.random = exports.distribute = exports.wrapYoyo = exports.wrap = exports.Circ = exports.Expo = exports.Sine = exports.Bounce = exports.SteppedEase = exports.Back = exports.Elastic = exports.Strong = exports.Quint = exports.Quart = exports.Cubic = exports.Quad = exports.Linear = exports.Power4 = exports.Power3 = exports.Power2 = exports.Power1 = exports.Power0 = exports.default = exports.gsap = exports.PropTween = exports.TweenLite = exports.TweenMax = exports.Tween = exports.TimelineLite = exports.TimelineMax = exports.Timeline = exports.Animation = exports.GSCache = void 0;

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
/*!
 * GSAP 3.6.0
 * https://greensock.com
 *
 * @license Copyright 2008-2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */


var _config = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
},
    _defaults = {
  duration: .5,
  overwrite: false,
  delay: 0
},
    _suppressOverwrites,
    _bigNum = 1e8,
    _tinyNum = 1 / _bigNum,
    _2PI = Math.PI * 2,
    _HALF_PI = _2PI / 4,
    _gsID = 0,
    _sqrt = Math.sqrt,
    _cos = Math.cos,
    _sin = Math.sin,
    _isString = function _isString(value) {
  return typeof value === "string";
},
    _isFunction = function _isFunction(value) {
  return typeof value === "function";
},
    _isNumber = function _isNumber(value) {
  return typeof value === "number";
},
    _isUndefined = function _isUndefined(value) {
  return typeof value === "undefined";
},
    _isObject = function _isObject(value) {
  return typeof value === "object";
},
    _isNotFalse = function _isNotFalse(value) {
  return value !== false;
},
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _isFuncOrString = function _isFuncOrString(value) {
  return _isFunction(value) || _isString(value);
},
    _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function () {},
    // note: IE10 has ArrayBuffer, but NOT ArrayBuffer.isView().
_isArray = Array.isArray,
    _strictNumExp = /(?:-?\.?\d|\.)+/gi,
    //only numbers (including negatives and decimals) but NOT relative values.
_numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
    //finds any numbers, including ones that start with += or -=, negative numbers, and ones in scientific notation like 1e-8.
_numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
    //duplicate so that while we're looping through matches from exec(), it doesn't contaminate the lastIndex of _numExp which we use to search for colors too.
_relExp = /[+-]=-?[.\d]+/,
    _delimitedValueExp = /[#\-+.]*\b[a-z\d-=+%.]+/gi,
    _unitExp = /[\d.+\-=]+(?:e[-+]\d*)*/i,
    _globalTimeline,
    _win,
    _coreInitted,
    _doc,
    _globals = {},
    _installScope = {},
    _coreReady,
    _install = function _install(scope) {
  return (_installScope = _merge(scope, _globals)) && gsap;
},
    _missingPlugin = function _missingPlugin(property, value) {
  return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
},
    _warn = function _warn(message, suppress) {
  return !suppress && console.warn(message);
},
    _addGlobal = function _addGlobal(name, obj) {
  return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
},
    _emptyFunc = function _emptyFunc() {
  return 0;
},
    _reservedProps = {},
    _lazyTweens = [],
    _lazyLookup = {},
    _lastRenderedFrame,
    _plugins = {},
    _effects = {},
    _nextGCFrame = 30,
    _harnessPlugins = [],
    _callbackNames = "",
    _harness = function _harness(targets) {
  var target = targets[0],
      harnessPlugin,
      i;
  _isObject(target) || _isFunction(target) || (targets = [targets]);

  if (!(harnessPlugin = (target._gsap || {}).harness)) {
    // find the first target with a harness. We assume targets passed into an animation will be of similar type, meaning the same kind of harness can be used for them all (performance optimization)
    i = _harnessPlugins.length;

    while (i-- && !_harnessPlugins[i].targetTest(target)) {}

    harnessPlugin = _harnessPlugins[i];
  }

  i = targets.length;

  while (i--) {
    targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
  }

  return targets;
},
    _getCache = function _getCache(target) {
  return target._gsap || _harness(toArray(target))[0]._gsap;
},
    _getProperty = function _getProperty(target, property, v) {
  return (v = target[property]) && _isFunction(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
},
    _forEachName = function _forEachName(names, func) {
  return (names = names.split(",")).forEach(func) || names;
},
    //split a comma-delimited list of names into an array, then run a forEach() function and return the split array (this is just a way to consolidate/shorten some code).
_round = function _round(value) {
  return Math.round(value * 100000) / 100000 || 0;
},
    _arrayContainsAny = function _arrayContainsAny(toSearch, toFind) {
  //searches one array to find matches for any of the items in the toFind array. As soon as one is found, it returns true. It does NOT return all the matches; it's simply a boolean search.
  var l = toFind.length,
      i = 0;

  for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l;) {}

  return i < l;
},
    _parseVars = function _parseVars(params, type, parent) {
  //reads the arguments passed to one of the key methods and figures out if the user is defining things with the OLD/legacy syntax where the duration is the 2nd parameter, and then it adjusts things accordingly and spits back the corrected vars object (with the duration added if necessary, as well as runBackwards or startAt or immediateRender). type 0 = to()/staggerTo(), 1 = from()/staggerFrom(), 2 = fromTo()/staggerFromTo()
  var isLegacy = _isNumber(params[1]),
      varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1),
      vars = params[varsIndex],
      irVars;

  isLegacy && (vars.duration = params[1]);
  vars.parent = parent;

  if (type) {
    irVars = vars;

    while (parent && !("immediateRender" in irVars)) {
      // inheritance hasn't happened yet, but someone may have set a default in an ancestor timeline. We could do vars.immediateRender = _isNotFalse(_inheritDefaults(vars).immediateRender) but that'd exact a slight performance penalty because _inheritDefaults() also runs in the Tween constructor. We're paying a small kb price here to gain speed.
      irVars = parent.vars.defaults || {};
      parent = _isNotFalse(parent.vars.inherit) && parent.parent;
    }

    vars.immediateRender = _isNotFalse(irVars.immediateRender);
    type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1]; // "from" vars
  }

  return vars;
},
    _lazyRender = function _lazyRender() {
  var l = _lazyTweens.length,
      a = _lazyTweens.slice(0),
      i,
      tween;

  _lazyLookup = {};
  _lazyTweens.length = 0;

  for (i = 0; i < l; i++) {
    tween = a[i];
    tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
  }
},
    _lazySafeRender = function _lazySafeRender(animation, time, suppressEvents, force) {
  _lazyTweens.length && _lazyRender();
  animation.render(time, suppressEvents, force);
  _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
},
    _numericIfPossible = function _numericIfPossible(value) {
  var n = parseFloat(value);
  return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString(value) ? value.trim() : value;
},
    _passThrough = function _passThrough(p) {
  return p;
},
    _setDefaults = function _setDefaults(obj, defaults) {
  for (var p in defaults) {
    p in obj || (obj[p] = defaults[p]);
  }

  return obj;
},
    _setKeyframeDefaults = function _setKeyframeDefaults(obj, defaults) {
  for (var p in defaults) {
    p in obj || p === "duration" || p === "ease" || (obj[p] = defaults[p]);
  }
},
    _merge = function _merge(base, toMerge) {
  for (var p in toMerge) {
    base[p] = toMerge[p];
  }

  return base;
},
    _mergeDeep = function _mergeDeep(base, toMerge) {
  for (var p in toMerge) {
    p !== "__proto__" && p !== "constructor" && p !== "prototype" && (base[p] = _isObject(toMerge[p]) ? _mergeDeep(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
  }

  return base;
},
    _copyExcluding = function _copyExcluding(obj, excluding) {
  var copy = {},
      p;

  for (p in obj) {
    p in excluding || (copy[p] = obj[p]);
  }

  return copy;
},
    _inheritDefaults = function _inheritDefaults(vars) {
  var parent = vars.parent || _globalTimeline,
      func = vars.keyframes ? _setKeyframeDefaults : _setDefaults;

  if (_isNotFalse(vars.inherit)) {
    while (parent) {
      func(vars, parent.vars.defaults);
      parent = parent.parent || parent._dp;
    }
  }

  return vars;
},
    _arraysMatch = function _arraysMatch(a1, a2) {
  var i = a1.length,
      match = i === a2.length;

  while (match && i-- && a1[i] === a2[i]) {}

  return i < 0;
},
    _addLinkedListItem = function _addLinkedListItem(parent, child, firstProp, lastProp, sortBy) {
  if (firstProp === void 0) {
    firstProp = "_first";
  }

  if (lastProp === void 0) {
    lastProp = "_last";
  }

  var prev = parent[lastProp],
      t;

  if (sortBy) {
    t = child[sortBy];

    while (prev && prev[sortBy] > t) {
      prev = prev._prev;
    }
  }

  if (prev) {
    child._next = prev._next;
    prev._next = child;
  } else {
    child._next = parent[firstProp];
    parent[firstProp] = child;
  }

  if (child._next) {
    child._next._prev = child;
  } else {
    parent[lastProp] = child;
  }

  child._prev = prev;
  child.parent = child._dp = parent;
  return child;
},
    _removeLinkedListItem = function _removeLinkedListItem(parent, child, firstProp, lastProp) {
  if (firstProp === void 0) {
    firstProp = "_first";
  }

  if (lastProp === void 0) {
    lastProp = "_last";
  }

  var prev = child._prev,
      next = child._next;

  if (prev) {
    prev._next = next;
  } else if (parent[firstProp] === child) {
    parent[firstProp] = next;
  }

  if (next) {
    next._prev = prev;
  } else if (parent[lastProp] === child) {
    parent[lastProp] = prev;
  }

  child._next = child._prev = child.parent = null; // don't delete the _dp just so we can revert if necessary. But parent should be null to indicate the item isn't in a linked list.
},
    _removeFromParent = function _removeFromParent(child, onlyIfParentHasAutoRemove) {
  child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove(child);
  child._act = 0;
},
    _uncache = function _uncache(animation, child) {
  if (animation && (!child || child._end > animation._dur || child._start < 0)) {
    // performance optimization: if a child animation is passed in we should only uncache if that child EXTENDS the animation (its end time is beyond the end)
    var a = animation;

    while (a) {
      a._dirty = 1;
      a = a.parent;
    }
  }

  return animation;
},
    _recacheAncestors = function _recacheAncestors(animation) {
  var parent = animation.parent;

  while (parent && parent.parent) {
    //sometimes we must force a re-sort of all children and update the duration/totalDuration of all ancestor timelines immediately in case, for example, in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
    parent._dirty = 1;
    parent.totalDuration();
    parent = parent.parent;
  }

  return animation;
},
    _hasNoPausedAncestors = function _hasNoPausedAncestors(animation) {
  return !animation || animation._ts && _hasNoPausedAncestors(animation.parent);
},
    _elapsedCycleDuration = function _elapsedCycleDuration(animation) {
  return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
},
    // feed in the totalTime and cycleDuration and it'll return the cycle (iteration minus 1) and if the playhead is exactly at the very END, it will NOT bump up to the next cycle.
_animationCycle = function _animationCycle(tTime, cycleDuration) {
  var whole = Math.floor(tTime /= cycleDuration);
  return tTime && whole === tTime ? whole - 1 : whole;
},
    _parentToChildTotalTime = function _parentToChildTotalTime(parentTime, child) {
  return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
},
    _setEnd = function _setEnd(animation) {
  return animation._end = _round(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
},
    _alignPlayhead = function _alignPlayhead(animation, totalTime) {
  // adjusts the animation's _start and _end according to the provided totalTime (only if the parent's smoothChildTiming is true and the animation isn't paused). It doesn't do any rendering or forcing things back into parent timelines, etc. - that's what totalTime() is for.
  var parent = animation._dp;

  if (parent && parent.smoothChildTiming && animation._ts) {
    animation._start = _round(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));

    _setEnd(animation);

    parent._dirty || _uncache(parent, animation); //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
  }

  return animation;
},

/*
_totalTimeToTime = (clampedTotalTime, duration, repeat, repeatDelay, yoyo) => {
	let cycleDuration = duration + repeatDelay,
		time = _round(clampedTotalTime % cycleDuration);
	if (time > duration) {
		time = duration;
	}
	return (yoyo && (~~(clampedTotalTime / cycleDuration) & 1)) ? duration - time : time;
},
*/
_postAddChecks = function _postAddChecks(timeline, child) {
  var t;

  if (child._time || child._initted && !child._dur) {
    //in case, for example, the _start is moved on a tween that has already rendered. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning.
    t = _parentToChildTotalTime(timeline.rawTime(), child);

    if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
      child.render(t, true);
    }
  } //if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.


  if (_uncache(timeline, child)._dp && timeline._initted && timeline._time >= timeline._dur && timeline._ts) {
    //in case any of the ancestors had completed but should now be enabled...
    if (timeline._dur < timeline.duration()) {
      t = timeline;

      while (t._dp) {
        t.rawTime() >= 0 && t.totalTime(t._tTime); //moves the timeline (shifts its startTime) if necessary, and also enables it. If it's currently zero, though, it may not be scheduled to render until later so there's no need to force it to align with the current playhead position. Only move to catch up with the playhead.

        t = t._dp;
      }
    }

    timeline._zTime = -_tinyNum; // helps ensure that the next render() will be forced (crossingStart = true in render()), even if the duration hasn't changed (we're adding a child which would need to get rendered). Definitely an edge case. Note: we MUST do this AFTER the loop above where the totalTime() might trigger a render() because this _addToTimeline() method gets called from the Animation constructor, BEFORE tweens even record their targets, etc. so we wouldn't want things to get triggered in the wrong order.
  }
},
    _addToTimeline = function _addToTimeline(timeline, child, position, skipChecks) {
  child.parent && _removeFromParent(child);
  child._start = _round(position + child._delay);
  child._end = _round(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));

  _addLinkedListItem(timeline, child, "_first", "_last", timeline._sort ? "_start" : 0);

  timeline._recent = child;
  skipChecks || _postAddChecks(timeline, child);
  return timeline;
},
    _scrollTrigger = function _scrollTrigger(animation, trigger) {
  return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
},
    _attemptInitTween = function _attemptInitTween(tween, totalTime, force, suppressEvents) {
  _initTween(tween, totalTime);

  if (!tween._initted) {
    return 1;
  }

  if (!force && tween._pt && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
    _lazyTweens.push(tween);

    tween._lazy = [totalTime, suppressEvents];
    return 1;
  }
},
    _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart(_ref) {
  var parent = _ref.parent;
  return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart(parent));
},
    // check parent's _lock because when a timeline repeats/yoyos and does its artificial wrapping, we shouldn't force the ratio back to 0
_renderZeroDurationTween = function _renderZeroDurationTween(tween, totalTime, suppressEvents, force) {
  var prevRatio = tween.ratio,
      ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) || (tween._ts < 0 || tween._dp._ts < 0) && tween.data !== "isFromStart" && tween.data !== "isStart") ? 0 : 1,
      // if the tween or its parent is reversed and the totalTime is 0, we should go to a ratio of 0.
  repeatDelay = tween._rDelay,
      tTime = 0,
      pt,
      iteration,
      prevIteration;

  if (repeatDelay && tween._repeat) {
    // in case there's a zero-duration tween that has a repeat with a repeatDelay
    tTime = _clamp(0, tween._tDur, totalTime);
    iteration = _animationCycle(tTime, repeatDelay);
    prevIteration = _animationCycle(tween._tTime, repeatDelay);
    tween._yoyo && iteration & 1 && (ratio = 1 - ratio);

    if (iteration !== prevIteration) {
      prevRatio = 1 - ratio;
      tween.vars.repeatRefresh && tween._initted && tween.invalidate();
    }
  }

  if (ratio !== prevRatio || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
    if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents)) {
      // if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
      return;
    }

    prevIteration = tween._zTime;
    tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0); // when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

    suppressEvents || (suppressEvents = totalTime && !prevIteration); // if it was rendered previously at exactly 0 (_zTime) and now the playhead is moving away, DON'T fire callbacks otherwise they'll seem like duplicates.

    tween.ratio = ratio;
    tween._from && (ratio = 1 - ratio);
    tween._time = 0;
    tween._tTime = tTime;
    suppressEvents || _callback(tween, "onStart");
    pt = tween._pt;

    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }

    tween._startAt && totalTime < 0 && tween._startAt.render(totalTime, true, true);
    tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
    tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");

    if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
      ratio && _removeFromParent(tween, 1);

      if (!suppressEvents) {
        _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);

        tween._prom && tween._prom();
      }
    }
  } else if (!tween._zTime) {
    tween._zTime = totalTime;
  }
},
    _findNextPauseTween = function _findNextPauseTween(animation, prevTime, time) {
  var child;

  if (time > prevTime) {
    child = animation._first;

    while (child && child._start <= time) {
      if (!child._dur && child.data === "isPause" && child._start > prevTime) {
        return child;
      }

      child = child._next;
    }
  } else {
    child = animation._last;

    while (child && child._start >= time) {
      if (!child._dur && child.data === "isPause" && child._start < prevTime) {
        return child;
      }

      child = child._prev;
    }
  }
},
    _setDuration = function _setDuration(animation, duration, skipUncache, leavePlayhead) {
  var repeat = animation._repeat,
      dur = _round(duration) || 0,
      totalProgress = animation._tTime / animation._tDur;
  totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
  animation._dur = dur;
  animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _round(dur * (repeat + 1) + animation._rDelay * repeat);
  totalProgress && !leavePlayhead ? _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress) : animation.parent && _setEnd(animation);
  skipUncache || _uncache(animation.parent, animation);
  return animation;
},
    _onUpdateTotalDuration = function _onUpdateTotalDuration(animation) {
  return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
},
    _zeroPosition = {
  _start: 0,
  endTime: _emptyFunc
},
    _parsePosition = function _parsePosition(animation, position) {
  var labels = animation.labels,
      recent = animation._recent || _zeroPosition,
      clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur,
      //in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.
  i,
      offset;

  if (_isString(position) && (isNaN(position) || position in labels)) {
    //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
    i = position.charAt(0);

    if (i === "<" || i === ">") {
      return (i === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0);
    }

    i = position.indexOf("=");

    if (i < 0) {
      position in labels || (labels[position] = clippedDuration);
      return labels[position];
    }

    offset = +(position.charAt(i - 1) + position.substr(i + 1));
    return i > 1 ? _parsePosition(animation, position.substr(0, i - 1)) + offset : clippedDuration + offset;
  }

  return position == null ? clippedDuration : +position;
},
    _conditionalReturn = function _conditionalReturn(value, func) {
  return value || value === 0 ? func(value) : func;
},
    _clamp = function _clamp(min, max, value) {
  return value < min ? min : value > max ? max : value;
},
    getUnit = function getUnit(value) {
  if (typeof value !== "string") {
    return "";
  }

  var v = _unitExp.exec(value);

  return v ? value.substr(v.index + v[0].length) : "";
},
    // note: protect against padded numbers as strings, like "100.100". That shouldn't return "00" as the unit. If it's numeric, return no unit.
clamp = function clamp(min, max, value) {
  return _conditionalReturn(value, function (v) {
    return _clamp(min, max, v);
  });
},
    _slice = [].slice,
    _isArrayLike = function _isArrayLike(value, nonEmpty) {
  return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win;
},
    _flatten = function _flatten(ar, leaveStrings, accumulator) {
  if (accumulator === void 0) {
    accumulator = [];
  }

  return ar.forEach(function (value) {
    var _accumulator;

    return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
  }) || accumulator;
},
    //takes any value and returns an array. If it's a string (and leaveStrings isn't true), it'll use document.querySelectorAll() and convert that to an array. It'll also accept iterables like jQuery objects.
toArray = function toArray(value, leaveStrings) {
  return _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call(_doc.querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
},
    shuffle = function shuffle(a) {
  return a.sort(function () {
    return .5 - Math.random();
  });
},
    // alternative that's a bit faster and more reliably diverse but bigger:   for (let j, v, i = a.length; i; j = Math.floor(Math.random() * i), v = a[--i], a[i] = a[j], a[j] = v); return a;
//for distributing values across an array. Can accept a number, a function or (most commonly) a function which can contain the following properties: {base, amount, from, ease, grid, axis, length, each}. Returns a function that expects the following parameters: index, target, array. Recognizes the following
distribute = function distribute(v) {
  if (_isFunction(v)) {
    return v;
  }

  var vars = _isObject(v) ? v : {
    each: v
  },
      //n:1 is just to indicate v was a number; we leverage that later to set v according to the length we get. If a number is passed in, we treat it like the old stagger value where 0.1, for example, would mean that things would be distributed with 0.1 between each element in the array rather than a total "amount" that's chunked out among them all.
  ease = _parseEase(vars.ease),
      from = vars.from || 0,
      base = parseFloat(vars.base) || 0,
      cache = {},
      isDecimal = from > 0 && from < 1,
      ratios = isNaN(from) || isDecimal,
      axis = vars.axis,
      ratioX = from,
      ratioY = from;

  if (_isString(from)) {
    ratioX = ratioY = {
      center: .5,
      edges: .5,
      end: 1
    }[from] || 0;
  } else if (!isDecimal && ratios) {
    ratioX = from[0];
    ratioY = from[1];
  }

  return function (i, target, a) {
    var l = (a || vars).length,
        distances = cache[l],
        originX,
        originY,
        x,
        y,
        d,
        j,
        max,
        min,
        wrapAt;

    if (!distances) {
      wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum])[1];

      if (!wrapAt) {
        max = -_bigNum;

        while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {}

        wrapAt--;
      }

      distances = cache[l] = [];
      originX = ratios ? Math.min(wrapAt, l) * ratioX - .5 : from % wrapAt;
      originY = ratios ? l * ratioY / wrapAt - .5 : from / wrapAt | 0;
      max = 0;
      min = _bigNum;

      for (j = 0; j < l; j++) {
        x = j % wrapAt - originX;
        y = originY - (j / wrapAt | 0);
        distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
        d > max && (max = d);
        d < min && (min = d);
      }

      from === "random" && shuffle(distances);
      distances.max = max - min;
      distances.min = min;
      distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
      distances.b = l < 0 ? base - l : base;
      distances.u = getUnit(vars.amount || vars.each) || 0; //unit

      ease = ease && l < 0 ? _invertEase(ease) : ease;
    }

    l = (distances[i] - distances.min) / distances.max || 0;
    return _round(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u; //round in order to work around floating point errors
  };
},
    _roundModifier = function _roundModifier(v) {
  //pass in 0.1 get a function that'll round to the nearest tenth, or 5 to round to the closest 5, or 0.001 to the closest 1000th, etc.
  var p = v < 1 ? Math.pow(10, (v + "").length - 2) : 1; //to avoid floating point math errors (like 24 * 0.1 == 2.4000000000000004), we chop off at a specific number of decimal places (much faster than toFixed()

  return function (raw) {
    var n = Math.round(parseFloat(raw) / v) * v * p;
    return (n - n % 1) / p + (_isNumber(raw) ? 0 : getUnit(raw)); // n - n % 1 replaces Math.floor() in order to handle negative values properly. For example, Math.floor(-150.00000000000003) is 151!
  };
},
    snap = function snap(snapTo, value) {
  var isArray = _isArray(snapTo),
      radius,
      is2D;

  if (!isArray && _isObject(snapTo)) {
    radius = isArray = snapTo.radius || _bigNum;

    if (snapTo.values) {
      snapTo = toArray(snapTo.values);

      if (is2D = !_isNumber(snapTo[0])) {
        radius *= radius; //performance optimization so we don't have to Math.sqrt() in the loop.
      }
    } else {
      snapTo = _roundModifier(snapTo.increment);
    }
  }

  return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction(snapTo) ? function (raw) {
    is2D = snapTo(raw);
    return Math.abs(is2D - raw) <= radius ? is2D : raw;
  } : function (raw) {
    var x = parseFloat(is2D ? raw.x : raw),
        y = parseFloat(is2D ? raw.y : 0),
        min = _bigNum,
        closest = 0,
        i = snapTo.length,
        dx,
        dy;

    while (i--) {
      if (is2D) {
        dx = snapTo[i].x - x;
        dy = snapTo[i].y - y;
        dx = dx * dx + dy * dy;
      } else {
        dx = Math.abs(snapTo[i] - x);
      }

      if (dx < min) {
        min = dx;
        closest = i;
      }
    }

    closest = !radius || min <= radius ? snapTo[closest] : raw;
    return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
  });
},
    random = function random(min, max, roundingIncrement, returnFunction) {
  return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function () {
    return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * .99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
  });
},
    pipe = function pipe() {
  for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  return function (value) {
    return functions.reduce(function (v, f) {
      return f(v);
    }, value);
  };
},
    unitize = function unitize(func, unit) {
  return function (value) {
    return func(parseFloat(value)) + (unit || getUnit(value));
  };
},
    normalize = function normalize(min, max, value) {
  return mapRange(min, max, 0, 1, value);
},
    _wrapArray = function _wrapArray(a, wrapper, value) {
  return _conditionalReturn(value, function (index) {
    return a[~~wrapper(index)];
  });
},
    wrap = function wrap(min, max, value) {
  // NOTE: wrap() CANNOT be an arrow function! A very odd compiling bug causes problems (unrelated to GSAP).
  var range = max - min;
  return _isArray(min) ? _wrapArray(min, wrap(0, min.length), max) : _conditionalReturn(value, function (value) {
    return (range + (value - min) % range) % range + min;
  });
},
    wrapYoyo = function wrapYoyo(min, max, value) {
  var range = max - min,
      total = range * 2;
  return _isArray(min) ? _wrapArray(min, wrapYoyo(0, min.length - 1), max) : _conditionalReturn(value, function (value) {
    value = (total + (value - min) % total) % total || 0;
    return min + (value > range ? total - value : value);
  });
},
    _replaceRandom = function _replaceRandom(value) {
  //replaces all occurrences of random(...) in a string with the calculated random value. can be a range like random(-100, 100, 5) or an array like random([0, 100, 500])
  var prev = 0,
      s = "",
      i,
      nums,
      end,
      isArray;

  while (~(i = value.indexOf("random(", prev))) {
    end = value.indexOf(")", i);
    isArray = value.charAt(i + 7) === "[";
    nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
    s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
    prev = end + 1;
  }

  return s + value.substr(prev, value.length - prev);
},
    mapRange = function mapRange(inMin, inMax, outMin, outMax, value) {
  var inRange = inMax - inMin,
      outRange = outMax - outMin;
  return _conditionalReturn(value, function (value) {
    return outMin + ((value - inMin) / inRange * outRange || 0);
  });
},
    interpolate = function interpolate(start, end, progress, mutate) {
  var func = isNaN(start + end) ? 0 : function (p) {
    return (1 - p) * start + p * end;
  };

  if (!func) {
    var isString = _isString(start),
        master = {},
        p,
        i,
        interpolators,
        l,
        il;

    progress === true && (mutate = 1) && (progress = null);

    if (isString) {
      start = {
        p: start
      };
      end = {
        p: end
      };
    } else if (_isArray(start) && !_isArray(end)) {
      interpolators = [];
      l = start.length;
      il = l - 2;

      for (i = 1; i < l; i++) {
        interpolators.push(interpolate(start[i - 1], start[i])); //build the interpolators up front as a performance optimization so that when the function is called many times, it can just reuse them.
      }

      l--;

      func = function func(p) {
        p *= l;
        var i = Math.min(il, ~~p);
        return interpolators[i](p - i);
      };

      progress = end;
    } else if (!mutate) {
      start = _merge(_isArray(start) ? [] : {}, start);
    }

    if (!interpolators) {
      for (p in end) {
        _addPropTween.call(master, start, p, "get", end[p]);
      }

      func = function func(p) {
        return _renderPropTweens(p, master) || (isString ? start.p : start);
      };
    }
  }

  return _conditionalReturn(progress, func);
},
    _getLabelInDirection = function _getLabelInDirection(timeline, fromTime, backward) {
  //used for nextLabel() and previousLabel()
  var labels = timeline.labels,
      min = _bigNum,
      p,
      distance,
      label;

  for (p in labels) {
    distance = labels[p] - fromTime;

    if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
      label = p;
      min = distance;
    }
  }

  return label;
},
    _callback = function _callback(animation, type, executeLazyFirst) {
  var v = animation.vars,
      callback = v[type],
      params,
      scope;

  if (!callback) {
    return;
  }

  params = v[type + "Params"];
  scope = v.callbackScope || animation;
  executeLazyFirst && _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.

  return params ? callback.apply(scope, params) : callback.call(scope);
},
    _interrupt = function _interrupt(animation) {
  _removeFromParent(animation);

  animation.progress() < 1 && _callback(animation, "onInterrupt");
  return animation;
},
    _quickTween,
    _createPlugin = function _createPlugin(config) {
  config = !config.name && config["default"] || config; //UMD packaging wraps things oddly, so for example MotionPathHelper becomes {MotionPathHelper:MotionPathHelper, default:MotionPathHelper}.

  var name = config.name,
      isFunc = _isFunction(config),
      Plugin = name && !isFunc && config.init ? function () {
    this._props = [];
  } : config,
      //in case someone passes in an object that's not a plugin, like CustomEase
  instanceDefaults = {
    init: _emptyFunc,
    render: _renderPropTweens,
    add: _addPropTween,
    kill: _killPropTweensOf,
    modifier: _addPluginModifier,
    rawVars: 0
  },
      statics = {
    targetTest: 0,
    get: 0,
    getSetter: _getSetter,
    aliases: {},
    register: 0
  };

  _wake();

  if (config !== Plugin) {
    if (_plugins[name]) {
      return;
    }

    _setDefaults(Plugin, _setDefaults(_copyExcluding(config, instanceDefaults), statics)); //static methods


    _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config, statics))); //instance methods


    _plugins[Plugin.prop = name] = Plugin;

    if (config.targetTest) {
      _harnessPlugins.push(Plugin);

      _reservedProps[name] = 1;
    }

    name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin"; //for the global name. "motionPath" should become MotionPathPlugin
  }

  _addGlobal(name, Plugin);

  config.register && config.register(gsap, Plugin, PropTween);
},

/*
 * --------------------------------------------------------------------------------------
 * COLORS
 * --------------------------------------------------------------------------------------
 */
_255 = 255,
    _colorLookup = {
  aqua: [0, _255, _255],
  lime: [0, _255, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, _255],
  navy: [0, 0, 128],
  white: [_255, _255, _255],
  olive: [128, 128, 0],
  yellow: [_255, _255, 0],
  orange: [_255, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [_255, 0, 0],
  pink: [_255, 192, 203],
  cyan: [0, _255, _255],
  transparent: [_255, _255, _255, 0]
},
    _hue = function _hue(h, m1, m2) {
  h = h < 0 ? h + 1 : h > 1 ? h - 1 : h;
  return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < .5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + .5 | 0;
},
    splitColor = function splitColor(v, toHSL, forceAlpha) {
  var a = !v ? _colorLookup.black : _isNumber(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0,
      r,
      g,
      b,
      h,
      s,
      l,
      max,
      min,
      d,
      wasHSL;

  if (!a) {
    if (v.substr(-1) === ",") {
      //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
      v = v.substr(0, v.length - 1);
    }

    if (_colorLookup[v]) {
      a = _colorLookup[v];
    } else if (v.charAt(0) === "#") {
      if (v.length < 6) {
        //for shorthand like #9F0 or #9F0F (could have alpha)
        r = v.charAt(1);
        g = v.charAt(2);
        b = v.charAt(3);
        v = "#" + r + r + g + g + b + b + (v.length === 5 ? v.charAt(4) + v.charAt(4) : "");
      }

      if (v.length === 9) {
        // hex with alpha, like #fd5e53ff
        a = parseInt(v.substr(1, 6), 16);
        return [a >> 16, a >> 8 & _255, a & _255, parseInt(v.substr(7), 16) / 255];
      }

      v = parseInt(v.substr(1), 16);
      a = [v >> 16, v >> 8 & _255, v & _255];
    } else if (v.substr(0, 3) === "hsl") {
      a = wasHSL = v.match(_strictNumExp);

      if (!toHSL) {
        h = +a[0] % 360 / 360;
        s = +a[1] / 100;
        l = +a[2] / 100;
        g = l <= .5 ? l * (s + 1) : l + s - l * s;
        r = l * 2 - g;
        a.length > 3 && (a[3] *= 1); //cast as number

        a[0] = _hue(h + 1 / 3, r, g);
        a[1] = _hue(h, r, g);
        a[2] = _hue(h - 1 / 3, r, g);
      } else if (~v.indexOf("=")) {
        //if relative values are found, just return the raw strings with the relative prefixes in place.
        a = v.match(_numExp);
        forceAlpha && a.length < 4 && (a[3] = 1);
        return a;
      }
    } else {
      a = v.match(_strictNumExp) || _colorLookup.transparent;
    }

    a = a.map(Number);
  }

  if (toHSL && !wasHSL) {
    r = a[0] / _255;
    g = a[1] / _255;
    b = a[2] / _255;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h *= 60;
    }

    a[0] = ~~(h + .5);
    a[1] = ~~(s * 100 + .5);
    a[2] = ~~(l * 100 + .5);
  }

  forceAlpha && a.length < 4 && (a[3] = 1);
  return a;
},
    _colorOrderData = function _colorOrderData(v) {
  // strips out the colors from the string, finds all the numeric slots (with units) and returns an array of those. The Array also has a "c" property which is an Array of the index values where the colors belong. This is to help work around issues where there's a mis-matched order of color/numeric data like drop-shadow(#f00 0px 1px 2px) and drop-shadow(0x 1px 2px #f00). This is basically a helper function used in _formatColors()
  var values = [],
      c = [],
      i = -1;
  v.split(_colorExp).forEach(function (v) {
    var a = v.match(_numWithUnitExp) || [];
    values.push.apply(values, a);
    c.push(i += a.length + 1);
  });
  values.c = c;
  return values;
},
    _formatColors = function _formatColors(s, toHSL, orderMatchData) {
  var result = "",
      colors = (s + result).match(_colorExp),
      type = toHSL ? "hsla(" : "rgba(",
      i = 0,
      c,
      shell,
      d,
      l;

  if (!colors) {
    return s;
  }

  colors = colors.map(function (color) {
    return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
  });

  if (orderMatchData) {
    d = _colorOrderData(s);
    c = orderMatchData.c;

    if (c.join(result) !== d.c.join(result)) {
      shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
      l = shell.length - 1;

      for (; i < l; i++) {
        result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
      }
    }
  }

  if (!shell) {
    shell = s.split(_colorExp);
    l = shell.length - 1;

    for (; i < l; i++) {
      result += shell[i] + colors[i];
    }
  }

  return result + shell[l];
},
    _colorExp = function () {
  var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
      //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.,
  p;

  for (p in _colorLookup) {
    s += "|" + p + "\\b";
  }

  return new RegExp(s + ")", "gi");
}(),
    _hslExp = /hsl[a]?\(/,
    _colorStringFilter = function _colorStringFilter(a) {
  var combined = a.join(" "),
      toHSL;
  _colorExp.lastIndex = 0;

  if (_colorExp.test(combined)) {
    toHSL = _hslExp.test(combined);
    a[1] = _formatColors(a[1], toHSL);
    a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1])); // make sure the order of numbers/colors match with the END value.

    return true;
  }
},

/*
 * --------------------------------------------------------------------------------------
 * TICKER
 * --------------------------------------------------------------------------------------
 */
_tickerActive,
    _ticker = function () {
  var _getTime = Date.now,
      _lagThreshold = 500,
      _adjustedLag = 33,
      _startTime = _getTime(),
      _lastUpdate = _startTime,
      _gap = 1000 / 240,
      _nextTime = _gap,
      _listeners = [],
      _id,
      _req,
      _raf,
      _self,
      _delta,
      _i,
      _tick = function _tick(v) {
    var elapsed = _getTime() - _lastUpdate,
        manual = v === true,
        overlap,
        dispatch,
        time,
        frame;

    elapsed > _lagThreshold && (_startTime += elapsed - _adjustedLag);
    _lastUpdate += elapsed;
    time = _lastUpdate - _startTime;
    overlap = time - _nextTime;

    if (overlap > 0 || manual) {
      frame = ++_self.frame;
      _delta = time - _self.time * 1000;
      _self.time = time = time / 1000;
      _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
      dispatch = 1;
    }

    manual || (_id = _req(_tick)); //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.

    if (dispatch) {
      for (_i = 0; _i < _listeners.length; _i++) {
        // use _i and check _listeners.length instead of a variable because a listener could get removed during the loop, and if that happens to an element less than the current index, it'd throw things off in the loop.
        _listeners[_i](time, _delta, frame, v);
      }
    }
  };

  _self = {
    time: 0,
    frame: 0,
    tick: function tick() {
      _tick(true);
    },
    deltaRatio: function deltaRatio(fps) {
      return _delta / (1000 / (fps || 60));
    },
    wake: function wake() {
      if (_coreReady) {
        if (!_coreInitted && _windowExists()) {
          _win = _coreInitted = window;
          _doc = _win.document || {};
          _globals.gsap = gsap;
          (_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);

          _install(_installScope || _win.GreenSockGlobals || !_win.gsap && _win || {});

          _raf = _win.requestAnimationFrame;
        }

        _id && _self.sleep();

        _req = _raf || function (f) {
          return setTimeout(f, _nextTime - _self.time * 1000 + 1 | 0);
        };

        _tickerActive = 1;

        _tick(2);
      }
    },
    sleep: function sleep() {
      (_raf ? _win.cancelAnimationFrame : clearTimeout)(_id);
      _tickerActive = 0;
      _req = _emptyFunc;
    },
    lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
      _lagThreshold = threshold || 1 / _tinyNum; //zero should be interpreted as basically unlimited

      _adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
    },
    fps: function fps(_fps) {
      _gap = 1000 / (_fps || 240);
      _nextTime = _self.time * 1000 + _gap;
    },
    add: function add(callback) {
      _listeners.indexOf(callback) < 0 && _listeners.push(callback);

      _wake();
    },
    remove: function remove(callback) {
      var i;
      ~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1) && _i >= i && _i--;
    },
    _listeners: _listeners
  };
  return _self;
}(),
    _wake = function _wake() {
  return !_tickerActive && _ticker.wake();
},
    //also ensures the core classes are initialized.

/*
* -------------------------------------------------
* EASING
* -------------------------------------------------
*/
_easeMap = {},
    _customEaseExp = /^[\d.\-M][\d.\-,\s]/,
    _quotesExp = /["']/g,
    _parseObjectInString = function _parseObjectInString(value) {
  //takes a string like "{wiggles:10, type:anticipate})" and turns it into a real object. Notice it ends in ")" and includes the {} wrappers. This is because we only use this function for parsing ease configs and prioritized optimization rather than reusability.
  var obj = {},
      split = value.substr(1, value.length - 3).split(":"),
      key = split[0],
      i = 1,
      l = split.length,
      index,
      val,
      parsedVal;

  for (; i < l; i++) {
    val = split[i];
    index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
    parsedVal = val.substr(0, index);
    obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
    key = val.substr(index + 1).trim();
  }

  return obj;
},
    _valueInParentheses = function _valueInParentheses(value) {
  var open = value.indexOf("(") + 1,
      close = value.indexOf(")"),
      nested = value.indexOf("(", open);
  return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
},
    _configEaseFromString = function _configEaseFromString(name) {
  //name can be a string like "elastic.out(1,0.5)", and pass in _easeMap as obj and it'll parse it out and call the actual function like _easeMap.Elastic.easeOut.config(1,0.5). It will also parse custom ease strings as long as CustomEase is loaded and registered (internally as _easeMap._CE).
  var split = (name + "").split("("),
      ease = _easeMap[split[0]];
  return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
},
    _invertEase = function _invertEase(ease) {
  return function (p) {
    return 1 - ease(1 - p);
  };
},
    // allow yoyoEase to be set in children and have those affected when the parent/ancestor timeline yoyos.
_propagateYoyoEase = function _propagateYoyoEase(timeline, isYoyo) {
  var child = timeline._first,
      ease;

  while (child) {
    if (child instanceof Timeline) {
      _propagateYoyoEase(child, isYoyo);
    } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
      if (child.timeline) {
        _propagateYoyoEase(child.timeline, isYoyo);
      } else {
        ease = child._ease;
        child._ease = child._yEase;
        child._yEase = ease;
        child._yoyo = isYoyo;
      }
    }

    child = child._next;
  }
},
    _parseEase = function _parseEase(ease, defaultEase) {
  return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
},
    _insertEase = function _insertEase(names, easeIn, easeOut, easeInOut) {
  if (easeOut === void 0) {
    easeOut = function easeOut(p) {
      return 1 - easeIn(1 - p);
    };
  }

  if (easeInOut === void 0) {
    easeInOut = function easeInOut(p) {
      return p < .5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
    };
  }

  var ease = {
    easeIn: easeIn,
    easeOut: easeOut,
    easeInOut: easeInOut
  },
      lowercaseName;

  _forEachName(names, function (name) {
    _easeMap[name] = _globals[name] = ease;
    _easeMap[lowercaseName = name.toLowerCase()] = easeOut;

    for (var p in ease) {
      _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
    }
  });

  return ease;
},
    _easeInOutFromOut = function _easeInOutFromOut(easeOut) {
  return function (p) {
    return p < .5 ? (1 - easeOut(1 - p * 2)) / 2 : .5 + easeOut((p - .5) * 2) / 2;
  };
},
    _configElastic = function _configElastic(type, amplitude, period) {
  var p1 = amplitude >= 1 ? amplitude : 1,
      //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
  p2 = (period || (type ? .3 : .45)) / (amplitude < 1 ? amplitude : 1),
      p3 = p2 / _2PI * (Math.asin(1 / p1) || 0),
      easeOut = function easeOut(p) {
    return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
  },
      ease = type === "out" ? easeOut : type === "in" ? function (p) {
    return 1 - easeOut(1 - p);
  } : _easeInOutFromOut(easeOut);

  p2 = _2PI / p2; //precalculate to optimize

  ease.config = function (amplitude, period) {
    return _configElastic(type, amplitude, period);
  };

  return ease;
},
    _configBack = function _configBack(type, overshoot) {
  if (overshoot === void 0) {
    overshoot = 1.70158;
  }

  var easeOut = function easeOut(p) {
    return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
  },
      ease = type === "out" ? easeOut : type === "in" ? function (p) {
    return 1 - easeOut(1 - p);
  } : _easeInOutFromOut(easeOut);

  ease.config = function (overshoot) {
    return _configBack(type, overshoot);
  };

  return ease;
}; // a cheaper (kb and cpu) but more mild way to get a parameterized weighted ease by feeding in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEase = ratio => {
// 	let y = 0.5 + ratio / 2;
// 	return p => (2 * (1 - p) * p * y + p * p);
// },
// a stronger (but more expensive kb/cpu) parameterized weighted ease that lets you feed in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEaseStrong = ratio => {
// 	ratio = .5 + ratio / 2;
// 	let o = 1 / 3 * (ratio < .5 ? ratio : 1 - ratio),
// 		b = ratio - o,
// 		c = ratio + o;
// 	return p => p === 1 ? p : 3 * b * (1 - p) * (1 - p) * p + 3 * c * (1 - p) * p * p + p * p * p;
// };


exports._ticker = _ticker;
exports._colorStringFilter = _colorStringFilter;
exports.splitColor = splitColor;
exports.interpolate = interpolate;
exports.mapRange = mapRange;
exports._replaceRandom = _replaceRandom;
exports.wrapYoyo = wrapYoyo;
exports.wrap = wrap;
exports.normalize = normalize;
exports.unitize = unitize;
exports.pipe = pipe;
exports.random = random;
exports.snap = snap;
exports._roundModifier = _roundModifier;
exports.distribute = distribute;
exports.shuffle = shuffle;
exports.toArray = toArray;
exports.clamp = clamp;
exports.getUnit = getUnit;
exports._removeLinkedListItem = _removeLinkedListItem;
exports._setDefaults = _setDefaults;
exports._round = _round;
exports._forEachName = _forEachName;
exports._getProperty = _getProperty;
exports._getCache = _getCache;
exports._plugins = _plugins;
exports._missingPlugin = _missingPlugin;
exports._relExp = _relExp;
exports._numWithUnitExp = _numWithUnitExp;
exports._numExp = _numExp;
exports._isUndefined = _isUndefined;
exports._isString = _isString;
exports._config = _config;

_forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function (name, i) {
  var power = i < 5 ? i + 1 : i;

  _insertEase(name + ",Power" + (power - 1), i ? function (p) {
    return Math.pow(p, power);
  } : function (p) {
    return p;
  }, function (p) {
    return 1 - Math.pow(1 - p, power);
  }, function (p) {
    return p < .5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
  });
});

_easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;

_insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());

(function (n, c) {
  var n1 = 1 / c,
      n2 = 2 * n1,
      n3 = 2.5 * n1,
      easeOut = function easeOut(p) {
    return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + .75 : p < n3 ? n * (p -= 2.25 / c) * p + .9375 : n * Math.pow(p - 2.625 / c, 2) + .984375;
  };

  _insertEase("Bounce", function (p) {
    return 1 - easeOut(1 - p);
  }, easeOut);
})(7.5625, 2.75);

_insertEase("Expo", function (p) {
  return p ? Math.pow(2, 10 * (p - 1)) : 0;
});

_insertEase("Circ", function (p) {
  return -(_sqrt(1 - p * p) - 1);
});

_insertEase("Sine", function (p) {
  return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
});

_insertEase("Back", _configBack("in"), _configBack("out"), _configBack());

_easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
  config: function config(steps, immediateStart) {
    if (steps === void 0) {
      steps = 1;
    }

    var p1 = 1 / steps,
        p2 = steps + (immediateStart ? 0 : 1),
        p3 = immediateStart ? 1 : 0,
        max = 1 - _tinyNum;
    return function (p) {
      return ((p2 * _clamp(0, max, p) | 0) + p3) * p1;
    };
  }
};
_defaults.ease = _easeMap["quad.out"];

_forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (name) {
  return _callbackNames += name + "," + name + "Params,";
});
/*
 * --------------------------------------------------------------------------------------
 * CACHE
 * --------------------------------------------------------------------------------------
 */


var GSCache = function GSCache(target, harness) {
  this.id = _gsID++;
  target._gsap = this;
  this.target = target;
  this.harness = harness;
  this.get = harness ? harness.get : _getProperty;
  this.set = harness ? harness.getSetter : _getSetter;
};
/*
 * --------------------------------------------------------------------------------------
 * ANIMATION
 * --------------------------------------------------------------------------------------
 */


exports.GSCache = GSCache;

var Animation = /*#__PURE__*/function () {
  function Animation(vars, time) {
    var parent = vars.parent || _globalTimeline;
    this.vars = vars;
    this._delay = +vars.delay || 0;

    if (this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0) {
      // TODO: repeat: Infinity on a timeline's children must flag that timeline internally and affect its totalDuration, otherwise it'll stop in the negative direction when reaching the start.
      this._rDelay = vars.repeatDelay || 0;
      this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
    }

    this._ts = 1;

    _setDuration(this, +vars.duration, 1, 1);

    this.data = vars.data;
    _tickerActive || _ticker.wake();
    parent && _addToTimeline(parent, this, time || time === 0 ? time : parent._time, 1);
    vars.reversed && this.reverse();
    vars.paused && this.paused(true);
  }

  var _proto = Animation.prototype;

  _proto.delay = function delay(value) {
    if (value || value === 0) {
      this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
      this._delay = value;
      return this;
    }

    return this._delay;
  };

  _proto.duration = function duration(value) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
  };

  _proto.totalDuration = function totalDuration(value) {
    if (!arguments.length) {
      return this._tDur;
    }

    this._dirty = 0;
    return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
  };

  _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
    _wake();

    if (!arguments.length) {
      return this._tTime;
    }

    var parent = this._dp;

    if (parent && parent.smoothChildTiming && this._ts) {
      _alignPlayhead(this, _totalTime);

      !parent._dp || parent.parent || _postAddChecks(parent, this); // edge case: if this is a child of a timeline that already completed, for example, we must re-activate the parent.
      //in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The start of that child would get pushed out, but one of the ancestors may have completed.

      while (parent.parent) {
        if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
          parent.totalTime(parent._tTime, true);
        }

        parent = parent.parent;
      }

      if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
        //if the animation doesn't have a parent, put it back into its last parent (recorded as _dp for exactly cases like this). Limit to parents with autoRemoveChildren (like globalTimeline) so that if the user manually removes an animation from a timeline and then alters its playhead, it doesn't get added back in.
        _addToTimeline(this._dp, this, this._start - this._delay);
      }
    }

    if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
      // check for _ptLookup on a Tween instance to ensure it has actually finished being instantiated, otherwise if this.reverse() gets called in the Animation constructor, it could trigger a render() here even though the _targets weren't populated, thus when _init() is called there won't be any PropTweens (it'll act like the tween is non-functional)
      this._ts || (this._pTime = _totalTime); // otherwise, if an animation is paused, then the playhead is moved back to zero, then resumed, it'd revert back to the original time at the pause
      //if (!this._lock) { // avoid endless recursion (not sure we need this yet or if it's worth the performance hit)
      //   this._lock = 1;

      _lazySafeRender(this, _totalTime, suppressEvents); //   this._lock = 0;
      //}

    }

    return this;
  };

  _proto.time = function time(value, suppressEvents) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % this._dur || (value ? this._dur : 0), suppressEvents) : this._time; // note: if the modulus results in 0, the playhead could be exactly at the end or the beginning, and we always defer to the END with a non-zero value, otherwise if you set the time() to the very end (duration()), it would render at the START!
  };

  _proto.totalProgress = function totalProgress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
  };

  _proto.progress = function progress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
  };

  _proto.iteration = function iteration(value, suppressEvents) {
    var cycleDuration = this.duration() + this._rDelay;

    return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
  } // potential future addition:
  // isPlayingBackwards() {
  // 	let animation = this,
  // 		orientation = 1; // 1 = forward, -1 = backward
  // 	while (animation) {
  // 		orientation *= animation.reversed() || (animation.repeat() && !(animation.iteration() & 1)) ? -1 : 1;
  // 		animation = animation.parent;
  // 	}
  // 	return orientation < 0;
  // }
  ;

  _proto.timeScale = function timeScale(value) {
    if (!arguments.length) {
      return this._rts === -_tinyNum ? 0 : this._rts; // recorded timeScale. Special case: if someone calls reverse() on an animation with timeScale of 0, we assign it -_tinyNum to remember it's reversed.
    }

    if (this._rts === value) {
      return this;
    }

    var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime; // make sure to do the parentToChildTotalTime() BEFORE setting the new _ts because the old one must be used in that calculation.
    // prioritize rendering where the parent's playhead lines up instead of this._tTime because there could be a tween that's animating another tween's timeScale in the same rendering loop (same parent), thus if the timeScale tween renders first, it would alter _start BEFORE _tTime was set on that tick (in the rendering loop), effectively freezing it until the timeScale tween finishes.

    this._rts = +value || 0;
    this._ts = this._ps || value === -_tinyNum ? 0 : this._rts; // _ts is the functional timeScale which would be 0 if the animation is paused.

    return _recacheAncestors(this.totalTime(_clamp(-this._delay, this._tDur, tTime), true));
  };

  _proto.paused = function paused(value) {
    if (!arguments.length) {
      return this._ps;
    }

    if (this._ps !== value) {
      this._ps = value;

      if (value) {
        this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()); // if the pause occurs during the delay phase, make sure that's factored in when resuming.

        this._ts = this._act = 0; // _ts is the functional timeScale, so a paused tween would effectively have a timeScale of 0. We record the "real" timeScale as _rts (recorded time scale)
      } else {
        _wake();

        this._ts = this._rts; //only defer to _pTime (pauseTime) if tTime is zero. Remember, someone could pause() an animation, then scrub the playhead and resume(). If the parent doesn't have smoothChildTiming, we render at the rawTime() because the startTime won't get updated.

        this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && (this._tTime -= _tinyNum) && Math.abs(this._zTime) !== _tinyNum); // edge case: animation.progress(1).pause().play() wouldn't render again because the playhead is already at the end, but the call to totalTime() below will add it back to its parent...and not remove it again (since removing only happens upon rendering at a new time). Offsetting the _tTime slightly is done simply to cause the final render in totalTime() that'll pop it off its timeline (if autoRemoveChildren is true, of course). Check to make sure _zTime isn't -_tinyNum to avoid an edge case where the playhead is pushed to the end but INSIDE a tween/callback, the timeline itself is paused thus halting rendering and leaving a few unrendered. When resuming, it wouldn't render those otherwise.
      }
    }

    return this;
  };

  _proto.startTime = function startTime(value) {
    if (arguments.length) {
      this._start = value;
      var parent = this.parent || this._dp;
      parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
      return this;
    }

    return this._start;
  };

  _proto.endTime = function endTime(includeRepeats) {
    return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts);
  };

  _proto.rawTime = function rawTime(wrapRepeats) {
    var parent = this.parent || this._dp; // _dp = detatched parent

    return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
  };

  _proto.globalTime = function globalTime(rawTime) {
    var animation = this,
        time = arguments.length ? rawTime : animation.rawTime();

    while (animation) {
      time = animation._start + time / (animation._ts || 1);
      animation = animation._dp;
    }

    return time;
  };

  _proto.repeat = function repeat(value) {
    if (arguments.length) {
      this._repeat = value === Infinity ? -2 : value;
      return _onUpdateTotalDuration(this);
    }

    return this._repeat === -2 ? Infinity : this._repeat;
  };

  _proto.repeatDelay = function repeatDelay(value) {
    if (arguments.length) {
      this._rDelay = value;
      return _onUpdateTotalDuration(this);
    }

    return this._rDelay;
  };

  _proto.yoyo = function yoyo(value) {
    if (arguments.length) {
      this._yoyo = value;
      return this;
    }

    return this._yoyo;
  };

  _proto.seek = function seek(position, suppressEvents) {
    return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
  };

  _proto.restart = function restart(includeDelay, suppressEvents) {
    return this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
  };

  _proto.play = function play(from, suppressEvents) {
    from != null && this.seek(from, suppressEvents);
    return this.reversed(false).paused(false);
  };

  _proto.reverse = function reverse(from, suppressEvents) {
    from != null && this.seek(from || this.totalDuration(), suppressEvents);
    return this.reversed(true).paused(false);
  };

  _proto.pause = function pause(atTime, suppressEvents) {
    atTime != null && this.seek(atTime, suppressEvents);
    return this.paused(true);
  };

  _proto.resume = function resume() {
    return this.paused(false);
  };

  _proto.reversed = function reversed(value) {
    if (arguments.length) {
      !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0)); // in case timeScale is zero, reversing would have no effect so we use _tinyNum.

      return this;
    }

    return this._rts < 0;
  };

  _proto.invalidate = function invalidate() {
    this._initted = this._act = 0;
    this._zTime = -_tinyNum;
    return this;
  };

  _proto.isActive = function isActive() {
    var parent = this.parent || this._dp,
        start = this._start,
        rawTime;
    return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
  };

  _proto.eventCallback = function eventCallback(type, callback, params) {
    var vars = this.vars;

    if (arguments.length > 1) {
      if (!callback) {
        delete vars[type];
      } else {
        vars[type] = callback;
        params && (vars[type + "Params"] = params);
        type === "onUpdate" && (this._onUpdate = callback);
      }

      return this;
    }

    return vars[type];
  };

  _proto.then = function then(onFulfilled) {
    var self = this;
    return new Promise(function (resolve) {
      var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough,
          _resolve = function _resolve() {
        var _then = self.then;
        self.then = null; // temporarily null the then() method to avoid an infinite loop (see https://github.com/greensock/GSAP/issues/322)

        _isFunction(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
        resolve(f);
        self.then = _then;
      };

      if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) {
        _resolve();
      } else {
        self._prom = _resolve;
      }
    });
  };

  _proto.kill = function kill() {
    _interrupt(this);
  };

  return Animation;
}();

exports.Animation = Animation;

_setDefaults(Animation.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: false,
  parent: null,
  _initted: false,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -_tinyNum,
  _prom: 0,
  _ps: false,
  _rts: 1
});
/*
 * -------------------------------------------------
 * TIMELINE
 * -------------------------------------------------
 */


var Timeline = /*#__PURE__*/function (_Animation) {
  _inheritsLoose(Timeline, _Animation);

  function Timeline(vars, time) {
    var _this;

    if (vars === void 0) {
      vars = {};
    }

    _this = _Animation.call(this, vars, time) || this;
    _this.labels = {};
    _this.smoothChildTiming = !!vars.smoothChildTiming;
    _this.autoRemoveChildren = !!vars.autoRemoveChildren;
    _this._sort = _isNotFalse(vars.sortChildren);
    _this.parent && _postAddChecks(_this.parent, _assertThisInitialized(_this));
    vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
    return _this;
  }

  var _proto2 = Timeline.prototype;

  _proto2.to = function to(targets, vars, position) {
    new Tween(targets, _parseVars(arguments, 0, this), _parsePosition(this, _isNumber(vars) ? arguments[3] : position));
    return this;
  };

  _proto2.from = function from(targets, vars, position) {
    new Tween(targets, _parseVars(arguments, 1, this), _parsePosition(this, _isNumber(vars) ? arguments[3] : position));
    return this;
  };

  _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
    new Tween(targets, _parseVars(arguments, 2, this), _parsePosition(this, _isNumber(fromVars) ? arguments[4] : position));
    return this;
  };

  _proto2.set = function set(targets, vars, position) {
    vars.duration = 0;
    vars.parent = this;
    _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
    vars.immediateRender = !!vars.immediateRender;
    new Tween(targets, vars, _parsePosition(this, position), 1);
    return this;
  };

  _proto2.call = function call(callback, params, position) {
    return _addToTimeline(this, Tween.delayedCall(0, callback, params), _parsePosition(this, position));
  } //ONLY for backward compatibility! Maybe delete?
  ;

  _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.duration = duration;
    vars.stagger = vars.stagger || stagger;
    vars.onComplete = onCompleteAll;
    vars.onCompleteParams = onCompleteAllParams;
    vars.parent = this;
    new Tween(targets, vars, _parsePosition(this, position));
    return this;
  };

  _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.runBackwards = 1;
    _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
    return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
  };

  _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
    toVars.startAt = fromVars;
    _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
    return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
  };

  _proto2.render = function render(totalTime, suppressEvents, force) {
    var prevTime = this._time,
        tDur = this._dirty ? this.totalDuration() : this._tDur,
        dur = this._dur,
        tTime = this !== _globalTimeline && totalTime > tDur - _tinyNum && totalTime >= 0 ? tDur : totalTime < _tinyNum ? 0 : totalTime,
        crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur),
        time,
        child,
        next,
        iteration,
        cycleDuration,
        prevPaused,
        pauseTween,
        timeScale,
        prevStart,
        prevIteration,
        yoyo,
        isYoyo;

    if (tTime !== this._tTime || force || crossingStart) {
      if (prevTime !== this._time && dur) {
        //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
        tTime += this._time - prevTime;
        totalTime += this._time - prevTime;
      }

      time = tTime;
      prevStart = this._start;
      timeScale = this._ts;
      prevPaused = !timeScale;

      if (crossingStart) {
        dur || (prevTime = this._zTime); //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

        (totalTime || !suppressEvents) && (this._zTime = totalTime);
      }

      if (this._repeat) {
        //adjust the time for repeats and yoyos
        yoyo = this._yoyo;
        cycleDuration = dur + this._rDelay;

        if (this._repeat < -1 && totalTime < 0) {
          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
        }

        time = _round(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

        if (tTime === tDur) {
          // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
          iteration = this._repeat;
          time = dur;
        } else {
          iteration = ~~(tTime / cycleDuration);

          if (iteration && iteration === tTime / cycleDuration) {
            time = dur;
            iteration--;
          }

          time > dur && (time = dur);
        }

        prevIteration = _animationCycle(this._tTime, cycleDuration);
        !prevTime && this._tTime && prevIteration !== iteration && (prevIteration = iteration); // edge case - if someone does addPause() at the very beginning of a repeating timeline, that pause is technically at the same spot as the end which causes this._time to get set to 0 when the totalTime would normally place the playhead at the end. See https://greensock.com/forums/topic/23823-closing-nav-animation-not-working-on-ie-and-iphone-6-maybe-other-older-browser/?tab=comments#comment-113005

        if (yoyo && iteration & 1) {
          time = dur - time;
          isYoyo = 1;
        }
        /*
        make sure children at the end/beginning of the timeline are rendered properly. If, for example,
        a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
        would get translated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
        could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
        we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
        ensure that zero-duration tweens at the very beginning or end of the Timeline work.
        */


        if (iteration !== prevIteration && !this._lock) {
          var rewinding = yoyo && prevIteration & 1,
              doesWrap = rewinding === (yoyo && iteration & 1);
          iteration < prevIteration && (rewinding = !rewinding);
          prevTime = rewinding ? 0 : dur;
          this._lock = 1;
          this.render(prevTime || (isYoyo ? 0 : _round(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
          !suppressEvents && this.parent && _callback(this, "onRepeat");
          this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);

          if (prevTime !== this._time || prevPaused !== !this._ts) {
            return this;
          }

          dur = this._dur; // in case the duration changed in the onRepeat

          tDur = this._tDur;

          if (doesWrap) {
            this._lock = 2;
            prevTime = rewinding ? dur : -0.0001;
            this.render(prevTime, true);
            this.vars.repeatRefresh && !isYoyo && this.invalidate();
          }

          this._lock = 0;

          if (!this._ts && !prevPaused) {
            return this;
          } //in order for yoyoEase to work properly when there's a stagger, we must swap out the ease in each sub-tween.


          _propagateYoyoEase(this, isYoyo);
        }
      }

      if (this._hasPause && !this._forcing && this._lock < 2) {
        pauseTween = _findNextPauseTween(this, _round(prevTime), _round(time));

        if (pauseTween) {
          tTime -= time - (time = pauseTween._start);
        }
      }

      this._tTime = tTime;
      this._time = time;
      this._act = !timeScale; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

      if (!this._initted) {
        this._onUpdate = this.vars.onUpdate;
        this._initted = 1;
        this._zTime = totalTime;
        prevTime = 0; // upon init, the playhead should always go forward; someone could invalidate() a completed timeline and then if they restart(), that would make child tweens render in reverse order which could lock in the wrong starting values if they build on each other, like tl.to(obj, {x: 100}).to(obj, {x: 0}).
      }

      !prevTime && (time || !dur && totalTime >= 0) && !suppressEvents && _callback(this, "onStart");

      if (time >= prevTime && totalTime >= 0) {
        child = this._first;

        while (child) {
          next = child._next;

          if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
              return this.render(totalTime, suppressEvents, force);
            }

            child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);

            if (time !== this._time || !this._ts && !prevPaused) {
              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
              pauseTween = 0;
              next && (tTime += this._zTime = -_tinyNum); // it didn't finish rendering, so flag zTime as negative so that so that the next time render() is called it'll be forced (to render any remaining children)

              break;
            }
          }

          child = next;
        }
      } else {
        child = this._last;
        var adjustedTime = totalTime < 0 ? totalTime : time; //when the playhead goes backward beyond the start of this timeline, we must pass that information down to the child animations so that zero-duration tweens know whether to render their starting or ending values.

        while (child) {
          next = child._prev;

          if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
              return this.render(totalTime, suppressEvents, force);
            }

            child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force);

            if (time !== this._time || !this._ts && !prevPaused) {
              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
              pauseTween = 0;
              next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum); // it didn't finish rendering, so adjust zTime so that so that the next time render() is called it'll be forced (to render any remaining children)

              break;
            }
          }

          child = next;
        }
      }

      if (pauseTween && !suppressEvents) {
        this.pause();
        pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;

        if (this._ts) {
          //the callback resumed playback! So since we may have held back the playhead due to where the pause is positioned, go ahead and jump to where it's SUPPOSED to be (if no pause happened).
          this._start = prevStart; //if the pause was at an earlier time and the user resumed in the callback, it could reposition the timeline (changing its startTime), throwing things off slightly, so we make sure the _start doesn't shift.

          _setEnd(this);

          return this.render(totalTime, suppressEvents, force);
        }
      }

      this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
      if (tTime === tDur && tDur >= this.totalDuration() || !tTime && prevTime) if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) if (!this._lock) {
        (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

        if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime)) {
          _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);

          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
        }
      }
    }

    return this;
  };

  _proto2.add = function add(child, position) {
    var _this2 = this;

    _isNumber(position) || (position = _parsePosition(this, position));

    if (!(child instanceof Animation)) {
      if (_isArray(child)) {
        child.forEach(function (obj) {
          return _this2.add(obj, position);
        });
        return this;
      }

      if (_isString(child)) {
        return this.addLabel(child, position);
      }

      if (_isFunction(child)) {
        child = Tween.delayedCall(0, child);
      } else {
        return this;
      }
    }

    return this !== child ? _addToTimeline(this, child, position) : this; //don't allow a timeline to be added to itself as a child!
  };

  _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
    if (nested === void 0) {
      nested = true;
    }

    if (tweens === void 0) {
      tweens = true;
    }

    if (timelines === void 0) {
      timelines = true;
    }

    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = -_bigNum;
    }

    var a = [],
        child = this._first;

    while (child) {
      if (child._start >= ignoreBeforeTime) {
        if (child instanceof Tween) {
          tweens && a.push(child);
        } else {
          timelines && a.push(child);
          nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
        }
      }

      child = child._next;
    }

    return a;
  };

  _proto2.getById = function getById(id) {
    var animations = this.getChildren(1, 1, 1),
        i = animations.length;

    while (i--) {
      if (animations[i].vars.id === id) {
        return animations[i];
      }
    }
  };

  _proto2.remove = function remove(child) {
    if (_isString(child)) {
      return this.removeLabel(child);
    }

    if (_isFunction(child)) {
      return this.killTweensOf(child);
    }

    _removeLinkedListItem(this, child);

    if (child === this._recent) {
      this._recent = this._last;
    }

    return _uncache(this);
  };

  _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
    if (!arguments.length) {
      return this._tTime;
    }

    this._forcing = 1;

    if (!this._dp && this._ts) {
      //special case for the global timeline (or any other that has no parent or detached parent).
      this._start = _round(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
    }

    _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);

    this._forcing = 0;
    return this;
  };

  _proto2.addLabel = function addLabel(label, position) {
    this.labels[label] = _parsePosition(this, position);
    return this;
  };

  _proto2.removeLabel = function removeLabel(label) {
    delete this.labels[label];
    return this;
  };

  _proto2.addPause = function addPause(position, callback, params) {
    var t = Tween.delayedCall(0, callback || _emptyFunc, params);
    t.data = "isPause";
    this._hasPause = 1;
    return _addToTimeline(this, t, _parsePosition(this, position));
  };

  _proto2.removePause = function removePause(position) {
    var child = this._first;
    position = _parsePosition(this, position);

    while (child) {
      if (child._start === position && child.data === "isPause") {
        _removeFromParent(child);
      }

      child = child._next;
    }
  };

  _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    var tweens = this.getTweensOf(targets, onlyActive),
        i = tweens.length;

    while (i--) {
      _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
    }

    return this;
  };

  _proto2.getTweensOf = function getTweensOf(targets, onlyActive) {
    var a = [],
        parsedTargets = toArray(targets),
        child = this._first,
        isGlobalTime = _isNumber(onlyActive),
        // a number is interpreted as a global time. If the animation spans
    children;

    while (child) {
      if (child instanceof Tween) {
        if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
          // note: if this is for overwriting, it should only be for tweens that aren't paused and are initted.
          a.push(child);
        }
      } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
        a.push.apply(a, children);
      }

      child = child._next;
    }

    return a;
  } // potential future feature - targets() on timelines
  // targets() {
  // 	let result = [];
  // 	this.getChildren(true, true, false).forEach(t => result.push(...t.targets()));
  // 	return result;
  // }
  ;

  _proto2.tweenTo = function tweenTo(position, vars) {
    vars = vars || {};

    var tl = this,
        endTime = _parsePosition(tl, position),
        _vars = vars,
        startAt = _vars.startAt,
        _onStart = _vars.onStart,
        onStartParams = _vars.onStartParams,
        immediateRender = _vars.immediateRender,
        tween = Tween.to(tl, _setDefaults({
      ease: "none",
      lazy: false,
      immediateRender: false,
      time: endTime,
      overwrite: "auto",
      duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
      onStart: function onStart() {
        tl.pause();
        var duration = vars.duration || Math.abs((endTime - tl._time) / tl.timeScale());
        tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
        _onStart && _onStart.apply(tween, onStartParams || []); //in case the user had an onStart in the vars - we don't want to overwrite it.
      }
    }, vars));

    return immediateRender ? tween.render(0) : tween;
  };

  _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
    return this.tweenTo(toPosition, _setDefaults({
      startAt: {
        time: _parsePosition(this, fromPosition)
      }
    }, vars));
  };

  _proto2.recent = function recent() {
    return this._recent;
  };

  _proto2.nextLabel = function nextLabel(afterTime) {
    if (afterTime === void 0) {
      afterTime = this._time;
    }

    return _getLabelInDirection(this, _parsePosition(this, afterTime));
  };

  _proto2.previousLabel = function previousLabel(beforeTime) {
    if (beforeTime === void 0) {
      beforeTime = this._time;
    }

    return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
  };

  _proto2.currentLabel = function currentLabel(value) {
    return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
  };

  _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = 0;
    }

    var child = this._first,
        labels = this.labels,
        p;

    while (child) {
      if (child._start >= ignoreBeforeTime) {
        child._start += amount;
        child._end += amount;
      }

      child = child._next;
    }

    if (adjustLabels) {
      for (p in labels) {
        if (labels[p] >= ignoreBeforeTime) {
          labels[p] += amount;
        }
      }
    }

    return _uncache(this);
  };

  _proto2.invalidate = function invalidate() {
    var child = this._first;
    this._lock = 0;

    while (child) {
      child.invalidate();
      child = child._next;
    }

    return _Animation.prototype.invalidate.call(this);
  };

  _proto2.clear = function clear(includeLabels) {
    if (includeLabels === void 0) {
      includeLabels = true;
    }

    var child = this._first,
        next;

    while (child) {
      next = child._next;
      this.remove(child);
      child = next;
    }

    this._dp && (this._time = this._tTime = this._pTime = 0);
    includeLabels && (this.labels = {});
    return _uncache(this);
  };

  _proto2.totalDuration = function totalDuration(value) {
    var max = 0,
        self = this,
        child = self._last,
        prevStart = _bigNum,
        prev,
        start,
        parent;

    if (arguments.length) {
      return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
    }

    if (self._dirty) {
      parent = self.parent;

      while (child) {
        prev = child._prev; //record it here in case the tween changes position in the sequence...

        child._dirty && child.totalDuration(); //could change the tween._startTime, so make sure the animation's cache is clean before analyzing it.

        start = child._start;

        if (start > prevStart && self._sort && child._ts && !self._lock) {
          //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
          self._lock = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add().

          _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
        } else {
          prevStart = start;
        }

        if (start < 0 && child._ts) {
          //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
          max -= start;

          if (!parent && !self._dp || parent && parent.smoothChildTiming) {
            self._start += start / self._ts;
            self._time -= start;
            self._tTime -= start;
          }

          self.shiftChildren(-start, false, -1e999);
          prevStart = 0;
        }

        child._end > max && child._ts && (max = child._end);
        child = prev;
      }

      _setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1, 1);

      self._dirty = 0;
    }

    return self._tDur;
  };

  Timeline.updateRoot = function updateRoot(time) {
    if (_globalTimeline._ts) {
      _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));

      _lastRenderedFrame = _ticker.frame;
    }

    if (_ticker.frame >= _nextGCFrame) {
      _nextGCFrame += _config.autoSleep || 120;
      var child = _globalTimeline._first;
      if (!child || !child._ts) if (_config.autoSleep && _ticker._listeners.length < 2) {
        while (child && !child._ts) {
          child = child._next;
        }

        child || _ticker.sleep();
      }
    }
  };

  return Timeline;
}(Animation);

exports.TimelineLite = exports.TimelineMax = exports.Timeline = Timeline;

_setDefaults(Timeline.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});

var _addComplexStringPropTween = function _addComplexStringPropTween(target, prop, start, end, setter, stringFilter, funcParam) {
  //note: we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
  var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter),
      index = 0,
      matchIndex = 0,
      result,
      startNums,
      color,
      endNum,
      chunk,
      startNum,
      hasRandom,
      a;
  pt.b = start;
  pt.e = end;
  start += ""; //ensure values are strings

  end += "";

  if (hasRandom = ~end.indexOf("random(")) {
    end = _replaceRandom(end);
  }

  if (stringFilter) {
    a = [start, end];
    stringFilter(a, target, prop); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.

    start = a[0];
    end = a[1];
  }

  startNums = start.match(_complexStringNumExp) || [];

  while (result = _complexStringNumExp.exec(end)) {
    endNum = result[0];
    chunk = end.substring(index, result.index);

    if (color) {
      color = (color + 1) % 5;
    } else if (chunk.substr(-5) === "rgba(") {
      color = 1;
    }

    if (endNum !== startNums[matchIndex++]) {
      startNum = parseFloat(startNums[matchIndex - 1]) || 0; //these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.

      pt._pt = {
        _next: pt._pt,
        p: chunk || matchIndex === 1 ? chunk : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: startNum,
        c: endNum.charAt(1) === "=" ? parseFloat(endNum.substr(2)) * (endNum.charAt(0) === "-" ? -1 : 1) : parseFloat(endNum) - startNum,
        m: color && color < 4 ? Math.round : 0
      };
      index = _complexStringNumExp.lastIndex;
    }
  }

  pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)

  pt.fp = funcParam;

  if (_relExp.test(end) || hasRandom) {
    pt.e = 0; //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
  }

  this._pt = pt; //start the linked list with this new PropTween. Remember, we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.

  return pt;
},
    _addPropTween = function _addPropTween(target, prop, start, end, index, targets, modifier, stringFilter, funcParam) {
  _isFunction(end) && (end = end(index || 0, target, targets));
  var currentValue = target[prop],
      parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](),
      setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc,
      pt;

  if (_isString(end)) {
    if (~end.indexOf("random(")) {
      end = _replaceRandom(end);
    }

    if (end.charAt(1) === "=") {
      end = parseFloat(parsedStart) + parseFloat(end.substr(2)) * (end.charAt(0) === "-" ? -1 : 1) + (getUnit(parsedStart) || 0);
    }
  }

  if (parsedStart !== end) {
    if (!isNaN(parsedStart * end)) {
      pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
      funcParam && (pt.fp = funcParam);
      modifier && pt.modifier(modifier, this, target);
      return this._pt = pt;
    }

    !currentValue && !(prop in target) && _missingPlugin(prop, end);
    return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
  }
},
    //creates a copy of the vars object and processes any function-based values (putting the resulting values directly into the copy) as well as strings with "random()" in them. It does NOT process relative values.
_processVars = function _processVars(vars, index, target, targets, tween) {
  _isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));

  if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
    return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
  }

  var copy = {},
      p;

  for (p in vars) {
    copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
  }

  return copy;
},
    _checkPlugin = function _checkPlugin(property, vars, tween, index, target, targets) {
  var plugin, pt, ptLookup, i;

  if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
    tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);

    if (tween !== _quickTween) {
      ptLookup = tween._ptLookup[tween._targets.indexOf(target)]; //note: we can't use tween._ptLookup[index] because for staggered tweens, the index from the fullTargets array won't match what it is in each individual tween that spawns from the stagger.

      i = plugin._props.length;

      while (i--) {
        ptLookup[plugin._props[i]] = pt;
      }
    }
  }

  return plugin;
},
    _overwritingTween,
    //store a reference temporarily so we can avoid overwriting itself.
_initTween = function _initTween(tween, time) {
  var vars = tween.vars,
      ease = vars.ease,
      startAt = vars.startAt,
      immediateRender = vars.immediateRender,
      lazy = vars.lazy,
      onUpdate = vars.onUpdate,
      onUpdateParams = vars.onUpdateParams,
      callbackScope = vars.callbackScope,
      runBackwards = vars.runBackwards,
      yoyoEase = vars.yoyoEase,
      keyframes = vars.keyframes,
      autoRevert = vars.autoRevert,
      dur = tween._dur,
      prevStartAt = tween._startAt,
      targets = tween._targets,
      parent = tween.parent,
      fullTargets = parent && parent.data === "nested" ? parent.parent._targets : targets,
      autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites,
      tl = tween.timeline,
      cleanVars,
      i,
      p,
      pt,
      target,
      hasPriority,
      gsData,
      harness,
      plugin,
      ptLookup,
      index,
      harnessVars,
      overwritten;
  tl && (!keyframes || !ease) && (ease = "none");
  tween._ease = _parseEase(ease, _defaults.ease);
  tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;

  if (yoyoEase && tween._yoyo && !tween._repeat) {
    //there must have been a parent timeline with yoyo:true that is currently in its yoyo phase, so flip the eases.
    yoyoEase = tween._yEase;
    tween._yEase = tween._ease;
    tween._ease = yoyoEase;
  }

  if (!tl) {
    //if there's an internal timeline, skip all the parsing because we passed that task down the chain.
    harness = targets[0] ? _getCache(targets[0]).harness : 0;
    harnessVars = harness && vars[harness.prop]; //someone may need to specify CSS-specific values AND non-CSS values, like if the element has an "x" property plus it's a standard DOM element. We allow people to distinguish by wrapping plugin-specific stuff in a css:{} object for example.

    cleanVars = _copyExcluding(vars, _reservedProps);
    prevStartAt && prevStartAt.render(-1, true).kill();

    if (startAt) {
      _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
        data: "isStart",
        overwrite: false,
        parent: parent,
        immediateRender: true,
        lazy: _isNotFalse(lazy),
        startAt: null,
        delay: 0,
        onUpdate: onUpdate,
        onUpdateParams: onUpdateParams,
        callbackScope: callbackScope,
        stagger: 0
      }, startAt))); //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, from, to).fromTo(e, to, from);


      if (immediateRender) {
        if (time > 0) {
          autoRevert || (tween._startAt = 0); //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in Timeline instances where immediateRender was false or when autoRevert is explicitly set to true.
        } else if (dur && !(time < 0 && prevStartAt)) {
          time && (tween._zTime = time);
          return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a Timeline, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
        }
      }
    } else if (runBackwards && dur) {
      //from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
      if (prevStartAt) {
        !autoRevert && (tween._startAt = 0);
      } else {
        time && (immediateRender = false); //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0

        p = _setDefaults({
          overwrite: false,
          data: "isFromStart",
          //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
          lazy: immediateRender && _isNotFalse(lazy),
          immediateRender: immediateRender,
          //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
          stagger: 0,
          parent: parent //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y:gsap.utils.wrap([-100,100])})

        }, cleanVars);
        harnessVars && (p[harness.prop] = harnessVars); // in case someone does something like .from(..., {css:{}})

        _removeFromParent(tween._startAt = Tween.set(targets, p));

        if (!immediateRender) {
          _initTween(tween._startAt, _tinyNum); //ensures that the initial values are recorded

        } else if (!time) {
          return;
        }
      }
    }

    tween._pt = 0;
    lazy = dur && _isNotFalse(lazy) || lazy && !dur;

    for (i = 0; i < targets.length; i++) {
      target = targets[i];
      gsData = target._gsap || _harness(targets)[i]._gsap;
      tween._ptLookup[i] = ptLookup = {};
      _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)

      index = fullTargets === targets ? i : fullTargets.indexOf(target);

      if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
        tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);

        plugin._props.forEach(function (name) {
          ptLookup[name] = pt;
        });

        plugin.priority && (hasPriority = 1);
      }

      if (!harness || harnessVars) {
        for (p in cleanVars) {
          if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
            plugin.priority && (hasPriority = 1);
          } else {
            ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
          }
        }
      }

      tween._op && tween._op[i] && tween.kill(target, tween._op[i]);

      if (autoOverwrite && tween._pt) {
        _overwritingTween = tween;

        _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(0)); //Also make sure the overwriting doesn't overwrite THIS tween!!!


        overwritten = !tween.parent;
        _overwritingTween = 0;
      }

      tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
    }

    hasPriority && _sortPropTweensByPriority(tween);
    tween._onInit && tween._onInit(tween); //plugins like RoundProps must wait until ALL of the PropTweens are instantiated. In the plugin's init() function, it sets the _onInit on the tween instance. May not be pretty/intuitive, but it's fast and keeps file size down.
  }

  tween._from = !tl && !!vars.runBackwards; //nested timelines should never run backwards - the backwards-ness is in the child tweens.

  tween._onUpdate = onUpdate;
  tween._initted = (!tween._op || tween._pt) && !overwritten; // if overwrittenProps resulted in the entire tween being killed, do NOT flag it as initted or else it may render for one tick.
},
    _addAliasesToVars = function _addAliasesToVars(targets, vars) {
  var harness = targets[0] ? _getCache(targets[0]).harness : 0,
      propertyAliases = harness && harness.aliases,
      copy,
      p,
      i,
      aliases;

  if (!propertyAliases) {
    return vars;
  }

  copy = _merge({}, vars);

  for (p in propertyAliases) {
    if (p in copy) {
      aliases = propertyAliases[p].split(",");
      i = aliases.length;

      while (i--) {
        copy[aliases[i]] = copy[p];
      }
    }
  }

  return copy;
},
    _parseFuncOrString = function _parseFuncOrString(value, tween, i, target, targets) {
  return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
},
    _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",
    _staggerPropsToSkip = (_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger").split(",");
/*
 * --------------------------------------------------------------------------------------
 * TWEEN
 * --------------------------------------------------------------------------------------
 */


exports._checkPlugin = _checkPlugin;

var Tween = /*#__PURE__*/function (_Animation2) {
  _inheritsLoose(Tween, _Animation2);

  function Tween(targets, vars, time, skipInherit) {
    var _this3;

    if (typeof vars === "number") {
      time.duration = vars;
      vars = time;
      time = null;
    }

    _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars), time) || this;
    var _this3$vars = _this3.vars,
        duration = _this3$vars.duration,
        delay = _this3$vars.delay,
        immediateRender = _this3$vars.immediateRender,
        stagger = _this3$vars.stagger,
        overwrite = _this3$vars.overwrite,
        keyframes = _this3$vars.keyframes,
        defaults = _this3$vars.defaults,
        scrollTrigger = _this3$vars.scrollTrigger,
        yoyoEase = _this3$vars.yoyoEase,
        parent = _this3.parent,
        parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [targets] : toArray(targets),
        tl,
        i,
        copy,
        l,
        p,
        curTarget,
        staggerFunc,
        staggerVarsToMerge;
    _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://greensock.com", !_config.nullTargetWarn) || [];
    _this3._ptLookup = []; //PropTween lookup. An array containing an object for each target, having keys for each tweening property

    _this3._overwrite = overwrite;

    if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
      vars = _this3.vars;
      tl = _this3.timeline = new Timeline({
        data: "nested",
        defaults: defaults || {}
      });
      tl.kill();
      tl.parent = tl._dp = _assertThisInitialized(_this3);
      tl._start = 0;

      if (keyframes) {
        _setDefaults(tl.vars.defaults, {
          ease: "none"
        });

        keyframes.forEach(function (frame) {
          return tl.to(parsedTargets, frame, ">");
        });
      } else {
        l = parsedTargets.length;
        staggerFunc = stagger ? distribute(stagger) : _emptyFunc;

        if (_isObject(stagger)) {
          //users can pass in callbacks like onStart/onComplete in the stagger object. These should fire with each individual tween.
          for (p in stagger) {
            if (~_staggerTweenProps.indexOf(p)) {
              staggerVarsToMerge || (staggerVarsToMerge = {});
              staggerVarsToMerge[p] = stagger[p];
            }
          }
        }

        for (i = 0; i < l; i++) {
          copy = {};

          for (p in vars) {
            if (_staggerPropsToSkip.indexOf(p) < 0) {
              copy[p] = vars[p];
            }
          }

          copy.stagger = 0;
          yoyoEase && (copy.yoyoEase = yoyoEase);
          staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
          curTarget = parsedTargets[i]; //don't just copy duration or delay because if they're a string or function, we'd end up in an infinite loop because _isFuncOrString() would evaluate as true in the child tweens, entering this loop, etc. So we parse the value straight from vars and default to 0.

          copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
          copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;

          if (!stagger && l === 1 && copy.delay) {
            // if someone does delay:"random(1, 5)", repeat:-1, for example, the delay shouldn't be inside the repeat.
            _this3._delay = delay = copy.delay;
            _this3._start += delay;
            copy.delay = 0;
          }

          tl.to(curTarget, copy, staggerFunc(i, curTarget, parsedTargets));
        }

        tl.duration() ? duration = delay = 0 : _this3.timeline = 0; // if the timeline's duration is 0, we don't need a timeline internally!
      }

      duration || _this3.duration(duration = tl.duration());
    } else {
      _this3.timeline = 0; //speed optimization, faster lookups (no going up the prototype chain)
    }

    if (overwrite === true && !_suppressOverwrites) {
      _overwritingTween = _assertThisInitialized(_this3);

      _globalTimeline.killTweensOf(parsedTargets);

      _overwritingTween = 0;
    }

    parent && _postAddChecks(parent, _assertThisInitialized(_this3));

    if (immediateRender || !duration && !keyframes && _this3._start === _round(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
      _this3._tTime = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)

      _this3.render(Math.max(0, -delay)); //in case delay is negative

    }

    scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
    return _this3;
  }

  var _proto3 = Tween.prototype;

  _proto3.render = function render(totalTime, suppressEvents, force) {
    var prevTime = this._time,
        tDur = this._tDur,
        dur = this._dur,
        tTime = totalTime > tDur - _tinyNum && totalTime >= 0 ? tDur : totalTime < _tinyNum ? 0 : totalTime,
        time,
        pt,
        iteration,
        cycleDuration,
        prevIteration,
        isYoyo,
        ratio,
        timeline,
        yoyoEase;

    if (!dur) {
      _renderZeroDurationTween(this, totalTime, suppressEvents, force);
    } else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== totalTime < 0) {
      //this senses if we're crossing over the start time, in which case we must record _zTime and force the render, but we do it in this lengthy conditional way for performance reasons (usually we can skip the calculations): this._initted && (this._zTime < 0) !== (totalTime < 0)
      time = tTime;
      timeline = this.timeline;

      if (this._repeat) {
        //adjust the time for repeats and yoyos
        cycleDuration = dur + this._rDelay;

        if (this._repeat < -1 && totalTime < 0) {
          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
        }

        time = _round(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

        if (tTime === tDur) {
          // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
          iteration = this._repeat;
          time = dur;
        } else {
          iteration = ~~(tTime / cycleDuration);

          if (iteration && iteration === tTime / cycleDuration) {
            time = dur;
            iteration--;
          }

          time > dur && (time = dur);
        }

        isYoyo = this._yoyo && iteration & 1;

        if (isYoyo) {
          yoyoEase = this._yEase;
          time = dur - time;
        }

        prevIteration = _animationCycle(this._tTime, cycleDuration);

        if (time === prevTime && !force && this._initted) {
          //could be during the repeatDelay part. No need to render and fire callbacks.
          return this;
        }

        if (iteration !== prevIteration) {
          timeline && this._yEase && _propagateYoyoEase(timeline, isYoyo); //repeatRefresh functionality

          if (this.vars.repeatRefresh && !isYoyo && !this._lock) {
            this._lock = force = 1; //force, otherwise if lazy is true, the _attemptInitTween() will return and we'll jump out and get caught bouncing on each tick.

            this.render(_round(cycleDuration * iteration), true).invalidate()._lock = 0;
          }
        }
      }

      if (!this._initted) {
        if (_attemptInitTween(this, totalTime < 0 ? totalTime : time, force, suppressEvents)) {
          this._tTime = 0; // in constructor if immediateRender is true, we set _tTime to -_tinyNum to have the playhead cross the starting point but we can't leave _tTime as a negative number.

          return this;
        }

        if (dur !== this._dur) {
          // while initting, a plugin like InertiaPlugin might alter the duration, so rerun from the start to ensure everything renders as it should.
          return this.render(totalTime, suppressEvents, force);
        }
      }

      this._tTime = tTime;
      this._time = time;

      if (!this._act && this._ts) {
        this._act = 1; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

        this._lazy = 0;
      }

      this.ratio = ratio = (yoyoEase || this._ease)(time / dur);

      if (this._from) {
        this.ratio = ratio = 1 - ratio;
      }

      time && !prevTime && !suppressEvents && _callback(this, "onStart");
      pt = this._pt;

      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }

      timeline && timeline.render(totalTime < 0 ? totalTime : !time && isYoyo ? -_tinyNum : timeline._dur * ratio, suppressEvents, force) || this._startAt && (this._zTime = totalTime);

      if (this._onUpdate && !suppressEvents) {
        totalTime < 0 && this._startAt && this._startAt.render(totalTime, true, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.

        _callback(this, "onUpdate");
      }

      this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");

      if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
        totalTime < 0 && this._startAt && !this._onUpdate && this._startAt.render(totalTime, true, true);
        (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if we're rendering at exactly a time of 0, as there could be autoRevert values that should get set on the next tick (if the playhead goes backward beyond the startTime, negative totalTime). Don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

        if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime)) {
          // if prevTime and tTime are zero, we shouldn't fire the onReverseComplete. This could happen if you gsap.to(... {paused:true}).play();
          _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);

          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
        }
      }
    }

    return this;
  };

  _proto3.targets = function targets() {
    return this._targets;
  };

  _proto3.invalidate = function invalidate() {
    this._pt = this._op = this._startAt = this._onUpdate = this._lazy = this.ratio = 0;
    this._ptLookup = [];
    this.timeline && this.timeline.invalidate();
    return _Animation2.prototype.invalidate.call(this);
  };

  _proto3.kill = function kill(targets, vars) {
    if (vars === void 0) {
      vars = "all";
    }

    if (!targets && (!vars || vars === "all")) {
      this._lazy = this._pt = 0;
      return this.parent ? _interrupt(this) : this;
    }

    if (this.timeline) {
      var tDur = this.timeline.totalDuration();
      this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this); // if nothing is left tweening, interrupt.

      this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1); // if a nested tween is killed that changes the duration, it should affect this tween's duration. We must use the ratio, though, because sometimes the internal timeline is stretched like for keyframes where they don't all add up to whatever the parent tween's duration was set to.

      return this;
    }

    var parsedTargets = this._targets,
        killingTargets = targets ? toArray(targets) : parsedTargets,
        propTweenLookup = this._ptLookup,
        firstPT = this._pt,
        overwrittenProps,
        curLookup,
        curOverwriteProps,
        props,
        p,
        pt,
        i;

    if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
      vars === "all" && (this._pt = 0);
      return _interrupt(this);
    }

    overwrittenProps = this._op = this._op || [];

    if (vars !== "all") {
      //so people can pass in a comma-delimited list of property names
      if (_isString(vars)) {
        p = {};

        _forEachName(vars, function (name) {
          return p[name] = 1;
        });

        vars = p;
      }

      vars = _addAliasesToVars(parsedTargets, vars);
    }

    i = parsedTargets.length;

    while (i--) {
      if (~killingTargets.indexOf(parsedTargets[i])) {
        curLookup = propTweenLookup[i];

        if (vars === "all") {
          overwrittenProps[i] = vars;
          props = curLookup;
          curOverwriteProps = {};
        } else {
          curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
          props = vars;
        }

        for (p in props) {
          pt = curLookup && curLookup[p];

          if (pt) {
            if (!("kill" in pt.d) || pt.d.kill(p) === true) {
              _removeLinkedListItem(this, pt, "_pt");
            }

            delete curLookup[p];
          }

          if (curOverwriteProps !== "all") {
            curOverwriteProps[p] = 1;
          }
        }
      }
    }

    this._initted && !this._pt && firstPT && _interrupt(this); //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.

    return this;
  };

  Tween.to = function to(targets, vars) {
    return new Tween(targets, vars, arguments[2]);
  };

  Tween.from = function from(targets, vars) {
    return new Tween(targets, _parseVars(arguments, 1));
  };

  Tween.delayedCall = function delayedCall(delay, callback, params, scope) {
    return new Tween(callback, 0, {
      immediateRender: false,
      lazy: false,
      overwrite: false,
      delay: delay,
      onComplete: callback,
      onReverseComplete: callback,
      onCompleteParams: params,
      onReverseCompleteParams: params,
      callbackScope: scope
    });
  };

  Tween.fromTo = function fromTo(targets, fromVars, toVars) {
    return new Tween(targets, _parseVars(arguments, 2));
  };

  Tween.set = function set(targets, vars) {
    vars.duration = 0;
    vars.repeatDelay || (vars.repeat = 0);
    return new Tween(targets, vars);
  };

  Tween.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    return _globalTimeline.killTweensOf(targets, props, onlyActive);
  };

  return Tween;
}(Animation);

exports.TweenLite = exports.TweenMax = exports.Tween = Tween;

_setDefaults(Tween.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
}); //add the pertinent timeline methods to Tween instances so that users can chain conveniently and create a timeline automatically. (removed due to concerns that it'd ultimately add to more confusion especially for beginners)
// _forEachName("to,from,fromTo,set,call,add,addLabel,addPause", name => {
// 	Tween.prototype[name] = function() {
// 		let tl = new Timeline();
// 		return _addToTimeline(tl, this)[name].apply(tl, toArray(arguments));
// 	}
// });
//for backward compatibility. Leverage the timeline calls.


_forEachName("staggerTo,staggerFrom,staggerFromTo", function (name) {
  Tween[name] = function () {
    var tl = new Timeline(),
        params = _slice.call(arguments, 0);

    params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
    return tl[name].apply(tl, params);
  };
});
/*
 * --------------------------------------------------------------------------------------
 * PROPTWEEN
 * --------------------------------------------------------------------------------------
 */


var _setterPlain = function _setterPlain(target, property, value) {
  return target[property] = value;
},
    _setterFunc = function _setterFunc(target, property, value) {
  return target[property](value);
},
    _setterFuncWithParam = function _setterFuncWithParam(target, property, value, data) {
  return target[property](data.fp, value);
},
    _setterAttribute = function _setterAttribute(target, property, value) {
  return target.setAttribute(property, value);
},
    _getSetter = function _getSetter(target, property) {
  return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
},
    _renderPlain = function _renderPlain(ratio, data) {
  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000, data);
},
    _renderBoolean = function _renderBoolean(ratio, data) {
  return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
},
    _renderComplexString = function _renderComplexString(ratio, data) {
  var pt = data._pt,
      s = "";

  if (!ratio && data.b) {
    //b = beginning string
    s = data.b;
  } else if (ratio === 1 && data.e) {
    //e = ending string
    s = data.e;
  } else {
    while (pt) {
      s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 10000) / 10000) + s; //we use the "p" property for the text inbetween (like a suffix). And in the context of a complex string, the modifier (m) is typically just Math.round(), like for RGB colors.

      pt = pt._next;
    }

    s += data.c; //we use the "c" of the PropTween to store the final chunk of non-numeric text.
  }

  data.set(data.t, data.p, s, data);
},
    _renderPropTweens = function _renderPropTweens(ratio, data) {
  var pt = data._pt;

  while (pt) {
    pt.r(ratio, pt.d);
    pt = pt._next;
  }
},
    _addPluginModifier = function _addPluginModifier(modifier, tween, target, property) {
  var pt = this._pt,
      next;

  while (pt) {
    next = pt._next;
    pt.p === property && pt.modifier(modifier, tween, target);
    pt = next;
  }
},
    _killPropTweensOf = function _killPropTweensOf(property) {
  var pt = this._pt,
      hasNonDependentRemaining,
      next;

  while (pt) {
    next = pt._next;

    if (pt.p === property && !pt.op || pt.op === property) {
      _removeLinkedListItem(this, pt, "_pt");
    } else if (!pt.dep) {
      hasNonDependentRemaining = 1;
    }

    pt = next;
  }

  return !hasNonDependentRemaining;
},
    _setterWithModifier = function _setterWithModifier(target, property, value, data) {
  data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
},
    _sortPropTweensByPriority = function _sortPropTweensByPriority(parent) {
  var pt = parent._pt,
      next,
      pt2,
      first,
      last; //sorts the PropTween linked list in order of priority because some plugins need to do their work after ALL of the PropTweens were created (like RoundPropsPlugin and ModifiersPlugin)

  while (pt) {
    next = pt._next;
    pt2 = first;

    while (pt2 && pt2.pr > pt.pr) {
      pt2 = pt2._next;
    }

    if (pt._prev = pt2 ? pt2._prev : last) {
      pt._prev._next = pt;
    } else {
      first = pt;
    }

    if (pt._next = pt2) {
      pt2._prev = pt;
    } else {
      last = pt;
    }

    pt = next;
  }

  parent._pt = first;
}; //PropTween key: t = target, p = prop, r = renderer, d = data, s = start, c = change, op = overwriteProperty (ONLY populated when it's different than p), pr = priority, _next/_prev for the linked list siblings, set = setter, m = modifier, mSet = modifierSetter (the original setter, before a modifier was added)


exports._sortPropTweensByPriority = _sortPropTweensByPriority;
exports._renderComplexString = _renderComplexString;
exports._getSetter = _getSetter;

var PropTween = /*#__PURE__*/function () {
  function PropTween(next, target, prop, start, change, renderer, data, setter, priority) {
    this.t = target;
    this.s = start;
    this.c = change;
    this.p = prop;
    this.r = renderer || _renderPlain;
    this.d = data || this;
    this.set = setter || _setterPlain;
    this.pr = priority || 0;
    this._next = next;

    if (next) {
      next._prev = this;
    }
  }

  var _proto4 = PropTween.prototype;

  _proto4.modifier = function modifier(func, tween, target) {
    this.mSet = this.mSet || this.set; //in case it was already set (a PropTween can only have one modifier)

    this.set = _setterWithModifier;
    this.m = func;
    this.mt = target; //modifier target

    this.tween = tween;
  };

  return PropTween;
}(); //Initialization tasks


exports.PropTween = PropTween;

_forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function (name) {
  return _reservedProps[name] = 1;
});

_globals.TweenMax = _globals.TweenLite = Tween;
_globals.TimelineLite = _globals.TimelineMax = Timeline;
_globalTimeline = new Timeline({
  sortChildren: false,
  defaults: _defaults,
  autoRemoveChildren: true,
  id: "root",
  smoothChildTiming: true
});
_config.stringFilter = _colorStringFilter;
/*
 * --------------------------------------------------------------------------------------
 * GSAP
 * --------------------------------------------------------------------------------------
 */

var _gsap = {
  registerPlugin: function registerPlugin() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    args.forEach(function (config) {
      return _createPlugin(config);
    });
  },
  timeline: function timeline(vars) {
    return new Timeline(vars);
  },
  getTweensOf: function getTweensOf(targets, onlyActive) {
    return _globalTimeline.getTweensOf(targets, onlyActive);
  },
  getProperty: function getProperty(target, property, unit, uncache) {
    _isString(target) && (target = toArray(target)[0]); //in case selector text or an array is passed in

    var getter = _getCache(target || {}).get,
        format = unit ? _passThrough : _numericIfPossible;

    unit === "native" && (unit = "");
    return !target ? target : !property ? function (property, unit, uncache) {
      return format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
    } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
  },
  quickSetter: function quickSetter(target, property, unit) {
    target = toArray(target);

    if (target.length > 1) {
      var setters = target.map(function (t) {
        return gsap.quickSetter(t, property, unit);
      }),
          l = setters.length;
      return function (value) {
        var i = l;

        while (i--) {
          setters[i](value);
        }
      };
    }

    target = target[0] || {};

    var Plugin = _plugins[property],
        cache = _getCache(target),
        p = cache.harness && (cache.harness.aliases || {})[property] || property,
        // in case it's an alias, like "rotate" for "rotation".
    setter = Plugin ? function (value) {
      var p = new Plugin();
      _quickTween._pt = 0;
      p.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
      p.render(1, p);
      _quickTween._pt && _renderPropTweens(1, _quickTween);
    } : cache.set(target, p);

    return Plugin ? setter : function (value) {
      return setter(target, p, unit ? value + unit : value, cache, 1);
    };
  },
  isTweening: function isTweening(targets) {
    return _globalTimeline.getTweensOf(targets, true).length > 0;
  },
  defaults: function defaults(value) {
    value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
    return _mergeDeep(_defaults, value || {});
  },
  config: function config(value) {
    return _mergeDeep(_config, value || {});
  },
  registerEffect: function registerEffect(_ref2) {
    var name = _ref2.name,
        effect = _ref2.effect,
        plugins = _ref2.plugins,
        defaults = _ref2.defaults,
        extendTimeline = _ref2.extendTimeline;
    (plugins || "").split(",").forEach(function (pluginName) {
      return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
    });

    _effects[name] = function (targets, vars, tl) {
      return effect(toArray(targets), _setDefaults(vars || {}, defaults), tl);
    };

    if (extendTimeline) {
      Timeline.prototype[name] = function (targets, vars, position) {
        return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
      };
    }
  },
  registerEase: function registerEase(name, ease) {
    _easeMap[name] = _parseEase(ease);
  },
  parseEase: function parseEase(ease, defaultEase) {
    return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
  },
  getById: function getById(id) {
    return _globalTimeline.getById(id);
  },
  exportRoot: function exportRoot(vars, includeDelayedCalls) {
    if (vars === void 0) {
      vars = {};
    }

    var tl = new Timeline(vars),
        child,
        next;
    tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);

    _globalTimeline.remove(tl);

    tl._dp = 0; //otherwise it'll get re-activated when adding children and be re-introduced into _globalTimeline's linked list (then added to itself).

    tl._time = tl._tTime = _globalTimeline._time;
    child = _globalTimeline._first;

    while (child) {
      next = child._next;

      if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
        _addToTimeline(tl, child, child._start - child._delay);
      }

      child = next;
    }

    _addToTimeline(_globalTimeline, tl, 0);

    return tl;
  },
  utils: {
    wrap: wrap,
    wrapYoyo: wrapYoyo,
    distribute: distribute,
    random: random,
    snap: snap,
    normalize: normalize,
    getUnit: getUnit,
    clamp: clamp,
    splitColor: splitColor,
    toArray: toArray,
    mapRange: mapRange,
    pipe: pipe,
    unitize: unitize,
    interpolate: interpolate,
    shuffle: shuffle
  },
  install: _install,
  effects: _effects,
  ticker: _ticker,
  updateRoot: Timeline.updateRoot,
  plugins: _plugins,
  globalTimeline: _globalTimeline,
  core: {
    PropTween: PropTween,
    globals: _addGlobal,
    Tween: Tween,
    Timeline: Timeline,
    Animation: Animation,
    getCache: _getCache,
    _removeLinkedListItem: _removeLinkedListItem,
    suppressOverwrites: function suppressOverwrites(value) {
      return _suppressOverwrites = value;
    }
  }
};

_forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function (name) {
  return _gsap[name] = Tween[name];
});

_ticker.add(Timeline.updateRoot);

_quickTween = _gsap.to({}, {
  duration: 0
}); // ---- EXTRA PLUGINS --------------------------------------------------------

var _getPluginPropTween = function _getPluginPropTween(plugin, prop) {
  var pt = plugin._pt;

  while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
    pt = pt._next;
  }

  return pt;
},
    _addModifiers = function _addModifiers(tween, modifiers) {
  var targets = tween._targets,
      p,
      i,
      pt;

  for (p in modifiers) {
    i = targets.length;

    while (i--) {
      pt = tween._ptLookup[i][p];

      if (pt && (pt = pt.d)) {
        if (pt._pt) {
          // is a plugin
          pt = _getPluginPropTween(pt, p);
        }

        pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
      }
    }
  }
},
    _buildModifierPlugin = function _buildModifierPlugin(name, modifier) {
  return {
    name: name,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function init(target, vars, tween) {
      tween._onInit = function (tween) {
        var temp, p;

        if (_isString(vars)) {
          temp = {};

          _forEachName(vars, function (name) {
            return temp[name] = 1;
          }); //if the user passes in a comma-delimited list of property names to roundProps, like "x,y", we round to whole numbers.


          vars = temp;
        }

        if (modifier) {
          temp = {};

          for (p in vars) {
            temp[p] = modifier(vars[p]);
          }

          vars = temp;
        }

        _addModifiers(tween, vars);
      };
    }
  };
}; //register core plugins


var gsap = _gsap.registerPlugin({
  name: "attr",
  init: function init(target, vars, tween, index, targets) {
    var p, pt;

    for (p in vars) {
      pt = this.add(target, "setAttribute", (target.getAttribute(p) || 0) + "", vars[p], index, targets, 0, 0, p);
      pt && (pt.op = p);

      this._props.push(p);
    }
  }
}, {
  name: "endArray",
  init: function init(target, value) {
    var i = value.length;

    while (i--) {
      this.add(target, i, target[i] || 0, value[i]);
    }
  }
}, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap; //to prevent the core plugins from being dropped via aggressive tree shaking, we must include them in the variable declaration in this way.


exports.default = exports.gsap = gsap;
Tween.version = Timeline.version = gsap.version = "3.6.0";
_coreReady = 1;

if (_windowExists()) {
  _wake();
}

var Power0 = _easeMap.Power0,
    Power1 = _easeMap.Power1,
    Power2 = _easeMap.Power2,
    Power3 = _easeMap.Power3,
    Power4 = _easeMap.Power4,
    Linear = _easeMap.Linear,
    Quad = _easeMap.Quad,
    Cubic = _easeMap.Cubic,
    Quart = _easeMap.Quart,
    Quint = _easeMap.Quint,
    Strong = _easeMap.Strong,
    Elastic = _easeMap.Elastic,
    Back = _easeMap.Back,
    SteppedEase = _easeMap.SteppedEase,
    Bounce = _easeMap.Bounce,
    Sine = _easeMap.Sine,
    Expo = _easeMap.Expo,
    Circ = _easeMap.Circ;
exports.Circ = Circ;
exports.Expo = Expo;
exports.Sine = Sine;
exports.Bounce = Bounce;
exports.SteppedEase = SteppedEase;
exports.Back = Back;
exports.Elastic = Elastic;
exports.Strong = Strong;
exports.Quint = Quint;
exports.Quart = Quart;
exports.Cubic = Cubic;
exports.Quad = Quad;
exports.Linear = Linear;
exports.Power4 = Power4;
exports.Power3 = Power3;
exports.Power2 = Power2;
exports.Power1 = Power1;
exports.Power0 = Power0;
},{}],"../node_modules/gsap/CSSPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkPrefix = exports._createElement = exports._getBBox = exports.default = exports.CSSPlugin = void 0;

var _gsapCore = require("./gsap-core.js");

/*!
 * CSSPlugin 3.6.0
 * https://greensock.com
 *
 * Copyright 2008-2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var _win,
    _doc,
    _docElement,
    _pluginInitted,
    _tempDiv,
    _tempDivStyler,
    _recentSetterPlugin,
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _transformProps = {},
    _RAD2DEG = 180 / Math.PI,
    _DEG2RAD = Math.PI / 180,
    _atan2 = Math.atan2,
    _bigNum = 1e8,
    _capsExp = /([A-Z])/g,
    _horizontalExp = /(?:left|right|width|margin|padding|x)/i,
    _complexExp = /[\s,\(]\S/,
    _propertyAliases = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
},
    _renderCSSProp = function _renderCSSProp(ratio, data) {
  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
},
    _renderPropWithEnd = function _renderPropWithEnd(ratio, data) {
  return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
},
    _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning(ratio, data) {
  return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u : data.b, data);
},
    //if units change, we need a way to render the original unit/value when the tween goes all the way back to the beginning (ratio:0)
_renderRoundedCSSProp = function _renderRoundedCSSProp(ratio, data) {
  var value = data.s + data.c * ratio;
  data.set(data.t, data.p, ~~(value + (value < 0 ? -.5 : .5)) + data.u, data);
},
    _renderNonTweeningValue = function _renderNonTweeningValue(ratio, data) {
  return data.set(data.t, data.p, ratio ? data.e : data.b, data);
},
    _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd(ratio, data) {
  return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
},
    _setterCSSStyle = function _setterCSSStyle(target, property, value) {
  return target.style[property] = value;
},
    _setterCSSProp = function _setterCSSProp(target, property, value) {
  return target.style.setProperty(property, value);
},
    _setterTransform = function _setterTransform(target, property, value) {
  return target._gsap[property] = value;
},
    _setterScale = function _setterScale(target, property, value) {
  return target._gsap.scaleX = target._gsap.scaleY = value;
},
    _setterScaleWithRender = function _setterScaleWithRender(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache.scaleX = cache.scaleY = value;
  cache.renderTransform(ratio, cache);
},
    _setterTransformWithRender = function _setterTransformWithRender(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache[property] = value;
  cache.renderTransform(ratio, cache);
},
    _transformProp = "transform",
    _transformOriginProp = _transformProp + "Origin",
    _supports3D,
    _createElement = function _createElement(type, ns) {
  var e = _doc.createElementNS ? _doc.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc.createElement(type); //some servers swap in https for http in the namespace which can break things, making "style" inaccessible.

  return e.style ? e : _doc.createElement(type); //some environments won't allow access to the element's style when created with a namespace in which case we default to the standard createElement() to work around the issue. Also note that when GSAP is embedded directly inside an SVG file, createElement() won't allow access to the style object in Firefox (see https://greensock.com/forums/topic/20215-problem-using-tweenmax-in-standalone-self-containing-svg-file-err-cannot-set-property-csstext-of-undefined/).
},
    _getComputedProperty = function _getComputedProperty(target, property, skipPrefixFallback) {
  var cs = getComputedStyle(target);
  return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty(target, _checkPropPrefix(property) || property, 1) || ""; //css variables may not need caps swapped out for dashes and lowercase.
},
    _prefixes = "O,Moz,ms,Ms,Webkit".split(","),
    _checkPropPrefix = function _checkPropPrefix(property, element, preferPrefix) {
  var e = element || _tempDiv,
      s = e.style,
      i = 5;

  if (property in s && !preferPrefix) {
    return property;
  }

  property = property.charAt(0).toUpperCase() + property.substr(1);

  while (i-- && !(_prefixes[i] + property in s)) {}

  return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
},
    _initCore = function _initCore() {
  if (_windowExists() && window.document) {
    _win = window;
    _doc = _win.document;
    _docElement = _doc.documentElement;
    _tempDiv = _createElement("div") || {
      style: {}
    };
    _tempDivStyler = _createElement("div");
    _transformProp = _checkPropPrefix(_transformProp);
    _transformOriginProp = _transformProp + "Origin";
    _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0"; //make sure to override certain properties that may contaminate measurements, in case the user has overreaching style sheets.

    _supports3D = !!_checkPropPrefix("perspective");
    _pluginInitted = 1;
  }
},
    _getBBoxHack = function _getBBoxHack(swapIfPossible) {
  //works around issues in some browsers (like Firefox) that don't correctly report getBBox() on SVG elements inside a <defs> element and/or <mask>. We try creating an SVG, adding it to the documentElement and toss the element in there so that it's definitely part of the rendering tree, then grab the bbox and if it works, we actually swap out the original getBBox() method for our own that does these extra steps whenever getBBox is needed. This helps ensure that performance is optimal (only do all these extra steps when absolutely necessary...most elements don't need it).
  var svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
      oldParent = this.parentNode,
      oldSibling = this.nextSibling,
      oldCSS = this.style.cssText,
      bbox;

  _docElement.appendChild(svg);

  svg.appendChild(this);
  this.style.display = "block";

  if (swapIfPossible) {
    try {
      bbox = this.getBBox();
      this._gsapBBox = this.getBBox; //store the original

      this.getBBox = _getBBoxHack;
    } catch (e) {}
  } else if (this._gsapBBox) {
    bbox = this._gsapBBox();
  }

  if (oldParent) {
    if (oldSibling) {
      oldParent.insertBefore(this, oldSibling);
    } else {
      oldParent.appendChild(this);
    }
  }

  _docElement.removeChild(svg);

  this.style.cssText = oldCSS;
  return bbox;
},
    _getAttributeFallbacks = function _getAttributeFallbacks(target, attributesArray) {
  var i = attributesArray.length;

  while (i--) {
    if (target.hasAttribute(attributesArray[i])) {
      return target.getAttribute(attributesArray[i]);
    }
  }
},
    _getBBox = function _getBBox(target) {
  var bounds;

  try {
    bounds = target.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
  } catch (error) {
    bounds = _getBBoxHack.call(target, true);
  }

  bounds && (bounds.width || bounds.height) || target.getBBox === _getBBoxHack || (bounds = _getBBoxHack.call(target, true)); //some browsers (like Firefox) misreport the bounds if the element has zero width and height (it just assumes it's at x:0, y:0), thus we need to manually grab the position in that case.

  return bounds && !bounds.width && !bounds.x && !bounds.y ? {
    x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
    y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : bounds;
},
    _isSVG = function _isSVG(e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
},
    //reports if the element is an SVG on which getBBox() actually works
_removeProperty = function _removeProperty(target, property) {
  if (property) {
    var style = target.style;

    if (property in _transformProps && property !== _transformOriginProp) {
      property = _transformProp;
    }

    if (style.removeProperty) {
      if (property.substr(0, 2) === "ms" || property.substr(0, 6) === "webkit") {
        //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
        property = "-" + property;
      }

      style.removeProperty(property.replace(_capsExp, "-$1").toLowerCase());
    } else {
      //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
      style.removeAttribute(property);
    }
  }
},
    _addNonTweeningPT = function _addNonTweeningPT(plugin, target, property, beginning, end, onlySetAtEnd) {
  var pt = new _gsapCore.PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
  plugin._pt = pt;
  pt.b = beginning;
  pt.e = end;

  plugin._props.push(property);

  return pt;
},
    _nonConvertibleUnits = {
  deg: 1,
  rad: 1,
  turn: 1
},
    //takes a single value like 20px and converts it to the unit specified, like "%", returning only the numeric amount.
_convertToUnit = function _convertToUnit(target, property, value, unit) {
  var curValue = parseFloat(value) || 0,
      curUnit = (value + "").trim().substr((curValue + "").length) || "px",
      // some browsers leave extra whitespace at the beginning of CSS variables, hence the need to trim()
  style = _tempDiv.style,
      horizontal = _horizontalExp.test(property),
      isRootSVG = target.tagName.toLowerCase() === "svg",
      measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"),
      amount = 100,
      toPixels = unit === "px",
      toPercent = unit === "%",
      px,
      parent,
      cache,
      isSVG;

  if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
    return curValue;
  }

  curUnit !== "px" && !toPixels && (curValue = _convertToUnit(target, property, value, "px"));
  isSVG = target.getCTM && _isSVG(target);

  if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
    px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
    return (0, _gsapCore._round)(toPercent ? curValue / px * amount : curValue / 100 * px);
  }

  style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
  parent = ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;

  if (isSVG) {
    parent = (target.ownerSVGElement || {}).parentNode;
  }

  if (!parent || parent === _doc || !parent.appendChild) {
    parent = _doc.body;
  }

  cache = parent._gsap;

  if (cache && toPercent && cache.width && horizontal && cache.time === _gsapCore._ticker.time) {
    return (0, _gsapCore._round)(curValue / cache.width * amount);
  } else {
    (toPercent || curUnit === "%") && (style.position = _getComputedProperty(target, "position"));
    parent === target && (style.position = "static"); // like for borderRadius, if it's a % we must have it relative to the target itself but that may not have position: relative or position: absolute in which case it'd go up the chain until it finds its offsetParent (bad). position: static protects against that.

    parent.appendChild(_tempDiv);
    px = _tempDiv[measureProperty];
    parent.removeChild(_tempDiv);
    style.position = "absolute";

    if (horizontal && toPercent) {
      cache = (0, _gsapCore._getCache)(parent);
      cache.time = _gsapCore._ticker.time;
      cache.width = parent[measureProperty];
    }
  }

  return (0, _gsapCore._round)(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
},
    _get = function _get(target, property, unit, uncache) {
  var value;
  _pluginInitted || _initCore();

  if (property in _propertyAliases && property !== "transform") {
    property = _propertyAliases[property];

    if (~property.indexOf(",")) {
      property = property.split(",")[0];
    }
  }

  if (_transformProps[property] && property !== "transform") {
    value = _parseTransform(target, uncache);
    value = property !== "transformOrigin" ? value[property] : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
  } else {
    value = target.style[property];

    if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
      value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || (0, _gsapCore._getProperty)(target, property) || (property === "opacity" ? 1 : 0); // note: some browsers, like Firefox, don't report borderRadius correctly! Instead, it only reports every corner like  borderTopLeftRadius
    }
  }

  return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
},
    _tweenComplexCSSString = function _tweenComplexCSSString(target, prop, start, end) {
  //note: we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
  if (!start || start === "none") {
    // some browsers like Safari actually PREFER the prefixed property and mis-report the unprefixed value like clipPath (BUG). In other words, even though clipPath exists in the style ("clipPath" in target.style) and it's set in the CSS properly (along with -webkit-clip-path), Safari reports clipPath as "none" whereas WebkitClipPath reports accurately like "ellipse(100% 0% at 50% 0%)", so in this case we must SWITCH to using the prefixed property instead. See https://greensock.com/forums/topic/18310-clippath-doesnt-work-on-ios/
    var p = _checkPropPrefix(prop, target, 1),
        s = p && _getComputedProperty(target, p, 1);

    if (s && s !== start) {
      prop = p;
      start = s;
    } else if (prop === "borderColor") {
      start = _getComputedProperty(target, "borderTopColor"); // Firefox bug: always reports "borderColor" as "", so we must fall back to borderTopColor. See https://greensock.com/forums/topic/24583-how-to-return-colors-that-i-had-after-reverse/
    }
  }

  var pt = new _gsapCore.PropTween(this._pt, target.style, prop, 0, 1, _gsapCore._renderComplexString),
      index = 0,
      matchIndex = 0,
      a,
      result,
      startValues,
      startNum,
      color,
      startValue,
      endValue,
      endNum,
      chunk,
      endUnit,
      startUnit,
      relative,
      endValues;
  pt.b = start;
  pt.e = end;
  start += ""; //ensure values are strings

  end += "";

  if (end === "auto") {
    target.style[prop] = end;
    end = _getComputedProperty(target, prop) || end;
    target.style[prop] = start;
  }

  a = [start, end];
  (0, _gsapCore._colorStringFilter)(a); //pass an array with the starting and ending values and let the filter do whatever it needs to the values. If colors are found, it returns true and then we must match where the color shows up order-wise because for things like boxShadow, sometimes the browser provides the computed values with the color FIRST, but the user provides it with the color LAST, so flip them if necessary. Same for drop-shadow().

  start = a[0];
  end = a[1];
  startValues = start.match(_gsapCore._numWithUnitExp) || [];
  endValues = end.match(_gsapCore._numWithUnitExp) || [];

  if (endValues.length) {
    while (result = _gsapCore._numWithUnitExp.exec(end)) {
      endValue = result[0];
      chunk = end.substring(index, result.index);

      if (color) {
        color = (color + 1) % 5;
      } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
        color = 1;
      }

      if (endValue !== (startValue = startValues[matchIndex++] || "")) {
        startNum = parseFloat(startValue) || 0;
        startUnit = startValue.substr((startNum + "").length);
        relative = endValue.charAt(1) === "=" ? +(endValue.charAt(0) + "1") : 0;

        if (relative) {
          endValue = endValue.substr(2);
        }

        endNum = parseFloat(endValue);
        endUnit = endValue.substr((endNum + "").length);
        index = _gsapCore._numWithUnitExp.lastIndex - endUnit.length;

        if (!endUnit) {
          //if something like "perspective:300" is passed in and we must add a unit to the end
          endUnit = endUnit || _gsapCore._config.units[prop] || startUnit;

          if (index === end.length) {
            end += endUnit;
            pt.e += endUnit;
          }
        }

        if (startUnit !== endUnit) {
          startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
        } //these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.


        pt._pt = {
          _next: pt._pt,
          p: chunk || matchIndex === 1 ? chunk : ",",
          //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
          s: startNum,
          c: relative ? relative * endNum : endNum - startNum,
          m: color && color < 4 || prop === "zIndex" ? Math.round : 0
        };
      }
    }

    pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)
  } else {
    pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
  }

  _gsapCore._relExp.test(end) && (pt.e = 0); //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).

  this._pt = pt; //start the linked list with this new PropTween. Remember, we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within another plugin too, thus "this" would refer to the plugin.

  return pt;
},
    _keywordToPercent = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
},
    _convertKeywordsToPercentages = function _convertKeywordsToPercentages(value) {
  var split = value.split(" "),
      x = split[0],
      y = split[1] || "50%";

  if (x === "top" || x === "bottom" || y === "left" || y === "right") {
    //the user provided them in the wrong order, so flip them
    value = x;
    x = y;
    y = value;
  }

  split[0] = _keywordToPercent[x] || x;
  split[1] = _keywordToPercent[y] || y;
  return split.join(" ");
},
    _renderClearProps = function _renderClearProps(ratio, data) {
  if (data.tween && data.tween._time === data.tween._dur) {
    var target = data.t,
        style = target.style,
        props = data.u,
        cache = target._gsap,
        prop,
        clearTransforms,
        i;

    if (props === "all" || props === true) {
      style.cssText = "";
      clearTransforms = 1;
    } else {
      props = props.split(",");
      i = props.length;

      while (--i > -1) {
        prop = props[i];

        if (_transformProps[prop]) {
          clearTransforms = 1;
          prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
        }

        _removeProperty(target, prop);
      }
    }

    if (clearTransforms) {
      _removeProperty(target, _transformProp);

      if (cache) {
        cache.svg && target.removeAttribute("transform");

        _parseTransform(target, 1); // force all the cached values back to "normal"/identity, otherwise if there's another tween that's already set to render transforms on this element, it could display the wrong values.


        cache.uncache = 1;
      }
    }
  }
},
    // note: specialProps should return 1 if (and only if) they have a non-zero priority. It indicates we need to sort the linked list.
_specialProps = {
  clearProps: function clearProps(plugin, target, property, endValue, tween) {
    if (tween.data !== "isFromStart") {
      var pt = plugin._pt = new _gsapCore.PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
      pt.u = endValue;
      pt.pr = -10;
      pt.tween = tween;

      plugin._props.push(property);

      return 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://greensock.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */

},

/*
 * --------------------------------------------------------------------------------------
 * TRANSFORMS
 * --------------------------------------------------------------------------------------
 */
_identity2DMatrix = [1, 0, 0, 1, 0, 0],
    _rotationalProperties = {},
    _isNullTransform = function _isNullTransform(value) {
  return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
},
    _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray(target) {
  var matrixString = _getComputedProperty(target, _transformProp);

  return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_gsapCore._numExp).map(_gsapCore._round);
},
    _getMatrix = function _getMatrix(target, force2D) {
  var cache = target._gsap || (0, _gsapCore._getCache)(target),
      style = target.style,
      matrix = _getComputedTransformMatrixAsArray(target),
      parent,
      nextSibling,
      temp,
      addedToDOM;

  if (cache.svg && target.getAttribute("transform")) {
    temp = target.transform.baseVal.consolidate().matrix; //ensures that even complex values like "translate(50,60) rotate(135,0,0)" are parsed because it mashes it into a matrix.

    matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
    return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
  } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
    //note: if offsetParent is null, that means the element isn't in the normal document flow, like if it has display:none or one of its ancestors has display:none). Firefox returns null for getComputedStyle() if the element is in an iframe that has display:none. https://bugzilla.mozilla.org/show_bug.cgi?id=548397
    //browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none". Firefox and Microsoft browsers have a partial bug where they'll report transforms even if display:none BUT not any percentage-based values like translate(-50%, 8px) will be reported as if it's translate(0, 8px).
    temp = style.display;
    style.display = "block";
    parent = target.parentNode;

    if (!parent || !target.offsetParent) {
      // note: in 3.3.0 we switched target.offsetParent to _doc.body.contains(target) to avoid [sometimes unnecessary] MutationObserver calls but that wasn't adequate because there are edge cases where nested position: fixed elements need to get reparented to accurately sense transforms. See https://github.com/greensock/GSAP/issues/388 and https://github.com/greensock/GSAP/issues/375
      addedToDOM = 1; //flag

      nextSibling = target.nextSibling;

      _docElement.appendChild(target); //we must add it to the DOM in order to get values properly

    }

    matrix = _getComputedTransformMatrixAsArray(target);
    temp ? style.display = temp : _removeProperty(target, "display");

    if (addedToDOM) {
      nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
    }
  }

  return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
},
    _applySVGOrigin = function _applySVGOrigin(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
  var cache = target._gsap,
      matrix = matrixArray || _getMatrix(target, true),
      xOriginOld = cache.xOrigin || 0,
      yOriginOld = cache.yOrigin || 0,
      xOffsetOld = cache.xOffset || 0,
      yOffsetOld = cache.yOffset || 0,
      a = matrix[0],
      b = matrix[1],
      c = matrix[2],
      d = matrix[3],
      tx = matrix[4],
      ty = matrix[5],
      originSplit = origin.split(" "),
      xOrigin = parseFloat(originSplit[0]) || 0,
      yOrigin = parseFloat(originSplit[1]) || 0,
      bounds,
      determinant,
      x,
      y;

  if (!originIsAbsolute) {
    bounds = _getBBox(target);
    xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
    yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
  } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
    //if it's zero (like if scaleX and scaleY are zero), skip it to avoid errors with dividing by zero.
    x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
    y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
    xOrigin = x;
    yOrigin = y;
  }

  if (smooth || smooth !== false && cache.smooth) {
    tx = xOrigin - xOriginOld;
    ty = yOrigin - yOriginOld;
    cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
    cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
  } else {
    cache.xOffset = cache.yOffset = 0;
  }

  cache.xOrigin = xOrigin;
  cache.yOrigin = yOrigin;
  cache.smooth = !!smooth;
  cache.origin = origin;
  cache.originIsAbsolute = !!originIsAbsolute;
  target.style[_transformOriginProp] = "0px 0px"; //otherwise, if someone sets  an origin via CSS, it will likely interfere with the SVG transform attribute ones (because remember, we're baking the origin into the matrix() value).

  if (pluginToAddPropTweensTo) {
    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);

    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);

    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);

    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
  }

  target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
},
    _parseTransform = function _parseTransform(target, uncache) {
  var cache = target._gsap || new _gsapCore.GSCache(target);

  if ("x" in cache && !uncache && !cache.uncache) {
    return cache;
  }

  var style = target.style,
      invertedScaleX = cache.scaleX < 0,
      px = "px",
      deg = "deg",
      origin = _getComputedProperty(target, _transformOriginProp) || "0",
      x,
      y,
      z,
      scaleX,
      scaleY,
      rotation,
      rotationX,
      rotationY,
      skewX,
      skewY,
      perspective,
      xOrigin,
      yOrigin,
      matrix,
      angle,
      cos,
      sin,
      a,
      b,
      c,
      d,
      a12,
      a22,
      t1,
      t2,
      t3,
      a13,
      a23,
      a33,
      a42,
      a43,
      a32;
  x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
  scaleX = scaleY = 1;
  cache.svg = !!(target.getCTM && _isSVG(target));
  matrix = _getMatrix(target, cache.svg);

  if (cache.svg) {
    t1 = !cache.uncache && target.getAttribute("data-svg-origin");

    _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
  }

  xOrigin = cache.xOrigin || 0;
  yOrigin = cache.yOrigin || 0;

  if (matrix !== _identity2DMatrix) {
    a = matrix[0]; //a11

    b = matrix[1]; //a21

    c = matrix[2]; //a31

    d = matrix[3]; //a41

    x = a12 = matrix[4];
    y = a22 = matrix[5]; //2D matrix

    if (matrix.length === 6) {
      scaleX = Math.sqrt(a * a + b * b);
      scaleY = Math.sqrt(d * d + c * c);
      rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).

      skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
      skewX && (scaleY *= Math.cos(skewX * _DEG2RAD));

      if (cache.svg) {
        x -= xOrigin - (xOrigin * a + yOrigin * c);
        y -= yOrigin - (xOrigin * b + yOrigin * d);
      } //3D matrix

    } else {
      a32 = matrix[6];
      a42 = matrix[7];
      a13 = matrix[8];
      a23 = matrix[9];
      a33 = matrix[10];
      a43 = matrix[11];
      x = matrix[12];
      y = matrix[13];
      z = matrix[14];
      angle = _atan2(a32, a33);
      rotationX = angle * _RAD2DEG; //rotationX

      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a12 * cos + a13 * sin;
        t2 = a22 * cos + a23 * sin;
        t3 = a32 * cos + a33 * sin;
        a13 = a12 * -sin + a13 * cos;
        a23 = a22 * -sin + a23 * cos;
        a33 = a32 * -sin + a33 * cos;
        a43 = a42 * -sin + a43 * cos;
        a12 = t1;
        a22 = t2;
        a32 = t3;
      } //rotationY


      angle = _atan2(-c, a33);
      rotationY = angle * _RAD2DEG;

      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a * cos - a13 * sin;
        t2 = b * cos - a23 * sin;
        t3 = c * cos - a33 * sin;
        a43 = d * sin + a43 * cos;
        a = t1;
        b = t2;
        c = t3;
      } //rotationZ


      angle = _atan2(b, a);
      rotation = angle * _RAD2DEG;

      if (angle) {
        cos = Math.cos(angle);
        sin = Math.sin(angle);
        t1 = a * cos + b * sin;
        t2 = a12 * cos + a22 * sin;
        b = b * cos - a * sin;
        a22 = a22 * cos - a12 * sin;
        a = t1;
        a12 = t2;
      }

      if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
        //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
        rotationX = rotation = 0;
        rotationY = 180 - rotationY;
      }

      scaleX = (0, _gsapCore._round)(Math.sqrt(a * a + b * b + c * c));
      scaleY = (0, _gsapCore._round)(Math.sqrt(a22 * a22 + a32 * a32));
      angle = _atan2(a12, a22);
      skewX = Math.abs(angle) > 0.0002 ? angle * _RAD2DEG : 0;
      perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
    }

    if (cache.svg) {
      //sense if there are CSS transforms applied on an SVG element in which case we must overwrite them when rendering. The transform attribute is more reliable cross-browser, but we can't just remove the CSS ones because they may be applied in a CSS rule somewhere (not just inline).
      t1 = target.getAttribute("transform");
      cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
      t1 && target.setAttribute("transform", t1);
    }
  }

  if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
    if (invertedScaleX) {
      scaleX *= -1;
      skewX += rotation <= 0 ? 180 : -180;
      rotation += rotation <= 0 ? 180 : -180;
    } else {
      scaleY *= -1;
      skewX += skewX <= 0 ? 180 : -180;
    }
  }

  cache.x = x - ((cache.xPercent = x && (cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
  cache.y = y - ((cache.yPercent = y && (cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
  cache.z = z + px;
  cache.scaleX = (0, _gsapCore._round)(scaleX);
  cache.scaleY = (0, _gsapCore._round)(scaleY);
  cache.rotation = (0, _gsapCore._round)(rotation) + deg;
  cache.rotationX = (0, _gsapCore._round)(rotationX) + deg;
  cache.rotationY = (0, _gsapCore._round)(rotationY) + deg;
  cache.skewX = skewX + deg;
  cache.skewY = skewY + deg;
  cache.transformPerspective = perspective + px;

  if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || 0) {
    style[_transformOriginProp] = _firstTwoOnly(origin);
  }

  cache.xOffset = cache.yOffset = 0;
  cache.force3D = _gsapCore._config.force3D;
  cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
  cache.uncache = 0;
  return cache;
},
    _firstTwoOnly = function _firstTwoOnly(value) {
  return (value = value.split(" "))[0] + " " + value[1];
},
    //for handling transformOrigin values, stripping out the 3rd dimension
_addPxTranslate = function _addPxTranslate(target, start, value) {
  var unit = (0, _gsapCore.getUnit)(start);
  return (0, _gsapCore._round)(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
},
    _renderNon3DTransforms = function _renderNon3DTransforms(ratio, cache) {
  cache.z = "0px";
  cache.rotationY = cache.rotationX = "0deg";
  cache.force3D = 0;

  _renderCSSTransforms(ratio, cache);
},
    _zeroDeg = "0deg",
    _zeroPx = "0px",
    _endParenthesis = ") ",
    _renderCSSTransforms = function _renderCSSTransforms(ratio, cache) {
  var _ref = cache || this,
      xPercent = _ref.xPercent,
      yPercent = _ref.yPercent,
      x = _ref.x,
      y = _ref.y,
      z = _ref.z,
      rotation = _ref.rotation,
      rotationY = _ref.rotationY,
      rotationX = _ref.rotationX,
      skewX = _ref.skewX,
      skewY = _ref.skewY,
      scaleX = _ref.scaleX,
      scaleY = _ref.scaleY,
      transformPerspective = _ref.transformPerspective,
      force3D = _ref.force3D,
      target = _ref.target,
      zOrigin = _ref.zOrigin,
      transforms = "",
      use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true; // Safari has a bug that causes it not to render 3D transform-origin values properly, so we force the z origin to 0, record it in the cache, and then do the math here to offset the translate values accordingly (basically do the 3D transform-origin part manually)


  if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
    var angle = parseFloat(rotationY) * _DEG2RAD,
        a13 = Math.sin(angle),
        a33 = Math.cos(angle),
        cos;

    angle = parseFloat(rotationX) * _DEG2RAD;
    cos = Math.cos(angle);
    x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
    y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
    z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
  }

  if (transformPerspective !== _zeroPx) {
    transforms += "perspective(" + transformPerspective + _endParenthesis;
  }

  if (xPercent || yPercent) {
    transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
  }

  if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
    transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
  }

  if (rotation !== _zeroDeg) {
    transforms += "rotate(" + rotation + _endParenthesis;
  }

  if (rotationY !== _zeroDeg) {
    transforms += "rotateY(" + rotationY + _endParenthesis;
  }

  if (rotationX !== _zeroDeg) {
    transforms += "rotateX(" + rotationX + _endParenthesis;
  }

  if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
    transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
  }

  if (scaleX !== 1 || scaleY !== 1) {
    transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
  }

  target.style[_transformProp] = transforms || "translate(0, 0)";
},
    _renderSVGTransforms = function _renderSVGTransforms(ratio, cache) {
  var _ref2 = cache || this,
      xPercent = _ref2.xPercent,
      yPercent = _ref2.yPercent,
      x = _ref2.x,
      y = _ref2.y,
      rotation = _ref2.rotation,
      skewX = _ref2.skewX,
      skewY = _ref2.skewY,
      scaleX = _ref2.scaleX,
      scaleY = _ref2.scaleY,
      target = _ref2.target,
      xOrigin = _ref2.xOrigin,
      yOrigin = _ref2.yOrigin,
      xOffset = _ref2.xOffset,
      yOffset = _ref2.yOffset,
      forceCSS = _ref2.forceCSS,
      tx = parseFloat(x),
      ty = parseFloat(y),
      a11,
      a21,
      a12,
      a22,
      temp;

  rotation = parseFloat(rotation);
  skewX = parseFloat(skewX);
  skewY = parseFloat(skewY);

  if (skewY) {
    //for performance reasons, we combine all skewing into the skewX and rotation values. Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of 10 degrees.
    skewY = parseFloat(skewY);
    skewX += skewY;
    rotation += skewY;
  }

  if (rotation || skewX) {
    rotation *= _DEG2RAD;
    skewX *= _DEG2RAD;
    a11 = Math.cos(rotation) * scaleX;
    a21 = Math.sin(rotation) * scaleX;
    a12 = Math.sin(rotation - skewX) * -scaleY;
    a22 = Math.cos(rotation - skewX) * scaleY;

    if (skewX) {
      skewY *= _DEG2RAD;
      temp = Math.tan(skewX - skewY);
      temp = Math.sqrt(1 + temp * temp);
      a12 *= temp;
      a22 *= temp;

      if (skewY) {
        temp = Math.tan(skewY);
        temp = Math.sqrt(1 + temp * temp);
        a11 *= temp;
        a21 *= temp;
      }
    }

    a11 = (0, _gsapCore._round)(a11);
    a21 = (0, _gsapCore._round)(a21);
    a12 = (0, _gsapCore._round)(a12);
    a22 = (0, _gsapCore._round)(a22);
  } else {
    a11 = scaleX;
    a22 = scaleY;
    a21 = a12 = 0;
  }

  if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
    tx = _convertToUnit(target, "x", x, "px");
    ty = _convertToUnit(target, "y", y, "px");
  }

  if (xOrigin || yOrigin || xOffset || yOffset) {
    tx = (0, _gsapCore._round)(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
    ty = (0, _gsapCore._round)(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
  }

  if (xPercent || yPercent) {
    //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the translation to simulate it.
    temp = target.getBBox();
    tx = (0, _gsapCore._round)(tx + xPercent / 100 * temp.width);
    ty = (0, _gsapCore._round)(ty + yPercent / 100 * temp.height);
  }

  temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
  target.setAttribute("transform", temp);
  forceCSS && (target.style[_transformProp] = temp); //some browsers prioritize CSS transforms over the transform attribute. When we sense that the user has CSS transforms applied, we must overwrite them this way (otherwise some browser simply won't render the  transform attribute changes!)
},
    _addRotationalPropTween = function _addRotationalPropTween(plugin, target, property, startNum, endValue, relative) {
  var cap = 360,
      isString = (0, _gsapCore._isString)(endValue),
      endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1),
      change = relative ? endNum * relative : endNum - startNum,
      finalValue = startNum + change + "deg",
      direction,
      pt;

  if (isString) {
    direction = endValue.split("_")[1];

    if (direction === "short") {
      change %= cap;

      if (change !== change % (cap / 2)) {
        change += change < 0 ? cap : -cap;
      }
    }

    if (direction === "cw" && change < 0) {
      change = (change + cap * _bigNum) % cap - ~~(change / cap) * cap;
    } else if (direction === "ccw" && change > 0) {
      change = (change - cap * _bigNum) % cap - ~~(change / cap) * cap;
    }
  }

  plugin._pt = pt = new _gsapCore.PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
  pt.e = finalValue;
  pt.u = "deg";

  plugin._props.push(property);

  return pt;
},
    _addRawTransformPTs = function _addRawTransformPTs(plugin, transforms, target) {
  //for handling cases where someone passes in a whole transform string, like transform: "scale(2, 3) rotate(20deg) translateY(30em)"
  var style = _tempDivStyler.style,
      startCache = target._gsap,
      exclude = "perspective,force3D,transformOrigin,svgOrigin",
      endCache,
      p,
      startValue,
      endValue,
      startNum,
      endNum,
      startUnit,
      endUnit;
  style.cssText = getComputedStyle(target).cssText + ";position:absolute;display:block;"; //%-based translations will fail unless we set the width/height to match the original target (and padding/borders can affect it)

  style[_transformProp] = transforms;

  _doc.body.appendChild(_tempDivStyler);

  endCache = _parseTransform(_tempDivStyler, 1);

  for (p in _transformProps) {
    startValue = startCache[p];
    endValue = endCache[p];

    if (startValue !== endValue && exclude.indexOf(p) < 0) {
      //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
      startUnit = (0, _gsapCore.getUnit)(startValue);
      endUnit = (0, _gsapCore.getUnit)(endValue);
      startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
      endNum = parseFloat(endValue);
      plugin._pt = new _gsapCore.PropTween(plugin._pt, startCache, p, startNum, endNum - startNum, _renderCSSProp);
      plugin._pt.u = endUnit || 0;

      plugin._props.push(p);
    }
  }

  _doc.body.removeChild(_tempDivStyler);
}; // handle splitting apart padding, margin, borderWidth, and borderRadius into their 4 components. Firefox, for example, won't report borderRadius correctly - it will only do borderTopLeftRadius and the other corners. We also want to handle paddingTop, marginLeft, borderRightWidth, etc.


exports._getBBox = _getBBox;
exports.checkPrefix = _checkPropPrefix;
exports._createElement = _createElement;
(0, _gsapCore._forEachName)("padding,margin,Width,Radius", function (name, index) {
  var t = "Top",
      r = "Right",
      b = "Bottom",
      l = "Left",
      props = (index < 3 ? [t, r, b, l] : [t + l, t + r, b + r, b + l]).map(function (side) {
    return index < 2 ? name + side : "border" + side + name;
  });

  _specialProps[index > 1 ? "border" + name : name] = function (plugin, target, property, endValue, tween) {
    var a, vars;

    if (arguments.length < 4) {
      // getter, passed target, property, and unit (from _get())
      a = props.map(function (prop) {
        return _get(plugin, prop, property);
      });
      vars = a.join(" ");
      return vars.split(a[0]).length === 5 ? a[0] : vars;
    }

    a = (endValue + "").split(" ");
    vars = {};
    props.forEach(function (prop, i) {
      return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
    });
    plugin.init(target, vars, tween);
  };
});
var CSSPlugin = {
  name: "css",
  register: _initCore,
  targetTest: function targetTest(target) {
    return target.style && target.nodeType;
  },
  init: function init(target, vars, tween, index, targets) {
    var props = this._props,
        style = target.style,
        startAt = tween.vars.startAt,
        startValue,
        endValue,
        endNum,
        startNum,
        type,
        specialProp,
        p,
        startUnit,
        endUnit,
        relative,
        isTransformRelated,
        transformPropTween,
        cache,
        smooth,
        hasPriority;
    _pluginInitted || _initCore();

    for (p in vars) {
      if (p === "autoRound") {
        continue;
      }

      endValue = vars[p];

      if (_gsapCore._plugins[p] && (0, _gsapCore._checkPlugin)(p, vars, tween, index, target, targets)) {
        // plugins
        continue;
      }

      type = typeof endValue;
      specialProp = _specialProps[p];

      if (type === "function") {
        endValue = endValue.call(tween, index, target, targets);
        type = typeof endValue;
      }

      if (type === "string" && ~endValue.indexOf("random(")) {
        endValue = (0, _gsapCore._replaceRandom)(endValue);
      }

      if (specialProp) {
        specialProp(this, target, p, endValue, tween) && (hasPriority = 1);
      } else if (p.substr(0, 2) === "--") {
        //CSS variable
        startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
        endValue += "";
        startUnit = (0, _gsapCore.getUnit)(startValue);
        endUnit = (0, _gsapCore.getUnit)(endValue);
        endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
        this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
      } else if (type !== "undefined") {
        if (startAt && p in startAt) {
          // in case someone hard-codes a complex value as the start, like top: "calc(2vh / 2)". Without this, it'd use the computed value (always in px)
          startValue = typeof startAt[p] === "function" ? startAt[p].call(tween, index, target, targets) : startAt[p];
          p in _gsapCore._config.units && !(0, _gsapCore.getUnit)(startValue) && (startValue += _gsapCore._config.units[p]); // for cases when someone passes in a unitless value like {x: 100}; if we try setting translate(100, 0px) it won't work.

          (startValue + "").charAt(1) === "=" && (startValue = _get(target, p)); // can't work with relative values
        } else {
          startValue = _get(target, p);
        }

        startNum = parseFloat(startValue);
        relative = type === "string" && endValue.charAt(1) === "=" ? +(endValue.charAt(0) + "1") : 0;
        relative && (endValue = endValue.substr(2));
        endNum = parseFloat(endValue);

        if (p in _propertyAliases) {
          if (p === "autoAlpha") {
            //special case where we control the visibility along with opacity. We still allow the opacity value to pass through and get tweened.
            if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
              //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
              startNum = 0;
            }

            _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
          }

          if (p !== "scale" && p !== "transform") {
            p = _propertyAliases[p];
            ~p.indexOf(",") && (p = p.split(",")[0]);
          }
        }

        isTransformRelated = p in _transformProps; //--- TRANSFORM-RELATED ---

        if (isTransformRelated) {
          if (!transformPropTween) {
            cache = target._gsap;
            cache.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform); // if, for example, gsap.set(... {transform:"translateX(50vw)"}), the _get() call doesn't parse the transform, thus cache.renderTransform won't be set yet so force the parsing of the transform here.

            smooth = vars.smoothOrigin !== false && cache.smooth;
            transformPropTween = this._pt = new _gsapCore.PropTween(this._pt, style, _transformProp, 0, 1, cache.renderTransform, cache, 0, -1); //the first time through, create the rendering PropTween so that it runs LAST (in the linked list, we keep adding to the beginning)

            transformPropTween.dep = 1; //flag it as dependent so that if things get killed/overwritten and this is the only PropTween left, we can safely kill the whole tween.
          }

          if (p === "scale") {
            this._pt = new _gsapCore.PropTween(this._pt, cache, "scaleY", cache.scaleY, relative ? relative * endNum : endNum - cache.scaleY);
            props.push("scaleY", p);
            p += "X";
          } else if (p === "transformOrigin") {
            endValue = _convertKeywordsToPercentages(endValue); //in case something like "left top" or "bottom right" is passed in. Convert to percentages.

            if (cache.svg) {
              _applySVGOrigin(target, endValue, 0, smooth, 0, this);
            } else {
              endUnit = parseFloat(endValue.split(" ")[2]) || 0; //handle the zOrigin separately!

              endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);

              _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
            }

            continue;
          } else if (p === "svgOrigin") {
            _applySVGOrigin(target, endValue, 1, smooth, 0, this);

            continue;
          } else if (p in _rotationalProperties) {
            _addRotationalPropTween(this, cache, p, startNum, endValue, relative);

            continue;
          } else if (p === "smoothOrigin") {
            _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);

            continue;
          } else if (p === "force3D") {
            cache[p] = endValue;
            continue;
          } else if (p === "transform") {
            _addRawTransformPTs(this, endValue, target);

            continue;
          }
        } else if (!(p in style)) {
          p = _checkPropPrefix(p) || p;
        }

        if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
          startUnit = (startValue + "").substr((startNum + "").length);
          endNum || (endNum = 0); // protect against NaN

          endUnit = (0, _gsapCore.getUnit)(endValue) || (p in _gsapCore._config.units ? _gsapCore._config.units[p] : startUnit);
          startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
          this._pt = new _gsapCore.PropTween(this._pt, isTransformRelated ? cache : style, p, startNum, relative ? relative * endNum : endNum - startNum, !isTransformRelated && (endUnit === "px" || p === "zIndex") && vars.autoRound !== false ? _renderRoundedCSSProp : _renderCSSProp);
          this._pt.u = endUnit || 0;

          if (startUnit !== endUnit) {
            //when the tween goes all the way back to the beginning, we need to revert it to the OLD/ORIGINAL value (with those units). We record that as a "b" (beginning) property and point to a render method that handles that. (performance optimization)
            this._pt.b = startValue;
            this._pt.r = _renderCSSPropWithBeginning;
          }
        } else if (!(p in style)) {
          if (p in target) {
            //maybe it's not a style - it could be a property added directly to an element in which case we'll try to animate that.
            this.add(target, p, target[p], endValue, index, targets);
          } else {
            (0, _gsapCore._missingPlugin)(p, endValue);
            continue;
          }
        } else {
          _tweenComplexCSSString.call(this, target, p, startValue, endValue);
        }

        props.push(p);
      }
    }

    hasPriority && (0, _gsapCore._sortPropTweensByPriority)(this);
  },
  get: _get,
  aliases: _propertyAliases,
  getSetter: function getSetter(target, property, plugin) {
    //returns a setter function that accepts target, property, value and applies it accordingly. Remember, properties like "x" aren't as simple as target.style.property = value because they've got to be applied to a proxy object and then merged into a transform string in a renderer.
    var p = _propertyAliases[property];
    p && p.indexOf(",") < 0 && (property = p);
    return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !(0, _gsapCore._isUndefined)(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : (0, _gsapCore._getSetter)(target, property);
  },
  core: {
    _removeProperty: _removeProperty,
    _getMatrix: _getMatrix
  }
};
exports.default = exports.CSSPlugin = CSSPlugin;
_gsapCore.gsap.utils.checkPrefix = _checkPropPrefix;

(function (positionAndScale, rotation, others, aliases) {
  var all = (0, _gsapCore._forEachName)(positionAndScale + "," + rotation + "," + others, function (name) {
    _transformProps[name] = 1;
  });
  (0, _gsapCore._forEachName)(rotation, function (name) {
    _gsapCore._config.units[name] = "deg";
    _rotationalProperties[name] = 1;
  });
  _propertyAliases[all[13]] = positionAndScale + "," + rotation;
  (0, _gsapCore._forEachName)(aliases, function (name) {
    var split = name.split(":");
    _propertyAliases[split[1]] = all[split[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");

(0, _gsapCore._forEachName)("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (name) {
  _gsapCore._config.units[name] = "px";
});

_gsapCore.gsap.registerPlugin(CSSPlugin);
},{"./gsap-core.js":"../node_modules/gsap/gsap-core.js"}],"../node_modules/gsap/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Power0", {
  enumerable: true,
  get: function () {
    return _gsapCore.Power0;
  }
});
Object.defineProperty(exports, "Power1", {
  enumerable: true,
  get: function () {
    return _gsapCore.Power1;
  }
});
Object.defineProperty(exports, "Power2", {
  enumerable: true,
  get: function () {
    return _gsapCore.Power2;
  }
});
Object.defineProperty(exports, "Power3", {
  enumerable: true,
  get: function () {
    return _gsapCore.Power3;
  }
});
Object.defineProperty(exports, "Power4", {
  enumerable: true,
  get: function () {
    return _gsapCore.Power4;
  }
});
Object.defineProperty(exports, "Linear", {
  enumerable: true,
  get: function () {
    return _gsapCore.Linear;
  }
});
Object.defineProperty(exports, "Quad", {
  enumerable: true,
  get: function () {
    return _gsapCore.Quad;
  }
});
Object.defineProperty(exports, "Cubic", {
  enumerable: true,
  get: function () {
    return _gsapCore.Cubic;
  }
});
Object.defineProperty(exports, "Quart", {
  enumerable: true,
  get: function () {
    return _gsapCore.Quart;
  }
});
Object.defineProperty(exports, "Quint", {
  enumerable: true,
  get: function () {
    return _gsapCore.Quint;
  }
});
Object.defineProperty(exports, "Strong", {
  enumerable: true,
  get: function () {
    return _gsapCore.Strong;
  }
});
Object.defineProperty(exports, "Elastic", {
  enumerable: true,
  get: function () {
    return _gsapCore.Elastic;
  }
});
Object.defineProperty(exports, "Back", {
  enumerable: true,
  get: function () {
    return _gsapCore.Back;
  }
});
Object.defineProperty(exports, "SteppedEase", {
  enumerable: true,
  get: function () {
    return _gsapCore.SteppedEase;
  }
});
Object.defineProperty(exports, "Bounce", {
  enumerable: true,
  get: function () {
    return _gsapCore.Bounce;
  }
});
Object.defineProperty(exports, "Sine", {
  enumerable: true,
  get: function () {
    return _gsapCore.Sine;
  }
});
Object.defineProperty(exports, "Expo", {
  enumerable: true,
  get: function () {
    return _gsapCore.Expo;
  }
});
Object.defineProperty(exports, "Circ", {
  enumerable: true,
  get: function () {
    return _gsapCore.Circ;
  }
});
Object.defineProperty(exports, "TweenLite", {
  enumerable: true,
  get: function () {
    return _gsapCore.TweenLite;
  }
});
Object.defineProperty(exports, "TimelineLite", {
  enumerable: true,
  get: function () {
    return _gsapCore.TimelineLite;
  }
});
Object.defineProperty(exports, "TimelineMax", {
  enumerable: true,
  get: function () {
    return _gsapCore.TimelineMax;
  }
});
Object.defineProperty(exports, "CSSPlugin", {
  enumerable: true,
  get: function () {
    return _CSSPlugin.CSSPlugin;
  }
});
exports.TweenMax = exports.default = exports.gsap = void 0;

var _gsapCore = require("./gsap-core.js");

var _CSSPlugin = require("./CSSPlugin.js");

var gsapWithCSS = _gsapCore.gsap.registerPlugin(_CSSPlugin.CSSPlugin) || _gsapCore.gsap,
    // to protect from tree shaking
TweenMaxWithCSS = gsapWithCSS.core.Tween;

exports.TweenMax = TweenMaxWithCSS;
exports.default = exports.gsap = gsapWithCSS;
},{"./gsap-core.js":"../node_modules/gsap/gsap-core.js","./CSSPlugin.js":"../node_modules/gsap/CSSPlugin.js"}],"../node_modules/tsparticles/dist/pjs.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPjs = void 0;
const initPjs = (main) => {
    const particlesJS = (tagId, options) => {
        return main.load(tagId, options);
    };
    particlesJS.load = (tagId, pathConfigJson, callback) => {
        main.loadJSON(tagId, pathConfigJson).then((container) => {
            if (container) {
                callback(container);
            }
        });
    };
    particlesJS.setOnClickHandler = (callback) => {
        main.setOnClickHandler(callback);
    };
    const pJSDom = main.dom();
    return { particlesJS, pJSDom };
};
exports.initPjs = initPjs;

},{}],"../node_modules/tsparticles/dist/ShapeDrawers/SquareDrawer.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SquareDrawer = void 0;
class SquareDrawer {
    getSidesCount() {
        return 4;
    }
    draw(context, particle, radius) {
        context.rect(-radius, -radius, radius * 2, radius * 2);
    }
}
exports.SquareDrawer = SquareDrawer;

},{}],"../node_modules/tsparticles/dist/Enums/Directions/OutModeDirection.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutModeDirection = void 0;
var OutModeDirection;
(function (OutModeDirection) {
    OutModeDirection["bottom"] = "bottom";
    OutModeDirection["left"] = "left";
    OutModeDirection["right"] = "right";
    OutModeDirection["top"] = "top";
})(OutModeDirection = exports.OutModeDirection || (exports.OutModeDirection = {}));

},{}],"../node_modules/tsparticles/dist/Enums/Directions/MoveDirection.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveDirection = void 0;
var MoveDirection;
(function (MoveDirection) {
    MoveDirection["bottom"] = "bottom";
    MoveDirection["bottomLeft"] = "bottom-left";
    MoveDirection["bottomRight"] = "bottom-right";
    MoveDirection["left"] = "left";
    MoveDirection["none"] = "none";
    MoveDirection["right"] = "right";
    MoveDirection["top"] = "top";
    MoveDirection["topLeft"] = "top-left";
    MoveDirection["topRight"] = "top-right";
})(MoveDirection = exports.MoveDirection || (exports.MoveDirection = {}));

},{}],"../node_modules/tsparticles/dist/Enums/Directions/RotateDirection.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RotateDirection = void 0;
var RotateDirection;
(function (RotateDirection) {
    RotateDirection["clockwise"] = "clockwise";
    RotateDirection["counterClockwise"] = "counter-clockwise";
    RotateDirection["random"] = "random";
})(RotateDirection = exports.RotateDirection || (exports.RotateDirection = {}));

},{}],"../node_modules/tsparticles/dist/Enums/Directions/index.js":[function(require,module,exports) {
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./MoveDirection"), exports);
__exportStar(require("./RotateDirection"), exports);

},{"./MoveDirection":"../node_modules/tsparticles/dist/Enums/Directions/MoveDirection.js","./RotateDirection":"../node_modules/tsparticles/dist/Enums/Directions/RotateDirection.js"}],"../node_modules/tsparticles/dist/Utils/NumberUtils.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberUtils = void 0;
const Directions_1 = require("../Enums/Directions");
class NumberUtils {
    static clamp(num, min, max) {
        return Math.min(Math.max(num, min), max);
    }
    static mix(comp1, comp2, weight1, weight2) {
        return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
    }
    static randomInRange(r) {
        const max = NumberUtils.getRangeMax(r);
        let min = NumberUtils.getRangeMin(r);
        if (max === min) {
            min = 0;
        }
        return Math.random() * (max - min) + min;
    }
    static getRangeValue(value) {
        return typeof value === "number" ? value : NumberUtils.randomInRange(value);
    }
    static getRangeMin(value) {
        return typeof value === "number" ? value : value.min;
    }
    static getRangeMax(value) {
        return typeof value === "number" ? value : value.max;
    }
    static setRangeValue(source, value) {
        if (source === value || (value === undefined && typeof source === "number")) {
            return source;
        }
        const min = NumberUtils.getRangeMin(source), max = NumberUtils.getRangeMax(source);
        return value !== undefined
            ? {
                min: Math.min(min, value),
                max: Math.max(max, value),
            }
            : NumberUtils.setRangeValue(min, max);
    }
    static getValue(options) {
        const random = options.random;
        const { enable, minimumValue } = typeof random === "boolean" ? { enable: random, minimumValue: 0 } : random;
        return enable ? NumberUtils.randomInRange({ min: minimumValue, max: options.value }) : options.value;
    }
    static getDistances(pointA, pointB) {
        const dx = pointA.x - pointB.x;
        const dy = pointA.y - pointB.y;
        return { dx: dx, dy: dy, distance: Math.sqrt(dx * dx + dy * dy) };
    }
    static getDistance(pointA, pointB) {
        return NumberUtils.getDistances(pointA, pointB).distance;
    }
    static getParticleBaseVelocity(particle) {
        let velocityBase;
        switch (particle.direction) {
            case Directions_1.MoveDirection.top:
                velocityBase = { x: 0, y: -1 };
                break;
            case Directions_1.MoveDirection.topRight:
                velocityBase = { x: 0.5, y: -0.5 };
                break;
            case Directions_1.MoveDirection.right:
                velocityBase = { x: 1, y: -0 };
                break;
            case Directions_1.MoveDirection.bottomRight:
                velocityBase = { x: 0.5, y: 0.5 };
                break;
            case Directions_1.MoveDirection.bottom:
                velocityBase = { x: 0, y: 1 };
                break;
            case Directions_1.MoveDirection.bottomLeft:
                velocityBase = { x: -0.5, y: 1 };
                break;
            case Directions_1.MoveDirection.left:
                velocityBase = { x: -1, y: 0 };
                break;
            case Directions_1.MoveDirection.topLeft:
                velocityBase = { x: -0.5, y: -0.5 };
                break;
            default:
                velocityBase = { x: 0, y: 0 };
                break;
        }
        return velocityBase;
    }
    static rotateVelocity(velocity, angle) {
        return {
            horizontal: velocity.horizontal * Math.cos(angle) - velocity.vertical * Math.sin(angle),
            vertical: velocity.horizontal * Math.sin(angle) + velocity.vertical * Math.cos(angle),
        };
    }
    static collisionVelocity(v1, v2, m1, m2) {
        return {
            horizontal: (v1.horizontal * (m1 - m2)) / (m1 + m2) + (v2.horizontal * 2 * m2) / (m1 + m2),
            vertical: v1.vertical,
        };
    }
}
exports.NumberUtils = NumberUtils;

},{"../Enums/Directions":"../node_modules/tsparticles/dist/Enums/Directions/index.js"}],"../node_modules/tsparticles/dist/Utils/Utils.js":[function(require,module,exports) {
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const OutModeDirection_1 = require("../Enums/Directions/OutModeDirection");
const NumberUtils_1 = require("./NumberUtils");
function rectSideBounce(pSide, pOtherSide, rectSide, rectOtherSide, velocity, factor) {
    const res = { bounced: false };
    if (pOtherSide.min >= rectOtherSide.min &&
        pOtherSide.min <= rectOtherSide.max &&
        pOtherSide.max >= rectOtherSide.min &&
        pOtherSide.max <= rectOtherSide.max) {
        if ((pSide.max >= rectSide.min && pSide.max <= (rectSide.max + rectSide.min) / 2 && velocity > 0) ||
            (pSide.min <= rectSide.max && pSide.min > (rectSide.max + rectSide.min) / 2 && velocity < 0)) {
            res.velocity = velocity * -factor;
            res.bounced = true;
        }
    }
    return res;
}
function checkSelector(element, selectors) {
    if (selectors instanceof Array) {
        for (const selector of selectors) {
            if (element.matches(selector)) {
                return true;
            }
        }
        return false;
    }
    else {
        return element.matches(selectors);
    }
}
class Utils {
    static isSsr() {
        return typeof window === "undefined" || !window;
    }
    static get animate() {
        return Utils.isSsr()
            ? (callback) => setTimeout(callback)
            : (callback) => (window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                window.setTimeout)(callback);
    }
    static get cancelAnimation() {
        return Utils.isSsr()
            ? (handle) => clearTimeout(handle)
            : (handle) => (window.cancelAnimationFrame ||
                window.webkitCancelRequestAnimationFrame ||
                window.mozCancelRequestAnimationFrame ||
                window.oCancelRequestAnimationFrame ||
                window.msCancelRequestAnimationFrame ||
                window.clearTimeout)(handle);
    }
    static isInArray(value, array) {
        return value === array || (array instanceof Array && array.indexOf(value) > -1);
    }
    static loadFont(character) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield document.fonts.load(`${character.weight} 36px '${character.font}'`);
            }
            catch (_a) {
            }
        });
    }
    static arrayRandomIndex(array) {
        return Math.floor(Math.random() * array.length);
    }
    static itemFromArray(array, index, useIndex = true) {
        const fixedIndex = index !== undefined && useIndex ? index % array.length : Utils.arrayRandomIndex(array);
        return array[fixedIndex];
    }
    static isPointInside(point, size, radius, direction) {
        return Utils.areBoundsInside(Utils.calculateBounds(point, radius !== null && radius !== void 0 ? radius : 0), size, direction);
    }
    static areBoundsInside(bounds, size, direction) {
        let inside = true;
        if (!direction || direction === OutModeDirection_1.OutModeDirection.bottom) {
            inside = bounds.top < size.height;
        }
        if (inside && (!direction || direction === OutModeDirection_1.OutModeDirection.left)) {
            inside = bounds.right > 0;
        }
        if (inside && (!direction || direction === OutModeDirection_1.OutModeDirection.right)) {
            inside = bounds.left < size.width;
        }
        if (inside && (!direction || direction === OutModeDirection_1.OutModeDirection.top)) {
            inside = bounds.bottom > 0;
        }
        return inside;
    }
    static calculateBounds(point, radius) {
        return {
            bottom: point.y + radius,
            left: point.x - radius,
            right: point.x + radius,
            top: point.y - radius,
        };
    }
    static loadImage(source) {
        return new Promise((resolve, reject) => {
            if (!source) {
                reject("Error tsParticles - No image.src");
                return;
            }
            const image = {
                source: source,
                type: source.substr(source.length - 3),
            };
            const img = new Image();
            img.addEventListener("load", () => {
                image.element = img;
                resolve(image);
            });
            img.addEventListener("error", () => {
                reject(`Error tsParticles - loading image: ${source}`);
            });
            img.src = source;
        });
    }
    static downloadSvgImage(source) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!source) {
                throw new Error("Error tsParticles - No image.src");
            }
            const image = {
                source: source,
                type: source.substr(source.length - 3),
            };
            if (image.type !== "svg") {
                return Utils.loadImage(source);
            }
            const response = yield fetch(image.source);
            if (!response.ok) {
                throw new Error("Error tsParticles - Image not found");
            }
            image.svgData = yield response.text();
            return image;
        });
    }
    static deepExtend(destination, ...sources) {
        for (const source of sources) {
            if (source === undefined || source === null) {
                continue;
            }
            if (typeof source !== "object") {
                destination = source;
                continue;
            }
            const sourceIsArray = Array.isArray(source);
            if (sourceIsArray && (typeof destination !== "object" || !destination || !Array.isArray(destination))) {
                destination = [];
            }
            else if (!sourceIsArray &&
                (typeof destination !== "object" || !destination || Array.isArray(destination))) {
                destination = {};
            }
            for (const key in source) {
                if (key === "__proto__") {
                    continue;
                }
                const sourceDict = source;
                const value = sourceDict[key];
                const isObject = typeof value === "object";
                const destDict = destination;
                destDict[key] =
                    isObject && Array.isArray(value)
                        ? value.map((v) => Utils.deepExtend(destDict[key], v))
                        : Utils.deepExtend(destDict[key], value);
            }
        }
        return destination;
    }
    static isDivModeEnabled(mode, divs) {
        return divs instanceof Array
            ? !!divs.find((t) => t.enable && Utils.isInArray(mode, t.mode))
            : Utils.isInArray(mode, divs.mode);
    }
    static divModeExecute(mode, divs, callback) {
        if (divs instanceof Array) {
            for (const div of divs) {
                const divMode = div.mode;
                const divEnabled = div.enable;
                if (divEnabled && Utils.isInArray(mode, divMode)) {
                    Utils.singleDivModeExecute(div, callback);
                }
            }
        }
        else {
            const divMode = divs.mode;
            const divEnabled = divs.enable;
            if (divEnabled && Utils.isInArray(mode, divMode)) {
                Utils.singleDivModeExecute(divs, callback);
            }
        }
    }
    static singleDivModeExecute(div, callback) {
        const selectors = div.selectors;
        if (selectors instanceof Array) {
            for (const selector of selectors) {
                callback(selector, div);
            }
        }
        else {
            callback(selectors, div);
        }
    }
    static divMode(divs, element) {
        if (!element || !divs) {
            return;
        }
        if (divs instanceof Array) {
            return divs.find((d) => checkSelector(element, d.selectors));
        }
        else if (checkSelector(element, divs.selectors)) {
            return divs;
        }
    }
    static circleBounceDataFromParticle(p) {
        return {
            position: p.getPosition(),
            radius: p.getRadius(),
            velocity: p.velocity,
            factor: {
                horizontal: NumberUtils_1.NumberUtils.getValue(p.options.bounce.horizontal),
                vertical: NumberUtils_1.NumberUtils.getValue(p.options.bounce.vertical),
            },
        };
    }
    static circleBounce(p1, p2) {
        const xVelocityDiff = p1.velocity.horizontal;
        const yVelocityDiff = p1.velocity.vertical;
        const pos1 = p1.position;
        const pos2 = p2.position;
        const xDist = pos2.x - pos1.x;
        const yDist = pos2.y - pos1.y;
        if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
            const angle = -Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x);
            const m1 = p1.radius;
            const m2 = p2.radius;
            const u1 = NumberUtils_1.NumberUtils.rotateVelocity(p1.velocity, angle);
            const u2 = NumberUtils_1.NumberUtils.rotateVelocity(p2.velocity, angle);
            const v1 = NumberUtils_1.NumberUtils.collisionVelocity(u1, u2, m1, m2);
            const v2 = NumberUtils_1.NumberUtils.collisionVelocity(u2, u1, m1, m2);
            const vFinal1 = NumberUtils_1.NumberUtils.rotateVelocity(v1, -angle);
            const vFinal2 = NumberUtils_1.NumberUtils.rotateVelocity(v2, -angle);
            p1.velocity.horizontal = vFinal1.horizontal * p1.factor.horizontal;
            p1.velocity.vertical = vFinal1.vertical * p1.factor.vertical;
            p2.velocity.horizontal = vFinal2.horizontal * p2.factor.horizontal;
            p2.velocity.vertical = vFinal2.vertical * p2.factor.vertical;
        }
    }
    static rectBounce(particle, divBounds) {
        const pPos = particle.getPosition();
        const size = particle.getRadius();
        const bounds = Utils.calculateBounds(pPos, size);
        const resH = rectSideBounce({
            min: bounds.left,
            max: bounds.right,
        }, {
            min: bounds.top,
            max: bounds.bottom,
        }, {
            min: divBounds.left,
            max: divBounds.right,
        }, {
            min: divBounds.top,
            max: divBounds.bottom,
        }, particle.velocity.horizontal, NumberUtils_1.NumberUtils.getValue(particle.options.bounce.horizontal));
        if (resH.bounced) {
            if (resH.velocity !== undefined) {
                particle.velocity.horizontal = resH.velocity;
            }
            if (resH.position !== undefined) {
                particle.position.x = resH.position;
            }
        }
        const resV = rectSideBounce({
            min: bounds.top,
            max: bounds.bottom,
        }, {
            min: bounds.left,
            max: bounds.right,
        }, {
            min: divBounds.top,
            max: divBounds.bottom,
        }, {
            min: divBounds.left,
            max: divBounds.right,
        }, particle.velocity.vertical, NumberUtils_1.NumberUtils.getValue(particle.options.bounce.vertical));
        if (resV.bounced) {
            if (resV.velocity !== undefined) {
                particle.velocity.vertical = resV.velocity;
            }
            if (resV.position !== undefined) {
                particle.position.y = resV.position;
            }
        }
    }
}
exports.Utils = Utils;

},{"../Enums/Directions/OutModeDirection":"../node_modules/tsparticles/dist/Enums/Directions/OutModeDirection.js","./NumberUtils":"../node_modules/tsparticles/dist/Utils/NumberUtils.js"}],"../node_modules/tsparticles/dist/Utils/Constants.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = void 0;
class Constants {
}
exports.Constants = Constants;
Constants.canvasClass = "tsparticles-canvas-el";
Constants.randomColorValue = "random";
Constants.midColorValue = "mid";
Constants.touchEndEvent = "touchend";
Constants.mouseDownEvent = "mousedown";
Constants.mouseUpEvent = "mouseup";
Constants.mouseMoveEvent = "mousemove";
Constants.touchStartEvent = "touchstart";
Constants.touchMoveEvent = "touchmove";
Constants.mouseLeaveEvent = "mouseleave";
Constants.mouseOutEvent = "mouseout";
Constants.touchCancelEvent = "touchcancel";
Constants.resizeEvent = "resize";
Constants.visibilityChangeEvent = "visibilitychange";
Constants.noPolygonDataLoaded = "No polygon data loaded.";
Constants.noPolygonFound = "No polygon found, you need to specify SVG url in config.";

},{}],"../node_modules/tsparticles/dist/Utils/ColorUtils.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorUtils = void 0;
const Utils_1 = require("./Utils");
const Constants_1 = require("./Constants");
const NumberUtils_1 = require("./NumberUtils");
function hue2rgb(p, q, t) {
    let tCalc = t;
    if (tCalc < 0) {
        tCalc += 1;
    }
    if (tCalc > 1) {
        tCalc -= 1;
    }
    if (tCalc < 1 / 6) {
        return p + (q - p) * 6 * tCalc;
    }
    if (tCalc < 1 / 2) {
        return q;
    }
    if (tCalc < 2 / 3) {
        return p + (q - p) * (2 / 3 - tCalc) * 6;
    }
    return p;
}
function stringToRgba(input) {
    if (input.startsWith("rgb")) {
        const regex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([\d.]+)\s*)?\)/i;
        const result = regex.exec(input);
        return result
            ? {
                a: result.length > 4 ? parseFloat(result[5]) : 1,
                b: parseInt(result[3], 10),
                g: parseInt(result[2], 10),
                r: parseInt(result[1], 10),
            }
            : undefined;
    }
    else if (input.startsWith("hsl")) {
        const regex = /hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.]+)\s*)?\)/i;
        const result = regex.exec(input);
        return result
            ? ColorUtils.hslaToRgba({
                a: result.length > 4 ? parseFloat(result[5]) : 1,
                h: parseInt(result[1], 10),
                l: parseInt(result[3], 10),
                s: parseInt(result[2], 10),
            })
            : undefined;
    }
    else if (input.startsWith("hsv")) {
        const regex = /hsva?\(\s*(\d+)°\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.]+)\s*)?\)/i;
        const result = regex.exec(input);
        return result
            ? ColorUtils.hsvaToRgba({
                a: result.length > 4 ? parseFloat(result[5]) : 1,
                h: parseInt(result[1], 10),
                s: parseInt(result[2], 10),
                v: parseInt(result[3], 10),
            })
            : undefined;
    }
    else {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
        const hexFixed = input.replace(shorthandRegex, (_m, r, g, b, a) => {
            return r + r + g + g + b + b + (a !== undefined ? a + a : "");
        });
        const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
        const result = regex.exec(hexFixed);
        return result
            ? {
                a: result[4] !== undefined ? parseInt(result[4], 16) / 0xff : 1,
                b: parseInt(result[3], 16),
                g: parseInt(result[2], 16),
                r: parseInt(result[1], 16),
            }
            : undefined;
    }
}
class ColorUtils {
    static colorToRgb(input, index, useIndex = true) {
        var _a, _b, _c;
        if (input === undefined) {
            return;
        }
        const color = typeof input === "string" ? { value: input } : input;
        let res;
        if (typeof color.value === "string") {
            if (color.value === Constants_1.Constants.randomColorValue) {
                res = ColorUtils.getRandomRgbColor();
            }
            else {
                res = ColorUtils.stringToRgb(color.value);
            }
        }
        else {
            if (color.value instanceof Array) {
                const colorSelected = Utils_1.Utils.itemFromArray(color.value, index, useIndex);
                res = ColorUtils.colorToRgb({ value: colorSelected });
            }
            else {
                const colorValue = color.value;
                const rgbColor = (_a = colorValue.rgb) !== null && _a !== void 0 ? _a : color.value;
                if (rgbColor.r !== undefined) {
                    res = rgbColor;
                }
                else {
                    const hslColor = (_b = colorValue.hsl) !== null && _b !== void 0 ? _b : color.value;
                    if (hslColor.h !== undefined && hslColor.l !== undefined) {
                        res = ColorUtils.hslToRgb(hslColor);
                    }
                    else {
                        const hsvColor = (_c = colorValue.hsv) !== null && _c !== void 0 ? _c : color.value;
                        if (hsvColor.h !== undefined && hsvColor.v !== undefined) {
                            res = ColorUtils.hsvToRgb(hsvColor);
                        }
                    }
                }
            }
        }
        return res;
    }
    static colorToHsl(color, index, useIndex = true) {
        const rgb = ColorUtils.colorToRgb(color, index, useIndex);
        return rgb !== undefined ? ColorUtils.rgbToHsl(rgb) : undefined;
    }
    static rgbToHsl(color) {
        const r1 = color.r / 255;
        const g1 = color.g / 255;
        const b1 = color.b / 255;
        const max = Math.max(r1, g1, b1);
        const min = Math.min(r1, g1, b1);
        const res = {
            h: 0,
            l: (max + min) / 2,
            s: 0,
        };
        if (max != min) {
            res.s = res.l < 0.5 ? (max - min) / (max + min) : (max - min) / (2.0 - max - min);
            res.h =
                r1 === max
                    ? (g1 - b1) / (max - min)
                    : (res.h = g1 === max ? 2.0 + (b1 - r1) / (max - min) : 4.0 + (r1 - g1) / (max - min));
        }
        res.l *= 100;
        res.s *= 100;
        res.h *= 60;
        if (res.h < 0) {
            res.h += 360;
        }
        return res;
    }
    static stringToAlpha(input) {
        var _a;
        return (_a = stringToRgba(input)) === null || _a === void 0 ? void 0 : _a.a;
    }
    static stringToRgb(input) {
        return stringToRgba(input);
    }
    static hslToRgb(hsl) {
        const result = { b: 0, g: 0, r: 0 };
        const hslPercent = {
            h: hsl.h / 360,
            l: hsl.l / 100,
            s: hsl.s / 100,
        };
        if (hslPercent.s === 0) {
            result.b = hslPercent.l;
            result.g = hslPercent.l;
            result.r = hslPercent.l;
        }
        else {
            const q = hslPercent.l < 0.5
                ? hslPercent.l * (1 + hslPercent.s)
                : hslPercent.l + hslPercent.s - hslPercent.l * hslPercent.s;
            const p = 2 * hslPercent.l - q;
            result.r = hue2rgb(p, q, hslPercent.h + 1 / 3);
            result.g = hue2rgb(p, q, hslPercent.h);
            result.b = hue2rgb(p, q, hslPercent.h - 1 / 3);
        }
        result.r = Math.floor(result.r * 255);
        result.g = Math.floor(result.g * 255);
        result.b = Math.floor(result.b * 255);
        return result;
    }
    static hslaToRgba(hsla) {
        const rgbResult = ColorUtils.hslToRgb(hsla);
        return {
            a: hsla.a,
            b: rgbResult.b,
            g: rgbResult.g,
            r: rgbResult.r,
        };
    }
    static hslToHsv(hsl) {
        const l = hsl.l / 100, sl = hsl.s / 100;
        const v = l + sl * Math.min(l, 1 - l), sv = !v ? 0 : 2 * (1 - l / v);
        return {
            h: hsl.h,
            s: sv * 100,
            v: v * 100,
        };
    }
    static hslaToHsva(hsla) {
        const hsvResult = ColorUtils.hslToHsv(hsla);
        return {
            a: hsla.a,
            h: hsvResult.h,
            s: hsvResult.s,
            v: hsvResult.v,
        };
    }
    static hsvToHsl(hsv) {
        const v = hsv.v / 100, sv = hsv.s / 100;
        const l = v * (1 - sv / 2), sl = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);
        return {
            h: hsv.h,
            l: l * 100,
            s: sl * 100,
        };
    }
    static hsvaToHsla(hsva) {
        const hslResult = ColorUtils.hsvToHsl(hsva);
        return {
            a: hsva.a,
            h: hslResult.h,
            l: hslResult.l,
            s: hslResult.s,
        };
    }
    static hsvToRgb(hsv) {
        const result = { b: 0, g: 0, r: 0 };
        const hsvPercent = {
            h: hsv.h / 60,
            s: hsv.s / 100,
            v: hsv.v / 100,
        };
        const c = hsvPercent.v * hsvPercent.s, x = c * (1 - Math.abs((hsvPercent.h % 2) - 1));
        let tempRgb;
        if (hsvPercent.h >= 0 && hsvPercent.h <= 1) {
            tempRgb = {
                r: c,
                g: x,
                b: 0,
            };
        }
        else if (hsvPercent.h > 1 && hsvPercent.h <= 2) {
            tempRgb = {
                r: x,
                g: c,
                b: 0,
            };
        }
        else if (hsvPercent.h > 2 && hsvPercent.h <= 3) {
            tempRgb = {
                r: 0,
                g: c,
                b: x,
            };
        }
        else if (hsvPercent.h > 3 && hsvPercent.h <= 4) {
            tempRgb = {
                r: 0,
                g: x,
                b: c,
            };
        }
        else if (hsvPercent.h > 4 && hsvPercent.h <= 5) {
            tempRgb = {
                r: x,
                g: 0,
                b: c,
            };
        }
        else if (hsvPercent.h > 5 && hsvPercent.h <= 6) {
            tempRgb = {
                r: c,
                g: 0,
                b: x,
            };
        }
        if (tempRgb) {
            const m = hsvPercent.v - c;
            result.r = Math.floor((tempRgb.r + m) * 255);
            result.g = Math.floor((tempRgb.g + m) * 255);
            result.b = Math.floor((tempRgb.b + m) * 255);
        }
        return result;
    }
    static hsvaToRgba(hsva) {
        const rgbResult = ColorUtils.hsvToRgb(hsva);
        return {
            a: hsva.a,
            b: rgbResult.b,
            g: rgbResult.g,
            r: rgbResult.r,
        };
    }
    static rgbToHsv(rgb) {
        const rgbPercent = {
            r: rgb.r / 255,
            g: rgb.g / 255,
            b: rgb.b / 255,
        }, xMax = Math.max(rgbPercent.r, rgbPercent.g, rgbPercent.b), xMin = Math.min(rgbPercent.r, rgbPercent.g, rgbPercent.b), v = xMax, c = xMax - xMin;
        let h = 0;
        if (v === rgbPercent.r) {
            h = 60 * ((rgbPercent.g - rgbPercent.b) / c);
        }
        else if (v === rgbPercent.g) {
            h = 60 * (2 + (rgbPercent.b - rgbPercent.r) / c);
        }
        else if (v === rgbPercent.b) {
            h = 60 * (4 + (rgbPercent.r - rgbPercent.g) / c);
        }
        const s = !v ? 0 : c / v;
        return {
            h,
            s: s * 100,
            v: v * 100,
        };
    }
    static rgbaToHsva(rgba) {
        const hsvResult = ColorUtils.rgbToHsv(rgba);
        return {
            a: rgba.a,
            h: hsvResult.h,
            s: hsvResult.s,
            v: hsvResult.v,
        };
    }
    static getRandomRgbColor(min) {
        const fixedMin = min !== null && min !== void 0 ? min : 0;
        return {
            b: Math.floor(NumberUtils_1.NumberUtils.randomInRange(NumberUtils_1.NumberUtils.setRangeValue(fixedMin, 256))),
            g: Math.floor(NumberUtils_1.NumberUtils.randomInRange(NumberUtils_1.NumberUtils.setRangeValue(fixedMin, 256))),
            r: Math.floor(NumberUtils_1.NumberUtils.randomInRange(NumberUtils_1.NumberUtils.setRangeValue(fixedMin, 256))),
        };
    }
    static getStyleFromRgb(color, opacity) {
        return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity !== null && opacity !== void 0 ? opacity : 1})`;
    }
    static getStyleFromHsl(color, opacity) {
        return `hsla(${color.h}, ${color.s}%, ${color.l}%, ${opacity !== null && opacity !== void 0 ? opacity : 1})`;
    }
    static getStyleFromHsv(color, opacity) {
        return ColorUtils.getStyleFromHsl(ColorUtils.hsvToHsl(color), opacity);
    }
    static mix(color1, color2, size1, size2) {
        let rgb1 = color1;
        let rgb2 = color2;
        if (rgb1.r === undefined) {
            rgb1 = ColorUtils.hslToRgb(color1);
        }
        if (rgb2.r === undefined) {
            rgb2 = ColorUtils.hslToRgb(color2);
        }
        return {
            b: NumberUtils_1.NumberUtils.mix(rgb1.b, rgb2.b, size1, size2),
            g: NumberUtils_1.NumberUtils.mix(rgb1.g, rgb2.g, size1, size2),
            r: NumberUtils_1.NumberUtils.mix(rgb1.r, rgb2.r, size1, size2),
        };
    }
    static replaceColorSvg(image, color, opacity) {
        if (!image.svgData) {
            return "";
        }
        const svgXml = image.svgData;
        const rgbHex = /#([0-9A-F]{3,6})/gi;
        return svgXml.replace(rgbHex, () => ColorUtils.getStyleFromHsl(color, opacity));
    }
    static getLinkColor(p1, p2, linkColor) {
        var _a, _b;
        if (linkColor === Constants_1.Constants.randomColorValue) {
            return ColorUtils.getRandomRgbColor();
        }
        else if (linkColor === "mid") {
            const sourceColor = (_a = p1.getFillColor()) !== null && _a !== void 0 ? _a : p1.getStrokeColor();
            const destColor = (_b = p2 === null || p2 === void 0 ? void 0 : p2.getFillColor()) !== null && _b !== void 0 ? _b : p2 === null || p2 === void 0 ? void 0 : p2.getStrokeColor();
            if (sourceColor && destColor && p2) {
                return ColorUtils.mix(sourceColor, destColor, p1.getRadius(), p2.getRadius());
            }
            else {
                const hslColor = sourceColor !== null && sourceColor !== void 0 ? sourceColor : destColor;
                if (hslColor) {
                    return ColorUtils.hslToRgb(hslColor);
                }
            }
        }
        else {
            return linkColor;
        }
    }
    static getLinkRandomColor(optColor, blink, consent) {
        const color = typeof optColor === "string" ? optColor : optColor.value;
        if (color === Constants_1.Constants.randomColorValue) {
            if (consent) {
                return ColorUtils.colorToRgb({
                    value: color,
                });
            }
            else if (blink) {
                return Constants_1.Constants.randomColorValue;
            }
            else {
                return Constants_1.Constants.midColorValue;
            }
        }
        else {
            return ColorUtils.colorToRgb({
                value: color,
            });
        }
    }
    static getHslFromAnimation(animation) {
        return animation !== undefined
            ? {
                h: animation.h.value,
                s: animation.s.value,
                l: animation.l.value,
            }
            : undefined;
    }
}
exports.ColorUtils = ColorUtils;

},{"./Utils":"../node_modules/tsparticles/dist/Utils/Utils.js","./Constants":"../node_modules/tsparticles/dist/Utils/Constants.js","./NumberUtils":"../node_modules/tsparticles/dist/Utils/NumberUtils.js"}],"../node_modules/tsparticles/dist/Utils/CanvasUtils.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasUtils = void 0;
const ColorUtils_1 = require("./ColorUtils");
const NumberUtils_1 = require("./NumberUtils");
function drawLine(context, begin, end) {
    context.beginPath();
    context.moveTo(begin.x, begin.y);
    context.lineTo(end.x, end.y);
    context.closePath();
}
function drawTriangle(context, p1, p2, p3) {
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.lineTo(p3.x, p3.y);
    context.closePath();
}
class CanvasUtils {
    static paintBase(context, dimension, baseColor) {
        context.save();
        context.fillStyle = baseColor !== null && baseColor !== void 0 ? baseColor : "rgba(0,0,0,0)";
        context.fillRect(0, 0, dimension.width, dimension.height);
        context.restore();
    }
    static clear(context, dimension) {
        context.clearRect(0, 0, dimension.width, dimension.height);
    }
    static drawLinkLine(context, width, begin, end, maxDistance, canvasSize, warp, backgroundMask, composite, colorLine, opacity, shadow) {
        let drawn = false;
        if (NumberUtils_1.NumberUtils.getDistance(begin, end) <= maxDistance) {
            drawLine(context, begin, end);
            drawn = true;
        }
        else if (warp) {
            let pi1;
            let pi2;
            const endNE = {
                x: end.x - canvasSize.width,
                y: end.y,
            };
            const d1 = NumberUtils_1.NumberUtils.getDistances(begin, endNE);
            if (d1.distance <= maxDistance) {
                const yi = begin.y - (d1.dy / d1.dx) * begin.x;
                pi1 = { x: 0, y: yi };
                pi2 = { x: canvasSize.width, y: yi };
            }
            else {
                const endSW = {
                    x: end.x,
                    y: end.y - canvasSize.height,
                };
                const d2 = NumberUtils_1.NumberUtils.getDistances(begin, endSW);
                if (d2.distance <= maxDistance) {
                    const yi = begin.y - (d2.dy / d2.dx) * begin.x;
                    const xi = -yi / (d2.dy / d2.dx);
                    pi1 = { x: xi, y: 0 };
                    pi2 = { x: xi, y: canvasSize.height };
                }
                else {
                    const endSE = {
                        x: end.x - canvasSize.width,
                        y: end.y - canvasSize.height,
                    };
                    const d3 = NumberUtils_1.NumberUtils.getDistances(begin, endSE);
                    if (d3.distance <= maxDistance) {
                        const yi = begin.y - (d3.dy / d3.dx) * begin.x;
                        const xi = -yi / (d3.dy / d3.dx);
                        pi1 = { x: xi, y: yi };
                        pi2 = { x: pi1.x + canvasSize.width, y: pi1.y + canvasSize.height };
                    }
                }
            }
            if (pi1 && pi2) {
                drawLine(context, begin, pi1);
                drawLine(context, end, pi2);
                drawn = true;
            }
        }
        if (!drawn) {
            return;
        }
        context.lineWidth = width;
        if (backgroundMask) {
            context.globalCompositeOperation = composite;
        }
        context.strokeStyle = ColorUtils_1.ColorUtils.getStyleFromRgb(colorLine, opacity);
        if (shadow.enable) {
            const shadowColor = ColorUtils_1.ColorUtils.colorToRgb(shadow.color);
            if (shadowColor) {
                context.shadowBlur = shadow.blur;
                context.shadowColor = ColorUtils_1.ColorUtils.getStyleFromRgb(shadowColor);
            }
        }
        context.stroke();
    }
    static drawLinkTriangle(context, pos1, pos2, pos3, backgroundMask, composite, colorTriangle, opacityTriangle) {
        drawTriangle(context, pos1, pos2, pos3);
        if (backgroundMask) {
            context.globalCompositeOperation = composite;
        }
        context.fillStyle = ColorUtils_1.ColorUtils.getStyleFromRgb(colorTriangle, opacityTriangle);
        context.fill();
    }
    static drawConnectLine(context, width, lineStyle, begin, end) {
        context.save();
        drawLine(context, begin, end);
        context.lineWidth = width;
        context.strokeStyle = lineStyle;
        context.stroke();
        context.restore();
    }
    static gradient(context, p1, p2, opacity) {
        const gradStop = Math.floor(p2.getRadius() / p1.getRadius());
        const color1 = p1.getFillColor();
        const color2 = p2.getFillColor();
        if (!color1 || !color2) {
            return;
        }
        const sourcePos = p1.getPosition();
        const destPos = p2.getPosition();
        const midRgb = ColorUtils_1.ColorUtils.mix(color1, color2, p1.getRadius(), p2.getRadius());
        const grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);
        grad.addColorStop(0, ColorUtils_1.ColorUtils.getStyleFromHsl(color1, opacity));
        grad.addColorStop(gradStop > 1 ? 1 : gradStop, ColorUtils_1.ColorUtils.getStyleFromRgb(midRgb, opacity));
        grad.addColorStop(1, ColorUtils_1.ColorUtils.getStyleFromHsl(color2, opacity));
        return grad;
    }
    static drawGrabLine(context, width, begin, end, colorLine, opacity) {
        context.save();
        drawLine(context, begin, end);
        context.strokeStyle = ColorUtils_1.ColorUtils.getStyleFromRgb(colorLine, opacity);
        context.lineWidth = width;
        context.stroke();
        context.restore();
    }
    static drawLight(container, context, mousePos) {
        const lightOptions = container.actualOptions.interactivity.modes.light.area;
        context.beginPath();
        context.arc(mousePos.x, mousePos.y, lightOptions.radius, 0, 2 * Math.PI);
        const gradientAmbientLight = context.createRadialGradient(mousePos.x, mousePos.y, 0, mousePos.x, mousePos.y, lightOptions.radius);
        const gradient = lightOptions.gradient;
        const gradientRgb = {
            start: ColorUtils_1.ColorUtils.colorToRgb(gradient.start),
            stop: ColorUtils_1.ColorUtils.colorToRgb(gradient.stop),
        };
        if (!gradientRgb.start || !gradientRgb.stop) {
            return;
        }
        gradientAmbientLight.addColorStop(0, ColorUtils_1.ColorUtils.getStyleFromRgb(gradientRgb.start));
        gradientAmbientLight.addColorStop(1, ColorUtils_1.ColorUtils.getStyleFromRgb(gradientRgb.stop));
        context.fillStyle = gradientAmbientLight;
        context.fill();
    }
    static drawParticleShadow(container, context, particle, mousePos) {
        const pos = particle.getPosition();
        const shadowOptions = container.actualOptions.interactivity.modes.light.shadow;
        context.save();
        const radius = particle.getRadius();
        const sides = particle.sides;
        const full = (Math.PI * 2) / sides;
        const angle = -particle.rotate.value + Math.PI / 4;
        const factor = 1;
        const dots = [];
        for (let i = 0; i < sides; i++) {
            dots.push({
                x: pos.x + radius * Math.sin(angle + full * i) * factor,
                y: pos.y + radius * Math.cos(angle + full * i) * factor,
            });
        }
        const points = [];
        const shadowLength = shadowOptions.length;
        for (const dot of dots) {
            const dotAngle = Math.atan2(mousePos.y - dot.y, mousePos.x - dot.x);
            const endX = dot.x + shadowLength * Math.sin(-dotAngle - Math.PI / 2);
            const endY = dot.y + shadowLength * Math.cos(-dotAngle - Math.PI / 2);
            points.push({
                endX: endX,
                endY: endY,
                startX: dot.x,
                startY: dot.y,
            });
        }
        const shadowRgb = ColorUtils_1.ColorUtils.colorToRgb(shadowOptions.color);
        if (!shadowRgb) {
            return;
        }
        const shadowColor = ColorUtils_1.ColorUtils.getStyleFromRgb(shadowRgb);
        for (let i = points.length - 1; i >= 0; i--) {
            const n = i == points.length - 1 ? 0 : i + 1;
            context.beginPath();
            context.moveTo(points[i].startX, points[i].startY);
            context.lineTo(points[n].startX, points[n].startY);
            context.lineTo(points[n].endX, points[n].endY);
            context.lineTo(points[i].endX, points[i].endY);
            context.fillStyle = shadowColor;
            context.fill();
        }
        context.restore();
    }
    static drawParticle(container, context, particle, delta, fillColorValue, strokeColorValue, backgroundMask, composite, radius, opacity, shadow) {
        const pos = particle.getPosition();
        context.save();
        context.translate(pos.x, pos.y);
        context.beginPath();
        const angle = particle.rotate.value + (particle.options.rotate.path ? particle.pathAngle : 0);
        if (angle !== 0) {
            context.rotate(angle);
        }
        if (backgroundMask) {
            context.globalCompositeOperation = composite;
        }
        const shadowColor = particle.shadowColor;
        if (shadow.enable && shadowColor) {
            context.shadowBlur = shadow.blur;
            context.shadowColor = ColorUtils_1.ColorUtils.getStyleFromRgb(shadowColor);
            context.shadowOffsetX = shadow.offset.x;
            context.shadowOffsetY = shadow.offset.y;
        }
        if (fillColorValue) {
            context.fillStyle = fillColorValue;
        }
        const stroke = particle.stroke;
        context.lineWidth = particle.strokeWidth;
        if (strokeColorValue) {
            context.strokeStyle = strokeColorValue;
        }
        CanvasUtils.drawShape(container, context, particle, radius, opacity, delta);
        if (stroke.width > 0) {
            context.stroke();
        }
        if (particle.close) {
            context.closePath();
        }
        if (particle.fill) {
            context.fill();
        }
        context.restore();
        context.save();
        context.translate(pos.x, pos.y);
        if (angle !== 0) {
            context.rotate(angle);
        }
        if (backgroundMask) {
            context.globalCompositeOperation = composite;
        }
        CanvasUtils.drawShapeAfterEffect(container, context, particle, radius, opacity, delta);
        context.restore();
    }
    static drawShape(container, context, particle, radius, opacity, delta) {
        if (!particle.shape) {
            return;
        }
        const drawer = container.drawers.get(particle.shape);
        if (!drawer) {
            return;
        }
        drawer.draw(context, particle, radius, opacity, delta.value, container.retina.pixelRatio);
    }
    static drawShapeAfterEffect(container, context, particle, radius, opacity, delta) {
        if (!particle.shape) {
            return;
        }
        const drawer = container.drawers.get(particle.shape);
        if (!(drawer === null || drawer === void 0 ? void 0 : drawer.afterEffect)) {
            return;
        }
        drawer.afterEffect(context, particle, radius, opacity, delta.value, container.retina.pixelRatio);
    }
    static drawPlugin(context, plugin, delta) {
        if (plugin.draw !== undefined) {
            context.save();
            plugin.draw(context, delta);
            context.restore();
        }
    }
}
exports.CanvasUtils = CanvasUtils;

},{"./ColorUtils":"../node_modules/tsparticles/dist/Utils/ColorUtils.js","./NumberUtils":"../node_modules/tsparticles/dist/Utils/NumberUtils.js"}],"../node_modules/tsparticles/dist/Utils/Range.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Range = void 0;
class Range {
    constructor(x, y) {
        this.position = {
            x: x,
            y: y,
        };
    }
}
exports.Range = Range;

},{}],"../node_modules/tsparticles/dist/Utils/Circle.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
const Range_1 = require("./Range");
class Circle extends Range_1.Range {
    constructor(x, y, radius) {
        super(x, y);
        this.radius = radius;
    }
    contains(point) {
        const d = Math.pow(point.x - this.position.x, 2) + Math.pow(point.y - this.position.y, 2);
        return d <= this.radius * this.radius;
    }
    intersects(range) {
        const rect = range;
        const circle = range;
        const pos1 = this.position;
        const pos2 = range.position;
        const xDist = Math.abs(pos2.x - pos1.x);
        const yDist = Math.abs(pos2.y - pos1.y);
        const r = this.radius;
        if (circle.radius !== undefined) {
            const rSum = r + circle.radius;
            const dist = Math.sqrt(xDist * xDist + yDist + yDist);
            return rSum > dist;
        }
        else if (rect.size !== undefined) {
            const w = rect.size.width;
            const h = rect.size.height;
            const edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2);
            if (xDist > r + w || yDist > r + h) {
                return false;
            }
            if (xDist <= w || yDist <= h) {
                return true;
            }
            return edges <= r * r;
        }
        return false;
    }
}
exports.Circle = Circle;

},{"./Range":"../node_modules/tsparticles/dist/Utils/Range.js"}],"../node_modules/tsparticles/dist/Utils/Rectangle.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
const Range_1 = require("./Range");
class Rectangle extends Range_1.Range {
    constructor(x, y, width, height) {
        super(x, y);
        this.size = {
            height: height,
            width: width,
        };
    }
    contains(point) {
        const w = this.size.width;
        const h = this.size.height;
        const pos = this.position;
        return point.x >= pos.x && point.x <= pos.x + w && point.y >= pos.y && point.y <= pos.y + h;
    }
    intersects(range) {
        const rect = range;
        const circle = range;
        const w = this.size.width;
        const h = this.size.height;
        const pos1 = this.position;
        const pos2 = range.position;
        if (circle.radius !== undefined) {
            return circle.intersects(this);
        }
        else if (rect.size !== undefined) {
            const size2 = rect.size;
            const w2 = size2.width;
            const h2 = size2.height;
            return pos2.x < pos1.x + w && pos2.x + w2 > pos1.x && pos2.y < pos1.y + h && pos2.y + h2 > pos1.y;
        }
        return false;
    }
}
exports.Rectangle = Rectangle;

},{"./Range":"../node_modules/tsparticles/dist/Utils/Range.js"}],"../node_modules/tsparticles/dist/Utils/CircleWarp.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircleWarp = void 0;
const Rectangle_1 = require("./Rectangle");
const Circle_1 = require("./Circle");
class CircleWarp extends Circle_1.Circle {
    constructor(x, y, radius, canvasSize) {
        super(x, y, radius);
        this.canvasSize = canvasSize;
        this.canvasSize = {
            height: canvasSize.height,
            width: canvasSize.width,
        };
    }
    contains(point) {
        if (super.contains(point)) {
            return true;
        }
        const posNE = {
            x: point.x - this.canvasSize.width,
            y: point.y,
        };
        if (super.contains(posNE)) {
            return true;
        }
        const posSE = {
            x: point.x - this.canvasSize.width,
            y: point.y - this.canvasSize.height,
        };
        if (super.contains(posSE)) {
            return true;
        }
        const posSW = {
            x: point.x,
            y: point.y - this.canvasSize.height,
        };
        return super.contains(posSW);
    }
    intersects(range) {
        if (super.intersects(range)) {
            return true;
        }
        const rect = range;
        const circle = range;
        const newPos = {
            x: range.position.x - this.canvasSize.width,
            y: range.position.y - this.canvasSize.height,
        };
        if (circle.radius !== undefined) {
            const biggerCircle = new Circle_1.Circle(newPos.x, newPos.y, circle.radius * 2);
            return super.intersects(biggerCircle);
        }
        else if (rect.size !== undefined) {
            const rectSW = new Rectangle_1.Rectangle(newPos.x, newPos.y, rect.size.width * 2, rect.size.height * 2);
            return super.intersects(rectSW);
        }
        return false;
    }
}
exports.CircleWarp = CircleWarp;

},{"./Rectangle":"../node_modules/tsparticles/dist/Utils/Rectangle.js","./Circle":"../node_modules/tsparticles/dist/Utils/Circle.js"}],"../node_modules/tsparticles/dist/Enums/Modes/ClickMode.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClickMode = void 0;
var ClickMode;
(function (ClickMode) {
    ClickMode["attract"] = "attract";
    ClickMode["bubble"] = "bubble";
    ClickMode["push"] = "push";
    ClickMode["remove"] = "remove";
    ClickMode["repulse"] = "repulse";
    ClickMode["pause"] = "pause";
    ClickMode["trail"] = "trail";
})(ClickMode = exports.ClickMode || (exports.ClickMode = {}));

},{}],"../node_modules/tsparticles/dist/Enums/Modes/DivMode.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DivMode = void 0;
var DivMode;
(function (DivMode) {
    DivMode["bounce"] = "bounce";
    DivMode["bubble"] = "bubble";
    DivMode["repulse"] = "repulse";
})(DivMode = exports.DivMode || (exports.DivMode = {}));

},{}],"../node_modules/tsparticles/dist/Enums/Modes/HoverMode.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoverMode = void 0;
var HoverMode;
(function (HoverMode) {
    HoverMode["attract"] = "attract";
    HoverMode["bounce"] = "bounce";
    HoverMode["bubble"] = "bubble";
    HoverMode["connect"] = "connect";
    HoverMode["grab"] = "grab";
    HoverMode["light"] = "light";
    HoverMode["repulse"] = "repulse";
    HoverMode["slow"] = "slow";
    HoverMode["trail"] = "trail";
})(HoverMode = exports.HoverMode || (exports.HoverMode = {}));

},{}],"../node_modules/tsparticles/dist/Enums/Modes/CollisionMode.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollisionMode = void 0;
var CollisionMode;
(function (CollisionMode) {
    CollisionMode["absorb"] = "absorb";
    CollisionMode["bounce"] = "bounce";
    CollisionMode["destroy"] = "destroy";
})(CollisionMode = exports.CollisionMode || (exports.CollisionMode = {}));

},{}],"../node_modules/tsparticles/dist/Enums/Modes/OutMode.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutMode = void 0;
var OutMode;
(function (OutMode) {
    OutMode["bounce"] = "bounce";
    OutMode["bounceHorizontal"] = "bounce-horizontal";
    OutMode["bounceVertical"] = "bounce-vertical";
    OutMode["none"] = "none";
    OutMode["out"] = "out";
    OutMode["destroy"] = "destroy";
})(OutMode = exports.OutMode || (exports.OutMode = {}));

},{}],"../node_modules/tsparticles/dist/Enums/Modes/SizeMode.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeMode = void 0;
var SizeMode;
(function (SizeMode) {
    SizeMode["precise"] = "precise";
    SizeMode["percent"] = "percent";
})(SizeMode = exports.SizeMode || (exports.SizeMode = {}));

},{}],"../node_modules/tsparticles/dist/Enums/Modes/ThemeMode.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeMode = void 0;
var ThemeMode;
(function (ThemeMode) {
    ThemeMode["any"] = "any";
    ThemeMode["dark"] = "dark";
    ThemeMode["light"] = "light";
})(ThemeMode = exports.ThemeMode || (exports.ThemeMode = {}));

},{}],"../node_modules/tsparticles/dist/Enums/Modes/index.js":[function(require,module,exports) {
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./ClickMode"), exports);
__exportStar(require("./DivMode"), exports);
__exportStar(require("./HoverMode"), exports);
__exportStar(require("./CollisionMode"), exports);
__exportStar(require("./OutMode"), exports);
__exportStar(require("./SizeMode"), exports);
__exportStar(require("./ThemeMode"), exports);

},{"./ClickMode":"../node_modules/tsparticles/dist/Enums/Modes/ClickMode.js","./DivMode":"../node_modules/tsparticles/dist/Enums/Modes/DivMode.js","./HoverMode":"../node_modules/tsparticles/dist/Enums/Modes/HoverMode.js","./CollisionMode":"../node_modules/tsparticles/dist/Enums/Modes/CollisionMode.js","./OutMode":"../node_modules/tsparticles/dist/Enums/Modes/OutMode.js","./SizeMode":"../node_modules/tsparticles/dist/Enums/Modes/SizeMode.js","./ThemeMode":"../node_modules/tsparticles/dist/Enums/Modes/ThemeMode.js"}],"../node_modules/tsparticles/dist/Enums/AnimationStatus.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimationStatus = void 0;
var AnimationStatus;
(function (AnimationStatus) {
    AnimationStatus[AnimationStatus["increasing"] = 0] = "increasing";
    AnimationStatus[AnimationStatus["decreasing"] = 1] = "decreasing";
})(AnimationStatus = exports.AnimationStatus || (exports.AnimationStatus = {}));

},{}],"../node_modules/tsparticles/dist/Enums/Types/DestroyType.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestroyType = void 0;
var DestroyType;
(function (DestroyType) {
    DestroyType["none"] = "none";
    DestroyType["max"] = "max";
    DestroyType["min"] = "min";
})(DestroyType = exports.DestroyType || (exports.DestroyType = {}));

},{}],"../node_modules/tsparticles/dist/Enums/Types/ProcessBubbleType.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessBubbleType = void 0;
var ProcessBubbleType;
(function (ProcessBubbleType) {
    ProcessBubbleType["color"] = "color";
    ProcessBubbleType["opacity"] = "opacity";
    ProcessBubbleType["size"] = "size";
})(ProcessBubbleType = exports.ProcessBubbleType || (exports.ProcessBubbleType = {}));

},{}],"../node_modules/tsparticles/dist/Enums/Types/ShapeType.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeType = void 0;
var ShapeType;
(function (ShapeType) {
    ShapeType["char"] = "char";
    ShapeType["character"] = "character";
    ShapeType["circle"] = "circle";
    ShapeType["edge"] = "edge";
    ShapeType["image"] = "image";
    ShapeType["images"] = "images";
    ShapeType["line"] = "line";
    ShapeType["polygon"] = "polygon";
    ShapeType["square"] = "square";
    ShapeType["star"] = "star";
    ShapeType["triangle"] = "triangle";
})(ShapeType = exports.ShapeType || (exports.ShapeType = {}));

},{}],"../node_modules/tsparticles/dist/Enums/Types/StartValueType.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartValueType = void 0;
var StartValueType;
(function (StartValueType) {
    StartValueType["max"] = "max";
    StartValueType["min"] = "min";
    StartValueType["random"] = "random";
})(StartValueType = exports.StartValueType || (exports.StartValueType = {}));

},{}],"../node_modules/tsparticles/dist/Enums/Types/DivType.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DivType = void 0;
var DivType;
(function (DivType) {
    DivType["circle"] = "circle";
    DivType["rectangle"] = "rectangle";
})(DivType = exports.DivType || (exports.DivType = {}));

},{}],"../node_modules/tsparticles/dist/Enums/Types/index.js":[function(require,module,exports) {
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./DestroyType"), exports);
__exportStar(require("./ProcessBubbleType"), exports);
__exportStar(require("./ShapeType"), exports);
__exportStar(require("./StartValueType"), exports);
__exportStar(require("./DivType"), exports);

},{"./DestroyType":"../node_modules/tsparticles/dist/Enums/Types/DestroyType.js","./ProcessBubbleType":"../node_modules/tsparticles/dist/Enums/Types/ProcessBubbleType.js","./ShapeType":"../node_modules/tsparticles/dist/Enums/Types/ShapeType.js","./StartValueType":"../node_modules/tsparticles/dist/Enums/Types/StartValueType.js","./DivType":"../node_modules/tsparticles/dist/Enums/Types/DivType.js"}],"../node_modules/tsparticles/dist/Enums/InteractivityDetect.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractivityDetect = void 0;
var InteractivityDetect;
(function (InteractivityDetect) {
    InteractivityDetect["canvas"] = "canvas";
    InteractivityDetect["parent"] = "parent";
    InteractivityDetect["window"] = "window";
})(InteractivityDetect = exports.InteractivityDetect || (exports.InteractivityDetect = {}));

},{}],"../node_modules/tsparticles/dist/Enums/index.js":[function(require,module,exports) {
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Directions"), exports);
__exportStar(require("./Modes"), exports);
__exportStar(require("./AnimationStatus"), exports);
__exportStar(require("./Types"), exports);
__exportStar(require("./InteractivityDetect"), exports);

},{"./Directions":"../node_modules/tsparticles/dist/Enums/Directions/index.js","./Modes":"../node_modules/tsparticles/dist/Enums/Modes/index.js","./AnimationStatus":"../node_modules/tsparticles/dist/Enums/AnimationStatus.js","./Types":"../node_modules/tsparticles/dist/Enums/Types/index.js","./InteractivityDetect":"../node_modules/tsparticles/dist/Enums/InteractivityDetect.js"}],"../node_modules/tsparticles/dist/Utils/EventListeners.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventListeners = void 0;
const Enums_1 = require("../Enums");
const Constants_1 = require("./Constants");
function manageListener(element, event, handler, add, options) {
    if (add) {
        let addOptions = { passive: true };
        if (typeof options === "boolean") {
            addOptions.capture = options;
        }
        else if (options !== undefined) {
            addOptions = options;
        }
        element.addEventListener(event, handler, addOptions);
    }
    else {
        const removeOptions = options;
        element.removeEventListener(event, handler, removeOptions);
    }
}
class EventListeners {
    constructor(container) {
        this.container = container;
        this.canPush = true;
        this.mouseMoveHandler = (e) => this.mouseTouchMove(e);
        this.touchStartHandler = (e) => this.mouseTouchMove(e);
        this.touchMoveHandler = (e) => this.mouseTouchMove(e);
        this.touchEndHandler = () => this.mouseTouchFinish();
        this.mouseLeaveHandler = () => this.mouseTouchFinish();
        this.touchCancelHandler = () => this.mouseTouchFinish();
        this.touchEndClickHandler = (e) => this.mouseTouchClick(e);
        this.mouseUpHandler = (e) => this.mouseTouchClick(e);
        this.mouseDownHandler = () => this.mouseDown();
        this.visibilityChangeHandler = () => this.handleVisibilityChange();
        this.resizeHandler = () => this.handleWindowResize();
    }
    addListeners() {
        this.manageListeners(true);
    }
    removeListeners() {
        this.manageListeners(false);
    }
    manageListeners(add) {
        var _a;
        const container = this.container;
        const options = container.actualOptions;
        const detectType = options.interactivity.detectsOn;
        let mouseLeaveEvent = Constants_1.Constants.mouseLeaveEvent;
        if (detectType === Enums_1.InteractivityDetect.window) {
            container.interactivity.element = window;
            mouseLeaveEvent = Constants_1.Constants.mouseOutEvent;
        }
        else if (detectType === Enums_1.InteractivityDetect.parent && container.canvas.element) {
            const canvasEl = container.canvas.element;
            container.interactivity.element = (_a = canvasEl.parentElement) !== null && _a !== void 0 ? _a : canvasEl.parentNode;
        }
        else {
            container.interactivity.element = container.canvas.element;
        }
        const interactivityEl = container.interactivity.element;
        if (!interactivityEl) {
            return;
        }
        const html = interactivityEl;
        if (options.interactivity.events.onHover.enable || options.interactivity.events.onClick.enable) {
            manageListener(interactivityEl, Constants_1.Constants.mouseMoveEvent, this.mouseMoveHandler, add);
            manageListener(interactivityEl, Constants_1.Constants.touchStartEvent, this.touchStartHandler, add);
            manageListener(interactivityEl, Constants_1.Constants.touchMoveEvent, this.touchMoveHandler, add);
            if (!options.interactivity.events.onClick.enable) {
                manageListener(interactivityEl, Constants_1.Constants.touchEndEvent, this.touchEndHandler, add);
            }
            else {
                manageListener(interactivityEl, Constants_1.Constants.touchEndEvent, this.touchEndClickHandler, add);
                manageListener(interactivityEl, Constants_1.Constants.mouseUpEvent, this.mouseUpHandler, add);
                manageListener(interactivityEl, Constants_1.Constants.mouseDownEvent, this.mouseDownHandler, add);
            }
            manageListener(interactivityEl, mouseLeaveEvent, this.mouseLeaveHandler, add);
            manageListener(interactivityEl, Constants_1.Constants.touchCancelEvent, this.touchCancelHandler, add);
        }
        if (container.canvas.element) {
            container.canvas.element.style.pointerEvents = html === container.canvas.element ? "initial" : "none";
        }
        if (options.interactivity.events.resize) {
            manageListener(window, Constants_1.Constants.resizeEvent, this.resizeHandler, add);
        }
        if (document) {
            manageListener(document, Constants_1.Constants.visibilityChangeEvent, this.visibilityChangeHandler, add, false);
        }
    }
    handleWindowResize() {
        var _a;
        (_a = this.container.canvas) === null || _a === void 0 ? void 0 : _a.windowResize();
    }
    handleVisibilityChange() {
        const container = this.container;
        const options = container.actualOptions;
        this.mouseTouchFinish();
        if (!options.pauseOnBlur) {
            return;
        }
        if (document === null || document === void 0 ? void 0 : document.hidden) {
            container.pageHidden = true;
            container.pause();
        }
        else {
            container.pageHidden = false;
            if (container.getAnimationStatus()) {
                container.play(true);
            }
            else {
                container.draw();
            }
        }
    }
    mouseDown() {
        const interactivity = this.container.interactivity;
        if (interactivity) {
            const mouse = interactivity.mouse;
            mouse.clicking = true;
            mouse.downPosition = mouse.position;
        }
    }
    mouseTouchMove(e) {
        var _a, _b, _c, _d, _e, _f, _g;
        const container = this.container;
        const options = container.actualOptions;
        if (((_a = container.interactivity) === null || _a === void 0 ? void 0 : _a.element) === undefined) {
            return;
        }
        container.interactivity.mouse.inside = true;
        let pos;
        const canvas = container.canvas.element;
        if (e.type.startsWith("mouse")) {
            this.canPush = true;
            const mouseEvent = e;
            if (container.interactivity.element === window) {
                if (canvas) {
                    const clientRect = canvas.getBoundingClientRect();
                    pos = {
                        x: mouseEvent.clientX - clientRect.left,
                        y: mouseEvent.clientY - clientRect.top,
                    };
                }
            }
            else if (options.interactivity.detectsOn === Enums_1.InteractivityDetect.parent) {
                const source = mouseEvent.target;
                const target = mouseEvent.currentTarget;
                const canvasEl = container.canvas.element;
                if (source && target && canvasEl) {
                    const sourceRect = source.getBoundingClientRect();
                    const targetRect = target.getBoundingClientRect();
                    const canvasRect = canvasEl.getBoundingClientRect();
                    pos = {
                        x: mouseEvent.offsetX + 2 * sourceRect.left - (targetRect.left + canvasRect.left),
                        y: mouseEvent.offsetY + 2 * sourceRect.top - (targetRect.top + canvasRect.top),
                    };
                }
                else {
                    pos = {
                        x: (_b = mouseEvent.offsetX) !== null && _b !== void 0 ? _b : mouseEvent.clientX,
                        y: (_c = mouseEvent.offsetY) !== null && _c !== void 0 ? _c : mouseEvent.clientY,
                    };
                }
            }
            else {
                if (mouseEvent.target === container.canvas.element) {
                    pos = {
                        x: (_d = mouseEvent.offsetX) !== null && _d !== void 0 ? _d : mouseEvent.clientX,
                        y: (_e = mouseEvent.offsetY) !== null && _e !== void 0 ? _e : mouseEvent.clientY,
                    };
                }
            }
        }
        else {
            this.canPush = e.type !== "touchmove";
            const touchEvent = e;
            const lastTouch = touchEvent.touches[touchEvent.touches.length - 1];
            const canvasRect = canvas === null || canvas === void 0 ? void 0 : canvas.getBoundingClientRect();
            pos = {
                x: lastTouch.clientX - ((_f = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.left) !== null && _f !== void 0 ? _f : 0),
                y: lastTouch.clientY - ((_g = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.top) !== null && _g !== void 0 ? _g : 0),
            };
        }
        const pxRatio = container.retina.pixelRatio;
        if (pos) {
            pos.x *= pxRatio;
            pos.y *= pxRatio;
        }
        container.interactivity.mouse.position = pos;
        container.interactivity.status = Constants_1.Constants.mouseMoveEvent;
    }
    mouseTouchFinish() {
        const interactivity = this.container.interactivity;
        if (interactivity === undefined) {
            return;
        }
        const mouse = interactivity.mouse;
        delete mouse.position;
        delete mouse.clickPosition;
        delete mouse.downPosition;
        interactivity.status = Constants_1.Constants.mouseLeaveEvent;
        mouse.inside = false;
        mouse.clicking = false;
    }
    mouseTouchClick(e) {
        const container = this.container;
        const options = container.actualOptions;
        const mouse = container.interactivity.mouse;
        mouse.inside = true;
        let handled = false;
        const mousePosition = mouse.position;
        if (mousePosition === undefined || !options.interactivity.events.onClick.enable) {
            return;
        }
        for (const [, plugin] of container.plugins) {
            if (plugin.clickPositionValid !== undefined) {
                handled = plugin.clickPositionValid(mousePosition);
                if (handled) {
                    break;
                }
            }
        }
        if (!handled) {
            this.doMouseTouchClick(e);
        }
        mouse.clicking = false;
    }
    doMouseTouchClick(e) {
        const container = this.container;
        const options = container.actualOptions;
        if (this.canPush) {
            const mousePos = container.interactivity.mouse.position;
            if (mousePos) {
                container.interactivity.mouse.clickPosition = {
                    x: mousePos.x,
                    y: mousePos.y,
                };
            }
            else {
                return;
            }
            container.interactivity.mouse.clickTime = new Date().getTime();
            const onClick = options.interactivity.events.onClick;
            if (onClick.mode instanceof Array) {
                for (const mode of onClick.mode) {
                    this.handleClickMode(mode);
                }
            }
            else {
                this.handleClickMode(onClick.mode);
            }
        }
        if (e.type === "touchend") {
            setTimeout(() => this.mouseTouchFinish(), 500);
        }
    }
    handleClickMode(mode) {
        const container = this.container;
        const options = container.actualOptions;
        const pushNb = options.interactivity.modes.push.quantity;
        const removeNb = options.interactivity.modes.remove.quantity;
        switch (mode) {
            case Enums_1.ClickMode.push: {
                if (pushNb > 0) {
                    container.particles.push(pushNb, container.interactivity.mouse);
                }
                break;
            }
            case Enums_1.ClickMode.remove:
                container.particles.removeQuantity(removeNb);
                break;
            case Enums_1.ClickMode.bubble:
                container.bubble.clicking = true;
                break;
            case Enums_1.ClickMode.repulse:
                container.repulse.clicking = true;
                container.repulse.count = 0;
                for (const particle of container.repulse.particles) {
                    particle.velocity.horizontal = particle.initialVelocity.horizontal;
                    particle.velocity.vertical = particle.initialVelocity.vertical;
                }
                container.repulse.particles = [];
                container.repulse.finish = false;
                setTimeout(() => {
                    if (!container.destroyed) {
                        container.repulse.clicking = false;
                    }
                }, options.interactivity.modes.repulse.duration * 1000);
                break;
            case Enums_1.ClickMode.attract:
                container.attract.clicking = true;
                container.attract.count = 0;
                for (const particle of container.attract.particles) {
                    particle.velocity.horizontal = particle.initialVelocity.horizontal;
                    particle.velocity.vertical = particle.initialVelocity.vertical;
                }
                container.attract.particles = [];
                container.attract.finish = false;
                setTimeout(() => {
                    if (!container.destroyed) {
                        container.attract.clicking = false;
                    }
                }, options.interactivity.modes.attract.duration * 1000);
                break;
            case Enums_1.ClickMode.pause:
                if (container.getAnimationStatus()) {
                    container.pause();
                }
                else {
                    container.play();
                }
                break;
        }
        for (const [, plugin] of container.plugins) {
            if (plugin.handleClickMode) {
                plugin.handleClickMode(mode);
            }
        }
    }
}
exports.EventListeners = EventListeners;

},{"../Enums":"../node_modules/tsparticles/dist/Enums/index.js","./Constants":"../node_modules/tsparticles/dist/Utils/Constants.js"}],"../node_modules/tsparticles/dist/Utils/Plugins.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plugins = void 0;
const plugins = [];
const presets = new Map();
const drawers = new Map();
const pathGenerators = new Map();
class Plugins {
    static getPlugin(plugin) {
        return plugins.find((t) => t.id === plugin);
    }
    static addPlugin(plugin) {
        if (!Plugins.getPlugin(plugin.id)) {
            plugins.push(plugin);
        }
    }
    static getAvailablePlugins(container) {
        const res = new Map();
        for (const plugin of plugins) {
            if (!plugin.needsPlugin(container.actualOptions)) {
                continue;
            }
            res.set(plugin.id, plugin.getPlugin(container));
        }
        return res;
    }
    static loadOptions(options, sourceOptions) {
        for (const plugin of plugins) {
            plugin.loadOptions(options, sourceOptions);
        }
    }
    static getPreset(preset) {
        return presets.get(preset);
    }
    static addPreset(presetKey, options) {
        if (!Plugins.getPreset(presetKey)) {
            presets.set(presetKey, options);
        }
    }
    static addShapeDrawer(type, drawer) {
        if (!Plugins.getShapeDrawer(type)) {
            drawers.set(type, drawer);
        }
    }
    static getShapeDrawer(type) {
        return drawers.get(type);
    }
    static getSupportedShapes() {
        return drawers.keys();
    }
    static getPathGenerator(type) {
        return pathGenerators.get(type);
    }
    static addPathGenerator(type, pathGenerator) {
        if (!Plugins.getPathGenerator(type)) {
            pathGenerators.set(type, pathGenerator);
        }
    }
}
exports.Plugins = Plugins;

},{}],"../node_modules/tsparticles/dist/Utils/Point.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
class Point {
    constructor(position, particle) {
        this.position = position;
        this.particle = particle;
    }
}
exports.Point = Point;

},{}],"../node_modules/tsparticles/dist/Utils/QuadTree.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuadTree = void 0;
const Rectangle_1 = require("./Rectangle");
const Circle_1 = require("./Circle");
const CircleWarp_1 = require("./CircleWarp");
class QuadTree {
    constructor(rectangle, capacity) {
        this.rectangle = rectangle;
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
    }
    subdivide() {
        const x = this.rectangle.position.x;
        const y = this.rectangle.position.y;
        const w = this.rectangle.size.width;
        const h = this.rectangle.size.height;
        const capacity = this.capacity;
        this.northEast = new QuadTree(new Rectangle_1.Rectangle(x, y, w / 2, h / 2), capacity);
        this.northWest = new QuadTree(new Rectangle_1.Rectangle(x + w / 2, y, w / 2, h / 2), capacity);
        this.southEast = new QuadTree(new Rectangle_1.Rectangle(x, y + h / 2, w / 2, h / 2), capacity);
        this.southWest = new QuadTree(new Rectangle_1.Rectangle(x + w / 2, y + h / 2, w / 2, h / 2), capacity);
        this.divided = true;
    }
    insert(point) {
        var _a, _b, _c, _d, _e;
        if (!this.rectangle.contains(point.position)) {
            return false;
        }
        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        }
        if (!this.divided) {
            this.subdivide();
        }
        return ((_e = (((_a = this.northEast) === null || _a === void 0 ? void 0 : _a.insert(point)) ||
            ((_b = this.northWest) === null || _b === void 0 ? void 0 : _b.insert(point)) ||
            ((_c = this.southEast) === null || _c === void 0 ? void 0 : _c.insert(point)) ||
            ((_d = this.southWest) === null || _d === void 0 ? void 0 : _d.insert(point)))) !== null && _e !== void 0 ? _e : false);
    }
    queryCircle(position, radius) {
        return this.query(new Circle_1.Circle(position.x, position.y, radius));
    }
    queryCircleWarp(position, radius, containerOrSize) {
        const container = containerOrSize;
        const size = containerOrSize;
        return this.query(new CircleWarp_1.CircleWarp(position.x, position.y, radius, container.canvas !== undefined ? container.canvas.size : size));
    }
    queryRectangle(position, size) {
        return this.query(new Rectangle_1.Rectangle(position.x, position.y, size.width, size.height));
    }
    query(range, found) {
        var _a, _b, _c, _d;
        const res = found !== null && found !== void 0 ? found : [];
        if (!range.intersects(this.rectangle)) {
            return [];
        }
        else {
            for (const p of this.points) {
                if (!range.contains(p.position)) {
                    continue;
                }
                res.push(p.particle);
            }
            if (this.divided) {
                (_a = this.northEast) === null || _a === void 0 ? void 0 : _a.query(range, res);
                (_b = this.northWest) === null || _b === void 0 ? void 0 : _b.query(range, res);
                (_c = this.southEast) === null || _c === void 0 ? void 0 : _c.query(range, res);
                (_d = this.southWest) === null || _d === void 0 ? void 0 : _d.query(range, res);
            }
        }
        return res;
    }
}
exports.QuadTree = QuadTree;

},{"./Rectangle":"../node_modules/tsparticles/dist/Utils/Rectangle.js","./Circle":"../node_modules/tsparticles/dist/Utils/Circle.js","./CircleWarp":"../node_modules/tsparticles/dist/Utils/CircleWarp.js"}],"../node_modules/tsparticles/dist/Utils/index.js":[function(require,module,exports) {
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./CanvasUtils"), exports);
__exportStar(require("./Circle"), exports);
__exportStar(require("./CircleWarp"), exports);
__exportStar(require("./ColorUtils"), exports);
__exportStar(require("./Constants"), exports);
__exportStar(require("./EventListeners"), exports);
__exportStar(require("./NumberUtils"), exports);
__exportStar(require("./Plugins"), exports);
__exportStar(require("./Point"), exports);
__exportStar(require("./QuadTree"), exports);
__exportStar(require("./Range"), exports);
__exportStar(require("./Rectangle"), exports);
__exportStar(require("./Utils"), exports);

},{"./CanvasUtils":"../node_modules/tsparticles/dist/Utils/CanvasUtils.js","./Circle":"../node_modules/tsparticles/dist/Utils/Circle.js","./CircleWarp":"../node_modules/tsparticles/dist/Utils/CircleWarp.js","./ColorUtils":"../node_modules/tsparticles/dist/Utils/ColorUtils.js","./Constants":"../node_modules/tsparticles/dist/Utils/Constants.js","./EventListeners":"../node_modules/tsparticles/dist/Utils/EventListeners.js","./NumberUtils":"../node_modules/tsparticles/dist/Utils/NumberUtils.js","./Plugins":"../node_modules/tsparticles/dist/Utils/Plugins.js","./Point":"../node_modules/tsparticles/dist/Utils/Point.js","./QuadTree":"../node_modules/tsparticles/dist/Utils/QuadTree.js","./Range":"../node_modules/tsparticles/dist/Utils/Range.js","./Rectangle":"../node_modules/tsparticles/dist/Utils/Rectangle.js","./Utils":"../node_modules/tsparticles/dist/Utils/Utils.js"}],"../node_modules/tsparticles/dist/ShapeDrawers/TextDrawer.js":[function(require,module,exports) {
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextDrawer = void 0;
const Utils_1 = require("../Utils");
const Enums_1 = require("../Enums");
class TextDrawer {
    getSidesCount() {
        return 12;
    }
    init(container) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const options = container.actualOptions;
            if (Utils_1.Utils.isInArray(Enums_1.ShapeType.char, options.particles.shape.type) ||
                Utils_1.Utils.isInArray(Enums_1.ShapeType.character, options.particles.shape.type)) {
                const shapeOptions = ((_a = options.particles.shape.options[Enums_1.ShapeType.character]) !== null && _a !== void 0 ? _a : options.particles.shape.options[Enums_1.ShapeType.char]);
                if (shapeOptions instanceof Array) {
                    for (const character of shapeOptions) {
                        yield Utils_1.Utils.loadFont(character);
                    }
                }
                else {
                    if (shapeOptions !== undefined) {
                        yield Utils_1.Utils.loadFont(shapeOptions);
                    }
                }
            }
        });
    }
    draw(context, particle, radius) {
        const character = particle.shapeData;
        if (character === undefined) {
            return;
        }
        const textData = character.value;
        if (textData === undefined) {
            return;
        }
        const textParticle = particle;
        if (textParticle.text === undefined) {
            textParticle.text =
                textData instanceof Array ? Utils_1.Utils.itemFromArray(textData, particle.randomIndexData) : textData;
        }
        const text = textParticle.text;
        const style = character.style;
        const weight = character.weight;
        const size = Math.round(radius) * 2;
        const font = character.font;
        const fill = particle.fill;
        const offsetX = (text.length * radius) / 2;
        context.font = `${style} ${weight} ${size}px "${font}"`;
        const pos = {
            x: -offsetX,
            y: radius / 2,
        };
        if (fill) {
            context.fillText(text, pos.x, pos.y);
        }
        else {
            context.strokeText(text, pos.x, pos.y);
        }
    }
}
exports.TextDrawer = TextDrawer;

},{"../Utils":"../node_modules/tsparticles/dist/Utils/index.js","../Enums":"../node_modules/tsparticles/dist/Enums/index.js"}],"../node_modules/tsparticles/dist/ShapeDrawers/ImageDrawer.js":[function(require,module,exports) {
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageDrawer = void 0;
const Utils_1 = require("../Utils");
const Enums_1 = require("../Enums");
class ImageDrawer {
    constructor() {
        this.images = [];
    }
    getSidesCount() {
        return 12;
    }
    getImages(container) {
        const containerImages = this.images.filter((t) => t.id === container.id);
        if (!containerImages.length) {
            this.images.push({
                id: container.id,
                images: [],
            });
            return this.getImages(container);
        }
        else {
            return containerImages[0];
        }
    }
    addImage(container, image) {
        const containerImages = this.getImages(container);
        containerImages === null || containerImages === void 0 ? void 0 : containerImages.images.push(image);
    }
    init(container) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const options = container.actualOptions;
            const shapeOptions = options.particles.shape;
            if (!Utils_1.Utils.isInArray(Enums_1.ShapeType.image, shapeOptions.type) &&
                !Utils_1.Utils.isInArray(Enums_1.ShapeType.images, shapeOptions.type)) {
                return;
            }
            const imageOptions = (_a = shapeOptions.options[Enums_1.ShapeType.images]) !== null && _a !== void 0 ? _a : shapeOptions.options[Enums_1.ShapeType.image];
            if (imageOptions instanceof Array) {
                for (const optionsImage of imageOptions) {
                    yield this.loadImageShape(container, optionsImage);
                }
            }
            else {
                yield this.loadImageShape(container, imageOptions);
            }
        });
    }
    destroy() {
        this.images = [];
    }
    loadImageShape(container, imageShape) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const image = imageShape.replaceColor
                    ? yield Utils_1.Utils.downloadSvgImage(imageShape.src)
                    : yield Utils_1.Utils.loadImage(imageShape.src);
                if (image) {
                    this.addImage(container, image);
                }
            }
            catch (_a) {
                console.warn(`tsParticles error - ${imageShape.src} not found`);
            }
        });
    }
    draw(context, particle, radius, opacity) {
        var _a, _b;
        if (!context) {
            return;
        }
        const image = particle.image;
        const element = (_a = image === null || image === void 0 ? void 0 : image.data) === null || _a === void 0 ? void 0 : _a.element;
        if (!element) {
            return;
        }
        const ratio = (_b = image === null || image === void 0 ? void 0 : image.ratio) !== null && _b !== void 0 ? _b : 1;
        const pos = {
            x: -radius,
            y: -radius,
        };
        if (!(image === null || image === void 0 ? void 0 : image.data.svgData) || !(image === null || image === void 0 ? void 0 : image.replaceColor)) {
            context.globalAlpha = opacity;
        }
        context.drawImage(element, pos.x, pos.y, radius * 2, (radius * 2) / ratio);
        if (!(image === null || image === void 0 ? void 0 : image.data.svgData) || !(image === null || image === void 0 ? void 0 : image.replaceColor)) {
            context.globalAlpha = 1;
        }
    }
}
exports.ImageDrawer = ImageDrawer;

},{"../Utils":"../node_modules/tsparticles/dist/Utils/index.js","../Enums":"../node_modules/tsparticles/dist/Enums/index.js"}],"../node_modules/tsparticles/dist/ShapeDrawers/LineDrawer.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineDrawer = void 0;
class LineDrawer {
    getSidesCount() {
        return 1;
    }
    draw(context, particle, radius) {
        context.moveTo(0, -radius / 2);
        context.lineTo(0, radius / 2);
    }
}
exports.LineDrawer = LineDrawer;

},{}],"../node_modules/tsparticles/dist/ShapeDrawers/CircleDrawer.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircleDrawer = void 0;
class CircleDrawer {
    getSidesCount() {
        return 12;
    }
    draw(context, particle, radius) {
        context.arc(0, 0, radius, 0, Math.PI * 2, false);
    }
}
exports.CircleDrawer = CircleDrawer;

},{}],"../node_modules/tsparticles/dist/ShapeDrawers/PolygonDrawerBase.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolygonDrawerBase = void 0;
class PolygonDrawerBase {
    getSidesCount(particle) {
        var _a, _b;
        const polygon = particle.shapeData;
        return (_b = (_a = polygon === null || polygon === void 0 ? void 0 : polygon.sides) !== null && _a !== void 0 ? _a : polygon === null || polygon === void 0 ? void 0 : polygon.nb_sides) !== null && _b !== void 0 ? _b : 5;
    }
    draw(context, particle, radius) {
        const start = this.getCenter(particle, radius);
        const side = this.getSidesData(particle, radius);
        const sideCount = side.count.numerator * side.count.denominator;
        const decimalSides = side.count.numerator / side.count.denominator;
        const interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides;
        const interiorAngle = Math.PI - (Math.PI * interiorAngleDegrees) / 180;
        if (!context) {
            return;
        }
        context.beginPath();
        context.translate(start.x, start.y);
        context.moveTo(0, 0);
        for (let i = 0; i < sideCount; i++) {
            context.lineTo(side.length, 0);
            context.translate(side.length, 0);
            context.rotate(interiorAngle);
        }
    }
}
exports.PolygonDrawerBase = PolygonDrawerBase;

},{}],"../node_modules/tsparticles/dist/ShapeDrawers/TriangleDrawer.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TriangleDrawer = void 0;
const PolygonDrawerBase_1 = require("./PolygonDrawerBase");
class TriangleDrawer extends PolygonDrawerBase_1.PolygonDrawerBase {
    getSidesCount() {
        return 3;
    }
    getSidesData(particle, radius) {
        return {
            count: {
                denominator: 2,
                numerator: 3,
            },
            length: radius * 2,
        };
    }
    getCenter(particle, radius) {
        return {
            x: -radius,
            y: radius / 1.66,
        };
    }
}
exports.TriangleDrawer = TriangleDrawer;

},{"./PolygonDrawerBase":"../node_modules/tsparticles/dist/ShapeDrawers/PolygonDrawerBase.js"}],"../node_modules/tsparticles/dist/ShapeDrawers/StarDrawer.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarDrawer = void 0;
class StarDrawer {
    getSidesCount(particle) {
        var _a, _b;
        const star = particle.shapeData;
        return (_b = (_a = star === null || star === void 0 ? void 0 : star.sides) !== null && _a !== void 0 ? _a : star === null || star === void 0 ? void 0 : star.nb_sides) !== null && _b !== void 0 ? _b : 5;
    }
    draw(context, particle, radius) {
        var _a;
        const star = particle.shapeData;
        const sides = this.getSidesCount(particle);
        const inset = (_a = star === null || star === void 0 ? void 0 : star.inset) !== null && _a !== void 0 ? _a : 2;
        context.moveTo(0, 0 - radius);
        for (let i = 0; i < sides; i++) {
            context.rotate(Math.PI / sides);
            context.lineTo(0, 0 - radius * inset);
            context.rotate(Math.PI / sides);
            context.lineTo(0, 0 - radius);
        }
    }
}
exports.StarDrawer = StarDrawer;

},{}],"../node_modules/tsparticles/dist/ShapeDrawers/PolygonDrawer.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolygonDrawer = void 0;
const PolygonDrawerBase_1 = require("./PolygonDrawerBase");
class PolygonDrawer extends PolygonDrawerBase_1.PolygonDrawerBase {
    getSidesData(particle, radius) {
        var _a, _b;
        const polygon = particle.shapeData;
        const sides = (_b = (_a = polygon === null || polygon === void 0 ? void 0 : polygon.sides) !== null && _a !== void 0 ? _a : polygon === null || polygon === void 0 ? void 0 : polygon.nb_sides) !== null && _b !== void 0 ? _b : 5;
        return {
            count: {
                denominator: 1,
                numerator: sides,
            },
            length: (radius * 2.66) / (sides / 3),
        };
    }
    getCenter(particle, radius) {
        const sides = this.getSidesCount(particle);
        return {
            x: -radius / (sides / 3.5),
            y: -radius / (2.66 / 3.5),
        };
    }
}
exports.PolygonDrawer = PolygonDrawer;

},{"./PolygonDrawerBase":"../node_modules/tsparticles/dist/ShapeDrawers/PolygonDrawerBase.js"}],"../node_modules/tsparticles/dist/Core/Canvas.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = void 0;
const Utils_1 = require("../Utils");
class Canvas {
    constructor(container) {
        this.container = container;
        this.size = {
            height: 0,
            width: 0,
        };
        this.context = null;
        this.generatedCanvas = false;
    }
    init() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        this.resize();
        const options = this.container.actualOptions;
        const element = this.element;
        if (element) {
            if (options.fullScreen.enable) {
                this.originalStyle = Utils_1.Utils.deepExtend({}, element.style);
                element.style.position = "fixed";
                element.style.zIndex = options.fullScreen.zIndex.toString(10);
                element.style.top = "0";
                element.style.left = "0";
                element.style.width = "100%";
                element.style.height = "100%";
            }
            else {
                element.style.position = (_b = (_a = this.originalStyle) === null || _a === void 0 ? void 0 : _a.position) !== null && _b !== void 0 ? _b : "";
                element.style.zIndex = (_d = (_c = this.originalStyle) === null || _c === void 0 ? void 0 : _c.zIndex) !== null && _d !== void 0 ? _d : "";
                element.style.top = (_f = (_e = this.originalStyle) === null || _e === void 0 ? void 0 : _e.top) !== null && _f !== void 0 ? _f : "";
                element.style.left = (_h = (_g = this.originalStyle) === null || _g === void 0 ? void 0 : _g.left) !== null && _h !== void 0 ? _h : "";
                element.style.width = (_k = (_j = this.originalStyle) === null || _j === void 0 ? void 0 : _j.width) !== null && _k !== void 0 ? _k : "";
                element.style.height = (_m = (_l = this.originalStyle) === null || _l === void 0 ? void 0 : _l.height) !== null && _m !== void 0 ? _m : "";
            }
        }
        const cover = options.backgroundMask.cover;
        const color = cover.color;
        const trail = options.particles.move.trail;
        const coverRgb = Utils_1.ColorUtils.colorToRgb(color);
        this.coverColor =
            coverRgb !== undefined
                ? {
                    r: coverRgb.r,
                    g: coverRgb.g,
                    b: coverRgb.b,
                    a: cover.opacity,
                }
                : undefined;
        this.trailFillColor = Utils_1.ColorUtils.colorToRgb(trail.fillColor);
        this.initBackground();
        this.paint();
    }
    loadCanvas(canvas, generatedCanvas) {
        var _a;
        if (!canvas.className) {
            canvas.className = Utils_1.Constants.canvasClass;
        }
        if (this.generatedCanvas) {
            (_a = this.element) === null || _a === void 0 ? void 0 : _a.remove();
        }
        this.generatedCanvas = generatedCanvas !== null && generatedCanvas !== void 0 ? generatedCanvas : this.generatedCanvas;
        this.element = canvas;
        this.originalStyle = Utils_1.Utils.deepExtend({}, this.element.style);
        this.size.height = canvas.offsetHeight;
        this.size.width = canvas.offsetWidth;
        this.context = this.element.getContext("2d");
        this.container.retina.init();
        this.initBackground();
    }
    destroy() {
        var _a;
        if (this.generatedCanvas) {
            (_a = this.element) === null || _a === void 0 ? void 0 : _a.remove();
        }
        if (this.context) {
            Utils_1.CanvasUtils.clear(this.context, this.size);
        }
    }
    paint() {
        const options = this.container.actualOptions;
        if (!this.context) {
            return;
        }
        if (options.backgroundMask.enable && options.backgroundMask.cover && this.coverColor) {
            Utils_1.CanvasUtils.clear(this.context, this.size);
            this.paintBase(Utils_1.ColorUtils.getStyleFromRgb(this.coverColor, this.coverColor.a));
        }
        else {
            this.paintBase();
        }
    }
    clear() {
        const options = this.container.actualOptions;
        const trail = options.particles.move.trail;
        if (options.backgroundMask.enable) {
            this.paint();
        }
        else if (trail.enable && trail.length > 0 && this.trailFillColor) {
            this.paintBase(Utils_1.ColorUtils.getStyleFromRgb(this.trailFillColor, 1 / trail.length));
        }
        else if (this.context) {
            Utils_1.CanvasUtils.clear(this.context, this.size);
        }
    }
    windowResize() {
        if (!this.element) {
            return;
        }
        const container = this.container;
        container.canvas.resize();
        container.actualOptions.setResponsive(this.size.width, container.retina.pixelRatio, container.options);
        container.particles.setDensity();
        for (const [, plugin] of container.plugins) {
            if (plugin.resize !== undefined) {
                plugin.resize();
            }
        }
    }
    resize() {
        if (!this.element) {
            return;
        }
        const container = this.container;
        const pxRatio = container.retina.pixelRatio;
        const size = container.canvas.size;
        const oldSize = {
            width: size.width,
            height: size.height,
        };
        size.width = this.element.offsetWidth * pxRatio;
        size.height = this.element.offsetHeight * pxRatio;
        this.element.width = size.width;
        this.element.height = size.height;
        this.resizeFactor = {
            width: size.width / oldSize.width,
            height: size.height / oldSize.height,
        };
    }
    drawConnectLine(p1, p2) {
        var _a;
        const lineStyle = this.lineStyle(p1, p2);
        if (!lineStyle) {
            return;
        }
        const ctx = this.context;
        if (!ctx) {
            return;
        }
        const pos1 = p1.getPosition();
        const pos2 = p2.getPosition();
        Utils_1.CanvasUtils.drawConnectLine(ctx, (_a = p1.linksWidth) !== null && _a !== void 0 ? _a : this.container.retina.linksWidth, lineStyle, pos1, pos2);
    }
    drawGrabLine(particle, lineColor, opacity, mousePos) {
        var _a;
        const container = this.container;
        const ctx = container.canvas.context;
        if (!ctx) {
            return;
        }
        const beginPos = particle.getPosition();
        Utils_1.CanvasUtils.drawGrabLine(ctx, (_a = particle.linksWidth) !== null && _a !== void 0 ? _a : container.retina.linksWidth, beginPos, mousePos, lineColor, opacity);
    }
    drawParticleShadow(particle, mousePos) {
        if (!this.context) {
            return;
        }
        Utils_1.CanvasUtils.drawParticleShadow(this.container, this.context, particle, mousePos);
    }
    drawLinkTriangle(p1, link1, link2) {
        var _a;
        const container = this.container;
        const options = container.actualOptions;
        const p2 = link1.destination;
        const p3 = link2.destination;
        const triangleOptions = p1.options.links.triangles;
        const opacityTriangle = (_a = triangleOptions.opacity) !== null && _a !== void 0 ? _a : (link1.opacity + link2.opacity) / 2;
        if (opacityTriangle <= 0) {
            return;
        }
        const pos1 = p1.getPosition();
        const pos2 = p2.getPosition();
        const pos3 = p3.getPosition();
        const ctx = this.context;
        if (!ctx) {
            return;
        }
        if (Utils_1.NumberUtils.getDistance(pos1, pos2) > container.retina.linksDistance ||
            Utils_1.NumberUtils.getDistance(pos3, pos2) > container.retina.linksDistance ||
            Utils_1.NumberUtils.getDistance(pos3, pos1) > container.retina.linksDistance) {
            return;
        }
        let colorTriangle = Utils_1.ColorUtils.colorToRgb(triangleOptions.color);
        if (!colorTriangle) {
            const linksOptions = p1.options.links;
            const linkColor = linksOptions.id !== undefined
                ? container.particles.linksColors.get(linksOptions.id)
                : container.particles.linksColor;
            colorTriangle = Utils_1.ColorUtils.getLinkColor(p1, p2, linkColor);
        }
        if (!colorTriangle) {
            return;
        }
        Utils_1.CanvasUtils.drawLinkTriangle(ctx, pos1, pos2, pos3, options.backgroundMask.enable, options.backgroundMask.composite, colorTriangle, opacityTriangle);
    }
    drawLinkLine(p1, link) {
        var _a, _b;
        const container = this.container;
        const options = container.actualOptions;
        const p2 = link.destination;
        let opacity = link.opacity;
        const pos1 = p1.getPosition();
        const pos2 = p2.getPosition();
        const ctx = this.context;
        if (!ctx) {
            return;
        }
        let colorLine;
        const twinkle = p1.options.twinkle.lines;
        if (twinkle.enable) {
            const twinkleFreq = twinkle.frequency;
            const twinkleRgb = Utils_1.ColorUtils.colorToRgb(twinkle.color);
            const twinkling = Math.random() < twinkleFreq;
            if (twinkling && twinkleRgb !== undefined) {
                colorLine = twinkleRgb;
                opacity = twinkle.opacity;
            }
        }
        if (!colorLine) {
            const linksOptions = p1.options.links;
            const linkColor = linksOptions.id !== undefined
                ? container.particles.linksColors.get(linksOptions.id)
                : container.particles.linksColor;
            colorLine = Utils_1.ColorUtils.getLinkColor(p1, p2, linkColor);
        }
        if (!colorLine) {
            return;
        }
        const width = (_a = p1.linksWidth) !== null && _a !== void 0 ? _a : container.retina.linksWidth;
        const maxDistance = (_b = p1.linksDistance) !== null && _b !== void 0 ? _b : container.retina.linksDistance;
        Utils_1.CanvasUtils.drawLinkLine(ctx, width, pos1, pos2, maxDistance, container.canvas.size, p1.options.links.warp, options.backgroundMask.enable, options.backgroundMask.composite, colorLine, opacity, p1.options.links.shadow);
    }
    drawParticle(particle, delta) {
        var _a, _b, _c, _d;
        if (((_a = particle.image) === null || _a === void 0 ? void 0 : _a.loaded) === false || particle.spawning || particle.destroyed) {
            return;
        }
        const pfColor = particle.getFillColor();
        const psColor = (_b = particle.getStrokeColor()) !== null && _b !== void 0 ? _b : pfColor;
        if (!pfColor && !psColor) {
            return;
        }
        const options = this.container.actualOptions;
        const pOptions = particle.options;
        const twinkle = pOptions.twinkle.particles;
        const twinkleFreq = twinkle.frequency;
        const twinkleRgb = Utils_1.ColorUtils.colorToRgb(twinkle.color);
        const twinkling = twinkle.enable && Math.random() < twinkleFreq;
        const radius = particle.getRadius();
        const opacity = twinkling ? twinkle.opacity : (_c = particle.bubble.opacity) !== null && _c !== void 0 ? _c : particle.opacity.value;
        const infectionStage = particle.infecter.infectionStage;
        const infection = options.infection;
        const infectionStages = infection.stages;
        const infectionColor = infectionStage !== undefined ? infectionStages[infectionStage].color : undefined;
        const infectionRgb = Utils_1.ColorUtils.colorToRgb(infectionColor);
        const fColor = twinkling && twinkleRgb !== undefined
            ? twinkleRgb
            : infectionRgb !== null && infectionRgb !== void 0 ? infectionRgb : (pfColor ? Utils_1.ColorUtils.hslToRgb(pfColor) : undefined);
        const sColor = twinkling && twinkleRgb !== undefined
            ? twinkleRgb
            : infectionRgb !== null && infectionRgb !== void 0 ? infectionRgb : (psColor ? Utils_1.ColorUtils.hslToRgb(psColor) : undefined);
        const fillColorValue = fColor !== undefined ? Utils_1.ColorUtils.getStyleFromRgb(fColor, opacity) : undefined;
        if (!this.context || (!fillColorValue && !sColor)) {
            return;
        }
        const strokeColorValue = sColor !== undefined
            ? Utils_1.ColorUtils.getStyleFromRgb(sColor, (_d = particle.stroke.opacity) !== null && _d !== void 0 ? _d : opacity)
            : fillColorValue;
        this.drawParticleLinks(particle);
        if (radius > 0) {
            Utils_1.CanvasUtils.drawParticle(this.container, this.context, particle, delta, fillColorValue, strokeColorValue, options.backgroundMask.enable, options.backgroundMask.composite, radius, opacity, particle.options.shadow);
        }
    }
    drawParticleLinks(particle) {
        if (!this.context) {
            return;
        }
        const container = this.container;
        const particles = container.particles;
        const pOptions = particle.options;
        if (particle.links.length > 0) {
            this.context.save();
            const p1Links = particle.links.filter((l) => {
                const linkFreq = container.particles.getLinkFrequency(particle, l.destination);
                return linkFreq <= pOptions.links.frequency;
            });
            for (const link of p1Links) {
                const p2 = link.destination;
                if (pOptions.links.triangles.enable) {
                    const links = p1Links.map((l) => l.destination);
                    const vertices = p2.links.filter((t) => {
                        const linkFreq = container.particles.getLinkFrequency(p2, t.destination);
                        return linkFreq <= p2.options.links.frequency && links.indexOf(t.destination) >= 0;
                    });
                    if (vertices.length) {
                        for (const vertex of vertices) {
                            const p3 = vertex.destination;
                            const triangleFreq = particles.getTriangleFrequency(particle, p2, p3);
                            if (triangleFreq > pOptions.links.triangles.frequency) {
                                continue;
                            }
                            this.drawLinkTriangle(particle, link, vertex);
                        }
                    }
                }
                if (link.opacity > 0 && container.retina.linksWidth > 0) {
                    this.drawLinkLine(particle, link);
                }
            }
            this.context.restore();
        }
    }
    drawPlugin(plugin, delta) {
        if (!this.context) {
            return;
        }
        Utils_1.CanvasUtils.drawPlugin(this.context, plugin, delta);
    }
    drawLight(mousePos) {
        if (!this.context) {
            return;
        }
        Utils_1.CanvasUtils.drawLight(this.container, this.context, mousePos);
    }
    paintBase(baseColor) {
        if (!this.context) {
            return;
        }
        Utils_1.CanvasUtils.paintBase(this.context, this.size, baseColor);
    }
    lineStyle(p1, p2) {
        const options = this.container.actualOptions;
        const connectOptions = options.interactivity.modes.connect;
        if (this.context) {
            return Utils_1.CanvasUtils.gradient(this.context, p1, p2, connectOptions.links.opacity);
        }
    }
    initBackground() {
        const options = this.container.actualOptions;
        const background = options.background;
        const element = this.element;
        if (!element) {
            return;
        }
        const elementStyle = element.style;
        if (background.color) {
            const color = Utils_1.ColorUtils.colorToRgb(background.color);
            if (color) {
                elementStyle.backgroundColor = Utils_1.ColorUtils.getStyleFromRgb(color, background.opacity);
            }
        }
        if (background.image) {
            elementStyle.backgroundImage = background.image;
        }
        if (background.position) {
            elementStyle.backgroundPosition = background.position;
        }
        if (background.repeat) {
            elementStyle.backgroundRepeat = background.repeat;
        }
        if (background.size) {
            elementStyle.backgroundSize = background.size;
        }
    }
}
exports.Canvas = Canvas;

},{"../Utils":"../node_modules/tsparticles/dist/Utils/index.js"}],"../node_modules/tsparticles/dist/Core/Particle/Updater.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Updater = void 0;
const Utils_1 = require("../../Utils");
const Enums_1 = require("../../Enums");
const OutModeDirection_1 = require("../../Enums/Directions/OutModeDirection");
function bounceHorizontal(data) {
    if (data.outMode === Enums_1.OutMode.bounce ||
        data.outMode === Enums_1.OutMode.bounceHorizontal ||
        data.outMode === "bounceHorizontal") {
        const velocity = data.particle.velocity.horizontal;
        let bounced = false;
        if ((data.direction === OutModeDirection_1.OutModeDirection.right && data.bounds.right >= data.canvasSize.width && velocity > 0) ||
            (data.direction === OutModeDirection_1.OutModeDirection.left && data.bounds.left <= 0 && velocity < 0)) {
            const newVelocity = Utils_1.NumberUtils.getValue(data.particle.options.bounce.horizontal);
            data.particle.velocity.horizontal *= -newVelocity;
            bounced = true;
        }
        if (bounced) {
            const minPos = data.offset.x + data.size;
            if (data.bounds.right >= data.canvasSize.width) {
                data.particle.position.x = data.canvasSize.width - minPos;
            }
            else if (data.bounds.left <= 0) {
                data.particle.position.x = minPos;
            }
        }
    }
}
function bounceVertical(data) {
    if (data.outMode === Enums_1.OutMode.bounce ||
        data.outMode === Enums_1.OutMode.bounceVertical ||
        data.outMode === "bounceVertical") {
        const velocity = data.particle.velocity.vertical;
        let bounced = false;
        if ((data.direction === OutModeDirection_1.OutModeDirection.bottom &&
            data.bounds.bottom >= data.canvasSize.height &&
            velocity > 0) ||
            (data.direction === OutModeDirection_1.OutModeDirection.top && data.bounds.top <= 0 && velocity < 0)) {
            const newVelocity = Utils_1.NumberUtils.getValue(data.particle.options.bounce.vertical);
            data.particle.velocity.vertical *= -newVelocity;
            bounced = true;
        }
        if (bounced) {
            const minPos = data.offset.y + data.size;
            if (data.bounds.bottom >= data.canvasSize.height) {
                data.particle.position.y = data.canvasSize.height - minPos;
            }
            else if (data.bounds.top <= 0) {
                data.particle.position.y = minPos;
            }
        }
    }
}
function checkDestroy(particle, destroy, value, minValue, maxValue) {
    switch (destroy) {
        case Enums_1.DestroyType.max:
            if (value >= maxValue) {
                particle.destroy();
            }
            break;
        case Enums_1.DestroyType.min:
            if (value <= minValue) {
                particle.destroy();
            }
            break;
    }
}
class Updater {
    constructor(container, particle) {
        this.container = container;
        this.particle = particle;
    }
    update(delta) {
        if (this.particle.destroyed) {
            return;
        }
        this.updateLife(delta);
        if (this.particle.destroyed || this.particle.spawning) {
            return;
        }
        this.updateOpacity(delta);
        this.updateSize(delta);
        this.updateAngle(delta);
        this.updateColor(delta);
        this.updateStrokeColor(delta);
        this.updateOutModes(delta);
    }
    updateLife(delta) {
        const particle = this.particle;
        let justSpawned = false;
        if (particle.spawning) {
            particle.lifeDelayTime += delta.value;
            if (particle.lifeDelayTime >= particle.lifeDelay) {
                justSpawned = true;
                particle.spawning = false;
                particle.lifeDelayTime = 0;
                particle.lifeTime = 0;
            }
        }
        if (particle.lifeDuration === -1) {
            return;
        }
        if (!particle.spawning) {
            if (justSpawned) {
                particle.lifeTime = 0;
            }
            else {
                particle.lifeTime += delta.value;
            }
            if (particle.lifeTime >= particle.lifeDuration) {
                particle.lifeTime = 0;
                if (particle.livesRemaining > 0) {
                    particle.livesRemaining--;
                }
                if (particle.livesRemaining === 0) {
                    particle.destroy();
                    return;
                }
                const canvasSize = this.container.canvas.size;
                particle.position.x = Utils_1.NumberUtils.randomInRange(Utils_1.NumberUtils.setRangeValue(0, canvasSize.width));
                particle.position.y = Utils_1.NumberUtils.randomInRange(Utils_1.NumberUtils.setRangeValue(0, canvasSize.height));
                particle.spawning = true;
                particle.lifeDelayTime = 0;
                particle.lifeTime = 0;
                particle.reset();
                const lifeOptions = particle.options.life;
                particle.lifeDelay = Utils_1.NumberUtils.getValue(lifeOptions.delay) * 1000;
                particle.lifeDuration = Utils_1.NumberUtils.getValue(lifeOptions.duration) * 1000;
            }
        }
    }
    updateOpacity(delta) {
        var _a, _b;
        const particle = this.particle;
        const opacityAnim = particle.options.opacity.anim;
        const minValue = opacityAnim.minimumValue;
        const maxValue = particle.options.opacity.value;
        if (!particle.destroyed &&
            opacityAnim.enable &&
            (opacityAnim.count <= 0 || particle.loops.size < opacityAnim.count)) {
            switch (particle.opacity.status) {
                case Enums_1.AnimationStatus.increasing:
                    if (particle.opacity.value >= maxValue) {
                        particle.opacity.status = Enums_1.AnimationStatus.decreasing;
                        particle.loops.opacity++;
                    }
                    else {
                        particle.opacity.value += ((_a = particle.opacity.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor;
                    }
                    break;
                case Enums_1.AnimationStatus.decreasing:
                    if (particle.opacity.value <= minValue) {
                        particle.opacity.status = Enums_1.AnimationStatus.increasing;
                        particle.loops.opacity++;
                    }
                    else {
                        particle.opacity.value -= ((_b = particle.opacity.velocity) !== null && _b !== void 0 ? _b : 0) * delta.factor;
                    }
                    break;
            }
            checkDestroy(particle, opacityAnim.destroy, particle.opacity.value, minValue, maxValue);
            if (!particle.destroyed) {
                particle.opacity.value = Utils_1.NumberUtils.clamp(particle.opacity.value, minValue, maxValue);
            }
        }
    }
    updateSize(delta) {
        var _a, _b;
        const container = this.container;
        const particle = this.particle;
        const sizeOpt = particle.options.size;
        const sizeAnim = sizeOpt.animation;
        const sizeVelocity = ((_a = particle.size.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor;
        const maxValue = (_b = particle.sizeValue) !== null && _b !== void 0 ? _b : container.retina.sizeValue;
        const minValue = sizeAnim.minimumValue * container.retina.pixelRatio;
        if (!particle.destroyed && sizeAnim.enable && (sizeAnim.count <= 0 || particle.loops.size < sizeAnim.count)) {
            switch (particle.size.status) {
                case Enums_1.AnimationStatus.increasing:
                    if (particle.size.value >= maxValue) {
                        particle.size.status = Enums_1.AnimationStatus.decreasing;
                        particle.loops.size++;
                    }
                    else {
                        particle.size.value += sizeVelocity;
                    }
                    break;
                case Enums_1.AnimationStatus.decreasing:
                    if (particle.size.value <= minValue) {
                        particle.size.status = Enums_1.AnimationStatus.increasing;
                        particle.loops.size++;
                    }
                    else {
                        particle.size.value -= sizeVelocity;
                    }
            }
            checkDestroy(particle, sizeAnim.destroy, particle.size.value, minValue, maxValue);
            if (!particle.destroyed) {
                particle.size.value = Utils_1.NumberUtils.clamp(particle.size.value, minValue, maxValue);
            }
        }
    }
    updateAngle(delta) {
        var _a;
        const particle = this.particle;
        const rotate = particle.options.rotate;
        const rotateAnimation = rotate.animation;
        const speed = ((_a = particle.rotate.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor;
        const max = 2 * Math.PI;
        if (rotate.path) {
            particle.pathAngle = Math.atan2(particle.velocity.vertical, particle.velocity.horizontal);
        }
        else if (rotateAnimation.enable) {
            switch (particle.rotate.status) {
                case Enums_1.AnimationStatus.increasing:
                    particle.rotate.value += speed;
                    if (particle.rotate.value > max) {
                        particle.rotate.value -= max;
                    }
                    break;
                case Enums_1.AnimationStatus.decreasing:
                default:
                    particle.rotate.value -= speed;
                    if (particle.rotate.value < 0) {
                        particle.rotate.value += max;
                    }
                    break;
            }
        }
    }
    updateColor(delta) {
        var _a, _b, _c;
        const particle = this.particle;
        const animationOptions = particle.options.color.animation;
        if (((_a = particle.color) === null || _a === void 0 ? void 0 : _a.h) !== undefined) {
            this.updateColorValue(particle, delta, particle.color.h, animationOptions.h, 360, false);
        }
        if (((_b = particle.color) === null || _b === void 0 ? void 0 : _b.s) !== undefined) {
            this.updateColorValue(particle, delta, particle.color.s, animationOptions.s, 100, true);
        }
        if (((_c = particle.color) === null || _c === void 0 ? void 0 : _c.l) !== undefined) {
            this.updateColorValue(particle, delta, particle.color.l, animationOptions.l, 100, true);
        }
    }
    updateStrokeColor(delta) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const particle = this.particle;
        if (!particle.stroke.color) {
            return;
        }
        const animationOptions = particle.stroke.color.animation;
        const valueAnimations = animationOptions;
        if (valueAnimations.enable !== undefined) {
            const hue = (_b = (_a = particle.strokeColor) === null || _a === void 0 ? void 0 : _a.h) !== null && _b !== void 0 ? _b : (_c = particle.color) === null || _c === void 0 ? void 0 : _c.h;
            if (hue) {
                this.updateColorValue(particle, delta, hue, valueAnimations, 360, false);
            }
        }
        else {
            const hslAnimations = animationOptions;
            const h = (_e = (_d = particle.strokeColor) === null || _d === void 0 ? void 0 : _d.h) !== null && _e !== void 0 ? _e : (_f = particle.color) === null || _f === void 0 ? void 0 : _f.h;
            if (h) {
                this.updateColorValue(particle, delta, h, hslAnimations.h, 360, false);
            }
            const s = (_h = (_g = particle.strokeColor) === null || _g === void 0 ? void 0 : _g.s) !== null && _h !== void 0 ? _h : (_j = particle.color) === null || _j === void 0 ? void 0 : _j.s;
            if (s) {
                this.updateColorValue(particle, delta, s, hslAnimations.s, 100, true);
            }
            const l = (_l = (_k = particle.strokeColor) === null || _k === void 0 ? void 0 : _k.l) !== null && _l !== void 0 ? _l : (_m = particle.color) === null || _m === void 0 ? void 0 : _m.l;
            if (l) {
                this.updateColorValue(particle, delta, l, hslAnimations.l, 100, true);
            }
        }
    }
    updateColorValue(particle, delta, value, valueAnimation, max, decrease) {
        var _a;
        const colorValue = value;
        if (!colorValue || !valueAnimation.enable) {
            return;
        }
        const offset = Utils_1.NumberUtils.randomInRange(valueAnimation.offset);
        const velocity = ((_a = value.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor + offset * 3.6;
        if (!decrease || colorValue.status === Enums_1.AnimationStatus.increasing) {
            colorValue.value += velocity;
            if (decrease && colorValue.value > max) {
                colorValue.status = Enums_1.AnimationStatus.decreasing;
                colorValue.value -= colorValue.value % max;
            }
        }
        else {
            colorValue.value -= velocity;
            if (colorValue.value < 0) {
                colorValue.status = Enums_1.AnimationStatus.increasing;
                colorValue.value += colorValue.value;
            }
        }
        if (colorValue.value > max) {
            colorValue.value %= max;
        }
    }
    updateOutModes(delta) {
        var _a, _b, _c, _d;
        const outModes = this.particle.options.move.outModes;
        this.updateOutMode(delta, (_a = outModes.bottom) !== null && _a !== void 0 ? _a : outModes.default, OutModeDirection_1.OutModeDirection.bottom);
        this.updateOutMode(delta, (_b = outModes.left) !== null && _b !== void 0 ? _b : outModes.default, OutModeDirection_1.OutModeDirection.left);
        this.updateOutMode(delta, (_c = outModes.right) !== null && _c !== void 0 ? _c : outModes.default, OutModeDirection_1.OutModeDirection.right);
        this.updateOutMode(delta, (_d = outModes.top) !== null && _d !== void 0 ? _d : outModes.default, OutModeDirection_1.OutModeDirection.top);
    }
    updateOutMode(delta, outMode, direction) {
        const container = this.container;
        const particle = this.particle;
        switch (outMode) {
            case Enums_1.OutMode.bounce:
            case Enums_1.OutMode.bounceVertical:
            case Enums_1.OutMode.bounceHorizontal:
            case "bounceVertical":
            case "bounceHorizontal":
                this.updateBounce(delta, direction, outMode);
                break;
            case Enums_1.OutMode.destroy:
                if (!Utils_1.Utils.isPointInside(particle.position, container.canvas.size, particle.getRadius(), direction)) {
                    container.particles.remove(particle);
                }
                break;
            case Enums_1.OutMode.out:
                if (!Utils_1.Utils.isPointInside(particle.position, container.canvas.size, particle.getRadius(), direction)) {
                    this.fixOutOfCanvasPosition(direction);
                }
                break;
            case Enums_1.OutMode.none:
                this.bounceNone(direction);
                break;
        }
    }
    fixOutOfCanvasPosition(direction) {
        const container = this.container;
        const particle = this.particle;
        const wrap = particle.options.move.warp;
        const canvasSize = container.canvas.size;
        const newPos = {
            bottom: canvasSize.height + particle.getRadius() - particle.offset.y,
            left: -particle.getRadius() - particle.offset.x,
            right: canvasSize.width + particle.getRadius() + particle.offset.x,
            top: -particle.getRadius() - particle.offset.y,
        };
        const sizeValue = particle.getRadius();
        const nextBounds = Utils_1.Utils.calculateBounds(particle.position, sizeValue);
        if (direction === OutModeDirection_1.OutModeDirection.right && nextBounds.left > canvasSize.width - particle.offset.x) {
            particle.position.x = newPos.left;
            if (!wrap) {
                particle.position.y = Math.random() * canvasSize.height;
            }
        }
        else if (direction === OutModeDirection_1.OutModeDirection.left && nextBounds.right < -particle.offset.x) {
            particle.position.x = newPos.right;
            if (!wrap) {
                particle.position.y = Math.random() * canvasSize.height;
            }
        }
        if (direction === OutModeDirection_1.OutModeDirection.bottom && nextBounds.top > canvasSize.height - particle.offset.y) {
            if (!wrap) {
                particle.position.x = Math.random() * canvasSize.width;
            }
            particle.position.y = newPos.top;
        }
        else if (direction === OutModeDirection_1.OutModeDirection.top && nextBounds.bottom < -particle.offset.y) {
            if (!wrap) {
                particle.position.x = Math.random() * canvasSize.width;
            }
            particle.position.y = newPos.bottom;
        }
    }
    updateBounce(delta, direction, outMode) {
        const container = this.container;
        const particle = this.particle;
        let handled = false;
        for (const [, plugin] of container.plugins) {
            if (plugin.particleBounce !== undefined) {
                handled = plugin.particleBounce(particle, delta, direction);
            }
            if (handled) {
                break;
            }
        }
        if (handled) {
            return;
        }
        const pos = particle.getPosition(), offset = particle.offset, size = particle.getRadius(), bounds = Utils_1.Utils.calculateBounds(pos, size), canvasSize = container.canvas.size;
        bounceHorizontal({ particle, outMode, direction, bounds, canvasSize, offset, size });
        bounceVertical({ particle, outMode, direction, bounds, canvasSize, offset, size });
    }
    bounceNone(direction) {
        const particle = this.particle;
        if (particle.options.move.distance) {
            return;
        }
        const gravityOptions = particle.options.move.gravity;
        const container = this.container;
        if (!gravityOptions.enable) {
            if (!Utils_1.Utils.isPointInside(particle.position, container.canvas.size, particle.getRadius(), direction)) {
                container.particles.remove(particle);
            }
        }
        else {
            const position = particle.position;
            if ((gravityOptions.acceleration >= 0 &&
                position.y > container.canvas.size.height &&
                direction === OutModeDirection_1.OutModeDirection.bottom) ||
                (gravityOptions.acceleration < 0 && position.y < 0 && direction === OutModeDirection_1.OutModeDirection.top)) {
                container.particles.remove(particle);
            }
        }
    }
}
exports.Updater = Updater;

},{"../../Utils":"../node_modules/tsparticles/dist/Utils/index.js","../../Enums":"../node_modules/tsparticles/dist/Enums/index.js","../../Enums/Directions/OutModeDirection":"../node_modules/tsparticles/dist/Enums/Directions/OutModeDirection.js"}],"../node_modules/tsparticles/dist/Options/Classes/OptionsColor.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionsColor = void 0;
class OptionsColor {
    constructor() {
        this.value = "#fff";
    }
    static create(source, data) {
        const color = source !== null && source !== void 0 ? source : new OptionsColor();
        if (data !== undefined) {
            color.load(typeof data === "string" ? { value: data } : data);
        }
        return color;
    }
    load(data) {
        if ((data === null || data === void 0 ? void 0 : data.value) === undefined) {
            return;
        }
        this.value = data.value;
    }
}
exports.OptionsColor = OptionsColor;

},{}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Links/LinksShadow.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinksShadow = void 0;
const OptionsColor_1 = require("../../OptionsColor");
class LinksShadow {
    constructor() {
        this.blur = 5;
        this.color = new OptionsColor_1.OptionsColor();
        this.enable = false;
        this.color.value = "#00ff00";
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.blur !== undefined) {
            this.blur = data.blur;
        }
        this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
    }
}
exports.LinksShadow = LinksShadow;

},{"../../OptionsColor":"../node_modules/tsparticles/dist/Options/Classes/OptionsColor.js"}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Links/LinksTriangle.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinksTriangle = void 0;
const OptionsColor_1 = require("../../OptionsColor");
class LinksTriangle {
    constructor() {
        this.enable = false;
        this.frequency = 1;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.color !== undefined) {
            this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.frequency !== undefined) {
            this.frequency = data.frequency;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}
exports.LinksTriangle = LinksTriangle;

},{"../../OptionsColor":"../node_modules/tsparticles/dist/Options/Classes/OptionsColor.js"}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Links/Links.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Links = void 0;
const LinksShadow_1 = require("./LinksShadow");
const LinksTriangle_1 = require("./LinksTriangle");
const OptionsColor_1 = require("../../OptionsColor");
class Links {
    constructor() {
        this.blink = false;
        this.color = new OptionsColor_1.OptionsColor();
        this.consent = false;
        this.distance = 100;
        this.enable = false;
        this.frequency = 1;
        this.opacity = 1;
        this.shadow = new LinksShadow_1.LinksShadow();
        this.triangles = new LinksTriangle_1.LinksTriangle();
        this.width = 1;
        this.warp = false;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.id !== undefined) {
            this.id = data.id;
        }
        if (data.blink !== undefined) {
            this.blink = data.blink;
        }
        this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
        if (data.consent !== undefined) {
            this.consent = data.consent;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.frequency !== undefined) {
            this.frequency = data.frequency;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
        this.shadow.load(data.shadow);
        this.triangles.load(data.triangles);
        if (data.width !== undefined) {
            this.width = data.width;
        }
        if (data.warp !== undefined) {
            this.warp = data.warp;
        }
    }
}
exports.Links = Links;

},{"./LinksShadow":"../node_modules/tsparticles/dist/Options/Classes/Particles/Links/LinksShadow.js","./LinksTriangle":"../node_modules/tsparticles/dist/Options/Classes/Particles/Links/LinksTriangle.js","../../OptionsColor":"../node_modules/tsparticles/dist/Options/Classes/OptionsColor.js"}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Move/Attract.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attract = void 0;
class Attract {
    constructor() {
        this.enable = false;
        this.rotate = {
            x: 3000,
            y: 3000,
        };
    }
    get rotateX() {
        return this.rotate.x;
    }
    set rotateX(value) {
        this.rotate.x = value;
    }
    get rotateY() {
        return this.rotate.y;
    }
    set rotateY(value) {
        this.rotate.y = value;
    }
    load(data) {
        var _a, _b, _c, _d;
        if (data === undefined) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        const rotateX = (_b = (_a = data.rotate) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : data.rotateX;
        if (rotateX !== undefined) {
            this.rotate.x = rotateX;
        }
        const rotateY = (_d = (_c = data.rotate) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : data.rotateY;
        if (rotateY !== undefined) {
            this.rotate.y = rotateY;
        }
    }
}
exports.Attract = Attract;

},{}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Move/Trail.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trail = void 0;
const OptionsColor_1 = require("../../OptionsColor");
class Trail {
    constructor() {
        this.enable = false;
        this.length = 10;
        this.fillColor = new OptionsColor_1.OptionsColor();
        this.fillColor.value = "#000000";
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        this.fillColor = OptionsColor_1.OptionsColor.create(this.fillColor, data.fillColor);
        if (data.length !== undefined) {
            this.length = data.length;
        }
    }
}
exports.Trail = Trail;

},{"../../OptionsColor":"../node_modules/tsparticles/dist/Options/Classes/OptionsColor.js"}],"../node_modules/tsparticles/dist/Options/Classes/Random.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Random = void 0;
class Random {
    constructor() {
        this.enable = false;
        this.minimumValue = 0;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.minimumValue !== undefined) {
            this.minimumValue = data.minimumValue;
        }
    }
}
exports.Random = Random;

},{}],"../node_modules/tsparticles/dist/Options/Classes/ValueWithRandom.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueWithRandom = void 0;
const Random_1 = require("./Random");
class ValueWithRandom {
    constructor() {
        this.random = new Random_1.Random();
        this.value = 0;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (typeof data.random === "boolean") {
            this.random.enable = data.random;
        }
        else {
            this.random.load(data.random);
        }
        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
exports.ValueWithRandom = ValueWithRandom;

},{"./Random":"../node_modules/tsparticles/dist/Options/Classes/Random.js"}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Move/Path/PathDelay.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathDelay = void 0;
const ValueWithRandom_1 = require("../../../ValueWithRandom");
class PathDelay extends ValueWithRandom_1.ValueWithRandom {
    constructor() {
        super();
    }
}
exports.PathDelay = PathDelay;

},{"../../../ValueWithRandom":"../node_modules/tsparticles/dist/Options/Classes/ValueWithRandom.js"}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Move/Path/Path.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Path = void 0;
const PathDelay_1 = require("./PathDelay");
class Path {
    constructor() {
        this.clamp = true;
        this.delay = new PathDelay_1.PathDelay();
        this.enable = false;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.clamp !== undefined) {
            this.clamp = data.clamp;
        }
        this.delay.load(data.delay);
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        this.generator = data.generator;
    }
}
exports.Path = Path;

},{"./PathDelay":"../node_modules/tsparticles/dist/Options/Classes/Particles/Move/Path/PathDelay.js"}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Move/MoveAngle.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveAngle = void 0;
class MoveAngle {
    constructor() {
        this.offset = 45;
        this.value = 90;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.offset !== undefined) {
            this.offset = data.offset;
        }
        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
exports.MoveAngle = MoveAngle;

},{}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Move/MoveGravity.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveGravity = void 0;
class MoveGravity {
    constructor() {
        this.acceleration = 9.81;
        this.enable = false;
        this.maxSpeed = 50;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.acceleration !== undefined) {
            this.acceleration = data.acceleration;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.maxSpeed !== undefined) {
            this.maxSpeed = data.maxSpeed;
        }
    }
}
exports.MoveGravity = MoveGravity;

},{}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Move/OutModes.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutModes = void 0;
const Modes_1 = require("../../../../Enums/Modes");
class OutModes {
    constructor() {
        this.default = Modes_1.OutMode.out;
    }
    load(data) {
        var _a, _b, _c, _d;
        if (!data) {
            return;
        }
        if (data.default !== undefined) {
            this.default = data.default;
        }
        this.bottom = (_a = data.bottom) !== null && _a !== void 0 ? _a : data.default;
        this.left = (_b = data.left) !== null && _b !== void 0 ? _b : data.default;
        this.right = (_c = data.right) !== null && _c !== void 0 ? _c : data.default;
        this.top = (_d = data.top) !== null && _d !== void 0 ? _d : data.default;
    }
}
exports.OutModes = OutModes;

},{"../../../../Enums/Modes":"../node_modules/tsparticles/dist/Enums/Modes/index.js"}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Move/Move.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Move = void 0;
const Attract_1 = require("./Attract");
const Enums_1 = require("../../../../Enums");
const Trail_1 = require("./Trail");
const Path_1 = require("./Path/Path");
const MoveAngle_1 = require("./MoveAngle");
const MoveGravity_1 = require("./MoveGravity");
const OutModes_1 = require("./OutModes");
class Move {
    constructor() {
        this.angle = new MoveAngle_1.MoveAngle();
        this.attract = new Attract_1.Attract();
        this.decay = 0;
        this.direction = Enums_1.MoveDirection.none;
        this.distance = 0;
        this.enable = false;
        this.gravity = new MoveGravity_1.MoveGravity();
        this.path = new Path_1.Path();
        this.outModes = new OutModes_1.OutModes();
        this.random = false;
        this.size = false;
        this.speed = 2;
        this.straight = false;
        this.trail = new Trail_1.Trail();
        this.vibrate = false;
        this.warp = false;
    }
    get collisions() {
        return false;
    }
    set collisions(value) {
    }
    get bounce() {
        return this.collisions;
    }
    set bounce(value) {
        this.collisions = value;
    }
    get out_mode() {
        return this.outMode;
    }
    set out_mode(value) {
        this.outMode = value;
    }
    get outMode() {
        return this.outModes.default;
    }
    set outMode(value) {
        this.outModes.default = value;
    }
    get noise() {
        return this.path;
    }
    set noise(value) {
        this.path = value;
    }
    load(data) {
        var _a, _b, _c;
        if (data === undefined) {
            return;
        }
        if (data.angle !== undefined) {
            if (typeof data.angle === "number") {
                this.angle.value = data.angle;
            }
            else {
                this.angle.load(data.angle);
            }
        }
        this.attract.load(data.attract);
        if (data.decay !== undefined) {
            this.decay = data.decay;
        }
        if (data.direction !== undefined) {
            this.direction = data.direction;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        this.gravity.load(data.gravity);
        const outMode = (_a = data.outMode) !== null && _a !== void 0 ? _a : data.out_mode;
        if (data.outModes !== undefined || outMode !== undefined) {
            if (typeof data.outModes === "string" || (data.outModes === undefined && outMode !== undefined)) {
                this.outModes.load({
                    default: (_b = data.outModes) !== null && _b !== void 0 ? _b : outMode,
                });
            }
            else {
                this.outModes.load(data.outModes);
            }
        }
        this.path.load((_c = data.path) !== null && _c !== void 0 ? _c : data.noise);
        if (data.random !== undefined) {
            this.random = data.random;
        }
        if (data.size !== undefined) {
            this.size = data.size;
        }
        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
        if (data.straight !== undefined) {
            this.straight = data.straight;
        }
        this.trail.load(data.trail);
        if (data.vibrate !== undefined) {
            this.vibrate = data.vibrate;
        }
        if (data.warp !== undefined) {
            this.warp = data.warp;
        }
    }
}
exports.Move = Move;

},{"./Attract":"../node_modules/tsparticles/dist/Options/Classes/Particles/Move/Attract.js","../../../../Enums":"../node_modules/tsparticles/dist/Enums/index.js","./Trail":"../node_modules/tsparticles/dist/Options/Classes/Particles/Move/Trail.js","./Path/Path":"../node_modules/tsparticles/dist/Options/Classes/Particles/Move/Path/Path.js","./MoveAngle":"../node_modules/tsparticles/dist/Options/Classes/Particles/Move/MoveAngle.js","./MoveGravity":"../node_modules/tsparticles/dist/Options/Classes/Particles/Move/MoveGravity.js","./OutModes":"../node_modules/tsparticles/dist/Options/Classes/Particles/Move/OutModes.js"}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Number/Density.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Density = void 0;
class Density {
    constructor() {
        this.enable = false;
        this.area = 800;
        this.factor = 1000;
    }
    get value_area() {
        return this.area;
    }
    set value_area(value) {
        this.area = value;
    }
    load(data) {
        var _a;
        if (data === undefined) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        const area = (_a = data.area) !== null && _a !== void 0 ? _a : data.value_area;
        if (area !== undefined) {
            this.area = area;
        }
        if (data.factor !== undefined) {
            this.factor = data.factor;
        }
    }
}
exports.Density = Density;

},{}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Number/ParticlesNumber.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticlesNumber = void 0;
const Density_1 = require("./Density");
class ParticlesNumber {
    constructor() {
        this.density = new Density_1.Density();
        this.limit = 0;
        this.value = 100;
    }
    get max() {
        return this.limit;
    }
    set max(value) {
        this.limit = value;
    }
    load(data) {
        var _a;
        if (data === undefined) {
            return;
        }
        this.density.load(data.density);
        const limit = (_a = data.limit) !== null && _a !== void 0 ? _a : data.max;
        if (limit !== undefined) {
            this.limit = limit;
        }
        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
exports.ParticlesNumber = ParticlesNumber;

},{"./Density":"../node_modules/tsparticles/dist/Options/Classes/Particles/Number/Density.js"}],"../node_modules/tsparticles/dist/Options/Classes/AnimationOptions.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimationOptions = void 0;
class AnimationOptions {
    constructor() {
        this.count = 0;
        this.enable = false;
        this.speed = 1;
        this.sync = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.count !== undefined) {
            this.count = data.count;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
exports.AnimationOptions = AnimationOptions;

},{}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Opacity/OpacityAnimation.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpacityAnimation = void 0;
const Types_1 = require("../../../../Enums/Types");
const AnimationOptions_1 = require("../../AnimationOptions");
class OpacityAnimation extends AnimationOptions_1.AnimationOptions {
    constructor() {
        super();
        this.destroy = Types_1.DestroyType.none;
        this.enable = false;
        this.minimumValue = 0;
        this.speed = 2;
        this.startValue = Types_1.StartValueType.random;
        this.sync = false;
    }
    get opacity_min() {
        return this.minimumValue;
    }
    set opacity_min(value) {
        this.minimumValue = value;
    }
    load(data) {
        var _a;
        if (data === undefined) {
            return;
        }
        super.load(data);
        if (data.destroy !== undefined) {
            this.destroy = data.destroy;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        const minimumValue = (_a = data.minimumValue) !== null && _a !== void 0 ? _a : data.opacity_min;
        if (minimumValue !== undefined) {
            this.minimumValue = minimumValue;
        }
        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
        if (data.startValue !== undefined) {
            this.startValue = data.startValue;
        }
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
exports.OpacityAnimation = OpacityAnimation;

},{"../../../../Enums/Types":"../node_modules/tsparticles/dist/Enums/Types/index.js","../../AnimationOptions":"../node_modules/tsparticles/dist/Options/Classes/AnimationOptions.js"}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Opacity/Opacity.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Opacity = void 0;
const OpacityAnimation_1 = require("./OpacityAnimation");
const ValueWithRandom_1 = require("../../ValueWithRandom");
class Opacity extends ValueWithRandom_1.ValueWithRandom {
    constructor() {
        super();
        this.animation = new OpacityAnimation_1.OpacityAnimation();
        this.random.minimumValue = 0.1;
        this.value = 1;
    }
    get anim() {
        return this.animation;
    }
    set anim(value) {
        this.animation = value;
    }
    load(data) {
        var _a;
        if (!data) {
            return;
        }
        super.load(data);
        this.animation.load((_a = data.animation) !== null && _a !== void 0 ? _a : data.anim);
    }
}
exports.Opacity = Opacity;

},{"./OpacityAnimation":"../node_modules/tsparticles/dist/Options/Classes/Particles/Opacity/OpacityAnimation.js","../../ValueWithRandom":"../node_modules/tsparticles/dist/Options/Classes/ValueWithRandom.js"}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Shape/Shape.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shape = void 0;
const Enums_1 = require("../../../../Enums");
const Utils_1 = require("../../../../Utils");
class Shape {
    constructor() {
        this.options = {};
        this.type = Enums_1.ShapeType.circle;
    }
    get image() {
        var _a;
        return ((_a = this.options[Enums_1.ShapeType.image]) !== null && _a !== void 0 ? _a : this.options[Enums_1.ShapeType.images]);
    }
    set image(value) {
        this.options[Enums_1.ShapeType.image] = value;
        this.options[Enums_1.ShapeType.images] = value;
    }
    get custom() {
        return this.options;
    }
    set custom(value) {
        this.options = value;
    }
    get images() {
        return this.image instanceof Array ? this.image : [this.image];
    }
    set images(value) {
        this.image = value;
    }
    get stroke() {
        return [];
    }
    set stroke(_value) {
    }
    get character() {
        var _a;
        return ((_a = this.options[Enums_1.ShapeType.character]) !== null && _a !== void 0 ? _a : this.options[Enums_1.ShapeType.char]);
    }
    set character(value) {
        this.options[Enums_1.ShapeType.character] = value;
        this.options[Enums_1.ShapeType.char] = value;
    }
    get polygon() {
        var _a;
        return ((_a = this.options[Enums_1.ShapeType.polygon]) !== null && _a !== void 0 ? _a : this.options[Enums_1.ShapeType.star]);
    }
    set polygon(value) {
        this.options[Enums_1.ShapeType.polygon] = value;
        this.options[Enums_1.ShapeType.star] = value;
    }
    load(data) {
        var _a, _b, _c;
        if (data === undefined) {
            return;
        }
        const options = (_a = data.options) !== null && _a !== void 0 ? _a : data.custom;
        if (options !== undefined) {
            for (const shape in options) {
                const item = options[shape];
                if (item !== undefined) {
                    this.options[shape] = Utils_1.Utils.deepExtend((_b = this.options[shape]) !== null && _b !== void 0 ? _b : {}, item);
                }
            }
        }
        this.loadShape(data.character, Enums_1.ShapeType.character, Enums_1.ShapeType.char, true);
        this.loadShape(data.polygon, Enums_1.ShapeType.polygon, Enums_1.ShapeType.star, false);
        this.loadShape((_c = data.image) !== null && _c !== void 0 ? _c : data.images, Enums_1.ShapeType.image, Enums_1.ShapeType.images, true);
        if (data.type !== undefined) {
            this.type = data.type;
        }
    }
    loadShape(item, mainKey, altKey, altOverride) {
        var _a, _b, _c, _d;
        if (item === undefined) {
            return;
        }
        if (item instanceof Array) {
            if (!(this.options[mainKey] instanceof Array)) {
                this.options[mainKey] = [];
                if (!this.options[altKey] || altOverride) {
                    this.options[altKey] = [];
                }
            }
            this.options[mainKey] = Utils_1.Utils.deepExtend((_a = this.options[mainKey]) !== null && _a !== void 0 ? _a : [], item);
            if (!this.options[altKey] || altOverride) {
                this.options[altKey] = Utils_1.Utils.deepExtend((_b = this.options[altKey]) !== null && _b !== void 0 ? _b : [], item);
            }
        }
        else {
            if (this.options[mainKey] instanceof Array) {
                this.options[mainKey] = {};
                if (!this.options[altKey] || altOverride) {
                    this.options[altKey] = {};
                }
            }
            this.options[mainKey] = Utils_1.Utils.deepExtend((_c = this.options[mainKey]) !== null && _c !== void 0 ? _c : {}, item);
            if (!this.options[altKey] || altOverride) {
                this.options[altKey] = Utils_1.Utils.deepExtend((_d = this.options[altKey]) !== null && _d !== void 0 ? _d : {}, item);
            }
        }
    }
}
exports.Shape = Shape;

},{"../../../../Enums":"../node_modules/tsparticles/dist/Enums/index.js","../../../../Utils":"../node_modules/tsparticles/dist/Utils/index.js"}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Size/SizeAnimation.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeAnimation = void 0;
const Enums_1 = require("../../../../Enums");
const AnimationOptions_1 = require("../../AnimationOptions");
class SizeAnimation extends AnimationOptions_1.AnimationOptions {
    constructor() {
        super();
        this.destroy = Enums_1.DestroyType.none;
        this.enable = false;
        this.minimumValue = 0;
        this.speed = 5;
        this.startValue = Enums_1.StartValueType.random;
        this.sync = false;
    }
    get size_min() {
        return this.minimumValue;
    }
    set size_min(value) {
        this.minimumValue = value;
    }
    load(data) {
        var _a;
        if (data === undefined) {
            return;
        }
        super.load(data);
        if (data.destroy !== undefined) {
            this.destroy = data.destroy;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        const minimumValue = (_a = data.minimumValue) !== null && _a !== void 0 ? _a : data.size_min;
        if (minimumValue !== undefined) {
            this.minimumValue = minimumValue;
        }
        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
        if (data.startValue !== undefined) {
            this.startValue = data.startValue;
        }
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
exports.SizeAnimation = SizeAnimation;

},{"../../../../Enums":"../node_modules/tsparticles/dist/Enums/index.js","../../AnimationOptions":"../node_modules/tsparticles/dist/Options/Classes/AnimationOptions.js"}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Size/Size.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Size = void 0;
const SizeAnimation_1 = require("./SizeAnimation");
const ValueWithRandom_1 = require("../../ValueWithRandom");
class Size extends ValueWithRandom_1.ValueWithRandom {
    constructor() {
        super();
        this.animation = new SizeAnimation_1.SizeAnimation();
        this.random.minimumValue = 1;
        this.value = 3;
    }
    get anim() {
        return this.animation;
    }
    set anim(value) {
        this.animation = value;
    }
    load(data) {
        var _a;
        if (!data) {
            return;
        }
        super.load(data);
        const animation = (_a = data.animation) !== null && _a !== void 0 ? _a : data.anim;
        if (animation !== undefined) {
            this.animation.load(animation);
        }
    }
}
exports.Size = Size;

},{"./SizeAnimation":"../node_modules/tsparticles/dist/Options/Classes/Particles/Size/SizeAnimation.js","../../ValueWithRandom":"../node_modules/tsparticles/dist/Options/Classes/ValueWithRandom.js"}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Rotate/RotateAnimation.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RotateAnimation = void 0;
class RotateAnimation {
    constructor() {
        this.enable = false;
        this.speed = 0;
        this.sync = false;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
exports.RotateAnimation = RotateAnimation;

},{}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Rotate/Rotate.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rotate = void 0;
const RotateAnimation_1 = require("./RotateAnimation");
const Enums_1 = require("../../../../Enums");
const ValueWithRandom_1 = require("../../ValueWithRandom");
class Rotate extends ValueWithRandom_1.ValueWithRandom {
    constructor() {
        super();
        this.animation = new RotateAnimation_1.RotateAnimation();
        this.direction = Enums_1.RotateDirection.clockwise;
        this.path = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        super.load(data);
        if (data.direction !== undefined) {
            this.direction = data.direction;
        }
        this.animation.load(data.animation);
        if (data.path !== undefined) {
            this.path = data.path;
        }
    }
}
exports.Rotate = Rotate;

},{"./RotateAnimation":"../node_modules/tsparticles/dist/Options/Classes/Particles/Rotate/RotateAnimation.js","../../../../Enums":"../node_modules/tsparticles/dist/Enums/index.js","../../ValueWithRandom":"../node_modules/tsparticles/dist/Options/Classes/ValueWithRandom.js"}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Shadow.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shadow = void 0;
const OptionsColor_1 = require("../OptionsColor");
class Shadow {
    constructor() {
        this.blur = 0;
        this.color = new OptionsColor_1.OptionsColor();
        this.enable = false;
        this.offset = {
            x: 0,
            y: 0,
        };
        this.color.value = "#000000";
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.blur !== undefined) {
            this.blur = data.blur;
        }
        this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.offset === undefined) {
            return;
        }
        if (data.offset.x !== undefined) {
            this.offset.x = data.offset.x;
        }
        if (data.offset.y !== undefined) {
            this.offset.y = data.offset.y;
        }
    }
}
exports.Shadow = Shadow;

},{"../OptionsColor":"../node_modules/tsparticles/dist/Options/Classes/OptionsColor.js"}],"../node_modules/tsparticles/dist/Options/Classes/ColorAnimation.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorAnimation = void 0;
const Utils_1 = require("../../Utils");
class ColorAnimation {
    constructor() {
        this.count = 0;
        this.enable = false;
        this.offset = 0;
        this.speed = 1;
        this.sync = true;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.count !== undefined) {
            this.count = data.count;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.offset !== undefined) {
            this.offset = Utils_1.NumberUtils.setRangeValue(data.offset);
        }
        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
exports.ColorAnimation = ColorAnimation;

},{"../../Utils":"../node_modules/tsparticles/dist/Utils/index.js"}],"../node_modules/tsparticles/dist/Options/Classes/Particles/HslAnimation.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HslAnimation = void 0;
const ColorAnimation_1 = require("../ColorAnimation");
class HslAnimation {
    constructor() {
        this.h = new ColorAnimation_1.ColorAnimation();
        this.s = new ColorAnimation_1.ColorAnimation();
        this.l = new ColorAnimation_1.ColorAnimation();
    }
    load(data) {
        if (!data) {
            return;
        }
        this.h.load(data.h);
        this.s.load(data.s);
        this.l.load(data.l);
    }
}
exports.HslAnimation = HslAnimation;

},{"../ColorAnimation":"../node_modules/tsparticles/dist/Options/Classes/ColorAnimation.js"}],"../node_modules/tsparticles/dist/Options/Classes/Particles/AnimatableColor.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimatableColor = void 0;
const OptionsColor_1 = require("../OptionsColor");
const HslAnimation_1 = require("./HslAnimation");
class AnimatableColor extends OptionsColor_1.OptionsColor {
    constructor() {
        super();
        this.animation = new HslAnimation_1.HslAnimation();
    }
    static create(source, data) {
        const color = source !== null && source !== void 0 ? source : new AnimatableColor();
        if (data !== undefined) {
            color.load(typeof data === "string" ? { value: data } : data);
        }
        return color;
    }
    load(data) {
        super.load(data);
        if (!data) {
            return;
        }
        const colorAnimation = data.animation;
        if (colorAnimation !== undefined) {
            if (colorAnimation.enable !== undefined) {
                this.animation.h.load(colorAnimation);
            }
            else {
                this.animation.load(data.animation);
            }
        }
    }
}
exports.AnimatableColor = AnimatableColor;

},{"../OptionsColor":"../node_modules/tsparticles/dist/Options/Classes/OptionsColor.js","./HslAnimation":"../node_modules/tsparticles/dist/Options/Classes/Particles/HslAnimation.js"}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Stroke.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stroke = void 0;
const AnimatableColor_1 = require("./AnimatableColor");
class Stroke {
    constructor() {
        this.width = 0;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.color !== undefined) {
            this.color = AnimatableColor_1.AnimatableColor.create(this.color, data.color);
        }
        if (data.width !== undefined) {
            this.width = data.width;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}
exports.Stroke = Stroke;

},{"./AnimatableColor":"../node_modules/tsparticles/dist/Options/Classes/Particles/AnimatableColor.js"}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Bounce/BounceFactor.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BounceFactor = void 0;
const ValueWithRandom_1 = require("../../ValueWithRandom");
class BounceFactor extends ValueWithRandom_1.ValueWithRandom {
    constructor() {
        super();
        this.random.minimumValue = 0.1;
        this.value = 1;
    }
}
exports.BounceFactor = BounceFactor;

},{"../../ValueWithRandom":"../node_modules/tsparticles/dist/Options/Classes/ValueWithRandom.js"}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Bounce/Bounce.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bounce = void 0;
const BounceFactor_1 = require("./BounceFactor");
class Bounce {
    constructor() {
        this.horizontal = new BounceFactor_1.BounceFactor();
        this.vertical = new BounceFactor_1.BounceFactor();
    }
    load(data) {
        if (!data) {
            return;
        }
        this.horizontal.load(data.horizontal);
        this.vertical.load(data.vertical);
    }
}
exports.Bounce = Bounce;

},{"./BounceFactor":"../node_modules/tsparticles/dist/Options/Classes/Particles/Bounce/BounceFactor.js"}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Collisions/CollisionsOverlap.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollisionsOverlap = void 0;
class CollisionsOverlap {
    constructor() {
        this.enable = true;
        this.retries = 0;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.retries !== undefined) {
            this.retries = data.retries;
        }
    }
}
exports.CollisionsOverlap = CollisionsOverlap;

},{}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Collisions/Collisions.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collisions = void 0;
const Enums_1 = require("../../../../Enums");
const Bounce_1 = require("../Bounce/Bounce");
const CollisionsOverlap_1 = require("./CollisionsOverlap");
class Collisions {
    constructor() {
        this.bounce = new Bounce_1.Bounce();
        this.enable = false;
        this.mode = Enums_1.CollisionMode.bounce;
        this.overlap = new CollisionsOverlap_1.CollisionsOverlap();
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        this.bounce.load(data.bounce);
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        this.overlap.load(data.overlap);
    }
}
exports.Collisions = Collisions;

},{"../../../../Enums":"../node_modules/tsparticles/dist/Enums/index.js","../Bounce/Bounce":"../node_modules/tsparticles/dist/Options/Classes/Particles/Bounce/Bounce.js","./CollisionsOverlap":"../node_modules/tsparticles/dist/Options/Classes/Particles/Collisions/CollisionsOverlap.js"}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Twinkle/TwinkleValues.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwinkleValues = void 0;
const OptionsColor_1 = require("../../OptionsColor");
class TwinkleValues {
    constructor() {
        this.enable = false;
        this.frequency = 0.05;
        this.opacity = 1;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.color !== undefined) {
            this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.frequency !== undefined) {
            this.frequency = data.frequency;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}
exports.TwinkleValues = TwinkleValues;

},{"../../OptionsColor":"../node_modules/tsparticles/dist/Options/Classes/OptionsColor.js"}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Twinkle/Twinkle.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Twinkle = void 0;
const TwinkleValues_1 = require("./TwinkleValues");
class Twinkle {
    constructor() {
        this.lines = new TwinkleValues_1.TwinkleValues();
        this.particles = new TwinkleValues_1.TwinkleValues();
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        this.lines.load(data.lines);
        this.particles.load(data.particles);
    }
}
exports.Twinkle = Twinkle;

},{"./TwinkleValues":"../node_modules/tsparticles/dist/Options/Classes/Particles/Twinkle/TwinkleValues.js"}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Life/LifeDelay.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifeDelay = void 0;
const ValueWithRandom_1 = require("../../ValueWithRandom");
class LifeDelay extends ValueWithRandom_1.ValueWithRandom {
    constructor() {
        super();
        this.sync = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        super.load(data);
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
exports.LifeDelay = LifeDelay;

},{"../../ValueWithRandom":"../node_modules/tsparticles/dist/Options/Classes/ValueWithRandom.js"}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Life/LifeDuration.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifeDuration = void 0;
const ValueWithRandom_1 = require("../../ValueWithRandom");
class LifeDuration extends ValueWithRandom_1.ValueWithRandom {
    constructor() {
        super();
        this.random.minimumValue = 0.0001;
        this.sync = false;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        super.load(data);
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
exports.LifeDuration = LifeDuration;

},{"../../ValueWithRandom":"../node_modules/tsparticles/dist/Options/Classes/ValueWithRandom.js"}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Life/Life.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Life = void 0;
const LifeDelay_1 = require("./LifeDelay");
const LifeDuration_1 = require("./LifeDuration");
class Life {
    constructor() {
        this.count = 0;
        this.delay = new LifeDelay_1.LifeDelay();
        this.duration = new LifeDuration_1.LifeDuration();
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.count !== undefined) {
            this.count = data.count;
        }
        this.delay.load(data.delay);
        this.duration.load(data.duration);
    }
}
exports.Life = Life;

},{"./LifeDelay":"../node_modules/tsparticles/dist/Options/Classes/Particles/Life/LifeDelay.js","./LifeDuration":"../node_modules/tsparticles/dist/Options/Classes/Particles/Life/LifeDuration.js"}],"../node_modules/tsparticles/dist/Options/Classes/Particles/Particles.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Particles = void 0;
const Links_1 = require("./Links/Links");
const Move_1 = require("./Move/Move");
const ParticlesNumber_1 = require("./Number/ParticlesNumber");
const Opacity_1 = require("./Opacity/Opacity");
const Shape_1 = require("./Shape/Shape");
const Size_1 = require("./Size/Size");
const Rotate_1 = require("./Rotate/Rotate");
const Shadow_1 = require("./Shadow");
const Stroke_1 = require("./Stroke");
const Collisions_1 = require("./Collisions/Collisions");
const Twinkle_1 = require("./Twinkle/Twinkle");
const AnimatableColor_1 = require("./AnimatableColor");
const Life_1 = require("./Life/Life");
const Bounce_1 = require("./Bounce/Bounce");
class Particles {
    constructor() {
        this.bounce = new Bounce_1.Bounce();
        this.collisions = new Collisions_1.Collisions();
        this.color = new AnimatableColor_1.AnimatableColor();
        this.life = new Life_1.Life();
        this.links = new Links_1.Links();
        this.move = new Move_1.Move();
        this.number = new ParticlesNumber_1.ParticlesNumber();
        this.opacity = new Opacity_1.Opacity();
        this.reduceDuplicates = false;
        this.rotate = new Rotate_1.Rotate();
        this.shadow = new Shadow_1.Shadow();
        this.shape = new Shape_1.Shape();
        this.size = new Size_1.Size();
        this.stroke = new Stroke_1.Stroke();
        this.twinkle = new Twinkle_1.Twinkle();
    }
    get line_linked() {
        return this.links;
    }
    set line_linked(value) {
        this.links = value;
    }
    get lineLinked() {
        return this.links;
    }
    set lineLinked(value) {
        this.links = value;
    }
    load(data) {
        var _a, _b, _c, _d, _e, _f, _g;
        if (data === undefined) {
            return;
        }
        this.bounce.load(data.bounce);
        this.color = AnimatableColor_1.AnimatableColor.create(this.color, data.color);
        this.life.load(data.life);
        const links = (_b = (_a = data.links) !== null && _a !== void 0 ? _a : data.lineLinked) !== null && _b !== void 0 ? _b : data.line_linked;
        if (links !== undefined) {
            this.links.load(links);
        }
        this.move.load(data.move);
        this.number.load(data.number);
        this.opacity.load(data.opacity);
        if (data.reduceDuplicates !== undefined) {
            this.reduceDuplicates = data.reduceDuplicates;
        }
        this.rotate.load(data.rotate);
        this.shape.load(data.shape);
        this.size.load(data.size);
        this.shadow.load(data.shadow);
        this.twinkle.load(data.twinkle);
        const collisions = (_d = (_c = data.move) === null || _c === void 0 ? void 0 : _c.collisions) !== null && _d !== void 0 ? _d : (_e = data.move) === null || _e === void 0 ? void 0 : _e.bounce;
        if (collisions !== undefined) {
            this.collisions.enable = collisions;
        }
        this.collisions.load(data.collisions);
        const strokeToLoad = (_f = data.stroke) !== null && _f !== void 0 ? _f : (_g = data.shape) === null || _g === void 0 ? void 0 : _g.stroke;
        if (strokeToLoad === undefined) {
            return;
        }
        if (strokeToLoad instanceof Array) {
            this.stroke = strokeToLoad.map((s) => {
                const tmp = new Stroke_1.Stroke();
                tmp.load(s);
                return tmp;
            });
        }
        else {
            if (this.stroke instanceof Array) {
                this.stroke = new Stroke_1.Stroke();
            }
            this.stroke.load(strokeToLoad);
        }
    }
}
exports.Particles = Particles;

},{"./Links/Links":"../node_modules/tsparticles/dist/Options/Classes/Particles/Links/Links.js","./Move/Move":"../node_modules/tsparticles/dist/Options/Classes/Particles/Move/Move.js","./Number/ParticlesNumber":"../node_modules/tsparticles/dist/Options/Classes/Particles/Number/ParticlesNumber.js","./Opacity/Opacity":"../node_modules/tsparticles/dist/Options/Classes/Particles/Opacity/Opacity.js","./Shape/Shape":"../node_modules/tsparticles/dist/Options/Classes/Particles/Shape/Shape.js","./Size/Size":"../node_modules/tsparticles/dist/Options/Classes/Particles/Size/Size.js","./Rotate/Rotate":"../node_modules/tsparticles/dist/Options/Classes/Particles/Rotate/Rotate.js","./Shadow":"../node_modules/tsparticles/dist/Options/Classes/Particles/Shadow.js","./Stroke":"../node_modules/tsparticles/dist/Options/Classes/Particles/Stroke.js","./Collisions/Collisions":"../node_modules/tsparticles/dist/Options/Classes/Particles/Collisions/Collisions.js","./Twinkle/Twinkle":"../node_modules/tsparticles/dist/Options/Classes/Particles/Twinkle/Twinkle.js","./AnimatableColor":"../node_modules/tsparticles/dist/Options/Classes/Particles/AnimatableColor.js","./Life/Life":"../node_modules/tsparticles/dist/Options/Classes/Particles/Life/Life.js","./Bounce/Bounce":"../node_modules/tsparticles/dist/Options/Classes/Particles/Bounce/Bounce.js"}],"../node_modules/tsparticles/dist/Core/Particle/Infecter.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Infecter = void 0;
class Infecter {
    constructor(container) {
        this.container = container;
    }
    startInfection(stage) {
        const options = this.container.actualOptions;
        const stages = options.infection.stages;
        const stagesCount = stages.length;
        if (stage > stagesCount || stage < 0) {
            return;
        }
        this.infectionDelay = 0;
        this.infectionDelayStage = stage;
    }
    updateInfectionStage(stage) {
        const options = this.container.actualOptions;
        const stagesCount = options.infection.stages.length;
        if (stage > stagesCount || stage < 0 || (this.infectionStage !== undefined && this.infectionStage > stage)) {
            return;
        }
        this.infectionStage = stage;
        this.infectionTime = 0;
    }
    updateInfection(delta) {
        const options = this.container.actualOptions;
        const infection = options.infection;
        const stages = options.infection.stages;
        const stagesCount = stages.length;
        if (this.infectionDelay !== undefined && this.infectionDelayStage !== undefined) {
            const stage = this.infectionDelayStage;
            if (stage > stagesCount || stage < 0) {
                return;
            }
            if (this.infectionDelay > infection.delay * 1000) {
                this.infectionStage = stage;
                this.infectionTime = 0;
                delete this.infectionDelay;
                delete this.infectionDelayStage;
            }
            else {
                this.infectionDelay += delta;
            }
        }
        else {
            delete this.infectionDelay;
            delete this.infectionDelayStage;
        }
        if (this.infectionStage !== undefined && this.infectionTime !== undefined) {
            const infectionStage = stages[this.infectionStage];
            if (infectionStage.duration !== undefined && infectionStage.duration >= 0) {
                if (this.infectionTime > infectionStage.duration * 1000) {
                    this.nextInfectionStage();
                }
                else {
                    this.infectionTime += delta;
                }
            }
            else {
                this.infectionTime += delta;
            }
        }
        else {
            delete this.infectionStage;
            delete this.infectionTime;
        }
    }
    nextInfectionStage() {
        const options = this.container.actualOptions;
        const stagesCount = options.infection.stages.length;
        if (stagesCount <= 0 || this.infectionStage === undefined) {
            return;
        }
        this.infectionTime = 0;
        if (stagesCount <= ++this.infectionStage) {
            if (options.infection.cure) {
                delete this.infectionStage;
                delete this.infectionTime;
                return;
            }
            else {
                this.infectionStage = 0;
                this.infectionTime = 0;
            }
        }
    }
}
exports.Infecter = Infecter;

},{}],"../node_modules/tsparticles/dist/Core/Particle/Mover.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mover = void 0;
const Utils_1 = require("../../Utils");
const Enums_1 = require("../../Enums");
class Mover {
    constructor(container, particle) {
        this.container = container;
        this.particle = particle;
    }
    move(delta) {
        const particle = this.particle;
        particle.bubble.inRange = false;
        particle.links = [];
        for (const [, plugin] of this.container.plugins) {
            if (particle.destroyed) {
                break;
            }
            if (plugin.particleUpdate) {
                plugin.particleUpdate(particle, delta);
            }
        }
        if (particle.destroyed) {
            return;
        }
        this.moveParticle(delta);
        this.moveParallax();
    }
    moveParticle(delta) {
        var _a, _b;
        const particle = this.particle;
        const particlesOptions = particle.options;
        if (!particlesOptions.move.enable) {
            return;
        }
        const container = this.container;
        const slowFactor = this.getProximitySpeedFactor();
        const baseSpeed = ((_a = particle.moveSpeed) !== null && _a !== void 0 ? _a : container.retina.moveSpeed) * container.retina.reduceFactor;
        const maxSize = (_b = particle.sizeValue) !== null && _b !== void 0 ? _b : container.retina.sizeValue;
        const sizeFactor = particlesOptions.move.size ? particle.getRadius() / maxSize : 1;
        const moveSpeed = (baseSpeed / 2) * sizeFactor * slowFactor * delta.factor;
        this.applyPath(delta);
        const gravityOptions = particlesOptions.move.gravity;
        if (gravityOptions.enable) {
            particle.velocity.vertical += (gravityOptions.acceleration * delta.factor) / (60 * moveSpeed);
        }
        const decay = 1 - particle.options.move.decay;
        particle.velocity.horizontal *= decay;
        particle.velocity.vertical *= decay;
        const velocity = {
            horizontal: particle.velocity.horizontal * moveSpeed,
            vertical: particle.velocity.vertical * moveSpeed,
        };
        if (gravityOptions.enable && velocity.vertical >= gravityOptions.maxSpeed && gravityOptions.maxSpeed > 0) {
            velocity.vertical = gravityOptions.maxSpeed;
            particle.velocity.vertical = velocity.vertical / moveSpeed;
        }
        particle.position.x += velocity.horizontal;
        particle.position.y += velocity.vertical;
        if (particlesOptions.move.vibrate) {
            particle.position.x += Math.sin(particle.position.x * Math.cos(particle.position.y));
            particle.position.y += Math.cos(particle.position.y * Math.sin(particle.position.x));
        }
        const initialPosition = particle.initialPosition;
        const initialDistance = Utils_1.NumberUtils.getDistance(initialPosition, particle.position);
        if (particle.maxDistance) {
            if (initialDistance >= particle.maxDistance && !particle.misplaced) {
                particle.misplaced = initialDistance > particle.maxDistance;
                particle.velocity.horizontal = particle.velocity.vertical / 2 - particle.velocity.horizontal;
                particle.velocity.vertical = particle.velocity.horizontal / 2 - particle.velocity.vertical;
            }
            else if (initialDistance < particle.maxDistance && particle.misplaced) {
                particle.misplaced = false;
            }
            else if (particle.misplaced) {
                if ((particle.position.x < initialPosition.x && particle.velocity.horizontal < 0) ||
                    (particle.position.x > initialPosition.x && particle.velocity.horizontal > 0)) {
                    particle.velocity.horizontal *= -Math.random();
                }
                if ((particle.position.y < initialPosition.y && particle.velocity.vertical < 0) ||
                    (particle.position.y > initialPosition.y && particle.velocity.vertical > 0)) {
                    particle.velocity.vertical *= -Math.random();
                }
            }
        }
    }
    applyPath(delta) {
        const particle = this.particle;
        const particlesOptions = particle.options;
        const pathOptions = particlesOptions.move.path;
        const pathEnabled = pathOptions.enable;
        if (!pathEnabled) {
            return;
        }
        const container = this.container;
        if (particle.lastPathTime <= particle.pathDelay) {
            particle.lastPathTime += delta.value;
            return;
        }
        let generator = container.pathGenerator;
        if (pathOptions.generator) {
            const customGenerator = Utils_1.Plugins.getPathGenerator(pathOptions.generator);
            if (customGenerator) {
                generator = customGenerator;
            }
        }
        const path = generator.generate(particle);
        particle.velocity.horizontal += Math.cos(path.angle) * path.length;
        particle.velocity.vertical += Math.sin(path.angle) * path.length;
        if (pathOptions.clamp) {
            particle.velocity.horizontal = Utils_1.NumberUtils.clamp(particle.velocity.horizontal, -1, 1);
            particle.velocity.vertical = Utils_1.NumberUtils.clamp(particle.velocity.vertical, -1, 1);
        }
        particle.lastPathTime -= particle.pathDelay;
    }
    moveParallax() {
        const container = this.container;
        const options = container.actualOptions;
        if (Utils_1.Utils.isSsr() || !options.interactivity.events.onHover.parallax.enable) {
            return;
        }
        const particle = this.particle;
        const parallaxForce = options.interactivity.events.onHover.parallax.force;
        const mousePos = container.interactivity.mouse.position;
        if (!mousePos) {
            return;
        }
        const canvasCenter = {
            x: container.canvas.size.width / 2,
            y: container.canvas.size.height / 2,
        };
        const parallaxSmooth = options.interactivity.events.onHover.parallax.smooth;
        const factor = particle.getRadius() / parallaxForce;
        const tmp = {
            x: (mousePos.x - canvasCenter.x) * factor,
            y: (mousePos.y - canvasCenter.y) * factor,
        };
        particle.offset.x += (tmp.x - particle.offset.x) / parallaxSmooth;
        particle.offset.y += (tmp.y - particle.offset.y) / parallaxSmooth;
    }
    getProximitySpeedFactor() {
        const container = this.container;
        const options = container.actualOptions;
        const active = Utils_1.Utils.isInArray(Enums_1.HoverMode.slow, options.interactivity.events.onHover.mode);
        if (!active) {
            return 1;
        }
        const mousePos = this.container.interactivity.mouse.position;
        if (!mousePos) {
            return 1;
        }
        const particlePos = this.particle.getPosition();
        const dist = Utils_1.NumberUtils.getDistance(mousePos, particlePos);
        const radius = container.retina.slowModeRadius;
        if (dist > radius) {
            return 1;
        }
        const proximityFactor = dist / radius || 0;
        const slowFactor = options.interactivity.modes.slow.factor;
        return proximityFactor / slowFactor;
    }
}
exports.Mover = Mover;

},{"../../Utils":"../node_modules/tsparticles/dist/Utils/index.js","../../Enums":"../node_modules/tsparticles/dist/Enums/index.js"}],"../node_modules/tsparticles/dist/Core/Particle.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Particle = void 0;
const Updater_1 = require("./Particle/Updater");
const Particles_1 = require("../Options/Classes/Particles/Particles");
const Shape_1 = require("../Options/Classes/Particles/Shape/Shape");
const Enums_1 = require("../Enums");
const Utils_1 = require("../Utils");
const Infecter_1 = require("./Particle/Infecter");
const Mover_1 = require("./Particle/Mover");
class Particle {
    constructor(id, container, position, overrideOptions) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        this.id = id;
        this.container = container;
        this.links = [];
        this.fill = true;
        this.close = true;
        this.lastPathTime = 0;
        this.destroyed = false;
        this.misplaced = false;
        this.loops = {
            opacity: 0,
            size: 0,
        };
        const pxRatio = container.retina.pixelRatio;
        const options = container.actualOptions;
        const particlesOptions = new Particles_1.Particles();
        particlesOptions.load(options.particles);
        const shapeType = particlesOptions.shape.type;
        const reduceDuplicates = particlesOptions.reduceDuplicates;
        this.shape = shapeType instanceof Array ? Utils_1.Utils.itemFromArray(shapeType, this.id, reduceDuplicates) : shapeType;
        if (overrideOptions === null || overrideOptions === void 0 ? void 0 : overrideOptions.shape) {
            if (overrideOptions.shape.type) {
                const overrideShapeType = overrideOptions.shape.type;
                this.shape =
                    overrideShapeType instanceof Array
                        ? Utils_1.Utils.itemFromArray(overrideShapeType, this.id, reduceDuplicates)
                        : overrideShapeType;
            }
            const shapeOptions = new Shape_1.Shape();
            shapeOptions.load(overrideOptions.shape);
            if (this.shape) {
                const shapeData = shapeOptions.options[this.shape];
                if (shapeData) {
                    this.shapeData = Utils_1.Utils.deepExtend({}, shapeData instanceof Array
                        ? Utils_1.Utils.itemFromArray(shapeData, this.id, reduceDuplicates)
                        : shapeData);
                }
            }
        }
        else {
            const shapeData = particlesOptions.shape.options[this.shape];
            if (shapeData) {
                this.shapeData = Utils_1.Utils.deepExtend({}, shapeData instanceof Array ? Utils_1.Utils.itemFromArray(shapeData, this.id, reduceDuplicates) : shapeData);
            }
        }
        if (overrideOptions !== undefined) {
            particlesOptions.load(overrideOptions);
        }
        if (((_a = this.shapeData) === null || _a === void 0 ? void 0 : _a.particles) !== undefined) {
            particlesOptions.load((_b = this.shapeData) === null || _b === void 0 ? void 0 : _b.particles);
        }
        this.fill = (_d = (_c = this.shapeData) === null || _c === void 0 ? void 0 : _c.fill) !== null && _d !== void 0 ? _d : this.fill;
        this.close = (_f = (_e = this.shapeData) === null || _e === void 0 ? void 0 : _e.close) !== null && _f !== void 0 ? _f : this.close;
        this.options = particlesOptions;
        this.pathDelay = Utils_1.NumberUtils.getValue(this.options.move.path.delay) * 1000;
        container.retina.initParticle(this);
        const color = this.options.color;
        const sizeOptions = this.options.size;
        const sizeValue = Utils_1.NumberUtils.getValue(sizeOptions) * container.retina.pixelRatio;
        const randomSize = typeof sizeOptions.random === "boolean" ? sizeOptions.random : sizeOptions.random.enable;
        this.size = {
            value: sizeValue,
        };
        this.direction = this.options.move.direction;
        this.bubble = {
            inRange: false,
        };
        this.initialVelocity = this.calculateVelocity();
        this.velocity = {
            horizontal: this.initialVelocity.horizontal,
            vertical: this.initialVelocity.vertical,
        };
        this.pathAngle = Math.atan2(this.initialVelocity.vertical, this.initialVelocity.horizontal);
        const rotateOptions = this.options.rotate;
        this.rotate = {
            value: ((rotateOptions.random.enable ? Math.random() * 360 : rotateOptions.value) * Math.PI) / 180,
        };
        let rotateDirection = rotateOptions.direction;
        if (rotateDirection === Enums_1.RotateDirection.random) {
            const index = Math.floor(Math.random() * 2);
            rotateDirection = index > 0 ? Enums_1.RotateDirection.counterClockwise : Enums_1.RotateDirection.clockwise;
        }
        switch (rotateDirection) {
            case Enums_1.RotateDirection.counterClockwise:
            case "counterClockwise":
                this.rotate.status = Enums_1.AnimationStatus.decreasing;
                break;
            case Enums_1.RotateDirection.clockwise:
                this.rotate.status = Enums_1.AnimationStatus.increasing;
                break;
        }
        const rotateAnimation = this.options.rotate.animation;
        if (rotateAnimation.enable) {
            this.rotate.velocity = (rotateAnimation.speed / 360) * container.retina.reduceFactor;
            if (!rotateAnimation.sync) {
                this.rotate.velocity *= Math.random();
            }
        }
        const sizeAnimation = this.options.size.animation;
        if (sizeAnimation.enable) {
            this.size.status = Enums_1.AnimationStatus.increasing;
            if (!randomSize) {
                switch (sizeAnimation.startValue) {
                    case Enums_1.StartValueType.min:
                        this.size.value = sizeAnimation.minimumValue * pxRatio;
                        break;
                    case Enums_1.StartValueType.random:
                        this.size.value = Utils_1.NumberUtils.randomInRange(Utils_1.NumberUtils.setRangeValue(sizeAnimation.minimumValue * pxRatio, this.size.value));
                        break;
                    case Enums_1.StartValueType.max:
                    default:
                        this.size.status = Enums_1.AnimationStatus.decreasing;
                        break;
                }
            }
            this.size.velocity =
                (((_g = this.sizeAnimationSpeed) !== null && _g !== void 0 ? _g : container.retina.sizeAnimationSpeed) / 100) *
                    container.retina.reduceFactor;
            if (!sizeAnimation.sync) {
                this.size.velocity *= Math.random();
            }
        }
        const hslColor = Utils_1.ColorUtils.colorToHsl(color, this.id, reduceDuplicates);
        if (hslColor) {
            this.color = {
                h: {
                    value: hslColor.h,
                },
                s: {
                    value: hslColor.s,
                },
                l: {
                    value: hslColor.l,
                },
            };
            const colorAnimation = this.options.color.animation;
            this.setColorAnimation(colorAnimation.h, this.color.h);
            this.setColorAnimation(colorAnimation.s, this.color.s);
            this.setColorAnimation(colorAnimation.l, this.color.l);
        }
        this.position = this.calcPosition(this.container, position);
        this.initialPosition = {
            x: this.position.x,
            y: this.position.y,
        };
        this.offset = {
            x: 0,
            y: 0,
        };
        const opacityOptions = this.options.opacity;
        const randomOpacity = typeof opacityOptions.random === "boolean" ? opacityOptions.random : opacityOptions.random.enable;
        this.opacity = {
            value: Utils_1.NumberUtils.getValue(opacityOptions),
        };
        const opacityAnimation = opacityOptions.animation;
        if (opacityAnimation.enable) {
            this.opacity.status = Enums_1.AnimationStatus.increasing;
            if (!randomOpacity) {
                switch (opacityAnimation.startValue) {
                    case Enums_1.StartValueType.min:
                        this.opacity.value = opacityAnimation.minimumValue;
                        break;
                    case Enums_1.StartValueType.random:
                        this.opacity.value = Utils_1.NumberUtils.randomInRange(Utils_1.NumberUtils.setRangeValue(opacityAnimation.minimumValue, this.opacity.value));
                        break;
                    case Enums_1.StartValueType.max:
                    default:
                        this.opacity.status = Enums_1.AnimationStatus.decreasing;
                        break;
                }
            }
            this.opacity.velocity = (opacityAnimation.speed / 100) * container.retina.reduceFactor;
            if (!opacityAnimation.sync) {
                this.opacity.velocity *= Math.random();
            }
        }
        this.sides = 24;
        let drawer = container.drawers.get(this.shape);
        if (!drawer) {
            drawer = Utils_1.Plugins.getShapeDrawer(this.shape);
            if (drawer) {
                container.drawers.set(this.shape, drawer);
            }
        }
        const sideCountFunc = drawer === null || drawer === void 0 ? void 0 : drawer.getSidesCount;
        if (sideCountFunc) {
            this.sides = sideCountFunc(this);
        }
        const imageShape = this.loadImageShape(container, drawer);
        if (imageShape) {
            this.image = imageShape.image;
            this.fill = imageShape.fill;
            this.close = imageShape.close;
        }
        this.stroke =
            this.options.stroke instanceof Array
                ? Utils_1.Utils.itemFromArray(this.options.stroke, this.id, reduceDuplicates)
                : this.options.stroke;
        this.strokeWidth = this.stroke.width * container.retina.pixelRatio;
        const strokeHslColor = (_h = Utils_1.ColorUtils.colorToHsl(this.stroke.color)) !== null && _h !== void 0 ? _h : this.getFillColor();
        if (strokeHslColor) {
            this.strokeColor = {
                h: {
                    value: strokeHslColor.h,
                },
                s: {
                    value: strokeHslColor.s,
                },
                l: {
                    value: strokeHslColor.l,
                },
            };
            const strokeColorAnimation = (_j = this.stroke.color) === null || _j === void 0 ? void 0 : _j.animation;
            if (strokeColorAnimation && this.strokeColor) {
                this.setColorAnimation(strokeColorAnimation.h, this.strokeColor.h);
                this.setColorAnimation(strokeColorAnimation.s, this.strokeColor.s);
                this.setColorAnimation(strokeColorAnimation.l, this.strokeColor.l);
            }
        }
        const lifeOptions = particlesOptions.life;
        this.lifeDelay = container.retina.reduceFactor
            ? ((Utils_1.NumberUtils.getValue(lifeOptions.delay) * (lifeOptions.delay.sync ? 1 : Math.random())) /
                container.retina.reduceFactor) *
                1000
            : 0;
        this.lifeDelayTime = 0;
        this.lifeDuration = container.retina.reduceFactor
            ? ((Utils_1.NumberUtils.getValue(lifeOptions.duration) * (lifeOptions.duration.sync ? 1 : Math.random())) /
                container.retina.reduceFactor) *
                1000
            : 0;
        this.lifeTime = 0;
        this.livesRemaining = particlesOptions.life.count;
        this.spawning = this.lifeDelay > 0;
        if (this.lifeDuration <= 0) {
            this.lifeDuration = -1;
        }
        if (this.livesRemaining <= 0) {
            this.livesRemaining = -1;
        }
        this.shadowColor = Utils_1.ColorUtils.colorToRgb(this.options.shadow.color);
        this.updater = new Updater_1.Updater(container, this);
        this.infecter = new Infecter_1.Infecter(container);
        this.mover = new Mover_1.Mover(container, this);
    }
    move(delta) {
        this.mover.move(delta);
    }
    update(delta) {
        this.updater.update(delta);
    }
    draw(delta) {
        this.container.canvas.drawParticle(this, delta);
    }
    getPosition() {
        return {
            x: this.position.x + this.offset.x,
            y: this.position.y + this.offset.y,
        };
    }
    getRadius() {
        return this.bubble.radius || this.size.value;
    }
    getFillColor() {
        var _a;
        return (_a = this.bubble.color) !== null && _a !== void 0 ? _a : Utils_1.ColorUtils.getHslFromAnimation(this.color);
    }
    getStrokeColor() {
        var _a, _b;
        return (_b = (_a = this.bubble.color) !== null && _a !== void 0 ? _a : Utils_1.ColorUtils.getHslFromAnimation(this.strokeColor)) !== null && _b !== void 0 ? _b : this.getFillColor();
    }
    destroy() {
        this.destroyed = true;
        this.bubble.inRange = false;
        this.links = [];
    }
    reset() {
        this.loops.opacity = 0;
        this.loops.size = 0;
    }
    setColorAnimation(colorAnimation, colorValue) {
        if (colorAnimation.enable) {
            colorValue.velocity = (colorAnimation.speed / 100) * this.container.retina.reduceFactor;
            if (colorAnimation.sync) {
                return;
            }
            colorValue.status = Enums_1.AnimationStatus.increasing;
            colorValue.velocity *= Math.random();
            if (colorValue.value) {
                colorValue.value *= Math.random();
            }
        }
        else {
            colorValue.velocity = 0;
        }
    }
    calcPosition(container, position, tryCount = 0) {
        var _a, _b;
        for (const [, plugin] of container.plugins) {
            const pluginPos = plugin.particlePosition !== undefined ? plugin.particlePosition(position, this) : undefined;
            if (pluginPos !== undefined) {
                return Utils_1.Utils.deepExtend({}, pluginPos);
            }
        }
        const pos = {
            x: (_a = position === null || position === void 0 ? void 0 : position.x) !== null && _a !== void 0 ? _a : Math.random() * container.canvas.size.width,
            y: (_b = position === null || position === void 0 ? void 0 : position.y) !== null && _b !== void 0 ? _b : Math.random() * container.canvas.size.height,
        };
        const outMode = this.options.move.outMode;
        if (Utils_1.Utils.isInArray(outMode, Enums_1.OutMode.bounce) || Utils_1.Utils.isInArray(outMode, Enums_1.OutMode.bounceHorizontal)) {
            if (pos.x > container.canvas.size.width - this.size.value * 2) {
                pos.x -= this.size.value;
            }
            else if (pos.x < this.size.value * 2) {
                pos.x += this.size.value;
            }
        }
        if (Utils_1.Utils.isInArray(outMode, Enums_1.OutMode.bounce) || Utils_1.Utils.isInArray(outMode, Enums_1.OutMode.bounceVertical)) {
            if (pos.y > container.canvas.size.height - this.size.value * 2) {
                pos.y -= this.size.value;
            }
            else if (pos.y < this.size.value * 2) {
                pos.y += this.size.value;
            }
        }
        if (this.checkOverlap(pos, tryCount)) {
            return this.calcPosition(container, undefined, tryCount + 1);
        }
        return pos;
    }
    checkOverlap(pos, tryCount = 0) {
        const overlapOptions = this.options.collisions.overlap;
        if (!overlapOptions.enable) {
            const retries = overlapOptions.retries;
            if (retries >= 0 && tryCount > retries) {
                throw new Error("Particle is overlapping and can't be placed");
            }
            let overlaps = false;
            for (const particle of this.container.particles.array) {
                if (Utils_1.NumberUtils.getDistance(pos, particle.position) < this.size.value + particle.size.value) {
                    overlaps = true;
                    break;
                }
            }
            return overlaps;
        }
        return false;
    }
    calculateVelocity() {
        const baseVelocity = Utils_1.NumberUtils.getParticleBaseVelocity(this);
        const res = {
            horizontal: 0,
            vertical: 0,
        };
        const moveOptions = this.options.move;
        let rad;
        let radOffset = Math.PI / 4;
        if (typeof moveOptions.angle === "number") {
            rad = (Math.PI / 180) * moveOptions.angle;
        }
        else {
            rad = (Math.PI / 180) * moveOptions.angle.value;
            radOffset = (Math.PI / 180) * moveOptions.angle.offset;
        }
        const range = {
            left: Math.sin(radOffset + rad / 2) - Math.sin(radOffset - rad / 2),
            right: Math.cos(radOffset + rad / 2) - Math.cos(radOffset - rad / 2),
        };
        if (moveOptions.straight) {
            res.horizontal = baseVelocity.x;
            res.vertical = baseVelocity.y;
            if (moveOptions.random) {
                res.horizontal += Utils_1.NumberUtils.randomInRange(Utils_1.NumberUtils.setRangeValue(range.left, range.right)) / 2;
                res.vertical += Utils_1.NumberUtils.randomInRange(Utils_1.NumberUtils.setRangeValue(range.left, range.right)) / 2;
            }
        }
        else {
            res.horizontal =
                baseVelocity.x + Utils_1.NumberUtils.randomInRange(Utils_1.NumberUtils.setRangeValue(range.left, range.right)) / 2;
            res.vertical =
                baseVelocity.y + Utils_1.NumberUtils.randomInRange(Utils_1.NumberUtils.setRangeValue(range.left, range.right)) / 2;
        }
        return res;
    }
    loadImageShape(container, drawer) {
        var _a, _b, _c, _d, _e;
        if (!(this.shape === Enums_1.ShapeType.image || this.shape === Enums_1.ShapeType.images)) {
            return;
        }
        const imageDrawer = drawer;
        const images = imageDrawer.getImages(container).images;
        const imageData = this.shapeData;
        const image = (_a = images.find((t) => t.source === imageData.src)) !== null && _a !== void 0 ? _a : images[0];
        const color = this.getFillColor();
        let imageRes;
        if (!image) {
            return;
        }
        if (image.svgData !== undefined && imageData.replaceColor && color) {
            const svgColoredData = Utils_1.ColorUtils.replaceColorSvg(image, color, this.opacity.value);
            const svg = new Blob([svgColoredData], { type: "image/svg+xml" });
            const domUrl = URL || window.URL || window.webkitURL || window;
            const url = domUrl.createObjectURL(svg);
            const img = new Image();
            imageRes = {
                data: image,
                loaded: false,
                ratio: imageData.width / imageData.height,
                replaceColor: (_b = imageData.replaceColor) !== null && _b !== void 0 ? _b : imageData.replace_color,
                source: imageData.src,
            };
            img.addEventListener("load", () => {
                if (this.image) {
                    this.image.loaded = true;
                    image.element = img;
                }
                domUrl.revokeObjectURL(url);
            });
            img.addEventListener("error", () => {
                domUrl.revokeObjectURL(url);
                Utils_1.Utils.loadImage(imageData.src).then((img2) => {
                    if (this.image && img2) {
                        image.element = img2.element;
                        this.image.loaded = true;
                    }
                });
            });
            img.src = url;
        }
        else {
            imageRes = {
                data: image,
                loaded: true,
                ratio: imageData.width / imageData.height,
                replaceColor: (_c = imageData.replaceColor) !== null && _c !== void 0 ? _c : imageData.replace_color,
                source: imageData.src,
            };
        }
        if (!imageRes.ratio) {
            imageRes.ratio = 1;
        }
        const fill = (_d = imageData.fill) !== null && _d !== void 0 ? _d : this.fill;
        const close = (_e = imageData.close) !== null && _e !== void 0 ? _e : this.close;
        return {
            image: imageRes,
            fill,
            close,
        };
    }
}
exports.Particle = Particle;

},{"./Particle/Updater":"../node_modules/tsparticles/dist/Core/Particle/Updater.js","../Options/Classes/Particles/Particles":"../node_modules/tsparticles/dist/Options/Classes/Particles/Particles.js","../Options/Classes/Particles/Shape/Shape":"../node_modules/tsparticles/dist/Options/Classes/Particles/Shape/Shape.js","../Enums":"../node_modules/tsparticles/dist/Enums/index.js","../Utils":"../node_modules/tsparticles/dist/Utils/index.js","./Particle/Infecter":"../node_modules/tsparticles/dist/Core/Particle/Infecter.js","./Particle/Mover":"../node_modules/tsparticles/dist/Core/Particle/Mover.js"}],"../node_modules/tsparticles/dist/Interactions/External/Grabber.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grabber = void 0;
const Utils_1 = require("../../Utils");
const Modes_1 = require("../../Enums/Modes");
class Grabber {
    constructor(container) {
        this.container = container;
    }
    isEnabled() {
        const container = this.container;
        const mouse = container.interactivity.mouse;
        const events = container.actualOptions.interactivity.events;
        if (!(events.onHover.enable && mouse.position)) {
            return false;
        }
        const hoverMode = events.onHover.mode;
        return Utils_1.Utils.isInArray(Modes_1.HoverMode.grab, hoverMode);
    }
    reset() {
    }
    interact() {
        var _a;
        const container = this.container;
        const options = container.actualOptions;
        const interactivity = options.interactivity;
        if (interactivity.events.onHover.enable && container.interactivity.status === Utils_1.Constants.mouseMoveEvent) {
            const mousePos = container.interactivity.mouse.position;
            if (mousePos === undefined) {
                return;
            }
            const distance = container.retina.grabModeDistance;
            const query = container.particles.quadTree.queryCircle(mousePos, distance);
            for (const particle of query) {
                const pos = particle.getPosition();
                const pointDistance = Utils_1.NumberUtils.getDistance(pos, mousePos);
                if (pointDistance <= distance) {
                    const grabLineOptions = interactivity.modes.grab.links;
                    const lineOpacity = grabLineOptions.opacity;
                    const opacityLine = lineOpacity - (pointDistance * lineOpacity) / distance;
                    if (opacityLine > 0) {
                        const optColor = (_a = grabLineOptions.color) !== null && _a !== void 0 ? _a : particle.options.links.color;
                        if (!container.particles.grabLineColor) {
                            const linksOptions = container.actualOptions.interactivity.modes.grab.links;
                            container.particles.grabLineColor = Utils_1.ColorUtils.getLinkRandomColor(optColor, linksOptions.blink, linksOptions.consent);
                        }
                        const colorLine = Utils_1.ColorUtils.getLinkColor(particle, undefined, container.particles.grabLineColor);
                        if (colorLine === undefined) {
                            return;
                        }
                        container.canvas.drawGrabLine(particle, colorLine, opacityLine, mousePos);
                    }
                }
            }
        }
    }
}
exports.Grabber = Grabber;

},{"../../Utils":"../node_modules/tsparticles/dist/Utils/index.js","../../Enums/Modes":"../node_modules/tsparticles/dist/Enums/Modes/index.js"}],"../node_modules/tsparticles/dist/Interactions/External/Repulser.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repulser = void 0;
const Enums_1 = require("../../Enums");
const Utils_1 = require("../../Utils");
class Repulser {
    constructor(container) {
        this.container = container;
    }
    isEnabled() {
        const container = this.container;
        const options = container.actualOptions;
        const mouse = container.interactivity.mouse;
        const events = options.interactivity.events;
        const divs = events.onDiv;
        const divRepulse = Utils_1.Utils.isDivModeEnabled(Enums_1.DivMode.repulse, divs);
        if (!(divRepulse || (events.onHover.enable && mouse.position) || (events.onClick.enable && mouse.clickPosition))) {
            return false;
        }
        const hoverMode = events.onHover.mode;
        const clickMode = events.onClick.mode;
        return (Utils_1.Utils.isInArray(Enums_1.HoverMode.repulse, hoverMode) || Utils_1.Utils.isInArray(Enums_1.ClickMode.repulse, clickMode) || divRepulse);
    }
    reset() {
    }
    interact() {
        const container = this.container;
        const options = container.actualOptions;
        const mouseMoveStatus = container.interactivity.status === Utils_1.Constants.mouseMoveEvent;
        const events = options.interactivity.events;
        const hoverEnabled = events.onHover.enable;
        const hoverMode = events.onHover.mode;
        const clickEnabled = events.onClick.enable;
        const clickMode = events.onClick.mode;
        const divs = events.onDiv;
        if (mouseMoveStatus && hoverEnabled && Utils_1.Utils.isInArray(Enums_1.HoverMode.repulse, hoverMode)) {
            this.hoverRepulse();
        }
        else if (clickEnabled && Utils_1.Utils.isInArray(Enums_1.ClickMode.repulse, clickMode)) {
            this.clickRepulse();
        }
        else {
            Utils_1.Utils.divModeExecute(Enums_1.DivMode.repulse, divs, (selector, div) => this.singleSelectorRepulse(selector, div));
        }
    }
    singleSelectorRepulse(selector, div) {
        const container = this.container;
        const query = document.querySelectorAll(selector);
        if (!query.length) {
            return;
        }
        query.forEach((item) => {
            const elem = item;
            const pxRatio = container.retina.pixelRatio;
            const pos = {
                x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
                y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio,
            };
            const repulseRadius = (elem.offsetWidth / 2) * pxRatio;
            const area = div.type === Enums_1.DivType.circle
                ? new Utils_1.Circle(pos.x, pos.y, repulseRadius)
                : new Utils_1.Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio);
            const divs = container.actualOptions.interactivity.modes.repulse.divs;
            const divRepulse = Utils_1.Utils.divMode(divs, elem);
            this.processRepulse(pos, repulseRadius, area, divRepulse);
        });
    }
    hoverRepulse() {
        const container = this.container;
        const mousePos = container.interactivity.mouse.position;
        if (!mousePos) {
            return;
        }
        const repulseRadius = container.retina.repulseModeDistance;
        this.processRepulse(mousePos, repulseRadius, new Utils_1.Circle(mousePos.x, mousePos.y, repulseRadius));
    }
    processRepulse(position, repulseRadius, area, divRepulse) {
        var _a;
        const container = this.container;
        const query = container.particles.quadTree.query(area);
        for (const particle of query) {
            const { dx, dy, distance } = Utils_1.NumberUtils.getDistances(particle.position, position);
            const normVec = {
                x: dx / distance,
                y: dy / distance,
            };
            const velocity = ((_a = divRepulse === null || divRepulse === void 0 ? void 0 : divRepulse.speed) !== null && _a !== void 0 ? _a : container.actualOptions.interactivity.modes.repulse.speed) * 100;
            const repulseFactor = Utils_1.NumberUtils.clamp((1 - Math.pow(distance / repulseRadius, 2)) * velocity, 0, 50);
            particle.position.x = particle.position.x + normVec.x * repulseFactor;
            particle.position.y = particle.position.y + normVec.y * repulseFactor;
        }
    }
    clickRepulse() {
        const container = this.container;
        if (!container.repulse.finish) {
            if (!container.repulse.count) {
                container.repulse.count = 0;
            }
            container.repulse.count++;
            if (container.repulse.count === container.particles.count) {
                container.repulse.finish = true;
            }
        }
        if (container.repulse.clicking) {
            const repulseDistance = container.retina.repulseModeDistance;
            const repulseRadius = Math.pow(repulseDistance / 6, 3);
            const mouseClickPos = container.interactivity.mouse.clickPosition;
            if (mouseClickPos === undefined) {
                return;
            }
            const range = new Utils_1.Circle(mouseClickPos.x, mouseClickPos.y, repulseRadius);
            const query = container.particles.quadTree.query(range);
            for (const particle of query) {
                const { dx, dy, distance } = Utils_1.NumberUtils.getDistances(mouseClickPos, particle.position);
                const d = distance * distance;
                const velocity = container.actualOptions.interactivity.modes.repulse.speed;
                const force = (-repulseRadius * velocity) / d;
                if (d <= repulseRadius) {
                    container.repulse.particles.push(particle);
                    const angle = Math.atan2(dy, dx);
                    particle.velocity.horizontal = force * Math.cos(angle);
                    particle.velocity.vertical = force * Math.sin(angle);
                }
            }
        }
        else if (container.repulse.clicking === false) {
            for (const particle of container.repulse.particles) {
                particle.velocity.horizontal = particle.initialVelocity.horizontal;
                particle.velocity.vertical = particle.initialVelocity.vertical;
            }
            container.repulse.particles = [];
        }
    }
}
exports.Repulser = Repulser;

},{"../../Enums":"../node_modules/tsparticles/dist/Enums/index.js","../../Utils":"../node_modules/tsparticles/dist/Utils/index.js"}],"../node_modules/tsparticles/dist/Interactions/External/Bubbler.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bubbler = void 0;
const Utils_1 = require("../../Utils");
const Enums_1 = require("../../Enums");
function calculateBubbleValue(particleValue, modeValue, optionsValue, ratio) {
    if (modeValue > optionsValue) {
        const size = particleValue + (modeValue - optionsValue) * ratio;
        return Utils_1.NumberUtils.clamp(size, particleValue, modeValue);
    }
    else if (modeValue < optionsValue) {
        const size = particleValue - (optionsValue - modeValue) * ratio;
        return Utils_1.NumberUtils.clamp(size, modeValue, particleValue);
    }
}
class Bubbler {
    constructor(container) {
        this.container = container;
    }
    isEnabled() {
        const container = this.container;
        const options = container.actualOptions;
        const mouse = container.interactivity.mouse;
        const events = options.interactivity.events;
        const divs = events.onDiv;
        const divBubble = Utils_1.Utils.isDivModeEnabled(Enums_1.DivMode.bubble, divs);
        if (!(divBubble || (events.onHover.enable && mouse.position) || (events.onClick.enable && mouse.clickPosition))) {
            return false;
        }
        const hoverMode = events.onHover.mode;
        const clickMode = events.onClick.mode;
        return (Utils_1.Utils.isInArray(Enums_1.HoverMode.bubble, hoverMode) || Utils_1.Utils.isInArray(Enums_1.ClickMode.bubble, clickMode) || divBubble);
    }
    reset(particle, force) {
        if (!particle.bubble.inRange || force) {
            delete particle.bubble.div;
            delete particle.bubble.opacity;
            delete particle.bubble.radius;
            delete particle.bubble.color;
        }
    }
    interact() {
        const options = this.container.actualOptions;
        const events = options.interactivity.events;
        const onHover = events.onHover;
        const onClick = events.onClick;
        const hoverEnabled = onHover.enable;
        const hoverMode = onHover.mode;
        const clickEnabled = onClick.enable;
        const clickMode = onClick.mode;
        const divs = events.onDiv;
        if (hoverEnabled && Utils_1.Utils.isInArray(Enums_1.HoverMode.bubble, hoverMode)) {
            this.hoverBubble();
        }
        else if (clickEnabled && Utils_1.Utils.isInArray(Enums_1.ClickMode.bubble, clickMode)) {
            this.clickBubble();
        }
        else {
            Utils_1.Utils.divModeExecute(Enums_1.DivMode.bubble, divs, (selector, div) => this.singleSelectorHover(selector, div));
        }
    }
    singleSelectorHover(selector, div) {
        const container = this.container;
        const selectors = document.querySelectorAll(selector);
        if (!selectors.length) {
            return;
        }
        selectors.forEach((item) => {
            const elem = item;
            const pxRatio = container.retina.pixelRatio;
            const pos = {
                x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
                y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio,
            };
            const repulseRadius = (elem.offsetWidth / 2) * pxRatio;
            const area = div.type === Enums_1.DivType.circle
                ? new Utils_1.Circle(pos.x, pos.y, repulseRadius)
                : new Utils_1.Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio);
            const query = container.particles.quadTree.query(area);
            for (const particle of query) {
                if (!area.contains(particle.getPosition())) {
                    continue;
                }
                particle.bubble.inRange = true;
                const divs = container.actualOptions.interactivity.modes.bubble.divs;
                const divBubble = Utils_1.Utils.divMode(divs, elem);
                if (!particle.bubble.div || particle.bubble.div !== elem) {
                    this.reset(particle, true);
                    particle.bubble.div = elem;
                }
                this.hoverBubbleSize(particle, 1, divBubble);
                this.hoverBubbleOpacity(particle, 1, divBubble);
                this.hoverBubbleColor(particle, divBubble);
            }
        });
    }
    process(particle, distMouse, timeSpent, data) {
        const container = this.container;
        const bubbleParam = data.bubbleObj.optValue;
        if (bubbleParam === undefined) {
            return;
        }
        const options = container.actualOptions;
        const bubbleDuration = options.interactivity.modes.bubble.duration;
        const bubbleDistance = container.retina.bubbleModeDistance;
        const particlesParam = data.particlesObj.optValue;
        const pObjBubble = data.bubbleObj.value;
        const pObj = data.particlesObj.value || 0;
        const type = data.type;
        if (bubbleParam !== particlesParam) {
            if (!container.bubble.durationEnd) {
                if (distMouse <= bubbleDistance) {
                    const obj = pObjBubble !== null && pObjBubble !== void 0 ? pObjBubble : pObj;
                    if (obj !== bubbleParam) {
                        const value = pObj - (timeSpent * (pObj - bubbleParam)) / bubbleDuration;
                        if (type === Enums_1.ProcessBubbleType.size) {
                            particle.bubble.radius = value;
                        }
                        if (type === Enums_1.ProcessBubbleType.opacity) {
                            particle.bubble.opacity = value;
                        }
                    }
                }
                else {
                    if (type === Enums_1.ProcessBubbleType.size) {
                        delete particle.bubble.radius;
                    }
                    if (type === Enums_1.ProcessBubbleType.opacity) {
                        delete particle.bubble.opacity;
                    }
                }
            }
            else if (pObjBubble) {
                if (type === Enums_1.ProcessBubbleType.size) {
                    delete particle.bubble.radius;
                }
                if (type === Enums_1.ProcessBubbleType.opacity) {
                    delete particle.bubble.opacity;
                }
            }
        }
    }
    clickBubble() {
        var _a;
        const container = this.container;
        const options = container.actualOptions;
        const mouseClickPos = container.interactivity.mouse.clickPosition;
        if (mouseClickPos === undefined) {
            return;
        }
        const distance = container.retina.bubbleModeDistance;
        const query = container.particles.quadTree.queryCircle(mouseClickPos, distance);
        for (const particle of query) {
            if (!container.bubble.clicking) {
                continue;
            }
            particle.bubble.inRange = !container.bubble.durationEnd;
            const pos = particle.getPosition();
            const distMouse = Utils_1.NumberUtils.getDistance(pos, mouseClickPos);
            const timeSpent = (new Date().getTime() - (container.interactivity.mouse.clickTime || 0)) / 1000;
            if (timeSpent > options.interactivity.modes.bubble.duration) {
                container.bubble.durationEnd = true;
            }
            if (timeSpent > options.interactivity.modes.bubble.duration * 2) {
                container.bubble.clicking = false;
                container.bubble.durationEnd = false;
            }
            const sizeData = {
                bubbleObj: {
                    optValue: container.retina.bubbleModeSize,
                    value: particle.bubble.radius,
                },
                particlesObj: {
                    optValue: (_a = particle.sizeValue) !== null && _a !== void 0 ? _a : container.retina.sizeValue,
                    value: particle.size.value,
                },
                type: Enums_1.ProcessBubbleType.size,
            };
            this.process(particle, distMouse, timeSpent, sizeData);
            const opacityData = {
                bubbleObj: {
                    optValue: options.interactivity.modes.bubble.opacity,
                    value: particle.bubble.opacity,
                },
                particlesObj: {
                    optValue: particle.options.opacity.value,
                    value: particle.opacity.value,
                },
                type: Enums_1.ProcessBubbleType.opacity,
            };
            this.process(particle, distMouse, timeSpent, opacityData);
            if (!container.bubble.durationEnd) {
                if (distMouse <= container.retina.bubbleModeDistance) {
                    this.hoverBubbleColor(particle);
                }
                else {
                    delete particle.bubble.color;
                }
            }
            else {
                delete particle.bubble.color;
            }
        }
    }
    hoverBubble() {
        const container = this.container;
        const mousePos = container.interactivity.mouse.position;
        if (mousePos === undefined) {
            return;
        }
        const distance = container.retina.bubbleModeDistance;
        const query = container.particles.quadTree.queryCircle(mousePos, distance);
        for (const particle of query) {
            particle.bubble.inRange = true;
            const pos = particle.getPosition();
            const pointDistance = Utils_1.NumberUtils.getDistance(pos, mousePos);
            const ratio = 1 - pointDistance / distance;
            if (pointDistance <= distance) {
                if (ratio >= 0 && container.interactivity.status === Utils_1.Constants.mouseMoveEvent) {
                    this.hoverBubbleSize(particle, ratio);
                    this.hoverBubbleOpacity(particle, ratio);
                    this.hoverBubbleColor(particle);
                }
            }
            else {
                this.reset(particle);
            }
            if (container.interactivity.status === Utils_1.Constants.mouseLeaveEvent) {
                this.reset(particle);
            }
        }
    }
    hoverBubbleSize(particle, ratio, divBubble) {
        var _a;
        const container = this.container;
        const modeSize = (divBubble === null || divBubble === void 0 ? void 0 : divBubble.size)
            ? divBubble.size * container.retina.pixelRatio
            : container.retina.bubbleModeSize;
        if (modeSize === undefined) {
            return;
        }
        const optSize = (_a = particle.sizeValue) !== null && _a !== void 0 ? _a : container.retina.sizeValue;
        const pSize = particle.size.value;
        const size = calculateBubbleValue(pSize, modeSize, optSize, ratio);
        if (size !== undefined) {
            particle.bubble.radius = size;
        }
    }
    hoverBubbleOpacity(particle, ratio, divBubble) {
        var _a;
        const options = this.container.actualOptions;
        const modeOpacity = (_a = divBubble === null || divBubble === void 0 ? void 0 : divBubble.opacity) !== null && _a !== void 0 ? _a : options.interactivity.modes.bubble.opacity;
        if (modeOpacity === undefined) {
            return;
        }
        const optOpacity = particle.options.opacity.value;
        const pOpacity = particle.opacity.value;
        const opacity = calculateBubbleValue(pOpacity, modeOpacity, optOpacity, ratio);
        if (opacity !== undefined) {
            particle.bubble.opacity = opacity;
        }
    }
    hoverBubbleColor(particle, divBubble) {
        var _a;
        const options = this.container.actualOptions;
        if (particle.bubble.color === undefined) {
            const modeColor = (_a = divBubble === null || divBubble === void 0 ? void 0 : divBubble.color) !== null && _a !== void 0 ? _a : options.interactivity.modes.bubble.color;
            if (modeColor === undefined) {
                return;
            }
            const bubbleColor = modeColor instanceof Array ? Utils_1.Utils.itemFromArray(modeColor) : modeColor;
            particle.bubble.color = Utils_1.ColorUtils.colorToHsl(bubbleColor);
        }
    }
}
exports.Bubbler = Bubbler;

},{"../../Utils":"../node_modules/tsparticles/dist/Utils/index.js","../../Enums":"../node_modules/tsparticles/dist/Enums/index.js"}],"../node_modules/tsparticles/dist/Interactions/External/Connector.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connector = void 0;
const Utils_1 = require("../../Utils");
const Modes_1 = require("../../Enums/Modes");
class Connector {
    constructor(container) {
        this.container = container;
    }
    isEnabled() {
        const container = this.container;
        const mouse = container.interactivity.mouse;
        const events = container.actualOptions.interactivity.events;
        if (!(events.onHover.enable && mouse.position)) {
            return false;
        }
        const hoverMode = events.onHover.mode;
        return Utils_1.Utils.isInArray(Modes_1.HoverMode.connect, hoverMode);
    }
    reset() {
    }
    interact() {
        const container = this.container;
        const options = container.actualOptions;
        if (options.interactivity.events.onHover.enable && container.interactivity.status === "mousemove") {
            const mousePos = container.interactivity.mouse.position;
            if (!mousePos) {
                return;
            }
            const distance = Math.abs(container.retina.connectModeRadius);
            const query = container.particles.quadTree.queryCircle(mousePos, distance);
            let i = 0;
            for (const p1 of query) {
                const pos1 = p1.getPosition();
                for (const p2 of query.slice(i + 1)) {
                    const pos2 = p2.getPosition();
                    const distMax = Math.abs(container.retina.connectModeDistance);
                    const xDiff = Math.abs(pos1.x - pos2.x);
                    const yDiff = Math.abs(pos1.y - pos2.y);
                    if (xDiff < distMax && yDiff < distMax) {
                        container.canvas.drawConnectLine(p1, p2);
                    }
                }
                ++i;
            }
        }
    }
}
exports.Connector = Connector;

},{"../../Utils":"../node_modules/tsparticles/dist/Utils/index.js","../../Enums/Modes":"../node_modules/tsparticles/dist/Enums/Modes/index.js"}],"../node_modules/tsparticles/dist/Interactions/Particles/Linker.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Linker = void 0;
const Utils_1 = require("../../Utils");
class Linker {
    constructor(container) {
        this.container = container;
    }
    isEnabled(particle) {
        return particle.options.links.enable;
    }
    reset() {
    }
    interact(p1) {
        var _a;
        const container = this.container;
        const linkOpt1 = p1.options.links;
        const optOpacity = linkOpt1.opacity;
        const optDistance = (_a = p1.linksDistance) !== null && _a !== void 0 ? _a : container.retina.linksDistance;
        const canvasSize = container.canvas.size;
        const warp = linkOpt1.warp;
        const pos1 = p1.getPosition();
        const range = warp
            ? new Utils_1.CircleWarp(pos1.x, pos1.y, optDistance, canvasSize)
            : new Utils_1.Circle(pos1.x, pos1.y, optDistance);
        const query = container.particles.quadTree.query(range);
        for (const p2 of query) {
            const linkOpt2 = p2.options.links;
            if (p1 === p2 || !linkOpt2.enable || linkOpt1.id !== linkOpt2.id || p2.spawning || p2.destroyed) {
                continue;
            }
            const pos2 = p2.getPosition();
            let distance = Utils_1.NumberUtils.getDistance(pos1, pos2);
            if (warp) {
                if (distance > optDistance) {
                    const pos2NE = {
                        x: pos2.x - canvasSize.width,
                        y: pos2.y,
                    };
                    distance = Utils_1.NumberUtils.getDistance(pos1, pos2NE);
                    if (distance > optDistance) {
                        const pos2SE = {
                            x: pos2.x - canvasSize.width,
                            y: pos2.y - canvasSize.height,
                        };
                        distance = Utils_1.NumberUtils.getDistance(pos1, pos2SE);
                        if (distance > optDistance) {
                            const pos2SW = {
                                x: pos2.x,
                                y: pos2.y - canvasSize.height,
                            };
                            distance = Utils_1.NumberUtils.getDistance(pos1, pos2SW);
                        }
                    }
                }
            }
            if (distance > optDistance) {
                return;
            }
            const opacityLine = (1 - distance / optDistance) * optOpacity;
            const linksOptions = p1.options.links;
            let linkColor = linksOptions.id !== undefined
                ? container.particles.linksColors.get(linksOptions.id)
                : container.particles.linksColor;
            if (!linkColor) {
                const optColor = linksOptions.color;
                linkColor = Utils_1.ColorUtils.getLinkRandomColor(optColor, linksOptions.blink, linksOptions.consent);
                if (linksOptions.id !== undefined) {
                    container.particles.linksColors.set(linksOptions.id, linkColor);
                }
                else {
                    container.particles.linksColor = linkColor;
                }
            }
            if (p2.links.map((t) => t.destination).indexOf(p1) === -1 &&
                p1.links.map((t) => t.destination).indexOf(p2) === -1) {
                p1.links.push({
                    destination: p2,
                    opacity: opacityLine,
                });
            }
        }
    }
}
exports.Linker = Linker;

},{"../../Utils":"../node_modules/tsparticles/dist/Utils/index.js"}],"../node_modules/tsparticles/dist/Interactions/Particles/Attractor.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attractor = void 0;
const Utils_1 = require("../../Utils");
class Attractor {
    constructor(container) {
        this.container = container;
    }
    interact(p1) {
        var _a;
        const container = this.container;
        const distance = (_a = p1.linksDistance) !== null && _a !== void 0 ? _a : container.retina.linksDistance;
        const pos1 = p1.getPosition();
        const query = container.particles.quadTree.queryCircle(pos1, distance);
        for (const p2 of query) {
            if (p1 === p2 || !p2.options.move.attract.enable || p2.destroyed || p2.spawning) {
                continue;
            }
            const pos2 = p2.getPosition();
            const { dx, dy } = Utils_1.NumberUtils.getDistances(pos1, pos2);
            const rotate = p1.options.move.attract.rotate;
            const ax = dx / (rotate.x * 1000);
            const ay = dy / (rotate.y * 1000);
            p1.velocity.horizontal -= ax;
            p1.velocity.vertical -= ay;
            p2.velocity.horizontal += ax;
            p2.velocity.vertical += ay;
        }
    }
    isEnabled(particle) {
        return particle.options.move.attract.enable;
    }
    reset() {
    }
}
exports.Attractor = Attractor;

},{"../../Utils":"../node_modules/tsparticles/dist/Utils/index.js"}],"../node_modules/tsparticles/dist/Interactions/Particles/Collider.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collider = void 0;
const Enums_1 = require("../../Enums");
const Utils_1 = require("../../Utils");
function bounce(p1, p2) {
    Utils_1.Utils.circleBounce(Utils_1.Utils.circleBounceDataFromParticle(p1), Utils_1.Utils.circleBounceDataFromParticle(p2));
}
function destroy(p1, p2) {
    if (p1.getRadius() === undefined && p2.getRadius() !== undefined) {
        p1.destroy();
    }
    else if (p1.getRadius() !== undefined && p2.getRadius() === undefined) {
        p2.destroy();
    }
    else if (p1.getRadius() !== undefined && p2.getRadius() !== undefined) {
        if (p1.getRadius() >= p2.getRadius()) {
            p2.destroy();
        }
        else {
            p1.destroy();
        }
    }
}
class Collider {
    constructor(container) {
        this.container = container;
    }
    isEnabled(particle) {
        return particle.options.collisions.enable;
    }
    reset() {
    }
    interact(p1) {
        const container = this.container;
        const pos1 = p1.getPosition();
        const query = container.particles.quadTree.queryCircle(pos1, p1.getRadius() * 2);
        for (const p2 of query) {
            if (p1 === p2 ||
                !p2.options.collisions.enable ||
                p1.options.collisions.mode !== p2.options.collisions.mode ||
                p2.destroyed ||
                p2.spawning) {
                continue;
            }
            const pos2 = p2.getPosition();
            const dist = Utils_1.NumberUtils.getDistance(pos1, pos2);
            const radius1 = p1.getRadius();
            const radius2 = p2.getRadius();
            const distP = radius1 + radius2;
            if (dist <= distP) {
                this.resolveCollision(p1, p2);
            }
        }
    }
    resolveCollision(p1, p2) {
        switch (p1.options.collisions.mode) {
            case Enums_1.CollisionMode.absorb: {
                this.absorb(p1, p2);
                break;
            }
            case Enums_1.CollisionMode.bounce: {
                bounce(p1, p2);
                break;
            }
            case Enums_1.CollisionMode.destroy: {
                destroy(p1, p2);
                break;
            }
        }
    }
    absorb(p1, p2) {
        const container = this.container;
        const fps = container.actualOptions.fpsLimit / 1000;
        if (p1.getRadius() === undefined && p2.getRadius() !== undefined) {
            p1.destroy();
        }
        else if (p1.getRadius() !== undefined && p2.getRadius() === undefined) {
            p2.destroy();
        }
        else if (p1.getRadius() !== undefined && p2.getRadius() !== undefined) {
            if (p1.getRadius() >= p2.getRadius()) {
                const factor = Utils_1.NumberUtils.clamp(p1.getRadius() / p2.getRadius(), 0, p2.getRadius()) * fps;
                p1.size.value += factor;
                p2.size.value -= factor;
                if (p2.getRadius() <= container.retina.pixelRatio) {
                    p2.size.value = 0;
                    p2.destroy();
                }
            }
            else {
                const factor = Utils_1.NumberUtils.clamp(p2.getRadius() / p1.getRadius(), 0, p1.getRadius()) * fps;
                p1.size.value -= factor;
                p2.size.value += factor;
                if (p1.getRadius() <= container.retina.pixelRatio) {
                    p1.size.value = 0;
                    p1.destroy();
                }
            }
        }
    }
}
exports.Collider = Collider;

},{"../../Enums":"../node_modules/tsparticles/dist/Enums/index.js","../../Utils":"../node_modules/tsparticles/dist/Utils/index.js"}],"../node_modules/tsparticles/dist/Interactions/Particles/Infecter.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Infecter = void 0;
class Infecter {
    constructor(container) {
        this.container = container;
    }
    isEnabled() {
        return this.container.actualOptions.infection.enable;
    }
    reset() {
    }
    interact(p1, delta) {
        var _a, _b;
        const infecter1 = p1.infecter;
        infecter1.updateInfection(delta.value);
        if (infecter1.infectionStage === undefined) {
            return;
        }
        const container = this.container;
        const options = container.actualOptions;
        const infectionOptions = options.infection;
        if (!infectionOptions.enable || infectionOptions.stages.length < 1) {
            return;
        }
        const infectionStage1 = infectionOptions.stages[infecter1.infectionStage];
        const pxRatio = container.retina.pixelRatio;
        const radius = p1.getRadius() * 2 + infectionStage1.radius * pxRatio;
        const pos = p1.getPosition();
        const infectedStage1 = (_a = infectionStage1.infectedStage) !== null && _a !== void 0 ? _a : infecter1.infectionStage;
        const query = container.particles.quadTree.queryCircle(pos, radius);
        const infections = infectionStage1.rate;
        const neighbors = query.length;
        for (const p2 of query) {
            if (p2 === p1 ||
                p2.destroyed ||
                p2.spawning ||
                !(p2.infecter.infectionStage === undefined || p2.infecter.infectionStage !== infecter1.infectionStage)) {
                continue;
            }
            const infecter2 = p2.infecter;
            if (Math.random() < infections / neighbors) {
                if (infecter2.infectionStage === undefined) {
                    infecter2.startInfection(infectedStage1);
                }
                else if (infecter2.infectionStage < infecter1.infectionStage) {
                    infecter2.updateInfectionStage(infectedStage1);
                }
                else if (infecter2.infectionStage > infecter1.infectionStage) {
                    const infectionStage2 = infectionOptions.stages[infecter2.infectionStage];
                    const infectedStage2 = (_b = infectionStage2 === null || infectionStage2 === void 0 ? void 0 : infectionStage2.infectedStage) !== null && _b !== void 0 ? _b : infecter2.infectionStage;
                    infecter1.updateInfectionStage(infectedStage2);
                }
            }
        }
    }
}
exports.Infecter = Infecter;

},{}],"../node_modules/tsparticles/dist/Interactions/External/TrailMaker.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrailMaker = void 0;
const Utils_1 = require("../../Utils");
const Modes_1 = require("../../Enums/Modes");
class TrailMaker {
    constructor(container) {
        this.container = container;
        this.delay = 0;
    }
    interact(delta) {
        if (!this.container.retina.reduceFactor) {
            return;
        }
        const container = this.container;
        const options = container.actualOptions;
        const trailOptions = options.interactivity.modes.trail;
        const optDelay = (trailOptions.delay * 1000) / this.container.retina.reduceFactor;
        if (this.delay < optDelay) {
            this.delay += delta.value;
        }
        if (this.delay >= optDelay) {
            container.particles.push(trailOptions.quantity, container.interactivity.mouse, trailOptions.particles);
            this.delay -= optDelay;
        }
    }
    isEnabled() {
        const container = this.container;
        const options = container.actualOptions;
        const mouse = container.interactivity.mouse;
        const events = options.interactivity.events;
        return ((mouse.clicking &&
            mouse.inside &&
            !!mouse.position &&
            Utils_1.Utils.isInArray(Modes_1.ClickMode.trail, events.onClick.mode)) ||
            (mouse.inside && !!mouse.position && Utils_1.Utils.isInArray(Modes_1.HoverMode.trail, events.onHover.mode)));
    }
    reset() {
    }
}
exports.TrailMaker = TrailMaker;

},{"../../Utils":"../node_modules/tsparticles/dist/Utils/index.js","../../Enums/Modes":"../node_modules/tsparticles/dist/Enums/Modes/index.js"}],"../node_modules/tsparticles/dist/Interactions/External/Attractor.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attractor = void 0;
const Enums_1 = require("../../Enums");
const Utils_1 = require("../../Utils");
class Attractor {
    constructor(container) {
        this.container = container;
    }
    isEnabled() {
        const container = this.container;
        const options = container.actualOptions;
        const mouse = container.interactivity.mouse;
        const events = options.interactivity.events;
        if (!((events.onHover.enable && mouse.position) || (events.onClick.enable && mouse.clickPosition))) {
            return false;
        }
        const hoverMode = events.onHover.mode;
        const clickMode = events.onClick.mode;
        return Utils_1.Utils.isInArray(Enums_1.HoverMode.attract, hoverMode) || Utils_1.Utils.isInArray(Enums_1.ClickMode.attract, clickMode);
    }
    reset() {
    }
    interact() {
        const container = this.container;
        const options = container.actualOptions;
        const mouseMoveStatus = container.interactivity.status === Utils_1.Constants.mouseMoveEvent;
        const events = options.interactivity.events;
        const hoverEnabled = events.onHover.enable;
        const hoverMode = events.onHover.mode;
        const clickEnabled = events.onClick.enable;
        const clickMode = events.onClick.mode;
        if (mouseMoveStatus && hoverEnabled && Utils_1.Utils.isInArray(Enums_1.HoverMode.attract, hoverMode)) {
            this.hoverAttract();
        }
        else if (clickEnabled && Utils_1.Utils.isInArray(Enums_1.ClickMode.attract, clickMode)) {
            this.clickAttract();
        }
    }
    hoverAttract() {
        const container = this.container;
        const mousePos = container.interactivity.mouse.position;
        if (!mousePos) {
            return;
        }
        const attractRadius = container.retina.attractModeDistance;
        this.processAttract(mousePos, attractRadius, new Utils_1.Circle(mousePos.x, mousePos.y, attractRadius));
    }
    processAttract(position, attractRadius, area) {
        const container = this.container;
        const query = container.particles.quadTree.query(area);
        for (const particle of query) {
            const { dx, dy, distance } = Utils_1.NumberUtils.getDistances(particle.position, position);
            const normVec = {
                x: dx / distance,
                y: dy / distance,
            };
            const velocity = container.actualOptions.interactivity.modes.attract.speed;
            const attractFactor = Utils_1.NumberUtils.clamp((1 - Math.pow(distance / attractRadius, 2)) * velocity, 0, 50);
            particle.position.x = particle.position.x - normVec.x * attractFactor;
            particle.position.y = particle.position.y - normVec.y * attractFactor;
        }
    }
    clickAttract() {
        const container = this.container;
        if (!container.attract.finish) {
            if (!container.attract.count) {
                container.attract.count = 0;
            }
            container.attract.count++;
            if (container.attract.count === container.particles.count) {
                container.attract.finish = true;
            }
        }
        if (container.attract.clicking) {
            const mousePos = container.interactivity.mouse.clickPosition;
            if (!mousePos) {
                return;
            }
            const attractRadius = container.retina.attractModeDistance;
            this.processAttract(mousePos, attractRadius, new Utils_1.Circle(mousePos.x, mousePos.y, attractRadius));
        }
        else if (container.attract.clicking === false) {
            container.attract.particles = [];
        }
        return;
    }
}
exports.Attractor = Attractor;

},{"../../Enums":"../node_modules/tsparticles/dist/Enums/index.js","../../Utils":"../node_modules/tsparticles/dist/Utils/index.js"}],"../node_modules/tsparticles/dist/Interactions/Particles/Lighter.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lighter = void 0;
const Utils_1 = require("../../Utils");
const Modes_1 = require("../../Enums/Modes");
class Lighter {
    constructor(container) {
        this.container = container;
    }
    interact(particle) {
        const container = this.container;
        const options = container.actualOptions;
        if (options.interactivity.events.onHover.enable && container.interactivity.status === "mousemove") {
            const mousePos = this.container.interactivity.mouse.position;
            if (mousePos) {
                container.canvas.drawParticleShadow(particle, mousePos);
            }
        }
    }
    isEnabled() {
        const container = this.container;
        const mouse = container.interactivity.mouse;
        const events = container.actualOptions.interactivity.events;
        if (!(events.onHover.enable && mouse.position)) {
            return false;
        }
        const hoverMode = events.onHover.mode;
        return Utils_1.Utils.isInArray(Modes_1.HoverMode.light, hoverMode);
    }
    reset() {
    }
}
exports.Lighter = Lighter;

},{"../../Utils":"../node_modules/tsparticles/dist/Utils/index.js","../../Enums/Modes":"../node_modules/tsparticles/dist/Enums/Modes/index.js"}],"../node_modules/tsparticles/dist/Interactions/External/Lighter.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lighter = void 0;
const Utils_1 = require("../../Utils");
const Modes_1 = require("../../Enums/Modes");
class Lighter {
    constructor(container) {
        this.container = container;
    }
    interact() {
        const container = this.container;
        const options = container.actualOptions;
        if (options.interactivity.events.onHover.enable && container.interactivity.status === "mousemove") {
            const mousePos = container.interactivity.mouse.position;
            if (!mousePos) {
                return;
            }
            container.canvas.drawLight(mousePos);
        }
    }
    isEnabled() {
        const container = this.container;
        const mouse = container.interactivity.mouse;
        const events = container.actualOptions.interactivity.events;
        if (!(events.onHover.enable && mouse.position)) {
            return false;
        }
        const hoverMode = events.onHover.mode;
        return Utils_1.Utils.isInArray(Modes_1.HoverMode.light, hoverMode);
    }
    reset() {
    }
}
exports.Lighter = Lighter;

},{"../../Utils":"../node_modules/tsparticles/dist/Utils/index.js","../../Enums/Modes":"../node_modules/tsparticles/dist/Enums/Modes/index.js"}],"../node_modules/tsparticles/dist/Interactions/External/Bouncer.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bouncer = void 0;
const Utils_1 = require("../../Utils");
const Modes_1 = require("../../Enums/Modes");
const Utils_2 = require("../../Utils");
const Modes_2 = require("../../Enums/Modes");
const Types_1 = require("../../Enums/Types");
class Bouncer {
    constructor(container) {
        this.container = container;
    }
    isEnabled() {
        const container = this.container;
        const options = container.actualOptions;
        const mouse = container.interactivity.mouse;
        const events = options.interactivity.events;
        const divs = events.onDiv;
        return ((mouse.position && events.onHover.enable && Utils_2.Utils.isInArray(Modes_1.HoverMode.bounce, events.onHover.mode)) ||
            Utils_2.Utils.isDivModeEnabled(Modes_2.DivMode.bounce, divs));
    }
    interact() {
        const container = this.container;
        const options = container.actualOptions;
        const events = options.interactivity.events;
        const mouseMoveStatus = container.interactivity.status === Utils_1.Constants.mouseMoveEvent;
        const hoverEnabled = events.onHover.enable;
        const hoverMode = events.onHover.mode;
        const divs = events.onDiv;
        if (mouseMoveStatus && hoverEnabled && Utils_2.Utils.isInArray(Modes_1.HoverMode.bounce, hoverMode)) {
            this.processMouseBounce();
        }
        else {
            Utils_2.Utils.divModeExecute(Modes_2.DivMode.bounce, divs, (selector, div) => this.singleSelectorBounce(selector, div));
        }
    }
    reset() {
    }
    processMouseBounce() {
        const container = this.container;
        const pxRatio = container.retina.pixelRatio;
        const tolerance = 10 * pxRatio;
        const mousePos = container.interactivity.mouse.position;
        const radius = container.retina.bounceModeDistance;
        if (mousePos) {
            this.processBounce(mousePos, radius, new Utils_2.Circle(mousePos.x, mousePos.y, radius + tolerance));
        }
    }
    singleSelectorBounce(selector, div) {
        const container = this.container;
        const query = document.querySelectorAll(selector);
        if (!query.length) {
            return;
        }
        query.forEach((item) => {
            const elem = item;
            const pxRatio = container.retina.pixelRatio;
            const pos = {
                x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
                y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio,
            };
            const radius = (elem.offsetWidth / 2) * pxRatio;
            const tolerance = 10 * pxRatio;
            const area = div.type === Types_1.DivType.circle
                ? new Utils_2.Circle(pos.x, pos.y, radius + tolerance)
                : new Utils_2.Rectangle(elem.offsetLeft * pxRatio - tolerance, elem.offsetTop * pxRatio - tolerance, elem.offsetWidth * pxRatio + tolerance * 2, elem.offsetHeight * pxRatio + tolerance * 2);
            this.processBounce(pos, radius, area);
        });
    }
    processBounce(position, radius, area) {
        const query = this.container.particles.quadTree.query(area);
        for (const particle of query) {
            if (area instanceof Utils_2.Circle) {
                Utils_2.Utils.circleBounce(Utils_2.Utils.circleBounceDataFromParticle(particle), {
                    position,
                    radius,
                    velocity: {
                        horizontal: 0,
                        vertical: 0,
                    },
                    factor: {
                        horizontal: 0,
                        vertical: 0,
                    },
                });
            }
            else if (area instanceof Utils_2.Rectangle) {
                Utils_2.Utils.rectBounce(particle, Utils_2.Utils.calculateBounds(position, radius));
            }
        }
    }
}
exports.Bouncer = Bouncer;

},{"../../Utils":"../node_modules/tsparticles/dist/Utils/index.js","../../Enums/Modes":"../node_modules/tsparticles/dist/Enums/Modes/index.js","../../Enums/Types":"../node_modules/tsparticles/dist/Enums/Types/index.js"}],"../node_modules/tsparticles/dist/Core/Particle/InteractionManager.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionManager = void 0;
const Grabber_1 = require("../../Interactions/External/Grabber");
const Repulser_1 = require("../../Interactions/External/Repulser");
const Bubbler_1 = require("../../Interactions/External/Bubbler");
const Connector_1 = require("../../Interactions/External/Connector");
const Linker_1 = require("../../Interactions/Particles/Linker");
const Attractor_1 = require("../../Interactions/Particles/Attractor");
const Collider_1 = require("../../Interactions/Particles/Collider");
const Infecter_1 = require("../../Interactions/Particles/Infecter");
const TrailMaker_1 = require("../../Interactions/External/TrailMaker");
const Attractor_2 = require("../../Interactions/External/Attractor");
const Lighter_1 = require("../../Interactions/Particles/Lighter");
const Lighter_2 = require("../../Interactions/External/Lighter");
const Bouncer_1 = require("../../Interactions/External/Bouncer");
class InteractionManager {
    constructor(container) {
        this.container = container;
        this.externalInteractors = [
            new Bouncer_1.Bouncer(container),
            new Bubbler_1.Bubbler(container),
            new Connector_1.Connector(container),
            new Grabber_1.Grabber(container),
            new Lighter_2.Lighter(container),
            new Attractor_2.Attractor(container),
            new Repulser_1.Repulser(container),
            new TrailMaker_1.TrailMaker(container),
        ];
        this.particleInteractors = [
            new Attractor_1.Attractor(container),
            new Lighter_1.Lighter(container),
            new Collider_1.Collider(container),
            new Infecter_1.Infecter(container),
            new Linker_1.Linker(container),
        ];
    }
    init() {
    }
    externalInteract(delta) {
        for (const interactor of this.externalInteractors) {
            if (interactor.isEnabled()) {
                interactor.interact(delta);
            }
        }
    }
    particlesInteract(particle, delta) {
        for (const interactor of this.externalInteractors) {
            interactor.reset(particle);
        }
        for (const interactor of this.particleInteractors) {
            if (interactor.isEnabled(particle)) {
                interactor.interact(particle, delta);
            }
        }
    }
}
exports.InteractionManager = InteractionManager;

},{"../../Interactions/External/Grabber":"../node_modules/tsparticles/dist/Interactions/External/Grabber.js","../../Interactions/External/Repulser":"../node_modules/tsparticles/dist/Interactions/External/Repulser.js","../../Interactions/External/Bubbler":"../node_modules/tsparticles/dist/Interactions/External/Bubbler.js","../../Interactions/External/Connector":"../node_modules/tsparticles/dist/Interactions/External/Connector.js","../../Interactions/Particles/Linker":"../node_modules/tsparticles/dist/Interactions/Particles/Linker.js","../../Interactions/Particles/Attractor":"../node_modules/tsparticles/dist/Interactions/Particles/Attractor.js","../../Interactions/Particles/Collider":"../node_modules/tsparticles/dist/Interactions/Particles/Collider.js","../../Interactions/Particles/Infecter":"../node_modules/tsparticles/dist/Interactions/Particles/Infecter.js","../../Interactions/External/TrailMaker":"../node_modules/tsparticles/dist/Interactions/External/TrailMaker.js","../../Interactions/External/Attractor":"../node_modules/tsparticles/dist/Interactions/External/Attractor.js","../../Interactions/Particles/Lighter":"../node_modules/tsparticles/dist/Interactions/Particles/Lighter.js","../../Interactions/External/Lighter":"../node_modules/tsparticles/dist/Interactions/External/Lighter.js","../../Interactions/External/Bouncer":"../node_modules/tsparticles/dist/Interactions/External/Bouncer.js"}],"../node_modules/tsparticles/dist/Core/Particles.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Particles = void 0;
const Particle_1 = require("./Particle");
const Utils_1 = require("../Utils");
const InteractionManager_1 = require("./Particle/InteractionManager");
class Particles {
    constructor(container) {
        this.container = container;
        this.nextId = 0;
        this.array = [];
        this.limit = 0;
        this.linksFreq = new Map();
        this.trianglesFreq = new Map();
        this.interactionManager = new InteractionManager_1.InteractionManager(container);
        const canvasSize = this.container.canvas.size;
        this.linksColors = new Map();
        this.quadTree = new Utils_1.QuadTree(new Utils_1.Rectangle(-canvasSize.width / 4, -canvasSize.height / 4, (canvasSize.width * 3) / 2, (canvasSize.height * 3) / 2), 4);
    }
    get count() {
        return this.array.length;
    }
    init() {
        const container = this.container;
        const options = container.actualOptions;
        this.linksFreq = new Map();
        this.trianglesFreq = new Map();
        let handled = false;
        for (const particle of options.manualParticles) {
            const pos = particle.position
                ? {
                    x: (particle.position.x * container.canvas.size.width) / 100,
                    y: (particle.position.y * container.canvas.size.height) / 100,
                }
                : undefined;
            this.addParticle(pos, particle.options);
        }
        for (const [, plugin] of container.plugins) {
            if (plugin.particlesInitialization !== undefined) {
                handled = plugin.particlesInitialization();
            }
            if (handled) {
                break;
            }
        }
        if (!handled) {
            for (let i = this.count; i < options.particles.number.value; i++) {
                this.addParticle();
            }
        }
        if (options.infection.enable) {
            for (let i = 0; i < options.infection.infections; i++) {
                const notInfected = this.array.filter((p) => p.infecter.infectionStage === undefined);
                const infected = Utils_1.Utils.itemFromArray(notInfected);
                infected.infecter.startInfection(0);
            }
        }
        this.interactionManager.init();
        container.pathGenerator.init();
    }
    redraw() {
        this.clear();
        this.init();
        this.draw({ value: 0, factor: 0 });
    }
    removeAt(index, quantity) {
        if (index >= 0 && index <= this.count) {
            for (const particle of this.array.splice(index, quantity !== null && quantity !== void 0 ? quantity : 1)) {
                particle.destroy();
            }
        }
    }
    remove(particle) {
        this.removeAt(this.array.indexOf(particle));
    }
    update(delta) {
        const container = this.container;
        const particlesToDelete = [];
        container.pathGenerator.update();
        for (const [, plugin] of container.plugins) {
            if (plugin.update !== undefined) {
                plugin.update(delta);
            }
        }
        for (const particle of this.array) {
            const resizeFactor = this.container.canvas.resizeFactor;
            if (resizeFactor) {
                particle.position.x *= resizeFactor.width;
                particle.position.y *= resizeFactor.height;
            }
            particle.move(delta);
            if (particle.destroyed) {
                particlesToDelete.push(particle);
                continue;
            }
            this.quadTree.insert(new Utils_1.Point(particle.getPosition(), particle));
        }
        for (const particle of particlesToDelete) {
            this.remove(particle);
        }
        this.interactionManager.externalInteract(delta);
        for (const particle of this.container.particles.array) {
            particle.update(delta);
            if (!particle.destroyed && !particle.spawning) {
                this.interactionManager.particlesInteract(particle, delta);
            }
        }
        delete container.canvas.resizeFactor;
    }
    draw(delta) {
        const container = this.container;
        container.canvas.clear();
        const canvasSize = this.container.canvas.size;
        this.quadTree = new Utils_1.QuadTree(new Utils_1.Rectangle(-canvasSize.width / 4, -canvasSize.height / 4, (canvasSize.width * 3) / 2, (canvasSize.height * 3) / 2), 4);
        this.update(delta);
        for (const [, plugin] of container.plugins) {
            container.canvas.drawPlugin(plugin, delta);
        }
        for (const p of this.array) {
            p.draw(delta);
        }
    }
    clear() {
        this.array = [];
    }
    push(nb, mouse, overrideOptions) {
        const container = this.container;
        const options = container.actualOptions;
        const limit = options.particles.number.limit * container.density;
        this.pushing = true;
        if (limit > 0) {
            const countToRemove = this.count + nb - limit;
            if (countToRemove > 0) {
                this.removeQuantity(countToRemove);
            }
        }
        for (let i = 0; i < nb; i++) {
            this.addParticle(mouse === null || mouse === void 0 ? void 0 : mouse.position, overrideOptions);
        }
        this.pushing = false;
    }
    addParticle(position, overrideOptions) {
        try {
            const particle = new Particle_1.Particle(this.nextId, this.container, position, overrideOptions);
            this.array.push(particle);
            this.nextId++;
            return particle;
        }
        catch (_a) {
            console.warn("error adding particle");
            return;
        }
    }
    removeQuantity(quantity) {
        this.removeAt(0, quantity);
    }
    getLinkFrequency(p1, p2) {
        const key = `${Math.min(p1.id, p2.id)}_${Math.max(p1.id, p2.id)}`;
        let res = this.linksFreq.get(key);
        if (res === undefined) {
            res = Math.random();
            this.linksFreq.set(key, res);
        }
        return res;
    }
    getTriangleFrequency(p1, p2, p3) {
        let [id1, id2, id3] = [p1.id, p2.id, p3.id];
        if (id1 > id2) {
            [id2, id1] = [id1, id2];
        }
        if (id2 > id3) {
            [id3, id2] = [id2, id3];
        }
        if (id1 > id3) {
            [id3, id1] = [id1, id3];
        }
        const key = `${id1}_${id2}_${id3}`;
        let res = this.trianglesFreq.get(key);
        if (res === undefined) {
            res = Math.random();
            this.trianglesFreq.set(key, res);
        }
        return res;
    }
    setDensity() {
        const options = this.container.actualOptions;
        this.applyDensity(options.particles);
    }
    applyDensity(options) {
        var _a;
        if (!((_a = options.number.density) === null || _a === void 0 ? void 0 : _a.enable)) {
            return;
        }
        const numberOptions = options.number;
        const densityFactor = this.initDensityFactor(numberOptions.density);
        const optParticlesNumber = numberOptions.value;
        const optParticlesLimit = numberOptions.limit > 0 ? numberOptions.limit : optParticlesNumber;
        const particlesNumber = Math.min(optParticlesNumber, optParticlesLimit) * densityFactor;
        const particlesCount = this.count;
        this.limit = numberOptions.limit * densityFactor;
        if (particlesCount < particlesNumber) {
            this.push(Math.abs(particlesNumber - particlesCount), undefined, options);
        }
        else if (particlesCount > particlesNumber) {
            this.removeQuantity(particlesCount - particlesNumber);
        }
    }
    initDensityFactor(densityOptions) {
        const container = this.container;
        if (!container.canvas.element || !densityOptions.enable) {
            return 1;
        }
        const canvas = container.canvas.element;
        const pxRatio = container.retina.pixelRatio;
        return (canvas.width * canvas.height) / (densityOptions.factor * pxRatio * pxRatio * densityOptions.area);
    }
}
exports.Particles = Particles;

},{"./Particle":"../node_modules/tsparticles/dist/Core/Particle.js","../Utils":"../node_modules/tsparticles/dist/Utils/index.js","./Particle/InteractionManager":"../node_modules/tsparticles/dist/Core/Particle/InteractionManager.js"}],"../node_modules/tsparticles/dist/Core/Retina.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Retina = void 0;
const Utils_1 = require("../Utils");
class Retina {
    constructor(container) {
        this.container = container;
    }
    init() {
        const container = this.container;
        const options = container.actualOptions;
        if (options.detectRetina) {
            this.pixelRatio = Utils_1.Utils.isSsr() ? 1 : window.devicePixelRatio;
        }
        else {
            this.pixelRatio = 1;
        }
        const motionOptions = this.container.actualOptions.motion;
        if (motionOptions && (motionOptions.disable || motionOptions.reduce.value)) {
            if (Utils_1.Utils.isSsr() || typeof matchMedia === "undefined" || !matchMedia) {
                this.reduceFactor = 1;
            }
            else {
                const mediaQuery = matchMedia("(prefers-reduced-motion: reduce)");
                if (mediaQuery) {
                    this.handleMotionChange(mediaQuery);
                    const handleChange = () => {
                        this.handleMotionChange(mediaQuery);
                        container.refresh().catch(() => {
                        });
                    };
                    if (mediaQuery.addEventListener !== undefined) {
                        mediaQuery.addEventListener("change", handleChange);
                    }
                    else if (mediaQuery.addListener !== undefined) {
                        mediaQuery.addListener(handleChange);
                    }
                }
            }
        }
        else {
            this.reduceFactor = 1;
        }
        const ratio = this.pixelRatio;
        if (container.canvas.element) {
            const element = container.canvas.element;
            container.canvas.size.width = element.offsetWidth * ratio;
            container.canvas.size.height = element.offsetHeight * ratio;
        }
        const particles = options.particles;
        this.linksDistance = particles.links.distance * ratio;
        this.linksWidth = particles.links.width * ratio;
        this.moveSpeed = particles.move.speed * ratio;
        this.sizeValue = particles.size.value * ratio;
        this.sizeAnimationSpeed = particles.size.animation.speed * ratio;
        const modes = options.interactivity.modes;
        this.connectModeDistance = modes.connect.distance * ratio;
        this.connectModeRadius = modes.connect.radius * ratio;
        this.grabModeDistance = modes.grab.distance * ratio;
        this.repulseModeDistance = modes.repulse.distance * ratio;
        this.bounceModeDistance = modes.bounce.distance * ratio;
        this.attractModeDistance = modes.attract.distance * ratio;
        this.slowModeRadius = modes.slow.radius * ratio;
        this.bubbleModeDistance = modes.bubble.distance * ratio;
        if (modes.bubble.size) {
            this.bubbleModeSize = modes.bubble.size * ratio;
        }
    }
    initParticle(particle) {
        const particlesOptions = particle.options;
        const ratio = this.pixelRatio;
        particle.linksDistance = particlesOptions.links.distance * ratio;
        particle.linksWidth = particlesOptions.links.width * ratio;
        particle.moveSpeed = particlesOptions.move.speed * ratio;
        particle.sizeValue = particlesOptions.size.value * ratio;
        particle.sizeAnimationSpeed = particlesOptions.size.animation.speed * ratio;
        particle.maxDistance = particlesOptions.move.distance * ratio;
    }
    handleMotionChange(mediaQuery) {
        const options = this.container.actualOptions;
        if (mediaQuery.matches) {
            const motion = options.motion;
            this.reduceFactor = motion.disable ? 0 : motion.reduce.value ? 1 / motion.reduce.factor : 1;
        }
        else {
            this.reduceFactor = 1;
        }
    }
}
exports.Retina = Retina;

},{"../Utils":"../node_modules/tsparticles/dist/Utils/index.js"}],"../node_modules/tsparticles/dist/Core/FrameManager.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameManager = void 0;
class FrameManager {
    constructor(container) {
        this.container = container;
    }
    nextFrame(timestamp) {
        try {
            const container = this.container;
            if (container.lastFrameTime !== undefined &&
                timestamp < container.lastFrameTime + 1000 / container.fpsLimit) {
                container.draw();
                return;
            }
            const deltaValue = timestamp - container.lastFrameTime;
            const delta = {
                value: deltaValue,
                factor: (60 * deltaValue) / 1000,
            };
            container.lastFrameTime = timestamp;
            container.particles.draw(delta);
            if (container.getAnimationStatus()) {
                container.draw();
            }
        }
        catch (e) {
            console.error("tsParticles error in animation loop", e);
        }
    }
}
exports.FrameManager = FrameManager;

},{}],"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Events/ClickEvent.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClickEvent = void 0;
class ClickEvent {
    constructor() {
        this.enable = false;
        this.mode = [];
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
    }
}
exports.ClickEvent = ClickEvent;

},{}],"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Events/DivEvent.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DivEvent = void 0;
const Enums_1 = require("../../../../Enums");
class DivEvent {
    constructor() {
        this.selectors = [];
        this.enable = false;
        this.mode = [];
        this.type = Enums_1.DivType.circle;
    }
    get elementId() {
        return this.ids;
    }
    set elementId(value) {
        this.ids = value;
    }
    get el() {
        return this.elementId;
    }
    set el(value) {
        this.elementId = value;
    }
    get ids() {
        if (this.selectors instanceof Array) {
            return this.selectors.map((t) => t.replace("#", ""));
        }
        else {
            return this.selectors.replace("#", "");
        }
    }
    set ids(value) {
        if (value instanceof Array) {
            this.selectors = value.map((t) => `#${t}`);
        }
        else {
            this.selectors = `#${value}`;
        }
    }
    load(data) {
        var _a, _b;
        if (data === undefined) {
            return;
        }
        const ids = (_b = (_a = data.ids) !== null && _a !== void 0 ? _a : data.elementId) !== null && _b !== void 0 ? _b : data.el;
        if (ids !== undefined) {
            this.ids = ids;
        }
        if (data.selectors !== undefined) {
            this.selectors = data.selectors;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        if (data.type !== undefined) {
            this.type = data.type;
        }
    }
}
exports.DivEvent = DivEvent;

},{"../../../../Enums":"../node_modules/tsparticles/dist/Enums/index.js"}],"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Events/Parallax.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parallax = void 0;
class Parallax {
    constructor() {
        this.enable = false;
        this.force = 2;
        this.smooth = 10;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.force !== undefined) {
            this.force = data.force;
        }
        if (data.smooth !== undefined) {
            this.smooth = data.smooth;
        }
    }
}
exports.Parallax = Parallax;

},{}],"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Events/HoverEvent.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoverEvent = void 0;
const Parallax_1 = require("./Parallax");
class HoverEvent {
    constructor() {
        this.enable = false;
        this.mode = [];
        this.parallax = new Parallax_1.Parallax();
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        this.parallax.load(data.parallax);
    }
}
exports.HoverEvent = HoverEvent;

},{"./Parallax":"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Events/Parallax.js"}],"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Events/Events.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = void 0;
const ClickEvent_1 = require("./ClickEvent");
const DivEvent_1 = require("./DivEvent");
const HoverEvent_1 = require("./HoverEvent");
class Events {
    constructor() {
        this.onClick = new ClickEvent_1.ClickEvent();
        this.onDiv = new DivEvent_1.DivEvent();
        this.onHover = new HoverEvent_1.HoverEvent();
        this.resize = true;
    }
    get onclick() {
        return this.onClick;
    }
    set onclick(value) {
        this.onClick = value;
    }
    get ondiv() {
        return this.onDiv;
    }
    set ondiv(value) {
        this.onDiv = value;
    }
    get onhover() {
        return this.onHover;
    }
    set onhover(value) {
        this.onHover = value;
    }
    load(data) {
        var _a, _b, _c;
        if (data === undefined) {
            return;
        }
        this.onClick.load((_a = data.onClick) !== null && _a !== void 0 ? _a : data.onclick);
        const onDiv = (_b = data.onDiv) !== null && _b !== void 0 ? _b : data.ondiv;
        if (onDiv !== undefined) {
            if (onDiv instanceof Array) {
                this.onDiv = onDiv.map((div) => {
                    const tmp = new DivEvent_1.DivEvent();
                    tmp.load(div);
                    return tmp;
                });
            }
            else {
                this.onDiv = new DivEvent_1.DivEvent();
                this.onDiv.load(onDiv);
            }
        }
        this.onHover.load((_c = data.onHover) !== null && _c !== void 0 ? _c : data.onhover);
        if (data.resize !== undefined) {
            this.resize = data.resize;
        }
    }
}
exports.Events = Events;

},{"./ClickEvent":"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Events/ClickEvent.js","./DivEvent":"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Events/DivEvent.js","./HoverEvent":"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Events/HoverEvent.js"}],"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/BubbleBase.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BubbleBase = void 0;
const OptionsColor_1 = require("../../OptionsColor");
class BubbleBase {
    constructor() {
        this.distance = 200;
        this.duration = 0.4;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
        if (data.duration !== undefined) {
            this.duration = data.duration;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
        if (data.color !== undefined) {
            if (data.color instanceof Array) {
                this.color = data.color.map((s) => OptionsColor_1.OptionsColor.create(undefined, s));
            }
            else {
                if (this.color instanceof Array) {
                    this.color = new OptionsColor_1.OptionsColor();
                }
                this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
            }
        }
        if (data.size !== undefined) {
            this.size = data.size;
        }
    }
}
exports.BubbleBase = BubbleBase;

},{"../../OptionsColor":"../node_modules/tsparticles/dist/Options/Classes/OptionsColor.js"}],"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/BubbleDiv.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BubbleDiv = void 0;
const BubbleBase_1 = require("./BubbleBase");
class BubbleDiv extends BubbleBase_1.BubbleBase {
    constructor() {
        super();
        this.selectors = [];
    }
    get ids() {
        if (this.selectors instanceof Array) {
            return this.selectors.map((t) => t.replace("#", ""));
        }
        else {
            return this.selectors.replace("#", "");
        }
    }
    set ids(value) {
        if (value instanceof Array) {
            this.selectors = value.map((t) => `#${t}`);
        }
        else {
            this.selectors = `#${value}`;
        }
    }
    load(data) {
        super.load(data);
        if (data === undefined) {
            return;
        }
        if (data.ids !== undefined) {
            this.ids = data.ids;
        }
        if (data.selectors !== undefined) {
            this.selectors = data.selectors;
        }
    }
}
exports.BubbleDiv = BubbleDiv;

},{"./BubbleBase":"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/BubbleBase.js"}],"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/Bubble.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bubble = void 0;
const BubbleDiv_1 = require("./BubbleDiv");
const BubbleBase_1 = require("./BubbleBase");
class Bubble extends BubbleBase_1.BubbleBase {
    load(data) {
        super.load(data);
        if (!(data !== undefined && data.divs !== undefined)) {
            return;
        }
        if (data.divs instanceof Array) {
            this.divs = data.divs.map((s) => {
                const tmp = new BubbleDiv_1.BubbleDiv();
                tmp.load(s);
                return tmp;
            });
        }
        else {
            if (this.divs instanceof Array || !this.divs) {
                this.divs = new BubbleDiv_1.BubbleDiv();
            }
            this.divs.load(data.divs);
        }
    }
}
exports.Bubble = Bubble;

},{"./BubbleDiv":"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/BubbleDiv.js","./BubbleBase":"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/BubbleBase.js"}],"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/ConnectLinks.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectLinks = void 0;
class ConnectLinks {
    constructor() {
        this.opacity = 0.5;
    }
    load(data) {
        if (!(data !== undefined && data.opacity !== undefined)) {
            return;
        }
        this.opacity = data.opacity;
    }
}
exports.ConnectLinks = ConnectLinks;

},{}],"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/Connect.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connect = void 0;
const ConnectLinks_1 = require("./ConnectLinks");
class Connect {
    constructor() {
        this.distance = 80;
        this.links = new ConnectLinks_1.ConnectLinks();
        this.radius = 60;
    }
    get line_linked() {
        return this.links;
    }
    set line_linked(value) {
        this.links = value;
    }
    get lineLinked() {
        return this.links;
    }
    set lineLinked(value) {
        this.links = value;
    }
    load(data) {
        var _a, _b;
        if (data === undefined) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
        this.links.load((_b = (_a = data.links) !== null && _a !== void 0 ? _a : data.lineLinked) !== null && _b !== void 0 ? _b : data.line_linked);
        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}
exports.Connect = Connect;

},{"./ConnectLinks":"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/ConnectLinks.js"}],"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/GrabLinks.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrabLinks = void 0;
const OptionsColor_1 = require("../../OptionsColor");
class GrabLinks {
    constructor() {
        this.blink = false;
        this.consent = false;
        this.opacity = 1;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.blink !== undefined) {
            this.blink = data.blink;
        }
        if (data.color !== undefined) {
            this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
        }
        if (data.consent !== undefined) {
            this.consent = data.consent;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}
exports.GrabLinks = GrabLinks;

},{"../../OptionsColor":"../node_modules/tsparticles/dist/Options/Classes/OptionsColor.js"}],"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/Grab.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grab = void 0;
const GrabLinks_1 = require("./GrabLinks");
class Grab {
    constructor() {
        this.distance = 100;
        this.links = new GrabLinks_1.GrabLinks();
    }
    get line_linked() {
        return this.links;
    }
    set line_linked(value) {
        this.links = value;
    }
    get lineLinked() {
        return this.links;
    }
    set lineLinked(value) {
        this.links = value;
    }
    load(data) {
        var _a, _b;
        if (data === undefined) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
        this.links.load((_b = (_a = data.links) !== null && _a !== void 0 ? _a : data.lineLinked) !== null && _b !== void 0 ? _b : data.line_linked);
    }
}
exports.Grab = Grab;

},{"./GrabLinks":"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/GrabLinks.js"}],"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/Remove.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Remove = void 0;
class Remove {
    constructor() {
        this.quantity = 2;
    }
    get particles_nb() {
        return this.quantity;
    }
    set particles_nb(value) {
        this.quantity = value;
    }
    load(data) {
        var _a;
        if (data === undefined) {
            return;
        }
        const quantity = (_a = data.quantity) !== null && _a !== void 0 ? _a : data.particles_nb;
        if (quantity !== undefined) {
            this.quantity = quantity;
        }
    }
}
exports.Remove = Remove;

},{}],"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/Push.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Push = void 0;
class Push {
    constructor() {
        this.quantity = 4;
    }
    get particles_nb() {
        return this.quantity;
    }
    set particles_nb(value) {
        this.quantity = value;
    }
    load(data) {
        var _a;
        if (data === undefined) {
            return;
        }
        const quantity = (_a = data.quantity) !== null && _a !== void 0 ? _a : data.particles_nb;
        if (quantity !== undefined) {
            this.quantity = quantity;
        }
    }
}
exports.Push = Push;

},{}],"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/RepulseBase.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepulseBase = void 0;
class RepulseBase {
    constructor() {
        this.distance = 200;
        this.duration = 0.4;
        this.speed = 1;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
        if (data.duration !== undefined) {
            this.duration = data.duration;
        }
        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
    }
}
exports.RepulseBase = RepulseBase;

},{}],"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/RepulseDiv.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepulseDiv = void 0;
const RepulseBase_1 = require("./RepulseBase");
class RepulseDiv extends RepulseBase_1.RepulseBase {
    constructor() {
        super();
        this.selectors = [];
    }
    get ids() {
        if (this.selectors instanceof Array) {
            return this.selectors.map((t) => t.replace("#", ""));
        }
        else {
            return this.selectors.replace("#", "");
        }
    }
    set ids(value) {
        if (value instanceof Array) {
            this.selectors = value.map(() => `#${value}`);
        }
        else {
            this.selectors = `#${value}`;
        }
    }
    load(data) {
        super.load(data);
        if (data === undefined) {
            return;
        }
        if (data.ids !== undefined) {
            this.ids = data.ids;
        }
        if (data.selectors !== undefined) {
            this.selectors = data.selectors;
        }
    }
}
exports.RepulseDiv = RepulseDiv;

},{"./RepulseBase":"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/RepulseBase.js"}],"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/Repulse.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repulse = void 0;
const RepulseDiv_1 = require("./RepulseDiv");
const RepulseBase_1 = require("./RepulseBase");
class Repulse extends RepulseBase_1.RepulseBase {
    load(data) {
        super.load(data);
        if ((data === null || data === void 0 ? void 0 : data.divs) === undefined) {
            return;
        }
        if (data.divs instanceof Array) {
            this.divs = data.divs.map((s) => {
                const tmp = new RepulseDiv_1.RepulseDiv();
                tmp.load(s);
                return tmp;
            });
        }
        else {
            if (this.divs instanceof Array || !this.divs) {
                this.divs = new RepulseDiv_1.RepulseDiv();
            }
            this.divs.load(data.divs);
        }
    }
}
exports.Repulse = Repulse;

},{"./RepulseDiv":"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/RepulseDiv.js","./RepulseBase":"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/RepulseBase.js"}],"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/Slow.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slow = void 0;
class Slow {
    constructor() {
        this.factor = 3;
        this.radius = 200;
    }
    get active() {
        return false;
    }
    set active(_value) {
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.factor !== undefined) {
            this.factor = data.factor;
        }
        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}
exports.Slow = Slow;

},{}],"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/Trail.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trail = void 0;
const Utils_1 = require("../../../../Utils");
class Trail {
    constructor() {
        this.delay = 1;
        this.quantity = 1;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.delay !== undefined) {
            this.delay = data.delay;
        }
        if (data.quantity !== undefined) {
            this.quantity = data.quantity;
        }
        if (data.particles !== undefined) {
            this.particles = Utils_1.Utils.deepExtend({}, data.particles);
        }
    }
}
exports.Trail = Trail;

},{"../../../../Utils":"../node_modules/tsparticles/dist/Utils/index.js"}],"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/Attract.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attract = void 0;
class Attract {
    constructor() {
        this.distance = 200;
        this.duration = 0.4;
        this.speed = 1;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
        if (data.duration !== undefined) {
            this.duration = data.duration;
        }
        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
    }
}
exports.Attract = Attract;

},{}],"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/LightGradient.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightGradient = void 0;
const OptionsColor_1 = require("../../OptionsColor");
class LightGradient {
    constructor() {
        this.start = new OptionsColor_1.OptionsColor();
        this.stop = new OptionsColor_1.OptionsColor();
        this.start.value = "#ffffff";
        this.stop.value = "#000000";
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        this.start = OptionsColor_1.OptionsColor.create(this.start, data.start);
        this.stop = OptionsColor_1.OptionsColor.create(this.stop, data.stop);
    }
}
exports.LightGradient = LightGradient;

},{"../../OptionsColor":"../node_modules/tsparticles/dist/Options/Classes/OptionsColor.js"}],"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/LightArea.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightArea = void 0;
const LightGradient_1 = require("./LightGradient");
class LightArea {
    constructor() {
        this.gradient = new LightGradient_1.LightGradient();
        this.radius = 1000;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        this.gradient.load(data.gradient);
        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}
exports.LightArea = LightArea;

},{"./LightGradient":"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/LightGradient.js"}],"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/LightShadow.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightShadow = void 0;
const OptionsColor_1 = require("../../OptionsColor");
class LightShadow {
    constructor() {
        this.color = new OptionsColor_1.OptionsColor();
        this.color.value = "#000000";
        this.length = 2000;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
        if (data.length !== undefined) {
            this.length = data.length;
        }
    }
}
exports.LightShadow = LightShadow;

},{"../../OptionsColor":"../node_modules/tsparticles/dist/Options/Classes/OptionsColor.js"}],"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/Light.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Light = void 0;
const LightArea_1 = require("./LightArea");
const LightShadow_1 = require("./LightShadow");
class Light {
    constructor() {
        this.area = new LightArea_1.LightArea();
        this.shadow = new LightShadow_1.LightShadow();
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        this.area.load(data.area);
        this.shadow.load(data.shadow);
    }
}
exports.Light = Light;

},{"./LightArea":"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/LightArea.js","./LightShadow":"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/LightShadow.js"}],"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/Bounce.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bounce = void 0;
class Bounce {
    constructor() {
        this.distance = 200;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
    }
}
exports.Bounce = Bounce;

},{}],"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/Modes.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modes = void 0;
const Bubble_1 = require("./Bubble");
const Connect_1 = require("./Connect");
const Grab_1 = require("./Grab");
const Remove_1 = require("./Remove");
const Push_1 = require("./Push");
const Repulse_1 = require("./Repulse");
const Slow_1 = require("./Slow");
const Trail_1 = require("./Trail");
const Attract_1 = require("./Attract");
const Light_1 = require("./Light");
const Bounce_1 = require("./Bounce");
class Modes {
    constructor() {
        this.attract = new Attract_1.Attract();
        this.bounce = new Bounce_1.Bounce();
        this.bubble = new Bubble_1.Bubble();
        this.connect = new Connect_1.Connect();
        this.grab = new Grab_1.Grab();
        this.light = new Light_1.Light();
        this.push = new Push_1.Push();
        this.remove = new Remove_1.Remove();
        this.repulse = new Repulse_1.Repulse();
        this.slow = new Slow_1.Slow();
        this.trail = new Trail_1.Trail();
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        this.attract.load(data.attract);
        this.bubble.load(data.bubble);
        this.connect.load(data.connect);
        this.grab.load(data.grab);
        this.light.load(data.light);
        this.push.load(data.push);
        this.remove.load(data.remove);
        this.repulse.load(data.repulse);
        this.slow.load(data.slow);
        this.trail.load(data.trail);
    }
}
exports.Modes = Modes;

},{"./Bubble":"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/Bubble.js","./Connect":"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/Connect.js","./Grab":"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/Grab.js","./Remove":"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/Remove.js","./Push":"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/Push.js","./Repulse":"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/Repulse.js","./Slow":"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/Slow.js","./Trail":"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/Trail.js","./Attract":"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/Attract.js","./Light":"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/Light.js","./Bounce":"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/Bounce.js"}],"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Interactivity.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interactivity = void 0;
const Enums_1 = require("../../../Enums");
const Events_1 = require("./Events/Events");
const Modes_1 = require("./Modes/Modes");
class Interactivity {
    constructor() {
        this.detectsOn = Enums_1.InteractivityDetect.canvas;
        this.events = new Events_1.Events();
        this.modes = new Modes_1.Modes();
    }
    get detect_on() {
        return this.detectsOn;
    }
    set detect_on(value) {
        this.detectsOn = value;
    }
    load(data) {
        var _a, _b, _c;
        if (data === undefined) {
            return;
        }
        const detectsOn = (_a = data.detectsOn) !== null && _a !== void 0 ? _a : data.detect_on;
        if (detectsOn !== undefined) {
            this.detectsOn = detectsOn;
        }
        this.events.load(data.events);
        this.modes.load(data.modes);
        if (((_c = (_b = data.modes) === null || _b === void 0 ? void 0 : _b.slow) === null || _c === void 0 ? void 0 : _c.active) === true) {
            if (this.events.onHover.mode instanceof Array) {
                if (this.events.onHover.mode.indexOf(Enums_1.HoverMode.slow) < 0) {
                    this.events.onHover.mode.push(Enums_1.HoverMode.slow);
                }
            }
            else if (this.events.onHover.mode !== Enums_1.HoverMode.slow) {
                this.events.onHover.mode = [this.events.onHover.mode, Enums_1.HoverMode.slow];
            }
        }
    }
}
exports.Interactivity = Interactivity;

},{"../../../Enums":"../node_modules/tsparticles/dist/Enums/index.js","./Events/Events":"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Events/Events.js","./Modes/Modes":"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Modes/Modes.js"}],"../node_modules/tsparticles/dist/Options/Classes/BackgroundMask/BackgroundMaskCover.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackgroundMaskCover = void 0;
const OptionsColor_1 = require("../OptionsColor");
class BackgroundMaskCover {
    constructor() {
        this.color = new OptionsColor_1.OptionsColor();
        this.opacity = 1;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.color !== undefined) {
            this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}
exports.BackgroundMaskCover = BackgroundMaskCover;

},{"../OptionsColor":"../node_modules/tsparticles/dist/Options/Classes/OptionsColor.js"}],"../node_modules/tsparticles/dist/Options/Classes/BackgroundMask/BackgroundMask.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackgroundMask = void 0;
const BackgroundMaskCover_1 = require("./BackgroundMaskCover");
class BackgroundMask {
    constructor() {
        this.composite = "destination-out";
        this.cover = new BackgroundMaskCover_1.BackgroundMaskCover();
        this.enable = false;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.composite !== undefined) {
            this.composite = data.composite;
        }
        if (data.cover !== undefined) {
            const cover = data.cover;
            const color = (typeof data.cover === "string" ? { color: data.cover } : data.cover);
            this.cover.load(cover.color !== undefined ? cover : { color: color });
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
    }
}
exports.BackgroundMask = BackgroundMask;

},{"./BackgroundMaskCover":"../node_modules/tsparticles/dist/Options/Classes/BackgroundMask/BackgroundMaskCover.js"}],"../node_modules/tsparticles/dist/Options/Classes/Background/Background.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Background = void 0;
const OptionsColor_1 = require("../OptionsColor");
class Background {
    constructor() {
        this.color = new OptionsColor_1.OptionsColor();
        this.color.value = "";
        this.image = "";
        this.position = "";
        this.repeat = "";
        this.size = "";
        this.opacity = 1;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.color !== undefined) {
            this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
        }
        if (data.image !== undefined) {
            this.image = data.image;
        }
        if (data.position !== undefined) {
            this.position = data.position;
        }
        if (data.repeat !== undefined) {
            this.repeat = data.repeat;
        }
        if (data.size !== undefined) {
            this.size = data.size;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}
exports.Background = Background;

},{"../OptionsColor":"../node_modules/tsparticles/dist/Options/Classes/OptionsColor.js"}],"../node_modules/tsparticles/dist/Options/Classes/Infection/InfectionStage.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfectionStage = void 0;
const OptionsColor_1 = require("../OptionsColor");
class InfectionStage {
    constructor() {
        this.color = new OptionsColor_1.OptionsColor();
        this.color.value = "#ff0000";
        this.radius = 0;
        this.rate = 1;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.color !== undefined) {
            this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
        }
        this.duration = data.duration;
        this.infectedStage = data.infectedStage;
        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
        if (data.rate !== undefined) {
            this.rate = data.rate;
        }
    }
}
exports.InfectionStage = InfectionStage;

},{"../OptionsColor":"../node_modules/tsparticles/dist/Options/Classes/OptionsColor.js"}],"../node_modules/tsparticles/dist/Options/Classes/Infection/Infection.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Infection = void 0;
const InfectionStage_1 = require("./InfectionStage");
class Infection {
    constructor() {
        this.cure = false;
        this.delay = 0;
        this.enable = false;
        this.infections = 0;
        this.stages = [];
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.cure !== undefined) {
            this.cure = data.cure;
        }
        if (data.delay !== undefined) {
            this.delay = data.delay;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.infections !== undefined) {
            this.infections = data.infections;
        }
        if (data.stages === undefined) {
            return;
        }
        this.stages = data.stages.map((t) => {
            const s = new InfectionStage_1.InfectionStage();
            s.load(t);
            return s;
        });
    }
}
exports.Infection = Infection;

},{"./InfectionStage":"../node_modules/tsparticles/dist/Options/Classes/Infection/InfectionStage.js"}],"../node_modules/tsparticles/dist/Options/Classes/Theme/ThemeDefault.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeDefault = void 0;
const Modes_1 = require("../../../Enums/Modes");
class ThemeDefault {
    constructor() {
        this.mode = Modes_1.ThemeMode.any;
        this.value = false;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
exports.ThemeDefault = ThemeDefault;

},{"../../../Enums/Modes":"../node_modules/tsparticles/dist/Enums/Modes/index.js"}],"../node_modules/tsparticles/dist/Options/Classes/Theme/Theme.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Theme = void 0;
const Utils_1 = require("../../../Utils");
const ThemeDefault_1 = require("./ThemeDefault");
class Theme {
    constructor() {
        this.name = "";
        this.default = new ThemeDefault_1.ThemeDefault();
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        this.default.load(data.default);
        if (data.options !== undefined) {
            this.options = Utils_1.Utils.deepExtend({}, data.options);
        }
    }
}
exports.Theme = Theme;

},{"../../../Utils":"../node_modules/tsparticles/dist/Utils/index.js","./ThemeDefault":"../node_modules/tsparticles/dist/Options/Classes/Theme/ThemeDefault.js"}],"../node_modules/tsparticles/dist/Options/Classes/FullScreen/FullScreen.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullScreen = void 0;
class FullScreen {
    constructor() {
        this.enable = false;
        this.zIndex = -1;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.zIndex !== undefined) {
            this.zIndex = data.zIndex;
        }
    }
}
exports.FullScreen = FullScreen;

},{}],"../node_modules/tsparticles/dist/Options/Classes/Motion/MotionReduce.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MotionReduce = void 0;
class MotionReduce {
    constructor() {
        this.factor = 4;
        this.value = true;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.factor !== undefined) {
            this.factor = data.factor;
        }
        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
exports.MotionReduce = MotionReduce;

},{}],"../node_modules/tsparticles/dist/Options/Classes/Motion/Motion.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Motion = void 0;
const MotionReduce_1 = require("./MotionReduce");
class Motion {
    constructor() {
        this.disable = false;
        this.reduce = new MotionReduce_1.MotionReduce();
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.disable !== undefined) {
            this.disable = data.disable;
        }
        this.reduce.load(data.reduce);
    }
}
exports.Motion = Motion;

},{"./MotionReduce":"../node_modules/tsparticles/dist/Options/Classes/Motion/MotionReduce.js"}],"../node_modules/tsparticles/dist/Options/Classes/ManualParticle.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManualParticle = void 0;
const Utils_1 = require("../../Utils");
class ManualParticle {
    load(data) {
        var _a, _b;
        if (!data) {
            return;
        }
        if (data.position !== undefined) {
            this.position = {
                x: (_a = data.position.x) !== null && _a !== void 0 ? _a : 50,
                y: (_b = data.position.y) !== null && _b !== void 0 ? _b : 50,
            };
        }
        if (data.options !== undefined) {
            this.options = Utils_1.Utils.deepExtend({}, data.options);
        }
    }
}
exports.ManualParticle = ManualParticle;

},{"../../Utils":"../node_modules/tsparticles/dist/Utils/index.js"}],"../node_modules/tsparticles/dist/Options/Classes/Responsive.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Responsive = void 0;
const Utils_1 = require("../../Utils");
class Responsive {
    constructor() {
        this.maxWidth = Infinity;
        this.options = {};
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.maxWidth !== undefined) {
            this.maxWidth = data.maxWidth;
        }
        if (data.options !== undefined) {
            this.options = Utils_1.Utils.deepExtend({}, data.options);
        }
    }
}
exports.Responsive = Responsive;

},{"../../Utils":"../node_modules/tsparticles/dist/Utils/index.js"}],"../node_modules/tsparticles/dist/Options/Classes/Options.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Options = void 0;
const Interactivity_1 = require("./Interactivity/Interactivity");
const Particles_1 = require("./Particles/Particles");
const BackgroundMask_1 = require("./BackgroundMask/BackgroundMask");
const Background_1 = require("./Background/Background");
const Infection_1 = require("./Infection/Infection");
const Utils_1 = require("../../Utils");
const Theme_1 = require("./Theme/Theme");
const Modes_1 = require("../../Enums/Modes");
const FullScreen_1 = require("./FullScreen/FullScreen");
const Motion_1 = require("./Motion/Motion");
const ManualParticle_1 = require("./ManualParticle");
const Responsive_1 = require("./Responsive");
class Options {
    constructor() {
        this.autoPlay = true;
        this.background = new Background_1.Background();
        this.backgroundMask = new BackgroundMask_1.BackgroundMask();
        this.fullScreen = new FullScreen_1.FullScreen();
        this.detectRetina = true;
        this.fpsLimit = 60;
        this.infection = new Infection_1.Infection();
        this.interactivity = new Interactivity_1.Interactivity();
        this.manualParticles = [];
        this.motion = new Motion_1.Motion();
        this.particles = new Particles_1.Particles();
        this.pauseOnBlur = true;
        this.pauseOnOutsideViewport = false;
        this.responsive = [];
        this.themes = [];
    }
    get fps_limit() {
        return this.fpsLimit;
    }
    set fps_limit(value) {
        this.fpsLimit = value;
    }
    get retina_detect() {
        return this.detectRetina;
    }
    set retina_detect(value) {
        this.detectRetina = value;
    }
    get backgroundMode() {
        return this.fullScreen;
    }
    set backgroundMode(value) {
        this.fullScreen.load(value);
    }
    load(data) {
        var _a, _b, _c;
        if (data === undefined) {
            return;
        }
        if (data.preset !== undefined) {
            if (data.preset instanceof Array) {
                for (const preset of data.preset) {
                    this.importPreset(preset);
                }
            }
            else {
                this.importPreset(data.preset);
            }
        }
        if (data.autoPlay !== undefined) {
            this.autoPlay = data.autoPlay;
        }
        const detectRetina = (_a = data.detectRetina) !== null && _a !== void 0 ? _a : data.retina_detect;
        if (detectRetina !== undefined) {
            this.detectRetina = detectRetina;
        }
        const fpsLimit = (_b = data.fpsLimit) !== null && _b !== void 0 ? _b : data.fps_limit;
        if (fpsLimit !== undefined) {
            this.fpsLimit = fpsLimit;
        }
        if (data.pauseOnBlur !== undefined) {
            this.pauseOnBlur = data.pauseOnBlur;
        }
        if (data.pauseOnOutsideViewport !== undefined) {
            this.pauseOnOutsideViewport = data.pauseOnOutsideViewport;
        }
        this.background.load(data.background);
        this.fullScreen.load((_c = data.fullScreen) !== null && _c !== void 0 ? _c : data.backgroundMode);
        this.backgroundMask.load(data.backgroundMask);
        this.infection.load(data.infection);
        this.interactivity.load(data.interactivity);
        if (data.manualParticles !== undefined) {
            this.manualParticles = data.manualParticles.map((t) => {
                const tmp = new ManualParticle_1.ManualParticle();
                tmp.load(t);
                return tmp;
            });
        }
        this.motion.load(data.motion);
        this.particles.load(data.particles);
        Utils_1.Plugins.loadOptions(this, data);
        if (data.responsive !== undefined) {
            for (const responsive of data.responsive) {
                const optResponsive = new Responsive_1.Responsive();
                optResponsive.load(responsive);
                this.responsive.push(optResponsive);
            }
        }
        this.responsive.sort((a, b) => a.maxWidth - b.maxWidth);
        if (data.themes !== undefined) {
            for (const theme of data.themes) {
                const optTheme = new Theme_1.Theme();
                optTheme.load(theme);
                this.themes.push(optTheme);
            }
        }
    }
    setTheme(name) {
        if (name) {
            const chosenTheme = this.themes.find((theme) => theme.name === name);
            if (chosenTheme) {
                this.load(chosenTheme.options);
            }
        }
        else {
            const clientDarkMode = typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)").matches;
            let defaultTheme = this.themes.find((theme) => theme.default.value &&
                ((theme.default.mode === Modes_1.ThemeMode.dark && clientDarkMode) ||
                    (theme.default.mode === Modes_1.ThemeMode.light && !clientDarkMode)));
            if (!defaultTheme) {
                defaultTheme = this.themes.find((theme) => theme.default.value && theme.default.mode === Modes_1.ThemeMode.any);
            }
            if (defaultTheme) {
                this.load(defaultTheme.options);
            }
        }
    }
    importPreset(preset) {
        this.load(Utils_1.Plugins.getPreset(preset));
    }
    setResponsive(width, pxRatio, defaultOptions) {
        var _a;
        this.load(defaultOptions);
        this.load((_a = this.responsive.find((t) => t.maxWidth * pxRatio > width)) === null || _a === void 0 ? void 0 : _a.options);
    }
}
exports.Options = Options;

},{"./Interactivity/Interactivity":"../node_modules/tsparticles/dist/Options/Classes/Interactivity/Interactivity.js","./Particles/Particles":"../node_modules/tsparticles/dist/Options/Classes/Particles/Particles.js","./BackgroundMask/BackgroundMask":"../node_modules/tsparticles/dist/Options/Classes/BackgroundMask/BackgroundMask.js","./Background/Background":"../node_modules/tsparticles/dist/Options/Classes/Background/Background.js","./Infection/Infection":"../node_modules/tsparticles/dist/Options/Classes/Infection/Infection.js","../../Utils":"../node_modules/tsparticles/dist/Utils/index.js","./Theme/Theme":"../node_modules/tsparticles/dist/Options/Classes/Theme/Theme.js","../../Enums/Modes":"../node_modules/tsparticles/dist/Enums/Modes/index.js","./FullScreen/FullScreen":"../node_modules/tsparticles/dist/Options/Classes/FullScreen/FullScreen.js","./Motion/Motion":"../node_modules/tsparticles/dist/Options/Classes/Motion/Motion.js","./ManualParticle":"../node_modules/tsparticles/dist/Options/Classes/ManualParticle.js","./Responsive":"../node_modules/tsparticles/dist/Options/Classes/Responsive.js"}],"../node_modules/tsparticles/dist/Core/Container.js":[function(require,module,exports) {
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const Canvas_1 = require("./Canvas");
const Particles_1 = require("./Particles");
const Retina_1 = require("./Retina");
const FrameManager_1 = require("./FrameManager");
const Options_1 = require("../Options/Classes/Options");
const Utils_1 = require("../Utils");
class Container {
    constructor(id, sourceOptions, ...presets) {
        this.id = id;
        this.sourceOptions = sourceOptions;
        this.fpsLimit = 60;
        this.firstStart = true;
        this.started = false;
        this.destroyed = false;
        this.paused = true;
        this.lastFrameTime = 0;
        this.pageHidden = false;
        this.retina = new Retina_1.Retina(this);
        this.canvas = new Canvas_1.Canvas(this);
        this.particles = new Particles_1.Particles(this);
        this.drawer = new FrameManager_1.FrameManager(this);
        this.pathGenerator = {
            generate: () => {
                return {
                    angle: Math.random() * Math.PI * 2,
                    length: Math.random(),
                };
            },
            init: () => {
            },
            update: () => {
            },
        };
        this.interactivity = {
            mouse: {
                clicking: false,
                inside: false,
            },
        };
        this.bubble = {};
        this.repulse = { particles: [] };
        this.attract = { particles: [] };
        this.plugins = new Map();
        this.drawers = new Map();
        this.density = 1;
        this.options = new Options_1.Options();
        this.actualOptions = new Options_1.Options();
        for (const preset of presets) {
            this.options.load(Utils_1.Plugins.getPreset(preset));
        }
        const shapes = Utils_1.Plugins.getSupportedShapes();
        for (const type of shapes) {
            const drawer = Utils_1.Plugins.getShapeDrawer(type);
            if (drawer) {
                this.drawers.set(type, drawer);
            }
        }
        if (this.options) {
            this.options.load(this.sourceOptions);
        }
        this.eventListeners = new Utils_1.EventListeners(this);
        if (typeof IntersectionObserver !== "undefined" && IntersectionObserver) {
            this.intersectionObserver = new IntersectionObserver((entries) => this.intersectionManager(entries));
        }
    }
    play(force) {
        const needsUpdate = this.paused || force;
        if (this.firstStart && !this.actualOptions.autoPlay) {
            this.firstStart = false;
            return;
        }
        if (this.paused) {
            this.paused = false;
        }
        if (needsUpdate) {
            for (const [, plugin] of this.plugins) {
                if (plugin.play) {
                    plugin.play();
                }
            }
            this.lastFrameTime = performance.now();
        }
        this.draw();
    }
    pause() {
        if (this.drawAnimationFrame !== undefined) {
            Utils_1.Utils.cancelAnimation(this.drawAnimationFrame);
            delete this.drawAnimationFrame;
        }
        if (this.paused) {
            return;
        }
        for (const [, plugin] of this.plugins) {
            if (plugin.pause) {
                plugin.pause();
            }
        }
        if (!this.pageHidden) {
            this.paused = true;
        }
    }
    draw() {
        this.drawAnimationFrame = Utils_1.Utils.animate((timestamp) => this.drawer.nextFrame(timestamp));
    }
    getAnimationStatus() {
        return !this.paused;
    }
    setNoise(noiseOrGenerator, init, update) {
        this.setPath(noiseOrGenerator, init, update);
    }
    setPath(pathOrGenerator, init, update) {
        if (!pathOrGenerator) {
            return;
        }
        if (typeof pathOrGenerator === "function") {
            this.pathGenerator.generate = pathOrGenerator;
            if (init) {
                this.pathGenerator.init = init;
            }
            if (update) {
                this.pathGenerator.update = update;
            }
        }
        else {
            if (pathOrGenerator.generate) {
                this.pathGenerator.generate = pathOrGenerator.generate;
            }
            if (pathOrGenerator.init) {
                this.pathGenerator.init = pathOrGenerator.init;
            }
            if (pathOrGenerator.update) {
                this.pathGenerator.update = pathOrGenerator.update;
            }
        }
    }
    destroy() {
        this.stop();
        this.canvas.destroy();
        for (const [, drawer] of this.drawers) {
            if (drawer.destroy) {
                drawer.destroy(this);
            }
        }
        for (const key of this.drawers.keys()) {
            this.drawers.delete(key);
        }
        this.destroyed = true;
    }
    exportImg(callback) {
        this.exportImage(callback);
    }
    exportImage(callback, type, quality) {
        var _a;
        return (_a = this.canvas.element) === null || _a === void 0 ? void 0 : _a.toBlob(callback, type !== null && type !== void 0 ? type : "image/png", quality);
    }
    exportConfiguration() {
        return JSON.stringify(this.actualOptions, undefined, 2);
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this.stop();
            yield this.start();
        });
    }
    stop() {
        if (!this.started) {
            return;
        }
        this.firstStart = true;
        this.started = false;
        this.eventListeners.removeListeners();
        this.pause();
        this.particles.clear();
        this.canvas.clear();
        if (this.interactivity.element instanceof HTMLElement && this.intersectionObserver) {
            this.intersectionObserver.observe(this.interactivity.element);
        }
        for (const [, plugin] of this.plugins) {
            if (plugin.stop) {
                plugin.stop();
            }
        }
        for (const key of this.plugins.keys()) {
            this.plugins.delete(key);
        }
        this.particles.linksColors = new Map();
        delete this.particles.grabLineColor;
        delete this.particles.linksColor;
    }
    loadTheme(name) {
        return __awaiter(this, void 0, void 0, function* () {
            this.actualOptions.setTheme(name);
            yield this.refresh();
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.started) {
                return;
            }
            yield this.init();
            this.started = true;
            this.eventListeners.addListeners();
            if (this.interactivity.element instanceof HTMLElement && this.intersectionObserver) {
                this.intersectionObserver.observe(this.interactivity.element);
            }
            for (const [, plugin] of this.plugins) {
                if (plugin.startAsync !== undefined) {
                    yield plugin.startAsync();
                }
                else if (plugin.start !== undefined) {
                    plugin.start();
                }
            }
            this.play();
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.actualOptions = new Options_1.Options();
            this.actualOptions.load(this.options);
            this.retina.init();
            this.canvas.init();
            this.actualOptions.setResponsive(this.canvas.size.width, this.retina.pixelRatio, this.options);
            this.actualOptions.setTheme(undefined);
            this.fpsLimit = this.actualOptions.fpsLimit > 0 ? this.actualOptions.fpsLimit : 60;
            const availablePlugins = Utils_1.Plugins.getAvailablePlugins(this);
            for (const [id, plugin] of availablePlugins) {
                this.plugins.set(id, plugin);
            }
            for (const [, drawer] of this.drawers) {
                if (drawer.init) {
                    yield drawer.init(this);
                }
            }
            for (const [, plugin] of this.plugins) {
                if (plugin.init) {
                    plugin.init(this.actualOptions);
                }
                else if (plugin.initAsync !== undefined) {
                    yield plugin.initAsync(this.actualOptions);
                }
            }
            this.canvas.resize();
            this.particles.init();
            this.particles.setDensity();
        });
    }
    intersectionManager(entries) {
        if (!this.actualOptions.pauseOnOutsideViewport) {
            return;
        }
        for (const entry of entries) {
            if (entry.target !== this.interactivity.element) {
                continue;
            }
            if (entry.isIntersecting) {
                this.play();
            }
            else {
                this.pause();
            }
        }
    }
}
exports.Container = Container;

},{"./Canvas":"../node_modules/tsparticles/dist/Core/Canvas.js","./Particles":"../node_modules/tsparticles/dist/Core/Particles.js","./Retina":"../node_modules/tsparticles/dist/Core/Retina.js","./FrameManager":"../node_modules/tsparticles/dist/Core/FrameManager.js","../Options/Classes/Options":"../node_modules/tsparticles/dist/Options/Classes/Options.js","../Utils":"../node_modules/tsparticles/dist/Utils/index.js"}],"../node_modules/tsparticles/dist/Core/Loader.js":[function(require,module,exports) {
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = void 0;
const Container_1 = require("./Container");
const Utils_1 = require("../Utils");
const tsParticlesDom = [];
function fetchError(statusCode) {
    console.error(`Error tsParticles - fetch status: ${statusCode}`);
    console.error("Error tsParticles - File config not found");
}
class Loader {
    static dom() {
        return tsParticlesDom;
    }
    static domItem(index) {
        const dom = Loader.dom();
        const item = dom[index];
        if (item && !item.destroyed) {
            return item;
        }
        dom.splice(index, 1);
    }
    static load(tagId, options, index) {
        return __awaiter(this, void 0, void 0, function* () {
            const domContainer = document.getElementById(tagId);
            if (!domContainer) {
                return;
            }
            return Loader.set(tagId, domContainer, options, index);
        });
    }
    static set(id, domContainer, options, index) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentOptions = options instanceof Array ? Utils_1.Utils.itemFromArray(options, index) : options;
            const dom = Loader.dom();
            const oldIndex = dom.findIndex((v) => v.id === id);
            if (oldIndex >= 0) {
                const old = Loader.domItem(oldIndex);
                if (old && !old.destroyed) {
                    old.destroy();
                    dom.splice(oldIndex, 1);
                }
            }
            let canvasEl;
            let generatedCanvas;
            if (domContainer.tagName.toLowerCase() === "canvas") {
                canvasEl = domContainer;
                generatedCanvas = false;
            }
            else {
                const existingCanvases = domContainer.getElementsByTagName("canvas");
                if (existingCanvases.length) {
                    canvasEl = existingCanvases[0];
                    if (!canvasEl.className) {
                        canvasEl.className = Utils_1.Constants.canvasClass;
                    }
                    generatedCanvas = false;
                }
                else {
                    generatedCanvas = true;
                    canvasEl = document.createElement("canvas");
                    canvasEl.className = Utils_1.Constants.canvasClass;
                    canvasEl.style.width = "100%";
                    canvasEl.style.height = "100%";
                    domContainer.appendChild(canvasEl);
                }
            }
            const newItem = new Container_1.Container(id, currentOptions);
            if (oldIndex >= 0) {
                dom.splice(oldIndex, 0, newItem);
            }
            else {
                dom.push(newItem);
            }
            newItem.canvas.loadCanvas(canvasEl, generatedCanvas);
            yield newItem.start();
            return newItem;
        });
    }
    static loadJSON(tagId, jsonUrl, index) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = jsonUrl instanceof Array ? Utils_1.Utils.itemFromArray(jsonUrl, index) : jsonUrl;
            const response = yield fetch(url);
            if (response.ok) {
                return Loader.load(tagId, yield response.json());
            }
            else {
                fetchError(response.status);
            }
        });
    }
    static setJSON(id, domContainer, jsonUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(jsonUrl);
            if (response.ok) {
                const options = yield response.json();
                return Loader.set(id, domContainer, options);
            }
            else {
                fetchError(response.status);
            }
        });
    }
    static setOnClickHandler(callback) {
        const dom = Loader.dom();
        if (dom.length === 0) {
            throw new Error("Can only set click handlers after calling tsParticles.load() or tsParticles.loadJSON()");
        }
        for (const domItem of dom) {
            const el = domItem.interactivity.element;
            if (!el) {
                continue;
            }
            const clickOrTouchHandler = (e, pos) => {
                if (domItem.destroyed) {
                    return;
                }
                const pxRatio = domItem.retina.pixelRatio;
                const posRetina = {
                    x: pos.x * pxRatio,
                    y: pos.y * pxRatio,
                };
                const particles = domItem.particles.quadTree.queryCircle(posRetina, domItem.retina.sizeValue);
                callback(e, particles);
            };
            const clickHandler = (e) => {
                if (domItem.destroyed) {
                    return;
                }
                const mouseEvent = e;
                const pos = {
                    x: mouseEvent.offsetX || mouseEvent.clientX,
                    y: mouseEvent.offsetY || mouseEvent.clientY,
                };
                clickOrTouchHandler(e, pos);
            };
            const touchStartHandler = () => {
                if (domItem.destroyed) {
                    return;
                }
                touched = true;
                touchMoved = false;
            };
            const touchMoveHandler = () => {
                if (domItem.destroyed) {
                    return;
                }
                touchMoved = true;
            };
            const touchEndHandler = (e) => {
                var _a, _b, _c;
                if (domItem.destroyed) {
                    return;
                }
                if (touched && !touchMoved) {
                    const touchEvent = e;
                    const lastTouch = touchEvent.touches[touchEvent.touches.length - 1];
                    const canvasRect = (_a = domItem.canvas.element) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
                    const pos = {
                        x: lastTouch.clientX - ((_b = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.left) !== null && _b !== void 0 ? _b : 0),
                        y: lastTouch.clientY - ((_c = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.top) !== null && _c !== void 0 ? _c : 0),
                    };
                    clickOrTouchHandler(e, pos);
                }
                touched = false;
                touchMoved = false;
            };
            const touchCancelHandler = () => {
                if (domItem.destroyed) {
                    return;
                }
                touched = false;
                touchMoved = false;
            };
            let touched = false;
            let touchMoved = false;
            el.addEventListener("click", clickHandler);
            el.addEventListener("touchstart", touchStartHandler);
            el.addEventListener("touchmove", touchMoveHandler);
            el.addEventListener("touchend", touchEndHandler);
            el.addEventListener("touchcancel", touchCancelHandler);
        }
    }
}
exports.Loader = Loader;

},{"./Container":"../node_modules/tsparticles/dist/Core/Container.js","../Utils":"../node_modules/tsparticles/dist/Utils/index.js"}],"../node_modules/tsparticles/dist/main.slim.js":[function(require,module,exports) {
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _initialized;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainSlim = void 0;
const SquareDrawer_1 = require("./ShapeDrawers/SquareDrawer");
const TextDrawer_1 = require("./ShapeDrawers/TextDrawer");
const ImageDrawer_1 = require("./ShapeDrawers/ImageDrawer");
const Utils_1 = require("./Utils");
const Types_1 = require("./Enums/Types");
const LineDrawer_1 = require("./ShapeDrawers/LineDrawer");
const CircleDrawer_1 = require("./ShapeDrawers/CircleDrawer");
const TriangleDrawer_1 = require("./ShapeDrawers/TriangleDrawer");
const StarDrawer_1 = require("./ShapeDrawers/StarDrawer");
const PolygonDrawer_1 = require("./ShapeDrawers/PolygonDrawer");
const Loader_1 = require("./Core/Loader");
class MainSlim {
    constructor() {
        _initialized.set(this, void 0);
        __classPrivateFieldSet(this, _initialized, false);
        const squareDrawer = new SquareDrawer_1.SquareDrawer();
        const textDrawer = new TextDrawer_1.TextDrawer();
        const imageDrawer = new ImageDrawer_1.ImageDrawer();
        Utils_1.Plugins.addShapeDrawer(Types_1.ShapeType.line, new LineDrawer_1.LineDrawer());
        Utils_1.Plugins.addShapeDrawer(Types_1.ShapeType.circle, new CircleDrawer_1.CircleDrawer());
        Utils_1.Plugins.addShapeDrawer(Types_1.ShapeType.edge, squareDrawer);
        Utils_1.Plugins.addShapeDrawer(Types_1.ShapeType.square, squareDrawer);
        Utils_1.Plugins.addShapeDrawer(Types_1.ShapeType.triangle, new TriangleDrawer_1.TriangleDrawer());
        Utils_1.Plugins.addShapeDrawer(Types_1.ShapeType.star, new StarDrawer_1.StarDrawer());
        Utils_1.Plugins.addShapeDrawer(Types_1.ShapeType.polygon, new PolygonDrawer_1.PolygonDrawer());
        Utils_1.Plugins.addShapeDrawer(Types_1.ShapeType.char, textDrawer);
        Utils_1.Plugins.addShapeDrawer(Types_1.ShapeType.character, textDrawer);
        Utils_1.Plugins.addShapeDrawer(Types_1.ShapeType.image, imageDrawer);
        Utils_1.Plugins.addShapeDrawer(Types_1.ShapeType.images, imageDrawer);
    }
    init() {
        if (!__classPrivateFieldGet(this, _initialized)) {
            __classPrivateFieldSet(this, _initialized, true);
        }
    }
    loadFromArray(tagId, options, index) {
        return __awaiter(this, void 0, void 0, function* () {
            return Loader_1.Loader.load(tagId, options, index);
        });
    }
    load(tagId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return Loader_1.Loader.load(tagId, options);
        });
    }
    set(id, element, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return Loader_1.Loader.set(id, element, options);
        });
    }
    loadJSON(tagId, pathConfigJson, index) {
        return Loader_1.Loader.loadJSON(tagId, pathConfigJson, index);
    }
    setOnClickHandler(callback) {
        Loader_1.Loader.setOnClickHandler(callback);
    }
    dom() {
        return Loader_1.Loader.dom();
    }
    domItem(index) {
        return Loader_1.Loader.domItem(index);
    }
    addShape(shape, drawer, init, afterEffect, destroy) {
        let customDrawer;
        if (typeof drawer === "function") {
            customDrawer = {
                afterEffect: afterEffect,
                destroy: destroy,
                draw: drawer,
                init: init,
            };
        }
        else {
            customDrawer = drawer;
        }
        Utils_1.Plugins.addShapeDrawer(shape, customDrawer);
    }
    addPreset(preset, options) {
        Utils_1.Plugins.addPreset(preset, options);
    }
    addPlugin(plugin) {
        Utils_1.Plugins.addPlugin(plugin);
    }
    addPathGenerator(name, generator) {
        Utils_1.Plugins.addPathGenerator(name, generator);
    }
}
exports.MainSlim = MainSlim;
_initialized = new WeakMap();

},{"./ShapeDrawers/SquareDrawer":"../node_modules/tsparticles/dist/ShapeDrawers/SquareDrawer.js","./ShapeDrawers/TextDrawer":"../node_modules/tsparticles/dist/ShapeDrawers/TextDrawer.js","./ShapeDrawers/ImageDrawer":"../node_modules/tsparticles/dist/ShapeDrawers/ImageDrawer.js","./Utils":"../node_modules/tsparticles/dist/Utils/index.js","./Enums/Types":"../node_modules/tsparticles/dist/Enums/Types/index.js","./ShapeDrawers/LineDrawer":"../node_modules/tsparticles/dist/ShapeDrawers/LineDrawer.js","./ShapeDrawers/CircleDrawer":"../node_modules/tsparticles/dist/ShapeDrawers/CircleDrawer.js","./ShapeDrawers/TriangleDrawer":"../node_modules/tsparticles/dist/ShapeDrawers/TriangleDrawer.js","./ShapeDrawers/StarDrawer":"../node_modules/tsparticles/dist/ShapeDrawers/StarDrawer.js","./ShapeDrawers/PolygonDrawer":"../node_modules/tsparticles/dist/ShapeDrawers/PolygonDrawer.js","./Core/Loader":"../node_modules/tsparticles/dist/Core/Loader.js"}],"../node_modules/tsparticles/dist/Plugins/Absorbers/AbsorberInstance.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbsorberInstance = void 0;
const Utils_1 = require("../../Utils");
class AbsorberInstance {
    constructor(absorbers, container, options, position) {
        var _a, _b;
        this.absorbers = absorbers;
        this.container = container;
        this.initialPosition = position;
        this.options = options;
        this.dragging = false;
        this.name = this.options.name;
        this.opacity = this.options.opacity;
        this.size = Utils_1.NumberUtils.getValue(options.size) * container.retina.pixelRatio;
        this.mass = this.size * options.size.density * container.retina.reduceFactor;
        const limit = options.size.limit;
        this.limit = limit !== undefined ? limit * container.retina.pixelRatio * container.retina.reduceFactor : limit;
        const color = typeof options.color === "string" ? { value: options.color } : options.color;
        this.color = (_a = Utils_1.ColorUtils.colorToRgb(color)) !== null && _a !== void 0 ? _a : {
            b: 0,
            g: 0,
            r: 0,
        };
        this.position = (_b = this.initialPosition) !== null && _b !== void 0 ? _b : this.calcPosition();
    }
    attract(particle) {
        const options = this.options;
        if (options.draggable) {
            const mouse = this.container.interactivity.mouse;
            if (mouse.clicking && mouse.downPosition) {
                const mouseDist = Utils_1.NumberUtils.getDistance(this.position, mouse.downPosition);
                if (mouseDist <= this.size) {
                    this.dragging = true;
                }
            }
            else {
                this.dragging = false;
            }
            if (this.dragging && mouse.position) {
                this.position.x = mouse.position.x;
                this.position.y = mouse.position.y;
            }
        }
        const pos = particle.getPosition();
        const { dx, dy, distance } = Utils_1.NumberUtils.getDistances(this.position, pos);
        const angle = Math.atan2(dx, dy);
        const acceleration = (this.mass / Math.pow(distance, 2)) * this.container.retina.reduceFactor;
        if (distance < this.size + particle.getRadius()) {
            const sizeFactor = particle.getRadius() * 0.033 * this.container.retina.pixelRatio;
            if (this.size > particle.getRadius() && distance < this.size - particle.getRadius()) {
                if (options.destroy) {
                    particle.destroy();
                }
                else {
                    particle.needsNewPosition = true;
                    this.updateParticlePosition(particle, angle, acceleration);
                }
            }
            else {
                if (options.destroy) {
                    particle.size.value -= sizeFactor;
                }
                this.updateParticlePosition(particle, angle, acceleration);
            }
            if (this.limit === undefined || this.size < this.limit) {
                this.size += sizeFactor;
            }
            this.mass += sizeFactor * this.options.size.density * this.container.retina.reduceFactor;
        }
        else {
            this.updateParticlePosition(particle, angle, acceleration);
        }
    }
    resize() {
        const initialPosition = this.initialPosition;
        this.position =
            initialPosition && Utils_1.Utils.isPointInside(initialPosition, this.container.canvas.size)
                ? initialPosition
                : this.calcPosition();
    }
    draw(context) {
        context.translate(this.position.x, this.position.y);
        context.beginPath();
        context.arc(0, 0, this.size, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStyle = Utils_1.ColorUtils.getStyleFromRgb(this.color, this.opacity);
        context.fill();
    }
    calcPosition() {
        var _a, _b;
        const container = this.container;
        const percentPosition = this.options.position;
        return {
            x: (((_a = percentPosition === null || percentPosition === void 0 ? void 0 : percentPosition.x) !== null && _a !== void 0 ? _a : Math.random() * 100) / 100) * container.canvas.size.width,
            y: (((_b = percentPosition === null || percentPosition === void 0 ? void 0 : percentPosition.y) !== null && _b !== void 0 ? _b : Math.random() * 100) / 100) * container.canvas.size.height,
        };
    }
    updateParticlePosition(particle, angle, acceleration) {
        var _a;
        if (particle.destroyed) {
            return;
        }
        const canvasSize = this.container.canvas.size;
        if (particle.needsNewPosition) {
            const pSize = particle.getRadius();
            particle.position.x = Math.random() * (canvasSize.width - pSize * 2) + pSize;
            particle.position.y = Math.random() * (canvasSize.height - pSize * 2) + pSize;
            particle.needsNewPosition = false;
        }
        if (this.options.orbits) {
            if (particle.orbitRadius === undefined) {
                particle.orbitRadius = Utils_1.NumberUtils.getDistance(particle.getPosition(), this.position);
            }
            if (particle.orbitRadius <= this.size && !this.options.destroy) {
                particle.orbitRadius = Math.random() * Math.max(canvasSize.width, canvasSize.height);
            }
            if (particle.orbitAngle === undefined) {
                particle.orbitAngle = Math.random() * Math.PI * 2;
            }
            const orbitRadius = particle.orbitRadius;
            const orbitAngle = particle.orbitAngle;
            particle.velocity.horizontal = 0;
            particle.velocity.vertical = 0;
            particle.position.x = this.position.x + orbitRadius * Math.cos(orbitAngle);
            particle.position.y = this.position.y + orbitRadius * Math.sin(orbitAngle);
            particle.orbitRadius -= acceleration;
            particle.orbitAngle +=
                (((_a = particle.moveSpeed) !== null && _a !== void 0 ? _a : this.container.retina.moveSpeed) / 100) * this.container.retina.reduceFactor;
        }
        else {
            particle.velocity.horizontal += Math.sin(angle) * acceleration;
            particle.velocity.vertical += Math.cos(angle) * acceleration;
        }
    }
}
exports.AbsorberInstance = AbsorberInstance;

},{"../../Utils":"../node_modules/tsparticles/dist/Utils/index.js"}],"../node_modules/tsparticles/dist/Plugins/Absorbers/Options/Classes/AbsorberSize.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbsorberSize = void 0;
const ValueWithRandom_1 = require("../../../../Options/Classes/ValueWithRandom");
class AbsorberSize extends ValueWithRandom_1.ValueWithRandom {
    constructor() {
        super();
        this.density = 5;
        this.random.minimumValue = 1;
        this.value = 50;
    }
    load(data) {
        if (!data) {
            return;
        }
        super.load(data);
        if (data.density !== undefined) {
            this.density = data.density;
        }
        if (data.limit !== undefined) {
            this.limit = data.limit;
        }
        if (data.limit !== undefined) {
            this.limit = data.limit;
        }
    }
}
exports.AbsorberSize = AbsorberSize;

},{"../../../../Options/Classes/ValueWithRandom":"../node_modules/tsparticles/dist/Options/Classes/ValueWithRandom.js"}],"../node_modules/tsparticles/dist/Plugins/Absorbers/Options/Classes/Absorber.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Absorber = void 0;
const AbsorberSize_1 = require("./AbsorberSize");
const OptionsColor_1 = require("../../../../Options/Classes/OptionsColor");
class Absorber {
    constructor() {
        this.color = new OptionsColor_1.OptionsColor();
        this.color.value = "#000000";
        this.draggable = false;
        this.opacity = 1;
        this.destroy = true;
        this.orbits = false;
        this.size = new AbsorberSize_1.AbsorberSize();
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.color !== undefined) {
            this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
        }
        if (data.draggable !== undefined) {
            this.draggable = data.draggable;
        }
        this.name = data.name;
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
        if (data.position !== undefined) {
            this.position = {
                x: data.position.x,
                y: data.position.y,
            };
        }
        if (data.size !== undefined) {
            this.size.load(data.size);
        }
        if (data.destroy !== undefined) {
            this.destroy = data.destroy;
        }
        if (data.orbits !== undefined) {
            this.orbits = data.orbits;
        }
    }
}
exports.Absorber = Absorber;

},{"./AbsorberSize":"../node_modules/tsparticles/dist/Plugins/Absorbers/Options/Classes/AbsorberSize.js","../../../../Options/Classes/OptionsColor":"../node_modules/tsparticles/dist/Options/Classes/OptionsColor.js"}],"../node_modules/tsparticles/dist/Plugins/Absorbers/Enums/AbsorberClickMode.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbsorberClickMode = void 0;
var AbsorberClickMode;
(function (AbsorberClickMode) {
    AbsorberClickMode["absorber"] = "absorber";
})(AbsorberClickMode = exports.AbsorberClickMode || (exports.AbsorberClickMode = {}));

},{}],"../node_modules/tsparticles/dist/Plugins/Absorbers/Enums/index.js":[function(require,module,exports) {
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./AbsorberClickMode"), exports);

},{"./AbsorberClickMode":"../node_modules/tsparticles/dist/Plugins/Absorbers/Enums/AbsorberClickMode.js"}],"../node_modules/tsparticles/dist/Plugins/Absorbers/Absorbers.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Absorbers = void 0;
const AbsorberInstance_1 = require("./AbsorberInstance");
const Utils_1 = require("../../Utils");
const Absorber_1 = require("./Options/Classes/Absorber");
const Enums_1 = require("./Enums");
class Absorbers {
    constructor(container) {
        this.container = container;
        this.array = [];
        this.absorbers = [];
        this.interactivityAbsorbers = [];
        const overridableContainer = container;
        overridableContainer.addAbsorber = (options, position) => this.addAbsorber(options, position);
    }
    init(options) {
        var _a, _b;
        if (!options) {
            return;
        }
        if (options.absorbers) {
            if (options.absorbers instanceof Array) {
                this.absorbers = options.absorbers.map((s) => {
                    const tmp = new Absorber_1.Absorber();
                    tmp.load(s);
                    return tmp;
                });
            }
            else {
                if (this.absorbers instanceof Array) {
                    this.absorbers = new Absorber_1.Absorber();
                }
                this.absorbers.load(options.absorbers);
            }
        }
        const interactivityAbsorbers = (_b = (_a = options.interactivity) === null || _a === void 0 ? void 0 : _a.modes) === null || _b === void 0 ? void 0 : _b.absorbers;
        if (interactivityAbsorbers) {
            if (interactivityAbsorbers instanceof Array) {
                this.interactivityAbsorbers = interactivityAbsorbers.map((s) => {
                    const tmp = new Absorber_1.Absorber();
                    tmp.load(s);
                    return tmp;
                });
            }
            else {
                if (this.interactivityAbsorbers instanceof Array) {
                    this.interactivityAbsorbers = new Absorber_1.Absorber();
                }
                this.interactivityAbsorbers.load(interactivityAbsorbers);
            }
        }
        if (this.absorbers instanceof Array) {
            for (const absorberOptions of this.absorbers) {
                this.addAbsorber(absorberOptions);
            }
        }
        else {
            this.addAbsorber(this.absorbers);
        }
    }
    particleUpdate(particle) {
        for (const absorber of this.array) {
            absorber.attract(particle);
            if (particle.destroyed) {
                break;
            }
        }
    }
    draw(context) {
        for (const absorber of this.array) {
            context.save();
            absorber.draw(context);
            context.restore();
        }
    }
    stop() {
        this.array = [];
    }
    resize() {
        for (const absorber of this.array) {
            absorber.resize();
        }
    }
    handleClickMode(mode) {
        const container = this.container;
        const absorberOptions = this.absorbers;
        const modeAbsorbers = this.interactivityAbsorbers;
        if (mode === Enums_1.AbsorberClickMode.absorber) {
            let absorbersModeOptions;
            if (modeAbsorbers instanceof Array) {
                if (modeAbsorbers.length > 0) {
                    absorbersModeOptions = Utils_1.Utils.itemFromArray(modeAbsorbers);
                }
            }
            else {
                absorbersModeOptions = modeAbsorbers;
            }
            const absorbersOptions = absorbersModeOptions !== null && absorbersModeOptions !== void 0 ? absorbersModeOptions : (absorberOptions instanceof Array ? Utils_1.Utils.itemFromArray(absorberOptions) : absorberOptions);
            const aPosition = container.interactivity.mouse.clickPosition;
            this.addAbsorber(absorbersOptions, aPosition);
        }
    }
    addAbsorber(options, position) {
        const absorber = new AbsorberInstance_1.AbsorberInstance(this, this.container, options, position);
        this.array.push(absorber);
        return absorber;
    }
    removeAbsorber(absorber) {
        const index = this.array.indexOf(absorber);
        if (index >= 0) {
            this.array.splice(index, 1);
        }
    }
}
exports.Absorbers = Absorbers;

},{"./AbsorberInstance":"../node_modules/tsparticles/dist/Plugins/Absorbers/AbsorberInstance.js","../../Utils":"../node_modules/tsparticles/dist/Utils/index.js","./Options/Classes/Absorber":"../node_modules/tsparticles/dist/Plugins/Absorbers/Options/Classes/Absorber.js","./Enums":"../node_modules/tsparticles/dist/Plugins/Absorbers/Enums/index.js"}],"../node_modules/tsparticles/dist/Plugins/Absorbers/AbsorbersPlugin.js":[function(require,module,exports) {
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbsorbersPlugin = void 0;
const Absorbers_1 = require("./Absorbers");
const Utils_1 = require("../../Utils");
const Enums_1 = require("./Enums");
const Absorber_1 = require("./Options/Classes/Absorber");
class AbsorbersPlugin {
    constructor() {
        this.id = "absorbers";
    }
    getPlugin(container) {
        return new Absorbers_1.Absorbers(container);
    }
    needsPlugin(options) {
        var _a, _b, _c;
        if (options === undefined) {
            return false;
        }
        const absorbers = options.absorbers;
        let loadAbsorbers = false;
        if (absorbers instanceof Array) {
            if (absorbers.length) {
                loadAbsorbers = true;
            }
        }
        else if (absorbers !== undefined) {
            loadAbsorbers = true;
        }
        else if (((_c = (_b = (_a = options.interactivity) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.onClick) === null || _c === void 0 ? void 0 : _c.mode) &&
            Utils_1.Utils.isInArray(Enums_1.AbsorberClickMode.absorber, options.interactivity.events.onClick.mode)) {
            loadAbsorbers = true;
        }
        return loadAbsorbers;
    }
    loadOptions(options, source) {
        var _a, _b;
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
            return;
        }
        const optionsCast = options;
        if (source === null || source === void 0 ? void 0 : source.absorbers) {
            if ((source === null || source === void 0 ? void 0 : source.absorbers) instanceof Array) {
                optionsCast.absorbers = source === null || source === void 0 ? void 0 : source.absorbers.map((s) => {
                    const tmp = new Absorber_1.Absorber();
                    tmp.load(s);
                    return tmp;
                });
            }
            else {
                let absorberOptions = optionsCast.absorbers;
                if ((absorberOptions === null || absorberOptions === void 0 ? void 0 : absorberOptions.load) === undefined) {
                    optionsCast.absorbers = absorberOptions = new Absorber_1.Absorber();
                }
                absorberOptions.load(source === null || source === void 0 ? void 0 : source.absorbers);
            }
        }
        const interactivityAbsorbers = (_b = (_a = source === null || source === void 0 ? void 0 : source.interactivity) === null || _a === void 0 ? void 0 : _a.modes) === null || _b === void 0 ? void 0 : _b.absorbers;
        if (interactivityAbsorbers) {
            if (interactivityAbsorbers instanceof Array) {
                optionsCast.interactivity.modes.absorbers = interactivityAbsorbers.map((s) => {
                    const tmp = new Absorber_1.Absorber();
                    tmp.load(s);
                    return tmp;
                });
            }
            else {
                let absorberOptions = optionsCast.interactivity.modes.absorbers;
                if ((absorberOptions === null || absorberOptions === void 0 ? void 0 : absorberOptions.load) === undefined) {
                    optionsCast.interactivity.modes.absorbers = absorberOptions = new Absorber_1.Absorber();
                }
                absorberOptions.load(interactivityAbsorbers);
            }
        }
    }
}
const plugin = new AbsorbersPlugin();
exports.AbsorbersPlugin = plugin;
__exportStar(require("./Enums"), exports);

},{"./Absorbers":"../node_modules/tsparticles/dist/Plugins/Absorbers/Absorbers.js","../../Utils":"../node_modules/tsparticles/dist/Utils/index.js","./Enums":"../node_modules/tsparticles/dist/Plugins/Absorbers/Enums/index.js","./Options/Classes/Absorber":"../node_modules/tsparticles/dist/Plugins/Absorbers/Options/Classes/Absorber.js"}],"../node_modules/tsparticles/dist/Plugins/Emitters/Options/Classes/EmitterSize.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmitterSize = void 0;
const Enums_1 = require("../../../../Enums");
class EmitterSize {
    constructor() {
        this.mode = Enums_1.SizeMode.percent;
        this.height = 0;
        this.width = 0;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        if (data.height !== undefined) {
            this.height = data.height;
        }
        if (data.width !== undefined) {
            this.width = data.width;
        }
    }
}
exports.EmitterSize = EmitterSize;

},{"../../../../Enums":"../node_modules/tsparticles/dist/Enums/index.js"}],"../node_modules/tsparticles/dist/Plugins/Emitters/EmitterInstance.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmitterInstance = void 0;
const Utils_1 = require("../../Utils");
const Enums_1 = require("../../Enums");
const EmitterSize_1 = require("./Options/Classes/EmitterSize");
function randomCoordinate(position, offset) {
    return position + offset * (Math.random() - 0.5);
}
function randomPosition(position, offset) {
    return {
        x: randomCoordinate(position.x, offset.x),
        y: randomCoordinate(position.y, offset.y),
    };
}
class EmitterInstance {
    constructor(emitters, container, emitterOptions, position) {
        var _a, _b, _c;
        this.emitters = emitters;
        this.container = container;
        this.currentDuration = 0;
        this.currentEmitDelay = 0;
        this.currentSpawnDelay = 0;
        this.initialPosition = position;
        this.emitterOptions = Utils_1.Utils.deepExtend({}, emitterOptions);
        this.position = (_a = this.initialPosition) !== null && _a !== void 0 ? _a : this.calcPosition();
        this.name = emitterOptions.name;
        let particlesOptions = Utils_1.Utils.deepExtend({}, this.emitterOptions.particles);
        if (particlesOptions === undefined) {
            particlesOptions = {};
        }
        if (particlesOptions.move === undefined) {
            particlesOptions.move = {};
        }
        if (particlesOptions.move.direction === undefined) {
            particlesOptions.move.direction = this.emitterOptions.direction;
        }
        if (this.emitterOptions.spawnColor !== undefined) {
            this.spawnColor = Utils_1.ColorUtils.colorToHsl(this.emitterOptions.spawnColor);
        }
        this.particlesOptions = particlesOptions;
        this.size =
            (_b = this.emitterOptions.size) !== null && _b !== void 0 ? _b : (() => {
                const size = new EmitterSize_1.EmitterSize();
                size.load({
                    height: 0,
                    mode: Enums_1.SizeMode.percent,
                    width: 0,
                });
                return size;
            })();
        this.lifeCount = (_c = this.emitterOptions.life.count) !== null && _c !== void 0 ? _c : -1;
        this.immortal = this.lifeCount <= 0;
        this.play();
    }
    play() {
        if (this.container.retina.reduceFactor &&
            (this.lifeCount > 0 || this.immortal || !this.emitterOptions.life.count)) {
            if (this.emitDelay === undefined) {
                this.emitDelay = (1000 * this.emitterOptions.rate.delay) / this.container.retina.reduceFactor;
            }
            if (this.lifeCount > 0 || this.immortal) {
                this.prepareToDie();
            }
        }
    }
    pause() {
        delete this.emitDelay;
    }
    resize() {
        const initialPosition = this.initialPosition;
        this.position =
            initialPosition && Utils_1.Utils.isPointInside(initialPosition, this.container.canvas.size)
                ? initialPosition
                : this.calcPosition();
    }
    update(delta) {
        var _a;
        if (this.duration !== undefined) {
            this.currentDuration += delta.value;
            if (this.currentDuration >= this.duration) {
                this.pause();
                if (this.spawnDelay !== undefined) {
                    delete this.spawnDelay;
                }
                if (!this.immortal) {
                    this.lifeCount--;
                }
                if (this.lifeCount > 0 || this.immortal) {
                    this.position = this.calcPosition();
                    this.spawnDelay =
                        (((_a = this.emitterOptions.life.delay) !== null && _a !== void 0 ? _a : 0) * 1000) / this.container.retina.reduceFactor;
                }
                else {
                    this.destroy();
                }
                this.currentDuration -= this.duration;
                delete this.duration;
            }
        }
        if (this.spawnDelay !== undefined) {
            this.currentSpawnDelay += delta.value;
            if (this.currentSpawnDelay >= this.spawnDelay) {
                this.play();
                this.currentSpawnDelay -= this.currentSpawnDelay;
                delete this.spawnDelay;
            }
        }
        if (this.emitDelay !== undefined) {
            this.currentEmitDelay += delta.value;
            if (this.currentEmitDelay >= this.emitDelay) {
                this.emit();
                this.currentEmitDelay -= this.emitDelay;
            }
        }
    }
    prepareToDie() {
        var _a;
        const duration = (_a = this.emitterOptions.life) === null || _a === void 0 ? void 0 : _a.duration;
        if (this.container.retina.reduceFactor &&
            (this.lifeCount > 0 || this.immortal) &&
            duration !== undefined &&
            duration > 0) {
            this.duration = duration * 1000;
        }
    }
    destroy() {
        this.emitters.removeEmitter(this);
    }
    calcPosition() {
        var _a, _b;
        const container = this.container;
        const percentPosition = this.emitterOptions.position;
        return {
            x: (((_a = percentPosition === null || percentPosition === void 0 ? void 0 : percentPosition.x) !== null && _a !== void 0 ? _a : Math.random() * 100) / 100) * container.canvas.size.width,
            y: (((_b = percentPosition === null || percentPosition === void 0 ? void 0 : percentPosition.y) !== null && _b !== void 0 ? _b : Math.random() * 100) / 100) * container.canvas.size.height,
        };
    }
    emit() {
        var _a;
        const container = this.container;
        const position = this.position;
        const offset = {
            x: this.size.mode === Enums_1.SizeMode.percent
                ? (container.canvas.size.width * this.size.width) / 100
                : this.size.width,
            y: this.size.mode === Enums_1.SizeMode.percent
                ? (container.canvas.size.height * this.size.height) / 100
                : this.size.height,
        };
        for (let i = 0; i < this.emitterOptions.rate.quantity; i++) {
            const particlesOptions = Utils_1.Utils.deepExtend({}, this.particlesOptions);
            if (this.spawnColor !== undefined) {
                const colorAnimation = (_a = this.emitterOptions.spawnColor) === null || _a === void 0 ? void 0 : _a.animation;
                if (colorAnimation) {
                    const hueAnimation = colorAnimation;
                    if (hueAnimation.enable) {
                        this.spawnColor.h = this.setColorAnimation(hueAnimation, this.spawnColor.h, 360);
                    }
                    else {
                        const hslAnimation = colorAnimation;
                        this.spawnColor.h = this.setColorAnimation(hslAnimation.h, this.spawnColor.h, 360);
                        this.spawnColor.s = this.setColorAnimation(hslAnimation.s, this.spawnColor.s, 100);
                        this.spawnColor.l = this.setColorAnimation(hslAnimation.l, this.spawnColor.l, 100);
                    }
                }
                if (!particlesOptions.color) {
                    particlesOptions.color = {
                        value: this.spawnColor,
                    };
                }
                else {
                    particlesOptions.color.value = this.spawnColor;
                }
            }
            container.particles.addParticle(randomPosition(position, offset), particlesOptions);
        }
    }
    setColorAnimation(animation, initValue, maxValue) {
        var _a;
        const container = this.container;
        if (!animation.enable) {
            return initValue;
        }
        const colorOffset = Utils_1.NumberUtils.randomInRange(animation.offset);
        const emitFactor = (1000 * this.emitterOptions.rate.delay) / container.retina.reduceFactor;
        const colorSpeed = (_a = animation.speed) !== null && _a !== void 0 ? _a : 0;
        return (initValue + (colorSpeed * container.fpsLimit) / emitFactor + colorOffset * 3.6) % maxValue;
    }
}
exports.EmitterInstance = EmitterInstance;

},{"../../Utils":"../node_modules/tsparticles/dist/Utils/index.js","../../Enums":"../node_modules/tsparticles/dist/Enums/index.js","./Options/Classes/EmitterSize":"../node_modules/tsparticles/dist/Plugins/Emitters/Options/Classes/EmitterSize.js"}],"../node_modules/tsparticles/dist/Plugins/Emitters/Options/Classes/EmitterRate.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmitterRate = void 0;
class EmitterRate {
    constructor() {
        this.quantity = 1;
        this.delay = 0.1;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.quantity !== undefined) {
            this.quantity = data.quantity;
        }
        if (data.delay !== undefined) {
            this.delay = data.delay;
        }
    }
}
exports.EmitterRate = EmitterRate;

},{}],"../node_modules/tsparticles/dist/Plugins/Emitters/Options/Classes/EmitterLife.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmitterLife = void 0;
class EmitterLife {
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.count !== undefined) {
            this.count = data.count;
        }
        if (data.delay !== undefined) {
            this.delay = data.delay;
        }
        if (data.duration !== undefined) {
            this.duration = data.duration;
        }
    }
}
exports.EmitterLife = EmitterLife;

},{}],"../node_modules/tsparticles/dist/Plugins/Emitters/Options/Classes/Emitter.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emitter = void 0;
const Enums_1 = require("../../../../Enums");
const EmitterRate_1 = require("./EmitterRate");
const EmitterLife_1 = require("./EmitterLife");
const Utils_1 = require("../../../../Utils");
const EmitterSize_1 = require("./EmitterSize");
const AnimatableColor_1 = require("../../../../Options/Classes/Particles/AnimatableColor");
class Emitter {
    constructor() {
        this.direction = Enums_1.MoveDirection.none;
        this.life = new EmitterLife_1.EmitterLife();
        this.rate = new EmitterRate_1.EmitterRate();
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.size !== undefined) {
            if (this.size === undefined) {
                this.size = new EmitterSize_1.EmitterSize();
            }
            this.size.load(data.size);
        }
        if (data.direction !== undefined) {
            this.direction = data.direction;
        }
        this.life.load(data.life);
        this.name = data.name;
        if (data.particles !== undefined) {
            this.particles = Utils_1.Utils.deepExtend({}, data.particles);
        }
        this.rate.load(data.rate);
        if (data.position !== undefined) {
            this.position = {
                x: data.position.x,
                y: data.position.y,
            };
        }
        if (data.spawnColor !== undefined) {
            if (this.spawnColor === undefined) {
                this.spawnColor = new AnimatableColor_1.AnimatableColor();
            }
            this.spawnColor.load(data.spawnColor);
        }
    }
}
exports.Emitter = Emitter;

},{"../../../../Enums":"../node_modules/tsparticles/dist/Enums/index.js","./EmitterRate":"../node_modules/tsparticles/dist/Plugins/Emitters/Options/Classes/EmitterRate.js","./EmitterLife":"../node_modules/tsparticles/dist/Plugins/Emitters/Options/Classes/EmitterLife.js","../../../../Utils":"../node_modules/tsparticles/dist/Utils/index.js","./EmitterSize":"../node_modules/tsparticles/dist/Plugins/Emitters/Options/Classes/EmitterSize.js","../../../../Options/Classes/Particles/AnimatableColor":"../node_modules/tsparticles/dist/Options/Classes/Particles/AnimatableColor.js"}],"../node_modules/tsparticles/dist/Plugins/Emitters/Enums/EmitterClickMode.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmitterClickMode = void 0;
var EmitterClickMode;
(function (EmitterClickMode) {
    EmitterClickMode["emitter"] = "emitter";
})(EmitterClickMode = exports.EmitterClickMode || (exports.EmitterClickMode = {}));

},{}],"../node_modules/tsparticles/dist/Plugins/Emitters/Enums/index.js":[function(require,module,exports) {
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./EmitterClickMode"), exports);

},{"./EmitterClickMode":"../node_modules/tsparticles/dist/Plugins/Emitters/Enums/EmitterClickMode.js"}],"../node_modules/tsparticles/dist/Plugins/Emitters/Emitters.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emitters = void 0;
const EmitterInstance_1 = require("./EmitterInstance");
const Utils_1 = require("../../Utils");
const Emitter_1 = require("./Options/Classes/Emitter");
const Enums_1 = require("./Enums");
class Emitters {
    constructor(container) {
        this.container = container;
        this.array = [];
        this.emitters = [];
        this.interactivityEmitters = [];
        const overridableContainer = container;
        overridableContainer.addEmitter = (options, position) => this.addEmitter(options, position);
        overridableContainer.playEmitter = (idxOrName) => {
            const emitter = idxOrName === undefined || typeof idxOrName === "number"
                ? this.array[idxOrName || 0]
                : this.array.find((t) => t.name === idxOrName);
            if (emitter) {
                emitter.play();
            }
        };
        overridableContainer.pauseEmitter = (idxOrName) => {
            const emitter = idxOrName === undefined || typeof idxOrName === "number"
                ? this.array[idxOrName || 0]
                : this.array.find((t) => t.name === idxOrName);
            if (emitter) {
                emitter.pause();
            }
        };
    }
    init(options) {
        var _a, _b;
        if (!options) {
            return;
        }
        if (options.emitters) {
            if (options.emitters instanceof Array) {
                this.emitters = options.emitters.map((s) => {
                    const tmp = new Emitter_1.Emitter();
                    tmp.load(s);
                    return tmp;
                });
            }
            else {
                if (this.emitters instanceof Array) {
                    this.emitters = new Emitter_1.Emitter();
                }
                this.emitters.load(options.emitters);
            }
        }
        const interactivityEmitters = (_b = (_a = options.interactivity) === null || _a === void 0 ? void 0 : _a.modes) === null || _b === void 0 ? void 0 : _b.emitters;
        if (interactivityEmitters) {
            if (interactivityEmitters instanceof Array) {
                this.interactivityEmitters = interactivityEmitters.map((s) => {
                    const tmp = new Emitter_1.Emitter();
                    tmp.load(s);
                    return tmp;
                });
            }
            else {
                if (this.interactivityEmitters instanceof Array) {
                    this.interactivityEmitters = new Emitter_1.Emitter();
                }
                this.interactivityEmitters.load(interactivityEmitters);
            }
        }
        if (this.emitters instanceof Array) {
            for (const emitterOptions of this.emitters) {
                this.addEmitter(emitterOptions);
            }
        }
        else {
            this.addEmitter(this.emitters);
        }
    }
    play() {
        for (const emitter of this.array) {
            emitter.play();
        }
    }
    pause() {
        for (const emitter of this.array) {
            emitter.pause();
        }
    }
    stop() {
        this.array = [];
    }
    update(delta) {
        for (const emitter of this.array) {
            emitter.update(delta);
        }
    }
    handleClickMode(mode) {
        const container = this.container;
        const emitterOptions = this.emitters;
        const modeEmitters = this.interactivityEmitters;
        if (mode === Enums_1.EmitterClickMode.emitter) {
            let emitterModeOptions;
            if (modeEmitters instanceof Array) {
                if (modeEmitters.length > 0) {
                    emitterModeOptions = Utils_1.Utils.itemFromArray(modeEmitters);
                }
            }
            else {
                emitterModeOptions = modeEmitters;
            }
            const emittersOptions = emitterModeOptions !== null && emitterModeOptions !== void 0 ? emitterModeOptions : (emitterOptions instanceof Array ? Utils_1.Utils.itemFromArray(emitterOptions) : emitterOptions);
            const ePosition = container.interactivity.mouse.clickPosition;
            this.addEmitter(Utils_1.Utils.deepExtend({}, emittersOptions), ePosition);
        }
    }
    resize() {
        for (const emitter of this.array) {
            emitter.resize();
        }
    }
    addEmitter(options, position) {
        const emitter = new EmitterInstance_1.EmitterInstance(this, this.container, options, position);
        this.array.push(emitter);
        return emitter;
    }
    removeEmitter(emitter) {
        const index = this.array.indexOf(emitter);
        if (index >= 0) {
            this.array.splice(index, 1);
        }
    }
}
exports.Emitters = Emitters;

},{"./EmitterInstance":"../node_modules/tsparticles/dist/Plugins/Emitters/EmitterInstance.js","../../Utils":"../node_modules/tsparticles/dist/Utils/index.js","./Options/Classes/Emitter":"../node_modules/tsparticles/dist/Plugins/Emitters/Options/Classes/Emitter.js","./Enums":"../node_modules/tsparticles/dist/Plugins/Emitters/Enums/index.js"}],"../node_modules/tsparticles/dist/Plugins/Emitters/EmittersPlugin.js":[function(require,module,exports) {
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmittersPlugin = void 0;
const Utils_1 = require("../../Utils");
const Emitters_1 = require("./Emitters");
const Enums_1 = require("./Enums");
const Emitter_1 = require("./Options/Classes/Emitter");
class EmittersPlugin {
    constructor() {
        this.id = "emitters";
    }
    getPlugin(container) {
        return new Emitters_1.Emitters(container);
    }
    needsPlugin(options) {
        var _a, _b, _c;
        if (options === undefined) {
            return false;
        }
        const emitters = options.emitters;
        let loadEmitters = false;
        if (emitters instanceof Array) {
            if (emitters.length) {
                loadEmitters = true;
            }
        }
        else if (emitters !== undefined) {
            loadEmitters = true;
        }
        else if (((_c = (_b = (_a = options.interactivity) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.onClick) === null || _c === void 0 ? void 0 : _c.mode) &&
            Utils_1.Utils.isInArray(Enums_1.EmitterClickMode.emitter, options.interactivity.events.onClick.mode)) {
            loadEmitters = true;
        }
        return loadEmitters;
    }
    loadOptions(options, source) {
        var _a, _b;
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
            return;
        }
        const optionsCast = options;
        if (source === null || source === void 0 ? void 0 : source.emitters) {
            if ((source === null || source === void 0 ? void 0 : source.emitters) instanceof Array) {
                optionsCast.emitters = source === null || source === void 0 ? void 0 : source.emitters.map((s) => {
                    const tmp = new Emitter_1.Emitter();
                    tmp.load(s);
                    return tmp;
                });
            }
            else {
                let emitterOptions = optionsCast.emitters;
                if ((emitterOptions === null || emitterOptions === void 0 ? void 0 : emitterOptions.load) === undefined) {
                    optionsCast.emitters = emitterOptions = new Emitter_1.Emitter();
                }
                emitterOptions.load(source === null || source === void 0 ? void 0 : source.emitters);
            }
        }
        const interactivityEmitters = (_b = (_a = source === null || source === void 0 ? void 0 : source.interactivity) === null || _a === void 0 ? void 0 : _a.modes) === null || _b === void 0 ? void 0 : _b.emitters;
        if (interactivityEmitters) {
            if (interactivityEmitters instanceof Array) {
                optionsCast.interactivity.modes.emitters = interactivityEmitters.map((s) => {
                    const tmp = new Emitter_1.Emitter();
                    tmp.load(s);
                    return tmp;
                });
            }
            else {
                let emitterOptions = optionsCast.interactivity.modes.emitters;
                if ((emitterOptions === null || emitterOptions === void 0 ? void 0 : emitterOptions.load) === undefined) {
                    optionsCast.interactivity.modes.emitters = emitterOptions = new Emitter_1.Emitter();
                }
                emitterOptions.load(interactivityEmitters);
            }
        }
    }
}
const plugin = new EmittersPlugin();
exports.EmittersPlugin = plugin;
__exportStar(require("./Enums"), exports);

},{"../../Utils":"../node_modules/tsparticles/dist/Utils/index.js","./Emitters":"../node_modules/tsparticles/dist/Plugins/Emitters/Emitters.js","./Enums":"../node_modules/tsparticles/dist/Plugins/Emitters/Enums/index.js","./Options/Classes/Emitter":"../node_modules/tsparticles/dist/Plugins/Emitters/Options/Classes/Emitter.js"}],"../node_modules/tsparticles/dist/Plugins/PolygonMask/Enums/InlineArrangement.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlineArrangement = void 0;
var InlineArrangement;
(function (InlineArrangement) {
    InlineArrangement["equidistant"] = "equidistant";
    InlineArrangement["onePerPoint"] = "one-per-point";
    InlineArrangement["perPoint"] = "per-point";
    InlineArrangement["randomLength"] = "random-length";
    InlineArrangement["randomPoint"] = "random-point";
})(InlineArrangement = exports.InlineArrangement || (exports.InlineArrangement = {}));

},{}],"../node_modules/tsparticles/dist/Plugins/PolygonMask/Enums/MoveType.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveType = void 0;
var MoveType;
(function (MoveType) {
    MoveType["path"] = "path";
    MoveType["radius"] = "radius";
})(MoveType = exports.MoveType || (exports.MoveType = {}));

},{}],"../node_modules/tsparticles/dist/Plugins/PolygonMask/Enums/Type.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = void 0;
var Type;
(function (Type) {
    Type["inline"] = "inline";
    Type["inside"] = "inside";
    Type["outside"] = "outside";
    Type["none"] = "none";
})(Type = exports.Type || (exports.Type = {}));

},{}],"../node_modules/tsparticles/dist/Plugins/PolygonMask/Enums/index.js":[function(require,module,exports) {
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./InlineArrangement"), exports);
__exportStar(require("./MoveType"), exports);
__exportStar(require("./Type"), exports);

},{"./InlineArrangement":"../node_modules/tsparticles/dist/Plugins/PolygonMask/Enums/InlineArrangement.js","./MoveType":"../node_modules/tsparticles/dist/Plugins/PolygonMask/Enums/MoveType.js","./Type":"../node_modules/tsparticles/dist/Plugins/PolygonMask/Enums/Type.js"}],"../node_modules/tsparticles/dist/Plugins/PolygonMask/Options/Classes/DrawStroke.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawStroke = void 0;
const OptionsColor_1 = require("../../../../Options/Classes/OptionsColor");
const Utils_1 = require("../../../../Utils");
class DrawStroke {
    constructor() {
        this.color = new OptionsColor_1.OptionsColor();
        this.width = 0.5;
        this.opacity = 1;
    }
    load(data) {
        var _a;
        if (data !== undefined) {
            this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
            if (typeof this.color.value === "string") {
                this.opacity = (_a = Utils_1.ColorUtils.stringToAlpha(this.color.value)) !== null && _a !== void 0 ? _a : this.opacity;
            }
            if (data.opacity !== undefined) {
                this.opacity = data.opacity;
            }
            if (data.width !== undefined) {
                this.width = data.width;
            }
        }
    }
}
exports.DrawStroke = DrawStroke;

},{"../../../../Options/Classes/OptionsColor":"../node_modules/tsparticles/dist/Options/Classes/OptionsColor.js","../../../../Utils":"../node_modules/tsparticles/dist/Utils/index.js"}],"../node_modules/tsparticles/dist/Plugins/PolygonMask/Options/Classes/Draw.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Draw = void 0;
const DrawStroke_1 = require("./DrawStroke");
const OptionsColor_1 = require("../../../../Options/Classes/OptionsColor");
class Draw {
    constructor() {
        this.enable = false;
        this.stroke = new DrawStroke_1.DrawStroke();
    }
    get lineWidth() {
        return this.stroke.width;
    }
    set lineWidth(value) {
        this.stroke.width = value;
    }
    get lineColor() {
        return this.stroke.color;
    }
    set lineColor(value) {
        this.stroke.color = OptionsColor_1.OptionsColor.create(this.stroke.color, value);
    }
    load(data) {
        var _a;
        if (data !== undefined) {
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            const stroke = (_a = data.stroke) !== null && _a !== void 0 ? _a : {
                color: data.lineColor,
                width: data.lineWidth,
            };
            this.stroke.load(stroke);
        }
    }
}
exports.Draw = Draw;

},{"./DrawStroke":"../node_modules/tsparticles/dist/Plugins/PolygonMask/Options/Classes/DrawStroke.js","../../../../Options/Classes/OptionsColor":"../node_modules/tsparticles/dist/Options/Classes/OptionsColor.js"}],"../node_modules/tsparticles/dist/Plugins/PolygonMask/Options/Classes/Move.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Move = void 0;
const Enums_1 = require("../../Enums");
class Move {
    constructor() {
        this.radius = 10;
        this.type = Enums_1.MoveType.path;
    }
    load(data) {
        if (data !== undefined) {
            if (data.radius !== undefined) {
                this.radius = data.radius;
            }
            if (data.type !== undefined) {
                this.type = data.type;
            }
        }
    }
}
exports.Move = Move;

},{"../../Enums":"../node_modules/tsparticles/dist/Plugins/PolygonMask/Enums/index.js"}],"../node_modules/tsparticles/dist/Plugins/PolygonMask/Options/Classes/Inline.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inline = void 0;
const Enums_1 = require("../../Enums");
class Inline {
    constructor() {
        this.arrangement = Enums_1.InlineArrangement.onePerPoint;
    }
    load(data) {
        if (data !== undefined) {
            if (data.arrangement !== undefined) {
                this.arrangement = data.arrangement;
            }
        }
    }
}
exports.Inline = Inline;

},{"../../Enums":"../node_modules/tsparticles/dist/Plugins/PolygonMask/Enums/index.js"}],"../node_modules/tsparticles/dist/Plugins/PolygonMask/Options/Classes/LocalSvg.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalSvg = void 0;
class LocalSvg {
    constructor() {
        this.path = [];
        this.size = {
            height: 0,
            width: 0,
        };
    }
    load(data) {
        if (data !== undefined) {
            if (data.path !== undefined) {
                this.path = data.path;
            }
            if (data.size !== undefined) {
                if (data.size.width !== undefined) {
                    this.size.width = data.size.width;
                }
                if (data.size.height !== undefined) {
                    this.size.height = data.size.height;
                }
            }
        }
    }
}
exports.LocalSvg = LocalSvg;

},{}],"../node_modules/tsparticles/dist/Plugins/PolygonMask/Options/Classes/PolygonMask.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolygonMask = void 0;
const Enums_1 = require("../../Enums");
const Draw_1 = require("./Draw");
const Move_1 = require("./Move");
const Inline_1 = require("./Inline");
const LocalSvg_1 = require("./LocalSvg");
const Utils_1 = require("../../../../Utils");
class PolygonMask {
    constructor() {
        this.draw = new Draw_1.Draw();
        this.enable = false;
        this.inline = new Inline_1.Inline();
        this.move = new Move_1.Move();
        this.scale = 1;
        this.type = Enums_1.Type.none;
    }
    get inlineArrangement() {
        return this.inline.arrangement;
    }
    set inlineArrangement(value) {
        this.inline.arrangement = value;
    }
    load(data) {
        var _a;
        if (data !== undefined) {
            this.draw.load(data.draw);
            const inline = (_a = data.inline) !== null && _a !== void 0 ? _a : {
                arrangement: data.inlineArrangement,
            };
            if (inline !== undefined) {
                this.inline.load(inline);
            }
            this.move.load(data.move);
            if (data.scale !== undefined) {
                this.scale = data.scale;
            }
            if (data.type !== undefined) {
                this.type = data.type;
            }
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            else {
                this.enable = this.type !== Enums_1.Type.none;
            }
            if (data.url !== undefined) {
                this.url = data.url;
            }
            if (data.data !== undefined) {
                if (typeof data.data === "string") {
                    this.data = data.data;
                }
                else {
                    this.data = new LocalSvg_1.LocalSvg();
                    this.data.load(data.data);
                }
            }
            if (data.position !== undefined) {
                this.position = Utils_1.Utils.deepExtend({}, data.position);
            }
        }
    }
}
exports.PolygonMask = PolygonMask;

},{"../../Enums":"../node_modules/tsparticles/dist/Plugins/PolygonMask/Enums/index.js","./Draw":"../node_modules/tsparticles/dist/Plugins/PolygonMask/Options/Classes/Draw.js","./Move":"../node_modules/tsparticles/dist/Plugins/PolygonMask/Options/Classes/Move.js","./Inline":"../node_modules/tsparticles/dist/Plugins/PolygonMask/Options/Classes/Inline.js","./LocalSvg":"../node_modules/tsparticles/dist/Plugins/PolygonMask/Options/Classes/LocalSvg.js","../../../../Utils":"../node_modules/tsparticles/dist/Utils/index.js"}],"../node_modules/tsparticles/dist/Plugins/PolygonMask/PolygonMaskInstance.js":[function(require,module,exports) {
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolygonMaskInstance = void 0;
const Enums_1 = require("./Enums");
const Utils_1 = require("../../Utils");
const PolygonMask_1 = require("./Options/Classes/PolygonMask");
function polygonBounce(particle) {
    particle.velocity.horizontal = particle.velocity.vertical / 2 - particle.velocity.horizontal;
    particle.velocity.vertical = particle.velocity.horizontal / 2 - particle.velocity.vertical;
}
function drawPolygonMask(context, rawData, stroke) {
    const color = Utils_1.ColorUtils.colorToRgb(stroke.color);
    if (!color) {
        return;
    }
    context.beginPath();
    context.moveTo(rawData[0].x, rawData[0].y);
    for (const item of rawData) {
        context.lineTo(item.x, item.y);
    }
    context.closePath();
    context.strokeStyle = Utils_1.ColorUtils.getStyleFromRgb(color);
    context.lineWidth = stroke.width;
    context.stroke();
}
function drawPolygonMaskPath(context, path, stroke, position) {
    context.translate(position.x, position.y);
    const color = Utils_1.ColorUtils.colorToRgb(stroke.color);
    if (!color) {
        return;
    }
    context.strokeStyle = Utils_1.ColorUtils.getStyleFromRgb(color, stroke.opacity);
    context.lineWidth = stroke.width;
    context.stroke(path);
}
function parsePaths(paths, scale, offset) {
    const res = [];
    for (const path of paths) {
        const segments = path.element.pathSegList;
        const len = segments.numberOfItems;
        const p = {
            x: 0,
            y: 0,
        };
        for (let i = 0; i < len; i++) {
            const segment = segments.getItem(i);
            const svgPathSeg = window.SVGPathSeg;
            switch (segment.pathSegType) {
                case svgPathSeg.PATHSEG_MOVETO_ABS:
                case svgPathSeg.PATHSEG_LINETO_ABS:
                case svgPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
                case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
                case svgPathSeg.PATHSEG_ARC_ABS:
                case svgPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
                case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS: {
                    const absSeg = segment;
                    p.x = absSeg.x;
                    p.y = absSeg.y;
                    break;
                }
                case svgPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
                    p.x = segment.x;
                    break;
                case svgPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
                    p.y = segment.y;
                    break;
                case svgPathSeg.PATHSEG_LINETO_REL:
                case svgPathSeg.PATHSEG_MOVETO_REL:
                case svgPathSeg.PATHSEG_CURVETO_CUBIC_REL:
                case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
                case svgPathSeg.PATHSEG_ARC_REL:
                case svgPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
                case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL: {
                    const relSeg = segment;
                    p.x += relSeg.x;
                    p.y += relSeg.y;
                    break;
                }
                case svgPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
                    p.x += segment.x;
                    break;
                case svgPathSeg.PATHSEG_LINETO_VERTICAL_REL:
                    p.y += segment.y;
                    break;
                case svgPathSeg.PATHSEG_UNKNOWN:
                case svgPathSeg.PATHSEG_CLOSEPATH:
                    continue;
            }
            res.push({
                x: p.x * scale + offset.x,
                y: p.y * scale + offset.y,
            });
        }
    }
    return res;
}
class PolygonMaskInstance {
    constructor(container) {
        this.container = container;
        this.dimension = {
            height: 0,
            width: 0,
        };
        this.path2DSupported = !!window.Path2D;
        this.options = new PolygonMask_1.PolygonMask();
        this.polygonMaskMoveRadius = this.options.move.radius * container.retina.pixelRatio;
    }
    initAsync(options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.options.load(options === null || options === void 0 ? void 0 : options.polygon);
            const polygonMaskOptions = this.options;
            this.polygonMaskMoveRadius = polygonMaskOptions.move.radius * this.container.retina.pixelRatio;
            if (polygonMaskOptions.enable) {
                yield this.initRawData();
            }
        });
    }
    resize() {
        const container = this.container;
        const options = this.options;
        if (!(options.enable && options.type !== Enums_1.Type.none)) {
            return;
        }
        if (this.redrawTimeout) {
            clearTimeout(this.redrawTimeout);
        }
        this.redrawTimeout = window.setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            yield this.initRawData(true);
            container.particles.redraw();
        }), 250);
    }
    stop() {
        delete this.raw;
        delete this.paths;
    }
    particlesInitialization() {
        const options = this.options;
        if (options.enable &&
            options.type === Enums_1.Type.inline &&
            (options.inline.arrangement === Enums_1.InlineArrangement.onePerPoint ||
                options.inline.arrangement === Enums_1.InlineArrangement.perPoint)) {
            this.drawPoints();
            return true;
        }
        return false;
    }
    particlePosition(position) {
        var _a, _b;
        const options = this.options;
        if (!(options.enable && ((_b = (_a = this.raw) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0)) {
            return;
        }
        return Utils_1.Utils.deepExtend({}, position ? position : this.randomPoint());
    }
    particleBounce(particle) {
        const options = this.options;
        if (options.enable && options.type !== Enums_1.Type.none && options.type !== Enums_1.Type.inline) {
            if (!this.checkInsidePolygon(particle.getPosition())) {
                polygonBounce(particle);
                return true;
            }
        }
        else if (options.enable && options.type === Enums_1.Type.inline && particle.initialPosition) {
            const dist = Utils_1.NumberUtils.getDistance(particle.initialPosition, particle.getPosition());
            if (dist > this.polygonMaskMoveRadius) {
                polygonBounce(particle);
                return true;
            }
        }
        return false;
    }
    clickPositionValid(position) {
        const options = this.options;
        return (options.enable &&
            options.type !== Enums_1.Type.none &&
            options.type !== Enums_1.Type.inline &&
            this.checkInsidePolygon(position));
    }
    draw(context) {
        var _a;
        if (!((_a = this.paths) === null || _a === void 0 ? void 0 : _a.length)) {
            return;
        }
        const options = this.options;
        const polygonDraw = options.draw;
        if (!(options.enable && polygonDraw.enable)) {
            return;
        }
        const rawData = this.raw;
        for (const path of this.paths) {
            const path2d = path.path2d;
            const path2dSupported = this.path2DSupported;
            if (!context) {
                continue;
            }
            if (path2dSupported && path2d && this.offset) {
                drawPolygonMaskPath(context, path2d, polygonDraw.stroke, this.offset);
            }
            else if (rawData) {
                drawPolygonMask(context, rawData, polygonDraw.stroke);
            }
        }
    }
    checkInsidePolygon(position) {
        var _a, _b;
        const container = this.container;
        const options = this.options;
        if (!options.enable || options.type === Enums_1.Type.none || options.type === Enums_1.Type.inline) {
            return true;
        }
        if (!this.raw) {
            throw new Error(Utils_1.Constants.noPolygonFound);
        }
        const canvasSize = container.canvas.size;
        const x = (_a = position === null || position === void 0 ? void 0 : position.x) !== null && _a !== void 0 ? _a : Math.random() * canvasSize.width;
        const y = (_b = position === null || position === void 0 ? void 0 : position.y) !== null && _b !== void 0 ? _b : Math.random() * canvasSize.height;
        let inside = false;
        for (let i = 0, j = this.raw.length - 1; i < this.raw.length; j = i++) {
            const pi = this.raw[i];
            const pj = this.raw[j];
            const intersect = pi.y > y !== pj.y > y && x < ((pj.x - pi.x) * (y - pi.y)) / (pj.y - pi.y) + pi.x;
            if (intersect) {
                inside = !inside;
            }
        }
        return options.type === Enums_1.Type.inside ? inside : options.type === Enums_1.Type.outside ? !inside : false;
    }
    parseSvgPath(xml, force) {
        var _a, _b, _c;
        const forceDownload = force !== null && force !== void 0 ? force : false;
        if (this.paths !== undefined && !forceDownload) {
            return this.raw;
        }
        const container = this.container;
        const options = this.options;
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, "image/svg+xml");
        const svg = doc.getElementsByTagName("svg")[0];
        let svgPaths = svg.getElementsByTagName("path");
        if (!svgPaths.length) {
            svgPaths = doc.getElementsByTagName("path");
        }
        this.paths = [];
        for (let i = 0; i < svgPaths.length; i++) {
            const path = svgPaths.item(i);
            if (path) {
                this.paths.push({
                    element: path,
                    length: path.getTotalLength(),
                });
            }
        }
        const pxRatio = container.retina.pixelRatio;
        const scale = options.scale / pxRatio;
        this.dimension.width = parseFloat((_a = svg.getAttribute("width")) !== null && _a !== void 0 ? _a : "0") * scale;
        this.dimension.height = parseFloat((_b = svg.getAttribute("height")) !== null && _b !== void 0 ? _b : "0") * scale;
        const position = (_c = options.position) !== null && _c !== void 0 ? _c : {
            x: 50,
            y: 50,
        };
        this.offset = {
            x: (container.canvas.size.width * position.x) / (100 * pxRatio) - this.dimension.width / 2,
            y: (container.canvas.size.height * position.y) / (100 * pxRatio) - this.dimension.height / 2,
        };
        return parsePaths(this.paths, scale, this.offset);
    }
    downloadSvgPath(svgUrl, force) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = this.options;
            const url = svgUrl || options.url;
            const forceDownload = force !== null && force !== void 0 ? force : false;
            if (!url || (this.paths !== undefined && !forceDownload)) {
                return this.raw;
            }
            const req = yield fetch(url);
            if (!req.ok) {
                throw new Error("tsParticles Error - Error occurred during polygon mask download");
            }
            return this.parseSvgPath(yield req.text(), force);
        });
    }
    drawPoints() {
        if (!this.raw) {
            return;
        }
        for (const item of this.raw) {
            this.container.particles.addParticle({
                x: item.x,
                y: item.y,
            });
        }
    }
    randomPoint() {
        const container = this.container;
        const options = this.options;
        let position;
        if (options.type === Enums_1.Type.inline) {
            switch (options.inline.arrangement) {
                case Enums_1.InlineArrangement.randomPoint:
                    position = this.getRandomPoint();
                    break;
                case Enums_1.InlineArrangement.randomLength:
                    position = this.getRandomPointByLength();
                    break;
                case Enums_1.InlineArrangement.equidistant:
                    position = this.getEquidistantPointByIndex(container.particles.count);
                    break;
                case Enums_1.InlineArrangement.onePerPoint:
                case Enums_1.InlineArrangement.perPoint:
                default:
                    position = this.getPointByIndex(container.particles.count);
            }
        }
        else {
            position = {
                x: Math.random() * container.canvas.size.width,
                y: Math.random() * container.canvas.size.height,
            };
        }
        if (this.checkInsidePolygon(position)) {
            return position;
        }
        else {
            return this.randomPoint();
        }
    }
    getRandomPoint() {
        if (!this.raw || !this.raw.length) {
            throw new Error(Utils_1.Constants.noPolygonDataLoaded);
        }
        const coords = Utils_1.Utils.itemFromArray(this.raw);
        return {
            x: coords.x,
            y: coords.y,
        };
    }
    getRandomPointByLength() {
        var _a, _b, _c;
        const options = this.options;
        if (!this.raw || !this.raw.length || !((_a = this.paths) === null || _a === void 0 ? void 0 : _a.length)) {
            throw new Error(Utils_1.Constants.noPolygonDataLoaded);
        }
        const path = Utils_1.Utils.itemFromArray(this.paths);
        const distance = Math.floor(Math.random() * path.length) + 1;
        const point = path.element.getPointAtLength(distance);
        return {
            x: point.x * options.scale + (((_b = this.offset) === null || _b === void 0 ? void 0 : _b.x) || 0),
            y: point.y * options.scale + (((_c = this.offset) === null || _c === void 0 ? void 0 : _c.y) || 0),
        };
    }
    getEquidistantPointByIndex(index) {
        var _a, _b, _c, _d, _e, _f, _g;
        const options = this.container.actualOptions;
        const polygonMaskOptions = this.options;
        if (!this.raw || !this.raw.length || !((_a = this.paths) === null || _a === void 0 ? void 0 : _a.length))
            throw new Error(Utils_1.Constants.noPolygonDataLoaded);
        let offset = 0;
        let point;
        const totalLength = this.paths.reduce((tot, path) => tot + path.length, 0);
        const distance = totalLength / options.particles.number.value;
        for (const path of this.paths) {
            const pathDistance = distance * index - offset;
            if (pathDistance <= path.length) {
                point = path.element.getPointAtLength(pathDistance);
                break;
            }
            else {
                offset += path.length;
            }
        }
        return {
            x: ((_b = point === null || point === void 0 ? void 0 : point.x) !== null && _b !== void 0 ? _b : 0) * polygonMaskOptions.scale + ((_d = (_c = this.offset) === null || _c === void 0 ? void 0 : _c.x) !== null && _d !== void 0 ? _d : 0),
            y: ((_e = point === null || point === void 0 ? void 0 : point.y) !== null && _e !== void 0 ? _e : 0) * polygonMaskOptions.scale + ((_g = (_f = this.offset) === null || _f === void 0 ? void 0 : _f.y) !== null && _g !== void 0 ? _g : 0),
        };
    }
    getPointByIndex(index) {
        if (!this.raw || !this.raw.length) {
            throw new Error(Utils_1.Constants.noPolygonDataLoaded);
        }
        const coords = this.raw[index % this.raw.length];
        return {
            x: coords.x,
            y: coords.y,
        };
    }
    createPath2D() {
        var _a, _b;
        const options = this.options;
        if (!this.path2DSupported || !((_a = this.paths) === null || _a === void 0 ? void 0 : _a.length)) {
            return;
        }
        for (const path of this.paths) {
            const pathData = (_b = path.element) === null || _b === void 0 ? void 0 : _b.getAttribute("d");
            if (pathData) {
                const path2d = new Path2D(pathData);
                const matrix = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
                const finalPath = new Path2D();
                const transform = matrix.scale(options.scale);
                if (finalPath.addPath) {
                    finalPath.addPath(path2d, transform);
                    path.path2d = finalPath;
                }
                else {
                    delete path.path2d;
                }
            }
            else {
                delete path.path2d;
            }
            if (path.path2d || !this.raw) {
                continue;
            }
            path.path2d = new Path2D();
            path.path2d.moveTo(this.raw[0].x, this.raw[0].y);
            this.raw.forEach((pos, i) => {
                var _a;
                if (i > 0) {
                    (_a = path.path2d) === null || _a === void 0 ? void 0 : _a.lineTo(pos.x, pos.y);
                }
            });
            path.path2d.closePath();
        }
    }
    initRawData(force) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = this.options;
            if (options.url) {
                this.raw = yield this.downloadSvgPath(options.url, force);
            }
            else if (options.data) {
                const data = options.data;
                let svg;
                if (typeof data !== "string") {
                    const path = data.path instanceof Array
                        ? data.path.map((t) => `<path d="${t}" />`).join("")
                        : `<path d="${data.path}" />`;
                    const namespaces = 'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"';
                    svg = `<svg ${namespaces} width="${data.size.width}" height="${data.size.height}">${path}</svg>`;
                }
                else {
                    svg = data;
                }
                this.raw = this.parseSvgPath(svg, force);
            }
            this.createPath2D();
        });
    }
}
exports.PolygonMaskInstance = PolygonMaskInstance;

},{"./Enums":"../node_modules/tsparticles/dist/Plugins/PolygonMask/Enums/index.js","../../Utils":"../node_modules/tsparticles/dist/Utils/index.js","./Options/Classes/PolygonMask":"../node_modules/tsparticles/dist/Plugins/PolygonMask/Options/Classes/PolygonMask.js"}],"../node_modules/tsparticles/dist/Plugins/PolygonMask/PolygonMaskPlugin.js":[function(require,module,exports) {
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolygonMaskPlugin = void 0;
const PolygonMaskInstance_1 = require("./PolygonMaskInstance");
const PolygonMask_1 = require("./Options/Classes/PolygonMask");
const Enums_1 = require("./Enums");
class PolygonMaskPlugin {
    constructor() {
        this.id = "polygonMask";
    }
    getPlugin(container) {
        return new PolygonMaskInstance_1.PolygonMaskInstance(container);
    }
    needsPlugin(options) {
        var _a, _b, _c;
        return (_b = (_a = options === null || options === void 0 ? void 0 : options.polygon) === null || _a === void 0 ? void 0 : _a.enable) !== null && _b !== void 0 ? _b : (((_c = options === null || options === void 0 ? void 0 : options.polygon) === null || _c === void 0 ? void 0 : _c.type) !== undefined && options.polygon.type !== Enums_1.Type.none);
    }
    loadOptions(options, source) {
        if (!this.needsPlugin(source)) {
            return;
        }
        const optionsCast = options;
        let polygonOptions = optionsCast.polygon;
        if ((polygonOptions === null || polygonOptions === void 0 ? void 0 : polygonOptions.load) === undefined) {
            optionsCast.polygon = polygonOptions = new PolygonMask_1.PolygonMask();
        }
        polygonOptions.load(source === null || source === void 0 ? void 0 : source.polygon);
    }
}
const plugin = new PolygonMaskPlugin();
exports.PolygonMaskPlugin = plugin;
__exportStar(require("./Enums"), exports);

},{"./PolygonMaskInstance":"../node_modules/tsparticles/dist/Plugins/PolygonMask/PolygonMaskInstance.js","./Options/Classes/PolygonMask":"../node_modules/tsparticles/dist/Plugins/PolygonMask/Options/Classes/PolygonMask.js","./Enums":"../node_modules/tsparticles/dist/Plugins/PolygonMask/Enums/index.js"}],"../node_modules/tsparticles/dist/main.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const main_slim_1 = require("./main.slim");
const AbsorbersPlugin_1 = require("./Plugins/Absorbers/AbsorbersPlugin");
const EmittersPlugin_1 = require("./Plugins/Emitters/EmittersPlugin");
const PolygonMaskPlugin_1 = require("./Plugins/PolygonMask/PolygonMaskPlugin");
class Main extends main_slim_1.MainSlim {
    constructor() {
        super();
        this.addPlugin(AbsorbersPlugin_1.AbsorbersPlugin);
        this.addPlugin(EmittersPlugin_1.EmittersPlugin);
        this.addPlugin(PolygonMaskPlugin_1.PolygonMaskPlugin);
    }
}
exports.Main = Main;

},{"./main.slim":"../node_modules/tsparticles/dist/main.slim.js","./Plugins/Absorbers/AbsorbersPlugin":"../node_modules/tsparticles/dist/Plugins/Absorbers/AbsorbersPlugin.js","./Plugins/Emitters/EmittersPlugin":"../node_modules/tsparticles/dist/Plugins/Emitters/EmittersPlugin.js","./Plugins/PolygonMask/PolygonMaskPlugin":"../node_modules/tsparticles/dist/Plugins/PolygonMask/PolygonMaskPlugin.js"}],"../node_modules/tsparticles/dist/Types/RangeValue.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],"../node_modules/tsparticles/dist/Types/RecursivePartial.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],"../node_modules/tsparticles/dist/Types/ShapeData.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],"../node_modules/tsparticles/dist/Types/ShapeDrawerFunctions.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],"../node_modules/tsparticles/dist/Types/SingleOrMultiple.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],"../node_modules/tsparticles/dist/Types/index.js":[function(require,module,exports) {
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./RangeValue"), exports);
__exportStar(require("./RecursivePartial"), exports);
__exportStar(require("./ShapeData"), exports);
__exportStar(require("./ShapeDrawerFunctions"), exports);
__exportStar(require("./SingleOrMultiple"), exports);

},{"./RangeValue":"../node_modules/tsparticles/dist/Types/RangeValue.js","./RecursivePartial":"../node_modules/tsparticles/dist/Types/RecursivePartial.js","./ShapeData":"../node_modules/tsparticles/dist/Types/ShapeData.js","./ShapeDrawerFunctions":"../node_modules/tsparticles/dist/Types/ShapeDrawerFunctions.js","./SingleOrMultiple":"../node_modules/tsparticles/dist/Types/SingleOrMultiple.js"}],"../node_modules/tsparticles/dist/index.js":[function(require,module,exports) {
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsParticles = exports.pJSDom = exports.particlesJS = exports.Main = exports.Utils = exports.Constants = exports.ColorUtils = exports.CanvasUtils = void 0;
const pjs_1 = require("./pjs");
const main_1 = require("./main");
Object.defineProperty(exports, "Main", { enumerable: true, get: function () { return main_1.Main; } });
const Utils_1 = require("./Utils");
Object.defineProperty(exports, "CanvasUtils", { enumerable: true, get: function () { return Utils_1.CanvasUtils; } });
Object.defineProperty(exports, "ColorUtils", { enumerable: true, get: function () { return Utils_1.ColorUtils; } });
Object.defineProperty(exports, "Constants", { enumerable: true, get: function () { return Utils_1.Constants; } });
Object.defineProperty(exports, "Utils", { enumerable: true, get: function () { return Utils_1.Utils; } });
const tsParticles = new main_1.Main();
exports.tsParticles = tsParticles;
tsParticles.init();
const { particlesJS, pJSDom } = pjs_1.initPjs(tsParticles);
exports.particlesJS = particlesJS;
exports.pJSDom = pJSDom;
__exportStar(require("./Core/Container"), exports);
__exportStar(require("./Enums"), exports);
__exportStar(require("./Plugins/Absorbers/Enums"), exports);
__exportStar(require("./Plugins/Emitters/Enums"), exports);
__exportStar(require("./Plugins/PolygonMask/Enums"), exports);
__exportStar(require("./Types"), exports);

},{"./pjs":"../node_modules/tsparticles/dist/pjs.js","./main":"../node_modules/tsparticles/dist/main.js","./Utils":"../node_modules/tsparticles/dist/Utils/index.js","./Core/Container":"../node_modules/tsparticles/dist/Core/Container.js","./Enums":"../node_modules/tsparticles/dist/Enums/index.js","./Plugins/Absorbers/Enums":"../node_modules/tsparticles/dist/Plugins/Absorbers/Enums/index.js","./Plugins/Emitters/Enums":"../node_modules/tsparticles/dist/Plugins/Emitters/Enums/index.js","./Plugins/PolygonMask/Enums":"../node_modules/tsparticles/dist/Plugins/PolygonMask/Enums/index.js","./Types":"../node_modules/tsparticles/dist/Types/index.js"}],"main.js":[function(require,module,exports) {
"use strict";

var _gsap = require("gsap");

var _tsparticles = require("tsparticles");

var cloudFirst = document.querySelector("#cloud-first");
var cloudSecond = document.querySelector("#cloud-second");
var first = document.querySelector("#first");
var second = document.querySelector("#second");
var third = document.querySelector("#third");
var heroTitle = document.querySelectorAll(".hero__title");
var box = document.querySelectorAll("#box");
var circules = document.querySelectorAll("#circules");

var tl = _gsap.gsap.timeline({
  repeat: -1
}).fromTo(first, 19, {
  x: "-100%",
  duration: 1,
  opacity: 1,
  ease: "slow"
}, {
  x: -100,
  duration: 10,
  opacity: 0
}, 0.5).fromTo(second, {
  x: -1000,
  duration: 3,
  opacity: 0
}, {
  x: 500,
  duration: 10,
  opacity: 1
}, 0.2);

tl = _gsap.gsap.timeline({
  repeat: 0
}).to(third, {
  x: 900,
  duration: 8,
  opacity: 1,
  ease: "back"
}).to(box, {
  y: 20,
  scale: 1.15,
  duration: 4,
  repeat: 100,
  repeatDelay: 1,
  yoyo: true,
  ease: "power1.inOut"
}, -0.1).to(circules, {
  y: 20,
  x: -50,
  scale: 1.1,
  translateX: -100,
  duration: 5,
  repeat: -1,
  repeatDelay: 1,
  yoyo: true,
  ease: "power1.inOut"
}, 1).fromTo(heroTitle, {
  x: "100%",
  duration: 3,
  opacity: 0
}, {
  x: 100,
  duration: 5,
  opacity: 1,
  ease: "back"
}, -0.2).from(cloudFirst, {
  duration: 3,
  x: 500,
  y: -100,
  scale: 0.5,
  skewX: 45
}, -0.1).from(cloudSecond, {
  y: -100,
  scaleY: 0,
  opacity: 0,
  duration: 1,
  ease: "back"
}, 3);

_tsparticles.tsParticles.load("tsparticles", {
  fpsLimit: 60,
  background: {
    color: {
      value: ""
    }
  },
  fullScreen: {
    enable: false,
    zIndex: -1
  },
  particles: {
    color: {
      value: "#84aabb80"
    },
    links: {
      color: "#c7c7c773",
      distance: 150,
      enable: true,
      opacity: 1,
      width: 1
    },
    number: {
      value: 120
    },
    move: {
      enable: true,
      speed: 5,
      outModes: {
        default: "bounce"
      }
    },
    size: {
      value: 4,
      random: {
        enable: true,
        minimumValue: 1
      },
      animation: {
        enable: true,
        speed: 10,
        minimumValue: 1
      }
    },
    opacity: {
      value: 0.8,
      random: {
        enable: true,
        minimumValue: 0.1
      }
    }
  }
});
},{"gsap":"../node_modules/gsap/index.js","tsparticles":"../node_modules/tsparticles/dist/index.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52983" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map