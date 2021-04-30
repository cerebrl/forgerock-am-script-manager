export interface SharedState {
  get: (prop: string) => {
    asString: () => string;
  };
}
