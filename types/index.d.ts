export interface Contracts {
  setProvider: (provider: any) => void;
  methods: {
    submitFeedback: (message: string) => {
      send: (options: { from: string }) => Promise<any>;
    };
    getAllFeedback: () => {
      call: () => Promise<string[]>;
    };
  };
}
