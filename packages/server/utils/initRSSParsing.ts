import axios from "axios";
import { parseString } from "xml2js";
import cron from "node-cron";
import log from "./logger";
import { RSSActicle } from "index";
import prisma from "./../libs/prismadb";
import { Post } from "@prisma/client";

const RSS_URL = "https://techcrunch.com/feed";

const fetchAndParseRSS: any = async () => {
  try {
    const response = await axios.get(RSS_URL);
    let articles: RSSActicle[] = [];
    parseString(response.data, (err, result) => {
      if (err) {
        log.error(err);
        return [];
      }

      articles = result.rss.channel[0].item;
    });
    return articles;
  } catch (error) {
    log.error("Error accessing or parsing RSS:", error);
  }
};

const createPosts = async (posts: any) => {
  const promises: any = [];
  posts.forEach((post: Post) => {
    promises.push(
      prisma.post.create({
        data: post,
      }),
    );
    log.info(`Adding post: ${post.link}`);
  });

  return await Promise.all(promises);
};

const parseArticles = (articles: RSSActicle[]) => {
  const items = [...articles];
  return items.map(article => ({
    title: article.title[0],
    description: article.description[0],
    link: article.link[0],
    categories: article.category,
  }));
};

const parseAndCreatePosts = async (articles: RSSActicle[]) => {
  const posts = parseArticles(articles);
  createPosts(posts);
};

const isInDatabase = async (article: RSSActicle) => {
  const post = await prisma.post.findUnique({
    where: {
      link: article.link[0],
    },
  });

  return post;
};

// Run the task once an hour
export const initRSSParsing = async () => {
  cron.schedule("0 * * * *", async () => {
    log.info("Parsing RSS...");
    const allArticles: RSSActicle[] = await fetchAndParseRSS();

    const firstArticle = await prisma.post.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!firstArticle) {
      parseAndCreatePosts(allArticles);
      return;
    }

    let indexes: number[] = [];
    let isParsing = true;
    let i = 0;

    for await (let article of allArticles) {
      if (isParsing) {
        const existingPost = await isInDatabase(article);
        if (existingPost) {
          isParsing = false;
        } else {
          indexes.push(i);
        }
      }
      i++;
    }

    const filteredArticles = allArticles.filter((article, index) =>
      indexes.includes(index),
    );

    parseAndCreatePosts(filteredArticles);
  });
};
