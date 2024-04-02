import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import projects from "../projects.json";
import Image from "next/image";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Projects</h2>
        <ul className={utilStyles.list}>
          {projects.map((project) => (
            <li className={utilStyles.listItem} key={project.id}>
              <a
                href={project.url}
                target="_blank"
                className={utilStyles.fullLink}
              ></a>
              <div className={utilStyles.imageWrapper}>
                <Image
                  priority
                  src={project.thumbnail}
                  fill={true}
                  objectFit={"contain"}
                  alt=""
                />
              </div>
              <h2
                className={utilStyles.projectHeading}
                target="_blank"
                href={project.url}
              >
                {project.title}
              </h2>
              <small className={utilStyles.lightText}>
                {project.tags.join(", ")}
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
