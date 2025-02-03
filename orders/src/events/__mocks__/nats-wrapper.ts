const natsInstance = {
  client: {
    publish: jest
      .fn()
      .mockImplementation(
        (subject: string, data: string, callback: () => void) => {
          callback();
        }
      ),
    on: (message: string) => {},
  },
  handleExit: () => {},
};

export default natsInstance;
