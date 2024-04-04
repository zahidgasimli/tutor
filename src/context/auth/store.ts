import jwtDecode from 'jwt-decode';
import { UserFromToken } from 'mutations/use-login';
import { renewAccessToken as getNewAccessToken } from 'mutations/use-refresh-token';
import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type AuthRole = 'INSTRUCTOR' | 'STUDENT';

export type AuthUserProps = {
    firstName: string;
    lastName: string;
    fullName: string;
    role: AuthRole;
    id: number;
    avatarUrl: string | undefined;
    isInstructor: boolean;
    isStudent: boolean;
    isCompleted: boolean;
};

export type AuthState = {
    accessToken: string | null;
    refreshToken: string | null;
    user: AuthUserProps | null;
    isLoggedIn: boolean;
    renewAccessToken: () => Promise<void>;
    login: ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => void;
    logout: () => void;
};

export type SetFunction = Parameters<StateCreator<AuthState>>['0'];

const normalizeUser = (user: UserFromToken) => {
    const fullName = user.first_name + ' ' + user.last_name;
    const normalizedUser: AuthUserProps = {
        firstName: user.first_name,
        lastName: user.last_name,
        fullName,
        id: user.user_id,
        avatarUrl: user.image || undefined,
        role: user.role,
        isCompleted: user.is_completed,
        isInstructor: user.role === 'INSTRUCTOR',
        isStudent: user.role === 'STUDENT',
    };
    return normalizedUser;
};

const login = ({
    accessToken,
    refreshToken,
    set,
}: {
    accessToken: string;
    refreshToken?: string;
    set: SetFunction;
}) => {
    const user: UserFromToken = jwtDecode(accessToken);
    if (!user) return;
    set({ isLoggedIn: true, user: normalizeUser(user), accessToken, refreshToken });
};

const renewAccessToken = async ({ refreshToken, set }: { refreshToken: string | null; set: SetFunction }) => {
    if (!refreshToken) return;
    const { access, refresh } = await getNewAccessToken({ refresh: refreshToken });
    const user: UserFromToken = jwtDecode(access);
    if (!user) return;
    set({ accessToken: access, refreshToken: refresh || refreshToken, user: normalizeUser(user) });
};

const logout = ({ set }: { set: SetFunction }) => {
    set({ isLoggedIn: false, user: null, accessToken: null, refreshToken: null });
};

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set, get) => ({
                accessToken: null,
                refreshToken: null,
                user: null,
                isLoggedIn: false,
                renewAccessToken: async () => renewAccessToken({ refreshToken: get().refreshToken, set }),
                login: ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) =>
                    login({ accessToken, refreshToken, set }),
                logout: () => logout({ set }),
            }),
            { name: '@auth' },
        ),
    ),
);
