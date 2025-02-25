import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header />
      <div className="flex-grow max-w-[1200px] p-[16px] w-full">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
