import mdx from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import remarkRehype from "remark-rehype";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { remarkCodeHike } from "@code-hike/mdx";
import { readFile } from "fs/promises";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { h } from "hastscript";
// import { remarkInfoBlock } from "./src/lib/markdown/remark-info-block.mjs";
import { remarkYoutube } from "./src/lib/markdown/remark-youtube.mjs";
import {
  infoBlockHeader,
  infoBlockChildren,
} from "./src/lib/markdown/rehype-info-block-handler.mjs";
import path from "path";
import { VERSIONS } from "./version.mjs";

const theme = JSON.parse(
  await readFile(new URL("./src/styles/rose-pine-moon.json", import.meta.url))
);

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkDirective,
      // remarkInfoBlock,
      [remarkYoutube, { validateYoutubeLink: true }],
      remarkGfm,
      [remarkCodeHike, { theme, lineNumbers: false, showCopyButton: true }],
    ],
    rehypePlugins: [
      [remarkRehype, { handlers: { infoBlockHeader, infoBlockChildren } }],
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
          properties: { class: "heading-anchor" },
          content(node) {
            return h("span", { class: "heading-anchor-hash" }, ["#"]);
          },
        },
      ],
    ],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  i18n: {
    locales: ["en", "zh_CN"],
    defaultLocale: "en",
  },
  localePath: path.resolve("./public/locales"),
  images: {
    domains: ["t2564371.p.clickup-attachments.com"],
  },
  webpack: (config, { isServer, dev }) => {
    // if (isServer) {
    //   require("./lib/generate-sitemap");
    // }

    config.resolve.fallback = { fs: false };

    if (!dev) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "disabled",
          generateStatsFile: true,
        })
      );
    }

    return config;
  },
  async redirects() {
    return [
      {
        source: "/docs/welcome",
        destination: "/docs/cloud/welcome",
        permanent: false,
      },
      {
        source: "/tos",
        destination: "https://www.iubenda.com/terms-and-conditions/60558066",
        permanent: false,
      },
      {
        source: "/docs/core-concepts/connector",
        destination: "/docs/vdp/connectors/overview",
        permanent: false,
      },
      {
        source: "/docs/start-here/configuration",
        destination: "/docs/vdp/configuration",
        permanent: false,
      },
      {
        source: "/docs/start-here/faq",
        destination: "/docs/cloud/faq",
        permanent: false,
      },
      {
        source: "/docs/vdp/faq",
        destination: "/docs/cloud/faq",
        permanent: false,
      },
      {
        source: "/docs/start-here/getting-started",
        destination: "/docs/vdp/getting-started",
        permanent: false,
      },
      {
        source: "/docs/start-here/roadmap",
        destination: "/docs/vdp/roadmap",
        permanent: false,
      },
      {
        source: "/docs/deployment/overview",
        destination: "/docs/vdp/deployment/overview",
        permanent: false,
      },
      {
        source: "/docs/deployment/docker-compose",
        destination: "/docs/vdp/deployment/docker-compose",
        permanent: false,
      },
      {
        source: "/docs/deployment/kubernetes-using-helm",
        destination: "/docs/vdp/deployment/kubernetes-using-helm",
        permanent: false,
      },
      {
        source: "/docs/core-concepts/overview",
        destination: "/docs/vdp/core-concepts/overview",
        permanent: false,
      },
      {
        source: "/docs/core-concepts/ai-task",
        destination: "/docs/model/core-concepts/ai-task",
        permanent: false,
      },
      {
        source: "/docs/core-concepts/data-connector",
        destination: "/docs/vdp/core-concepts/connector",
        permanent: false,
      },
      {
        source: "/docs/core-concepts/model",
        destination: "/docs/model/core-concepts",
        permanent: false,
      },
      {
        source: "/docs/core-concepts/pipeline",
        destination: "/docs/vdp/core-concepts/pipeline",
        permanent: false,
      },
      {
        source: "/docs/core-concepts/pipeline",
        destination: "/docs/vdp/core-concepts/pipeline",
        permanent: false,
      },
      {
        source: "/docs/source-connectors/overview",
        destination: "/docs/vdp/data-connectors/overview",
        permanent: false,
      },
      {
        source: "/docs/destination-connectors/overview",
        destination: "/docs/vdp/data-connectors/overview",
        permanent: false,
      },
      {
        source: "/docs/destination-connectors/airbyte",
        destination: "/docs/vdp/data-connectors/airbyte",
        permanent: false,
      },
      {
        source: "/docs/prepare-models/overview",
        destination: "/docs/model/prepare-models/overview",
        permanent: false,
      },
      {
        source: "/docs/prepare-models/model-card",
        destination: "/docs/model/prepare-models/model-card",
        permanent: false,
      },
      {
        source: "/docs/prepare-models/pre-processing",
        destination: "/docs/model/prepare-models/pre-processing",
        permanent: false,
      },
      {
        source: "/docs/prepare-models/post-processing",
        destination: "/docs/model/prepare-models/post-processing",
        permanent: false,
      },
      {
        source: "/docs/import-models/overview",
        destination: "/docs/model/import-models/overview",
        permanent: false,
      },
      {
        source: "/docs/import-models/artivc",
        destination: "/docs/model/import-models/artivc",
        permanent: false,
      },
      {
        source: "/docs/import-models/github",
        destination: "/docs/model/import-models/github",
        permanent: false,
      },
      {
        source: "/docs/import-models/huggingface",
        destination: "/docs/model/import-models/huggingface",
        permanent: false,
      },
      {
        source: "/docs/import-models/local",
        destination: "/docs/model/import-models/local",
        permanent: false,
      },
      {
        source: "/docs/development/system-architecture",
        destination: "/docs/vdp/development/system-architecture",
        permanent: false,
      },
      {
        source: "/docs/development/setup-local-development",
        destination: "/docs/vdp/development/setup-local-development",
        permanent: false,
      },

      // New documentation refactor 20230907
      {
        source: "/docs/",
        destination: `/docs/core/${VERSIONS["core"]}/welcome`,
        permanent: false,
      },
      {
        source: "/docs/base/configuration",
        destination: `/docs/base/${VERSIONS["base"]}/configuration`,
        permanent: false,
      },
      {
        source: "/docs/base/getting-started",
        destination: `/docs/base/${VERSIONS["base"]}/getting-started`,
        permanent: false,
      },
      {
        source: "/docs/base/welcome",
        destination: `/docs/base/${VERSIONS["base"]}/welcome`,
        permanent: false,
      },
      {
        source: "/docs/cloud/getting-started",
        destination: `/docs/cloud/${VERSIONS["cloud"]}/getting-started`,
        permanent: false,
      },
      {
        source: "/docs/cloud/using-instill-cloud",
        destination: `/docs/cloud/${VERSIONS["cloud"]}/using-instill-cloud`,
        permanent: false,
      },
      {
        source: "/docs/cloud/welcome",
        destination: `/docs/cloud/${VERSIONS["cloud"]}/welcome`,
        permanent: false,
      },
      {
        source: "/docs/core/contributing-guideline",
        destination: `/docs/core/${VERSIONS["core"]}/contributing-guideline`,
        permanent: false,
      },
      {
        source: "/docs/core/faq",
        destination: `/docs/core/${VERSIONS["core"]}/faq`,
        permanent: false,
      },
      {
        source: "/docs/core/getting-started",
        destination: `/docs/core/${VERSIONS["core"]}/getting-started`,
        permanent: false,
      },
      {
        source: "/docs/core/system-architecture",
        destination: `/docs/core/${VERSIONS["core"]}/system-architecture`,
        permanent: false,
      },
      {
        source: "/docs/core/welcome",
        destination: `/docs/core/${VERSIONS["core"]}/welcome`,
        permanent: false,
      },
      {
        source: "/docs/vdp/configuration",
        destination: `/docs/vdp/${VERSIONS["vdp"]}/configuration`,
        permanent: false,
      },
      {
        source: "/docs/vdp/license",
        destination: `/docs/vdp/${VERSIONS["vdp"]}/license`,
        permanent: false,
      },
      {
        source: "/docs/vdp/deployment/docker-compose",
        destination: `/docs/vdp/${VERSIONS["vdp"]}/deployment/docker-compose`,
        permanent: false,
      },
      {
        source: "/docs/vdp/deployment/kubernetes-using-helm",
        destination: `/docs/vdp/${VERSIONS["vdp"]}/deployment/kubernetes-using-helm`,
        permanent: false,
      },
      {
        source: "/docs/vdp/deployment/overview",
        destination: `/docs/vdp/${VERSIONS["vdp"]}/deployment/overview`,
        permanent: false,
      },
      {
        source: "/docs/vdp/development/setup-local-development",
        destination: `/docs/vdp/${VERSIONS["vdp"]}/development/setup-local-development`,
        permanent: false,
      },
      {
        source: "/docs/vdp/operators/end",
        destination: `/docs/vdp/${VERSIONS["vdp"]}/operators/end`,
        permanent: false,
      },
      {
        source: "/docs/vdp/operators/overview",
        destination: `/docs/vdp/${VERSIONS["vdp"]}/operators/overview`,
        permanent: false,
      },
      {
        source: "/docs/vdp/operators/start",
        destination: `/docs/vdp/${VERSIONS["vdp"]}/operators/start`,
        permanent: false,
      },
    ];
  },
};

export default withMDX(nextConfig);
