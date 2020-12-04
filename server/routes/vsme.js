
import express from "express";
const router = express.Router();

import VSME from '../api/VSME';

router.post("/search", async (req, res) => {
  try {
    let vsme = new VSME(process.env.VSME_API_KEY);
    let documents = await vsme.readCSV(req.body.filename);
    let results = await vsme.search(req.body.query, documents, req.body.engine);
    console.log(results);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export default router;
