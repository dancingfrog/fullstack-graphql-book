import { Sequelize } from "sequelize";
import Post from "../models/Post";
import User from "../models/User";
// import mockPostsDB from "../../data/mockPostsDB";

export default function Resolvers (this: {
  db: {
    models: any;
    sequelize: Sequelize
  }
}
) {
  const { db } = this;
  const {
    post,
    user,
    // chat,
    // message
  } = db.models;

  // console.log("db.models:");
  // console.log(db.models);

  // const posts: Array<Post> = mockPostsDB.posts;

  return {
    post: {
      user (post: Post, args: any, context:any): User {
        // return { "username": "(Mock) John" };
        console.log("Returned post:", post);
        return <User>(
            (post.constructor.prototype.name === "Post" || typeof post.getUser === 'function')?
            post.getUser() :
            (post.hasOwnProperty("user")) ?
            post["user"] :
                {
                  "id": 0,
                  "username": "Anon",
                  "avatar": "/images/party.gif"
                }
        );
      },
    },
    RootQuery: {
      posts (root: any, args: any, context: any) {
        console.log("Resolve posts...")
        // return posts;
        return post.findAll({
          order: [
            [ 'createdAt', 'ASC' ]
          ]
        });
      },
      users (root: any, args: any, context: any) {
        console.log("Resolve users...")
        return user.findAll({
          order: [
            [ 'createdAt', 'ASC' ]
          ]
        });
      }
    },
    RootMutation: {
      async addPost(root: any, input: { post: any, user?: any }, context: any) {
        const postInput = input["post"];
        const userInput = (!!input["user"] && input["user"].hasOwnProperty("username")) ?
            input["user"] :
            (await user.findAll()
                .then((users: any) => {
                  const usersRow = users[0];
                  console.log(usersRow);
                  return usersRow;
                })
            );
        const postObject = { // new Post(
          // id: posts.length + 1,
          // text: post.text,
          // user: user,
          ...postInput
        }; //);
        // console.log("New post: ", postObject);
        // posts.push(<Post>postObject);
        // return postObject;
        return post.create(postObject)
            .then((newPost: any) => {
              return Promise.all([
                 newPost.setUser(userInput.id)
              ]).then(() => {
                console.log("New post: ", newPost);
                return newPost;
              });
            });
      }
    }
    // message: {
    //   user (message, args, context) {
    //     return message.getUser();
    //   },
    //   chat (message, args, context) {
    //     return message.getChat();
    //   },
    // },
    // chat: {
    //   messages (chat, args, context) {
    //     return chat.getMessages({
    //       order: [
    //         [ 'id', 'ASC' ]
    //       ]
    //     });
    //   },
    //   users (chat, args, context) {
    //     return chat.getUsers();
    //   },
    // },
    // RootQuery: {
    //   posts (root: any, args: any, context: any) {
    //     return post.findAll({
    //       order: [
    //         [ 'createdAt', 'DESC' ]
    //       ]
    //     });
    //   },
    //   chats (root, args, context) {
    //     return user.findAll().then((users) => {
    //       if (!users.length) {
    //         return [];
    //       }
    //
    //       const usersRow = users[0];
    //
    //       return chat.findAll({
    //         include: [ {
    //           model: user,
    //           required: true,
    //           through: {
    //             where: {
    //               userId: usersRow.id
    //             }
    //           },
    //         },
    //           {
    //             model: message,
    //           }
    //         ],
    //       });
    //     });
    //   },
    //   chat (root, {
    //     chatId
    //   }, context) {
    //     return chat.findByPk(chatId, {
    //       include: [ {
    //         model: user,
    //         required: true,
    //       },
    //         {
    //           model: message,
    //         }
    //       ],
    //     });
    //   },
    // },
    // RootMutation: {
    //   addChat (root, {
    //     chat
    //   }, context) {
    //     return chat.create().then((newChat) => {
    //       return Promise.all([
    //         newChat.setUsers(chat.users),
    //       ]).then(() => {
    //         console.log({
    //           level: 'info',
    //           message: 'chat was created',
    //         });
    //         return newChat;
    //       });
    //     });
    //   },
    //   addMessage (root, {
    //     message
    //   }, context) {
    //     return user.findAll().then((users) => {
    //       const usersRow = users[0];
    //
    //       return message.create({
    //         ...message,
    //       }).then((newMessage) => {
    //         return Promise.all([
    //           newMessage.setUser(usersRow.id),
    //           newMessage.setChat(message.chatId),
    //         ]).then(() => {
    //           console.log({
    //             level: 'info',
    //             message: 'message was created',
    //           });
    //           return newMessage;
    //         });
    //       });
    //     });
    //   },
    //   addPost (root, {
    //     post
    //   }, context) {
    //     return user.findAll().then((users) => {
    //       const usersRow = users[0];
    //
    //       return post.create({
    //         ...post,
    //       }).then((newPost) => {
    //         return Promise.all([
    //           newPost.setUser(usersRow.id),
    //         ]).then(() => {
    //           console.log({
    //             level: 'info',
    //             message: 'post was created',
    //           });
    //           return newPost;
    //         });
    //       });
    //     });
    //   },
    // }
  };
}
