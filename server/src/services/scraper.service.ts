import cheerio from 'cheerio';
import { logger } from '@utils/logger';
import fetch from 'node-fetch';
import { Class, LabSection, TheorySection } from '@interfaces/class.interface';
import * as fs from 'fs';
import path from 'path';

const crawler = async (studyLevel: string, saveToDisk?: boolean): Promise<Class[]> => {
  const pageToVisit = `https://www.polymtl.ca/programmes/cours/horaire?cycle=${studyLevel}`;
  logger.info(`Visiting page ${pageToVisit}`);

  const response = await fetch(pageToVisit);
  const body = await response.text();
  const $ = cheerio.load(body);
  const classesRepertoire: Class[] = [];

  $('.pane-content')
    .find('h2')
    .each((i: number, elem: any) => {
      const className: string = elem.children[0].children[0].data;
      classesRepertoire.push({
        name: className,
        schedule: [],
      });
    });
  logger.info('Class names done');

  $('.pane-content')
    .find('.horaire')
    .each((i: number, elem: any) => {
      // For Classes that don't have lab periods
      if (elem.children.length !== 5) {
        const classesOnlyTheory: TheorySection[] = [];
        const ClassHtmlTable = elem.children[1].children[1].children[3];

        // Traversing the table
        for (let j = 3; j < ClassHtmlTable.children.length; j = j + 2) {
          const currentClass: TheorySection = {} as TheorySection;
          currentClass.theoryClassGroup = ClassHtmlTable.children[j].children[1].children[0].data;
          currentClass.theoryClassDate = ClassHtmlTable.children[j].children[3].children[0].data;
          currentClass.theoryClassTime = ClassHtmlTable.children[j].children[5].children[0].data;

          // if it doesn't have a location
          if (elem.children[1].children[1].children[3].children[3].children.length < 8) {
            currentClass.theoryClassDate = '';
            currentClass.theoryClassTime = 'Consultez Site web du Cours';
            currentClass.theoryClassClassroom = '';
          } else {
            const classroom: string = ClassHtmlTable.children[j].children[7].children[0].data;
            currentClass.theoryClassClassroom =
              classroom == undefined ? ClassHtmlTable.children[j].children[7].children[0].children[0].data : classroom;
          }
          classesOnlyTheory.push(currentClass);
        }

        classesRepertoire[i].schedule.push(classesOnlyTheory);
      } else {
        const theorySections: TheorySection[] = [];
        const labSections: LabSection[] = [];

        // for theory classes
        const ClassHtmlTable = elem.children[1].children[1].children[3];

        for (let j = 3; j < ClassHtmlTable.children.length; j = j + 2) {
          const currentClass: TheorySection = {} as TheorySection;

          currentClass.theoryClassGroup = ClassHtmlTable.children[j].children[1].children[0].data;
          if (currentClass.theoryClassGroup.length === 1) {
            currentClass.theoryClassGroup = ClassHtmlTable.children[j - 2].children[1].children[0].data;
          }
          currentClass.theoryClassDate = ClassHtmlTable.children[j].children[3].children[0].data;
          currentClass.theoryClassTime = ClassHtmlTable.children[j].children[5].children[0].data;
          currentClass.theoryClassClassroom = ClassHtmlTable.children[j].children[7].children[0].data;

          theorySections.push(currentClass);
        }

        // for lab classes
        const LabHtmlTable = elem.children[3].children[1].children[3];

        for (let j = 3; j < LabHtmlTable.children.length; j = j + 2) {
          const currentClass: LabSection = {} as LabSection;

          currentClass.labClassGroup = LabHtmlTable.children[j].children[1].children[0].data;
          if (currentClass.labClassGroup.length === 1) {
            currentClass.labClassGroup = LabHtmlTable.children[j - 2].children[1].children[0].data;
          }
          currentClass.labClassDate = LabHtmlTable.children[j].children[3].children[0].data;
          currentClass.labClassTime = LabHtmlTable.children[j].children[5].children[0].data;
          currentClass.labClassClassroom = LabHtmlTable.children[j].children[7].children[0].data;

          labSections.push(currentClass);
        }
        classesRepertoire[i].schedule.push(theorySections, labSections);
      }
    });

  if (saveToDisk && saveToDisk == true) {
    fs.writeFileSync(path.join(__dirname, '..', 'logs', 'classes.json'), JSON.stringify(classesRepertoire));
  }
  return classesRepertoire;
};

export default crawler;
