
const Product = require('../models/Product');

module.exports = {
   async addProduct({price, name, description}) {
       return await Product.create({price, name, description});
   },
   async getProducts() {
       return (await Product.find({}));
   },
   async getProductById(_id) {
       return (await Product.find({_id}))[0];
   }
};