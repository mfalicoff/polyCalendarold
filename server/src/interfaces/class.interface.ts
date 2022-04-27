export interface Class {
  _id?: string;
  name: string;
  schedule: Array<TheorySection[] | LabSection[]>;
}

export interface TheorySection {
  theoryClassGroup: string;
  theoryClassTime: string;
  theoryClassDate: string;
  theoryClassClassroom: string;
}

export interface LabSection {
  labClassGroup: string;
  labClassTime: string;
  labClassDate: string;
  labClassClassroom: string;
}
