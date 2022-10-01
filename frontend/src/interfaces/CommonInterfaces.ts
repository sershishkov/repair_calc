export interface I_ServerResponse<T> {
  _id?: string;
  items?: T[];
  item?: T | null;
  total?: number;
  totalPages?: number;
}
