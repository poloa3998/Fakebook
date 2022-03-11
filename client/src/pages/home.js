import Sidebar from "../components/HomeComponents/Sidebar";
import Feed from "../components/HomeComponents/Feed";
import Widgets from "../components/HomeComponents/Widgets";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth";
import { MessageContext } from "../context/Messaging";

const Home = ({ setMessagesActive }) => {
  const { getFriends, getPeopleMayKnow, loggedInUser } =
    useContext(AuthContext);
  const { getConversations } = useContext(MessageContext);

  useEffect(() => {
    getFriends();
    getPeopleMayKnow();
    getConversations();
  }, [getFriends, getPeopleMayKnow, getConversations]);

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      {loggedInUser === null ? null : (
        <>
          <main className="flex">
            {/* Sidebar */}
            <Sidebar />
            {/* Feed */}
            <Feed />
            {/* Widgets */}
            <Widgets setMessagesActive={setMessagesActive} />
          </main>
        </>
      )}
    </div>
  );
};

export default Home;
