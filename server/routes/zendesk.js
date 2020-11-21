import express from "express";
const router = express.Router();

import fs from "fs";
import { Parser } from "json2csv";
import Zendesk from "../api/Zendesk";

router.post("/get-helpdesk-articles", async (req, res) => {
  try {
    let zendesk = new Zendesk(req.body.domain, req.body.maxPaging);
    let articles = await zendesk.getHelpdeskArticles(req.body.startPosition);
    console.log(articles);
    let json2csvParser = new Parser();
    let csv = json2csvParser.parse(articles);
    fs.writeFileSync(
      `Workspace/${req.body.domain}_helpdesk_articles_${Date.now()}.csv`,
      csv
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export default router;
