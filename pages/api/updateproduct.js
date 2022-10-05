// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../modals/ProductModal";
import db from "../../utils/db";

const handler = async (req, res) => {
  const data = {
    uid: req.body.uid,
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
  };

  console.log(data);

  try {
    await db.connect();
    await Product.updateOne(
      { _id: data.uid },
      { $set: { title: data.title, description: data.description } }
    );
    if (data.image) {
      await Product.updateOne(
        { _id: data.uid },
        { $set: { image: data.image } }
      );
    }
    await db.disconnect();
    console.log("Updated Successfully");
  } catch (e) {
    console.log(e);
  }

  res.status(200).json({ data: data });
};

export default handler;
