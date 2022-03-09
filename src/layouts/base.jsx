import { Navbar } from "../components";
import AppFooter from "../components/footer";

export default function BaseLayout({ hasSearch = true, children }) {
  return (
    <>
      <Navbar hasSearch={hasSearch} />
      <div className="mt-3 container">{children}</div>
      <AppFooter />
    </>
  );
}
