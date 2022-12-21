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
  objective: string;
  keyResults: string[];
};

export type ProjectType = {
  projectToken: string;
  name: string;
  object: string;
  progress: number;
  sdt: string;
  edt: string;
  teamMembers: {
    email: string;
    name: string;
    profileImage: string;
    jobFieldDetail: string;
  }[];
  newProject: boolean;
  projectType: ProjectTypeEnum;
};

export type KeyResultType = {
  keyResultToken: string;
  keyResultName: string;
  keyResultIndex: number;
};
export type TeamMemberType = {
  userName: string;
  profileImage: string;
  jobField: string;
};
export type ProjectDetailType = {
  name: string;
  projectToken: string;
  objective: string;
  sdt: string;
  edt: string;
  keyResults: KeyResultType[];
  projectType: ProjectTypeEnum;
};

export type ProjectIniType = {
  initiativeIndex: number;
  initiativeToken: string;
  initiativeName: string;
  initiativeDetail: string;
  done: boolean;
  user: {userName: string; profileImage: string};
  endDate: string;
  startDate: string;
  email: string;
  myInitiative: boolean;
  dDay: string;
  projectToken: string;
  projectName: string;
  keyResultToken: string;
  keyResultIndex: number;
};

export type AddProjectIniReqType = {
  keyResultToken: string;
  name: string;
  edt: string;
  sdt: string;
  detail: string;
};

export type GetProjectListResType = {
  content: ProjectType[];
};

export type CreateNewProjectReqType = NewProjectType;

export type GetProjectDetailReqType = Pick<ProjectType, 'projectToken'>;
export type GetProjectDetailResType = ProjectDetailType;

export type GetProjectIniListReqType = {
  keyResultToken: string;
};

export type GetProjectIniListResType = {
  content: ProjectIniType[];
};

export type GetIniListByDateResType = ProjectIniType[];
export type GetIniResType = ProjectIniType;

export type AddMemberToTeamReqType = {projectToken: string; emails: string[]};
export type AddMemberToTeamResType = {
  failedEmailList: string[];
  addedEmailList: string[];
};

export type GetTeamInfoResType = {
  period: string;
  progress: number;
  teamMembers: TeamMemberType[];
  projectType: string;
  dday: string;
};
const createNewProject = (body: CreateNewProjectReqType) =>
  instance.post('v1/project', body);

const getProjectList = () =>
  instance.get<GetProjectListResType>(
    `v1/project?sortType=RECENTLY_CREATE&includeFinishedProjectYN=Y&page=0&size=10`,
  );

const getProjectDetail = ({projectToken}: GetProjectDetailReqType) =>
  instance.get<GetProjectDetailResType>(`v1/project/${projectToken}`);

const getIniList = ({keyResultToken}: GetProjectIniListReqType) =>
  instance.get<GetProjectIniListResType>(
    `v1/initiative/list/${keyResultToken}`,
  );

const getProjectIni = (iniToken: string) =>
  instance.get<GetIniResType>(`v1/initiative/${iniToken}`);

const addProjectIni = (body: AddProjectIniReqType) =>
  instance.post<string>(`v1/initiative`, body);

const completeProjectIni = (initiativeToken: string) =>
  instance.put(`v1/initiative/${initiativeToken}/done`);

const getIniListByDate = (date: string) =>
  instance.get<GetIniListByDateResType>(`v1/initiative/date/${date}`);

const getProjectTeamInfo = (projectToken: string) =>
  instance.get<GetTeamInfoResType>(`v1/project/${projectToken}/side`);

const inviteMember = (body: AddMemberToTeamReqType) =>
  instance.post<AddMemberToTeamResType>(`v1/team/invite`, body);

const inviteMemberEmailValidate = (email: string, projectToken: string) =>
  instance.get(`v1/team/invite/${projectToken}/${email}`);

const getIniDatesByMonth = (yyyymm: string) =>
  instance.get<string[]>(`v1/initiative/yearmonth/${yyyymm}`);

export default {
  createNewProject,
  getProjectList,
  getProjectDetail,
  getIniList,
  addProjectIni,
  completeProjectIni,
  getIniListByDate,
  inviteMember,
  inviteMemberEmailValidate,
  getProjectTeamInfo,
  getIniDatesByMonth,
  getProjectIni,
};
