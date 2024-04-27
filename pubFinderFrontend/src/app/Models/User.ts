import { Publication } from "./Publication";
import { GenderType } from "./enum/GenderType";
import { RoleType } from "./enum/RoleType";

export class User {
  idUser!:number;
  email!:String;
  firstName!:String;
  lastName!:String;
  phoneNumber!:String;
  password!:String;
  validated!:Boolean;
  creationDate!:Date;
  profilePicture!:String;
  tokenToValidate!:number;
  tokenToForgotPassword!:number;
  roleTypes!:RoleType;
  genderType!:GenderType;
  birthDate!:Date;
  nationality!:string;
  publications:Publication[]= [];

}
