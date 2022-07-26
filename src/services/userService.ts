import { UpdateUserInput } from '@dtos/user/update-user.dto';
import { UserOutput } from '@dtos/user/user.dto';
import { UserRecord } from 'firebase-admin/auth';
import { authService, db } from 'src/firebaseApp';

const userRef = db.collection('user');

// ---- GET ----
export const getUser = async (uid: string): Promise<UserOutput> => {
  const { photoURL, displayName } = await authService.getUser(uid);

  return {
    id: uid,
    photoURL,
    displayName,
  };
};

export const getUsers = async (): Promise<UserOutput[]> => {
  const listUsers = await authService.listUsers();
  const users: UserOutput[] = listUsers.users.map((user: UserRecord) => {
    const { uid, photoURL, displayName } = user;
    return {
      id: uid,
      displayName,
      photoURL,
    };
  });
  return users;
};

// ---- POST ----
// TODO: auth 생성시 trigger 로 생성?
export const createUser = async (uid: string): Promise<void> => {
  await userRef.doc(uid).set({ studyIds: [] });
};

// ---- PATCH ----
export const updateUser = async (
  uid: string,
  updateUserInput: UpdateUserInput
): Promise<void> => {
  const { photoURL, displayName } = updateUserInput;
  await authService.updateUser(uid, { photoURL, displayName });
};
