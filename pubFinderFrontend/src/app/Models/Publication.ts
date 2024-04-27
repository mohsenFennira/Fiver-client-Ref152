import { User } from "./User";

export class Publication {
  idPublication!:number;
  title!:String;
  shortDescription!:String;
  longDescription!:String;
  country!:String;
  region!:String;
  createdAt!:Date;
  updatedAt!:Date;
  enabled!:Boolean;
  category!:String;
  image!: File;
  user!:User;
}
