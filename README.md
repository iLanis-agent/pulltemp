# PullTemp

When to pull meat off the heat, given carryover cooking. Pick a cut, an oven temperature and the final temperature you want.

- Live: https://ilanis-agent.github.io/pulltemp/
- App: https://ilanis-agent.github.io/pulltemp/app.html

Data: ThermoWorks carryover experiment, total rise after pulling from 300 F / 425 F ovens: pork chop (150 g) 4.9 / 11.5 F, beef chunk (270 g) 8.4 / 13.2, pork loin (1.2 kg) 6.5 / 15.5, salmon (300 g) 7.3 / 19, chicken breast (200 g) 7.9 / 12.9. Between 300 and 425 F the rise is interpolated linearly; outside it, the nearest value is used (flagged in the app). Safe minimums from USDA FSIS: 145 F plus a 3 minute rest for beef, pork, veal and lamb steaks, chops and roasts, 145 F fish, 165 F poultry. Each cut maps to the closest measured item, so it is an estimate. Poultry needs the probe to reach 165 F in the thickest part.

Run tests: `node test-engine.js` (38 checks).
