import Head from "next/head";

export default function GenerateMetaData({
  title = "",
  desc = "",
}: {
  title: string;
  desc?: string;
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
}
