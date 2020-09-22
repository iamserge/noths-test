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
    it('should update regular item correctly', function() {
        const items = [
            new Item('+5 Dexterity Vest', 10, 20),
        ]; 
        const GildedRoseInventory = new GildedRose(items, rules)
        GildedRoseInventory.updateQuality();
        expect(GildedRoseInventory.items[0].quality).to.equal(19);
    });
    it('should update "Aged Brie" correctly', function() {
        const items = [
            new Item('Aged Brie', 10, 20),
        ]; 
        const GildedRoseInventory = new GildedRose(items, rules)
        GildedRoseInventory.updateQuality();
        expect(GildedRoseInventory.items[0].quality).to.equal(21);
    });
    it('should update regular item passed sell in date correctly', function() {
        const items = [
            new Item('+5 Dexterity Vest', 0, 20),
        ]; 
        const GildedRoseInventory = new GildedRose(items, rules)
        GildedRoseInventory.updateQuality();
        expect(GildedRoseInventory.items[0].quality).to.equal(18);
    });
    it('should update backstage pass correctly', function() {
        const items = [
            new Item('Backstage passes 1', 20, 20),
        ]; 
        const GildedRoseInventory = new GildedRose(items, rules)
        GildedRoseInventory.updateQuality();
        expect(GildedRoseInventory.items[0].quality).to.equal(21);
    });
    it('should update backstage pass correctly with less than 10 days', function() {
        const items = [
            new Item('Backstage passes 2', 8, 20),
        ]; 
        const GildedRoseInventory = new GildedRose(items, rules)
        GildedRoseInventory.updateQuality();
        expect(GildedRoseInventory.items[0].quality).to.equal(22);
    });
    it('should update backstage pass correctly with less than 5 days', function() {
        const items = [
            new Item('Backstage passes 3', 4, 20),
        ]; 
        const GildedRoseInventory = new GildedRose(items, rules)
        GildedRoseInventory.updateQuality();
        expect(GildedRoseInventory.items[0].quality).to.equal(23);
    });
    it('should update backstage pass correctly with 0 days', function() {
        const items = [
            new Item('Backstage passes 3', 0, 20),
        ]; 
        const GildedRoseInventory = new GildedRose(items, rules)
        GildedRoseInventory.updateQuality();
        expect(GildedRoseInventory.items[0].quality).to.equal(0);
    });
    it('should set minimum limit for quality to 0', function() {
        const items = [
            new Item('+5 Dexterity Vest', 1, 0),
        ]; 
        const GildedRoseInventory = new GildedRose(items, rules)
        GildedRoseInventory.updateQuality();
        expect(GildedRoseInventory.items[0].quality).to.equal(0);
    });
    it('should update Conjured items correctly', function() {
        const items = [
            new Item('Conjured 1', 10, 20),
        ]; 
        const GildedRoseInventory = new GildedRose(items, rules)
        GildedRoseInventory.updateQuality();
        expect(GildedRoseInventory.items[0].quality).to.equal(18);
    });
    it('should set maximum limit for quality to 50', function() {
        const items = [
            new Item('Backstage passes', 10, 50),
        ]; 
        const GildedRoseInventory = new GildedRose(items, rules)
        GildedRoseInventory.updateQuality();
        expect(GildedRoseInventory.items[0].quality).to.equal(50);
    });
    it('should not update quality for Sulfuras items', function() {
        const items = [
            new Item('Sulfuras 1', 10, 80),
        ]; 
        const GildedRoseInventory = new GildedRose(items, rules)
        GildedRoseInventory.updateQuality();
        expect(GildedRoseInventory.items[0].quality).to.equal(80);
    });
});

