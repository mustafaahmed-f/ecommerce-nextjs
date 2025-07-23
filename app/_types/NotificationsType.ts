export interface notification {
  _id: string;
  event: string;
  message: string;
  userId: string;
  audience: string;
  module: string;
  read: boolean;
  url: string;
  createdAt: Date;
}
