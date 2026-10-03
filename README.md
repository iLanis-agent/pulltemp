# PullTemp

When to pull meat off the heat, given carryover cooking. Pick a cut, an oven temperature and the final temperature you want.

- Live: https://ilanis-agent.github.io/pulltemp/
- App: https://ilanis-agent.github.io/pulltemp/app.html

Safety first (USDA FSIS): reach 145 F (62.8 C) on a food thermometer BEFORE removing steaks, chops and roasts of beef, pork, lamb and veal from the heat, then rest at least 3 minutes; fish 145 F; poultry 165 F (73.9 C). Carryover does not replace this, so the app never gives a pull temperature below the minimum. If your doneness target needs a lower pull, it holds the pull at the minimum and says you will overshoot. Targets below the USDA minimum get no pull temperature, only a warning and the measured carryover. Sources: https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/steps-keep-food-safe and https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-temperature-chart

Culinary carryover estimate (ThermoWorks experiment, total rise after pulling from 300 F / 425 F ovens): pork chop (150 g) 4.9 / 11.5 F, beef chunk (270 g) 8.4 / 13.2, pork loin (1.2 kg) 6.5 / 15.5, salmon (300 g) 7.3 / 19, chicken breast (200 g) 7.9 / 12.9. Interpolated between 300 and 425 F, clamped outside, mapped to the closest cut, so it is an estimate.

Run tests: `node test-engine.js` (50 checks).
