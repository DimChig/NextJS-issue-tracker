import NavBar from "./NavBar"; // Your client component
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const ServerNavBar = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  return <NavBar session={session} />;
};

export default ServerNavBar;
