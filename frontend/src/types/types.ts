export interface PinType {
  _id: string;
  username: string;
  title: string;
  desc: string;
  rating: number;
  latitude: number;
  longitude: number;
  createdAt: Date;
  updateddAt: Date;
}

export interface UserType {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updateddAt: Date;
}
