const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 50,
      },
    description: {
        type: String,
        trim: true,
        default: '',
    },
    icon: {
        type: String, 
        default: '',
      },
},
{timestamps:true}
);

const Category = mongoose.model('Category',CategorySchema);
module.exports = Category;
