import ServerContext from './ServerContext';
import ServerContextManager from './ServerContextManager';
import GroupContextConstants from './GroupContextConstants';

export default interface GroupContext<C extends ServerContext, M extends ServerContextManager>
  extends ServerContext,
    GroupContextConstants {
  isHidesMembers(): boolean;

  addMember(path: string): void;

  removeMember(path: string, failIfDynamic: boolean): void;

  renameMember(oldPath: string, newPath: string): void;

  memberAdded(recursiveMember: ServerContext): void;

  memberRemoved(recursiveMember: ServerContext): void;
}
