const errors = require("@feathersjs/errors");
const fs = require("fs");
const path = require("path");
module.exports = (option = {}) => {
  return async (context) => {
    if(context.method==='find'){
      if(!context.hasOwnProperty('data')){
        return context;
      }
    }
    if (
      context.method === "get" ||
      !Object.prototype.hasOwnProperty.call(context.data, "views")
    ) {
      if(context.method === 'create' && String(context.params.headers.referer).includes('backup')){
        console.log(context.data.entries());
        console.log(context.data.get('email'));
        const author = {
          _id: context.data.get('user_id'),
          email: context.data.get('email'),
          username: context.data.get('username'),
          image: context.data.get('image'),
        };
        if(context.data.get('files')){
          console.log(context.data.get('files'));
        }
        context.data._id= context.data.get('_id')
        context.data.views= context.data.get('views')
        context.data.title= context.data.get('title')
        context.data.body=context.data.get('body')
        context.data.category=context.data.get('category')
        context.data.createdAt = context.data.get('createdAt')
        // context.data.file = 


        context.data.author = author;
        return context;
      }
      if (context.method === "create" || context.method === "update") {
        const author = {
          _id: context.data.user_id,
          email: context.data.email,
          username: context.data.username,
          image: context.data.image,
        };
        context.data.author = author;
        if (context.data.file.length === 0) {
          delete context.data.file;
        }
        if (context.method === "update") {
          if (context.data.fileArray !== "[]") {
            const fileArray = JSON.parse(context.data.fileArray);

            if (context.data.deleteFileId !== "[]") {
              const deleteFileId = JSON.parse(context.data.deleteFileId);

              for (let i = 0; i < deleteFileId.length; i++) {
                const deleteItem = deleteFileId[i];
                for (let j = 0; j < fileArray.length; j++) {
                  const fileItem = fileArray[j];
                  if (JSON.stringify(fileItem).includes(String(deleteItem))) {
                    fileArray[j].isDeleted = true;
                    let filePath = path.join(
                      __dirname,
                      "/../..",
                      "/upload",
                      fileArray[j].serverFileName
                    );
                    fs.unlink(filePath, function (err) {
                      if (err) throw new errors.NotFound("File not found.");
                      console.log("file deleted");
                    });
                  }
                }
              }
            }

            if (context.data.file !== undefined) {
              let js = fileArray.concat(context.data.file);
              context.data.file = js;
            } else {
              let js = fileArray;
              context.data.file = js;
            }

          }
        }

        delete context.data._id;
        delete context.data.email;
        delete context.data.username;
        delete context.data.image;
        delete context.data.attachment;
      }
      if (context.method === "remove") {
        let user = await context.app.service("user").get(context.arguments[1].user._id, {
          headers: context.headers,
        });
        let boardInfo = await context.app.service("board").get(context.id, {
          headers: {
            Authorization: context.params.headers.authorization,
            "Content-Type": "application/json",
          },
        });
        let commentInfo = await context.app.service("comment").find({
          user,
          query: {
            $sort: {
              createdAt: -1,
            },
            board: {
              $in: context.id,
            },
          },
        });
        if (boardInfo.hasOwnProperty("file") && boardInfo.file.length > 0) {
          for (let index = 0; index < boardInfo.file.length; index++) {
            const element = boardInfo.file[index];
            if (element.isDeleted === false) {
              let filePath = path.join(
                __dirname,
                "/../..",
                "/upload",
                boardInfo.file[index].serverFileName
              );
              try {
                fs.unlink(filePath, function (err) {
                  if (err) {
                  console.log("File not found");
                  }
                  console.log("file deleted");
                });
              } catch (error) {
                throw new errors.NotFound("File not found.");
              }
              // fs.unlink(filePath, function (err) {
              //   if (err) {
              //   }
              //   console.log("file deleted");
              // });
            }
          }
        }
        if(commentInfo.data.length > 0){
          let removeComment = commentInfo.data;
          removeComment.map(async (commentItem)=>{
            await context.app.service("comment").remove(commentItem._id,{
              user,
            });
          })
        }
      }
    }

    return context;
  };
};

// if (context.method === "remove") {
//   if (context.params.payload.userId !== context.data.author._id) {
//     throw new errors.NotFound("Unauthorized user");
//   }
// }
// let user = await context.app.service('user').find({
//     header: {
//         Authorization:  context.params.headers.authorization
//     },
//     query: {
//         email: context.params.user.email
//     }
// });
// console.log(user.data[0]);

// let deleteTarget = await context.app.service('board').get(user.data[0]._id,{
//     header: {
//         Authorization:  context.params.headers.authorization
//     },
//     query: {
//         file : {
//             _id : "5f02b934c81bb757b2a36edb"
//         }
//     },
//     // user: user.data[0]

// });
