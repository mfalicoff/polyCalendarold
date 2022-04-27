import { HttpException } from '@exceptions/HttpException';
import { Class } from '@interfaces/class.interface';
import classModel from '@models/class.model';
import { isEmpty } from '@utils/util';
import { CreateClassDto } from '@dtos/class.dto';
import crawler from '@services/scraper.service';
import { logger } from '@utils/logger';

class ClassService {
  public classes = classModel;

  public async findAllClasses(): Promise<Class[]> {
    const allClasses: Class[] = await this.classes.find();
    return allClasses;
  }

  public async findClassById(classId: String): Promise<Class> {
    if (isEmpty(classId)) throw new HttpException(400, "You're not classId");

    const findClass: Class = await this.classes.findOne({ _id: classId });
    if (!findClass) throw new HttpException(409, "You're not class");

    return findClass;
  }

  public async findSingleClassByName(className: string): Promise<Class> {
    if (isEmpty(className)) throw new HttpException(400, "You're not className");

    const findClass: Class = await this.classes.findOne({ name: { $regex: `${className.toUpperCase()}` } });
    if (!findClass) throw new HttpException(409, "You're not class");

    return findClass;
  }

  public async findManyClassByName(classesName: string[]): Promise<Class[]> {
    const allClasses: Class[] = [];

    await Promise.all(
      classesName.map(async (singleClassName: string) => {
        allClasses.push(await this.findSingleClassByName(singleClassName));
        logger.info(allClasses);
      }),
    );
    return allClasses;
  }

  public async findManyClass(classesName: string): Promise<Class[]> {
    if (isEmpty(classesName)) throw new HttpException(400, "You're not className");

    const findClasses: Class[] = await this.classes.find({ name: { $regex: `${classesName.toUpperCase()}` } });
    if (!findClasses) throw new HttpException(409, "You're not class");

    return findClasses;
  }

  public async createClass(classData: CreateClassDto): Promise<Class> {
    if (isEmpty(classData)) throw new HttpException(400, "You're not userData");

    const findClass: Class = await this.classes.findOne({ name: classData.name });
    if (findClass) throw new HttpException(409, `The class ${classData.name} already exists`);

    const createClassData: Class = await this.classes.create({ ...classData, schedule: classData.schedule });

    return createClassData;
  }

  public async updateClass(classId: string, classData: CreateClassDto): Promise<Class> {
    if (isEmpty(classData)) throw new HttpException(400, "You're not classData");

    if (classData.name) {
      const findClass: Class = await this.classes.findOne({ name: classData.name });
      if (findClass && findClass._id != classId) throw new HttpException(409, `The class ${classData.name} already exists`);
    }

    const updateClassById: Class = await this.classes.findByIdAndUpdate(classId, { classData });
    if (!updateClassById) throw new HttpException(409, "You're not class");

    return updateClassById;
  }

  public async deleteClass(classId: string): Promise<Class> {
    const deleteClassById: Class = await this.classes.findByIdAndDelete(classId);
    if (!deleteClassById) throw new HttpException(409, "You're not class");

    return deleteClassById;
  }

  public async scrapeClasses(studyLevel: string, saveToDisk: boolean): Promise<Class[]> {
    return await crawler(studyLevel, saveToDisk);
  }
}

export default ClassService;
