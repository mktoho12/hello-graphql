import { ApolloServer } from "apollo-server"
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault
} from "apollo-server-core"

import { context } from "./context"
import { schema } from "./schema"

const document = `
query Query {
  feed {
    id
    url
    description
    postedBy {
      id
      name
      email
    }
  }
}
`.trim()

export const server = new ApolloServer({
  schema,
  context,
  plugins: [
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageProductionDefault({
          graphRef: "hello-graphql01@current",
          document,
          footer: false,
        })
      : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
  ],

})

const port = process.env.PORT || 3000

server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
