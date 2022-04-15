/* eslint-disable prettier/prettier */
import {IsNotEmpty } from 'class-validator';

export class addressDto {
  @IsNotEmpty()
  line1: string;

	line2?: string;

	@IsNotEmpty()
	zip: string;

	@IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;
}