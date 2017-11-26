import './sass/index.sass';
import * as $ from 'jquery';
import {I} from '../plugin/Interfaces';

(window as any).$ = $;

let node = <I.IJQuery>$('#node');

node.ItemsList({
    name: 'Username',
    placeholder: 'Add your todo',
    items: [
        'one', 'two', 'three'
    ]
});
