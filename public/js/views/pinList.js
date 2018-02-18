/** 
 * pin-list view as delegator view
 *  
 *  @author BBK
 * 
 */

define(['backbone', 'jquery', 'underscore', 'pinview'], 
    function(Backbone, $, _, PinView) {
    var PinListView = Backbone.View.extend({
        el: '#pin-list',
        template: undefined,
        render: function() {
            this.$el.empty();
            this.collection.each(
            function(pin) {
                console.log(pin);
                var pinView = new PinView({model: pin});
                this.$el.prepend(pinView.render().el);
            },
            this
            );
            return this;
        },
        initialize: function() {
            console.log("init pin list view");
            this.listenTo(this.collection,'add', this.render);
        }
    });
    return PinListView;
});
