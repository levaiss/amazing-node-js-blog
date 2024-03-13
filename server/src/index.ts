import Server from './server';

const server = new Server();
server.run().catch((e) => {
  console.log(e);
  process.exit(1);
});