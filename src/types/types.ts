export interface ISignUpForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ISignInForm {
  username: string;
  password: string;
}

export interface IAuthErrorResponce {
  data: {
    status: string;
  };
}

export interface IUserState {
  isFetched: boolean;
  listUuid: string;
  isFetchedTasks: boolean;
  isFetchedAllTasks: boolean;
  username: string;
  darkMode : boolean | undefined
}

export interface IRootState {
  user: IUserState;
}

export interface IUser {
  uuid: string;
  name: string;
  taskCount: number;
  completedTaskCount: number;
}

export interface ITask {
  uuid: string;
  text: string;
  completed: boolean;
  list: {
    uuid: string;
    name: string;
  };
}
