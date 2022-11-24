// node-fetch is used to make network requests to the Prismic Rest API.
// In Node.js Prismic projects, you must provide a fetch method to the
// Prismic client.
import * as dotenv from "dotenv";
dotenv.config();

import fetch from "node-fetch";
import * as prismic from "@prismicio/client";

// The `routes` property is your Route Resolver. It defines how you will
// structure URLs in your project. Update the types to match the Custom
// Types in your project, and edit the paths to match the routing in your
// project.
const routes = [
  {
    type: "about",
    path: "/about",
  },
];

const client = prismic.createClient(process.env.PRISMIC_REPO_NAME, {
  fetch,
  accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  routes,
});

export default client;
