import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Box } from "@mui/material";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <> 
      <Box component={"main"} 
        sx={{
          marginTop: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
        marginBottom={5}
      >
        <Header/>
        <Box component={"div"} sx={{
          alignItems: "center",
          justifyContent: "center",
          minHeight: 600
        }}
        >
          {children}
        </Box>
        <Footer/>
      </Box>
    </>
  );
}
