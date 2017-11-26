import * as $ from 'jquery';

interface IItem {
    text: string;
    $element: JQuery;
}

export class ItemsList {
    items: IItem[] = [];
    data: any;
    private $element: JQuery;
    private $ul: JQuery;
    private $input: JQuery;
    private $addButton: JQuery;
    private template = require('./templates/template.handlebars');

    constructor(element: JQuery, data: any) {
        this.data = data;
        if (!this.data) {
            return;
        }
        this.$element = $(element);
        this._OnCreate();
    }

    private _OnCreate() {
        this._renderTemplate(this.data);
    }

    private _renderTemplate(data: any) {
        let self = this;
        this.$element.append($('<div>' + this.template(data) + '</div>'));
        this.$ul = $('ul', this.$element);
        this.$input = $('input', this.$element);
        this.$addButton = $('button', this.$element);
        this.$addButton.on('click', () => {
            this._addItem(this.$input.val());
        });
        this.$addButton.prop('disabled', !this.$input.val());
        this.$input.on('input keydown', function(e: any) {
            let $el = $(this);
            let value = $el.val();
            self.$addButton.prop('disabled', !value);
            if (!value) {
                return;
            }
            if (e.keyCode === 13) {
                self._addItem(value);
            }
        });
        this._addItems();
    }

    private _addItems() {
        this.$ul.empty();
        this.data.items.forEach((text: string) => {
            let $item = $('<li><button>Remove</button> ' + text + '</li>');
            let $remove = $('button', $item);
            $remove.on('click', () => {
                $item.remove();
                let index = this.data.items.indexOf(text);
                if (index > -1) {
                    this.data.items.splice(index, 1);
                }
            });
            this.items.push({
                text: text,
                $element: $item
            });
            this.$ul.append($item);
        });
    }

    private _addItem(itemText: any) {
        this.data.items.push(itemText);
        this.$input.val('');
        this.$addButton.prop('disabled', true);
        this._addItems();
    }

}
