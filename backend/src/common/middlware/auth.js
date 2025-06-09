import { ROLES, ROLE_GROUPS } from '../config/roles.js';

export const isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.status(401).json({ message: 'Unauthorized - Please login first' });
};

export const isAdmin = (req, res, next) => {
	if (req.isAuthenticated() && req.user.role === ROLES.ADMIN) {
		return next();
	}
	res.status(403).json({ message: 'Forbidden - Admin access required' });
};

export const allowedRoles = (...roles) => {
	return (req, res, next) => {
		if (req.isAuthenticated() && roles.includes(req.user.role)) {
			return next();
		}
		res.status(403).json({ message: 'Forbidden - Insufficient permissions' });
	};
};

// New convenience middleware for role groups
export const allowedRoleGroups = (groupName) => {
	const allowedRolesList = ROLE_GROUPS[groupName] || [];
	return allowedRoles(...allowedRolesList);
};
