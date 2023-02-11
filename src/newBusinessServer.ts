import { Neo4jGraphQL } from '@neo4j/graphql';
import { ApolloServer } from "apollo-server";
import { db } from "./data/mockBusinessDB";
import { Context } from "@apollo/client";

const neo4j = require('neo4j-driver');

const { gql } = require('apollo-server');
const env = require('dotenv');
env.config();

function getContextWithDB (context: any) {
    return (!!context && context.hasOwnProperty("db")) ?
        context :
        (function () {
            console.log("db not found in context: ", context);
            console.log("assigning mock db to context: ", db);
            return {
                ...context,
                db
            };
        })();
}

const resolvers = {
    Query: {
        // allBusinesses: (obj: any, args: any, context: any, info: any) => {
        //     console.log("allBusinesses resolver obj: ", obj);
        //     console.log("allBusinesses resolver args: ", args);
        //     return (getContextWithDB(context)).db.businesses;
        // },
        // businessesAggregate: {},
        // businessBySearchTerm: (obj: any, args: any, context: any, info: any) => {
        //     const compare = (a: any, b: any) => {
        //         const [orderField, order] = args.orderBy.split("_");
        //         const left = a[orderField],
        //             right = b[orderField];
        //
        //         if (left < right) {
        //             return order === "asc" ? -1 : 1;
        //         } else if (left > right) {
        //             return order === "desc" ? -1 : 1;
        //         } else {
        //             return 0;
        //         }
        //     };
        //     /* TODO: What's the best way to filter/sort the following vector? */
        //     return (getContextWithDB(context)).db.businesses
        //         .filter((v: any) => {
        //             return v["name"].indexOf(args.search) !== -1;
        //         })
        //         .slice(args.offset, args.first)
        //         .sort(compare);
        // }
    },
    Business: {
        // averageStars: (obj: any, args: any, context: any, info: any) => {
        //     console.log("averageStarts resolver: ", obj);
        //
        //     const reviews = obj.reviewIds.map((v: any) => {
        //         return (getContextWithDB(context)).db.reviews.find((review: any) => {
        //             return review.reviewId === v;
        //         });
        //     });
        //
        //     return (
        //         reviews.reduce((acc: any, review: any) => {
        //             return acc + review.stars;
        //         }, 0) / reviews.length
        //     );
        // },
        // reviews: (obj: any, args: any, context: any, info: any) => {
        //     return obj.reviewIds.map((v: any) => {
        //         return (getContextWithDB(context)).db.reviews.find((review: any) => {
        //             return review.reviewId === v;
        //         });
        //     });
        // },
        waitTime: (obj: any, args: any, context: any, info: any) => {
            const options = [0, 5, 10, 15, 30, 45];
            return options[Math.floor(Math.random() * options.length)];
        }
    },
    // Review: {
    //     // user: (obj: any, args: any, context: any, info: any) => {
    //     //     return (getContextWithDB(context)).db.users.find((user: any) => {
    //     //         return user.userId === obj.userId;
    //     //     });
    //     // },
    //     // business: (obj: any, args: any, context: any, info: any) => {
    //     //     return (getContextWithDB(context)).db.businesses.find((b: any) => {
    //     //         return b.businessId === obj.businessId;
    //     //     });
    //     // },
    // },
    // User: {
    //     // reviews: (obj: any, args: any, context: any, info: any) => {
    //     //     return obj.reviewIds.map((v: any) => {
    //     //         return (getContextWithDB(context)).db.reviews.find((review: any) => {
    //     //             return review.reviewId === v;
    //     //         });
    //     //     });
    //     // }
    // }
};

const typeDefs = gql`
  enum BusinessOrdering {
    name_asc
    name_desc
  }

  type Business {
    businessId: ID!
    name: String!
    city: String!
    state: String!
    address: String!
    location: Point!
    averageStars: Float!
      @cypher(
        statement: "MATCH (this)<-[:REVIEWS]-(r:Review) RETURN avg(r.stars)"
      )
    categories: [Category!]! @relationship(type: "IN_CATEGORY", direction: OUT)
    photos(first: Int = 3, offset: Int = 0): [Photo!]!
    reviews(first: Int = 3, offset: Int = 0): [Review!]! @relationship(type: "REVIEWS", direction: IN)
    recommended(first: Int = 1): [Business!]!
      @cypher(
        statement: """
        MATCH (this)<-[:REVIEWS]-(:Review)<-[:WROTE]-(:User)-[:WROTE]->(:Review)-[:REVIEWS]->(rec:Business)
        WITH rec, COUNT(*) AS score
        RETURN rec ORDER BY score DESC LIMIT $first
        """
      )
    waitTime: Int! @customResolver
  }
  
  type Photo {
    business: Business!
    user: User!
    photoId: ID!
    url: String
  }

  type Review {
    reviewId: ID!
    stars: Float!
    date: Date!
    text: String
    user: User! @relationship(type: "WROTE", direction: IN)
    business: Business! @relationship(type: "REVIEWS", direction: OUT)
  }

  type User {
    userID: ID!
    name: String!
    reviews: [Review!]! @relationship(type: "WROTE", direction: OUT)
  }

  type Category {
    name: String!
    businesses: [Business!]! @relationship(type: "IN_CATEGORY", direction: IN)
  }
  
  type Query {
    allBusinesses(first: Int = 10, offset: Int = 0): [Business!]!
      @cypher(
        statement: """
        MATCH (b:Business) RETURN (b)
        """
         )
    businessBySearchTerm(
      search: String
      first: Int = 10
      offset: Int = 0
      orderBy: BusinessOrdering = name_asc
    ): [Business!]!
    fuzzyBusinessByName (searchString: String): [Business!]!
      @cypher(
        statement: """
        CALL db.index.fulltext.queryNodes( 'businessNameIndex', $searchString+'~')
        YIELD node RETURN node
        """
      )
    userById(id: ID!): User
  }
  
`;

const driver = neo4j.driver(
    process.env.DB_URI,
    neo4j.auth.basic(
        process.env.DB_USER,
        process.env.DB_PASSWORD,
    ),
);

function context (context: { req: any /*Request*/, res: any /*Response*/ }): Context {

    // console.log("contextHandler received: ", context);

    return (<Context>( !!context ? {
        ...context,
        driver
    } : {
        driver
    }));
}

export async function newServer (): Promise<ApolloServer> {

    // @ts-ignore
    const schema = await (new Neo4jGraphQL({
        typeDefs,
        resolvers
    }).getSchema());

    return new ApolloServer(
        {
            schema,
            context
        });
}
