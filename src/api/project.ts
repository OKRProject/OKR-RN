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

export type KeyResultType = {keyResultId: number; keyResultName: string};
export type ProjectDetailType = {
  projectName: string;
  projectId: 123;
  projectObjective: string;
  projectStartDt: string;
  projectEndDt: string;
  keyResult: KeyResultType[];
  projectType: ProjectTypeEnum;
};

export type ProjectIniType = {
  iniSeq: string;
  iniName: string;
  iniDetail: string;
  done: boolean;
  user: {userName: string; profileImageUrl: string};
  endDate: string;
  email: string;
  myInitiative: boolean;
  wroteFeedback: boolean;
  dday: string;
};

export type GetProjectListResType = {
  content: ProjectType[];
};

export type CreateNewProjectReqType = NewProjectType;

export type GetProjectDetailReqType = Pick<ProjectType, 'id'>;
export type GetProjectDetailResType = ProjectDetailType;

export type GetProjectIniListReqType = {
  KRId: number;
};

export type GetProjectIniListResType = {
  content: ProjectIniType[];
};

export type AddProjectIniReqType = {
  keyResultId: number;
  name: string;
  edt: string;
  sdt: string;
  detail: string;
};
const createNewProject = (body: CreateNewProjectReqType) =>
  instance.post('v1/project', body);

const getProjectList = () =>
  instance.get<GetProjectListResType>(
    `v1/project?sortType=RECENTLY_CREATE&includeFinishedProjectYN=Y&page=0&size=10`,
  );

const getProjectDetail = ({id}: GetProjectDetailReqType) =>
  instance.get<GetProjectDetailResType>(`v1/project/${id}`);

const getIniList = ({KRId}: GetProjectIniListReqType) =>
  instance.get<GetProjectIniListResType>(`v1/initiative/${KRId}`);

const addProjectIni = (body: AddProjectIniReqType) =>
  instance.post<ProjectIniType>(`v1/initiative`, body);

export default {
  createNewProject,
  getProjectList,
  getProjectDetail,
  getIniList,
  addProjectIni,
};
