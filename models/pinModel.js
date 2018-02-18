/** 
 * mongoose model for pins with defined properties 
 *  
 *  @author BBK
 * 
 */



var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/we2');
var PinSchema = mongoose.Schema(
	{
    // not needed
	 //id: {
	 //	type: String
	 //},
    title:  {
    	type: String,
    	required: true
   },

    src: {
    	type: String,
    	required: true
   },
    
    type: {
    	type: String,
    	required: true,
    	enum: ['image', 'video', 'website']
   },

    description: {
    	type: String,
    	default: ""

   },

    views:{ 
        type: Number,
    	min: 0,
    	default: 0

   },
    ranking: { 
    	type: Number,
    	min: 0,
    	default: 0
   }
  },
  {
  	timestamps: 
	{
	 	createdAt: 'timestamp', 
	 	updatedAt: 'changed'
	},
  }
  );

// converting PinSchema into a Model 

module.exports = mongoose.model('Pin', PinSchema);

var model = mongoose.model("Pin", PinSchema);
model.collection.insert([
    {
        title: '',
        type: 'image',
        src: '/public/img/bg.jpg'
    },    
     {
        title: '',
        type: 'image',
        src: '/public/img/p5.jpg'
    },    
       {
        title: '',
        type: 'image',
        src: '/public/img/p3.jpg'
    },

      {
        title: '',
        type: 'image',
        src: '/public/img/cact.jpg'
    }
]);
module.exports = model;