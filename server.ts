import { createServer } from "@graphql-yoga/node";

const typeDefs = /* GraphQL */ `
  """
  Fetch data from the API using a given query.

  Learn more about GraphQL at [**GraphQL.wtf**](https://graphql.wtf)
  """
  type Query {
    """
    Get all orders
    """
    orders(filter: OrderFilterInput): [Order!]!
  }

  """
  An order represents a purchase made.
  """
  type Order {
    """
    The unique ID of the order
    """
    id: ID!
    """
    The total amount of the order in cents
    """
    total: Int!
    """
    The order status, managed automatically
    """
    status: OrderStatus!
  }

  """
  Each order is represented by a specific status.
  """
  enum OrderStatus {
    """
    No money has been received.
    """
    UNPAID

    """
    Money has been received, and allocated to the order.
    """
    PAID

    """
    Money has been received, and returned to the customer.
    """
    CANCELLED
  }

  """
  Apply filters to orders using the following fields:
  """
  input OrderFilterInput {
    """
    Filter by the order status
    """
    status: OrderStatus
  }
`;

const resolvers = {
  Query: {
    orders: () => [
      {
        id: "abc",
        total: 10000,
        status: "PAID",
      },
    ],
  },
};

const server = createServer({ schema: { typeDefs, resolvers } });

server.start().then(() => console.log("Server is running on localhost:4000"));
