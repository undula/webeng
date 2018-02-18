/** 
 * pin model and collection 
 *  
 *  @author BBK
 * 
 */

define(['backbone', 'underscore'], function (Backbone, _) {
    var result = {};

    result.Model = Backbone.Model.extend({
        urlRoot: '/pins',
        id: '_id',
        defaults: {
            title: '',
            type: 'image',
            src: '',
            description: '',
            views: 0,
            ranking: 0,
            timestamp: ''
        },
        initialize: function () {
            // after constructor code
        },
        validate: function (attr) {
            if (!attr.user) {
                return "Missing User ID";
            }
        }
    });


    result.Collection = Backbone.Collection.extend({
        model: result.Model,
        url: '/pins',
    });
    return result;
});


// define(['backbone', 'jquery', 'underscore'], function(Backbone, $, _) {
//     var UserView = Backbone.View.extend({
//         //...
//     });
//     return UserView;
// });

