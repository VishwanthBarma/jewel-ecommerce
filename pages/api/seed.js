// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../modals/ProductModal";
import db from "../../utils/db";
import data from "../../utils/data";

const handler = async (req, res) => {
  await db.connect();
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await db.disconnect();
  res.send({ message: "Seeded Successfullyu" });
};

export default handler;
