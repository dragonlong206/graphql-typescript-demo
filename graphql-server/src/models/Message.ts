import { builder } from "../builder";
import { prisma } from "../db";

builder.prismaObject("Message", {
  fields: (t) => ({
    id: t.exposeID("id"),
    body: t.exposeString("body"),
    createdAt: t.expose("createdAt", {
      type: "Date",
    }),
  }),
});
builder.queryField("messages", (t) =>
  t.prismaField({
    type: ["Message"],
    resolve: async (query, root, args, ctx, info) => {
      return prisma.message.findMany({ ...query });
    },
  })
);
