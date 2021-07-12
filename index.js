import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import {graphqlHTTP} from "express-graphql";
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLSchema,
    GraphQLID
} from "graphql";
import Articles from "./models/Article.js";
import Comments from "./models/Comment.js";


dotenv.config();

//init express
const app = express();
const port = process.env.PORT;
//import route and db connection
import Router from "./routes/index.js";
import dbConn from "./db/db.js";

//use middleware
app.use(cors());
app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));
app.use(express.json());
app.use(Router);

const ArticleType = new GraphQLObjectType({
   name: "Article",
   description: "this data article",
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLID)},
        name: { type: GraphQLNonNull(GraphQLString)},
        body: { type: GraphQLNonNull(GraphQLString)},
        comment:{
         type: new  GraphQLList(CommentType),
            resolve(parent, args){
             return Comments.find({article_id:parent.id})
            }
        }
    }),
});

const CommentType = new GraphQLObjectType({
    name: "Comment",
    description: "this data comment",
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLID)},
        name: { type: GraphQLNonNull(GraphQLString)},
        article:{
            type:ArticleType,
            resolve(parent,args){
                return Articles.findById(parent.article_id);
            }
        }
    }),
});

const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => ({
        articles: {
            type: new GraphQLList(ArticleType),
            description: "all article",
            resolve(parent, args){
                return Articles.find({})
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            description: "all comment",
            resolve(parent, args){
                return Comments.find({})
            }
        },
        article: {
            type: ArticleType,
            description: "find by article",
            args:{
                id: {type:GraphQLID}
            },
            resolve(parent, args){
                return Articles.findById(args.id)
            }
        },
        comment: {
            type: CommentType,
            description: "find by comment",
            args:{
                id: {type:GraphQLID}
            },
            resolve(parent, args){
                return Comments.findById(args.id)
            }
        },
    }),
});

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addArticle: {
            type: ArticleType,
            description: 'Add a article',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                body: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                const article = new Articles({
                    name: args.name,
                    body:args.body
                });
                  return article.save();
            }
        },
        removeArticle: {
            type: ArticleType,
            description: 'Remove a Article',
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: (parent, args) => {
                return Articles.findByIdAndDelete(args.id)
            }
        },
        addComment: {
            type: CommentType,
            description: 'Add an Comment',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                article_id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve: (parent, args) => {
                const comment = new Comments({
                    name: args.name,
                    article_id:args.article_id
                });
                return comment.save();
            }
        },
        removeComment: {
            type: CommentType,
            description: 'Remove an Comment',
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: (parent, args) => {
                return Comments.findByIdAndDelete(args.id)
            }
        },
        updateComment: {
            type: CommentType,
            description: 'Update an Comment',
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name:{type:new GraphQLNonNull(GraphQLString)},
                article_id:{type:new GraphQLNonNull(GraphQLID)},
            },
            resolve: (parent, args) => {
                const comment =  Comments.findByIdAndUpdate(
                    args.id,{
                    name: args.name,
                    article_id: args.article_id
                });
                return comment;
            }
        },
        updateArticle: {
            type: ArticleType,
            description: 'Update a Article',
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name:{type:new GraphQLNonNull(GraphQLString)},
                body:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve: (parent, args) => {
                const article =  Articles.findByIdAndUpdate(args.id,{
                    name: args.name,
                    body: args.body});

                return article;
            }
        },
    })

})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
});

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema,
}));

app.listen(port, () => console.log('Server Running at http://localhost:'+port));