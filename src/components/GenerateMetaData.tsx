import Head from "next/head";

export default function GenerateMetaData({
  title = "",
  desc = "",
  thumbnail = "",
}: {
  title: string;
  desc?: string;
  thumbnail?: string;
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={thumbnail} />
      <meta property="og:description" content={desc} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
}
