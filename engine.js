(function (root) {
  'use strict';
  // Carryover data: ThermoWorks "Carryover Cooking" experiment (blog.thermoworks.com/carryover-cooking-what-happens-after-you-cook/),
  // total rise after pulling from a 300 F and a 425 F oven. USDA FSIS safe minimum temperatures (fsis.usda.gov safe temperature chart).
  var ITEMS = {
    chop:    { label: 'Chop or thick steak (about 150 g)', rise300: 4.9, rise425: 11.5, usda: 145, rest: 3, note: 'Pork chop data' },
    chunk:   { label: 'Small roast or chunk (about 270 g)', rise300: 8.4, rise425: 13.2, usda: 145, rest: 3, note: 'Beef chunk data' },
    roast:   { label: 'Large roast (over 1 kg)', rise300: 6.5, rise425: 15.5, usda: 145, rest: 3, note: 'Pork loin data' },
    fish:    { label: 'Fish fillet (about 300 g)', rise300: 7.3, rise425: 19, usda: 145, rest: 0, note: 'Salmon data' },
    chicken: { label: 'Chicken breast (about 200 g)', rise300: 7.9, rise425: 12.9, usda: 165, rest: 0, note: 'Chicken data' }
  };
  function f2c(f) { return (f - 32) * 5 / 9; }
  function c2f(c) { return c * 9 / 5 + 32; }
  function carryover(item, ovenF) {
    var it = ITEMS[item]; if (!it || !(ovenF >= 250 && ovenF <= 475)) return null;
    var o = Math.min(425, Math.max(300, ovenF)), t = (o - 300) / 125;
    return it.rise300 + (it.rise425 - it.rise300) * t;
  }
  function analyze(item, ovenValue, ovenUnit, targetValue, tempUnit) {
    var it = ITEMS[item]; if (!it) return null;
    var ovenF = ovenUnit === 'C' ? c2f(ovenValue) : ovenValue;
    var targetF = tempUnit === 'C' ? c2f(targetValue) : targetValue;
    if (!(targetF >= 110 && targetF <= 200)) return null;
    var rise = carryover(item, ovenF); if (rise === null) return null;
    var pull = targetF - rise;
    return { riseF: rise, riseC: rise * 5 / 9, pullF: pull, pullC: f2c(pull), targetF: targetF, targetC: f2c(targetF), usda: it.usda, rest: it.rest, belowUsda: targetF < it.usda, clamped: ovenF < 300 || ovenF > 425, ovenF: ovenF, note: it.note };
  }
  root.PullTemp = { ITEMS: ITEMS, f2c: f2c, c2f: c2f, carryover: carryover, analyze: analyze };
  if (typeof module !== 'undefined') module.exports = root.PullTemp;
})(typeof window !== 'undefined' ? window : globalThis);
