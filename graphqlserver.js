const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const {

    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString

} = require("graphql");
const app = express();


const StudentType = new GraphQLObjectType({
    name: "Student",

    fields: {
        name: {
            type: GraphQLString
        },

        course: {
            type: GraphQLString
        }
    }
});


const RootQuery = new GraphQLObjectType({
    name: "RootQuery",

    fields: {
        student: {
            type: StudentType,

            resolve: () => {
                return {
                    name: "ABES Student",
                    course: "B.Tech CSE"
                };
            }
        }
    }
});

// Define GraphQL Schema
const schema = new GraphQLSchema({
    query: RootQuery
});

// GraphQL API
app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        graphiql: true
    })
);


app.listen(4000, () => {
    console.log("GraphQL Server running on port 4000");
});