const usersElement = document.querySelector("#users");
const countElement = document.querySelector("#count");

const client = new tmi.Client({
  connection: {
    reconnect: true,
    secure: true,
  },
  channels: ["al1enik"],
});
client.connect();

let listeningForCount = false;
let users = {};

client.on("message", (channel, tags, message, self) => {
  if (self) return true;
  const { username } = tags;
  if (username === "al1enik") {
    if (message === "!start-count") {
      listeningForCount = true;
    } else if (message === "!stop-count") {
      listeningForCount = false;
    } else if (message === "!clear-count") {
      countElement.textContent = "Waiting for count...";
      usersElement.textContent = "";
    }
  }

  if (listeningForCount && message === "Hi") {
    users[tags.username] = true;
    countElement.textContent = Object.keys(users).length;
    usersElement.textContent = Object.keys(users).join(message + ",");
  }
});
