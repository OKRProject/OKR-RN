import instance from './instance';

export enum ProjectTypeEnum {
  team = 'TEAM',
  single = 'SINGLE',
}
export type NewProjectType = {
  name: string;
  sdt: string;
  edt: string;
  type: ProjectTypeEnum;
  object: string;
  keyResults: string[];
};

export type CreateNewProjectReqType = NewProjectType;

const createNewProject = (body: CreateNewProjectReqType) =>
  instance.post('project', body);

export default {
  createNewProject,
};
