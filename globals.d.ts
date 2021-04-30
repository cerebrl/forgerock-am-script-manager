interface SharedState {
  get: (prop: string) => {
    asString: () => string;
  };
}
declare let outcome: string;
declare let sharedState: SharedState;
