/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumberString } from 'class-validator';
import { addressDto } from './address.dto';
export class customerDto {
  @IsEmail()
  email: string;

  @IsNumberString()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Type(()=>addressDto)
  address: addressDto;

}
