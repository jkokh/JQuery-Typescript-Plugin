import * as $ from 'jquery';
import './sass/index.sass';
import {ItemsList} from './ItemsList';

// jquery plugin wrapper
(window as any).$ = $;

(window as any).$.fn.extend({
    ItemsList: function(opts: any) {
        $(this).empty();
        let itemsList = new ItemsList($(this), opts);
        return $(this);
    }
});
