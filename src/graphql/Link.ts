import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";

export const Link = objectType({
  name: "Link",
  definition(t) {
    t.nonNull.int("id")
    t.nonNull.string("description")
    t.nonNull.string("url")
  }
})

export const LinkQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("feed", {
      type: "Link",
      resolve: (_, __, context) => context.prisma.link.findMany()
    })

    t.field("link", {
      type: "Link",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, { id }, context) => context.prisma.link.findUnique({ where: { id } })
    })
  }
})

export const LinkMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("post", {
      type: "Link",
      args: {
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },
      resolve: (_, { description, url }, context) =>
        context.prisma.link.create({
          data: { description, url }
        }),
    })

    t.field("updateLink", {
      type: "Link",
      args: {
        id: nonNull(intArg()),
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },
      resolve: (_, { id, description, url }, context) => 
        context.prisma.link.update({
          where: { id },
          data: { description, url },
        })
    })

    t.field("deleteLink", {
      type: "Link",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, { id }, context) =>
        context.prisma.link.delete({
          where: { id }
        })
    })
  },
})
