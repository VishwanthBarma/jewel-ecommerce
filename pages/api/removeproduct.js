// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../modals/ProductModal";
import db from "../../utils/db";

const handler = async (req, res) => {
  const uid = req.body.uid;

  try {
    await db.connect();
    await Product.remove({ _id: uid });
    await db.disconnect();
    console.log("Deleted Successfully");
  } catch (e) {
    console.log(e);
  }

  res.status(200).json({ data: uid });
};

export default handler;
