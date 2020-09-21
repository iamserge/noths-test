export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class Rule {
    conditionFormula: string;
    modifier: string;
    modifierFormla: string;

    constructor(rule: string) {
        this.conditionFormula = Rule.getConditionFormula(rule);
        const formulaObject = Rule.getFormulaModifier(rule);
        this.modifier = formulaObject.modifier
        this.modifierFormla = formulaObject.formula;
    }

    check(item: any) {
        const { name, sellIn, quality } = item; 
        if (eval(this.conditionFormula)) {
            item[this.modifier] = eval(this.modifierFormla);
        }
    }
    
    static getConditionFormula(rule: string) {
        const regex = /(?<=IF )(.*)(?= THEN)/;
        let conditionFormula = ''
        const conditionFormulaRow = regex.exec(rule);
        if (conditionFormulaRow !== null) {
            conditionFormula = conditionFormulaRow[1];
        }
        return conditionFormula;
    }

    static getFormulaModifier(rule: string) {
        const regex = /(?<=THEN )(.*)(?=;)/;
        const formulaRow = regex.exec(rule);
        let formulaObject = {
            modifier: '',
            formula: ''
        };
        if (formulaRow !== null) {
            const formulaString = formulaRow[1];
            formulaObject.modifier = formulaString.split(' = ')[0];
            formulaObject.formula = formulaString.split(' = ')[1];
        }
        return formulaObject;
    }
}




export class GildedRose {
    items: Array<Item>;
    rules: Array<Rule>;

    constructor(items = [] as Array<Item>, rules = [] as Array<Rule>) {
        this.items = items;
        this.rules = rules;
    }

    updateQuality() {
        for (let i in this.items) {
            const item = this.items[i];
            item.sellIn = item.sellIn - 1;
            for (let j in this.rules) {
                const rule = this.rules[j];
                rule.check(item);
            }
        }
       
    }

    getItemHtml(item: Item) {
        return `<h2 class="item__title">${item.name}</h2>
                <div class="item__details">
                    <div class="item__quality">${item.quality}<span class="item__label">quality</span></div>
                    <div class="item__sellIn">${item.sellIn}<span class="item__label">days</span></div>
                </div>`

    }
    renderItems(){
        var container = document.getElementById('items');
        container.innerHTML = '';
        for (let i in this.items) {
            var itemElement = document.createElement('div');
            itemElement.innerHTML = this.getItemHtml(this.items[i]);
            itemElement.className = 'item';
            container.appendChild(itemElement);
        }
    }
}

