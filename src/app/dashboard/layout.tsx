import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidenav from "../../components/ui/admin/Sidenav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <> 
        <Sidenav>
            {children}
        </Sidenav>
    </>
  );
}
