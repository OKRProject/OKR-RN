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

export type KeyResultType = {keyResultId: string; keyResultName: string};
export type TeamMemberType = {
  userName: string;
  profileImageUrl: string;
  jobField: string;
};
export type ProjectDetailType = {
  projectName: string;
  projectId: number;
  projectObjective: string;
  projectStartDt: string;
  projectEndDt: string;
  keyResult: KeyResultType[];
  projectType: ProjectTypeEnum;
  teamMemberInfoList: TeamMemberType[];
};

export type ProjectIniType = {
  iniSeq: number;
  iniName: string;
  iniDetail: string;
  done: boolean;
  user: {userName: string; profileImageUrl: string};
  endDate: string;
  startDate: string;
  email: string;
  myInitiative: boolean;
  dday: string;
  projectId: number;
  projectNm: string;
  krId: string;
};

export type AddProjectIniReqType = {
  keyResultId: string;
  name: string;
  edt: string;
  sdt: string;
  detail: string;
};

export type GetProjectListResType = {
  content: ProjectType[];
};

export type CreateNewProjectReqType = NewProjectType;

export type GetProjectDetailReqType = Pick<ProjectType, 'id'>;
export type GetProjectDetailResType = ProjectDetailType;

export type GetProjectIniListReqType = {
  KRId: string;
};

export type GetProjectIniListResType = {
  content: ProjectIniType[];
};

export type GetIniListByDateResType = ProjectIniType[];

export type AddMemberToTeamReqType = {projectId: number; emails: string[]};
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

const getProjectDetail = ({id}: GetProjectDetailReqType) =>
  instance.get<GetProjectDetailResType>(`v1/project/${id}`);

const getIniList = ({KRId}: GetProjectIniListReqType) =>
  instance.get<GetProjectIniListResType>(`v1/initiative/${KRId}`);

const addProjectIni = (body: AddProjectIniReqType) =>
  instance.post<ProjectIniType>(`v1/initiative`, body);

const completeProjectIni = (iniId: number) =>
  instance.put(`v1/initiative/${iniId}/done`);

const getIniListByDate = (date: string) =>
  instance.get<GetIniListByDateResType>(`v1/initiative/byDate/${date}`);

const getProjectTeamInfo = (projectId: number) =>
  instance.get(`v1/project/${projectId}/side`);

const inviteMember = (body: AddMemberToTeamReqType) =>
  instance.post<AddMemberToTeamResType>(`v1/team/invite`, body);

const inviteMemberEmailValidate = (email: string) =>
  instance.get<GetTeamInfoResType>(`v1/team/invite/${email}`);

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
};
