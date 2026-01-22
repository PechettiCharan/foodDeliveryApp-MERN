import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://admin:charan123@charan5.rsg6ibv.mongodb.net/food-del"
    )
    .then(() => console.log("DB Connected"));
};
