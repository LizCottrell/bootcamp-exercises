import React from "react";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";
import FriendCard from "./components/FriendCard";

function App() {
  return (
    <Wrapper>
      <Title>Friends List</Title>
      { friends.map(friend => {
          <FriendCard 
            name={friend.name}
            occupation={friend.occupation}
            location={friend.location}
            image={friend.image}
          />
        })
      }
    </Wrapper>
  );
}

export default App;
