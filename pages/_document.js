import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@300&display=swap" rel="stylesheet" />
        </Head>
        <body className="box-border p-0 m-0 bg-[#f1f1f1]">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument