import instance from './instance';

export enum ProjectTypeEnum {
  whole = 'WHOLE',
  team = 'TEAM',
  single = 'SINGLE',
}
export type NewProjectType = {
  objective: string;
  startDate: string;
  endDate: string;
  teamMembers: string[];
};

export type ProjectType = {
  projectToken: string;
  objective: string;
  progress: number;
  startDate: string;
  endDate: string;
  teamMembersCount: number;
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
export type ProjectDetailType = Pick<
  ProjectType,
  'endDate' | 'startDate' | 'objective' | 'projectToken' | 'teamMembersCount'
> & {
  keyResults: KeyResultType[];
  projectType: ProjectTypeEnum;
};

export type ProjectIniType = {
  initiativeToken: string;
  initiativeName: string;
  initiativeDetail: string;
  done: boolean;
  user: {userName: string; profileImage: string; jobField: string};
  endDate: string;
  startDate: string;
  email: string;
  myInitiative: boolean;
};

export type AddProjectKRReqType = Pick<ProjectDetailType, 'projectToken'> &
  Pick<KeyResultType, 'keyResultName'>;

export type AddProjectIniReqType = {
  keyResultToken: string;
  name: string;
  endDate: string;
  startDate: string;
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

export type AddMemberToTeamReqType = {projectToken: string; email: string};
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

export enum SortTypeEnum {
  'RECENTLY_CREATE' = 'RECENTLY_CREATE',
  'DEADLINE_CLOSE' = 'DEADLINE_CLOSE',
  'PROGRESS_HIGH' = 'PROGRESS_HIGH',
  'PROGRESS_LOW' = 'PROGRESS_LOW',
}

const createNewProject = (body: CreateNewProjectReqType) =>
  instance.post('v1/project', body);

const getProjectList = ({
  sort,
  includeFinished,
}: {
  sort: SortTypeEnum;
  includeFinished: boolean;
}) =>
  instance.get<GetProjectListResType>(
    `v1/project?sortType=${sort}&includeFinishedProjectYN=${
      includeFinished ? 'Y' : 'N'
    }&page=0&size=10&projectType=ALL`,
  );

const getProjectDetail = ({projectToken}: GetProjectDetailReqType) =>
  instance.get<GetProjectDetailResType>(`v1/project/${projectToken}`);

const addKR = (body: AddProjectKRReqType) =>
  instance.post(`v1/keyresult`, body);

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

const updateProjectIni = (
  initiativeToken: string,
  body: AddProjectIniReqType,
) => instance.put<string>(`v1/initiative/${initiativeToken}/update`, body);

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
  updateProjectIni,
  addKR,
};
