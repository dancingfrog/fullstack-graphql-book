import { gql } from "apollo-server";

export default // [
  gql`
    type user {
      id: Int
      avatar: String
      username: String
    }

    type post {
      id: Int
      text: String
      user: user
    }
  
    type RootQuery {
      posts: [post]
      users: [user]
    }
    
    input postInput {
      text: String!
    }
    
    input userInput {
      username: String!
      avatar: String!
    }
    
    type RootMutation {
      addPost (
        post: postInput!
        user: userInput
      ): post
    }
  
    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `; //,
  // gql`
  //   type user {
  //     id: Int
  //     avatar: String
  //     username: String
  //   }
  //
  //   type post {
  //     id: Int
  //     text: String
  //     user: user
  //   }
  //
  //   type message {
  //     id: Int
  //     text: String
  //     chat: chat
  //     user: user
  //   }
  //
  //   type chat {
  //     id: Int
  //     messages: [message]
  //     users: [user]
  //   }
  //
  //   type RootQuery {
  //     posts: [post]
  //     chats: [chat]
  //     chat(chatId: Int): chat
  //   }
  //
  //   input postInput {
  //     text: String!
  //   }
  //
  //   input chatInput {
  //     users: [Int]
  //   }
  //
  //   input messageInput {
  //     text: String!
  //     chatId: Int!
  //   }
  //
  //   type RootMutation {
  //     addpost (
  //       post: postInput!
  //     ): post
  //     addchat (
  //       chat: chatInput!
  //     ): chat
  //     addmessage (
  //       message: messageInput!
  //     ): message
  //   }
  //
  //   schema {
  //     query: RootQuery
  //     mutation: RootMutation
  //   }
  // `
//];
