import { Sequelize } from "sequelize";
import mockPostsDB from "../../data/mockPostsDB";
import PostObject from "../models/Post";

export default function Resolvers (this: {
  db: {
    models: any;
    sequelize: Sequelize
  }
}
) {
  const { db } = this;
  const {
    Post,
    // User,
    // Chat,
    // Message
  } = db.models;

  // console.log("db.models:");
  // console.log(db.models);

  const posts: Array<PostObject> = mockPostsDB.posts;

  return {
    Post: {
      user (post: PostObject, args: any, context:any) {
        // return { "username": "(Mock) John" };
        console.log("Returned post:", post);
        return (post.constructor.prototype.name === "PostObject")?
            post.getUser() :
            (post.hasOwnProperty("user")) ?
            post["user"] :
                { "username": "Anon" };
      },
    },
    RootQuery: {
      posts (root: any, args: any, context: any) {
        console.log("Resolve posts...")
        return posts;
        // return PostObject.findAll({
        //   order: [
        //     [ 'createdAt', 'DESC' ]
        //   ]
        // });
      }
    },
    RootMutation: {
      addPost(root: any, input: { post: any, user: any }, context: any) {
        const { post, user } = input;
        const postObject = { // new PostObject(
          id: posts.length,
          text: post.text, // ...post
          user: user
        }; //);
        console.log("New post: ", postObject);
        posts.push(<PostObject>postObject);
        return postObject;
      }
    }
    // Message: {
    //   user (message, args, context) {
    //     return message.getUser();
    //   },
    //   chat (message, args, context) {
    //     return message.getChat();
    //   },
    // },
    // Chat: {
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
    //     return PostObject.findAll({
    //       order: [
    //         [ 'createdAt', 'DESC' ]
    //       ]
    //     });
    //   },
    //   chats (root, args, context) {
    //     return User.findAll().then((users) => {
    //       if (!users.length) {
    //         return [];
    //       }
    //
    //       const usersRow = users[0];
    //
    //       return Chat.findAll({
    //         include: [ {
    //           model: User,
    //           required: true,
    //           through: {
    //             where: {
    //               userId: usersRow.id
    //             }
    //           },
    //         },
    //           {
    //             model: Message,
    //           }
    //         ],
    //       });
    //     });
    //   },
    //   chat (root, {
    //     chatId
    //   }, context) {
    //     return Chat.findByPk(chatId, {
    //       include: [ {
    //         model: User,
    //         required: true,
    //       },
    //         {
    //           model: Message,
    //         }
    //       ],
    //     });
    //   },
    // },
    // RootMutation: {
    //   addChat (root, {
    //     chat
    //   }, context) {
    //     return Chat.create().then((newChat) => {
    //       return Promise.all([
    //         newChat.setUsers(chat.users),
    //       ]).then(() => {
    //         console.log({
    //           level: 'info',
    //           message: 'Chat was created',
    //         });
    //         return newChat;
    //       });
    //     });
    //   },
    //   addMessage (root, {
    //     message
    //   }, context) {
    //     return User.findAll().then((users) => {
    //       const usersRow = users[0];
    //
    //       return Message.create({
    //         ...message,
    //       }).then((newMessage) => {
    //         return Promise.all([
    //           newMessage.setUser(usersRow.id),
    //           newMessage.setChat(message.chatId),
    //         ]).then(() => {
    //           console.log({
    //             level: 'info',
    //             message: 'Message was created',
    //           });
    //           return newMessage;
    //         });
    //       });
    //     });
    //   },
    //   addPost (root, {
    //     post
    //   }, context) {
    //     return User.findAll().then((users) => {
    //       const usersRow = users[0];
    //
    //       return PostObject.create({
    //         ...post,
    //       }).then((newPost) => {
    //         return Promise.all([
    //           newPost.setUser(usersRow.id),
    //         ]).then(() => {
    //           console.log({
    //             level: 'info',
    //             message: 'PostObject was created',
    //           });
    //           return newPost;
    //         });
    //       });
    //     });
    //   },
    // }
  };
}
