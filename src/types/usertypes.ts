import { Exclude } from 'class-transformer';

export interface userTypes {
  username: string;
  password: string;
}

export class slideUsers {
  username: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<slideUsers>) {
    Object.assign(this, partial);
  }
}
