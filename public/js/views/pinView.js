/** 
 * pin view 
 *  
 *  @author BBK
 * 
 */


define(['backbone', 'jquery', 'underscore'], 
    function(Backbone, $, _) {
    var PinView = Backbone.View.extend({
        tagName: 'picture',
        className: 'pic_content',
        template: _.template($('#pin-template').text()),
        render: function() {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
        initialize: function() {
            console.log("init pin view");
            this.listenTo(this.model, 'change', this.render);
        }
    });
    return PinView;
});
