
import express from "express";
const router = express.Router();

import VSME from '../api/VSME';

router.post("/search", async (req, res) => {
  try {
    let vsme = new VSME(process.env.VSME_API_KEY);
    let documents = await vsme.readCSV(req.body.filename);
    console.log(documents)
    // let results = await vsme.search(req.body.query, documents, req.body.engine);
    // console.log(results);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/create-doc-set-from-zendesk", async(req, res) => {
  try {
    let vsme = new VSME(process.env.VSME_API_KEY);
    let articles = await vsme.readCSV(req.body.filename);
    console.log(articles);
    let documents = [];
    for (let a in articles) {
      let doc = {
        title: articles[a].name,
        body: articles[a].body
      }
      documents.push(doc);
    }
    let createDocSet = await vsme.createDocSet(req.body.docSetName);
    console.log(createDocSet);
    let addDocsToDocSet = await vsme.addDocsToDocSet(createDocSet.id, documents);
    console.log(addDocsToDocSet);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
})

router.post("/get-doc-sets", async (req, res) => {
  try {
    let vsme = new VSME(process.env.VSME_API_KEY);
    let docSets = await vsme.getAllDocSets();
    console.log(docSets);
    res.send(docSets);
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
})

export default router;
