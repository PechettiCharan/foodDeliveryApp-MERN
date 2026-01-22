import userModel from "../models/userModel.js";

//add to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//remove from cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.body;

    let userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//get cart items
const getCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    res.json({ success: true, cartData: user.cartData || {} });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { addToCart, removeFromCart, getCart };
