import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || "main";

export default defineConfig({
  branch,
  clientId: process.env.CLIENT_ID,
  token: process.env.READ_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "./",
  },
  media: {
    tina: {
      publicFolder: "",
      mediaRoot: "assets/images"
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "_posts",
        format: "md",
        fields: [
          {
            type: "string",
            name: "layout",
            label: "Layout",
            required: true,
            list: true,
            options: [
              {
                value: "post",
                label: "Post",
              },
            ],
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "string",
            name: "link_preview",
            label: "Link Preview Text",
          },
          {
            type: "image",
            name: "featured_image",
            label: "Featured Image",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        defaultItem: () => {
          return {
            // Return a default title and the current date as the default date
            layout: "post",
            title: "New Post",
            date: new Date().toISOString(),
          }
        },
        ui: {
          filename: {
            readonly: true,
            slugify: values => {
              const date = new Date();
              const day = ('0' + date.getDate()).slice(-2);
              const month = ('0' + (date.getMonth()+1)).slice(-2);
              const year = date.getFullYear();
        
              let currentDate = `${year}-${month}-${day}`;
        
              return `${currentDate}-${values?.title?.toLowerCase().replace(/ /g, '-')}.md`
            }
          }
        },
      },
      {
        name: "page",
        label: "Pages",
        path: "_pages",
        format: "md",
        fields: [
          {
            type: "string",
            name: "layout",
            label: "Layout",
            required: true,
            list: true,
            options: [
              {
                value: "page",
                label: "Page",
              },
              {
                value: "page-notitle",
                label: "Page (No Title)",
              },
            ],
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "subtitle",
            label: "Subtitle",
          },
          {
            type: "string",
            name: "link_preview",
            label: "Link Preview Text",
          },
          {
            type: "image",
            name: "featured_image",
            label: "Featured Image",
          },
          {
            type: "string",
            name: "permalink",
            label: "Permalink",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        defaultItem: () => {
          return {
            // Return a default title and the current date as the default date
            layout: "page",
            title: "New Page",
            permalink: "/new-page"
          }
        },
        ui: {
          filename: {
            readonly: true,
            slugify: values => {        
              return `${values?.title?.toLowerCase().replace(/ /g, '-')}.md`
            }
          }
        },
      },
    ],
  },
});
