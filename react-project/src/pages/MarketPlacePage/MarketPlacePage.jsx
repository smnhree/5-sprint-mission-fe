import { Footer } from "../../common/footer/Footer";
import { Nav } from "../../common/nav/Nav";
import { BestProductsSection } from "./feature/BestProductsSection/BestProductsSection";
import { ProductsSection } from "./feature/ProductSection/ProductsSection";
import "./MarketPlacePage.css";

export function MarketPlacePage() {
  return (
    <div className="market-place-page">
      <Nav />
      <main className="sections-wrap">
        <BestProductsSection />
        <ProductsSection />
      </main>
      <Footer />
    </div>
  );
}
