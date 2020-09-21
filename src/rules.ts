import { Rule } from './gilded-rose';

const exceptionNamesCondition = `name != 'Aged Brie' && name.indexOf('Sulfuras') == -1 && name.indexOf('Conjured') == -1 && name.indexOf('Backstage passes') == -1`;
const backstagePassesCondition = `name.indexOf('Backstage passes') != -1`;
export default [
    new Rule(`IF ${exceptionNamesCondition} && sellIn > 0 THEN quality = quality - 1;`),
    new Rule(`IF ${exceptionNamesCondition} && sellIn < 0 THEN quality = quality - 2;`),
    new Rule(`IF name == 'Aged Brie' THEN quality = quality + 1;`),
    new Rule(`IF ${backstagePassesCondition} && sellIn > 10 THEN quality = quality + 1;`),
    new Rule(`IF ${backstagePassesCondition} && sellIn <= 10 && sellIn > 5 THEN quality = quality + 2;`),
    new Rule(`IF ${backstagePassesCondition} && sellIn <= 5 THEN quality = quality + 3;`),
    new Rule(`IF ${backstagePassesCondition} && sellIn < 0 THEN quality = 0;`),
    new Rule(`IF name.indexOf('Conjured') != -1 THEN quality = quality - 2;`),
    new Rule(`IF true THEN quality = Math.max(quality, 0);`),
    new Rule(`IF name.indexOf('Sulfuras') == -1 THEN quality = Math.min(quality, 50);`),
    new Rule(`IF name.indexOf('Sulfuras') != -1 THEN quality = quality;`),
]   
