const {User1} = require('../models/userModel')





const admin = async (req,res)=>{
    const pd= await User1.find()
    console.log(pd);
    res.render('adminhome',{pd})
}
const addproduct = async (req,res)=>{
   const {productName,description,price}= req.body
   const path = req.file.path
   const newproduct = new User1 ({
    name:productName,
    description:description,
    price:price,
    path:path   

   })

   await newproduct.save()
   res.redirect('/adminhome')
}

//update

const updatepost = async (req, res) => {
    const updateitem = req.params.productid;

    try {
        
        const product = await User1.findById(updateitem);
        if (!product) {
            return res.status(404).send('Product not found');
        }

    
        product.name = req.body.name;
        product.price = req.body.price;
        product.description = req.body.description;

        if (req.file) {
            product.image = `/upload/${req.file.filename}`;
        }

      
        await product.save();
        res.redirect('/adminhome');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};



const deleteProduct = async (req, res) => {
    const productId = req.params.productid;

    try {
        await User1.findByIdAndDelete(productId)

        
        res.redirect('/adminhome');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};








module.exports={
    admin,
    addproduct,
    updatepost,
    deleteProduct
}


