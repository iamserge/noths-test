import { Item, GildedRose } from './gilded-rose';
import rules from './rules';
import './styles/style.scss';

const items = [
    new Item('Aged Brie', 10, 20),
    new Item('+5 Dexterity Vest', 10, 20),
    new Item('Elixir of the Mongoose', 5, 7),
    new Item('Sulfuras, Hand of Ragnaros', 0, 80),
    new Item('Backstage passes to a TAFKAL80ETC concert 1', 15, 20),
    new Item('Backstage passes to a TAFKAL80ETC concert 2', 10, 49),
    new Item('Backstage passes to a TAFKAL80ETC concert 3', 5, 49),
    new Item('Conjured item 1', 50, 10),
];


const GildedRoseInventory = new GildedRose(items, rules)
GildedRoseInventory.renderItems();
document.getElementById("updateDay").onclick = () => {
    GildedRoseInventory.updateQuality();
    GildedRoseInventory.renderItems();
};