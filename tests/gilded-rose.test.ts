import { expect } from 'chai';
import { Item, Rule, GildedRose } from '../src/gilded-rose';
import rules from '../src/rules';

describe('Item', function () {
    it('should set name correctly', function() {
        const item = new Item('Brie Cheese', 10, 20);
        expect(item.name).to.equal('Brie Cheese');
    });
    it('should set quality correctly', function() {
        const item = new Item('Brie Cheese', 10, 20);
        expect(item.quality).to.equal(20);
    });
    it('should set sellIn correctly', function() {
        const item = new Item('Brie Cheese', 10, 20);
        expect(item.sellIn).to.equal(10);
    });
});


describe('Rule', function () {
    it('should set condition formula correctly', function() {
        const item = new Item('Brie Cheese', 10, 20);
        const rule = new Rule(`IF name == 'Brie Cheese' THEN quality = quality + 1;`);
        expect(rule.conditionFormula).to.equal("name == 'Brie Cheese'");
    });
    it('should set condition modifier correctly', function() {
        const item = new Item('Brie Cheese', 10, 20);
        const rule = new Rule(`IF name == 'Brie Cheese' THEN quality = quality + 1;`);
        expect(rule.modifier).to.equal("quality");
    });
    it('should set condition modifier formula correctly', function() {
        const item = new Item('Brie Cheese', 10, 20);
        const rule = new Rule(`IF name == 'Brie Cheese' THEN quality = quality + 1;`);
        expect(rule.modifierFormla).to.equal("quality + 1");
    });
    it('should update modifier correctly', function() {
        const item = new Item('Brie Cheese', 10, 20);
        const rule = new Rule(`IF name == 'Brie Cheese' THEN quality = quality + 1;`);
        rule.check(item);
        expect(item.quality).to.equal(21);
    });
});

describe('GildedRose', function () {
    it('should set items correctly', function() {
        const items = [
            new Item('Aged Brie', 10, 20),
            new Item('+5 Dexterity Vest', 10, 20),

        ]; 
        const GildedRoseInventory = new GildedRose(items, rules)
        expect(GildedRoseInventory.items).to.equal(items);
    });
    it('should set rules correctly', function() {
        const items = [
            new Item('Aged Brie', 10, 20),
            new Item('+5 Dexterity Vest', 10, 20),

        ];
        const GildedRoseInventory = new GildedRose(items, rules)
        expect(GildedRoseInventory.rules).to.equal(rules);
    });
    it('should update items correctly', function() {
        const items = [
            new Item('Aged Brie', 10, 20),
            new Item('+5 Dexterity Vest', 10, 20),
        ]; 
        const GildedRoseInventory = new GildedRose(items, rules)
        GildedRoseInventory.updateQuality();
        expect(GildedRoseInventory.items[0].quality).to.equal(21);
    });
});

