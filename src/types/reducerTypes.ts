type payloadTypes = {
  updated: string;
  sizes: object;
}
export type actionTypes = {
  type: string;
  payload: payloadTypes;
}