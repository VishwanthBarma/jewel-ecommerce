// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../modals/ProductModal";
import db from "../../utils/db";

const handler = async (req, res) => {
  const data = {
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
  };

  try {
    await db.connect();
    await Product.create(data);
    await db.disconnect();
    console.log("Inserted Successfully");
  } catch (e) {
    console.log(e);
  }

  res.status(200).json({ data: data });
};

export default handler;
