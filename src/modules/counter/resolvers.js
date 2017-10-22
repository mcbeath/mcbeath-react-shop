

export default () => ({
  Query: {
    counter(obj, args, context) {
      console.log(343);
      return context.Counter.counterQuery();
    }
  },
  Mutation: {
    async addCounter(obj, { amount }, context) {
      await context.Counter.addCounter(amount);
      const counter = await context.Counter.counterQuery();
      return counter;
    }
  }
});
