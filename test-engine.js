var P = require('./engine.js'), pass = 0, fail = 0;
function eq(n, a, b, t) { if (a !== null && Math.abs(a - b) <= (t || 0.01)) pass++; else { fail++; console.log('FAIL', n, a, b); } }
function ok(n, c) { if (c) pass++; else { fail++; console.log('FAIL', n); } }
// ThermoWorks measured rows reproduced exactly at 300 and 425 F
[['chop', 4.9, 11.5], ['chunk', 8.4, 13.2], ['roast', 6.5, 15.5], ['fish', 7.3, 19], ['chicken', 7.9, 12.9]].forEach(function (r) { eq(r[0] + ' 300', P.carryover(r[0], 300), r[1]); eq(r[0] + ' 425', P.carryover(r[0], 425), r[2]); });
// interpolation at 362.5 F is the midpoint
eq('mid chop', P.carryover('chop', 362.5), (4.9 + 11.5) / 2); eq('mid fish', P.carryover('fish', 362.5), (7.3 + 19) / 2);
eq('350 chop', P.carryover('chop', 350), 4.9 + 6.6 * 0.4);
// clamped outside the measured range
eq('clamp low', P.carryover('chop', 250), 4.9); eq('clamp high', P.carryover('chop', 475), 11.5);
ok('too cold', P.carryover('chop', 200) === null); ok('too hot', P.carryover('chop', 500) === null); ok('bad item', P.carryover('x', 350) === null);
// USDA minimums
ok('usda chop 145', P.ITEMS.chop.usda === 145); ok('usda fish 145', P.ITEMS.fish.usda === 145); ok('usda chicken 165', P.ITEMS.chicken.usda === 165); ok('rest 3 for red meat', P.ITEMS.roast.rest === 3 && P.ITEMS.chicken.rest === 0);
// ThermoWorks' own examples: pork chop at 425 pulled at 140 peaked 151.5; chicken at 300 pulled at 157 peaked 162.9
var a = P.analyze('chop', 425, 'F', 151.5, 'F'); eq('pull for 151.5 target', a.pullF, 140);
var b = P.analyze('chicken', 300, 'F', 162.9, 'F'); eq('chicken pull', b.pullF, 155, 0.01);
var c = P.analyze('chicken', 300, 'F', 165, 'F'); ok('chicken at 165 not below', !c.belowUsda); eq('chicken pull 165', c.pullF, 157.1);
var d = P.analyze('chop', 350, 'F', 135, 'F'); ok('135 below usda flagged', d.belowUsda === true); ok('not clamped at 350', d.clamped === false);
var e = P.analyze('chop', 250, 'F', 145, 'F'); ok('clamped flag', e.clamped === true);
// units
var f = P.analyze('roast', 177, 'C', 63, 'C'); eq('177 C is 350.6 F', f.ovenF, 350.6); eq('63 C target F', f.targetF, 145.4); eq('pull C matches F', f.pullC, P.f2c(f.pullF));
eq('c2f', P.c2f(100), 212); eq('f2c', P.f2c(145), 62.78);
ok('bad target low', P.analyze('chop', 350, 'F', 80, 'F') === null); ok('bad target high', P.analyze('chop', 350, 'F', 250, 'F') === null);
ok('NaN', P.analyze('chop', NaN, 'F', 145, 'F') === null);
eq('riseC', P.analyze('fish', 425, 'F', 145, 'F').riseC, 19 * 5 / 9);
console.log(pass + '/' + (pass + fail) + ' pass'); process.exit(fail ? 1 : 0);
