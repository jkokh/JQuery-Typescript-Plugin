# JQuery-Typescript-Plugin
Boilerplate for JQuery plugin with typescript and sass inside. Simple demo TODO list.

Demo page: http://icatalog.ru/demo/index.html

## How to use
Include JQuery library into your web page, include files from */dist* folder.
```
$('#element_id').ItemsList({
    name: 'Username',
    placeholder: 'Add your todo',
    items: [
        'one', 'two', 'three'
    ]
});
```

## Installation
Clone or download this repository.

Run: **npm install**

## Commands
To run development server: **npm run dev**

To create demo: **npm run demo**

To produce plugin files: **npm run dist**

## TODO
Add Redux flow