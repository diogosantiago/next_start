import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { GetStaticPropsContext } from "next";
import Link from "next/link";
import useSWR from "swr";

const paramId = parseInt(String(5 * Math.random()));

export const fetcher = async (url: string) => {
  const data = await fetch(url).then(async (res) => {
    return await res.json();
  });

  return data.data;
};

interface SsgProps {
  elements: [any];
}

const SwrPage: NextPage<SsgProps> = ({ elements }) => {
  const { data, mutate } = useSWR<any>("/api/endpoint/" + paramId, fetcher);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          SWR{" "}
          <Link href="/">
            <a>Voltar</a>
          </Link>
        </h1>

        {data &&
          data.length &&
          data.map((element: any) => (
            <p key={element.id} className={styles.description}>
              <span>
                {element.title} - {element.date}
              </span>
            </p>
          ))}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export async function getServerSideProps(context: GetStaticPropsContext) {
  const elements = [
    {
      id: 1,
      title: "getServerSideProps",
      date: new Date().toISOString(),
    },
  ];
  return {
    props: { elements }, // will be passed to the page component as props
  };
}

export default SwrPage;
