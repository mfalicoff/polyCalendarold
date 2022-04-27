import { IsArray, IsString } from 'class-validator';
import { LabSection, TheorySection } from '@interfaces/class.interface';

export class CreateClassDto {
  @IsString()
  public name: string;

  @IsArray()
  public schedule: Array<TheorySection[] | LabSection[]>;
}
