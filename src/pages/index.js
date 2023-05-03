import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import Link from "next/link";
import Date from "../components/date";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../../lib/utilities";
//////////////////////////////////////////////////////////////////////////////////////
// To use Server-side Rendering, you need to export getServerSideProps              /
// instead of getStaticProps from your page.                                       /
/////////////////////////////////////////////////////////////////////////////////////////
// export async function getServerSideProps(context) {                                //
//   return {                                                                        //
//     props: {                                                                     //
//       // props for your component                                               //
//     },                                                                         //
//   };                                                                          //
// }                                                                            //
/////////////////////////////////////////////////////////////////////////////////
// If you do not need to pre-render the data,
// you can also use the following strategy (called Client-side Rendering):
//
// The team behind Next.js has created a React hook for data fetching called SWR.
// We highly recommend it if you’re fetching data on the client side. It handles caching,
// revalidation, focus tracking, refetching on interval, and more
/////////////////////////////////////////////////////////////////////////////

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
        <p>Just Building a blog website :-D </p>
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
    </Layout>
  );
}
