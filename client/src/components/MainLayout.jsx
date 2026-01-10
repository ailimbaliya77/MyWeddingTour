import Navvbar from "../pages/Navvbar";

function MainLayout({ children, setLoginOpen }) {
  return (
    <>
      <Navvbar setLoginOpen={setLoginOpen} />
      {children}
    </>
  );
}

export default MainLayout;

