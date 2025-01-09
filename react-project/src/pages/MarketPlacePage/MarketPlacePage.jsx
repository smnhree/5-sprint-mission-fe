import { NavSection } from "../../components/NavSection/NavSection";
import { BestProductsList } from "./section/BestProductsList/BestProductsList";
import { ProductsList } from "./section/ProductsList/ProductsList";
import { FooterSection } from "../../components/FooterSection/FooterSection";
import "./MarketplacePage.css";

export function MarketplacePage() {
  return (
    <div className="market-place-page">
      <NavSection />
      <main className="main">
        <section>
          <BestProductsList />
        </section>
        <section>
          <ProductsList />
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
