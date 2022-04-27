import { NextFunction, Request, Response } from 'express';
import { Class } from '@interfaces/class.interface';
import ClassService from '@services/class.service';
import { CreateClassDto } from '@dtos/class.dto';

class ClassController {
  public classService = new ClassService();

  public getClasses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllClasses: Class[] = await this.classService.findAllClasses();

      res.status(200).json({ data: findAllClasses, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getClassById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const classId: string = req.params.id;
      const findOneClassData: Class = await this.classService.findClassById(classId);

      res.status(200).json({ data: findOneClassData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getClassByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const className: string = req.body.name;
      const findOneClassData: Class = await this.classService.findSingleClassByName(className);

      res.status(200).json({ data: findOneClassData, message: 'findOne by Name' });
    } catch (error) {
      next(error);
    }
  };

  public getManyClassByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const classesName: string[] = req.body;
      const allClassesData: Class[] = await this.classService.findManyClassByName(classesName);

      res.status(200).json({ data: allClassesData, message: 'findOne by Name' });
    } catch (error) {
      next(error);
    }
  };

  public getManyClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const classesName: string = req.body.name;
      const allClassesData: Class[] = await this.classService.findManyClass(classesName);

      res.status(200).json({ data: allClassesData, message: 'findMany by Name' });
    } catch (error) {
      next(error);
    }
  };

  public createClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const classData: CreateClassDto = req.body;
      const createClassData = await this.createClassPrivate(classData, next);

      res.status(201).json({ data: createClassData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  private createClassPrivate = async (classToCreate: CreateClassDto, next: NextFunction) => {
    try {
      const classData: CreateClassDto = classToCreate;
      const createClassData: Class = await this.classService.createClass(classData);

      return createClassData;
    } catch (error) {
      next(error);
    }
  };

  public updateClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const classId: string = req.params.id;
      const classData: CreateClassDto = req.body;
      const updateClassData: Class = await this.classService.updateClass(classId, classData);

      res.status(200).json({ data: updateClassData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const classId: string = req.params.id;
      const deleteClassData: Class = await this.classService.deleteClass(classId);

      res.status(200).json({ data: deleteClassData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public scrapeClasses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let classes: Class[] = await this.classService.scrapeClasses('BA', false);
      classes = classes.concat(await this.classService.scrapeClasses('ES', false));

      const createdClasses: Class[] = [];

      classes.map(async (singleClass: Class) => {
        const classDto: CreateClassDto = {} as CreateClassDto;
        classDto.name = singleClass.name;
        classDto.schedule = singleClass.schedule;
        const returnClass = await this.createClassPrivate(classDto, next);
        createdClasses.push(returnClass);
      });

      res.status(200).json({ data: createdClasses, message: 'scrapedClasses' });
    } catch (error) {
      next(error);
    }
  };
}

export default ClassController;
