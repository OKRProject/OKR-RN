import instance from './instance';

export enum ProjectTypeEnum {
  whole = 'WHOLE',
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

export type ProjectType = {
  id: number;
  name: string;
  object: string;
  progress: number;
  sdt: string;
  edt: string;
  teamMemberEmails: string[];
  teamMemberProfileImages: string[];
  newProject: boolean;
  projectType: ProjectTypeEnum;
};

export type GetProjectListResType = {
  content: ProjectType[];
};

export type CreateNewProjectReqType = NewProjectType;

const createNewProject = (body: CreateNewProjectReqType) =>
  instance.post('v1/project', body);

const getProjectList = () =>
  instance.get<GetProjectListResType>(
    `v1/project?sortType=RECENTLY_CREATE&includeFinishedProjectYN=Y&page=0&size=10`,
  );
export default {
  createNewProject,
  getProjectList,
};
