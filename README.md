# Gilded Rose

## Installation

npm install
npm start

That will start webpack dev server on http://localhost:8080
Clicking on "Next day" button will update items in the inventory as per specification

## Tests

npm run test


## Notes

Main idea was to have abstract the rules that control quality of various products, so new rules can be added easily in the future. I added new class "Rule" that is utilises eval() function to check every item against rule provided.
Rules are provided in a form of string in a specific format:

`IF ${condition when rule should be executed} THEN ${modifier - property that will be modified} = ${modifier formula};`

example:
IF name == 'Aged Brie' THEN quality = quality + 1;

