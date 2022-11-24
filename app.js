import express from "express";
const app = express();
const port = 3000;
import client from "./config/prismicConfig.js";
import * as prismicH from "@prismicio/helpers";
import { dirname } from "path";
app.set("views", dirname("views"));
app.set("view engine", "pug");

// Add a middleware function that runs on every route. It will inject
// the prismic context to the locals so that we can access these in
// our templates.
app.use((req, res, next) => {
  res.locals.ctx = {
    prismicH,
  };
  next();
});

app.get("/", (req, res) => {
  res.render("views/pages/homepage");
});

app.get("/about", async (req, res) => {
  const { results: metadataResults } = await client.getByType("metadata");
  const { results } = await client.getByType("about");
  const [about] = results;
  const [meta] = metadataResults;

  console.log(meta);
  res.render("views/pages/about", {
    about,
    meta,
  });
});

app.get("/collections", (req, res) => {
  res.render("views/pages/collections");
});

app.get("/detail/:id", (req, res) => {
  res.render("views/pages/detail");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
