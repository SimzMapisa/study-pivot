/**
 * Application roles configuration
 */
export const ROLES = {
	ADMIN: 'ADMIN',
	TUTOR: 'TUTOR',
	STUDENT: 'STUDENT',
	MODERATOR: 'MODERATOR',
};

// Convenience groups for common permission patterns
export const ROLE_GROUPS = {
	STAFF: [ROLES.ADMIN, ROLES.MODERATOR],
	CONTENT_CREATORS: [ROLES.ADMIN, ROLES.TUTOR],
};
